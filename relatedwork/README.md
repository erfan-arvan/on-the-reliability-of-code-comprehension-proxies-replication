# Related Work Survey Data

Raw per-study data from the survey of prior code comprehension literature
(paper section 2), extending the taxonomy from Wyrich et al. with studies
published through March 2026. One row per prior study surveyed.

| File | Description |
|---|---|
| `Table1-data.csv` | One row per (task, study): which comprehension task category and task type each study used. Aggregated into Table 1 (task categories and types) by `generate_table1.py` at the repo root. |
| `Table2-data.csv` | One row per study: binary flags for which comprehension measure types (physiological, correctness, time, subjective rating, aggregation, others) and task categories (Tc1-Tc4) it used. Aggregated into Table 2 (measure type frequency) by `generate_table2.py` at the repo root. |
