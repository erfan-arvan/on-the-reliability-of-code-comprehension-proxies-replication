import pandas as pd
import numpy as np
from sklearn.metrics import cohen_kappa_score

# === 1. Load file ===
df = pd.read_excel("function_question_grading_log.xlsx")

# === 2. Extract paired ratings ===
rater1_scores = []
rater2_scores = []

grader_cols = ["author1", "author2", "author3", "author4"]

for _, row in df.iterrows():
    scores = []
    
    for col in grader_cols:
        val = row[col]
        if pd.notna(val):
            try:
                scores.append(int(val))
            except:
                pass  # ignore non-numeric garbage
    
    # keep only rows with exactly 2 ratings
    if len(scores) == 2:
        rater1_scores.append(scores[0])
        rater2_scores.append(scores[1])

# === 3. Convert to numpy arrays ===
r1 = np.array(rater1_scores)
r2 = np.array(rater2_scores)

print(f"Total paired items used: {len(r1)}")

# === 4. Compute Cohen's kappa ===

# unweighted
kappa_unweighted = cohen_kappa_score(r1, r2)

# quadratic weighted
kappa_weighted = cohen_kappa_score(r1, r2, weights='quadratic')

# print("Cohen's kappa (unweighted):", round(kappa_unweighted, 4))
print("Cohen's kappa (quadratic weighted):", round(kappa_weighted, 4))
