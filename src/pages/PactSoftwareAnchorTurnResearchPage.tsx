import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ReaderRail from '../components/site/reader-rail';
import { sectionSlug } from '../components/site/section-slug';
import ArticleProof from '../components/site/article-proof';
import { ArticleHeader } from '../components/site/article';

type ReportSection = {
  heading: string;
  paragraphs: string[];
  after?: ReactNode;
};

const title =
  'PACT and the software-anchor turn — a critical analysis of Private Access Control Tokens';

const standfirst =
  "On June 22, 2026, Cloudflare announced PACT, Private Access Control Tokens, together with Mozilla Firefox, Google Chrome, Microsoft Edge, and Shopify. The goal is to replace CAPTCHAs and behavioral tracking with privacy-preserving rate limiting: sites that already know something scarce about a user, such as a subscription or an account in good standing, vouch for them anonymously, and other sites rate-limit the resulting credential without learning who the user is. The anonymous-credential cryptography is not where I expect this to fail. The hard part is governance: who may vouch, on what basis, and how a site tells a good voucher from a bad one. That decision has not been made. PACT is a proposal, not a product. This report reads it the way I read every client-side trust system: as a claim about what a machine can prove, and about who is allowed to make that claim on behalf of the web.";

const openingParagraphs = [
  'This report is a critical analysis of the public record as of August 2026, rechecked in October 2026. Primary sources: Cloudflare\u2019s announcement; Mozilla\u2019s technical design post (Dennis Jackson, June 23, 2026); the PACT proposal and design discussion in the W3C Anti-Fraud Community Group (antifraudcg/proposals #22 and the antifraudcg/pact repository); and the IETF Privacy Pass specifications and drafts (RFCs 9576\u20139578 and the ARC and ACT drafts). Third-party analyses are cited where I use their arguments. Every factual claim below is attributed to the source it came from, and claims that could not be verified are marked as such.',
  'Two limits apply. PACT is design discussion, not specification. The repository contains problem statements, architecture sketches, and open issues, and anything I say about the design could change by the time you read this. And this report touches no live system. PACT is not deployed anywhere as of this writing; there is nothing to probe and no vulnerability to disclose. The analysis is about the proposal\u2019s structure, not its current implementation.',
];

