#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import glob
import os
import shutil
import subprocess
import sys

COMMANDS = [
    ["python", "correlate_expert_vs_students.py"],
    ["python", "correlate_single_expert_vs_students.py"],
    ["python", "plot_all.py"],
    ["python", "show_all_figs_data.py"],
    ["python", "analyze_student_factors.py"],
    ["python", "compare_University1_University2_correlations.py"],
]


def run_command(cmd):
    print("\n" + "=" * 80)
    print(f"Running: {' '.join(cmd)}")
    print("=" * 80 + "\n")

    process = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True
    )

    # stream output live
    for line in process.stdout:
        print(line, end="")

    process.wait()

    if process.returncode != 0:
        print(f"\nCommand failed: {' '.join(cmd)}")
        sys.exit(process.returncode)

    print(f"\nFinished: {' '.join(cmd)}\n")


def main():
    print("\nStarting full pipeline...\n")

    for cmd in COMMANDS:
        run_command(cmd)

    print("\nAll scripts completed successfully.\n")

    script_dir = os.path.dirname(os.path.abspath(__file__))
    results_dir = os.path.join(script_dir, "results")
    if os.path.isdir(results_dir):
        for csv in glob.glob(os.path.join(script_dir, "*.csv")):
            shutil.copy(csv, results_dir)
        print(f"CSV files copied to results/\n")


if __name__ == "__main__":
    main()
