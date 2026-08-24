import { Link } from 'react-router-dom';
import ReaderRail, { sectionSlug } from '../components/site/reader-rail';
import ArticleProof from '../components/site/article-proof';

type ReportSection = {
  heading: string;
  paragraphs: string[];
};

const title = 'Zero-Trust Octagon — a framework from first principles';
const standfirst =
  '"Zero trust" is the most overused phrase in security. Vendors sell it as a product, compliance teams measure it as a maturity scale, and CISOs certify their organizations as "advanced" while the breach reports pile up. This report takes the opposite route: zero trust as a set of eight irreducible axioms, a nine-dimension morphological matrix for mapping any real deployment, and four archetypal breach traces that show where designs actually fail. The framework\u2019s central findings: the axioms every non-aspirational deployment violates — epistemic integrity and continuous verification — are among the costliest to satisfy, and the most common defensive response pattern actively makes incidents worse.';

const openingParagraphs = [
  'This report is a synthesis of a longer work, the Zero-Trust Octagon, a vendor-neutral book project I have been writing since early 2025. The book walks through the theory, the architecture space, four full attack traces, and implementation decision trees. This report compresses the framework to its testable core: what the axioms are, how the matrix works, and what applying it to archetypal deployments finds.',
  'The framework builds on public standards and reporting: NIST SP 800-207 and SP 800-207A, CISA\u2019s Zero Trust Maturity Model (ZTMM) 2.0, the DoD Zero Trust Reference Architecture and the FY23-27 Capability Execution Roadmap, NIST FIPS 204 (ML-DSA) and the draft SP 800-131A Rev. 3 with IR 8547 for the post-quantum timeline, the RSA 2026 ID IQ Report for industry self-assessment data, and public incident reporting for the supply-chain cases cited. Every external claim below was checked against those sources during writing. Where a figure comes from the book\u2019s own analysis rather than a public source, it is labeled as such.',
  'Two limits apply. First, the axioms are a design requirement, not a score: an architecture either satisfies all eight or it is not zero trust, and there is no partial credit. Second, this is not a product review. No vendor is named as good or bad here. The framework\u2019s point is that the product is never the architecture.',
];

