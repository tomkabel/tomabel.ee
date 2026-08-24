# tomabel.ee — Critique Remediation Plan (hand-off)

Date: 2026-08-24 · Source: external "10/10 redesign" critique · Author of plan: senior review

## 0. Ground truth (read before changing anything)

The critique was written against an older/stale build. Verified current state:

- Palette is ALREADY a layered dark-surface system (`background #0A0B0D`, `surface #111318`, `surface-2 #171A21`, accent `#34D399`, APCA-minded muted tokens) — see `tailwind.config.js`. Critique's "pure #000 + #00FF66 neon" claim is false today.
- Reader ALREADY has sticky rail + reading progress + IntersectionObserver TOC (`src/components/site/reader-rail.tsx`) and structured callouts/code blocks/protocol tables (`src/components/site/article.tsx`).
- PGP key ALREADY exists: `public/public-key.asc`, WKD in `public/.well-known/openpgpkey/`, keyId **0x30A8306F110AAAC5**, fingerprint **03D8E5A59306ECB7025A21090CA0C6F110AAAC500** (from `src/components/Disclosure.tsx`). The critique's "0x8F92A4" is FABRICATED — never use it.
- Site is fully bilingual EN/ET (`src/i18n/`, `LanguageContext`). Every new UI string needs both languages.
- `pub/` is the tracked build output; `pnpm build` runs `scripts/spa-routes.mjs` postbuild. `public/_headers` exists (CSP: `connect-src 'self'`, `script-src 'self'`).
- Constraints (AGENTS.md): no test framework, keep deps minimal (React, Tailwind, Lucide, router only), output `pub/`.
- Workflow (user preference): new branch + PR, never commit to main directly.

## 1. Verdict on critique items

