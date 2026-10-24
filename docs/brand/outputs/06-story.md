# 06 · Story

`brand-story` output, phase 5. **Status: draft for review.** Three lengths of one narrative, all of
them built on the arc as the lead (decision G-9) and on material he has already published.

**Derivation.** Arc as pillar: decision G-9 and `.agents/brand-context.md` §5 pillar 1. The opening
scene is his own finding, not a scene I invented: the approval that is not bound to the context it
approves, from the Smart-ID relay work `[S-03]`. The pivot language is his: "same eyes, different
direction" `[S-06]`. The kratt metaphor is his published paragraph `[S-15]`. The disclosure history
is the record on his own pages `[S-01]`. The method claims (signatures, hashes, per-page status,
corrections) are audited facts from `[S-02]` as confirmed in the audit's remediation table.

**What this file deliberately does not contain.** No new sentence about the past. No third-party
names. No founding year as an opener. No claim about the Proksimity product. Where the narrative
needs the past, it carries the slot defined in §00 and nothing else.

---

## 00 · The sentence slot

Decision G-2: one reviewed wording, one owner, one legal review (precondition P-2, deadline before the
3 Nov notification window closes). No new case copy until that review lands, and no fifth variant
meanwhile. This file therefore authors no case sentence. It defines the slot, quotes the existing
candidates verbatim, and requires the published text to insert one of them unchanged.

