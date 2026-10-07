# GEO / AI-citation readiness — tomabel.ee

Date: 2026-10-07. Scope: 19 `/disclosures/*` articles (from `sitemap.xml`) plus `/`, `/about/`, `/systems/`, `/my-story/`.
Method: `firecrawl scrape --only-main-content` for body text (Measured); prerendered `pub/**/index.html` for head, JSON-LD and article chrome (Measured). Scores are **Estimated** (model inference against the CORE-EEAT GEO targets C02, C09, O03, O05, E01, O02). Tavily citability probe: N/A (account 402, not run).

## Verdict

Already strong, better than most security blogs: every article has a visible abstract, `Published`/`Updated` dates, read time, author name, numbered table of contents, a dated `Corrections` block, a SHA-256 integrity hash, a sources section (17/19), and `ScholarlyArticle`/`BlogPosting` JSON-LD with `datePublished`, `dateModified`, `author`. External sourcing is dense (median 12 outbound citations per article; 20+ on the PIN, PACT, Smart-ID, phishing-scanner and Gray Space pieces).

What holds citations back is uniform across the set, so each fix is one template change, not 19 edits:

1. No article has a 25-50 word standalone definition block or a "Key findings" list at the top; 11/19 have no `Thesis` block. Abstracts are 40-150 words of narrative, not extractable claims.
2. Openings are methodology-first ("This report is a synthesis of...", "Two research threads feed this report...", "Archetype C is a composite...") in 12/19. The answer arrives in section 01 or later.
3. Zero question-form headings site-wide; FAQ markup on 1/19. Engines retrieve on question matches.
4. Author entity is split: Person JSON-LD says `worksFor: MatX`; Organization is `ProksiAbel OÜ`; the byline is plain text, not linked to `/about/`; no `sameAs` to anything beyond GitHub/LinkedIn. `/`, `/about/`, `/systems/` have no `datePublished`/`dateModified`.
5. Many numbers, few framed as citable stats: the `%`-bearing sentences number 0-4 per article; most figures are buried mid-paragraph with the source named in prose, not adjacent.
6. Heading numbers render as separate "01" lines in extracted text, so engines see `01 \n The claim, stated plainly` — the numeral pollutes the heading string.

Estimated GEO score (0-100, CORE-EEAT GEO weighting): **site median 62** now; **~80** after the ten edits below. Query coverage: of the ~25 target queries listed per page, roughly 40% have a standalone quotable answer today; the template edits lift that to ~85% without rewriting bodies.

## Per-page notes

Columns: words (Measured, body markdown) · ext = outbound citations · dates = datePublished/dateModified in JSON-LD · GEO = Estimated score.

### Core pages

| Page | Words | GEO | Notes |
|---|---|---|---|
| `/` | 377 | 55 | No dates in JSON-LD. H1 is a statement, good. No one-paragraph "who is Tom Kristian Abel" definition; the Person description lives only in schema. Add a 40-word entity paragraph under the hero (see Edit 4). |
| `/about/` | 353 | 58 | Only page with the full conviction disclosure, which is the entity's most-searched disambiguator; keep it. No dates, no `sameAs` beyond GitHub/LinkedIn, no ORCID/Google Scholar/arXiv. Person schema `jobTitle` and `worksFor: MatX` conflict with the Organization block (ProksiAbel OÜ). H1 "The way of seeing." is unextractable; add an `<h2>` "Who is Tom Kristian Abel?" with a definition paragraph. |
| `/systems/` | 731 | 50 | 17 list items, 0 h2. Each project has no one-sentence definition line, so nothing is quotable per project. No dates. Add `SoftwareSourceCode`/`CreativeWork` items with `dateCreated` or at least a visible year per project (two years present now). |
| `/my-story/` | 715 | 60 | `AboutPage` schema with `datePublished`, author. Links to the Delfi interview (good primary source). "Three acts." opening is fine for humans; add a two-sentence factual lede with the date and charge for engines. |

### Disclosures

