# On-page SEO audit — tomabel.ee (2026-10-07)

Scope: all 27 URLs in `https://tomabel.ee/sitemap.xml`. Fetched with `firecrawl scrape --format rawHtml` (post-JS DOM), parsed in Python. All metrics below are **Measured** unless marked Estimated. Scores are /10 per the on-page-seo-checker rubric; overall = weighted mean (title 1.5, description 1.5, headings 1.5, links 1.5, words 1, OG 1, schema 1, images 0.5).

Target keywords were **inferred from content** (Estimated): sitewide `Tom Kristian Abel` + `security researcher`; article pages use their H1 topic (`Smart-ID`, `BotGuard`, `zero trust`, etc.). Validate against Search Console before acting on keyword-specific advice.

**Site average: 8.5 / 10.** Strong fundamentals (one H1 everywhere, no skipped heading levels, self-canonicals, OG + Twitter on every page, article JSON-LD with breadcrumbs). Weaknesses are concentrated in: short titles/descriptions on hub and legal pages, two orphaned legal pages, thin inbound links to half the articles, and an article-schema duplication bug at runtime.

## Per-page table

Columns: title length (score) · meta description length (score) · H1 count (heading score) · body words (score) · unique internal links out / inbound pages linking in (score) · images · og:type (OG/Twitter score) · page-level JSON-LD (score) · overall.

| URL | Title | Description | Headings | Words | Links out / in | Images | OG/TW | Schema | Score |
|---|---|---|---|---|---|---|---|---|---|
| `/` | 59 (10) | 150 (10) | 1 H1 (10) | 420 (8) | 14 out / 27 in (10) | 0 imgs | website (9) | - (7) | **9.3** |
| `/about/` | 25 (6) | 83 (5) | 1 H1 (10) | 367 (8) | 7 out / 27 in (7) | 0 imgs | website (9) | - (7) | **7.4** |
| `/disclosure/` | 40 (8) | 82 (5) | 1 H1 (10) | 476 (8) | 8 out / 8 in (10) | 0 imgs | website (9) | - (7) | **8.2** |
| `/disclosures/` | 28 (6) | 121 (8) | 1 H1 (10) | 1765 (10) | 26 out / 27 in (10) | 0 imgs | website (9) | - (7) | **8.5** |
| `/disclosures/botguard-disassembled/` | 42 (8) | 159 (10) | 1 H1 (10) | 3460 (10) | 11 out / 5 in (10) | 0 imgs | article (8) | ScholarlyArticle+Breadcrumb (7) | **9.1** |
| `/disclosures/chatgpt-is-not-a-phishing-scanner/` | 53 (10) | 158 (10) | 1 H1 (10) | 3416 (10) | 8 out / 1 in (6) | 0 imgs | article (8) | ScholarlyArticle+Breadcrumb (7) | **8.7** |
| `/disclosures/coordinated-disclosure-in-a-small-country/` | 61 (8) | 159 (10) | 1 H1 (10) | 1931 (10) | 9 out / 2 in (6) | 0 imgs | article (8) | BlogPosting+Breadcrumb (7) | **8.4** |
| `/disclosures/i-used-to-break-authentication/` | 50 (10) | 140 (10) | 1 H1 (10) | 2103 (10) | 9 out / 5 in (10) | 0 imgs | article (8) | BlogPosting+Breadcrumb (7) | **9.4** |
| `/disclosures/identity-is-the-root-proof-is-the-gate/` | 60 (10) | 157 (10) | 1 H1 (10) | 2181 (10) | 11 out / 4 in (8) | 0 imgs | article (8) | ScholarlyArticle+Breadcrumb (7) | **9.1** |
| `/disclosures/move-fast-fix-it-in-prod/` | 45 (8) | 160 (10) | 1 H1 (10) | 2180 (10) | 9 out / 2 in (6) | 0 imgs | article (8) | ScholarlyArticle+Breadcrumb (7) | **8.4** |
| `/disclosures/nine-dimensions-of-zero-trust/` | 53 (10) | 155 (10) | 1 H1 (10) | 2718 (10) | 10 out / 2 in (6) | 0 imgs | article (8) | ScholarlyArticle+Breadcrumb (7) | **8.7** |
| `/disclosures/pact-software-anchor-turn/` | 53 (10) | 158 (10) | 1 H1 (10) | 3798 (10) | 10 out / 1 in (6) | 0 imgs | article (8) | ScholarlyArticle+Breadcrumb (7) | **8.7** |
| `/disclosures/russian-cyber-ops-estonia-hosting/` | 58 (10) | 159 (10) | 1 H1 (10) | 2907 (10) | 7 out / 1 in (6) | 0 imgs | article (8) | ScholarlyArticle+Breadcrumb (7) | **8.7** |
| `/disclosures/saas-glued-lean-defense/` | 43 (8) | 145 (10) | 1 H1 (10) | 2169 (10) | 9 out / 2 in (6) | 0 imgs | article (8) | ScholarlyArticle+Breadcrumb (7) | **8.4** |
| `/disclosures/smart-id-achilles-heel/` | 59 (10) | 151 (10) | 1 H1 (10) | 4613 (10) | 13 out / 9 in (10) | 0 imgs | article (8) | ScholarlyArticle+Breadcrumb (7) | **9.4** |
| `/disclosures/the-evolution-of-cyber-fraud-in-estonia/` | 53 (10) | 160 (10) | 1 H1 (10) | 4075 (10) | 10 out / 1 in (6) | 0 imgs | article (8) | ScholarlyArticle+Breadcrumb (7) | **8.7** |
| `/disclosures/the-fix-that-doesnt-need-sk/` | 48 (8) | 156 (10) | 1 H1 (10) | 1409 (8) | 8 out / 2 in (6) | 0 imgs | article (8) | BlogPosting+Breadcrumb (7) | **8.2** |
| `/disclosures/the-fortune-500-illusion-of-control/` | 55 (10) | 154 (10) | 1 H1 (10) | 2150 (10) | 12 out / 2 in (6) | 0 imgs | article (8) | ScholarlyArticle+Breadcrumb (7) | **8.7** |
| `/disclosures/the-kratt-problem/` | 37 (6) | 153 (10) | 1 H1 (10) | 1148 (8) | 8 out / 2 in (6) | 0 imgs | article (8) | BlogPosting+Breadcrumb (7) | **7.9** |
| `/disclosures/the-pin-that-cannot-be-delegated/` | 52 (10) | 158 (10) | 1 H1 (10) | 3469 (10) | 10 out / 5 in (10) | 0 imgs | article (8) | ScholarlyArticle+Breadcrumb (7) | **9.4** |
| `/disclosures/what-client-side-trust-is-actually-worth/` | 60 (10) | 159 (10) | 1 H1 (10) | 2171 (10) | 8 out / 10 in (10) | 0 imgs | article (8) | BlogPosting+Breadcrumb (7) | **9.4** |
| `/disclosures/why-vlms-break-client-side-anti-fraud/` | 56 (10) | 146 (10) | 1 H1 (10) | 3151 (10) | 10 out / 2 in (6) | 0 imgs | article (8) | ScholarlyArticle+Breadcrumb (7) | **8.7** |
| `/disclosures/zero-trust-octagon/` | 38 (6) | 146 (10) | 1 H1 (10) | 5566 (10) | 13 out / 9 in (10) | 0 imgs | article (8) | ScholarlyArticle+Breadcrumb (7) | **8.7** |
| `/my-story/` | 28 (6) | 149 (10) | 1 H1 (10) | 688 (8) | 9 out / 27 in (10) | 0 imgs | article (9) | AboutPage (9) | **8.8** |
| `/privacy/` | 34 (6) | 83 (5) | 1 H1 (10) | 737 (8) | 7 out / 0 in (3) | 0 imgs | website (9) | - (7) | **6.7** |
| `/systems/` | 27 (6) | 143 (10) | 1 H1 (10) | 740 (8) | 8 out / 27 in (10) | 0 imgs | website (9) | - (7) | **8.6** |
| `/terms/` | 36 (6) | 31 (3) | 1 H1 (10) | 494 (8) | 7 out / 0 in (3) | 0 imgs | website (9) | - (7) | **6.4** |

