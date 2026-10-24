# 01 — Personal brand strategy: Tom Kristian Abel

**Skill:** `personal-brand` (library `arnabbagxd/brand-building-skills`, read from
`.agents/skills/personal-brand/SKILL.md` because the loader refuses the name), executed in evidence
mode as required by the `brand-strategy-development` skill ("Rule 0: evidence before adjectives").
**Phase:** 4 of `docs/brand/personal-brand-program.md`. **Written:** 2026-10-24. **Author:** Hermes
subagent, phase 4.
**Evidence basis read for this document:** `.agents/brand-context.md`; `docs/brand/decisions.md`;
`docs/brand/01-audit.md`; `docs/brand/00-evidence/source-register.md`; `docs/brand/00-evidence/statements-and-quotes.md`;
`docs/brand/00-evidence/gaps.md`; `docs/brand/personal-brand-program.md`; the four library skills named
in the plan.

**Live re-check before writing (discipline: never inherit a prior critique's verdict).** The register
snapshots and the phase-2 audit were captured earlier on 2026-10-24, and two commits landed after
them on the same day. Every surface finding inherited from the audit was re-verified against the live
repository, and this document states the current state, not the pre-fix state. Two audit findings are
now closed: commit `51c74cf` replaced the About disclosure overclaim and reconciled the MATx title,
and commit `6d045db` (6 October 2026) stopped `/systems` linking private repositories. One instance of
the same class of claim survives, and it is recorded below as a live finding rather than an inherited
one.

**Citation rule.** Every factual or self-descriptive claim carries an `[S-nn]` reference into
`00-evidence/source-register.md`, or is marked `[unverified → needs Tom]`. A claim line without a
source is a defect, not a judgement call. Claims that came from `decisions.md` cite the decision ID
(`G-n`, `P-n`) because the decision record, not the register, is their owner.

**What this document is not.** It is not publication copy. It is the frame that phases 5 to 7 write
copy from. No sentence about the 2024 case is authored here: decision `G-2` locks the wording, one
review is pending, and this document references the lock instead of adding a fifth variant
(`decisions.md` §G-2). No em dash appears in the prose I wrote, per the brand's own measured rule
(`.agents/brand-context.md` §6).

---

## 00 — Assumptions carried, and what this document refuses to guess

The skill's hard rule is to pre-commit defaults and flag assumptions rather than block on questions.
Four assumptions are load-bearing here. Each is falsifiable and each names what would falsify it.

| # | Assumption | Basis | Falsified by |
|---|---|---|---|
| A-1 | The arc is led as a noun-phrase disclosure on one page, never as an identity label | `G-9` picks the arc as pillar; the risk gate converts `G-9` into a wording discipline (`decisions.md` §"The tension the picks create") | any owned copy that uses a forbidden label, or a second wording of the episode |
| A-2 | The person is the master brand and ProksiAbel OÜ is not load-bearing | `G-4` keeps the company as publisher and employer, with prerequisite `P-1` (`decisions.md`) | the registry check showing the company is mid-deletion, which would make every "we/our" sentence wrong on a schedule |
| A-3 | Persona material in `02-audience.md` is constructed archetype, not audience research | No interview, survey, review or support data about his readers exists anywhere in the corpus (`source-register.md`; `00-evidence/gaps.md`) | three peer conversations, which would replace the archetypes with quotes |
| A-4 | Nothing is built on register rows that were not read | `S-27` `registry-only`, `S-31` `snippet`, `S-32` `snippet` (`source-register.md`) | reading those rows; until then they appear in this document only as things that exist and cannot be quoted |

One constraint was stated at briefing rather than read from the register: a deletion notice for
ProksiAbel OÜ has been published in Ametlikud Teadaanded (reported 2026-10-24). That supersedes the
line "no public deletion notice found" in `[S-26]`, which was itself marked `needs-proof` there.
`[unverified → needs Tom: add the Ametlikud Teadaanded notice as a register row and date the check]`
Until that row exists, this document treats `P-1` as blocking, which is stricter than `G-4` assumed.

---

## 01 — PERSONAL BRAND FOUNDATION

### Brand statement (internal clarity tool, not a bio)

> For security engineering, anti-fraud and national-identity teams who have to prove that a system
> verifies what it claims, Tom Kristian Abel examines the claim itself at the opcode, protocol and
> browser layer, and publishes what he finds with named recipients, dates and signed text.

Derived, not invented. Every clause maps to evidence: the audience is `G-7` (research and engineering
first, Estonian public sector second, hiring third); "examining the claim itself" is the fault-line
idea in his own words (`[S-05]`, quoted as Q-07 in `statements-and-quotes.md` §2); the layer is his
published method, opcode-level work on a production anti-fraud VM and protocol work on national eID
(`[S-01]`, `[S-17]`); the publication habit is the per-page disclosure record with named recipients
and dates across the disclosures corpus (`[S-01]`, `[S-07]`), plus the hash-verifiable, PGP-signed
article copies on 7 of 19 pages (`[S-02]`).

### Zone of authority

Three things intersect, and the intersection is the territory:

- **What he knows deeply:** authentication and anti-fraud internals rather than their marketing
  layer. A published SoK on client-side anti-automation under VLM-based attack with 104 stars and 19
  forks (`[S-17]`), opcode-level reverse engineering of a production anti-fraud VM (`[S-01]`), and
  protocol work on Estonian eID and Smart-ID (`[S-01]`, `[S-21]`).
- **What he has lived:** both sides of the fault line, in public and under his own name. His own
  account of that arc is on one page (`[S-06]`); the current LinkedIn About carries the weak form of
  it and two entries that the risk gate forbids (`[S-15]`, `statements-and-quotes.md` §1.2).
- **What he believes differently:** that the interesting failure is never the cryptography but the
  distance between a claimed verification and a real one, and that the value of a breaking skill
  lies in its direction rather than its existence (candidates B-1 and B-2, derived from Q-05, Q-07,
  Q-18, Q-19 in `statements-and-quotes.md` §5).

**Stated honestly:** skill depth is not the differentiator (`.agents/brand-context.md` §2, and the
audit reaches the same conclusion at D6, "zero third-party sources frame him by any of it",
`01-audit.md` §2 D6). The territory is the *combination* held at once: the fault line as the
organising idea, the opcode-and-protocol method, the national-infrastructure specificity, and the
receipt habit. Any one of those is common in the field.

### The one thing

> If someone remembers one thing about him, it should be this: he checks the claim a system makes,
> and you can check his.

Both halves are evidenced. The first is the fault-line idea (`[S-05]`, Q-07). The second is the
one asset the audit called "the most credible thing on the site" and "under-deployed": canonical
article text with a detached PGP signature and a committed SHA-256, verifiable in the browser, on 7
of 19 pages (`[S-02]`), plus dated corrections changelogs (`01-audit.md` §1).

### Role discipline: one primary noun

The audit's D1 score of 2/5 is caused by four live self-descriptions that disagree (`01-audit.md` §2
D1): site tagline "Systems architect and security researcher" (`[S-05]`), About "Lead Systems
Architect and CTO at MATx" (`[S-05]`), LinkedIn headline "Founding Engineer | Cyber-Kratt |
Ex-Black Hat" (`[S-15]`), GitHub "Authentication security researcher" (`[S-17]`), and a fifth
framing generated from the others ("founder and principal engineer of ProksiAbel OÜ", `[S-21]`).

