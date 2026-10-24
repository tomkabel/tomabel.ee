# SERP + AI-visibility snapshot — 2026-10-24

Phase 1 output, second half of the perception baseline. Phase 8 compares against this file.

## 1. AI answer — captured, verbatim

See `extracts/S-21-ai-answer.md`. Summary of what an AI assistant currently says about him:

- Estonian cybersecurity researcher / systems architect / entrepreneur, founder and principal
  engineer of ProksiAbel OÜ (June 2024), born 11 Aug 2001.
- "Once active as an adversarial 'black hat' hacker, Abel transitioned into defensive security."
  (Run 1 of the same query used the phrasing "operating professionally under the moniker
  'Cyber-Kratt'" — the answer varies between runs.)
- Research set: Smart-ID/eID coordinated disclosure to SK ID Solutions + RIA, BotGuard disassembled,
  fingerprintproxy, Zero-Trust Octagon, Kompass.
- Education: Tallinn Polytechnic School 2017–2020, TalTech micro-degree 2026, kood/Jõhvi 2026–2027.
- Awards: AI GovTech 2nd (ESTDEV, Jun 2026), Presidential Hackathon OpenAI Special Award (May 2026),
  Fellin Häkk 1st (Feb 2026).
- Legal: Nov 2024 Harju County Court, preparing a computer crime, 10 months (5 real, 5 suspended).
- It states he "is transparent about this criminal background" and cites his own "My Story".
- Citations: tomabel.ee (×6), LinkedIn (×5), Postimees 8138866 (×4), proksiabel.ee, a Wikimedia photo
  of him at Fellin Häkk, inforegister/teatmik.

Verdict: the arc framing is already the machine-readable default; the conviction is a section, not
the lead. That is better than the 2024 press pattern (S-12 still leads with it) and is the single
most encouraging measurement in the dossier.

## 2. Ranked SERP — **not captured. Documented failure, not substituted.**

Attempted today, in this order:

| Path | Result |
|---|---|
| `web_search` (Hermes backend), 5 queries | junk result sets (electronics retailers, a cartoon cat) for every exact-name query |
| Firecrawl search, cloud MCP, 3 queries | same junk pattern |
| Firecrawl search, local `http://asus:3002`, 5 queries | same junk pattern |
| Bing, real browser, 4 queries | "About 50 results", all `chess.com` — the endpoint is serving unrelated content to this client |
| DuckDuckGo HTML (urllib) + DDG JS UI | bot-check page, 0 parseable results |
| Mojeek (static HTML) | page loads (5.5 KB), no results in the markup |
| Google, real browser | "Our systems have detected unusual traffic" interstitial; egress IP `213.219.122.20` flagged |

**No trustworthy ranking data could be produced from this host today.** Rather than write a plausible
list, this file records the failure. Consequences:

1. The reference baseline remains `phase7-search-baseline.md` (measured 2026-09-22, `[S-25]`):
   5–7 of the top 10 were controlled properties, with a Delfi topic page and the Äritehnoloogia
   article as the adverse entries — and that document already notes two same-day measurements
   disagreeing on order.
2. One live signal obtained today is contradictory and worth noting: the Delfi topic page `[S-13]`
   now aggregates only the May 2026 award article, not the 2024 coverage. Whether that is a ranking
   change or a tag/aggregation change is unknown.
3. Phase 8 needs a measurement channel that is not this host's egress: a paid SERP API, a
   query-parameter search endpoint that tolerates datacentre IPs, or capture from the user's own
   browser session. This is a **prerequisite for `brand-measurement`**, not a nice-to-have.

## 3. What is measurable today without a SERP

Available now, all dated 2026-10-24, and worth repeating at Phase 8:

| Metric | Value | Source |
|---|---|---|
| GitHub flagship stars / forks | 104 / 19 (`google-botguard-security-research`) | `[S-17]` |
| Public repos on the primary account | 10 (from 32 before the cleanup) | `[S-17]`, `[S-24]` |
| GitHub followers (primary / archived / company) | 16 / 19 / 4 | `[S-17]`,`S-18`,`S-19` |
| LinkedIn connections / 7-day search appearances | 244 / 14 | `[S-15]` |
| LinkedIn 7-day profile views / post impressions | 198 / 36 | `[S-15]` |
| Press mentions in Estonian media | 4 unique articles across 3 outlets (2024: 3; 2026: 1) | `[S-09]`…`[S-12]` |
| Third-party mentions framed primarily as researcher | 0 | `[S-13]`, `[S-14]`, P-01…P-06 |
| ORCID works | 0 | `[S-20]` |
| Conference talks on record | 0 | `[S-29]` |
| AI answer accuracy | arc framing correct; 4 uncorroborated claims; legal paragraph from one source | `[S-21]` |

These eleven numbers are the brand's actual starting position and the honest basis for any claim
about progress. The last two rows are the ones Phase 7–9 have to move.
