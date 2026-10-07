# Semantic HTML audit — tomabel.ee (2026-10-07)

Scope: all 27 URLs in `pub/sitemap.xml` plus `/cookies/` and the `404.html` fallback.
Method: static scan of every `pub/**/index.html` (output of `scripts/spa-routes.mjs` +
`src/entry-server.tsx`), then Playwright against the live site: hydrated DOM vs raw HTML
(`fetch` of the same URL), Estonian switch, and a `javaScriptEnabled: false` context at 390 px.

## Verdict

The prerender pipeline is in good shape: every sitemap URL returns 200 with its own
`<title>`, description, self-canonical, OG/Twitter tags and JSON-LD; one `<h1>` per page,
no heading-level skips, `<main>`/`<nav>`/`<footer>` on every page, `<article>` + `<header>`
on every research page, 0 `<img>` (so no alt-text debt), 0 empty links, 0 generic
"read more" links. Hydrated DOM matches the prerendered DOM 1:1 on landmark and heading
counts; no React hydration errors in the console. The issues below are all small.

Per-page scan (identical pattern on all 20 research pages; representative rows):

| URL | h1 | headings | skips | main/nav/footer | article | aside | text chars (no-JS) |
|---|---|---|---|---|---|---|---|
| `/` | 1 | 10 | 0 | 1/1/1 | 0 | 0 | 2 658 |
| `/disclosures/` | 1 | 21 | 0 | 1/1/1 | 19 | 1 | 10 712 |
| `/disclosures/botguard-disassembled/` | 1 | 14 | 0 | 1/2/1 | 1 | 3 | 21 750 |
| `/systems/`, `/about/`, `/my-story/`, `/privacy/`, `/terms/`, `/disclosure/` | 1 | 4–18 | 0 | 1/1/1 | 0–1 | 0 | 2.2k–3.9k |
| `/cookies/` (not in sitemap) | 0 | 0 | – | 0/0/0 | – | – | 35 (noindex + `<noscript>` meta-refresh to `/privacy/`, verified working with JS off) |
| `404.html` | 0 | 0 | – | 0/0/0 | – | – | 0 |

## Findings

### 1. Duplicate JSON-LD after hydration on every article page (Medium)

Live DOM on `/disclosures/botguard-disassembled/` carries 5 `application/ld+json` blocks
(`Person`, `Organization`, `WebSite`, `ScholarlyArticle+BreadcrumbList` x2); the raw HTML
has 4. `scripts/spa-routes.mjs:94-97` stamps the route JSON-LD with no `id`;
`src/components/Seo.tsx:259-267` removes only `#seo-jsonld` and then appends a fresh copy,
so the prerendered block survives and the article schema is emitted twice. Googlebot
renders JS, so it sees the duplicate. Harmless today (identical content) but it will
diverge the moment the client-side language differs from `en` (Estonian `headline`/`abstract`
appear beside the English one).

Fix (one line): in `scripts/spa-routes.mjs:96` emit
`<script type="application/ld+json" id="seo-jsonld">${json}</script>` so the existing
`document.getElementById('seo-jsonld')?.remove()` in `Seo.tsx:259` picks it up.

### 2. Estonian content is invisible to crawlers; no `hreflang`, no `og:locale` (Medium, known)

Every shell is `<html lang="en">` with English copy; Estonian exists only after JS runs and
only as client state (`localStorage`, `src/i18n/LanguageContext.tsx:43-62`). There are no
`<link rel="alternate" hreflang>` tags (0 across all 28 files) and no `og:locale`. Search
engines therefore index one language and the `et` translations in
`src/content/route-meta.ts` and `src/i18n/translations.ts` never rank. This is the
architecture already documented in `docs/i18n-locale-urls-plan.md`; nothing to fix in
markup until locale URLs exist. Until then, two cheap honest signals:

- Add `<meta property="og:locale" content="en_US">` to `index.html` (and keep it English; it
  describes the shell that is actually served).
- Do **not** add `hreflang` pointing at the same URL for both languages — that is a
  mis-signal.

Estonian readers do get the right `lang`: `document.documentElement.lang` flips to `et`
after the switch (verified), English-only articles stay wrapped in `<div lang="en">`
(`src/App.tsx:152`, `LanguageContext.tsx:90`) with a `role="note"` banner, and the toggle's
visible label is marked `lang` for the target language (`src/components/site/nav.tsx:89`).
Good.

### 3. Dates are plain text, no `<time datetime>` (Low, SEO/machine-readability)