**Decision for the strategy:** the primary noun is **authentication-security researcher**, because
it is the only framing (a) already published on a surface a peer reads (`[S-17]`), (b) corroborated
by the register's strongest verified facts (`[S-01]`, `[S-17]`, `[S-02]`), and (c) consistent with
`G-7`'s audience order. Everything else becomes supporting detail in a fixed order:

1. **Researcher** (primary noun, leads every surface).
2. **Current employed title** (secondary, one fixed wording; `P-3` is satisfied on the About body as
   of 2026-10-24, which now reads "Co-Founder and CTO at MATx (matx.ee)", matching MATx's own
   documents; the schema `jobTitle` should be verified against it).
3. **Publisher/employer of record** (a footer-level fact, never the lead; blocked on `P-1`).
4. **"Cyber-Kratt"** (a defined working name, `G-3`; see §10).

Consequences the later phases inherit: the site tagline and the `index.html` meta framing change
(`[S-05]`); the LinkedIn headline loses both "Founding Engineer" as the lead noun and the forbidden
label, which is now the largest remaining self-description conflict, since the About body has been
reconciled while the profile has not (`[S-15]`, live check 2026-10-24); the AI answer's "entrepreneur"
noun is not adopted, because no artefact supports it (`[S-21]`, `G-6`).