| Slug | Words | ext | Dates | GEO | Notes |
|---|---|---|---|---|---|
| smart-id-achilles-heel | 4880 | 24 | 08-11 / 10-04 | 72 | Best page. Thesis block, abstract, FAQ-like section, table, disclosure timeline, corrections. Abstract is 120 words; needs a 40-word definition of "signing relay" and a 5-bullet Key findings. Opening is methodology-first. |
| botguard-disassembled | 3183 | 8 | 08-11 / 10-04 | 66 | Thesis present, 13 h2. Opening credits prior work before saying what BotGuard is. No definition of "Proof of Origin token". Attribution to dsekz/LuanRT is exemplary; keep. |
| zero-trust-octagon | 5798 | 23 | 08-11 / 10-04 | 68 | Thesis, 13 h2, 5 lists. Longest page; no Key findings; the 8 axioms are not listed as a single extractable block near the top (engines quote lists). |
| nine-dimensions-of-zero-trust | 2796 | 12 | 09-22 / 10-04 | 66 | Table present (good). Opening quote-line is quotable. No definition of "morphological matrix" in 25-50 words. |
| the-pin-that-cannot-be-delegated | 3645 | 20 | 09-08 / 10-04 | 70 | Only page with FAQ. Opening is a scope disclaimer; move "An AI agent cannot enter your Smart-ID PIN because..." to sentence one. |
| the-evolution-of-cyber-fraud-in-estonia | 4263 | 19 | 08-26 / 10-04 | 64 | 250 numerals, 3 `%` sentences; the richest stats page but none in a table. Build one "Estonia fraud losses by year, source" table (Edit 6). No Thesis. |
| russian-cyber-ops-estonia-hosting | 3161 | 26 | 09-14 / 10-04 | 68 | Opening is answer-first and dated (model for others). Table present. Good primary sources (RIPE, äriregister, KAPO). No Thesis. |
| chatgpt-is-not-a-phishing-scanner | 3448 | 20 | 09-06 / 10-04 | 63 | 124-word abstract. Opening explains what is being tested, not the verdict. Add "Verdict:" one-liner. 4 `%` sentences; sources are strong (arXiv, Google docs). |
| pact-software-anchor-turn | 3834 | 18 | 08-28 / 10-04 | 62 | 152-word abstract, methodology-first opening. No definition of PACT in 25-50 words before section 01. |
| why-vlms-break-client-side-anti-fraud | 3242 | 16 | 09-22 / 10-04 | 64 | Opening is first-person provenance. Thesis absent. Core claim ("a VLM driving a stock browser forges nothing inside it") is in the meta description but not as a standalone paragraph on-page. |
| identity-is-the-root-proof-is-the-gate | 2248 | 14 | 09-22 / 10-04 | 66 | Section 01 "The claim, stated plainly" is exactly the quotable block; promote it above the fold. |
| coordinated-disclosure-in-a-small-country | 1890 | 8 | 08-11 / 10-04 | 62 | Thesis present. Opening is scene-setting. Contains a quotable stat (Smart-ID 3.7M+ users, Oct 2025) that should be in the Key findings. |
| i-used-to-break-authentication | 1980 | 6 | 06-22 / 10-04 | 60 | Thesis present. 10 h2 but reads as essay; no Q headings. This is the entity-defining essay; link byline to `/about/`. |
| the-fortune-500-illusion-of-control | 2165 | 8 | 09-22 / 10-04 | 58 | "Archetype B is a composite" opening is a disclaimer, not an answer. All four archetype traces share this pattern. |
| move-fast-fix-it-in-prod | 2163 | 8 | 09-22 / 10-04 | 58 | Same as above. |
| saas-glued-lean-defense | 2155 | 11 | 09-22 / 10-04 | 60 | Same; "six fixes one operator can start in an afternoon" is in the description but not listed as an extractable block on-page. |
| what-client-side-trust-is-actually-worth | 2022 | 1 | 08-11 / 10-04 | 56 | Only 1 outbound source, no sources section. Thesis present. Strong quotable line ("a defense that runs on a machine you do not control is negotiable") buried in paragraph 2. |
| the-fix-that-doesnt-need-sk | 1317 | 1 | 09-06 / 10-04 | 54 | 1 outbound link, no sources section, no Thesis. Conflict-of-interest disclosure first is correct ethically; follow it with the answer. Cites PSD2 RTS Art. 2 and Paršovs/LHV prior art in prose without links. |
| the-kratt-problem | 1015 | 3 | 08-11 / 10-04 | 52 | Essay; fine as is. Only add a 30-word definition of "kratt" with the folklore source, which is the one query it can win. |

## Top 10 edits

Ordered by impact / effort. Edits 1-3 and 7-9 are template-level (one component), so they cover all 19 articles.

### 1. Add a `Key findings` block between the abstract and the byline (template)

Three to five one-sentence claims, each self-contained, each with the number and the source inline. Engines lift bullets verbatim. Example for `smart-id-achilles-heel`:

