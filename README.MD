# On the Reliability of Code Comprehension Proxies — Replication Package

Replication package for the paper **"On the Reliability of Code Comprehension Proxies"**.
Contains the web application used to run the study, all collected data, and the analysis
scripts that reproduce every figure and table in the paper.

---

## Getting Started Guide

> Reviewers should be able to complete this section within 30 minutes.

### Prerequisites

Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose v2).
No other software is required.

### Download the artifact

Download the two Docker images from Zenodo:

- `code-comprehension-analysis.tar.gz` — Python analysis environment (all scripts + data baked in)
- `code-comprehension-web.tar.gz` — Spring Boot web application

Load them into Docker:

```bash
docker load < code-comprehension-analysis.tar.gz
docker load < code-comprehension-web.tar.gz
```

Expected output for each:
```
Loaded image: code-comprehension-analysis:latest
Loaded image: code-comprehension-web:latest
```

### Smoke test — verify the analysis environment

```bash
docker run --rm code-comprehension-analysis:latest python -c "import pandas, scipy, matplotlib; print('OK')"
```

Expected output:
```
OK
```

---

## Step-by-Step Instructions

### Part 1 — Reproduce all paper results (Figure 1, Table 1, Figures 3–11, Tables 7–8)

```bash
docker run --name analysis_run code-comprehension-analysis:latest python run_all.py
```

This single command reproduces all quantitative results in the paper.
It streams progress to the terminal and completes in under 5 minutes.

**What is reproduced:**

| Paper element | Output |
|---|---|
| Figure 1 (taxonomy tree) | printed to terminal |
| Table 1 (task categories) | printed to terminal |
| Figures 3–11 (all correlation results) | exact numerical values printed to terminal; PNG plots saved to `plots/` |
| Table 7 (student factors) | printed to terminal |
| Table 8 (cross-institution) | printed to terminal; scatter plots saved to `plots/` |

**Claims supported by the artifact:**
- All correlation values reported in Figures 3–11 (RQ1–RQ4)
- Figure 1 and Table 1: open coding taxonomy and task category distribution
- Table 7 (Appendix): impact of participant background and fatigue on proxies
- Table 8 (Appendix): cross-institution consistency between University 1 and University 2

**Claims not directly reproducible from this artifact:**
- The expert annotation process (Rounds 1–3) — the final consensus labels are stored in `students_graded.xlsx`; the raw round-by-round expert responses are in `experts_study/`
- The open coding process (Figure 2) — the final taxonomy is in `open_coding/FinalTreeWithNumbers.txt`; the log of coding decisions is in `open_coding/open_coding_logs.xlsx`

#### Retrieve generated plots and CSV files

```bash
mkdir -p results plots
docker cp analysis_run:/analysis/plots/. plots/
docker cp analysis_run:/analysis/correlation_results.csv results/
docker cp analysis_run:/analysis/per_student_correlations.csv results/
docker cp analysis_run:/analysis/correlation_results_second.csv results/
docker cp analysis_run:/analysis/per_student_correlations_second.csv results/
docker cp analysis_run:/analysis/student_factor_model_results.csv results/
docker cp analysis_run:/analysis/Uni1_vs_Uni2_merged.csv results/
docker rm analysis_run
```

#### Explore interactively or run individual scripts

```bash
docker run -it --rm code-comprehension-analysis:latest bash
# inside the container:
python show_all_figs_data.py
python generate_table1.py
python analyze_student_factors.py
# etc.
```

---

### Part 2 — Run the web application (study platform)

```bash
docker run -p 8080:8080 code-comprehension-web:latest
```

Wait for `Started Main in X.XXX seconds`, then open `http://localhost:8080`.

See `App/README.md` in the Zenodo archive for study entry points and demo login credentials.

To stop: `Ctrl+C`.

---

## Artifact Layout

```
.
├── README.MD                  ← this file
├── REQUIREMENTS               ← hardware/software requirements
├── STATUS                     ← badge applications
├── LICENSE                    ← MIT + CC BY 4.0
├── Dockerfile                 ← web application image (used to build code-comprehension-web.tar.gz)
├── Dockerfile.analysis        ← Python analysis image (used to build code-comprehension-analysis.tar.gz)
├── docker-compose.yml         ← alternative orchestration (for building from source)
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

## Additional Materials

### Inter-rater agreement

Run inside the analysis container (`docker run -it --rm code-comprehension-analysis:latest bash`):

```bash
python gradings/kappa_for_gradings.py
python open_coding/kappa_open_coding.py
```

### Expert study statistics (Table 4)

```bash
cat experts_study/rounds_stats.txt
```

---

## Building from Source (optional)

If you prefer to build the Docker images yourself instead of loading from Zenodo:

```bash
git clone https://github.com/erfan-arvan/on-the-reliability-of-code-comprehension-proxies-replication.git
cd on-the-reliability-of-code-comprehension-proxies-replication

# Analysis image
docker build -t code-comprehension-analysis:latest -f Dockerfile.analysis .

# Web application image
docker build -t code-comprehension-web:latest -f Dockerfile .
```
