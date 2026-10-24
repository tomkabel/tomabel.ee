# 03 — Positioning: Tom Kristian Abel (personal brand)

**Skill:** `brand-positioning` (library `arnabbagxd/brand-building-skills`, read from
`.agents/skills/brand-positioning/SKILL.md`), run in evidence mode.
**Phase:** 4 of `docs/brand/personal-brand-program.md`. **Written:** 2026-10-24.
**Evidence basis read for this document:** `.agents/brand-context.md`; `docs/brand/decisions.md`;
`docs/brand/01-audit.md`; `docs/brand/00-evidence/source-register.md`;
`docs/brand/00-evidence/statements-and-quotes.md`; `docs/brand/00-evidence/extracts/S-21-ai-answer.md`.

**Live re-check before writing.** The register snapshots and the phase-2 audit were captured earlier
on 2026-10-24. Each surface claim inherited from the audit was re-verified against the live repository
before it was used in the proof table, and one has moved: commit `51c74cf` reconciled the MATx title
on the About body, so the claim is no longer contradictory, but its only record remains the company's
own document, which keeps it out of the proof column.

**Citation rule.** Every factual or self-descriptive claim carries an `[S-nn]` reference into
`00-evidence/source-register.md`, or is marked `[unverified → needs Tom]`. Competitors are described
at archetype level: the register carries no verified claims about named individuals, and `G-6`
requires an artefact before a claim about anyone enters an output. The named peer set is phase 6 work
(`09-peers.md`).

**Phase-4 acceptance condition:** the positioning must name a territory narrower than "security
researcher" (`personal-brand-program.md` §Phase 4; the standing critique quoted from
`identity-reframing`). §07 satisfies it, and §08 shows where the current framing fails it.

---

## 01 — CATEGORY DEFINITION

### Stated category

What the brand says it is today, verbatim, across four surfaces that do not agree: "Systems architect
and security researcher" (`[S-05]`), "Authentication security researcher" (`[S-17]`), "Founding
Engineer | Cyber-Kratt | Ex-Black Hat" (`[S-15]`), and, generated from those, "cybersecurity
researcher, systems architect, and entrepreneur" plus "founder and principal engineer of ProksiAbel
OÜ" (`[S-21]`). Four noun phrases, no category. The audit scores this at 2/5 and identifies the
problem precisely: "could this positioning statement apply to a competitor? Yes" (`01-audit.md` §2 D1).

### Actual category

What a reader actually compares him against when deciding whether to spend attention:

| Compared against | Why the comparison happens | Evidence |
|---|---|---|
| A vendor's assurance claim for the same control | 13 of 19 articles recommend server-side traffic verification, which is his own product category, and the review found the conflict undisclosed on them | `[S-02]` |
| An academic paper on Estonian eID or authentication | The subjects are academic subjects, and the audience that reads them expects a method and a limit | `[S-01]`, `[S-17]`, `[S-20]` |
| A CERT or vendor advisory | The disclosure pattern is the advisory pattern, with named recipients and dates | `[S-01]`, `[S-07]` |
| A general security commentator | The category a stranger defaults to, and the one the AI answer partly produced | `[S-21]` |
| A hiring candidate or a consultant | The category the on-site role claims and the LinkedIn titles occupy | `[S-05]`, `[S-15]` |

The AI answer is the clearest evidence that the actual category is contested: it modelled him as a
researcher with a work list, an entrepreneur with a company, and a person with a case, and it used all
three in one answer (`[S-21]`). Press models him in one category only, and it is the case (`[S-12]`).

### Opportunity category, and the recommendation

**Recommendation: claim the category by its subject, not by the profession.** The category is the
study of what a system actually verifies: the claim layer under authentication, anti-fraud and
attestation. Calling it research is accurate and keeps the peer audience; calling it cybersecurity
invites the commentary comparison; calling it consulting invites the agency comparison. The phrase to
hold is the one he already wrote and that appears on exactly one page today: the gap between what a
system claims to verify and what it actually verifies (`[S-05]`, Q-07). Category language, in the
order it should be used: **verification-claim research**, then authentication-security researcher as
the professional noun, then the concrete subjects (eID, anti-fraud, browser attestation).

