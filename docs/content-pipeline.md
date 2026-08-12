# Content Pipeline Spec — tomabel.ee

Automated content pipeline, runs every 2 days. A Hermes cron job runs this
end-to-end: plan (strategy-driven) → write (EN + ET) → editorial review →
implement → code review → commit on a branch → open a PR. A human reviews
and merges the PR; merging to main deploys via GH Actions to Pages. One
piece per run. This file is the strategy anchor the job reads every run.

## Strategy (why we write at all)

Source: PRODUCT.md (brand/voice), docs/seo-research-2026.md (discovery play).

1. The site's conversion goal is qualified B2B intros. Content exists to prove
   depth, not to chase traffic. Every piece must demonstrate capability,
   establish credibility, or remove friction — ideally all three.
2. The 2026 discovery play: long-form, high-fact-density research/essay pages
   are the AI-citation play. They are what Google and AI crawlers cite.
   Essays should be specific enough to be citable.
3. Voice is the brand. PRODUCT.md is explicit: no filler, no buzzwords, no
   self-promotional language, no em dashes, no hype. Restraint signals
   authority. If a piece sounds like generic AI marketing copy, it fails.
4. Everything is bilingual (EN + ET) with equal fidelity. No translation
   artifacts; neither language feels secondary.

## Backlog (source of truth: `essays` array in src/content/site.ts)

Essays whose `meta` is `Planned` are the queue. The job publishes the FIRST
Planned entry in array order that has no open PR for it (check
`gh pr list --state open`; skip slugs already on a `content/<slug>` branch),
then flips its meta to `Published · N min read` (and ET equivalent). Current
queue:

1. What client-side trust is actually worth — BotGuard teardown as case study;
   why any defense running on a machine you don't control is negotiable.
2. The kratt problem — offensive capability as Estonian folklore: tireless
   with direction, dangerous without. Ethics and pointing tools.
3. Coordinated disclosure in a small country — national-infrastructure
   disclosure when everyone knows each other; legal exposure, incentives,
   owning your story.

When the queue is empty, the job reports and skips (no invention of new
topics without owner input).

## Voice rules (from PRODUCT.md, enforced in review)

- Direct, technical, declarative prose. Short paragraphs (2-4 sentences).
- No em dashes. No buzzwords. No hype. No self-promotional language.
- Honest about limits. Take responsibility for the past; no deflection.
- Show, don't tell. Specific mechanics over abstract claims.
- Bilingual parity: EN and ET must say the same thing with equal weight.
- Facts ground in the repo (site.ts, drafts/, research/) or established
  public record. NEVER fabricate credentials, research, findings, or projects.
  This is a personal-credibility site; fabrication is catastrophic.

## Writing format

- Draft EN first into `drafts/<slug>.md` (markdown, sections).
- Then write the ET translation into the same file (or a parallel section),
  matching the existing draft convention in drafts/.
- Target 800-2500 words EN. Reading time = words / 200, rounded.
- Keep the draft file after publishing (existing convention: the thesis
  essay draft is still in drafts/).

## Implementation checklist (all must stay in sync)

1. `src/content/site.ts` — add entry to `essays` array (title/blurb/meta,
   en+et; href `/writing/<slug>`). Flip the published essay's meta.
2. `src/pages/<Slug>Page.tsx` — new page component following the
   AuthenticationEssayPage.tsx pattern (title, standfirst, openingParagraphs,
   sections[] of {heading, paragraphs}).
3. `src/App.tsx` — lazy import + Route at `/writing/<slug>` (wrap in Layout).
4. `src/components/Seo.tsx` — add route to the META map (title + description).
5. `scripts/spa-routes.mjs` — add same route to its META map (static shells).
6. `public/sitemap.xml` — add the URL (trailing slash, yearly changefreq,
   priority 0.7, lastmod = publish date).
7. `public/llms.txt` — add the essay under Writing with one-line summary.

Items 4 and 5 must have identical content (the comment in spa-routes.mjs
says so). Missing any of these is a failed run.

## Quality gates (fail → do not open a PR)

- `pnpm lint` clean.
- `npx tsc --noEmit` clean.
- `pnpm build` succeeds (outputs pub/).
- Voice review: no filler/buzzwords/em dashes, EN/ET parity.
- Fact check: nothing fabricated.
- Diff review: precise staging, only intended files, no stray changes.
- CI re-runs tsc/lint/audit/zizmor/build on push; it is the final gate.

## Abort conditions (report and stop, commit nothing)

- `git status --porcelain` is non-empty (owner may be mid-edit).
- Local main is behind origin/main (fetch first; pull --ff-only before
  branching so PRs build on the latest main).
- No Planned essays remain.
- An open PR already exists for the chosen essay (branch `content/<slug>`).
- The draft cannot clear the quality gates after one honest revision pass.
  (Better to skip a cycle than publish weak copy. Skipping is a valid
  outcome.)

## PR flow (human-in-the-loop; never push to main directly)

1. From clean, up-to-date main: `git checkout -b content/<slug>`.
2. Precise staging: only the files the run touched. Never `git add -A` if
   unrelated files exist.
3. Commit: `feat(content): add essay "<title>"` — includes the ET translation.
4. `git push -u origin content/<slug>`, then
   `gh pr create --base main` with title `Content: <title>` and a body
   summarizing what was checked (gates, voice, EN/ET parity) and what the
   reviewer should verify.
5. Do NOT merge, do NOT push to main, do NOT delete the branch.
6. `git checkout main` so the tree is clean for the next run.
7. The merge (human) triggers GH Actions deploy to GitHub Pages
   (workflow runs on push to main only).
