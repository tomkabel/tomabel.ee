# 09 — Peers

Phase 6 output, run against the `competitor-branding` skill (`.agents/skills/competitor-branding/SKILL.md`).
Author: phase-6 agent, 2026-10-24. Inputs: the phase-1 register and phase-2 audit for the baseline
(`../00-evidence/source-register.md`, `../01-audit.md`), plus live reading of peer surfaces on
2026-10-24, listed with URLs and verification level at the end.

**Two rules govern this file.** First, every claim about another person is either backed by something
that was read, with the level recorded, or marked `[unverified]`. Second, peer facts live outside the
`[S-nn]` register, which documents Tom's own record and nothing else; the peer sources table is the
equivalent artefact for this document. Nothing in the register was treated as a peer fact, and nothing
here was taken from memory.

**What this document is not.** It is not a threat assessment and none of these people is an adversary.
Six of the ten are potential allies, two are the prior art Tom himself cites, and one is the person
whose lane he should stay out of.

---

## 01 — COMPETITIVE LANDSCAPE OVERVIEW

Authentication and anti-fraud research, seen as personal brands rather than as employers, has three
recognisable shapes.

The **institutional researcher** (Bursztein at Google, Syynimaa through his own lab and toolkit) has
the deepest access and the weakest personal position: their authority is borrowed from the platform
and travels with the job title. The **practitioner with a site** (Vastel, Mollema, Curry) has the
strongest personal position, because their name is the container: a role line, a posts list, a talks
page, and a body of work that a reader can walk. The **policy or media voice** (Moussouris, Hunt,
Böck) has the widest reach and the least technical specificity; each of them owns a *practice* rather
than a *system*.

The category's shared assumption is that the work sells itself and the person is a byline. Almost
nobody states an idea. The default self-description is a role plus a domain plus a credential, in some
order, and the default proof is a paper, a talk or a CVE number. That uniformity is the opening: the
audit measured differentiation at 3/5 (D6, `../01-audit.md` §2) and its own diagnosis is that the
material supports one claim that peers cannot make, which is not about a domain but about a gap.

The second shared assumption is that disclosure *happened* rather than being *recorded*. Nobody in
this set publishes a ledger of who was told what and when, on the page where the finding lives.
Several publish a policy for how it should work. That difference is a positioning asset sitting
unclaimed in the middle of the field.

---

## 02 — PEER PROFILES

### Katie Moussouris
*Luta Security, lutasecurity.com* · verification: founder page `read` 2026-10-24

**What she does.** Runs a consultancy that builds vulnerability disclosure and bug bounty programmes,
mostly for large organisations and governments.

**What she owns.** Disclosure as a *profession*: the vocabulary, the programme design, the policy
argument. The founder page presents her as "a computer hacker with more than 25 years of professional
cybersecurity experience" with a perspective on "security research, vulnerability disclosure, bug
bounties, and incident response", and credits her with launching Hack the Pentagon, the first bug
bounty programme of the US government, before founding Luta Security in 2016.

**Audience.** Enterprises, governments, policy audiences. **Voice.** First-person, institutional,
decisive. **Personality.** Practitioner-credentialled, policy-fluent, guarded.

**What Tom cannot copy.** The scale of the institutional record. Hack the Pentagon is not replicable
by publishing well.

**The gap she leaves.** Her disclosure work is about how disclosure *should* work. Nobody at her level
publishes how it *did* work, finding by finding, with the recipient and the date on the same page as
the finding.

---

### Troy Hunt
*troyhunt.com* · verification: about page `read` 2026-10-24

**What he does.** Writes, speaks, and runs Have I Been Pwned.

**What he owns.** Breach intelligence as a public service. The about page states he founded Have I
Been Pwned, "which somehow became the most trusted name in data breach intelligence", and that he is a
Microsoft Regional Director, described explicitly as a title of recognition rather than employment.

**Audience.** Everyone: consumers, journalists, security teams. **Voice.** Long-form, plain, first
person, self-deprecating. **Personality.** Approachable authority.

