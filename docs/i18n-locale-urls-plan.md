# Plan: locale URLs, hreflang and per-locale prerendering for tomabel.ee

Status: decisions confirmed 2026-09-23; rewritten 2026-10-04 against `main` (route-meta module,
build-time prerender and the Cloudflare Worker already exist) · Author: Claude Code with Tom Kristian Abel

## Why

The site still serves both languages at **one URL**. `LanguageProvider` picks the language from
`localStorage`, then `navigator.languages` (`initialLanguage()` in `src/i18n/LanguageContext.tsx`).
The static shells and their prerendered bodies are English. So:

- Googlebot, Bing and AI crawlers never see the Estonian version.
- Link previews (LinkedIn, Slack) always show English metadata.
- A shared link opens in the recipient's language, not the sender's.
- An Estonian reader gets English prerendered text, then the loader, then the Estonian page:
  `main.tsx` throws the markup away with `createRoot` whenever `initialLanguage() !== 'en'`.

Google Search Central's guidance for multilingual sites: one URL per language, versions
cross-linked with `hreflang`, no language switching by cookie or browser setting, no automatic
redirects. This plan does that on the current stack: GitHub Pages origin (static files, ignores
`_redirects` / `_headers`) behind Cloudflare, with the Worker on `tomabel.ee/*` for real 301s.

## What already exists on `main`

| Piece | Where | State |
|---|---|---|
| One metadata module, `en` + `et` titles/descriptions, per-language JSON-LD with `inLanguage` | `src/content/route-meta.ts` | done; `Seo.tsx` and `spa-routes.mjs` both import it (Node ≥ 22.18 strips types, no esbuild step) |
| Test: `et` metadata exists exactly for non-English-only pages; length limits | `src/content/route-meta.test.ts`, `pnpm test` in CI | done |
| Per-route static shells with own title/description/canonical/og/twitter, self-canonical gate | `scripts/spa-routes.mjs` (`postbuild`) | done, English only |
| Prerendered bodies (two-pass `prerender` → `renderToString`, no inline Suspense scripts, CSP-safe) | `src/entry-server.tsx` → `dist-ssr/`, injected into `#root` | done, English only |
| `hydrateRoot` when the shell has children | `src/main.tsx` | done, gated on `initialLanguage() === 'en'` |
| Pristine shell read once; `404.html` derived from it with `noindex` | `spa-routes.mjs` | done |
| Edge layer: Markdown for `Accept: text/markdown`, `Link` / `Content-Signal` headers | `worker/index.js` | done; no redirects yet |

Gaps this plan closes: no `/et/` URLs, no hreflang, hand-written `public/sitemap.xml` with stale
`lastmod`, `/cookies/` is an indexable shell listed in the sitemap, legacy IA redirects are
client-side only (`public/_redirects` is dead on GitHub Pages), and Estonian readers never get
hydratable markup.

## Target architecture

| Concern | Decision |
|---|---|
| URL scheme | English at the root (`/disclosures/x/`), Estonian under `/et/` (`/et/disclosures/x/`). |
| URL form | Trailing slash everywhere: internal links, the toggle `href`, canonicals, hreflang, sitemap, the same form `pageUrl` produces today. Never `//`. |
| Slugs | Same slug in both languages. Translated slugs are out of scope. |
| Language source of truth | The URL. `localStorage` holds only the reader's *preference* and a dismissed-banner flag, both read in effects, never during render. |
| Bilingual routes | Exactly the `routeMeta` entries with an `et` key, minus `/cookies`. No second list. |
| Toggle | A real `<a href>` to the same page in the other language. Not rendered where no alternate exists. |
| First visit | No automatic redirect. A dismissible "Loe eesti keeles →" banner when the preference is Estonian and an `/et/` version exists. |
| English-only articles | English URL only. `/et/<english-only>/` is a real **301** to the English URL, done by the Worker. |
| Per-page head | Self-referencing canonical; reciprocal `hreflang` `en`, `et`, `x-default` → English; `og:locale` / `og:locale:alternate`; `<html lang>`; JSON-LD in the page's language. |
| Codes | `hreflang="et"`, `og:locale="et_EE"`, `<html lang="et">`. **Never `ee`** (Ewe). |

