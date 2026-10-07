# SEO audit — tomabel.ee — 2026-10-07

Scope: every URL in `https://tomabel.ee/sitemap.xml` (27 URLs), `/robots.txt`, `/llms.txt`, `/404.html`, plus redirect/variant probes (`http://`, `www.`, no-trailing-slash, `/index.html`, `/cookies/`, `/verification/*`, `/feed.xml`). Live pages fetched with `firecrawl scrape -f rawHtml` (rendered DOM) and raw `fetch()` for status codes/headers; one Chromium pass (Playwright) on `/` and one article for hydration, console and resource timing. Repo read only to confirm root causes.

## Executive summary

Overall health: good. Every sitemap URL returns 200 with its own title, description, self-canonical, OG/Twitter tags, one H1, prerendered article text (1.1k–5.6k words), valid JSON-LD, `html lang="en"`. HTTPS/HSTS/preload, `http://` and `www.` 301 to the apex, no-slash URLs 301 to the slash form, 404s are real 404 + noindex, robots.txt and sitemap are clean, TTFB 40–70 ms, CLS 0.

What is holding it back, in order:

1. **Every internal link goes through a 301.** All `<Link to>`/`href` values are slash-less (`/about`, `/disclosures/zero-trust-octagon`) while canonical + sitemap are slash form. Not one sitemap URL receives a direct internal link.
2. **Estonian content is invisible to search.** Translations exist, but they are swapped in client-side on the same URL from `navigator.language`/`localStorage`. No `/et/` URLs, no hreflang. Googlebot (en-US) only ever sees English.
3. **Cloudflare Web Analytics beacon is blocked by the CSP** on every page, so there is no field data (CWV/RUM) and a console error on every load.
4. Article JSON-LD is emitted twice after hydration; article schema is thin (no `image`, `publisher`, `mainEntityOfPage`; one generic og:image for all 27 pages; no `article:*` meta).
5. 15 full-text plain copies of the articles at `/verification/<slug>.txt` are crawlable with no noindex.
6. Hand-maintained sitemap with inaccurate `lastmod`; short meta descriptions on 5 pages; no RSS feed.

Quick wins (under an hour each): #3, #4 (one attribute in `scripts/spa-routes.mjs`), #5 (one Cloudflare header rule), description rewrites.

Indexation itself could not be verified (no Search Console access); a `site:tomabel.ee` query through the local search backend returned only the homepage. Check GSC Coverage first.

---

## Findings

Severity: **High** = blocks ranking/visibility for a whole class of queries or URLs. **Medium** = measurable loss or risk. **Low** = hygiene.

### H1. All internal links point at non-canonical (slash-less) URLs — High

**Affected:** every page (27/27). Nav, footer, home, `/disclosures/` index, article cross-links.

**Evidence**
- Link-target counts across the prerendered HTML: `/disclosures` ×66, `/about` ×60, `/systems` ×31, `/my-story` ×28, `/disclosures/zero-trust-octagon` ×12, `/disclosures/smart-id-achilles-heel` ×10 … all slash-less.
- `GET /about` → `301 Location: https://tomabel.ee/about/`; same for `/disclosures`, `/systems`, `/disclosures/botguard-disassembled`.
- Sitemap, `<link rel=canonical>`, `og:url`, JSON-LD `url`, llms.txt and breadcrumbs all use the slash form.
- Sitemap URLs with zero direct inbound internal links: 21 of 27 (all of them except `/`, `/disclosure/`, and the few article links that happen to be written with a slash).
- Source: `src/content/site.ts`, `src/components/site/nav.tsx`, `src/pages/*.tsx` write literal `to="/about"` etc. `pageUrl()` in `src/content/route-meta.ts` already produces the slash form, but links don't go through it.

**Impact:** Every crawl hop pays a redirect; link equity flows to the redirect, not the page; GSC will report the slash-less URLs as "Page with redirect" and the real URLs as having no internal links. Googlebot treats `/about` and `/about/` as different URLs.

