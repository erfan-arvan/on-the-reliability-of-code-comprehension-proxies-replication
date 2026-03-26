#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import numpy as np
from scipy.stats import spearmanr, wilcoxon
import matplotlib.pyplot as plt

# -------------------------------------------------
# CONFIG
# -------------------------------------------------

Uni1_FILE = "correlation_resultsUni1.csv"
Uni2_FILE   = "correlation_resultsUni2.csv"

OUTPUT_PREFIX = "Uni1_vs_Uni2"

AGGREGATIONS = ["per_student", "avg", "median"]


# -------------------------------------------------
# LOAD + MERGE
# -------------------------------------------------

df_Uni1 = pd.read_csv(Uni1_FILE)
df_Uni2   = pd.read_csv(Uni2_FILE)

merge_keys = ["case", "expert_ranking", "proxy", "aggregation"]

df = pd.merge(
    df_Uni1,
    df_Uni2,
    on=merge_keys,
    suffixes=("_Uni1", "_Uni2")
)

print(f"Total matched rows: {len(df)}")


# -------------------------------------------------
# ANALYSIS FUNCTION
# -------------------------------------------------

def analyze_subset(df_sub, label):

    print("\n====================================")
    print(f"AGGREGATION: {label}")
    print("====================================")

    valid = df_sub[[
        "spearman_mean_Uni1",
        "spearman_mean_Uni2"
    ]].dropna()

    if len(valid) < 5:
        print("Not enough data")
        return

    x = valid["spearman_mean_Uni1"]
    y = valid["spearman_mean_Uni2"]

    # ---------------------------------------------
    # 1. VECTOR CORRELATION (MAIN RESULT)
    # ---------------------------------------------
    rho, p = spearmanr(x, y)

    print(f"Vector correlation (Spearman): rho = {rho:.4f}, p = {p:.4g}")

    # ---------------------------------------------
    # 2. EFFECT SIZE
    # ---------------------------------------------
    delta = (x - y).abs()

    print(f"Mean |Δρ| = {delta.mean():.4f}")
    print(f"Median |Δρ| = {delta.median():.4f}")

    # ---------------------------------------------
    # 3. WILCOXON (CAUTION)
    # ---------------------------------------------
    try:
        w = wilcoxon(x, y)
        print(f"Wilcoxon p = {w.pvalue:.4g}  (interpret with caution)")
    except:
        print("Wilcoxon failed (likely identical values)")

    # ---------------------------------------------
    # 4. SCATTER PLOT
    # ---------------------------------------------
    plt.figure(figsize=(6,6))

    plt.scatter(x, y, alpha=0.6)

    # diagonal
    min_val = min(x.min(), y.min())
    max_val = max(x.max(), y.max())
    plt.plot([min_val, max_val], [min_val, max_val], linestyle='--')

    plt.xlabel("Uni1 correlation")
    plt.ylabel("W&M correlation")
    plt.title(f"Uni1 vs W&M ({label})")

    plt.tight_layout()

    filename = f"{OUTPUT_PREFIX}_{label}.png"
    plt.savefig(filename)
    plt.close()

    print(f"Saved plot: {filename}")


# -------------------------------------------------
# RUN PER AGGREGATION
# -------------------------------------------------

for agg in AGGREGATIONS:

    df_sub = df[df["aggregation"] == agg]

    analyze_subset(df_sub, agg)


# -------------------------------------------------
# OPTIONAL: SAVE CLEAN TABLE
# -------------------------------------------------

df["delta_spearman"] = df["spearman_mean_Uni1"] - df["spearman_mean_Uni2"]
df["abs_delta_spearman"] = df["delta_spearman"].abs()

df.to_csv(f"{OUTPUT_PREFIX}_merged.csv", index=False)

print("\nSaved merged dataset.")