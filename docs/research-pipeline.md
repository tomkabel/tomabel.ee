# Research Pipeline Spec — tomabel.ee

Automated weekly research pipeline. A Hermes cron job runs this end-to-end:
premise discovery (backlog + local files) → write (EN) → fact-check →
humanize → peer review (critical) → implement → code review → commit → push
to main (GH Actions deploys to Pages). One report per run. This file is the
strategy anchor the job reads every run.

## Strategy (why we publish research at all)

Source: PRODUCT.md (brand/voice), docs/seo-research-2026.md (discovery play).

1. Research is the primary capability proof. The conversion goal is qualified
   B2B intros; long-form, fact-dense, heavily cited research is what security
   leads and AI crawlers cite. Every report must demonstrate depth no résumé
   can.
2. Voice is the brand (PRODUCT.md): no filler, no buzzwords, no hype, no em
   dashes, no self-promotion. Restraint signals authority. A report that
   reads like AI marketing copy fails.
3. Honesty is the moat: never fabricate findings, stats, or credentials.
   Attribution is mandatory. Unverifiable claims are attributed or cut.
4. Where research touches live systems, disclose responsibly before
   publication (see /disclosure policy). Disclosure status is part of the
   report metadata.

## Backlog (source of truth: `researchEntries` array in src/content/site.ts)

An entry is PUBLISHED when it has an `href` (its detail page exists and is
wired into routes/SEO/sitemap). The queue is entries WITHOUT `href`, in array
order. The job publishes the FIRST queued entry per run, then flips it to
published (href + meta). Current queue:

1. R-01 BotGuard, disassembled — reverse engineering Google's anti-fraud VM
   (source material: BotGuard teardown work; cross-link the essay at
   /writing/what-client-side-trust-is-actually-worth).
2. R-02 The Achilles' heel of Estonia's e-state — Smart-ID / eID research
   (disclosed to RIA/CERT-EE before publication; carry the disclosure note).
3. R-03 Zero-Trust Octagon — a framework from first principles.
4. R-04 The evolution of cyber fraud in Estonia, 2010–2026 (local source:
   ~/research/estonia_cyber_fraud_evolution.md).

When the queue is empty, the job does NOT stop: it generates new premises
from local material (below), adds the strongest to the queue, and publishes
it in the same run.

## New premises (from local files, queue empty only)

Scan ~/Documents and ~/research for candidate material (markdown reports,
research notes, analysis files). Score candidates against the site's focus
areas (identity protocols FIDO2/WebAuthn/eIDAS/Smart-ID, anti-fraud systems,
TLS fingerprinting, zero-trust architecture, Estonia's digitization, AI
abuse). Pick the strongest publishable candidate and add it as a new
researchEntries entry (EN+ET title/blurb/type).

PUBLISHABILITY GATE (hard): do NOT publish material that is client work,
private correspondence, competitor intel, personal data, or anything the
owner did not author for publication. When the only candidates fail the
gate, report and skip (a skip is a valid outcome).

## Writing format

- Draft EN first into `drafts/research/<slug>.md`.
- Report structure: **Standfirst** (one-paragraph thesis), **Scope and
  method** (what was examined, how, limits), **Findings** (sections, each a
  claim + evidence), **Sources** (links/attributions), **Disclosure status**
  (what was disclosed, to whom, when).
- Target 1200-4000 words EN. Reading time = words / 200, rounded.
- ET: title, blurb, and standfirst are always bilingual (site.ts). Full ET
  body translation is optional and secondary to EN quality; never let ET
  quality drag the run past the quality gates.
- Keep the draft file after publishing.

## Fact-checking (mandatory, before humanize)

- Every factual claim: verify with web search or a verifiable local source.
- Numbers, dates, names, and attributions must trace to a source cited in
  the report. Unverifiable → attribute ("according to X") or cut.
- NEVER fabricate research findings, test results, stats, or credentials.
- After review finds an error, fix it (loopback), don't delete the report.

## Humanize (before peer review)

Load and apply the humanizer skill. Strip AI-isms: listicle rhythm,
over-explanation, hedged filler, formulaic transitions. The voice must read
like a researcher who builds things, not a model that generates paragraphs.

## Peer review (critical tone, mandatory)

Dispatch subagents via delegate_task to review with a critical, adversarial
tone:
- Content reviewer: attack the claims (what is wrong, overstated, or
  unproven?), the evidence chain, the voice, the structure, the disclosure
  posture. Verdict per finding: MUST-FIX / SHOULD-FIX / NIT.
- Code reviewer (after implementation): review the diff — routing, SEO
  parity (Seo.tsx vs spa-routes.mjs), sitemap, i18n, staging precision.
Collect findings, fix every MUST-FIX, apply SHOULD-FIXes that are correct,
then loop back. A report that cannot clear review after one honest revision
pass is not published: leave the draft, report why, skip the week.

## Implementation checklist (all must stay in sync)

1. `src/content/site.ts` — add `href` (+ optional `meta` read time, EN+ET) to
   the published entry; add any new queued entry with EN+ET title/blurb/type.
2. `src/pages/<Slug>ResearchPage.tsx` — report page following the essay page
   pattern (title, standfirst, opening paragraphs, sections[] of
   {heading, paragraphs}, sources, disclosure note).
3. `src/App.tsx` — lazy import + Route at /research/<slug> (wrap in Layout).
4. `src/components/Seo.tsx` — add route to META map (type 'article',
   ScholarlyArticle JSON-LD, datePublished).
5. `scripts/spa-routes.mjs` — add SAME route/title/description/jsonLd
   (must match Seo.tsx exactly).
6. `public/sitemap.xml` — add URL (trailing slash, yearly changefreq,
   priority 0.7, lastmod = publish date).
7. `public/llms.txt` — add the report under Research with one-line summary.
8. `src/pages/ResearchPage.tsx` / `src/components/site/entry-row.tsx` —
   entries with href render as links (mirror WritingPage row pattern).

Items 4 and 5 must have identical content. Missing any of these is a failed
run.

## Quality gates (fail → do not push)

- `pnpm lint` clean.
- `npx tsc --noEmit` clean.
- `pnpm build` succeeds (outputs pub/).
- Voice review: no filler/buzzwords/em dashes, human tone.
- Fact check: every claim sourced; nothing fabricated.
- Peer review: all MUST-FIX findings resolved.
- Diff review: precise staging, only intended files, no stray changes.
- CI re-runs tsc/lint/audit/zizmor/build on push; it is the final gate.

## Abort conditions (report and stop, commit nothing)

- `git status --porcelain` is non-empty (owner may be mid-edit).
- Local main is behind origin/main (fetch first; never push without pulling).
- Queue is empty AND no publishable new premise exists.
- The report cannot clear the quality gates after one honest revision pass.
  (Skipping a week is a valid outcome.)

## Commit convention

- `feat(research): add report "<title>"` — includes implementation files.
- Precise staging: only the files the run touched. Never `git add -A` if
  unrelated files exist.
- Push to main. GH Actions deploys to GitHub Pages automatically.
