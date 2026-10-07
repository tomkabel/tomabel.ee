# Core Web Vitals audit — tomabel.ee (2026-10-07)

Lab: Lighthouse 13.5.0, headless Chrome, simulated throttling (RTT 150 ms, 1.6 Mbps, 4x CPU).
Build audited: `pub/` at commit `d773769` (`index-QNYs7d8H.js` live; `pub/` locally already has a newer `index-B7a5ceHC.js`, same chunk layout).
Raw JSON: `/tmp/lh/*.json` (not committed).

## Field data

Not available.

- CrUX API: requires an API key (keyless POST returns 404). Not queried.
- PageSpeed Insights API (keyless): `429 Quota exceeded` on the shared anonymous project. Not queried.
- Cloudflare Web Analytics: the dashboard has the beacon enabled, but the site CSP is `script-src 'self'`, so `static.cloudflareinsights.com/beacon.min.js` is **blocked on every page** (console error in all six runs). No RUM is being collected either. Pick one: add `https://static.cloudflareinsights.com` to `script-src` + `https://cloudflareinsights.com` to `connect-src` in the Cloudflare Transform Rule, or turn the beacon off. Right now it only costs a console error and a Best Practices hit.

Everything below is lab-only. Do not read the numbers as p75.

## Scores

| Page | Form factor | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | SI |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | mobile | **78** | 100 | 92 | 100 | 2.9 s | 3.7 s | 290 ms | 0 | 2.9 s |
| `/` | desktop | **99** | 100 | 92 | 100 | 0.7 s | 0.8 s | 0 ms | 0 | 0.8 s |
| `/disclosures/` | mobile | **84** | 100 | 92 | 100 | 3.5 s | 3.5 s | 30 ms | 0 | 3.5 s |
| `/disclosures/smart-id-achilles-heel/` | mobile | **76** | 100 | 92 | 100 | 3.8 s | 3.8 s | 250 ms | 0 | 3.8 s |
| `/about/` | mobile | **76** | 100 | 92 | 100 | 3.6 s | 3.6 s | 270 ms | 0 | 3.6 s |
| `/systems/` | mobile | **79** | 100 | 92 | 100 | 3.9 s | 3.9 s | 0 ms | 0 | 3.9 s |

Observed (unthrottled) values for reference: FCP 550–690 ms, LCP 550–750 ms, TTFB 30–190 ms, `load` ~600 ms. The site is fast on a real connection; the mobile scores are a throttled-network and 4x-CPU story.

BP 92 on every page = the two CSP/beacon console errors above. A11y and SEO are clean.

## Per-metric analysis

### CLS — 0 everywhere. Done.

Fontaine metric-matched fallbacks (`vite.config.ts`) and the prerendered shells do their job. No layout-shift entries in any run. Nothing to do.

### LCP — 3.5–3.9 s mobile (needs work), 0.8 s desktop (good)

- LCP element is a **text paragraph** on every page (`header … div.animate-rise-in > p.text-xl` on `/`, `p.prose-measure` on `/systems/`). No image, no hero. Good baseline.
- FCP == LCP on 4 of 5 mobile pages. The gap is not "LCP is slow", it is "first paint is slow". Fix FCP and LCP follows.
- LCP breakdown (observed): TTFB 60–190 ms, element render delay 560–630 ms, no load delay. The render delay is the `animate-rise-in` keyframe: `0% { opacity: 0 }` with `--dur-slow: 360ms` and `both` fill. The text that *is* the LCP candidate is painted invisible first, so Chrome cannot count it until the animation reaches a non-zero opacity. On `/` that pushes LCP ~800 ms past FCP in the throttled run (2.9 → 3.7 s).
- Why FCP is 2.9–3.9 s under simulation when the HTML is prerendered and only 7–9 KB: everything in `<head>` lands on the critical path at once and competes for a 1.6 Mbps pipe:

  | Request | Transfer | Priority | Blocking? |
  |---|---|---|---|
  | `index-6bbjZ0G3.css` | 7.5 KB gz | VeryHigh | yes (stylesheet) |
  | `index-*.js` (entry, `type=module`) | 44 KB gz | High | no (deferred) but downloaded in parallel |
  | `vendor-*.js` (`modulepreload`) | 79 KB gz | High | no, but downloaded in parallel |
  | `ui-*.js`, `rolldown-runtime-*.js` (`modulepreload`) | 6 KB | High | no |
  | `email-decode.min.js` (Cloudflare-injected, end of `<body>`) | 1.5 KB | High | sync script, flagged render-blocking |
  | 5 × woff2 (Newsreader 130 KB, Commit Mono 3 × 48 KB, Geist 30 KB) | **310 KB**, 67% of page weight | VeryHigh | `font-display: swap` so not blocking, but queued behind the CSS |

  ~130 KB of JS is `modulepreload`ed at High priority right next to the only render-blocking resource. The simulator gives the 7.5 KB stylesheet a share of the pipe, not the pipe. That is the 1.4–1.6 s "render-blocking-insight" estimate.

