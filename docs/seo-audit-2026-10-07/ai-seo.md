# AI SEO / GEO audit — tomabel.ee (2026-10-07)

Scope: all 27 sitemap URLs, `/llms.txt`, `/robots.txt`, the Cloudflare Worker in `worker/`, and
`docs/agent-readiness-plan.md`. Live pages fetched with `firecrawl scrape`; headers and
`Accept: text/markdown` negotiation probed with plain `fetch` from the sandbox; prerendered
HTML inspected in `pub/`.

## Verdict

Agent *access* and *discovery* are done and done well. What is left is *parseability polish*
(the Markdown output is noisy and drops the H1) and *citation-worthiness* (no visible
dateline/author block, no answer-first summary, no `llms-full.txt`, Estonian content
invisible to crawlers). Score against the skill's agent-readiness checklist: Access 5/5,
Discovery 4/5, Parseability 3/5, Citability 2/5.

## What already passes (do not touch)

| Check | Evidence |
| --- | --- |
| Content in initial HTML | Every route prerendered; article pages carry 1.1k–5.6k words in `#root`, one `<h1>`, `<main>`/`<article>` landmarks. Build gate fails under 500 chars. |
| AI crawlers allowed | `robots.txt` names GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot with `Allow: /`. No edge bot blocking (plan says checked). |
| Content-Signal | `search=yes, ai-input=yes, ai-train=yes` in robots.txt and as a response header on every HTML and Markdown response. Values match (Worker constant mirrors robots). |
| Markdown negotiation | `Accept: text/markdown` → `200 text/markdown; charset=utf-8`, `Vary: Accept`, cached per URL. Fails open. |
| Link header | `Link: </sitemap.xml>; rel="sitemap", </llms.txt>; rel="describedby"` on every HTML response. |
| llms.txt | 999 words, H1 + blockquote summary, all 27 sitemap URLs with one-line descriptions, disclosure status per paper ("Reported to SK ID Solutions Nov 2025, RIA/TTJA/AKI Apr 2026"), contact section. Also exposed with `Cache-Control: max-age=600`. |
| Sitemap | 27 URLs, `lastmod` present. Only `/cookies/` is unlisted and it is a redirect, correct. |
| Entity schema | Home: `Person` (name, jobTitle, email, knowsAbout x8, worksFor, sameAs GitHub + LinkedIn), `Organization` ProksiAbel OÜ (registry code 17017826, address, phone), `WebSite` (inLanguage en+et). Every article: `ScholarlyArticle`/`BlogPosting` with headline, description, datePublished, dateModified, author Person, inLanguage, plus `BreadcrumbList`. All parse. |
| Canonicals | One self-canonical per route, build-gated. |
| Primary sources | Articles link out to the original research (10 external links on the BotGuard teardown), name prior authors, state method. This is the +40% "cite sources" GEO factor already in place. |

## Prioritized findings

### P1 — Markdown output is lossy and noisy (Worker, `worker/index.js`)

Observed on `/`, `/systems/`, `/disclosures/`, `/disclosures/botguard-disassembled/`:

1. **H1 dropped on `/` and the BotGuard article.** The Markdown starts at `## The defense is a
   CPU…`; the title survives only in the front-matter `title:`. `/systems/` and `/disclosures/`
   keep their H1, so this is content-dependent (likely the `<br>`/nested-span H1 markup that
   the hero and article heads use). An agent reading the Markdown sees a page with no title
   line.
2. **Chrome leaks in.** First body line is `[Skip to main content](#main-content)`, then the
   language switcher ("Eesti, Switch to Estonian"), the "Your connection" telemetry widget
   label, and the section eyebrow ("Research", "Systems") as bare text.
3. **JSON-LD leaks out.** The raw `<script type="application/ld+json">` bodies are emitted at
   the tail of every Markdown response (`"@context"` present in all four pages). That is
   ~1–2 KB of JSON an LLM has to skip past, and it duplicates the front matter.
4. **No dateline, author, or disclosure status in the Markdown body.** `datePublished` exists
   only in JSON-LD, which (3) turns into noise rather than a readable `Published: 11 Aug 2026`
   line.

