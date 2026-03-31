#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd


# =====================================================
# LOAD FILES
# =====================================================

agg_df = pd.read_csv("correlation_results.csv")
per_student_df = pd.read_csv("per_student_correlations.csv")
per_student_second = pd.read_csv("per_student_correlations_second.csv")
avg_vs_expert_df = pd.read_csv("correlation_results_second.csv")


# =====================================================
# HELPERS
# =====================================================

def remove_log(df):
    return df[~df["proxy"].str.startswith("log_")].copy()


def show_heatmap(title, source, pivot_df):
    print("\n" + "=" * 100)
    print(title)
    print("=" * 100)

    print(f"\nSource file: {source}")
    print("\n=== EXACT VALUES USED IN HEATMAP ===\n")
    print(pivot_df)

    print("\nShape:", pivot_df.shape)
    print("=" * 100 + "\n")


def show_distribution(title, source, df, columns):
    print("\n" + "=" * 100)
    print(title)
    print("=" * 100)

    print(f"\nSource file: {source}")
    print(f"Columns used: {columns}")

    df_used = df[columns]

    print("\nFirst 20 rows of used data:\n")
    print(df_used.head(20))

    print("\nShape:", df_used.shape)
    print("=" * 100 + "\n")


# =====================================================
# PREPROCESS 
# =====================================================

agg_df = remove_log(agg_df)
per_student_df = remove_log(per_student_df)
per_student_second = remove_log(per_student_second)
avg_vs_expert_df = remove_log(avg_vs_expert_df)

agg_df = agg_df[agg_df["aggregation"] == "avg"]
avg_vs_expert_df = avg_vs_expert_df[avg_vs_expert_df["aggregation"] == "avg"]


# =====================================================
# FIGURE 3 (HEATMAP)
# Aggregated vs MEAN RANKING (majority)
# =====================================================

df3 = agg_df[agg_df["case"] == "majority"]

pivot3 = df3.groupby(["proxy"])["kendall_mean"].mean().to_frame()

show_heatmap(
    "Figure 3: Aggregated vs MEAN RANKING (majority heatmap)",
    "correlation_results.csv",
    pivot3
)


# =====================================================
# FIGURE 4 (HEATMAP)
# Aggregated vs Aggregated Experts
# =====================================================

pivot4 = (
    agg_df.groupby(["proxy", "case"])["kendall_mean"]
    .mean()
    .unstack()
)

show_heatmap(
    "Figure 4: Aggregated vs Aggregated Experts (Kendall heatmap)",
    "correlation_results.csv",
    pivot4
)


# =====================================================
# FIGURE 5 (DISTRIBUTION)
# =====================================================

show_distribution(
    "Figure 5: Distribution (Aggregated vs Aggregated Experts)",
    "correlation_results.csv",
    agg_df,
    ["case", "proxy", "kendall_mean"]
)


# =====================================================
# FIGURE 6 (HEATMAP)
# Aggregated vs Individual Experts
# =====================================================

df6 = avg_vs_expert_df[
    avg_vs_expert_df["case"].str.contains("Expert", na=False)
]

pivot6 = (
    df6.groupby(["proxy", "case"])["kendall_mean"]
    .mean()
    .unstack()
)

show_heatmap(
    "Figure 6: Aggregated vs Individual Experts (heatmap)",
    "correlation_results_second.csv",
    pivot6
)


# =====================================================
# FIGURE 7 (DISTRIBUTION)
# =====================================================

show_distribution(
    "Figure 7: Distribution (Aggregated vs Individual Experts)",
    "correlation_results_second.csv",
    df6,
    ["case", "proxy", "kendall_mean"]
)


# =====================================================
# FIGURE 8 (HEATMAP)
# Per-student vs Aggregated Experts
# =====================================================

df8 = per_student_df.dropna(subset=["kendall"])

pivot8 = (
    df8.groupby(["proxy", "case"])["kendall"]
    .mean()
    .unstack()
)

show_heatmap(
    "Figure 8: Per-student vs Aggregated Experts (heatmap)",
    "per_student_correlations.csv",
    pivot8
)


# =====================================================
# FIGURE 9 (DISTRIBUTION)
# =====================================================

show_distribution(
    "Figure 9: Distribution (Per-student vs Aggregated Experts)",
    "per_student_correlations.csv",
    df8,
    ["case", "proxy", "kendall"]
)


# =====================================================
# FIGURE 10 (HEATMAP)
# Per-student vs Individual Experts
# =====================================================

df10 = per_student_second.dropna(subset=["kendall"])

pivot10 = (
    df10.groupby(["proxy", "case"])["kendall"]
    .mean()
    .unstack()
)

show_heatmap(
    "Figure 10: Per-student vs Individual Experts (heatmap)",
    "per_student_correlations_second.csv",
    pivot10
)


# =====================================================
# FIGURE 11 (DISTRIBUTION)
# =====================================================

show_distribution(
    "Figure 11: Distribution (Per-student vs Individual Experts)",
    "per_student_correlations_second.csv",
    df10,
    ["case", "proxy", "kendall"]
)


print("\nDone. Heatmaps show EXACT values used in figures.\n")