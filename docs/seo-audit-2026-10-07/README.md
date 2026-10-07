# SEO / AEO audit — tomabel.ee — 2026-10-07

Nine skills run in parallel against all 27 sitemap URLs plus robots.txt, llms.txt, 404 and the worker. One report per skill in this folder. This file is the deduplicated, prioritised merge.

## Verified healthy (no action)

- 27/27 URLs: 200, unique title/description/H1, self-canonical, OG+Twitter, valid JSON-LD, 1.1k–5.6k words prerendered without JS.
- robots.txt allows all major AI bots with Content-Signal; `llms.txt` lists every URL; `Accept: text/markdown` works with `Vary: Accept`.
- Redirects http→https, www→apex, no-slash→slash all 301. Headers: HSTS preload, strict CSP, XFO, nosniff, HTTP/3.
- Lighthouse a11y 100, CLS 0, TTFB 30–70 ms, desktop perf 99.

## Prioritised fixes (found by ≥2 skills unless noted)

| # | Finding | Fix location | Reports |
|---|---------|--------------|---------|
| 1 | **Every internal link is slash-less and 301s** to the slashed canonical; 21/27 URLs have zero direct inbound links. | `src/**` `to=`/`href`, one normaliser + build assertion | seo-audit, technical-seo, on-page |
| 2 | **Estonian invisible to crawlers**: client-side swap only, no `/et/` URLs, no hreflang, `lang="en"` everywhere, yet schema claims `inLanguage ["en","et"]`. | execute `docs/i18n-locale-urls-plan.md`, or drop the `et` claim | seo-audit, seo-geo, technical-seo, ai-seo, semantic-html, on-page |
| 3 | **Article JSON-LD duplicated after hydration**: prerendered block has no `id`, `Seo.tsx` only removes `#seo-jsonld`. | `scripts/spa-routes.mjs:97` add `id="seo-jsonld"` | serp-markup, on-page, semantic-html, seo-audit |
| 4 | **Cloudflare Web Analytics beacon blocked by CSP** (`script-src 'self'`): no RUM, console error on every page, BP 92. | Cloudflare header rule: allow `static.cloudflareinsights.com` or disable injection | cwv, technical-seo, semantic-html, seo-audit |
| 5 | **Cloudflare Email Obfuscation**: rewrites `mailto:` to a 404 path for non-JS crawlers and injects a render-blocking script. | Cloudflare dashboard → off | cwv, technical-seo |
| 6 | **Mobile LCP 3.5–3.9 s** (perf 72–84): `rise-in` keyframe starts at `opacity:0` (+600 ms), stylesheet listed after modulepreloads, 310 KB fonts (3 Commit Mono weights, 172 KB unused `.woff`), gzip not brotli, no immutable cache. | `tailwind.config.js:88`, `index.html` order, font trimming, CF cache rule | cwv, technical-seo, seo-audit |
| 7 | **Thin Article schema / social meta**: no `image`, `publisher`, `mainEntityOfPage`, `isPartOf`; Person/Org/WebSite unlinked by `@id`; no `og:site_name`, `og:locale`, `article:published_time`; one shared og-image. | `src/content/route-meta.ts`, `index.html`; paste-ready blocks in serp-markup.md Patches A–D | serp-markup, seo-geo, on-page, ai-seo |
| 8 | **Entity inconsistency**: Person `worksFor: MatX` vs publisher ProksiAbel OÜ, `jobTitle` ≠ `<title>`, security.txt points at proksiabel.ee. | `index.html` JSON-LD, `pub/.well-known` | serp-markup, seo-geo, geo-content, ai-seo |
| 9 | **Uniform `dateModified: 2026-10-04` on all 19 articles**; sitemap `lastmod` hand-maintained and stale. | derive from content hash in `spa-routes.mjs`; generate sitemap from `routeMeta` | seo-geo, ai-seo, seo-audit |
| 10 | **No answer-first content**: 0/19 Key-findings or definition block, zero question headings, FAQ on 1/19, tables on 3/19, no `<time datetime>`, byline not linked to `/about/`. | article template (`article.tsx`); rewritten ledes for 7 pages in geo-content.md | geo-content, ai-seo, semantic-html |
| 11 | **Worker Markdown lossy**: H1 dropped on `/` and BotGuard, nav/skip-link chrome leaks, raw JSON-LD appended to body. | `worker/index.js` | ai-seo |
| 12 | **Weak hub titles/descriptions**: 8 titles <40 chars, 4 descriptions <90 (`/terms/` 31); `/privacy/`, `/terms/` have zero inbound links (footer lacks legal group). | `route-meta.ts`, `src/components/site/footer.tsx` | on-page, seo-audit, serp-markup |
| 13 | **Duplicate full-text at `/verification/<slug>.txt`** and `/sbom.json` indexable. | Cloudflare `X-Robots-Tag: noindex` rule | seo-audit |
| 14 | Minor: home H1 spans concatenate to "living.Now"; heading numerals "01" pollute extracted text; "Source ↗" ×12 link text; unlabeled nav/aside; 404.html carries home title+canonical; no `llms-full.txt`, RSS, `favicon.ico`. | `HomePage.tsx`, `reader-rail.tsx`, `SystemsPage.tsx`, `nav.tsx`, `spa-routes.mjs` | semantic-html, on-page, ai-seo, technical-seo |

## Not measured

- Field CWV / indexation: no CrUX key, PageSpeed API quota 429, no Search Console access, `site:` probe returned only the homepage.
- Citability probe (Tavily) returned HTTP 402.

## Lighthouse (mobile; desktop home 99)

| URL | Perf | A11y | BP | SEO |
|-----|------|------|----|-----|
| / | 78 | 100 | 92 | 100 |
| /disclosures/ | 84 | 100 | 92 | 100 |
| /disclosures/smart-id-achilles-heel/ | 76 | 100 | 92 | 100 |
| /about/ | 76 | 100 | 92 | 100 |
| /systems/ | 79 | 100 | 92 | 100 |

## Fix status (2026-10-07)

| # | Status | Log |
|---|--------|-----|
| 1, 12 (footer), 14 (UI) | done | fix-01-links-footer-ui.md |
| 3, 7, 8, 9, 12 (meta), 14 (404) | done; per-article og-image not done | fix-02-metadata-schema-dates.md |
| 6, 11, 13 | done in repo; worker needs `wrangler deploy` | fix-03-cwv-worker-cloudflare.md |
| 4, 5 | Cloudflare dashboard steps documented, not applied | fix-03-cwv-worker-cloudflare.md |
| 10 | template done 19/19; content 4/19 (claims the pages do not state were left out) | fix-04-answer-first-content.md |
| 2 | schema claim corrected; `/et/` URLs + hreflang pending | fix-05-estonian-locale.md |
