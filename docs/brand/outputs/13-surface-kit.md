# 13 — Surface kit: what to paste, where, in what order

**Phase 9 of `../personal-brand-program.md`. Written 2026-10-24.**
Operational companion to `10-personal-brand-book.md`. Everything here is copy-paste ready. Where a
surface is blocked by a prerequisite, the reason is stated instead of guessed (decisions
`../decisions.md`: P-1 company status, P-2 legal review).

---

## Order of operations

| # | Surface | Action | Blocked by | Effort |
|---|---|---|---|---|
| 1 | tomabel.ee About | Cyber-Kratt definition published | none | done in this phase |
| 2 | tomabel.ee (schema) | ORCID added to the Person `sameAs` | none | done in this phase |
| 3 | GitHub `tomkabel/tomkabel` | profile README rewritten to the book's framing | none | done in this phase |
| 4 | LinkedIn headline | replace the current headline | none | 2 minutes, by hand |
| 5 | LinkedIn About | replace with the text below | none | 5 minutes |
| 6 | LinkedIn experience | retitle the 2021-2024 entry, remove the forbidden label | none | 5 minutes |
| 7 | LinkedIn featured / publications | pin the BotGuard SoK and the eID research | none | 5 minutes |
| 8 | Any new bio, submission or profile | use the book's bios | P-2 for anything touching the case | ongoing |
| 9 | Disclosure ledger page on the site | build from the spec below | needs per-page extraction | half a day |
| 10 | Company mentions in schema and About | revisit after the register check | **P-1** | depends |

---

## 1. LinkedIn

**Headline** (paste as is, 92 characters):

> Authentication-security researcher · eID, anti-fraud and browser attestation · Estonian and English

Removes: "Founding Engineer" as the lead noun, "Cyber-Kratt" before its definition is linked, and
"Ex-Black Hat", which the risk gate forbids in owned copy.

