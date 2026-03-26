import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import os

sns.set_theme(style="whitegrid", context="paper", font_scale=1.2)

df = pd.read_csv("correlation_results.csv")

# choose aggregation strategy (recommended: avg)
df = df[df["aggregation"] == "avg"].copy()

# rename columns
df = df.rename(columns={
    "spearman_mean": "spearman",
    "kendall_mean": "kendall"
})

case_order = [
    "CASE1_strict",
    "CASE2_unanimous_up_to_ties",
    "CASE3_one_violation",
    "CASE4_majority",
    "CASE5_mean_rank"
]

df["case"] = pd.Categorical(df["case"], categories=case_order, ordered=True)

os.makedirs("plots3", exist_ok=True)

# ---------------------------------------
# BOX: proxy distribution within each case
# ---------------------------------------

g = sns.catplot(
    data=df,
    x="proxy",
    y="spearman",
    col="case",
    kind="box",
    col_wrap=3,
    height=4,
    sharey=True
)

g.set_xticklabels(rotation=45)

plt.savefig("plots3/boxplot_proxy_case_spearman.png", dpi=400)
plt.close()


# ---------------------------------------
# BOX: case distribution across proxies
# ---------------------------------------

plt.figure(figsize=(10,6))

sns.boxplot(
    data=df,
    x="case",
    y="spearman",
    hue="proxy"
)

plt.xticks(rotation=45)

plt.tight_layout()
plt.savefig("plots3/boxplot_case_proxy_spearman.png", dpi=400)
plt.close()


# ---------------------------------------
# KENDALL versions
# ---------------------------------------

g = sns.catplot(
    data=df,
    x="proxy",
    y="kendall",
    col="case",
    kind="box",
    col_wrap=3,
    height=4,
    sharey=True
)

g.set_xticklabels(rotation=45)

plt.savefig("plots3/boxplot_proxy_case_kendall.png", dpi=400)
plt.close()


plt.figure(figsize=(10,6))

sns.boxplot(
    data=df,
    x="case",
    y="kendall",
    hue="proxy"
)

plt.xticks(rotation=45)

plt.tight_layout()
plt.savefig("plots3/boxplot_case_proxy_kendall.png", dpi=400)
plt.close()

print("Plots saved to plots3/")