---

## 02 — AUDIENCE DEFINITION (summary)

Full definition, personas and language notes: `02-audience.md`. In one line, the order is decided,
not proposed: **research and engineering first, Estonian public sector and regulators second,
hiring and client-side partners third** (`G-7`). Deliberately not served: the general cybersecurity
audience, the phishing-tooling market that produced the 2024 record, and buyers of a product that
does not publicly exist (`.agents/brand-context.md` §3).

---

## 03 — POSITIONING AND DIFFERENTIATION (summary)

Full work, category definition, competitive map, proof points and refusals: `03-positioning.md`.
The territory in one line: **the researcher who audits the claim a system makes about what it
verifies, and publishes the audit as a checkable artefact.** That is narrower than "security
researcher", which is the phase-4 acceptance condition and the standing critique the plan quotes
from `identity-reframing` (`personal-brand-program.md` §Phase 4).

---

## 04 — POINT OF VIEW

The corpus supports exactly four beliefs, and no more (`statements-and-quotes.md` §5). Each is
stated the way he states it, with the evidence behind it, the conventional wisdom it challenges, and
the limit on it. Beliefs the corpus does not support are named at the end, so they cannot be
smuggled in later as "tone".

### B-1 — The interesting failure is not the cryptography. It is the distance between a claimed verification and a real one.

- **Evidence:** the fault-line sentence in his own copy (`[S-05]`, Q-07); the same structure in the
  Smart-ID and BotGuard findings (`[S-01]`); the passkey checklist that turns the idea into three
  questions a reader can ask a vendor (`[S-15]`, Q-19); his formulation of the asymmetry, "defenders
  measure their strongest path and attackers use the weakest one" (`[S-15]`, Q-18).
- **Why most people do not say it:** the market talks about controls and compliance, and both are
  claims about intent rather than tests of behaviour. Vendor research has a structural reason not to
  put a customer's claim under the microscope.
- **Why he can say it:** a published, star-ranked method for testing such claims (`[S-17]`), an
  opcode-level finding inside a production anti-fraud system (`[S-01]`), and a public record of
  having been on the exploiting side of the same gap (`[S-06]`).
- **Status and limit:** `founder-asserted` as a stated position, `verified` as a method. The belief
  is a claim about systems, not about himself, which is why it is the safest to lead with.

### B-2 — The value of a breaking skill is in its direction, not its existence.

- **Evidence:** three independent tellings, two of them his own words (`[S-06]`, Q-01, Q-04, Q-06),
  and one quoted by press in 2026 (`[S-12]`, Q-11). The kratt gloss (Q-10, `[S-15]`) is the same
  idea in a folk metaphor he keeps reusing.
- **Why most people do not say it:** the field's two loudest scripts are redemption and
  condemnation. Both make the skill itself the subject, and neither one is usable by a person who
  intends to keep working.
- **Why he can say it:** he has the record, the site states it once (`[S-06]`), and the press already
  quotes him saying it (`[S-12]`).
- **Status and limit:** this is the belief that `G-9` promotes to a pillar, and it is also the one
  the risk gate constrains hardest. It may be argued in prose; it may not be carried by a label
  (`decisions.md` §"The tension the picks create"). One page owns it; every other surface links
  (`G-8`).

### B-3 — Client-side anti-fraud that cannot survive an operator-synthesising attacker is a promise, not a control.

- **Evidence:** the SoK manuscript and repository on client-side anti-automation under VLM-based
  attack (`[S-01]`, `[S-17]`), and the fingerprinting work in `fingerprintproxy` (72 profiles,
  `[S-17]`).
- **Why most people do not say it:** it is uncomfortable for the vendors selling client-side
  signals, and it requires having actually attacked one.
- **Why he can say it:** the artefact exists and is public (`[S-17]`).
- **Status and limit:** strong, but technical-audience-only, and it collides with the conflict-of-
  interest finding: he runs a company that builds a server-side traffic identity-assurance product,
  and 13 of 19 articles recommend that category without disclosing it (`[S-02]`, `01-audit.md` §1).
  The belief stays, and the mandate is: state the belief, cite the artefact, and carry the Proksimity
  disclosure line on anything that recommends that category (`G-5`, `.agents/brand-context.md` §10.2).
  The manuscript itself stays unpublished until the filing decision resolves (`G-1`).

