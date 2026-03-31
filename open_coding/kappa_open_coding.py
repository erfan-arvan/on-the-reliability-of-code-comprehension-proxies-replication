import pandas as pd
from sklearn.metrics import cohen_kappa_score

file_path = "open_coding_logs.xlsx"
df = pd.read_excel(file_path)

# Clean column names
df.columns = df.columns.str.strip()

col1 = "Map1"
col2 = "Map2"

# Keep only needed columns
df = df[[col1, col2]]

# Drop missing values
df = df.dropna()

df[col1] = df[col1].astype(str).str.strip()
df[col2] = df[col2].astype(str).str.strip()

# Compute kappa
kappa = cohen_kappa_score(df[col1], df[col2])
print("Cohen's kappa:", round(kappa, 4))

# Agreement
agreement = (df[col1] == df[col2]).mean()
# print("Observed agreement:", round(agreement, 4))

# Debug: check weird values
# print("\nUnique values Map1:", df[col1].unique())
# print("Unique values Map2:", df[col2].unique())