const sections: ReportSection[] = [
  {
    heading: 'Zero trust is a requirement specification, not a product',
    paragraphs: [
      'The term was co-opted so thoroughly that most "zero trust" deployments satisfy two or three of the axioms at best. Three category errors dominate.',
      'Zero trust is not ZTNA. ZTNA products, identity-aware proxies, and software-defined perimeters are an enforcement mechanism: one value on one dimension of the matrix. A ZTNA product mediates access to self-hosted applications. It does nothing for the SaaS platforms your users reach through SSO, nothing for pod-to-pod traffic inside a Kubernetes cluster, and nothing to verify that the data your SIEM ingests is untampered. Calling a steering wheel a car is the same category error.',
      'Zero trust is not a compliance framework. NIST SP 800-207 provides the conceptual model: network always hostile, all communication secured, access granted per session and per resource, policy dynamic and informed by as many data sources as possible. CISA\u2019s ZTMM 2.0 operationalizes that across five pillars (Identity, Devices, Networks, Applications and Workloads, Data) and four stages (Traditional, Initial, Advanced, Optimal), with three cross-cutting capabilities. But compliance frameworks optimize for auditability, not adversarial resilience: a system can pass a SOC 2 audit and satisfy zero axioms of the Octagon, with documented policies that are vendor black boxes (violating Axiom 2) and comprehensive logging that is implicitly trusted (violating Axiom 7). Compliance is a floor. The axioms are a bar.',
      'Zero trust is not a product suite. Vendors provide tools that implement values on individual dimensions. The architecture is the set of choices you make across all dimensions and how those choices interact. Worse, a single-vendor suite often violates Axiom 6 by construction: the vendor becomes the single component whose compromise collapses everything. This is not an argument against vendors. It is an argument against mistaking a product\u2019s scope for your threat model.',
      'The regulatory push is real. Executive Order 14028 (May 2021), section 3(c), directed federal agencies to advance toward zero trust architecture. The DoD Zero Trust Strategy and its Capability Execution Roadmap (FY23-27) went further, with 152 activities across seven pillars and an explicit requirement for VPN-less user-to-application access. A federal requirement that users reach resources without a VPN tunnel is a formal admission that the network perimeter no longer marks a trust boundary. The standards ecosystem this report cites was accelerated and shaped by that mandate.',
    ],
  },
  {
    heading: 'The eight axioms',
    paragraphs: [
      'An axiom is a statement accepted as true, from which everything else is derived. The Octagon asks what must be true about any system that claims to distrust by default, verify continuously, and survive the compromise of its own components. The answer, after stripping away vendor names and implementation patterns, is eight invariants:',
      '1. No intrinsic trust. Trust is a transient verdict rendered independently for each access decision, based on the entity\u2019s current provable state. Not a property of position, ownership, or history. Trust decays continuously, and the system must be able to deny an entity that was trusted one second ago.',
      '2. Explicit, verifiable policy. Every decision evaluates against a machine-enforceable, deterministic policy that a neutral third party can replay. A policy that cannot be re-executed by an independent evaluator with identical inputs is indistinguishable from magic. "Allow all" and "deny all" are degenerate, because they bypass the decision model.',
      '3. Unbypassable mediation. There is no physical or logical path to any resource that does not invoke the evaluation function. This axiom was originally formulated as "separate the policy decision point from the policy enforcement point," which peer review rejected as an implementation pattern: cryptographic data envelopes fuse the two and still satisfy the invariant. The true requirement is not who enforces, but whether enforcement is escapable. Break-glass, emergency override, and physical console access are all mediation paths.',
      '4. Continuous verification. Verdicts expire. Re-verification happens at a cadence driven by risk, bounded by the fastest compromise-to-exploitation timeline in your threat model. "Continuous" does not mean constant; it means risk-calibrated and fresh before an action completes. A system that verifies once at login and trusts the session for 12 hours is a traditional system with a strong front door.',
      '5. Deterministic bounded authority. Every grant of access confers a mathematically bounded vector of state transitions, calculable before authorization. Authority cannot expand without a new independent decision. "Admin" is an anti-pattern not because it is broad but because it is unbounded: nobody can calculate what it can do.',
      '6. Byzantine fault tolerance. The architecture keeps its structural and epistemic integrity even when components act maliciously or arbitrarily. A compromised PEP cannot alter policy. A compromised log agent cannot erase history. This axiom replaced "assume breach," which is a mindset, not an invariant.',
      '7. Epistemic integrity. State inputs to the evaluation function must carry cryptographic proof of provenance. Unattested data is hostile input, usable to deny but never to grant. This axiom was missing from the initial formulation and was added during peer review. It turned out to be the single most universally violated invariant in real architectures.',
      '8. Bilateral symmetry. Trust evaluation is bidirectional. The resource proves its state to the requester before data exchange, and the requester proves its state to the resource. A client that sends protected data to a server it has not verified is trusting the server intrinsically, which violates Axiom 1. mTLS is the minimum form, not the whole requirement.',
      'The axioms were not born fully formed. Axioms 3, 5, and 6 were refined from weaker original formulations during peer review, and 7 and 8 were added when review showed the set was incomplete. The point for this report: the set is individually necessary and collectively sufficient. Fail one and the architecture is not zero trust, regardless of how many products are bolted on.',
      'Three properties separate meaningful zero trust from the performative kind. The architecture must survive its own defense mechanisms: when the policy engine makes a mistake, the business should not pay. Observability must be independently verifiable: if you believe the SIEM because it is the SIEM, an attacker with enough privilege can blind, poison, or fabricate logs. And the architecture must be falsifiable: replayable policies and verifiable attestation chains are testable artifacts, not articles of faith.',
    ],
  },
  {
    heading: 'The nine-dimension matrix and the covariance trap',
    paragraphs: [
      'The second piece of the framework is a morphological matrix: nine architectural dimensions, each with a range of concrete values, from least to most mature. Every deployment maps to exactly one value per dimension. The nine: D1 trust anchor (software CA to silicon root of trust to distributed multi-party), D2 identity model (static JIT to zero standing privileges), D3 enforcement layer (network perimeter to bilateral), D4 attestation modality (none/TOFU to heterogeneous triple), D5 violation response (hard deny to trickle-truth), D6 policy distribution (push to event-streamed), D7 observability trust (implicit to heterogeneous observer consensus), D8 organizational posture (siloed to dojo-trained), and D9 human continuity (single point of failure to fully automated).',
      'The matrix replaces the maturity model. A maturity model assumes one path. The matrix is a configuration space: thousands of combinations exist, and about a dozen are coherent. The dimensions are not independent. They form two self-reinforcing clusters.',
      'The low-maturity cluster: software CA, single-source attestation, push policy, hard deny, implicit observability, siloed organization. These reinforce each other downward. Upgrading one in isolation produces diminishing returns because the others constrain it. A company that upgrades to behavioral attestation while keeping push policy and hard deny will detect more anomalies but respond too slowly, and the response will cascade.',
      'The high-maturity cluster: silicon anchor, heterogeneous attestation, event-streamed policy, trickle-truth response, attested telemetry, presumptively-wrong organization. Each value enables the next. Silicon provides the provenance that attestation feeds on; attestation provides the signal quality that trickle-truth decisions need; event-streamed distribution provides the latency trickle-truth requires.',
      'The practical consequence is the single most common architectural mistake I see: mix-and-match upgrading, one dimension at a time, which produces frustration and then abandonment. Architecture is a system. The dimensions are coupled.',
    ],
  },
  {
    heading: 'What the audit found: the universally violated axioms',
    paragraphs: [
      'Turning the axioms into an eight-question audit and running it against four archetypal deployments produces a consistent pattern. The four archetypes: A, the aspirational "Holy Grail" (silicon roots, bilateral enforcement, heterogeneous attestation, trickle-truth); B, the Fortune 500 with a multi-million-dollar vendor suite; C, the hyper-growth startup shipping via GitOps and CI/CD; D, the solo operator gluing SaaS together on a lean budget.',
      'The violation matrix, scored green, yellow, or red per axiom (yellow counts as a partial violation): A fails nothing. B fails six of eight outright and one partially. C fails five outright and two partially. D fails six outright and one partially. Three findings from that matrix are worth stating plainly.',
      'First, epistemic integrity (Axiom 7) is the universal failure. Every non-A archetype violates it, including the well-funded one. The reason is structural: satisfying it requires upgrading three dimensions at once (silicon trust anchor, continuous attestation, independently verified observability). It is the most expensive cluster in the matrix, so it is the one everyone skips. The consequence is that policy engines are often correct while their inputs are fabricated. The PDP is fine. The telemetry is assumed.',
      'Second, continuous verification (Axiom 4) is the breach enabler. In the Fortune 500 trace, a stolen session token rides for 12 hours because nothing re-verifies after authentication. In the startup, CI/CD validation is a one-time event: code is scanned once, deployed, and trusted forever. In the solo-operator case, 12-to-24-hour session lifetimes give the attacker a runway measured in hours. In every non-A archetype, one verification event gives the attacker a working window: hours in B and D, and in C the trust never expires on its own, so only detection and response end it.',
      'Third, hard deny, the default violation response, actively violates Byzantine fault tolerance. The Fortune 500 trace ends the same way these incidents end in the real world: the system locks out the compromised account, and simultaneously locks out the legitimate user and the administrators who could investigate. The defense mechanism becomes a second attack vector. This explains a recurring industry pattern: organizations deploy zero-trust controls, experience one false-positive lockout that disables a critical function, and quietly disable the controls. The architecture was not Byzantine fault tolerant, so the business removed it.',
      'Two more findings. Vendor black-box policy engines violate Axiom 2: if a neutral auditor cannot replay your policy and reproduce the verdict, you do not have verifiable policy. And bilateral symmetry (Axiom 8) is hiding in plain sight: mutual TLS is deployable with existing infrastructure and immediately upgrades one of the most violated axioms in most deployments from red to yellow.',
    ],
  },
  {
    heading: 'The confidence/reality gap',
    paragraphs: [
      'The audit\u2019s most uncomfortable finding is that the industry\u2019s self-assessment does not survive contact with breach data. The RSA 2026 ID IQ Report, which surveyed more than 2,100 global technology, security, and IAM leaders, found that 69% of organizations experienced an identity-related breach in the last three years. The same report found that 57% self-assess their zero-trust maturity as "advanced."',
      'Both numbers are in the same survey. The report does not publish the overlap between the two groups, but set arithmetic alone guarantees that at least a quarter of all respondents are both "advanced" and breached. Organizations that believe they are doing zero trust are being breached through the identity pillar that zero trust exists to protect. The gap is structural, not a measurement error. Self-assessments ask whether a capability exists. The eight-question audit asks whether the capability produces a verifiable, bounded, continuous verdict. Most organizations discover that their tools are present and their inputs are unverified.',
    ],
  },
  {
    heading: 'Where designs actually fail: four traces',
    paragraphs: [
      'The book\u2019s Part III walks each archetype through a full incident timeline. The compressed versions below are constructed scenarios grounded in the incident classes cited in this report, not accounts of specific engagements:',
      'Archetype B, the Fortune 500: stolen token, full breach. An infostealer harvests a valid session. Authentication is bypassed because the session is trusted for 12 hours. The policy decision point is a vendor black box that cannot be replayed. Enforcement exists only at the network perimeter, so the attacker moves laterally inside the data center. The SIEM stays silent, and the silence is trusted as evidence of normality, because no independent verification pipeline exists. When the tripwire finally fires, the hard deny cascade locks out the responders. The data is exfiltrated and the business is down. The attack was detected and the response caused the worse incident.',
      'Archetype C, the startup: typosquatted dependency. A malicious package with a lookalike name passes CI/CD, because trust-on-first-use is the attestation model: if code passes the pipeline, it is trusted forever. The malicious code runs with the full ServiceAccount permissions of the legitimate service, because nothing bounds authority to what the service actually needs. Detection is fast, faster than any other non-aspirational archetype, and it still cannot prevent exfiltration during the degrade window: the attack bypassed the architecture\u2019s only verification gate, and the malicious code already holds the permissions it needs.',
      'This class of attack is not hypothetical. In August 2025, the s1ngularity supply-chain attack compromised the nx npm package; Mandiant\u2019s UNC6426 analysis documented how the stolen GitHub tokens from that breach were used to reach AWS administrator access within about 72 hours. In March 2026, the TeamPCP actor compromised LiteLLM\u2019s PyPI credentials and published backdoored versions that harvested credentials and attempted lateral movement into Kubernetes clusters, part of a campaign that also hit Trivy, Telnyx, and KICS. In both cases the pattern is the same: trust was assumed at a boundary where verification happened once, and credentials chained upward.',
      'Archetype D, the solo operator: MFA fatigue and the SaaS blind spot. An attacker prompt-bombs MFA until the user accepts, then hits the identity-aware proxy. The IAP works: the finance dashboard is not reached. What the IAP does not protect is Google Workspace, which authenticates directly with the identity provider and is invisible to the proxy. The response quality depends entirely on whether Pat, the one human, is awake and alert. When Pat is available and alert, mean time to respond is about three minutes. When Pat is asleep, it is 25-plus minutes. When Pat is available but fatigued, the response is effectively indefinite until the user reports the breach. The average looks fine. The distribution is bimodal and dangerous. The book\u2019s trace also notes that base-tier Workspace audit logging may not record what was accessed at all, depending on edition and event type.',
      'Archetype A, the aspirant, fails nothing and costs accordingly. Its defining response is trickle-truth: a detected attacker is served convincing fake data through an adaptive environment, revealing tactics while exfiltrating nothing real. It achieves zero data loss and zero business impact, and it inverts the attacker\u2019s cost model. It also requires silicon roots, heterogeneous attestation, event-streamed policy distribution, and a live deception environment. The book estimates the infrastructure and ML investment at $500K per year or more. Treat it as a definition of the destination, not a recommendation.',
    ],
  },
  {
    heading: 'The meta-patterns worth taking away',
    paragraphs: [
      'Several cross-cutting findings survived the archetype analysis and are the parts I actually use when reviewing an architecture:',
      'The detect-respond gap matters more than MTTD. Mean time to detect is the metric everyone reports. The gap between detection and effective response is the interval during which the attacker still inflicts damage, and it is the better metric. The Fortune 500 has the worst gap not because detection is slow but because response causes new damage.',
      'The leverage hierarchy is not what vendors sell. Ranked by impact per upgrade: D5 violation response first, then D4 attestation, then D8 organizational posture, then D2 identity model, then D7 observability trust. D1, the trust anchor, is deliberately not in the top five: an attested hardware root whose reports are verified by an implicitly trusted SIEM is not meaningfully more secure than a software root.',
      'D8, organizational posture, is the only dimension that costs zero dollars. Fused security and operations teams, shared incident response, blameless post-mortems. No hardware, no contracts, no licenses. The barrier is political, not financial. The DoD reached the same conclusion in its own way: DTM-25-003 established a Zero Trust Portfolio Management Office precisely because the existing organizational model could not execute zero trust. The solo operator with a fused posture often achieves better outcomes than the siloed enterprise on one percent of the budget, because one human can act in seconds instead of escalating through three tiers.',
      'The litmus test. One question separates viable architectures from performative ones: when your policy engine fails, when it denies a legitimate request or allows a malicious one, who pays, the attacker or the business? An architecture that makes the business pay for its own defense mechanisms is not zero trust. It is a liability the business will remove at the first false positive.',
    ],
  },
  {
    heading: 'The road ahead: Hendecagon, Tridecagon, and post-quantum reality',
    paragraphs: [
      'Adversarial stress-testing of the Octagon produced five forward-looking extensions. Functional preservation: the system must keep operating under attack without degrading to denial-first. Sovereign quorum: no single organization may unilaterally declare an entity trusted. Temporal epistemic integrity: provenance proofs have a shelf life set by the algorithms that secure them. Algorithmic impermanence: no algorithm is permanent, and migration is a continuous operation, not a flag day. Architectural polymorphism: a predictable topology is a modelable topology for machine-speed adversaries. The Octagon (eight axioms) is the deployment mandate. The Hendecagon (eleven) and Tridecagon (thirteen) are the research frontier. The extended axioms are not yet formalized with corollaries; the book treats them as acknowledged directions, and this report does the same.',
      'The post-quantum transition makes the impermanence axiom concrete rather than philosophical. NIST\u2019s draft migration guidance (SP 800-131A Rev. 3 and IR 8547, both still in draft at the time of writing) sets the timeline: algorithms at 112-bit security strength, RSA-2048 among them, are deprecated by 2030 and disallowed by 2035. The NSA\u2019s CNSA 2.0 suite applies comparable milestones to the wider legacy set, ECDSA P-256 included, with exclusive use of the post-quantum algorithms required by 2030 to 2033 depending on system class. The consequences for zero-trust architecture are operational, not cryptographic. ML-DSA signatures per FIPS 204 range from 2,420 bytes (ML-DSA-44) to 4,627 bytes (ML-DSA-87), against 64 bytes for an ECDSA P-256 signature, a 35-to-75-fold increase. Every dimension that depends on signed artifacts feels this: attestation reports (D4), policy distribution messages (D6), attested telemetry (D7), SPIFFE/SPIRE certificate bundles on every mTLS handshake. A heterogeneous-triple attestation cycle at ML-DSA-87 sizes produces roughly 14 KB of signature data per 5-second interval before the payload. The dimensions that are hardest to satisfy today are the ones the transition will hit first.',
    ],
  },
  {
    heading: 'What to do with this',
    paragraphs: [
      'If the framework is useful, it is useful as an instrument, not as a position. Three moves:',
      'Run the eight-question audit on your own architecture. It takes under an hour. "I don\u2019t know" is a valid answer and a red flag. The eight questions are in the appendix below, mapped one-to-one to the axioms.',
      'Apply the litmus test to your incident response. When your last false positive fired, did the business pay? If yes, your violation response violates Axiom 6, and no amount of identity investment fixes that.',
      'Do not upgrade one dimension at a time. Move the cluster. And start with D8, because it is the only upgrade that costs nothing and it determines whether everything else you buy produces security or theater.',
    ],
  },
  {
    heading: 'Appendix: the eight-question audit',
    paragraphs: [
      'Score each axiom green, yellow, or red. Green means satisfied, yellow means partially satisfied, red means violated. Any yellow or red fails the axiom; the violation matrix in Section 4 is scored with yellow as a partial violation.',
      '1. Does any entity receive trust by virtue of its position, ownership, or history? (Axiom 1)',
      '2. Can a neutral third party replay your access policy with a stored input set and reproduce the same verdict? (Axiom 2)',
      '3. Is there any path to a resource that does not invoke the evaluation function? (Axiom 3)',
      '4. What is the maximum time between verification and access, and is it risk-calibrated? (Axiom 4)',
      '5. Can you calculate the exact maximum set of state transitions a compromised credential could authorize? (Axiom 5)',
      '6. Does compromise of a single component cascade to the rest of the system? (Axiom 6)',
      '7. Do state inputs to your policy engine carry cryptographic proof of provenance? (Axiom 7)',
      '8. Does the client verify the resource\u2019s state before sending data? (Axiom 8)',
      'The book\u2019s full rubric, with per-question scoring guidance, is Appendix B of the source work. Start with the lowest-cost fix or the highest-leverage one.',
    ],
  },
];

