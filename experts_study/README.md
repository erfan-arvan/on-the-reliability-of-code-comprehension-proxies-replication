# Expert Study

Materials from the three-round Delphi expert-consensus study (paper section 4). Five
professional software engineers ("Expert A"-"Expert E" in the paper) independently
ranked the 8 code snippets by comprehension difficulty, then went through two more
rounds of anonymized feedback and re-ranking until the ordering stabilized. This is
a **ranking/consensus-building process, not an annotation or labeling task** — no
labels are produced or stored in `students_graded.xlsx` (that file is the unrelated
student study; see the top-level README for that).

| File | Description |
|---|---|
| `rounds_stats.txt` | Per-round rankings from all 5 experts, plus a breakdown of hard disagreements (opposite orderings), soft disagreements (tie vs. ordered), and agreements for each snippet pair. |
| `disagreement_points.js` | The specific snippet pairs shown back to experts in Rounds 2 and 3 for reconsideration (machine-readable, used by the web app) |
| `experts_registration_data.json` | Recruitment/eligibility responses for expert candidates: years of professional and Java experience, promotion/mentoring history, and project domains/types (paper section 4.1). Names, emails, company names, and job titles have been redacted; free-text answers have had employer names redacted in place. |
| `round1_submissions_raw.json`, `round2_submissions_raw.json`, `round3_submissions_raw.json` | Raw per-round Delphi submissions (rankings + written justifications) as stored by the study platform, keyed by pseudonymous username (`expertA`-`expertE`), with snippet IDs local to each expert's randomized presentation order. Real names have been removed. Used by `generate_stats_round{1,2,3}.py` and `generate_table4.py`. |
| `round1_submissions_transfered.json`, `round2_submissions_transfered.json`, `round3_submissions_transfered.json` | The same submissions after snippet IDs are normalized to their original (global) numbering, as carried over for presentation to experts in the next round. Used by `generate_table3.py` and `generate_table6.py`. |
| `generate_stats_round1.py`, `generate_stats_round2.py`, `generate_stats_round3.py` | Compute pairwise agreement/soft-agreement/disagreement counts for a single round from its `*_submissions_raw.json` file. Run with `python generate_stats_roundN.py`. |
| `generate_table3.py` | Extracts each expert's final ranking from `round3_submissions_transfered.json` (Table 3). Run with `python generate_table3.py`. **Note:** the result for Expert A, `(1 = 2) -> (3 = 5) -> 4 -> (7 = 8) -> 6`, differs from the paper's printed Table 3, `(1 = 2) -> 3 -> (4 = 5) -> (7 = 8) -> 6` (snippets 3 and 4 transposed) — this appears to be a transcription error in the paper, not a data issue; Experts B-E match exactly. |
| `generate_table4.py` | Aggregates all three rounds into the Table 4 summary (Round, Agreements, Soft Agreements, Disagreements, Total). Run with `python generate_table4.py`; reproduces the paper's Table 4 exactly (Round 1: 13/2/13/28, Round 2: 17/1/10/28, Round 3: 21/3/4/28). |
| `generate_table6.py` | Derives the four expert-aggregation strategies (Strict, Unanimous up to ties, 1 violation, Majority) from the final rankings in `round3_submissions_transfered.json`, and reports the count and representative examples of maximal-length valid rankings under each — reproducing Table 6 exactly (4/6/14/1 rankings respectively). Run with `python generate_table6.py`, or `--full` to print every valid ranking instead of a few examples. |
