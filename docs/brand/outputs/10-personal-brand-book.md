# 10 — The personal brand book: Tom Kristian Abel

**Phase 7 of `../personal-brand-program.md`. Written 2026-10-24.**
This is the document from which anyone (Tom, a conference organiser, an editor, a client) can write
about him consistently without asking. It synthesises `01`–`09`; where this book and a component
document disagree about a channel, the component document wins for that channel
(`04-voice.md` is normative for voice, `05-messaging.md` for message copy, `07-architecture.md` for
entity naming).

Evidence cites `[S-nn]` into the private register. `[unverified → needs Tom]` marks a field the
corpus cannot settle. The decisions of 2026-10-24 (`../decisions.md`) are binding on every page here.

---

## 01 — Foundation

**Brand:** Tom Kristian Abel. A person, not a company. The name is the brand.

**What he is (primary noun):** authentication-security researcher. Not "cybersecurity researcher"
(too broad, invites the commentator comparison), not "entrepreneur" (no artefact supports it
`[S-21]`), not "consultant" (invites the agency comparison).

**The one idea.** Most of his work lives at one fault line: the gap between what a system claims to
verify and what it actually verifies `[S-05]`. Every published piece is an instance of it. It is the
only differentiated territory the corpus supports, and the only one a competitor cannot copy without
doing the same work.

**The arc, as a pillar** (decision G-9). He started on the wrong side of the authentication arms
race, was convicted in 2024, and now points the same skills at closing the gap. The arc is stated
once, in one wording, on one page, and everything else links to it. It is a pillar because he says it
before anyone else can, not because it is a personality.

**Why the brand is credible.** Not authority, not credentials, not client names: checkability. Signed
article text, hash-verifiable pages, per-page disclosure records with named recipients and dates, a
public key, dated corrections. A reader can verify him without trusting him.

**What it refuses to be.** A redemption story retold on every surface. An "ex-hacker" identity. A
generic secure-systems consultant. A product pitch in research clothing. An authority without
receipts.

---

## 02 — The name "Cyber-Kratt", defined (decision G-3)

The decision is to keep the label and define it. This is the definition. It is the only approved
wording; paraphrases that invent an origin are prohibited, because no public source establishes one
(`[S-28]`).

> **Cyber-Kratt** is the name for the way this work gets done, not for who employs whom. A kratt, in
> Estonian folklore, is a thing built out of whatever is at hand, pointed at a task, and useful
> exactly as long as it is given one: resourceful and effective, and it turns on its owner if left
> idle. That is a fair description of a breaking skill. Cyber-Kratt is the discipline of pointing it
> at defences instead of gaps, and publishing what it finds. It is not a company, not a product, not
> a job title, and not a pseudonym.

**Where it may appear:** as a defined term, in a headline only after this definition is published on
a surface a reader can reach (`01-personal-brand-strategy.md` §10), in talk titles where a folk
metaphor earns its place, and in internal or company contexts.
**Where it may not:** as a substitute for the primary noun, in an employer line, or in any place where
a reader would reasonably ask "which company is that?" and get no answer.

---

## 03 — The four beliefs (the only ones the corpus supports)

From `statements-and-quotes.md` §5. Each carries the evidence that makes it sayable by him and not by
anyone else.

| # | Belief | Why he can say it |
|---|---|---|
| B-1 | The interesting failure is never the cryptography. It is the gap between what a system claims to verify and what it verifies. | Every research piece is an instance; stated in his own words `[S-05]`, Q-05, Q-07, Q-18, Q-19 |
| B-2 | The value of a breaking skill is in its direction, not its existence. | His own arc, plus the metaphor he keeps returning to `[S-06]`, Q-01, Q-04, Q-06, Q-10, Q-11 |
| B-3 | Client-side anti-fraud that cannot survive an operator-synthesising attacker is a promise, not a control. | The BotGuard SoK and the VLM work `[S-01]`, `[S-17]` |
| B-4 | Disclosure belongs with the vendor and the national authority before it belongs to an audience. | The per-page records, with named recipients and dates `[S-01]`, `[S-07]` |

No fifth belief. If a future piece needs one, it must be earned by evidence first.

---

## 04 — Verbal identity

**Normative source: `04-voice.md`.** Summary for daily use.

**Three registers, measured** (48,025 words of his own text):

| Register | Em dashes /1k | Avg sentence | Superlatives /1k |
|---|---|---|---|
| Long-form essays | 0.00 | 11–20 w | 0–4.4 |
| Research reports | 1.1–12.7 | 18–24 w | 0.6–3.0 |
| Site and marketing copy | 6.07 | 33.7 w | highest measured |
| Short-form / social | 1.1 | 17 w | 1.1 |