const sources = [
  {
    label: 'NIST SP 800-207, Zero Trust Architecture (2020)',
    url: 'https://csrc.nist.gov/pubs/sp/800/207/final',
    note: '',
  },
  {
    label: 'NIST SP 800-207A, A Zero Trust Architecture Model for Access Control in Cloud-Native Applications in Multi-Location Environments (final, September 2023)',
    url: 'https://csrc.nist.gov/pubs/sp/800/207/a/final',
    note: 'cloud-native access control model, final September 2023',
  },
  {
    label: 'CISA Zero Trust Maturity Model Version 2.0 (April 2023)',
    url: 'https://www.cisa.gov/zero-trust-maturity-model',
    note: 'five pillars, four stages, three cross-cutting capabilities',
  },
  {
    label: 'Executive Order 14028, Improving the Nation\u2019s Cybersecurity (May 2021)',
    url: 'https://www.federalregister.gov/documents/2021/05/17/2021-10460/improving-the-nations-cybersecurity',
    note: 'section 3(c): advance toward zero trust architecture',
  },
  {
    label: 'DoD Zero Trust Strategy and Roadmap / Zero Trust Capability Execution Roadmap (FY23-27)',
    url: 'https://dodcio.defense.gov/Portals/0/Documents/Library/DoD-ZT-Strategy.pdf',
    note: '152 activities across seven pillars; VPN-less user-to-application access',
  },
  {
    label: 'NIST FIPS 204, Module-Lattice-Based Digital Signature Standard (ML-DSA)',
    url: 'https://csrc.nist.gov/pubs/fips/204/final',
    note: 'ML-DSA signature sizes 2,420 to 4,627 bytes',
  },
  {
    label: 'NIST SP 800-131A Rev. 3 (draft), Transitioning the Use of Cryptographic Algorithms and Key Lengths',
    url: 'https://csrc.nist.gov/pubs/sp/800/131/a/r3/ipd',
    note: 'draft: 112-bit algorithms deprecated 2030, disallowed 2035',
  },
  {
    label: 'NIST IR 8547 (initial public draft), Migration to Post-Quantum Cryptography',
    url: 'https://csrc.nist.gov/pubs/ir/8547/ipd',
    note: 'draft: post-quantum cryptography migration timeline',
  },
  {
    label: 'NSA CNSA 2.0 algorithm fact sheet',
    url: 'https://media.defense.gov/2025/May/30/2003728741/-1/-1/0/CSA_CNSA_2.0_ALGORITHMS.PDF',
    note: 'legacy algorithm transition milestones for national security systems',
  },
  {
    label: 'RSA 2026 ID IQ Report',
    url: 'https://www.rsa.com/id-iq/',
    note: '69% identity-related breach in three years; 57% self-assess advanced',
  },
  {
    label: 'CSA Research Note, "UNC6426: nx Supply Chain to AWS Admin via OIDC", documenting Mandiant\u2019s UNC6426 findings on the s1ngularity attack (2026)',
    url: 'https://labs.cloudsecurityalliance.org/research/csa-research-note-oidc-trust-chain-abuse-cloud-takeover-2026/',
    note: 'documents Mandiant UNC6426 findings on the s1ngularity nx breach',
  },
  {
    label: 'Datadog Security Labs, LiteLLM and Telnyx TeamPCP supply-chain campaign analysis (March 2026)',
    url: 'https://securitylabs.datadoghq.com/articles/litellm-compromised-pypi-teampcp-supply-chain-campaign/',
    note: 'LiteLLM, Telnyx, Trivy, and KICS TeamPCP campaign, March 2026',
  },
];

