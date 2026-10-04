# Plan: locale URLs, hreflang and per-locale prerendering for tomabel.ee

Status: decisions confirmed 2026-09-23; rewritten 2026-10-04 against `main` (route-meta module,
build-time prerender and the Cloudflare Worker already exist); round-2 review applied 2026-10-04
against `fa49a91` (#51 merged); round-3 review applied 2026-10-04 · Author: Claude Code with Tom Kristian Abel

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
`_redirects` / `_headers`) behind Cloudflare, with the Worker on `tomabel.ee/*` for real redirects.

## What already exists on `main`

| Piece | Where | State |
|---|---|---|
| One metadata module, `en` + `et` titles/descriptions, per-language JSON-LD with `inLanguage` | `src/content/route-meta.ts` | done; `Seo.tsx` and `spa-routes.mjs` both import it (Node ≥ 22.18 strips types, no esbuild step) |
| Test: `et` metadata exists exactly for pages not in `englishOnlyArticles`; length limits | `src/content/route-meta.test.ts`, `pnpm test` in CI | done |
| Per-route static shells with own title/description/canonical/og/twitter, self-canonical gate | `scripts/spa-routes.mjs` (`postbuild`) | done, English only |
| Prerendered bodies (two-pass `prerender` → `renderToString`, no inline Suspense scripts, CSP-safe) | `src/entry-server.tsx` → `dist-ssr/`, injected into `#root` | done, English only |
| `hydrateRoot` when the shell has children | `src/main.tsx` | done, gated on `initialLanguage() === 'en'`; no `onRecoverableError` |
| Pristine shell read once; `404.html` derived from it with `noindex` | `spa-routes.mjs` | done |
| `/cookies` redirect stub: `noindex`, `<noscript>` refresh to absolute `https://tomabel.ee/privacy/`, canonical → `/privacy/`; canonical gate checks `pageUrl(redirectRoutes[path] ?? path)` | `spa-routes.mjs` (#51) | done |
| `/cookies/` out of `public/sitemap.xml` and `public/llms.txt` | `public/` (#51) | done |
| `ScrollToTop` seeks a `#fragment` until the lazy page renders it (3 s), else scrolls to top; moves focus to `#main-content` on path change | `src/App.tsx` (#51) | done |
| CI checks verification texts against articles | `pnpm canonical --check` in `static.yml` (#51) | done |
| Edge layer: Markdown for `Accept: text/markdown`, `Link` / `Content-Signal` headers | `worker/index.js` | done; no redirects; deployed by hand |

Gaps this plan closes: no `/et/` URLs, no hreflang, hand-written `public/sitemap.xml` with stale
`lastmod`, legacy IA and `/cookies` redirects are client-side only (`public/_redirects` is dead on
GitHub Pages), the Worker is deployed by hand, Estonian readers never get hydratable markup, and
the stamped per-route JSON-LD has no `id`, so `Seo.tsx` appends a second copy after load.

## Target architecture

| Concern | Decision |
|---|---|
| URL scheme | English at the root (`/disclosures/x/`), Estonian under `/et/` (`/et/disclosures/x/`). |
| URL form | Trailing slash everywhere: internal links, the toggle `href`, canonicals, hreflang, sitemap, the same form `pageUrl` produces today. Never `//`. Redirect `Location` is always absolute (`https://tomabel.ee/…`). |
| Slugs | Same slug in both languages. Translated slugs are out of scope. |
| Language source of truth | The URL. `localStorage` holds only the reader's *preference* and a dismissed-banner flag, both read in effects, never during render. |
| Bilingual routes | Exactly the `routeMeta` entries with an `et` key, minus `redirectRoutes` (`/cookies`). No second list. Includes the legal pages `/privacy`, `/terms`, `/disclosure` (their bodies come from `t`). |
| Toggle | A real `<a href>` to the same page in the other language. Not rendered where no alternate exists. |
| First visit | No automatic redirect. A dismissible "Loe eesti keeles →" banner when the preference is Estonian and an `/et/` version exists. |
| English-only articles | English URL only. `/et/<english-only>/` is a Worker **302** (`Cache-Control: no-store`) to the English URL, so translating it later isn't blocked by cached 301s. |
| Redirect status | **301** only for locale-independent permanent moves: legacy IA and `/cookies` requested at an English URL, and the trailing slash. **302 + `no-store`** for anything whose target depends on translation state: every other redirect of an `/et/` URL, and the rollback switch (3.4 rule 0). |
| Per-page head | Self-referencing canonical; reciprocal `hreflang` `en`, `et`, `x-default` → English; `og:locale`, plus `og:locale:alternate` only when an alternate exists; `<html lang>`; JSON-LD in the page's language. |
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
| 5 | PR packaging | **PR-1 Worker redirects + CI deploy + helpers · PR-2 `/et/` URLs: parts A (client) and B (shells, hreflang, sitemap) in one PR · PR-3 retire compat code** | `/et/` URLs without per-locale shells ship English bodies under Estonian heads, so URLs, shells and head tags go in one PR. |

---

## Phase 0: groundwork

**0.1 Done.** PR #43 is merged (`englishOnlyArticles`, English-derived section ids, `LanguageScope`).

**0.2** Record a baseline:
- `pnpm build && pnpm preview`, then `scripts/i18n-check.py` and `docs/design-audit/qa_checks.py`.
- Save one head block per page, to diff later:
  ```sh
  find pub -name index.html | while read -r f; do
    out="/tmp/heads-before/${f#pub/}"; mkdir -p "$(dirname "$out")"
    sed -n '/<head>/,/<\/head>/p' "$f" > "$out"
  done
  ```
- Export the Search Console Pages report and Performance (clicks, impressions by page and
  country) for the last 28 days **and** the same weeks of 2025. These are the Phase 4 baselines.

**0.3 Done.** `static.yml` no longer copies `index.html` over `404.html`; `spa-routes.mjs` writes
a `noindex` `404.html` from the pristine template.

**0.4 Done.** `pnpm test` runs in CI after Lint; `pnpm canonical --check` after it (#51).

---

## Phase 1: Worker redirects, CI deploy, pure helpers · PR-1 · ≈1 day

No `/et/` URL exists after this PR. Nothing may emit one: `pageUrl`, `jsonLdFor` and the
breadcrumbs stay English-only until PR-2.

**1.1 `worker/redirects.js` (new): `redirectFor(url, env) → { location, status } | null`.** Pure,
imported by `worker/index.js` and `worker/redirects.test.js` (add `worker/**/*.test.js` to
`pnpm test`). Rules, applied to the normalised path (repeated slashes collapsed):
- Legacy, **301**: `/research`, `/writing` → `/disclosures/`; `/projects` → `/systems/`;
  `/research/<slug>`, `/writing/<slug>` → `/disclosures/<slug>/`; `/cookies` → `/privacy/`.
- Trailing slash, **301**: a known route (`routeMeta` key) without its slash → with it.
- Rollback switch (3.4 rule 0, checked before every other rule): when `env.ET_DISABLED` is
  `"302"` or `"301"`, every `/et/…` → its English target in one hop, with that status (`302`
  adds `no-store`). Any other value or unset: off. Tested now so it exists before PR-2 (see
  Rollback).
- Anything else → `null`, the request goes to origin unchanged. Files are never matched.
- Every `Location` is absolute (`https://tomabel.ee` + path) and keeps the query string.

Fail open, `index.js`: `fetch` calls `ctx.passThroughOnException()` as its first statement, so
any uncaught exception (in `redirectFor` or later) sends the request to origin; it still shows
in Worker observability. No `try` around `redirectFor`. Then `redirectFor`, for every method,
then the Markdown branch as now. Module top level does no work that can throw: imports and
constants only (`route-meta.ts`, `locale-path.ts` are data and pure functions).
`redirects.test.js` imports `index.js` itself, so a top-level throw fails `pnpm test` before any
deploy; Cloudflare also rejects an upload whose startup throws, and the live version keeps
serving.

**1.2 `/cookies`.** The Worker 301 replaces the client `<Navigate>` as the primary redirect.
The #51 stub (`pub/cookies/index.html`, noindex + refresh + canonical → `/privacy/`) stays as the
fail-open fallback, and so does the canonical gate's `redirectRoutes` exemption. Move
`redirectRoutes` from `spa-routes.mjs` to `route-meta.ts` (exported) so the build, the Worker and
`bilingualPaths()` share it.

**1.3 Delete `public/_redirects`** (GitHub Pages ignores it). Fix the App.tsx comment that points
at it. The client legacy `<Navigate>` routes stay, permanently (Rollback, PR-3).

**1.4 Deploy the Worker from CI: job `worker` in `static.yml`.**
- `needs: build-and-deploy`, so it runs only after Pages deployed, for `push` and
  `workflow_dispatch` alike. `if: github.ref == 'refs/heads/main' && vars.WORKER_DEPLOY_FROZEN != '1'`.
- Own job: fresh checkout, `pnpm install --frozen-lockfile`,
  `pnpm exec wrangler deploy -c worker/wrangler.jsonc`; `permissions: contents: read`.
  `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` live in their own `cloudflare` environment,
  step-scoped `env`; the Pages job never sees them.
- Token: Account · Workers Scripts:Edit (this account) and Zone · Workers Routes:Edit
  (`tomabel.ee`, because `wrangler.jsonc` declares the route). Cloudflare can't scope a token to
  one Worker script, so this is the floor.
- `wrangler` becomes a pinned devDependency, and the same PR adds `workerd: true` (plus any other
  build the install reports) to `pnpm-workspace.yaml` `allowBuilds`: pnpm 11.5.3 otherwise fails
  the frozen install with `ERR_PNPM_IGNORED_BUILDS`.
- A failed job fails the run and GitHub emails the pusher. That is the alert; nothing else.
- Drift: between the Pages and Worker deploys (minutes), or after a failed Worker job until a
  re-run, every state is safe: state-dependent rules are 302 and unknown paths fall through.
  Worst case a just-retranslated `/et/` URL 302s to English or a just-removed one 404s.
- First CI deploy: before merging PR-1, compare the live Worker (`wrangler deployments list`,
  dashboard Settings: variables, bindings, routes, compatibility date) with `wrangler.jsonc`.
  Anything set only in the dashboard goes into `wrangler.jsonc` or is dropped on purpose:
  `wrangler deploy` replaces it. Hand deploys stop.

**Worker rollback runbook** (any PR): set repo variable `WORKER_DEPLOY_FROZEN=1` →
`pnpm exec wrangler rollback` → fix or revert on `main` (Pages still deploys) → delete the
variable → re-run the workflow (`workflow_dispatch`) so the Worker matches `main`. Without the
freeze, the next push to `main` would redeploy the bad Worker. A freeze variable, not a path
filter: the bundle imports `src/` modules, so a path list is one more thing to keep in step,
and a matching push would still undo the rollback.

**1.5 Stamped JSON-LD gets `id="seo-jsonld"`** in `spa-routes.mjs`, so `Seo.tsx` replaces it
instead of appending a duplicate.

**1.6 Pure path helpers, `src/i18n/locale-path.ts` (new) + `locale-path.test.ts`.** Imports carry
`.ts` extensions and the code is erasable TypeScript only (no `enum`, `namespace`, parameter
properties), so Node's type stripping, the build script and the Worker bundle can load it. Set
`erasableSyntaxOnly: true` in both tsconfigs so `tsc` enforces that for every shared module.
```ts
splitLocale('/et/disclosures/x/')     // → { locale: 'et', path: '/disclosures/x' }
splitLocale('/et') , splitLocale('/et/') // → { locale: 'et', path: '/' }
splitLocale('/disclosures//')         // → { locale: 'en', path: '/disclosures' }
localizePath('/', 'en')               // → '/'
localizePath('/', 'et')               // → '/et/'
localizePath('/disclosures/x', 'et')  // → '/et/disclosures/x/'
localizePath('/et/disclosures/x/', 'en') // → '/disclosures/x/'  (splits first: idempotent)
localizePath('/disclosures/x/#a', 'en') // → '/disclosures/x/#a'
alternateFor('/disclosures/x', 'et')  // → '/et/disclosures/x/' or null
bilingualPaths()                      // routeMeta keys with `et`, minus redirectRoutes keys
```
- `splitLocale` returns the `routeMeta` key form: one leading slash, no trailing slash, `/` for
  root. It collapses repeated slashes and strips trailing ones before matching.
- Match `/et` only as a whole segment: `/etc`, `/ethics`, `/et-foo` are English paths.
- `localizePath` splits off `?…` and `#…`, runs `splitLocale` on the rest, adds the trailing
  slash, prefixes `/et` only for `et`, then re-appends query and hash. Tests assert no output
  contains `//` and `localizePath(localizePath(p, a), b) === localizePath(p, b)`.
- `alternateFor(path, locale)` is `null` unless `path` is in `bilingualPaths()` (English is
  returned for any bilingual path). Redirect routes and English-only articles get `null`. Every
  caller handles `null`: the toggle, `Seo.tsx`, the stamper, the sitemap, the link wrapper.
- Unused by the app in PR-1. Merging it early keeps PR-2's diff to behaviour.

**Rollback PR-1.** Triggers: any Worker exception or redirect loop in Worker observability, or a
legacy URL not answering 301. Action: the runbook in 1.4 (freeze, `wrangler rollback`, revert
PR-1, unfreeze). The client `<Navigate>` routes and the `/cookies` stub still cover everything.
Reverting PR-1 is valid only **before PR-2 merges**: PR-2 builds on `redirectFor`,
`locale-path.ts` and rule 0. After that, roll forward: freeze, `wrangler rollback` to the last
good post-PR-2 version, fix on `main`, unfreeze.

**Acceptance for PR-1**
- `redirectFor` unit tests: every legacy form with/without slash and with a query string;
  trailing-slash rule; unknown paths and files → `null`; `ET_DISABLED` unset / `"302"` /
  `"301"`, including `/et/research/x` → one hop to `/disclosures/x/`; absolute `Location`.
- Locally: `pnpm build && pnpm preview`, then
  `pnpm exec wrangler dev -c worker/wrangler.jsonc --local-upstream localhost:4173`;
  `curl -sI 'localhost:8787/research/botguard-disassembled?x=1'` → `301`,
  `location: https://tomabel.ee/disclosures/botguard-disassembled/?x=1`; `/cookies` → `301`
  to `/privacy/`.
- Fail open, both paths: with a temporary `throw` inside `redirectFor`, `wrangler dev` still
  serves the origin page (200); with a temporary top-level `throw` in `index.js`, `pnpm test`
  fails.
- After merge: the `worker` job is green after the Pages job; the same `curl -sI` against
  `'https://tomabel.ee/…'` answers the same.
- `pnpm typecheck`, `lint`, `test`, `build`, `canonical --check` pass.

---

## PR-2: language in the URL (parts A and B ship together)

Part A (Phase 2) is the client; part B (Phase 3) is the build and the Worker. They are one PR
and one deploy: A without B serves `/et/` URLs from English shells. The split is only for review
and for ordering the work. Acceptance that needs per-locale shells sits under part B.

## Phase 2: client · PR-2 part A · ≈2 days

**2.1 Router, `src/App.tsx`.**
- Both branches put the provider **inside** the router:
  ```tsx
  const tree = <LanguageProvider>{routes}</LanguageProvider>;
  return location === undefined
    ? <BrowserRouter>{tree}</BrowserRouter>
    : <StaticRouter location={location}>{tree}</StaticRouter>;
  ```
- Each page route is declared twice: `path={p}` and, if `p` is in `bilingualPaths()`,
  `path={localizePath(p, 'et')}`. Generate both from one `[path, Page]` list in `App.tsx` so they
  can't drift. `route-meta.test.ts`'s App.tsx parser follows the new shape.
- The page file for `lastmod` (3.3) is a `file` field on each `routeMeta` entry, relative to
  `src/` (`pages/DisclosuresPage.tsx`, `components/PrivacyPolicy.tsx`: the legal pages live in
  `src/components/`). Not in `App.tsx`: `spa-routes.mjs` runs under Node type stripping and
  can't import JSX. `route-meta.ts` is already JSX-free with explicit `.ts` imports, so no new
  route module. `route-meta.test.ts` asserts `src/<file>` exists and `App.tsx` imports
  `./<file without extension>`.
- No client `/et/*` redirect route. Unknown `/et/*` paths are not redirected by the Worker
  either (3.4): origin serves `404.html` and the client renders `NotFound` in Estonian.

**2.2 `LanguageProvider`, `src/i18n/LanguageContext.tsx`.**
- `language = splitLocale(useLocation().pathname).locale`. Pure at render: no `localStorage`, no
  `navigator`. Delete `initialLanguage()` and the `useState` initialiser.
- An effect records the preference: on any `/et/` URL, store `'et'`. English URLs **do not**
  overwrite it, so following an English-only link from `/et/` keeps the reader Estonian.
- The toggle (2.5) is a link, so the provider no longer navigates. `setLanguage(l)` only stores
  the preference; the toggle calls it on click, so an explicit switch to English does overwrite
  `'et'`.
- `<html lang>` is still set in an effect; the shell already carries the right value (3.1).

**2.3 `main.tsx` hydrate decision.**
```ts
const shellLocale = document.documentElement.lang;           // stamped at build time
const urlLocale = splitLocale(location.pathname).locale;
if (root.hasChildNodes() && shellLocale === urlLocale)
  hydrateRoot(root, app, {
    onRecoverableError: (error, info) => console.error('hydration:', error, info.componentStack),
  });
else createRoot(root).render(app);
```
Production React reports a mismatch as minified error #418 through `onRecoverableError`; the
browser check (3.7) fails on it. The only expected `createRoot` case is `404.html` (English
shell, empty `#root`) served for an unknown `/et/` path.

**2.4 Locale-aware links, `src/components/site/link.tsx` (new).** Wraps `Link` and `Navigate`
(`NavLink` and `useNavigate` are unused today; wrap them only if they appear). Localizes:
- string `to` starting with `/`;
- object `to` (`{ pathname, search, hash }`): `pathname` only;
- English-only targets resolve to the English URL (`alternateFor(p, 'et') === null`) and carry
  `state={{ fromLocale: 'et' }}` so the notice in 2.6 shows.

Codemod: 28 files import `Link` from `react-router-dom` (66 `<Link` uses), plus `Navigate` in
`App.tsx` and `Cookies.tsx`; 31 files import from `react-router-dom` in total (hooks such as
`useLocation` stay). ESLint `no-restricted-imports` bans `Link`, `NavLink`, `Navigate`,
`useNavigate` from `react-router-dom` outside `link.tsx`, `App.tsx` and `entry-server.tsx`; the
toggle's one `useNavigate` import in `nav.tsx` carries an
`// eslint-disable-line no-restricted-imports -- toggle target is already localized`.

Raw `<a href>` in content:
- `href`s in `src/content/site.ts` (23 site-relative) stay unprefixed. Components that render
  them through a raw `<a>` (e.g. `entry-row.tsx`) switch to the wrapper or call `localizePath`.
- The seven article pages that set `disclosurePolicyUrl = 'https://tomabel.ee/disclosure/'`: make it
  a site-relative link through the wrapper.
- Files stay as they are: `/public-key.asc`, `/verification/…`, `/llms.txt`, `/sitemap.xml`.
- The link gate (3.6) catches anything missed.

**2.5 Toggle, `src/components/site/nav.tsx`.** The `<button>` becomes a plain
`<a href={alternateFor(path, other)} hrefLang={other}>` with the existing `lang` span. Not the
wrapper: the target is already localized and the wrapper would prefix or strip it again. The
`href` is the alternate only, because the prerender has no search or hash; adding them at render
would be a hydration attribute mismatch React doesn't patch. `onClick`: `setLanguage(other)`,
then for an unmodified primary click `preventDefault()` and
`navigate(alt + location.search + location.hash)`. Middle-click, modifier clicks and "open in new
tab" go to the bare alternate and record no preference: accepted. Not rendered when
`alternateFor` is `null`. Active-state checks compare `splitLocale(...).path`.

**2.6 `LanguageHint` (one component, reads storage and `navigator` in `useEffect`, renders nothing
until then, so prerender and first client render match).**
- Case A, suggestion: English page, `alternateFor(path, 'et')` is not null, preference (stored,
  else `navigator.languages`) is `et`, and not dismissed. Shows "Loe eesti keeles →" linking to
  the alternate. Dismissal is stored under a new key (`langHintDismissed.v1`).
- Case B, English-only notice: English page, no `et` alternate, and `location.state.fromLocale
  === 'et'` **or** stored preference `et`. Browser language is ignored here. Shows
  `translations.et.app.englishOnlyNotice` with a link to `/et/disclosures/`, in an element with
  `lang="et"` (the page is `lang="en"`).
- Case A's text is Estonian too and gets `lang="et"`. Neither case redirects.

**2.7 Transition for existing readers.** Readers who stored `'et'` under the old scheme see
English at root URLs after PR-2. That's intended (the URL decides), but it is not silent: their
stored `'et'` counts as the preference, so Case A shows on every bilingual English page until
dismissed or they click through once. After that, internal links keep them under `/et/`. No
one-off redirect: that would break invariant 5.

**2.8 `ScrollToTop`.** A language switch is a path change where
`splitLocale(prev).path === splitLocale(next).path`. On one: no seek, no scroll to top, no focus
move; the reader stays where they were. Every other change keeps the #51 behaviour. Keep the
previous pathname in the existing `lastPath` ref.

**2.9 English-only markers.** `EntryRow`, `WorkCard` and the home essays keep their logic; the
language now comes from the URL.

**2.10 Locale-aware URLs and JSON-LD.** `pageUrl(path, locale = 'en')` =
`SITE_URL + localizePath(path, locale)`. `jsonLdFor(path, locale)` uses it for `url` and every
`BreadcrumbList` `item` (`/et/`, `/et/disclosures/`). `route-meta.test.ts` changes with it:
`node.url` is expected to equal `pageUrl(path, lang)` when `routes[path].et` exists, else
`pageUrl(path)`; breadcrumb `item`s are checked the same way.

**Acceptance for part A** (dev server, `scripts/i18n-check.py`):
- Toggle `href` equals the alternate in trailing-slash form, never `/et/et/`; clicking it on
  `/disclosures/x/?q=1#a` lands on `/et/disclosures/x/?q=1#a`.
- Toggling on a scrolled page keeps the scroll position.
- Toggle from `/et/…` to English: stored preference becomes `'en'`, and Case A doesn't show on
  the next English page.
- `et-EE` browser, empty storage, on `/disclosures/`: no redirect, Case A visible.
- `en-US` browser, from `/et/disclosures/` click an English-only article: Case B visible, `lang="et"`.
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
- `redirectRoutes` and every `routeMeta` / `jsonLdFor` lookup use the **unprefixed** path.
  Redirect routes are emitted in English only, as now.
- One `stamp(html, path, locale)` sets `<html lang>`, title, description, canonical, `og:*`
  (`og:locale` always; `og:locale:alternate` only when `alternateFor(path, other) !== null`),
  `twitter:*`, the per-page JSON-LD (`id="seo-jsonld"`) and, for bilingual paths, hreflang links:
  ```html
  <link rel="alternate" hreflang="en" href="https://tomabel.ee/disclosures/x/" />
  <link rel="alternate" hreflang="et" href="https://tomabel.ee/et/disclosures/x/" />
  <link rel="alternate" hreflang="x-default" href="https://tomabel.ee/disclosures/x/" />
  ```
  `og:locale` and the hreflang `<link>`s are inserted (the template has none). Every replaced tag
  keeps the existing fail-if-missing check. `/` en is stamped too (hreflang, `og:locale`).

**3.2 Runtime head sync, `Seo.tsx`.** Same tags on client navigation: canonical, `og:locale`,
`og:locale:alternate` (removed when there is no alternate), JSON-LD (already replaced by
`#seo-jsonld`), and hreflang: remove every `link[rel="alternate"][hreflang]` first, then add.
Both `Seo.tsx` and `stamp` build tag values from one function in `src/lib/head-tags.ts`, so they
can't drift. `spa-routes.mjs` loads it under Node type stripping: explicit `.ts` imports,
erasable TypeScript only (1.6). Unknown path → canonical `/` (as now) and no hreflang.

**3.3 Generated sitemap.**
- Delete `public/sitemap.xml`; `spa-routes.mjs` writes `pub/sitemap.xml` from `routeMeta`, minus
  `redirectRoutes`. Bilingual entries carry `<xhtml:link rel="alternate">` for `en`, `et`,
  `x-default`; declare `xmlns:xhtml`.
- `lastmod` per URL = the later of two dates:
  - Page file: `git log -1 --format=%cs -- src/<routeMeta[p].file>` (2.1).
  - Metadata: `git log -1 --no-patch --format=%cs -L '/^  "<key>": {/,/^  },/:src/content/route-meta.ts'`
    with `/` and `.` in `<key>` escaped (`\/disclosures\/x`), because `-L` ends the regex at the
    first bare `/`. Checked on git 2.56: returns the last commit touching that entry's lines.
    When the regex matches nothing, git exits 128 (`fatal: -L parameter … No match`): the
    `execFileSync` call is wrapped in `try`/`catch` and treated like an empty result.
- In CI (`CI=true`): **fail the build** when the checkout is shallow
  (`git rev-parse --is-shallow-repository`) or either lookup is empty or failed. `static.yml`
  sets `fetch-depth: 0` on `actions/checkout`. Locally only, the same cases (new file, uncommitted
  entry) get today's date with a warning.
- Known ceiling: copy edits in `site.ts` / `translations.ts` don't bump `lastmod`.
- `robots.txt` keeps `Sitemap: https://tomabel.ee/sitemap.xml`.

**3.4 Worker: `/et/` rules in `redirectFor`.** First match wins; one hop; query kept; absolute
`Location`. `{ locale, path } = splitLocale(pathname)`; `target` = the legacy / redirect-route
mapping of `path`, else `path`.
0. Rollback switch: `ET_DISABLED` is `"302"` or `"301"` and `locale === 'et'` → that status to
   `localizePath(target, 'en')` (`302` adds `no-store`). Before every other rule, so legacy
   `/et/` URLs also take one hop.
1. `path` is a legacy or redirect route:
   - English request → **301** to `localizePath(target, 'en')` (locale-independent move).
   - `/et/` request → **302 + `no-store`** to `localizePath(target, 'et')` if `target` is
     bilingual, else `localizePath(target, 'en')`: the target locale depends on translation
     state. `/et/research/x` → `/et/disclosures/x/` or `/disclosures/x/`; `/et/cookies` →
     `/et/privacy/`.
2. `locale === 'et'` and `path` is a **known English-only route** (a `routeMeta` key without
   `et`, not a redirect route) → 302 + `no-store` to `localizePath(path, 'en')`.
3. Known route without trailing slash → 301 to the slash form (both locales; rule 2 has already
   taken English-only paths under `/et/`).
4. Anything else, including unknown `/et/*` paths and files → `null`, origin answers.

The Worker imports `locale-path.ts` + `route-meta.ts` (wrangler bundles them), so CI's deploy
(1.4) keeps it in step with the site. No PR-template step.

**3.5 `llms.txt`.** `spa-routes.mjs` appends an "Eesti keeles" section to `pub/llms.txt`:
one line per `bilingualPaths()` entry, `- [<routeMeta[p].et.title>](<pageUrl(p, 'et')>)`.
`public/llms.txt` keeps only the English part.

**3.6 Build gates (fail the build).**
- Each emitted page has exactly one canonical, equal to `pageUrl(redirectRoutes[path] ?? path,
  locale)`: the redirect-route exemption from #51 stays.
- hreflang is reciprocal and self-inclusive; no `hreflang="et"` and no `og:locale:alternate` on a
  path outside `bilingualPaths()`.
- `<html lang>` equals the page's locale. `404.html` is excluded: it keeps the English head and
  is also served for unknown `/et/` paths, where the client renders Estonian.
- An `et` entry means a translated body: for every path in `bilingualPaths()`, at least 50 % of
  the words (lowercased, ≥ 3 letters) in the `/et/` prerender's `#main-content` do not occur in
  the English one. A stub with a translated heading over English text fails. This gate is an
  addition: `englishOnlyArticles` and its route-meta test stay (5.1).
- Sitemap `<loc>` set equals the set of emitted indexable pages.
- No `//` in `new URL(u).pathname` of any emitted internal URL (the `https://` scheme is not a
  hit); no `hreflang="ee"`; `og:locale` ∈ `{en_US, et_EE}`.
- **Link gate**: in every `/et/` page body, resolve each `href` against the page URL (covers
  relative, `/…`, `//tomabel.ee/…`, `http(s)://tomabel.ee/…`). Any `http://tomabel.ee` fails.
  Every same-host result is under `/et/`, an English-only article, or a file from 2.4. The legal
  pages are bilingual, so links to them must be `/et/privacy/` etc. Links carrying `hreflang`
  (the toggle) are exempt.

**3.7 Browser check, `scripts/i18n-check.py`.** Loads every route × locale from `pnpm preview`
and fails on any console error containing `hydration` or `#418`. Not in CI (it needs a
Playwright browser): a **manual pre-merge gate**, a checkbox in the PR-2 and PR-3 descriptions
with the run's summary pasted in. No PR template exists; none is added for two PRs.

**Acceptance for part B (and so for PR-2)**
- `curl -s 'localhost:4173/et/disclosures/'` (`pnpm preview`, no JS): Estonian title,
  description, canonical, hreflang **and body**; `<html lang="et">`.
- `/et/<route>/` in the browser: hydrated, no `onRecoverableError` output (3.7).
- `wrangler dev … --local-upstream localhost:4173` (as in PR-1):
  `/et/disclosures/smart-id-achilles-heel/` → `302`, `cache-control: no-store`, absolute
  English `location`; `'/et/research/botguard-disassembled?x=1'` → one 302 to
  `https://tomabel.ee/disclosures/botguard-disassembled/?x=1`. Same cases as `redirectFor`
  unit tests, which also assert `/et/no-such-page/` → `null`.
- The 404 itself is checked on production only: `vite preview` answers unknown paths with the
  SPA fallback (200), not `404.html`. After deploy,
  `curl -sI 'https://tomabel.ee/et/no-such-page/'` → `404`.
- After deploy: LinkedIn Post Inspector shows Estonian previews for `/et/` URLs; a hreflang
  checker passes on the sitemap; Rich Results Test passes on one English and one Estonian
  article.

---

## Phase 4: ship PR-2 and monitor (≈0.5 day + 6 weeks)

**4.1** Gates: CI runs `typecheck`, `lint`, `test`, `build`, `canonical --check`; by hand
before merge, `i18n-check.py` (3.7) and `qa_checks.py`. Check `wrangler.jsonc` has no
`ET_DISABLED` (a re-land after a rollback must remove it in the same change). Merge; CI deploys
Pages, then the Worker (1.4).

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
| Server error (5xx) | no | Worker errors: the 1.4 runbook (freeze, `wrangler rollback`, fix forward); origin errors: GitHub Pages status | any URL |
| English clicks on bilingual root URLs (Performance) | flat vs. control | see below | see below |

English-clicks rule: compare weekly clicks on bilingual English URLs against (a) the same weeks
of 2025 and (b) the English-only articles as a control, both relative to the 0.2 baseline. Act
only when the bilingual pages had ≥ 30 clicks a week in the baseline (below that, noise
dominates; keep watching). Trigger: −20 % against both comparisons for 2 consecutive weeks →
roll back PR-2.

Also track `/et/` impressions from Estonia; the target is non-zero by week 4.

---

## Phase 5: retire compat code · PR-3 "refactor(i18n): drop pre-URL language compat code" · ≈0.5 day

Purpose: delete code that only existed because language lived in `localStorage`. No behaviour
change for readers; nothing here adds features.

**Starts only after the Phase 4 window (6 weeks) ends without a PR-2 rollback.** Once PR-3 is
merged, PR-2 can only be reverted together with it, so PR-3 must not land while the 4.3
rollback triggers are still live.

**5.1 Delete.**
- `LanguageScope`, `EnglishOnly` and the `englishOnlyArticles` lookup in `Layout`: English-only
  articles now exist only at English URLs, which are `lang="en"` already.
- Any remaining `initialLanguage` reference.
- **Kept**: the client legacy routes (`/research`, `/writing`, `/projects`,
  `LegacyDisclosureRedirect`, `/cookies`). They cost nothing and are the fallback when the Worker
  fails open or is down. `englishOnlyArticles` and its route-meta test also stay (the markers in
  2.9 use it); the body gate in 3.6 is an independent second check.

**5.2 Render-time purity audit.** Grep render paths for `window`, `document`, `localStorage`,
`navigator`, `crypto`. Known: `ErrorBoundary` reads `document` (it only runs on the client, so
it's fine as long as it sits outside `App`). Everything else must be in effects.

**5.3 Framework mode: not planned.** React Router framework mode would replace working code
(`entry-server.tsx`, `stamp`, `Seo.tsx`) for little gain. Revisit only if per-route `meta()`
or loaders become necessary. Any spike must build under the **production CSP with no inline
scripts**: framework mode inlines `window.__reactRouterContext` and module-preload scripts,
which the current CSP blocks. GitHub Pages can't add per-response nonces, so a spike that needs
`'unsafe-inline'` or per-page hashes fails.

**Rollback PR-3.** Triggers, all caused by PR-3's own diff: an English-only article losing
`lang="en"` on its body or rendering differently from before; a new 3.7 hydration error on a
route that was clean before PR-3. Action: revert PR-3. Legacy URL problems are not PR-3's (it no
longer touches them): they go to the Worker (1.4 runbook). Once PR-3 is merged, PR-2 is
revertable only together with it.

**Acceptance for PR-3**
- 3.7 browser check clean across every route × locale; LCP no worse than the 0.2 baseline.
- All earlier gates and QA scripts pass.

---

## Rollback summary

| PR | Trigger | Action | Notes |
|---|---|---|---|
| PR-1 | Worker exceptions / loops; legacy URL not 301 | 1.4 runbook: freeze, `wrangler rollback`, revert, unfreeze | revert only before PR-2 merges, roll forward after; client redirects and the `/cookies` stub still cover legacy URLs |
| PR-2 | English-clicks rule (4.3); hydration errors on English pages; canonical-gate escape | revert PR-2 with `ET_DISABLED: "302"` set in `wrangler.jsonc` `vars`, one merge (Worker deploy not frozen): CI deploys Pages without `/et/` and the Worker with rule 0 | rule 0 ships and is tested in PR-1, so the revert can't remove it; Worker 5xx → 1.4 runbook, not a PR-2 revert; re-landing PR-2 removes `ET_DISABLED` in the same change |
| PR-3 | regression in its own diff (5.x) | revert PR-3 | after PR-3, PR-2 is only revertable together with PR-3 |

**302 or 301 after a PR-2 rollback.** A 302 keeps the `/et/` URLs indexed (Google treats the
source of a temporary redirect as the page), which is right if a relaunch follows within weeks;
a 301 lets them drop out and consolidates on English, but cached 301s then send returning
browsers to English after a relaunch. Rule: roll back with `"302"`. If no relaunch is scheduled
4 weeks later, set `ET_DISABLED: "301"` (one-line change, CI deploys it).

## Summary

| Phase | Scope | PR | Size | Visible to users |
|---|---|---|---|---|
| 0 | baseline (0.1, 0.3, 0.4 done) | — | 0.25 d | none |
| 1 | Worker `redirects.js` (legacy, `/cookies`, slash, rollback switch), CI deploy, JSON-LD id, path helpers | PR-1 | 1 d | legacy URLs answer 301 |
| 2 | URL-driven language, link wrapper, toggle, banners | PR-2 A | 2 d | yes |
| 3 | per-locale shells + bodies, hreflang, sitemap, `/et/` Worker rules, gates | PR-2 B | 1.5 d | previews, indexing |
| 4 | ship + monitor | PR-2 | 0.5 d + 6 wk | — |
| 5 | retire compat code, purity audit | PR-3 | 0.5 d | none |

## Risks

| Risk | Mitigation |
|---|---|
| Google treats `/et/` pages as duplicates | Only bilingual routes get `/et/`; gates block `et` elsewhere; body gate (3.6); Phase 4 thresholds. |
| Missed internal links send Estonian readers to English | Wrapper + ESLint ban + the link gate on prerendered `/et/` bodies (3.6). |
| Worker and site drift | `worker` job runs after the Pages job from the same commit, on push and `workflow_dispatch`; a failure fails the run and GitHub emails (1.4); state-dependent redirects are 302; unknown paths fall through. |
| CI redeploys a rolled-back Worker | `WORKER_DEPLOY_FROZEN` set first in the 1.4 runbook. |
| Worker outage or bug | Handler exceptions pass through to origin (`passThroughOnException`); a top-level throw fails `pnpm test` and is rejected on upload. Not fail-open: CPU-limit kills, Cloudflare incidents, wrong but non-throwing redirects; for those, the 1.4 runbook. Client legacy routes and the `/cookies` stub cover legacy URLs meanwhile. |
| Cached 301 blocks a later translation | `/et/` → English hops are 302 + `no-store`; 301 only for permanent moves. |
| Existing readers with stored `'et'` land on English | Case A banner from their stored preference (2.7). No forced redirect. |
| `lastmod` wrong or missing | CI fails on shallow clones and empty lookups; local-only date fallback. |
| Estonian metadata quality | estonian-mcp checks plus human review, as for the existing entries. |
