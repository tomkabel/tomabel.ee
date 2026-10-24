# 12 · AI visibility: audit of the machine-facing layer, with fix list

Phase 8, deliverable 2 of 2. An `ai-seo` audit of everything a machine reads about Tom Kristian
Abel, with file-level findings and a prioritised fix list. **No code was changed.** Every fix below
is described, not applied.

Companion file: `11-measurement.md` (the framework that measures what this file fixes).

Citations: `[S-nn]` into the source register, `file:line` for repo evidence, or `[unverified - needs
Tom]`. Live probes were run on **2026-10-24** and the exact commands are in §7 so any reader can
reproduce them.

---

## 1 · What was audited

| Surface | Path | Read how |
|---|---|---|
| Homepage entity graph | `index.html:28-81` | file, plus the live page's `application/ld+json` |
| Route-level structured data and head metadata | `src/content/route-meta.ts` | file |
| Client-side head updates | `src/components/Seo.tsx` | file |
| Static shell generation, sitemap, 404, canonical gate | `scripts/spa-routes.mjs` | file |
| Agent context file | `public/llms.txt` | file, plus the live URL |
| Edge layer, content negotiation, headers, caching | `worker/index.js`, `worker/wrangler.jsonc` | file, plus live header and body probes |
| Crawler policy | `public/robots.txt` | file |
| Integrity proof layer | `public/verification/`, `src/components/site/article-proof.tsx` | files, plus live behaviour |
| What a machine currently says | the AI-answer baseline `[S-21]` and three new captures (2026-10-24) | the `google_ai_search` MCP tool |

**Method note.** The machine-facing layer has two halves: what a crawler reads in the HTML and what
an assistant gets when it asks for Markdown. Both were probed live rather than inferred from source,
and the two probes disagreed, which produced finding P0-1.

**Repo state and live state are audited separately, and on 2026-10-24 they differ.** Repo findings
are against the working tree at commit `ba41bad` (2026-10-24 16:59), in which phase 9 landed the
Cyber-Kratt definition and the ORCID. Live findings are against what `tomabel.ee` actually served,
re-probed at 2026-10-24 17:05. Phase 9 edits are in the tree and **not** on the live site, which is
itself the finding recorded as P0-1. Every claim below says which of the two it is about. Sibling
deliverables `13-surface-kit.md` (LinkedIn, GitHub profile, bios, disclosure-ledger spec) and
`10-personal-brand-book.md` are treated as given, and are cross-referenced rather than duplicated.

**One thing that is already right, checked rather than assumed.** The per-route JSON-LD is written
into the static shell by the build (`scripts/spa-routes.mjs:92-98`) and re-injected on the client by
`src/components/Seo.tsx:44-52`, which is the classic recipe for a duplicated article graph in the
head. It is not duplicated: the shell's block carries `id="seo-jsonld"` and the client removes that
element before appending. A live article page returns exactly two `application/ld+json` blocks, the
base Person/Organization/WebSite graph and the per-route ScholarlyArticle/BreadcrumbList graph. No
action needed there.

**Why this audit looks inward rather than at outreach.** The tool that returns the AI answers exposes
its sources, and in every 2026-10-24 capture most of them were the target's own domain: his site,
his LinkedIn, and the registry. At this size the machine is largely paraphrasing what he publishes,
which makes his own surfaces the controllable variable, and is the reason every finding below is a
file.

---

## 2 · Verdict

| Dimension | Score | Evidence |
|---|---|---|
| **Access** (can AI crawlers reach the content) | 5/5 | `robots.txt` names GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended and CCBot, each with `Allow: /`, and repeats `Content-Signal: search=yes, ai-input=yes, ai-train=yes`. The live homepage returns `content-signal` on the response as well, and no bot is blocked at the edge. |
| **Discovery** (can a machine find the pages) | 4/5 | Live `Link` header advertises sitemap and llms.txt; 27 sitemap URLs; `llms.txt` covers 27 of the 28 routes (all but the `/cookies` redirect, correctly). Deducted for `llms.txt` being hand-maintained with no drift gate (P1-4) and for the Estonian half being unreachable (P1-6). |
| **Parseability** (what does it actually receive) | 3/5 | Prerendered HTML is genuinely good: every route ships with its own title, description, canonical and body text, gated at build time (`scripts/spa-routes.mjs:39-61`). But the live Markdown path, which is what an LLM-oriented agent typically asks for, returns page chrome, no title line, and 1 to 2 KB of raw JSON-LD at the tail (P0-1, P2-8). |
| **Citability** | 2/5 | Bodies name prior authors and link primary sources, which is the strongest single factor. Against that: no readable dateline in the Markdown, two contradictory update dates on the same page (P1-5), one shared image for all 19 articles, and no `citation`, `sameAs` or `identifier` links to the prior art or the signed canonical copies (P1-7). |
| **Entity accuracy** | 2/5 | Three runs, three different self-descriptions; the company the graph asserts carries a published registry deletion notice (P0-2); the ORCID is in the repo graph as of `ba41bad` but absent from the live `Person.sameAs` (P0-3). |