0 `<time>` elements site-wide. Article header meta (`src/components/site/article.tsx:37-41`)
renders `"Published · August 11, 2026"` as an `<li>` string, and list rows render
`"Published 11 Aug 2026 · Updated 4 Oct 2026 · 15 min read"` from one pre-joined string in
`src/content/site.ts` (e.g. lines 176, 192, 206). `datePublished`/`dateModified` are present
in JSON-LD, so Google has the dates; `<time>` would give the same to readers, agents that
scrape HTML (the Markdown worker included) and the Markdown conversion.

Fix: keep `site.ts` strings but let the article header accept `published`/`updated` ISO
values and render `<time dateTime="2026-08-11">August 11, 2026</time>`. Scope: `article.tsx`
header + the per-page `meta` arrays. Low priority; do it when a page's dates are next
touched.

### 4. Home `<h1>` text concatenates two lines without a separator (Low)

`src/pages/HomePage.tsx:26-29` renders two `display:block` spans; text extraction (crawlers,
screen readers reading the heading as one string, the Markdown worker) yields
`"I broke authentication for a living.Now I build the kind that doesn't."` (verified in raw
and live `textContent`; same in Estonian: `"...autentimist.Nüüd..."`).

Fix: put a space inside the first span's text or insert `{' '}` between the spans. The
`block` class keeps the visual line break.

### 5. Landmarks: unlabeled primary `<nav>` and three unlabeled `<aside>` per article (Low, a11y)

Research pages have two `<nav>` elements. The in-article TOC is labeled
(`reader-rail.tsx:74`, "Article contents"); the site nav at `src/components/site/nav.tsx:26`
is not, so landmark lists show two anonymous/one named nav. The reader-rail wrapper
`<aside class="lg:col-span-3">` (in the article page layout) and the `Callout` component
(`article.tsx:66`) all emit `<aside>` with no accessible name; the callouts are inline
"axiom/note" boxes, not complementary regions, and multiply the `complementary` landmarks
(3 on BotGuard).

Fix: `nav.tsx:26` → `<nav aria-label={t.nav.primary}>` (add the key to
`src/i18n/translations.ts`); `article.tsx:66` Callout → `<div role="note">` (or keep
`<aside aria-label={label}>` if you want it in the landmark list); the rail `<aside>` →
`aria-label` matching the rail's own heading.

### 6. Mobile-menu SVG lacks `aria-hidden` (Trivial)

`src/components/site/nav.tsx:100`: the hamburger/close `<svg>` has no `aria-hidden`. The
button already has `aria-label` (line 96), so the SVG is redundant; add `aria-hidden`.
Every other SVG on the site is already hidden. 1 occurrence per page.

### 7. Repeated identical link text on `/systems/` (Low, WCAG 2.4.4 / link-text SEO)

12 links read "Source ↗" and 6 read "Live ↗" (`src/pages/SystemsPage.tsx:18-19`), each
pointing to a different repo/site. The arrow is correctly `aria-hidden`. Links are
distinguishable by their containing card for sighted users, but not in a links list or for
a crawler.

Fix: `aria-label={`${label} — ${p.name}`}` or a `sr-only` span with the project name on the
anchor in `SystemsPage.tsx`.

### 8. TOC link accessible name runs the number into the label (Trivial)

`src/components/site/reader-rail.tsx:113-116` renders `<span>01</span><span>Timeline</span>`
with flex gap only, so the name is `"01Timeline"` (raw-HTML link list shows `10Conclusion`,
`01Timeline`). Either `aria-hidden` the number span (the `<ol>` already conveys order) or
add `{' '}` between the spans.

### 9. Progressive enhancement without JS (mostly fine; two gaps)

Verified with `javaScriptEnabled: false` at 390 px on the live site:

- `/` and every article: full text, styled (CSS loads), `<h1>` visible, skip link works
  natively (`href="#main-content"`, `src/App.tsx:131`), in-page `#fragment` TOC links work,
  all `<a>` have `href`, 0 `<form>` elements (contact is `mailto:` links in the footer).
- `/cookies/`: `<noscript><meta http-equiv="refresh">` to `/privacy/` fires. Good.
- **Gap A — mobile nav without JS**: the desktop link group is `hidden md:flex`, the
  hamburger is a JS-only `<button>` (`nav.tsx:93-98`), so a no-JS phone sees only the brand
  link and the (inert) language button in the nav; 1 of 5 nav links visible. The footer
  repeats all site links (`src/components/site/footer.tsx:26-44`), so the page is still
  navigable. Acceptable; if you want zero-JS parity, swap the menu for
  `<details><summary>` on `< md`.
