# Fix log 03: CWV, worker, Cloudflare settings (README #4, #5, #6, #11, #13)

## Done in repo

### #6 mobile LCP
1. `tailwind.config.js`: `rise-in` keyframe no longer starts at `opacity: 0` (transform-only). LCP text is painted from first frame; removes the ~600 ms render delay.
2. `vite.config.ts`: new `headOrder` plugin (transformIndexHtml, post). Emitted order is now stylesheet, font preload, module script, modulepreloads (was module + 3 modulepreload, then stylesheet). `scripts/spa-routes.mjs` derives route shells from `pub/index.html`, so `pub/disclosures/index.html` etc. inherit it (verified).
3. Preload only the critical font: Geist latin variable woff2 (body text = the LCP paragraph). Newsreader/Commit Mono are not preloaded.
4. Fonts: removed Commit Mono 500 and 700 imports from `src/main.tsx` (500 and 700 were used in only 2 one-glyph badges via `font-mono font-bold`: `nav.tsx:31`, `SystemsPage.tsx:140`; 500 unused; bold is synthesised). Replaced fontsource's `400.css` with a woff2-only `@font-face` in `src/index.css`. All three `.woff` assets (172 KB incl. 500/700 woff2) are gone from `pub/assets`; Commit Mono now ships one 48 KB woff2 (fontaine fallback face still generated). Geist/Newsreader fontsource CSS was already woff2-only.
   - Not done: Newsreader `opsz` (132 KB latin) to `wght` (~60 KB) would drop the optical-size axis, a visible design change. Left for the owner.
5. Cache/compression are Cloudflare settings (below), not repo.

### #11 worker Markdown (`worker/index.js`)
- Before `env.AI.toMarkdown`, HTML goes through `HTMLRewriter`: removes `script` (incl. JSON-LD), `style`, `noscript`, `nav`, `footer`, and the `a[href="#main-content"]` skip link.
- H1 text is captured in the same pass; if the converted Markdown has no `# ` line, `# <h1>` is prepended (spans joined with a space so "living.Now" does not fuse).
- Fails open as before.

### #13 noindex
- Worker adds `X-Robots-Tag: noindex` for `/verification/<name>.txt` and `/sbom.json` (pattern `^/(verification/[^/]+\.txt|sbom\.json)$`), including the Markdown-Accept path. Note `.txt.asc` signatures are not matched (not full-text duplicates).
- Route check: `worker/wrangler.jsonc` route is `tomabel.ee/*`, which covers both paths. `/verification/*.txt` currently exists under `public/verification/`. `/sbom.json` was not found in `public/`; the rule is a no-op until it exists.

## Verification
- `npx tsc --noEmit` clean; `npm run build` OK (28 route shells); `node --check worker/index.js` OK.
- NOT verified: worker transform at runtime (wrangler/miniflare not installed, `env.AI` needs a real binding). HTMLRewriter selector behaviour and the H1 fallback are untested; test after deploy with `curl -H 'Accept: text/markdown' https://tomabel.ee/` and `curl -I https://tomabel.ee/verification/botguard-disassembled.txt`.
- NOT run: `wrangler deploy` (outward-facing). Deploy: `npx wrangler deploy -c worker/wrangler.jsonc`.
- Lighthouse not re-run (needs deploy).

## Cloudflare dashboard (not done; exact settings)

### #6 cache + brotli
- Speed > Optimization > Content Optimization > Brotli: On.
- Caching > Cache Rules > Create rule "Immutable assets": When incoming requests match, custom filter expression `(http.host eq "tomabel.ee" and starts_with(http.request.uri.path, "/assets/"))`. Then: Cache eligibility = Eligible for cache; Edge TTL = Ignore cache-control header, 1 year; Browser TTL = Override origin, 1 year (31536000 s). Filenames are content-hashed so this is safe. (The `immutable` directive itself cannot be set by a Cache Rule; add it with a Modify Response Header rule: Rules > Transform Rules > Modify Response Header, same expression, Set static `Cache-Control` = `public, max-age=31536000, immutable`, which also covers Browser TTL.)
- Do not apply to HTML.

### #4 CSP vs Web Analytics beacon (recommendation: allow the beacon)
- Why: free RUM is the only source of field CWV here, and there is zero repo change.
- Click path: Rules > Transform Rules > Response Header Transform Rules > edit the existing CSP rule. Change:
  - `script-src 'self'` to `script-src 'self' https://static.cloudflareinsights.com`
  - `connect-src 'self' https://proksimity.proksiabel.ee` to `connect-src 'self' https://proksimity.proksiabel.ee https://cloudflareinsights.com`
- Alternative (no RUM): Analytics & Logs > Web Analytics > tomabel.ee > Manage site > Disable automatic setup (or delete the site).
- Check after: DevTools console has no CSP error; Lighthouse BP 92 to 100. Note: if the beacon is injected inline, `script-src` also needs it to be a `src`, which it is (external `beacon.min.js`); no `unsafe-inline` required.

### #5 Email Address Obfuscation (recommendation: turn off)
- Click path: Scrape Shield > Email Address Obfuscation > Off. (Dashboard location may read Security > Settings, search "Email Address Obfuscation".)
- Why: it rewrites `mailto:` for non-JS crawlers and injects blocking `email-decode.min.js` on every page, which also needs `script-src 'self'` (it is same-origin `/cdn-cgi/`, so it works under the CSP). The address is already public in JSON-LD and the PGP section, so obfuscation protects nothing.
- Fallback if kept: add a Configuration Rule (Rules > Configuration Rules) with expression `(http.host eq "tomabel.ee")`, Email Obfuscation = Off; same effect as the toggle.
