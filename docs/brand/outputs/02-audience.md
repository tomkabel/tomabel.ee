# 02 — Audience: Tom Kristian Abel (personal brand)

**Skill:** `target-audience` (library `arnabbagxd/brand-building-skills`, read from
`.agents/skills/target-audience/SKILL.md`), run in evidence mode.
**Phase:** 4 of `docs/brand/personal-brand-program.md`. **Written:** 2026-10-24.
**Evidence basis read for this document:** `.agents/brand-context.md`; `docs/brand/decisions.md`;
`docs/brand/01-audit.md`; `docs/brand/00-evidence/source-register.md`;
`docs/brand/00-evidence/statements-and-quotes.md`; `docs/brand/00-evidence/serp-and-ai-snapshot-2026-10-24.md`.

**Live re-check before writing.** The register snapshots and the phase-2 audit were captured earlier
on 2026-10-24. Every surface finding inherited from the audit was re-verified against the live
repository before it was used here, and the two audit findings that describe Persona 3 (the
unreconciled MATx title and `/systems` linking private repositories) have both moved: commit
`51c74cf` reconciled the title on the About body, and commit `6d045db` (6 October 2026) removed the
dead links and labelled the cards "Private source". The underlying evidence gap is unchanged, since
the repositories themselves remain private.

**Citation rule.** Every factual or self-descriptive claim carries an `[S-nn]` reference into
`00-evidence/source-register.md`, or is marked `[unverified → needs Tom]`. Audience claims are the
easiest place in a brand document for a writer to smuggle in invention, so this document labels its
own epistemic status in every section: evidence, inference, or absent. Personas are explicitly marked
as constructed archetypes, because no audience research exists anywhere in the corpus.

**Adaptation from the skill.** The skill's questionnaire assumes a consumer brand: income bands,
shopping behaviour, gender distribution. For a research-led personal brand those fields are noise,
so they are replaced, as the plan requires, with role, organisation type, decision authority,
language, and where the person actually reads (`personal-brand-program.md` §2, Tier A row 3).

---

## 01 — AUDIENCE OVERVIEW

