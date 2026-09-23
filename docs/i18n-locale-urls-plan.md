# Plan: locale URLs, hreflang and prerendering for tomabel.ee

Status: decisions confirmed 2026-09-23, ready for Phase 0 · Author: Claude Code with Tom Kristian Abel
Depends on: PR #43 (`englishOnlyArticles`, English-derived section ids, `LanguageScope`).

## Why

Today the site serves both languages at **one URL**. The language comes from `localStorage` and
`navigator.languages`. Everything outside the reader's own browser therefore sees English only:

- Googlebot and Bing never see the Estonian version.
- Link previews (LinkedIn, Slack) show the English `pub/<route>/index.html` metadata.
- A shared link opens in the recipient's language, not the sender's.
- `<title>` and meta tags stay English under `<html lang="et">`.
- Page titles and descriptions live in two hand-synced copies: `src/components/Seo.tsx` META
  (28 entries) and `scripts/spa-routes.mjs` META (27).

Google Search Central's guidance on multilingual sites is to use a separate URL per language,
cross-link the versions with `hreflang`, not switch language with cookies or browser settings,
and not redirect automatically. This plan implements that within GitHub Pages' limits: static
files only, no server, no headers, no real 301s.

## Target architecture

| Concern | Decision |
|---|---|
| URL scheme | English at the root (`/disclosures/x/`), Estonian under `/et/` (`/et/disclosures/x/`). Trailing-slash canonical form, as today. |
| Slugs | Same slug in both languages. Translated slugs are out of scope. |
| Language source of truth | The URL. `localStorage` stores only the reader's *preference* and a dismissed-banner flag. |
| Toggle | A real `<a href>` to the matching page in the other language. On English-only articles there is no Estonian version, so no toggle. A banner explains instead. |
| First visit | No automatic redirect. If the browser prefers Estonian and an `/et/` version exists, show a dismissible "Loe eesti keeles →" banner. |
| English-only articles | English URL only. No `/et/` page, no `et` hreflang, not in the Estonian sitemap entries. `/et/<english-only>` redirects on the client to the English URL, and the build emits nothing there. |
| Metadata | One typed module, `src/content/route-meta.ts`, read by the runtime (`Seo.tsx`), the build (static pages, sitemap) and later React Router `meta()` exports. |
| Per-page head | Self-referencing canonical, reciprocal `hreflang` (`en`, `et`, `x-default` → en), `og:locale` / `og:locale:alternate`, per-language JSON-LD with `inLanguage`. |
| Codes | `hreflang="et"`, `og:locale="et_EE"`, `<html lang="et">`. **Never `ee`**: that is Ewe, not Estonian, and it's the most common mistake on `.ee` sites. |

## Decisions (confirmed 2026-09-23)

Each decision was scored against fit, reversibility and precedent, then Tom picked. All five
went to the recommended option.

| # | Decision | Chosen | Runner-up, and why it lost |
|---|---|---|---|
| 1 | URL scheme | **English at the root, Estonian under `/et/`** | Estonian at the root would suit the `.ee` domain, but every indexed English URL would move, and GitHub Pages can't do real 301s. |
| 2 | Slugs | **Same English slugs under `/et/`** | Translated slugs would look native, but need a slug map per route. They can be added later without changing anything else. |
| 3 | Estonian metadata copy | **Claude drafts (estonian-mcp checks: spelling, compounds, bureaucratic style), Tom reviews every string in PR-1** | Tom writing all of it keeps his voice but costs more of his time. Machine translation with no review was excluded: PRODUCT.md requires bilingual precision. |
| 4 | Toggle on English-only articles | **No toggle. A banner links back to `/et/disclosures/`** | A toggle to `/et/disclosures/` stays visible but silently changes pages. This first came out too close to call; checking precedent settled it (the DWP design system shows its toggle only where a page exists in both languages). |
| 5 | PR packaging | **PR-1 metadata · PR-2 language URLs + static pages · PR-3 prerender** | One big PR would mix a framework migration into the i18n review and can't be partly rolled back. One PR per phase was excluded: `/et/` URLs without static pages break direct loads. |

---

## Phase 0: groundwork (≈0.5 day)

**0.1** Merge PR #43 and branch from `main`.

**0.2** Record a baseline:
- `pnpm build && pnpm preview`, then run `scripts/i18n-check.py` and `docs/design-audit/qa_checks.py`.
- Save `pub/**/index.html` head blocks to diff against later:
  `for f in pub/**/index.html; do sed -n '/<head>/,/<\/head>/p' $f; done > /tmp/heads-before.txt`.
