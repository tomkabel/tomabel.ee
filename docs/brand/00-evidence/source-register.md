# Source register — public record of Tom Kristian Abel

Evidence base for the personal brand system (`../personal-brand-program.md`).
Coding convention follows `brand-strategy-development` (Hermes skill): every statement later gets a
claim status, and every claim in a brand output cites a row here as `[S-nn]`.

**Verification status** = how much was actually read, not how authoritative the source is:

| Status | Meaning |
|---|---|
| `read` | fetched and read in this workspace |
| `partial` | fetched; paywalled or truncated, and the read part is named |
| `snippet` | seen only as a title/summary in a search result or an AI answer |
| `registry-only` | known to exist (path, link, mention) but not yet inspected |

**Claim status** applies to statements extracted from a source, not to the source itself:

`verified` (confirmed against a primary artefact) · `founder-asserted` (he said it; nothing external
corroborates) · `needs-proof` (published on a live surface with nothing behind it) · `do-not-use`
(true but damaging, unadjudicated, or self-incriminating — see the risk gate).

Register opened 2026-10-24. 32 rows. Nothing enters a brand output until its row is `read` or
`partial` **and** the quoted passage sits inside the part that was read.

**On the local press captures.** Several rows cite `raw/press/*.md`. Those files are full third-party
news pages: copyrighted, **gitignored, never committed**. The quotable text from them lives in
`extracts/press-2024-2026.md`, together with each URL and the paywall boundary.

<!-- index: one line per source, each starting with **S-nn**; parsed by docs/brand/check-traceability.mjs -->

**S-01** · tomabel.ee disclosures corpus · `read`  
**S-02** · `tomabel-disclosures-review.md` · `read`  
**S-03** · `drafts/` + `drafts/research/` · `read`  
**S-04** · `russian-cyber-ops-estonia.md` · `read`  
**S-05** · `src/content/site.ts` — the brand as currently encoded · `read`  
**S-06** · `src/pages/MyStoryPage.tsx` — the three-act narrative · `read`  
**S-07** · tomabel.ee machine-facing and secondary surfaces · `partial`  
**S-08** · Delfi Forte interview, 15.06.2024, Aivar Pau · `partial`  
**S-09** · Delfi Forte news, 11.06.2024, Aivar Pau · `partial`  
**S-10** · Postimees, 20.11.2024 · `read`  
**S-11** · Äritehnoloogia (Äripäev), 20.11.2024, Indrek Kald · `partial`  
**S-12** · Geenius DigiPRO, 13.05.2026, Jaanus Vogelberg · `partial`  
**S-13** · Delfi topic page · `read`  
**S-14** · Postimees keyword page · `read`  
**S-15** · LinkedIn profile `in/hr-abel` · `read`  
**S-16** · LinkedIn posts/comments (search-indexed, outside the profile capture) · `snippet`  
**S-17** · GitHub `tomkabel` · `read`  
**S-18** · GitHub org `Proxyabel` (company) · `read`  
**S-19** · GitHub `M41KL-N41TT` (archived + renamed) · `read`  
**S-20** · ORCID 0009-0009-9881-1293 · `read`  
**S-21** · Google AI Mode answer, captured 2026-10-24 · `read`  
**S-22** · Live SERP capture attempt, 2026-10-24 · `failed`  
**S-23** · `findings.md` — technical footprint, 2026-10-06 · `read`  
**S-24** · `identity-rebrand-plan.md` — the executed rebrand plan · `read`  
**S-25** · `phase7-search-baseline.md` — SERP baseline, measured 2026-09-22 · `read`  
**S-26** · `proksiabel-ou-registry-findings.txt` · `partial`  
**S-27** · BSides Tallinn correspondence · `registry-only`  
**S-28** · kood/Jõhvi and "Cyber-Kratt" · `registry-only`  
**S-29** · Speaker and CFP record · `registry-only`  
**S-30** · Shipped decisions · `read`  
**S-31** · Registry/person directories · `snippet`  
**S-32** · Wikimedia Commons photo · `snippet`  

---

## A — Self-authored corpus (highest value: this is where the voice is measurable)

