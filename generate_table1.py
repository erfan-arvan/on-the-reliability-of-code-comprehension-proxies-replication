"""
generate_table1.py

Recreates "Table 1" (Task Category / Task / Number of Studies) from the raw
per-study CSV data (Table1-data.csv), which has one row per (task, study).

Usage:
    python3 generate_table1.py [path/to/Table1-data.csv]

If no path is given, it defaults to "Table1-data.csv" in the current
directory.
"""

import sys
import csv
import shutil
import textwrap
from collections import OrderedDict, defaultdict

# Fixed display order for task categories (matches the source table).
CATEGORY_ORDER = [
    "Tc1: Provide information about the code",
    "Tc2: Provide personal opinion",
    "Tc3: Debug code",
    "Tc4: Maintain code",
]

# The source CSV mis-tags a few Task Type rows with the wrong Task Category
# (verified against the original published table). Force these task types
# into their correct category regardless of what the CSV row says.
CATEGORY_OVERRIDES = {
    "Fix a bug": "Tc4: Maintain code",
    "Determine if code is correct": "Tc4: Maintain code",
    "Extend the code": "Tc3: Debug code",
}


def load_counts(csv_path):
    """Count number of studies per (Task Category, Task Type)."""
    counts = defaultdict(lambda: defaultdict(int))

    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            category = row["Task Category"].strip()
            task = row["Task Type"].strip()
            if not category or not task:
                continue
            category = CATEGORY_OVERRIDES.get(task, category)
            counts[category][task] += 1

    return counts


def ordered_categories(counts):
    """Return category names in a sensible order: known order first,
    then any unrecognized categories alphabetically."""
    known = [c for c in CATEGORY_ORDER if c in counts]
    extra = sorted(c for c in counts if c not in CATEGORY_ORDER)
    return known + extra


def print_table(counts, width=None):
    """Print a responsive layout: each category on its own header line,
    tasks listed below it with dot-leaders connecting the name to its
    count. Width adapts to the current terminal so it stays readable
    whether the window is full-screen or narrow."""
    if width is None:
        width = shutil.get_terminal_size(fallback=(80, 20)).columns
    width = max(width, 30)  # sane floor so things don't collapse entirely

    categories = ordered_categories(counts)
    indent = "  "

    print("=" * width)
    print("TABLE 1: Task categories and types")
    print("=" * width)

    for cat_i, cat in enumerate(categories):
        total = sum(counts[cat].values())
        header = f"{cat}  ({total} studies)"
        for line in textwrap.wrap(header, width=width) or [header]:
            print(line)
        print("-" * min(width, len(cat)))

        tasks = sorted(counts[cat].items(), key=lambda kv: (-kv[1], kv[0]))
        for task, n in tasks:
            num_str = str(n)
            avail = width - len(indent) - len(num_str) - 1  # space before number
            if len(task) > avail:
                # Wrap long task names; put the count after the last line.
                wrapped = textwrap.wrap(task, width=max(avail, 10))
                for wline in wrapped[:-1]:
                    print(f"{indent}{wline}")
                last = wrapped[-1]
                dots = max(1, avail - len(last))
                print(f"{indent}{last} {'.' * dots} {num_str}")
            else:
                dots = max(1, avail - len(task))
                print(f"{indent}{task} {'.' * dots} {num_str}")

        if cat_i < len(categories) - 1:
            print()


def main():
    csv_path = sys.argv[1] if len(sys.argv) > 1 else "Table1-data.csv"
    counts = load_counts(csv_path)
    print_table(counts)


if __name__ == "__main__":
    main()