import { Link } from 'react-router-dom';
import ReaderRail, { sectionSlug } from '../components/site/reader-rail';

type EssaySection = {
  heading: string;
  paragraphs: string[];
};

type Source = {
  label: string;
  url: string;
  note: string;
};

const title = 'The PIN that cannot be delegated — Smart-ID, AI agents, and eIDAS';

const standfirst =
  "Estonia's AI-agent builders keep asking the same question: why can't my agent hold the user's Smart-ID PIN and act for them? The short answer is that the PIN is the one thing the whole qualified-signature stack is built around not delegating. This report reads the documents that say so, and shows what delegation that actually works looks like.";

const openingParagraphs = [
  "A read-only analysis of public documents: SK ID Solutions' terms and conditions for qualified Smart-ID certificates, its certificate policy and remote-QSCD service practice statement, the Smart-ID public FAQ, the eIDAS Regulation, and the OAuth family of RFCs. No code was written, no live system was touched, and no testing was performed against any service. Every factual claim traces to a cited document; where practice guidance is offered it is flagged as such, and quoted text was fetched on 8 September 2026. Out of scope: PSD2 strong customer authentication, the notified-eID mutual recognition regime, and the ETSI standards that implement these requirements. This is a technical reading of public documents, not legal advice.",
];

const sections: EssaySection[] = [
  {
    heading: 'What the PIN actually gates',
    paragraphs: [
      'Smart-ID does not work the way a password manager works. There is no stored secret an agent could copy once and replay forever. The qualified-signing key never exists as a single value anywhere: SK\u2019s terms define the private key as something whose value "is never generated" and which "exists only in the form of its components" (TCU, definitions). One component lives in the app on the subscriber\u2019s phone, protected by the PIN; the signing operation itself runs as a threshold protocol with SK\u2019s server-side signing module.',
      'That division is spelled out in SK\u2019s remote-QSCD service practice statement (rQSCD SPS). The app\u2019s part of the private key is "protected by Subscriber\u2019s PIN and Subscriber needs to enter the PIN to the [app] for each transaction". The PIN value is never stored by the app, the PIN and its derived AES key are deleted after a single key-pair operation, and the activation data (SAD) that lets the signature module act "is passed to SAM in the Signature Activation Protocol" in a way designed so it "can be submitted only under sole control of the Subscriber by means that are in the possession of the Subscriber" (rQSCD SPS §6.2.8). The public FAQ states the same in plainer language: PIN1 authenticates, PIN2 signs, and "PIN-codes are not stored anywhere" (Smart-ID FAQ, "PIN codes: what are they?").',
      'Two PINs, two rules, one structure: each use of the key requires a fresh, human-supplied activation secret at the moment of use. There is no persistent unlocked state for an agent to steal or share.',
    ],
  },
  {
    heading: 'The documents already say no',
    paragraphs: [
      'The contract between SK and the subscriber is explicit about where that leaves automation and third-party use. The terms and conditions for qualified Smart-ID certificates prohibit, among other uses: enabling other parties to use the subscriber\u2019s private key (TCU §3.1.3); enabling the certificate issued for electronic signing to be used in an automated way (TCU §3.1.4); and, in the rQSCD service practice statement, enabling the activation data to be used in an automated way (rQSCD SPS §1.4.2).',
      'The subscriber-side duties run the same direction. The subscriber must ensure the private key "is used under his/her control" (TCU §5.2.8), must inform SK and revoke the certificates if the key may have been used without authorisation (TCU §5.2.11), and must revoke immediately if the private key or a PIN code "has gone out of his/her possession" (TCU §5.2.12). The Smart-ID security guidance tells users the same thing in non-contract language: do not share PIN1 or PIN2 "with anyone, not even family members or friends", and never enter a PIN for a transaction you did not initiate (Smart-ID FAQ, "How to keep your smart device and Smart-ID safe?").',
      'Which clause fires depends on the design. An agent that holds the PIN or activates the key without the subscriber entering it per transaction is a third party using the key material (TCU §3.1.3) and doing so automatically (TCU §3.1.4, rQSCD SPS §1.4.2). An agent that only relays the PIN through its own software is not automated use, but the PIN has still passed through something the subscriber does not control, and the subscriber\u2019s duty under TCU §5.2.12 to revoke once a PIN has left their possession does not wait for a dispute about how it left. TCU §5.2.11, which covers use without authorisation, applies when the agent acts without the subscriber\u2019s consent; a subscriber who wired the agent up has authorised the use, which is exactly why the risk lands on them rather than on the vendor.',
    ],
  },
  {
    heading: 'What eIDAS adds when a signature is qualified',
    paragraphs: [
      'For authentication, the rules above are contractual. For signing, a second layer applies, because Smart-ID\u2019s signing certificate is a qualified certificate (TCU §3, certificate types) and the signature is meant to be a qualified electronic signature (QES).',
      'The eIDAS Regulation (Regulation (EU) No 910/2014, as amended by Regulation (EU) 2024/1183) defines an advanced electronic signature as one that, among other things, is "created using electronic signature creation data that the signatory can, with a high level of confidence, use under his sole control" (Article 26(c)). A qualified electronic signature is an advanced signature created with a qualified signature creation device and a qualified certificate (Article 3, definitions), and under Article 25(2) it "shall have the equivalent legal effect of a handwritten signature".',
      'The consequence is structural, not procedural. Sole control is not a property of the person who clicks "I consent" on a settings screen. It is a property of the signing moment: the signature creation data must be under the signatory\u2019s control at the time the signature is created. If an agent activates the signing key, the signature is not created under the signatory\u2019s sole control, so it is not an advanced electronic signature under Article 26, so it cannot be a qualified electronic signature, and the Article 25(2) equivalence does not attach. A signature produced that way may still carry whatever evidential weight national law gives it under Article 25(1), but you have left the regime that makes it the digital equivalent of a handwritten signature.',
      'One nuance before the lawyers arrive: whether sole control under Article 26(c) is judged at the signing moment or as a design-level guarantee of the certified signing device is a live interpretive question, not a settled one. On the design reading, a signature produced through a certified device will in practice be treated as qualified unless sole control is affirmatively challenged, and as of writing no Estonian court has published a ruling on an agent-produced signature as far as the author knows. That does not rescue the PIN handover. Under either reading, handing the activation secret to an agent destroys the per-operation, high-confidence control that the certification was built on, and that is the point that matters here. Validation software never tests who entered the PIN, so an agent-made signature will usually still verify; the fight, when there is one, happens later, and the subscriber carries the burden of explaining why a signature made with their certificate should not stand.',
      'One caveat on scope: eIDAS sole control governs signatures, not sessions. PIN1 authentication is not a signature, and nothing in eIDAS stops a user from granting an agent a token that their own authentication produced. What the contract stops is the agent performing the authentication itself: TCU §3.1.3 prohibits enabling another party to use the private key, and that clause covers both certificates, not just the signing one. Delegating the result of authentication and delegating the act of authenticating are different operations, and the pattern recommended below depends on that distinction.',
    ],
  },
  {
    heading: 'Why "delegated credentials" do not change this',
    paragraphs: [
      'The counter-argument is usually some version of "we\u2019ll issue the agent a delegated credential". The phrase sounds technical and modern, which makes it a convenient wrapper for a PIN handover. It is worth being precise about what it can and cannot mean.',
      'Delegation of authority and delegation of a credential are different operations. The first means the user authorises the agent to act within a defined scope. The second means the agent can activate the user\u2019s key or produce a qualified signature on its own. Nothing in the framework forbids the first. Everything in it forbids the second: eIDAS requires signature creation data to remain under the signatory\u2019s sole control (Article 26(c)), and SK\u2019s practice statement implements that by keeping the activation secret per-operation and inside the subscriber\u2019s possession (rQSCD SPS §6.2.8).',
      'A delegated credential that the agent can activate without the human is not a delegation in any sense the regulation recognises. It is a credential handover, and the documents above treat a credential handover as a revocation event, not a design option. A delegated credential that still requires the human to perform the PIN step at signing time is real delegation, but it is not new technology: it is the ordinary consent flow with extra machinery around it, and the PIN step is precisely the part the agent cannot absorb.',
      'There is also a naming trap. In TLS, "delegated credentials" (RFC 9345) mean something entirely different: a short-lived key a server presents on behalf of its certificate holder so that the certificate itself stays out of day-to-day use. It is a server-side TLS mechanism with nothing to say about a human\u2019s signature PIN. The term is doing too much work in these conversations; the first question to ask when someone proposes "delegated credentials" for agent signing is which protocol they mean.',
    ],
  },
  {
    heading: 'The pattern that works: delegate authority, keep the credential',
    paragraphs: [
      'The identity world solved this general problem years before agents existed. OAuth 2.0 (RFC 6749) was designed to give third parties scoped access without handing them the user\u2019s credentials. It replaces credential sharing with access tokens: the user authenticates once, and the third party receives a token that is limited in scope, audience, and lifetime, and can be revoked without rotating the underlying credential. RFC 8693 extends the model to token exchange with delegation or impersonation semantics.',
      'Mapped onto Smart-ID, the compliant pattern is: (1) the user authenticates with Smart-ID (PIN1) to the service that owns the agent, as a human; (2) that service issues the agent a scoped, short-lived, audience-bound token representing the user\u2019s authorisation for a defined task set, bound to the agent where possible (sender constraint, client certificate or equivalent), never the user\u2019s Smart-ID credential; (3) for anything that must be a qualified electronic signature, the flow stops and the user signs with Smart-ID (PIN2) themselves, on their own device, with the transaction details in front of them.',
      'The last step is where the design lives or dies. The PIN is entered only into the Smart-ID application itself. Agent software never captures, relays, or stores it, and the user approves only what the Smart-ID app renders for the transaction the relying party initiated. Any prompt rendered by the agent is a replay of the signing-relay class that this site\u2019s Smart-ID research describes.',
      'The agent gets authority. The user keeps the credential. Every document cited in this report is compatible with steps 1 and 3; the entire weight of them falls on anyone who tries to skip to a world where step 3 happens without the human.',
    ],
  },
  {
    heading: 'What this does not fix',
    paragraphs: [
      'Reading the documents is not the same as holding the line, and three limits deserve to be stated plainly.',
      'First, this is a document-level analysis. A contract clause does not enforce itself: the mechanisms that actually stop an agent from using a leaked PIN are the same ones that stop a fraudster, and the site\u2019s prior Smart-ID research shows how the approval layer can fail socially even when the protocol holds. An attacker who can talk a user into approving a transaction does not need to automate the PIN at all. Social engineering is a separate problem, and that earlier research is the better reference for it.',
      'Second, "compliant" and "enforced" are different words. A bank or service provider may tolerate automation in practice, particularly for low-risk PIN1 flows, and SK\u2019s own documents are what SK publishes rather than what every relying party audits. Banks also layer PSD2 strong customer authentication rules on top for payment contexts, which this report does not analyse. But tolerance is not authorisation, and the asymmetry matters: the subscriber carries the revocation duty under TCU §5.2.12 if a PIN leaves their possession, so the person who loses in a dispute is the user, not the agent vendor.',
      'Third, none of this is legal advice, and SK\u2019s terms are amended from time to time. Anyone building an agent against Smart-ID should check the current terms with SK or their relying party rather than take this reading as the final word. The reading here reflects the documents as published on 8 September 2026.',
    ],
  },
];

