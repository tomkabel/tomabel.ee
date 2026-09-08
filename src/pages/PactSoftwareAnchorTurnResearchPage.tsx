import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ReaderRail, { sectionSlug } from '../components/site/reader-rail';
import ArticleProof from '../components/site/article-proof';

type ReportSection = {
  heading: string;
  paragraphs: string[];
  after?: ReactNode;
};

const title =
  'PACT and the software-anchor turn — a critical analysis of Private Access Control Tokens';

const standfirst =
  "On June 22, 2026, Cloudflare announced PACT, Private Access Control Tokens, together with Mozilla Firefox, Google Chrome, Microsoft Edge, and Shopify. The goal is to replace CAPTCHAs and behavioral tracking with anonymous cryptographic attestation: a site proves you are human, and other sites accept that proof without learning who you are. The blind-signature mechanism is not where I expect this to fail. The hard part is governance, who gets to issue tokens and on what basis, and that decision has not been made. PACT is a proposal, not a product. This report reads it the way I read every client-side trust system: as a claim about what a machine can prove, and about who is allowed to make that claim on behalf of the web.";

const openingParagraphs = [
  'This report is a critical analysis of the public record as of August 2026. Primary sources: Cloudflare\u2019s announcement and its private-attestation documentation, the design discussion in the antifraudcg/pact repository (the W3C Anti-Fraud Community Group), the IETF Privacy Pass specifications (RFC 9576, the rate-limited token issuance draft), and the independent analyses that followed the announcement. Every factual claim below is attributed to the source it came from, and claims that could not be verified are marked as such.',
  'Two limits apply. PACT is design discussion, not specification. The repository contains problem statements, architecture sketches, and open issues, and anything I say about the design could change by the time you read this. And this report touches no live system. PACT is not deployed anywhere as of this writing; there is nothing to probe and no vulnerability to disclose. The analysis is about the proposal\u2019s structure, not its current implementation.',
];

