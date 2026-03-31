#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import numpy as np
from scipy.stats import spearmanr, kendalltau
from typing import Dict, List
import csv



EXPERT_RANKINGS = {
    "Expert_A": [
        [[1,2], [3], [4,5], [7,8], [6]]
    ],

    "Expert_B": [
        [1, 2, 5, 4, 7, 3, 8, 6],
    ],

    "Expert_C": [
        [1, 2, 4, 5, 3, 7, 8, 6],
    ],

    "Expert_D": [
        [1, 2, 5, 4, 3, 7, 8, 6],
    ],

    "Expert_E": [
        [1, 2, 4, 5, 7, 3, 6, 8],
    ],
}

# ------------------------------------------------
# ranking utils
# ------------------------------------------------

def build_rank_vector(values: Dict[int, float], items: List[int]):
    """
    Convert values into rank vector with ties.
    Smaller value = better rank (1 = best).
    """

    if not values:
        return None

    # sort by value
    sorted_items = sorted(values.items(), key=lambda kv: kv[1])

    ranks = {}
    current_rank = 1

    for i, (sid, val) in enumerate(sorted_items):

        if i > 0 and val != sorted_items[i - 1][1]:
            current_rank += 1

        ranks[sid] = current_rank

    # build vector aligned to items
    return [ranks[sid] for sid in items]


def correlate_tau(order_a: List[int], values_b: Dict[int, float]):


    if isinstance(order_a[0], list):
        expert_items = [s for group in order_a for s in group]
    else:
        expert_items = order_a

    items = sorted(set(expert_items) & set(values_b.keys()))

    if len(items) < 2:
        return np.nan, np.nan

    if isinstance(order_a[0], list):
        A = expert_to_rank_vector(order_a, items)
    else:
        pos_a = {sid: i + 1 for i, sid in enumerate(order_a)}
        A = [pos_a[sid] for sid in items]

    B = build_rank_vector(values_b, items)

    if len(set(B)) == 1:
        return 0.0, 0.0

    tau = kendalltau(A, B).correlation
    rho = spearmanr(A, B).correlation

    return rho, tau


# ------------------------------------------------
# student data
# ------------------------------------------------

def load_students(path: str):
    return pd.read_excel(path)


QUESTION_TYPES = ["function", "output", "syntaxBL"]
TIME_QS = ["function", "output", "syntaxBL", "scaleSM", "scaleST"]


def extract_proxy(df, proxy):

    SCALE_MAP = {
        "Very easy": 1,
        "Easy": 2,
        "Neutral": 3,
        "Difficult": 4,
        "Very difficult": 5,
    }

    result = {}

    for sid in range(1, 9):

        series = None

        # ----------------------------
        # read time
        # ----------------------------
        if proxy in ("readTime", "log_readTime"):

            col = f"snippet-{sid}.readTime"
            if col not in df.columns:
                continue

            series = df[col]

            if proxy.startswith("log_"):
                series = series.apply(
                    lambda x: np.log(x) if pd.notna(x) and x > 0 else np.nan
                )

        # ----------------------------
        # time conditioned on correctness
        # IMPORTANT: must come before generic time_ branch
        # ----------------------------
        elif proxy.startswith("time_correct_") or proxy.startswith("log_time_correct_"):

            is_log = proxy.startswith("log_")
            parts = proxy.split("_")
            q = parts[3] if is_log else parts[2]

            time_col = f"snippet-{sid}.{q}.timeSec"
            score_col = f"snippet-{sid}.{q}.score"

            if time_col not in df.columns or score_col not in df.columns:
                continue

            time_series = df[time_col]
            score_series = df[score_col]

            if q in ("syntaxBL", "output"):
                mask = score_series == 1
            elif q == "function":
                mask = score_series >= 4
            else:
                continue

            series = time_series[mask]

            if is_log:
                series = series.apply(
                    lambda x: np.log(x) if pd.notna(x) and x > 0 else np.nan
                )

        # ----------------------------
        # raw time per question
        # ----------------------------
        elif proxy.startswith("time_") or proxy.startswith("log_time_"):

            is_log = proxy.startswith("log_")
            parts = proxy.split("_")
            q = parts[2] if is_log else parts[1]

            col = f"snippet-{sid}.{q}.timeSec"
            if col not in df.columns:
                continue

            series = df[col]

            if is_log:
                series = series.apply(
                    lambda x: np.log(x) if pd.notna(x) and x > 0 else np.nan
                )

        # ----------------------------
        # accuracy
        # ----------------------------
        elif proxy.startswith("acc_"):

            q = proxy.split("_", 1)[1]
            col = f"snippet-{sid}.{q}.score"

            if col not in df.columns:
                continue

            series = -df[col]

        # ----------------------------
        # scales
        # ----------------------------
        elif proxy in ("scaleSM", "scaleST"):

            col = f"snippet-{sid}.{proxy}.answer"
            if col not in df.columns:
                continue

            series = (
                df[col]
                .astype(str)
                .str.strip()
                .map(lambda x: SCALE_MAP.get(x, np.nan))
            )

        else:
            continue

        series = series.dropna()

        if not series.empty:
            # print(f"Proxy {proxy}, snippet {sid}, count = {series.count()}", flush=True)
            result[sid] = series

    return result

