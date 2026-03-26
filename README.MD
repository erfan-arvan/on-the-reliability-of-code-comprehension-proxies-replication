# Replication Package  
## On the Reliability of Code Comprehension Proxies

This repository contains all data, scripts, and analysis artifacts used in the paper. It supports full reproduction of the results, including proxy computation, correlation analysis, and visualization.

---

# Repository Structure

## Input Data

- `students_graded.xlsx`  
  Main dataset containing student responses, including time, accuracy, and subjective ratings.

- `studentsFinal.json`  
  Snippet order per participant.

- `function_grades.xlsx`, `all_real_gradings.xlsx`  
  Grading data for free-response function summaries.

- `cs_knowledge_results.xlsx`  
  Background knowledge results.

- `background_stats.csv`, `background_vs_experts.csv`  
  Processed background variables.

---

## Core Analysis Scripts

### Correlation Analysis

- `correlate_expert_vs_students.py`  
  Computes correlations between aggregated student proxies and expert rankings.

- `correlate_single_expert_vs_students.py`  
  Computes correlations with individual expert rankings.

---

## Factor and Regression Analysis

- `analyze_student_factors.py`  
  Analyzes effects of participant characteristics.

  **Outputs:**
  - `student_factor_model_results.csv`
  - `student_factor_model_results_raw_time.csv`

- `student_factor_long_question*.csv`  
- `student_factor_long_snippet*.csv`  
  Long-format datasets used for modeling.

  Tie-related analysis outputs.

---

## Plotting and Visualization

- `plot_all.py`  
  Generates main figures.

- `plot_proxy_results.py`, `plot_proxy_results_single.py`  
  Visualizes correlation results.

- `plot_proxy_stats.py`  
  Summary statistics plots.

- `plot_case_dist.py`  
  Distribution of ranking cases.

---

## Output Files

### Correlation Results

- `correlation_results.csv`  
  Main results.

- `correlation_results_single.csv`  
  Per-student results.

- `correlation_results_second.csv`  
  Alternative analysis results.

---

### Per-Student Results

- `per_student_correlations.csv`  
- `per_student_correlations_single.csv`  
- `per_student_rankings.xlsx`  

---

## Cross-Institution Analysis

- `compare_University1_University2_correlations.py`  
  Compares proxy performance across institutions.
---

# Key Outputs

The main results are derived from:

- `correlation_results.csv`
- `proxy_noise_summary.csv`
- `student_factor_model_results.csv`

# How to Run

```bash
python correlate_expert_vs_students.py
python plot_all.py