const sections: ReportSection[] = [
  {
    heading: 'What PACT is, precisely',
    paragraphs: [
      'The announcement commits Mozilla, Google, and Microsoft, together with Shopify and Cloudflare itself, to developing and submitting for standardization a protocol in which sites with strong knowledge of personhood issue anonymous tokens, and other sites accept those tokens as proof that a human is in the loop. The mechanism is blind signatures from the Privacy Pass family, formalized by the IETF in June 2024 as RFC 9576. A user\u2019s browser requests a token from an attester, an entity that knows something about the user. A token issuer signs the blinded request. The browser presents the resulting token to a site, which verifies the signature without learning which user obtained the token. Which issuer participated is hidden only in the aggregating or issuer-blinding variants, which are design options rather than properties of the announced protocol.',
      "The motivation is real. Cloudflare's own network data, reported in June 2026, shows automated traffic passing human traffic for the first time: 57.5 percent of HTTP requests now come from bots, crawlers, and AI agents, against 42.5 percent from people. The announcement's stated motivation is that CAPTCHAs and behavioral tracking do not scale to that mix, and the industry is looking for a cryptographic middle ground.",
      'Be precise about the state of the thing. As of August 2026, PACT is at the proposal stage. There is no deployment timeline, no IETF draft published under the PACT name, and no finalized issuance-governance specification. What exists is a press statement, an early design repository, and an open question that the announcement does not answer: who gets to issue tokens, and what check do they perform before signing.',
    ],
  },
  {
    heading: 'The trust model shift: from hardware scarcity to issuer judgment',
    paragraphs: [
      "Apple's Private Access Tokens are the clearest contrast. In that model, the device operating system performs the attestation. Cloudflare's documentation describes checking, without installed software, whether a device runs a current OS version, whether it is jailbroken, and whether the login window is in focus. The scarce resource is a device vouched for by its manufacturer. Analysis of the announcement has pointed out that Mozilla specifically warned that widespread reliance on this model would strengthen platform gatekeepers, because access to web resources becomes conditional on hardware-controlled attestation.",
      'PACT is an attempt to widen the trust model so scarcity can come from other anchors: account standing, active subscriptions, issuer vouching. That is a real difference in attacker economics. Hardware attestation forces a bot operator to acquire or emulate trusted devices. Contextual anchors force the operator to acquire or synthesize credentialed accounts, which can be automated through credential stuffing, bulk registration, stolen sessions, or cheap subscriptions bought in bulk. The Sybil problem does not disappear. It moves from the device to the account.',
      "The history is worth naming. Google's Web Environment Integrity proposal tried hardware-ish client attestation in 2023 and was withdrawn after months of criticism. PACT attests personhood rather than client integrity, and the cryptography is far better, but the power structure is the same shape: a small number of platforms decide which clients count as legitimate. The question PACT actually inherits from WEI is not technical. It is whether a trust oligopoly is acceptable if the credentials are anonymous.",
    ],
  },
  {
    heading: 'The browser is a convenience, not a trust anchor',
    paragraphs: [
      'The proposed design treats the browser as a trusted mediator of credential storage, issuer selection, challenge budgets, and redemption. A bot operator often controls the browser profile, the device, or both. The browser is a convenient API boundary for legitimate users, but it is not a trustworthy admission controller when the user agent itself is automated or compromised.',
      "The cryptographic unlinkability of Privacy Pass tokens does not fix this. It ensures a token can be redeemed without revealing which issuer produced it or which user obtained it. The token's value still depends entirely on the quality of the issuer's admission process. Copy a browser profile that holds credentials, and you can obtain new tokens as the legitimate user would, until rate limits bite.",
    ],
  },
  {
    heading: 'Token farming and emulation',
    paragraphs: [
      "The attack surface is the supply side. If tokens can be harvested from compromised devices or bought from negligent issuers, the system's integrity drops before any origin sees a request. Rate-limited issuance remains necessary precisely because token acquisition may be polluted. The IETF already has a working draft for exactly this, rate-limited token issuance, which suggests the working group knows where the weak point is.",
      "Without a hardware anchor, a bot operator does not need to defeat a secure enclave. They need to emulate whatever contextual signals the issuer checks. If the issuer relies on account standing, automate account creation or buy aged accounts. If it relies on subscription status, treat bulk subscriptions as an operating expense. The attack scenarios listed in the PACT repository, including unauthorized endorsement acquisition, token replay, token theft, anchor impersonation, Sybil amplification, and metadata leakage, follow directly from the fact that a software anchor is duplicable. These are not exotic. They are the ordinary economics of a credential that can be farmed.",
    ],
  },
  {
    heading: 'The metadata trade-off',
    paragraphs: [
      'The privacy story is more complicated than the press release suggests. In the base flow, the entity issuing tokens knows which account requested a token and when. Blind signatures protect the user at the origin, but they do not hide the issuance event from the issuer. Hardware attestation, by contrast, pushes that burden onto the device manufacturer, which is a different concentration of trust but not necessarily a bigger one.',
      'The repository contains two serious mitigations. One proposal uses an aggregating issuer, which accepts credential transfers from multiple originating issuers and issues its own tokens, so origins see only the aggregator, and its unlinkability holds regardless of its behavior. Another sketch uses zero-knowledge proofs to hide which issuer produced a credential, removing the intermediary entirely. These are genuine improvements. They are also design options, not properties of PACT as announced. Unless aggregation or issuer-hiding becomes the default or a requirement of the standard, the practical privacy outcome depends on whether origins choose the privacy-preserving variant. The base architecture leaves the initial issuer in a privileged observation position.',
    ],
  },
  {
    heading: 'The ratchet',
    paragraphs: [
      'The centralization risk is hard to see because PACT tokens are initially optional friction-reducers. As adoption spreads, the absence of a token starts to carry information. Origins rationally adjust: token-bearing traffic sails through, untokened traffic gets challenged more aggressively, risk thresholds are recalibrated. No single actor decides to make tokens mandatory. It happens through incremental optimization across thousands of sites, and the risk is that the credential ends up required in practice.',
      'The casualties of that process are the traffic classes that have no issuer relationship: internet measurement systems, security researchers, archival crawlers, RSS readers, Tor users, and alternative browsers. And the economics invert the stated purpose. Sophisticated bot operators can afford accounts, subscriptions, and vouches. Low-income users, unbanked users, and privacy-conscious people who refuse persistent platform identities would be priced out. A CAPTCHA can be solved without proving consumer status. A subscription-anchored token cannot.',
    ],
  },
  {
    heading: 'The issuer quality problem',
    paragraphs: [
      'PACT does not specify who qualifies as an attester, and the announcement did not resolve the governance question. This is not a secondary issue. It is the core security issue. A blind-signature token proves that some issuer signed it. It does not prove that a meaningful personhood or account-quality check occurred.',
      'Without accreditation, the ecosystem faces a classic adverse-selection problem. Low-quality issuers can sell cheap tokens to anyone, and origins that want to reduce friction will accept them because they convert more traffic. High-quality issuers that do expensive vetting are undercut. The market selects for lax issuance. A malicious or compromised issuer can mint valid tokens for bots at scale, and a verifier cannot distinguish those tokens from honest ones without maintaining issuer-specific reputation and audit data. As of August 2026, none of these appear in the public record: no accreditation model, no public issuer directory, no revocation lists, no audit requirements.',
      "The result is a trust-proxy protocol. PACT inherits the security posture of whatever issuer an origin happens to configure, and the origin-facing design already concentrates that choice: one sketch in the repository has origins configuring up to two aggregating issuers and the credit cost per request. Nothing in the public record indicates a flaw in the blind-signature mechanism itself. The admission process is everything, and the admission process is unspecified.",
    ],
  },
  {
    heading: 'The sovereignty blank',
    paragraphs: [
      "The governance gap extends to jurisdiction. The materials I reviewed do not address how issuer requirements interact with national firewalls, data localization laws, or state-mandated digital identity. That is a serious omission, because who controls the trust root is a corporate governance question and a sovereign one at the same time.",
      'A government that becomes a mandatory issuer could observe issuance events, deny tokens to disfavored users, and require domestic origins to accept only state-issued credentials. Data localization rules could compel domestic issuance servers. Countries could end up with distinct trust zones where a token issued in one jurisdiction is not accepted in another. That would balkanize the web at the protocol layer, not at the application layer. The announcement proposes no sovereignty model and no mechanism for a user to challenge issuer denial.',
    ],
  },
  {
    heading: 'What would change my mind',
    paragraphs: [
      "The standard critique of proposals like this is to declare them dead on arrival and move on. I think that is the wrong reflex here, and the reason is the same reason I take the BotGuard teardown seriously: the mechanism is real, and the failure modes are structural, not incidental. Here are the markers that would make this design defensible:",
    ],
    after: (
      <ul className="mt-6 list-disc space-y-3 pl-6 text-lg leading-relaxed text-muted">
        <li>An accreditation model that defines who may issue for the web, with published criteria.</li>
        <li>Aggregation or issuer-hiding as the default architecture, not an option.</li>
        <li>Adoption of rate-limited issuance, so token supply cannot be farmed in bulk.</li>
        <li>Explicit fallback obligations, so origins that accept PACT must still serve clients without it.</li>
        <li>An answer on jurisdiction, data localization, and state issuers before standardization.</li>
      </ul>
    ),
  },
  {
    heading: 'Conclusion',
    paragraphs: [
      'The shift from hardware anchors to software and contextual anchors is not inherently more private, more decentralized, or more open. It relocates trust from device manufacturers to identity providers, payment platforms, and cloud intermediaries. That trade avoids the device-vendor gatekeeping that killed WEI, and it introduces a different set of problems: Sybil resistance becomes account-fraud resistance, initial issuers gain metadata visibility, and users without platform relationships risk exclusion.',
      'The least controversial part of PACT is the cryptography. Blind signatures give plausible unlinkability at the verifier, and Privacy Pass is a mature, published architecture. The protocol\u2019s security ultimately depends on who is allowed to issue tokens and how tightly their admission process is controlled. That layer is absent. Until it exists, PACT is not a trust protocol. It is a trust-proxy protocol, and the web has a working precedent for where that ends: a small set of platforms acting as the gatekeepers of legitimacy, with a cryptographically elegant credential standing in for the admission decisions nobody standardized.',
    ],
  },
];

