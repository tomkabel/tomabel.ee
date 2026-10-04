# Plan: open items left after #51 and #53

**Done 4 Oct 2026** except signing: PR-A #54, Dependabot (#49 merged; #46, #47, #48, #50
closed, superseded by #55–#57 and #59), PR-B #58, PR-C #60. Still open: the verification texts
have no `.asc` yet. Sign them by hand (see `note.txt`).

Status 4 Oct 2026. Covers everything still open: the archetype scores, the 15 deferred review
items, Dependabot #46–#50 and `.decisions.log`. Each item ends in a fix, a closure with a reason,
or a named decision for the author. Nothing stays deferred.

Order: **PR-A (CI on PRs) → Dependabot → PR-B (code and content) → PR-C (archetype scores).**
PR-A goes first because none of the other PRs has CI coverage until it lands.

## Inventory

| # | Item | Source | Outcome |
|---|---|---|---|
| 1 | CI has no `pull_request` trigger | #51 review 2 | PR-A |
| 2 | `canonical --check` misses orphan verification files | #51 review 2 | PR-B.2 |
| 3 | Font loading shifts deep-link scroll | #51 review 2 | PR-B.5 |
| 4 | Focus doesn't move to `#fragment` target | #51 review 2 | PR-B.5 |
| 5 | Footer year hydration mismatch | #51 review 1 | PR-B.4 |
| 6 | `public/_redirects` does nothing on GitHub Pages | #51 review 1 | PR-B.7 |
| 7 | Truncated "Research conduct follows the site's …" in verification texts | #51 review 1 | PR-B.1 |
| 8 | `?kind=` filter can show an empty list | #51 review 1 | PR-B.3 |
| 9 | `POLICY_PARAGRAPH` index is fragile | #51 review 1 | PR-B.1 (removed) |
| 10 | VLM source notes English-only | #51 review 1 | PR-B.6 |
| 11 | Spec: Operation Eastwood | review §Russian cyber ops | PR-B.8 |
| 12 | Spec: CISA pillar / NIS2 mapping | review §Nine dimensions | PR-B.8 |
| 13 | Spec: DTM-25-003 | review §Octagon | Close: already fixed in #51 |
| 14 | Spec: Riigikohus search | review §PIN delegation | PR-B.8 |
| 15 | `shadow-elevated` removed from Systems cards | #51 review 1 | Close: intentional |
| — | Archetype B/C/D scores vs the book | #51 | PR-C, author decision |
| — | Dependabot #46–#50 | GitHub | Per PR, below |
| — | `.decisions.log` | repo root | Close: already ignored |

## PR-A: CI on pull requests · `ci/pr-checks`

Today `static.yml` has one job that checks, builds and deploys, triggered by `push: main` only.
Dependabot PRs and feature PRs never get a check.

Split it into the standard two-job Pages layout:

- `on:` add `pull_request: { branches: [main] }`.
- Job `build`: every current step from checkout through `upload-pages-artifact`, unchanged. It
  runs on PRs too, so the artifact is built and discarded there.
- Job `deploy`: `needs: build`,
  `if: github.event_name != 'pull_request'`, holds `environment: github-pages` and only the
  `deploy-pages` step.
- Permissions per job (zizmor, which the Workflow lint step runs, needs this): workflow
  `permissions: {}`; `build` `contents: read`; `deploy` `pages: write`, `id-token: write`.
- `concurrency: pages` moves onto `deploy`, so PR runs don't queue behind deploys.
- No secrets are used. Dependabot runs get a read-only token, and `zizmor` only needs
  `GH_TOKEN` to read.
- Update `docs/i18n-locale-urls-plan.md` §1.4: the `worker` job becomes `needs: deploy`, and the
  permissions bullet becomes "done in PR-A".

Verify: `pipx run zizmor .github/workflows/` passes locally. Open the PR and confirm the
`build` job runs and `deploy` is skipped. After merging, confirm the push run deploys.

## Dependabot #46–#50 (after PR-A)

Comment `@dependabot rebase` on each one, so it picks up PR-A and runs CI.