### INP — no field data; lab proxies only

- TBT: 250–290 ms on `/`, `/about/`, article; 0–30 ms on `/systems/` and `/disclosures/`. Max Potential FID 200–340 ms.
- Long tasks (mobile `/`): one 452 ms unattributed task at ~0.9 s (Style & Layout: 1.1–2.0 s of main-thread time in the breakdown across pages, `bootup-time` attributes 1.2 s to the document URL with only 4 ms of scripting) and 3 × 117–195 ms tasks in `vendor-*.js` at 3.6–3.9 s (React hydration). `forced-reflow-insight` reports 93 ms of unattributed forced reflow on `/`.
- The hydration tasks are the whole React tree being mounted in one commit. The unattributed Style & Layout chunk is the lead worth tracing: DOM is small (188 nodes on `/`, 429 on `/systems/`) and the CSS is 35 KB raw, so 1+ s of style/layout at 4x is more than expected. Suspects, in order: 11 `@font-face` declarations each with a long `unicode-range` and the fontaine fallback faces triggering font-matching passes; `backdrop-filter`/`:has()` (count in CSS: see `grep` in appendix, none found as of this build); the `animate-rise-in` transform on multiple elements. Verify with a DevTools performance trace (`Style recalculation` → "Elements affected") before changing anything.
- Nothing here would fail INP (≤ 200 ms) for a real user on a mid-range phone. Pages are static text; after hydration there are no heavy handlers. Low priority.

## Bundle analysis

`vite.config.ts` chunking: `node_modules/react*` → `vendor`, `lucide-react` → `ui`, everything else per-route via `React.lazy`. That part is right: article pages are 2–21 KB gz each and only the visited one loads.

| Chunk | Raw | Gzip | Note |
|---|---|---|---|
| `vendor-*.js` | 253 KB | 79 KB | react + react-dom + react-router. 42 KB (53%) flagged unused on first paint. |
| `index-*.js` | 144 KB | 44 KB | App shell, i18n `translations.ts`, route table, `@fontsource` CSS imports, Seo. |
| `ui-*.js` | 11 KB | 5 KB | lucide icons. |
| `index-*.css` | 35 KB | 7.5 KB | Tailwind + 11 `@font-face` + fontaine fallbacks. |
| route chunks | 6–52 KB | 2–21 KB | 20 article/page chunks, lazy. |
| fonts | 1.0 MB on disk | 310 KB transferred per cold visit | Newsreader latin opsz 132 KB alone; Commit Mono shipped as 3 static weights (400/500/700 × 48 KB). `.woff` fallbacks (57 KB × 3) are also in `pub/assets` and referenced by `@fontsource/commit-mono`. |

Cache: all `/assets/*` served `cache-control: max-age=2592000` via Cloudflare HIT, gzip (not brotli) for JS/CSS. HTML `max-age=600`, `cf-cache-status: DYNAMIC`. No `immutable`. Lighthouse's only cache complaint is the Cloudflare email-decode script (2-day TTL).

## Prioritized fixes

Ordered by expected mobile LCP gain per line of diff. No fix touches the content or design tokens.

1. **Drop the `0% { opacity: 0 }` from `rise-in`, or exclude it from the LCP block.** Change the keyframe to animate `transform` only, or keep opacity but remove `animate-rise-in` from the hero paragraph/section and leave it on secondary elements. One line in `tailwind.config.js:88`. Expected: LCP collapses onto FCP on `/` (−0.8 s mobile); the 560–630 ms "element render delay" disappears on every page.

2. **Stop modulepreloading `vendor`/`ui`/`runtime` ahead of the stylesheet.** The HTML already carries the full page; React is only needed for interactivity. Options, smallest first:
   - Move `<link rel="stylesheet">` above the `<script type="module">` and the `modulepreload`s in `index.html` so the parser sees the one blocking resource first (Vite emits them in insertion order of the entry; a `transformIndexHtml` hook or reordering in `scripts/spa-routes.mjs` does it).
   - Or set `build.modulePreload: false` in `vite.config.ts` — the entry script imports `vendor` immediately anyway; the preload buys ~1 RTT on desktop and costs the stylesheet bandwidth on mobile.
   Expected: render-blocking-insight's 1.4–1.6 s estimate drops to the stylesheet's own ~150 ms.

