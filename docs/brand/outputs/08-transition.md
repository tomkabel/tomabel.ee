# 08 — Transition

Phase 6 output, run against the `rebranding` skill (`.agents/skills/rebranding/SKILL.md`), limited to
sections 01, 02, 05 and 07 as the plan specifies. Author: phase-6 agent, 2026-10-24. Binding inputs:
`../decisions.md`, `.agents/brand-context.md`, `../01-audit.md`, `../00-evidence/source-register.md`.

Sections 03 (scope), 04 (new direction) and 06 (rollout) are deliberately absent: scope and direction
belong to the phase-4 and phase-5 outputs, and rollout is phase 7. This document covers why the change
is needed, what is worth keeping, how to explain it, and what can go wrong.

**Dependency note.** `outputs/01-…` through `outputs/06-…` are not present in this workspace. The
narrative below is therefore written against the phase-3 positioning context and the decision record,
and it is deliberately written so that it does not depend on verbatim phase-4 or phase-5 copy: the
paragraphs say what the change is, not which words the strategy picked. Where a draft sentence is
needed from phase 5, it is marked as such rather than invented.

---

## 01 — REBRAND DIAGNOSIS

### Why this, the honest version

This is not a rebrand because the identity looks dated. The audit scored the visual system 4/5 and the
name is not in question [S-01]. It is also not a rebrand because of 2024. Treating it that way would
repeat the error the previous plan already documented: a public identity that has been curated surface
by surface, repository by repository, without ever deciding what the person is [S-24].

What is actually wrong has three parts.

**First: the brand has four self-descriptions and no owner among them.** The About page says systems
architect and security researcher. LinkedIn's headline names a project, a product label and a former
self-description in one line [S-15]. GitHub `tomkabel` says authentication security researcher [S-17].
Structured data says the same person works for both a company and a separate venture [S-05]. Each
sentence is defensible alone, and together they leave a reader with no single claim to repeat. The
audit scored this 2/5 on positioning (D1) and it is the reason the machine-written summary of him
reads as biography plus buzzwords instead of an idea [S-21] (`../01-audit.md` §3).

**Second: the entity carrying the public role is being deleted.** ProksiAbel OÜ is the publisher in
structured data, the byline suffix on the research pages, the mail domain and the LinkedIn employer of
record, while the registry holds a published deletion notice, 0.01 EUR of capital, an expired VAT
number, two years of zero revenue and a single employee [S-26]. The brand is not resting on a
foundation that needs work; it is resting on one that has a date on it.

**Third: the differentiation exists but is invisible.** The fault line between what a system claims to
verify and what it verifies is the only claim in the corpus that no peer can copy, and it currently
lives in one pull-quote on one page [S-01] (`../01-audit.md` §2, D6 3/5). Meanwhile the machine layer
volunteers "black hat" as a category and derives the entire legal paragraph from a single 2024 article
[S-21]. Perception is biographically accurate and intellectually empty, and the biography is the half
that cannot be won.

### Type of rebrand

**Brand repositioning.** Not a refresh (positioning changes, so a visual update alone would be
cosmetic). Not a full rebrand (the name, the domain and the research corpus stay, and the person is the
brand, so a name change is neither possible nor desirable). Not an extension (no new product line is
being launched under a new identity).

### What is driving it

- [x] The person has outgrown the identity: the work is research-and-disclosure, the surfaces still
      describe an operator and a company principal (D1, D3) [S-05] [S-15]
- [x] Reputation associations that were never resolved: the 2024 frame is still the lead sentence in
      2026 coverage [S-12] and still present in search on the day of the baseline [S-25]
- [x] Competitive pressure: four framings and no stated idea, against peers who each own a domain
      (`09-peers.md`)
- [ ] Target audience shifted; entered a new market; merger or spinout; leadership change
- [x] Timing is externally set: the eID disclosure chain completed in April 2026, the 40C3 notification
      falls due on 3 November (G-1, `../decisions.md`), and the entity has a published deletion notice
      [S-26] [S-33]

---

## 02 — BRAND EQUITY AUDIT

### What has equity

