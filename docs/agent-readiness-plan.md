# AI-agent readiness plan (Cloudflare "Improve your domain for AI agents")

Scanned 2026-10-04. Scanner: Cloudflare diagnostics / isitagentready.com.

**Status (2026-10-04): implemented.** Phase 0 prerender (`src/entry-server.tsx`,
`scripts/spa-routes.mjs`), 1a robots.txt, 1b + 2 in one Worker (`worker/`), and Phase 3
cleanup: `vercel.json` and `public/_headers` deleted, and `connect-src
https://proksimity.proksiabel.ee` added to the live Cloudflare CSP rule. The live CSP had been
blocking the telemetry widget. Edge bot settings were checked: there is no AI-bot blocking and
no managed robots.txt. The prerender renders twice: `prerender` resolves the lazy pages, then
`renderToString` emits markup without the inline Suspense swap scripts that the CSP would block.

## What the live site actually is

- **Origin is GitHub Pages** (`x-github-request-id`, `.github/workflows/static.yml`),
  proxied by Cloudflare (orange cloud, `ns.cloudflare.com`).
- So `public/_headers`, `public/_redirects` and `vercel.json` are **dead files**: the live
  headers come from Cloudflare rules in the dashboard, and they already disagree with
  `_headers`. For example, the live CSP has no `connect-src https://proksimity.proksiabel.ee`.
  Anything header-based (Link, Vary, markdown negotiation) has to be done in Cloudflare
  (Transform Rule or Worker), not in the repo.
- **Route HTML has no body content.** `/disclosures/botguard-disassembled/` serves 5 KB of
  meta tags and JSON-LD with an empty `<div id="root">`. Crawlers and agents that don't run
  JavaScript (GPTBot, ClaudeBot, PerplexityBot, most fetch tools) see titles and no articles.
  This is the root problem. Every checklist item below sits on top of it.
- `Accept: text/markdown` → `text/html`. There is no markdown negotiation.

## Scope decision

This is a static content site with no API, no login, no agent and no shop. The checks that
apply are **Level 1 plus Link headers**. The rest are skipped on purpose (see the end of this
file). Publishing empty OAuth, MCP or A2A manifests would advertise capabilities the site
doesn't have, which is noise and a credibility cost for a security researcher's site.

## Phase 0: put the content in the HTML (root fix, ~half a day)

1. Add `src/entry-server.tsx` that renders `<App />` under `StaticRouter location={path}`
   using `prerender` from `react-dom/static`. It waits for the `React.lazy` routes and their
   Suspense boundaries.
2. `vite build --ssr src/entry-server.tsx --outDir dist-ssr` (the directory is already
   gitignored and was tried once before), then in `scripts/spa-routes.mjs` inject the
   rendered markup into each shell's `<div id="root">`.
3. Keep `createRoot` in `main.tsx`, not `hydrateRoot`. The shells are English, but users may
   have `et` in localStorage, so hydration would mismatch. `createRoot` replaces the static
   markup with identical markup.
   (ponytail: re-render instead of hydrate. Switch to `hydrateRoot` with per-locale shells if
   LCP/INP regress.)
4. Guard browser-only code paths (`window`, `localStorage`, canvas, `matchMedia`) that run
   during render.
5. **Check:** `spa-routes.mjs` fails the build if any shell's `#root` holds less than ~500
   characters of text. This keeps a future regression from silently emptying the pages again.

Phase 0 also improves classic SEO and first-pass Googlebot (see `docs/seo-research-2026.md` §1).

## Phase 1: Level 1 quick wins

### 1a. Content Signals + AI crawler rules: `public/robots.txt` (10 min)

```
User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=yes
Allow: /
Disallow: /.well-known/openpgpkey/

# Named AI crawlers: explicit allow (a named group overrides `*`, so repeat the Disallow)
User-agent: GPTBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: ClaudeBot
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
Allow: /
Disallow: /.well-known/openpgpkey/

Sitemap: https://tomabel.ee/sitemap.xml
```

