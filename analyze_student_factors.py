#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import warnings
import numpy as np
import pandas as pd
import statsmodels.api as sm
import statsmodels.formula.api as smf
import re
from pathlib import Path

EXCEL_FILE = "students_graded.xlsx"
ORDER_FILE = "studentsFinal.json"

OUT_MODEL_RESULTS = "student_factor_model_results.csv"

QUESTION_TYPES = ["function", "output", "syntaxBL"]
SNIPPETS = list(range(1, 9))

warnings.filterwarnings("ignore")


# ============================================================
# Helpers
# ============================================================

def extract_scale(x):
    if pd.isna(x):
        return np.nan
    m = re.search(r'\d+', str(x))
    return int(m.group()) if m else np.nan


def map_years(x):
    if pd.isna(x):
        return np.nan
    s = str(x)
    if "Less than 1" in s:
        return 1
    if "1–2" in s or "1-2" in s:
        return 2
    if "3–4" in s or "3-4" in s:
        return 3
    if "5+" in s:
        return 4
    return np.nan


def zscore_series(s):
    s = pd.to_numeric(s, errors="coerce")
    sd = s.std(ddof=0)
    if pd.isna(sd) or sd == 0:
        return pd.Series(np.nan, index=s.index)
    return (s - s.mean()) / sd


def safe_float(x):
    try:
        if pd.isna(x):
            return np.nan
        return float(x)
    except:
        return np.nan


def ci_bounds(coef, se):
    if pd.isna(coef) or pd.isna(se):
        return np.nan, np.nan
    return coef - 1.96 * se, coef + 1.96 * se


def load_order_map(order_file):
    with open(order_file) as f:
        order_data = json.load(f)

    order_map = {}
    for entry in order_data:
        username = entry["data"]["username"]
        order = json.loads(entry["data"]["snippetOrder"])
        order_map[username] = order
    return order_map


# ============================================================
# Student-level variables
# ============================================================

def build_student_level_df(excel_file):

    df = pd.read_excel(excel_file)

    df["ClassMates"] = df["javaExperience.s.ClassMates"].apply(extract_scale)
    df["Logical"] = df["javaExperience.s.Logical"].apply(extract_scale)
    df["OOP"] = df["javaExperience.s.ObjectOriented"].apply(extract_scale)
    df["JavaYears"] = df["javaExperience.s.JavaExperience"].apply(map_years)

    pe = pd.to_numeric(df["javaExperience.s.PE"], errors="coerce")
    df["PE_norm"] = ((pe - pe.min()) / (pe.max() - pe.min())) * 4 + 1

    # knowledge
    topics = [
        "atan","bitwise_ops","file_vs_network_uri","fp_singularities",
        "hex_to_dec","nan","quadratic","reflection",
        "uri_scheme","utf8_utf16","visitor_walkFileTree"
    ]

    scores = []
    for t in topics:
        fam = f"csKnowledgeSurveyAnswers.{t}.fam"
        mcq = f"csKnowledgeSurveyAnswers.{t}.mcq"
        s = ((df[fam].astype(str).str.lower() == "yes") &
             (df[mcq].notna())).astype(int)
        scores.append(s)

    df["CSKnow"] = pd.concat(scores, axis=1).mean(axis=1)

    # z-scores
    df["ClassMates_z"] = zscore_series(df["ClassMates"])
    df["JavaYears_z"] = zscore_series(df["JavaYears"])
    df["OOP_z"] = zscore_series(df["OOP"])
    df["PE_z"] = zscore_series(df["PE_norm"])
    df["CSKnow_z"] = zscore_series(df["CSKnow"])

    return df


# ============================================================
# Build datasets
# ============================================================

