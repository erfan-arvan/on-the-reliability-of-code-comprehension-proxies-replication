#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import subprocess
import sys

# These scripts generate intermediate CSVs/plots — run silently
PREP_COMMANDS = [
    "correlate_expert_vs_students.py",
    "correlate_single_expert_vs_students.py",
    "plot_all.py",
]

# Each entry: (label shown to user, script filename, working directory or None for repo root)
OUTPUT_SECTIONS = [
    ("Figure 1: Taxonomy of Code Comprehension Tasks",  "show_figure1.py", None),
    ("Table 1: Task Categories and Types",              "generate_table1.py", None),
    ("Figures 3-11: Correlation Results",               "show_all_figs_data.py", None),
    ("Table 7: Impact of Participant Factors",          "analyze_student_factors.py", None),
    ("Table 8: Cross-Institution Consistency",          "compare_University1_University2_correlations.py", None),
    ("Table 4: Evolution of Expert Agreement Across Delphi Rounds", "generate_table4.py", "experts_study"),
]

SEP = "─" * 72


def run_silent(script):
    result = subprocess.run(
        ["python", script],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
        text=True,
    )
    if result.returncode != 0:
        print(f"ERROR while preparing data ({script}):")
        print(result.stderr)
        sys.exit(result.returncode)


def run_section(label, script, cwd=None):
    print(f"\n{'━' * 72}")
    print(f"  {label}")
    print(f"{'━' * 72}")

    process = subprocess.Popen(
        ["python", script],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        cwd=cwd,
    )
    for line in process.stdout:
        print(line, end="")
    process.wait()

    if process.returncode != 0:
        print(f"\n  ERROR: python {script} failed.")
        sys.exit(process.returncode)


def main():
    print("\n" + "━" * 72)
    print("  Preparing data (running correlation and plot scripts)...")
    print("━" * 72)
    for script in PREP_COMMANDS:
        print(f"  python {script} ...", end=" ", flush=True)
        run_silent(script)
        print("done")

    for label, script, cwd in OUTPUT_SECTIONS:
        run_section(label, script, cwd)

    print(f"\n{'━' * 72}")
    print("  All results reproduced successfully.")
    print("━" * 72 + "\n")


if __name__ == "__main__":
    main()
