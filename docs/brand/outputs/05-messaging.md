# 05 · Messaging

`brand-messaging` output, phase 5. **Status: draft for review.** Every message below is built from a
coded statement or a verified proof point. Nothing here is a claim about Tom that the corpus does not
already carry, and the two entries that cannot be evidenced are named as such instead of being
softened.

**Derivation.** Positioning and pillars: `.agents/brand-context.md` §2, §4, §5. Audience order:
decision G-7, `.agents/brand-context.md` §3. Belief the corpus supports: B-1, the fault line, in four
coded statements Q-05 `[S-06]`, Q-07 `[S-05]`, Q-18 and Q-19 `[S-15]`. Arc as pillar: decision G-9.
Proof points: `.agents/brand-context.md` §7, plus `[S-17]` for the repositories. Gates and gates
language: `.agents/brand-context.md` §10, decisions G-1 to G-5.

**Alignment with phase 4.** `01-personal-brand-strategy.md`, `02-audience.md` and
`03-positioning.md` landed while this file was being written. The positioning sentence of record is
now `03-positioning.md` §07, 23 words: "Tom Kristian Abel researches what authentication and
anti-fraud systems actually verify, then publishes the finding so it can be checked without trusting
him." §01 below is that position in the skill's "[brand] helps [audience] [outcome] by [how]" shape,
with the audience named, and §03 and §04 are built on the same territory. If phase 4's sentence
changes later, §01 to §04 change with it and §05 to §06 do not.

---

## 01 · Core message

> Tom Kristian Abel shows security engineers and anti-fraud teams where a system verifies less than
> it claims, by reverse-engineering the claim itself and publishing the finding with named
> recipients, dates and signed text.

Three parts, each with its source: the claim layer (T2, the fault line, B-1), the audience (G-7
rank 1), and the mechanism of trust (the receipts, `.agents/brand-context.md` §5 pillar 2).

**What this core message is not.** It is not "I build secure systems". It is not "ex-hacker turned
defender". It is not "founder of X". The first two are category language and a label he did not
choose; the third is unverifiable today (`.agents/brand-context.md` §7).

---

## 02 · Value proposition

Three sentences, in the order the reader needs them.

A system's security page lists what it checks. The distance between that list and what the system
actually checks is where account takeover happens, and it is measurable. Tom measures it, publishes
the measurement, and hands the vendor and the national CERT the finding with the date attached.

The one asset no peer in this lane holds at the same time is the combination: opcode-level reverse
engineering, protocol-level work on national eID infrastructure, a public disclosure record with
named recipients, and a documented arc that most vendors would hide `[S-02]` `[S-23]`.

---

## 03 · Tagline options

The tagline is a phase-7 decision. This is the shortlist, tested against the audit's own question:
could a competitor wear it? (D1, 2 of 5, `[S-05]`). The phase-4 positioning sentence is the strategy
anchor rather than a tagline, and it is too long for a surface to print `03-positioning.md` §07; the
options below are what a surface can actually carry.

| Option | Style | Rationale |
|---|---|---|
| "Claimed verification against actual verification." | functional | his own fault-line sentence compressed; nobody in the category owns the distinction |
| "The gap between what a system claims to verify and what it actually verifies." | functional | the unedited sentence, usable as the site hero line `[S-05]` |
| "Same eyes, different direction." | emotional | already his line in the story page `[S-06]`, and the arc in four words |
| "Break it, prove it, publish the receipts." | functional | three verbs, and the third one is the differentiator |
| "I check what the system says it checks." | plain | conversational, matches the LinkedIn register |

**Recommended:** option 1 as the research-facing tagline, option 3 as the arc line on About. Keep
the current tagline "Systems architect and security researcher." as a role descriptor in schema and
bios only, never as a headline: it fits thousands of practitioners, and the audit's question about
competitor fit answers yes.

---

## 04 · Messaging hierarchy

### Level 1 · Brand headline

**The gap between what a system claims to verify and what it actually verifies.**

His sentence, not a rewrite `[S-05]`. It is the idea the corpus supports in the most independent
places, across research and personal writing (B-1). Where a headline has room for one clause more,
use the phase-4 positioning sentence instead `03-positioning.md` §07: it carries the same subject and
adds the trade, which is the publication of the checkable finding.

### Level 2 · Supporting statement

I reverse engineer authentication, identity protocols and client-side anti-fraud systems down to the
opcode, then publish what the mechanism actually does. Every finding ships with the recipient and the
date, or with an honest negative where nobody was told.