def build_long_datasets(df, order_map):

    snippet_rows = []
    question_rows = []

    for _, row in df.iterrows():

        username = row.get("username")
        if pd.isna(username) or username not in order_map:
            continue

        order = order_map[username]
        pos_map = {s: i for i, s in enumerate(order, 1)}

        base = {
            "username": username,
            "ClassMates_z": row["ClassMates_z"],
            "JavaYears_z": row["JavaYears_z"],
            "OOP_z": row["OOP_z"],
            "PE_z": row["PE_z"],
            "CSKnow_z": row["CSKnow_z"],
        }

        for sid in SNIPPETS:

            position = pos_map.get(sid, np.nan)
            read_time = safe_float(row.get(f"snippet-{sid}.readTime"))

            times = []

            for q in QUESTION_TYPES:

                score = safe_float(row.get(f"snippet-{sid}.{q}.score"))
                time_val = safe_float(row.get(f"snippet-{sid}.{q}.timeSec"))

                if q == "function":
                    correct = int(score >= 4) if pd.notna(score) else np.nan
                else:
                    correct = int(score == 1) if pd.notna(score) else np.nan

                time_correct = time_val if correct == 1 else np.nan

                if pd.notna(time_val):
                    times.append(time_val)

                question_rows.append({
                    **base,
                    "snippet_id": sid,
                    "position": position,
                    "question_type": q,
                    "binary_score": correct,
                    "time": time_val,
                    "time_correct": time_correct
                })

            snippet_total_time = np.nansum(times)

            snippet_rows.append({
                **base,
                "snippet_id": sid,
                "position": position,
                "read_time": read_time,
                "snippet_total_time": snippet_total_time
            })

    return pd.DataFrame(snippet_rows), pd.DataFrame(question_rows)


# ============================================================
# Models
# ============================================================

def fit_logit(df, predictor, label):

    data = df.dropna(subset=["binary_score", predictor])

    if data["binary_score"].nunique() < 2:
        return None

    model = smf.glm(
        f"binary_score ~ {predictor} + C(snippet_id)",
        data=data,
        family=sm.families.Binomial()
    )

    res = model.fit(cov_type="cluster", cov_kwds={"groups": data["username"]})

    coef = res.params[predictor]
    se = res.bse[predictor]
    ci_low, ci_high = ci_bounds(coef, se)

    return [label, "accuracy", predictor, coef, se, res.pvalues[predictor], ci_low, ci_high]


def fit_mixed(df, outcome, predictor, label):

    data = df.dropna(subset=[outcome, predictor])
    if data.empty:
        return None

    model = smf.mixedlm(
        f"{outcome} ~ {predictor} + C(snippet_id)",
        data=data,
        groups=data["username"]
    )

    res = model.fit()

    coef = res.params[predictor]
    se = res.bse[predictor]
    ci_low, ci_high = ci_bounds(coef, se)

    return [label, outcome, predictor, coef, se, res.pvalues[predictor], ci_low, ci_high]


# ============================================================
# Main
# ============================================================

def main():

    df = build_student_level_df(EXCEL_FILE)
    order_map = load_order_map(ORDER_FILE)

    snippet_df, question_df = build_long_datasets(df, order_map)

    results = []

    predictors = [
        ("ClassMates_z","Classmates"),
        ("JavaYears_z","JavaExp"),
        ("OOP_z","OOP"),
        ("PE_z","Exam"),
        ("CSKnow_z","CSKnow"),
    ]

    for predictor, label in predictors:

        for q in QUESTION_TYPES:

            sub = question_df[question_df["question_type"] == q]

            results.append(fit_logit(sub, predictor, f"{label} acc_{q}"))
            results.append(fit_mixed(sub, "time", predictor, f"{label} time_{q}"))
            results.append(fit_mixed(sub, "time_correct", predictor, f"{label} time_correct_{q}"))

        results.append(fit_mixed(snippet_df, "read_time", predictor, f"{label} readTime"))
        results.append(fit_mixed(snippet_df, "snippet_total_time", predictor, f"{label} snippet_total_time"))

    # ======================
    # FATIGUE
    # ======================
    for q in QUESTION_TYPES:

        sub = question_df[question_df["question_type"] == q]

        results.append(fit_logit(sub, "position", f"Fatigue acc_{q}"))
        results.append(fit_mixed(sub, "time", "position", f"Fatigue time_{q}"))
        results.append(fit_mixed(sub, "time_correct", "position", f"Fatigue time_correct_{q}"))

    results.append(fit_mixed(snippet_df, "read_time", "position", "Fatigue readTime"))
    results.append(fit_mixed(snippet_df, "snippet_total_time", "position", "Fatigue snippet_total_time"))

    results = [r for r in results if r is not None]

    results_df = pd.DataFrame(results, columns=[
        "analysis", "outcome", "predictor",
        "coef", "se", "p_value", "ci_low", "ci_high"
    ])

    results_df.to_csv(OUT_MODEL_RESULTS, index=False)

    print(f"\nResults saved to: {Path(OUT_MODEL_RESULTS).resolve()}\n")


if __name__ == "__main__":
    main()
