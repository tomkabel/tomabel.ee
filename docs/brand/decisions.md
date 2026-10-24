# Decision record — the ten open questions, decided 2026-10-24

Answers to `00-evidence/gaps.md`, produced with the `tiltrank` rubric (bands, not scores) and
**decided by Tom** on 2026-10-24. This file is the binding record; the machine-readable version with
the sub-scores, stability readings and divergence flags is `.decisions.log` (private repo — see G-10
below).

**Method.** Each gap was framed as an option set with hard constraints separated from preferences,
scored by band on three criteria, and run through `scripts/rubric.py`. The instrument was validated
before use: 27 rubric unit tests and 29/29 protocol fixtures pass. Where the script returned
`ESCALATE — not-separable`, an escalation step that adds *information* was run before asking — a
falsifying tool probe, not a second opinion. Four gaps escalated (G-1, G-5, G-7, G-10); the probes
changed two option sets materially and one of them converted a contested gap into a separated one
(G-2). Every pick is recorded verbatim as the ask rendered it.

**Where this record lives.** The public repo keeps the plan, the audit and this decision record. The
sensitive material — the source register, the coded quote bank with the `do-not-use` list, the press
extracts, the LinkedIn capture and the raw payloads — moves to a private repo, per decision G-10.

---

## The decisions

| Gap | Decision | My recommendation | Diverged | Binding consequence |
|---|---|---|---|---|
| **G-1** Next verifiable asset | Talk-led: see the pending 40C3 decision through (notification 3 Nov) + one disclosure with a public vendor/CERT receipt; hold the SoK manuscript until the provisional-filing decision | same | no | The next third-party frame-changer is the 40C3 outcome. The manuscript stays unpublished until the filing decision resolves. |
| **G-2** Case wording | One reviewed wording: the pending submission's disclosure sentence is the candidate; a lawyer reviews it and the About sentence together before either is reused | same | no | One sentence, one owner, one review. Until the review lands, no new case copy anywhere — including no fifth variant. |
| **G-3** "Cyber-Kratt" | **Keep it public and publish a definition** | demote to a codename | **yes** | A definition page or section is now owed: what it means, why the name, what it is not. It cannot stay an undefined label in a headline. |
| **G-4** ProksiAbel OÜ | **Keep it as publisher and employer in the schema and on About** | assume dormant, person-first claims | **yes** | Hard prerequisite: the company must be verifiably alive, not mid-deletion. Otherwise the schema and About assert something a register check contradicts. |
| **G-5** Disclosure claims | **Build the disclosure ledger and remove the About overclaim** | remove the overclaim only | **yes** | The ledger is aggregation work: the per-page records already exist (dated, named recipients, honest negatives). The About sentence goes regardless. |
| **G-6** Uncorroborated claims | Verify each against an artefact before it appears in any new bio; drop what cannot be evidenced | same | no | Two already resolved by probe: the MATx title is corroborated in MATx's own docs as "Co-Founder & CTO" (About's "Lead Systems Architect and CTO" needs to match), and "65+ browser profiles" is understated at 72. |
| **G-7** Primary audience | Research/engineering community first, Estonian public sector second, hiring third | same | no | Sets the positioning sentence and the messaging hierarchy from phase 4 onward. |
| **G-8** Other handles | Sweep now, before any new copy goes out — backups, archived gists, forums, podcasts — then adopt "one owner, one place" | same | no | The sweep is a gate on phase 5, not a later chore. Sweep material is already sitting in the local backups. |
| **G-9** The past | **Pillar: lead with the arc as the positioning** | context only | **yes** | Reverses the founder-risk-gate default for this brand. The gate becomes a *wording discipline*, not a suppression strategy — see the tension below. |
| **G-10** Where the work lives | **Split: strategy and sensitive evidence private; public-facing outputs stay in `tomabel.ee`, merged by PR** | same | no | Reported below, with one honest caveat about history. |

**Four of ten diverged.** The log keeps that signal deliberately: it is the only way anyone later
learns whether these rankings were any good.

---

## What the four divergences amount to

Read together, G-3, G-4 and G-9 are one coherent posture: **keep the identity, own the arc, name the
entity.** That is consistent with the September 2026 choice of the redemption-arc strategy over
minimising exposure, and it is now on the record a second time — which makes it a settled position
rather than a recurring argument. G-5's divergence (ledger over minimal fix) is the same instinct
applied to evidence: show the record rather than just deleting the claim that overreached.

### The tension the picks create, stated plainly

The risk gate forbids `ex-<label>` and `black hat` in owned copy, and the "keep Ex-Black Hat as a
differentiation label" option was excluded on exactly that ground — the user accepted the exclusion.
A pillar strategy raises the temptation to reach for those labels because they are the shortest path
to the story. They stay forbidden. The sanctioned way to own the arc is a noun-phrase disclosure
(*convicted in 2024 of X, sentence served, now doing Y*) — not an identity label he did not choose.

Likewise, keeping ProksiAbel OÜ as publisher converts a cosmetic choice into a factual claim. If the
company is being deleted, the structured data and the About page become wrong on a schedule. This is
why G-4 now carries a prerequisite rather than a decision.

---

## Prerequisites created by these decisions

| # | Prerequisite | Blocks | Owner | Deadline |
|---|---|---|---|---|
| P-1 | Confirm ProksiAbel OÜ's registry status (dormant / active / deletion in progress) and either stabilise it or revisit G-4 | the schema, About, and every "we/our" sentence in phases 5–7 | Tom | before phase 7 writes the book |
| P-2 | Legal review of the single past-sentence, using the pending submission's wording as the candidate (G-2) | every surface that carries the sentence, incl. the 40C3 bio if accepted | Tom + lawyer | before the 3 Nov 40C3 notification window closes |
| P-3 | Reconcile the MATx title across About and the MATx docs ("Co-Founder & CTO" vs "Lead Systems Architect and CTO") | About, schema, any new bio | Tom | phase 5 |
| P-4 | Author the Cyber-Kratt definition (G-3) | LinkedIn headline, About, any occasion where the label is used publicly | phase 5 copy | phase 5 |
| P-5 | Run the handle/forum/podcast sweep (G-8) | phase 5 voice/story work, which must not contradict an unread statement | phase 3 pre-work | before phase 5 |

---

## G-10 implementation, and one honest caveat

Split performed as chosen:

- **Private repo** (`tomabel-brand`, private) holds `docs/brand/00-evidence/` in full — the source
  register, the coded quote bank with the `do-not-use` list, the press extracts, the LinkedIn capture,
  the raw captures — plus the decision payloads and `.decisions.log`.
- **Public repo** (`tomabel.ee`) keeps the plan, the audit, this decision record and (from phase 4)
  the outputs that are meant to be read: positioning, voice, messaging, bios.

**Caveat that must not be glossed:** the evidence was already committed and pushed to the public
branch earlier today (commit `e68aa48`). Removing it now removes it from the tip, not from the
branch history, and not from GitHub's copies of the PR ref. If the dossier must never have been
public, the branch has to be rewritten and force-pushed — a destructive action I have not taken
without being told to. Say the word and it happens; otherwise the split is forward-looking only.

---

## What the plan inherits

`gaps.md` is now a closed list — every item resolved or converted into a prerequisite above. Phase 3
writes `.agents/brand-context.md` from: the evidence (private), the audit (public), and these ten
decisions. No gap remains that needs a guess, which is the condition phase 3 was waiting for.
