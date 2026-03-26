import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
import os

sns.set(style="whitegrid", context="paper", font_scale=1.2)

os.makedirs("plots", exist_ok=True)

# =====================================================
# ORDERING
# =====================================================

CASE_ORDER = [
    "strict",
    "unanimous_up_to_ties",
    "1_violation",
    "majority"
]

EXPERT_ORDER = [
    "Expert_A",
    "Expert_B",
    "Expert_C",
    "Expert_D",
    "Expert_E",
]

# =====================================================
# LOAD FILES
# =====================================================

agg_df = pd.read_csv("correlation_results.csv")
per_student_df = pd.read_csv("per_student_correlations.csv")
per_student_second = pd.read_csv("per_student_correlations_second.csv")
avg_vs_expert_df = pd.read_csv("correlation_results_second.csv")


print("agg_df cases:", sorted(agg_df["case"].dropna().unique()))
print("per_student_df cases:", sorted(per_student_df["case"].dropna().unique()))
print("per_student_second cases:", sorted(per_student_second["case"].dropna().unique()))
print("avg_vs_expert_df cases:", sorted(avg_vs_expert_df["case"].dropna().unique()))

# =====================================================
# REMOVE log_* PROXIES
# =====================================================

def remove_log_proxies(df):
    return df[~df["proxy"].str.startswith("log_")].copy()

agg_df = remove_log_proxies(agg_df)
per_student_df = remove_log_proxies(per_student_df)
per_student_second = remove_log_proxies(per_student_second)
avg_vs_expert_df = remove_log_proxies(avg_vs_expert_df)

# =====================================================
# FILTERS
# =====================================================

agg_df = agg_df[agg_df["aggregation"] == "avg"].copy()
avg_vs_expert_df = avg_vs_expert_df[avg_vs_expert_df["aggregation"] == "avg"].copy()

# =====================================================
# HELPERS
# =====================================================

def dynamic_figsize(n_rows, base_height=0.5, width=12):
    return (width, max(6, n_rows * base_height))


def reorder_columns(pivot_df, desired_order):
    cols = [c for c in desired_order if c in pivot_df.columns]
    return pivot_df[cols]


def boxplot_with_stats(df, x, y, title, output_path, n_description=None):
    plt.figure(figsize=(16, 6))

    if df.empty or df[x].nunique() == 0:
        print(f"Skipping plot (empty): {title}")
        return

    if df.groupby(x)[y].count().max() <= 1:
        print(f"Skipping boxplot (not enough data): {title}")
        return

    ax = sns.boxplot(data=df, x=x, y=y)

    # ------------------------
    # Stats
    # ------------------------
    means = df.groupby(x)[y].mean().to_dict()
    counts = df.groupby(x)[y].count().to_dict()
    labels = [t.get_text() for t in ax.get_xticklabels()]

    ymin, ymax = ax.get_ylim()
    y_range = ymax - ymin
    ax.set_ylim(ymin, ymax + 0.06 * y_range)
    _, new_ymax = ax.get_ylim()

    # ------------------------
    # Plot means + n
    # ------------------------
    for i, label in enumerate(labels):
        if label in means:
            ax.scatter(i, means[label], color="black", zorder=3, s=40)

        y_text = new_ymax - 0.05 * y_range

        if label in counts:
            ax.text(
                i,
                y_text,
                f"{counts[label]}",
                ha="center",
                va="baseline",
                fontsize=9
            )


    # ------------------------
    # Single "n =" label (aligned with numbers)
    # ------------------------
    first_x = 0

    ax.text(
        first_x - 0.6,
        y_text,
        "n =",
        ha="right",
        va="baseline",
        fontsize=10
    )
    # ------------------------
    # LEGEND
    # ------------------------
    legend_elements = [
        Line2D(
            [0], [0],
            marker="o",
            linestyle="None",
            markerfacecolor="black",
            markeredgecolor="black",
            label="Mean",
            markersize=6
        ),
        Line2D(
            [0], [0],
            marker="o",
            linestyle="None",
            markeredgecolor="black",
            markerfacecolor="none",
            label="Outliers",
            markersize=5
        )
    ]

    ax.legend(
        handles=legend_elements,
        loc="lower right",
        bbox_to_anchor=(1.0, 0.0),
        borderaxespad=0.0,
        frameon=True,
        fontsize=10
    )

    # ------------------------
    # Formatting
    # ------------------------
    ax.set_title(title, fontsize=13)
    ax.set_ylabel(y, fontsize=12)
    ax.set_xlabel("")
    ax.tick_params(axis="both", labelsize=12)

    plt.xticks(rotation=45, ha="right")
    plt.subplots_adjust(bottom=0.3, top=0.85)
    plt.savefig(output_path, dpi=300, bbox_inches="tight")
    plt.close()


