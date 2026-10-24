# Personal brand system for Tom Kristian Abel — analysis and plan

**Status:** plan, not started (Phase 0 scaffolding partially laid down below).
**Owner:** Tom Kristian Abel.
**Library analysed:** `arnabbagxd/brand-building-skills` (782 stars, last push 2026-06-13), installed in this repo.
**Written:** 2026-10-24.

---

## 0. Verdict in one paragraph

The library is the right tool and it is already installed, but it cannot be run as designed for
this job. Every skill in it is an interview instrument: it asks the subject to fill in a
questionnaire (or tells the model to make "intelligent strategic inferences" where the client left
gaps). The brief here is the inverse — derive strategy, identity, voice, messaging, audience and
positioning **from public statements**. Run the skills as-is against a questionnaire and you get
positioning the model invented, dressed as strategy, on a website whose whole argument is that the
author is accurate about hard-to-check claims. So the plan inserts one phase the library does not
have: a **public-statement evidence dossier** with numbered sources, verbatim quotes and explicit
gaps. That dossier becomes the answer key the skills consume, and every claim in every output is
traceable to a source ID or is deleted.

The second thing that matters: the brand is not starting from zero. Six months of arc work already
exists (site, my-story page, GitHub research, LinkedIn), and the repo already contains a 35k-word
adversarial review of that work — including three mutually inconsistent descriptions of the past,
a missing conflict-of-interest line, and a named prose tic ("not X, but Y"). Those defects are
brand defects, not just content defects. Any brand system written over them inherits them.

---

## 1. What is installed (verified today)

| Fact | Value |
|---|---|
| Skills from `arnabbagxd/brand-building-skills` | 29, all present upstream |
| Install paths | `.agents/skills/`, `.hermes/skills/`, `.claude/skills/`, `.commandcode/skills/` (mirrors) |
| Lockfile | `skills-lock.json` — 84 skills total, 6 sources (29 brand-building, 42 samber-golang, 8 gsap, 3 coreyhaines31, 1 jeffallan, 1 resciencelab) |
| Upstream contents | `aso, b2b-brand-marketing, brand-architecture, brand-audit, brand-context, brand-guidelines, brand-identity, brand-launch, brand-manifesto, brand-measurement, brand-messaging, brand-naming, brand-packaging, brand-partnerships, brand-positioning, brand-story, brand-strategy, brand-voice, competitor-branding, d2c-marketing, email-marketing, google-ads, influencer-marketing, meta-ads, personal-brand, rebranding, target-audience, ugc-strategy, whatsapp-marketing` |

**Operational note — how to load them here.** `skill_view(name='brand-strategy')` returns nothing:
these 29 names collide with a same-named skill in another skills tier, so the loader refuses them.
Read the files directly, e.g. `read_file .agents/skills/brand-strategy/SKILL.md`. The skill text is
identical across the four mirrors; use `.agents/skills/` as the canonical copy.

