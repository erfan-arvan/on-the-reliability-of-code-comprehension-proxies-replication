"""
generate_table2.py

Recreates "Table 2" (Frequency of comprehension measure types) from the raw
per-study CSV data (relatedwork/Table2-data.csv), which has one binary column
per measure type and one row per study.

Usage:
    python3 generate_table2.py [path/to/Table2-data.csv]

If no path is given, it defaults to "relatedwork/Table2-data.csv" relative to
the current directory.
"""

import sys
import csv
from collections import OrderedDict

# Fixed display order for measure types (matches the source table).
MEASURE_COLUMNS = OrderedDict([
    ("Correctness", "m: correctness"),
    ("Time", "m: time"),
    ("Subjective rating", "m: subjective rating"),
    ("Physiological", "m: physiological"),
    ("Aggregation", "m: combination (aggregation)"),
    ("Others", "m: others"),
])


def load_counts(csv_path):
    """Sum each binary measure-type column across all studies."""
    counts = OrderedDict((label, 0) for label in MEASURE_COLUMNS)

    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            for label, col in MEASURE_COLUMNS.items():
                value = row[col].strip()
                if value:
                    counts[label] += int(float(value))

    return counts


def print_table(counts):
    labels = list(counts.keys())
    left, right = labels[: len(labels) // 2], labels[len(labels) // 2 :]

    name_w = max(len(l) for l in labels)
    print(f"{'Measure Type':<{name_w}}  Studies    {'Measure Type':<{name_w}}  Studies")
    print("-" * (name_w + 11) + "  " + "-" * (name_w + 11))
    for l, r in zip(left, right):
        print(f"{l:<{name_w}}  {counts[l]:>7}    {r:<{name_w}}  {counts[r]:>7}")


def main():
    csv_path = sys.argv[1] if len(sys.argv) > 1 else "relatedwork/Table2-data.csv"
    counts = load_counts(csv_path)
    print_table(counts)


if __name__ == "__main__":
    main()
