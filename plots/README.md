# Plots

Generated figures corresponding to Figures 3–11 and Table 8 in the paper,
plus supplementary breakdowns. All files are created automatically when
running `python run_all.py` (via `plot_all.py` and
`compare_University1_University2_correlations.py`).

| File pattern | Paper figure |
|---|---|
| `heatmap_agg_vs_agg_*.png` | Figures 3–4 (heatmaps: aggregated students vs. aggregated experts) |
| `box_agg_vs_agg_*.png` | Figure 5 (distribution: aggregated students vs. aggregated experts) |
| `heatmap_avg_vs_expert_*.png` | Figure 6 (heatmap: aggregated students vs. individual experts) |
| `box_avg_vs_expert_*.png` | Figure 7 (distribution: aggregated students vs. individual experts) |
| `heatmap_perstudent_vs_aggexpert_*.png` | Figure 8 (heatmap: per-student vs. aggregated experts) |
| `box_perstudent_vs_aggexpert_*.png` | Figure 9 (distribution: per-student vs. aggregated experts) |
| `heatmap_perstudent_vs_expert_*.png` | Figure 10 (heatmap: per-student vs. individual experts) |
| `box_perstudent_vs_expert_*.png` | Figure 11 (distribution: per-student vs. individual experts) |
| `Uni1_vs_Uni2_*.png` | Table 8 scatter plots (cross-institution consistency) |

### Supplementary breakdowns (not individually numbered in the paper)

`agg_df`/`per_student_df` group expert consensus by `case` — the criterion
used to combine the 5 experts' rankings into one reference ranking
(`strict`, `unanimous_up_to_ties`, `1_violation`, or `majority`; see
`EXPERT_RANKINGS` in `correlate_expert_vs_students.py`). The plots above
already show all four cases together (as heatmap columns / boxplot hues).
These extra files isolate or slice that same data differently:

| File pattern | What it shows |
|---|---|
| `*_by_case_*.png` | Same aggregated-students comparison as above, broken out per expert-consensus case instead of pooled |
| `*_by_expert_*.png` | Same comparison, broken out per individual expert (A–E) instead of pooled |
| `*_vs_majority_*.png` | Same comparisons, restricted to the `majority`-consensus case only |
| `box_full_pairwise_*.png` | Distribution over every individual (student × expert) correlation pair, unaggregated |
| `box_full_pairwise_top10_*.png` | Same as above, restricted to the 10 proxies with the highest mean correlation |

The exact numerical values used to produce each figure are also printed to the terminal during `run_all.py`.