**Shape of the library.** Two vocabularies are mixed. `brand-strategy` and `brand-context` are
agency-shaped (client questionnaire, report delivered to a client; `brand-strategy`'s persona
template even assumes consumer income bands and asks for "Indian and/or international
competitors"). `personal-brand` is the individual-shaped one, and it is the only skill whose output
is a full plan for one human: foundation, audience, positioning, point of view, voice, platform,
content pillars, bio versions, 90-day plan. Everything else is a component.

---

## 2. Skill selection

> **Operational wrapper.** A newer Hermes skill, `brand-strategy-development`, codifies this exact
> workflow (evidence register → claim status → risk gate → traceability check) and ships both a
> `references/founder-risk-gate.md` and `scripts/check-traceability.mjs`. It is the skill to load
> when executing the phases below; this section decides *which of the 29 library skills* to run
> inside it, and which to skip. Where the two disagree on method, the skill wins.

### Tier A — the spine (must run, in this order)

| # | Skill | Why it earns its place | Adaptation required |
|---|---|---|---|
| 1 | `brand-context` | Every other skill reads `.agents/brand-context.md` first. It is the single source of truth for name, audience, positioning, personality, values, goals. | Fill it from the dossier, not from an interview. Unanswerable fields get an explicit `[unverified → needs Tom]` marker instead of a plausible guess. |
| 2 | `personal-brand` | The only skill built for one individual. Produces the 9-part strategy: foundation, audience, positioning, POV, voice, platform, pillars, bios, 90-day plan. | Feed it the dossier + `brand-context.md`. Its §08 bio versions are a direct deliverable for LinkedIn/CFP/site. |
| 3 | `target-audience` | Audience is the load-bearing decision: Estonian public sector and RIA, global anti-fraud/vendor engineers, and the hiring/consulting market need different messages. | Drop the consumer-income/shopping-behaviour assumptions; replace with role, org type, decision authority, language, where they read. |
| 4 | `brand-positioning` | Positioning statement, category definition, competitive map, proof points, "what this brand refuses to be". The refusals section is the highest-value part here. | Competitor set = named peer researchers and public-research orgs, not consumer brands. |
| 5 | `brand-voice` | Derives voice from existing writing. His voice is already documented: 82k words of his own prose plus an adversarial review that names his tics. | Voice rules must encode the review's finding #10 (overuse of "not X, but Y", one-line closers, pull-quotes that repeat the body) as hard bans, not preferences. |

### Tier B — completing the system

| Skill | Produces | Note |
|---|---|---|
| `brand-audit` | 6-dimension scorecard of the brand as it exists today (positioning clarity, visual consistency, messaging consistency, voice consistency, audience alignment, differentiation) | Run **first** in Phase 2: it is the honest baseline, and it will score the three inconsistent versions of the past and the missing COI line as brand failures. |
| `brand-messaging` | Core message, value proposition, tagline options, messaging hierarchy, per-audience and per-channel messages, "things not to say" | "Things not to say" must include the unfulfilled-conference-claim rule and the no-admissions-beyond-the-legal-sentence rule. |
| `brand-story` | Three lengths of origin story: long (About), short (pitch), one-liner | Must consume the single lawyer-checked sentence about the past. If Tom does not want a third retelling, run this skill only for the long and one-liner forms. |
| `brand-guidelines` | The finished book: essence, verbal identity, messaging, brand-in-use, don'ts | The final artifact. Personal version: visual part compressed to photo/typography/colour, "brand in use" = LinkedIn, GitHub, site, talks, press, email. |
| `brand-measurement` | Funnel, perception, equity scorecard, channel metrics, ROI, calendar | Scope it to what a person can measure: name-search composition, AI-answer accuracy, inbound quality, CFP acceptances, follower quality. Skip revenue-attribution modelling. |

### Tier C — conditional, run only if the trigger fires

| Skill | Trigger | Scope if run |
|---|---|---|
| `brand-architecture` | Always relevant — four surfaces exist: Tom (person), ProksiAbel OÜ (company, separate site), Proksimity (product), "Cyber-Kratt" (role/identity at kood/Jõhvi) | Full run: portfolio audit, architecture recommendation (endorsed vs house), hierarchy map, naming system, governance rules ("who may write in whose name"). |
| `rebranding` | The ex-black-hat → researcher transition is a rebrand with a live tail (press coverage from 2024 still ranks) | §01 diagnosis, §02 equity audit, §05 transition narrative, §07 risks. Skip the multi-market rollout machinery. |
| `competitor-branding` | If positioning work leaves the peer set vague | Peer personal brands only: independent security researchers who publish and speak. Not consultancies. |
| `b2b-brand-marketing` | Only the consultancy/client-acquisition half of the personal brand | §03 thought leadership, §04 LinkedIn strategy, §05 trust signals. Skip ABM and the buying-committee map until there is a productised offer. |
| `ai-seo` | The first thing a journalist, client or conference organiser does now is ask an AI about the name | §AI visibility audit, Person schema, citation patterns. Complements the existing `docs/seo-audit-2026-10-07`. |
| `brand-identity` | Only three of its eight sections apply to a person | Run §01 identity strategy statement, §05 imagery/photography style, §07 design principles. A person has no logo; skip §02, §04, §06. |

### Tier D — do not run (with the reason, so this is not re-litigated later)

`brand-naming` (the name is fixed; if anything, use its *evaluation mode* once on "Tom Kristian
Abel" vs "Tom Kabel" vs "hr-abel" for discoverability), `brand-packaging` (physical product),
`brand-launch` (multi-market launch campaign), `brand-manifesto` (nice-to-have; derive from
`brand-story` if wanted), `brand-partnerships` (only if the Anton co-talk becomes a series),
`brand-guidelines` is Tier B, and the whole performance-marketing tail: `d2c-marketing`,
`email-marketing`, `google-ads`, `meta-ads`, `influencer-marketing`, `ugc-strategy`,
`whatsapp-marketing`, `aso`. `seo-audit` and `programmatic-seo` already have a home in this repo
(`docs/seo-audit-2026-10-07/`) and are not personal-brand instruments.

**Net: 5 spine skills + 5 completing + up to 6 conditional = 16 of 29. Thirteen are dropped with reasons.**

---

## 3. Evidence corpus

### 3.1 Already held (verified 2026-10-24)

**A — Self-authored long-form, in Tom's own voice.** The richest source, and the only one where the
voice can be measured rather than described.

```
drafts/*.md + drafts/research/*.md                     24,000 words
russian-cyber-ops-estonia.md                           10,667 words
tomabel-disclosures-review.md                          35,432 words (adversarial review of his own work)
live: 19 article pages under /disclosures/ + /about + /my-story
```

**B — Press.** `forte.delfi.ee/artikkel/120300810` — interview, 15.06.2024, by Aivar Pau. Contains
his own words on record: how he described his work ("Ma pakun konsultatsioone ja konfiguratsioone"),
his account of being contacted and searched by Keskkriminaalpolitsei, the claim about an LHV app
weakness, the Tartu informatics anecdote ("hakkas tal igav juba esimesel semestril"), and his
statement that he does not consider the alleged act a crime. Paywalled after the opening section;
the fetched copy is cached at `/home/notroot/.hermes/cache/web/forte.delfi.ee-3425579d0a.md`.
The same page links the earlier news item, `forte.delfi.ee/artikkel/120299748` (11.06.2024).
The court fact (20 Nov 2024, Harju County Court, ten months, five served) is press-verified in-repo
and must stay tied to the single lawyer-checked sentence.

**C — Social.** LinkedIn `in/hr-abel`: headline "Founding Engineer | Cyber-Kratt | Ex-Black Hat",
265 followers, 240 connections, ProksiAbel OÜ + kood/Jõhvi. Indexed posts/comments include
23 Dec 2025 (cybersecurity/opsec/Estonia, tags PPA/FBI), 27 Apr 2026 ("Koolipingist suurfirmade
süsteemidesse…"), and comments on peers' posts (Torben Elgaard Jensen, Lauri Haav). GitHub
`tomkabel`: `google-botguard-security-research` ("SoK: Client-Side Anti-Automation Under VLM-Based
Attack"), 100+ stars by his own count on the site.

**D — Surfaces he controls.** `src/content/site.ts` carries the current brand in one file: tagline
("Systems architect and security researcher."), hero ("I broke authentication for a living. Now I
build the kind that doesn't."), the intro strip, the disclaimer line separating ProksiAbel OÜ
client confidentiality from his personal accountability, and the contact set.

**E — Independent critique of his own voice and claims.** `tomabel-disclosures-review.md` is the
only source in the corpus that stands outside the brand and measures it. Load-bearing findings:
scorecard with 19 articles graded (9 flagged P1), site-wide problem #5 (three different
descriptions of the past), #2 (13 of 19 pieces carry an undisclosed or vague conflict of interest),
#1 (13 of 19 pages undated), #10 (prose leans on "not X, but Y" contrasts, one-line closers and
self-repeating pull-quotes; a humanising pass would cut 15–25%).

### 3.2 To collect (Phase 1 backlog)

- Full Delfi interview body (paywall: subscriber access or archive), and the 11.06.2024 piece.
- Estonian media beyond Delfi: Postimees, Äripäev, Geenius, ERR, Digi, Delfi Ärileht — both the
  2024 case coverage and any later quoting of him as an expert.
- Audio/video: podcasts, ERR interviews, conference recordings, kood/Jõhvi material explaining
  "Cyber-Kratt".
- Talk metadata: submitted and delivered CFPs (Disobey and others), speaker bios as they were
  actually published, abstracts. These are brand statements written under constraint.
- Social beyond LinkedIn: X, Mastodon, any forums, GitHub issues/PR text in his own name.
- The public-name SERP: what a stranger sees on page 1 for "Tom Kristian Abel", "Tom Kabel",
  "tomkabel", "ProksiAbel" — in Google, Bing and DuckDuckGo, plus the AI-answer snapshot.
- Prior-identity residue: old handles, renamed repos, cached copies of the pre-2025 GitHub.

---

## 4. Method — evidence in, traceable strategy out

The library's questionnaire is the wrong input; its *output structure* is the right one. So:

```
public statements ──► [Phase 1] source registry + verbatim quote bank
                              │
                              ▼
                    [Phase 3] .agents/brand-context.md   (derived, gaps marked)
                              │
        ┌─────────────────────┼──────────────────────┐
        ▼                     ▼                      ▼
  personal-brand      target-audience        brand-positioning     [Phase 4]
        │                     │                      │
        └──────────┬──────────┴──────────┬───────────┘
                   ▼                     ▼
             brand-voice           brand-messaging   brand-story    [Phase 5]
                   │
                   ▼
      brand-architecture · rebranding · competitor-branding         [Phase 6]
                   │
                   ▼
             brand-guidelines  (the book) + bio versions            [Phase 7]
                   │
                   ▼
        brand-measurement · ai-seo · 90-day plan execution          [Phase 8–9]
```

**Three rules that make the outputs honest, and that a reviewer can check mechanically:**

1. **Traceability.** Every factual or self-descriptive claim in every output line carries a source
   ID (`[S-07]`) or is deleted. No orphan claims, no softening paraphrase of an unverified source.
2. **No invention of the subject's beliefs.** The `personal-brand` point-of-view section (3–4 core
   beliefs, each with "why this person can say it") may only use beliefs that appear in the
   corpus — a stated position in an article, a talk abstract, an interview answer. If the corpus
   does not support four beliefs, the output says three.
3. **Past-wording lock.** Exactly one sentence about the conviction enters brand material, and it
   is the same sentence on the site, in the bios and in the deck. It is subject to legal review
   before it is used anywhere. The `brand-story` and `brand-voice` outputs do not get to write a
   second version, however much better the new one reads.

---

## 5. Phased plan

### Phase 0 — Workspace and scaffolding

- [x] `docs/brand/` created with `00-evidence/` (`extracts/`, `raw/`), `outputs/`
- [x] `docs/brand/README.md` — one screen: what this is, where outputs land, which skill wrote what
- [x] Branch/PR shape decided: brand work is a docs-only change on a feature branch, merged to
      `main` by PR (repo convention), never a direct push

**Acceptance:** the four paths exist and the register lists only sources actually seen. **Met.**

### Phase 1 — Public-statement dossier · **done 2026-10-24** (see the phase-1 completion report below)

- [x] Harvest into `docs/brand/00-evidence/source-register.md` with ID, URL or path, outlet, date,
      type, paywall status, first-person availability, verification status, claim status
      → **32 rows**: 19 `read`, 6 `partial`, 3 `snippet`, 3 `registry-only`, 1 documented failure
- [x] Extracts with verbatim quotes in `00-evidence/extracts/`, each passage tagged with claim status
      and the theme code from `statements-and-quotes.md`
- [x] Quote bank, grouped and coded: self-description · the work · the past · frames and metaphors
      (the fault line, the kratt, "same eyes, different direction") · vocabulary EN/ET · refusals ·
      tone per channel → `00-evidence/statements-and-quotes.md`, 23 coded quotes (Q) + 6
      third-party framings (P) + 4 supported POV candidates (B)
- [x] Measured voice signals rather than adjectives: 17 files, 48,025 words, split into three
      registers → `00-evidence/statements-and-quotes.md` §4
- [x] AI-answer snapshot, verbatim with its citation list → `00-evidence/extracts/S-21-ai-answer.md`
- [x] SERP snapshot attempted and **documented as failed** (Google captcha, Bing junk, DDG bot-wall,
      Mojeek empty, firecrawl junk, two backends exhausted) rather than fabricated
      → `00-evidence/serp-and-ai-snapshot-2026-10-24.md`
- [x] Gap list, ranked by what they block → `00-evidence/gaps.md` (G-1…G-10)

**Acceptance:** ≥25 sources ✓ (32), ≥15 with verbatim first-person material ✓ (15), every row
resolvable ✓, no unread source listed ✓. **Met, with one deliverable substituted:** the ranked SERP
is a documented failure, and that failure is itself evidence that `brand-measurement` needs a
different measurement channel than this host's egress.

**What Phase 1 changed in the plan** (read before Phase 2):

1. Two press sources were missing from the register entirely and were found: Postimees 8138866 and
   Äritehnoloogia 20.11.2024. The prior research's "no third-party coverage" claim is stale.
2. The **AI layer already carries the arc framing** and gets it from his own surfaces, not from
   press — a stronger starting position than the 2026-09-22 SERP baseline suggested.
3. The live LinkedIn contradicts the prior research: the headline is still "Ex-Black Hat" and the
   About still says he "analyzed, avoided and used weaknesses". Two entries are on the risk gate's
   forbidden list and are live today.
4. The site copy measured as the least *him*-like text he owns (33.7-word sentences, 6.07 em
   dashes/1k, the most superlatives) while the essays use zero em dashes. The voice work is
   therefore a copy problem on the marketing surface, not a voice-discovery problem.
5. Four statements about the past are `do-not-use` (two about the police operation, one forum-handle
   post, one press-quoted CV line). The risk gate is not theoretical here; it has a concrete list.
6. `brand-strategy-development` (a Hermes skill, newer than this plan) codifies this same workflow,
   including a risk-gate reference and a traceability script. Adopt it as the operational wrapper;
   artisanal steps in this plan that duplicate it are marked in §2.

### Phase 2 — Baseline audit · **done 2026-10-24** → `01-audit.md`

- [x] `brand-audit` 6-dimension scorecard over the live state (site source, LinkedIn, GitHub,
      press footprint), every score carrying quoted evidence
      → **17/30**: positioning 2 · visual 4 · messaging 3 · voice 3 · audience 2 · differentiation 3
- [x] Intent-vs-perception delta written explicitly, using the AI-answer snapshot as the perception
      instrument and the press framings as corroboration
- [x] P1 findings from `tomabel-disclosures-review.md` checked against the live repo rather than
      assumed: dates, COI line, the "disclosed responsibly" overclaim, dead links, index blurbs,
      fraud-paper figures, §5 past-wording, §7 archetype scoring

**Acceptance:** a scorecard per dimension with the evidence behind each score ✓, plus an explicit
intent-vs-perception delta ✓. **Met.**

**The audit's headline:** execution clarity is well ahead of position clarity. Machines and press have
absorbed his *history* accurately and his *work* partially; neither has absorbed the *idea*. Five
concrete defects carry most of the score loss: four incompatible role framings across surfaces (About
says CTO at MATx, LinkedIn says founding engineer of ProksiAbel OÜ, GitHub says authentication
security researcher, schema says both), a surviving "disclose what I find responsibly" claim on the
page the essays point to as canonical, an uncorroborated MATx CTO title, a social card that predates
the design system with no portrait anywhere, and an under-deployed proof layer (`public/verification/`
signed article copies on 7 of 19 pages). The audit also corrects one thing phase 1 assumed: several
review findings thought open are in fact fixed — fraud-paper figures, per-figure attribution, and the
archetype axiom scoring (which carries its own dated corrections changelog).

### Phase 3 — Derived brand context · **done 2026-10-24** (private)

**Unblocked 2026-10-24:** all ten gaps are decided (`decisions.md`), so the context file was written
from evidence plus decisions rather than from guesses. Three decisions created prerequisites that the
later phases respect: the company-status check (P-1), the legal review of the single sentence (P-2),
and the handle sweep before any new copy (P-5).

- [x] `.agents/brand-context.md` written from the dossier and the decisions, symlinked to the private
      repo so the skill path still resolves while the content stays private (decision G-10)
- [x] No plausible fillers: fields the corpus cannot settle carry `[unverified → needs Tom]`
- [x] P-1 probed and **failed**: the e-Äriregister page carries a deletion notice published in
      Ametlikud Teadaanded for ProksiAbel OÜ. Recorded; G-4 now rests on an entity on a clock
- [x] P-5 run: the local handle/alias sweep found two unregistered aliases and one handle of
      ambiguous ownership (`[S-34]`), none of which may be asserted in brand copy either way

**Acceptance:** the file exists, every field either cites a source ID or is marked unverified.
**Gate:** Tom reviews the open questions. This is the one place in the whole plan that genuinely
needs him — everything downstream inherits these answers.

### Phase 4 — Strategy core

- [ ] `personal-brand` — full 9-part output → `docs/brand/outputs/01-personal-brand-strategy.md`
- [ ] `target-audience` → `docs/brand/outputs/02-audience.md`, with the audience order stated
      (who is primary, who is deliberately not served)
- [ ] `brand-positioning` → `docs/brand/outputs/03-positioning.md`, including "what this brand refuses
      to be" — the section that does the most work for someone with a dual public history

**Acceptance:** each document passes the traceability rule; positioning statement names a territory
narrower than "security researcher" (the `identity-reframing` skill's standing critique).

**Done 2026-10-24.** `outputs/01-personal-brand-strategy.md`, `02-audience.md`, `03-positioning.md`.
Primary noun decided (authentication-security researcher); category named (verification-claim
research, `[ASSUMED]` with a fallback branch); one-sentence position is 23 words and names the claim
layer. The writers re-verified inherited audit findings against the live repo and corrected three that
had moved, and one of them found a new defect the audit missed (the homepage intro strip's aggregate
claim), which is now fixed.

### Phase 5 — Voice, messaging, story

- [ ] `brand-voice` → `docs/brand/outputs/04-voice.md`. Derive the qualities from the corpus, then encode
      the review's prose findings as prohibitions: quota on "not X, but Y", on one-line closers, on
      pull-quotes that restate the body; ban on self-invented authority the sources do not support
- [ ] `brand-messaging` → `docs/brand/outputs/05-messaging.md`, with per-channel messages (site, LinkedIn,
      GitHub README, CFP bio, press quote) and the "never say" list
- [ ] `brand-story` → `docs/brand/outputs/06-story.md`, three lengths, all three using the locked sentence
- [ ] Voice check: run the proposed voice rules against 3 existing articles and record whether they
      pass. If the rules do not describe what he already writes well, the rules are wrong

**Acceptance:** the voice guide is derivable from the corpus and falsifiable against it, not a list
of adjectives.

### Phase 6 — Architecture and transition

- [ ] `brand-architecture` → `docs/brand/outputs/07-architecture.md`: Tom / ProksiAbel OÜ / Proksimity /
      Cyber-Kratt hierarchy, naming system, governance (who may write in whose name — matters
      because `tomabel.ee` is both the personal site and the company's research home)
- [ ] `rebranding` → `docs/brand/outputs/08-transition.md`: diagnosis, equity audit, transition narrative,
      risks. Explicitly: what to do about 2024 press coverage still ranking on the name
- [ ] `competitor-branding` → `docs/brand/outputs/09-peers.md`: 6–10 peer personal brands, what each owns,
      where the gap is

**Acceptance:** architecture map with one recommended model and its trade-offs; transition narrative
that does not require him to retell the case.

### Phase 7 — The book

- [ ] `brand-guidelines`, personal edition → `docs/brand/outputs/10-personal-brand-book.md`:
      foundation · verbal identity · messaging · brand in use (LinkedIn, GitHub, site, talks, press,
      email, conference bios) · don'ts
- [ ] `brand-identity` sections 01/05/07 only → photo, typography, colour, design principles
- [ ] Bio versions: long (150–200 w), short (50–70 w), one-liner (15–20 w), LinkedIn headline
      (10–15 w) — each in English and Estonian
- [ ] Apply the headline and one-liner to LinkedIn as the first live surface

**Acceptance:** a single document from which anyone (Tom, a conference organiser, an editor) can
write about him consistently without asking.

### Phase 8 — Measurement and presence · **done 2026-10-24**

- [x] `brand-measurement` → `docs/brand/outputs/11-measurement.md`: baseline table, five metric
      families, calendar, noise floors, pre-registered query set, report template
- [x] `ai-seo` audit → `docs/brand/outputs/12-ai-visibility.md`: eleven file-level findings with a
      prioritised fix list, reproducible probe commands, and reconciliation with the 2026-10-07 audit
- [x] Google Alerts on name variants; quarterly SERP + AI-answer re-snapshot

**Acceptance:** a dated before/after pair for at least three queries, plus the metric set. **Partly
met:** the AI-answer channel is captured today (three dated runs, one differing from the phase-1
baseline in lead framing and source mix), and the metric set exists. The ranked SERP has no
trustworthy capture from this host, so the document rules out publishing a ranking number measured
here and prescribes the channel that would work instead.

**Findings that change the surface work:** the deployed Cloudflare worker is a revision behind the
repo, so the machine-facing behaviour verified in the tree is not what a crawler or agent meets;
`llms.txt` had drifted from the repo (it said 65+ profiles and described About as the kratt metaphor,
both fixed here); visible "Updated" dates are hand-written while structured-data dates are generated
from git, so they can disagree on the same page; and Estonian content is machine-invisible (no `/et/`
routes, no `hreflang`).

### Phase 9 — Roll out to surfaces

- [ ] `personal-brand` §09 90-day plan, executed with dates
- [ ] Surfaces in order of leverage: LinkedIn profile + featured posts → GitHub profile README and
      repo READMEs → site About / my-story (single past sentence) → CFP bio → speaker/one-pager
- [ ] Fix the brand-visible P1 items before publishing anything that leans on those articles

**Acceptance:** each surface updated, screenshot or URL recorded in the folder.

---

## 5b. Phases 5-9 — completion summary (2026-10-24)

| Phase | Artefacts | State |
|---|---|---|
| 5 — voice, messaging, story | `outputs/04-voice.md`, `05-messaging.md`, `06-story.md` | done. Voice derived from the measured corpus, with the audit's tics turned into quota rules and a falsifiable checker (`check-voice.mjs`). Story uses the frozen case sentence by reference; no new wording authored (G-2). |
| 6 — architecture, transition, peers | `outputs/07-architecture.md`, `08-transition.md`, `09-peers.md` | done. Endorsed-brand recommendation; naming system and governance; the §07 P-1 failure analysis (what breaks if the company is deleted, with a fallback ladder); three transition narratives; 10 named peers with per-fact verification levels. |
| 7 — the book | `outputs/10-personal-brand-book.md` | done. Foundation, the Cyber-Kratt definition, the four beliefs, verbal identity, messaging, brand in use, bios in EN and ET, the consolidated do-not list, governance and the ledger spec. |
| 8 — measurement, AI visibility | `outputs/11-measurement.md`, `12-ai-visibility.md` | done. Measurement: the eleven-number baseline, five metric families, noise floors, a pre-registered query set, and an explicit ruling that no ranking number from this host may be published (the ranked-SERP channel failed here; the doc prescribes a manual two-pass browser capture or a paid API with an acceptance probe). AI visibility: eleven file-level findings, the strongest being that the deployed worker is a revision behind the repo, so the machine-facing fixes exist in the tree and not on the site. |
| 9 — roll out | `outputs/13-surface-kit.md` + live edits | done for what is not blocked. Shipped: Cyber-Kratt defined on About (G-3/P-4), ORCID added to the entity graph, the GitHub profile README corrected (72 profiles, plus the disclosure-posture line). Paste-ready: LinkedIn headline, About, experience edits. Deferred with a reason: the disclosure-ledger page (a claim record with missing rows is worse than none) and every company-asserting surface (**P-1**). |

**Verification for the whole run:** `check-traceability.mjs` OK (34 sources defined, 32 cited, 0
undefined); `check-voice.mjs` 0 failures across 12 documents, with both negative controls firing;
`pnpm build` exit 0 (28 prerendered route shells, links clean); `pnpm typecheck` clean; `pnpm test`
8/8.

---

## 6. Gates and risks

**Gates (nothing publishes past these):**

1. **Legal:** the one sentence about the past, reviewed before it appears in any new surface. The
   review's fix order already puts this at step 3.
2. **Conflict of interest:** the COI line about building Proksimity (server-side traffic assurance)
   belongs in the brand's claim rules, because 13 of 19 articles recommend that category.
3. **Verifiability:** no claim enters a bio, pitch or profile that a hostile reader cannot check.
   Unfulfilled acceptance claims are removed silently rather than explained.
4. **Third parties:** the Gray Space report's named individual, and any client reference, stay out
   of brand material entirely.

**Risks:**

| Risk | Mitigation |
|---|---|
| The skills invent positioning where the corpus is silent | Traceability rule; `[unverified]` markers; delete orphan claims |
| Brand material over-claims authority the research does not support (the review's most repeated finding) | Voice guide bans unsupported first-person authority; every bio claim maps to a source |
| The past gets retold a fourth time with new wording | Locked sentence, one owner, gate 1 |
| Two brand systems drift (Tom vs ProksiAbel OÜ) | `brand-architecture` governance rules decide what may appear where |
| Paywalled press cannot be quoted | Extract what is public, paraphrase with citation, or mark unavailable; never reconstruct a quote |
| Scope creep into performance marketing | Tier D list above; the 13 dropped skills are a decision, not an oversight |

---

## 7. Open decisions (defaults proposed — override any)

| # | Decision | Proposed default |
|---|---|---|
| 1 | Master brand: person or company? | Person as master, ProksiAbel OÜ as endorsed company, Proksimity as product under it |
| 2 | Primary audience | Anti-fraud/authentication engineering + security research community (global, English); Estonian public sector second; hiring/consulting third |
| 3 | Primary platform | LinkedIn (already active, where the buyers and peers are), with the site as the owned deep-content home |
| 4 | The past in brand material | Context, not a pillar: one locked sentence plus a link, never the lead |
| 5 | Language of the book | English primary, Estonian parallel for bios/headline only (both are live surfaces) |
| 6 | Where outputs live | `docs/brand/` in this repo, PR-merged; `.agents/brand-context.md` stays at the skill-required path |

---

## 8. Definition of done

1. `docs/brand/00-evidence/` holds a dated source register (≥25 sources) and a coded quote bank,
   with gaps named.
2. `.agents/brand-context.md` exists, derived, sourced, ≤12 open questions answered.
3. Eleven output documents exist, each passing the traceability rule. Citation integrity is
   machine-checked with `node docs/brand/check-traceability.mjs` (every `[S-nn]` must resolve to an
   entry in `evidence/sources.md`; the script cannot judge *which* lines need a citation, so a
   reviewer still owns that part).
4. The personal brand book exists with bios in two languages, and the first two surfaces (LinkedIn,
   GitHub) carry it.
5. A dated before/after measurement pair exists for at least three name queries.
6. The four gates pass, with the legal sentence reviewed.