The shape of the result matches the phase 2 audit's conclusion, seen from the machine side: the
plumbing is the best work on the site, and the entity it describes is the least settled part of it.

---

## 3 · What an AI assistant currently gets right

All evidence is the verbatim baseline `[S-21]` (run 2), re-verified on 2026-10-24 (run 3, Appendix A
of `11-measurement.md`).

1. **It cites him, and his own site does the heavy lifting.** tomabel.ee was cited 6 times in run 2
   and remains a primary source in run 3. The baseline's own conclusion holds: the arc framing in the
   answer came from his own surfaces, not from press `[S-21]`.
2. **The work summary is accurate and stable.** The five named items (Smart-ID/eID coordinated
   disclosure to SK ID Solutions and RIA, BotGuard teardown, `fingerprintproxy`, Zero-Trust Octagon,
   Kompass) survive all three runs.
3. **The disclosure record propagates at the right level of detail.** The answer states the Smart-ID
   disclosure and its recipient, and Q2 on 2026-10-24 returned the full record: reported to SK ID
   Solutions in November 2025, then to RIA, TTJA and AKI in April 2026, with SK's rebuttal noted.
   That text comes from `/disclosures/smart-id-achilles-heel/` and from `llms.txt`, which carries a
   per-page disclosure status.
4. **The case is a section, not the lead.** Better than the 2024 press pattern `[S-12]`.
5. **Neither the case nor the labels stop the work from being cited.** Q2 (a topic query, no name in
   it) attributed the research to him with seven citations, all pointing at his own page. When the
   topic is his own niche, he is the source.

---

## 4 · What it gets wrong, cannot know, or amplifies incorrectly

| # | Problem | Evidence | Why it happens |
|---|---|---|---|
| 1 | **Five different self-descriptions** in circulation | `[S-05]`: site meta "Security Researcher & Systems Architect", About "CTO at MATx", LinkedIn "Founding Engineer \| Cyber-Kratt \| Ex-Black Hat", GitHub bio "Authentication security researcher". Machine: "researcher, systems architect, and entrepreneur" run 2, "systems architect, cybersecurity consultant, and authentication security researcher" run 3, "principal engineer" then "sole board member" | No surface states one role, so the model averages them and adds its own ("entrepreneur", "consultant") |
| 2 | **Four uncorroborated claims are stated as fact** | `[S-21]`: "principal engineer", "operates via design partnerships", "65 browser profiles", the TalTech micro-degree, each sourced only to his own surfaces | The site asserts them and nobody contradicts them; run 3 restated the entity claim as "founder and sole board member" |
| 3 | **The legal paragraph is downstream of one article** | `[S-21]`: Postimees 8138866 supplies the entire section, including the "according to judicial records" characterisation, which the article does not support | No competing source exists, so nothing corrects it |
| 4 | **The entity claim is contradicted by the registry** | `[S-26]`: registry code 17017826 carries a published deletion notice, VAT expired, zero revenue FY2024 and FY2025, EMTAK 69201 "Auditing". Machine run 3: "a professional cybersecurity and consulting firm registered in June 2024" | The graph and About assert a live employer; the registry says otherwise. Decision G-4 rests on prerequisite P-1, which has failed |
| 5 | **The labels owned copy forbids are volunteered anyway** | all three runs use "black hat"; run 3 attributes it to him as "self-described" | It is inferring from press `[S-12]` rather than quoting a forbidden phrase from his site, so the risk gate cannot fix this by editing owned copy |
| 6 | **The fault-line idea never appears** | absent from runs 1, 2 and 3; it exists on one page of the site `[S-05]` | It is a pull-quote, not a sentence in a heading, a description, or the graph |
| 7 | **The strongest trust asset is invisible** | absent from all three runs: the signed, hash-verifiable article copies `[S-01]`, 7 of 19 pages | The proof is client-side JavaScript. The prerendered HTML shows only a widget label ("Integrity · SHA-256 Verifying…") with no explanation, and the canonical text files are not linked from the structured data (P1-7) |
| 8 | **The disclosure ledger does not exist yet** | decision G-5 owes it | Per-page status exists in `llms.txt`; the aggregated record (finding, recipient, date, outcome) does not, so no machine can cite the pattern, only the instances |
| 9 | **`Cyber-Kratt` is defined for the machine by LinkedIn alone** | Q3, 2026-10-24: "a moniker and corporate umbrella linked directly to Tom Kristian Abel", sourced to LinkedIn; also "serves as a founding engineer under the Cyber-Kratt professional classification" (garbled) and "well-known within the small Estonian digital ecosystem" (uncorroborated) | `[S-28]`: no third-party definition exists. `decisions.md` G-3 keeps the label and owes a definition (P-4, phase 5). Phase 9 wrote the definition on About (`src/content/site.ts:713-715`); it is not live, not in `llms.txt`, and the LinkedIn string is still the one quoted |
| 10 | **No image of a person anywhere** | `index.html:39,55`: every node's `image` is `og-image.png`, dated 2026-08-10, which predates the October token rework (audit D2 `[S-05]`). No portrait exists in `src/` or `public/`; the only public photo is outside his control `[S-32]` | For an individual brand, the entity graph has nothing visual to point at except a text card |