**Fix**
- Add one helper (or a `SiteLink` wrapper around `<Link>`) that normalises `to` with the same rule as `pageUrl()` (append `/` to path-only routes; leave `?`/`#`/file links alone), and use it in nav, footer, `site.ts` hrefs and page bodies. A one-line test in `route-meta.test.ts` asserting every `href`/`to` in `pub/**/index.html` ends with `/` (or has an extension / query / hash) stops regressions.
- Homepage `Link to="/disclosures?kind=essay"` → `/disclosures/?kind=essay`.
- Keep the slash form as canonical (GitHub Pages serves `dir/index.html`; changing canonical direction would be more work and the 301 is already right).

### H2. Estonian locale hidden from crawlers: same URL, client-side swap, no hreflang — High

**Affected:** `/`, `/disclosures/`, `/systems/`, `/about/`, `/my-story/`, `/privacy/`, `/terms/`, `/disclosure/` (every route that has an `et` entry in `routeMeta` / `translations.ts`).

**Evidence**
- `src/i18n/LanguageContext.tsx`: `initialLanguage()` = `localStorage.language ?? navigator.languages` match; `src/main.tsx` hydrates English shell or re-renders from scratch for `et`. `document.documentElement.lang` is flipped client-side.
- No `<link rel="alternate" hreflang>` on any page (0/27), no `og:locale`, sitemap has no `xhtml:link`.
- `index.html` JSON-LD `WebSite.inLanguage: ["en","et"]` claims two languages at one URL.
- Estonian titles/descriptions exist in `src/content/route-meta.ts` (e.g. `"Tom Kristian Abel — turvauurija ja süsteemiarhitekt"`) but are never served to a crawler.
- `docs/i18n-locale-urls-plan.md` already specifies the correct target (`/et/` prefix, reciprocal `en`/`et`/`x-default`, per-locale shells, 301 only for permanent moves).

**Impact:** Zero visibility for Estonian queries (the home market: RIA/TTJA/AKI, Smart-ID, "turvauurija", "pöördprojekteerimine"). Content negotiation by browser language is also something Google explicitly cannot see (US IPs, no `Accept-Language`). Risk of mismatched title/body in snippets when a reader's cached `et` state collides with English metadata.

**Fix:** Execute the existing plan: `/et/<route>/` shells prerendered in Estonian with Estonian `<title>`, description, canonical, JSON-LD `inLanguage`, `<html lang="et">`; reciprocal `hreflang="en"`, `hreflang="et"`, `x-default` → English on both; sitemap `<xhtml:link>` entries; toggle becomes an `<a hreflang>` to the alternate URL; drop the `navigator.language` auto-switch (or 302 + `Vary` at the Worker, never for Googlebot). Never use `hreflang="ee"`.

### H3. Cloudflare Web Analytics beacon blocked by CSP — High (measurement), Low (ranking)

**Affected:** every HTML page.

**Evidence:** console on `/` and `/disclosures/botguard-disassembled/`:
`Loading the script 'https://static.cloudflareinsights.com/beacon.min.js/v31edd…' violates the following Content Security Policy directive: "script-src 'self'"`. Response CSP: `default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://proksimi…`.

**Impact:** No RUM, no field CWV, no referrer data; the site's own performance claims cannot be backed with data. Lighthouse flags the blocked request as a console error.

**Fix (Cloudflare dashboard, not repo):** either turn off Web Analytics auto-injection for the zone, or add `https://static.cloudflareinsights.com` to `script-src` and `https://cloudflareinsights.com` to `connect-src` in the Response Header Transform Rule. Pick one; a half-wired beacon is the worst option.

### M1. Article JSON-LD duplicated after hydration — Medium

**Affected:** all 20 `/disclosures/<slug>/` pages and `/my-story/` (AboutPage ×2).

**Evidence:** rendered DOM has 5 `<script type="application/ld+json">`: Person, Organization, WebSite, `ScholarlyArticle+BreadcrumbList`, `ScholarlyArticle+BreadcrumbList#seo-jsonld` — the last two byte-identical. Static HTML (`pub/disclosures/the-kratt-problem/index.html`) has 4; the fifth is appended by `src/components/Seo.tsx` (`document.getElementById('seo-jsonld')?.remove()` finds nothing because `scripts/spa-routes.mjs:97` emits the static block without that id).