### B-4 — Disclosure should go to the vendor and the national CERT, not to a buyer.

- **Evidence:** the per-page disclosure records with named recipients and dates, SK ID Solutions in
  November 2025 then RIA, TTJA and AKI in April 2026 (`[S-01]`), and the per-page honesty in
  `llms.txt` including the negative case ("Not reported to Google", `[S-07]`).
- **Why most people do not say it:** the market rewards the person who posts first and loudest, and
  coordinated disclosure produces nothing to post until the vendor moves.
- **Why he can say it:** the record exists, recipient by recipient (`[S-01]`).
- **Status and limit:** a partial liability, in the middle of being fixed. The aggregate claim was
  found unsupported where the review checked (`[S-02]`, Q-22), and on 2026-10-24 two surfaces were
  repaired: the About bio now states the per-disclosure practice instead ("to the vendor and the
  national authority first, record on each page who was told and when"), and the `index.html` meta
  carries the qualified sentence with per-page status in `llms.txt` (live check 2026-10-24, commit
  `51c74cf`; `[S-07]`, `01-audit.md` §2 D3). One instance survives, and it is a live finding rather
  than an inherited one: the homepage intro strip still reads "I disclose what I find, in public, and
  I take responsibility for all of it", which is the same class of unscoped aggregate claim (`[S-05]`,
  live check 2026-10-24). The rest of `G-5` is still owed: the per-disclosure ledger, and after that
  no aggregate claim on any surface.

### Beliefs the corpus does not support, and which therefore cannot be used

- Any belief about the humanitarian or political purpose of security work. It appears once, in an
  interview aside, and nowhere in his published work (Q-13, `statements-and-quotes.md` §5).
- Any claim of institutional authority. There is no externally confirmed employer, academic record
  or talk on record (`[S-20]`, `[S-23]`, `[S-29]`).

---

## 05 — VOICE (summary; the ruled guide is phase 5, `04-voice.md`)

The voice is measured, not described. Over 48,025 words across 17 files it separates into three
registers (`statements-and-quotes.md` §4, raw counts in `00-evidence/raw/voice-stats-2026-10-24.json`):

| Register | Words | Avg sentence | Em dashes /1k | Superlatives /1k |
|---|---|---|---|---|
| 5 essays | 9,248 | 11.2 to 20.5 | 0.00 | 0.00 to 4.4 |
| 10 research drafts | 26,701 | 17.9 to 24.2 | 1.10 to 12.65 | 0.64 to 2.98 |
| `site.ts` copy | 5,769 | 33.7 | 6.07 | 1.56 |
| LinkedIn (profile + 3 posts) | 6,366 | 17.1 | 1.10 | 1.10 |

**Tone, three words:** precise, dry, unsentimental (about systems and about himself;
`.agents/brand-context.md` §6).

**What he never sounds like:** vendor language, motivational prose, performatively humble. The
site copy is currently the least him-like text he owns (longest sentences, most superlatives, most
em dashes), which makes the voice work a copy problem on the marketing surface rather than a
discovery problem (`statements-and-quotes.md` §4, finding 2).