Fix (one place, ~30 lines): in `toMarkdown()`, pre-process the HTML before `env.AI.toMarkdown`:
strip `<script>`, `<nav>`, `[data-md-skip]`/skip link, the language toggle and telemetry
widget; or pass only `<main>`'s innerHTML. Then prepend a deterministic header built from
the page's own JSON-LD: `# {headline}`, `*{author} · Published {datePublished} · Updated
{dateModified}*`, and the canonical URL. Verify with
`fetch(url, {headers:{Accept:'text/markdown'}})` that the first non-front-matter line is `# `.

### P1 — Articles have no answer-first block

The BotGuard page opens with a one-paragraph lede, then "Thesis" and "Method" paragraphs
(good), but there is no 40–60-word self-contained answer under the H1 for the question the
page actually ranks for ("what is BotGuard", "is Smart-ID secure", "can an AI agent use my
Smart-ID"). The "Thesis" label is a bare `<p>`, not a heading, so it is not an extractable
section boundary. Zero `<table>` on a 3.5k-word comparison-heavy teardown; the per-paper
"what's new vs prior work" list is exactly the kind of block that should be a table.

Fix per article (content, no code): a `## Summary` (or keep "Thesis" but make it an `<h2>`)
with 2–3 sentences that answer the title question standalone, followed by the existing
body. Convert "What's new vs prior work" and the Smart-ID attack-class comparisons into
tables. Headings already match query phrasing ("The token is portable", "The PIN that
cannot be delegated") — keep that.

### P1 — Estonian content is invisible to crawlers and agents

`<html lang="en">` on every shell, no `hreflang`, no Estonian URLs in the sitemap, no `et`
entries in `llms.txt`. Estonian is rendered client-side only (`main.tsx` re-renders when the
reader's language is `et`). For the queries where this site has unique authority — Smart-ID,
eIDAS, RIA/TTJA/AKI disclosure, "e-riigi Achilleuse kand" — Estonian-language AI answers
(Perplexity/ChatGPT in Estonian, Google AIO for `.ee` users) cannot retrieve the Estonian
text at all. `route-meta.ts` already holds 31 `et:` title/description sets, so the data exists.

Options, cheapest first: (a) add an Estonian `## Eesti keeles` section to `llms.txt` with the
Estonian titles/descriptions and the same URLs (10 min, no build change); (b) prerender
`/et/...` shells from the same `entry-server.tsx` with `lang="et"`, self-canonical,
`hreflang` pairs, sitemap entries, and `inLanguage: "et"` JSON-LD. (b) is the real fix; it is
a loop over the existing route list in `scripts/spa-routes.mjs`.

### P2 — No `llms-full.txt`

`/llms-full.txt` → 404. With 21 articles averaging ~2.7k words the full corpus is roughly
60k words, well inside what agents fetch in one request. Generate it in `postbuild` from the
same prerendered HTML the Worker converts (or by concatenating the `/verification/*.txt`
canonical plain-text copies, which already exist for 5+ articles and are signed). Link it
from `llms.txt` and the `Link` header (`rel="alternate"; type="text/markdown"`).

### P2 — Freshness and authorship not visible in HTML

- Dates render as text ("12 Jul 2026") but there is no `<time datetime>` element on any
  article (0 across all 27 pages). Add `<time>` around the existing dateline.
- No visible author byline/bio block on article pages; the author exists only in JSON-LD. A
  short `by Tom Kristian Abel — security researcher, Estonia` line with link to `/about/`
  satisfies the E-E-A-T "named author with credentials" signal.
- `dateModified` is `2026-10-04` on every article (a build-wide stamp), which makes the
  freshness signal meaningless. Set it from content changes (git log of the page source),
  not the build.

### P2 — Schema gaps

- Article JSON-LD has no `image`, `mainEntityOfPage`, `publisher`, `citation`, `about`, or
  `isBasedOn`. `citation`/`isBasedOn` (the Cypa/LuanRT repos, SK practice statements, eIDAS
  articles) is the structured counterpart of the external links already in the text and is
  cheap to add in `route-meta.ts`.
- `ScholarlyArticle` on 15 pages: valid Article subtype, but these are not peer-reviewed.
  `TechArticle` (teardowns) and `Article`/`BlogPosting` (essays) describe them more honestly
  and avoid a "scholarly" claim a grader may discount.
- `/systems/` has no `SoftwareSourceCode`/`SoftwareApplication` entries for fingerprintproxy,
  Proksimity, Specter, SteroidID; the prose names repo URLs that could be `codeRepository`.
- `Person.sameAs` has GitHub and LinkedIn only. Add ORCID (free), Google Scholar if any,
  Mastodon/X if used, and the company registry URL on `Organization`.
- One shared `og:image` for all 27 pages. Not an AI-citation blocker, but every third-party
  share (LinkedIn is the most-cited outlet for professional queries) shows the same card.
- No `FAQPage` anywhere. A single `/disclosures/smart-id-achilles-heel/` FAQ ("Is Smart-ID
  broken?", "Was SK notified?", "Does this affect Mobile-ID?") would be the highest-yield
  addition for ChatGPT/Perplexity extraction.

### P3 — Missing well-known files for a security-researcher entity

- `/.well-known/security.txt` → 404. For a site whose core content is coordinated disclosure
  this is an obvious entity-consistency signal (and `/disclosure/` already states the policy).
- No RSS/Atom feed (`/feed.xml`, `/rss.xml`, `/atom.xml` all 404). Perplexity and several
  monitoring tools pick up feeds; it is also how the `lastmod` story becomes machine-visible.
- `/AGENTS.md`, `/humans.txt`: optional; skip unless an agent-actionable surface is added.

### P3 — Third-party presence (outside the repo)

The site itself is now the best-structured source for its topics, but the skill's data says
brands are ~6.5x more often cited through third parties. Concrete, authentic moves: publish
the Smart-ID and PIN-delegation findings as LinkedIn *Articles* (not posts) with the target
phrase in the first words; get the disclosure cited on the RIA/CERT-EE or SK pages if they
publish advisories; mirror the BotGuard teardown summary in the `botguard-reverse` README
discussion or a GitHub issue thread; a Wikipedia citation on the Smart-ID article pointing
at the disclosure page is legitimate if the finding is reported in press.

## Agent-readiness plan: reconciliation

`docs/agent-readiness-plan.md` says Phase 0, 1a, 1b, 2 and 3 are implemented. Verified live:
all true. Its own "Skipped" list and verification steps are consistent with what is deployed.
Two notes: the plan's `curl` verification commands cannot be run from this environment (use
`fetch` from a sandbox); and the plan does not cover the Markdown *quality* items in P1
above, which are the natural "Phase 4".

## Checklist (skill's extractability table, per priority page)

| Check | `/` | `/disclosures/botguard-disassembled/` | `/systems/` | `/about/` |
| --- | :-: | :-: | :-: | :-: |
| Definition in first paragraph | yes | yes | yes | yes |
| Self-contained 40–60-word answer block | no | partial ("Thesis", unlabeled) | no | no |
| Statistics with sources | n/a | yes (linked) | partial | n/a |
| Comparison tables | n/a | no | no | n/a |
| FAQ section | no | no | no | no |
| Schema | Person/Org/WebSite | Article + Breadcrumb | none specific | none specific |
| Named author with credentials (visible) | yes | JSON-LD only | n/a | yes |
| Visible dateline (`<time>`) | n/a | text only | no | n/a |
| Headings match query phrasing | yes | yes | yes | partial |
| AI bots allowed | yes | yes | yes | yes |

## Suggested order

1. Worker Markdown cleanup (P1, ~1 h, `worker/index.js` only; redeploy with
   `npx wrangler deploy -c worker/wrangler.jsonc`).
2. `## Summary` block + `<time>` + visible byline on the 5 most-linked articles (Smart-ID,
   PIN delegation, BotGuard, Zero-Trust Octagon, PACT).
3. Estonian: `llms.txt` section now; `/et/` prerender as the next build task.
4. `llms-full.txt` + feed + `security.txt` in `postbuild`.
5. Schema: `citation`/`isBasedOn`, `TechArticle`, `SoftwareSourceCode`, per-page `og:image`,
   one `FAQPage`.
6. Monthly DIY check: 15 queries x ChatGPT/Perplexity/Google AIO, 3 runs each, log cited URL.