**What Tom cannot copy.** A free public utility with a decade of inbound press. That is the engine, not
the writing.

**The gap he leaves.** Credential exposure, not authentication mechanics. His subject is what leaks,
not what the protocol claims to verify, and his position depends on a service that Tom does not have.

---

### Hanno Böck
*hboeck.de* · verification: site front page `read` 2026-10-24

**What he does.** Freelance journalist and security researcher; publishes in Golem and runs a
decarbonisation newsletter.

**What he owns.** Independent verification of security claims with public tooling, delivered through
established outlets. His own site says: "I am a freelance journalist. I focus on climate and energy
topics, as well as IT security." The front page's latest items on 2026-10-24 lead with a Golem piece
on compromised web certificates putting TLS connections at risk.

**Audience.** Technical German-language and European readership. **Voice.** Reported, third person,
evidence-first. **Personality.** Sceptical, tool-driven, unglamorous.

**What Tom cannot copy.** Outlet bylines. Böck's reach is the outlet's reach.

**The gap he leaves.** His authority is borrowed from where he publishes, and his portfolio is split
across two subjects. He verifies other people's claims; he does not own a system, and he is not an
operator of one.

---

### Antoine Vastel
*antoinevastel.com* · verification: site front page `read` 2026-10-24

**What he does.** Anti-bot and fraud research, after a PhD and an industry research leadership role.

**What he owns.** The device-fingerprinting and bot-detection lane, as a named practitioner. His site
label is exactly "Anti-bot and fraud researcher", the self-description is "I hunt bad bots for a
living", and the front page records about ten years in device fingerprinting and bot detection, a PhD
on browser fingerprinting and its privacy impact, and five years at DataDome as VP of Research.

**Audience.** Anti-fraud and platform engineers. **Voice.** Plain, practical, lightly first person.
**Personality.** Hands-on, tool-led, non-dramatic.

**What Tom cannot copy.** Ten years in one lane. Depth of that kind is not declarable.

**The gap he leaves.** Detection layers, not attestation internals, and not national identity. He does
not work on the browser VM that decides who a client is, and he does not work on eID approval steps.

---

### Elie Bursztein
*elie.net* · verification: project page `read` 2026-10-24; role claims from a search result and a
Google Research profile snippet, see the sources table

**What he does.** Leads anti-abuse research, now with an AI-security focus.

**What he owns.** Platform-scale anti-abuse research: what a hyperscaler learns about abuse because it
is the platform. His own site's selected projects include protecting Google accounts (2013) and
redesigning Google's CAPTCHA, with the stated outcome of a 6.7% improvement in human pass rate (2014).

**Audience.** The research community and the platform's customers. **Voice.** Publication-first, third
person. **Personality.** Academic, institutional, mission-framed.

**What Tom cannot copy.** The vantage point. His findings come from being inside.

**The gap he leaves.** His work is read as Google's, and the specific object Tom has already taken
apart, the BotGuard VM, is one that Bursztein's role makes it structurally hard for him to write about
from the outside. The independent teardown of the same object is a position an insider cannot hold.

---

### Nestori Syynimaa
*aadinternals.com* · verification: blog front page `read` 2026-10-24

**What he does.** Cloud identity attack research; maintains the AADInternals toolkit; trains and
speaks.

**What he owns.** Azure AD and Entra ID attack research, with the toolkit doing much of the naming. The
blog records the module and its split into AADInternals-Endpoints after AV and MDE products began
blocking installation, and links a TROOPERS talk on dumping NT hashes from Azure AD.

**Audience.** Red teams, cloud identity engineers, conference audiences. **Voice.** Technical,
instructional, first person singular. **Personality.** Tinkerer, ex-insider, toolmaker.

**What Tom cannot copy.** A decade-long tool with a user base. In his lane, the tool is the brand.

**The gap he leaves.** The tool answers "who is this" so completely that the person's own position is
hard to state. If the toolkit stops, the brand is a repository. And he owns one vendor's identity
plane, not the concept of identity verification.