> **Key findings**
> - Smart-ID's cryptographic core resists MITM and SK-endpoint replacement by design: certificate pinning, IP+UUID relying-party authentication and the ACSP_V2 signature protocol (SK relying-party API documentation, 2026).
> - The exploitable layer is the approval screen: an interactive signing relay shows the victim a legitimate login through a live remote browser so they authorize their own fraud.
> - Smart-ID+ narrows the gap but was live at only two banks (Bigbank, LHV) as of June 2026, one year after SK made it available to integrators.
> - People in Estonia lost 29 million euros to fraud in 2025 (RIA).
> - Reported to SK ID Solutions in November 2025 and to RIA, TTJA and AKI in April 2026; no operational detail is published.

### 2. Answer-first opening paragraph (12 articles)

Keep the methodology paragraph, but put it second. Sentence one states the finding. Rewrites:

- **zero-trust-octagon**: "The Zero-Trust Octagon is a vendor-neutral zero-trust framework built from eight axioms and a nine-dimension morphological matrix (trust anchor, identity, enforcement, attestation, response, posture and three more), published openly at github.com/tomkabel/zero-trust-octagon. It replaces 'are we zero trust?' with 'where are we on each axis, and is that deliberate?'. This report compresses the book to its testable core."
- **pact-software-anchor-turn**: "PACT (Private Access Control Tokens) is a Cloudflare and Mozilla proposal, discussed in the W3C Anti-Fraud Community Group since June 2026, for privacy-preserving rate limiting built on the IETF Privacy Pass ACT and ARC anonymous-credential drafts. The cryptography is sound; the unresolved question is who gets to be an Anchor. This is a critical reading of the public record as of August 2026, rechecked October 2026."
- **chatgpt-is-not-a-phishing-scanner**: "Verdict: pasting a suspicious link into ChatGPT is not a reliable phishing check. Professional phishing runs behind traffic distribution systems that serve a decoy to anything that is not the intended victim, so a single fetch by an assistant sees a clean page. VirusTotal, Google Safe Browsing and the URL-context tools documented by the vendors are better first checks. The rest of this report tests the tip as it is commonly phrased."
- **the-four archetype traces** (fortune-500, move-fast, saas-glued, plus identity-is-the-root): lead with the one-sentence breach summary already in each meta description, then the "composite, not a company" disclaimer.
- **why-vlms-break-client-side-anti-fraud**: lead with the thesis from the description: "Fifteen years of client-side bot detection assumes automation must forge what a real browser produces. A vision-language-model agent driving a stock browser forges nothing inside it, so the detector has nothing to catch."
- **the-pin-that-cannot-be-delegated**: "An AI agent cannot lawfully or technically enter your Smart-ID PIN on your behalf: SK ID Solutions' terms make the PIN strictly personal, the remote-QSCD practice statement requires sole control, and eIDAS Articles 26 and 32 define a qualified signature as one under the signatory's sole control. The workable pattern is OAuth-style delegation, not PIN sharing."

### 3. Strip the numeral from heading text (template)

The "01" prefix renders as its own text node before the `<h2>`, so extracted headings read `01 The claim, stated plainly`. Render the counter with CSS (`counter()` or `aria-hidden` span) so the heading string is clean. One component change.

### 4. Entity definition paragraph on `/` and `/about/`

Under the hero on `/` and as the first paragraph of `/about/`:

> Tom Kristian Abel is an Estonian security researcher and systems architect who reverse engineers authentication and browser anti-fraud systems (Smart-ID, eIDAS, FIDO2/WebAuthn, Google BotGuard, TLS fingerprinting) and publishes coordinated disclosures at tomabel.ee. He is CTO of MATx and runs ProksiAbel OÜ, which builds the Proksimity server-side identity-assurance product. He was convicted in 2024 for earlier offensive work, which he discloses in full.

Also fix the schema split: make the article `author` Person carry `sameAs` (GitHub, LinkedIn, the Delfi interview, ORCID if one exists), set `affiliation: [MATx, ProksiAbel OÜ]` rather than a single `worksFor`, and add `dateModified` to `/`, `/about/`, `/systems/`.

### 5. Link the byline to `/about/` and add `author.url` to that page (template)

The visible "Tom Kristian Abel" under every article is plain text. Link it to `https://tomabel.ee/about/` and set `author.url` to the same (currently `https://tomabel.ee/`). Engines resolve the entity by following that link.

### 6. One sourced stats table on `the-evolution-of-cyber-fraud-in-estonia`

The page has ~250 numerals and no table. Build:

| Year | Reported loss (EUR) | Source |
|---|---|---|
| 2024 H1 | SEB Baltic fraud figure | SEB |
| 2025 | 29 million | RIA, Cyber Security in Estonia 2026 |
| ... | ... | ... |

