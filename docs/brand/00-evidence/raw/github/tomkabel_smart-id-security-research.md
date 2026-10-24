# tomkabel/smart-id-security-research

<div align="center">

<img src="docs/public/logo.svg" alt="" width="96" height="96">

# Smart-ID Security Research

Independent security research on Smart-ID authentication and cross-device eID vulnerabilities.

[![Deploy](https://img.shields.io/github/actions/workflow/status/tomkabel/smart-id-security-research/deploy.yml?branch=master&label=deploy&logo=githubactions&logoColor=white)](https://github.com/tomkabel/smart-id-security-research/actions/workflows/deploy.yml)
[![Docs](https://img.shields.io/badge/docs-live-2d5be0?logo=vitepress&logoColor=white)](https://tomkabel.github.io/smart-id-security-research/)
[![License: CC BY 4.0](https://img.shields.io/badge/license-CC%20BY%204.0-lightgrey)](LICENSE)
[![Last commit](https://img.shields.io/github/last-commit/tomkabel/smart-id-security-research/master)](https://github.com/tomkabel/smart-id-security-research/commits/master)

**[Read the research →](https://tomkabel.github.io/smart-id-security-research/)**

</div>

> [!IMPORTANT]
> This repository documents vulnerabilities that were reported to SK ID Solutions before publication. See the [responsible disclosure timeline](docs/05-enforcement/responsible-disclosure-timeline.md). The material is for education and defensive research; it is not legal advice.

## What this covers

The research uses Smart-ID as a case study for a broader question: how well do cross-device authentication flows bind the browser session to the phone that approves it?

- Cryptographic origin binding in cross-device flows
- QR-based authentication and QRLJacking attack vectors
- Man-in-the-middle exposure in out-of-band authentication
- FIDO2/WebAuthn as a standards-based comparison point
- eIDAS and GDPR obligations for trust service providers
- Migration paths from proprietary to standards-based authentication

## Disclosure status

| Date | Event |
| --- | --- |
| 2025-11 | Disclosure to SK ID Solutions through official channels |
| 2025-12-05 | SK ID Solutions replies in writing |
| 2025-12 | SK ID Solutions marks the CVE entry as DISPUTED |

Full timeline, evidence and quotes: [`docs/05-enforcement/responsible-disclosure-timeline.md`](docs/05-enforcement/responsible-disclosure-timeline.md).

## Start here

| If you want… | Read |
| --- | --- |
| The core argument | [Smart-ID Security Analysis](docs/01-core-research/smartid-security-analysis.md) |
| The attack mechanics | [QRLJacking Analysis](docs/02-technical-security/qrljacking-analysis.md) · [Vulnerability Analysis](docs/02-technical-security/vulnerability-analysis.md) |
| The standards comparison | [FIDO2 Pivot Analysis](docs/06-supplementary-research/fido2-pivot-analysis.md) |
| The legal context | [Laws, Acts, and Regulations](docs/03-regulatory-framework/laws-acts-regulations.md) |
| What was sent to regulators | [RIA](docs/04-regulatory-memoranda/ria-memorandum.md) · [TTJA](docs/04-regulatory-memoranda/ttja-memorandum.md) · [AKI](docs/04-regulatory-memoranda/aki-memorandum.md) memoranda |
| Liability and enforcement | [Enforcement Strategy](docs/05-enforcement/enforcement-strategy.md) · [Liability Re-Evaluation](docs/05-enforcement/liability-re-evaluation.md) |

The [documentation site](https://tomkabel.github.io/smart-id-security-research/) has full-text search, a sidebar and dark mode.

## Key findings

The research examines how cross-device flows handle three bindings:

1. **Origin binding** – tying the credential to the relying party's origin
2. **Channel binding** – tying the authentication to the underlying TLS session
3. **User intent** – verifying presence and intent beyond a passive confirmation

Against established standards:

- **FIDO2/WebAuthn** provides origin binding at the protocol level [[1]](#references)
- **NIST SP 800-63-4** defines phishing-resistance requirements for AAL3 [[2]](#references)
- **eIDAS Article 24** requires trust service providers to use trustworthy systems [[3]](#references)

## Recommendations

**Service providers** should implement cryptographic origin binding for high-assurance authentication, evaluate FIDO2/WebAuthn as a standards-based alternative and run regular assessments aligned with NIST guidance.

**Policymakers** should clarify liability for authorised push payment fraud, set minimum security requirements beyond visual verification and align national rules with EU eIDAS implementation guidance.

## Methodology

Comparative standards analysis, architecture review against established frameworks, and offensive testing in controlled environments.

## Repository layout

```text
.
├── docs/                           # VitePress site source (all research lives here)
│   ├── .vitepress/config.ts        # Site configuration
│   ├── 01-core-research/
│   ├── 02-technical-security/
│   ├── 03-regulatory-framework/
│   ├── 04-regulatory-memoranda/    # Submissions to RIA, TTJA, AKI
│   ├── 05-enforcement/             # Incl. responsible disclosure timeline
│   ├── 06-supplementary-research/
│   ├── 07-opinion-editorials/
│   └── public/                     # Logo and favicons
├── 06-archived/                    # Notes from the pre-reorganisation layout
├── .github/workflows/deploy.yml    # Build on PRs, deploy to Pages on master
├── CITATION.cff                    # "Cite this repository" metadata
├── LICENSE                         # CC BY 4.0 (research content)
├── LICENSES/MIT.txt                # MIT license for the docs site build system and config
└── package.json                    # VitePress toolchain
```

## Run the site locally

Requires Node.js 22 or newer (CI uses the version in [`.nvmrc`](.nvmrc)).

```bash
npm ci
npm run docs:dev       # http://localhost:5173/smart-id-security-research/
npm run docs:build     # output in docs/.vitepress/dist
npm run docs:preview
```

Every pull request runs the production build, including VitePress's dead-link check. Pushes to `master` deploy to GitHub Pages.

## Cite this work

GitHub's **Cite this repository** button reads [`CITATION.cff`](CITATION.cff) and exports APA or BibTeX.

## References

<a id="references"></a>

1. FIDO Alliance. *FIDO2: WebAuthn and CTAP*. <https://fidoalliance.org/fido2/>
2. NIST. *SP 800-63-4: Digital Identity Guidelines*.
3. Regulation (EU) No 910/2014 (eIDAS).
4. Regulation (EU) 2016/679 (GDPR).
5. ENISA. *Cybersecurity Guidelines for Trust Services*.

## License

- **Research content** – [Creative Commons Attribution 4.0 International](LICENSE). You may share and adapt it, including commercially, with attribution.
- **Site build configuration** – MIT, see [`LICENSES/MIT.txt`](LICENSES/MIT.txt).
- **Third-party material** keeps its original license. The SK ID Solutions documentation reproduced in [`docs/03-regulatory-framework/suggested-security-measures.md`](docs/03-regulatory-framework/suggested-security-measures.md) belongs to SK ID Solutions AS and appears here for analysis.

---

<div align="center">
Independent research by <a href="https://github.com/tomkabel">Tom Kristian Abel</a>
</div>