Sitewide constants (identical on all 27 pages): `<html lang="en">`; self-referencing canonical; `og:image` / `twitter:image` = `https://tomabel.ee/og-image.png` (46 KB, shared); `twitter:card=summary_large_image`; base JSON-LD Person + Organization + WebSite; no `og:locale`, no `article:published_time` / `article:author`, no `hreflang`, no `<img>` elements anywhere (so no alt-text findings). `og:title` / `og:description` / `twitter:*` match `<title>` / description on every page. `/404.html` is `noindex` with canonical to `/` (correct).

## Prioritized fixes

### P0 — defects

1. **Article JSON-LD is injected twice at runtime.** `scripts/spa-routes.mjs:97` prerenders the per-route `@graph` block without an `id`; `src/components/Seo.tsx:33-40` then removes `#seo-jsonld` (not found) and appends a second identical block. Rendered DOM on every article and `/my-story/` carries the ScholarlyArticle/BlogPosting/AboutPage graph twice (5 `ld+json` scripts vs 4 in `pub/`). Fix: emit `<script type="application/ld+json" id="seo-jsonld">` in `spa-routes.mjs` so the client-side removal finds it. One-line change.
2. **`/privacy/` and `/terms/` are orphans** (0 inbound links; only reachable by URL and sitemap). `src/components/site/footer.tsx` has no legal links. Add a small "Legal" group (Privacy, Terms, Research policy) to the footer. Also lifts `/disclosure/` (8 inbound) to sitewide.

### P1 — high impact, low effort (all in `src/content/route-meta.ts`)