const sections: ReportSection[] = [
  {
    heading: 'What PACT is, precisely',
    paragraphs: [
      'The announcement commits Mozilla, Google, and Microsoft, together with Shopify and Cloudflare itself, to developing and submitting for standardization a protocol that helps humans and bots prove their traffic is not malicious: sites issue anonymous tokens, and other sites accept them without learning who the user is. Its designers describe the goal as privacy-preserving rate limiting. PACT builds on Privacy Pass (RFCs 9576\u20139578, June 2024), but its candidate designs use anonymous credentials that carry rate-limit state: Anonymous Credit Tokens (ACT) and Anonymous Rate-Limited Credentials (ARC).',
      'Mozilla\u2019s design post names the roles. An Anchor, a site that knows something scarce about the user, such as a subscription, an account in good standing, or a verified phone number, gives the browser a batch of Endorsements. A Moderator, often the site itself, decides which Anchors to trust and exchanges an Endorsement for a Credential, a stateful object that holds the user\u2019s rate-limit balance. On later visits the browser presents the Credential, and the Moderator raises or lowers the balance as the behavior looks benign or abusive. Refusing to return an updated Credential is revocation. In Privacy Pass terms, the Anchor is the issuer of Endorsements, and the Moderator both verifies Endorsements and issues Credentials.',
      'Two properties carry the privacy claim. With issuer blinding, the Moderator learns only that an Endorsement came from one of the Anchors it trusts, not which one. And Credential presentations are unlinkable: the site learns whether the user holds a valid Credential below its rate limit, not the counter\u2019s value and not the user\u2019s earlier visits. Mozilla\u2019s stated target is that no more than that single bit gets through.',
      'PACT is not only about people. The antifraudcg proposal lists unblocking browser AI agents as a use case. Mozilla writes that an agent can carry its user\u2019s Credentials, or that an agent operator can run its own Anchor and vouch for its agents. Cloudflare\u2019s August 2026 post on the agentic internet says PACT \u201clets sites vouch anonymously, so the agent can present the token elsewhere.\u201d This matters for the farming argument below: if agent operators can act as Anchors, the supply of Endorsements depends on who runs agents, not on how many people there are.',
      "The motivation is real. In June 2026 Cloudflare CEO Matthew Prince reported that automated traffic had passed human traffic: 57.5 percent of HTTP requests for HTML content came from bots, crawlers, and AI agents, against 42.5 percent from people, by a classification he called \u201ca bit messy.\u201d The announcement's stated motivation is that CAPTCHAs and behavioral tracking do not scale to that mix, and the industry is looking for a cryptographic middle ground.",
      'Be precise about the state of the thing. As of October 2026, PACT is at the proposal stage. There is no deployment timeline and no IETF draft published under the PACT name; Mozilla says it will bring draft specifications to the IETF and W3C \u201cas soon as they\u2019re ready.\u201d The cryptographic drafts PACT relies on are unfinished too: the latest ARC and ACT revisions, from March and February 2026, are now listed as expired on the IETF datatracker. What exists is a press statement, a design post, an early design repository, and an open question the announcement does not answer: which Anchors a Moderator should trust, and what check an Anchor performs before it endorses anyone. The next public venue is a W3C TPAC 2026 breakout session, \u201cBringing Private Access Control Tokens to the Web,\u201d proposed by Dennis Jackson and Samuel Schlesinger.',
    ],
  },
  {
    heading: 'The trust model shift: from hardware scarcity to issuer judgment',
    paragraphs: [
      "Apple's Private Access Tokens are the clearest contrast. In the anti-bot deployment, the device attests only that it is a genuine Apple device: Apple acts as the attester and Cloudflare as the issuer, with no installed software. (The checks for OS version, jailbreak status, and login-window focus come from Cloudflare's separate Zero Trust device-posture work, where they were described as planned attributes.) The scarce resource is a device vouched for by its manufacturer. Mozilla's own design post says device attestation requires that “the hardware manufacturer be in overall control of the user’s device,” and calls both Private Access Tokens and Google's earlier proposal “ultimately hostile to users and to the openness of the web.”",
      'PACT is an attempt to widen the trust model so scarcity can come from other anchors: account standing, active subscriptions, verified phone numbers. That is a real difference in attacker economics. Hardware attestation forces a bot operator to acquire or emulate trusted devices. Contextual anchors force the operator to acquire or synthesize credentialed accounts, which can be automated through credential stuffing, bulk registration, stolen sessions, or cheap subscriptions bought in bulk. The Sybil problem does not disappear. It moves from the device to the account.',
      "The history is worth naming. Google's Web Environment Integrity proposal tried hardware-ish client attestation in 2023 and was withdrawn after months of criticism. PACT attests scarcity rather than client integrity, and the cryptography is far better, but the risk has the same shape: a small number of platforms deciding which clients count as legitimate. The question PACT inherits from WEI is a governance one: whether a trust oligopoly is acceptable if the credentials are anonymous.",
    ],
  },
  {
    heading: 'The browser is a convenience, not a trust anchor',
    paragraphs: [
      'The proposed design treats the browser as a trusted mediator of credential storage, issuer selection, challenge budgets, and redemption. A bot operator often controls the browser profile, the device, or both. The browser is a convenient API boundary for legitimate users, but it is not a trustworthy admission controller when the user agent itself is automated or compromised.',
      "The cryptographic unlinkability of PACT credentials does not fix this. It ensures a Credential can be presented without revealing which Anchor endorsed it or which user obtained it. Its value still depends entirely on the quality of the Anchor's admission process. Copy a browser profile that holds Endorsements and Credentials, and you hold that user's budget until the Moderator cuts it.",
    ],
  },
  {
    heading: 'Token farming and emulation',
    paragraphs: [
      "The attack surface is the supply side. If Endorsements can be harvested from compromised devices or bought from negligent Anchors, the system's integrity drops before any site sees a request. Rate limiting is PACT's purpose, but a rate limit is only as strong as the scarcity behind it. The open question is whether the limit holds across Anchors, or whether one person with ten cheap accounts at ten Anchors gets ten budgets. The IETF's 2024 rate-limited issuance draft expired. The work moved to the ARC and ACT drafts, on which PACT's designs depend.",
      "Without a hardware anchor, a bot operator does not need to defeat a secure enclave. They need to emulate whatever contextual signals the Anchor checks. If the Anchor relies on account standing, automate account creation or buy aged accounts. If it relies on subscription status, treat bulk subscriptions as an operating expense. If agent operators can run their own Anchors, an operator vouching for its own agents sets its own supply, limited only by which Moderators trust it. Third-party threat models, such as Krishna Gupta's, list token replay, token theft, Anchor impersonation, Sybil amplification, and metadata leakage. All of them follow from the fact that a software anchor can be duplicated, and none needs more than the ordinary economics of a credential that can be farmed.",
      'The designers accept part of this. In repository issue #11 they write that they “expect malicious bots to obtain PACT tokens,” and that to be useful at scale such bots would need to be well-behaved long enough to accrue access, which the Moderator can then cut. That is a reasonable bet against volumetric abuse. It is weaker against fraud that needs only a few well-aged credentials.',
    ],
  },
  {
    heading: 'The metadata trade-off',
    paragraphs: [
      'The privacy story is more complicated than the press release suggests. An Anchor knows which of its accounts received Endorsements and when. Unlinkable presentation protects the user at the site, but it does not hide the endorsement event from the Anchor. Hardware attestation, by contrast, pushes that burden onto the device manufacturer, which is a different concentration of trust but not necessarily a bigger one.',
      'The repository contains two serious mitigations. One proposal uses an aggregating issuer, which accepts credential transfers from multiple originating issuers and issues its own tokens, so origins see only the aggregator, and its unlinkability holds regardless of its behavior. Another sketch uses zero-knowledge proofs to hide which issuer produced a credential, removing the intermediary entirely. These are genuine improvements, and Mozilla’s design post adopts issuer blinding for the exchange of Endorsements for Credentials. Neither is yet a requirement of any specification. Until issuer hiding is mandatory, the practical privacy outcome depends on what implementers choose, and in every variant the Anchor keeps its view of who was endorsed.',
    ],
  },
  {
    heading: 'The ratchet',
    paragraphs: [
      'The centralization risk is hard to see because PACT tokens are initially optional friction-reducers. As adoption spreads, the absence of a token starts to carry information. Origins rationally adjust: token-bearing traffic sails through, untokened traffic gets challenged more aggressively, risk thresholds are recalibrated. No single actor decides to make tokens mandatory. It happens through incremental optimization across thousands of sites, and the risk is that the credential ends up required in practice.',
      'The casualties of that process are the traffic classes that have no issuer relationship: internet measurement systems, security researchers, archival crawlers, RSS readers, Tor users, and alternative browsers. Mozilla’s design says a user with no suitable Endorsements could bootstrap a Credential through today’s mechanisms, such as CAPTCHAs, account creation, or federated login, so the system “degrades to today’s experience.” That holds only while sites keep those paths open. My own inference, not a claim the cited sources make, is that the economics can then invert the stated purpose. Sophisticated bot operators can afford accounts, subscriptions, and vouches. Low-income users, unbanked users, and privacy-conscious people who refuse persistent platform identities could be priced out. A CAPTCHA can be solved without proving consumer status. A subscription-anchored token cannot.',
    ],
  },
  {
    heading: 'The issuer quality problem',
    paragraphs: [
      'PACT has no accreditation model for Anchors, and that is deliberate. Mozilla writes that Anchors “could be any website which has access to this kind of signal,” that each Moderator chooses which Anchors it trusts, and that “a new Anchor or a new Moderator can be adopted without coordinating with a dominant vendor.” Repository issues #4 and #12, the latter titled “Fragmentation vs. Centralization of Anchors,” debate exactly this trade. The price of that openness is the central security question of the design. A Credential proves that some trusted Anchor endorsed the user. It does not prove that a meaningful check occurred.',
      'Per-Moderator trust invites a classic adverse-selection problem. Low-quality Anchors can hand out cheap Endorsements, and Moderators that want to reduce friction will accept them because they convert more traffic. High-quality Anchors that do expensive vetting are undercut, and the market drifts toward lax endorsement. A malicious or compromised Anchor can endorse bots at scale, and because issuer blinding hides which Anchor backed a Credential, a Moderator cannot tell those Credentials from honest ones without some per-Anchor reputation. Mozilla proposes one: encrypted shares identifying the Anchor, aggregated with multiparty computation, as in Prio, to score each Anchor by the abuse it lets through. Blinding has a second cost, which Mozilla names: the initial balance has to be uniform across a Moderator’s Anchors, “which in practice means setting it at the strength of the weakest.” As of October 2026 the scoring is a sketch, and the public record has no Anchor directory, no process for removing a bad Anchor across Moderators, and no audit requirement.',
      "The result is a trust-proxy protocol. PACT inherits the security posture of whatever Anchors a Moderator trusts, and one origin-facing sketch already concentrates that choice: repository issue #6 has origins configuring up to two aggregating issuers and the credit cost per request. Nothing in the public record indicates a flaw in the anonymous-credential cryptography. The admission process is everything, and it is left to each Anchor.",
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
      "The standard critique of proposals like this is to declare them dead on arrival and move on. I think that is the wrong reflex here, for the same reason I take the BotGuard teardown seriously: the mechanism is real and the failure modes are structural. The first marker below pulls against PACT's open-participation goal. Moderators need a way to judge Anchors, and any central body that does the judging becomes the gatekeeper PACT was designed to avoid. With that tension stated, these are the markers that would make this design defensible:",
    ],
    after: (
      <ul className="mt-6 list-disc space-y-3 pl-6 text-lg leading-relaxed text-muted">
        <li>Published minimum criteria for Anchors and a specified, working Anchor-scoring mechanism, so each Moderator can judge Anchors without a central accreditor.</li>
        <li>Issuer hiding required by the specification, not left as an option.</li>
        <li>Rate limits that hold across Anchors, so one person with ten cheap accounts does not get ten budgets.</li>
        <li>Explicit fallback obligations, so origins that accept PACT must still serve clients without it, turning “degrades to today’s experience” from an expectation into a requirement.</li>
        <li>An answer on jurisdiction, data localization, and state issuers before standardization.</li>
      </ul>
    ),
  },
  {
    heading: 'Conclusion',
    paragraphs: [
      'The shift from hardware anchors to software and contextual anchors is not inherently more private, more decentralized, or more open. It relocates trust from device manufacturers to identity providers, payment platforms, and cloud intermediaries. That trade avoids the device-vendor gatekeeping that killed WEI, and it introduces a different set of problems: Sybil resistance becomes account-fraud resistance, Anchors gain metadata visibility, and users without platform relationships risk exclusion.',
      'The least controversial part of PACT is the cryptography. Anonymous credentials give plausible unlinkability at the Moderator, and they build on Privacy Pass, a mature, published architecture, even though the ACT and ARC drafts themselves are unfinished. The protocol\u2019s security ultimately depends on who is allowed to act as an Anchor and how tightly their admission process is controlled. That layer is still a sketch. Until it is specified, PACT is a trust-proxy protocol, and the web has a working precedent for where that ends: a small set of platforms acting as the gatekeepers of legitimacy, with a cryptographically elegant credential standing in for the admission decisions nobody standardized.',
    ],
  },
];