`[ASSUMED]` This is a naming recommendation inside a category that has no established label. If the
category phrase does not survive contact with the audience in the first three conversations, the
fallback is the plain descriptive branch ("authentication-security researcher who tests verification
claims"), which is less ownable and still consistent with every proof point in §05.

---

## 02 — COMPETITIVE LANDSCAPE MAPPING

**Axis 1: how much of the fault line is held at once.** One lane of depth (a single protocol, a single
product class, a single attacker family) on the left, the whole claim layer on the right, from
identity protocols through client-side anti-fraud to browser attestation.

**Axis 2: how the authority is carried.** Authority asserted through position, employer, funding or
volume on the left, authority carried by artefacts a reader can check independently on the right.

| Archetype | Where it sits | Territory it owns | Its structural limit |
|---|---|---|---|
| Academic authentication and eID researchers | Left on axis 1, right on axis 2 | Priority, peer review, method rigour | Written for other academics; slow, and rarely readable by the engineer who has the failing control |
| Anti-bot and anti-fraud research community, including vendor-funded labs | Left on axis 1, middle on axis 2 | The attacker model and the control taxonomy for their own category | Commercial interest shapes what can be questioned, which is the exact gap his SoK work occupies (`[S-17]`) |
| Well-known independent reverse engineers | Middle on axis 1, right on axis 2 | Method transparency, personality-led following | Not national-infrastructure specific, and their brand is usually built on volume of output rather than on a disclosure record |
| CERT teams and vendor advisory channels | Middle on axis 1, far right on axis 2 | Institutional authority and the fix | Institutional voice: it publishes the outcome, not the researcher's method, and it cannot be a person |
| General cybersecurity commentators | Left on axis 1, far left on axis 2 | Reach, explainers, attention | No artefact to check; the category the brand explicitly declines (`02-audience.md` §05) |
| Consulting firms selling security architecture | Middle, left | Delivery capacity and procurement comfort | No public research record, and no reason for a hostile reader to trust the claim |

**Where this brand sits.** Right on both axes relative to almost everything in the field, and last in
recognition. The method is public and star-ranked (`[S-17]`), the disclosure record is dated and named
(`[S-01]`), the article text is signed and hash-checkable on 7 of 19 pages (`[S-02]`), and the
subjects are national infrastructure rather than a vendor's product class (`[S-01]`, `[S-21]`). The
countervailing fact is the audit's D6 finding: "zero third-party sources frame him by any of it", with
press leading on the conviction even in the award story and the AI answer leading with the arc
(`01-audit.md` §2 D6; `[S-12]`, `[S-21]`).

**What is unclaimed.** The upper-right quadrant held by a person rather than an institution, with a
national-infrastructure specialism and a reporting habit that runs through official channels. Nobody
in the archetype table holds breadth, checkable receipts, national specificity and the arc at the same
time. That combination, not depth in any single lane, is the territory (`.agents/brand-context.md` §8).

---

## 03 — POSITIONING TERRITORY

**The space.** The claim layer: the distance between what a system says it verifies and what it
verifies, examined at the level where the claim is actually implemented (`[S-05]`, Q-07; `[S-01]`).

**The audience owned.** The security engineers, anti-fraud teams and national-identity operators who
have to prove that a system verifies what it claims, ranked research community first, Estonian public
sector second, hiring third (`G-7`).

**The competitive moat, stated without inflation.** The moat is not skill, and any positioning built
on skill is a table stake in a field of skilled people (`.agents/brand-context.md` §2;
`01-audit.md` §2 D6). It is a combination that cannot be assembled quickly: receipts that are
historical rather than repeatable (a dated disclosure timeline with named recipients across 18 pages,
signed and hash-verifiable article text, dated corrections, `[S-01]`, `[S-02]`, `[S-07]`), an
opcode-level finding inside a production anti-fraud system rather than a demonstration against a
test target (`[S-01]`), and an arc that a competitor cannot adopt because it is a lived history rather
than a claim (`[S-06]`, `[S-12]`).

**Two honest weaknesses inside the moat.**

1. Part of the production evidence is unverifiable from outside: 11 of the repositories the site
   lists are not public, and the production platforms named on `/systems` cannot be inspected
   (`[S-23]`, `[S-07]`). A moat that a reader cannot check is a claim, not a moat.
2. The publisher node is unresolved: the company that appears as publisher and employer of record has
   a deletion banner in the registry, two years of zero revenue and an expired VAT registration
   (`[S-26]`), and a deletion notice has now been reported (see §00 of `01-personal-brand-strategy.md`).
   `G-4` keeps the company in the schema and on About, which makes `P-1` a moat dependency rather than
   a paperwork item (`decisions.md` §G-4).

---

## 04 — POSITIONING STATEMENT

### Primary, in the skill's format

> For security engineers, anti-fraud teams and national-identity operators who have to prove that a
> system verifies what it claims, Tom Kristian Abel is the authentication-security researcher who
> audits the claim itself at the opcode, protocol and browser layer, because the finding arrives with
> named recipients, dates and text that a reader can verify without trusting him.

Every clause is evidenced: the audience is `G-7`; the fault line and the layer are his own
(`[S-05]`, Q-07; `[S-01]`, `[S-17]`); the receipt clause is the disclosure record (`[S-01]`) plus the
signed, hash-verifiable text on 7 of 19 pages (`[S-02]`). The last clause is doing the strategic work:
it converts the positioning from a claim about him into a property of the artefact.

### Strategic version (internal use, more candid)

> This is the verification-claim auditor. He tests what authentication and anti-fraud systems
> actually verify, publishes the test with the receipts attached, and is therefore the only person in
> the category whose work a regulated reader can check without trusting him. The differentiator is
> not depth, which everyone in the peer set has, and not the arc, which only he has but which the
> risk gate keeps off every surface except one (`[S-01]`, `[S-02]`, `[S-17]`, `G-2`, `G-9`).

### Human version (public-facing, one person speaking)

> I test what a system claims to verify, and I publish what I find so you can check it yourself.

---

## 05 — POSITIONING PROOF POINTS

Five proofs, each with the check a hostile reader can run. A proof that cannot be checked is not
listed here; the claims that fail that test are listed immediately afterwards.

| # | Proof | Status | The check a reader runs |
|---|---|---|---|
| 1 | Canonical article text with a detached PGP signature and a committed SHA-256, hashed in-browser, with CI failing if text and hash drift, on 7 of 19 pages | verified (`[S-02]`; `01-audit.md` §1) | Open the page's proof card, run `gpg --verify` on the `.asc`, compare the hash |
| 2 | Coordinated disclosure with named recipients and dates: SK ID Solutions November 2025, then RIA, TTJA and AKI April 2026, with per-page status including the honest negative | verified (`[S-01]`, `[S-07]`) | Read each page's disclosure block, and `llms.txt`, which carries the negative case |
| 3 | A public, star-ranked method: the client-side anti-automation study under VLM-based attack, 104 stars and 19 forks | verified, GitHub API 2026-10-24 (`[S-17]`) | Open the repository, read the README, count the stars |
| 4 | A finding at the opcode level inside a production anti-fraud VM, published with its limit stated | verified as published (`[S-01]`; the review grades its figures and attribution fixed, `01-audit.md` §1) | Read the article and its named publisher for each figure |
| 5 | Browser-fingerprinting tooling at 72 profiles, understated as "65+" in current site copy | verified (`[S-17]`, `G-6`) | Read the repository's own profile list |

**Held as pending, not proven.**

- The talk: a Track B submission to 40C3, submitted 2026-10-09, pretalx code LU8GWS, notification
  3 November 2026 (`[S-33]`). It becomes a proof point only if accepted. `G-1` makes it the next
  third-party frame-changer, which is why the 90-day plan is built around that date.
- The awards: Presidential Hackathon OpenAI Special Award May 2026, Fellin Häkk first place February
  2026, AI GovTech second place June 2026, all founder-asserted and press-corroborated once
  (`[S-15]`, `[S-12]`). Usable with that qualifier, never as institutional recognition.

**Claims that must not be used as proof, with the reason.**

| Claim | Why it fails |
|---|---|
| The MATx role as a proof point | The wording was reconciled to "Co-Founder and CTO" on 2026-10-24 (`G-6`), so it no longer contradicts its record, but the only record is the company's own document and a reader cannot check it (`P-3` satisfied on About; live check 2026-10-24) |
| "Design partnerships" | No artefact behind it (`[S-21]`; `.agents/brand-context.md` §7) |
| "Principal engineer" | Generated by the AI answer, not by any document he controls (`[S-21]`) |
| Anything about Proksimity's commercial state | No public artefact, and the category carries a conflict-of-interest finding (`[S-02]`; `.agents/brand-context.md` §7) |
| Any aggregate disclosure claim in the "always disclosed responsibly" form | Found unsupported where the review checked, and still live in softer form on About (`[S-02]`, Q-22; `[S-05]`) |
| ORCID as a scholarly identity | The record exists with zero works and zero affiliations (`[S-20]`) |
| A speaker record | No talk, abstract or published speaker bio was found in this pass or the prior one (`[S-29]`, `[S-23]`) |

---

## 06 — WHAT THIS BRAND REFUSES TO BE

Each refusal names the opportunity it declines, so a later phase can see the cost and not just the
rule. These extend, and do not replace, the refusals already recorded in `.agents/brand-context.md` §4.

- **Not a redemption story that needs to be retold on every surface.** Declines: the interview and
  panel circuit, which pays in attention and charges in framing. The arc is owned once, on one page,
  and everything else links to it (`G-2`, `G-8`).
- **Not an available identity label.** Declines: the fastest available differentiation, which is also
  the framing a regulated reader's diligence is built to reject (`decisions.md` §G-9; the labels are
  named in `.agents/brand-context.md` §6).