3. **Cut first-visit font bytes (310 KB → ~130 KB).**
   - Commit Mono: import one weight (`400`) and let the browser synthesize or map `500`/`700` to it for the small amount of mono UI text; or subset to `latin` only. Saves ~96 KB.
   - Newsreader opsz variable at 132 KB is the single largest asset; it is the display face so it has to load, but check whether `@fontsource-variable/newsreader/opsz.css` is pulling the full optical-size axis when the site uses one size range. `wght`-only `@fontsource-variable/newsreader` is ~60 KB.
   - Delete the `.woff` fallbacks from `pub/assets` by importing the `woff2`-only entrypoints — they are dead weight in the repo (172 KB) even if never requested.
   Fonts are `swap` so this does not move FCP, but it frees the pipe for the CSS in the simulated run and shortens the swap window for real users.

4. **Fix or remove the Cloudflare Web Analytics beacon.** Either allowlist it in the CSP Transform Rule (`script-src 'self' https://static.cloudflareinsights.com; connect-src … https://cloudflareinsights.com`) and get RUM for free, or disable it in the dashboard. Either way: BP 92 → 100 and the only console error goes away. Zero repo change.

5. **Turn off Cloudflare Email Address Obfuscation** (Scrape Shield). It injects a synchronous `email-decode.min.js` into every page that Lighthouse flags as render-blocking and short-TTL. The site has no plaintext `mailto:` worth protecting beyond what the PGP section exposes anyway. Zero repo change. If kept, nothing in the repo can fix it.

6. **Serve JS/CSS with Brotli.** Cloudflare is returning gzip for `/assets/*.js` from GitHub Pages origin. Enable Brotli in Speed → Optimization (free plan has it). ~15% off the 130 KB JS payload.

7. **Add `immutable` to hashed assets.** GitHub Pages fixes `max-age=600`/`2592000`; a Cloudflare Cache Rule on `/assets/*` with Edge TTL 1 year and Browser TTL 1 year is the only lever. Repeat-visit win only.

8. **(Optional, measure first) Chunk `react-router` out of `vendor`** so the 42 KB unused-on-first-paint part is a separate parallel download — or leave it. React + ReactDOM at 79 KB gz is already the floor for a hydrated React app; the real lever is item 2 (don't make it compete with the CSS), not splitting it further.

9. **(Optional) Speculation Rules `prerender` with `eagerness: moderate` for `/disclosures/*`.** Same-origin, static, no side effects beyond the (blocked) beacon. Would make article navigations from the index instant on Chromium. Only after 1–3 land; it does not help the first page.

Not recommended: inlining critical CSS (the whole stylesheet is 7.5 KB gz; inlining it into 20+ prerendered shells saves one request and makes `spa-routes.mjs` carry CSS), reducing `translations.ts` (it is already in the entry and small relative to React), or any image work (there are no images on the audited pages).

## Re-measure

After 1–3: rerun the same six commands and expect mobile Perf in the high 80s/low 90s with FCP ≈ LCP ≈ 2.0–2.5 s under the same throttling. Field p75 cannot be confirmed until a RUM source exists (fix 4).

```
npx lighthouse https://tomabel.ee/ --output=json --output-path=./lh-home.json \
  --chrome-flags="--headless=new" --only-categories=performance,seo,accessibility,best-practices
```

## Appendix — evidence pointers

- LCP node (`/`): `header.px-6 > div.mx-auto > div.animate-rise-in > p.text-xl`, bounding box 364×156 at y=459.
- `tailwind.config.js:84` `'rise-in': 'rise-in var(--dur-slow) var(--ease-out) both'`, `:88` keyframe `0% { opacity: 0; transform: translateY(8px) }`; `src/index.css:83` `--dur-slow: 360ms`.
- `src/main.tsx:6-10` imports five `@fontsource` CSS files; `pub/assets/index-6bbjZ0G3.css` has 11 `@font-face`, all `font-display: swap`.
- `pub/index.html:82-87` order: module script, 3 × modulepreload, then stylesheet.
- Live CSP (Cloudflare Transform Rule): `default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://proksimity.proksiabel.ee; …`
- Cloudflare-injected: `<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js">` before `</body>` on every route.
- Main-thread breakdown (`/` mobile): Style & Layout 1153 ms, Other 524 ms, Script Evaluation 404 ms; `/systems/`: Style & Layout 1961 ms.
