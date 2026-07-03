#!/usr/bin/env python3
import os

tree_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "open_coding", "FinalTreeWithNumbers.txt")
with open(tree_path, encoding="utf-8") as f:
    print(f.read())
