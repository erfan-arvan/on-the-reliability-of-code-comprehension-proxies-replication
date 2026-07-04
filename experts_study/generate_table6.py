#!/usr/bin/env python3
"""Reproduce Table 6: partial rankings derived from different expert aggregation
strategies, from the final expert rankings in round3_submissions_transfered.json.

For each of the four strategies (strict unanimous, unanimous up to ties, unanimous
up to ties with one global violation, pure majority), this finds all valid
rankings of the maximum achievable length and prints their count plus a few
representative examples, matching Table 6's format. Pass --full to print every
valid ranking instead of just a few representative ones.
"""
import argparse
import json
from itertools import combinations
from typing import Dict, List, Tuple, Optional, Set

EXPERTS = ["expertA", "expertB", "expertC", "expertD", "expertE"]


def load_rank_maps(path="round3_submissions_transfered.json"):
    with open(path) as f:
        data = json.load(f)

    rank_maps = {}
    for expert in EXPERTS:
        submissions = data.get(expert)
        if not submissions:
            continue
        phase2 = submissions[-1]["data"].get("phase2", {})
        rank_map = {}
        for pos in phase2:
            for s in phase2[pos]:
                rank_map[int(s.split('-')[1])] = int(pos)
        rank_maps[expert] = rank_map
    return rank_maps


def expert_cmp(rank_map, a, b):
    if rank_map[a] < rank_map[b]:
        return +1
    if rank_map[a] > rank_map[b]:
        return -1
    return 0


def pair_counts(rank_maps, a, b):
    pos = neg = tie = 0
    for rm in rank_maps.values():
        v = expert_cmp(rm, a, b)
        if v == +1:
            pos += 1
        elif v == -1:
            neg += 1
        else:
            tie += 1
    return pos, neg, tie


def strict_unanimous(rank_maps, a, b):
    return all(expert_cmp(rm, a, b) == +1 for rm in rank_maps.values())


def unanimous_up_to_ties(rank_maps, a, b):
    pos, neg, _ = pair_counts(rank_maps, a, b)
    return neg == 0 and pos >= 1


def pure_majority(rank_maps, a, b):
    pos, neg, _ = pair_counts(rank_maps, a, b)
    return pos > neg


def enumerate_chains(snippets, pref_func):
    results = []

    def backtrack(chain, used):
        results.append(chain.copy())
        for x in snippets:
            if x in used:
                continue
            if all(pref_func(u, x) for u in chain):
                used.add(x)
                chain.append(x)
                backtrack(chain, used)
                chain.pop()
                used.remove(x)

    for s in snippets:
        backtrack([s], {s})
    return results


def longest_only(chains):
    if not chains:
        return []
    best_len = max(len(c) for c in chains)
    longest = [c for c in chains if len(c) == best_len]
    longest.sort()
    return longest


def one_violation_chains(snippets, rank_maps):
    best_len = 0
    best = {}

    def ok_case2(u, v):
        pos, neg, _ = pair_counts(rank_maps, u, v)
        if neg > 0:
            return False, True
        if pos >= 1:
            return True, False
        return False, False

    def backtrack(chain, used, swap_used):
        nonlocal best_len, best
        t = tuple(chain)
        if len(chain) > best_len:
            best_len = len(chain)
            best = {t: True}
        elif len(chain) == best_len:
            best[t] = True

        for x in snippets:
            if x in used:
                continue
            new_swap_used = swap_used
            ok = True
            for u in chain:
                ok2, viol = ok_case2(u, x)
                if ok2:
                    continue
                if viol:
                    if new_swap_used:
                        ok = False
                        break
                    new_swap_used = True
                else:
                    ok = False
                    break
            if not ok:
                continue
            used.add(x)
            chain.append(x)
            backtrack(chain, used, new_swap_used)
            chain.pop()
            used.remove(x)

    for s in snippets:
        backtrack([s], {s}, False)

    return longest_only([list(k) for k in best])


def print_strategy(label, chains, show):
    shown = chains if show is None else chains[:show]
    examples = ", ".join(str(c) for c in shown)
    if show is not None and len(chains) > show:
        examples += ", ..."
    print(f"{label:<28} {len(chains):<10} {{{examples}}}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--full", action="store_true", help="print every valid ranking, not just a few examples")
    args = ap.parse_args()
    show = None if args.full else 3

    rank_maps = load_rank_maps()
    snippets = sorted(set().union(*[set(r.keys()) for r in rank_maps.values()]))

    strict = longest_only(enumerate_chains(snippets, lambda a, b: strict_unanimous(rank_maps, a, b)))
    ties = longest_only(enumerate_chains(snippets, lambda a, b: unanimous_up_to_ties(rank_maps, a, b)))
    violation = one_violation_chains(snippets, rank_maps)
    majority = longest_only(enumerate_chains(snippets, lambda a, b: pure_majority(rank_maps, a, b)))

    print(f"{'Strategy':<28} {'# Rankings':<10} Representative Rankings")
    print("-" * 90)
    print_strategy("Strict", strict, show)
    print_strategy("Unanimous up to ties", ties, show)
    print_strategy("1 violation", violation, show)
    print_strategy("Majority", majority, show)


if __name__ == "__main__":
    main()