**The site is the outlier, not the standard.** Prose he writes for himself is short-sentenced and
dash-free; the harness around it inflates. When in doubt, write the essay version.

**Rules, with the check that enforces them** (`docs/brand/check-voice.mjs`):

1. No em dash in authored prose. Quotes and diagrams keep theirs.
2. "not X, but Y" at most once per thousand words (measured tic: 16 occurrences, densest in
   *I used to break authentication*).
3. No unsupported first-person authority. If the artefact is not public, the sentence does not
   contain "I have".
4. Sentence over 35 words must be enumerated; over 60 words must be quoted.
5. Superlatives and one-line closers: at most one per thousand words.
6. A pull-quote may not restate the paragraph above it.
7. Claim, then evidence, then the limit. A finding without its limit is a marketing sentence.

**Never, in any language:** "ex-black hat", "former hacker", "reformed", "ethical hacker",
"passionate about security", "cutting-edge", "world-class", "thought leader". The first four are
forbidden by the risk gate; the rest are the vocabulary of the audience he is not writing for.

---

## 05 — Messaging

**Normative source: `05-messaging.md`.** Core messages by audience (order fixed by decision G-7):

| Audience | Lead message | Proof it must carry |
|---|---|---|
| Research and engineering | "Here is a failure mode you can reproduce, and its limit." | the artefact: repo, method, disclosure status |
| Estonian public sector and regulators | "This is what your infrastructure claims to verify, and what it actually does." | the national-subject research, the disclosure record with recipients |
| Hiring and client-side partners | "Systems built under threat models he wrote, then tested by someone who has attacked them." | shipped systems, the MATx role, the research |

Per-channel messages, never-say lists and the CFP/press quote bank live in `05-messaging.md`.

---

## 06 — Brand in use

### Site (tomabel.ee)

- Tagline, hero, intro strip, About: person-first, idea-first, no unsupported aggregate claim
  (the About and homepage fixes of 2026-10-24 removed the last two).
- Every article states its disclosure status: who was told, when, and what they said, including the
  negatives.
- Dated corrections are written into the page, not posted elsewhere.
- Research pages carry signed, hash-verifiable text (7 of 19 today; extending coverage is a standing
  item).

### GitHub

- `tomkabel` is the person's canonical technical surface. Bio: "Authentication security researcher —
  breaking eID, anti-fraud, and browser attestation systems to build better ones." `[S-17]`
- `Proxyabel` is the company surface: company and product repositories only. `M41KL-N41TT` stays
  inert, pointing to `tomkabel`.
- Repositories are in the niche or archived. Off-niche tooling does not get a pinned slot.

### LinkedIn

- Headline, About and experience are governed by `01-personal-brand-strategy.md` §01: the primary
  noun leads, the forbidden label goes, "Cyber-Kratt" appears only after the definition is published.
- The measured register is short, direct, numbered, concrete, and closer to the essay voice than to
  LinkedIn's default. Checkbox emoji and full-width bold are used sparingly, as deliberate emphasis,
  not as a template.
- Comments are part of the brand: same rules, no exceptions, because comments are quoted back.

### Talks and CFPs

- The bio used for a submission is the short bio in §07 below. Where a CFP asks about background,
  the disclosure sentence is the one already reviewed or being reviewed (decision G-2). No variant.
- Talk titles follow the research titles: claim first, subject second, no adjectives.

### Press

- Written answers only, in full sentences, no voice notes, no paraphrase-friendly fragments.
- Anything about the case is answered by pointing to the single statement page. No re-litigation.
- Off-topic questions get "that is outside what I work on" and nothing more.

### Email and first contact

- Opens with the specific finding or question, not with the CV.
- Signature: name, primary noun, tomabel.ee, PGP fingerprint. No company block while P-1 is open.

---

## 07 — Bios (the reusable set)

Person-first in all of them. ProksiAbel OÜ stays out of the lead until P-1 (registry status) is
settled `[decisions.md P-1]`.

**Long, English (≈170 words).** Use on About, speaker pages, guest profiles.

> Tom Kristian Abel is an authentication-security researcher based in Estonia. His work sits at one
> fault line: the gap between what a system claims to verify and what it actually verifies. He
> reverse engineers identity protocols (FIDO2 / WebAuthn, eIDAS, Smart-ID), client-side anti-fraud
> and browser attestation, and at the opcode level the virtual machines those defences run in, then
> publishes what he finds with the disclosure record attached: who was told, when, and what they
> said. His BotGuard systematisation is public on GitHub (104 stars, 19 forks), his fingerprintproxy
> ships 72 browser profiles, and his Smart-ID and eID findings went to SK ID Solutions, then to RIA,
> TTJA and AKI. He writes in English and Estonian, treats corrections as part of the page rather than
> an erratum, and signs his published text so a reader can check it was not altered.