def grouped_boxplot(
    df,
    x,
    y,
    hue,
    title,
    output_path,
    hue_order=None,
    width=20,
    height=7
):

    plt.figure(figsize=(width, height))

    # REMOVE EMPTY GROUPS
    df = df.dropna(subset=[y])

    valid_groups = df.groupby([x, hue])[y].count().reset_index()
    valid_groups = valid_groups[valid_groups[y] > 0]

    if valid_groups.empty:
        print(f"Skipping grouped boxplot (no valid data): {title}")
        return

    df = df.merge(valid_groups[[x, hue]], on=[x, hue])

    if df.empty:
        print(f"Skipping grouped boxplot (empty after filtering): {title}")
        return

    ax = sns.boxplot(
        data=df,
        x=x,
        y=y,
        hue=hue,
        hue_order=hue_order
    )

    # ------------------------
    # Prepare orders
    # ------------------------
    if hue_order is None:
        hue_order = list(df[hue].dropna().unique())

    x_order = [t.get_text() for t in ax.get_xticklabels()]
    n_hue = len(hue_order)

    # ------------------------
    # Compute stats
    # ------------------------
    stats = (
        df.groupby([x, hue], observed=False)[y]
        .agg(["mean", "count"])
        .reset_index()
    )

    # ------------------------
    # Axis spacing for text
    # ------------------------
    ymin, ymax = ax.get_ylim()
    y_range = ymax - ymin
    ax.set_ylim(ymin, ymax + 0.10 * y_range)
    _, new_ymax = ax.get_ylim()

    # ------------------------
    # Compute positions
    # ------------------------
    group_width = 0.8

    if n_hue > 1:
        step = group_width / n_hue
        offsets = [-group_width / 2 + step / 2 + i * step for i in range(n_hue)]
    else:
        offsets = [0.0]

    x_pos = {label: i for i, label in enumerate(x_order)}
    hue_pos = {label: i for i, label in enumerate(hue_order)}

    # ------------------------
    # Plot means + n values
    # ------------------------
    y_text = new_ymax - 0.05 * y_range

    for _, row in stats.iterrows():
        x_label = row[x]
        hue_label = row[hue]

        if x_label not in x_pos or hue_label not in hue_pos:
            continue

        xpos = x_pos[x_label] + offsets[hue_pos[hue_label]]

        mean_val = row["mean"]
        count_val = row["count"]

        # --- mean dot ---
        ax.scatter(
            xpos,
            mean_val,
            color="black",
            s=40,
            zorder=4
        )

        # --- n number (ONLY number, no "n=") ---
        ax.text(
            xpos,
            y_text,
            f"{count_val}",
            ha="center",
            va="baseline",
            fontsize=9
        )

    # ------------------------
    # Single "n =" label (aligned perfectly)
    # ------------------------
    first_x = 0

    ax.text(
        first_x - 0.6,
        y_text,
        "n =",
        ha="right",
        va="baseline",
        fontsize=10
    )

    # ------------------------
    # Legend (hue + mean)
    # ------------------------
    handles, labels = ax.get_legend_handles_labels()

    mean_handle = Line2D(
        [0], [0],
        marker="o",
        linestyle="None",
        markerfacecolor="black",
        markeredgecolor="black",
        label="Mean",
        markersize=6
    )

    handles = handles + [mean_handle]
    labels = labels + ["Mean"]

    ax.legend(
        handles=handles,
        labels=labels,
        title=hue,
        loc="lower right",
        bbox_to_anchor=(1.0, 0.0),
        borderaxespad=0.0,
        frameon=True,
        fontsize=10,
        title_fontsize=10
    )

    # ------------------------
    # Formatting
    # ------------------------
    ax.set_title(title, fontsize=13)
    ax.set_ylabel(y, fontsize=12)
    ax.set_xlabel("")
    ax.tick_params(axis="both", labelsize=12)

    plt.xticks(rotation=45, ha="right")
    plt.subplots_adjust(bottom=0.3, top=0.88)
    plt.savefig(output_path, dpi=300, bbox_inches="tight")
    plt.close()


