# Fix log 01: links, footer, UI (README #1, #12 footer, #14 UI)

## #1 slash-less internal links
- Root cause: ~60 `<Link to="/x">` literals; only canonicals went through `pageUrl()`.
- Change: new `src/components/site/link.tsx` exports `withSlash()` and a `Link` wrapper over react-router's Link that normalises string `to` (keeps `?query`/`#hash`, skips file extensions). All 27 files that imported `Link` from react-router-dom now import it (`import Link from '.../link'`). `nav.tsx` active-state compares `withSlash()` of both sides (pathname is slashed on the canonical URL).
- Assertion: `scripts/check-links.mjs` scans `pub/**/*.html` `<a href="/...">`, exits 1 on any slash-less non-file path. Wired in `package.json` postbuild (`node scripts/spa-routes.mjs && node scripts/check-links.mjs`).
- Verify: `npm run build` prints `check-links: all internal hrefs are slashed`; `pub/index.html` hrefs are `/about/`, `/disclosures/`, `/disclosures/?kind=essay`, `/disclosures/<slug>/`. Negative test: editing `pub/about/index.html` to `href="/about"` -> check fails rc=1.
- Not touched: `Navigate to=` redirects in `App.tsx`/`Cookies.tsx` (client-only, not emitted as links).

## #12 footer legal group
- `src/components/site/footer.tsx`: new "Legal / Õigusinfo" group (`/privacy/`, `/terms/`, `/disclosure/`), grid `md:grid-cols-5`. `/cookies` is a redirect, so omitted. Verified `/privacy/` present in prerendered `pub/about/index.html`.

## #14 UI
- Home H1: `{' '}` between the two block spans (`HomePage.tsx`), prerender shows `living.</span> <span`.
- Numerals "01": the text is gone; rendered by `before:content-[attr(data-n)]` on an `aria-hidden` element with `data-n` (`reader-rail.tsx`, 18 article pages via sed).
- "Source ↗"/"Live ↗": `ProjectLinks` takes `name`, link gets `aria-label="Source: <project>"` (`SystemsPage.tsx`).
- Landmarks: `<nav aria-label={t.nav.primary}>` with new i18n key `nav.primary` (en "Primary", et "Peamenüü") in `translations.ts`; article `<aside>`s get `aria-label="Article navigation"` (page copy is English-only; the inner rail nav was already labelled).
- Verify: `npx tsc --noEmit` clean, `npm run build` passes.
- Note: `git checkout pub` was run once during the negative test and the build rerun afterwards; pub is regenerated.