| PR | Change | Action |
|---|---|---|
| #46 | eslint 10.11, typescript-eslint 8.71, vite 8.3.1 (minor/patch) | Merge when green. |
| #47 | `react` 19.3.0 + `@types/react`, **`react-dom` stays 19.2.8** (lockfile: `react-dom@19.2.8(react@19.3.0)`) | **Close.** React throws on mismatched `react`/`react-dom` versions at runtime. Add a `react` group to `dependabot.yml` (`react`, `react-dom`, `@types/react`, `@types/react-dom`) so the next PR bumps all four together. Merge that one when green. |
| #48 | `@types/node` 22 → 26 | **Close.** Runtime is Node 22 (CI `node-version: '22'`, `engines >=22.18`); types for Node 26 would allow APIs that don't exist at runtime. Add `ignore: @types/node, update-types: [version-update:semver-major]`. |
| #49 | `fontaine` 0.8 → 1.0 (major, used in `vite.config.ts`) | Read the 1.0 changelog for `FontaineTransform` and `fallbacks` option changes. Build on the branch and diff the generated `@font-face` fallback blocks in `pub/assets/*.css` against main. Merge if they are equal or the change is understood. |
| #50 | `lucide-react` 1.44 → 1.48 | Merge when green. |

The `dependabot.yml` edits go in PR-A (same file area, one review).

## PR-B: deferred code and content · `fix/deferred-2026-10`

### B.1 Policy sentence (#7, #9)

Root cause: seven pages store `"Research conduct follows the site's "` as a string fragment and
add the link plus `.` in JSX. `canonical-text.mjs` reads only the strings, so the six verification
texts end mid-sentence. The Smart-ID page finds the fragment by index
(`POLICY_PARAGRAPH = length - 2`).

Fix: store the whole sentence in the data and let one shared component link the phrase.

- Data: `"Research conduct follows the site's security research policy."` /
  `'Uurimistöö järgib saidi turvauuringute põhimõtteid.'` (use the wording each page already
  renders; check the Estonian with `estonian-mcp`).
- New `src/components/site/policy-link.tsx`:
  `<PolicyText text={…} phrase={…} />` splits `text` on `phrase` and renders the phrase as the
  existing `<a href="https://tomabel.ee/disclosure/">` with the same classes. If `phrase` is
  missing, it renders plain text, and a unit test (below) catches that case.
- The seven pages render every disclosure paragraph through it. This removes `POLICY_PARAGRAPH`,
  the `[1]`/`slice(2)` indexing in the fraud page, and the per-page `disclosurePolicyUrl` constants.
  Pages: BotGuard, ChatGPT phishing, PACT, Smart-ID Achilles, Evolution of fraud, PIN delegation,
  Zero-Trust Octagon.
- `canonical-text.mjs` needs no change: it now reads a complete sentence.
- Test `src/content/policy-sentence.test.ts`: every verification `.txt` contains no line ending in
  `site's ` / `site’s ` / `saidi ` (guards the whole class, not the 7 pages by name).