# =====================================================
# LOOP OVER METRICS
# =====================================================

for metric, agg_col in [
    ("spearman", "spearman_mean"),
    ("kendall", "kendall_mean")
]:

    print(f"Processing {metric}...")

    # =====================================================
    # 1. Aggregated Students vs Aggregated Experts
    # =====================================================

    df1 = agg_df.copy()

    # --- HEATMAP ---
    df1_heat = (
        df1.groupby(["case", "proxy"], as_index=False)
        .agg({agg_col: "mean"})
    )

    pivot1 = df1_heat.pivot_table(
        index="proxy",
        columns="case",
        values=agg_col,
        aggfunc="mean"
    )
    pivot1 = reorder_columns(pivot1, CASE_ORDER)

    plt.figure(figsize=dynamic_figsize(len(pivot1)))
    sns.heatmap(pivot1, annot=True, cmap="coolwarm", vmin=-1, vmax=1, center=0)
    plt.title(f"AVG (Students) vs Aggregated Experts ({metric})")
    plt.xticks(rotation=45, ha="right")
    plt.tight_layout()
    plt.savefig(f"plots/heatmap_agg_vs_agg_{metric}.png", dpi=300)
    plt.close()

    # --- OVERALL BOXPLOT ---
    boxplot_with_stats(
        df1,
        x="proxy",
        y=agg_col,
        title=f"Aggregated Students vs Aggregated Experts ({metric})",
        output_path=f"plots/box_agg_vs_agg_{metric}.png",
        n_description="n = number of expert-ranking configurations"
    )

    # --- GROUPED BOXPLOT BY AGGREGATION STRATEGY ---
    grouped_boxplot(
        df=df1,
        x="proxy",
        y=agg_col,
        hue="case",
        hue_order=CASE_ORDER,
        title=f"Aggregated Students vs Aggregated Experts by Aggregation Strategy ({metric})",
        output_path=f"plots/box_agg_vs_agg_by_case_{metric}.png"
    )

    # =====================================================
    # 2. Per-student vs Aggregated Experts
    # =====================================================

    df2 = per_student_df.dropna(subset=[metric]).copy()

    # --- HEATMAP ---
    df2_heat = (
        df2.groupby(["case", "proxy"], as_index=False)
        .agg({metric: "mean"})
    )

    pivot2 = df2_heat.pivot_table(
        index="proxy",
        columns="case",
        values=metric,
        aggfunc="mean"
    )
    pivot2 = reorder_columns(pivot2, CASE_ORDER)

    plt.figure(figsize=dynamic_figsize(len(pivot2)))
    sns.heatmap(pivot2, annot=True, cmap="coolwarm", vmin=-1, vmax=1, center=0)
    plt.title(f"Per-student vs Aggregated Experts ({metric})")
    plt.xticks(rotation=45, ha="right")
    plt.tight_layout()
    plt.savefig(f"plots/heatmap_perstudent_vs_aggexpert_{metric}.png", dpi=300)
    plt.close()

    # --- OVERALL BOXPLOT ---
    boxplot_with_stats(
        df2,
        x="proxy",
        y=metric,
        title=f"Per-student vs Aggregated Experts ({metric})",
        output_path=f"plots/box_perstudent_vs_aggexpert_{metric}.png",
        n_description="n = number of student correlations"
    )

    # --- GROUPED BOXPLOT BY AGGREGATION STRATEGY ---
    grouped_boxplot(
        df=df2,
        x="proxy",
        y=metric,
        hue="case",
        hue_order=CASE_ORDER,
        title=f"Per-student vs Aggregated Experts by Aggregation Strategy ({metric})",
        output_path=f"plots/box_perstudent_vs_aggexpert_by_case_{metric}.png"
    )

    # =====================================================
    # 3. Per-student vs Individual Experts
    # =====================================================

    df3 = per_student_second.dropna(subset=[metric]).copy()

    df3 = df3[df3["case"].isin(EXPERT_ORDER)]

    # --- HEATMAP ---
    df3_heat = (
        df3.groupby(["case", "proxy"], as_index=False)
        .agg({metric: "mean"})
    )

    pivot3 = df3_heat.pivot_table(
        index="proxy",
        columns="case",
        values=metric,
        aggfunc="mean"
    )
    pivot3 = reorder_columns(pivot3, EXPERT_ORDER)

    plt.figure(figsize=dynamic_figsize(len(pivot3), width=10))
    sns.heatmap(pivot3, annot=True, cmap="coolwarm", vmin=-1, vmax=1, center=0)
    plt.title(f"Per-student vs Individual Experts ({metric})")
    plt.xticks(rotation=45, ha="right")
    plt.tight_layout()
    plt.savefig(f"plots/heatmap_perstudent_vs_expert_{metric}.png", dpi=300)
    plt.close()

    # --- OVERALL BOXPLOT ---
    boxplot_with_stats(
        df3,
        x="proxy",
        y=metric,
        title=f"Per-student vs Individual Experts ({metric})",
        output_path=f"plots/box_perstudent_vs_expert_{metric}.png",
        n_description="n = number of (student × expert) correlations"
    )

    # --- GROUPED BOXPLOT BY EXPERT ---
    grouped_boxplot(
        df=df3,
        x="proxy",
        y=metric,
        hue="case",
        hue_order=EXPERT_ORDER,
        title=f"Per-student vs Individual Experts by Expert ({metric})",
        output_path=f"plots/box_perstudent_vs_expert_by_expert_{metric}.png"
    )

    # =====================================================
    # 4. Aggregated Students vs Individual Experts
    # =====================================================

    df4 = avg_vs_expert_df.copy()

    df4 = df4[df4["case"].isin(EXPERT_ORDER)]

    # --- HEATMAP ---
    df4_heat = (
        df4.groupby(["case", "proxy"], as_index=False)
        .agg({agg_col: "mean"})
    )

    pivot4 = df4_heat.pivot_table(
        index="proxy",
        columns="case",
        values=agg_col,
        aggfunc="mean"
    )
    pivot4 = reorder_columns(pivot4, EXPERT_ORDER)

    plt.figure(figsize=dynamic_figsize(len(pivot4), width=10))
    sns.heatmap(pivot4, annot=True, cmap="coolwarm", vmin=-1, vmax=1, center=0)
    plt.title(f"AVG (Students) vs Individual Experts ({metric})")
    plt.xticks(rotation=45, ha="right")
    plt.tight_layout()
    plt.savefig(f"plots/heatmap_avg_vs_expert_{metric}.png", dpi=300)
    plt.close()

    # --- OVERALL BOXPLOT ---
    boxplot_with_stats(
        df4,
        x="proxy",
        y=agg_col,
        title=f"Aggregated Students vs Individual Experts ({metric})",
        output_path=f"plots/box_avg_vs_expert_{metric}.png",
        n_description="n = number of experts"
    )

    # --- GROUPED BOXPLOT BY EXPERT ---
    grouped_boxplot(
        df=df4,
        x="proxy",
        y=agg_col,
        hue="case",
        hue_order=EXPERT_ORDER,
        title=f"Aggregated Students vs Individual Experts by Expert ({metric})",
        output_path=f"plots/box_avg_vs_expert_by_expert_{metric}.png"
    )

    # =====================================================
    # 5. Full Pairwise
    # =====================================================

    df_box4 = per_student_second.dropna(subset=[metric]).copy()

    boxplot_with_stats(
        df_box4,
        x="proxy",
        y=metric,
        title=f"Full Pairwise (Student vs Expert) ({metric})",
        output_path=f"plots/box_full_pairwise_{metric}.png",
        n_description="n = number of (student × expert) correlations"
    )

    # =====================================================
    # 6. TOP 10
    # =====================================================

    TOP_K = 10

    top_proxies = (
        df_box4.groupby("proxy")[metric]
        .mean()
        .sort_values(ascending=False)
        .head(TOP_K)
        .index
    )

    df_top = df_box4[df_box4["proxy"].isin(top_proxies)]

    boxplot_with_stats(
        df_top,
        x="proxy",
        y=metric,
        title=f"Top {TOP_K} Proxies (Full Pairwise) ({metric})",
        output_path=f"plots/box_full_pairwise_top10_{metric}.png",
        n_description="n = number of (student × expert) correlations"
    )

