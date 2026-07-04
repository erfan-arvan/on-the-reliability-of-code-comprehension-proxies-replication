#!/usr/bin/env python3
"""Aggregate the per-round expert agreement stats into Table 4 of the paper.

Reuses the same pairwise-comparison logic as generate_stats_round{1,2,3}.py,
one round per data file, and prints a single summary table:

    Round | Agreements | Soft Agreements | Disagreements | Total
"""
from itertools import combinations
import json

EXCLUDED_USERS = {"facilitator"}

ROUNDS = [
    ("Round 1", "round1_submissions_raw.json", {
        "expertA": [4, 1, 7, 3, 8, 2, 5, 6],
        "expertB": [2, 5, 8, 6, 3, 1, 7, 4],
        "expertC": [7, 2, 4, 1, 6, 8, 3, 5],
        "expertD": [3, 6, 1, 8, 2, 5, 7, 4],
        "expertE": [5, 3, 6, 2, 7, 1, 8, 4],
        "expertF": [6, 1, 4, 8, 2, 7, 3, 5],
        "facilitator": [1, 2, 3, 4, 5, 6, 7, 8],
    }),
    ("Round 2", "round2_submissions_raw.json", {
        "expertA": [4, 1, 7, 3, 8, 2, 5, 6],
        "expertB": [2, 5, 8, 6, 3, 1, 7, 4],
        "expertC": [7, 2, 4, 1, 6, 8, 3, 5],
        "expertD": [3, 6, 1, 8, 2, 5, 7, 4],
        "expertE": [5, 3, 6, 2, 7, 1, 8, 4],
        "expertF": [6, 1, 4, 8, 2, 7, 3, 5],
        "facilitator": [1, 2, 3, 4, 5, 6, 7, 8],
    }),
    ("Round 3", "round3_submissions_raw.json", {
        "expertA": [4, 1, 7, 3, 8, 2, 5, 6],
        "expertB": [2, 5, 8, 6, 3, 1, 7, 4],
        "expertC": [7, 2, 4, 1, 6, 8, 3, 5],
        "expertD": [3, 6, 1, 8, 2, 5, 7, 4],
        "expertE": [5, 3, 6, 2, 7, 1, 8, 4],
        "facilitator": [1, 2, 3, 4, 5, 6, 7, 8],
    }),
]


def convert_snippet(snippet_str, user_order):
    local_id = int(snippet_str.split('-')[1])
    return user_order[local_id - 1]


def flatten_ranks(ranking):
    snippet_to_rank = {}
    for rank, snippet_ids in ranking.items():
        for sid in snippet_ids:
            snippet_to_rank[sid] = rank
    return snippet_to_rank


def compare(a, b, rank_map):
    ra, rb = rank_map[a], rank_map[b]
    if ra < rb:
        return +1
    elif ra > rb:
        return -1
    return 0


def round_stats(data_file, user_snippet_orders):
    with open(data_file) as f:
        data = json.load(f)

    rankings = {}
    for username, submissions in data.items():
        if username in EXCLUDED_USERS:
            continue
        if username not in user_snippet_orders or not submissions:
            continue

        latest_submission = submissions[-1]
        phase2 = latest_submission["data"].get("phase2", {})
        user_order = user_snippet_orders[username]

        converted_ranking = {}
        for position in sorted(phase2.keys(), key=lambda x: int(x)):
            snippets = phase2[position]
            converted_ranking[int(position)] = [
                convert_snippet(s, user_order) for s in snippets
            ]
        rankings[username] = converted_ranking

    rank_maps = {expert: flatten_ranks(r) for expert, r in rankings.items()}
    experts = list(rank_maps.keys())
    all_snippets = sorted(set().union(*[set(r.keys()) for r in rank_maps.values()]))

    agreements = soft_disagreements = hard_disagreements = 0
    for a, b in combinations(all_snippets, 2):
        votes = {compare(a, b, rank_maps[e]) for e in experts}
        if len(votes) == 1:
            agreements += 1
        elif +1 in votes and -1 in votes:
            hard_disagreements += 1
        else:
            soft_disagreements += 1

    total = len(list(combinations(all_snippets, 2)))
    return agreements, soft_disagreements, hard_disagreements, total


def main():
    rows = []
    for label, data_file, orders in ROUNDS:
        rows.append((label, *round_stats(data_file, orders)))

    header = f"{'Round':<10} {'Agreements':<12} {'Soft Agreements':<17} {'Disagreements':<15} {'Total':<6}"
    print(header)
    print("-" * len(header))
    for label, agree, soft, hard, total in rows:
        print(f"{label:<10} {agree:<12} {soft:<17} {hard:<15} {total:<6}")


if __name__ == "__main__":
    main()
