# Coded statements and quotes — Tom Kristian Abel

Every row is a public statement with a theme code and a claim status, so later brand outputs can
cite the row instead of paraphrasing from memory. Register it cites: `source-register.md` (`[S-nn]`).

Claim status: `verified` · `founder-asserted` (he said it, nothing external corroborates) ·
`needs-proof` (live on a surface with nothing behind it) · `do-not-use` (true but damaging,
unadjudicated, or self-incriminating).

Translations from Estonian are mine, marked `[tr]`; they are working translations for strategy use,
not publication copy.

---

## 1. The brand as it currently speaks (verbatim, controlled surfaces)

### 1.1 Site — `src/content/site.ts` `[S-05]`

| Slot | Verbatim (EN) |
|---|---|
| Tagline | "Systems architect and security researcher." |
| Hero, line 1 | "I broke authentication for a living." |
| Hero, line 2 | "Now I build the kind that doesn't." |
| Intro | "I'm Tom Kristian Abel, a systems architect and security researcher. I reverse engineer how authentication and browser defenses fail, then design the systems that survive what I find." |
| Pull-quote | "Most of my work lives at one fault line: the gap between what a system claims to verify and what it actually verifies." |
| Body | "I've spent years on both sides of that gap — first exploiting it, now closing it. These days I research identity protocols (FIDO2 / WebAuthn, eIDAS, Smart-ID), reverse engineer anti-fraud systems at the opcode level, and ship production platforms built secure-by-design. I disclose what I find, in public, and I take responsibility for all of it." |
| Disclaimer | "ProksiAbel OÜ maintains strict client confidentiality. I, personally, am publicly accountable for my research and opinions." |
| Languages | "Estonia-based. I write in English and Estonian." |

Status: the hero two-liner and the pull-quote are `founder-asserted` self-description;
"reverse engineer … at the opcode level" is `verified` against S-01's BotGuard work; "ship
production platforms" is `needs-proof` in the sense that the platforms named on /systems are not
publicly inspectable (11 of them 404 per `[S-23]`).

### 1.2 LinkedIn `[S-15]`

| Slot | Verbatim |
|---|---|
| Headline | "Founding Engineer \| Cyber-Kratt \| Ex-Black Hat" |
| About ¶1 | "I construct and build highly secure systems for Design Partners - secure from the start, by considering how an attacker thinks." |
| About ¶2 | "In my previous role, I worked on the other side of authentication security where I analyzed, avoided and used weaknesses in browser defenses, TLS fingerprinting and anti fraud systems." |
| About ¶3 | "It is important to me to be open about this history because it provides the basis for my current activities." |
| About ¶5 (kratt) | "The name \"Cyber-Kratt\" is a reference to the kratt, which is a creature from Estonian stories, built from household items, that is made to collect riches for its maker. It is resourceful and effective but will turn on its owner if left without a task. A two-edged sword. Its strength needs careful direction so that it performs useful tasks." |
| About ¶6 | "I perform this work openly, and take full personal responsibility for my research and the opinions I express." |
| Experience title | "Independent Exploitation Researcher & Tool Developer" (Independent Researcher, Jun 2021 – Jul 2024) |
| Experience title | "Founding Engineer" (ProksiAbel OÜ, Jan 2025 – present) |

Status: `founder-asserted`. **Two entries are on the risk gate's forbidden list**: "Ex-Black Hat"
(S-15) and the job title "Independent Exploitation Researcher". Static risk, already published.

### 1.3 GitHub `[S-17]` `[S-18]` `[S-19]`

| Surface | Verbatim |
|---|---|
| tomkabel bio | "Authentication security researcher — breaking eID, anti-fraud, and browser attestation systems to build better ones." |
| Proxyabel (company) bio | "The only real defense is active defense." |
| M41KL-N41TT name/bio | "Tom Kristian Abel (archived)" / "Archived account. My current research and work: github.com/tomkabel" |

Status: the tomkabel bio is the cleanest existing self-description (`founder-asserted`, and it is
the one the AI answer and search results surface favourably). The company bio is a stance, not a
description — it is the only place a "defence is active" position is stated.

---