print("All plots saved in /plots")


# =====================================================
# EXTRA: Aggregated Students vs STRICT Experts ONLY
# =====================================================

for metric, agg_col in [
    ("spearman", "spearman_mean"),
    ("kendall", "kendall_mean")
]:
    print(f"Processing STRICT-only heatmap ({metric})...")

    df_strict = agg_df[agg_df["case"] == "strict"].copy()

    # Aggregate across expert rankings (since strict may have multiple configs)
    df_strict_heat = (
        df_strict.groupby("proxy", as_index=False)
        .agg({agg_col: "mean"})
    )

    # Convert to 2D format (single column heatmap)
    pivot_strict = (
        df_strict_heat
        .set_index("proxy")[[agg_col]]
        .sort_values(by=agg_col, ascending=False)  # BEST → WORST
    )
    plt.figure(figsize=dynamic_figsize(len(pivot_strict), width=6))
    sns.heatmap(
        pivot_strict,
        annot=True,
        cmap="coolwarm",
        vmin=-1,
        vmax=1,
        center=0,
        cbar=True
    )

    plt.title(f"AVG (Students) vs STRICT Experts ({metric})")
    plt.ylabel("Proxy")
    plt.xlabel("Strict")
    plt.tight_layout()

    plt.savefig(f"plots/heatmap_agg_vs_strict_{metric}.png", dpi=300)
    plt.close()


    # =====================================================
