# On the Reliability of Code Comprehension Proxies — Replication Package

This repository contains the full replication package for the paper
**"On the Reliability of Code Comprehension Proxies"**, including the web
application used to run the study, all collected data, and the analysis
scripts that reproduce every figure and table in the paper.

---

## Getting Started Guide

> Reviewers should be able to complete this section within 30 minutes.

### Prerequisites

Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose v2).
No other software is required.

### Clone the repository

```bash
git clone https://github.com/erfan-arvan/on-the-reliability-of-code-comprehension-proxies-replication.git
cd on-the-reliability-of-code-comprehension-proxies-replication
```

### Smoke test — verify the analysis environment works

```bash
docker compose --profile analysis run --rm analysis python -c "import pandas, scipy, matplotlib; print('OK')"
```

Expected output:
```
OK
```

### Smoke test — verify the web application builds

```bash
docker compose build web
```

Expected output ends with: `naming to docker.io/library/...-web`

---

## Step-by-Step Instructions

### Part 1 — Reproduce all paper results (Figures 3–11, Tables 1, 7, 8)

Run the full analysis pipeline:

```bash
docker compose --profile analysis run --name analysis_run analysis python run_all.py
```

This single command reproduces all quantitative results in the paper.
It streams progress to the terminal and completes in under 5 minutes.

**What is generated:**

| Paper element | Script | Output |
|---|---|---|
| Table 1 (task categories) | `generate_table1.py` | printed to terminal |
| Figures 3–5 (agg. students vs agg. experts) | `correlate_expert_vs_students.py` + `plot_all.py` | `plots/heatmap_agg_vs_agg_*.png`, `plots/box_agg_vs_agg_*.png` |
| Figures 6–7 (agg. students vs individual experts) | `correlate_single_expert_vs_students.py` + `plot_all.py` | `plots/heatmap_avg_vs_expert_*.png`, `plots/box_avg_vs_expert_*.png` |
| Figures 8–9 (per-student vs agg. experts) | `correlate_expert_vs_students.py` + `plot_all.py` | `plots/heatmap_perstudent_vs_aggexpert_*.png`, `plots/box_perstudent_vs_aggexpert_*.png` |
| Figures 10–11 (per-student vs individual experts) | `correlate_single_expert_vs_students.py` + `plot_all.py` | `plots/heatmap_perstudent_vs_expert_*.png`, `plots/box_perstudent_vs_expert_*.png` |
| Exact values for Figures 3–11 | `show_all_figs_data.py` | printed to terminal |
| Table 7 (student factors) | `analyze_student_factors.py` | printed to terminal + `student_factor_model_results.csv` |
| Table 8 (cross-institution) | `compare_University1_University2_correlations.py` | printed to terminal + `plots/Uni1_vs_Uni2_*.png` |

Generated plots appear in the `plots/` directory in your local checkout.

**Claims supported by the artifact:**
- All correlation values reported in Figures 3–11 (RQ1–RQ4)
- Table 1: task category distribution across prior studies
- Table 7 (Appendix): impact of participant background and fatigue on proxies
- Table 8 (Appendix): cross-institution consistency between University 1 and University 2

**Claims not directly reproducible from this artifact:**
- The expert annotation process (Rounds 1–3) — the final consensus labels are stored in `students_graded.xlsx`; the raw round-by-round expert responses are archived in `experts_study/`
- The open coding taxonomy (Figure 1, Figure 2) — the final taxonomy is in `open_coding/FinalTreeWithNumbers.txt`; the log of coding decisions is in `open_coding/open_coding_logs.xlsx`

#### Retrieve output CSV files locally

```bash
mkdir -p results
docker cp analysis_run:/analysis/correlation_results.csv results/
docker cp analysis_run:/analysis/per_student_correlations.csv results/
docker cp analysis_run:/analysis/correlation_results_second.csv results/
docker cp analysis_run:/analysis/per_student_correlations_second.csv results/
docker cp analysis_run:/analysis/student_factor_model_results.csv results/
docker cp analysis_run:/analysis/Uni1_vs_Uni2_merged.csv results/
docker rm analysis_run
```

---

### Part 2 — Run the web application (study platform)

```bash
docker compose up --build
```

Wait for `Started Main in X.XXX seconds`, then open `http://localhost:8080`.

See `App/README.md` for study entry points and demo login credentials.

To stop: `Ctrl+C` then `docker compose down`.

---