| Critique claim | Verdict | Action |
|---|---|---|
| Fragmented IA (research/projects/writing overlap) | VALID | Merge /research+/writing → /disclosures; /projects → /systems (WP2) |
| Dark layered tokens, no neon | ALREADY DONE | Verify, no work |
| Reader rail, TOC, progress, callouts, 65ch | ALREADY DONE | Verify, no work |
| `[01]`/R-0X ticket codes | VALID (contradicts site's own convention) | Drop code column (WP3) |
| Polymorphic card (6 card types) | OVERSTATED (3 list-row variants) | Unify to 1 row component (WP3) |
| GPG proof on articles | VALID | Honest version: WebCrypto SHA-256 + .asc, no new deps (WP4) |
| Live JA4/TLS telemetry drawer | VALID (real backend) | Server-side JA4/TLS from Tom's own collector: `GET https://proksimity.proksiabel.ee/connection.json` → `{live, ja4, tls:{version, alpn, negotiated, ciphers[]}, geo}`. Verified live 2026-08-24. Opt-in drawer (WP5) |
| "Hardware Enclave Verified", "VPN anomaly", "Passkey Ready" drawer rows | REJECT | Not provided by connection.json; fabricated claims stay out |
| Severity badges (CRITICAL 9.2) on cards | REJECT | No CVE/CVSS exists for these findings; fabricated severity is a legal/ethical hazard for disclosed research. Neutral type labels only (already the case) |
| Fonts → Geist/Commit Mono/Newsreader | DO | User approved. Swap sans→Geist, mono→Commit Mono, add Newsreader serif for pull quotes; keep fontaine + font-display:swap for CLS (WP6) |
| Mermaid sequence diagrams | DEFER | `ProtocolTable` + `CodeBlock` cover it; add only when a specific article needs a diagram |
| 1360px grid, fluid clamps | OPTIONAL | Skip; current max-w-6xl is consistent |
| Mouse-following specular border | OPTIONAL | CSS hover states already exist; skip JS version |
| "14 papers", "45% progress", "0x8F92A4" mockup details | FABRICATED | Use real counts (8 pieces), real key, real progress (already exists) |
| /advisory page | PARTIAL | Keep /about; add PGP + engagement blurb there (WP1.3). New route not worth the churn |

## 2. Work packages

### WP0 — Setup
```
git checkout main && git pull
git checkout -b design/critique-remediation
git status   # tree is dirty (pub/ churn from last build) — leave unrelated pub/ churn alone until final build
```

### WP1 — Honesty fixes (small, do first)
1. `src/content/site.ts`: delete unused `contact.rss` field (`/writing.xml` doesn't exist; grep confirms zero usages). Real RSS feed = deferred follow-up, do not build.
2. `src/i18n/translations.ts`: audit for dead legacy keys (`nav.links.capabilities/contact`, `radarHero`, `cta.form`, `showcase`, unused `research` block). Grep each key's usage in `src/`; delete unused blocks. Keep `disclosure.*` (used by legal page).
3. PGP block: `src/components/Disclosure.tsx` currently hosts the PGP key card on the legal /disclosure page. Extract the PGP block (keyId, fingerprint, sha256, `/public-key.asc` link) into a small reusable `PgpCard` component and render it in `src/pages/AboutPage.tsx` (add to the "Find me" section) AND keep it on /disclosure. Nav/footer PGP links already exist.

### WP2 — IA consolidation (the real redesign)
1. **Data model** (`src/content/site.ts`): merge `researchEntries` + `essays` into one exported `disclosures` array. Each item: `{ kind: 'disclosure' | 'teardown' | 'essay' | 'framework', title, blurb, meta, href, keywords? }`. Keep `projects` as-is (categories already exist).
2. **Index page**: new `src/pages/DisclosuresPage.tsx` — reuses `SectionHeader` + the unified row (WP3); client-side filter tabs `All / Disclosures / Teardowns / Essays / Frameworks` (en: `All / Avalikustatud / Analüüsid / Esseed / Raamistikud`). Delete `ResearchPage.tsx` and `WritingPage.tsx`.
3. **Systems page**: rename `ProjectsPage.tsx` → `SystemsPage.tsx` with filter tabs by `ProjectCategory` (All / Offensive / Products / AI & Retrieval / Systems / Frameworks / Foundations). Rename route only; data unchanged.
4. **Routing** (`src/App.tsx`):
   - New: `/disclosures`, `/disclosures/:slug` (slugs unchanged, e.g. `/disclosures/botguard-disassembled`), `/systems`.
   - Old: `/research`, `/research/*`, `/writing`, `/writing/*`, `/projects` → render `<Navigate to={newPath} replace />` (SPA deep links) AND add 301s in `public/_headers`:
     ```
     /research/*  301! /disclosures/:splat
     /writing/*   301! /disclosures/:splat
     /projects    301! /systems
     ```
     (Check Cloudflare Pages `_headers` 301 syntax; if unsupported there, rely on router-level redirect + `pub/_redirects` — verify what the host uses. `scripts/spa-routes.mjs` must still generate shells for old paths if redirects are client-side only.)
   - Article page components: unchanged files, just registered under new parent paths.
5. **Nav** (`src/components/site/nav.tsx`): links become `Disclosures` (en/`Avalikustatud`) → `/disclosures`, `Systems` (`Süsteemid`) → `/systems`, `About` → `/about`. Update `links` array + mobile menu (already same array).
6. **Cross-references**: update `src/components/site/cross-nav.tsx` usages (new targets), `src/pages/HomePage.tsx` (hero CTAs `/disclosures`, `/systems`; essays section header + row reuse per WP3), `src/content/site.ts` `featuredWork[].href` (→ `/disclosures/...` or `/systems`).
7. **SEO artifacts**: regenerate `public/sitemap.xml` with canonical new URLs (keep old ones out; they 301), update `public/llms.txt`, check `public/robots.txt`.

### WP3 — Unified row component
1. `src/components/site/entry-row.tsx`: drop the `code` (R-0X) column; add optional right-aligned meta slot + footer row (tags left, CTA arrow right; `↗` when href is external). Props: `{ title, blurb?, type, meta?, tags?, href, external? }` with en/et objects as today.
2. Reuse it in `DisclosuresPage`, `SystemsPage`, and `HomePage` (delete `HomeEssayRowContent`, the essay list uses the row). Keep `WorkCard` for the two homepage featured cards (it's the card variant — 2 components total, deliberate).

### WP4 — Honest cryptographic proof block (no new deps)
1. New `src/components/site/article-proof.tsx`: props `{ slug, expectedSha256 }`. On mount: `fetch('/verification/<slug>.txt')` → `crypto.subtle.digest('SHA-256', ...)` → show hex + `MATCH ✓` / `MISMATCH ✗` (green/red). Footer line: link to `/public-key.asc`, fingerprint short form, and gpg verify instructions (`gpg --verify <slug>.txt.asc <slug>.txt`). CSP `connect-src 'self'` already permits the fetch; `script-src 'self'` permits WebCrypto.
2. Scaffold `public/verification/README.md` + placeholder `<slug>.txt` copies. **Scope: the three articles that carry an `ArticleProof` call — `botguard-disassembled`, `smart-id-achilles-heel`, `zero-trust-octagon`.** These three pairs (`.txt` + detached `.asc`) exist and ship; the remaining five articles do NOT get a proof block until their canonical text is finalized and signed (add the `.txt`, hash, and `<ArticleProof>` call per article at that time — do not scaffold empty proofs for them). **Tom must run `gpg --detach-sign --armor public/verification/<slug>.txt`** to create the `.asc` files — the agent does NOT sign; put this in the PR description as a required manual step before deploy.
3. Expected hashes: agent computes `sha256sum` of each `.txt` once Tom's copies are final and fills them into the component props. Until Tom signs, ship the block with hashes of the placeholder files and mark "pending signature" in the PR.
4. Do NOT build in-browser GPG signature verification (openpgp.js) — deferred; CLI path is honest and dependency-free.

### WP5 — Live telemetry drawer (real backend: proksimity.proksiabel.ee)
Backend already verified live:
```
curl https://proksimity.proksiabel.ee/connection.json
→ {"live":true,"ja4":"tls12_30_13_282abf249f80",
   "tls":{"version":"TLS 1.3","alpn":"h2","negotiated":"TLS_CHACHA20_POLY1305_SHA256","ciphers":[...]},
   "geo":{"city":"Tallinn (Põhja-Tallinna linnaosa)","country":"Estonia","cc":"EE","isp":"AS3249 Telia Eesti AS"}, ...}
```
(Reference implementation: `~/Documents/proksimity/site/connection.html` fetches `<origin>/connection.json`.)

1. **Prereq (Tom, one-time)**: confirm the collector sends `Access-Control-Allow-Origin: https://tomabel.ee` for `/connection.json` (Tom controls both origins; if CORS is refused, fall back to a same-origin Cloudflare Worker proxy on tomabel.ee — document whichever is chosen in the PR).
2. **CSP**: `public/_headers` — add `https://proksimity.proksiabel.ee` to `connect-src` (currently `'self'` only).
3. **Drawer component** `src/components/site/telemetry.tsx` (new, small): slide-over panel; on open, `fetch('https://proksimity.proksiabel.ee/connection.json')`; render ONLY real fields: JA4, TLS version, ALPN, negotiated cipher, geo (city/cc/ISP). States: loading / live / unavailable (show nothing but the title + "collector unreachable" in muted text — no fake values, ever).
4. **Nav trigger**: `src/components/site/nav.tsx` — add a subtle icon button (e.g. `Radio`/`Activity` from lucide-react, already a dep) with aria-label, opens the drawer. No status dot.
5. **i18n**: `src/i18n/translations.ts` — EN/ET keys for drawer title, field labels (JA4, TLS version, ALPN, Negotiated cipher, Geo), close, and the unreachable state. Footer microcopy: "Passively read from your TLS handshake by Proksimity (ProksiAbel OÜ). No payloads, no personal data stored." — mirrors the site's own privacy stance; opt-in only (panel is closed by default).
6. **Privacy note**: the drawer makes a third-party request per open; it is opt-in, disclosed in the footer line, and hits Tom's own infrastructure. Do not auto-fire it on page load.

### WP6 — Font swap (Geist / Commit Mono / Newsreader) + polish
1. **Deps**: `pnpm add @fontsource-variable/geist-sans @fontsource-variable/newsreader`. Try `@fontsource-variable/commit-mono`; if that package doesn't exist (Commit Mono is newer), self-host the woff2 from the mgtv/CommitMono GitHub release (OFL) into `public/fonts/` with `@font-face` in `src/index.css`. Keep JetBrains Mono as fallback in the mono stack.
2. **`src/main.tsx`**: swap font imports — `@fontsource-variable/inter` → `@fontsource-variable/geist-sans`, `@fontsource-variable/jetbrains-mono` → commit-mono (per step 1); keep `space-grotesk` (display stack unchanged — critique specified no display font).
3. **`tailwind.config.js`** `fontFamily`: `sans` → `['"Geist Variable"', 'Inter', ...fallbacks]`, `mono` → `['"Commit Mono"', '"JetBrains Mono Variable"', 'monospace']`, add `serif` → `['"Newsreader Variable"', 'Charter', 'Georgia', 'serif']`.
4. **Apply serif**: `src/components/site/article.tsx` PullQuote blockquote + `src/pages/HomePage.tsx` intro blockquote get `font-serif` (one class each; quotes only — body stays sans).
5. **CLS**: keep `fontaine` fallback metrics (already in devDeps/vite config); after build, grep `pub/` CSS for `font-display: swap` and confirm no layout shift from the swap (document in PR).
6. **APCA spot-check** (unchanged from before): existing tokens against targets (body Lc≥75, headings ≥60, metadata ≥45); adjust only failing tokens in `tailwind.config.js` via a quick node script — no new deps.
7. Do NOT: rename to /advisory, add status dot, add Mermaid, widen container.

### WP7 — Verification (mandatory, in order)
```
pnpm lint
npx tsc --noEmit
pnpm build          # regenerates pub/ + spa route shells
pnpm preview        # or pnpm dev
```
Manual checks:
- Every nav link renders; `/disclosures` and `/systems` filter tabs work in both EN and ET.
- Old URLs (`/research/botguard-disassembled`, `/writing/the-kratt-problem`, `/projects`) land on the new pages (client redirect at minimum; server 301 if `_headers`/`_redirects` supports it).
- One article page: proof block shows MATCH against its `.txt`.
- `public/sitemap.xml` + `llms.txt` reference only live canonical URLs.
- Homepage, about, footer, cross-nav links all point to live routes (grep for `/research`, `/writing`, `/projects` leftovers).
- Telemetry drawer (dev + preview): opens, fetches `connection.json`, shows real JA4/TLS/geo; shows the "collector unreachable" state when the endpoint is blocked; no fetch fires on page load.
- Fonts: computed styles show Geist Variable on body, Commit Mono on mono elements, Newsreader on pull quotes; `pub/` CSS contains `font-display: swap`.

### WP8 — Commit + PR
Logical commits (WP1, WP2, WP3, WP4, WP5, WP6+SEO separately), then push `design/critique-remediation`, open PR. In the PR description: call out the rejected critique items with one-line reasons, list the PGP `.asc` signing as the required manual deploy step, and note that `pub/` churn is the normal build output (repo convention per recent commits).

## 3. Explicit do-not-build list
- Fake telemetry rows ("Hardware Enclave Verified", "VPN anomaly", "Passkey Ready") — connection.json doesn't provide them; fabricated claims stay out
- Client-side JA4 calculation or any client-side attestation claims (the site's own essay argues against them) — the drawer must source everything from proksimity.proksiabel.ee
- Severity/CVSS badges without a real CVE
- The critique's fake key id `0x8F92A4` / "14 papers" / "45%" mockup values
- Mermaid.js, mouse-following gradient borders, 1360px grid, /advisory route
- openpgp.js in-browser signature verification (deferred)
