import json

INPUT_FILE = "volunteer.json"
OUTPUT_FILE = "volunteer_fixed.json"

# Load JSON
with open(INPUT_FILE, "r", encoding="utf-8") as f:
    volunteers = json.load(f)

# Re-generate IDs
for index, volunteer in enumerate(volunteers, start=1):
    volunteer["id"] = f"NSS-2025-{index:03d}"

# Save fixed file
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(
        volunteers,
        f,
        indent=2,
        ensure_ascii=False
    )

print(
    f"Fixed {len(volunteers)} volunteer IDs."
)
print(
    f"Saved as {OUTPUT_FILE}"
)