- **Not a general "I build secure systems" consultant.** Declines: agency-shaped engagement language,
  the procurement comfort it buys, and about half the available inbound work. It is a table-stake
  claim (`01-audit.md` §2 D1).
- **Not a product pitch wearing research clothes.** Declines: the funnel use of the research and any
  sentence about the product's commercial state. The disclosure line stays on everything that
  recommends the category his company builds in (`[S-02]`, `G-5`).
- **Not an authority without receipts.** Declines: the aggregate credential sentence, the trust-me
  paragraph, and the experience total. An unsupported credential next to a genuine disclosure record
  cheapens the record (`[S-02]`, `[S-05]`, Q-22).
- **Not a threat-news commentator.** Declines: reach, frequency and the general audience. Serving them
  would dilute the only audience the verifiable work serves (`02-audience.md` §05).
- **Not an expert who quotes the officials from his own case.** Declines: borrowed institutional
  credibility, at the cost of naming private individuals, which gate 4 forbids
  (`[S-10]`, P-03; `personal-brand-program.md` §6).
- **Not a vendor endorsing himself through a dormant entity.** Declines: the company as the brand's
  authority node until `P-1` resolves (`G-4`, `[S-26]`).

---

## 07 — POSITIONING IN ONE SENTENCE

> Tom Kristian Abel researches what authentication and anti-fraud systems actually verify, then
> publishes the finding so it can be checked without trusting him.