- `pnpm canonical` regenerates 6 texts and their hashes.
- Signing: no `.asc` is published yet, so nothing goes invalid. Sign the 6 regenerated texts
  **after** PR-B merges, not before. The pending `the-fix-that-doesnt-need-sk` signature in
  `note.txt` is unaffected (that text doesn't contain the sentence).

### B.2 Orphan verification files (#2)

`canonical-text.mjs`: collect the slugs it handled. Afterwards, list `public/verification/`. Any
`<slug>.txt` with no owning page, and any `.asc` with no matching `.txt`, is `stale`, so `--check`
exits 1. `README.md` is exempt. Without `--check`, report it but don't delete.

### B.3 `?kind=` empty list (#8)

`DisclosuresPage.tsx`: compute `available` before `filter`, then
`const filter = isFilter(kind) && available.some((f) => f.id === kind) ? kind : 'all'`.
An unknown or empty kind shows "all" instead of an empty list.

### B.4 Footer year (#5)

`footer.tsx`: `suppressHydrationWarning` on the `©` span. Only the English hydrate path can
mismatch, and only when the visit year differs from the build year. The text is correct either
way after React patches it.

### B.5 Deep-link scroll and focus (#3, #4)

`ScrollToTop` in `App.tsx`, inside `seek` when `target` is found:

- `document.fonts.ready.then(() => { if (window.scrollY === startY) target.scrollIntoView(); … })`.
  Web fonts change line heights after first paint, so scrolling before they load lands short.
- Then move focus to the target: `tabindex="-1"` if it isn't focusable, then
  `focus({ preventScroll: true })`.
- When a fragment target exists, the route-change "focus `#main-content`" branch is skipped, so
  the two don't compete. When there is no fragment it behaves as now.
- Check in the browser: open `/disclosures/zero-trust-octagon/#<section-id>` cold (cache disabled,
  slow 3G). The heading lands at the top, and the next Tab goes to the first link after it.

### B.6 VLM source notes (#10)

`VlmAntiFraudResearchPage.tsx`: `note` becomes `Bi`, the pattern six other pages already use
(Fortune 500, PIN delegation, …). Labels stay as published titles. Check the Estonian notes with
`estonian-mcp`. The page has no verification text, so no hash changes.

### B.7 `_redirects` (#6)

Delete `public/_redirects` and `pub/_redirects`. Fix the `App.tsx` comment that points at it.
The client `<Navigate>` routes and the `/cookies` stub are the working redirects today; the
Worker 301s come with i18n PR-1. Mark i18n plan §1.3 done.

### B.8 Spec updates (#11–#14)

Each one is a content change with a source, plus a dated line in the page's corrections note,
then `pnpm canonical` if the page has a verification text.

- **#11 Operation Eastwood**, Russian cyber-ops hosting page: add the July 2025 Europol operation
  against NoName057(16) (Estonia took part) and RIA's 2025 DDoS count. Use the primary sources
  (Europol press release, RIA yearbook 2026), not the review's summary.
- **#12 CISA / NIS2 mapping**, Nine Dimensions page: a short lineage paragraph (Zwicky/Ritchey
  GMA → Kindervag 2010 → BeyondCorp) and a table mapping the nine dimensions to the CISA ZTMM 2.0
  pillars and NIS2 Art. 21(2) measures. Take the CISA side from the book's
  `appendix-e-cisa-ztmm-crosswalk.md` so the site and book agree.
- **#13 DTM-25-003**: close. #51 already corrected it (`ZeroTrustOctagonResearchPage.tsx:97` and
  its corrections note).
- **#14 Riigikohus**, PIN delegation page: search riigikohus.ee / Riigi Teataja court decisions for
  rulings on a signature made by another person with the holder's PIN. If one exists, cite it and
  rewrite the hedge. If none exists, keep the hedge and add "(Riigi Teataja search, <date>)". If the
  site is still blocked, close as "hedge stands" and say so in the PR.

### #15 `shadow-elevated`: close

Removed on purpose in `6e892f0` ("Drop section rules and card shadows"). DESIGN.md's card spec
has no shadow. Nothing to do.

### PR-B gates

`pnpm typecheck && pnpm lint && pnpm test && pnpm canonical --check && pnpm build`, the
browser check in B.5, then the bmad-code-review round as for #51.

## PR-C: archetype scores · `fix/archetype-scores`

### What the book says

The book (`tomkabel/zero-trust-octagon` @ `41a0712`, `docs/01-foundations/03-octagon-as-instrument.md`
violation matrix) disagrees with itself as well as with the site:

| Axiom | B book matrix / site | C book matrix / site | D book matrix / site |
|---|---|---|---|
| 1 No intrinsic trust | 🟢 / 🔴 | 🟡 / 🔴 | 🟢 / 🔴 |
| 2 Verifiable policy | 🔴 / 🔴 | 🟢 / 🟢 | 🔴 / 🔴 |
| 3 Unbypassable mediation | 🔴 / 🔴 | 🟡 / 🟡 | 🔴 / 🟡 |
| 4 Continuous verification | 🔴 / 🔴 | 🔴 / 🔴 | 🔴 / 🔴 |
| 5 Bounded authority | 🟡 / 🟡 | 🔴 / 🔴 | 🟢 / 🔴 |
| 6 Byzantine fault tolerance | 🔴 / 🔴 | 🔴 / 🔴 | 🔴 / 🔴 |
| 7 Epistemic integrity | 🔴 / 🔴 | 🔴 / 🔴 | 🔴 / 🔴 |
| 8 Bilateral symmetry | 🔴 / 🟡 | 🔴 / 🟡 | 🟡 / 🟡 |

Seven cells differ: B1, B8, C1, C8, D1, D3, D5. The book also conflicts with itself:

- The B chapter (`09-archetype-b-fortune-500.md:72`) lists **Axiom 1 as violated** (VPN subnet
  grants trust to the database), but the matrix scores B1 green. The site follows the chapter.
- The matrix totals are wrong: B is 6.5, not 6, and C is 6, not 5.5. Only D (5.5) is right.
- The matrix's Finding 4 says B and C "do not implement bidirectional verification at all"
  (Axiom 8 red). The site scores both yellow on mutual TLS, which the book never mentions for
  B or C.
- The site's "none of the three non-aspirational deployments fully satisfies more than one axiom"
  (Octagon page) is false under the book's matrix: D satisfies two (1 and 5).

### Decision for the author

The book is the source of truth. Fix it first, then make the site match it. My recommendation,
cell by cell:

- **B1 → 🔴 in the book.** The chapter trace shows the violation; the matrix is wrong.
- **B8, C8 → 🔴 on the site.** The book's text is explicit and the site's mTLS partial has no
  book source.
- **C1 🟡, D1 🟢, D3 🔴, D5 🟢 → site follows the book matrix**, unless you have trace evidence
  the chapters don't show. If you do, put it in the chapter first.
- Fix the totals line (A 0, B 7.5, C 6, D 5.5) and B chapter line 191 ("Six of eight" → "Seven of
  eight violated outright, one partially").

With those rulings the site says: B fails 7 outright and 1 partially (5). C passes 1 (2), fails 5
outright (4–8) and 2 partially (1, 3). D passes 2 (1, 5), fails 5 outright (2, 3, 4, 6, 7) and 1
partially (8).

### Changes once decided

- Book PR: the matrix cells, the totals line, the chapter 09 line 191 count.
- Site: `ZeroTrustOctagonResearchPage.tsx` (matrix paragraph, the "more than one axiom" claim),
  `Fortune500IllusionResearchPage.tsx`, `MoveFastFixItInProdResearchPage.tsx`,
  `SaasGluedLeanDefenseResearchPage.tsx`. Each axiom is named with its number and given the
  book's reason. Add a dated corrections line to each page (the 4 Oct notes already describe the
  previous rescoring, so this is a second entry, not an edit). `NineDimensionsZeroTrustPage.tsx`
  "every non-aspirational archetype fails D7" still holds; leave it.
- `pnpm canonical`. Only the Octagon page has a verification text.
- Add a test (`src/content/archetype-scores.test.ts`): one `ARCHETYPE_SCORES` table in
  `src/content/`, and each page's scoring paragraph must name exactly that table's
  outright/partial axiom numbers. This stops the four pages drifting apart again (the
  "one canonical table" item from the review).

## `.decisions.log`: close

It is already ignored (`.gitignore:3 *.log`), so `git status` doesn't list it and it can't be
committed by accident. It's the decision-picker's local journal, and it records the withdrawn
live-bank choice, so it stays out of the repo. Nothing to do.

## Done when

- PR-A merged; a PR run shows `build` ✓ and `deploy` skipped.
- #46, #49, #50 and the regrouped react PR merged green; #47 and #48 closed with the reason
  given above.
- PR-B merged; `pnpm canonical --check` reports no stale or orphan files; the 6 regenerated texts
  are signed.
- Book fixed and PR-C merged; the archetype test passes.