**Fix:** in `scripts/spa-routes.mjs` emit `<script type="application/ld+json" id="seo-jsonld">…`. Seo.tsx then replaces instead of duplicating. One line.

### M2. Thin Article structured data and social metadata — Medium

**Affected:** all 20 article pages.

**Evidence** (`jsonLdFor()` in `src/content/route-meta.ts:294`): `BlogPosting`/`ScholarlyArticle` carry `headline, description, url, datePublished, dateModified, author{name,url}, inLanguage` only. Missing `image`, `publisher`, `mainEntityOfPage`, `author.sameAs`, `keywords`/`about`, `wordCount`. `og:type=article` is set but no `article:published_time`, `article:modified_time`, `article:author`, `og:locale`. One `og-image.png` (46 KB) for all 27 URLs. No `<time datetime>` around the visible "Published · August 11, 2026 / Updated · October 4, 2026".

**Impact:** No Article rich result eligibility (image required), weaker Discover/Top Stories/AI-citation signals, identical social cards for every URL.

**Fix:** extend `jsonLdFor()` with `image` (per-article or site default), `publisher` (`Organization` ProksiAbel OÜ with logo), `mainEntityOfPage: url`, `author.sameAs` (GitHub, LinkedIn). Add `article:published_time`/`modified_time` to the tag list in `spa-routes.mjs` from `ld.datePublished/dateModified`. Wrap visible dates in `<time dateTime>`. Per-article OG images can be generated at build time from the title (SVG → PNG) — optional.

### M3. Crawlable plain-text article duplicates under `/verification/` — Medium

**Affected:** 15 `/verification/<slug>.txt` files (+ `.asc`, `README.md`).

**Evidence:** `GET /verification/botguard-disassembled.txt` → 200 `text/plain`, 19 KB, full article text, no `X-Robots-Tag`; `/verification/` dir itself 404s so there is no index page, but the files are linked from article pages (`<a href="/verification/…txt">`) and fetched by `article-proof.tsx`. Not disallowed in robots.txt.

**Impact:** Google can index them as separate documents and treat them as the duplicate (text files cannot carry a canonical). Low probability but non-zero, and it is pure noise in GSC.

**Fix:** Cloudflare Response Header Transform Rule: `X-Robots-Tag: noindex` when URI path starts with `/verification/`. Do **not** add a robots.txt `Disallow` — a blocked URL cannot be de-indexed via noindex, and the in-page fetch must keep working. Same treatment for `/sbom.json` (253 KB JSON, 200).

### M4. Sitemap is hand-maintained; `lastmod` inaccurate — Medium

**Evidence:** `public/sitemap.xml` is static. `/` `lastmod=2026-08-24`, but `src/pages/HomePage.tsx`/`src/content/site.ts` last changed 2026-10-04 (git). All 20 articles share `2026-10-04` (bulk stamp). `changefreq`/`priority` present (ignored by Google). `docs/content-pipeline.md` step 6 asks authors to edit it by hand per article.

**Impact:** Google uses `lastmod` only when it is consistently accurate; a few wrong values and the whole file's `lastmod` is discounted, which slows recrawl after real updates.

**Fix:** generate `pub/sitemap.xml` in `scripts/spa-routes.mjs` from `routeMeta` (keys → URLs, `ld.dateModified ?? ld.datePublished` for articles; `git log -1 --format=%cs -- <page file>` for the rest). Drop `changefreq`/`priority`. This also removes a manual step from the content pipeline and prepares for the `xhtml:link` entries H2 needs.

### M5. Weak titles/descriptions/H1s on hub and about pages — Medium

| URL | Title (len) | Description len | H1 |
|---|---|---|---|
| `/disclosures/` | Research — Tom Kristian Abel (28) | 121 | Research, teardowns, and arguments. |
| `/systems/` | Systems — Tom Kristian Abel (27) | 143 | Things I've shipped. |
| `/about/` | About — Tom Kristian Abel (25) | 83 | The way of seeing. |
| `/my-story/` | My story — Tom Kristian Abel (28) | 149 | How I got here. |
| `/terms/` | Terms of Service — Tom Kristian Abel (36) | **31** | Terms of Service |
| `/privacy/` | Privacy Policy — Tom Kristian Abel (34) | 83 | Privacy Policy |
| `/disclosure/` | Security Research Policy — **ProksiAbel OÜ** (40) | 82 | Security Research Policy |