**About** (with "Add section" empty; the kratt paragraph now matches the site's definition):

> Authentication-security researcher. I find the gap between what a system claims to verify and what
> it actually verifies, then publish the finding with the disclosure record attached: who was told,
> when, and what they said.
>
> I work on identity protocols (FIDO2 / WebAuthn, eIDAS, Smart-ID), client-side anti-fraud and
> browser attestation, and the virtual machines those defences run in. My BotGuard systematisation is
> public on GitHub (104 stars, 19 forks), fingerprintproxy ships 72 browser profiles, and my Smart-ID
> and eID findings went to SK ID Solutions, then to RIA, TTJA and AKI.
>
> Cyber-Kratt is the name for the way this work gets done, not for who employs whom. A kratt, in
> Estonian folklore, is a servant assembled from spare parts that works tirelessly for its maker and
> turns on you the moment you leave it idle. That is offensive capability in one image, and it is
> useful only when pointed somewhere.
>
> I write in English and Estonian. Every research page on tomabel.ee states its disclosure status,
> including the negatives, and the text is signed so a reader can check it was not altered.

Do not add "entrepreneur", "founder" or "consultant" to the About: no artefact supports them
(`[S-21]`, gate 3).

**Experience.** Two entries need edits:

| Current | Change to |
|---|---|
| "Independent Exploitation Researcher & Tool Developer" (Jun 2021 to Jul 2024) | Retitle to the subject, not the posture: "Authentication and anti-fraud research" with the description kept factual. The forbidden label goes; the work stays. |
| "Founding Engineer" at ProksiAbel OÜ | Keep as the factual title, but it must not be the lead noun anywhere. Contributor-level, not identity-level. Blocked from becoming the headline again while P-1 is open. |

**Featured.** Pin in this order: the BotGuard SoK repository, the Smart-ID/eID research page, the
Zero-Trust Octagon, and one post that carries the fault-line idea in his own words.

---

## 2. GitHub profile README (`tomkabel/tomkabel`)

Replace the current README with this (the repository is the person's canonical technical surface):

```markdown
### Tom Kristian Abel — authentication-security researcher

I find the gap between what a system claims to verify and what it actually verifies,
then publish the finding with its disclosure record attached.

**Identity protocols** — FIDO2 / WebAuthn, eIDAS, Smart-ID. Protocol-level work, not advisories.
**Client-side anti-fraud** — reverse engineering production anti-fraud VMs at the opcode level.
**Browser attestation** — what attestation can and cannot carry, and where the claim breaks.

Selected work
- [google-botguard-security-research](https://github.com/tomkabel/google-botguard-security-research) —
  SoK: client-side anti-automation under VLM-based attack (104 stars, 19 forks)
- [smart-id-security-research](https://github.com/tomkabel/smart-id-security-research) —
  approval-layer analysis of Estonia's national eID, disclosed to SK ID Solutions, then RIA, TTJA and AKI
- [fingerprintproxy](https://github.com/tomkabel/fingerprintproxy) — Go TLS-fingerprinting proxy, 72 browser profiles
- [zero-trust-octagon](https://github.com/tomkabel/zero-trust-octagon) — zero trust from eight axioms, not vendor slides

Writing and research: [tomabel.ee](https://tomabel.ee) · Findings are published with their
disclosure status and signed, so they can be verified rather than trusted.
```

Bio line for the account: keep "Authentication security researcher" as the lead. The company is not
offered as the identity.

---

## 3. CFP and speaker material

**Short bio** (from the book, ≈55 words): use verbatim. Where a CFP asks about background, the
disclosure sentence already in the 40C3 submission is the candidate wording, and **no variant may be
written** until the legal review lands (P-2, decision G-2).

**Talk-title pattern.** Claim first, subject second, no adjectives. Examples consistent with the
existing research titles:

- "What attestation cannot carry" (client-side trust)
- "The approval layer is the attack surface" (eID)
- "Dead Souls was half right: four years of passkeys, scored" (only if the forum-handle reference is
  acceptable to him; the underlying material is his own public post, but the handle is on the
  do-not-use list, so the title would need his explicit call)

---

## 4. Email and first contact

```
Tom Kristian Abel
Authentication-security researcher · tomabel.ee
PGP 0x0C2A0C6F110AABC5 · https://tomabel.ee/public-key.asc
```

No company block while P-1 is open. No "we" for work that is his.

---

## 5. Disclosure ledger — the one deferred build

**Decision G-5 requires it.** The data already exists: 18 pages carry a disclosure record in a
semi-structured form ("Disclosure record. 2025-11: I reported the QRLJacking and MITM relay vectors
to SK ID Solutions, with technical details"; "Disclosure posture: none required. SK ID Solutions has
not reviewed or endorsed this reading"; "Not reported to Google").

**Ledger shape.** One page at `/disclosure-ledger/`, one row per finding: page, subject, recipient(s),
date(s), outcome, and the honest negatives. It links from every article's disclosure status, and
`llms.txt` gains a one-line pointer.

**Why it is deferred rather than half-built.** A ledger is a claim record. One with missing rows is
worse than none, because it implies the missing rows do not exist. Building it properly needs a
per-page extraction pass (the 18 records vary in phrasing), a new route with EN and ET metadata, and
the repo's route tests updated. That is a separate PR, not a tail-end of this one.

**The mechanical half is scripted and ready.** `scripts/extract-disclosures.mjs` (to be written)
walks `src/pages/*.tsx`, pulls the disclosure-status blocks per page in both languages, and emits a
draft table for review. The judgement half, deciding what counts as an outcome and which negatives to
publish, stays with Tom.

---

## 6. What this kit deliberately does not do

- It does not edit LinkedIn directly: the platform has no write path available to the tooling here,
  and the profile is a live identity surface. The copy above is exact, so the paste is mechanical.
- It does not touch the company schema beyond adding ORCID to the person, because decision G-4 keeps
  ProksiAbel OÜ as publisher while P-1 is unresolved. If the register check shows the deletion notice
  is progressing rather than cancelled, the Organization node, the About "we" sentences and the
  LinkedIn company link all need revisiting in one pass.
- It does not write a new sentence about the 2024 case anywhere (G-2), including in the CFP bio.