const sources = [
  {
    label:
      'Cloudflare, press release, June 22, 2026: "Cloudflare Collaborates With Leading Browsers to Develop a Privacy-First Protocol for the Global Internet"',
    url: 'https://www.cloudflare.com/press/press-releases/2026/cloudflare-collaborates-with-leading-browsers-to-develop-a-privacy-first-protocol-for-the-global-internet/',
    note: 'announcement, partner list, standardization commitment, "humans and bots" framing, stated CAPTCHA and tracking motivation',
  },
  {
    label: 'Mozilla Hacks, Dennis Jackson, June 23, 2026: "PACT: Anonymous Credentials for the Web"',
    url: 'https://hacks.mozilla.org/2026/06/pact-anonymous-credentials-for-the-web/',
    note: 'the designers’ technical description: Anchor, Endorsement, Moderator and Credential roles, issuer blinding, ACT state, agent path, Anchor scoring via multiparty computation, fallback to existing mechanisms, critique of device attestation, plan to bring drafts to the IETF and W3C',
  },
  {
    label: 'antifraudcg/proposals #22: the PACT proposal to the W3C Anti-Fraud Community Group (December 2025)',
    url: 'https://github.com/antifraudcg/proposals/issues/22',
    note: 'use cases, including unblocking browser AI agents; ARC and ACT as candidate building blocks',
  },
  {
    label: 'antifraudcg/pact, GitHub repository and issues (W3C Anti-Fraud Community Group)',
    url: 'https://github.com/antifraudcg/pact/issues',
    note: 'issue #1: issuer blinding sketch; issue #4: sources of scarcity and openness; issue #6: aggregating issuers, origins configure up to two and the credit cost per request; issue #11: malicious bot use of tokens; issue #12: fragmentation vs. centralization of Anchors',
  },
  {
    label: 'IETF, RFC 9576: "The Privacy Pass Architecture" (June 2024)',
    url: 'https://www.rfc-editor.org/rfc/rfc9576.html',
    note: 'Privacy Pass architecture and roles',
  },
  {
    label: 'IETF, RFC 9578: "Privacy Pass Issuance Protocols" (June 2024)',
    url: 'https://www.rfc-editor.org/rfc/rfc9578.html',
    note: 'the standardized issuance protocols (VOPRF and blind RSA)',
  },
  {
    label: 'IETF, draft-ietf-privacypass-arc-protocol: "Privacy Pass Issuance Protocol for Anonymous Rate-Limited Credentials"',
    url: 'https://datatracker.ietf.org/doc/draft-ietf-privacypass-arc-protocol/',
    note: 'ARC; latest revision -01, March 2, 2026, listed as expired on the datatracker in October 2026',
  },
  {
    label: 'IETF, draft-schlesinger-privacypass-act: "Privacy Pass Issuance Protocol for Anonymous Credit Tokens"',
    url: 'https://datatracker.ietf.org/doc/draft-schlesinger-privacypass-act/',
    note: 'ACT, individual draft; latest revision -01, February 13, 2026, listed as expired on the datatracker in October 2026',
  },
  {
    label: 'IETF, draft-ietf-privacypass-rate-limit-tokens: "Rate-Limited Token Issuance Protocol"',
    url: 'https://datatracker.ietf.org/doc/draft-ietf-privacypass-rate-limit-tokens/',
    note: 'earlier rate-limited issuance work; last revision -06, April 2024, expired',
  },
  {
    label: 'W3C TPAC 2026 breakout #29: "Bringing Private Access Control Tokens to the Web"',
    url: 'https://github.com/w3c/tpac2026-breakouts/issues/29',
    note: 'session proposed by Dennis Jackson and Samuel Schlesinger',
  },
  {
    label: 'Cloudflare Blog, August 6, 2026: "Building an open Agentic Internet"',
    url: 'https://blog.cloudflare.com/the-agentic-internet/',
    note: 'PACT presented as letting sites vouch anonymously for agents',
  },
  {
    label: 'Cloudflare Blog, 2022: "Eliminating CAPTCHAs on iPhones and Macs using new standard"',
    url: 'https://blog.cloudflare.com/eliminating-captchas-on-iphones-and-macs-using-new-standard/',
    note: 'anti-bot Private Access Tokens: Apple as attester, Cloudflare as issuer',
  },
  {
    label: 'Cloudflare Blog, June 22, 2022: "Verify Apple devices with no installed software"',
    url: 'https://blog.cloudflare.com/private-attestation-token-device-posture/',
    note: 'Zero Trust device-posture checks (planned attributes), a separate use from anti-bot tokens',
  },
  {
    label: 'hrbrmstr, ai.rud.is, June 23, 2026: "PACT: The open web doesn\'t need another trust oligopoly"',
    url: 'https://ai.rud.is/posts/2026-06-23-pact-the-open-web-doesnt-need-another-trust-oligopoly/',
    note: 'ratchet effect, WEI parallel, excluded traffic classes, token farming',
  },
  {
    label:
      'Krishna Gupta, August 3, 2026: "PACT — Private Access Control Tokens: A Privacy-Preserving Trust Architecture for Humans and AI Agents on the Web"',
    url: 'https://krishnag.ceo/blog/pact-private-access-control-tokens-a-privacy-preserving-trust-architecture-for-humans-and-ai-agents-on-the-web/',
    note: 'third-party threat model and attack scenarios, sovereignty',
  },
  {
    label:
      'TechTimes, June 5, 2026: Cloudflare CEO Matthew Prince on automated traffic passing humans',
    url: 'https://www.techtimes.com/articles/317877/20260605/bot-traffic-passes-humans-online-cloudflare-says-agentic-ai-drove-575-share.htm',
    note: '57.5 percent bots against 42.5 percent humans, measured on HTTP requests for HTML content',
  },
  {
    label:
      'TechTimes, June 23, 2026: "Cloudflare, Chrome, and Firefox Plan to Replace CAPTCHAs With Cryptographic Tokens"',
    url: 'https://www.techtimes.com/articles/318891/20260623/cloudflare-chrome-firefox-plan-replace-captchas-cryptographic-tokens.htm',
    note: 'press coverage of the announcement',
  },
  {
    label: 'Wikipedia: "Web Environment Integrity"',
    url: 'https://en.wikipedia.org/wiki/Web_Environment_Integrity',
    note: 'proposal abandoned, Chromium prototype removed November 2023',
  },
  {
    label: 'Companion essay: What client-side trust is actually worth',
    url: 'https://tomabel.ee/disclosures/what-client-side-trust-is-actually-worth/',
    note: 'the argument this report’s evidence supports',
  },
];