3. **Short titles under 40 chars** waste SERP width and carry no keyword beyond the name: `/about/` (25), `/systems/` (27), `/disclosures/` (28), `/my-story/` (28), `/privacy/` (34), `/terms/` (36), `/disclosures/the-kratt-problem/` (37), `/disclosures/zero-trust-octagon/` (38). Suggested:
   - `/about/` → `About Tom Kristian Abel — Security Researcher, Estonia`
   - `/systems/` → `Systems — Security Tooling & Backend Services | Tom Kristian Abel`
   - `/disclosures/` → `Security Research & Disclosures — Tom Kristian Abel`
   - `/my-story/` → `My Story — From Charges to Security Research | Tom Kristian Abel`
   - `/disclosures/zero-trust-octagon/` → `Zero-Trust Octagon: A First-Principles ZTA Framework — Tom Kristian Abel` (keep under 65)
   - `/disclosures/the-kratt-problem/` → `The Kratt Problem: Directing Offensive Capability — Tom Kristian Abel`
4. **Short meta descriptions**: `/terms/` (31), `/disclosure/` (82), `/about/` (83), `/privacy/` (83). Extend to 140-160 chars with the entity name and a reason to click, e.g. `/disclosure/`: "Security research policy of ProksiAbel OÜ: scope, safe-harbour rules, coordinated disclosure timeline, PGP key and how to reach Tom Kristian Abel if we appear in your logs."
5. **Thin internal linking to half the article set.** Only 1-2 pages link to: chatgpt-is-not-a-phishing-scanner, pact-software-anchor-turn, russian-cyber-ops-estonia-hosting, the-evolution-of-cyber-fraud-in-estonia (1 each); coordinated-disclosure, move-fast, nine-dimensions, saas-glued, the-fix, fortune-500, kratt, vlms (2 each). The index page is the only inbound for the "1" group. Add "Related reading" cross-links: fraud-in-estonia ↔ chatgpt-phishing ↔ russian-cyber-ops (Estonia fraud cluster); pact ↔ vlms ↔ what-client-side-trust ↔ botguard (client-side trust cluster); nine-dimensions ↔ the four archetype breach traces ↔ zero-trust-octagon (ZTA cluster, currently only octagon links down). `/systems/` (740 words, 27 inbound) links to no article — link each project card to its research page.

### P2 — polish

6. **Article OG metadata**: add `article:published_time`, `article:modified_time`, `article:author` (data already in `routeMeta[].ld`), and `og:locale=en_EE` to `index.html` / `spa-routes.mjs`. Consider per-article `og:image` (one shared 46 KB PNG today) — biggest lever for social CTR; `image` is also missing from the Article schema, which Google's Article rich result wants.
7. **Home H1** renders as two `<span class="block">` with no separator; text extraction yields `…for a living.Now I build…`. Add a space or `<br>` between `line1` and `line2` in `src/pages/HomePage.tsx:26-29`. Cosmetic for crawlers, free fix.
8. **Entry-row H3s include the hover arrow glyph** (`src/components/site/entry-row.tsx:49-55`): extracted headings read `The kratt problem→`. Move the arrow span outside the `<h3>` or add `aria-hidden` (it already lacks it).
9. **Estonian content is invisible to search.** `WebSite.inLanguage` claims `["en","et"]` and `route-meta.ts` holds `et` titles/descriptions, but the `et` rendition exists only via localStorage toggle on the same URL; no `hreflang`, no `/et/` URLs. Either drop the `et` claim from schema or ship `/et/` prerendered routes with `hreflang` pairs. (Routing-level; hand off to technical-seo-checker.)
10. **`/systems/` H2s are bare repo names** (`fingerprintproxy`, `deepgram-batch`, `Hele Beež Pastakas`). Prefix with a descriptive noun phrase ("fingerprintproxy — Go TLS-fingerprinting proxy") so headings carry a keyword.
11. **Short-body pages** (`/about/` 367 w, `/` 420 w) are fine for their page type; no action. `/disclosures/the-kratt-problem/` (1148) and `/the-fix-that-doesnt-need-sk/` (1409) are the thinnest essays and also among the least linked — raise them via item 5 rather than padding.

## Quick wins (under 30 minutes total)

- `id="seo-jsonld"` in `spa-routes.mjs` (P0-1)
- Footer legal links (P0-2)
- Eight title rewrites + four description rewrites in `route-meta.ts` (P1-3/4)
- Home H1 separator, arrow out of H3 (P2-7/8)

## Handoff

- Status: `DONE_WITH_CONCERNS` (keywords inferred, no Search Console data).
- Open loops: confirm target keywords per cluster; decide on Estonian URL strategy (P2-9).
- Next skill: `serp-markup-builder` for the title/description/OG rewrites; `site-structure-optimizer` for the cross-link clusters in P1-5; `technical-seo-checker` for hreflang/`/et/` routing.
