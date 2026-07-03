#!/usr/bin/env python3
import os

print("\n" + "=" * 80)
print("Figure 1: Taxonomy of Code Comprehension Tasks (Open Coding Tree)")
print("=" * 80 + "\n")

tree_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "open_coding", "FinalTreeWithNumbers.txt")
with open(tree_path, encoding="utf-8") as f:
    print(f.read())