- **Gap B — `404.html` is an empty shell**: 0 landmarks, 0 text, homepage `<title>`
  (`scripts/spa-routes.mjs:133-139`). With JS off an unknown URL renders a blank dark page.
  Add a `<noscript>` paragraph with a link to `/` inside `#root`'s sibling, or prerender
  `NotFound` into `404.html` (the client would then `createRoot` over it — fine, it already
  does so for Estonian readers). Also set the 404 shell's `<title>` to the `notFound` entry
  in `route-meta.ts` and keep `noindex`.
- Language toggle and telemetry are `<button>`s, so they simply do nothing without JS —
  correct element choice; no fake links.

### 10. Hydration / prerender concerns (verified, no action needed)

- `src/main.tsx:46-47`: hydrates only when `initialLanguage() === 'en'`; Estonian readers
  get `createRoot` over the English shell (flash of English, acknowledged in the source
  comment). No "Hydration failed" console errors on `/` or on an article in a clean profile.
- `scripts/spa-routes.mjs:50-57` fails the build if a page prerenders < 500 chars of text;
  `:103-117` fails on anything but exactly one self-canonical; `:120-130` fails if
  `index.html` title/description drift from `route-meta.ts`. These gates are what keep the
  table above clean — keep them.
- `src/entry-server.tsx:15-19` double-passes (`prerender` then `renderToString`) so lazy
  routes emit plain markup with no inline Suspense swap scripts (which the CSP would block).
  Confirmed: no inline `<script>` other than JSON-LD in any shell.
- `document.title`, description, canonical, OG and Twitter tags are updated on client-side
  route change (`Seo.tsx:244-257`); focus moves to `#main-content` on SPA navigation only
  (`App.tsx:68-76`). Both match the skill checklist.
- `lang="disasm"` in `src/pages/BotGuardDisassembledResearchPage.tsx:50` is a `CodeBlock`
  prop, not an HTML `lang` attribute; it does not reach the DOM (only `en`/`et` found in
  all shells). Not an issue.

### 11. Out of scope but seen on every page load

Console error on every page: Cloudflare Web Analytics beacon
(`static.cloudflareinsights.com/beacon.min.js`) is blocked by the `script-src 'self'` CSP
set in the Cloudflare header rule. Either turn Web Analytics off for the zone or add the
host to `script-src`; as is, it is dead weight in the HTML and noise in the console.

## Checklist (skill `semantic-html-and-seo`)

| Item | Status |
|---|---|
| One `<h1>` per page, logical outline | Pass (28/28, 0 skips) |
| `<main>`, `<nav>`, `<footer>`, `<article>`, `<section>`, `<header>` | Pass; see #5 for labels |
| Every `<img>` has alt | N/A (0 images; `og-image.png` exists, 45.9 KB) |
| Unique `<title>` per page | Pass |
| `<meta name="description">` per page | Pass |
| Open Graph / Twitter on all pages | Pass (`og:locale` missing, #2) |
| Self-canonical | Pass (build-gated) |
| JSON-LD | Pass; duplicate after hydration (#1) |
| Forms work without JS | N/A (no forms; `mailto:`) |
| SPA updates title/meta on route change | Pass |
| SPA moves focus on route change | Pass |
| `prefers-reduced-motion` | Pass (`src/index.css`) |
| `<time datetime>` for dates | Fail (#3) |
| `hreflang` / per-locale URLs | Not applicable until `docs/i18n-locale-urls-plan.md` ships (#2) |
| No-JS fallback | Pass with gaps (#9 A, B) |

## Fix order

1. `scripts/spa-routes.mjs:96` — add `id="seo-jsonld"` (#1).
2. `src/pages/HomePage.tsx:27` — space between h1 spans (#4).
3. `src/components/site/nav.tsx:26,100` — `aria-label` on nav, `aria-hidden` on SVG (#5, #6).
4. `src/components/site/reader-rail.tsx:113` and `src/pages/SystemsPage.tsx:18-19` — link
   names (#7, #8).
5. `src/components/site/article.tsx:66` — Callout as `role="note"` (#5).
6. `scripts/spa-routes.mjs:133-139` — 404 shell gets a `<noscript>` body and its own title (#9B).
7. `<time>` in article header (#3) when dates are next edited.