- **Decision for Tom: `ai-train`.** The default above is `yes`, because the site's goal is to
  be cited and known by models, and `ai-train=no` works against that. Flip it to `no` if
  training use isn't wanted. `search` and `ai-input` should stay `yes`.
- Also check in the dashboard (**AI Crawl Control → Bots**, plus the "Block AI bots" and
  "Managed robots.txt" settings) that Cloudflare isn't blocking or overriding these bots at
  the edge. robots.txt allowing a bot means nothing if a WAF rule returns 403 to it.

### 1b. Markdown negotiation: Worker (~1 h, after Phase 0)

Cloudflare's built-in "Markdown for Agents" toggle needs the **Pro plan** and only converts
the origin HTML. Today that HTML is an empty shell, so Phase 0 has to land first either way.

Recommended setup on the free plan: one Worker on route `tomabel.ee/*`:

- `Accept` doesn't include `text/markdown` → `return fetch(request)` (pass-through).
- Otherwise: fetch the origin HTML, then `env.AI.toMarkdown()` (Workers AI binding; HTML
  conversion is free). Respond with `Content-Type: text/markdown; charset=utf-8`,
  `Vary: Accept` and `Content-Signal` (same value as robots.txt), and store the result with
  the Cache API keyed by URL + `md`.
- Fail open: any error returns the HTML response.

If the zone is upgraded to Pro later, delete the Worker and turn on the toggle.

### 1c. Sitemap

Already passes. Keep it in sync with `route-meta.ts`. No work.

## Phase 2: Link headers (Level 2, 5 min, dashboard only)

Add a Response Header Transform Rule (in the same place the live CSP is set) on
`http.request.uri.path eq "/"` (or all HTML):

```
Link: </sitemap.xml>; rel="sitemap"; type="application/xml", </llms.txt>; rel="describedby"; type="text/plain"
```

If the Worker from 1b exists, it can set this instead. Pick one owner, not both.

## Phase 3: cleanup surfaced by the scan

- Delete `vercel.json` and `public/_headers` (dead and already drifted), or move their
  intent into a short `docs/` note describing the Cloudflare rules. `_redirects` is also
  ignored by GitHub Pages, but `LegacyDisclosureRedirect` in `App.tsx` covers it. Keep it
  or delete it, but don't trust it.
- Check whether anything in production calls `proksimity.proksiabel.ee`. The live CSP would
  block it.
- `CLAUDE.md` still describes the old Vercel radar-hero app. Fix the deploy section while
  doing this.

## Skipped (with reason, revisit when it becomes true)

| Check | Why skipped | Revisit when |
|---|---|---|
| API Catalog (RFC 9727) | no public API | an API ships on this domain |
| Auth.md, OAuth Discovery, OAuth Protected Resource | no login, no protected resources | never, for a static site |
| A2A Agent Card, Skills Index, MCP Server Card | no agent or MCP server to describe | a public MCP server exists (e.g. "query Tom's research") |
| WebMCP | experimental browser API, and read-only articles gain nothing over markdown negotiation | Chrome ships `navigator.modelContext` stable |
| Web Bot Auth | site runs no outbound bots | — |
| DNS-AID | no agents to publish | — |
| Commerce (ACP, AP2, MPP, UCP, x402) | nothing for sale | — |

## Order and verification

1. 1a robots.txt (independent, ship now)
2. Phase 0 prerender, then confirm with `curl -s https://tomabel.ee/disclosures/botguard-disassembled/ | grep -c BotGuard`
3. 1b Worker, then confirm `curl -sI -H 'Accept: text/markdown' https://tomabel.ee/` returns `content-type: text/markdown` and `vary: Accept`
4. Phase 2 Link rule, then confirm `curl -sI https://tomabel.ee/ | grep -i ^link`
5. Re-run the Cloudflare diagnostics. Expected result: Level 1 5/5, Level 2 1/3 (Link
   headers). The rest stay skipped on purpose.