**Rules that carry into phase 5 as prohibitions, not preferences:** write the claim, then the
evidence, then the limit; one "not X, but Y" contrast per piece at most (16 measured occurrences,
densest in the personal essay, `[S-02]` finding #10); no em dashes in prose; no adjectives where a
number exists; no first-person authority the sources do not support; name the disclosure recipient
and the date; state the limit of a finding; credit prior art; write the correction into the page.

**Never:** "ex-black hat", "former hacker", "reformed", "ethical hacker", "passionate about
security", "cutting-edge", "world-class". These are labels he did not choose and the risk gate
forbids them in owned copy (`.agents/brand-context.md` §6; `decisions.md` §G-9).

---

## 06 — PLATFORM STRATEGY

The plan proposed LinkedIn as primary with the site as the owned home (`personal-brand-program.md`
§7, default 3). The evidence points elsewhere, so this document diverges and flags it as `[ASSUMED]`
for Tom to confirm.

**Primary platform: `tomabel.ee` (owned), with the research community reached through conference
submissions and GitHub.** Reasoning from the register, not from preference:

- LinkedIn's measured reach on the live account is small: 244 connections, 36 post impressions,
  14 search appearances over the snapshot window (`[S-15]`). A broadcast channel with double-digit
  impressions cannot carry a research-first audience (`G-7`).
- The audience that the register can actually locate is not on a feed. It is in repositories
  (`[S-17]`: 104 stars, 19 forks on one), in the disclosure record (`[S-01]`), and at conference
  stages, which is exactly where the missing asset sits: no talk, abstract or published speaker bio
  was found in this pass or the prior one (`[S-29]`, `[S-23]`), and the talk-led plan is now
  `G-1` with a 40C3 submission pending a 3 November notification (`[S-33]`).
- The site already ships the machine-facing layer that does the audience work
  (`llms.txt` with per-page disclosure status, Markdown negotiation, JSON-LD; `[S-07]`), and the
  audit scored it as the strongest audience-aware surface the brand has (`01-audit.md` §2 D5).

**Secondary: LinkedIn.** Keep it, fix it, and use it for distribution and for the hiring audience
rather than for the research audience. The first live edit on any surface is the headline and About
(`[S-15]`), because both currently carry forbidden risk-gate entries.

**Proof surface: GitHub.** Three accounts carry his name (`[S-17]`, `[S-18]`, `[S-19]`). The
profile README is the cleanest existing self-description (`[S-17]`), and one archived account still
hosts a license-bypass tool with 39 stars (`[S-19]`, a phase 6 decision).

**Content cadence, realistic for one working person:** one substantial artefact per month (a
disclosure, a research note, or an extended essay), plus one shorter note per fortnight drawn from
work already done. Long-form is where the voice is strongest (`statements-and-quotes.md` §4), and
volume is not the constraint: the disclosures corpus already holds 19 articles (`[S-01]`) with the
hardest evidence in it under-deployed.

---

## 07 — CONTENT PILLARS

Four pillars, each with the evidence that makes it available and the content it produces. The mix
below replaces the skill's consumer default with cadence that one person can hold.

**Pillar 1: The claim layer.** What a system says it verifies against what it verifies, at the
opcode, protocol and browser layer.
Basis: `[S-01]`, `[S-17]`, B-1 above.
Angles: a teardown of one claim in one production system; the three-question passkey test applied
to a named protocol feature (`[S-15]`, Q-19); what an anti-automation vendor measures versus what it
asserts (`[S-17]`); a Smart-ID or eID flow walked at the protocol level (`[S-01]`).

**Pillar 2: The receipts.** The habit that no peer ships: signed text, dated corrections, named
disclosure recipients, an honest negative.
Basis: `[S-02]` (7 of 19 pages hash-verifiable with detached PGP signatures), `[S-01]` (per-page
recipients and dates), `[S-07]` ("Not reported to Google").
Angles: the disclosure ledger published as a page (`G-5`); why an article carries a signature and a
hash at all; a corrections entry written as a post ("what I got wrong, and the date I fixed it");
the negative result published with the same format as the positive one.

**Pillar 3: The arc, told once.** What a skill is, and what direction does to it. This is the pillar
`G-9` promotes, and the pillar with the tightest constraint: it lives on one page, it is referenced
elsewhere by link, and it carries no identity label (`G-2`, `G-8`, `decisions.md`).
Basis: `[S-06]`, Q-01, Q-04, Q-06, Q-10, Q-11.
Angles: the kratt as an argument about task and direction, in his own gloss (`[S-15]`, Q-10); what
changes and what does not when the same skill is pointed at defence (`[S-06]`); a short note on
working with an institution after it has investigated you, which he has already published once in
Estonian (`[S-15]`, Q-21) and which does brand work no bio can do.

**Pillar 4: Both languages, both publics.** Estonian infrastructure read in Estonian, not as a
translated afterthought.
Basis: `[S-05]` (bilingual surfaces), `[S-07]`, `[S-15]` (Estonian posts correcting the national
myth, Q-20), the interleaved disclosure timeline in `llms.txt` (`[S-07]`).
Angles: what the eID disclosure timeline means for an Estonian institution, written for Estonian;
the fraud-figures explainer that reconciles two authorities' numbers (`01-audit.md` §1, fixed in
both languages); a note on what a small country can and cannot verify about its own identity stack.