23 words. It names the subject (authentication and anti-fraud systems), the narrower idea (what they
*actually* verify), the trade (research and publication rather than advisory work), and the property
that no competitor in §02 offers in combination (checkable without trust). The territory is the claim
layer, which is narrower than "security researcher", satisfying the phase-4 acceptance condition
(`personal-brand-program.md` §Phase 4).

---

## 08 — POSITIONING RED FLAGS, APPLIED TO THIS BRAND

The skill lists four red flags. Applied honestly, two are closed by this document and two remain open.

- **"Positioning that could apply to any competitor in the category."** The current framing fails this
  test outright: "systems architect and security researcher" fits any senior practitioner
  (`[S-05]`, `01-audit.md` §2 D1). The replacement passes it only because of the receipts clause, and
  the receipts are the asset, not the words. If a later phase drops that clause to make the sentence
  shorter, the red flag returns.
- **"A target audience too broad to own."** Closed by `G-7` and by the explicit refusals in
  `02-audience.md` §05. The prior state ("the brand is speaking to at least three audiences with one
  voice and no separation", `01-audit.md` §2 D5) is the failure this fixes.
- **"A differentiator that is a table stake."** Excluded by construction: depth, method and skill are
  all table stakes in this peer set and are not claimed as the difference
  (`.agents/brand-context.md` §2; `[S-17]`).
- **"Positioning the brand cannot substantiate with proof points."** Partly open.
  - The research and receipt proofs substantiate (proofs 1 to 5 above).
  - The production and employment side does not: 11 site-listed repositories are not public, the
    production platforms are not inspectable, and the title, though now internally consistent, rests
    on the company's own document (`[S-23]`, `[S-07]`, `G-6`).
  - The entity that publishes the research may be dissolving (`G-4`, `P-1`, `[S-26]`).
- **A fifth red flag specific to this brand, which the skill's list does not cover.** A positioning
  can be correct and still change nothing about the first impression, because third-party framing is
  carried by whatever is newest and largest. Press still leads with the 2024 case even in the award
  story (`[S-12]`), and the AI answer leads with the arc (`[S-21]`). Until the talk outcome
  (3 November, `[S-33]`) or a receipted disclosure lands, this document describes the position the
  brand will occupy, not the position the market already perceives. `G-1` is therefore a dependency of
  the positioning, not a separate marketing task.

---

## Sources used in this document

`[S-01]` tomabel.ee disclosures corpus · `[S-02]` `tomabel-disclosures-review.md` ·
`[S-05]` `src/content/site.ts` · `[S-06]` `MyStoryPage.tsx` · `[S-07]` machine-facing and secondary
surfaces · `[S-10]` Postimees, 20.11.2024 · `[S-12]` Geenius DigiPRO, 13.05.2026 ·
`[S-15]` LinkedIn profile `in/hr-abel` · `[S-17]` GitHub `tomkabel` · `[S-20]` ORCID ·
`[S-21]` AI-answer snapshot · `[S-23]` `findings.md` · `[S-26]` ProksiAbel OÜ registry findings ·
`[S-29]` speaker and CFP record · `[S-33]` 40C3 submission pack.

Decision records used: `G-1`, `G-2`, `G-4`, `G-5`, `G-6`, `G-7`, `G-8`, `G-9`, `P-1`, `P-3`
(`docs/brand/decisions.md`).
