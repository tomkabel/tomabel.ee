# 07 — Brand architecture

Phase 6 output, run against the `brand-architecture` skill (`.agents/skills/brand-architecture/SKILL.md`).
Author: phase-6 agent, 2026-10-24. Binding inputs: `../decisions.md` (G-3, G-4, G-9, G-10), the
phase-3 context (`.agents/brand-context.md`), the phase-1 evidence register (`../00-evidence/source-register.md`),
and the phase-2 audit (`../01-audit.md`).

**Dependency note.** `outputs/01-…` through `outputs/06-…` (phases 4 and 5) do not exist in this
workspace yet. This document is therefore written against the phase-3 context and the decision
record, not against a finished positioning or voice guide. Two things follow: the architecture is
stated in terms the positioning will inherit rather than the other way round, and the naming and
governance rules below are the ones phases 4 to 7 must adopt, not a summary of ones they already
made. Where a rule and a later output could collide, the rule wins; change it here or not at all.

**One claim that changed since the audit.** [S-26] recorded the deletion banner on the registry card
but could not retrieve the notice itself. As of the 2026-10-24 re-check the deletion notice for
ProksiAbel OÜ (registry 17017826) is published in Ametlikud Teadaanded, and the registry status still
reads "Registrisse kantud". Decision G-4 (keep ProksiAbel OÜ as publisher and employer) stands, but
its prerequisite P-1 has failed. Section 07 of this document is the failure analysis and the
fallback ladder. Nothing else in the architecture is conditional on it, which is deliberate.

---

## 01 — PORTFOLIO AUDIT

Every named entity in play, with the audience it actually addresses.

| # | Entity / surface | Audience | Positioning it claims | Current relationship | Brand equity |
|---|---|---|---|---|---|
| 1 | **Tom Kristian Abel** (the person, tomabel.ee) | research and engineering community first, Estonian public sector second, hiring third (G-7) | "Systems architect and security researcher"; the claim-vs-actual fault line [S-05] | master brand, undecided in practice (four live framings, D1 2/5) [S-05] [S-15] [S-17] [S-21] | strong where it is uncontrolled (name query: tomabel.ee ranks 1st, 5 to 7 of the top 10 are his) [S-25] |
| 2 | **ProksiAbel OÜ** (registry 17017826) | nobody measurable; buyers would be Estonian organisations falling under KüTS/NIS2 [S-26] | legal person; registry EMTAK 69201 "Auditing"; public-facing site sells MITM protection and NIS2 consulting [S-26] | endorsed entity, but load-bearing: it is the schema publisher, the byline suffix and a mail domain | weak to negative: capital 0.01 EUR, VAT expired 02.01.2026, zero revenue FY2024 and FY2025, one employee, deletion notice published [S-26] |
| 3 | **proksiabel.ee** (including `/principal`) and **inscope.proksiabel.ee** | Estonian organisations, via RIA's NIS2 scope | free "Kompass" scope checker plus an EIS-funded cybersecurity roadmap service, marked "just launching" [S-26] | company website and lead tool | live and on-topic, and `/principal` ranks 2nd on the name query [S-25]; the LinkedIn company page has 5 followers [S-26] |
| 4 | **Proksimity** | anti-fraud and traffic-assurance buyers | commercial server-side traffic identity assurance; passive identity from timing and TLS handshake characteristics, no payload read, no personal data stored [S-05] | product under the company; the COI line on the research pages names it (`../01-audit.md` §1) | low: a `.pages.dev` deployment and a telemetry endpoint under the company subdomain; no external referent found in this pass `[unverified]` |
| 5 | **Specter**, **SteroidID** | developer buyers | edge access control with signed audit logs; FIDO2 plus Smart-ID pairing [S-05] | product prototypes on `.pages.dev` | low, and both dilute the territory when listed beside the research (D3 finding) [S-01] |
| 6 | **MATx** (matx.ee) | Estonian schools and parents | Estonian-language AI maths tutor for grades 7 to 9 [matx.ee, read 2026-10-24] | a separate venture where he is Co-Founder and CTO [S-05] [S-06] | separate brand, live, no equity transfer either way |
| 7 | **"Cyber-Kratt"** | peers and press | nothing externally; the only definition is his own folklore gloss [S-28] [S-15] | label inside the person brand, decided public (G-3) | none that can be measured, and it is currently in the LinkedIn headline [S-15] |
| 8 | **GitHub `tomkabel`** | peers | "Authentication security researcher, breaking eID, anti-fraud, and browser attestation systems to build better ones" [S-17] | person surface | strong: 104 stars / 19 forks on the BotGuard SoK repo, 12 public gists [S-17] |
| 9 | **GitHub org `Proxyabel`** | clients and peers | "The only real defense is active defense." [S-18] | company surface, 3 repos | weak but clean: the `evilginx.botguard` rename was executed [S-18] [S-25] |
| 10 | **GitHub `M41KL-N41TT`** | nobody, by design | "Tom Kristian Abel (archived)", redirects to `tomkabel` [S-19] | inert archive | **negative**: one public repo left, a Burp Suite loader with 39 stars [S-19] |
| 11 | **ORCID 0009-0009-9881-1293** | academic readers | none: zero works, zero affiliations [S-20] | empty scholarly identity, ranks 7th on the name query anyway [S-25] | paper equity only |
| 12 | **Wikipedia user page** `Kasutaja:KasutajaNimeKavalus` | Estonian readers | his own Estonian disclosure sentence plus CV [S-25] | self-authored, outside his domain | moderate: ranks 4th on the name query [S-25], with a community-norms deletion risk [S-25] |
| 13 | **Wikimedia Commons photo** | general public | none; a photograph of the Fellin Häkk pitch | outside his control [S-32] | moderate: the only public image of him found |
| 14 | **The research corpus itself** (19 pages, signed copies, disclosure timeline, PGP key) | peers and regulators | the claim-vs-actual fault line, per page, with named recipients and dates [S-01] [S-05] | the actual asset | **the strongest equity in the portfolio**, and the least deployed: signed and hash-verifiable on 7 of 19 pages (`../01-audit.md` §1) |