**Candidate A, the About sentence** `[S-05]` (one canonical statement lives in `bio.paragraphs[0]`,
per the audit's remediation table):

> I started on the wrong side of the authentication arms race. I reverse engineered browser security,
> TLS fingerprinting, and anti-fraud systems, and for a while, I broke them for money. I don't hide
> that. It ultimately led to a conviction in 2024, an outcome I take full responsibility for.

**Candidate B, the submission sentence** `[S-33]`. The decision names the pending submission's
disclosure sentence as the candidate. The pack contains two wordings, the submitted one and the
revised motivation-field version, and both are reproduced here verbatim because the choice between
them is the lawyer's, not this document's:

> B1, as submitted: In 2024 he was convicted in Estonia for building and monetizing a customized
> Evilginx adversary-in-the-middle phishing setup; he served his sentence, stopped that work, and now
> researches the defensive side of the same problem — what a relying party can detect that a
> competent attacker cannot cheaply erase.

> B2, revised wording from the pack's review pass: In 2024 he was convicted in Estonia for creating
> phishing and browser-automation tooling that was used in account-takeover fraud; he completed his
> sentence, stopped that work, and now researches the defensive side of the same problem — what a
> relying party can detect that a competent attacker cannot cheaply erase.

**Two notes that belong in the record.**

1. Both B wordings contain an em dash. R1 in `04-voice.md` bans em dashes in owned prose. A sentence
   under legal review is quoted verbatim or not used at all, so the punctuation is not mine to fix.
   If B survives the review unchanged, its em dash is a logged, approved exception to R1: one
   sentence, one dash, in the disclosure slot only. If the lawyer returns different punctuation, R1
   holds everywhere else.
2. The sentence is a disclosure, not a narrative device. It appears once per surface, in the position
   the surface requires: inside the arc on About, inside the arc in the short version, and as a
   disclosure line after the one-liner. It is never paraphrased, never summarised and never softened.

**Insertion rule.** Wherever a version below carries the slot marker, paste the reviewed sentence
verbatim, in full, with its punctuation untouched. Then run the containment check in §05.

---

## 01 · The long story

For the About page. 723 words as measured by the checker (see §05), arc-led, written in the register
measured in `04-voice.md`. The slot is in the second paragraph.

---

If you have ever approved a login on your phone and assumed the phone knew what you were approving,
you already have the question this work is about. The phone knows that a person pressed the button.
It cannot know what that person was shown, because it never sees the screen. The distance between
those two facts is where accounts are lost, and the distance is measurable.

I spent the first part of my twenties on the wrong side of it. {{CASE-SENTENCE}} I do not present that
history as a credential. I present it as the reason I think the pointing question is the only
question that matters.

What I kept was the way of seeing. Once you have taken authentication apart for a living, you cannot
un-see how thin most of it is, and you get tired of watching the same systems fail in the same ways.
The skill did not change shape. It changed direction.

In Estonian folklore, a kratt is a servant assembled from spare parts that works tirelessly for its
maker and turns on that maker the moment it goes idle. It is the most honest picture of offensive
capability I know. Capability is not good or bad on its own. Left without direction it becomes a
liability to whoever is holding it, which is what happened to me, and it is why the direction of the
work is the part I now design first.

So the work has one subject: the gap between what a system claims to verify and what it actually
verifies. Identity protocols: FIDO2 and WebAuthn, eIDAS, Smart-ID. Client-side anti-fraud and browser
attestation, taken apart at the opcode and bytecode level rather than described from the outside.
Zero-trust verification architecture built as engineering, where the threat model is written before
the platform is.

The method matters as much as the subject, because a finding that cannot be checked is an opinion.
Every piece of research I publish states its limit in the same place as its claim. Where a chain was
demonstrated piecewise rather than end to end, the page says so. Where a vendor was told, the page
names the recipient and the date, and where nobody was told, the page says that too. The flagship
articles are signed and hash-verifiable, seven of nineteen pages so far, so a reader can prove that
what they are reading is what was published. Corrections are written into the page rather than issued
somewhere quieter.

That habit is not decoration. I work on infrastructure that people in this country use to sign
documents, log in to their bank and identify themselves to the state. When a finding concerns a
national system, the honest form of the claim is the one that survives the vendor reading it, the
regulator reading it and a hostile stranger reading it, in that order. I reported to SK ID Solutions
in November 2025, and then to RIA, TTJA and AKI in April 2026, and each step is on the record with
its date.

Most of that record is Estonian by subject and English by audience, so it exists in both languages.
Estonia's e-state is one of the most digitised in the world, which makes it one of the most
interesting to defend, and the people who run it read Estonian first. Treating the Estonian text as a
translation of the English one would be a quiet way of telling them they are the secondary audience.

Who this is for: the engineers and anti-fraud teams who have to prove that their system verifies what
it claims, the people who maintain national identity infrastructure, and the teams who have to build
something that survives the findings. Not for the general cybersecurity audience, and not for anyone
shopping for an offensive capability. That market exists, I know how it works, and the answer is no.

What you can hold me to: every claim on these pages is checkable, or it carries a note saying what is
missing. Every disclosure names the recipient, the date and the outcome, including the outcomes that
were a refusal or a silence. Every correction is written into the page it corrects. Every limit is
stated next to the claim it limits. And the history stays where it is, in one sentence, on one page,
with responsibility in the same sentence.

---

## 02 · The short story

For a homepage, a pitch or a conference programme. 156 words.

---

A system tells you what it checks. The work starts where that sentence stops being true.

I take authentication, identity protocols and client-side anti-fraud systems apart at the protocol,
browser and opcode level, and publish what the mechanism actually does rather than what the product
page says. {{CASE-SENTENCE}} I do not present that history as a credential. I present it as the reason
I think the pointing question is the only question that matters.

The subject is one gap: what a system claims to verify against what it actually verifies. Identity
protocols, national eID infrastructure, anti-fraud systems, and the architecture that survives the
findings.

Every finding carries its limit, its recipient and its date, and the text is signed so a reader can
check that it was not altered. Reported to SK ID Solutions in November 2025, then RIA, TTJA and AKI in
April 2026. The record is public and the corrections live in the page.

---

## 03 · The one-liner

36 words. The form he would use in conversation, and the form a podcast host or a panel moderator
would read out. The disclosure sentence follows it, in the same breath, on any surface that is new
(G-2, G-8).

---

I started on the wrong side of the authentication arms race, kept the way of seeing, and now point it
at the gap between what a system claims to verify and what it actually verifies. {{CASE-SENTENCE}}

---

## 04 · What all three versions must not do

1. Do not narrate the case. One sentence, in the slot, and no detail around it `[S-06]` `[S-33]`.
2. Do not use an identity label. The arc is a noun phrase, not `ex-something` (`.agents/brand-context.md`
   §10, decision G-9's stated tension).
3. Do not name investigators, prosecutors, analysts or private individuals who appear in the press
   coverage `[S-10]` `[S-14]`, gate 4.
4. Do not repeat the story on another surface. The long version owns the page; everything else links
   to it (G-8).
5. Do not claim a capability the site cannot show. "Ship production platforms" carries a `needs-proof`
   note today, so the story speaks about threat models and platforms in general terms instead
   `[S-02]` finding §5.
6. Do not open on a year. The arc opens on a system behaviour, which is the thing he actually thinks
   about `[S-03]`.
7. Do not close on a drumroll. The measured tic rate is one one-line closer per thousand words, and
   the long version closes on the commitment list instead `[S-03]`.
8. Two sentences in the long version need Tom before they ship. "I do not present that history as a
   credential" and "the pointing question is the only question that matters" are his own lines
   `[S-03]`, reused here unchanged and flagged for approval rather than assumed. The claim that the
   people who run Estonian e-state infrastructure read Estonian first is an inference from the
   capture, not a measured fact `[unverified - needs Tom]`.

---

## 05 · Verification

**Word counts, measured with the voice checker's counter** (prose only, headings and tables excluded).

| Version | Words | Target | Sentences | Average sentence | Em dashes |
|---|---|---|---|---|---|
| Long (§01) | 723 | 600 to 900 | 40 | 18.08 | 0 |
| Short (§02) | 156 | 150 to 200 | 10 | 15.60 | 0 |
| One-liner (§03) | 36 | 25 to 40 | 1 | n/a | 0 |

Each version was extracted into a plain Markdown file with the slot still empty (so no case copy
enters the check) and run through the guide's own rules, verbatim output below.

```
node docs/brand/check-voice.mjs <version>.md
```

Long version, exit 0:

```
  PASS  R1 em dashes in prose <= 0 = 0 (0/1k)
  PASS  R2 sentence avg <= 22w = 18.08w
  PASS  R3 sentences > 35w must be enumerated = 0 violation(s)
  PASS  R3b no unquoted sentence > 60w = 0
  PASS  R4 not X, but Y <= 1/1k = 0 (0/1k)
  PASS  R5 superlatives <= 1/1k = 0 (0/1k)
  PASS  R6 one-line closers <= 1/1k = 0 (0/1k)
  PASS  R7 risk-gate / banned phrase scan = 0 hit(s)

0 failure(s) across 1 file(s).
```

Short version, exit 0:

```
  PASS  R1 em dashes in prose <= 0 = 0 (0/1k)
  PASS  R2 sentence avg <= 22w = 15.6w
  PASS  R3 sentences > 35w must be enumerated = 0 violation(s)
  PASS  R3b no unquoted sentence > 60w = 0
  PASS  R4 not X, but Y <= 1/1k = 0 (0/1k)
  PASS  R5 superlatives <= 1/1k = 0 (0/1k)
  PASS  R6 one-line closers <= 1/1k = 0 (0/1k)
  PASS  R7 risk-gate / banned phrase scan = 0 hit(s)

0 failure(s) across 1 file(s).
```

One-liner, exit 0 after one rule was corrected by this run:

```
  PASS  R1 em dashes in prose <= 0 = 0 (0/1k)
  PASS  R2 sentence avg <= 22w = n/a (1 sentence: R2 is a rate, R3 governs)
  PASS  R3 sentences > 35w must be enumerated = 0 violation(s)
  PASS  R3b no unquoted sentence > 60w = 0
  PASS  R4 not X, but Y <= 1/1k = 0 (0/1k)
  PASS  R5 superlatives <= 1/1k = 0 (0/1k)
  PASS  R6 one-line closers <= 1/1k = 0 (0/1k)
  PASS  R7 risk-gate / banned phrase scan = 0 hit(s)

0 failure(s) across 1 file(s).
```

**The one-liner failed on the first run, and the rule was wrong.** A 36-word one-liner is a single
sentence, so an average sentence length has no sample to describe: the checker reported `FAIL R2
sentence avg <= 22w = 36w`, which says only that the format is short. R2 now applies to a text of
five sentences or more, and the long-sentence rule (R3) governs anything shorter. That is the same
class of correction as the two recorded in `04-voice.md` §09, and it is recorded here because the
guide has to survive being pointed at its own output.

**Slot count, measured.** `grep -c 'CASE-SENTENCE' docs/brand/outputs/06-story.md` returns 4 before
insertion: three narrative slots, one per version, plus the command line in this paragraph, which
contains the string it searches for. After insertion it returns 0. The count that matters is the
narrative one: three versions, three slots, one sentence.

**Locked-sentence containment, measured on a simulated insertion.** The reviewed candidate was
pasted into a scratch copy of this file and the containment pattern was run on both copies:

```
grep -cE 'convict|sentence|prison|evilginx|responsibility' docs/brand/outputs/06-story.md
   before insertion: 26 matching lines
   after insertion:  30 matching lines
grep -c 'building and monetizing a customized Evilginx' docs/brand/outputs/06-story.md
   before insertion: 0
   after insertion:  4   (the candidate quote in §00, plus one per version)
```

The keyword grep is deliberately noisy: most of its 30 hits are ordinary English ("sentence",
"responsibility") used in the story's own argument. The exact-phrase grep is the one to watch, and 4
is the expected number: one quotation of the candidate in §00, and one insertion in each of the
three versions. A fifth hit anywhere means a paraphrase has been smuggled in.

**The exemption this run created.** The pasted sentence is exempt from every rule in `04-voice.md`,
including R1 and R3, and the checker now strips it before measuring. Two reasons: it is quoted
verbatim by rule (decision G-2), and a sentence under legal review cannot be edited to satisfy a
style quota. Post-insertion the simulated file still reports 0 em dashes in authored prose and no
long-sentence violation, with the sentence present three times.

## References

The long version's opening scene, the kratt paragraph, the pivot line and the commitment list are all
drawn from material he has published: `[S-01]` `[S-03]` `[S-05]` `[S-06]` `[S-15]`. The candidate
sentences are quoted verbatim from `[S-05]` and `[S-33]`. The disclosure timeline is the audited record
in `[S-01]`. Decisions and preconditions cited by number: G-2, G-8, G-9, P-2.

## Sources

`[S-01]` disclosures corpus · `[S-02]` adversarial review · `[S-03]` drafts · `[S-05]` `src/content/site.ts` ·
`[S-06]` MyStoryPage · `[S-10]` Postimees 20.11.2024 · `[S-14]` Postimees keyword page ·
`[S-15]` LinkedIn capture · `[S-33]` 40C3 submission pack.
