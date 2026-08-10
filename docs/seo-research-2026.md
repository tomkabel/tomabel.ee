# tomabel.ee SEO Research Report — 2026

*Generated: 2026-08-10 | Sources: 19 | Confidence: High (architecture-level), Medium (AI-crawler vendor data)*

## Executive Summary

The single biggest SEO problem on tomabel.ee is not in the repo — it's that **the live
deployment is a stale, client-only SPA shell**. Every subpage (`/research`, `/projects`,
`/writing`, `/about`) currently serves the exact same HTML as the homepage: same title,
same canonical pointing at `https://tomabel.ee/`, same og tags, and an empty
`<div id="root">` for all body content. Google still renders JavaScript, but with
rendering-queue delays, and the AI crawlers that increasingly drive discovery (GPTBot,
ClaudeBot, PerplexityBot, Bytespider) **do not execute JavaScript at all** — they see
only the raw HTML shell. The repo already contains per-route SEO metadata, self-hosted
fonts, and a Person JSON-LD block, but none of it is live. The 2026 action list is
therefore: (1) deploy the current repo build after fixing four small repo-side bugs,
(2) replace the SVG og:image with a 1200×630 PNG, (3) drop the pointless self-referencing
hreflang tags, (4) deploy llms.txt as a low-cost bet, and (5) treat the long-form
research pages as the AI-citation play — they are exactly the "high fact density,
expert, non-commodity content" both Google and the GEO research say earns citations.

---

## 1. Rendering architecture: the 2026 problem is AI crawlers, not Google