---

### Dirk-jan Mollema
*outsidersecurity.nl* and *dirkjanm.io* · verification: both site front pages `read` 2026-10-24

**What he does.** Offensive security research and consulting on Active Directory and Entra ID; trains
on Entra ID attacks.

**What he owns.** The "outsider perspective" framing for enterprise identity, combining consultancy,
published tooling and a research blog. His consultancy page states the person behind the company is
Dirk-jan Mollema, and that the focus is Active Directory and Azure AD security. His blog's recent work
includes a post on borrowing Windows Hello keys for authentication and persistence, written from the
position of "an Entra ID researcher".

**Audience.** Enterprise identity and security teams. **Voice.** Analytical, first person, generous
with detail. **Personality.** Deep, calm, methodical.

**What Tom cannot copy.** An established enterprise client base and a training pipeline.

**The gap he leaves.** None, in his lane. He owns the Entra ID lane as completely as anyone does, and
the correct reading for Tom is that this is the one identity territory not to enter. The opening is
where Mollema does not go: national eID approval layers, and anti-fraud client-side attestation.

---

### Arnis Paršovs
*University of Tartu* · verification: named and characterised inside Tom's own Smart-ID page `[S-01]`
`read`; a Tartu dissertation on the security of the Estonian electronic identity card appeared in
search results (`snippet`, see the sources table)

**What he does.** Academic security research on Estonian electronic identity, with a public voice in
Estonian media.

**What he owns.** Estonian eID card security. Tom's own Smart-ID page names him as "a cybersecurity
researcher at the University of Tartu" and cites his ERR opinion piece of January 2026 comparing the
retired password cards against Smart-ID on scammer friction.

**Audience.** Estonian public and technical readers; academic community. **Voice.** Academic, then
journalistic in Estonian. **Personality.** Precise, publicly engaged.

**What Tom cannot copy.** A university position and the dissertation record behind it.

**The gap he leaves.** The card and the protocol layer, plus commentary. The operator layer, meaning
approval, session continuity and the cross-device relay, is not his subject, and it is where Tom's
published Smart-ID and anti-fraud work already sits. This is a prior-art relationship, so the correct
posture is credit, which the disclosure review already flags as a site-wide issue (`[S-02]`, and
`../01-audit.md` §1).

---

### Birgy Lorenz
*TalTech* · verification: TalTech contact page and Google Scholar profile `snippet` 2026-10-24

**What Lorenz owns.** Estonian cybersecurity education and the human side of the field, with
institutional access to the public conversation. The TalTech contact page lists a senior researcher
post in the IT College and the Vice-Dean of Bachelor's Studies role, and the Google Scholar profile is
indexed under AI in education, cybersecurity, informatics education, curriculum development and CTF,
with 418 citations.

**Audience.** Estonian educators, policy, and the next generation of practitioners. **Voice.**
Academic and Estonian-first. **Personality.** Institution-building, generous with students.

**What Tom cannot copy.** A teaching position and a curriculum mandate.

**The gap left behind.** The human-factors and education half of the Estonian conversation is occupied.
Nobody with a public voice owns the technical-operator half: how the systems actually fail, in
Estonian, for the institutions that run them. That is the empty chair, and it matches G-7's second
audience.

---

### Sam Curry
*samcurry.net* · verification: site and about page `read` 2026-10-24

**What he does.** Vulnerability research, published as narrative writeups, often with named
collaborators.

**What he owns.** Reproducible public writeups at scale as a personal brand. The blog's front page on
2026-10-24 leads with a June 2025 finding, published October 2025, in the back office of an online
poker site, co-credited to a named second researcher.

**Audience.** Security practitioners and a large technical general audience. **Voice.** Story-first,
plain, first person plural. **Personality.** Curious, conversational, prolific.

**What Tom cannot copy.** Volume and a networked co-authoring practice.

**The gap he leaves.** His writeups are about what he got into, not about what the system claimed to
be. There is no idea-level claim, no disclosure-policy position, and no national infrastructure in the
portfolio, so a reader cannot repeat a Curry thesis.