**Evidence:** values above from live `<head>`. Article pages are fine (titles 37–61 chars, descriptions 140–160, keyworded H1s).

**Impact:** The three hubs are the pages that should rank for the head terms ("security researcher Estonia", "Smart-ID security research", "zero trust framework"), and none of their titles or H1s contain a topical term. `/disclosure/` is the only page with a different brand suffix; `/disclosure/` vs `/disclosures/` is also an easy typo/mislink.

**Fix** (edit `src/content/route-meta.ts` en/et entries; H1s in the page components):
- `/disclosures/`: "Security research: Smart-ID, BotGuard, zero trust — Tom Kristian Abel"; description 150–160 chars naming the three flagship pieces.
- `/systems/`: "Systems I built: TLS-fingerprinting proxy, identity platforms — Tom Kristian Abel".
- `/about/`: "About Tom Kristian Abel — security researcher, Estonia".
- `/terms/`, `/privacy/`, `/disclosure/`: 120–160 char descriptions; unify the brand suffix to "Tom Kristian Abel" (or add "ProksiAbel OÜ" everywhere, not on one page).
- H1s may keep the voice but should include the subject: "Research, teardowns, and arguments on identity and anti-fraud" etc.

### L1. Fonts are the largest payload; no preload of the LCP font — Low

**Evidence (Playwright, `/`, cold):** 436 KB transferred; fonts 298 KB (`newsreader-latin-opsz…woff2` 129 KB, Commit Mono 400/500/700 ≈ 140 KB, Geist 29 KB); JS 129 KB gz; CSS 8 KB gz. `font-display: swap` and size-adjusted fallbacks are set (good). No `<link rel=preload as=font>`; `prefers-reduced-motion` honoured. DCL 740 ms, CLS 0.

**Fix:** preload the Geist latin woff2 (the H1 face); subset Newsreader (the opsz variable file is heavy — a static `opsz`+limited weight range instance is typically 30–40 KB); use one variable Commit Mono (or drop the 500 weight). Hashed `/assets/*` are served `Cache-Control: max-age=2592000`; a Cloudflare rule can raise to `max-age=31536000, immutable`.

### L2. No RSS/Atom feed — Low

**Evidence:** `/feed.xml`, `/rss.xml` → 404; no `<link rel="alternate" type="application/rss+xml">`. `llms.txt` exists and is linked via `Link: rel=describedby`.

**Fix:** emit `pub/feed.xml` from `routeMeta` in `spa-routes.mjs` (title, link, description, pubDate from `ld`), add the `<link rel=alternate>` to `index.html`. Cheap discovery channel for aggregators and AI crawlers that poll feeds.

### L3. 404 page carries a canonical to the homepage — Low

**Evidence:** `/404.html` and `/nonexistent-page-xyz/` (HTTP 404): `<meta name="robots" content="noindex">` plus `<link rel="canonical" href="https://tomabel.ee/">`. Source: `scripts/spa-routes.mjs` copies the shell (canonical kept) and `Seo.tsx` falls back to `pageUrl('/')` for unknown paths.

**Impact:** Contradictory signals (noindex + canonical elsewhere); Google ignores the canonical in this case, so harmless, but it shows as "Alternate page with proper canonical tag" noise.

**Fix:** strip the canonical/`og:url` tags in the 404 branch of `spa-routes.mjs` and have `Seo.tsx` remove the canonical for unknown keys instead of pointing it home.

### L4. `/cookies/` stub and `index.html` duplicates — Low

**Evidence:** `/cookies/` → 200, empty `#root`, `noindex`, canonical `/privacy/`, `<noscript><meta refresh>`. `/index.html`, `/disclosures/index.html`, `/disclosures/<slug>/index.html` → 200 (same body, self-canonical to the slash URL). Google-correct via canonicals; only the Worker can make `/cookies/` a real 301 (planned in `docs/i18n-locale-urls-plan.md`).

**Fix:** when the Worker gains a redirect table (H2 plan PR-1), add `/cookies/` → `/privacy/` 301 and `*/index.html` → `*/` 301. Not worth doing separately.