const sources: Source[] = [
  {
    label: 'SK ID Solutions AS, "Terms and Conditions for Use of Certificates of Qualified Smart-ID"',
    url: 'https://www.skidsolutions.eu/wp-content/uploads/2026/03/SK-TCU-EID-QUALIFIED-SMART-ID-EN-20260501.pdf',
    note: 'valid from 1 May 2026 (SK-TCU-EID-QUALIFIED-SMART-ID-EN)',
  },
  {
    label: 'SK ID Solutions AS, "SK-rQSCD Management of Remote Qualified Electronic Signature Creation Device Service Practice Statement"',
    url: 'https://www.skidsolutions.eu/wp-content/uploads/2026/03/SK_ID_Solutions_AS_rQSCD_Service_Practice_Statement_v.1.0_20260501.pdf',
    note: 'version 1.0, effective 1 May 2026',
  },
  {
    label: 'Smart-ID FAQ, "PIN codes: what are they?"',
    url: 'https://www.smart-id.com/help/faq/pin-codes/pin-codes-what-are-they/',
    note: '',
  },
  {
    label: 'Smart-ID FAQ, "How to keep your smart device and Smart-ID safe?"',
    url: 'https://www.smart-id.com/help/faq/security/how-to-keep-your-smart-device-and-smart-id-safe/',
    note: '',
  },
  {
    label: 'Regulation (EU) No 910/2014 (eIDAS), in particular Articles 3, 25 and 26, as amended by Regulation (EU) 2024/1183',
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32014R0910',
    note: '',
  },
  {
    label: 'RFC 6749, "The OAuth 2.0 Authorization Framework"',
    url: 'https://www.rfc-editor.org/rfc/rfc6749',
    note: '',
  },
  {
    label: 'RFC 8693, "OAuth 2.0 Token Exchange"',
    url: 'https://www.rfc-editor.org/rfc/rfc8693',
    note: '',
  },
  {
    label: 'RFC 9345, "Delegated Credentials for TLS and DTLS"',
    url: 'https://www.rfc-editor.org/rfc/rfc9345',
    note: '',
  },
];