## 2. First-person statements (coded)

Theme codes: **T1** self-identification · **T2** the fault line (claimed vs actual verification) ·
**T3** the past and responsibility · **T4** craft (how the work is done) · **T5** direction
(same skill, other use) · **T6** disclosure ethics · **T7** public stance (non-work subjects) ·
**T8** refusals.

| # | Source | Verbatim | `[tr]` | Theme | Status |
|---|---|---|---|---|---|
| Q-01 | `[S-06]` | "I was young, I could break things, and I did." | — | T3 | `founder-asserted` |
| Q-02 | `[S-06]` | "I sold my skills to people who used them to get into accounts that weren't theirs, and I told myself the line I was standing on was a legal one. It wasn't." | — | T3 | `founder-asserted` |
| Q-03 | `[S-06]` | "I take full responsibility for my actions during that time. I'm not going to narrate the case here, name anyone involved, or describe what the tools did." | — | T3, T8 | `founder-asserted` |
| Q-04 | `[S-06]` | "I had a rare skill, no direction for it, and I pointed it at the wrong things." | — | T3, T5 | `founder-asserted` |
| Q-05 | `[S-06]` | "You can sell the gap, or you can close it. The first pays faster and ends the way mine ended. The second is the only version that compounds." | — | T2, T5 | `founder-asserted` |
| Q-06 | `[S-06]` | "I didn't have to become a different person. I had to point the same person somewhere useful." | — | T5 | `founder-asserted` |
| Q-07 | `[S-05]` | "the gap between what a system claims to verify and what it actually verifies" | — | T2 | `founder-asserted` |
| Q-08 | `[S-15]` | "I construct and build highly secure systems for Design Partners - secure from the start, by considering how an attacker thinks." | — | T1, T4 | `founder-asserted` |
| Q-09 | `[S-15]` | "It is important to me to be open about this history because it provides the basis for my current activities." | — | T3 | `founder-asserted` |
| Q-10 | `[S-15]` | kratt: "…will turn on its owner if left without a task. A two-edged sword." | — | T5 | `founder-asserted` |
| Q-11 | `[S-12]` | "teisel poolel rindejoont" | "on the other side of the frontline" | T1, T5 | `verified` (quoted in press) |
| Q-12 | `[S-08]` | "Ma pakun konsultatsioone ja konfiguratsioone." | "I offer consultations and configurations." | T1 | `verified` (in interview) |
| Q-13 | `[S-08]` | "Muidugi nõustusin nendega rääkima ja enda lugu jagama, sest mulle meeldib aidata inimesi." | "Of course I agreed to talk to them and share my story, because I like helping people." | T3, T7 | `verified` |
| Q-14 | `[S-08]` | "Mind ei vahistatud, nad andsid mulle läbiotsimismääruse, kuid ma ise lasin nad sisse, sest mul ei olnud miskit varjata." | "I wasn't arrested; they gave me a search warrant, but I let them in myself, because I had nothing to hide." | T3 | `verified` |
| Q-15 | `[S-08]` | "Ma muidugi märkasin neid ja sain kohe aru, mis toimub, sest nad ei viinud neid uurimiseksperimente, kuriteo matkimisi ja jälitustoimingud läbi nagu professionaalid teevad seda välismaal." | "Of course I noticed them and immediately understood what was going on, because they didn't conduct those research experiments, crime simulations and surveillance operations the way professionals do abroad." | T3 | **`do-not-use`** |
| Q-16 | `[S-08]` | "Nad on toime pannud kuriteo matkimist Telegramis … ja ma olen nendega varem suhelnud." | "They have carried out a simulated crime on Telegram … and I have communicated with them before." | T3 | **`do-not-use`** |
| Q-17 | `[S-15]` | "My reply, as \"Dead Souls\" … FIDO was delivered half-assed." | — | T3, T7 | **`do-not-use`** — his own post links him to a Russian cybercrime forum handle, 2022 |
| Q-18 | `[S-15]` | "I was sitting where attackers sit, and from there it was obvious that defenders measure their strongest path and attackers use the weakest one." | — | T2, T4 | `founder-asserted` |
| Q-19 | `[S-15]` | "So if your security story ends at \"we support passkeys,\" ask: → do you also support password + OTP? → are passkeys enforced to all? → After login, how do you know the session still belongs to the same person?" | — | T2, T4 | `founder-asserted` |
| Q-20 | `[S-15]` | "Nad unustavad ära, et e-Eesti ei ole lihtsalt läikiv turunduslause, millega konverentsidel eputada." | "They forget that e-Estonia is not just a shiny marketing phrase to show off at conferences." | T7 | `founder-asserted` |
| Q-21 | `[S-15]` | "Väga kõva sooritus, PPA. Päriselt ka." | "Very strong work, PPA. Really." | T7 | `founder-asserted` — praise of the state's cybercrime unit, after the conviction |
| Q-22 | `[S-02]` (quotes S-01) | "Always disclosed responsibly" | — | T6 | `needs-proof` — the review found no evidence behind the claim on 13 of 19 pieces, and an undisclosed conflict of interest (his own product category) |
| Q-23 | `[S-01]` | "I make my own version of Evilginx and sell it" (paraphrase of the 2024 LinkedIn CV the press quoted) | — | T3 | `do-not-use` — press-quoted, not self-authored since; never restate |