### L5. Breadcrumb schema with no visible breadcrumb — Low

**Evidence:** `BreadcrumbList` (Home › Research › Article) in JSON-LD; page `<nav>`s are the site nav and "Article contents". Google asks that marked-up breadcrumbs reflect what is on the page.

**Fix:** either render a small `Home / Research / <title>` trail in the article header (it also gives the slash-form internal links H1 needs) or drop the BreadcrumbList.

### L6. Cloudflare email obfuscation injected — Low

**Evidence:** `/cdn-cgi/scripts/.../email-decode.min.js` loaded; `mailto:tom@tomabel.ee` is decoded client-side. CSP allows it (same origin). Means crawlers without JS do not see the address. Fine if intentional; otherwise turn off "Email Address Obfuscation" in Cloudflare (Scrape Shield).

### Verified OK (no action)

- `robots.txt`: `Allow: /`, named AI bots allowed, `Sitemap:` line, Content-Signal; only `/.well-known/openpgpkey/` disallowed (returns 404 anyway).
- `sitemap.xml`: 27 absolute, canonical, 200 URLs; no noindex/redirect URLs inside; referenced from robots.txt, `<link rel=sitemap>` and the `Link` header.
- Redirects: `http://` → 301 https; `www.` → 301 apex; slash-less → 301 slash; `/ABOUT/` → 404 (case not folded — fine).
- Headers: HSTS 2 y + preload, `X-Content-Type-Options`, CSP (see H3), `Content-Signal`, `Link` (sitemap + llms.txt), `Vary: Accept`; `Accept: text/markdown` → 200 `text/markdown` with front-matter via the Worker.
- Per-page `<head>`: unique titles (0 duplicates across 27), unique descriptions, self-canonical, `og:*`/`twitter:*` complete, `og:type=article` on articles, viewport, theme-color, `html lang`.
- Content: one H1 per page, h2/h3 hierarchy, article bodies 1.1k–5.6k words in static HTML; prerender gate fails the build under 500 chars.
- JSON-LD parses on all pages; Person/Organization/WebSite site-wide.
- `llms.txt` present, slash-form links, per-article summaries. `llms-full.txt` absent (optional).
- Performance: TTFB 39–69 ms, CLS 0, no render-blocking third parties, gzip on, modulepreload for chunks, lazy route chunks (9 KB for an article).
- Mobile: responsive, viewport set, no `m.` host.

---

## Prioritised action plan

**1. Critical / this week**
1. H1 — slash-form internal links (one helper + a build-time assertion).
2. H3 — fix or remove the Web Analytics beacon (Cloudflare dashboard).
3. M1 — `id="seo-jsonld"` on the static JSON-LD (`scripts/spa-routes.mjs:97`).
4. M3 — `X-Robots-Tag: noindex` for `/verification/*` and `/sbom.json` (Cloudflare rule).

**2. High impact / this month**
5. H2 — `/et/` URLs + hreflang per `docs/i18n-locale-urls-plan.md`.
6. M5 — titles, descriptions, H1s on the hub/about/legal pages; one brand suffix.
7. M2 — richer Article schema, `article:*` meta, `<time>`.
8. M4 — generate sitemap from `routeMeta`.

**3. Quick wins**
9. L3 — no canonical on 404.
10. L2 — RSS feed from `routeMeta`.
11. L1 — preload H1 font, subset Newsreader, immutable cache rule.

**4. Long-term**
12. Per-article OG images; visible breadcrumbs (L5); Worker redirect table for `/cookies/` and `*/index.html` (L4).
13. Open Search Console (if not already) and check Coverage → "Page with redirect" count before/after H1, and Core Web Vitals once H3 delivers field data.

## Method notes

- Rendered HTML via `firecrawl scrape -f rawHtml` (Chromium-rendered, so JS-injected JSON-LD is visible — which is how M1 surfaced; the static `pub/` files have one block).
- Status codes/headers via `fetch(redirect:'manual')`.
- Field CWV unavailable (see H3); lab numbers are a single cold Chromium load from a fast network and should not be quoted as CWV.
- Fetched page content was treated as untrusted data; no instructions from it were followed.