## Decisions (confirmed 2026-09-23)

All five stand; the code on `main` makes none of them impossible. Fixed invariants:
English at the root, Estonian under `/et/`, self-referencing canonicals, `x-default` → English,
no automatic language redirect.

| # | Decision | Chosen | Runner-up, and why it lost |
|---|---|---|---|
| 1 | URL scheme | **English at the root, Estonian under `/et/`** | Estonian at the root suits `.ee`, but every indexed English URL would move. The Worker now makes real 301s possible, so this is a ranking-risk argument, not a hosting one. |
| 2 | Slugs | **Same English slugs under `/et/`** | Translated slugs need a slug map per route. They can be added later without changing anything else. |
| 3 | Estonian metadata copy | **Claude drafts, estonian-mcp checks, Tom reviews** | **Done**: `et` entries are in `route-meta.ts` and tested. New articles follow the same rule. |
| 4 | Toggle on English-only articles | **No toggle. A notice links back to `/et/disclosures/`** | A toggle to `/et/disclosures/` silently changes pages. Precedent (DWP design system) shows the toggle only where both versions exist. |
| 5 | PR packaging | **PR-1 Worker redirects + groundwork · PR-2 `/et/` URLs with per-locale prerender, hreflang, sitemap · PR-3 cleanup and remaining prerender gaps** | `/et/` URLs without per-locale shells ship English bodies under Estonian heads, so URLs, shells and head tags go in one PR. |

---

## Phase 0: groundwork

**0.1 Done.** PR #43 is merged (`englishOnlyArticles`, English-derived section ids, `LanguageScope`).

**0.2** Record a baseline:
- `pnpm build && pnpm preview`, then `scripts/i18n-check.py` and `docs/design-audit/qa_checks.py`.
- Save the head blocks to diff against later:
  `for f in pub/**/index.html; do sed -n '/<head>/,/<\/head>/p' $f; done > /tmp/heads-before.txt`.
- Export the Search Console Pages report and 28-day Performance (clicks, impressions by page
  and country). These are the rollback baselines in Phase 4.

**0.3 Done.** `static.yml` no longer copies `index.html` over `404.html`; `spa-routes.mjs` writes
a `noindex` `404.html` from the pristine template.

**0.4 Done.** `pnpm test` (`node --experimental-strip-types --test 'src/**/*.test.ts'`) runs in CI
after Lint.

---

## Phase 1: Worker redirects and pure helpers · PR-1 · ≈1 day

No `/et/` URL exists after this PR. Nothing may emit one: `pageUrl`, `jsonLdFor` and the
breadcrumbs stay English-only until PR-2.

**1.1 Real 301s in the Worker, `worker/index.js`.** Before the Markdown branch, for every method:
- `/research`, `/writing` → `/disclosures/`; `/projects` → `/systems/`;
  `/research/<slug>`, `/writing/<slug>` → `/disclosures/<slug>/`. With or without trailing
  slash; query string preserved.
- Delete `public/_redirects` (GitHub Pages ignores it; it only misleads).
- Keep the client `<Navigate>` routes in `App.tsx` for now; PR-3 deletes them.
- Unit-test the redirect table: export a pure `redirectFor(url) → string | null` and test it
  with `node:test` (`worker/index.test.js`; add the glob to `pnpm test`).

**1.2 `/cookies` stays a noindex redirect stub.**
- `spa-routes.mjs` stamps `<meta name="robots" content="noindex" />` into `pub/cookies/index.html`
  and its canonical points at `/privacy/`. The client `<Navigate>` to `/privacy` stays.
