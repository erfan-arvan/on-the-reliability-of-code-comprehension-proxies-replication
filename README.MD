# Replication Package  
## On the Reliability of Code Comprehension Proxies

This repository contains the data, scripts, and analysis artifacts used in the paper. It supports reproduction of the main results, including proxy computation, correlation analysis, and visualization.

---

# Repository Structure

## Input Data

- `students_graded.xlsx`  
  Main dataset containing student responses, including time, accuracy, and subjective ratings.

- `cs_knowledge_results.xlsx`  
  Background knowledge results.

---

## Study Materials

- `code_snippets/`  
  Contains all selected repositories, code snippets, comprehension questions, and survey instruments used in the study.

- `open_coding/`  
  Contains the results of the open-coding study used to categorize comprehension tasks.

- `gradings/`  
  Contains grading data and materials for evaluating free-response function questions.

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
  Analyzes the effects of participant characteristics.

  **Outputs:**
  - `student_factor_model_results.csv`
  - `student_factor_model_results_raw_time.csv`

- `student_factor_long_question*.csv`  
- `student_factor_long_snippet*.csv`  
  Long-format datasets used for modeling and analysis.

---

## Plotting and Visualization

- `plot_all.py`  
  Generates the main figures used in the paper.

---

## Output Files

### Correlation Results

- `correlation_results.csv`  
  Main results (aggregated students vs aggregated experts).

- `correlation_results_single.csv`  
  Per-student correlation results.

- `correlation_results_second.csv`  
  Results based on individual expert comparisons.

---

### Per-Student Results

- `per_student_correlations.csv`  
- `per_student_correlations_single.csv`  
- `per_student_rankings.xlsx`  

---

## Cross-Institution Analysis

- `compare_University1_University2_correlations.py`  
  Compares proxy performance across the two student populations.

---

# Key Outputs

The main results of the paper are derived from:

- `correlation_results.csv`
- `student_factor_model_results.csv`

---

# How to Run

```bash
python correlate_expert_vs_students.py
python plot_all.py