const sources = [
  {
    label:
      'Cloudflare, press release, June 22, 2026: "Cloudflare Collaborates With Leading Browsers to Develop a Privacy-First Protocol for the Global Internet"',
    url: 'https://www.cloudflare.com/press/press-releases/2026/cloudflare-collaborates-with-leading-browsers-to-develop-a-privacy-first-protocol-for-the-global-internet/',
    note: 'announcement, partner list, personhood framing, blind-signature mechanism, stated CAPTCHA and tracking motivation',
  },
  {
    label:
      'TechTimes, June 23, 2026: "Cloudflare, Chrome, and Firefox Plan to Replace CAPTCHAs With Cryptographic Tokens"',
    url: 'https://www.techtimes.com/articles/318891/20260623/cloudflare-chrome-firefox-plan-replace-captchas-cryptographic-tokens.htm',
    note: 'press coverage of the announcement',
  },
  {
    label: 'IETF, RFC 9576: "The Privacy Pass Architecture" (June 2024)',
    url: 'https://www.rfc-editor.org/rfc/rfc9576.html',
    note: 'Privacy Pass architecture and deployment models',
  },
  {
    label: 'IETF, draft-ietf-privacypass-rate-limit-tokens: "Rate-Limited Token Issuance Protocol"',
    url: 'https://datatracker.ietf.org/doc/draft-ietf-privacypass-rate-limit-tokens/',
    note: 'per-origin rate-limited issuance',
  },
  {
    label: 'antifraudcg/pact, GitHub repository and issues (W3C Anti-Fraud Community Group)',
    url: 'https://github.com/antifraudcg/pact',
    note: 'issue #1: issuer blinding sketch; issue #6: aggregating issuers, origins configure up to two and the credit cost per request',
  },
  {
    label: 'Cloudflare Blog: "Verify Apple devices with no installed software"',
    url: 'https://blog.cloudflare.com/private-attestation-token-device-posture/',
    note: 'Apple Private Access Tokens, device posture checks',
  },
  {
    label: 'hrbrmstr, ai.rud.is, June 23, 2026: "PACT: The open web doesn\'t need another trust oligopoly"',
    url: 'https://ai.rud.is/posts/2026-06-23-pact-the-open-web-doesnt-need-another-trust-oligopoly/',
    note: 'ratchet effect, WEI parallel, excluded traffic classes, token farming',
  },
  {
    label:
      'Krishna Gupta: "PACT — Private Access Control Tokens: A Privacy-Preserving Trust Architecture for Humans and AI Agents on the Web"',
    url: 'https://krishnag.ceo/blog/pact-private-access-control-tokens-a-privacy-preserving-trust-architecture-for-humans-and-ai-agents-on-the-web/',
    note: 'attack scenarios, agentic AI framing, sovereignty, Mozilla platform-gatekeeper warning',
  },
  {
    label: 'SourceFeed, June 23, 2026: "Cryptographic Trust Over Tracking: Inside the PACT Protocol"',
    url: 'https://sourcefeed.dev/a/cryptographic-trust-over-tracking-inside-the-pact-protocol',
    note: 'verifier-side rate limiting, dual-path maintenance',
  },
  {
    label:
      'TechTimes and Tom\'s Hardware, June 5, 2026: Cloudflare CEO Matthew Prince on automated traffic passing humans',
    url: 'https://www.techtimes.com/articles/317877/20260605/bot-traffic-passes-humans-online-cloudflare-says-agentic-ai-drove-575-share.htm',
    note: '57.5 percent bots against 42.5 percent humans',
  },
  {
    label: 'Wikipedia: "Web Environment Integrity"',
    url: 'https://en.wikipedia.org/wiki/Web_Environment_Integrity',
    note: 'proposal abandoned, Chromium prototype removed November 2023',
  },
  {
    label: 'Companion essay: What client-side trust is actually worth',
    url: 'https://tomabel.ee/disclosures/what-client-side-trust-is-actually-worth/',
    note: 'the argument this report\u2019s evidence supports',
  },
];