const disclosureParagraphs = [
  'This report describes no live system under test and discloses no vulnerability. The framework is the author\u2019s own work, built on public standards and public incident reporting; the engineering reference implementation that accompanies the book is the author\u2019s own project. No vendor was consulted or compensated, and the framework names no product as a solution. Where the book makes estimates (cost floors, triage loads), they are labeled as estimates in the source and treated as such here.',
  'Research conduct follows the site\u2019s ',
];
const disclosurePolicyUrl = 'https://tomabel.ee/disclosure/';

export default function ZeroTrustOctagonResearchPage() {
  return (
    <article>
      <header className="relative overflow-hidden border-b border-border px-6 pb-20 pt-24">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]" />
        <div className="relative mx-auto max-w-4xl">
          <Link
            to="/disclosures"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-accent hover:underline"
          >
            ← Back to disclosures
          </Link>
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Research · Framework · Zero-Trust
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
            {title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted md:text-2xl">
            {standfirst}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="border border-border bg-white/[0.03] px-3 py-2">Published · August 11, 2026</span>
            <span className="border border-border bg-white/[0.03] px-3 py-2">19 min read</span>
            <span className="border border-border bg-white/[0.03] px-3 py-2">Tom Kristian Abel</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="sticky top-24">
            <ReaderRail sections={sections} backHref="/disclosures" backLabel="All disclosures" />
          </div>
          <div hidden className="border border-border bg-white/[0.02] p-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              Thesis
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Zero trust is not a product or a maturity level; it is a requirement specification. Eight axioms, a nine-dimension morphological matrix, and an audit showing that the axioms every non-aspirational deployment violates are the costliest to satisfy. The most common defensive response pattern actively makes incidents worse.
            </p>
          </div>
        </aside>

        <div className="lg:col-span-9">
          <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-muted">
            {openingParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {sections.map((section, i) => (
            <section key={section.heading} id={sectionSlug(section.heading)} className="mt-16 max-w-3xl scroll-mt-24">
              <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="font-display text-3xl font-bold leading-tight text-foreground">
                {section.heading}
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-muted">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-16 max-w-3xl">
            <h2 className="font-display text-3xl font-bold leading-tight text-foreground">
              Sources
            </h2>
            <div className="mt-6 space-y-4">
              {sources.map((source) => (
                <p key={source.url} className="text-lg leading-relaxed text-muted">
                  <a
                    href={source.url}
                    className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent"
                  >
                    {source.label}
                  </a>
                  <span className="text-muted-foreground"> — {source.note}</span>
                </p>
              ))}
            </div>
          </section>

          <section className="mt-16 max-w-3xl">
            <h2 className="font-display text-3xl font-bold leading-tight text-foreground">
              Disclosure status
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-muted">
              <p>{disclosureParagraphs[0]}</p>
              <p>
                {disclosureParagraphs[1]}
                <a
                  href={disclosurePolicyUrl}
                  className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent"
                >
                  security research policy
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </div>

      <ArticleProof
        slug="zero-trust-octagon"
        expectedSha256="48b2a50eeeb2b5efee6a351f7eecbcbe9fc6774deb327c838480561c7946961c"
      />
    </article>
  );
}