**Content mix (adapted for one person):**

| Type | Share | Purpose |
|---|---|---|
| Technical or evidential (teardowns, findings, the ledger) | about 40% | Builds authority with the primary audience and is citable |
| Point of view (the fault line, the direction argument) | about 30% | Builds identity and attracts the right readers |
| Personal or arc (one page, plus what it feels like to work this way) | about 20% | Builds trust without re-telling the episode |
| Promotional (a talk, a CFP, a hire conversation, a client-side ask) | about 10% | Drives the one action that changes a third-party frame (`G-1`) |

---

## 08 — BIO VERSIONS (drafts for phase 7)

These are drafts with one hard constraint each, and they carry **no sentence about the 2024 case**.
`G-2` requires one legally reviewed wording; the reviews of both the About sentence and the pending
submission sentence have not landed, so the case sentence attaches only where the reviewed wording
is placed, and phase 7 owns that decision. Estonian versions are phase 7 work
(`personal-brand-program.md` §Phase 7). Every factual claim below is cited; the claims that may not
be reused are listed after the drafts.

**Long bio (about 165 words, third person, for an About page or a speaker profile):**

> Tom Kristian Abel is an authentication-security researcher based in Estonia. He works at one fault
> line: the gap between what a system claims to verify and what it actually verifies. That work runs
> from identity protocols (FIDO2/WebAuthn, eIDAS, Smart-ID) through client-side anti-fraud and
> browser attestation to reverse engineering at the opcode level, which is where his published study
> of client-side anti-automation under VLM-based attack sits. He reports findings to the vendors and
> national authorities responsible for the systems he studies, names who he told and when, and
> publishes his article text with a detached PGP signature and a hash a reader can check in the
> browser. When a finding turns out to be wrong, the correction goes into the page with a date. He
> writes in English and Estonian. ([S-01], [S-02], [S-05], [S-17], [S-07])

**Short bio (about 60 words, for a conference program or a guest post):**

> Tom Kristian Abel is an authentication-security researcher in Estonia. He reverse engineers how
> identity protocols, anti-fraud systems and browser attestation fail, tests what they claim against
> what they verify, and publishes the findings with named recipients, dates and cryptographically
> verifiable text. He reports to vendors and national authorities before publication and writes in
> English and Estonian. ([S-01], [S-02], [S-05], [S-17])

**One-liner (18 words, for social profiles):**

> Authentication-security researcher in Estonia. I test what a system claims to verify, then publish
> the finding with receipts. ([S-05], [S-17])

**LinkedIn headline (11 words):**

> Authentication-security researcher. I test the claim behind the verification. ([S-05], [S-17])

Constraints that apply to all four, and to every later version:

- The current headline's "Ex-Black Hat" and the "Independent Exploitation Researcher" job title must
  not survive into any version (`[S-15]`, `statements-and-quotes.md` §1.2; `.agents/brand-context.md` §6).
