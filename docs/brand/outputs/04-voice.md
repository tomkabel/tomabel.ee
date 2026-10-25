# 04 · Voice

`brand-voice` output, phase 5. **Status: draft for review.** Every quality in this file is derived
from text Tom Kristian Abel has already written, and every rule carries the counter it came from.
No adjective appears here without one.

**Evidence base.** The phase-1 measurement of the whole corpus: 17 files, 48,025 words, five essays,
ten research drafts, `src/content/site.ts` copy and the LinkedIn capture `[S-03]` `[S-05]` `[S-15]`.
Raw counters: `00-evidence/raw/voice-stats-2026-10-24.json`. Coded statements, themes and the four
corpus-supported beliefs: `00-evidence/statements-and-quotes.md` §2, §4, §5. The adversarial review
of his own writing: `[S-02]`. Binding decisions: `docs/brand/decisions.md` (G-2, G-3, G-5, G-8, G-9)
and `.agents/brand-context.md` §6, §10.

**How the numbers were produced.** Prose only: fenced code, headings, table rows, blockquotes and
bare-URL lines are excluded, so a quotation cannot be counted as his own sentence. Sentences are
split inside a paragraph, never across a blank line. Everything after a `## Sources` heading is
reported separately, because a reference list is not prose. Both facts matter: the first recount
below changed a phase-1 conclusion, and the reason was the source lists.

**One correction to phase 1, stated up front.** Phase 1 reported the research drafts at up to 12.65
em dashes per 1,000 words and filed that as a second register. Recounting prose and bibliography
separately: 12 of the 15 draft files use **zero** em dashes in prose, and the counts sit in
`## Sources` lines instead (28 of 28 in `chatgpt-is-not-a-phishing-scanner.md`, 12 of 12 in
`smart-id-achilles-heel.md`). Of the three files with em dashes in prose, one is an internal review
document (`estonia-gov-code-landscape.review.md`, 35), one is the piece the review already flags P1
(`russian-cyber-ops-estonia-hosting.md`, 8) `[S-02]`, and one uses two. The essays remain at zero in
9,248 words `[S-03]`. So this is one rule for all owned prose, not two registers. The site copy is
the surface that breaks it: 6.07 per 1,000 words `[S-05]`.

**What is not measured here.** The 19 live disclosure pages were not swept one by one in this pass,
so the pull-quote rule below rests on the review's finding plus the home page. That gap belongs to
phase 7. LinkedIn chrome (connection names, section furniture) is not separable from his own posts
in the capture, so the LinkedIn row in §09 uses the phase-1 figure `[S-15]`.

---

## 00 · How to check a text against this guide

Falsifiable means executable. Two commands and three greps.

**Automated.** `node docs/brand/check-voice.mjs <file.md>`. It applies R1 to R7 below, prints the
measured value against each threshold, prints every offender at the end, and exits 1 on any failure.
The thresholds in the script are the quotas in §05, nothing else. Two documented exceptions are built
into it: R2 needs five sentences or more, because an average over one sentence says nothing, and the
locked past-sentence is stripped before measuring, because a sentence under legal review cannot be
edited to satisfy a style quota (decision G-2). With no arguments the script checks the three
articles and exits 1, because those three carry the failures reported in §09; pointing it at a draft
you are writing is the normal use.

**Manual, three rules a script cannot judge.** Each is a grep plus a decision:

1. **Pull-quote (R8).** Take the quote string, count it in the body: `grep -c "<quote>" <file>`.
   One occurrence is a title. Two is a restatement. `[S-02]` finding #10.
2. **Aggregate disclosure claim (R9).** `grep -in "disclos" src/content/site.ts`. Any aggregate
   first-person claim has to point at a recipient and a date, or it comes out `[S-02]` finding #2.
3. **Case wording (R11).** `grep -rniE "convict|sentence|prison|evilginx|responsibility"`
   over the target. Hits are allowed in exactly one slot, the locked sentence `[S-33]` decision G-2.
   Everywhere else they are a defect, including in a footnote.