**One reading that matters for expectations.** Citation is not recommendation. Today he is cited but
rarely chosen: the peer response, the talk programme and the third-party write-up are all still at
zero `[S-29]` `[S-13]` `[S-14]`. Fixing the items below raises the accuracy of what machines say;
it does not by itself put him on anyone's shortlist.

---

## 5 · Findings and fixes, prioritised

Ordered by (effect on what an assistant says) divided by (cost in hours). Nothing here is applied.

### P0-1 · The live worker is not the worker in the repository

**Verified.** `Accept: text/markdown` was sent to two article URLs, cache-busted with a unique query
string so no stale cache entry could explain the result. Both responses:

- start with `[Skip to main content](#main-content)` and then the section kicker (`Thesis`), i.e. the
  chrome the current code is written to strip,
- contain no `#` title line,
- end with both raw `application/ld+json` bodies, including the homepage Person / Organization /
  WebSite graph and the per-route `ScholarlyArticle` / `BlogPosting` graph, roughly 1 to 2 KB of JSON.

The live `worker/index.js` at HEAD does the opposite: `cleanHtml()` removes
`script, style, noscript, nav, footer` and the skip link, captures the `h1`, and prepends it when the
conversion drops it (`worker/index.js:40-56,58-74`). Two further probes isolate the revision:

- `x-markdown-tokens` is present on the live Markdown response. That header predates commit
  `f84a07d` (it was introduced in `0b63eb0`), so it does not prove the current file is deployed.
- `/verification/botguard-disassembled.txt` and `/sbom.json` both return `200` with **no
  `X-Robots-Tag`**. That header is set only by the `NOINDEX` branch added in `f84a07d`
  (`worker/index.js:28-35`).

Conclusion: the live edge layer behaves as the pre-`f84a07d` revision. Deployment is manual, which
is how this persists: `worker/wrangler.jsonc` carries the instruction
`// Deploy: npx wrangler deploy -c worker/wrangler.jsonc`, and `.github/workflows/static.yml` has no
step that touches the worker. A repo-side fix to `worker/index.js` is not a live fix.

**Three consequences for AI systems, and one of them is not about Markdown at all.**

1. The Markdown an agent receives is noisier and less citable than the repository believes it is
   (no title, no dateline, chrome, JSON to skip).
2. The seven canonical plain-text article copies and the CycloneDX SBOM are currently crawler-visible
   with no `noindex` instruction, as duplicate bodies of pages that are already in the sitemap. The
   fix exists in the repo and is not deployed.
3. The gap is not limited to the worker. Two other phase-9 and phase-8 changes are in the tree and
   not live, verified by re-probe at 17:05 on the same day:
   - `Person.sameAs` still returns two URLs live; the repo file has three, with the ORCID
     (`index.html:46`, added in `ba41bad`).
   - The live `/about/` still carries the old folklore-only kratt block; the definition now in
     `src/content/site.ts:713-715` ("not a company, not a product, and not a job title") is not being
     served.

So the correct operational conclusion is not "the repository needs fixing" but **"the repository is
ahead of the site, and the deploy step is where this phase's machine-visible work is currently
being lost"**. Anyone measuring AI visibility from the repo rather than from the live URL will
measure a future that has not shipped.

**Fix.** Deploy `npx wrangler deploy -c worker/wrangler.jsonc` for the edge layer, and publish the
current build for the static layer, then re-run the §7 probes and record the output. Add one line to
the deploy notes: a change to `worker/index.js` requires a manual deploy, and its verification is the
`X-Robots-Tag` probe on `/sbom.json`, which returns nothing today.

### P0-2 · The Organization node asserts an entity the registry contradicts