const disclosureParagraphs = [
  'No vulnerabilities were found, tested, or exploited. No live systems were contacted. This is a document-analysis report based entirely on publicly available material, so there is nothing to coordinate with SK ID Solutions, CERT-EE, or any relying party before publication. Disclosure posture: none required. SK ID Solutions has not reviewed or endorsed this reading.',
  'The author has published prior Smart-ID protocol research, disclosed to the vendor before publication, and works professionally on identity and anti-fraud systems; that is the context in which this reading should be judged. Research conduct follows the site\u2019s ',
];
const disclosurePolicyUrl = 'https://tomabel.ee/disclosure/';

export default function ThePinThatCannotBeDelegatedResearchPage() {
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
            Research · Analysis · Smart-ID / eIDAS
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
            {title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted md:text-2xl">
            {standfirst}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="border border-border bg-white/[0.03] px-3 py-2">Published · September 8, 2026</span>
            <span className="border border-border bg-white/[0.03] px-3 py-2">11 min read</span>
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
              The PIN is signature activation data: fresh per operation, never stored, and required to stay under the subscriber’s sole control. A scheme that hands it to an agent is a credential handover, not delegation; the compliant pattern is scoped tokens plus a human PIN step at signing time.
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
                  {source.note ? (
                    <span className="text-muted-foreground"> — {source.note}</span>
                  ) : null}
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
    </article>
  );
}