# ------------------------------------------------
# export long-format data for plots
# ------------------------------------------------

def export_student_long_data(df):

    snippet_rows = []
    question_rows = []

    SCALE_MAP = {
        "Very easy": 1,
        "Easy": 2,
        "Neutral": 3,
        "Difficult": 4,
        "Very difficult": 5,
    }

    SCORE_QUESTIONS = ["function", "output", "syntaxBL"]
    SCALE_QUESTIONS = ["scaleSM", "scaleST"]
    ALL_QUESTIONS = SCORE_QUESTIONS + SCALE_QUESTIONS

    for student_id, row in df.iterrows():

        for sid in range(1, 9):

            read_col = f"snippet-{sid}.readTime"
            read_time = row.get(read_col, np.nan)

            snippet_rows.append({
                "student_id": student_id,
                "snippet_id": sid,
                "read_time": read_time,
                "log_read_time": np.log(read_time) if pd.notna(read_time) and read_time > 0 else np.nan,
            })

            for q in ALL_QUESTIONS:

                time_col = f"snippet-{sid}.{q}.timeSec"
                time_val = row.get(time_col, np.nan)

                if q in SCORE_QUESTIONS:
                    value_col = f"snippet-{sid}.{q}.score"
                    value = row.get(value_col, np.nan)

                else:
                    value_col = f"snippet-{sid}.{q}.answer"
                    raw_value = row.get(value_col, np.nan)

                    if pd.notna(raw_value):
                        value = SCALE_MAP.get(str(raw_value).strip(), np.nan)
                    else:
                        value = np.nan

                question_rows.append({
                    "student_id": student_id,
                    "snippet_id": sid,
                    "question": q,
                    "value": value,
                    "time_sec": time_val,
                    "log_time_sec": np.log(time_val) if pd.notna(time_val) and time_val > 0 else np.nan,
                })

    return snippet_rows, question_rows


# ------------------------------------------------
# correlation engine
# ------------------------------------------------

def compute_correlations(expert_order, proxy_values, case_name, expert_str, proxy_name):


    if isinstance(expert_order[0], list):
        expert_set = set(s for group in expert_order for s in group)
    else:
        expert_set = set(expert_order)

    per_student = []
    per_student_rows = []

    n_students = len(next(iter(proxy_values.values())))

    for i in range(n_students):

        vals = {
            sid: proxy_values[sid].iloc[i]
            for sid in proxy_values
            if sid in expert_set
            and i < len(proxy_values[sid])
            and not pd.isna(proxy_values[sid].iloc[i])
        }

        if len(vals) >= 2:

            rho, tau = correlate_tau(expert_order, vals)

            if not np.isnan(rho) and not np.isnan(tau):
                per_student.append((rho, tau))
                per_student_rows.append({
                    "case": case_name,
                    "expert_ranking": expert_str,
                    "proxy": proxy_name,
                    "student_index": i,
                    "spearman": rho,
                    "kendall": tau,
                    "n_items": len(vals),
                })


    avg_vals = {
        sid: proxy_values[sid].mean(skipna=True)
        for sid in proxy_values
        if sid in expert_set
    }

    median_vals = {
        sid: proxy_values[sid].median(skipna=True)
        for sid in proxy_values
        if sid in expert_set
    }

    def corr_from(vals):

        rho, tau = correlate_tau(expert_order, vals)

        return rho, 0.0, tau, 0.0  # std = 0 (single estimate)

    aggregated = {
        "per_student": (
            np.mean([x[0] for x in per_student]) if per_student else np.nan,
            np.std([x[0] for x in per_student]) if per_student else np.nan,
            np.mean([x[1] for x in per_student]) if per_student else np.nan,
            np.std([x[1] for x in per_student]) if per_student else np.nan,
            len(per_student),
        ),
        "avg": (*corr_from(avg_vals), len(avg_vals)),
        "median": (*corr_from(median_vals), len(median_vals)),
    }

    return aggregated, per_student_rows


