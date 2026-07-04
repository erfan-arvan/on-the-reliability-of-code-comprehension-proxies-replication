from itertools import combinations
import json

# === Config ===
EXCLUDED_USERS = {"facilitator"}

# === Input ===
# Load from final_submissions.json
with open("round1_submissions_raw.json", "r") as f:
    data = json.load(f)

# Mapping from username to local→original snippet order
user_snippet_orders = {
    "expertA":     [4, 1, 7, 3, 8, 2, 5, 6],
    "expertB":     [2, 5, 8, 6, 3, 1, 7, 4],
    "expertC":     [7, 2, 4, 1, 6, 8, 3, 5],
    "expertD":     [3, 6, 1, 8, 2, 5, 7, 4],
    "expertE":     [5, 3, 6, 2, 7, 1, 8, 4],
    "expertF":     [6, 1, 4, 8, 2, 7, 3, 5],
    "facilitator": [1, 2, 3, 4, 5, 6, 7, 8],  # kept but excluded
}

# === Helpers ===
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
        return +1  # a > b
    elif ra > rb:
        return -1  # b > a
    else:
        return 0   # tie

# === Extract rankings ===
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
        original_ids = [convert_snippet(s, user_order) for s in snippets]
        converted_ranking[int(position)] = original_ids

    rankings[username] = converted_ranking

    # Print converted ranking
    print(f"\n{username}'s ranking (mapped to original snippet IDs):")
    for pos in sorted(converted_ranking.keys()):
        print(f"  {pos}: {converted_ranking[pos]}")

# === Prepare rank maps ===
rank_maps = {expert: flatten_ranks(ranking) for expert, ranking in rankings.items()}
experts = list(rank_maps.keys())

print("\nExperts used:", experts)

all_snippets = sorted(set().union(*[set(r.keys()) for r in rank_maps.values()]))

# === Pairwise comparison ===
hard_disagreements = []
soft_disagreements = []
agreements = []

for a, b in combinations(all_snippets, 2):
    votes = [compare(a, b, rank_maps[expert]) for expert in experts]
    vote_set = set(votes)

    if len(vote_set) == 1:
        agreements.append((a, b, votes[0]))
    elif +1 in vote_set and -1 in vote_set:
        hard_disagreements.append((a, b, votes))
    else:
        soft_disagreements.append((a, b, votes))

# === Output ===

print("\n=== HARD DISAGREEMENTS (Opposite Orderings) ===\n")
for a, b, votes in hard_disagreements:
    print(f"Pair ({a}, {b}):")
    for expert in experts:
        v = compare(a, b, rank_maps[expert])
        label = {+1: "A > B", -1: "B > A", 0: "A = B"}[v]
        print(f"  {expert}: {label}")
    print()

print("=== SOFT DISAGREEMENTS (Tie vs Ordered) ===\n")
for a, b, votes in soft_disagreements:
    print(f"Pair ({a}, {b}):")
    for expert in experts:
        v = compare(a, b, rank_maps[expert])
        label = {+1: "A > B", -1: "B > A", 0: "A = B"}[v]
        print(f"  {expert}: {label}")
    print()

print("=== AGREEMENTS ===\n")
for a, b, vote in agreements:
    label = {+1: "A > B", -1: "B > A", 0: "A = B"}[vote]
    print(f"Pair ({a}, {b}): all agree on {label}")

# === Summary ===
total_pairs = len(list(combinations(all_snippets, 2)))

print("\n=== Summary ===")
print(f"Total snippet pairs: {total_pairs}")
print(f"Hard disagreements: {len(hard_disagreements)}")
print(f"Soft disagreements: {len(soft_disagreements)}")
print(f"Agreements: {len(agreements)}")
