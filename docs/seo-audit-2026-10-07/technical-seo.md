# Technical SEO audit — tomabel.ee

Date: 2026-10-07. Scope: whole domain (27 sitemap URLs + non-sitemap paths).
Method: raw `fetch` (redirect: manual) from Node, Lighthouse 13.5.0 (Chromium, mobile + desktop presets), repo inspection of `pub/`, `scripts/spa-routes.mjs`, `worker/index.js`, `.github/workflows/static.yml`.
Every metric below is **Measured** unless marked otherwise. No CrUX field data (site below CrUX threshold) — INP is N/A.

## Scorecard

| Area | Score | Verdict |
|---|---|---|
| Crawlability | 8/10 | Clean robots, sitemap discoverable; every internal link 301-hops |
| Indexability | 9/10 | 27/27 sitemap URLs 200 + self-canonical; 404s correct |
| Core Web Vitals | 6/10 | Mobile LCP 3.7 s on home; desktop fine; CLS 0 |
| Mobile | 10/10 | Viewport set, a11y 100 |
| Security / HTTPS | 9/10 | HSTS preload, strict CSP; CSP blocks Cloudflare beacon |
| URL structure | 7/10 | Trailing-slash canonical enforced by host; links do not match |
| Structured data | 9/10 | 3–4 JSON-LD blocks per page in raw HTML |
| International | 5/10 | No hreflang, no `et` URLs; Estonian content is invisible to crawlers |
| Prerender completeness | 9/10 | 2.3k–36k chars of text per page without JS |

## Priority queue

| P | Finding | Fix | Where |
|---|---|---|---|
| P1 | **Every internal link is slash-less** (`/about`, `/disclosures/zero-trust-octagon`), GitHub Pages 301s each one to the `/`-suffixed canonical. 25 distinct link targets, 100% of internal navigation pays a redirect hop; crawlers see 0 direct inbound links to 21 of 27 sitemap URLs. | Emit trailing slashes in `Link to=` / route-meta hrefs (same shape `pageUrl()` already produces for canonicals). | `src/**` (`to="/..."` 60+ occurrences), `src/content/route-meta.ts:278` |
| P1 | **Mobile LCP 3.7 s / TBT 460 ms on `/`** (desktop 0.8 s). LCP element is the hero `<span>` text; element render delay 803 ms, style+layout 2.4 s main-thread. Article page: LCP 2.4 s (borderline pass). | Hero text is in the prerendered HTML already, so the delay is CSS/fonts: preload the one Geist woff2 used above the fold, make sure hydration does not re-layout the hero (check `LanguageProvider` `useEffect` setting `documentElement.lang` and any `Lazy` wrapper around the hero). | `src/main.tsx`, `src/index.css`, `index.html` |
| P2 | **Cloudflare Email Obfuscation is rewriting `mailto:`** to `/cdn-cgi/l/email-protection` (404 for non-JS/crawlers) and injecting render-blocking `email-decode.min.js`. Raw HTML now has 0 `mailto:` links. | Disable *Scrape Shield → Email Address Obfuscation* in the Cloudflare zone (the Markdown agent path and llms.txt also lose the address). | Cloudflare dashboard |
| P2 | **Cloudflare Web Analytics beacon blocked by CSP** (`script-src 'self'`), logged as a console error on every page; Lighthouse best-practices 92 because of it. Either analytics is silently dead or the beacon injection is unintended. | Either turn off Web Analytics auto-injection or add `https://static.cloudflareinsights.com` to `script-src` and `connect-src` in the Response Header Transform Rule. | Cloudflare dashboard |
| P2 | **No hreflang / no crawlable Estonian.** `et` is chosen client-side from localStorage/`navigator.language`; the HTML is always `lang="en"`. Google can never index an Estonian version, and `.ee` queries get English snippets. Hreflang cannot be added honestly until Estonian pages have their own URLs. | Decide: (a) accept English-only indexing and drop the per-reader switch from SEO scope, or (b) prerender `/et/...` shells via `spa-routes.mjs` and add `<link rel="alternate" hreflang>` + `x-default` pairs. Articles are English-only (`EnglishOnly` wrapper), so (b) only applies to home/about/systems/legal. | `src/i18n/LanguageContext.tsx:43`, `scripts/spa-routes.mjs` |
| P3 | `robots.txt` has two non-standard `Content-Signal:` lines. Lighthouse flags "Unknown directive" (SEO 92). Standard parsers ignore unknown lines, so no indexing risk. | Keep (deliberate, per contentsignals.org); accept the Lighthouse ding or move the signal to the HTTP header only (already sent by the worker). | `public/robots.txt` |
| P3 | Sitemap is hand-maintained (`public/sitemap.xml`); `<lastmod>` for `/` is 2026-08-24 while `Last-Modified` header is 2026-10-06. All 27 entries have lastmod but 19 share 2026-10-04 (looks like a bulk touch, not real dates). `changefreq`/`priority` are ignored by Google. | Generate the sitemap in `spa-routes.mjs` from `routeMeta` with per-route dates (git log date of the page source); drop changefreq/priority. | `scripts/spa-routes.mjs`, `public/sitemap.xml` |
| P3 | Legacy redirect routes `/research`, `/writing`, `/projects`, `/research/:slug` exist only as client-side `<Navigate>`; on GitHub Pages they return **HTTP 404** before JS runs, so any old inbound links pass no equity. | If those URLs ever had traffic: add them to `redirectRoutes` in `spa-routes.mjs` (noindex + meta refresh shell, like `/cookies`), or a Cloudflare Bulk Redirect (real 301). Otherwise delete the routes. | `src/App.tsx`, `scripts/spa-routes.mjs` |
| P3 | `/404.html` returns **200** with `noindex` and the home title/description/canonical (`https://tomabel.ee/`). Harmless (noindex) but canonical-to-home from an error page is a mixed signal. | Give the 404 shell its own title ("Page not found") and no canonical. | `scripts/spa-routes.mjs` (notFound block) |
| P3 | `/favicon.ico` 404 (SVG favicon only). Browsers/crawlers that request `/favicon.ico` by convention log a 404 per visit; Google favicon indexing accepts SVG so this is cosmetic. | Add a 32×32 `favicon.ico` to `public/`. | `public/` |
| P4 | `/.well-known/security.txt` 404 — expected for a security researcher's site; not an SEO signal. | Add one. | `public/.well-known/` |
| P4 | `/terms/` meta description is 31 chars; `/about/`, `/privacy/`, `/disclosure/` are 82–83 chars. | Lengthen to 120–155. | `src/content/route-meta.ts` |
| P4 | Unused JS: 43 KB of `vendor-*.js` on every page (Lighthouse). HTML cache `max-age=600`, assets `max-age=2592000` without `immutable`. | Minor. Hashed assets could be `immutable`, but the header is set by GitHub Pages / Cloudflare cache rule. | Cloudflare cache rule |