- Remove `/cookies/` from `public/sitemap.xml`. It never gets an `/et/` shell (1.3's
  `bilingualPaths` excludes it).

**1.3 Pure path helpers, `src/i18n/locale-path.ts` (new) + `locale-path.test.ts`.** Imports carry
`.ts` extensions so Node, the build script and the Worker bundle can load it.
```ts
splitLocale('/et/disclosures/x/')     // → { locale: 'et', path: '/disclosures/x' }
splitLocale('/et') , splitLocale('/et/') // → { locale: 'et', path: '/' }
splitLocale('/disclosures//')         // → { locale: 'en', path: '/disclosures' }
localizePath('/', 'en')               // → '/'
localizePath('/', 'et')               // → '/et/'
localizePath('/disclosures/x', 'et')  // → '/et/disclosures/x/'
localizePath('/disclosures/x/#a', 'en') // → '/disclosures/x/#a'
alternateFor('/disclosures/x', 'et')  // → '/et/disclosures/x/' or null
bilingualPaths()                      // routeMeta keys with `et`, minus '/cookies'
```
- `splitLocale` returns the `routeMeta` key form: one leading slash, no trailing slash, `/` for
  root. It collapses repeated slashes and strips trailing ones before matching.
- Match `/et` only as a whole segment: `/etc`, `/ethics`, `/et-foo` are English paths.
- `localizePath` splits off `?…` and `#…`, normalises the path, adds the trailing slash, prefixes
  `/et` only for `et`, then re-appends query and hash. Tests assert no output contains `//`.
- `alternateFor(path, locale)` returns `null` when the route is unknown or has no entry for that
  locale. Its return type is `string | null`, so every caller must handle `null` (the toggle,
  `Seo.tsx`, the stamper, the sitemap, the link wrapper).
- Unused by the app in PR-1. Merging it early keeps PR-2's diff to behaviour.

**Rollback PR-1.** Triggers: any 5xx or redirect loop in Worker observability, or a legacy URL
not answering 301 in a `curl -sI` spot check. Action: `npx wrangler rollback` (Worker), then
revert the repo commit. The client `<Navigate>` routes still cover legacy URLs, so nothing breaks.

**Acceptance for PR-1**
- `curl -sI https://tomabel.ee/research/botguard-disassembled` → `301`,
  `location: /disclosures/botguard-disassembled/`.
- `pub/cookies/index.html` has `noindex`; the sitemap has no `/cookies/`.
- `pnpm typecheck`, `lint`, `test`, `build`, `canonical` (no change) pass.

---

## Phase 2: language in the URL · PR-2 part A · ≈2 days

**2.1 Router, `src/App.tsx`.**
- Both branches put the provider **inside** the router:
  ```tsx
  const tree = <LanguageProvider>{routes}</LanguageProvider>;
  return location === undefined
    ? <BrowserRouter>{tree}</BrowserRouter>
    : <StaticRouter location={location}>{tree}</StaticRouter>;
  ```
- Each page route is declared twice: `path={p}` and, if `p` is in `bilingualPaths()`,
  `path={localizePath(p, 'et')}`. Generate both from one `[path, element]` list so they can't
  drift. `route-meta.test.ts`'s App.tsx parser must follow the new shape.
- No client `/et/*` redirect route: the Worker 301s `/et/<english-only>/` (3.4). Unknown
  `/et/*` renders `NotFound` in Estonian.

**2.2 `LanguageProvider`, `src/i18n/LanguageContext.tsx`.**
- `language = splitLocale(useLocation().pathname).locale`. Pure at render: no `localStorage`, no
  `navigator`. Delete `initialLanguage()` and the `useState` initialiser.
- An effect records the preference: on any `/et/` URL, store `'et'`. English URLs **do not**
  overwrite it, so following an English-only link from `/et/` keeps the reader Estonian.