### S-01 · tomabel.ee disclosures corpus · `read`
- URL: https://tomabel.ee/disclosures/ — 19 entries; local copies in `drafts/`, `src/pages/*.tsx`
- Type: self-authored, first person · languages: EN (ET variants exist)
- Reliability: primary for his positions, `founder-asserted` for facts
- Holds: the technical voice at length; the fault-line frame; three different tellings of the past
  (per S-02)

### S-02 · `tomabel-disclosures-review.md` · `read`
- Path: `tomabel-disclosures-review.md` (35,432 words), checked 3–4 Oct 2026
- Type: adversarial review of S-01, not authored for publication · first person: no
- Reliability: the only outside-in measurement of the brand in existence
- Holds: site-wide problem #5 (three contradictory descriptions of the past), #2 (13 of 19 pieces
  carry an undisclosed conflict of interest), #1 (13 of 19 pages undated), #8 (dead links),
  #9 (prior-art credit), #10 (prose tics: "not X, but Y", one-line closers, self-repeating
  pull-quotes, 15–25% cuttable), 9 articles graded P1. Fix order exists.

### S-03 · `drafts/` + `drafts/research/` · `read` (inventory; files sampled)
- Path: 15 files, ~24,000 words
- Type: self-authored working drafts · first person: yes
- Holds: the essay forms — *I used to break authentication*, *The kratt problem*, *Coordinated
  disclosure in a small country*. Rawest voice; register shifts visible between essay and report.

### S-04 · `russian-cyber-ops-estonia.md` · `read` (opening sections)
- Path: 10,667 words, created 2026-10-09
- Type: self-authored, analytical register, first person: no
- Holds: the voice he uses when the subject is geopolitical and the stance is impersonal. S-02
  flags this piece P1 (named private individual, merged third-party reports).

### S-05 · `src/content/site.ts` — the brand as currently encoded · `read`
- Type: controlled surface · first person: yes
- Holds verbatim: tagline, hero two-liner, intro paragraph, "fault line" pull-quote + body, the
  ProksiAbel-confidentiality/personal-accountability disclaimer, contact set. Quoted in
  `statements-and-quotes.md`.

### S-06 · `src/pages/MyStoryPage.tsx` — the three-act narrative · `read`
- Type: controlled surface · first person: yes · bilingual EN/ET
- Holds: Act I (charge, 20 Nov 2024 Harju County Court, own Evilginx variant, 10 months / 5 served
  / 5 suspended + 1-year probation), Act II ("same eyes, different direction"), the five-item work
  list, and the rule that the page does not narrate the case or name anyone.

### S-07 · tomabel.ee machine-facing and secondary surfaces · `partial`
- URLs: /about, /systems, `worker/`, `docs/agent-readiness-plan.md`, `/public-key.asc`
- Type: controlled surface · first person: mixed
- Holds: capability presentation, work cards, the agent-readiness layer (Markdown negotiation,
  llms.txt). Relevant to `ai-seo`; not yet read line by line.

---

## B — Press

### S-08 · Delfi Forte interview, 15.06.2024, Aivar Pau · `partial` (paywall)
- URL: https://forte.delfi.ee/artikel/120300810/intervjuu-krakkeriga-noor-mees-kellele-keskkriminaalpolitsei-esitas-enneolematu-kahtlustuse
  (canonical form `…/artikkel/120300810/…`)
- Type: press interview · first person: **yes, extensive** · paywall: body only
- Cached: `/home/notroot/.hermes/cache/web/forte.delfi.ee-3425579d0a.md`
- Read part: the opening Q&A. Verbatim quotes in `extracts/S-08.md`
- Reliability: primary for what he says; secondary for what happened
- Brand weight: highest. First result a journalist or client finds about the past.

### S-09 · Delfi Forte news, 11.06.2024, Aivar Pau · `partial`
- URL: https://forte.delfi.ee/artikkel/120299748/keskkriminaalpolitsei-tabas-mehe-keda-kahtlustatakse-kuberkurjategijatele-ongitsuskomplektide-muumises
- 09:13 · 80 comments · standfirst: "Isetehtud lahendus võimaldas mööda minna kaheastmelist
  autentimisest", "Ära peteti isegi Google ja PayPal"
- Read part: headline, standfirst, and the lead — suspicion served 5 June to a 22-year-old Tallinn
  man; self-made phishing kit sold to criminals over Telegram. Rest paywalled.
- Note: this is where the age and "Tallinn man" framing were fixed in public for the first time.