## 1. Crawlability

**robots.txt** (200): `User-agent: *` → `Allow: /`, `Disallow: /.well-known/openpgpkey/`, `Sitemap:` line present. Named AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot) explicitly allowed with the same rules. Stance: default-open, all three content signals `yes`. No crawl waste patterns (no params, no facets). `?utm_source=x` returns 200 with self-canonical to the clean URL — correct.

**Sitemap** (`/sitemap.xml`, 200, `application/xml`): 27 URLs, all `https://tomabel.ee/...`, all trailing-slash, all 200 with matching self-canonical. No hreflang alternates (none expected — see §8). No sitemap index; `/sitemap_index.xml` 404 (fine). `<lastmod>` present on all 27; `/` is stale (2026-08-24 vs page Last-Modified 2026-10-06).

**Internal linking** (raw prerendered HTML, all 27 pages): every `href` to an internal page omits the trailing slash → 301 → canonical. 21 of 27 sitemap URLs have no direct (non-redirecting) inbound link. Only `/`, `/disclosure/`, `/smart-id-achilles-heel/`, `/what-client-side-trust-is-actually-worth/`, `/coordinated-disclosure-in-a-small-country/`, `/the-fix-that-doesnt-need-sk/` are reached without a hop — and those only because the Cloudflare email-protection URL and some absolute links happen to match. Google follows 301s and consolidates, so nothing is orphaned, but it doubles crawl requests for a 27-page site and is the single most repeated defect.

**Redirect chains** (Measured):

| Request | Chain |
|---|---|
| `http://tomabel.ee/` | 301 → `https://tomabel.ee/` 200 |
| `http://www.tomabel.ee/` | 301 → `https://www.tomabel.ee/` 301 → `https://tomabel.ee/` 200 (2 hops, normal for http+www) |
| `https://www.tomabel.ee/` | 301 → `https://tomabel.ee/` 200 |
| `https://tomabel.ee/about` | 301 → `/about/` 200 |
| `https://tomabel.ee/about/` | 200 |
| `https://tomabel.ee/index.html` | 200, canonical `/` (duplicate URL, canonicalised — OK) |
| `https://tomabel.ee/about/index.html` | 200, canonical `/about/` (OK) |
| `https://tomabel.ee/About` | 404 (case-sensitive host; no mixed-case links found) |
| `/en`, `/en/`, `/et/` | 404 — no locale URLs exist |