- Export the Search Console indexing report (pages indexed now) so the rollout has a
  before/after.

**0.3** Fix an unrelated CI bug found during analysis. `.github/workflows/static.yml:50` runs
`cp pub/index.html pub/404.html` *after* `pnpm build`, which overwrites the `noindex` 404 that
`postbuild` (`spa-routes.mjs`) generates. Delete that step. Acceptance: the deployed `/404.html`
contains `<meta name="robots" content="noindex" />`.

**0.4** Add a unit-test runner with no new dependency, using Node's built-in `node:test`:
- `"test": "node --experimental-strip-types --test 'src/**/*.test.ts'"`.
- Add `pnpm test` to CI after Lint.
- If the Node version on CI or locally doesn't support type stripping, compile with esbuild
  (already a devDependency), the same way `canonical-text.mjs` does.

---

## Phase 1: one metadata source (recommendation 4) · PR-1 · ≈1 day + translation review

No visible behaviour change. Removes the duplicate copy and adds the Estonian metadata.

**1.1 Route registry, `src/routes.ts` (new).** One array that everything else derives from:
```ts
export type RouteDef = {
  path: string;             // unprefixed, no trailing slash: '/', '/disclosures/smart-id-achilles-heel'
  page: () => Promise<{ default: React.ComponentType }>; // lazy import
  locales: readonly Locale[]; // ['en','et'] or ['en'] for English-only articles
};
```
- `locales` is derived from `englishOnlyArticles` so there is one list, not two.
- Include `/`, the index pages, the articles, `/about`, `/my-story`, `/privacy`, `/terms`,
  `/disclosure`.
- Legacy redirects (`/research`, `/writing`, `/projects`, `/research/:slug`, `/writing/:slug`,
  `/cookies`) stay in `App.tsx` and are **not** in the registry. They are not pages.

**1.2 Metadata module, `src/content/route-meta.ts` (new):**
```ts
type Meta = { title: string; description: string; type?: 'website' | 'article'; jsonLd?: object };
export const routeMeta: Record<RoutePath, { en: Meta; et?: Meta }>;
```
- Move the 28 entries from `Seo.tsx` into it. Compare them against the 27 in `spa-routes.mjs`
  and settle every difference; the spa-routes version is usually the edited one. Record each
  decision in the PR.
- Write `et` for every route whose `locales` includes `et`.
- Put `inLanguage: 'et'` / `'en'` in each JSON-LD `BlogPosting` and `WebPage`.
- The `BreadcrumbList` `item` URLs use the language's own URLs (`https://tomabel.ee/et/...`).
- Type it with `satisfies` so a route without `en`, or a bilingual route without `et`, fails `tsc`.

**1.3 Estonian copy quality.** For each `et.title` / `et.description`, run estonian-mcp
`spell_check`, `check_compound_familiarity`, `check_officialese` and `check_style`. Keep titles
≤ 60 characters and descriptions ≤ 155, and check with a small script. Then a human reviews.

**1.4 Runtime reads the module.**
- `Seo.tsx` looks up `routeMeta[path][language] ?? routeMeta[path].en` and deletes its local META.
- The current language still comes from context here. Phase 2 changes where the context gets it.

**1.5 Build reads the module.**
- `spa-routes.mjs` bundles `src/routes.ts` + `src/content/route-meta.ts` with esbuild into
  `node_modules/.spa-routes/meta.mjs` (the pattern `canonical-text.mjs` already uses) and imports it.
- Delete the script's own META.
- Replace the "Seo.tsx and spa-routes in sync" gate: it is no longer needed. The new gate is
  that every registry route has `meta.en`.

**Acceptance for PR-1**
- `diff /tmp/heads-before.txt` against a fresh dump: only the intended metadata fixes from 1.2 differ.
- `pnpm typecheck`, `lint`, `build`, `test`, `canonical` (no change) all pass, and both QA scripts pass.
- The unit test `route-meta.test.ts` checks:
  - every registry path has `en`;
  - every bilingual path has `et`;
  - no English-only path has `et`;
  - title and description length limits.

---

## Phase 2: language in the URL (recommendations 1 + 2) · PR-2 part A · ≈2 days

