import pandas as pd

df = pd.read_excel("students_graded.xlsx")

cols = [
    "javaExperience.s.ClassMates",
    "javaExperience.s.JavaExperience",
    "javaExperience.s.Logical",
    "javaExperience.s.ObjectOriented",
    "javaExperience.s.PE"
]

# define ranges for each column
ranges = {
    "javaExperience.s.ClassMates": "1-5",
    "javaExperience.s.JavaExperience": "1-5",
    "javaExperience.s.Logical": "1-5",
    "javaExperience.s.ObjectOriented": "1-5",
    "javaExperience.s.PE": "1-10"
}

def extract_numeric(val):
    if pd.isna(val):
        return None
    val = str(val)

    if "Less than 1 year" in val:
        return 1.0
    if "1–2 years" in val:
        return 2.0
    if "3–4 years" in val:
        return 3.0
    if "5+ years" in val:
        return 5.0

    return float(val.split()[0])

# header
print("column,mean,std,min,max")

for col in cols:
    numeric = df[col].apply(extract_numeric)

    col_name = f"{col} ({ranges[col]})"

    print(
        f"{col_name},"
        f"{numeric.mean():.3f},"
        f"{numeric.std():.3f},"
        f"{numeric.min()},"
        f"{numeric.max()}"
    )