**Verified in `index.html:49-68`.** The node is `ProksiAbel OÜ` with `legalName`, `email`,
a masked `telephone`, a street address in Sindi, registry identifier 17017826, `url: https://tomabel.ee/`
and `sameAs: ["https://github.com/tomkabel"]`. Three things are wrong independently of the registry:

| Field | Value today | Wrong because |
|---|---|---|
| `url` | `https://tomabel.ee/` (the personal site) | The company's own domain is `proksiabel.ee`, which the AI answer cites `[S-21]` |
| `sameAs` | the personal GitHub account | The company has its own organization account `[S-18]` (`github.com/Proxyabel`), and pointing the company at the person's account conflates the two entities the audit found conflated everywhere else `[S-26]` |
| entity liveness | asserted as publisher of every article (`src/content/route-meta.ts:300`) and as `worksFor` for the Person | `[S-26]`: the registry view for 17017826 carries a published deletion notice, VAT expired 2026-01-02, zero revenue in both filed years, EMTAK 69201 "Auditing" |

Decision G-4 kept the company as publisher and employer, and attached prerequisite P-1 (confirm the
registry status and either stabilise it or revisit G-4). P-1 has failed. The structured data, the
About page, the `publisher` node on all 19 articles and the `disclaimer` sentence in `src/content/site.ts`
all rest on it.

**Fix.** This is a decision before it is an edit, and it is Tom's:

- If the company stays: point `url` at `https://proksiabel.ee`, point `sameAs` at the company org
  and the public registry entry, fix the EMTAK mismatch with the copy (the site presents consultancy
  and research; the register says Auditing), and keep the person as the publisher of record for
  anything he wrote personally.
- If the company goes: remove `worksFor`, move `publisher` to the Person node, and let the person be
  the only entity in the graph, which is what the master-brand decision already says.

Either way, do not leave the current state live: an entity assertion that a registry lookup
contradicts is the cheapest thing for a hostile reader to check.

### P0-3 · The Person node cannot be reconciled with the scholarly record

**Two states, both verified on 2026-10-24.**

*In the repo (fixed, not shipped).* `index.html:46` now lists three `sameAs` URLs, GitHub, LinkedIn
and `https://orcid.org/0009-0009-9881-1293`, added in `ba41bad`. This closes the markup half of the
finding.

*Live (still open).* `https://tomabel.ee/` returns exactly two `sameAs` values for the Person node,
GitHub and LinkedIn, re-probed at 17:05 on 2026-10-24. The live Organization node likewise returns
one. So the ORCID is not in the entity graph that an assistant reads today; it is in the graph that
will be read after the next deploy (P0-1).

*Unchanged, in both states.* An ORCID exists, `0009-0009-9881-1293`, created December 2025, with
**zero works and zero affiliations** `[S-20]`. `public/llms.txt` has no ORCID in its contact block,
and a grep for `orcid` across `scripts/`, `public/` and `worker/` still returns nothing, so the
machine-facing context file does not mention the identifier at all.

Also absent from the node: `alumniOf`, `award`, `knowsLanguage`, `nationality`, and any `identifier`
beyond the email. `image` is `og-image.png`.

**Why it matters more than it looks.** In all three runs, the Education and Honors sections were
sourced from LinkedIn, not from the site `[S-21]`. The site does not assert its own education or
awards in structured data, so the model reads the profile it can parse. The scholarly identifier
that would let an academic or an answer engine treat the work as citable research exists and is
invisible.

**Fix (small, additive).**

1. ~~Add the ORCID to `Person.sameAs`~~ Done in `ba41bad`, and not live. **Publish it** (P0-1), then
   add the same identifier to the contact block in `public/llms.txt`, which currently lists only
   GitHub, LinkedIn and email, and which no machine reads as an identity claim today.
2. Add the ORCID as a `sameAs` value on the inline author stub that `jsonLdFor()` emits per article
   (`src/content/route-meta.ts:299`), so article-level identity resolves to the same node. This is
   still open: the homepage node carries the ORCID and the 19 article nodes do not.
3. Add `alumniOf` and `award` nodes only for entries that pass gate 3 (verifiability). The TalTech
   micro-degree is `needs-proof` `[S-21]`; the three 2026 hackathon awards are already cited by press
   `[S-12]` and by the AI answer, so they qualify.
4. The zero-works half of this finding is work, not markup: an ORCID with nothing behind it is a
   weaker signal than no ORCID, and it stays that way until a manuscript or a talk proceedings entry
   is registered to it. Decision G-1 holds the SoK manuscript pending the filing decision, so this is
   sequenced after that, not before.

