# docs/brand — personal brand system workspace

Working folder for the personal brand system of Tom Kristian Abel, built from
`arnabbagxd/brand-building-skills` (installed in this repo, 29 skills).

| Path | What it is |
|---|---|
| `personal-brand-program.md` | The plan: library analysis, skill selection, evidence corpus, phases, gates |
| `decisions.md` | The ten open questions, decided 2026-10-24 by rubric — picks verbatim, divergences marked, prerequisites listed |
| `01-audit.md` | Phase 2 baseline audit: 6-dimension scorecard (17/30), remediation check against the disclosures review, intent-vs-perception delta |
| `00-evidence/` → private | Source register (33 sources), coded quote bank, extracts, raw captures, gaps, SERP/AI snapshot. **Moved to the private repo `tomkabel/tomabel-brand`** per decision G-10; a symlink keeps the phases runnable locally. |
| `decisions/` → private | The ten rubric payloads (option sets, bands, hard constraints) |
| `.decisions.log` → private | Machine-readable record: picks, divergences, stability readings |
| `outputs/01-…` … `outputs/12-…` | Numbered skill outputs, in the order named in the plan |
| `check-traceability.mjs` | `node docs/brand/check-traceability.mjs` — every `[S-nn]` reference must resolve to a register row (script adopted from the `brand-strategy-development` skill) |

**The split (decision G-10, 2026-10-24).** This repo is public. Strategy and sensitive evidence —
the curated `do-not-use` list, the LinkedIn capture, the pre-decisional gap analysis, the decision
payloads — live in `tomkabel/tomabel-brand` (private). Everything meant to be read stays here: the
plan, the audit, the decision record and, from phase 4, the outputs. Note that the evidence was
committed publicly once (commit `e68aa48`) before the split; it is gone from the tip, not from
history.

**Rules that apply to everything in this folder**

1. Every claim in an output cites a source ID (`[S-07]`) or is deleted. Run the traceability
   check before committing.
2. Derived context lives at `.agents/brand-context.md` — the path every brand-building skill
   reads first, so it must stay there, not here.
3. Unverifiable field → `[unverified → needs Tom]`. Never a plausible filler.
4. One sentence about the past, legally reviewed, reused everywhere. No variant is written here.
5. Changes go through a feature branch and PR (repo convention). Documents only — no build impact.
6. The workflow itself is codified as the `brand-strategy-development` skill; this folder is its
   first execution. Read that skill before continuing, and update it if a step turns out wrong.

**How to run a skill from the library.** `skill_view` cannot load these names (they collide with a
same-named skill in another skills tier). Read the file instead:
`read_file .agents/skills/<skill-name>/SKILL.md`, then follow it with the evidence in this folder
as the answer key.