const disclosureParagraphs = [
  'This report is an analysis of public record: press releases, a design post, IETF documents, a public design repository, and published commentary. It touches no live system, discloses no vulnerability, and contains no private or client material. PACT is not deployed as of October 2026, so there is no vendor to coordinate with and no disclosure obligation. Cloudflare, Mozilla, and the other browser vendors were not contacted for comment; this analysis stands on the public record alone.',
  'Where the design changes, this analysis will need revisiting; the governance questions it raises will not. Research conduct follows the site’s ',
  'Disclosure: the author runs ProksiAbel OÜ, which builds Proksimity, a commercial server-side traffic identity-assurance product. PACT addresses the same bot- and agent-trust problem by other means, and could complement or compete with it.',
  'Corrections, 4 October 2026: an earlier version described PACT as a blind-signature Privacy Pass scheme with attester and issuer roles, attributed that mechanism to the press release, and listed rate-limited issuance as a missing safeguard; the report now follows the designers’ own description (Anchors, Endorsements, Moderators and Credentials built on ACT and ARC anonymous credentials, with rate limiting as the core goal). It also corrected the attribution of the attack-scenario list (Gupta, not the PACT repository), separated Cloudflare’s device-posture checks from anti-bot Private Access Tokens, quoted Mozilla directly instead of through commentary, noted that the 57.5 percent bot share counts HTML requests only, and dropped an unverifiable SourceFeed citation.',
];