# EXTRA: Distributions for STRICT Experts ONLY
# =====================================================

for metric, agg_col in [
    ("spearman", "spearman_mean"),
    ("kendall", "kendall_mean")
]:
    print(f"Processing STRICT-only distributions ({metric})...")

    # ----------------------------------------
    # 1. Aggregated Students vs STRICT Experts
    # ----------------------------------------
    df_strict_agg = agg_df[agg_df["case"] == "strict"].copy()

    boxplot_with_stats(
        df=df_strict_agg,
        x="proxy",
        y=agg_col,
        title=f"Aggregated Students vs STRICT Experts ({metric})",
        output_path=f"plots/box_agg_vs_strict_{metric}.png",
        n_description="n = number of strict expert rankings"
    )

    # ----------------------------------------
    # 2. Per-student vs STRICT Experts
    # ----------------------------------------
    df_strict_per_student = per_student_df[
        (per_student_df["case"] == "strict")
    ].dropna(subset=[metric]).copy()

    boxplot_with_stats(
        df=df_strict_per_student,
        x="proxy",
        y=metric,
        title=f"Per-student vs STRICT Experts ({metric})",
        output_path=f"plots/box_perstudent_vs_strict_{metric}.png",
        n_description="n = number of student correlations (strict only)"
    )

    # ----------------------------------------
    # 3. Full Pairwise (Student vs Expert) STRICT only
    # ----------------------------------------
    df_strict_pairwise = per_student_df[
        (per_student_df["case"] == "strict")
    ].dropna(subset=[metric]).copy()

    boxplot_with_stats(
        df=df_strict_pairwise,
        x="proxy",
        y=metric,
        title=f"Full Pairwise (Student vs Expert, STRICT) ({metric})",
        output_path=f"plots/box_full_pairwise_strict_{metric}.png",
        n_description="n = (student × expert) correlations (strict only)"
    )

    # =====================================================
# PATCH: Add ordering support to boxplot helper
# =====================================================