- "Cyber-Kratt" may appear in a headline only after the definition is published (`G-3`, §10 below).
- The MATx role may now be named, in the reconciled form only: the About body reads "Co-Founder and
  CTO at MATx (matx.ee)" as of 2026-10-24, matching MATx's own documents (`G-6`; `P-3` satisfied on
  that surface, live check 2026-10-24). The evidence behind the title is still founder-asserted
  (MATx's internal documents rather than a public page), so nothing rests on it.
  `[unverified → needs Tom: register row for the MATx document, and one public surface that states
  the role]`
- The following may not be reused without a fresh artefact: "design partnerships", "principal
  engineer", anything about Proksimity's commercial state, and any aggregate disclosure claim
  (`.agents/brand-context.md` §7; `[S-21]`, `[S-15]`).
- No bio asserts an employer of record as the brand's endorser until `P-1` resolves. The company
  registry view carries a deletion banner and two years of zero revenue (`[S-26]`), and a deletion
  notice has now been reported (§00). A person-first bio avoids the dependency entirely.

---

## 09 — 90-DAY LAUNCH PLAN

Dates are anchored to real events in the register rather than to a generic countdown. The 40C3
notification window closes on 3 November 2026 (`[S-33]`), and prerequisite `P-2` is due before it
(`decisions.md` §Prerequisites).

**Weeks 1 and 2 (to 3 November): clear the blockers.**
- Land the legal review of the single past sentence, using the pending submission wording as the
  candidate, and keep every surface on the current wording until it lands (`G-2`, `P-2`).
- Confirm the registry status of ProksiAbel OÜ and either stabilise it or revisit `G-4` (`P-1`).
  Given the reported deletion notice, plan for the person-first fallback.
- Verify the reconciled MATx title on the surfaces that still disagree: the About body was fixed on
  2026-10-24, so this is now schema plus the LinkedIn headline (`P-3` satisfied on About; live check).
- Finish the `G-5` copy fix: the About instance is gone (2026-10-24), the homepage instance is not,
  so replace "I disclose what I find, in public, and I take responsibility for all of it" with the
  per-disclosure practice wording the About bio now uses (`[S-05]`, `[S-02]`, live check 2026-10-24).
- Draft the Cyber-Kratt definition for phase 5 publication (`G-3`, `P-4`).
- Check the handle and alias sweep result against the surfaces about to be rewritten, since the
  sweep has now run and found an ambiguous handle that must not be asserted in brand copy either way
  (`[S-34]`); the remaining half of `G-8` is the one-owner-one-place rule.
- Measure: nothing publishes; the completion signal is four decisions closed, not four posts.

**Month 1: fix the surfaces that contradict the strategy.**
- Rewrite the LinkedIn headline and About to the researcher-first framing, dropping both forbidden
  entries (`[S-15]`).
- Align the site tagline, `index.html` framing and schema `jobTitle` with the primary noun
  (`[S-05]`, `[S-07]`).
- Add a portrait and refresh the social card: the OG image is dated 10 August and predates the
  October design system, and no portrait exists anywhere on the site, on a brand whose differentiator
  is being a person (`01-audit.md` §2 D2, §4 item 4).
- Extend the signed set: hash-verifiable, PGP-signed article copies exist on 7 of 19 pages, which is
  the hardest evidence the brand owns (`[S-02]`; `01-audit.md` §4 item 5).

**Month 2: publish the receipt layer and the first external asset.**
- Build and publish the disclosure ledger as a page: finding, recipient, date, outcome, linking each
  article's status (`G-5`). The per-page records already exist, so this is aggregation, not new
  research (`[S-01]`, `[S-07]`).
- Publish the Cyber-Kratt definition (`G-3`).
- Act on the 40C3 outcome: if accepted, the talk is the first new third-party frame-changer and its
  bio uses the reviewed sentence; if not, resubmit to the next target from the existing submission
  packs (`[S-33]`, `G-1`).
- Start one disclosure aimed at a second public receipt, since `G-1` pairs the talk with one
  disclosure that carries a vendor or CERT receipt.

**Month 3: measure and decide.**
- Re-run the phase-2 perception instruments: the AI-answer snapshot with the same query (`[S-21]`)
  and another SERP attempt, recording a failure honestly if the channel is still blocked (`[S-22]`).
- Check the 3-month goal: does any third-party source describe him by his work rather than only by
  the 2024 case (`.agents/brand-context.md` §9)? Before: zero such sources, press leads with the
  conviction (`[S-12]`), the AI leads with the arc (`[S-21]`).
- Decide the 12-month goal check: one accepted talk and one disclosure with a public receipt
  (`G-1`), and whether the brand's own surfaces now agree on one identity (`[S-05]`, `[S-15]`,
  `[S-17]`).
- Review which pillar produced reader response. There is no audience data today (A-3), so the first
  measurement is also the first audience research.

---

## 10 — The "Cyber-Kratt" definition (decision G-3)

`G-3` keeps the label public and requires a definition: "what it means, why the name, what it is
not. It cannot stay an undefined label in a headline" (`decisions.md` §G-3). The definition below is
the strategy's specification; phase 5 (`P-4`) authors the published copy and phase 7 places it.