**Fail policy.** A failed rule is a copy defect, not a judgement call. Fix the text, or record in
the PR why the rule does not apply to that file. Never soften the rule to fit the draft: if the
rules fail on writing he does well, the rules are wrong and the rule gets rewritten, which is what
happened three times while these three documents were being produced (§09).

---

## 01 · Voice overview

He writes like someone who has just taken the thing apart and is telling you exactly what he found,
including the parts that do not flatter the finding. Sentences are short. Numbers and dates appear
where an adjective would be easier. Claims come with their limits attached, and the limit is stated
in the same breath as the claim, not as a disclaimer at the end. He is dry about systems and dry
about himself, and he does not perform either. The reader is treated as a peer who will check the
working, because the working is published.

**Voice essence.** Tom Kristian Abel sounds like an engineer reading a system's claims back to it,
line by line, with the receipts open on the table: precise, unsentimental, checkable.

**What this voice is not.** It is not confessional. It is not a redemption arc, an authority
performance, or a vendor pitch wearing research clothes. The full list of what it refuses is in §08
and in `.agents/brand-context.md` §4.

---

## 02 · Tone dimensions

Five axes, each anchored to a sentence he actually published. The anchors are the guide.

**Formal ←→ Casual: casual with a technical floor.** Contractions, "Lol." after a sharp observation,
direct address. Register drops but precision does not.
Anchor: "The door got stronger, so they use the window next to it. Lol." `[S-15]`

**Calm ←→ Energetic: calm, and the calm is the argument.** Assertions are short and flat, and the
flatness is what makes them land. No exclamation marks anywhere in the corpus.
Anchor: "Defenders add more signals. Attackers learn to simulate them." `[S-03]`

**Serious ←→ Witty: serious, with dry humour allowed once per piece.** The humour is aimed at the
subject or at himself, never at a person or an institution. A self-mocking aside is a permitted
move, and it is measured at one occurrence in the LinkedIn capture.
Anchor: "(Excuse the language. 2022 me was more confidently ballsy than polite)" `[S-15]`

**Accessible ←→ Authoritative: authoritative through artefacts, never through a title.** He
establishes standing by naming the recipient, the date and the limit. The clearest example in the
corpus is an honest negative on his own site: a page whose disclosure status reads "Not reported to
Google." `[S-01]`
Anchor: "I had a rare skill, no direction for it, and I pointed it at the wrong things." `[S-06]`

**Distant ←→ Intimate: distant, with one deliberate exception.** Responsibility is stated once, in
plain nouns, and the case is not narrated `[S-06]` `[S-15]`. The exception is Estonian, where the
register loosens and praise of an institution that prosecuted him is on the record.
Anchor: "Väga kõva sooritus, PPA. Päriselt ka." `[S-15]` (Estonian, quoted
verbatim; the only non-English string this document carries, and it is here because the axis is the
language switch itself)

---

## 03 · Voice qualities

Six, each with a real example and the failure it guards against.

**1. Claim, evidence, limit.** State the claim, show the artefact, then state what it does not
cover. The limit is written into the page, not bolted on later.
Do: "an end-to-end run of the full relay chain was still pending when this report was written"
`[S-03]`.
Don't: an unqualified finding, or a caveat parked in a footnote where a hostile reader will find it
before a friendly one does.

**2. Numbers over adjectives.** Where a quantity exists, the quantity goes in.
Do: "104 stars / 19 forks" on the BotGuard SoK repository `[S-17]`.
Don't: "widely used", "a lot of profiles", "years of experience".

**3. Receipts or silence.** A claim about his own conduct carries a recipient and a date, or it does
not ship. The disclosure ledger (decision G-5) is the mechanism.
Do: "Coordinated disclosure to SK ID Solutions (Nov 2025), then RIA, TTJA and AKI (Apr 2026)",
recorded per page `[S-01]`.
Don't: "I always disclose responsibly." That sentence is on the live site right now and it is the
review's most repeated finding `[S-02]` `[S-05]`.