### S-10 · Postimees, 20.11.2024 · `read`
- URL: https://www.postimees.ee/8138866/kohus-moistis-kuberkuriteos-suudistatavale-reaalse-vangistuse
- 17:25 · keyword page: https://www.postimees.ee/term/769682/tom-kristian-abel (S-11 lists exactly
  one article)
- Read part: essentially the whole article-body text that is publicly served, including
  the prosecutor and PPA quotes. Verbatim in `extracts/S-10.md`
- Facts added beyond the site's own account: 23 years old and previously unpunished; 6,000+ EUR
  criminal revenue from selling the program; 40,000+ EUR of crypto through his wallet with no
  legal origin established; confiscation of a computer with media, three smartphones and a USB
  stick; AG/PPA framing of "cybercrime-as-a-service"; **"Kohtuotsus ei ole veel jõustunud"**
  (as of publication). Age is stated as 23 here, 22 elsewhere — the register carries both.
- Brand weight: highest for adverse framing, because it is the only article with named officials
  quoting him as a case study.

### S-11 · Äritehnoloogia (Äripäev), 20.11.2024, Indrek Kald · `partial`
- URL: https://www.aritehnoloogia.ee/uudised/2024/11/20/kuberkurjategijana-vangi-saadetud-noormees-teatas-linkedinis-et-teeb-toos-pausi
- 18:16 · section Küberturvalisus
- Read part: headline, one-line lead ("Küberkuriteos süüdistatav Tom Kristian Abel sai täna Harju
  maakohtult karistuseks reaalse vangistuse."), photo caption ("Tom Kristian Abel reklaamis oma
  oskusi ja kogemusi sotsiaalmeedias avalikult."). Body paywalled.
- Note: the headline is about his LinkedIn post, not about the crime — the press treated his
  self-marketing as the story. Directly relevant to the risk gate.

### S-12 · Geenius DigiPRO, 13.05.2026, Jaanus Vogelberg · `partial`
- URL: https://geeniusdigipro.delfi.ee/artikkel/120583559/presidendi-haridushakatonil-tunnustati-ka-praktikut-kui-paris-hakkereid-ei-ole-siis-on-nagu-mottetu-hakaton
- 14:10 · Read part: lead + the prosecutor's account, then paywall. Verbatim in `extracts/S-12.md`
- Read part contains the only third-party quote of him from 2026: he told DigiPRO he is now on
  "teisel poolel rindejoont" (the other side of the frontline) and works against cyber fraud.
- Brand weight: high — the award story is positive, and the lead still front-loads the conviction
  ("tunamullu arvutikuriteo ettevalmistamises süüdi mõistetud"). It is the template every future
  press mention will follow unless the new material is stronger than the old.

### S-13 · Delfi topic page · `read`
- URL: https://www.delfi.ee/teema/96943377/tom-kristian-abel
- As of 2026-10-24 it aggregates **one** article (S-12). The 2024 Delfi items are not listed.
- Contradicts the 2026-09-22 baseline (S-25), which recorded this page as the adverse aggregator.
  Either the aggregation rule changed or it is tag-driven and incomplete. Re-check at Phase 8.

### S-14 · Postimees keyword page · `read`
- URL: https://www.postimees.ee/term/769682/tom-kristian-abel — one article (S-10).
- Other Postimees keywords on the same article: LinkedIn, Vahur Verte, Ago Ambur (officials, not
  him). Do not republish official names in brand copy.

---

## C — Social and platform surfaces

### S-15 · LinkedIn profile `in/hr-abel` · `read` (live capture 2026-10-24)
- URL: https://www.linkedin.com/in/hr-abel/ · raw: `raw/linkedin-profile-2026-10-24.md`
- Type: social profile + self-authored About + posts · first person: yes
- Headline: "Founding Engineer | Cyber-Kratt | Ex-Black Hat" · 244 connections · 198 profile views
  (7 days) · 36 post impressions · 14 search appearances
- Holds verbatim: About (kratt explanation, "In my previous role… analyzed, avoided and used
  weaknesses", "take full personal responsibility"), Top skills, three full posts (Estonian
  PPA/FBI post; passkeys/scorecard post incl. his 2022 forum alias "Dead Souls"; Scattered Spider
  post), Experience (Founding Engineer at ProksiAbel OÜ Jan 2025–present; "Independent Exploitation
  Researcher & Tool Developer" Jun 2021–Jul 2024), Education (koodtech 2026–2027; TalTech
  micro-degree Jan–May 2026; Tallinn Polytechnic School 2017–2020), Honors (AI GovTech Hackathon
  #2/ESTDEV Jun 2026; Presidential Hackathon | OpenAI Special Award, TI-Hüpe, May 2026; Fellin Häkk
  2026 #1, StarHub, Feb 2026), Skills (incl. Microsoft EDR / Azure / Entra ID from SC-200 course
  material listed as skills).
- Brand weight: highest for voice-in-short-form and for the live self-description that the brand
  system has to replace or defend. Two entries are in direct conflict with the risk gate:
  "Ex-Black Hat" in the headline and "Independent Exploitation Researcher" as a job title.

### S-16 · LinkedIn posts/comments (search-indexed, outside the profile capture) · `snippet`
- URLs: `/posts/hr-abel_cybersecurity-opsec-estonia-activity-7409369930309107712-lOTc` (23 Dec 2025),
  `/posts/hr-abel_koolipingist-suurfirmade-süsteemidesse-usa-activity-7454785787163893760-gM9p`
  (27 Apr 2026); comments on posts by Lauri Haav (Jun 2026) and Torben Elgaard Jensen (Feb 2026)
- Not read in full; the 23 Dec 2025 post body is in S-15.

### S-17 · GitHub `tomkabel` · `read`
- URL: https://github.com/tomkabel · captured via API 2026-10-24
- Bio (verbatim): "Authentication security researcher — breaking eID, anti-fraud, and browser
  attestation systems to build better ones." · company ProksiAbel OÜ · blog tomabel.ee · Estonia
- 10 public repos, 16 followers, 19 following, 30 starred. Flagship
  `google-botguard-security-research` **104 stars / 19 forks**. Others: fingerprintproxy (2),
  smart-id-security-research, zero-trust-octagon, tomabel.ee, tomkabel (profile README),
  eudi-wallet-poc (fork), C3EE-Cyber-CTF, claude-select, tiltrank.
- 12 public gists spanning 2025-05 → 2026-09, including the EKI moodupuu leaderboard reanalysis
  (2026-09-04) and assorted dev-tooling notes.
- READMEs captured verbatim under `raw/github/`.

### S-18 · GitHub org `Proxyabel` (company) · `read`
- URL: https://github.com/Proxyabel · bio (verbatim): "The only real defense is active defense."
- 3 repos: `.github` (4 words), `botguard-token-portability-case-study` (renamed from
  `evilginx.botguard` — the phishing framework name is no longer in the repo list),
  `js-security-research`. Confirms the rename recorded in S-25 was executed.

### S-19 · GitHub `M41KL-N41TT` (archived + renamed) · `read`
- Name: "Tom Kristian Abel (archived)"; bio points to github.com/tomkabel; 19 followers
- 1 public repo: `BurpSuite` — "Burp Suite Professional 2023.*. * Loader Updated (with 2 loaders to
  choose from)", **39 stars**, license-bypass tool, still public. Self-declared link to him (name +
  bio only).