| Asset | Evidence | Why it is worth keeping |
|---|---|---|
| The name as a search entity | tomabel.ee ranks 1st; 5 to 7 of the top 10 are his own assets [S-25] | He already controls the first page. This is unusual and it is the cheapest thing to defend |
| **The research corpus** | 19 published pages, 7 with detached PGP signatures and hash verification, dated correction changelogs, per-page disclosure status [S-01] [S-05] | The single strongest and most under-deployed asset in the portfolio. A regulated buyer can verify it without trusting him |
| The disclosure record | Smart-ID reported to SK ID Solutions in November 2025, then to RIA, TTJA and AKI in April 2026; recipients and dates on the page [S-05] | This is the proof layer that makes the arc worth something rather than merely disclosed |
| The arc, as a reasoned position | "I started on the wrong side of the authentication arms race" is on the About page and the thesis essay [S-05] | No peer in this field has it, and G-9 keeps it as a pillar. It is also the item most likely to be misused, which is why the wording is frozen (G-2) |
| The claim-vs-actual fault line | One pull-quote today; 3/5 on differentiation [S-01] | The only differentiating claim the evidence supports and the only one no competitor can copy |
| "Cyber-Kratt" as a working label | No external referent found: the only definition is his own [S-28] | A usable term of art with no baggage, provided G-3 supplies a definition (see `07-architecture.md` §03). Today it is a leak, not an asset |
| The code proof | 104 stars and 19 forks on the BotGuard SoK repository [S-17] | The one place a technical reader can see the work rather than the story |
| The cryptographic and machine-readable identity | A live PGP key published with WKD, key 0x0C2A0C6F110AABC5 [S-07] [S-23], signed article copies, `llms.txt`, and a Wikipedia user page that already runs the arc disclosure in Estonian and ranks 4th on the name query [S-25] | Verifiability that almost no personal brand in this field has, and most of it is already deployed |

### What is working

- The site's visual system and contrast discipline [S-01] (`../01-audit.md` §2, D2 4/5).
- The two-language build (EN and ET as parallel originals, not translations) [S-30].
- The systems-and-research split, which keeps a reader from confusing shipped code with published
  findings [S-05].
- The COI line itself: the audit's remediation check found the conflict disclosure was fixed by the
  sentence adding Proksimity by name (`../01-audit.md` §1). The mechanism is sound. Only its subject
  is at risk, per `07-architecture.md` §07.

### What is broken

- Four incompatible role framings across live surfaces (D1 2/5) [S-05] [S-15] [S-17] [S-21].
- LinkedIn's headline: a company name, an undefined label (G-3) and a former self-description in the
  same line [S-15].
- The entity as publisher and employer, with a deletion notice published [S-26].
- The About page's last mile: the surviving "disclose responsibly" claim and the uncorroborated MATx
  CTO title sit on the page every essay links to as canonical (`../01-audit.md` §4, item 3).
- ORCID: an identifier that ranks 7th on the name query while carrying zero works and zero
  affiliations [S-20] [S-25]. A verifiable scholarly identity that is verifiably empty.
- One public artifact still frames the archive account: a Burp Suite loader with 39 stars, DMCA-blocked,
  deletable only through GitHub support [S-19].

### What is neutral

The `.pages.dev` product prototypes (Specter, SteroidID, Proksimity), the FastAPI media service and the
retrieval pipeline listed under Systems [S-05]. None of them hurt, none of them carry the positioning,
and all of them are candidates for simplification rather than investment. Decision to make in phase 7,
not here.

### What must be preserved, regardless of everything else

The corpus, the disclosure record, the signatures, the name, the domain, the two-language build, and
the one sentence about the past, whose wording is frozen and whose review is prerequisite P-2 (G-2).

---

## 05 — TRANSITION NARRATIVE

Constraint that shapes all three versions: the past sentence is under legal review (P-2), so these
paragraphs are written to work whether or not that sentence changes. None of them restates the case,
and none introduces new wording about it. Where the past is referenced, it points at the one page that
owns it. The form is fixed by G-9 read against the risk gate: a noun-phrase disclosure, never
`ex-<arc label>` and never `black hat`, because labels propagate through a brand architecture faster
than any paragraph can correct them. Note one live risk this creates: a fourth wording variant is
already sitting in a submitted pretalx speaker field, unconfirmed [S-33]. Do not reuse it until P-2
lands; the candidate and the reviewed sentence must end as the same string.

### For existing readers, collaborators and institutional contacts

*Use case: the About page's framing note, the research index's standing note, and the reply when
someone asks why the descriptions changed. 150 to 200 words. Draft copy, subject to the phase-5 voice
pass.*

