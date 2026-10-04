# 05 — End-to-end visual QA

Target: the production build (`pnpm build` → `vite preview`, `pub/`), not the dev server. A stale
dev server had kept the old Tailwind config during the first after-pass; that capture was
thrown away.

Evidence:
- `screens/before/*.png`: HEAD `af7c6f8`, 8 routes × 3 viewports (375 / 768 / 1440).
- `screens/after/*.png`: the final tree, same matrix.
- `qa_checks.py`: re-runnable automated checks (`python3 docs/design-audit/qa_checks.py`).
- `shoot.py`: regenerates either screenshot set.

## Method

Three reviewers, one per viewport, compared every before/after pair against
`01-ai-slop-patterns.md` and probed the live build with Playwright. The desktop reviewer also
did the WCAG contrast sweep, hover/focus/reduced-motion checks and a font network check. Their
findings were fixed and everything was re-measured.

## Automated results (final)

```
python3 docs/design-audit/qa_checks.py
ok   first Tab -> skip link
ALL CHECKS PASSED
```

| Check (8 routes × 3 viewports) | Result |
|---|---|
| Horizontal overflow | 0 |
| Rendered text < 12px | 0 (was 58 elements at 10–11px) |
| Targets < 44×44 outside prose | 0 (was: nav icon 14px, footer links 16px tall, TOC rows 31px, filter tabs, rail back link…) |
| First Tab on load | skip link (was: jumped into `<main>`) |
| WCAG AA contrast, 416 text nodes (home, systems, article) | 0 failures, minimum 5.58:1 (was: `subtle` at 4.34:1) |
| Focus indicator | 2px signal outline, 3px offset, follows element radius |
| Hover on cards | tonal step, border tint, drawn underline, arrow shift. Bounding box unchanged (no translate/scale) |
| `prefers-reduced-motion` | computed `transition-duration` ≈ 0 on all animated elements |
| Fonts | no Space Grotesk request; headings compute to Newsreader Variable |
| Article integrity proofs | 19/19 canonical texts unchanged |

## Issues raised in QA and fixed

| Viewport | Issue | Fix |
|---|---|---|
| all | Header / filter bar translucent after blur removal; text showed through | Opaque `bg-background` |
| all | Nav/footer 24px out of line with content | Padding outside `max-w-6xl` |
| all | Straight `'` apostrophes crude in Newsreader display | `’` in `content/site.ts` (article pages untouched to keep proofs valid) |
| mobile | Work-card tags collided with CTA | Footer grid stacks below `sm` |
| mobile | Filter tabs wrapped 2–3 rows | One scrollable row below `md` |
| mobile | Entry meta left a hanging `·` | Separator travels with its item, `nowrap` |
| mobile/tablet | Reader rail: dead 0% meter and duplicate back link above the article | Hidden below `lg` |
| tablet | Featured work collapsed to 1 column at 768 | `md:grid-cols-2` before the 12-col `lg` grid |
| tablet | Article/About prose ~77 CPL | `max-w-measure` (65ch token) on 74 prose blocks |
| tablet | `grid-flow-dense` broke tab order on /systems | Removed |
| desktop | Flagship cards stretched, leaving dead space under tags | `items-start` |
| desktop | Fault-line serif passage ran ~870px wide | `--measure-display` (34ch) |
| mobile | Legal bullets didn't hang; accent-green H3s | `list-disc pl-5`; H3s in ink |
| mobile | Systems card meta ran together ("OFFENSIVE FLAGSHIP OPEN SOURCE") | `·` separator |

## AI-slop cross-check (rubric in 01)

| | Before (02) | After |
|---|---|---|
| Sev-5 "fix regardless" hits | pill badge (L2), gradient icon tile + emoji (L4/K6/K8), rounded side-stripe (K1) | **none** |
| K2 glassmorphism, I1 transition-all, I2 hover-lift, L11 grid background, K9 pulse, T6 no-clamp, C7 flat surfaces, K3 uniform radius, T8 caps nav, L3 symmetric grids | present | **cleared** |
| Distinct rubric IDs | 24 | 6 residual, all low intensity and deliberate (below) |

Residual, reviewed and accepted:
- **T7** (uppercase mono labels, sev 4): one metadata voice at 0.14em tracking, 12px. The loud
  version (7 tracking values up to 0.3em, 10px, an accent rule on every eyebrow) is gone.
- **L6** (numbered article sections): they index real sections and match the reader-rail TOC.
- **T2** (Geist body): Space Grotesk is gone; replacing the body face needs a new font dependency.
- **X1** (em dashes inside article and card copy): editorial content, and article text is
  pinned by SHA-256 proofs. Hero chrome copy was fixed.
- **C3** (permanent dark canvas + one accent): the brand's stated direction (PRODUCT.md),
  now expressed as a hue-shifting tonal ladder with no glows.
- **K5** (hairline + soft shadow on link cards): kept on interactive cards only, as an
  elevation cue.
- Also noted: without `grid-flow-dense`, a flagship card on /systems can leave an empty cell
  in its row at 1440px (rows 1 and 7). Reordering `projects` in `content/site.ts` would close it.

L13 blank-copy test (desktop reviewer): the page no longer reads as a SaaS template. What sets it
apart: the optical-size serif, the offset hero column, the tonal past/present headline, the sunken
interlude band and the 7/5 → 5/7 rhythm. It still belongs to the "dark developer portfolio"
genre, which is the brand's chosen register, not a template default.

## Verdict

All automated checks pass on the eight selected routes at all three viewports. The rubric's Sev-5 tells and 18 of the
24 audited pattern IDs are cleared. The 6 remaining are documented as deliberate, with reasons.
