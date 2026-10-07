# Fix 05 — #2 Estonian invisible to crawlers

Status: **partial (honest-claim fix only); real fix = `docs/i18n-locale-urls-plan.md`, not executed.**

1. Root cause: language swap is client-side only; no `/et/` URLs, no hreflang, `lang="en"` in all HTML.
2. Change: `index.html` WebSite JSON-LD `inLanguage` `["en","et"]` → `"en"`, so markup no longer claims a translation crawlers cannot reach. Per-route JSON-LD already uses the page language (`route-meta.ts:312`).
3. Verification: `tsc` clean, `npm run build` passes, `check-links` passes.
4. Not done: `/et/` URLs, hreflang, worker redirects. The plan is a multi-PR change that includes a Cloudflare Worker deploy and a rollback switch; execute it as its own PR (Phase 1 first). Reverting `inLanguage` to include `et` is only correct after that ships.