- `setLanguage(l)` (toggle only) stores `l` and navigates to `alternateFor(path, l)` plus search
  and hash (section ids are English-derived since PR #43). If that is `null`, it stores the
  preference and doesn't navigate.
- `<html lang>` is still set in an effect; the shell already carries the right value (3.1).

**2.3 `main.tsx` hydrate decision.**
```ts
const shellLocale = document.documentElement.lang;           // stamped at build time
const urlLocale = splitLocale(location.pathname).locale;
if (root.hasChildNodes() && shellLocale === urlLocale) hydrateRoot(root, app);
else createRoot(root).render(app);
```
The only mismatch left is `404.html` (English shell, empty `#root`) served for an unknown
`/et/` path, which renders from scratch.

**2.4 Locale-aware links, `src/components/site/link.tsx` (new).** Wraps `Link`, `NavLink`,
`Navigate` and exports `useLocaleNavigate`. Localizes:
- string `to` starting with `/`;
- object `to` (`{ pathname, search, hash }`): `pathname` only;
- `navigate('/x')` and `navigate({ pathname })` through `useLocaleNavigate`;
- English-only targets resolve to the English URL (`alternateFor(p, 'et') === null`) and carry
  `state={{ fromLocale: 'et' }}` so the notice in 2.6 shows.

Codemod the 29 files importing `react-router-dom` (57 `<Link>`/`<NavLink>` uses). ESLint
`no-restricted-imports` bans `Link`, `NavLink`, `Navigate`, `useNavigate` from
`react-router-dom` outside `link.tsx`, `App.tsx` and `entry-server.tsx`.

Raw `<a href>` in content:
- `href`s in `src/content/site.ts` (23) stay unprefixed. Components that render them through a raw
  `<a>` (e.g. `entry-row.tsx`) switch to the wrapper or call `localizePath`.
- The seven article pages that set `disclosurePolicyUrl = 'https://tomabel.ee/disclosure/'`: make it
  a relative link through the wrapper.
- Files stay as they are: `/public-key.asc`, `/verification/…`, `/llms.txt`, `/sitemap.xml`.
- The build gate 3.5 catches anything missed.

**2.5 Toggle, `src/components/site/nav.tsx`.** The `<button>` becomes a wrapper `<Link>` to
`alternateFor(path, other)` with `hrefLang={other}` and the existing `lang` span. Not rendered
when that is `null`. Active-state checks compare `splitLocale(...).path`.

**2.6 `LanguageHint` (one component, reads storage and `navigator` in `useEffect`, renders nothing
until then, so prerender and first client render match).**
- Case A, suggestion: English page, `alternateFor(path, 'et')` is not null, preference (stored,
  else `navigator.languages`) is `et`, and not dismissed. Shows "Loe eesti keeles →" linking to
  the alternate. Dismissal is stored under a new key (`langHintDismissed.v1`).
- Case B, English-only notice: English page, no `et` alternate, and `location.state.fromLocale
  === 'et'` **or** stored preference `et`. Browser language is ignored here. Shows
  `t.app.englishOnlyNotice` in Estonian with a link to `/et/disclosures/`.
- Neither redirects.

**2.7 Transition for existing readers.** Readers who stored `'et'` under the old scheme see
English at root URLs after PR-2. That's intended (the URL decides), but it is not silent: their
stored `'et'` counts as the preference, so Case A shows on every bilingual English page until
dismissed or they click through once. After that, internal links keep them under `/et/`. No
one-off redirect: that would break invariant 5.

**2.8 `ScrollToTop`.** Keep focus handling keyed on `splitLocale(pathname).path`. A language
switch keeps the hash target in view instead of scrolling to the top.

**2.9 English-only markers.** `EntryRow`, `WorkCard` and the home essays keep their logic; the
language now comes from the URL.

**2.10 Locale-aware URLs and JSON-LD, same PR.** `pageUrl(path, locale)` =
`SITE_URL + localizePath(path, locale)`. `jsonLdFor(path, locale)` uses it for `url` and every
`BreadcrumbList` `item` (`/et/`, `/et/disclosures/`). Lands in PR-2 because PR-2 is the first to
emit `/et/` pages.

**Acceptance for Phase 2**, extending `scripts/i18n-check.py`:
- `/et/<route>/`: `<html lang="et">`, Estonian body, title from `routeMeta[p].et`, **no**
  hydration warning (hydrated, not re-rendered).
- Toggle `href` equals the alternate with the same hash, in trailing-slash form.
- `et-EE` browser, empty storage, on `/disclosures/`: no redirect, Case A visible.
- `en-US` browser, from `/et/disclosures/` click an English-only article: Case B visible.
- Stored `'et'` from before the change, on `/`: Case A visible.

---

## Phase 3: per-locale shells, hreflang, sitemap, Worker · PR-2 part B · ≈1.5 days

**3.1 Emit pages, `scripts/spa-routes.mjs`.**
- Read the pristine shell template **once**, before any write (as now). Every page and
  `404.html` is derived from that in-memory string, never re-read from `pub/`. The home-page
  gate checks the template string, not `pub/index.html`.
- Loop over `routeMeta` paths × locales (`en` always; `et` when in `bilingualPaths()`).
  Write `pub${localizePath(path, locale)}index.html`: `/` en → `pub/index.html`, `/` et →
  `pub/et/index.html`.
- Body: `render(localizePath(path, locale))`, so `/et/` shells carry Estonian markup.
- The `redirectRoutes` lookup (`/cookies`) and every `routeMeta` / `jsonLdFor` lookup use the
  **unprefixed** path.
- One `stamp(html, path, locale)` sets `<html lang>`, title, description, canonical, `og:*`
  (including `og:locale` and `og:locale:alternate`), `twitter:*`, the per-page JSON-LD and, when
  both alternates are non-null, hreflang links:
  ```html
  <link rel="alternate" hreflang="en" href="https://tomabel.ee/disclosures/x/" />
  <link rel="alternate" hreflang="et" href="https://tomabel.ee/et/disclosures/x/" />
  <link rel="alternate" hreflang="x-default" href="https://tomabel.ee/disclosures/x/" />
  ```
  `og:locale` and the hreflang `<link>`s are inserted (the template has none). Every replaced tag
  keeps the existing fail-if-missing check. `/` en is stamped too (hreflang, `og:locale`).

**3.2 Runtime head sync, `Seo.tsx`.** Same tags on client navigation: canonical, hreflang links
(remove and re-add), `og:locale`, JSON-LD. Both `Seo.tsx` and `stamp` build tag values from one
function in `src/lib/head-tags.ts`, so they can't drift. Unknown path → canonical `/` (as now)
and no hreflang.

**3.3 Generated sitemap.**
- Delete `public/sitemap.xml`; `spa-routes.mjs` writes `pub/sitemap.xml` from `routeMeta`, minus
  `/cookies`. Bilingual entries carry `<xhtml:link rel="alternate">` for `en`, `et`, `x-default`;
  declare `xmlns:xhtml`.
- `lastmod` per URL = the later of:
  - `git log -1 --format=%cs -- <page file>`. The page file comes from the route's import in
    `App.tsx`; the `[path, element]` list in 2.1 carries it.
  - `git log -1 --format=%cs -L '/^  "<path>": {/,/^  },/:src/content/route-meta.ts'`.
- **Fail the build** when the checkout is shallow (`git rev-parse --is-shallow-repository`) or
  either lookup returns nothing. No build-date fallback. CI: `fetch-depth: 0` in
  `actions/checkout`.
- Known ceiling: copy edits in `site.ts` / `translations.ts` don't bump `lastmod`.
- `robots.txt` keeps `Sitemap: https://tomabel.ee/sitemap.xml`.

**3.4 Worker: `/et/` redirects.** In `redirectFor`: a request under `/et/` whose unprefixed path
is not bilingual → 301 to `localizePath(path, 'en')`. Covers English-only articles, legacy
`/et/research/…` (chains to the canonical in one hop) and `/et/cookies/`. The Worker imports
`locale-path.ts` + `route-meta.ts` (wrangler bundles them). **Deploy the Worker in the same
release as PR-2**, before the Pages deploy, and redeploy it whenever `routeMeta` gains or loses
an `et` entry. Add that to the PR template.

**3.5 `llms.txt`.** Add an "Eesti keeles" section listing the `/et/` URLs.

**3.6 Build gates (fail the build).**
- Each emitted page has exactly one canonical, equal to its own `pageUrl(path, locale)`.
- hreflang is reciprocal and self-inclusive; no `hreflang="et"` on a path outside
  `bilingualPaths()`.
- `<html lang>` equals the page's locale, and the body's `lang` matches it.
- Sitemap `<loc>` set equals the set of emitted indexable pages.
- No `//` in any emitted internal URL; no `hreflang="ee"`; `og:locale` ∈ `{en_US, et_EE}`.
- **Link gate**: in every `/et/` page body, each `href` starting with `/` or
  `https://tomabel.ee/` is under `/et/`, an English-only article, or a file from 2.4.

**Acceptance for Phase 3**
- `curl -s https://<preview>/et/disclosures/` with no JS: Estonian title, description, canonical,
  hreflang **and body**.
- `curl -sI /et/disclosures/smart-id-achilles-heel/` → `301` to the English URL.
- LinkedIn Post Inspector shows Estonian previews for `/et/` URLs.
- A hreflang checker passes on the sitemap. Rich Results Test passes on one English and one
  Estonian article.

---

## Phase 4: ship PR-2 and monitor (≈0.5 day + 6 weeks)

**4.1** Gates: `typecheck`, `lint`, `test`, `build`, `canonical` (no change), `i18n-check.py`,
`qa_checks.py`. Order: Worker deploy, then merge (Pages deploy).

**4.2** Search Console: resubmit `sitemap.xml`; URL Inspection plus request indexing on `/et/`,
`/et/disclosures/` and two `/et/` articles.

**4.3 Weekly monitoring, Pages report filtered to `/et/` unless stated.**

| Status | Expected | Action | Threshold |
|---|---|---|---|
| Discovered / Crawled – currently not indexed | yes, weeks 1–4 | none; then request indexing for the top 5 | > 50 % of `/et/` URLs still here at week 6 |
| Duplicate, Google chose different canonical | no | inspect the pair; compare body language and hreflang; fix the copy or the tags | any URL for 2 consecutive weeks, or > 25 % at week 4 → consider dropping `et` for those routes |
| Alternate page with proper canonical tag | no (self-canonicals) | canonical bug: fix the stamp, add a gate | any URL |
| Not found (404) | no | missing shell or Worker rule; fix within a day | any URL |
| Page with redirect | only English-only and legacy `/et/` URLs | fine; if a sitemap URL appears, the sitemap gate failed | any sitemap URL |
| Excluded by 'noindex' | only `/cookies/` | bug | any other URL |
| Server error (5xx) | no | `wrangler rollback`, then investigate | any URL |
| English pages: clicks (Performance, root URLs) | flat | compare with the 0.2 baseline | −20 % for 2 consecutive weeks → rollback PR-2 |

Also track `/et/` impressions from Estonia; the target is non-zero by week 4.

---

## Phase 5: remaining prerender gaps · PR-3 · ≈1 day

Prerender and hydration already exist (`entry-server.tsx`, `spa-routes.mjs`, `main.tsx`). After
PR-2 the shells are per-locale. What's left:

**5.1 Delete compat code.**
- `LanguageScope`, `EnglishOnly` and the `englishOnlyArticles` lookup in `Layout`: English-only
  articles now exist only at English URLs.
- The client legacy routes (`/research`, `/writing`, `/projects`, `LegacyDisclosureRedirect`):
  the Worker owns them since PR-1.
- Any remaining `initialLanguage` reference.

**5.2 Render-time purity audit.** Grep render paths for `window`, `document`, `localStorage`,
`navigator`, `crypto`. Known: `ErrorBoundary` reads `document` (it only runs on the client, so
it's fine as long as it sits outside `App`). Everything else must be in effects.

**5.3 Hydration check.** No hydration warnings across every route × locale, checked in the
Playwright run (`i18n-check.py`).

**5.4 Framework mode: not planned.** React Router framework mode would replace working code
(`entry-server.tsx`, `stamp`, `Seo.tsx`) for little gain. Revisit only if per-route `meta()`
or loaders become necessary. Any spike must build under the **production CSP with no inline
scripts**: framework mode inlines `window.__reactRouterContext` and module-preload scripts,
which the current CSP blocks. GitHub Pages can't add per-response nonces, so a spike that needs
`'unsafe-inline'` or per-page hashes fails.

**Rollback PR-3.** Triggers: hydration warnings or a legacy URL not redirecting. Action: revert
PR-3. Note that PR-3 deletes code PR-2 left in place: once PR-3 is merged, PR-2 **cannot be
reverted on its own**. Revert PR-3 first, then PR-2 (or both in one revert).

**Acceptance for PR-3**
- Raw HTML of any page, either locale, contains its body text.
- No hydration warnings; LCP no worse than the 0.2 baseline.
- All earlier gates and QA scripts pass.

---

## Rollback summary

| PR | Trigger | Action | Notes |
|---|---|---|---|
| PR-1 | Worker 5xx / loops; legacy URL not 301 | `wrangler rollback`, revert | client redirects still cover legacy URLs |
| PR-2 | English clicks −20 % for 2 weeks; any 5xx; hydration errors on English pages; canonical-gate escape | revert PR-2 and deploy a Worker rule `/et/*` → 301 to the English URL | `/et/` URLs may be indexed by then; the 301 hands their signals to English instead of 404ing |
| PR-3 | hydration warnings; legacy URL broken | revert PR-3 | after PR-3, PR-2 is only revertable together with PR-3 |

## Summary

| Phase | Scope | PR | Size | Visible to users |
|---|---|---|---|---|
| 0 | baseline (0.1, 0.3, 0.4 done) | — | 0.25 d | none |
| 1 | Worker 301s, `/cookies` noindex, path helpers | PR-1 | 1 d | legacy URLs answer 301 |
| 2 | URL-driven language, link wrapper, toggle, banners | PR-2 | 2 d | yes |
| 3 | per-locale shells + bodies, hreflang, sitemap, `/et/` 301s | PR-2 | 1.5 d | previews, indexing |
| 4 | ship + monitor | PR-2 | 0.5 d + 6 wk | — |
| 5 | delete compat code, purity audit, hydration check | PR-3 | 1 d | none |

## Risks

| Risk | Mitigation |
|---|---|
| Google treats `/et/` pages as duplicates | Only bilingual routes get `/et/`; gates block `et` elsewhere; Phase 4 thresholds. |
| Missed internal links send Estonian readers to English | Wrapper + ESLint ban + the link gate on prerendered `/et/` bodies (3.6). |
| Worker and site drift (new bilingual article, old Worker) | Worker imports `route-meta.ts`; the PR template requires a Worker redeploy when `et` entries change. |
| Existing readers with stored `'et'` land on English | Case A banner from their stored preference (2.7). No forced redirect. |
| `lastmod` wrong or missing | Build fails on shallow clones and empty lookups; no date fallback. |
| Estonian metadata quality | estonian-mcp checks plus human review, as for the existing entries. |