### Level 3 · Key messages

**M1 · The claim layer is where it breaks.** A control's claim and a control's behaviour drift apart,
and the drift is where account takeover lands. Proof point: the Smart-ID relay work shows that an
approval is not bound to the context it approves, on live national infrastructure `[S-03]`. The
BotGuard SoK reconstructs a production anti-fraud VM from bytecode up `[S-01]` `[S-17]`.

**M2 · The receipts are public.** Problem: most security writing asks to be trusted. Here the text is
signed, hashed and checkable. Proof point: hash-verifiable article text plus a detached PGP signature
on 7 of 19 pages, with CI failing if text and hash drift `[S-01]`; a per-page disclosure status that
records one page as "Not reported to Google" `[S-01]`.

**M3 · He builds under the threat models he writes.** The research is not commentary. Proof point:
production platforms and systems architecture at MATx, with the threat models treated as engineering
`[S-05]`; `fingerprintproxy`, a Go TLS-fingerprinting proxy with 72 browser profiles, JA3/JA4 and MITM
interception `[S-17]`.

**M4 · The arc is stated, not performed.** One sentence, one legal review, once, at the start
`.agents/brand-context.md` §5 pillar 1, decisions G-2 and G-9. Proof point: the record is public and
he says it before anyone else can, with responsibility in the same sentence `[S-06]`.

**M5 · Both publics, both languages.** Estonia's eID and fraud landscape is not an afterthought
audience. Proof point: the disclosure went to SK ID Solutions (Nov 2025) and then to RIA, TTJA and AKI
(Apr 2026), and the material exists in Estonian as well as English `[S-01]`.

### Level 4 · Proof-point bank

| Claim | Evidence | Status |
|---|---|---|
| 104 stars and 19 forks on the BotGuard SoK repository | GitHub API, 2026-10-24 `[S-17]` | verified |
| `fingerprintproxy` supports 72 browser profiles | repo README and `profiles.go` `[S-17]` | verified (site copy says "65+") |
| Coordinated disclosure to SK ID Solutions (Nov 2025), then RIA, TTJA and AKI (Apr 2026) | per-page disclosure records on 18 pages plus `llms.txt` `[S-01]` | verified |
| Hash-verifiable article text with detached PGP signatures on 7 of 19 pages | `public/verification/`, `ArticleProof` `[S-01]` | verified |
| Presidential Hackathon, OpenAI Special Award (May 2026); Fellin Häkk 1st (Feb 2026); AI GovTech 2nd (Jun 2026) | LinkedIn honours, Geenius coverage `[S-15]` `[S-12]` | founder-asserted, press-corroborated once |
| CTO at MATx ("Co-Founder and CTO" on the About body since commit `51c74cf`) | MATx documents and `[S-05]` | founder-asserted, sole record is the company's own document `[unverified - needs Tom]` |
| 40C3 talk submitted, pretalx LU8GWS, submitted 2026-10-09, notification 3 Nov 2026 | submission pack `[S-33]` | verified |

**Not reusable without a fresh artefact** (`.agents/brand-context.md` §7): "design partnerships",
"principal engineer", anything about Proksimity's commercial state, and every aggregate disclosure
claim. The first two are live on LinkedIn today and come out in phase 9.

---

## 05 · Audience-specific messaging

### Audience 1 · Security research and engineering community (G-7 rank 1)

What they care about: can I reproduce it, and is it real?
Lead with: the mechanism, on the first line. Method, corpus, limits, then the conclusion.
Proof that lands: the SoK repository, the disclosure record, the signed article text, the honest
negatives `[S-01]` `[S-17]`.
Avoid: positioning language, the arc as an opener, and any credential that the reader cannot check.
What this audience rewards is the artefact rather than the résumé, so the lead surface is GitHub and
the disclosure corpus `[S-17]` `[S-01]`.

### Audience 2 · Estonian public sector and regulators (rank 2)

What they care about: does this person understand national eID infrastructure from inside it, and does
he report through channels?
Lead with: the finding and the recipient. SK ID Solutions, dates, what changed.
Proof that lands: the disclosure timeline, the Estonian-language research, the recognition by the
state's own programmes `[S-01]` `[S-12]`.
Avoid: marketing register in Estonian. Estonian copy is written as Estonian, not translated
`.agents/brand-context.md` §6.

### Audience 3 · Hiring market and client-side partners (rank 3)