**What the coded rows show.** The T5 material (same skill, redirected) is the strongest and most
repeated asset he owns — it appears in three independent places, twice in his own words, once
quoted by press. T2 (the fault line) is the only differentiated idea that recurs across research and
personal writing. T3 is the most *voluminous* and the most dangerous: 16 of 23 rows touch the past,
and four of them are unusable. T6 is currently a liability, not an asset, because the disclosure
claim is unsupported where the review checked.

---

## 3. Third-party statements about him (perception layer)

| # | Source | Verbatim | Theme | Status |
|---|---|---|---|---|
| P-01 | `[S-12]` | "tunamullu arvutikuriteo ettevalmistamises süüdi mõistetud Tom Kristian Abel" `[tr]` "Tom Kristian Abel, convicted the year before last of preparing a computer crime" | press framing | `verified` |
| P-02 | `[S-21]` | "openly frames his career around a transition from offensive \"black-hat\" hacking to engineering secure-by-design defensive systems" | AI framing | `verified` as what the AI says |
| P-03 | `[S-10]` | PPA cybercrime head, on his LinkedIn CV: "See on esmakordne juhtum, kus kurjategija taolisel kujul oma resümee avalikult üles laeb, sidudes kuritegelikus maailmas tehtu oma isikuga." `[tr]` "This is the first case where a criminal publicly uploads his CV in this form, linking what he did in the criminal world to his identity." | official framing | `verified`; official names must not be republished |
| P-04 | `[S-10]` | Prosecutor: "Teadlikult kurjategijatele sellise teenuse pakkumine tähendab, et luuakse võimalus panna toime kuritegusid…" | official framing | `verified` |
| P-05 | `[S-11]` | Photo caption: "Tom Kristian Abel reklaamis oma oskusi ja kogemusi sotsiaalmeedias avalikult." `[tr]` "Tom Kristian Abel advertised his skills and experience publicly on social media." | press framing | `verified` |
| P-06 | `[S-14]` | Geenius, 2026: "tegeleb hoopis küberpettuste vastase võitluseqa" framing — the award story still leads with the conviction | press framing | `verified` |

**Perception finding.** Every third-party source frames him through the same two words: convicted,
then (sometimes) reformed. There is no third-party source yet that frames him *primarily* as a
researcher. That is the gap `brand-positioning` and `brand-audit` exist to measure, and S-21 shows
the AI layer has already absorbed the old framing as the primary one.

---

## 4. Measured voice signals (this corpus, 2026-10-24)

Computed over 17 files, 48,025 words: five essays, ten research/report drafts, `site.ts` copy, and
the LinkedIn capture. Raw numbers: `raw/voice-stats-2026-10-24.json`.

