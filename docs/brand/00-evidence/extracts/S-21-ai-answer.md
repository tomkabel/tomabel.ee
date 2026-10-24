# S-21 · AI-answer perception snapshot

Baseline capture for the brand's AI-visible state. Any later comparison (Phase 8) is against this.

- Tool: Google AI Mode (via the `google_ai_search` MCP tool, headless)
- Captured: 2026-10-24, two runs
- Query string, run 2 (preserved verbatim below): "Who is Tom Kristian Abel, the Estonian
  cybersecurity researcher behind tomabel.ee and ProksiAbel OÜ? Include his work, education, awards
  and any legal case, and list the sources you used."
- Query string, run 1 (earlier the same day, not preserved verbatim — only the summary below):
  asked the same question without the "list the sources" clause.

**Non-determinism warning.** The two runs differ in wording and in what they lead with. Run 1
described him as "operating professionally under the moniker 'Cyber-Kratt'" and said he "openly
frames his career around a transition from offensive 'black-hat' hacking"; run 2 (below) says "Once
active as an adversarial 'black hat' hacker, Abel transitioned into defensive security" and does not
use the Cyber-Kratt moniker at all. Both describe the same person; neither is a fixed asset. Measure
twice before concluding anything moved.

---

## Verbatim answer (run 2)

> **Tom Kristian Abel** (born August 11, 2001) is an Estonian cybersecurity researcher, systems
> architect, and entrepreneur. He is the founder and principal engineer of **ProksiAbel OÜ**
> (established in June 2024) and publishes his technical findings on his personal research site,
> tomabel.ee.
>
> Once active as an adversarial "black hat" hacker, Abel transitioned into defensive security. He
> currently specializes in reverse engineering anti-fraud systems, analyzing authentication and
> browser defenses, and architecting zero-trust infrastructure.
>
> **Work and Research**
>
> Abel's professional work centers on the intersection of identity protocols, client-side trust, and
> reverse engineering. Through his firm, **ProksiAbel OÜ**, he operates via design partnerships to
> provide red-teaming, enterprise defensive systems, and advisory services.
>
> Notable public projects and research include:
> - **Smart-ID / eID Research:** A coordinated disclosure investigation into the approval layer of
>   Estonia's national digital identity stack, reported directly to SK ID Solutions and Estonia's
>   Information System Authority (RIA).
> - **BotGuard, Disassembled:** A comprehensive public teardown of Google's VM-based anti-fraud
>   framework, mapping out its bytecode VM and anti-debugging capabilities.
> - **fingerprintproxy:** An open-source, high-performance Go-based TLS fingerprinting proxy
>   containing over 65 browser profiles with full JA3/JA4 and MITM support.
> - **Zero-Trust Octagon:** A proprietary defensive framework built upon 8 core axioms and a
>   9-dimension morphological matrix designed to analyze and mitigate archetypal data breaches.
> - **Kompass (InScope):** A free privacy-preserving compliance assessment tool launched under
>   proksiabel.ee to help Estonian organizations self-evaluate their obligations under the EU's NIS2
>   directive and the Estonian Cyber Security Act (KüTS).
>
> **Education**
> - **kood/Jõhvi (2026–2027):** Currently pursuing peer-to-peer, project-based software engineering.
> - **TalTech – Tallinn University of Technology (2026):** Completed a Micro-degree program in
>   Software Engineering (Junior to Senior Developer) focused on advanced cloud systems and
>   application security.
> - **Tallinn Polytechnic School (2017–2020):** Graduated with a vocational certification as a
>   Software Developer.
>
> **Honors and Awards**
> - **AI GovTech Hackathon (June 2026):** Won 2nd Place with team _Red SWAT_, organized by the
>   Estonian Centre for International Development (ESTDEV).
> - **Presidential Hackathon / Tiigrihüpe (May 2026):** Won the _OpenAI Special Award_ with team
>   _MATx_, an educational-tech initiative designed to map student learning gaps.
> - **Fellin Häkk (February 2026):** Won 1st Place with team _MATx_, hosted by StarHub.
>
> **Legal Case**
>
> In **November 2024**, the Harju County Court (_Harju maakohus_) convicted Tom Kristian Abel (then
> 23 years old) of **preparing a computer crime**. According to judicial records, Abel modified and
> sold a specialized version of _Evilginx_—an advanced open-source reverse-proxy framework primarily
> utilized for bypassing multi-factor authentication (MFA) via man-in-the-middle phishing. Through
> these sales, he generated illicit financial revenue.
>
> The court handed down a **10-month prison sentence**, structured as:
> - **5 months** of immediate, real prison time.
> - **5 months** suspended under a one-year probation period.
>
> Abel is transparent about this criminal background. He references the event on his corporate
> profiles and personal blog ("My Story"), asserting that understanding how systems fail from an
> adversarial standpoint provides the exact insight required to build uncompromisable defensive
> software.
>
> **Profile Summary**
>
> | Attribute | Details |
> |---|---|
> | Full Name | Tom Kristian Abel |
> | Born | August 11, 2001 (Estonia) |
> | Primary Entities | ProksiAbel OÜ, tomabel.ee |
> | Areas of Expertise | Reverse engineering, TLS fingerprinting, eIDAS protocols, zero-trust architecture |
> | Notable Research | Teardown of Google BotGuard VM, Estonian Smart-ID protocol vulnerabilities |
> | Key Accomplishments | OpenAI Special Award (Presidential Hackathon), 1st Place Fellin Häkk |
> | Legal History | Convicted in Nov 2024 for computer crime preparation (modifying/selling _Evilginx_ platforms); served a partial prison sentence. |

### Sources the answer cited

| Cited source | Note |
|---|---|
| https://tomabel.ee/ (6 citations) | his own site does the heavy lifting for research claims |
| https://ee.linkedin.com/in/hr-abel (5 citations) | education, awards, design-partnership framing |
| https://www.postimees.ee/8138866/… (4 citations) | the entire legal section comes from this one article |
| https://proksiabel.ee/ | Kompass |
| https://et.wikipedia.org/wiki/Fail:Tom_Kristian_Abel_pitching_at_Fellin_Häkk_hackathon_2026.jpg | a Wikimedia Commons photo of him on stage — first public image asset found, relevant to `brand-identity` §05 |
| inforegister.ee, teatmik (register aggregators) | company registration 17017826 |

---

## What this baseline means for the brand

1. **The arc framing already works in machine-readable form.** The AI describes a researcher who
   transitioned, which is the intended positioning. It did not get that from press; it got it from
   his own site and LinkedIn. That is the strongest evidence in this whole dossier that the
   self-authored surfaces are what shape perception.
2. **Four claims in the answer are uncorroborated by anything in this register** — "principal
   engineer", "operates via design partnerships", "65 browser profiles" quoted as fact, and the
   TalTech micro-degree — all sourced to his own surfaces. They read as established because nobody
   contradicts them. `needs-proof` each, and worth confirming they are literally true.
3. **The legal paragraph is entirely downstream of one Postimees article**, including its
   characterisation ("according to judicial records", which is not accurate — Postimees describes a
   charge, not records). If the brand ever supplies a corrected framing, the AI has no competing
   source; that is an opening, not a hope.
4. **The labels the risk gate forbids are exactly what the model volunteered**: "black hat",
   "transitioned". Owned copy cannot use them, and cannot stop third parties producing them.
5. **Two more assets exist than the register previously knew**: a public Wikimedia photo of him
   pitching (image identity), and register aggregator pages for the company.