What they care about: does he ship, and does the security survive contact with a real system?
Lead with: production evidence and the threat model behind it.
Proof that lands: the MATx platform work, the proxy and the anti-fraud tooling `[S-17]` `[S-05]`.
Avoid: the founder framing as the lead, client names, and any "we/our" sentence until ProksiAbel OÜ's
registry status is confirmed (decision G-4, precondition P-1).

---

## 06 · Messaging by channel

Voice is constant; the unit of communication changes. Ready lines below are proposals, not published
copy.

| Channel | Headline approach | Tone | Length | Ready line |
|---|---|---|---|---|
| Site (home, About) | the fault line, in his own words; role noun appears once | explanatory, plain | short | "The gap between what a system claims to verify and what it actually verifies." `[S-05]` |
| Site (research page) | the finding as the first sentence, the limit in place | evidential | long | "an end-to-end run of the full relay chain was still pending when this report was written" `[S-03]` |
| LinkedIn post | one finding per post, a question or a verdict list to close | direct, dry | short | "So if your security story ends at 'we support passkeys,' ask:" `[S-15]` |
| GitHub README | mechanism first, reproduction second, no positioning | factual | medium | "Authentication security researcher. Breaking eID, anti-fraud, and browser attestation systems to build better ones." `[S-17]` |
| CFP bio | reuse the submitted wording from the pack, unchanged | third person | 50 words | `[S-33]`, subject to P-2 before reuse |
| Press quote | one sentence, on the record, no case wording, point to the record | calm, quotable | 1 to 2 sentences | "The interesting part is never the cryptography. It is the distance between what a system says it checks and what it actually checks, and that distance is measurable." |
| Email (disclosure or outreach) | name the recipient, the date and the ask in three lines | plain, dated | short | "Reported to SK ID Solutions on 12 Nov 2025; the status is tracked at /disclosures and updated when they reply." `[S-01]` |

**Channel rules that override tone.**

1. Any piece recommending server-side traffic verification carries the Proksimity conflict-of-interest
   line, in both languages, unchanged `.agents/brand-context.md` §10 gate 2.
2. A press quote about the past is the locked sentence or nothing. Do not improvise in an interview
   and do not paraphrase it afterwards (decision G-2, precondition P-2).
3. The CFP bio in `[S-33]` is the wording of record. Do not rewrite it for a new CFP; reuse it.

---

## 07 · Things not to say

The list is a gate, not a style preference. Every row has a consequence attached elsewhere in
`docs/brand/`.

| Never say | Why | Where it lives now |
|---|---|---|
| `ex-black hat`, `ex-hacker`, `former hacker`, `black hat`, `reformed`, `ethical hacker` | labels he did not choose; banned in owned copy, and the arc is stated as a noun phrase instead | LinkedIn headline, live today `[S-15]` |
| any fifth wording of the case | decision G-2: one sentence, one owner, one legal review | two candidate sentences, `06-story.md` §00 |
| the names or initials of investigators, prosecutors, analysts or private individuals | gate 4; press named them, brand copy does not | press extracts only, never restated in brand copy |
| `I always disclose responsibly` and every aggregate version | unsupported where the review checked, 13 of 19 pieces; the per-page record is the honest form | `bio.paragraphs[1]`, live today `[S-05]` |
| `design partner`, `principal engineer` | no artefact behind them; the AI layer already invented a fifth framing from them | LinkedIn About, live today `[S-15]` |
| client names, client counts, revenue, headcount | confidentiality is a stated commitment `[S-05]` | not published anywhere |
| `65+ browser profiles`, `1.4M+ users` | contradicted by the artefact, or already deleted from the repo `[S-17]` `[S-02]` | `src/content/site.ts`, live today |
| `we`, `our`, `the company` in a capability sentence | the publisher entity's registry status is unconfirmed (G-4, P-1) | About and schema |
| anything about Proksimity's commercial state or customer count | no artefact exists, and the COI line already names the category honestly | not published |
| the SoK manuscript, in any form, including a preprint link | hard gate until the provisional-filing decision resolves (G-1) | unpublished |
| the rows coded `do-not-use`, Q-15 to Q-17 and Q-23 | true, damaging or self-incriminating. Not restated here, not even as a warning, and never paraphrased. The code is the only reference this file will use | private quote bank |
| `Cyber-Kratt` used as a job title or a company name | decision G-3 keeps the label and owes it a definition; §08 below is that definition | LinkedIn headline |
| awards described as institutional endorsement | the honours are programme awards, not appointments `.agents/brand-context.md` §7 | LinkedIn honours |
| any claim that the work is used by named institutions | no artefact supports it | nowhere yet, keep it that way |