### P1-4 · `llms.txt` can drift from `route-meta.ts`, and already has

**Verified.** `public/llms.txt` is hand-written: 39 lines, 27 site URLs, one bullet per research
page. Nothing generates it and nothing checks it. A grep for `llms` across `scripts/`,
`.github/`, `worker/` and `package.json` returns exactly one hit, the worker's `Link` header
(`worker/index.js:15`). The live file is byte-identical to the repo file with
`last-modified: Wed, 07 Oct 2026 23:56:31 GMT`, while `src/content/route-meta.ts` and article copy
changed on 2026-10-24 (commits `51c74cf`, `01a7a5f`).

Concrete drift already present, two examples. First, `llms.txt` line 30 tells every assistant that
`fingerprintproxy` has "65+ browser profiles". The same figure is repeated in
`src/content/site.ts:105,106,501,502`, and `decisions.md` G-6 records the correct number as 72,
describing "65+" as understated. The baseline AI answer reproduced it as fact `[S-21]`. This is not a
false claim, it is a stale one, and it is stale in the one file whose purpose is to be read by
machines.

Second, and newer: phase 9 published the Cyber-Kratt definition on the About surface
(`src/content/site.ts:713-715`, both languages), while `llms.txt` still describes that page as
"Bio, philosophy, and the kratt metaphor". The file written for machines does not mention that the
label now has an owned definition, so the one place an assistant looks for site structure points at
the old content. The definition will reach machines through the About page itself once published;
the context file above it stays stale until someone edits it by hand, which is the whole problem.

**Structural problem.** `route-meta.ts` and `llms.txt` hold two hand-kept copies of the same facts
(titles, descriptions, per-page disclosure status). The repository already contains the correct
pattern for this: `scripts/spa-routes.mjs` imports the metadata module, stamps it into the shells,
and fails the build when the two disagree (`scripts/spa-routes.mjs:124-133`).

**Fix (choose one).**

- **Generate it.** A `scripts/llms-txt.mjs` that imports `routeMeta`, emits the URL list with each
  route's title and description, and appends a hand-written prose section, run from `postbuild`
  exactly as `spa-routes.mjs` is. Add a gate: every URL in `llms.txt` must be a `routeMeta` key.
- **Or check it.** If it stays hand-written, add a check that every site URL in the file resolves to
  a route and that every bullet's name matches the route title or is explicitly marked as a
  paraphrase. Fail the build on drift, as the canonical gate does.

Either way, add the same drift gate the site already applies to canonicals, so this cannot repeat.
Also note what is deliberately absent and should stay absent: no `llms-full.txt` (the Markdown
negotiation path already serves full text), no `/pricing.md` (not a product site), and no OKF bundle
(protocol-layer registration with no confirmed signal today `[unverified - needs Tom]`).

### P1-5 · Two contradictory "last updated" dates on the same page

**Verified live on `/disclosures/the-kratt-problem/`.** The prerendered HTML contains both
`<time dateTime="2026-08-11">Published · August 11, 2026</time>` and
`<time dateTime="2026-10-04">Updated · October 4, 2026</time>`, while the JSON-LD on that same page
carries `"dateModified":"2026-10-07"`.

**Cause.** The visible `updated` value is a hardcoded prop per page
(`src/pages/BotGuardDisassembledResearchPage.tsx:207` and four sibling pages, all `2026-10-04`, with
the English prose in the same file), while `dateModified` is derived from `src/content/page-dates.json`
through `modifiedFor()` (`src/content/route-meta.ts:34-38`), which is the last commit that touched the
page component. Two different meanings of "updated" are rendering on one page.

**Fix.** Derive the visible date from the same module (the build already passes it), or make the
distinction explicit in the reader's language: "content revised 4 October" against a separate
"code changed 7 October" note. Do not leave two machine-readable dates disagreeing, because freshness
is one of the few signals an answer engine weights heavily, and this page currently sends two
answers to the same question.

### P1-6 · The Estonian half of the site does not exist for machines

**Verified.** Language is client-side only: `src/i18n/LanguageContext.tsx` reads `localStorage` and
`navigator.languages` and sets `document.documentElement.lang`. There is no `/et/` route in
`routeMeta` (28 routes, all English), no `hreflang` anywhere (`src/`, `index.html` and `scripts/`
all return nothing on a grep), and the prerendered shells render without a language parameter
(`src/entry-server.tsx`). `public/llms.txt` is English-only. `index.html:22` advertises
`og:locale:alternate` `et_EE`, which promises a translation no crawler can fetch.

**Why it matters.** The Estonian public sector is the second audience by decision G-7, and this is
the axis where they would be reached. Today the only Estonian text a machine can read is on LinkedIn
and in press. The interesting half of the problem is that the ET copy exists and is good: it is
simply unreachable.