---

### Arc comparators (a different question: who owns the ex-offender position)

These are not peers in research. They are the people who own the territory that G-9 puts Tom next to,
and they are worth naming precisely because Tom's version differs.

- **Kevin Mitnick (1963 to 2023)** `[verified: Wikipedia, read 2026-10-24]`: arrested in 1995, served
  five years after conviction for fraud and illegally intercepting communications, then a security
  consultant and author, with the media coverage of his pursuit and trial itself described as
  controversial. He owns the archetype: the famous hacker who became the trusted advisor. The lane
  monetises through books, speaking and consulting, and its proof is the story.
- **Hector Monsegur** `[verified: Wikipedia, read 2026-10-24]`: co-founder of LulzSec and an FBI
  informant for more than ten months while facing a 124-year sentence. He owns the cooperator
  narrative, mostly in media and documentary form. No research output, and the informant element makes
  him a poor comparator for a research-first brand.
- **Brett Johnson**, the ex-fraudster-turned-fraud-prevention speaker `[unverified]`: could not be
  confirmed by reading a source in this pass. Do not use him as a comparator until someone reads his
  own material.

**What the three have in common, and what Tom's version changes.** All three are known *for* the past
and paid for telling it. Their proof is the story. Tom's proof is a hash-verifiable article, a
disclosure receipt with a date, and a working teardown, on a page that also states the past in one
sentence. That is a different product in the same aisle, and it is the reason the risk gate forbids
`ex-<label>` while G-9 still makes the arc a pillar. The arc is the credential; it must not be the
offering.

---

## 03 — COMPETITIVE BRAND MAP

**Axis 1: Institutional or platform-scale ←→ Independent practitioner.**
**Axis 2: The artifact or tool carries the name ←→ The person's idea carries the name.**