- Google renders JavaScript and in March 2026 removed its long-standing JS SEO warning
  from developer docs — but rendering happens in a queue, with delays, and extreme
  resource bloat can still hurt indexing ([Google Search Central](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics),
  [Search Engine Land](https://searchengineland.com/no-javascript-fallbacks-474605),
  [Lantern](https://www.asklantern.com/blogs/ai-crawlers-do-not-render-javascript)).
- **None of the major AI crawlers render JavaScript as of mid-2026.** Analysis of 500M+
  GPTBot fetches found zero evidence of JS execution; GPTBot downloads JS files only
  ~11.5% of the time and never runs them. This holds for GPTBot, OAI-SearchBot,
  ClaudeBot, Claude-SearchBot, PerplexityBot, Meta-ExternalAgent, and Bytespider.
  Gemini is the exception (it reuses Googlebot's rendering infrastructure)
  ([Lantern](https://www.asklantern.com/blogs/ai-crawlers-do-not-render-javascript),
  corroborated by [Vercel's crawl analysis](https://www.linkedin.com/posts/chris-long-marketing_seo-study-new-data-shows-that-most-major-activity-7282388026167595009-0KFr)
  and a [four-crawler test on 11 sites](https://www.reddit.com/r/TechSEO/comments/1vdmnwp/i_tested_11_recent_sites_with_four_ai_crawler/)).
- ~92% of ChatGPT Search responses draw on Bing's index, and Bingbot has limited JS
  rendering — so a client-rendered SPA is cut off from ChatGPT Search from two
  directions at once ([Lantern](https://www.asklantern.com/blogs/ai-crawlers-do-not-render-javascript)).
- Consensus recommendation for content pages in 2026: SSR or SSG/prerendering, with
  client-side JS only for interactivity ([SEO-kreativ 2026](https://www.seo-kreativ.de/en/blog/javascript-seo-rendering/),
  [Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

**tomabel.ee impact:** the live build is a plain Vite client build (`vite build` → SPA
shell with `<div id="root">`). Even after Google's rendering queue, only the homepage
has any meta; subpages canonicalize to the homepage. The repo uses TanStack Start, which
is SSR-capable — but the current build script produces a client-only bundle. Prerendering
the routes to static HTML (or enabling SSR on deploy) is the architectural fix; the
repo's per-route `HeadContent` metadata will then actually reach crawlers.

## 2. Current live-state audit (verified 2026-08-10)

| Check | Live status | Repo status | Verdict |
|---|---|---|---|
| robots.txt | `Allow: /`, only `/.well-known/openpgpkey/` disallowed, sitemap declared | matches | Good — no `/assets/` block, AI bots allowed |
| sitemap.xml | 7-8 URLs, absolute, `lastmod` stamped | `BASE_URL = ""` → would emit broken relative `<loc>`s | Fix repo before next deploy |
| Per-route title/canonical | Subpages serve homepage canonical+title (all → `https://tomabel.ee/`) | Per-route `HeadContent` exists, **canonical/og:url are relative** (`/research`) | Deploy + absolutize |
| og:image | `og-image.svg` | same | SVG unsupported by FB/LinkedIn/X — replace with PNG |
| hreflang | `et` + `en` + `x-default`, all → same English URL | same | Pointless self-referencing — remove or build real ET pages |
| llms.txt | **404** | exists in `public/` | Deploy it |
| Fonts | Google Fonts from `fonts.googleapis.com` | self-hosted (fontsource) + fontaine fallbacks | Stale deploy; redeploy fixes |
| Person JSON-LD | Good: `sameAs`, `knowsAbout`, `worksFor` | `site.ts` contact fields are `"#"` placeholders | Next deploy would regress the live sameAs URLs — fill them in first |
| Route inventory | sitemap lists `/writing/i-used-to-break-authentication`, `/privacy` | repo has no such routes | Deployed app diverges from repo — reconcile |

## 3. Technical SEO basics that still matter (2026)

- **Canonicals:** absolute URLs are the safest form; Google documents that client-side
  rendered sites should put the canonical in the HTML source and not mutate it with JS
  ([Google](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls),
  [Arc Intermedia](https://www.arcintermedia.com/shoptalk/canonical-urls-relative-or-absolute/)).
  `og:url` must be absolute per the Open Graph spec. The repo's relative canonicals must
  become `https://tomabel.ee/...`.
- **og:image:** 1200×630 PNG/JPG, 1.91:1, < 1MB. Facebook's debugger explicitly warns
  "Unsupported Image File Extension" for SVG; GIF and SVG are not widely supported
  ([Krumzi](https://www.krumzi.com/blog/open-graph-image-sizes-for-social-media-the-complete-2026-guide),
  [Stack Overflow](https://stackoverflow.com/questions/21636503/use-svg-as-ogimage),
  [Red Studio](https://redstudio.ie/og-image-checker)).
- **hreflang:** self-referencing hreflang on a single-language site is ignored/pointless;
  it exists for multi-language alternates ([Webmasters SE](https://webmasters.stackexchange.com/questions/65367/self-referential-hreflang-attributes-for-single-language-website),
  [r/TechSEO](https://www.reddit.com/r/TechSEO/comments/1n27ka2/selfreferencing_hreflang_only_without_other/)).
  Either remove `et` (site copy is English) or build real Estonian pages.

## 4. Structured data after the March 2026 update

- Google narrowed rich-result eligibility to schema describing the page's primary
  content purpose; FAQ rich results dropped by ~half. **Entity-based schema is the
  survivor**: clean `Person`/`Organization` blocks with `sameAs`, `knowsAbout`,
  `worksFor` correlate with more AI citations because LLMs can confidently resolve who
  the source is ([Digital Applied](https://www.digitalapplied.com/blog/schema-markup-after-march-2026-structured-data-strategies)).
- tomabel.ee's homepage `Person` JSON-LD matches this exactly — keep it, and add
  `TechArticle`/`Article` (with `datePublished`, `author`) to the writing/research pages
  once they exist as real routes. Google's `ProfilePage` type is a documented home for
  the about page ([schema.org](https://schema.org/ProfilePage)).
- Schema reinforces visible content; it does not replace it ([Lantern](https://www.asklantern.com/blogs/ai-crawlers-do-not-render-javascript)).

## 5. Core Web Vitals (2026 thresholds unchanged: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1)

- INP is now the most-failed vital (43% of sites fail 200ms); LCP hardest to pass
  ([Digital Applied](https://www.digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide),
  [corewebvitals.io](https://www.corewebvitals.io/core-web-vitals)).
- Highest-impact fixes: self-hosted fonts with `font-display: swap` + metric-compatible
  fallbacks (`size-adjust`/`ascent-override`), preload the LCP resource with
  `fetchpriority="high"`, WebP/AVIF images with explicit dimensions, SSR for TTFB
  ([Digital Applied](https://www.digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide),
  [NodeAscend](https://nodeascend.com/blog/core-web-vitals-seo-2026/)).
- The repo already self-hosts fonts with fontaine fallback metrics (commits d964194 /
  5b2cc5e) — the win is again just deployment. The stale live build still loads three
  Google Fonts stylesheets over the network.

## 6. AI visibility / GEO: what 2026 evidence actually supports

- **Grounding = traditional SEO.** Google's generative features (AI Overviews, AI Mode)
  use RAG over its core search index; the prerequisite is being indexed and eligible.
  Google explicitly says to prioritize effective SEO over "AEO/GEO hacks" such as
  chunking or "creating unnecessary AI text files (like llms.txt)"
  ([Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
- **Fact density works.** The Princeton/Gatech/AI2 GEO study: adding statistics,
  citations, and quotations lifted visibility of lower-ranked pages in AI answers by up
  to 40% ([arXiv 2311.09735](https://arxiv.org/pdf/2311.09735)).
- **llms.txt is a cheap bet, not a lever.** A 300k-domain study found no correlation
  between having llms.txt and being cited; no major lab officially honors it. But it's
  trivial, Yoast is automating it, and Google has started probing for it — ship it with
  realistic expectations ([Medium](https://medium.com/@somanathtv/from-seo-to-geo-part-2-the-new-rules-of-ai-visibility-in-2026-5dd00712e4b5),
  [Lantern](https://www.asklantern.com/blogs/ai-crawlers-do-not-render-javascript)).
- **Don't block AI crawlers on a marketing site.** Allow `OAI-SearchBot`,
  `PerplexityBot`, `ClaudeBot` for citations; the train-vs-retrieve distinction
  (GPTBot/ClaudeBot = training; OAI-SearchBot/Claude-SearchBot = retrieval) lets you
  choose ([Contently](https://contently.com/2026/05/06/ai-crawlers-explained-gptbot-claudebot-perplexitybot/),
  [Okara](https://okara.ai/blog/robots-txt-for-ai-crawlers),
  [ZipTie](https://ziptie.dev/blog/technical-seo-for-ai-crawlability/)). Current
  robots.txt already allows everything — keep it that way.
- ~44% of LLM citations come from the first 30% of an article — lead with the answer
  ([Medium](https://medium.com/@somanathtv/from-seo-to-geo-part-2-the-new-rules-of-ai-visibility-in-2026-5dd00712e4b5)).

## 7. Cloudflare: already aligned with 2026 practice

The applied config (strict-ish SSL via Full, Always Use HTTPS, HSTS + security headers,
min TLS 1.2, Brotli, HTTP/3, Early Hints, cache rules with 1h SWR on HTML and long TTLs
on hashed assets, Free WAF ruleset, AI-bot handling via managed robots) matches current
recommendations. Nothing more needed for SEO on the CF side; just ensure `sitemap.xml`
and `llms.txt` aren't cached longer than a day.

---

## Key Takeaways — prioritized action plan

**P0 — Unblocks everything (deploy current repo, after 4 fixes):**
1. Fix `src/routes/sitemap[.]xml.ts` `BASE_URL` → `https://tomabel.ee` (current repo
   build would emit broken relative `<loc>`s).
2. Fill `site.ts` contact placeholders (`github`/`linkedin`/`rss` are `"#"`; live
   build currently has real `sameAs` URLs — a repo deploy would regress them).
3. Make per-route canonicals + `og:url` absolute (`https://tomabel.ee/research`, …).
4. Reconcile the route inventory (live sitemap lists `/writing/i-used-to-break-authentication`
   and `/privacy`; repo has no such routes — add or remove).
5. Deploy; verify every sitemap URL returns 200 with a unique title + self-canonical,
   `llms.txt` returns 200.

**P1 — Quick technical wins:**
6. Rasterize `og-image.svg` → `og-image.png` 1200×630 and point og/twitter:image at it.
7. Remove the self-referencing `et`/`en` hreflang trio (or build real Estonian pages).
8. Add `TechArticle` JSON-LD (`datePublished`, `author`, `headline`) to research/writing
   pages; consider `ProfilePage` on /about.

**P2 — AI visibility:**
9. Keep robots.txt open to AI crawlers; optionally make the train-vs-retrieve stance
   explicit (allow OAI-SearchBot/PerplexityBot/Claude-SearchBot).
10. Ship llms.txt (already in repo; 404 live) — cheap bet, no over-investment.
11. Content: the long-form research pages are the citation play — lead with the answer,
    add concrete data/dates/quotes (fact density), keep each section independently
    readable.

**P3 — Measure after deploy:** PageSpeed Insights per route; confirm self-hosted fonts
(+fontaine fallbacks) end the Google Fonts render chain; check GSC "Generative AI
performance" report; resubmit sitemap; re-check indexing in ~2 weeks.

## Sources

1. [AI Crawlers Do Not Render JavaScript — Lantern](https://www.asklantern.com/blogs/ai-crawlers-do-not-render-javascript) — 500M-fetch evidence; train/retrieve distinction; fixes
2. [Optimizing for generative AI features — Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) — official GEO stance; llms.txt "unnecessary"
3. [Understand JavaScript SEO basics — Google](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) — rendering queue, SSR still recommended
4. [No-JavaScript fallbacks in 2026 — Search Engine Land](https://searchengineland.com/no-javascript-fallbacks-474605) — Google renders JS but with caveats
5. [JavaScript SEO & Rendering 2026 — SEO-kreativ](https://www.seo-kreativ.de/en/blog/javascript-seo-rendering/) — CSR vs SSR vs SSG vs AI crawlers
6. [GEO: Generative Engine Optimization — Princeton/GaTech/AI2 (arXiv)](https://arxiv.org/pdf/2311.09735) — fact density +40% citation lift
7. [From SEO to GEO Part 2 — Medium (Somanath)](https://medium.com/@somanathtv/from-seo-to-geo-part-2-the-new-rules-of-ai-visibility-in-2026-5dd00712e4b5) — llms.txt 300k-domain study; 44% first-30% citations
8. [Core Web Vitals 2026 — Digital Applied](https://www.digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide) — INP 43% fail rate; font/image fixes
9. [Core Web Vitals 2026 — corewebvitals.io](https://www.corewebvitals.io/core-web-vitals) — thresholds; 2025 Web Almanac pass rates
10. [Core Web Vitals SEO 2026 — NodeAscend](https://nodeascend.com/blog/core-web-vitals-seo-2026/) — font preload, size-adjust fallbacks
11. [Schema markup after March 2026 — Digital Applied](https://www.digitalapplied.com/blog/schema-markup-after-march-2026-structured-data-strategies) — entity schema → AI citations; FAQ decline
12. [ProfilePage — schema.org](https://schema.org/ProfilePage) — profile page type reference
13. [Canonical URL best practices — Google](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) — absolute preferred; JS sites: keep canonical in source HTML
14. [Canonical URLs: relative or absolute — Arc Intermedia](https://www.arcintermedia.com/shoptalk/canonical-urls-relative-or-absolute/) — absolute safest
15. [OG image sizes 2026 — Krumzi](https://www.krumzi.com/blog/open-graph-image-sizes-for-social-media-the-complete-2026-guide) — 1200×630, PNG/JPG
16. [Use SVG as og:image — Stack Overflow](https://stackoverflow.com/questions/21636503/use-svg-as-ogimage) — Facebook rejects SVG extension
17. [Self-referential hreflang single-language — Webmasters SE](https://webmasters.stackexchange.com/questions/65367/self-referential-hreflang-attributes-for-single-language-website) — no benefit
18. [Self-referencing hreflang only — r/TechSEO](https://www.reddit.com/r/TechSEO/comments/1n27ka2/selfreferencing_hreflang_only_without_other/) — ignored, needs 2+ versions
19. [robots.txt for AI crawlers 2026 — Okara](https://okara.ai/blog/robots-txt-for-ai-crawlers) — allow search bots for citations; train vs retrieve
20. [AI crawlers explained — Contently](https://contently.com/2026/05/06/ai-crawlers-explained-gptbot-claudebot-perplexitybot/) — don't block AI crawlers on marketing sites

## Methodology

Audited the live site (curl of `/`, `/research`, `/writing/i-used-to-break-authentication`,
`robots.txt`, `sitemap.xml`, `llms.txt`, `og-image.svg`) and the repo
(`tomabel/src/routes/*`, `site.ts`, `package.json`) on 2026-08-10. Ran 9 web searches
across JavaScript-rendering SEO, GEO/AI visibility, Core Web Vitals 2026, structured
data 2026, canonical best practices, AI-crawler robots handling, og:image formats, and
single-language hreflang; deep-read 3 key sources in full (Lantern AI-crawler analysis,
Google's generative-AI optimization guide, Search Engine Land no-JS fallbacks).

Sub-questions investigated: (1) Is client-side rendering still an SEO problem in 2026?
(2) How do AI crawlers differ from Googlebot, and what does that mean for this site?
(3) What does 2026 evidence say about llms.txt/GEO tactics? (4) What changed in
structured data in March 2026? (5) Which CWV fixes matter for this stack? (6) What does
the live site currently get wrong?