**Fix.** This is a scoping decision, not a bug, and it interacts with plan decision 5 (English
primary, Estonian parallel for bios and headline). Options in cost order: (a) add an ET note and a
language line to `llms.txt` and leave the site as it is; (b) emit `/et/` route shells from the same
`spa-routes.mjs` pipeline with `hreflang` pairs and per-language `inLanguage`, which is mechanical
because the metadata module already holds both languages for the pages that have them; (c) full ET
routes for every bilingual page. Recommend (b) for the ~10 pages that already have ET metadata, and
record the choice in the decision log rather than leaving it implicit.

### P1-7 · Article-level structured data is thin exactly where it should be strongest

**Verified in `jsonLdFor()` (`src/content/route-meta.ts:293-334`).** Each article node carries:
type (`BlogPosting` x5, `ScholarlyArticle` x14, counted from `routeMeta`), `headline`, description
(the abstract), `url`, `mainEntityOfPage`, `image` (the single shared `OG_IMAGE`), `datePublished`,
an optional `dateModified`, an inline author stub (`@type`, `@id`, `name`, `url` only), a publisher
node pointing at ProksiAbel OÜ with `url: https://tomabel.ee/`, `inLanguage`, `isPartOf`, plus a
`BreadcrumbList`.

What a scholarly answer engine looks for and does not find here:

- No `citation` or `isBasedOn` linking the prior art the bodies name (Cypa/dsekz, LuanRT/BgUtils,
  yt-dlp, Paršovs, LHV). Citing sources in prose is the single strongest citation factor, and in
  structured data that work is thrown away.
- No `sameAs` or `identifier` pointing at the canonical signed copy in `/verification/<slug>.txt`,
  which is the site's most citable asset and is invisible in the graph.
- No `reviewedBy`, no `license`, no per-article `image`.
- The author stub is a different, empty node from the homepage `Person`: same `@id`, but no
  `sameAs`, no `affiliation`, no ORCID, so nothing at article level can reconcile identity.
- The publisher URL on every article is the personal domain rather than the company domain (P0-2).

**Fix (additive, low risk).** Extend the `common` object in `jsonLdFor()`: a `citation` array built
from the sources each body already names, `sameAs` on the author stub pointing at `PERSON_ID` plus
the ORCID, an `identifier` for the canonical verification URL where a signed copy exists, and an
`affiliation` for the author once P0-2 is decided. The build hook already exists; this is
declarative data, not new plumbing.

### P2-8 · The Markdown an assistant reads has no dateline, author, or disclosure status

**Verified** on the same two probes as P0-1: no `#` title, no author, no dates and no disclosure
status appear in readable form in the Markdown. Those facts exist only inside the leaked JSON-LD.
The 2026-10-07 audit identified this (`docs/seo-audit-2026-10-07/ai-seo.md`, P1 item 4); commit
`f84a07d` addressed the H1 half and did not add a dateline, and it is undeployed anyway.

**Fix.** In `toMarkdown()`, prepend a deterministic header assembled from the page's own data:
`# {headline}`, an italic author line, `Published` and `Updated` from the same module as the HTML,
the canonical URL, and the per-page disclosure status that `llms.txt` already carries. Then verify
that the first non-front-matter line of the response is `# `.

### P2-9 · `llms.txt` presents a generalist portfolio

**Verified, `public/llms.txt` line 30.** The Systems bullet advertises `fingerprintproxy` alongside
"Vooglaadija (FastAPI media-extraction service with Redis queues, JWT auth, observability)" and a
"Discord RAG pipeline (LanceDB + BM25 hybrid retrieval…)". The phase 2 audit's D3 finding calls
exactly these two off-territory `[S-05]`. Run 3 did not surface them, so the cost today is small; the
risk is that an assistant summarising the site reproduces a generalist in the one line it quotes.

**Fix.** Keep the Systems line to the on-territory flagship and a pointer to `/systems/`; move the
rest into the page, where a human reader can see them in context.

### P2-10 · `Cyber-Kratt` has no owned definition on the live site, so the machine defines it from LinkedIn

**Verified 2026-10-24, Q3.** The answer says "Cyber-Kratt is a moniker and corporate umbrella linked
directly to Tom Kristian Abel", sourced to LinkedIn, plus "serves as a founding engineer under the
Cyber-Kratt professional classification" (garbled, referring to the LinkedIn headline) and
"well-known within the small Estonian digital ecosystem" (uncorroborated). `[S-28]` records that no
public source defines the label and that his own site is the only definition. `decisions.md` G-3
keeps the label and owes a definition (prerequisite P-4, phase 5), and phase 9 closed that on the
About surface: `src/content/site.ts:713-715` now says what the label names and what it is not, in
both languages.

