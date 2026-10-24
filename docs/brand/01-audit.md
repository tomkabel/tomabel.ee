# Phase 2 — Brand baseline audit (as of 2026-10-24)

First scorecard of the brand as it actually stands, before any of it is changed. Compares **intent**
(what the brand says it is) with **perception** (what third parties and machines currently say it is),
and checks what the 3–4 Oct 2026 disclosures review flagged that is still unresolved on 24 Oct.

Sources are cited as `[S-nn]` into `00-evidence/source-register.md`. Quotes are verbatim; where a
quote is Estonian, the working translation is marked `[tr]`.

**Method.** Each dimension scored 1–5 (1 = needs significant work, 5 = excellent) per the
`brand-audit` framework. Every score carries the evidence that produced it. Nothing scored from
impression. Audited surfaces: `tomabel.ee` source (site.ts, 19 page bodies, index.html schema,
llms.txt, design tokens, scripts), LinkedIn profile + posts `[S-15]`, three GitHub accounts `[S-17]`
`[S-18]` `[S-19]`, four press articles `[S-09]`…`[S-12]`, the AI-answer snapshot `[S-21]`, and the
adversarial review of his own work `[S-02]`.

**Not audited in this pass** (carried forward): the ranked SERP (capture failed — `[S-22]`), rendered
`/et/` pages (EN and ET were compared in source, not in the live DOM), and LinkedIn engagement
quality (follower composition is `needs-proof` — the archived account's followers included
follow-back accounts per `[S-24]`).

---

## 1. Remediation check — what the review flagged, and where it stands today

The review `[S-02]` is the only outside-in measurement that existed. Checking it against the live
repo is the fastest way to see what the brand has already fixed.

| Review finding | Status on 2026-10-24 | Evidence |
|---|---|---|
| §1 Undated pages (13 of 19) | **Fixed** | every page carries `Published … · Updated … · N min read` in EN and ET; `src/content/page-dates.json` feeds `modifiedFor()` and the sitemap. Caveat: the date is the last *commit* touching that page component (`scripts/page-dates.mjs`), so it means "code changed", not "reviewed". |
| §2 Undisclosed conflict of interest (13 of 19) | **Fixed** | a standard line on the anti-fraud/auth pages, both languages: "Disclosure: the author runs ProksiAbel OÜ, which builds Proksimity, a commercial server-side traffic identity-assurance product. Several recommendations here fall in that category." `The fix that doesn't need SK` names the specific fix that is the product category. |
| §3 "Always disclosed responsibly before publication" | **Fixed, better than asked** | index meta replaced with a qualified sentence ("Where research touches live systems, each page states its disclosure status: who was told, when, and what they said"), and `llms.txt` now carries a per-page status — including the honest negative: "Not reported to Google." |
| §8 Dead links | **Fixed** | `skid-security-research` gone from src; the DoD link is now `DoD-ZTStrategy.pdf`. |
| §4 Index blurbs don't match the bodies | **Fixed** | blurbs re-derived in both languages; the unsupported "1.4M+ users" is gone (0 hits repo-wide); type labels consistent ("Framework Analysis"/"Raamistiku analüüs", "Breach Trace"/"Rünnaku jälg"). |
| §5 Three versions of the past | **Improved: 3 → 2** | one canonical statement now lives in `bio.paragraphs[0]` and the two essays carry a compressed sentence that points to it. The pointer resolves. Residual: the phrase "I broke them for money" is the strongest wording anywhere in owned copy. |
| §11 Fraud paper figures (€29M, SEB pivot, "majority") | **Fixed** | the €29M is now attributed and the discrepancy explained ("They differ only on the baseline… Anyone quoting a single 'Estonian fraud number' should say which authority they mean"); phone scams are "the largest category, about 11.5 million euros of the 29 million" rather than a majority; the SEB reading is corrected to the source's direction ("Estonian-speaking victims were being reached in Russian"); and each figure now names the publisher that released it. ET carries the same figures and the same qualifiers. |
| §6 Smart-ID+ rollout propagation | **Partly** | `llms.txt` states the disclosure timeline correctly (SK Nov 2025 → RIA/TTJA/AKI Apr 2026); whether the four affected pages agree with each other was not re-checked in this pass. |
| §7 Framework pages disagree (dimensions, archetype axiom scores) | **Partly fixed — better than this audit first assumed** | the Fortune 500 page now carries a corrections changelog that explicitly reconciles it with the Octagon: "Corrections, 4 October 2026: the axiom scoring now matches the overview (B fails six axioms outright and two partially, named by number)… Later on 4 October 2026: bilateral symmetry (Axiom 8) is now scored as violated outright, following the book's matrix." The Octagon ↔ Nine Dimensions D6/D7/D8 label question was **not** re-verified. No single canonical dimension table exists in the repo yet. |
| §9 Credit and prior art (Cypa, LgU/BgUtils, Paršovs, Kivirähk, Mozilla) | **Open** | not verified fixed; the fix commit `f84a07d` was scoped to links, schema, dates, CWV and answer-first copy. |
| §10 Prose tics ("not X, but Y", one-line closers, 15–25% cuttable) | **Open** | measured again in phase 1: 16 occurrences across the corpus, densest in the personal essay (4 in 1,795 words). |
| P1 fact items #1, #2, #3, #10, #13 (BotGuard borrowed findings, Achilles details, Octagon citations, PACT mechanism, Gray Space) | **Open — not re-verified** | these are substantive rewrites, not copy fixes. Phase 7's book must not build a claim on any of them until they are closed. |