**Short, English (≈55 words).** Use in CFP forms, podcast intros, event programmes.

> Tom Kristian Abel is an authentication-security researcher in Estonia. He reverse engineers how
> identity protocols, client-side anti-fraud and browser attestation actually verify what they claim,
> and publishes the finding with its disclosure record. His BotGuard, Smart-ID and browser-fingerprint
> work is public on GitHub and tomabel.ee.

**One-liner, English (≈16 words).**

> Authentication-security researcher: I find the gap between what a system claims to verify and what
> it does.

**LinkedIn headline (≈12 words).** Person-first, no forbidden label.

> Authentication-security researcher · eID, anti-fraud and browser attestation · Estonian and English

**Estonian versions.** Translate the three above 1:1 in substance. Never shorten the claim in
Estonian because the sentence is harder. Working drafts:

> **Pikk (≈90 sõna).** Tom Kristian Abel on Eestis tegutsev autentimisturbe-uurija. Tema töö asub ühel
> murdejoonel: lõhe selle vahel, mida süsteem väidab end kontrollivat, ja selle vahel, mida ta
> tegelikult kontrollib. Ta pöördprojekteerib identiteediprotokolle (FIDO2 / WebAuthn, eIDAS,
> Smart-ID), kliendipoolset pettusetõrjet ja brauseri atesteerimist, ning avaldab oma leiud koos
> avalikustamise ajaloo­ga: kellele teatati, millal ja mida vastati. Tema BotGuardi süstematiseering on
> GitHubis avalik, fingerprintproxy sisaldab 72 brauseriprofiili, Smart-ID ja eID leiud jõudsid esmalt
> SK ID Solutionsini ning seejärel RIA, TTJA ja AKIni. Ta kirjutab eesti ja inglise keeles.
>
> **Lühike (≈35 sõna).** Tom Kristian Abel on Eesti autentimisturbe-uurija. Ta uurib, mida
> identiteediprotokollid, kliendipoolne pettusetõrje ja brauseri atesteerimine tegelikult kinnitavad,
> ning avaldab leiud koos avalikustamise ajalooga.
>
> **Üherealoo­ne (≈12 sõna).** Autentimisturbe-uurija: leian lõhe selle vahel, mida süsteem väidab
> kontrollivat, ja mida ta tegelikult kontrollib.
>
> **LinkedIni pealkiri.** Autentimisturbe-uurija · eID, pettusetõrje ja brauseri atesteerimine ·
> eesti ja inglise keeles

`[unverified → needs Tom: whether the Estonian "autentimisturbe-uurija" is the term he wants on
Estonian surfaces, against the stricter "autentimise turvalisus" phrasing used on the site.]`

---

## 08 — Do-not list

The consolidated prohibition set. Everything here is a rule, not a preference.

1. No new sentence anywhere about the 2024 case. One wording exists; it is under legal review
   (decision G-2).
2. No "ex-black hat", "former hacker", "reformed", "black hat" in owned copy, in any language, in any
   channel. This survives decision G-9: the pillar is the transition, not the label.
3. No naming or initialling of investigators, prosecutors, analysts or private individuals, including
   where press already published them.
4. No claim that a hostile reader cannot check: no design partners, no principal engineer, no
   aggregate disclosure claim.
5. No technical detail of an unfixed third-party vulnerability. Reference the report, not the
   mechanism, and confirm the fix state first.
6. No Proksimity recommendation without the conflict-of-interest line, in both languages.
7. No current client, no case number, no screenshots of correspondence.
8. No publishing the SoK manuscript while the filing decision is open (decision G-1).
9. No comment-section arguments about the case in any language.

---

## 09 — Governance and maintenance

| Rule | Who | Where it is written |
|---|---|---|
| One owner, one place: the past is stated on one page and linked elsewhere | Tom | decision G-8, this book §08 |
| Who may write in whose name (person vs company vs product) | Tom | `07-architecture.md` §06 |
| Every new public claim cites a source or is not published | Tom | `../00-evidence/` register + gate 3 |
| The book is updated when a decision changes, never when a sentence reads better | Tom | this page |
| Citation integrity checked mechanically before publishing | tooling | `node docs/brand/check-traceability.mjs` |
| Voice checked mechanically before publishing | tooling | `node docs/brand/check-voice.mjs` |

**The disclosure ledger** (decision G-5) is the next artefact owed by this book: one page listing each
finding, the recipient, the date, and the outcome, linked from every article's disclosure status.
The data already exists in the pages; the ledger aggregates it. It is specified here, built in
phase 9.

**Standing items that block a clean publish:** P-1 (company status), P-2 (legal review of the single
sentence), P-5's second half (the sweep is run; the rule is now in §09 row 1). P-3 and P-4 are closed
by this book and the About fix.