**4. Precision about what a thing actually does.** Guards, protocols and products are described by
mechanism, never by intention or by category name.
Do: "The phone reports that the user approved. It cannot report what the user was shown, because it
never sees it." `[S-03]`
Don't: "military-grade", "AI-powered", "passwordless", "zero trust" used as praise rather than as a
named architecture.

**5. Unsentimental about himself.** The past is a fact with a date and a consequence, not a story
with a moral, and it is not used as a credential.
Do: "I do not present that history as a credential. I present it as the reason I think the pointing
question is the only question that matters." `[S-03]`
Don't: any framing where the skill is the redemption, or where the past is retold as an origin myth.
Any new sentence about the case is blocked until the legal review lands (decision G-2, precondition
P-2). Use the locked sentence and stop.

**6. Both languages are real.** Estonian material is written as Estonian copy, not as a translation
of the English page. The public-sector audience reads the Estonian text first `[S-15]`.
Do: the kratt explanation, which he wrote in both languages `[S-15]`.
Don't: machine-translated sentences with English word order and an English metaphor left in place.

---

## 04 · Vocabulary

**Words this brand uses.** fault line, claim, verification claim, what a system claims to verify,
the gap, approval screen, relay, replay, session binding, boundary, translation problem, opcode,
bytecode VM, attestation, relying party, direction, capability, idleness, disclosure, recipient,
date, status, honest negative, correction, changelog, artefact, checkable, signed text, hash,
limit, degradation, drift.

**Words and phrases this brand avoids.** _hacker branding_: `ex-black hat`, `ex-hacker`,
`former hacker`, `reformed`, `ethical hacker`, `black hat`. _vendor adjectives_: `cutting-edge`, `world-class`, `game-changing`,
`revolutionary`, `military-grade`, `AI-powered`, `seamless`, `robust`, `best-in-class`,
`industry standard`, `unrivalled`. _hype nouns_: `solutions`, `synergies`, `thought leader`, `cybersecurity expert`, `guru`.
_unsupported claims_: `I always disclose responsibly`, `years of experience`, `as an expert`,
`design partner`, `principal engineer`. The full ban list with its reasons is §08.