**Agent/Markdown path** (worker): `Accept: text/markdown` on `/` → 200 `text/markdown`, 4.2 KB, front-matter with title/description/image. Every HTML response carries `Link: </sitemap.xml>; rel="sitemap", </llms.txt>; rel="describedby"`, `Content-Signal`, `Vary: Accept-Encoding, Accept`. `/llms.txt` 200 (39 lines); `/llms-full.txt` 404.

## 2. Indexability

- 27/27 sitemap URLs: HTTP 200, `<html lang="en">`, exactly one self-referencing canonical (build gate in `spa-routes.mjs` enforces this), no `noindex`, no `X-Robots-Tag` (header present but empty — harmless).
- Unique `<title>` on all 27; unique `<meta description>` on all 27 (lengths 31–160 chars; 4 short ones in P4).
- One `<h1>` per page, all present in raw HTML.
- `/cookies/` 200 with `noindex` + `<meta http-equiv="refresh">` to `/privacy/` — correct for a redirect stub; it is also excluded from the sitemap.
- 404 handling: `/does-not-exist-xyz`, `/does-not-exist-xyz/`, `/assets/nope.js`, `/privacy/nope`, `/.well-known/openpgpkey/`, `/verification/` → HTTP **404** + `noindex`. Correct soft-404 avoidance. `/404.html` itself → 200 + noindex (expected; GitHub Pages serves it as the fallback body).
- Legacy client routes `/research`, `/writing`, `/projects`, `/research/:slug` → HTTP 404 (see P3).
- `/sbom.json` (253 KB), `/public-key.asc`, `/verification/*.txt(.asc)` are publicly reachable, linked, and indexable text. Fine, but `/verification/README.md` is served as `text/markdown` and may get indexed as a page; harmless.

## 3. Core Web Vitals (Lighthouse 13.5.0, lab, Measured)

| URL | Form | Perf | LCP | FCP | CLS | TBT | TTI | SI |
|---|---|---|---|---|---|---|---|---|
| `/` | mobile | 72 | **3.7 s** | 3.0 s | 0 | **460 ms** | 4.5 s | 3.0 s |
| `/` | desktop | 99 | 0.8 s | 0.8 s | 0 | 0 | — | 1.1 s |
| `/disclosures/zero-trust-octagon/` | mobile | 87 | 2.4 s | 2.4 s | 0 | 330 ms | 4.4 s | 2.4 s |
| `/disclosures/zero-trust-octagon/` | desktop | 99 | 0.8 s | 0.8 s | 0.004 | 0 | — | 0.9 s |

Thresholds: LCP < 2.5 s, CLS < 0.1, INP < 200 ms (INP N/A — no field data; TBT 330–460 ms on simulated mobile suggests INP risk during hydration).

- TTFB: 30 ms root document (Lighthouse); 37–200 ms observed from Node. Server is not the problem.
- LCP element on `/`: `<span class="block text-muted-foreground">I broke authentication for a living.</span>` — text, already in HTML. Breakdown: TTFB 464 ms (throttled) + **element render delay 803 ms**. The delay is render-side: `styleLayout` 2.38 s of main-thread on mobile, `scriptEvaluation` 660 ms.
- Render-blocking: `index-*.css` (35 KB gz; est. 150 ms) and Cloudflare-injected `email-decode.min.js`.
- Payload on `/`: 444 KB over the wire (vendor 253 KB, index 143 KB, ui 11 KB, css 35 KB), all gzip, `cf-cache-status: HIT`. Fonts: 11 `@font-face` with `font-display: swap`, 1 with no `font-display` (check which); Newsreader opsz woff2 132 KB + latin-ext 87 KB; Commit Mono ships both woff2 and woff (woff is dead weight if only woff2 is referenced).
- Unused JS: ~43 KB of `vendor-*.js` per page.
- Caching: HTML `max-age=600`, `/assets/*` `max-age=2592000`, `og-image.png` `max-age=14400`.
- Compression: HTML via zstd, assets via gzip (Cloudflare does not re-encode cached brotli from GH Pages); fine.
- Console: one CSP violation per page (Cloudflare Insights beacon). Lighthouse SEO 92 solely from `robots-txt` unknown-directive; a11y 100 (home), 97 (article: `aria-progressbar-name` on the reading progress bar).

## 4. Mobile

