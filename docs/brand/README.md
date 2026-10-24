# docs/brand — personal brand system workspace

Working folder for the personal brand system of Tom Kristian Abel, built from
`arnabbagxd/brand-building-skills` (installed in this repo, 29 skills).

| Path | What it is |
|---|---|
| `personal-brand-program.md` | The plan: library analysis, skill selection, evidence corpus, phases, gates |
| `00-evidence/source-register.md` | Source register — one row per public source, verification status, and claim status per statement |
| `00-evidence/statements-and-quotes.md` | Coded verbatim quotes, the current brand copy, and the measured voice signals |
| `00-evidence/serp-and-ai-snapshot-2026-10-24.md` | Perception baseline: AI answer (captured) + ranked SERP (capture failed, documented) |
| `00-evidence/gaps.md` | Ranked open questions, each with the default that will be used if unanswered |
| `00-evidence/extracts/` | The only passages that may be quoted in an output, each tagged with claim status |
| `00-evidence/raw/` | Untouched captures: press pages, GitHub READMEs, LinkedIn profile, search JSON, voice stats |
| `outputs/01-…` … `outputs/12-…` | Numbered skill outputs, in the order named in the plan |
| `check-traceability.mjs` | `node docs/brand/check-traceability.mjs` — every `[S-nn]` reference must resolve to a register row (script adopted from the `brand-strategy-development` skill) |

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