> You may notice that the way I describe myself has changed. It has, and the change is convergence
> rather than a new direction. Until now, different surfaces described different jobs: a research
> page, a company I run, a title at another company, a label I used for the offense-to-defense idea.
> Each was true. Together they made it hard to say what I do, and I have stopped asking readers to do
> that work.
>
> One description now leads: I research how authentication and anti-fraud systems fail, and I build
> the kind that survive what I find. Estonia's identity infrastructure is the main subject, because
> it is one of the most digitised in the world and therefore one of the most interesting to attack.
>
> Nothing you rely on moves. The published work stays, with the same signed copies, the same correction
> logs, and the same record of who was told what and when. The disclosures still go to the vendor
> first. The commercial interests are still disclosed on every page where they could matter. If you
> arrived for the findings, the findings are exactly where they were.

### For collaborators and anyone working with the entity

*Use case: the answer to a client, partner, vendor or new collaborator who asks about the company and
about the descriptions. 100 to 150 words. ProksiAbel OÜ has a single employee, its owner [S-26], so
this is not an employee announcement; it is the briefing that would normally go to staff.*

> Two things to know, in plain terms.
>
> First, one description now leads for all of Tom's public work: authentication and anti-fraud
> research and the systems that come out of it. Research pages, talks, the GitHub profile and the
> site all say the same thing now. If you are introducing him, that is the sentence.
>
> Second, the company. ProksiAbel OÜ is in the registry with a deletion notice published [S-26]. Any
> contract, invoice or confidentiality obligation should be checked against that fact before it is
> signed, and none of the public descriptions should assert the company as an employer or a publisher
> while it stands. If a service is sold under the company name, it needs a company. Tom will tell you
> which way that resolves; do not guess it from the website.
>
> When asked about the past: one sentence, on one page, and link it. Do not retell it and do not
> improvise it.

### For press and the public

*Use case: the standing bio one-pager, the boilerplate sent with any interview request, and the About-side
text a journalist is most likely to lift. 200 to 300 words.*

> Tom Kristian Abel is a security researcher who works on how authentication and anti-fraud systems
> actually behave, and on what it takes to build identity infrastructure that holds. He is based in
> Estonia and writes in English and Estonian.
>
> His research covers identity protocols (FIDO2 and WebAuthn, eIDAS, Smart-ID), the client-side
> anti-fraud virtual machines that decide who a visitor is, TLS fingerprinting, and zero-trust
> architecture. The through-line is a distinction he argues for in most of his work: what a system
> claims to verify and what it verifies are rarely the same thing, and most identity failures live in
> that gap rather than in the cryptography.
>
> Where he finds something, it goes to the vendor first and then to the national authorities where
> the finding warrants it. He publishes the recipient and the date on the page, so readers can check
> the sequence rather than take it on trust. His Smart-ID research followed that path, and his pages
> carry dated correction logs and, on the research set, detached signatures over the article text.
>
> He has published teardowns and analyses of browser attestation systems, of Estonia's electronic
> identity infrastructure, and of how cyber fraud developed in Estonia between 2017 and 2026. He
> speaks on the same material at Estonian and international venues. Earlier in his career he worked on
> the other side of the same systems, and he is public about that and accountable for it; the account
> is in one place, in his own words, rather than repeated across his work.
>
> Contact and the full research record: tomabel.ee. Commercial interests are disclosed on the pages
> where they apply.

**A note on the third version.** The past is deliberately compressed into a single clause that points
at the owned account instead of narrating it. That is the G-2 and G-8 posture: reference, never
rewrite, one place. If a journalist leads with 2024 anyway, the correct response is not a new
paragraph. It is the object described in section 07 under "the press tail": a newer, harder fact to
lead with.

---

## 07 — REBRAND RISKS

### Reader and peer confusion

*The risk.* The pinned About bio, the LinkedIn headline and the phase-5 messaging change in the same
window, so a reader who saw the old versions sees three different self-descriptions in a month and
concludes, reasonably, that nothing here is settled.

*Mitigation.* Land the owned surfaces in one pass rather than progressively: `index.html` schema,
`site.ts`, the About page, the `/my-story/` link set, GitHub `tomkabel` and the LinkedIn headline, in
one session. Freeze the old strings nowhere: do not leave a "previously described as" note on any
surface. The transition paragraph above exists for the one page that needs it, and no other.