const disclosureParagraphs = [
  'This report is an analysis of public record: press releases, IETF documents, a public design repository, and published commentary. It touches no live system, discloses no vulnerability, and contains no private or client material. PACT is not deployed as of August 2026, so there is no vendor to coordinate with and no disclosure obligation. Cloudflare and the browser vendors were not contacted for comment; this analysis stands on the public record alone.',
  'Where the design changes, this analysis will need revisiting; the governance questions it raises will not. Research conduct follows the site\u2019s ',
];

const disclosurePolicyUrl = 'https://tomabel.ee/disclosure/';

export default function PactSoftwareAnchorTurnResearchPage() {
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
            Research · Critical Analysis · Anti-Fraud
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
            {title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted md:text-2xl">
            {standfirst}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="border border-border bg-white/[0.03] px-3 py-2">Published · August 28, 2026</span>
            <span className="border border-border bg-white/[0.03] px-3 py-2">10 min read</span>
            <span className="border border-border bg-white/[0.03] px-3 py-2">Tom Kristian Abel</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="sticky top-24">
            <ReaderRail sections={sections} backHref="/disclosures" backLabel="All disclosures" />
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
              {section.after}
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
        slug="pact-software-anchor-turn"
        expectedSha256="c562e0e9815ebce3a31623e496947c6419b8f769b1add7a545c6d0d17be4594b"
      />
    </article>
  );
}
