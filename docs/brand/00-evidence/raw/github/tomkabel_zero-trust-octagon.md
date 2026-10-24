# tomkabel/zero-trust-octagon

# Zero-Trust Octagon

> **Zero-trust architecture from first principles — not products, not compliance checklists.**

<img width="1408" height="768" alt="prompt-optimizer-20260527-064953-508" src="https://github.com/user-attachments/assets/10b3da67-59d9-4d89-a08c-36f010febb4e" />



Zero-Trust Octagon is a comprehensive, vendor-neutral reference textbook that defines zero-trust through **eight irreducible axioms** (the Octagon), evaluates architectures through a **nine-dimension morphological matrix**, and provides **actionable implementation pathways** for organizations of every scale.

---

## What's Inside

**The Octagon** — Eight axioms that form the mathematical invariant core of zero-trust. Any architecture failing one is not zero-trust.

1. **No Intrinsic Trust** — Trust is a transient verdict, never a property
2. **Explicit, Verifiable Policy** — Policy must be deterministic, replayable, non-contradictory
3. **Unbypassable Mediation** — No path between subject and object escapes evaluation
4. **Continuous Verification** — Verification is ongoing, not gated at session establishment
5. **Deterministic Bounded Authority** — Every action carries a context-limited, proof-backed credential
6. **Byzantine Fault Tolerance** — Trust is computed as consensus across a set of verifiers
7. **Epistemic Integrity** — Distinguish cryptographically provable fact from policy-derived inference
8. **Bilateral Symmetry** — Protect data flowing in both directions, not just outbound

**The Morphological Matrix** — A 9-dimension configuration space (trust anchors, identity models, enforcement layers, attestation modalities, violation responses, policy distribution, observability trust, organizational posture, human continuity) replacing linear maturity models.

**Four Archetypes with Attack Traces** — Full breach narratives against each archetype (Holy Grail, Fortune 500, Startup, Lean Defense) with cross-trace synthesis.

**Implementation Trees** — 24-month, 12-month, and 6-month roadmaps with gate checks, cost estimates, and failure pivots.

---

## Quick Start

```bash
# Install dependencies
npm install

# Run the docs locally
npm run docs:dev

# Build for production
npm run docs:build
```

Browse at `http://localhost:5173` after running the dev server.

---

## Who This Is For

- Security architects designing zero-trust deployments
- SREs responsible for making security models survive production
- Security engineers evaluating detection stacks against first principles
- Technical leaders who need to understand why vendor suites still get breached

**Prerequisites:** Working knowledge of cloud-native infrastructure (containers, orchestration, service mesh) and basic cryptographic primitives (TLS, JWT, PKI).

---

## Structure

| Part | Content |
|---|---|
| **Part I — Foundations** | The Octagon axioms, their refinement history, and use as a validation instrument |
| **Part II — Architecture** | The morphological matrix, dimension covariance, and meta-patterns |
| **Part III — Reality** | Four archetypal breach scenarios with full attack traces |
| **Part IV — Action** | Implementation decision trees with cost estimates and failure pivots |
| **Appendices** | Quantum/AI threat stress-test, validation checklist, glossary, quick reference |

---

## Built With

- [VitePress](https://vitepress.dev/) — Static site generator
- Node.js — Runtime

---

## License

Copyright © 2026 Tom Kristian Abel.

This repository is dual-licensed by content type:

- **Text and figures** (`docs/`, `research/` and all other prose): [Creative Commons Attribution-ShareAlike 4.0 International](LICENSE) (CC BY-SA 4.0). You may share and adapt it, including commercially, with attribution; adaptations must be released under the same license.
- **Code and configuration** (`src/`, build and test configuration, `docker-compose.yml`, `fluent-bit.conf`): [Mozilla Public License 2.0](LICENSES/MPL-2.0.txt) (MPL-2.0). You can use the reference implementations in any project; changes to these files must stay under MPL-2.0.

Copies obtained under the earlier CC BY 4.0 notice keep those terms.