### Brand equity loss

*The risk.* The two assets that actually hold value are the arc, which is public and load-bearing, and
the "Cyber-Kratt" label, which is undefined [S-28]. Defining the label (G-3) or dropping it from the
headline [S-15] can read as retreat from the position he has already taken in public, and the arc is
the one asset that a cautious edit destroys fastest.

*Mitigation.* Keep the arc as a pillar (G-9) and keep it in the first person, in his own words, on one
page, with the wording frozen and legally reviewed (G-2). Where the kratt label goes, the definition
arrives in the same release, so a reader never meets the word without the explanation. Nothing in this
transition deletes a statement; the About page's philosophy paragraph stays, which is what makes this
an evolution rather than a retraction [S-05].

### Internal misalignment

*The risk.* The entity has one employee, its owner [S-26], so there is no staff to brief and no
internal audience to align. The equivalent failure is self-contradiction: he writes a first-person
research page in the morning and an entity-scoped sentence in the afternoon, and the two land on the
same domain.

*Mitigation.* The voice table and the dual-role rule in `07-architecture.md` §06 exist for exactly
this. The one-line version: tomabel.ee speaks as him, proksiabel.ee speaks as the company, and no page
mixes the two. The four-question check in §06 of the architecture document is the release gate.

### Market timing

*The risk.* Three clocks are running and only one is under his control. The eID disclosure chain
completed in April 2026 and the material is fresh; the 40C3 notification falls due on 3 November
[S-33]; the entity's deletion notice is published [S-26]; and the strongest technical asset, the SoK
manuscript, is under a publication hold that is not his to lift. Repositioning into a publication gap
means the loudest available proof goes quiet at the moment the positioning needs it.

*Mitigation.* Sequence by verifiability, not by preference. The eID and anti-fraud material is already
published and already carries disclosure receipts, so it leads; the held manuscript stays held; the
talk submission, if accepted, becomes the next third-party citation. Do not time the launch to the
manuscript.

### Execution risk

*The risk.* Concrete, measurable gaps: no portrait anywhere while the only public photograph sits on
Wikimedia Commons outside his control [S-32]; an OG image that predates the design system; no accepted
talk on the speaker record yet [S-29]; an ORCID profile that ranks 7th while holding no works [S-20]
[S-25]; and no working measurement channel, since the 2026-10-24 SERP capture produced no trustworthy
reading from this network [S-22]. A repositioning that cannot be measured cannot be declared finished.

*Mitigation.* Treat the portrait, the OG image, the ORCID population with a DOI-backed deposit, and
one working search measurement run as launch-blocking, not nice-to-have. The measurement fix is the
cheapest of the four and the previous plan already publishes a script for it [S-25].

### Uncontrolled arc surfaces

*The risk.* The arc disclosure is no longer only on his own site. The Wikipedia user page he created
already runs it in Estonian, ranks 4th on the name query, and carries a conflict-of-interest
declaration plus education and work history [S-25]. Community norms discourage using a user page as a
personal homepage or for promotion, and a page that reads as a CV can be nominated for deletion. Two
registry directories ranked 5th and 6th in the same baseline publish his date of birth without his
involvement [S-25] [S-31], and the only public photograph of him sits on Wikimedia Commons [S-32]. So
the arc propagates through surfaces he can edit but not fully control, and through surfaces he cannot
touch at all.

*Mitigation.* Keep the Wikipedia user page factual, Wikipedia-focused and about his sources rather
than his brand, and do not grow it into a portfolio. For the directories and the photograph, the
decision in phase 7 is adopt, replace or ignore: adopting means publishing a portrait under his own
control and a consistent public fact set so that no third party is the only source; ignoring means
accepting that the date of birth is public and not treating it as a breach. Either way, no surface
outside his control may be the only place a fact about him lives.

### The press tail: the 2024 coverage that still ranks and still frames him

This is the risk that needs a named plan rather than a mitigation line.