**What is still open.** Three things, in order of effect on what a machine says:

1. The definition is in the repository and the live `/about/` still serves the old folklore-only
   block (P0-1), so nothing has changed for any machine yet.
2. `public/llms.txt` does not link it or mention it (P1-4).
3. The LinkedIn referent the machine actually quoted is fixed by hand and still pending: the headline
   replacement is row 4 of `13-surface-kit.md` §1, listed there as a two-minute manual edit. Until it
   ships, the string the model paraphrases remains the headline that pairs the label with
   "Founding Engineer" and the forbidden label.

**Fix.** Publish the About change, then link the definition from `llms.txt`, then apply the LinkedIn
rows in `13-surface-kit.md` §1 in order. Do not re-measure Q3 before all three, because the first two
change nothing an assistant can see and the third changes the sentence it quotes.

### P2-11 · The only image in the graph is a text card

**Verified.** `index.html:39` and `index.html:55` set `image` to `og-image.png` for the Person and the
Organization; `src/content/route-meta.ts:30` sets the same file for all 19 articles. `git log` dates
it 2026-08-10, before the October token rework (audit D2 `[S-05]`). No portrait exists anywhere in
`src/` or `public/`; the only public photograph of him is the Wikimedia upload outside his control
`[S-32]`, which run 2 cited and run 3 did not.

**Fix.** Refresh the card after the current tokens, and settle the portrait question against
`brand-identity` §05. Note the side effect that is not cosmetic: an answer engine with a photograph
to attach cites a person; one with only a diagram cites a page.

---

## 6 · The fix list, in execution order

| # | Fix | Type | Effort | Depends on |
|---|---|---|---|---|
| 0 | **Publish the current build.** Everything phase 9 shipped to the repo (ORCID in the graph, the Cyber-Kratt definition on About) is invisible until the static layer is deployed | ops | minutes | Tom |
| 1 | Deploy the current worker (`npx wrangler deploy -c worker/wrangler.jsonc`), then verify with the `/sbom.json` `X-Robots-Tag` probe | ops | minutes | Tom (wrangler credentials) |
| 2 | Add the ORCID to the article author stub and the `llms.txt` contact block (the `Person` node is done in `ba41bad`) | markup | under an hour | #0 |
| 3 | Decide P0-2 (company in the graph, or not) and update `url`, `sameAs`, `worksFor`, `publisher` accordingly | decision then markup | a decision plus an hour | P-1 / G-4 |
| 4 | Add a drift gate for `llms.txt` against `routeMeta` (generate it, or check it) | build | 1 to 2 hours | none |
| 5 | Reconcile the visible update date with `dateModified` | one module plus five pages | 1 hour | none |
| 6 | Extend `jsonLdFor()` with `citation`, author `sameAs`, and the canonical verification identifier | markup | 2 hours | #2 |
| 7 | Add the deterministic dateline header to the Markdown path | worker | 1 hour, plus a deploy | #1 |
| 8 | Trim the Systems line in `llms.txt` to on-territory work | copy | 15 minutes | none |
| 9 | Link the Cyber-Kratt definition from `llms.txt` and apply the LinkedIn rows in `13-surface-kit.md` §1 | copy | 15 minutes | #0 |
| 10 | Refresh the social card; settle the portrait | design | a design task | `brand-identity` §05 |
| 11 | Decide the Estonian route question (P1-6) and log it | decision | a decision, then a build task | plan decision 5 |

Items 0, 1, 4, 5 and 8 are independent, cheap and testable, and item 0 is a prerequisite for the
audit itself being meaningful. Item 1 is next because it is the one place where the repository
already contains the fix, the live site does not, and the failure is invisible from the repo side:
`x-markdown-tokens` is present live, which looks like proof of a current deployment, while two
headers added in the same commit that introduced the stripping are absent.

---

## 7 · Reproducing this audit

Six commands, all read-only, no credentials. Paste the output into the next snapshot.