def boxplot_with_stats_ordered(
    df,
    x,
    y,
    title,
    output_path,
    n_description=None,
    order=None
):
    plt.figure(figsize=(16, 6))
    # filter order to only existing proxies
    if order is not None:
        valid_order = [o for o in order if o in df[x].unique()]
    else:
        valid_order = None

    if df.empty or (valid_order is not None and len(valid_order) == 0):
        print(f"Skipping ordered boxplot (empty): {title}")
        return

    ax = sns.boxplot(data=df, x=x, y=y, order=valid_order)

    means = df.groupby(x)[y].mean().to_dict()
    counts = df.groupby(x)[y].count().to_dict()
    labels = [t.get_text() for t in ax.get_xticklabels()]

    ymin, ymax = ax.get_ylim()
    y_range = ymax - ymin
    ax.set_ylim(ymin, ymax + 0.06 * y_range)
    _, new_ymax = ax.get_ylim()

    for i, label in enumerate(labels):
        if label in means:
            ax.scatter(i, means[label], color="black", zorder=3, s=40)

        y_text = new_ymax - 0.05 * y_range

        if label in counts:
            ax.text(
                i,
                y_text,
                f"{counts[label]}",
                ha="center",
                va="baseline",
                fontsize=9
            )

    ax.text(
        -0.6,
        y_text,
        "n =",
        ha="right",
        va="baseline",
        fontsize=10
    )

    legend_elements = [
        Line2D([0], [0], marker="o", linestyle="None",
               markerfacecolor="black", markeredgecolor="black",
               label="Mean", markersize=6),
        Line2D([0], [0], marker="o", linestyle="None",
               markeredgecolor="black", markerfacecolor="none",
               label="Outliers", markersize=5)
    ]

    ax.legend(handles=legend_elements,
              loc="lower right",
              bbox_to_anchor=(1.0, 0.0),
              frameon=True,
              fontsize=10)

    ax.set_title(title, fontsize=13)
    ax.set_ylabel(y, fontsize=12)
    ax.set_xlabel("")
    ax.tick_params(axis="both", labelsize=12)

    plt.xticks(rotation=45, ha="right")
    plt.subplots_adjust(bottom=0.3, top=0.85)
    plt.savefig(output_path, dpi=300, bbox_inches="tight")
    plt.close()


# =====================================================
# STRICT-ONLY ANALYSIS (ORDERED)
# =====================================================

for metric, agg_col in [
    ("spearman", "spearman_mean"),
    ("kendall", "kendall_mean")
]:

    print(f"Processing STRICT-only plots ({metric})...")

    # ----------------------------------------
    # FILTER STRICT
    # ----------------------------------------
    df_strict_agg = agg_df[agg_df["case"] == "strict"].copy()

    # ----------------------------------------
    # CREATE ORDER (BEST → WORST)
    # ----------------------------------------
    strict_order = (
        df_strict_agg
        .groupby("proxy")[agg_col]
        .mean()
        .sort_values(ascending=False)
        .index
    )

    # ----------------------------------------
    # HEATMAP (already sorted)
    # ----------------------------------------
    df_heat = (
        df_strict_agg
        .groupby("proxy", as_index=False)
        .agg({agg_col: "mean"})
    )

    pivot_strict = (
        df_heat
        .set_index("proxy")[[agg_col]]
        .loc[strict_order]   # enforce SAME ordering
    )

    plt.figure(figsize=dynamic_figsize(len(pivot_strict), width=6))
    sns.heatmap(
        pivot_strict,
        annot=True,
        cmap="coolwarm",
        vmin=-1,
        vmax=1,
        center=0
    )

    plt.title(f"AVG (Students) vs STRICT Experts ({metric})")
    plt.ylabel("Proxy")
    plt.xlabel("Strict")
    plt.tight_layout()

    plt.savefig(f"plots/heatmap_agg_vs_strict_{metric}.png", dpi=300)
    plt.close()

    # ----------------------------------------
    # BOXPLOT: Aggregated Students vs STRICT
    # ----------------------------------------
    boxplot_with_stats_ordered(
        df=df_strict_agg,
        x="proxy",
        y=agg_col,
        order=strict_order,
        title=f"Aggregated Students vs STRICT Experts ({metric})",
        output_path=f"plots/box_agg_vs_strict_{metric}.png",
        n_description="n = number of strict expert rankings"
    )

    # ----------------------------------------
    # BOXPLOT: Per-student vs STRICT
    # ----------------------------------------
    df_strict_per_student = per_student_df[
        (per_student_df["case"] == "strict")
    ].dropna(subset=[metric]).copy()

    boxplot_with_stats_ordered(
        df=df_strict_per_student,
        x="proxy",
        y=metric,
        order=strict_order,
        title=f"Per-student vs STRICT Experts ({metric})",
        output_path=f"plots/box_perstudent_vs_strict_{metric}.png",
        n_description="n = student correlations (strict only)"
    )

    # ----------------------------------------
    # BOXPLOT: Full Pairwise STRICT
    # ----------------------------------------

    df_strict_pairwise = per_student_df[
        (per_student_df["case"] == "strict")
    ].dropna(subset=[metric]).copy()

    boxplot_with_stats_ordered(
        df=df_strict_pairwise,
        x="proxy",
        y=metric,
        order=strict_order,
        title=f"Full Pairwise (Student vs Expert, STRICT) ({metric})",
        output_path=f"plots/box_full_pairwise_strict_{metric}.png",
        n_description="n = (student × expert) correlations"
    )



    # =====================================================
