"""
generate_table1.py

Recreates "Table 1" (Task Category / Task / Number of Studies) from the raw
per-study CSV data (relatedwork/Table1-data.csv), which has one row per (task, study).

Usage:
    python3 generate_table1.py [path/to/Table1-data.csv]

If no path is given, it defaults to "relatedwork/Table1-data.csv" relative to
the current directory.
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
    tasks listed below it with the count right-aligned a short distance
    after the task name. Column width is based on the content itself
    (not stretched to the terminal edge), but long lines still wrap to
    fit narrow terminals."""
    if width is None:
        width = shutil.get_terminal_size(fallback=(80, 20)).columns
    width = max(width, 30)  # sane floor so things don't collapse entirely

    categories = ordered_categories(counts)
    indent = "  "
    gap = "  "  # space between task name and its count

    for cat_i, cat in enumerate(categories):
        total = sum(counts[cat].values())
        header = f"{cat}  ({total} studies)"
        for line in textwrap.wrap(header, width=width) or [header]:
            print(line)
        print("-" * min(width, len(cat)))

        tasks = sorted(counts[cat].items(), key=lambda kv: (-kv[1], kv[0]))
        # Natural column width: just wide enough for the longest task name
        # in this category, capped so it still fits the terminal.
        num_w = max((len(str(n)) for _, n in tasks), default=1)
        max_task_w = max((len(t) for t, _ in tasks), default=0)
        task_w = min(max_task_w, width - len(indent) - len(gap) - num_w)

        for task, n in tasks:
            num_str = str(n)
            if len(task) <= task_w:
                print(f"{indent}{task:<{task_w}}{gap}{num_str:>{num_w}}")
            else:
                wrapped = textwrap.wrap(task, width=max(task_w, 10))
                for wline in wrapped[:-1]:
                    print(f"{indent}{wline}")
                last = wrapped[-1]
                print(f"{indent}{last:<{task_w}}{gap}{num_str:>{num_w}}")

        if cat_i < len(categories) - 1:
            print()


def main():
    csv_path = sys.argv[1] if len(sys.argv) > 1 else "relatedwork/Table1-data.csv"
    counts = load_counts(csv_path)
    print_table(counts)


if __name__ == "__main__":
    main()