const disclosurePolicyUrl = 'https://tomabel.ee/disclosure/';

export default function PactSoftwareAnchorTurnResearchPage() {
  return (
    <article>
      <ArticleHeader
        backTo="/disclosures"
        back={<>← Back to research</>}
        kicker={<>Research · Critical Analysis · Anti-Fraud</>}
        title={title}
        standfirst={standfirst}
        meta={[<>Published · August 28, 2026</>, <>Updated · October 4, 2026</>, <>14 min read</>, <>Tom Kristian Abel</>]}
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="sticky top-24">
            <ReaderRail sections={sections} backHref="/disclosures" backLabel="All disclosures" />
          </div>
        </aside>

        <div className="lg:col-span-9">
          <div className="max-w-measure space-y-6 text-lg leading-relaxed text-muted">
            {openingParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {sections.map((section, i) => (
            <section key={section.heading} id={sectionSlug(section.heading)} className="mt-16 max-w-measure scroll-mt-24">
              <p className="mb-4 label font-medium text-accent">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="font-display text-3xl leading-tight text-foreground">
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

          <section className="mt-16 max-w-measure">
            <h2 className="font-display text-3xl leading-tight text-foreground">
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

          <section className="mt-16 max-w-measure">
            <h2 className="font-display text-3xl leading-tight text-foreground">
              Related reading
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                The comparison above to a system I "take seriously" refers to{' '}
                <Link
                  to="/disclosures/botguard-disassembled"
                  className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent"
                >
                  BotGuard, disassembled
                </Link>
                , the teardown of Google's anti-fraud VM.
              </p>
            </div>
          </section>

          <section className="mt-16 max-w-measure">
            <h2 className="font-display text-3xl leading-tight text-foreground">
              Disclosure status
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-muted">
              <p>{disclosureParagraphs[0]}</p>
              <p>{disclosureParagraphs[2]}</p>
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
              <p>{disclosureParagraphs[3]}</p>
            </div>
          </section>
        </div>
      </div>

      <ArticleProof
        slug="pact-software-anchor-turn"
        expectedSha256="3560ae82f29aac80f41369c70c523965d4a894fc42baf960079d4cf4e85bbaf3"
      />
    </article>
  );
}