**What the audit shows.** Four surfaces claim to be the parent (person, company, MATx role, kratt
label) and one of them is being deleted. The equity is concentrated in exactly two places: the name
as a search entity, and the research corpus. Everything else is either a legal wrapper, a prototype,
or an inert archive.

---

## 02 — ARCHITECTURE RECOMMENDATION

**Recommended model: Endorsed brand (the skill's Model 3), person as master, with one bounded
exception that behaves like a house of brands.**

In practice:

```
Tom Kristian Abel (person, master brand, tomabel.ee)
├── ProksiAbel OÜ — endorsed entity. Legal wrapper only: contract counterparty,
│   publisher of record, employer of record, mail domain. No positioning of its own.
│   └── Proksimity, Specter, SteroidID — endorsed products, named without a company prefix.
├── GitHub tomkabel — the person's canonical technical surface.
├── GitHub Proxyabel — the endorsed entity's surface (company and product repos only).
├── M41KL-N41TT — inert archive. No new activity, ever.
└── "Cyber-Kratt" — a defined label inside the person brand. Not an entity, not a title.

MATx — outside the family. A separate venture, referenced as employment only.
```

**Why this model.** The decisions already point here and have for a second time: keep the identity,
own the arc, name the entity (G-3, G-4, G-9, read together in `../decisions.md`). An endorsed model
is the only one that lets a person carry the positioning while an entity carries the things only a
legal person can carry: a contract, an invoice, a confidentiality obligation, a publisher field in
structured data. Branded house would force every claim into his own name, including product claims
he cannot yet evidence (G-6 forbids exactly this). House of brands would require marketing spend he
does not have, and it would hide the arc, which the audit measured as the one differentiator no peer
in this field can copy (D6 3/5, `../01-audit.md` §2). MATx is excluded because it is somebody else's
brand with its own customers, and the only fact that belongs on his surfaces is his role there.

**Trade-offs, stated honestly.**

| Choice | What it buys | What it costs |
|---|---|---|
| Endorsed (recommended) | Entity does the legal work; person keeps the positioning; equity flows both ways | The endorser's viability becomes the person's problem. P-1 is that cost, arriving on schedule |
| Branded house (everything under him) | No dependency on an entity that is being deleted; simplest governance | No legitimate counterparty for consulting; product claims land on him personally; contradicts G-4 |
| House of brands (Proksimity independent) | Person insulated from product risk | Needs budget he does not have; hides the arc; and the COI line becomes harder to write honestly |
| Do nothing | No work | Four framings continue to contradict each other on live surfaces, which is the D1 2/5 finding |

**One structural change this recommends, independent of P-1.** Make the **person** the publisher in
structured data and let the organisation be a `worksFor` reference rather than the publisher.
`tomabel.ee` is a personal site that happens to host the research. A publisher field that names a
company asserts that the company publishes it, which is a factual claim about an entity, and it is
the first thing a registry check can contradict (`../01-audit.md` §3, row 7).

---

## 03 — BRAND HIERARCHY MAP

| Relationship | Naming convention | Visual relationship | Messaging relationship |
|---|---|---|---|
| Person → entity (ProksiAbel OÜ) | entity named in full, "ProksiAbel OÜ", in legal and contractual contexts; "ProksiAbel" alone only after first mention and never as a stand-in for him | none: no company logo on the person site; the site's identity is type, colour and the PGP card (`../01-audit.md` §2, D2) | person positioning does not transfer to the entity. The entity carries scope-of-service language only |
| Person → products (Proksimity, Specter, SteroidID) | product name alone, no prefix; "Proksimity (a ProksiAbel product)" used once per document, then "Proksimity" | none on the person site beyond the Systems listing [S-05] | the product inherits nothing from the arc, and the arc inherits nothing from the product |
| Person → GitHub accounts | `tomkabel` is the person surface; `Proxyabel` is the entity surface; `M41KL-N41TT` is labelled archived and redirects [S-17] [S-18] [S-19] | same avatar family across `tomkabel` and `Proxyabel`; the archive keeps its own, frozen | person bio on `tomkabel`; entity stance on `Proxyabel`; nothing on the archive |
| Person → "Cyber-Kratt" | label only, always with the definition available within one click (G-3) | none: no kratt mark as a logo until there is a product or team behind it | the kratt explains the arc's mechanism (capability needs direction), never a credential |
| Person → MATx | "MATx", named as a workplace, never as an affiliation credential | none | factual employment only; no MATx claim appears on tomabel.ee [S-05] |
| Person → the research corpus | bylines "Tom Kristian Abel"; the entity suffix only while P-1 is resolved | the corpus is the identity's visual system already, 4/5 on D2 | this is where the positioning lives; every page is an instance of the fault line |

---

## 04 — NAMING SYSTEM

**Convention for anything new.**

| Kind of thing | Formula | Example |
|---|---|---|
| Research artifact (repo, page, case study) | `[subject] + [artifact type]` | `botguard-token-portability-case-study` [S-18] |
| Product | one coined word, no company prefix, no "Secure"/"Guard"/"Trust" | Proksimity, Specter [S-05] |
| Company-scoped service | `[outcome] + [service noun]` in Estonian first, since the buyer is Estonian | the KüTS roadmap service as sold on proksiabel.ee [S-26] |
| Disclosure record | `[finding] + [recipient] + [date]`, a record not a name | per the disclosure ledger owed in G-5 |
| Talk | `[claim being argued]`, never `[tool] + [verb]` | the 40C3 Track B title as submitted [S-33] |

**Rules.**

1. **No name may contain a live offensive tool's name.** The rename of `evilginx.botguard` to
   `botguard-token-portability-case-study` is the precedent, and it was the right call [S-18] [S-25].
2. **A repository named after a tool is a search result named after the tool.** Whatever the README
   says, the name is what appears in the profile list and in link previews [S-25].
3. **No category clichés**: "Secure", "Zero Trust" as a bare prefix, "Sentinel", "Kratt" as a product
   word until a kratt product exists (that label is doing a different job, per G-3).
4. **Never name a thing after the past.** No tool, product, essay or handle that trades on the 2024
   case. The arc is stated in prose once, not carried in a name.
5. **Tiers live inside the product's own naming, never on the person.** There is no "Tom Pro".
6. **Language variants**: EN is canonical for research, ET for institutional and public-sector
   material, both existing in parallel rather than as translations of each other [S-30].
7. **Entity form**: "ProksiAbel OÜ" in Estonian legal and registry contexts; "ProksiAbel" in English
   running text after first mention. The suffix is never dropped where a legal identity is asserted.

**Decision tree for anything new (product, repo, page, talk).** Ask in order:

1. Can only a company say it (contract, confidentiality, invoice, service scope)? → entity surface,
   under ProksiAbel OÜ, on proksiabel.ee or the `Proxyabel` org.
2. Is it his own research finding, method or argument? → person surface, tomabel.ee or `tomkabel`.
3. Does it serve the same audience as the positioning (research and engineering peers first, per
   G-7)? If no, it does not belong in the brand family at all; MATx and the other `.pages.dev`
   prototypes are the precedent for keeping it out.
4. Does it need its own identity to compete? Only then does a separate product brand exist, and it
   must be able to fund its own discoverability (which is why Proksimity is endorsed, not independent).
5. Would a hostile reader be able to check the name against a register, a receipt or a repo? If not,
   it is a claim with nothing behind it and gate 3 refuses it.

---

## 05 — VISUAL IDENTITY SYSTEM

Brief by design: `brand-identity` sections 01/05/07 own this in phase 7.

- **Person level**: no logo. Identity is type, colour and rhythm, and the audit scored that 4/5 on
  the strength of the CRT-phosphor accent logic and the recorded contrast ratios [S-01] (`../01-audit.md`
  §2, D2). Two open gaps belong to phase 7: the OG image predates the design system, and there is no
  portrait anywhere on the site while the only public photograph sits outside his control [S-32].
- **Entity level**: the entity should look like a plain counterparty, not a second brand. No rival
  palette, no second typeface family. If a mark is needed for invoices and the Estonian service page,
  derive it from the existing tokens rather than commissioning a parallel identity.
- **Product level**: Proksimity may carry its own wordmark, because a product has to be findable on
  its own. It should not carry the person's face or the arc.
- **One rule that is really a governance rule**: no visual asset may imply that tomabel.ee is the
  company's website. The site's own identity is the person's [S-05].

---

## 06 — GOVERNANCE RULES

**Brand decision owner: Tom.** Single owner, no committee. Two gates bind every decision: the legal
gate on the past sentence (G-2, prerequisite P-2) and the verifiability gate (no claim a hostile
reader cannot check).

### Who may write in whose name

| Voice | Allowed on | Not allowed |
|---|---|---|
| **First person ("I")** | research pages, essays, LinkedIn, `tomkabel`, talks, CFP bios. This is the default voice of tomabel.ee | company service copy, product documentation, invoices |
| **Corporate ("ProksiAbel OÜ", "we")** | the confidentiality and client-scope sentence [S-05], service pages on proksiabel.ee, product docs, contracts, invoices, and any future sentence that commits the entity | research pages' findings (those are his), MATx material, the past sentence |
| **Product voice (Proksimity)** | proksimity product surfaces, the Systems listing, the COI line's commercial clause | research findings, the arc, the LinkedIn headline |
| **Employment voice (MATx)** | a factual role statement, matched across About and schema (P-3) | MATx's own claims, MATx customers, MATx as a credibility transfer |

### The dual-role rule for tomabel.ee

`tomabel.ee` is simultaneously the personal site and the research home, and that dual role is the
single most likely source of drift. Four rules:

1. **Everything hosted on tomabel.ee speaks in the person's voice.** The company may be named as a
   third party. It is never the publisher, never "we", never the implied operator of the site.
2. **Company-only claims live on proksiabel.ee.** A service scope, a price, a grant alignment, a
   client confidentiality promise. tomabel.ee may link to them; it may not host them.
3. **A research page belongs to him even when it recommends the product category.** The correction is
   disclosure, not relocation: the COI line, written as a commercial interest (see 07, fallback F-2).
4. **One page owns the past**, and every other surface links to it rather than restating it. Today
   that page is `/my-story/`, which does not narrate the case and names no one [S-06]. G-8's "one
   owner, one place" rule extends this beyond the site: no post, talk or comment re-litigates it.

### The arc, and the wording discipline around it

G-9 makes the past a pillar, which raises the temptation to reach for the shortest possible label. The
decision record closes that door and the architecture must enforce it, because labels are what a brand
architecture propagates: `ex-<arc label>` and `black hat` stay forbidden in owned copy, and the
sanctioned form is a noun-phrase disclosure (convicted in 2024 of X, sentence served, now doing Y),
reused verbatim from the single reviewed sentence. The one sentence has one owner, one place and one
review, with prerequisite P-2 due before the 3 November 40C3 notification window closes (G-1 and P-2,
`../decisions.md`). Until that
review lands, no new case copy anywhere, including no fifth variant.

### Rules for anything new

- [ ] Run the naming decision tree (§04).
- [ ] Name follows the convention; no tool names, no past-derived names.
- [ ] Voice assigned from the table above before drafting, not after.
- [ ] Every claim traceable to `[S-nn]`, a live artefact, or marked `[unverified - needs Tom]`.
- [ ] The past sentence, if it appears at all, is the reviewed one, reused verbatim (G-2).
- [ ] COI line present if the page recommends the product category (non-negotiable, G-5).
- [ ] Entity named only if P-1 is resolved (see 07).

**Review cadence.** Quarterly, aligned with the search and AI-visibility review the previous plan
already scheduled for 2026-12-22 [S-25]. Architecture review is not a separate ceremony: the same
session should ask whether a new entity, product or handle appeared, and whether the entity claim is
still true.

---

## 07 — P-1 FAILURE ANALYSIS: WHAT BREAKS, AND THE FALLBACK

**The failure.** P-1 asked for ProksiAbel OÜ to be confirmed alive, not mid-deletion, before any new
copy asserts it. The registry status still reads "Registrisse kantud", but a deletion notice has been
published in Ametlikud Teadaanded [S-26], re-checked 2026-10-24. A published deletion notice means
deletion is in progress, not hypothetical. G-4 as written cannot be executed safely past the phase-7
book freeze, and the honest reading is that the decision is time-limited rather than wrong.

### Surfaces that assert the entity, and what each becomes if deletion executes

| # | Surface | What it asserts | Status after deletion |
|---|---|---|---|
| 1 | JSON-LD `Organization` node in `index.html`: name, legalName, registry identifier 17017826, street address, telephone [S-05] | that a registered company exists with that code at that address | **false.** A registry code is a checkable fact and this one resolves to a deleted entity |
| 2 | `Person.worksFor` including the Organization node [S-05] | employment by that entity | **false** |
| 3 | `WebSite.publisher` pointing at the Organization node [S-05] | the company publishes tomabel.ee | **false**, and it is the version of the dual-role problem a machine reads |
| 4 | `site.ts` `contactInfo.company` (name plus registration code) [S-05] | the same as 1, in page copy | **false** |
| 5 | About confidentiality sentence, "ProksiAbel OÜ maintains strict client confidentiality" [S-05] | a live entity with client obligations | **false**, and it is the sentence a client-side reader would check |
| 6 | COI lines naming the entity on the anti-fraud and authentication pages, both languages (`../01-audit.md` §1, §2 finding) | that the author runs that company, which builds Proksimity | **half false.** The interest survives; the entity does not. Fixable without losing the disclosure |
| 7 | Article bylines "Tom Kristian Abel, ProksiAbel OÜ. Corrections: research@proksiabel.ee." on several research pages | entity authorship and an entity mailbox | **stale**: the mailbox works while the domain is held, the attribution does not |
| 7b | The 40C3 submission's speaker field names him as founder of ProksiAbel OÜ, and the bio was submitted before P-1 resolved [S-33] | entity founding | **fixed already**: the text is submitted and cannot be revised here. If the talk is accepted, the conference bio should carry F-1 wording |
| 8 | Mailboxes: `research@`, `info@`, `aki@proksiabel.ee` (the registry lists `aki@` as the data protection contact) [S-26], and the PGP key UID `tomkristian.abel@proksiabel.ee` [S-23] | an operating organisation | **stale**: mail and keys keep working if the domain is paid for, while the organisation they name is gone |
| 9 | `proksiabel.ee` and `inscope.proksiabel.ee` (Kompass, the KüTS roadmap service) [S-26]; `proksimity.proksiabel.ee` telemetry endpoint referenced in site code | that a company sells these services | **stale**: the domain can keep serving; the seller cannot |
| 10 | `/my-story/` outbound link to proksiabel.ee [S-06] | a live company page | **stale** |
| 11 | LinkedIn experience entry "Founding Engineer, ProksiAbel OÜ, Jan 2025 to present" [S-15] | employment by that entity | **false** |
| 12 | GitHub `tomkabel` company field "ProksiAbel OÜ" [S-17]; the `Proxyabel` org [S-18] | employer and company account | **false**; the org can remain as a GitHub organisation, its company claim cannot |
| 13 | Any "we/our" sentence in phases 5 to 7 messaging | entity-level activity | **blocked already** by the G-4 binding consequence in `../decisions.md` |
| 14 | The AI layer [S-21] | "founder and principal engineer of ProksiAbel OÜ" | **stale in machines**, and only newer verified material corrects it, which is the phase-8 problem, not a copy edit |

**What does not break.** The research corpus, the disclosure record with named recipients and dates,
the PGP key material itself, the signed article proofs, the 104-star repository, the arc, and the
name. Every one of those is person-scoped already. That is the argument for a person-master
architecture: most of the portfolio never depended on the company in the first place.

### The fallback ladder

Ordered cheapest first. F-0 applies today, whatever else is decided.

- **F-0, hold the line (in force now).** No new copy asserts the entity. No "we" or "our" leaves
  phase 5 or 7. This is already the binding consequence of G-4 and it costs nothing.
- **F-1, person-first structured data.** Person becomes `publisher`; the `Organization` node is
  removed or reduced to a name-only product family with no registry identifier, address or phone.
  Two files: `index.html`, `src/content/site.ts`. This is the single highest-value edit if deletion
  executes, because it is the one a registry check falsifies.
- **F-2, interest-based COI.** Rewrite the COI line to name the commercial interest, not the wrapper:
  the author builds Proksimity, a commercial server-side traffic identity-assurance product. The
  disclosure stays true and the obligation survives the entity. Twelve-plus pages, one string each,
  both languages.
- **F-3, byline and corrections address.** Bylines become "Tom Kristian Abel", with a corrections
  address on a domain the person owns. Keep `research@proksiabel.ee` running while the domain is
  held, but stop presenting it as company contact.
- **F-4, title without entity.** The LinkedIn entry becomes the role he actually holds, described
  without a company that no longer exists. This also removes "Founding Engineer" as a live
  self-description, which the audit counts among the four incompatible framings (D1 2/5) [S-15].
- **F-5, keep the name, replace the wrapper.** `ProksiAbel` can survive as a domain and a product
  label. If he wants an entity to be named as employer and publisher again, that needs a new
  registration, and until it exists the name appears in no legal field. Whether he intends to
  re-register is `[unverified - needs Tom]`.
- **F-6, cancel the deletion.** The only option that keeps G-4 exactly as decided. Whether deletion
  can still be withdrawn while the status reads "Registrisse kantud" is `[unverified - needs Tom and
  a registrar or lawyer]`; do not plan on it, and do not write copy that assumes it.

### Decision timing

1. **Before any phase-5 or phase-7 copy is published**, F-0 applies. No exceptions.
2. **Before the phase-7 book freeze**, choose between F-6 and F-1 through F-5. The book is where the
   entity is written into bios and schema text, so it is the last cheap moment to decide.
3. **Immediately on any registry status change**, check the fourteen surfaces in the table above in
   one pass. A deletion is a date, not a slow decay; the schema is wrong the day it executes, and
   gate 3 exists precisely to keep that from being discovered by a reader.
4. **The 40C3 submission already names him as founder of ProksiAbel OÜ** in its speaker field [S-33],
   with notification due 3 November. That text is submitted and cannot be revised by this document.
   If the talk is accepted, the same P-1 question arrives at the conference bio, and the answer there
   should be F-1 wording.

**What to tell the entities that rely on it.** If the KüTS roadmap service is to be sold under a
company name, it needs a company. If it is to be sold at all, the sale happens on `proksiabel.ee` and
the entity question is answered by then. This is a business decision the architecture can only
constrain, not make.

---

## Sources

`[S-01]` `[S-02]` `[S-05]` `[S-06]` `[S-15]` `[S-17]` `[S-18]` `[S-19]` `[S-20]` `[S-21]` `[S-23]`
`[S-25]` `[S-26]` `[S-28]` `[S-30]` `[S-32]` `[S-33]`

Live surfaces read directly on 2026-10-24, outside the register and cited inline by URL:
`matx.ee`, `proksiabel.ee`, `ariregister.rik.ee` (registry card shell only; the company data fields
are rendered client-side and did not read back, so all registry facts here rest on `[S-26]` plus the
2026-10-24 re-check of the deletion notice).
