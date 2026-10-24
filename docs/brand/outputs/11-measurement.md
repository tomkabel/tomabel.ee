# 11 · Brand measurement: the framework one person can run

Phase 8, deliverable 1 of 2. Built on the `brand-measurement` skill, scoped down to what a single
person with no budget and no analytics tooling can actually execute, and bound to the decisions in
`decisions.md` (which are binding on this document).

Companion file: `12-ai-visibility.md` (the machine-facing audit that this framework measures).

Everything factual below cites the source register as `[S-nn]`, cites a repo path, or is marked
`[unverified - needs Tom]`. No number in this document was estimated, modelled, or inferred.

---

## 1 · What this system is for, and what it refuses to do

**Purpose.** Answer three questions, once a quarter, with evidence a hostile reader could re-check:

1. **Is the name searched for the right reason?** Does the ranked page for his name, and the AI
   answer about him, lead with the work rather than with the 2024 case?
2. **Is the research being read by the audience that was chosen first?** Research and engineering
   peers are the primary audience; Estonian public sector is second; hiring is third (`decisions.md`,
   G-7). A metric that cannot distinguish peers from recruiters does not answer this.
3. **Is the evidence layer growing?** The signed, hash-verifiable article copies are the only asset
   on the site a regulated buyer can verify without trusting him, and they cover 7 of 19 research
   pages `[S-01]` (verified again on 2026-10-24: 7 `.txt` and 7 `.asc` files in `public/verification/`
   against 19 article routes in `src/content/route-meta.ts`).

**North Star metric.** *Third-party references to the work that do not depend on his own surfaces.*
Baseline: **0** `[S-13]` `[S-14]`. It is the one number that cannot be gamed by editing his own site,
and it is the number the entire program exists to move. Everything else in this framework is a
leading indicator for it.

**What this system refuses to measure**, and why:

| Refused | Reason |
|---|---|
| Revenue attribution (CAC, pipeline, close rate, ROI correlation) | The brand is pre-revenue on its own account (the company's FY2024 and FY2025 revenue is zero and the registry carries a deletion notice `[S-26]`), there is no CRM, no analytics on the site, and no paid channel. Any revenue model here would be invented. Phase 8's deliverable is a measurement framework, not an attribution model. |
| Survey-based brand health (aided awareness, NPS, brand association words) | The audience is a global research niche plus Estonian public sector. A sample large enough to be non-noise does not exist at this size, and a 12-person survey would be worse than no survey. |
| Share of voice against named competitors | There is no competitor set with comparable volume. The peer comparison lives in `09-peers.md` as a qualitative read; it is not a monthly metric. |
| LinkedIn impressions and follower totals as a headline score | Rolling 7-day windows at n in the tens are not measurements. See §8 for the noise floor. |

---

## 2 · The baseline (2026-10-24), eleven numbers

Reproduced from `00-evidence/serp-and-ai-snapshot-2026-10-24.md` §3 so that every later snapshot
compares against one table. All values dated **2026-10-24**.

| # | Metric | Baseline value | Source |
|---|---|---|---|
| 1 | GitHub flagship stars / forks (`google-botguard-security-research`) | 104 / 19 | `[S-17]` |
| 2 | Public repos on the primary account | 10 (from 32 before the cleanup) | `[S-17]` `[S-24]` |
| 3 | GitHub followers (primary / archived / company) | 16 / 19 / 4 | `[S-17]` `[S-18]` `[S-19]` |
| 4 | LinkedIn connections | 244 | `[S-15]` |
| 5 | LinkedIn 7-day search appearances | 14 | `[S-15]` |
| 6 | LinkedIn 7-day profile views / post impressions | 198 / 36 | `[S-15]` |
| 7 | Press mentions in Estonian media | 4 unique articles across 3 outlets (2024: 3; 2026: 1) | `[S-09]` to `[S-12]` |
| 8 | Third-party mentions framed primarily as researcher | 0 | `[S-13]` `[S-14]`, P-01 to P-06 |
| 9 | ORCID works | 0 (ORCID 0009-0009-9881-1293 exists, created Dec 2025, no works, no affiliations) | `[S-20]` |
| 10 | Conference talks on record | 0 | `[S-29]` |
| 11 | AI answer accuracy (Google AI Mode) | arc framing correct; 4 uncorroborated claims; legal paragraph derived from one article | `[S-21]` |

Two rows were re-measured on 2026-10-24 while writing this file, and both changed in an informative
way:

- **Row 11 (AI answer accuracy), updated.** Three runs now exist. Run 1 and run 2 are the baseline
  `[S-21]`; **run 3, captured 2026-10-24 during phase 8**, describes him as *"an Estonian systems
  architect, cybersecurity consultant, and authentication security researcher"*, names a new entity
  phrase (*"founder and sole board member of ProksiAbel OÜ"*), and drops every named paper except
  Smart-ID/eID, BotGuard, `fingerprintproxy`, Zero-Trust Octagon and Kompass. Verbatim extract,
  method and the full run-to-run diff are in Appendix A. Three runs, three different leads: the
  answer is not a fixed asset and one run is an anecdote.
- **Row 7 (press mentions), unchanged but worth a note.** The Delfi topic page `[S-13]` now
  aggregates only the May 2026 award article rather than the 2024 coverage. Whether that is
  ranking or tag aggregation is unknown, so it stays a qualitative note, not a metric.
- **Row 9 (ORCID works), unchanged, and the markup half is now in flight.** An ORCID exists with zero
  works `[S-20]`, which is a work problem. The markup problem (no ORCID in the entity graph) was
  closed in the repository on 2026-10-24 (`ba41bad`, `index.html:46`) and is **not live** as of
  17:05 the same day, so the identifier a machine reads today is still absent
  (`12-ai-visibility.md`, finding P0-3).

**A twelfth number that is not a metric but a gate:** signed article copies, 7 of 19 `[S-01]`.

---

## 3 · The metric set

Five families, chosen so that each one is (a) obtainable, (b) attributable to a specific decision in
`decisions.md`, and (c) hard to move by accident.

### 3.1 · Name-search composition

**What it is.** The composition of the ranked top 10 for the exact-name query, classified into
three buckets:

| Class | Definition | Baseline (2026-09-22 `[S-25]`) |
|---|---|---|
| **Controlled** | a property he owns or edits: tomabel.ee, proksiabel.ee, GitHub, LinkedIn | 5 to 7 of the top 10 |
| **Neutral third party** | someone else writing about the work or the awards | not present as a lead frame `[S-13]` `[S-14]` |
| **Adverse** | 2024 case coverage, registry aggregators publishing his date of birth `[S-31]` | the Delfi topic page and the Äritehnoloogia article `[S-25]` |

**Target direction.** Not "all ten controlled". A page made only of his own properties is a bubble;
the change worth measuring is *neutral third party entries appearing and the adverse entries leaving
the first page*. Baseline for "third-party mentions framed primarily as researcher" is 0, and that
row is the real target.

**Channel.** The ranked SERP could not be captured from this machine on 2026-10-24 `[S-22]`. §4.2 is
the replacement procedure. Until it runs, this family stays **BLOCKED**, and the last trustworthy
reading is 2026-09-22 `[S-25]`.

**Reading rule.** Never compare a new capture to `[S-25]` without noting that `[S-25]` contains two
same-day measurements that disagreed on ordering. Report rank ranges, not single positions.

### 3.2 · AI-answer accuracy

**What it is.** A scored read of the AI answer to a fixed query set, run 3 to 5 times per query,
recorded as an assertion checklist rather than an impression.

Assertion checklist (each scored `correct` / `wrong` / `uncorroborated` / `absent`):

| # | Assertion | Baseline (`[S-21]` run 2) |
|---|---|---|
| A1 | Leads with the work, not the case | correct (arc is the lead; case is a section) |
| A2 | Names a territory narrower than "security researcher" | wrong (three noun phrases across three runs) |
| A3 | Reproduces the work list accurately (Smart-ID/eID, BotGuard, fingerprintproxy, Octagon, Kompass) | correct |
| A4 | States the disclosure recipients and dates correctly (SK ID Solutions Nov 2025; RIA/TTJA/AKI Apr 2026) | correct |
| A5 | Avoids the labels owned copy is forbidden from using ("black hat", "ex-") | wrong in all three runs |
| A6 | Every claim in the answer is corroborated by something other than his own surfaces | wrong (4 uncorroborated claims: "principal engineer", "design partnerships", "65 browser profiles", the TalTech micro-degree) |
| A7 | Legal paragraph sourced from more than one article | wrong (entirely from Postimees 8138866, which describes a charge, not judicial records) |
| A8 | Mentions the signed, hash-verifiable article copies | absent |
| A9 | Mentions the fault-line idea ("what a system claims to verify versus what it verifies") `[S-05]` | absent |
| A10 | Entity claims are consistent with the registry (`[S-26]`: deletion notice published) | wrong (run 3 asserts "founder and sole board member") |

**Target direction.** A3, A4 and A5 are the fastest to fix and A6 is the slowest. A5 cannot be fixed
on his own surfaces at all (the model volunteers the label; owned copy cannot use it), which is
exactly why the metric is scored rather than "improved".

**Also recorded per run:** owned-domain citations versus third-party citations, and which page was
cited. Baseline `[S-21]`: tomabel.ee x6, LinkedIn x5, Postimees x4, proksiabel.ee, a Wikimedia photo,
register aggregators. Run 3 (2026-10-24): Inforegister x6-ish, tomabel.ee x2, LinkedIn x3, ProksiAbel,
Geenius DigiPRO x2, Postimees x2, teatmik.ee.

### 3.3 · Inbound quality

**What it is.** Counting and classifying inbound contact, not converting it. Categories: peer or
researcher, Estonian public sector or regulator, press, recruiter or agency, vendor sales, unknown.

**Sources available without adding tracking.** Direct email, LinkedIn messages, GitHub issues, and
pull requests or stars-with-comments on the flagship repos `[S-17]`. There is **no analytics on the
site** (no analytics script, tag manager or Search Console verification token anywhere in
`index.html`, `src/`, or `worker/`; the privacy policy states there is no cross-site tracking), so
traffic-derived metrics are not available. Whether Cloudflare zone analytics or Search Console
is configured out of band is `[unverified - needs Tom]`, and if Search Console can be verified it
becomes the highest-value inbound source: it is free, first-party, and shows the queries that
actually reach the site.

**Target direction.** The share of inbound that is peer or public sector, not the total. At this
volume the total is dominated by people who already know him, which is why a rising total proves
nothing.

**Not measured here:** conversion, revenue, lead value.

### 3.4 · CFP and talk outcomes

**What it is.** Submissions sent, submissions accepted, talks delivered, with venue, date and the
public URL of the abstract. The cheapest high-signal metric in the whole framework, because a
programme committee is a third party who chose the work on its merits.

**Baseline.** 0 talks on record `[S-29]`. One submission pending: 40C3 Track B, status SUBMITTED
2026-10-09, pretalx code LU8GWS `[S-33]`. Decision G-1 makes the 40C3 outcome the next
frame-changing event.

**Target direction.** Acceptance rate is meaningless at n=1. Measure *submissions sent per quarter*
(a behaviour he controls) and log outcomes as they arrive. A published abstract URL is the
byproduct that feeds metric family 3.1, because conference pages rank and get cited.

**Trap.** The speaker record is thin for a documented reason (`[S-27]`: a BSides Tallinn
presentation was withdrawn) `never enters brand copy`.

### 3.5 · Follower quality

**What it is.** Not counts. A quarterly sample of 20 recent LinkedIn connections and 20 recent
GitHub followers, classified with the same labels as §3.3.

**Why the counts are not the metric.** The archived account's follower set included follow-back
accounts `[S-24]`, which is what a count-based reading would have reported as growth. The
current counts (16 / 19 / 4 on GitHub `[S-17]` `[S-18]` `[S-19]`, 244 LinkedIn connections `[S-15]`)
are stocks, not flows, and the flows are too small to interpret month to month.

**Target direction.** A rising share of peers in the sample. A growing follower count with a falling
peer share is a regression, and this metric is the only one in the framework that can say so.

---

## 4 · Measurement channels: what works, what does not, and what replaces it

### 4.1 · Channel A: AI-answer capture (WORKS)

Proven on 2026-10-24, three successful captures: Google AI Mode via the `google_ai_search` MCP tool
(`search_ai`, headless). No captcha, no bot wall, no degraded status.

- Cost: free. Time: about 30 seconds per query, plus filing.
- Save every capture with `save_to_file=true`; the tool writes to
  `~/.local/share/google-ai-mode-mcp/results/`. **Run 1 and run 3 of the baseline query were not
  saved to file** (run 1 because the tool default was off `[S-21]`, run 3 because it was run
  interactively); only their quoted text survives. Every future capture must be filed, or the
  measurement is an anecdote with a timestamp.
- Raw captures from 2026-10-24 that are on disk today:
  `/home/notroot/.local/share/google-ai-mode-mcp/results/q2-smart-id-relay.md` and
  `q3-cyber-kratt.md`. File them under `00-evidence/raw/ai/` (private repo) at the next snapshot.
- Rerun the same query 3 to 5 times and record the mention **rate with its sample size**
  ("cited 3/5, n=5") rather than one answer.

### 4.2 · Channel B: ranked SERP capture (DOES NOT WORK FROM THIS HOST)

The failure is documented, not substituted `[S-22]`: Google served an automated-traffic interstitial
from this egress IP; Bing returned unrelated commercial results for the exact-name query ("About 50
results", all `chess.com`); DuckDuckGo served a bot-check page; Mojeek loaded with no parseable
results; Firecrawl (cloud and a local instance) returned junk result sets for every name query.

**Rule that follows from it.** No ranking number obtained through this host's egress may be
published, quoted, or compared. A plausible-looking list produced this way is worse than a gap,
because it would be indistinguishable from a real measurement in a later document.

Three replacement paths, in order of preference:

**B1 · Manual capture from Tom's own browser session (free, 20 minutes, recommended).**
A logged-in residential session is the only path that reliably returns an unfiltered page, and the
capture is inspectable.

1. Open a private window. Set the engine's region to Estonia if the engine offers it.
2. Run the eight queries in §7 exactly as written, one at a time.
3. For each, record: the top 10 result URLs in order, the position of the first controlled property,
   the position of the Delfi topic page `[S-13]` and the Äritehnoloogia article `[S-11]` if present,
   and any AI Overview or People-Also-Ask block with its cited sources.
4. Screenshot each result page (the screenshots are the evidence; a pasted list is not).
5. Save as `00-evidence/raw/serp/serp-<engine>-<YYYY-MM-DD>.md` plus the images, and state in the
   header: engine, date, time, region, session type (signed-in or not), and whether personalisation
   was off.
6. Repeat the whole set twice, an hour apart, and report both passes. `[S-25]` shows why: two
   measurements an hour apart disagreed on ordering.

**B2 · Paid SERP API (costs money, removes the human).** Any provider that sells raw top-10 results
(DataForSEO, SerpApi, Brave Search API, and similar) returns the same data without a browser. If he
buys one, the acceptance test is one probe: the exact-name query must return at least one controlled
property in the top 3. If it does not, the endpoint is broken for this query, exactly as Bing was
`[S-22]`, and the API must not be used. Budget is `[unverified - needs Tom]`.

**B3 · Different egress (free, awkward).** Run the same checks from a mobile hotspot or a different
network. Record the egress type in the capture header. This is the fallback when B1 cannot be
arranged, not the default, because a datacentre IP is what caused the failure in the first place.

**If none of the three is available on the scheduled date**, the honest output is a dated file
saying so, continuing the `[S-22]` precedent. The name-search family stays BLOCKED and is reported
as BLOCKED.

### 4.3 · Channel C: owned and third-party data (PARTIAL)

| Source | Status | Use |
|---|---|---|
| GitHub API (stars, forks, followers, repo list per account) | works, free, scriptable | metric rows 1 to 3 |
| LinkedIn profile (connections, 7-day appearances, views, impressions) | works, manual | metric rows 4 to 6 |
| Search Console | `[unverified - needs Tom]` | if verifiable, the highest-value inbound source |
| Press search for new articles about him | manual, low cost | metric row 7 |
| ORCID record `[S-20]` | works, manual | metric row 9 |
| CFP platforms (pretalx and similar) | account access required | §3.4 |
| Cloudflare zone analytics (worker deployment `worker/wrangler.jsonc`) | `[unverified - needs Tom]` | request volume only, no identity |

There is no site analytics, so "inbound quality" is measured from conversations, not from sessions.
That is a deliberate consequence of the site's privacy stance, and the framework accepts the
limitation rather than proposing tracking to fill it.

### 4.4 · Channel D: mention monitoring (Google Alerts and its equivalents)

The plan's third phase-8 item is alerts on name variants, and it is the cheapest part of the whole
system: setup is ten minutes, the running cost is the discipline of reading the mail.

Set one alert per variant, delivery as they happen, region Estonia plus worldwide, language both:

| Alert query | Catches |
|---|---|
| `"Tom Kristian Abel"` | full-name mentions, the primary watch |
| `"Tom Abel" turvauurija` | Estonian coverage that drops the middle name |
| `"Tom Abel" ProksiAbel` | company and commercial mentions |
| `"tomabel.ee"` | citing and scraping of the site itself |
| `"ProksiAbel"` | the company surface, including registry changes |
| `"Cyber-Kratt"` | the label, which has no third-party definition yet `[S-28]` |
| `"M41KL-N41TT"` | the archived handle `[S-19]`, still the most damaging live artifact |
| `"Tom Abel" Proksimity` | the product surface, `[unverified - needs Tom]` as to volume |

Two rules for reading it. First, an alert is a monitor, not a rank tracker: it tells you a page
exists, not where it ranks, and it must not be reported as a SERP result. Second, deduplicate by URL
before counting, because aggregators and syndication produce the same article several times, and the
count in metric row 7 is unique articles, not mentions.

The same job can be done from a feed reader instead of email (any RSS reader plus a Google News query
feed per variant), which makes the quarterly count a matter of counting unread items rather than
searching a mailbox. Either way, the output feeds metric row 7 and metric family 3.1, and nothing
else in this framework depends on it.

---

## 5 · The calendar

Quarterly deep snapshot plus a monthly 10-minute check. Nothing weekly: at this volume a weekly
cadence produces noise, and noise is what kills a measurement habit.

| When | What | Channel | Time | Owner |
|---|---|---|---|---|
| Monthly (first working day) | GitHub rows 1 to 3; LinkedIn rows 4 to 6; one AI answer on Q1 with 3 runs | C, A | 15 min | Tom |
| Monthly | Note any new external article, talk page, or podcast episode featuring him | C | 5 min | Tom |
| Quarterly (Jan, Apr, Jul, Oct) | Full eleven-number table, all five metric families, and the three name queries | A, B, C | 90 min | Tom |
| Quarterly | The eight SERP queries, two passes an hour apart, from his own browser (§4.2 B1) | B1 | 20 min | Tom |
| Quarterly | Follower-quality sample, 20 + 20 classified | C | 20 min | Tom |
| Quarterly | Signed-copy coverage against the 19 article routes | repo check | 2 min | Tom or agent |
| Quarterly | Write the report in §6 and file it next to the previous one | all | 30 min | Tom |
| On event | Every CFP submitted, accepted, rejected, or delivered | C | 2 min | Tom |
| Anchored to events | Re-run the AI queries after any of: a decision G-1 outcome, a new signed copy, a new third-party article, a new talk | A | 5 min | Tom |

**Re-snapshot dates that matter for comparison:** the evidence files themselves. Phase 2's baseline
is `serp-and-ai-snapshot-2026-10-24.md`; the reference ranking is `[S-25]`, measured 2026-09-22.
These three files are the "before" side of the pair the program's definition of done requires
(`personal-brand-program.md` §8 item 5). The "after" side cannot be produced on the same day, and
this framework does not pretend it has been.

---

## 6 · The quarterly report

One file per quarter, named `measurement-<YYYY>-Q<n>.md`, filed beside the snapshots. Eight
sections, in this order, none of them optional:

1. **Header**: date, engine and tool used for each capture, session type for the SERP, and which
   channels were BLOCKED.
2. **The eleven-number table** with the 2026-10-24 column next to the new column, and a `changed /
   unchanged / not comparable` verdict per row. "Not comparable" is a valid and expected verdict.
3. **Name-search composition** or an explicit BLOCKED line.
4. **AI-answer accuracy**: the A1 to A10 checklist with run counts and sample sizes, plus the three
   verbatim lead sentences side by side.
5. **Inbound quality**: counts by category, with the peer and public-sector share named separately.
6. **CFP and talks**: submitted, accepted, delivered, with dates.
7. **Follower quality**: sample size, category shares, and one sentence on what changed.
8. **Two decisions**: the single metric to work on next quarter, and the single metric to stop
   reading. Both are required; a report with seven metrics and no decision is filing, not measuring.

---

## 7 · The pre-registered query set

Fixed strings, so that later runs are comparable. Changing a query resets its baseline. Q1 is
verbatim from the existing baseline `[S-21]`.

| # | Query | Purpose | Baseline |
|---|---|---|---|
| Q1 | `Who is Tom Kristian Abel, the Estonian cybersecurity researcher behind tomabel.ee and ProksiAbel OÜ? Include his work, education, awards and any legal case, and list the sources you used.` | the whole-entity answer; A1 to A10 | `[S-21]` run 2, plus run 3 (2026-10-24) |
| Q2 | `Who discovered the Smart-ID signing relay attack against Estonia's digital identity system, and what did they report to SK ID Solutions?` | does the work get attributed to him by topic, not by name? | 2026-10-24: yes, 7 citations, all to the one page |
| Q3 | `What does Cyber-Kratt mean in Estonian cybersecurity, and is it connected to Tom Kristian Abel?` | is the label defined by anyone other than him? | 2026-10-24: attributed to him, single-sourced to LinkedIn; no third-party definition `[S-28]` |
| Q4 | `Is Smart-ID safe to use, and what is the Achilles heel of Estonia's eState?` | the non-name entry point into his niche | not yet measured |
| Q5 | `Who in Estonia works on eID and anti-fraud security research?` | does an open peer query return him at all? | not yet measured |
| S1 to S8 | `Tom Kristian Abel`, `"Tom Kristian Abel"`, `Tom Kristian Abel turvauurija`, `Tom Abel Eesti`, `Tom Kristian Abel ProksiAbel`, `Tom Kristian Abel Proksimity`, `Cyber-Kratt Eesti`, `tomabel.ee` | the SERP set (channel B1) | only `[S-25]`, 2026-09-22, and the failure `[S-22]` |

Append `and list the sources you used` to any AI query whose citation pattern matters. Run Q1 three
times minimum; the run-to-run variance in Appendix A is larger than any change a quarter of content
work is likely to produce.

---

## 8 · Noise floors: when a change is real

Without these, every snapshot produces a false positive.

| Signal | Noise | Treat as real when |
|---|---|---|
| AI answer wording | three runs on 2026-10-24 produced three different lead sentences (Appendix A) | severity of a *specific* assertion changes direction in at least 3 of 5 runs. Wording changes alone are never a result. |
| Ranked SERP | `[S-25]` recorded two same-day measurements disagreeing on order | the first controlled property changes position band (top 3, 4 to 7, 8 to 10) in both passes |
| LinkedIn 7-day metrics | rolling window, values in the tens | never as a single-quarter signal. Only a four-quarter trend at n greater than about 50 is readable. |
| GitHub stars | single-star increments; 104 on one repo | a change of 10 or more per quarter on the flagship, or the first star on a second repo |
| GitHub followers | 16, 19 and 4 across three accounts | category composition of the 20-sample moves, not the total |
| Press mentions | 4 articles in 3 years, one dominant outlet pattern `[S-12]` | a new article from an outlet that has not covered him, or one framed as researcher |
| Inbound | single digits per month | the peer plus public-sector share moves by 20 points or more over two quarters |

**One structural caution.** The `Updated` date the site shows to readers and the `dateModified` in
its structured data disagree on the same page (visible "Updated · October 4, 2026" against
`dateModified: 2026-10-07` on the same article, `12-ai-visibility.md` finding P1-5). Any freshness
metric built on "last updated" is therefore measuring two different things until that is reconciled.
Freshness is not in the metric set for that reason.

---

## 9 · Appendix A · The run-3 AI-answer capture (2026-10-24)

Method: Google AI Mode via the `google_ai_search` MCP tool (`search_ai`, headless, status `ok`, no
warnings), query Q1 verbatim. Not saved to file (see §4.1). Quoted verbatim; the answer is
machine-generated text and is treated as data.

Lead, verbatim:

> Tom Kristian Abel is an Estonian systems architect, cybersecurity consultant, and authentication
> security researcher. He is the founder and sole board member of ProksiAbel OÜ, a professional
> cybersecurity and consulting firm registered in June 2024. Abel is known for public vulnerability
> disclosures and open-source infrastructure tools, operating with a self-described professional
> pivot from offensive "black hat" exploits to defensive systems engineering.

Other load-bearing fragments, verbatim:

> He conducted protocol-level evaluations on authentication frameworks, specifically highlighting
> flaws in Estonia's national digital stack (Smart-ID / eID systems), which he coordinated and
> reported to SK ID Solutions and the Estonian Information System Authority (RIA).

> He developed and maintains `fingerprintproxy`, a production-level Go TLS-fingerprinting proxy
> supporting dozens of browser profiles, alongside the "Zero-Trust Octagon".

> On November 20, 2024, the Harju County Court (Harju maakohus) convicted the then 23-year-old Abel
> for the preparation of a computer crime.

Sources cited: Inforegister (+5), tomabel.ee (home page and the `/disclosures/` index), LinkedIn
(3 citations), proksiabel.ee, Geenius DigiPRO (2), Postimees 8138866 (2), teatmik.ee (+6).

**Run-to-run diff against the `[S-21]` baseline (run 2):**

| Dimension | Run 1 `[S-21]` | Run 2 `[S-21]` | Run 3 (2026-10-24) |
|---|---|---|---|
| Lead framings | introduces "Cyber-Kratt" as a moniker | "black hat" who "transitioned" | "systems architect, cybersecurity consultant, and authentication security researcher" |
| Entity phrase for the company | founder and principal engineer | founder and principal engineer | founder and sole board member |
| Named research | Smart-ID/eID, BotGuard, fingerprintproxy, Octagon, Kompass | same five | same five, with `fingerprintproxy` "supporting dozens of browser profiles" |
| Owned-domain citations | yes | tomabel.ee x6 | tomabel.ee x2 plus the index page |
| Third-party citations | LinkedIn, Postimees, Wikimedia photo, registries | LinkedIn x5, Postimees x4 | LinkedIn x3, Postimees x2, Geenius x2, registries (no Wikimedia) |
| Signed-copy coverage mentioned | no | no | no |
| Fault-line idea mentioned | no | no | no |

Three useful readings come out of this table, and they set the phase 9 expectations:

1. The five-item work list is stable across three runs. That part of the machine-facing layer works.
2. The self-description is not stable: three runs, three different noun phrases, and "consultant" is
   a fifth framing added by the machine on top of the four live role framings the audit found `[S-05]`.
   Fixing the site's own noun phrase is a prerequisite to the machine agreeing with it.
3. The vocabulary the risk gate forbids in owned copy ("black hat", "pivot from offensive") was
   volunteered again, and run 3 attributed it to him as "self-described". That attribution is
   wrong in the sense that matters: owned copy is not allowed to say it, so the machine is
   inferring it from press, not quoting him.

---

## 10 · Appendix B · The two-minute integrity check

Run before and after any content work, and paste the output into the quarterly report:

```
# signed-copy coverage (expect 19/19 after phase 9)
ls public/verification/*.txt | wc -l        # currently 7
ls public/verification/*.asc | wc -l        # currently 7

# did the machine layer build clean? (reads pub/, so run it after a build)
pnpm build 2>&1 | tail -3                   # expect "emitted 28 prerendered route shells"

# citation integrity of the brand outputs
node docs/brand/check-traceability.mjs      # every [S-nn] must resolve
```

The first two counts are the only leading indicator in this framework that moves on work he fully
controls, which is why they are in the two-minute check rather than in a quarterly review.