### Part 3 — Run individual scripts or explore interactively

```bash
docker compose --profile analysis run --rm analysis bash
# inside the container:
python correlate_expert_vs_students.py
python show_all_figs_data.py
python generate_table1.py
# etc.
```

---

## Artifact Layout

```
.
├── README.MD                  ← this file
├── REQUIREMENTS               ← hardware/software requirements
├── STATUS                     ← badge applications
├── LICENSE                    ← MIT + CC BY 4.0
├── Dockerfile                 ← web application image
├── Dockerfile.analysis        ← Python analysis image
├── docker-compose.yml         ← orchestrates both services
├── requirements.txt           ← Python dependencies
│
├── students_graded.xlsx       ← MAIN DATASET (all student responses, timing, accuracy)
├── Table1-data.csv            ← raw data for Table 1
│
├── *.py                       ← analysis scripts (see table above)
├── *.csv                      ← pre-computed intermediate data files
│
├── plots/                     ← generated figures (Figures 3–11)
│
├── App/                       ← web application (Spring Boot + client)
│   ├── README.md              ← app-specific instructions and demo credentials
│   └── ServerApp/             ← Maven project
│
├── study_materials/           ← all study instruments
│   ├── snippets_and_tasks.md  ← 8 code snippets and comprehension tasks (human-readable)
│   ├── familiarity_survey.md  ← background knowledge survey (human-readable)
│   ├── experience_survey.md   ← Java experience questionnaire (human-readable)
│   ├── tasks_per_snippet.js   ← same as above (machine-readable, used by web app)
│   ├── familaritySurvey.js    ← same as above (machine-readable, used by web app)
│   ├── javaExperienceQuestions.js ← same as above (machine-readable, used by web app)
│   ├── snippets-implementations.java ← full source of the 8 selected methods
│   ├── selected_methods.csv   ← all candidate methods before selection
│   ├── repositories.csv       ← source repositories used
│   └── question_design_process_and_prompts_used.txt
│
├── open_coding/               ← open coding study materials
│   ├── FinalTreeWithNumbers.txt ← taxonomy (Figure 1)
│   ├── open_coding_logs.xlsx  ← inter-rater coding decisions
│   └── kappa_open_coding.py   ← inter-rater agreement (Cohen's kappa)
│
├── gradings/                  ← function-question grading
│   ├── function_question_grading_log.xlsx
│   └── kappa_for_gradings.py  ← inter-rater agreement (Cohen's kappa)
│
└── experts_study/             ← expert study materials
    ├── disagreement_points.js ← items shown to experts in Rounds 2 & 3
    └── rounds_stats.txt       ← expert study round statistics (Table 4)
```

---

## Dataset Description

### `students_graded.xlsx` (main dataset)

One row per (student × snippet × task). Key columns:

| Column | Description |
|---|---|
| `student_id` | Anonymous participant identifier |
| `university` | University 1 (n=37) or University 2 (n=7) |
| `snippet_id` | Snippet number (1–8) |
| `acc_output` | Accuracy on output-prediction task (0–1) |
| `acc_syntaxBL` | Accuracy on syntax/binary task (0 or 1) |
| `acc_function` | Accuracy on function-description task (graded 0–3, normalized) |
| `time_output` | Time spent on output-prediction task (seconds) |
| `time_syntaxBL` | Time spent on syntax/binary task (seconds) |
| `time_function` | Time spent on function-description task (seconds) |
| `readTime` | Time spent reading the snippet before tasks (seconds) |
| `scaleSM` | Likert rating: snippet difficulty (1–5) |
| `scaleST` | Likert rating: task difficulty (1–5) |
| Background columns | Java experience, OOP experience, prior programming exposure, etc. |

---

## Running without Docker

### Web application
**Prerequisites:** JDK 17+, Maven 3.8+
```bash
cd App/ServerApp && mvn spring-boot:run
```
Then open `http://localhost:8080`.

### Analysis scripts
```bash
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python run_all.py
```

---

## Additional Materials

### Inter-rater agreement

```bash
# Grading agreement (Cohen's kappa for function-description grading)
python gradings/kappa_for_gradings.py

# Open coding agreement
python open_coding/kappa_open_coding.py
```

### Expert study statistics (Table 4)

```bash
cat experts_study/rounds_stats.txt
```

### Taxonomy (Figure 1)

```bash
cat open_coding/FinalTreeWithNumbers.txt
```