| Position | Who |
|---|---|
| Institutional, artifact-carried | Bursztein (Google's anti-abuse research) |
| Institutional, person-carried | Lorenz (TalTech, education mandate) |
| Independent, artifact-carried | Syynimaa (AADInternals), Mollema (tooling plus consultancy) |
| Independent, practice-carried | Moussouris (disclosure practice), Böck (outlet-delivered verification) |
| Independent, service-carried | Hunt (Have I Been Pwned) |
| Independent, person-carried | Vastel (the anti-bot lane as a person), Curry (the writeup habit as a person) |
| Academic, system-carried | Paršovs (Estonian eID card) |

**The open quadrant.** Independent practitioner, person carried, with a stated idea, working on
national identity and fraud infrastructure. It is empty. Vastel and Curry are the nearest occupants
and neither states an idea; Paršovs is in the right subject at the wrong layer and carries a
university, not a position; Bursztein is in the right subject on the wrong side of the fence.

**The second open space is not a quadrant but a habit.** Publishing the disclosure receipt on the page
where the finding lives. Moussouris owns the policy for it, Böck performs verification without
recording a receipt, and nobody publishes recipient and date as a first-class artefact. G-5's ledger
would make Tom the only person in this set doing it, and it costs aggregation work rather than new
research.

---

## 04 — MESSAGING ANALYSIS

**What everyone in this category says (table stakes, no longer differentiating).**

1. A role line: "researcher", "consultant", "engineer", plus a domain list.
2. Proof by credential: PhD, employer, CVE or talk count, toolkit downloads.
3. Defensive framing of offensive skill: "I use offense to inform defence". Every profile in this set
   that has a past has this sentence in some form.
4. A call to action that is either a book-a-call link or a blog subscription.

**Clichés to avoid, specifically, in this category.**

- `ex-black-hat`, `reformed hacker`, `former criminal turned defender`. The risk gate already forbids
  the first two in owned copy; the third is the same move in a longer coat.
- "Trusted by", "world-class", "thought leader", "battle-tested", "helping organisations stay ahead of
  threats".
- "AI-powered" as a trust adjective. In this set it is already a signal of vendor material.
- "The first Estonian to..." National-first framing invites the reply that a bigger country already
  did it, and Tom's actual differentiator is the digitisation of the system, not his passport.
- Restating the disclosure policy. Everyone has one; describing yours is filler.

**What nobody in this set is saying.**

1. **What a system claims to verify versus what it verifies.** Tom's own definition of the fault line.
   It appears nowhere in the peer set, and it is the only claim here that is not a domain or a
   credential.
2. **Who was told what, and when.** The receipt. Policy is public; practice is not.
3. **A named, specific national system and its actual weak step.** Peers say "identity systems". Tom
   can say Estonia's approval step, with the protocol detail to back it, and he already has.
4. **An honest negative.** Disclosures that were refused, unreproduced or unresolved. The register
   keeps one (the unreproduced 2021 note on BotGuard token binding). Publishing negatives is
   anti-marketing, which is exactly why it reads as credible.
5. **Estonian-language operator content for institutions.** Lorenz writes for educators, Paršovs for
   the general reader. Nobody writes the technical operator brief in Estonian.

---

## 05 — VISUAL IDENTITY PATTERNS

Inferred from page structure on 2026-10-24, not from a design audit. Treat every line here as an
observation about convention, not as a measurement.

- **The standard personal research site** (Vastel, Curry, Mollema, Syynimaa): a headshot, a one-line
  role, a chronological posts list, a talks or projects page. Text-first, high contrast, no decorative
  system. This is the category default and it is deliberately plain.
- **The authority blog** (Hunt, Böck): no role decoration at all. The blog roll is the brand.
- **The consultancy front door** (Moussouris, Mollema, Syynimaa's training pages): logo, service
  framing, client language, closer to a vendor site than a research site.
- **What is missing across the set:** nobody puts a verifiability artefact into the identity itself.
  No peer's home page leads with a signed copy, a key fingerprint or a disclosure ledger. Tom's site
  already carries a PGP card and a machine-readable layer [S-07] and the audit scored the visual
  system 4/5 (`../01-audit.md` §2, D2). The opportunity is not a new palette; it is promoting the proof
  layer from a resource to a visual object. That decision belongs to `brand-identity` §01/§05/§07 in
  phase 7.
- **One thing to check before copying anything:** several of these sites have no portrait at all, and
  Tom's problem is the opposite, no portrait on the site while a third-party photo circulates [S-32].
  Copy the convention, not the gap.

---

## 06 — DIFFERENTIATION OPPORTUNITIES

**Opportunity 1: own the fault line as a stated idea.**
Why it is available: every peer self-describes by domain or credential, and the audit's own finding is
that the idea exists only in one pull-quote on one page [`../01-audit.md` §2, D6].
How to take it: state it in the hero, in the section headings, and in the first sentence of the bio,
and let the research pages become instances of it rather than a list.

**Opportunity 2: the disclosure receipt as a published artefact.**
Why it is available: Moussouris owns the policy, nobody publishes the practice; the per-page records
already exist [`../01-audit.md` §1].
How to take it: build the G-5 ledger, one row per finding, with recipient, date, outcome and honest
negatives, and link it from every research page that has a row.

**Opportunity 3: the independent position on the objects insiders cannot write about.**
Why it is available: Bursztein's platform role and Vastel's vendor career both make the adversarial
teardown of client-side anti-fraud hard to publish; Tom has already published one [S-17].
How to take it: keep the teardown series going, and keep the vendor-first disclosure habit attached to
it, so the independence reads as discipline rather than as aggression.

**Opportunity 4: the Estonian operator layer, in Estonian, for institutions.**
Why it is available: Paršovs holds the academic card-and-protocol layer, Lorenz the education layer,
and no one holds the operator layer; G-7 puts the public sector second.
How to take it: a small set of institutional briefs in Estonian on the specific failures, using the
same material as the English research, not translations of the essays.

**Opportunity 5: an arc whose proof is an artefact.**
Why it is available: the three arc comparators are known *for* the past and sell the story; the
category has no version where the past is a one-sentence disclosure and the work is the proof.
How to take it: keep the noun-phrase disclosure on the single page that owns it, and never let it
become the headline claim.

**Opportunity 6: the honest negative.**
Why it is available: nobody publishes unresolved or refused findings; the register holds at least one.
How to take it: a short, dated note on each research page that has one, in the same place as the
disclosure receipt. It is the cheapest credibility in the whole category.

---

## 07 — STRATEGIC IMPLICATIONS

**Positioning.** Independent practitioner, person carried, with one stated idea, aimed first at the
research and engineering community and second at Estonian institutions (G-7). Do not compete for the
enterprise Entra ID lane against Mollema or the anti-bot detection lane against Vastel. Both are
occupied by people with more time in them.

**Messaging direction.** Lead with the fault line, support it with the receipt, and let the arc sit in
one sentence on one page. The peer set's weakness is that everything except the domain is a credential,
and credentials cannot be repeated by a reader. An idea can.

**Visual direction.** Keep the existing type-and-colour system (D2 4/5). Promote the proof layer: the
signed copies, the key, the ledger, and eventually a portrait under his own control, so that no third
party is the only source for a fact or an image about him. Do not commission a logo for the person.

**What to avoid.** The `ex-<label>` constructions, which are the fastest way to look like the arc
comparators rather than like a researcher. Publishing anything in the Entra ID lane. Chasing Curry's
writeup volume. Chasing Hunt's service-shaped authority without a service. Using "AI-powered" or
"trusted by" anywhere.

**People to treat as allies, not rivals.** Paršovs (prior art, credit owed [S-02]), Lorenz (the
education half of the Estonian conversation, natural co-signer for institutional work), and any of the
practitioners whose blogs would carry a good guest piece. The external byline the search baseline
calls the highest-leverage remaining item [S-25] is more likely to arrive through this set than
through a cold pitch.

**Review cadence.** Re-read this set quarterly with the search review, on the same 2026-12-22 cycle
[S-25]. Two questions each time: has anyone occupied the fault-line idea, and has anyone started
publishing receipts?

---

## Peer sources

Read on 2026-10-24 in this workspace. Verification levels follow the register's convention.

| Peer | Source read | Level |
|---|---|---|
| Katie Moussouris | `https://www.lutasecurity.com/founder-ceo` | `read` |
| Troy Hunt | `https://www.troyhunt.com/about/` | `read` |
| Hanno Böck | `https://hboeck.de/en/` | `read` |
| Antoine Vastel | `https://antoinevastel.com/` | `read` |
| Elie Bursztein | `https://elie.net/about` | `read` (projects); role line from `https://research.google/people/eliebursztein/` and a search-result snippet, both `snippet` |
| Nestori Syynimaa | `https://aadinternals.com/` | `read` |
| Dirk-jan Mollema | `https://outsidersecurity.nl/`, `https://dirkjanm.io/` | `read` |
| Arnis Paršovs | Tom's own Smart-ID page describing him and citing his ERR piece `[S-01]`; dissertation reference from a search-result listing | `read` for the characterisation; `snippet` for the dissertation; `https://www.parsovs.eu/` did not load |
| Birgy Lorenz | `https://taltech.ee/en/contacts/birgy-lorenz`, Google Scholar profile | `snippet` |
| Sam Curry | `https://samcurry.net/`, `https://samcurry.net/about` | `read` |
| Kevin Mitnick | `https://en.wikipedia.org/wiki/Kevin_Mitnick` | `read` |
| Hector Monsegur | `https://en.wikipedia.org/wiki/Hector_Monsegur` | `read` |
| Brett Johnson | none found in this pass | `[unverified]` |

`[unverified - needs Tom]` items in this document: whether any of these people is already a
correspondent, collaborator or prior contact of Tom's; and whether the Paršovs prior-art credit has
been acknowledged in writing on the Smart-ID page or only in the reference list.

## Sources

`[S-01]` `[S-02]` `[S-07]` `[S-17]` `[S-25]` `[S-32]`