**A trust asset the review did not mention, found in this audit.** `public/verification/` holds a
canonical plain-text copy of each flagship article plus a **detached PGP signature** for it (7 pages:
BotGuard, Smart-ID, Zero-Trust Octagon, PACT, ChatGPT-as-scanner, fraud timeline, "the fix that
doesn't need SK"). `ArticleProof` fetches the text, hashes it in-browser with WebCrypto and compares
it to an `expectedSha256` committed to source, so a reader can prove the served text was not altered;
the `.asc` proves authorship out-of-band with `gpg --verify`, and CI fails if text and hash drift.
Several pages also carry dated corrections changelogs (the Fortune 500 one is quoted above).
**This is the most credible thing on the site** and it covers 7 of 19 pages — i.e. the hardest
evidence exists and is under-deployed.

**Reading of the remediation table.** The mechanical and copy-level findings were fixed well and in
both languages, sometimes better than the review asked. The substantive fact-check items and the
framework-inconsistency item were not — and those are exactly the ones a hostile reader checks.

---

## 2. The six-dimension scorecard

### D1 · Positioning clarity — **2/5**

**What the brand intends.** One idea, stated once and repeated: *"Most of my work lives at one fault
line: the gap between what a system claims to verify and what it actually verifies."* `[S-05]` Plus
the arc: same skill, redirected.

**What breaks it.** Four incompatible role framings are live at once:

| Surface | Self-description (verbatim) |
|---|---|
| `index.html` / meta | "Tom Kristian Abel — Security Researcher & Systems Architect" `[S-05]` |
| About bio `[S-05]` | "These days I'm **Lead Systems Architect and CTO at MATx** (matx.ee), a maths-learning platform…" |
| LinkedIn headline `[S-15]` | "Founding Engineer \| Cyber-Kratt \| Ex-Black Hat" |
| LinkedIn experience `[S-15]` | "Founding Engineer" at ProksiAbel OÜ (Jan 2025–present) + "Independent Exploitation Researcher & Tool Developer" |
| GitHub bio `[S-17]` | "Authentication security researcher — breaking eID, anti-fraud, and browser attestation systems to build better ones." |
| AI summary `[S-21]` | "founder and principal engineer of ProksiAbel OÜ" — a fifth framing, generated from the above |

Which entity employs him, which title leads, and whether the personal brand is researcher-first or
founder-first are all unresolved. "Systems architect and security researcher" is also a phrase that
would fit thousands of people; the only genuinely ownable territory in the corpus is the fault-line
idea, and it appears on exactly one page.

**Question the dimension asks:** *Could this positioning statement apply to a competitor?* Yes —
"safety architect and security researcher" fits any senior practitioner. **What would be lost if this
brand disappeared?** The Estonian eID disclosure corpus and the opcode-level VM work, not the
positioning.

### D2 · Visual identity consistency — **4/5**

**Evidence of real intent** (`src/index.css`, `tailwind.config.js`):
- Colour derived from the subject rather than a stock palette — "the two accents are the classic CRT
  phosphors (P1 green for signal, P3 amber for caution) and the surfaces are the blue-black of an
  unlit screen", with the surface ladder drifting in hue so elevation reads as "closer to the signal".
- Contrast ratios recorded in the file (17.3 / 9.7 / 7.4 / 5.9 : 1, all AA).
- Type and radius scales **replaced, not extended**, so a stray `rounded-lg` cannot exist.
- Commit Mono 400 only, with the unused weights deliberately unshipped.

For a person — who has no logo — this is the right kind of identity: type, colour and rhythm.
Favicon and theme colour are consistent, and the PGP card is a genuine identity asset.

**What keeps it at 4.** Two gaps, both fixable:
1. `public/og-image.png` is dated **10 Aug** (source `og-image.svg`, 14 Jun) and predates the October
   token rework — i.e. the image every share and every search result shows is from an earlier design.
2. **No portrait exists anywhere on the site.** No `.jpg/.webp/.png` person image in `src/` or
   `public/`. The only public photograph of him is a Wikimedia upload outside his control
   (`[S-32]`), while `brand-identity` §05 (imagery) has nothing to work with. For an individual
   brand, "who is in the picture" is part of the identity, and right now the answer is a text card.

### D3 · Messaging consistency — **3/5**

**Strong work, and it is recent:** the COI line is standardized across the anti-fraud/auth pages in
both languages; per-page disclosure status is honest to the point of self-harm ("Not reported to
Google", "an unreproduced 2021 note"); index meta no longer overclaims; blurbs were re-derived and now
match their bodies; the ET versions of the fraud figures match the EN ones exactly.

**What breaks it:**
1. The four role framings in D1 — the same problem, seen from the messaging side.
2. **A surviving overclaim on the highest-traffic page.** `bio.paragraphs[1]` still says he
   "disclose[s] what I find responsibly" `[S-05]`, while the review found the equivalent aggregate
   claim unsupported on most pieces, and `llms.txt` itself records one page as "Not reported to
   Google". The index was fixed; the About page, which the essays link to as the canonical statement,
   was not.
3. **An unverified new claim on the same page**: "Lead Systems Architect and CTO at MATx" appears
   only in his own copy — not in the AI answer, not in press, and not corroborated anywhere in the
   register. `needs-proof` (G-6).
4. `llms.txt` advertises systems that dilute the territory: fingerprintproxy fits, but a
   "FastAPI media-extraction service" and a "Discord RAG pipeline" read as a generalist portfolio,
   not an authentication-security one.

### D4 · Voice & tone consistency — **3/5**

Measured in phase 1 over 48,025 words (`00-evidence/statements-and-quotes.md` §4):

| Register | Em dashes /1k | Avg sentence | Superlatives /1k |
|---|---|---|---|
| 5 essays | **0.00** | 11–20 w | 0–4.4 |
| 10 research drafts | 1.10–12.65 | 18–24 w | 0.6–3.0 |
| `site.ts` copy | **6.07** | **33.7 w** | **1.56** (highest of the prose segments) |
| LinkedIn (profile + posts) | 1.10 | 17 w | 1.10 |

**Diagnosis:** the voice is real, distinctive and identifiable — the fault-line metaphor, the kratt,
"same eyes, different direction", the refusal to name anyone. It is strongest where he is not trying
to sell anything and weakest on his own marketing surface, which is the inverse of the usual problem.
Two further gaps: the review's "not X, but Y" tic is still present and measurable, and the LinkedIn
voice shares almost nothing with the site voice (checkbox emoji, full-width bold, hashtag stacks,
self-mocking asides) — acceptable as a channel adaptation, but nothing in the repo currently says
which moves are intentional.

### D5 · Audience alignment — **2/5**

The brand is speaking to at least three audiences with one voice and no separation:

| Audience | What serves them | Where it lives |
|---|---|---|
| Research / engineering peers | 19 research pages, disclosures with named recipients, `fingerprintproxy` | `/disclosures/`, GitHub |
| Estonian public sector / regulators | the eID and fraud work, the disclosure record (SK, RIA, TTJA, AKI) | same pages, no dedicated surface |
| Hiring market / clients | "Systems", the MATx CTO line, "design partners", ProksiAbel OÜ | `/systems`, `/about`, LinkedIn |

Consequences: no primary audience is declared anywhere; the AI summary reflects the muddle
("researcher, systems architect, and entrepreneur"); and `/systems` mixes the on-territory flagship
with off-territory work, so a peer cannot tell what he is for. The machine-facing layer is the
strongest audience-aware work on the site (`llms.txt`, Markdown negotiation, JSON-LD with
`knowsAbout`) — the human-facing layer is the weaker one.

### D6 · Competitive differentiation — **3/5**

**Genuinely rare, currently uncommunicated.** The combination in the corpus is hard to assemble
elsewhere: opcode-level reverse engineering of a production anti-fraud VM, protocol-level work on
national eID infrastructure, a published disclosure record with named recipients and dates, *and* a
documented offensive-to-defensive history that most peers cannot claim and most vendors would hide.
The ownable idea (claimed-vs-actual verification) is a defensible territory.

**Why not higher:** zero third-party sources frame him by any of it.
- Press framing is one pattern: *convicted, then (sometimes) helpful* — `[S-12]` leads with the
  conviction even in the award story.
- The AI answer carries the arc and the work list, but the arc is what it leads with.
- No talks on record, no ORCID works, no academic record, no independent coverage `[S-23]` `[S-29]`.
- The most-repeated label, "Cyber-Kratt", has **no external referent at all** — the only definition
  is his own `[S-28]`.
- Under-deployed: the signed, hash-verifiable article copies in `public/verification/` (7 of 19
  pages) are a differentiator almost nobody in this field ships — a reader can prove the text was not
  altered and that the author signed it. The AI answer did not mention it once.

**Total: 17/30.** Clarity of execution (visual identity, disclosure honesty) is well ahead of clarity
of position (who he is for, and why him).

---

## 3. Intent vs perception — the explicit delta

| # | Intent (his own surfaces) | Perception (third parties + machines) | Delta |
|---|---|---|---|
| 1 | The work lives at a fault line: claimed vs actual verification `[S-05]` | The AI leads with *"Once active as an adversarial 'black hat' hacker, Abel transitioned into defensive security"* `[S-21]`; press leads with the conviction `[S-12]` | **Large.** The idea is invisible outside his site. The arc occupies the lead instead |
| 2 | "Systems architect and security researcher" `[S-05]` | AI: "cybersecurity researcher, systems architect, and entrepreneur… founder and principal engineer of ProksiAbel OÜ" `[S-21]`; LinkedIn: "Founding Engineer \| Cyber-Kratt \| Ex-Black Hat" `[S-15]` | **Large.** Three different noun phrases for the same person; "entrepreneur" was added by the machine |
| 3 | Estonian eID + anti-fraud depth as the niche `[S-05]` `[S-01]` | AI reproduces the niche accurately (Smart-ID/eID, BotGuard, fingerprintproxy, Zero-Trust Octagon) `[S-21]` | **Small — this one lands.** The machine-facing layer works |
| 4 | Award-level recognition (Presidential Hackathon, Fellin Häkk, AI GovTech) `[S-15]` | AI lists all three `[S-21]`; the one press article about them still opens with the conviction `[S-12]` | **Medium.** Facts propagate; framing does not improve |
| 5 | Disclose responsibly, report to vendors and authorities first `[S-05]` | AI: "Abel is transparent about this criminal background" `[S-21]` — it noticed the transparency, and sourced the law from one article rather than his disclosure record | **Large.** The disclosure record is the strongest trust asset he owns and it is not the asset being read back |
| 6 | "Cyber-Kratt" as a company/role label `[S-15]` | AI run 1 called it his moniker; the label has no external definition anywhere `[S-28]` | **Medium.** A label with no referent is a leak, not an asset |
| 7 | Company: ProksiAbel OÜ as publisher/employer (org schema, About, LinkedIn) `[S-05]` | Registry says EMTAK 69201 "Auditing", two years of zero revenue, VAT expired, a deletion banner `[S-26]` | **Contradictory.** The entity carrying the brand may be dormant while also being the structured-data publisher |

**The single-line delta.** Machines and press have absorbed his *history* accurately and his *work*
partially; neither has absorbed the *idea*. Perception is biographically correct and intellectually
empty — and the biography is the half he cannot win on.

---

## 4. Diagnosis — the five things that matter, in order

1. **Decide what he is, in one sentence, and delete the other three.** Naming a primary role
   (researcher-first) and a primary audience is prerequisite to everything in phases 4–7. The
   contradiction is not stylistic: About says CTO at MATx, LinkedIn says founding engineer of
   ProksiAbel, GitHub says authentication security researcher, and schema says both.
2. **Move the fault-line idea from one page to every surface.** It is the only differentiated claim
   the corpus supports and the only one no peer can copy. Today it exists in a pull-quote.
3. **Fix the About page last mile.** Two defects live on the page the essays link to as canonical:
   the surviving "disclose responsibly" claim, and the uncorroborated MATx CTO title. One edit closes
   both.
4. **Give the person an image and refresh the social card.** A 10 Aug OG image that predates the
   design system, and no portrait at all, on a brand whose whole differentiator is being a person.
5. **Make the proof layer the visible one.** The site already contains the hardest evidence in the
   field: hash-verifiable article text with detached PGP signatures (7 of 19 pages), dated corrections
   changelogs, per-page disclosure status with named recipients, and a live PGP key with WKD. Coverage
   is the problem, not existence: extend the signed set to all research pages, add one **disclosure
   ledger** (finding → recipient → date → outcome) that links each page's status, and put the whole
   thing where a reader meets it — this is the only claim on the site a regulated buyer can verify
   without trusting him.

---

## 5. What phase 3 inherits from this audit

Every one of these is already a row in `00-evidence/gaps.md`, now with a score attached:

| Gap | Audit dimension | Why phase 3 must settle it |
|---|---|---|
| G-7 Which audience is primary | D5 2/5, D1 2/5 | Determines the positioning sentence and the whole messaging hierarchy |
| G-9 Past as context or pillar | D3, D6 | Decides whether the arc keeps occupying the lead |
| G-3 What "Cyber-Kratt" is | D1, D6 | An undefined label cannot stay in the headline |
| G-4 Company live or dormant | D1, D3, D6 | The schema and the About page both treat it as his employer/publisher |
| G-6 Verify MATx CTO, "design partners", 65 profiles | D3 | Four claims already circulating as fact |
| G-1 Strongest new verifiable asset | D6 | The only move that changes third-party framing |

Unchanged from phase 1: **phase 3 needs him**. The audit deliberately does not fill these gaps with
sensible guesses, because a positioning built on a guess is the failure mode this whole program was
designed to avoid.
