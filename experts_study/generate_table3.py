#!/usr/bin/env python3
"""Extract each expert's final ranking (Table 3) from round3_submissions_transfered.json.

The "transfered" file stores snippet IDs already normalized to their original
(global) numbering, unlike the "_raw.json" files used by generate_stats_roundN.py,
which still need per-expert local-to-original conversion.
"""
import json

EXPERTS = ["expertA", "expertB", "expertC", "expertD", "expertE"]


def format_chain(phase2):
    groups = []
    for pos in sorted(phase2.keys(), key=lambda x: int(x)):
        ids = sorted(int(s.split('-')[1]) for s in phase2[pos])
        if not ids:
            continue
        if len(ids) == 1:
            groups.append(str(ids[0]))
        else:
            groups.append("(" + " = ".join(str(i) for i in ids) + ")")
    return " -> ".join(groups)


def main():
    with open("round3_submissions_transfered.json") as f:
        data = json.load(f)

    rows = []
    for expert in EXPERTS:
        submissions = data.get(expert)
        if not submissions:
            continue
        phase2 = submissions[-1]["data"].get("phase2", {})
        rows.append((expert, format_chain(phase2)))

    label_w = max(len(e) for e, _ in rows)
    print(f"{'Expert':<{label_w}}  Final Ranking (Easier -> More difficult to understand)")
    print("-" * 72)
    for expert, chain in rows:
        print(f"{expert:<{label_w}}  {chain}")


if __name__ == "__main__":
    main()