**2.1 Pure path helpers, `src/i18n/locale-path.ts` (new), plus a test.**
```ts
export const DEFAULT_LOCALE = 'en';
splitLocale('/et/disclosures/x')  // → { locale: 'et', path: '/disclosures/x' }
splitLocale('/disclosures/x')     // → { locale: 'en', path: '/disclosures/x' }
localizePath('/disclosures/x', 'et') // → '/et/disclosures/x'; for 'en' → unchanged
alternateFor(path, locale)        // → localized path, or null if the route lacks that locale
```
- Handle `/et` and `/et/` → `/`.
- Don't match `/etc`, `/ethics` or `/et-foo`.
- Pass query strings and hashes through unchanged.
- `locale-path.test.ts` covers each of these edge cases.

**2.2 Router, `src/App.tsx`.**
- Build `<Route>` elements from the registry, once per locale that route supports:
  `path={localizePath(r.path, l)}`.
- Add a catch-all `/et/*` route that redirects to the English path when it matches a registry
  route without `et` (English-only articles), and otherwise shows `NotFound`.
- Order: put `BrowserRouter` **outside** `LanguageProvider`, because the provider now needs
  `useLocation()`.
- `ErrorBoundary` still sits outside both and keeps reading `<html lang>`. No change there.

**2.3 `LanguageProvider`, `src/i18n/LanguageContext.tsx`.**
- `language = splitLocale(pathname).locale`. Delete the `useState` / `navigator.languages`
  initialisation.
- `setLanguage(l)`:
  - stores the preference;
  - navigates to `alternateFor(path, l) + search + hash`;
  - keeps the hash, which works because section ids are English-derived since PR #43.
- Add `preferredLanguage` (from storage, or else `navigator.languages`) to the context for the banner.
- **Delete `LanguageScope` and `EnglishOnly`**. English-only articles now live only at English
  URLs, so the whole page is English and nothing needs scoping.
- `<html lang>` is still set in an effect; in Phase 3 the static page sets it before JS runs.

**2.4 Locale-aware links.**
- Add `src/components/site/link.tsx`, which exports `Link`, `NavLink` and `Navigate`. They wrap the
  react-router ones and pass string `to` values starting with `/` through `localizePath(to, language)`.
- Codemod: repoint the `Link` import in the ~25 files (53 usages) from `react-router-dom` to
  `../components/site/link`.
- Content `href`s in `src/content/site.ts` (23) stay unprefixed and are localized at render time
  by the wrapper.
- For English-only targets, the wrapper returns the English path, which is `alternateFor`'s job.
- Enforce it with ESLint `no-restricted-imports`: ban `Link`, `NavLink` and `Navigate` from
  `react-router-dom` everywhere except `link.tsx`.
- Plain `<a href="/public-key.asc">` and `/verification/...` stay as they are. They are files,
  not pages.

**2.5 Toggle, `src/components/site/nav.tsx`.**
- It becomes a `<Link>` (not a `<button>`) to `alternateFor(path, other)`, with
  `hreflang={other}` and the `lang` / sr-only hint from PR #43.
- When `alternateFor` returns `null`, don't render it.
- The nav's active-state check compares **unprefixed** paths.

**2.6 Banners, one component `LanguageHint`.**
- Case A, suggestion: the page is English, an `et` version exists, the preference is `et`, and the
  banner hasn't been dismissed. It reads "Loe eesti keeles →" and links to the alternate. It can be
  dismissed, and the dismissal is stored.
- Case B, English-only notice: the page is English with no `et` version, and the preference is
  `et`. It reads "See artikkel on saadaval ainult inglise keeles." with a link back to
  `/et/disclosures/`. This replaces the PR #43 notice.
- Neither banner redirects on its own.

**2.7 `ScrollToTop`.**
- A language switch changes the pathname. If the URL has a hash, scroll to that element instead
  of the top.
- Only move focus to `<main>` when the *unprefixed* path changed. A language switch keeps focus
  on the toggle's replacement, and the page announces its new language through `<html lang>`.

**2.8 English-only markers.** The markers from PR #43 on `EntryRow`, `WorkCard` and home essays now
check `language === 'et'` from the URL. The logic is the same; the data source changes.

**Acceptance for Phase 2**, extend `scripts/i18n-check.py`:
- On `/et/<route>`: `<html lang="et">`, the content is Estonian, and the title is from `meta.et`.
- The toggle's `href` equals the English alternate plus the same hash.
- A browser with `et-EE` and empty storage on `/disclosures/`: no redirect, and the suggestion
  banner is visible.
- `/et/disclosures/smart-id-achilles-heel` redirects on the client to `/disclosures/smart-id-achilles-heel`.
- Every internal `<a>` on an `/et/` page points under `/et/`, except English-only targets.
- The existing anchor, chrome and lang-mismatch checks still pass.