**Status: inference from behavioural evidence, not from research.** There is no interview, survey,
review, support ticket or analytics export about his readers anywhere in the corpus, and the register
records the absence of a working search-measurement path as well (`[S-22]`, `01-audit.md` §"Not
audited in this pass"). What exists is behavioural: who reads which surface and what they do next.

The audience is small, technical and verification-minded. It is the part of the security field that
treats a claim as unproven until an artefact exists, which is also the only part of the field where a
one-person brand can win without institutional backing: no employer record, no academic record and no
talk on record were found in this pass or the prior one (`[S-20]`, `[S-23]`, `[S-29]`). The measurable
evidence of who shows up is thin but consistent. A public repository carrying an opcode-level study of
a production anti-fraud system reached 104 stars and 19 forks by 24 October 2026 (`[S-17]`), while the
professional network profile where he posts reached 244 connections, 36 post impressions and 14 search
appearances over the same window (`[S-15]`). Developers read the repository; the feed does not carry
the audience. The AI answer that describes him cites tomabel.ee six times and LinkedIn five times
(`[S-21]`), which means the surfaces that shape a stranger's first impression are the disclosures
corpus and the profile, in that order.

**Audience order is decided, not proposed:** research and engineering first, Estonian public sector
and regulators second, hiring and client-side partners third (`G-7`; `.agents/brand-context.md` §3).
The order is binding on every later phase, because the positioning sentence and the messaging
hierarchy both derive from it (`decisions.md` §G-7).

| Rank | Audience | What they need from him | Where the register shows them | Status of the evidence |
|---|---|---|---|---|
| 1 | Security research and engineering community (anti-fraud, anti-automation, identity, browser security) | Method and evidence: can they reproduce it, and is it real | Repositories (104 stars, 19 forks on one, `[S-17]`), the disclosures corpus (`[S-01]`), conference tracks (one submission pending, `[S-33]`) | verified as where the engagement happened; the composition of that engagement is not measured |
| 2 | Estonian public sector and regulators (RIA, CERT-EE, SK ID Solutions, TTJA, AKI, ministries) | Someone who understands national eID infrastructure from the inside and reports through channels | Named disclosure recipients with dates, November 2025 and April 2026 (`[S-01]`, `[S-07]`); Estonian-language posts (`[S-15]`) | verified as recipients; no evidence of how they read him beyond the disclosure record |
| 3 | Hiring market and client-side partners | Evidence that he ships and that the security survives contact with a real system | The About page and the role claim (`[S-05]`), `/systems` (`[S-07]`), LinkedIn (`[S-15]`) | weakest of the three: the production claims rest on systems whose source is not public (`[S-23]`), the title is founder-asserted even now that its wording is reconciled (`G-6`, live check 2026-10-24), and the profile surfaces still disagree with each other |

---

## 02 — PRIMARY AUDIENCE PROFILE

**Status: mixed. The role shape is inferred from the sites of his own publication and from the AI
answer's citation set (`[S-21]`); nothing here is measured.**

### The basics, adapted for a research-led brand

| Dimension | Value | Basis |
|---|---|---|
| Role | Senior or lead engineer in anti-fraud, trust and safety, identity or browser security; on the public-sector side, an analyst or policy lead on national digital identity | Inferred from the disclosure recipients and the research subjects (`[S-01]`, `[S-07]`) |
| Organisation type | Payments, e-commerce or platform companies with an anti-fraud function; anti-bot and identity vendors; national authorities and their CERTs; universities and independent research groups | Inferred from the same evidence; the vendor side is the one the SoK work directly addresses (`[S-17]`) |
| Organisation size | From a five-person security team to a national agency. Not SMB generalists | Inference: the work assumes a system with an anti-fraud or identity claim worth auditing (`[S-01]`) |
| Decision authority | Individual contributor with influence over architecture choices; a lead who can commission an external assessment; an analyst who can cite him upward | Inference from the artefact types he publishes (`[S-01]`, `[S-17]`) |
| Language | English for the research community; Estonian for the domestic institutional audience, and for a public that has to be told what a national identity stack does and does not verify | `[S-05]`, `[S-07]`, `[S-15]`. The Estonian surface is a parallel publication surface, not a translation (`[S-07]`) |
| Where they read | Repository READMEs and code, the disclosures archive, protocol specifications, conference talk pages and their recordings, then the feed | `[S-17]` (the star and fork counts are the only engagement signal available), `[S-33]` (one conference track), `[S-07]` (the machine-facing layer) |
| Where they do not read | Product marketing pages, brand statements, an About page written as a bio | Inference from the audit: the machine-facing layer carries the strongest audience-aware work, the human-facing layer is the weaker one (`01-audit.md` §2 D5) |

### Psychographics

**Core values, evidenced by what this audience rewards.** Reproducibility over authority: a claim
with a repository behind it gets 104 stars from this audience, and a claim without one gets nothing
(`[S-17]`). **Distrust of aggregate claims:** the same audience that the review found reading 13 of 19
articles also recommends the product category his own company builds, without disclosure (`[S-02]`),
which is exactly the kind of pattern this audience checks. **Language discipline:** terms of art used
precisely (opcode-level, protocol-level, session binding, attestation), and annoyance at
marketing substitutions for them (`[S-15]`, Q-19). **A preference for the negative result stated as
such:** the register's own machine-facing files already carry an honest negative ("Not reported to
Google", `[S-07]`), which is the register that this audience trusts most.

**Aspirations.** To be able to answer a regulator, an auditor, a customer or a board with evidence
rather than assurance; to catch the failure mode before someone hostile demonstrates it.

**Self-identity.** Practitioners, not audiences. They consider themselves the people who check claims,
which is precisely why a peer-to-peer relation is the only one that holds with them.

**What content they already consume.** Protocol and specification documents, vendor advisories and
CERT publications, conference talk recordings, repository code and READMEs, detailed post-mortems. The
register records the absence of talks, academic works and general-community footprints for him
(`[S-23]`, `[S-29]`), which is a statement about his supply, not about their demand.

**Communities.** Anti-fraud and anti-bot practitioner groups, identity and eID communities, CERT
networks, and the Estonian institutional circle that already appears in his disclosure recipients
(`[S-01]`). No forum or podcast presence of his own was found in the earlier passes (`[S-23]`,
`[S-29]`), and the handle and alias sweep required by `G-8` has since been run over the local
backups: it re-confirmed the two addressable identities, surfaced two previously unregistered
correspondence aliases, and left one handle of ambiguous ownership that must not be asserted in
brand copy either way (`[S-34]`). What remains of `G-8` is the rule, not the sweep: one owner, one
place (`decisions.md` §G-8).

`[unverified → needs Tom: the communities, feeds and events where the priority audience actually
gathers, and which of them he can enter without an institutional affiliation]`

### Behavioural patterns

- **How they decide whether to take him seriously:** they open the artefact before the biography. The
  register shows the artefacts publish and the biography has not caught up (`[S-17]` is the cleanest
  self-description; `[S-05]`, `[S-15]` contradict each other and each other's titles).
- **What triggers the search for someone like him:** a claim failure that a team has to explain, an
  eID or authentication change with a rollout risk, a procurement or audit question about existing
  controls, an anti-fraud system that stopped working against a new class of attacker.
- **Where they discover work like his:** a repository, a talk recording, a CERT or vendor advisory
  citing the researcher, a peer's reference. Not a feed post.
- **Buying or adopting process:** read the artefact, try to reproduce it, ask a peer, then contact.
  The whole funnel runs on the artefact being checkable without trusting him, which is why the signed
  and hash-verifiable article set (7 of 19 pages, `[S-02]`) is the single most load-bearing audience
  asset the brand owns. The audit reached the same conclusion independently (`01-audit.md` §4 item 5).

---

## 03 — AUDIENCE PERSONAS

Three archetypes, one per audience rank. **These are constructed from the evidence in this document.
They are not real people, the names are placeholders, and the quoted sentences are illustrative
phrasing written to convey a way of thinking, not quotations from anyone.** Every substantive claim
inside each persona carries its own citation.

### Persona 1 (primary) — "Marten", 34, senior anti-fraud engineer, EU payments company

> *Illustrative phrasing, not a real quotation:* "Our vendor says the risk engine catches automated
> abuse before it reaches the account. I have to tell my CISO whether that is true, and I have no way
> to check it that does not end in a slide."

**Their world.** He owns the automated-abuse and account-takeover problem for a payments product. He
spends his days between the vendor's dashboard, the incident queue and the two engineers who can read
a protocol trace. His organisation is the one the client-side anti-fraud literature is written about,
and the literature that he trusts is the kind that attacks the control rather than recommends it
(`[S-17]`).

**Goals:** know which of his controls fails first as attackers get better tooling; be able to
reproduce a finding rather than receive a recommendation; have something to hand to an auditor that
does not depend on the vendor's own report.

**Frustrations:** client-side controls that cannot survive an operator-synthesising attacker; vendor
research that cannot question a customer's claim; security copy that describes a control in marketing
language; the fact that the useful work in his field is published by the people attacking it and
rarely by the people selling it.

**What he needs from this brand:** a method he can run, artefacts he can read, and limits stated
plainly. He does not need encouragement, and he will not act on advocacy.

**Decision triggers:** a repository he can pull and a write-up he can check (the measured evidence:
104 stars and 19 forks on one such artefact, `[S-17]`). **What makes him hesitate:** an aggregate
claim with nothing behind it, which is exactly what the review found in 13 of 19 articles (`[S-02]`)
and what the About page still carries in softer form (`[S-05]`, `01-audit.md` §2 D3).

**Channels:** repository READMEs and code, the disclosures archive, conference talk recordings,
protocol specifications.

**How the brand solves his problem:** it audits the claim rather than repeating it, and it publishes
the audit as a checkable artefact, signed and hash-verifiable, with the correction written into the
page when the finding changes (`[S-02]`, `[S-01]`, `[S-05]`).

### Persona 2 (second) — "Katrin", 47, digital-identity analyst at an Estonian state body

> *Illustrative phrasing, not a real quotation:* "Every conference tells us e-Estonia works. My
> problem is the paragraph in our own documentation that says what happens after login."

**Their world.** She works on national digital identity, its rollout risks and its public
explanation. She reads Estonian first and English as a second source of the same facts. Her
institution has been on the receiving end of a disclosure from this researcher, with dates and named
recipients (`[S-01]`, `[S-07]`), and her institution's sector is internally technical enough that a
protocol-level explanation is worth more to her than a summary.

**Goals:** understand where the identity stack's verification claims are weaker than the public
narrative; have a domestic technical voice she can cite that is not a vendor; know that reporting a
weakness produces a fix rather than a headline.

**Frustrations:** vendor slideware off a national brand; the marketing uses of e-Estonia, which he
has criticised in Estonian in almost these terms (`[S-15]`, Q-20); disclosures that arrive as
pressure rather than as coordination.

**What she needs from this brand:** Estonian-language technical material, per-disclosure facts with
dates and recipients, and a stated limit on every finding. The register shows the ingredients exist
in both languages (`[S-05]`, `[S-07]`, `[S-15]`) and that the AI layer already reproduces the niche
accurately, naming the eID and anti-fraud subjects (`[S-21]`).

**Decision triggers:** a dated disclosure record with an institutional recipient named. **What makes
her hesitate:** a researcher who leads with his own history, because her institution's procurement
and legal review is designed to reject exactly that framing (the option the risk gate excludes under
`G-9`).

**Channels:** Estonian-language technical writing, institutional correspondence, sector events, and
the sites of the named recipients.

**How the brand solves her problem:** it treats the Estonian public as a first audience rather than a
translation target, and it owns a per-disclosure record she can check against her own files
(`[S-01]`, `G-5`).

### Persona 3 (third) — "Priya", 41, CTO of a growth-stage platform hiring or commissioning security work

> *Illustrative phrasing, not a real quotation:* "I do not need another consultant. I need to know
> this person has shipped something where the security had to survive real users."

**Their world.** She has a platform, a compliance obligation and one security hire or one external
assessment to place. She is assessing three candidates and a consulting firm. She will search the
name, read the profile and the site, and ask one engineer to look at the code.

**Goals:** find someone whose security work has survived production; avoid the reputational exposure
of an unresearched hire; get a decision made in weeks.

**Frustrations:** portfolio sites that list technologies rather than outcomes; security credentials
that describe courses rather than shipped systems; the difficulty of checking a claim about
production work.

**What she needs from this brand:** inspection. The weakest evidence in the whole corpus sits here:
`/systems` presents production work, but 11 of the repositories the site lists are not public
(`[S-23]`), and although the card links were removed and the cards labelled "Private source" on
6 October 2026, the repositories themselves stay private, so the work still cannot be inspected
(live check 2026-10-24). The title wording was reconciled to the only written record on 2026-10-24
(`G-6`, commit `51c74cf`), which settles the contradiction but not the verification, since the record
is the company's own document.

**Decision triggers:** an inspectable artefact and a reference that can be checked. **What makes her
hesitate:** an unverifiable title, an ambiguous employer, and the same history that Persona 2's legal
review would flag (`G-4` and the reported deletion notice, §00 of `01-personal-brand-strategy.md`).

**Channels:** LinkedIn, the site, the repositories, professional references, and increasingly an
assistant answer to the direct question about a name (`[S-21]`).

**How the brand solves her problem:** it can only solve it by making production work inspectable, or
by being honest that a third of the audience cannot be served yet on current evidence. This is the
correctly-ranked third priority (`G-7`), and it is the one place the audit's D5 finding ("no primary
audience is declared anywhere", `01-audit.md` §2 D5) cost the most.

---

## 04 — AUDIENCE LANGUAGE

**Status: the audience's own language is not in the corpus. This is the sharpest gap in this
document, and it is not filled with plausible substitutes.**

### What exists: the vocabulary the brand already uses, which the priority audience recognises

Terms of art used precisely in his own published copy, and therefore usable without translation:
identity protocols and their concrete names (FIDO2, WebAuthn, eIDAS, Smart-ID, `[S-05]`, `[S-01]`);
opcode-level reverse engineering, anti-fraud systems, browser attestation, fingerprinting
(`[S-05]`, `[S-17]`); session binding, which is the currency of the pending conference submission's
track (`[S-33]`). The measured vocabulary of the papers and drafts adds the darker register:
attestation, token portability, VLM-based attack (`[S-17]`, `[S-18]`). One rule follows: use the term
of art once, precisely, and never decorate it. The voice measurement already shows what happens when
that rule is broken, since the site copy is the segment with the longest sentences and the most
superlatives (`statements-and-quotes.md` §4).

### What exists: the language third parties use about him, and the rule for it

Third-party vocabulary is a perception baseline, not a messaging source. Press framing leads with the
2024 case even in an award story (`[S-12]`, P-01). The AI answer volunteers the exact labels the risk
gate forbids in owned copy (`[S-21]`, P-02). Officials quoted in 2024 framed his self-marketing as
the story (`[S-10]`, P-03, P-05), and their names must never be republished in brand copy
(`personal-brand-program.md` §6, gate 4). **The rule: describe his work in the audience's vocabulary,
never in the vocabulary the coverage used about him.** Adopting the press frame would make the brand
argue on the one ground it cannot win (`01-audit.md` §3).

### What exists: the readers that are not people

The only measurable audience in the register is partly a machine one. The AI answer cites tomabel.ee
six times, LinkedIn five times, and a press article four times (`[S-21]`), and the site already ships
a machine-facing layer built for this reading (`[S-07]`: per-page disclosure status in `llms.txt`,
Markdown negotiation, JSON-LD). The consequence for messaging is concrete: the phrases that appear on
the pages an assistant retrieves become the phrases that describe him (`[S-21]`), which is why the
first surface repair is the About page and the tagline rather than any social post.

### What is missing, and how it would be obtained

- **The audience's own words for the problem.** No reviews, forum threads, interviews or support
  language exist in the corpus. `[unverified → needs Tom: three peer conversations with the question
  "what do you call the thing you cannot verify", recorded as quotes]`
- **How the priority audience judges a researcher.** No CFP review feedback, no peer reference text.
  `[unverified → needs Tom: the 40C3 review notes if the submission is accepted, and one line of
  reviewer feedback]`
- **Whether the Estonian institutional audience reads English research at all.** The disclosure
  record shows institutions as recipients, not as readers (`[S-01]`).
  `[unverified → needs Tom: one conversation with a recipient-side contact]`
- **What the hiring audience checks first.** Unknown; the third-ranked audience is being served on an
  assumption (`G-7`).

Until at least the first two exist, this document's persona quotes are illustrative and must never be
reused as research findings, quoted as evidence, or shown to a designer as if they were real.

---

## 05 — WHO THIS BRAND IS NOT FOR

Sharpen the position by declining the audience that dilutes it. Each exclusion is drawn from a
recorded decision or from the corpus, so it is a decision and not a preference.

| Not for | Why, with evidence |
|---|---|
| The general "cybersecurity" audience: threat-news readers, tips consumers, certification-seekers | Declared out in `.agents/brand-context.md` §3. Serving them would require a commentary cadence, and there is no evidence he produces or wants to produce one (`[S-23]`, `[S-29]`) |
| The phishing-tooling and exploit-market audience that produced the pre-2025 record | Declared out in `.agents/brand-context.md` §3; the register codes the four statements that served it as `do-not-use` (`[S-08]`, `[S-15]`, `[S-02]`) |
| Buyers of a product that does not publicly exist, and buyers shopping for a vendor-branded assurance product | `.agents/brand-context.md` §3 and §7: anything about Proksimity's commercial state may not be reused without a fresh artefact |
| Anyone who needs an identity label as the reason to hire him | `G-9` forbids the labels, and the risk gate explains why a regulated buyer's diligence rejects that framing (`decisions.md` §G-9; the "heroicise" failure mode) |
| Institutions looking for a vendor to absorb liability in writing | The brand's currency is disclosure with named recipients (`[S-01]`), which is the opposite of quiet remediation |
| Recruiters shopping by title alone | The primary noun is researcher (`01-personal-brand-strategy.md` §01); a title-first search matches four inconsistent framings today (`[S-05]`, `[S-15]`, `[S-17]`, `[S-21]`) |

---

## 06 — AUDIENCE IMPLICATIONS

### Messaging implications

Lead with the claim being audited, not with the career. The priority audience's first question is
"is it real", and the only two things that answer it are the artefact (`[S-17]`) and the receipt habit
(`[S-02]`). Concretely: the fault line goes in the first sentence of every owned surface (`[S-05]`,
the only page it exists on today), the receipts go in the second, and the biography goes last, on one
page, once (`G-8`). Any sentence that cannot be checked by a hostile reader is deleted rather than
softened (gate 3, `personal-brand-program.md` §6).

### Channel implications

The site is the owned home and the repository is the proof surface; the feed is distribution for the
third-ranked audience only (`01-personal-brand-strategy.md` §06, flagged `[ASSUMED]`). For the second
audience, the Estonian surface and the disclosure ledger carry the message; for the first, the
artefacts and one conference stage (`[S-33]`, `G-1`). One consequence is measurable immediately: the
signed article set covers 7 of 19 pages (`[S-02]`), so the proof surface is under-built for the
audience that lives on it.

### Voice implications

Peer to peer, with no appeals to authority, because the audience's own standard is reproducibility
and the register shows no institutional authority to appeal to (`[S-20]`, `[S-23]`). The register's
measured register-split supports this directly: short argued sentences in the essays, evidential
length in the research reports, and the shortest, driest phrasing in short form
(`statements-and-quotes.md` §4). The one voice rule that comes specifically from this audience is
disclosure of interest, because a recommendation in the reader's own product category without a
disclosure is the single finding most likely to lose Persona 1 permanently (`[S-02]`, `G-5`).

### Product and experience implications

- Build the disclosure ledger before any new marketing surface: it is the artefact this audience
  actually asks for (`G-5`, `[S-01]`).
- Extend the signed set from 7 of 19 pages to all research pages (`[S-02]`; `01-audit.md` §4 item 5).
- Finish the disclosure-copy fix rather than only starting it: the About instance was removed on
  2026-10-24, and the homepage intro strip still carries an unscoped aggregate version of the same
  claim, which Persona 1 will check against the pages it describes (`[S-05]`, `[S-02]`,
  live check 2026-10-24).
- Add a portrait and refresh the social card, since the only public image of him is outside his
  control (`[S-32]`, `01-audit.md` §2 D2).
- Make production work inspectable where it is claimed: the dead links were removed from `/systems`
  on 6 October 2026 and the affected cards now say "Private source", and 11 site-listed repositories
  are still not public, so the portfolio remains unverifiable for Persona 3 even though it no longer
  404s (`[S-23]`, `[S-07]`, live check 2026-10-24).
- If Persona 3 must be served before any of that lands, serve it with a person-first framing and no
  company endorsement, since the company's registry position is unresolved (`G-4`, `P-1`, `[S-26]`).

---

## Sources used in this document

`[S-01]` tomabel.ee disclosures corpus · `[S-02]` `tomabel-disclosures-review.md` · `[S-05]`
`src/content/site.ts` · `[S-07]` machine-facing and secondary surfaces · `[S-10]` Postimees,
20.11.2024 · `[S-12]` Geenius DigiPRO, 13.05.2026 · `[S-15]` LinkedIn profile `in/hr-abel` ·
`[S-17]` GitHub `tomkabel` · `[S-18]` GitHub org `Proxyabel` · `[S-20]` ORCID ·
`[S-21]` AI-answer snapshot · `[S-22]` failed SERP capture · `[S-23]` `findings.md` ·
`[S-26]` ProksiAbel OÜ registry findings · `[S-29]` speaker and CFP record ·
`[S-32]` Wikimedia Commons photo · `[S-33]` 40C3 submission pack · `[S-34]` handle and alias sweep
over the local backups.

Decision records used: `G-1`, `G-4`, `G-5`, `G-6`, `G-7`, `G-8`, `G-9`, `P-1`, `P-3`
(`docs/brand/decisions.md`); phase-4 scope and adaptation (`docs/brand/personal-brand-program.md`).