```
# 1. Markdown negotiation: look for a leading "# ", and for chrome and JSON-LD that should not be there
curl -sS -H 'Accept: text/markdown' -D - -o md.txt \
  "https://tomabel.ee/disclosures/botguard-disassembled/?cb=$(date +%s)" | grep -iE '^(content-type|vary|x-markdown-tokens|content-signal)'
head -12 md.txt ; grep -c '@context' md.txt

# 2. Is the current worker deployed? These two should carry X-Robots-Tag: noindex when it is
curl -sS -o /dev/null -D - https://tomabel.ee/sbom.json | grep -i '^x-robots'
curl -sS -o /dev/null -D - https://tomabel.ee/verification/botguard-disassembled.txt | grep -i '^x-robots'

# 3. Entity graph as served
curl -sS https://tomabel.ee/ | grep -o '"@type": *"[A-Za-z]*"' | sort | uniq -c

# 4. llms.txt: live versus repo
curl -sS -o llms-live.txt https://tomabel.ee/llms.txt && diff llms-live.txt public/llms.txt && echo identical

# 5. Structured data in the repository, parsed rather than eyeballed
node --experimental-strip-types -e "import('./src/content/route-meta.ts').then(m=>console.log(JSON.stringify(m.jsonLdFor('/disclosures/botguard-disassembled','en'),null,2)))"

# 6. Coverage of the proof layer against the article routes
node --experimental-strip-types -e "import('./src/content/route-meta.ts').then(m=>{const a=Object.keys(m.routeMeta).filter(k=>m.routeMeta[k].ld&&m.routeMeta[k].ld.type!=='AboutPage');console.log(a.length+' article routes')})"
ls public/verification/*.txt | wc -l
```

Expected results on 2026-10-24, for the next reader to compare against: probe 4 printed `identical`;
probe 2 printed nothing for both URLs (the deployment finding); probe 1 printed the content type and
`x-markdown-tokens: 6231` with `@context` twice; probe 6 printed `19 article routes` and `7`.

---

## 8 · What not to do (per the `ai-seo` skill, and per Google's own guidance)

1. **Do not write separate content for AI systems.** The same page serves readers and machines here,
   which is already the case, and that is what keeps it clear of the scaled-content-abuse policy.
2. **Do not block AI crawlers to "protect" the content.** The current `robots.txt` allows eleven named
   crawlers plus `Content-Signal: search=yes, ai-input=yes, ai-train=yes`, and that setting is the
   reason his own site, rather than press, supplies most of what machines say about him `[S-21]`.
   Changing it would hand the framing back to `[S-12]`.
3. **Do not pursue mentions.** No fabricated citations, no bulk Reddit or Wikipedia edits. The peer
   audience is small enough to recognise it, and the standing zero in third-party coverage
   `[S-13]` `[S-14]` makes one planted mention conspicuous.
4. **Do not add schema for facts that fail gate 3.** `alumniOf` and `award` only for what is
   corroborated; the MATx title and the TalTech micro-degree are not, and the same rule already
   applies to prose.
5. **Do not chase Google AI Overviews with special markup.** Google's own guidance is that no special
   file or markup is required and that people-first content wins. Everything in §5 that helps
   non-Google engines (structure, datelines, `citation`, `llms.txt`) is either neutral or helpful for
   Google, so there is no trade-off to manage here.

---

## 9 · Reconciliation with the previous audit (2026-10-07)

`docs/seo-audit-2026-10-07/ai-seo.md` scored access 5/5, discovery 4/5, parseability 3/5,
citability 2/5 and listed findings that commit `f84a07d` was written to close. Checking them against
the live layer on 2026-10-24:

| 2026-10-07 finding | Status today | Evidence |
|---|---|---|
| Markdown output is lossy and noisy (chrome, JSON-LD, dropped H1) | **Open, and undeployed**: the repo fix exists, the live site does not have it | P0-1 |
| No dateline, author or disclosure status in the Markdown body | Open | P2-8 |
| Articles lack an answer-first block | Closed: `src/components/site/article.tsx:33-34` accepts a `keyFindings` block and the flagship articles carry one | file |
| Markdown keeps the H1 where the layout allows | Open on the live layer | P0-1 |
| Estonian content invisible to crawlers | Open | P1-6 |
| No `llms-full.txt` | Deliberate, no action | `llms.txt` plus Markdown negotiation already serve full text |
| Entity schema present and parsing | True, but inaccurate on three fields | P0-2, P0-3, P1-7 |
| Canonicals gated at build time | Still true and still the best pattern in the repo | `scripts/spa-routes.mjs:109-121` |
| Articles lack an answer-first block | Closed | `src/components/site/article.tsx:33-34` |
| Phase 9 (`ba41bad`, same day) added the ORCID to the graph and defined Cyber-Kratt on About | **Open on the live layer**: both are in the repo and neither is served | P0-1, P0-3, P2-10 |

The pattern in this table is worth naming: the repository's fixes are ahead of the deployed site by
one manual step. That is a process finding, not a code finding, and items 0 and 1 in §6 are the whole
of it. It also changes what "audit the live machine-facing layer" means for this project: the live
layer is a release behind at all times until the deploy is treated as part of the fix.