---

## Phase 3: static per-language pages, hreflang and sitemap (recommendation 3) · PR-2 part B · ≈1.5 days

**3.1 Emit pages, in `scripts/spa-routes.mjs`.** For each registry route × each locale it supports,
write `pub/<localizePath(path)>/index.html`:
- `/` en is `pub/index.html` itself, now stamped too;
- `/` et is `pub/et/index.html`.

Each page is stamped with:
- `<html lang="{locale}">`
- title, description, `og:*`, `twitter:*` from `routeMeta[path][locale]`
- `<link rel="canonical" href="{BASE}{localizePath(path, locale)}/">`, which points at itself
- when the route has both locales:
  ```html
  <link rel="alternate" hreflang="en" href="https://tomabel.ee/disclosures/x/" />
  <link rel="alternate" hreflang="et" href="https://tomabel.ee/et/disclosures/x/" />
  <link rel="alternate" hreflang="x-default" href="https://tomabel.ee/disclosures/x/" />
  ```
- `og:locale` (`en_US` / `et_EE`) and `og:locale:alternate`
- that page's JSON-LD, with `inLanguage`

Use one `stamp(html, route, locale)` function, and replace tags by matching whole elements.
The current per-tag regex list silently skips any tag it doesn't find.

**3.2 Runtime keeps the head in sync.**
- `Seo.tsx` updates the same set on client-side navigation: canonical, the hreflang `<link>`s
  (remove and re-add), `og:locale`, JSON-LD.
- It shares the tag-building function with the build script (`src/lib/head-tags.ts`) so the two
  can't drift.

**3.3 Sitemap is generated, not hand-written.**
- Delete `public/sitemap.xml` and emit `pub/sitemap.xml` from the registry.
- Each `<url>` for a bilingual route carries `<xhtml:link rel="alternate" hreflang=…>` for both
  languages plus x-default. Declare `xmlns:xhtml`.
- `lastmod` is `git log -1 --format=%cs -- <page source file>`. A shallow CI checkout needs
  `fetch-depth: 0` in `actions/checkout`, or the date falls back to the build date.
- Check that `robots.txt` still references `https://tomabel.ee/sitemap.xml`.

**3.4 `llms.txt`.** List the Estonian URLs under an "Eesti keeles" heading.

**3.5 Build gates**, in the same script. Any of these fails the build:
- every emitted page has exactly one canonical, and it equals its own URL;
- hreflang links match in both directions: if A lists B, B lists A, and each lists itself;
- no emitted page has `hreflang="et"` pointing at a route without `et`;
- `<html lang>` equals the page's locale;
- the set of sitemap `<loc>` values equals the set of emitted pages, with no stray entries;
- no `hreflang="ee"`, and no `og:locale` outside `{en_US, et_EE}`.

**Acceptance for Phase 3**
- Fetch `pub/et/disclosures/index.html` with JavaScript disabled: Estonian title, description,
  canonical and hreflang are present in the raw HTML.
- LinkedIn Post Inspector and opengraph.xyz on a deployed preview show Estonian previews for `/et/` URLs.
- A hreflang validator (e.g. Merkle/TechnicalSEO hreflang checker) passes on the sitemap.
- Google Rich Results Test passes on one English and one Estonian article.

---

## Phase 4: ship PR-2 and roll out (≈0.5 day + 4 weeks of monitoring)

**4.1** Run all gates: `typecheck`, `lint`, `test`, `build`, `canonical` (no change), `i18n-check.py`, `qa_checks.py`.

**4.2** Optional: run the Python Playwright checks in CI with a job that installs Chromium
(`pipx run --spec playwright playwright install --with-deps chromium`), then `pnpm preview &` and
both scripts.

**4.3** After deploy:
- In Search Console, resubmit `sitemap.xml`.
- Use URL Inspection on `/et/` and `/et/disclosures/`, and request indexing.

**4.4** Monitor weekly for 4 weeks:
- Pages report: `/et/` URLs move to Indexed. Expect 1–4 weeks.
- Watch for "Duplicate, Google chose different canonical" or "Alternate page with proper
  canonical" on `/et/` URLs. Either one means Google didn't accept the hreflang pairing, most
  likely because the Estonian page's body is too similar to the English one or because canonicals
  are wrong.
- Search Console performance filtered to `/et/`, plus impressions from Estonia.