**Gate 3 in one line.** If a hostile reader cannot check it in ten minutes, it does not ship.

---

## 08 · The "Cyber-Kratt" definition

Decision G-3 keeps the label public and owes it a definition: what it means, why the name, what it is
not. Prerequisite P-4 asks for it in phase-5 copy. Draft below, for Tom's approval before it goes on
`tomabel.ee` and into the LinkedIn headline area. It contains no case copy and quotes nothing from
the do-not-use rows.

> **What "Cyber-Kratt" means.**
>
> A kratt is a creature from Estonian folklore, assembled from household items and set to work
> collecting riches for whoever made it. It is resourceful and effective, and it will turn on its
> owner if it is left without a task `[S-15]`.
>
> I use the name because it is the most honest picture I know of offensive capability: the capability
> is not good or bad, and left without direction it becomes a liability to the person holding it. My
> work is about that direction. The ethics question is a pointing question `[S-03]`.
>
> **What it is not.** It is not a company name, not a product, not a job title, and not a label for
> the years before 2025. It is a folk reference, and it is the reason my research has a stated
> direction rather than a set of skills looking for an owner `[S-15]`. For my current role, use
> "CTO at MATx"; for the research, use my name.

**Placement rules.** Publish it once, on a page that the LinkedIn headline and the About page can
link to (G-8, one owner, one place). The page has to exist before the headline keeps the label: the
audit records that "Cyber-Kratt" currently has no external definition anywhere `[S-28]`, and one AI
answer already read it as a moniker he operates under `[S-21]`. A definition is what turns that leak
into an asset.

---

## 09 · Self-check

The three phase-5 documents were run through the voice rules they describe:

```
node docs/brand/check-voice.mjs docs/brand/outputs/04-voice.md docs/brand/outputs/05-messaging.md docs/brand/outputs/06-story.md
```

Verbatim result of the run that produced these three files:

```
| file                        | words | avg sent | max sent | em in prose | not X, but Y | superlatives | one-line closers |
| 04-voice.md                 | 3028  | 17.01w   | 69w      | 0 (0/1k)    | 0 (0/1k)     | 0 (0/1k)     | 0 (0/1k)         |
| 05-messaging.md             | 1383  | 16.46w   | 56w      | 0 (0/1k)    | 0 (0/1k)     | 0 (0/1k)     | 0 (0/1k)         |
| 06-story.md                 | 2053  | 16.56w   | 46w      | 0 (0/1k)    | 0 (0/1k)     | 0 (0/1k)     | 0 (0/1k)         |

0 failure(s) across 3 file(s).
```

Those counts describe the three documents as they stood when the run was made. Adding this section
changed their word counts by a few words and nothing else; pass and fail are unaffected by a
paragraph about passing.

Getting to that line took three rule corrections and four copy fixes, all recorded in
`04-voice.md` §09 and `06-story.md` §05. The corrections were to the rules, not to the evidence: a
35-word cap and a 40-word cap both rejected an essay that reads well, a research-register em-dash
allowance turned out to be a phase-1 artefact of counting reference lists as prose, and an average
sentence length was being applied to a one-liner that has no sample. The copy fixes were my own
sentences, including the proof point in M1 above and a stray drafting note in §05.

---

## 10 · What phase 6 and 7 inherit

| Element | Owner (G-8) | Everywhere else |
|---|---|---|
| The locked past sentence | `/my-story` and the one bio slot | a link, never a restatement |
| The Cyber-Kratt definition | one page on tomabel.ee | the label alone, with a link |
| The fault-line sentence | hero and About | reusable verbatim, never paraphrased |
| The disclosure ledger (G-5) | `/disclosures` | each page links to its own row |
| Award facts | LinkedIn honours plus About | listed with dates, never as endorsement |

---

## Sources

`[S-01]` disclosures corpus · `[S-02]` adversarial review · `[S-03]` drafts · `[S-05]` `src/content/site.ts` ·
`[S-06]` MyStoryPage · `[S-12]` Geenius DigiPRO 2026 · `[S-15]` LinkedIn capture · `[S-17]` GitHub `tomkabel` ·
`[S-23]` technical footprint findings · `[S-28]` kood/Jõhvi and "Cyber-Kratt" · `[S-33]` 40C3 submission pack.
Decisions cited by number: G-1, G-2, G-3, G-4, G-5, G-7, G-8, G-9, G-10 · prerequisites P-1, P-2, P-3, P-4 ·
gates 2, 3, 4 (`.agents/brand-context.md` §10).