**What is on the record.** A Postimees article from November 2024 whose full text is captured, quoting
the prosecutor and the PPA, and noting at publication that the judgment was not yet final [S-10]. A
paywalled Äripäev piece from the same week whose headline is about his own LinkedIn post rather than
the case [S-11]. A 2026 award story that still identifies him as the person convicted, in the first
sentence, of a 2024 offence [S-12]. A Postimees keyword page listing one article [S-14]. And, from the
2026-09-22 baseline, the two adverse entries in the top ten: the Delfi aggregator page for his name and
the Äripäev article, both borderline, both gone by the second run an hour later [S-25]. The Delfi topic
page now lists exactly one article, the 2026 award story, which reverses the baseline's reading of it
as an adverse aggregator [S-13]. The register itself flags that reversal as unresolved and re-checks
it at phase 8.

**What to do, in order.**

1. **Do not ask anyone to remove accurate reporting.** Requesting delisting of a 2024 conviction that
   was accurately reported would fail on the merits, and, more decisively, it contradicts the pillar
   strategy that every owned surface depends on. Harder to argue, still true: an attempt would itself
   become the story. The legal specifics are `[unverified - needs Tom and a lawyer]`; the brand
   argument does not depend on them.
2. **Out-publish rather than argue.** The adverse items are borderline and volatile, not entrenched
   [S-25]. The intervention that works is newer, better-indexed, harder material on the same names.
   The 2026-09-22 baseline names an external byline as the single highest-leverage item left, and a
   draft for one exists in the investigation workspace (`phase5-external-article.md`) that no register
   row covers. Getting it published is a phase-7 action; this document records it as the first move.
3. **Intervene at the source, not at the artifact.** [S-12] is the template for what future coverage
   will do: an award story that still leads with the conviction. That is not an editorial failure, it
   is an information gap. Every journalist gets the bio one-pager from section 05 plus one newer,
   checkable fact: a talk acceptance, a disclosure receipt, a DOI, an authority acknowledgement. If
   the lead sentence is still 2024 after that, the missing asset is material, not messaging.
4. **Refuse the topic-page fight.** The Delfi aggregator listing one article [S-13] cannot be outranked
   or emptied; it can only be diluted, by producing items the aggregator picks up. Do not build a
   strategy around a page whose contents depend on other people's publishing decisions.
5. **Keep the reference in exactly one owned place.** `/my-story/` links the original interview [S-06].
   Confirm that the anchor text imports none of the article's framing, that no other surface links to
   2024 coverage, and that no page repeats the case in its own words. That is the G-8 rule and it is
   also the cheapest possible defence: the fewer places the case appears in his own writing, the less
   there is for a search engine to attribute to him.
6. **Close the artifact that makes the old frame clickable.** A Burp Suite loader with 39 stars is
   still public on the archive account [S-19]. It is license-bypass material named after a commercial
   tool, it sits beside a redirect to his current profile, and it is the one 2024-era object still
   reachable in two clicks. The previous plan recorded that it cannot be privatised or deleted through
   the API and requires a GitHub support request [S-24]. Do that, or record the refusal and the reason.
7. **Accept the residual, and measure the right thing.** The Postimees article is a national record and
   no brand action removes it. The measurable goal is not its absence; it is whether it sits on page
   one for the name query. The baseline instruction stands: record presence in the top ten across two
   or three runs with IP and locale noted, not an exact rank, and do not read a single run as a trend
   [S-25]. Fix the measurement channel first [S-22].
8. **Do not feed it.** No anniversary posts, no replies in comment threads about the case, no new
   public text about it beyond the frozen sentence on the one page that owns it (G-2, G-8). The single
   highest-risk action in this entire transition is a well-intentioned new paragraph about 2024,
   because it would be new wording, and new wording is what P-2 exists to prevent.

### Entity risk (cross-reference)

The deletion notice for ProksiAbel OÜ is a transition risk in its own right: it changes the meaning of
byline suffixes, schema fields and the LinkedIn employment entry without any copy being touched. The
fourteen surfaces and the fallback ladder are in `07-architecture.md` §07. This document only adds the
sequencing rule: resolve the entity question before the phase-7 book freezes, because the book is where
the entity gets written into bios.

---

## Sources

`[S-01]` `[S-05]` `[S-06]` `[S-07]` `[S-10]` `[S-11]` `[S-12]` `[S-13]` `[S-14]` `[S-15]` `[S-17]`
`[S-19]` `[S-20]` `[S-21]` `[S-22]` `[S-23]` `[S-24]` `[S-25]` `[S-26]` `[S-28]` `[S-29]` `[S-30]`
`[S-31]` `[S-32]` `[S-33]`