def expert_to_rank_vector(expert_order, items):
    """
    Convert expert ranking (with possible ties) to rank vector.
    """

    ranks = {}
    current_rank = 1

    for group in expert_order:
        if isinstance(group, list):
            for sid in group:
                ranks[sid] = current_rank
        else:
            ranks[group] = current_rank

        current_rank += 1

    return [ranks[sid] for sid in items]
# ------------------------------------------------
# main
# ------------------------------------------------

def main():

    df = load_students("students_graded.xlsx")

    proxies = (
        ["readTime", "log_readTime"]
        + [f"time_{q}" for q in TIME_QS]
        + [f"log_time_{q}" for q in TIME_QS]
        + [f"time_correct_{q}" for q in QUESTION_TYPES]
        + [f"log_time_correct_{q}" for q in QUESTION_TYPES]
        + [f"acc_{q}" for q in QUESTION_TYPES]
        + ["scaleSM", "scaleST"]
    )

    # print("Extracting proxy data...", flush=True)
    proxy_data = {proxy: extract_proxy(df, proxy) for proxy in proxies}
    # print("Done extracting proxy data", flush=True)

    # print("Exporting long-format student data...", flush=True)
    snippet_rows, question_rows = export_student_long_data(df)
    # print("Done exporting long-format student data", flush=True)

    corr_rows = []

    agg_file = "correlation_results_second.csv"
    # snippet_file = "student_factor_long_snippet_second.csv"
    # question_file = "student_factor_long_question_second.csv"
    per_student_file = "per_student_correlations_second.csv"

    with open(agg_file, "w", newline="") as f:

        writer = csv.writer(f)

        writer.writerow([
            "case",
            "expert_ranking",
            "proxy",
            "aggregation",
            "spearman_mean",
            "spearman_std",
            "kendall_mean",
            "kendall_std",
            "n"
        ])

        for case, expert_orders in EXPERT_RANKINGS.items():

            # print(f"\nCASE: {case}", flush=True)

            for expert_order in expert_orders:

                # print(f"  Expert ranking: {expert_order}", flush=True)

                expert_str = "-".join(map(str, expert_order))

                for proxy in proxies:

                    # print(f"    Proxy: {proxy}", flush=True)

                    proxy_vals = proxy_data.get(proxy, {})

                    if len(proxy_vals) < 2:
                        # print("      Skipping: fewer than 2 snippets have data", flush=True)
                        continue

                    # print("      Computing correlations...", flush=True)

                    results, per_student_rows = compute_correlations(
                        expert_order,
                        proxy_vals,
                        case,
                        expert_str,
                        proxy,
                    )

                    corr_rows.extend(per_student_rows)

                    # print("      Done computing correlations", flush=True)

                    for agg, (rho_mean, rho_std, tau_mean, tau_std, n) in results.items():

                        writer.writerow([
                            case,
                            expert_str,
                            proxy,
                            agg,
                            rho_mean,
                            rho_std,
                            tau_mean,
                            tau_std,
                            n,
                        ])

    print("\nWriting additional CSV files...", flush=True)

    # pd.DataFrame(snippet_rows).to_csv(snippet_file, index=False)
    # pd.DataFrame(question_rows).to_csv(question_file, index=False)
    pd.DataFrame(corr_rows).to_csv(per_student_file, index=False)

    print("Done writing additional CSV files", flush=True)

    print("\n====================================", flush=True)
    print("Output files generated:", flush=True)
    print(f"  {agg_file}", flush=True)
    # print(f"  {snippet_file}", flush=True)
    # print(f"  {question_file}", flush=True)
    print(f"  {per_student_file}", flush=True)
    print("====================================\n", flush=True)


if __name__ == "__main__":
    print("Starting correlation script...", flush=True)
    main()