# MAJORITY-ONLY ANALYSIS (ORDERED)  <-- NEW PATCH
# =====================================================

for metric, agg_col in [
    ("spearman", "spearman_mean"),
    ("kendall", "kendall_mean")
]:

    print(f"Processing MAJORITY-only plots ({metric})...")

    # ----------------------------------------
    # FILTER MAJORITY
    # ----------------------------------------
    df_majority_agg = agg_df[agg_df["case"] == "majority"].copy()

    if df_majority_agg.empty:
        print("Skipping majority (no data)")
        continue

    # ----------------------------------------
    # CREATE ORDER (BEST → WORST)
    # ----------------------------------------
    majority_order = (
        df_majority_agg
        .groupby("proxy")[agg_col]
        .mean()
        .sort_values(ascending=False)
        .index
    )

    # ----------------------------------------
    # HEATMAP (same style as strict)
    # ----------------------------------------
    df_heat = (
        df_majority_agg
        .groupby("proxy", as_index=False)
        .agg({agg_col: "mean"})
    )

    pivot_majority = (
        df_heat
        .set_index("proxy")[[agg_col]]
        .loc[majority_order]
    )

    plt.figure(figsize=dynamic_figsize(len(pivot_majority), width=6))
    sns.heatmap(
        pivot_majority,
        annot=True,
        cmap="coolwarm",
        vmin=-1,
        vmax=1,
        center=0
    )

    plt.title(f"AVG (Students) vs MAJORITY Experts ({metric})")
    plt.ylabel("Proxy")
    plt.xlabel("Majority")
    plt.tight_layout()

    plt.savefig(f"plots/heatmap_agg_vs_majority_{metric}.png", dpi=300)
    plt.close()

    # ----------------------------------------
    # BOXPLOT: Aggregated Students vs MAJORITY
    # ----------------------------------------
    boxplot_with_stats_ordered(
        df=df_majority_agg,
        x="proxy",
        y=agg_col,
        order=majority_order,
        title=f"Aggregated Students vs MAJORITY Experts ({metric})",
        output_path=f"plots/box_agg_vs_majority_{metric}.png",
        n_description="n = number of majority expert rankings"
    )

    # ----------------------------------------
    # BOXPLOT: Per-student vs MAJORITY
    # ----------------------------------------
    df_majority_per_student = per_student_df[
        (per_student_df["case"] == "majority")
    ].dropna(subset=[metric]).copy()

    boxplot_with_stats_ordered(
        df=df_majority_per_student,
        x="proxy",
        y=metric,
        order=majority_order,
        title=f"Per-student vs MAJORITY Experts ({metric})",
        output_path=f"plots/box_perstudent_vs_majority_{metric}.png",
        n_description="n = student correlations (majority only)"
    )

    # ----------------------------------------
    # BOXPLOT: Full Pairwise MAJORITY
    # ----------------------------------------
    df_majority_pairwise = per_student_df[
        (per_student_df["case"] == "majority")
    ].dropna(subset=[metric]).copy()

    boxplot_with_stats_ordered(
        df=df_majority_pairwise,
        x="proxy",
        y=metric,
        order=majority_order,
        title=f"Full Pairwise (Student vs Expert, MAJORITY) ({metric})",
        output_path=f"plots/box_full_pairwise_majority_{metric}.png",
        n_description="n = (student × expert) correlations"
    )