**What it is.** Cyber-Kratt is the working name Tom Kristian Abel publishes under as an independent
researcher. It comes from the kratt of Estonian folklore, a creature assembled from household
objects and set to one task, which is resourceful and effective and will turn on its owner if it is
left without a direction (`[S-15]`, Q-10). In use it names the method rather than a thing: a
capability is only as good as the task it is pointed at. It appears as a signature on independent
research work, and it will be defined on one page that a first-time reader can reach from any
surface that uses it.

**What it is not.** Not a company. Not a product. Not a team or an agency. Not a pseudonym, since the
work is published under his legal name with his own accountability statement (`[S-05]`, `[S-15]`).
Not a job title, and never a substitute for one. Not an identity label of the kind the risk gate
forbids (`decisions.md` §G-9). It is also not claimed as an employer or a vendor, because no artefact
shows it employing, selling or contracting anything.

**Why the definition is owed at all.** The label is the brand's most repeated word and it has no
external referent: the only definition anywhere is his own folklore gloss, and the AI layer already
treats it as a personal moniker while also generating a fifth role framing from it (`[S-28]`,
`[S-21]`). An undefined label in a headline leaks meaning to whoever defines it first.

**Open items before publication of the definition:** the claimed origin at kood/Jõhvi is
`registry-only` with no public source found that defines the role or the nickname (`[S-28]`), so the
definition deliberately asserts no origin. `[unverified → needs Tom: confirm whether the kood/Jõhvi
origin may be stated, and whether the label is registered anywhere]`

---

## 11 — What this strategy does not do

Each exclusion is a decision, so it is not re-litigated in a later phase.

| Not done | Why |
|---|---|
| No new case copy, and no second wording of the episode | `G-2` locks one sentence; the review is pending. This document references the lock |
| No publishing, submitting or sharing of the SoK manuscript | Hard gate: held until the provisional-filing decision resolves (`G-1`, `[S-33]`) |
| No load-bearing company claims, and no "we/our" sentences | `G-4` plus `P-1`; the registry view shows a deletion banner and the notice has now been reported (`[S-26]`) |
| No aggregate disclosure claim until the ledger exists | `G-5`; the claim was found unsupported (`[S-02]`), the About and meta instances were removed on 2026-10-24, and the homepage intro-strip instance survives (live check) |
| No identity labels from the risk gate, in any language | `decisions.md` §G-9; `.agents/brand-context.md` §6 |
| No third-party naming: investigators, prosecutors, analysts or private individuals | Gate 4 (`personal-brand-program.md` §6); `[S-10]` quotes officials and those names must not be republished in brand copy |
| No general cybersecurity audience, no threat-tips content, no phishing-tooling market, no product buying audience | `.agents/brand-context.md` §3 |
| No performance-marketing skills, and no Tier D skills | `personal-brand-program.md` §2; thirteen skills are dropped with reasons, not by oversight |
| No competitor claims built on unread sources | A-4; the named peer set is phase 6 work (`09-peers.md`) |
| No audience claims presented as research | A-3; the personas are archetypes and are labelled as such |

---

## Sources used in this document

`[S-01]` tomabel.ee disclosures corpus · `[S-02]` `tomabel-disclosures-review.md` ·
`[S-03]` `drafts/` · `[S-05]` `src/content/site.ts` · `[S-06]` `MyStoryPage.tsx` ·
`[S-07]` machine-facing and secondary surfaces · `[S-12]` Geenius DigiPRO, 13.05.2026 ·
`[S-15]` LinkedIn profile `in/hr-abel` · `[S-17]` GitHub `tomkabel` ·
`[S-18]` GitHub org `Proxyabel` · `[S-19]` GitHub `M41KL-N41TT` · `[S-20]` ORCID ·
`[S-21]` AI-answer snapshot · `[S-22]` failed SERP capture · `[S-23]` `findings.md` ·
`[S-26]` ProksiAbel OÜ registry findings · `[S-28]` kood/Jõhvi and "Cyber-Kratt" ·
`[S-29]` speaker and CFP record · `[S-32]` Wikimedia Commons photo · `[S-33]` 40C3 submission pack ·
`[S-34]` handle and alias sweep over the local backups.

Decision records used: `G-1`, `G-2`, `G-3`, `G-4`, `G-5`, `G-6`, `G-7`, `G-8`, `G-9`, `G-10`,
`P-1`, `P-2`, `P-3`, `P-4` (`docs/brand/decisions.md`).