**One quantity claim is still wrong on the live site.** "65+ browser profiles" appears four times in
`src/content/site.ts` while the artefact says 72 `[S-17]`, decision G-6. New copy uses the reconciled
figure. Two related items moved while this file was being written: the MATx title was reconciled on
the About body, so the copy now reads "Co-Founder and CTO" `[S-05]`, though the sole record remains
the company's own document (`.agents/brand-context.md` §7, `03-positioning.md` §08), and the
unsupported "1.4M+ users" is gone repo-wide in both languages (review finding §4 `[S-02]`, confirmed
in the audit's remediation table).

**Brand-specific language.**

- **The fault line.** Always the same sentence, in his words: "the gap between what a system claims
  to verify and what it actually verifies" `[S-05]`. This is the one idea the corpus supports in
  four coded statements: Q-05 `[S-06]`, Q-07 `[S-05]`, Q-18 and Q-19 `[S-15]`. Do not paraphrase it
  into marketing language.
- **The kratt.** Public and defined (decision G-3). The definition owed by P-4 is drafted in
  `05-messaging.md` §08: what it means, why the name, what it is not.
- **The receipts.** The disclosure ledger, the signed article text, the corrections changelog.
  Named, dated, checkable `[S-01]`.
- **The past.** One locked sentence, one owner, one place (decisions G-2 and G-8). The sentence is
  not authored here. `06-story.md` §00 quotes the existing candidates verbatim and marks the slot.

**Preferred English.** British spelling throughout, matching the pending talk submission `[S-33]`.

---

## 05 · Writing style rules

Each rule is a quota with the measurement that produced it and the failure it prevents. R1 to R7 are
enforced by `docs/brand/check-voice.mjs`. The register split is essay (argument, bio, short-form)
versus research report.

| # | Rule | Threshold | Measured basis | Failure it prevents |
|---|---|---|---|---|
| R1 | No em dashes in owned prose | 0 | five essays: 0 in 9,248 words `[S-03]`; site copy: 6.07 per 1,000 `[S-05]` | the marketing surface inventing a punctuation habit he does not have |
| R2 | Sentence average | ≤22 words (essay), ≤25 (research report), measured only on texts of five sentences or more | essays 11.2 to 21.1; research 16.3 to 24.5 `[S-03]`; site copy 33.7 `[S-05]` | the site's 33.7-word average, the least him-like text on his own domain |
| R3 | Sentences over 35 words must be enumerated (colon list, three commas, parenthesis or quotation) | 0 violations | essays: 0 unenumerated long sentences; `the-pin-that-cannot-be-delegated` has 5 `[S-03]` | clause chains that read as law rather than as engineering |
| R4 | `not X, but Y` | ≤1 per 1,000 words, never twice in one section | 16 corpus-wide, 4 in 1,795 words in the densest essay `[S-02]` `[S-03]` | the tic the review named, at the density the review predicted |
| R5 | Superlatives | ≤1 per 1,000 words, 0 in bios and headlines | essays 0 to 4.46, site 1.56, the highest prose segment `[S-05]` | the surface that exaggerates relative to every first-person text |
| R6 | One-line closers | ≤1 per 1,000 words | `i-used-to-break-authentication`: 3 in 1,719 words; every other corpus file: 0 | the drumroll sentence that closes a section he has already closed |
| R7 | Risk-gate and banned-phrase scan | 0 hits in prose | "Ex-Black Hat" is live in the LinkedIn headline today `[S-15]` | the label he did not choose, sitting in the one place a recruiter reads |
| R8 | One pull-quote per page, never a verbatim repeat of the body | 0 repeats | `[S-02]` finding #10; home page passes today `[S-05]` | a quote that repeats the sentence the reader is about to read again |
| R9 | No aggregate first-person disclosure claim without a named recipient and date | 0 | `[S-02]` finding #2; live offender in `bio.paragraphs[1]` `[S-05]`; decision G-5 | a claim that the per-page records already contradict |
| R10 | No quantity the artefact contradicts | 0 | "65+" against 72 `[S-17]`; decision G-6 | a hostile reader finding the real number in ten seconds |
| R11 | Case wording | exactly one locked sentence, quoted from the slot, exempt from every other rule | decision G-2, precondition P-2, `[S-33]` | a fifth variant of the past |

**The one exemption, stated plainly.** The locked past-sentence is inserted verbatim
(`06-story.md` §00). It is exempt from R1 and R3 and from everything else in this table, for two
reasons: quoting it verbatim is the rule, and a sentence that a lawyer is reviewing cannot be
punctuated to suit a style guide. The checker strips it before measuring, so a writer who inserts it
still gets a clean report on their own prose, and nobody is tempted to edit the sentence quietly.

**Punctuation.** Full stops, commas, colons, semicolons, parentheses, quotation marks. No em dashes.
En dashes only in ranges and in the Estonian name of the award body `[S-15]`. Exclamation marks:
zero in the corpus, so zero. Question marks are a tool, and the three-question passkey checklist is
the model `[S-15]`.

**Style mechanics.** Sentence case for headings. Contractions allowed. Active voice, with one
exception: a finding whose actor is unknown stays in the passive rather than being blamed on a
guess. Numbers as numerals for quantities, dates and versions, spelled out only when they open a
sentence. Acronyms spelled out at first use in each document. Estonian and English carry the same
figures and the same qualifiers `[S-02]`.

**Humour.** Allowed. Dry, aimed at the subject or at himself, at most one aside per piece.

**LinkedIn short-form devices, now documented as intentional.** The LinkedIn voice shares almost
nothing with the site voice, and nothing in the repo said which moves were deliberate `[S-04]`
(audit D4). Measured in the capture `[S-15]`: 14 checkbox marks in the passkeys scorecard, 16
full-width bold runs, 51 hashtags, tagged stacks of 7 to 9, and one self-mocking aside. The rules:
checkboxes and full-width bold are allowed, and only for a verdict list. At most five unique
hashtags per post, with no repeats (line 85 of the capture lists `#PPA` twice). At most one aside
per post. Everything else in this section applies unchanged on LinkedIn.

---

## 06 · Channel adaptations

Voice is constant. Tone and length move.

| Channel | Tone adjustment | Length | Example |
|---|---|---|---|
| Site (research page) | Full argument, limits stated in place, corrections changelog | long | "The claim here is not that this exact chain has been run against a live bank; it is that the architecture of cross-device QR flows makes the relay possible." `[S-03]` |
| Site (home / About) | The same voice with the noun phrases fixed; short declaratives only | short | "I reverse engineer how authentication and browser defenses fail, then design the systems that survive what I find." `[S-05]` |
| LinkedIn post | One finding per post, verdict list allowed, dry aside allowed once | short | "So if your security story ends at 'we support passkeys,' ask:" `[S-15]` |
| GitHub README | Mechanism first, reproduction second, no positioning | medium | "Authentication security researcher. Breaking eID, anti-fraud, and browser attestation systems to build better ones." `[S-17]` |
| CFP bio | Third person, the 50-word bio from the submitted pack, unchanged | 50 words | `[S-33]` |
| Press quote | One sentence, on the record, no case wording, link the rest | 1 to 2 sentences | see `05-messaging.md` §06 |
| Email | Plain, dated, names the recipient and the ask | short | "Reported to SK ID Solutions, 12 Nov 2025; status tracked at /disclosures." `[S-01]` |

---

## 07 · Before and after

Real copy from the live surfaces, rewritten inside the rules. These are proposals, not shipped
changes, and no rewrite introduces a fact the corpus does not already carry.

**1. Tagline** (site.ts, `[S-05]`)
Before: "Systems architect and security researcher."
After: "Authentication research: claimed verification against actual verification."
Why it works: the audit's test is whether a competitor could wear the sentence (D1 2/5). The current
one fits thousands of people; the replacement is the one idea the corpus supports in four places.
Final wording is a phase-7 decision, not a phase-5 one.

**2. Meta description** (`index.html`, `[S-05]`)
Before: "Tom Kristian Abel — Security Researcher & Systems Architect. I reverse engineer how
authentication fails, then build systems that survive what I find."
After: "Tom Kristian Abel researches how authentication and browser defenses fail, and builds the
kind that survives it. Disclosures, research and writing from Estonia."
Why it works: em dash removed (R1), 33-word opener split into two sentences inside the register
(R2), and the role noun appears once instead of twice.

**3. About paragraph 3, the MATx line.** Proposed here as "These days I am Co-Founder and CTO at
MATx, a maths-learning platform", and shipped during this phase: the About body now reads
"Co-Founder and CTO at MATx (matx.ee)" `[S-05]`. Keeping it in as a worked example, because the
reason holds on every other surface: the title matches MATx's own documents (G-6), and the proof
column stays empty until something other than the company's own document carries it
(`.agents/brand-context.md` §7, `03-positioning.md` §08).

**4. The disclosure overclaim** (`bio.paragraphs[1]`, `[S-05]`, decision G-5)
Before: "I disclose what I find, in public, and I take responsibility for all of it."
After: "Every disclosure on this site records who was told, when, and what they said. Where I did
not report a finding, the page says so."
Why it works: the aggregate claim is unsupported where the review checked `[S-02]`, and the
replacement is the ledger the same decision asks for. It is also smaller, which is the point.

**5. The quantity claim** (`[S-05]`, decision G-6)
Before: "Production Go TLS-fingerprinting proxy. 65+ browser profiles, JA3/JA4, MITM support."
After: "Production Go TLS-fingerprinting proxy. 72 browser profiles, JA3/JA4, MITM support."
Why it works: the artefact says 72 `[S-17]`. Understating is still being wrong, and it is the
easiest kind of error for a reader to catch.

**Not rewritten, deliberately.** The hero two-liner and the pull-quote touch the past and the
canonical statement. Both are existing approved-in-place copy `[S-05]`, both are blocked by the
legal review (G-2, P-2), and neither is rewritten here.

---

## 08 · Things we never say

| Never | Why |
|---|---|
| ex-black hat, ex-hacker, former hacker, black hat, reformed, ethical hacker | labels he did not choose; the risk gate forbids them in owned copy. "Ex-Black Hat" is live in the LinkedIn headline and comes out in phase 9 `[S-15]` |
| any fifth wording of the case | decision G-2. One sentence, one owner, one legal review. `06-story.md` §00 holds the slot |
| the name of any investigator, prosecutor, analyst or private individual | `.agents/brand-context.md` §10, gate 4. Press named people; brand copy does not `[S-10]` `[S-14]` |
| "I always disclose responsibly" and every aggregate version of it | unsupported where the review checked, 13 of 19 pieces `[S-02]`; the per-page record is the honest form |
| design partner, principal engineer, any commercial claim about the product | no artefact behind them today `.agents/brand-context.md` §7 |
| client names, client counts, revenue, headcount | confidentiality is a stated commitment on the site `[S-05]`, and the company's own registry record is thin `[S-26]` |
| "65+ browser profiles", "1.4M+ users" | contradicted by the artefact, or already deleted from the repo `[S-17]` `[S-02]` |
| hacker as a self-description, "we hack things" energy | the category is authentication-security research, not "cybersecurity" (`.agents/brand-context.md` §3, §4) |
| vendor adjectives: cutting-edge, world-class, game-changing, military-grade, AI-powered, seamless, robust | the corpus measures 0 to 4.46 superlatives per 1,000 in prose and a mature defender is described as unimpressed by adjectives `[S-03]` |
| Cyrillic-style "cyber" theatre, threat-actor nicknames he did not use | `[S-23]` records no talks, no forum presence and no third-party work of that kind on his record |
| any claim about Proksimity's commercial state | no artefact exists; the product is a disclosure obligation, not a message `[S-01]` |
| the SoK manuscript, in any form | hard gate until the provisional-filing decision resolves, decision G-1 |

**Gate 2 reminder.** Every piece that recommends server-side traffic verification carries the
Proksimity conflict-of-interest line, in both languages, unchanged `[S-01]`.

---

## 09 · The voice check, run

Method: `node docs/brand/check-voice.mjs`, three articles from three registers. Raw output kept
below as produced, including the failures.

```
| file | register | words | avg sent | max sent | em in prose | em in sources | not X, but Y | superlatives | one-line closers |
|---|---|---|---|---|---|---|---|---|---|
| drafts/i-used-to-break-authentication.md      | essay    | 1719 | 12.64w | 41w | 0 (0/1k) | 0  | 4 (2.33/1k) | 0 (0/1k)   | 3 (1.75/1k) |
| drafts/the-kratt-problem.md                   | essay    | 1561 | 12.20w | 36w | 0 (0/1k) | 0  | 1 (0.64/1k) | 0 (0/1k)   | 0 (0/1k)    |
| drafts/research/smart-id-achilles-heel.md     | research | 2561 | 18.56w | 57w | 0 (0/1k) | 12 | 1 (0.39/1k) | 1 (0.39/1k) | 0 (0/1k)   |
```

| Article | Verdict | Failures |
|---|---|---|
| `i-used-to-break-authentication` | **fail** | R4: 4 tics in 1,719 words (2.33 per 1,000, the densest in the corpus). R6: 3 one-line closers (1.75 per 1,000). |
| `the-kratt-problem` | **pass** | none |
| `smart-id-achilles-heel` | **fail** | R3: two sentences over 35 words that are clause chains, at 38 and 43 words. R1 passes with 0 in prose and 12 in the reference list. |

**What the three runs mean.** The rules describe two of the three pieces exactly, and the two
failures are the two defects the review named in advance, in the same file `[S-02]` finding #10. The
`not X, but Y` quota and the closer quota are not taste judgements imported from outside; they are
the measured behaviour of the densest essay, and the essay fails on its own numbers. The research
report's two failures are clause chains in the legal argument, which is a fair hit on prose that
reads as law rather than as engineering.

**Three rules were rewritten during this check, and that is the point of running it.** A 35-word
absolute cap and a 40-word absolute cap both failed `i-used-to-break-authentication`, a piece that
reads well, because his long sentences are enumerations rather than clause chains. The rule now
allows a long sentence when it enumerates and fails it when it stacks subordinate clauses. A blanket
research-register em-dash allowance was also wrong: it existed because the phase-1 counter had
counted reference lists as prose. The third correction came from pointing the checker at the story
documents: R2 is an average, so it now needs a sample of five sentences, and a one-liner is judged by
R3 alone. Full record in `06-story.md` §05.

**Control row, not an article.** The site copy is the surface the audit scored as the least him-like
text on his own domain: 33.7-word average sentences, 6.07 em dashes per 1,000, 1.56 superlatives per
1,000, all three outside the range every first-person segment occupies `[S-05]`. Measuring only the reader-facing `en:`
strings gives a lower average (21.3 words, because navigation labels are in the same pool) and a
higher em-dash density (7.38 per 1,000), concentrated in the blurb pattern "Title — subtitle". No
absolute cap survives this comparison. The copy does not.

**This guide checked against itself.** The same command run on `04-voice.md`, `05-messaging.md` and
`06-story.md` is the honest test of whether the rules are writable. It failed first time: this
document tripped its own banned-phrase scan by naming the banned phrases in prose, which is why they
now sit in code spans and tables, and `05-messaging.md` tripped R3 with one 36-word proof point that
has since been split. Final state, three files, 0 failures, recorded verbatim in `05-messaging.md`
§09.

---

## 10 · What would falsify this guide

1. One corpus file where the rules fail for a stylistic reason rather than a copy-defect reason,
   and the file reads well. That happened twice during production and both rules were rewritten.
2. A sentence he writes in the register the corpus measures that R2 or R3 rejects. Watch the essays: their average
   runs 11 to 21 words and their long sentences are enumerations, so a rejection means the rule is
   measuring the wrong thing.
3. A disclosure record that turns out to carry no recipient or date. Then R9 is the wrong rule and
   the fix is a record, not a sentence.
4. Two independent readers classifying the same paragraph as on-voice and off-voice. Then §03 is
   too abstract and the anchors need to do more work.
5. The legal review returning a different sentence than the slot in `06-story.md` §00. Then
   `06-story.md` is rebuilt around the reviewed sentence, and this file changes only if the sentence
   changes the voice, which it should not.

---

## Sources

`[S-01]` disclosures corpus · `[S-02]` adversarial review · `[S-03]` drafts and research drafts ·
`[S-04]` audit D4 (voice score) · `[S-05]` `src/content/site.ts` · `[S-06]` MyStoryPage ·
`[S-10]` Postimees 20.11.2024 · `[S-14]` Postimees keyword page · `[S-15]` LinkedIn capture ·
`[S-17]` GitHub `tomkabel` · `[S-23]` technical footprint findings · `[S-26]` ProksiAbel OÜ
registry findings · `[S-33]` 40C3 submission pack.
Numbers in §09 come from `docs/brand/check-voice.mjs`, run 2026-10-24, and from
`00-evidence/raw/voice-stats-2026-10-24.json` (phase 1).