| Segment | Words | Avg sentence (words) | Em dashes (per 1k) | Superlatives (per 1k) | "not X, but Y" |
|---|---|---|---|---|---|
| 5 essays | 9,248 | 11.2–20.5 | **0.00** | 0.00–4.4 | 5 |
| 10 research drafts | 26,701 | 17.9–24.2 | 1.10–12.65 | 0.64–2.98 | 10 |
| `site.ts` copy | 5,769 | 33.7 | 6.07 | 1.56 | 1 |
| LinkedIn (profile + 3 posts) | 6,366 | 17.1 | 1.10 | 1.10 | 0 |

Four findings that are usable as voice rules immediately:

1. **Two registers, cleanly separated.** The essays never use an em dash (0 in 9,248 words) and hold
   sentences at 11–20 words. The research reports run 18–24 words and use em dashes at up to
   12.65 per 1,000 words. The site copy is a third register entirely: 33.7-word average sentences,
   the highest em-dash density, and the highest superlative density of the prose segments.
   **The house rule "no em dashes" is followed where he writes prose and broken where he writes
   product copy.** That is a copy problem, not a voice problem.
2. **Site copy is the least him-like text on his own domain.** It has the longest sentences, the most
   superlatives, and the most em dashes — i.e. the marketing surface systematically exaggerates
   relative to every first-person corpus. Quantified gap: 6.07 em dashes/1k and 1.56
   superlatives/1k on the site, versus 0 and 0–0.8 in the essays.
3. **"not X, but Y" is real and localised.** 16 occurrences; the densest single file is the personal
   essay *I used to break authentication* (4 in 1,795 words). The review's finding #10 `[S-02]`
   matches the measurement, so it becomes a quota in the voice guide, not a taste argument.
4. **LinkedIn is the mildest register** (1.10 em dashes/1k, 1.10 superlatives/1k) but carries
   non-verbal devices prose does not: checkbox emoji (✅/❌) in the passkeys scorecard, bold
   capital-letter emphasis ("𝗩𝗶𝗴𝗮."), hashtag stacks, and a self-mocking aside
   ("Excuse the language. 2022 me was more confidently ballsy than polite").

---

## 5. POV candidates the corpus actually supports

Derived, not invented — each with the evidence it rests on. `personal-brand` needs three or four;
the corpus supports four and no more.

| # | Candidate belief | Evidence | Strength |
|---|---|---|---|
| B-1 | The interesting failure is never the cryptography — it is the gap between what a system claims to verify and what it verifies | Q-05, Q-07, Q-18, Q-19, S-01's Smart-ID and BotGuard findings | strongest; recurs in research and personal writing |
| B-2 | The value of a breaking skill is in its direction, not its existence | Q-01, Q-04, Q-06, Q-10, Q-11 | second; his own arc plus a folk metaphor he keeps reusing |
| B-3 | Client-side anti-fraud that cannot survive an operator-synthesising attacker is a promise, not a control | S-01 (BotGuard SoK, VLM anti-fraud), S-17 flagship repo | strong, but technical-audience-only |
| B-4 | Disclosure should go to the vendor and the national CERT, not to a buyer | S-01 disclosure timeline, S-12, Q-22 (unsupported as stated) | strong, but currently weakened by the COI finding |

Not supported by the corpus and therefore unavailable: any belief about the humanitarian or
political purpose of security work (present only in one interview aside, Q-13); any claim of
institutional authority (no employer or academic record is externally confirmed).

---

## 6. Voice-in-short-form samples worth copying later (Phase 5 input)

Kept here so the voice guide can be derived from real text rather than adjectives:

- **Technical argument, compressed** `[S-15]`: "The door got stronger, so they use the window next
  to it. Lol."
- **Reading a system's claim** `[S-15]`: the three-question passkey checklist (Q-19).
- **Stance with a folk metaphor** `[S-15]`: the kratt, two-edged sword (Q-10).
- **Correcting the national myth, in Estonian** `[S-15]`: "See on nagu üritaks narkoladu
  politseijaoskonna keldris pidada." `[tr]` "It's like trying to run a drug warehouse in a police
  station's basement."
- **Praising an institution that prosecuted him** `[S-15]`: "Väga kõva sooritus, PPA. Päriselt ka."
  (Q-21) — the single most strategically interesting sentence he has published; it does brand work
  no bio can.