- Relevance: the single most damaging artifact that is still live by choice. Phase 6 decision.

### S-20 · ORCID 0009-0009-9881-1293 · `read` (via S-23)
- URL: https://orcid.org/0009-0009-9881-1293 — registered to "Tom Kristian Abel", created Dec 2025,
  **zero works, zero affiliations**. `needs-proof` as a scholarly identity; it exists but carries
  nothing.

---

## D — Machine-read views of him (the perception baseline)

### S-21 · Google AI Mode answer, captured 2026-10-24 · `read`
- Query (run 2, verbatim): "Who is Tom Kristian Abel, the Estonian cybersecurity researcher behind
  tomabel.ee and ProksiAbel OÜ? Include his work, education, awards and any legal case, and list the
  sources you used." → full verbatim answer in `extracts/S-21-ai-answer.md`
- Two runs, same day, **different wording and different lead** (run 1 said "operating professionally
  under the moniker 'Cyber-Kratt'" and "openly frames his career around a transition from offensive
  'black-hat' hacking"; run 2 says "Once active as an adversarial 'black hat' hacker, Abel
  transitioned into defensive security" and never uses the moniker). Only run 2 is preserved
  verbatim; run 1 exists as a summary in this register. Treat the answer as non-deterministic.
- What it says: Estonian cybersecurity researcher / systems architect / entrepreneur, founder and
  principal engineer of ProksiAbel OÜ; education (Tallinn Polytechnic School 2017–2020, TalTech
  micro-degree 2026, kood/Jõhvi 2026–2027); awards (AI GovTech 2nd/ESTDEV Jun 2026, Presidential
  Hackathon OpenAI Special Award May 2026, Fellin Häkk 1st Feb 2026); research set (Smart-ID/eID
  disclosure to SK ID Solutions + RIA, BotGuard, fingerprintproxy, Zero-Trust Octagon, Kompass);
  the 2024 conviction with date, charge and sentence; "Abel is transparent about this criminal
  background".
- Sources cited: tomabel.ee (×6), LinkedIn (×5), Postimees 8138866 (×4), proksiabel.ee, a Wikimedia
  Commons photo of him, inforegister/teatmik.
- Two conclusions: (a) the arc framing already propagates and it came from his own surfaces, not from
  press; (b) the model volunteers the exact labels the risk gate forbids in owned copy, and derives
  the whole legal paragraph from a single article.

### S-22 · Live SERP capture attempt, 2026-10-24 · `failed` (documented)
- Google: automated-traffic interstitial (captcha) from this host's egress IP.
- Bing: returns unrelated commercial results for the exact-name query ("About 50 results", all
  chess.com) — the endpoint is serving junk to this client, not a real ranking.
- DuckDuckGo (HTML and JS): bot-check page, zero results.
- Mojeek: page loads, no parseable results.
- Firecrawl (cloud and local `asus:3002`): junk result sets for every name query.
- Consequence: **no trustworthy ranked SERP could be produced today from this network.** The
  2026-09-22 baseline (S-25) stands as the reference until a working measurement path is found.
  Recorded rather than substituted — see `serp-and-ai-snapshot-2026-10-24.md`.

---

## E — Prior research on this identity (federated, not re-collected)

### S-23 · `findings.md` — technical footprint, 2026-10-06 · `read`
- Path: `/home/notroot/research/investigations/tomabel-proksiabel-investigation/findings.md`
- Holds: identity resolution across three GitHub accounts, PGP key UIDs
  (`tomkristian.abel@proksiabel.ee`, key 0x0C2A0C6F110AABC5), ORCID, site inventory (including
  proksimity/specter/steroidid Pages deployments), 11 site-listed repos that are not public, and
  the negative findings: **no talks, no HN, no Reddit, no academic record, no third-party coverage
  as of 6 Oct 2026.**
- Status note: written nine days before S-12's award coverage was found in this pass, so its
  "no third-party coverage" claim is already stale.

### S-24 · `identity-rebrand-plan.md` — the executed rebrand plan · `read` (structure)
- Path: `/home/notroot/research/investigations/tomabel-proksiabel-investigation/identity-rebrand-plan.md`
  (55,958 bytes, 8 phases, ~120 tracked items)
- Holds: credentials/access inventory, Phase 0 backup procedure, triage of the archived profile,
  profile-README spec, evilginx README rewrite, the "body of work" search-domination strategy.
- Use: constraints. The new brand system must not contradict decisions already shipped.

### S-25 · `phase7-search-baseline.md` — SERP baseline, measured 2026-09-22 · `read`
- Path: same directory
- Holds: ranked top-10 for "Tom Kristian Abel" — 5–7 controlled properties out of eight; adverse
  entries were a Delfi topic page (now S-13, since changed) and the Äritehnoloogia article (S-11);
  two measurements an hour apart disagreed on ordering, so the metric is noisy by nature.
- Also holds the Proxyabel-account finding and the executed rename to
  `botguard-token-portability-case-study` (confirmed live as S-18).

### S-26 · `proksiabel-ou-registry-findings.txt` · `partial`
- Path: same directory (13,344 bytes)
- Holds: company-registry work: ProksiAbel OÜ, registry code 17017826, founded 27.06.2024, EMTAK
  69201 "Auditing", VAT EE102894062 registered 26.08.2025 – expired 02.01.2026, zero revenue FY2024
  and FY2025, one employee, deletion banner in the registry view, no public deletion notice found.
- Claim status: `verified` where it cites the register, but the deletion status was **not**
  confirmed — treat as `needs-proof` until re-checked at Phase 6.
- Brand weight: high for `brand-architecture`. A company with a deletion banner cannot be the
  load-bearing entity of a personal brand without a decision.

### S-27 · BSides Tallinn correspondence · `registry-only`
- Paths: `bsides_tallinn_presentation_removed.eml`,
  `bsides_tallinn_presentation_removed-response.eml` (10 Oct 2026)
- Type: private correspondence, not public statements · **never enters brand copy**
- Relevance: explains why the speaker record (S-29) is thin.

### S-28 · kood/Jõhvi and "Cyber-Kratt" · `registry-only`
- No public source found that defines the role or the nickname. The only definition is his own
  (S-15: the kratt of Estonian folklore — "will turn on its owner if left without a task").
- Priority gap: the single most repeated label of the brand has no external referent.

### S-29 · Speaker and CFP record · `registry-only`
- Nothing verified. No talk, no published abstract, no printed speaker bio found in this pass or in
  S-23. The Disobey/CFP pipeline is a Phase 9 surface, not an existing asset.

### S-30 · Shipped decisions · `read`
- Paths: `.decisions.log`, `.hermes/plans/critique-remediation.md`, `drafts/` commits in git log
- Holds: the decisions the brand already made — English at root with `/et/`, "Published · Updated"
  dating, nav/footer contact placement, the "hold for legal check" flag on the past-wording.
- Use: constraint set for every later output.

### S-31 · Registry/person directories · `snippet`
- `inforegister.ee` and `radar.aripaev.ee` person records (ranked on page 1 in S-25) publish his date
  of birth; `et.wikipedia.org/wiki/Kasutaja:KasutajaNimeKavalus` is his own user page and ranked.
- Not read live here. Relevance: these surface personal data the brand does not control.

### S-32 · Wikimedia Commons photo · `snippet`
- URL (as cited by S-21): https://et.wikipedia.org/wiki/Fail:Tom_Kristian_Abel_pitching_at_Fellin_Häkk_hackathon_2026.jpg
- A photograph of him presenting at the Fellin Häkk hackathon, 2026, sitting on a public wiki.
- Claim status: `verified` as existing (the AI answer cites it); the file page itself has not been
  read, so licensing, uploader and exact date are unchecked.
- Brand weight: medium-high. It is the only public image asset found, it is outside his control, and
  `brand-identity` §05 (imagery) has to decide whether to adopt, replace or ignore it.

---

## Collection log

| Date | Action | Result |
|---|---|---|
| 2026-10-24 | Library install verified (29 skills, 4 mirrors, lockfile) | done |
| 2026-10-24 | Local corpus read: site copy, my-story, drafts inventory, disclosures review | S-01…S-07, S-30 |
| 2026-10-24 | Press harvested: Delfi interview + news, Postimees, Äritehnoloogia, Geenius | S-08…S-14 (2 new outlets found: Postimees, Äritehnoloogia) |
| 2026-10-24 | Social surfaces captured live: LinkedIn profile + posts, three GitHub accounts, gists | S-15…S-19 |
| 2026-10-24 | AI-answer baseline captured | S-21 |
| 2026-10-24 | SERP capture attempted on 5 engines/paths | **failed** — S-22, method gap logged |
| 2026-10-24 | Prior research federated | S-23…S-26, S-30 |
| 2026-10-24 | ORCID, speaker record, registry record, kood/Jõhvi | open — S-20 (via S-23), S-28, S-29, S-26 |

**Sources with verbatim first-person material: 15** (S-01, S-02*, S-03, S-04, S-05, S-06, S-07,
S-08, S-15, S-16, S-17, S-18, S-19, S-26, S-30) — *S-02 quotes him verbatim while criticising him.
Register size 32 ≥ 25. Nothing above is listed that was not read to the stated depth.

**Status distribution (32 rows):** `read` 19 · `partial` 6 · `snippet` 3 · `registry-only` 3 ·
`failed` 1 — S-22, kept because a documented measurement failure is evidence about the measurement
channel. S-22/S-31/S-32 are the rows that keep this register honest about what has *not* been read.