`<meta name="viewport" content="width=device-width, initial-scale=1.0">` on every page; no horizontal overflow reported; tap targets pass; a11y 100/97. Same HTML for mobile and desktop (no dynamic serving), so mobile-first parity holds.

## 5. Security / HTTPS

Headers on HTML (served by Cloudflare transform rule, Measured):
`strict-transport-security: max-age=63072000; includeSubDomains; preload` · `content-security-policy: default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://proksimity.proksiabel.ee; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; manifest-src 'self'` · `x-frame-options: DENY` · `x-content-type-options: nosniff` · `referrer-policy: strict-origin-when-cross-origin` · `permissions-policy: camera=(), microphone=(), geolocation=(), interest-cohort=()` · HTTP/3 advertised via `alt-svc`.

HTTP→HTTPS and www→apex both 301. No mixed content (CSP would block it). Two Cloudflare features fight the CSP/markup: Email Obfuscation (rewrites mailto, injects script) and Web Analytics beacon (blocked). `/.well-known/security.txt` absent.

## 6. URL structure

Lowercase, hyphenated, descriptive slugs under `/disclosures/`. Canonical form is trailing-slash (host-enforced by GitHub Pages directory serving). `/index.html` variants resolve 200 with correct canonical rather than redirecting — acceptable. Only defect: the in-page links use the non-canonical slash-less form (P1). `/disclosure/` (policy) vs `/disclosures/` (research index) is one character apart; not a technical problem but worth knowing when reading GSC.

## 7. Structured data

Raw HTML (no JS) contains 3 JSON-LD blocks on hub/legal pages and 4 on articles (from `src/content/route-meta.ts` `jsonLdFor`, stamped by `spa-routes.mjs`). OG (5 tags) and Twitter card present on every page with per-route title/description/url; `og:image` 1200×630 PNG, 44 KB. Not validated against Rich Results Test in this run (Estimated: Person/WebSite/Article shapes; verify `Article.datePublished`/`dateModified` match the sitemap dates once those are regenerated).

## 8. International

- Two UI languages exist in code (`et`, `en`), chosen from `localStorage` → `navigator.language`, default `en` on the server. All 27 prerendered shells are English with `lang="en"`; `document.documentElement.lang` is swapped client-side only.
- No `hreflang` tags in HTML or sitemap, no `x-default`, no `/et/` or `/en/` URLs (both 404). This is **consistent**: there is nothing to point hreflang at, so there is no hreflang error — but there is also no Estonian indexable surface. Articles are English-only by design (`EnglishOnly` scope + notice for et readers).
- Estonian readers who arrive from search see the English shell, then a client re-render (`createRoot`, not `hydrateRoot`) — a flash plus a second layout pass on exactly the audience the `.ee` TLD targets.
- Decision needed (see P2). If English-only indexing is accepted, document it and consider `<meta name="google" content="notranslate">` is *not* wanted; leave as is.

## 9. Prerender completeness (non-JS crawlers)

Text characters in raw HTML after stripping tags/scripts: home 2,658; about 2,342; systems 5,242; privacy 4,241; terms 2,959; disclosure 3,023; my-story 4,114; disclosures index 10,712; articles 6,768–36,611. `#root` is non-empty on every sitemap URL. Build gate fails on < 500 chars. `Accept: text/markdown` conversion sees the same body. Verdict: complete; the only non-JS gaps are the `mailto:` links eaten by Cloudflare and the Estonian strings (client-only).

## Quick wins (under an hour each)

1. Append `/` to every internal `to=`/`href` (sed over `src/`, then `pnpm build` and re-run the inbound-link check).
2. Turn off Cloudflare Email Address Obfuscation.
3. Resolve the Web Analytics beacon: disable or whitelist in CSP.
4. Give `404.html` its own title and strip its canonical.
5. Add `favicon.ico`, `.well-known/security.txt`.

## Monitoring

- Re-run `lighthouse https://tomabel.ee/ --preset=mobile` after the LCP work; target LCP < 2.5 s, TBT < 200 ms on `/`.
- GSC: Pages report → watch "Page with redirect" count drop to ~0 after the trailing-slash fix; "Not found (404)" should list only `/research*`, `/writing*`, `/projects*` if kept.
- Re-run the inbound-link script (sitemap URLs with 0 direct inbound links) as a CI gate alongside the existing canonical gate in `spa-routes.mjs`.

## Repro

All checks were plain `fetch()` with `redirect: 'manual'` from Node against the live host; Lighthouse via `CHROME_PATH=/usr/bin/chromium lighthouse <url> --chrome-flags="--headless=new" [--preset=desktop] --output=json`. JSON reports left in `/tmp/lh-*.json` (not committed).