**4.5 Rollback.** Revert PR-2. The `/et/` URLs go back to 404, which is harmless because they
are new. The English URLs never changed.

---

## Phase 5: prerender page bodies (recommendation 5) · PR-3 · spike 0.5 day + 2–3 days

Phases 1–4 fix metadata, previews and indexing. Article bodies are still rendered by JavaScript,
which Google handles but AI crawlers and many others don't. Prerendering writes the full HTML
at build time.

**5.1 Spike (time-boxed 0.5 day): React Router 7 framework mode.** This is the supported path for
the router the site already uses. Check that:
- `@react-router/dev` supports the repo's Vite 8 (check its peer dependency);
- `react-router.config.ts` with `ssr: false, prerender: () => allLocalizedPaths()` builds;
- Fontaine, the Tailwind setup and output to `pub/` (via `buildDirectory`, or copying
  `build/client`) all still work.

If any of that is blocked, use the fallback in 5.4.

**5.2 Migration (framework mode).**
- `app/root.tsx`: the document shell (`<Meta/>`, `<Links/>`, `<Scripts/>`), font and CSS imports,
  `ErrorBoundary` export (replaces `components/ErrorBoundary.tsx`), `<html lang>` from the route.
- `app/routes.ts`: generated from the registry, with each route appearing under both locales.
- Page modules export `meta()` built from `routeMeta` + `head-tags.ts`. That makes both the
  Phase 3 stamping script and `Seo.tsx` unnecessary; **delete them**. Keep only the gates and
  the sitemap generator as a post-build check.
- Remove `React.lazy` and `Lazy`, because framework mode splits code per route automatically.

**5.3 Make the code safe to render at build time.** Check every render-time use of `window`,
`document`, `localStorage`, `navigator` and `crypto`. Known ones:
- `LanguageProvider`: fixed by Phase 2, which is why Phase 2 has to come first.
- `ErrorBoundary` reading `document`.
- Telemetry, reader rail, article proof: these run in effects, which is fine.
- The banner preference: read it in an effect so the prerendered HTML and the first client
  render match.

**5.4 Fallback, if the spike fails: a custom static renderer** (about 100 lines, no new dependency):
- `src/entry-server.tsx` renders `<StaticRouter location={url}><App/></StaticRouter>` with
  `renderToString`;
- `vite build --ssr src/entry-server.tsx`;
- a node script loops over every localized path and injects the markup into each page's
  `#root`;
- `main.tsx` switches from `createRoot` to `hydrateRoot`.

**Acceptance for Phase 5**
- Fetch any page's raw HTML without JS: the article body text is present.
- No hydration warnings in the console on 8 routes × 2 languages.
- `pnpm canonical` shows no change.
- Largest Contentful Paint (Lighthouse or the web-perf skill) is no worse than before.
- All earlier gates and QA scripts pass.

---

## Summary

| Phase | Covers recommendation | PR | Size | Change visible to users |
|---|---|---|---|---|
| 0 | groundwork, 404 CI bug | with PR-1 | 0.5 d | none |
| 1 | 4: one metadata source | PR-1 | 1 d + review | none (fixed metadata drift) |
| 2 | 1 + 2: `/et/` URLs, URL-driven language, link toggle | PR-2 | 2 d | yes |
| 3 | 3: static per-language pages, hreflang, sitemap | PR-2 | 1.5 d | previews, indexing |
| 4 | ship + monitor | PR-2 | 0.5 d + 4 wk | — |
| 5 | 5: prerender bodies | PR-3 | 0.5 d spike + 2–3 d | faster first paint, content without JS |

## Risks

| Risk | Mitigation |
|---|---|
| Google treats `/et/` pages as duplicates (the body is English-heavy, or it picks its own canonical) | Only bilingual routes get `/et/`. The gates block `et` on English-only pages. Watch Search Console in Phase 4. |
| Missed internal links send Estonian readers back to English | ESLint `no-restricted-imports` plus the Phase 2 check that every link on an `/et/` page stays under `/et/` |
| GitHub Pages trailing-slash behaviour on `/et` | Emit `pub/et/index.html`. GH Pages 301s `/et` to `/et/`, the same as it does for the current routes. |
| Returning Estonian readers land on English URLs from old links or bookmarks | The Case A banner. No forced redirect. |
| Framework-mode migration stalls on Vite 8 or plugin compatibility | Time-boxed spike, with the custom-renderer fallback (5.4) |
| Estonian metadata quality | estonian-mcp checks plus human review before merge |