with a two-sentence caption noting that RIA, PPA and banks count different things. Reuse the same pattern for the Smart-ID+ rollout dates on the Achilles page.

### 7. FAQ block with matching `FAQPage` JSON-LD (per article, three questions each)

Question-form headings are zero site-wide. Add three `<h3>` questions at the end of each article, each answered in 40-60 words, and emit `FAQPage` only for the text visible on the page. Seed questions:

- Smart-ID: "Can Smart-ID be man-in-the-middled?", "What is a Smart-ID signing relay attack?", "Does Smart-ID+ stop the signing relay?"
- BotGuard: "What is Google BotGuard?", "What is a Proof of Origin token?", "Is the BotGuard token bound to the device?"
- PIN: "Can an AI agent use my Smart-ID?", "What does eIDAS Article 26 require?", "How should an agent act on my behalf instead?"
- PACT: "What is PACT?", "What is an Anchor in PACT?", "Is PACT deployed?"
- Octagon / Nine dimensions: "What are the eight axioms of the Zero-Trust Octagon?", "What are the nine dimensions of zero trust?", "How is this different from CISA's Zero Trust Maturity Model?"

### 8. Promote the `Thesis` block to all 19 (11 missing)

The Thesis callout on the Smart-ID, BotGuard, Octagon, kratt and PIN pages is already the right 25-50 word quotable shape. Make it a required field; for the 11 pages missing it, lift the sentence from the meta description.

### 9. Add a `Sources` section to the two pages without one

`what-client-side-trust-is-actually-worth` (1 outbound link) and `the-fix-that-doesnt-need-sk` (1 outbound link) cite PSD2 RTS Art. 2, Paršovs' Smart-ID phishing work, LHV's session check and the BotGuard teardown in prose only. Add the links (EUR-Lex for RTS 2018/389 Art. 2, ERR for Paršovs, the research corpus for the teardown). Factual density is fine; attribution is what is missing.

### 10. `/systems/`: one definition line per project

Each of the 17 projects gets a first sentence of the form "*X* is a [type] that [does Y], built in [year], [stack]". Example: "fingerprintproxy is a Go TLS-fingerprinting proxy (2021) that replays JA3/JA4 client hellos so backend services can be tested against the fingerprints real browsers present." Add `CreativeWork` items with `dateCreated` to the page schema.

## Already good, keep

- Dated `Published` / `Updated` on every article, matching JSON-LD. `dateModified` 2026-10-04 across the set reflects the October correction pass.
- Visible `Corrections` block with dates on all 19. Rare, and exactly what Perplexity and Claude weight for trust.
- SHA-256 integrity hash and signing-key fingerprint on every article; add the detached signatures when ready (the page already says they are pending).
- `llms.txt` present with per-article summaries, disclosure dates and recipients.
- Outbound citation density: median 12, with primary sources (EUR-Lex, NIST, RIPE, äriregister, RIA, KAPO, arXiv, vendor docs).
- Conflict-of-interest disclosure (ProksiAbel/Proksimity) stated on the Smart-ID pages.

## CORE-EEAT GEO self-check (Estimated)

| ID | Target | Status |
|---|---|---|
| C02 | Clear definition near top | Fail (0/19 standalone definitions) → Edits 1, 2, 8 |
| C04 | Factual density | Pass |
| C09 | Quotable statements | Warn (present, buried) → Edits 1, 2 |
| O02 | Structure / headings | Warn (numeral noise, no Q headings) → Edits 3, 7 |
| O03 | Answer-first | Fail (12/19 methodology-first) → Edit 2 |
| O05 | Q&A format | Fail (FAQ 1/19) → Edit 7 |
| O06 | Tables / lists for data | Warn (tables 3/19) → Edit 6 |
| R01 | Source attribution | Pass (17/19) → Edit 9 for the two |
| R02 | Author signals | Warn (name, no link, schema split) → Edits 4, 5 |
| R04 | Freshness | Pass on articles; Fail on `/`, `/about/`, `/systems/` → Edit 4 |
| R07 | Corrections / transparency | Pass |
| E01 | Entity clarity | Warn → Edit 4 |
| Exp10 | First-hand experience | Pass (disclosure records, PoC descriptions) |
| Ept08 | Expertise markers | Pass |

Open loop: no `memory/entities/tom-kristian-abel.md` profile exists in this repo, so `ai_resolution_status` is unknown; run `entity-registry` before relying on Edit 4 wording for disambiguation. Tavily citability probe should be re-run once the account is active, with the five FAQ questions in Edit 7 as the query set.
