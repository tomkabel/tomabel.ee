import { Link } from 'react-router-dom';

type ReportSection = {
  heading: string;
  paragraphs: string[];
};

const title = "The Achilles' heel of Estonia's e-state — Smart-ID / eID research";
const standfirst =
  "Estonia's e-state runs on an authentication system with two very different halves. The cryptographic core is strong: endpoint-level attacks against Smart-ID fail by design. The other half, the approval screen a user actually looks at, is soft. This report covers both. It walks through why a MITM or SK-endpoint-replacement attack is infeasible (certificate pinning, IP+UUID authentication, the ACSP_V2 signing protocol), then examines the interactive signing-relay class of attack against Smart-ID+ cross-device flows, where a victim is shown a legitimate login through a live remote browser and ends up authorizing their own fraud. The gap between the two halves is where the e-state's trust model currently fails.";

const openingParagraphs = [
  'Two research threads feed this report. The first is a MITM feasibility analysis (May 2026) built on the public SK-EID relying-party API documentation: endpoint authentication, signature protocols, and the official response-verification checklist. The second is my analysis of the Smart-ID+ cross-device QR flow, carried out with a containerized proof of concept in a research environment (Docker, local test domains, and SK\u2019s own public demo portal as the target). The PoC work was authorized by Arnis Paršovs of the University of Tartu and was disclosed to the vendor ahead of release. No live bank system was attacked or probed during this research. Operational detail is deliberately left out of this report; the point is the class of attack and what it means, not a step-by-step playbook.',
  'Two limits apply. Bank front-ends change frequently, so anything specific to a bank\u2019s page will drift. And the PoC\u2019s automation was validated against a research environment, not production bank flows; the claims here about what the relay can do are architectural, not a report of a demonstrated live-bank break. The analysis reflects the public record as of August 2026.',
];

const sections: ReportSection[] = [
  {
    heading: 'The endpoint attack fails by design',
    paragraphs: [
      'The obvious way to attack Smart-ID is to stand between the bank and SK ID Solutions: intercept the traffic, replace the endpoint, answer the bank\u2019s requests yourself. This does not work, and the protocol is explicit about why.',
      'The Smart-ID relying-party API requires every integration to pin the endpoint\u2019s certificate. From the official API documentation: the RP must "verify the X.509 certificate of the HTTPS endpoint belongs to the well-known public key of the Smart-ID API. The RP must implement HTTPS key (or certificate) pinning." That is an application-layer check, not a TLS nicety. A fake SK server with a different certificate is rejected regardless of DNS, proxy, or CA compromise.',
      'The bank itself is authenticated in the other direction, by a different mechanism: "RP API clients are authenticated based on their originating IP-address and relyingPartyUUID protocol parameter combinations." An attacker who has already won the network still cannot impersonate a bank to SK, because the trust is keyed to IP plus UUID, not to the network path.',
      'There is also no server side to clone. A survey of public Smart-ID implementations turns up client libraries for PHP, Java, Rust, Go, Ruby, and Django integrations. All of them are relying-party consumers. There is no open-source implementation of the SK-side infrastructure (account registration, mobile app communication, session management, certificate lifecycle). The server is proprietary, which is a defensible design decision: there is nothing to download and self-host.',
    ],
  },
  {
    heading: 'The signing key never leaves the phone',
    paragraphs: [
      'Even with full network access, the attacker cannot forge the response itself. Authentication in Smart-ID uses the ACSP_V2 signature protocol. The phone signs a constructed message binding together random values from all three parties: the literal prefixes "smart-id" and "ACSP_V2", the server random, the RP challenge, the user challenge, the Base64-encoded relying-party and brokered-RP names, a Base64-encoded SHA-256 of the interactions, the interaction type, the initial callback URL, and the flow type. The digest is the hash of that UTF-8-encoded message.',
      'The signature is made with the user\u2019s private key, which is generated and stored inside the Smart-ID app and never leaves the device. The bank verifies it against the user\u2019s certificate, and the official response-verification checklist covers session secrets, response state and result, the user challenge, certificate chain validation against the configured trust anchors (SK\u2019s roots), scheme and certificate-purpose checks, assurance level, identity match, signature verification, session invalidation, and signed-document visibility. The signature check is the hammer. The attacker would need the user\u2019s private key, and the only ways to get it are physical access to the phone plus knowledge of the PIN.',
      'The MITM conclusion follows: no amount of network access lets an attacker forge an authentication or signing response. Whatever is wrong with Smart-ID, it is not the protocol layer.',
    ],
  },
  {
    heading: 'The weak point moved to the approval screen',
    paragraphs: [
      'The attack surface that actually gets exploited is the consent step, and it has been for years. Large-scale phishing in Estonia began in 2019, when banks phased out password cards and moved customers to Smart-ID. Arnis Paršovs, a cybersecurity researcher at the University of Tartu, made the uncomfortable comparison in an ERR opinion piece in January 2026: password cards were clunky, but a scammer on the phone had to explicitly ask a victim for passwords, which raised suspicion. With Smart-ID, all the scammer needs is for the victim to confirm a request. That is exactly how the system is designed to be used. Payments authorized with password cards had daily limits of a few hundred euros; banks introduced no comparable limits for Smart-ID despite its known issues.',
      'The scale of the problem is now public. RIA, Estonia\u2019s Information System Authority, reported that people in Estonia lost 29 million euros to fraudsters in 2025, three times the year before. Eesti Pank counted 13.5 million euros in payment fraud in 2024, up 4 percent. The mechanics are textbook vishing: a caller posing as a bank employee or police officer, a story about an unauthorized transaction, and repeated requests to enter PIN1 and PIN2. The same RIA writeup describes a nonprofit organization that lost over 120,000 euros this way, after a fake "switchboard installer" call led to a fake police officer, which led to repeated PIN entries.',
      'Paršovs\u2019 central argument is that the burden is placed on the wrong party. The main security weakness of Smart-ID is that its safety depends entirely on users being able to recognize phishing websites or verify the identity of callers. Decades of empirical research show the average user\u2019s ability to identify phishing is close to random guessing, and even technically knowledgeable users are frequently fooled by well-crafted pages. Meanwhile banks warn customers not to approve Smart-ID requests during suspicious calls, and their own helplines identify customers with the very same method. His summary line is worth quoting in full: "Human error is expected and safety must be built into the system."',
      'Paršovs\u2019 counterfactual makes the point sharper: every Estonian resident has an ID card whose authentication is phishing-resistant. An ID-card authentication performed on a phishing website cannot be reused by an attacker to impersonate the user at a bank. No bank advises customers to use the ID card, because that would require acknowledging Smart-ID\u2019s weakness.',
    ],
  },
  {
    heading: 'Smart-ID+ closes the call-based gap, and most banks have not deployed it',
    paragraphs: [
      'SK introduced Smart-ID+ in June 2025. Instead of the bank initiating a request the user then confirms, the user initiates the operation themselves by scanning a QR code. That makes call-based phishing dramatically harder, because there is no incoming request to be tricked into approving. The feature can go further: as Paršovs notes, when the flow is initiated on the same mobile device that runs the Smart-ID app, the process becomes fully phishing-resistant, matching the ID-card level.',
      'Adoption is the problem. As of Paršovs\u2019 January 2026 article, only LHV had enabled the verification-code feature, a separate feature from Smart-ID+, which requires the user to check a code by selecting the correct one from multiple choices. LHV subsequently rolled out Smart-ID+ login across its Internet Bank from 16 June 2026, a year after SK shipped the feature. Paršovs is blunt about why the rest of the market lags: Swedbank and SEB, which dominate Estonia\u2019s retail banking market, are among the owners of SK ID Solutions, giving them an obvious interest in promoting Smart-ID and downplaying concerns about its security. SK\u2019s paying customers are banks and service providers, not users. Convenience wins, and users cannot opt into stronger security even if they want it.',
      'The institutional conflict is worth sitting with. The company that builds the national authentication rail is owned by the companies that decide whether to harden it. That is a misaligned incentive structure, and it has a measurable consequence: a phishing-resistant feature shipping in June 2025, and one bank using it publicly a year later.',
    ],
  },
  {
    heading: 'The signing relay: attacking the flow, not the crypto',
    paragraphs: [
      'The Smart-ID+ QR flow closes the call-based gap, but it opens a new question: what happens when the QR code the user scans is generated inside a context the attacker controls? The answer is the interactive signing-relay class of attack. This is the finding this report exists to document.',
      'Static phishing pages fail against Smart-ID+ for a concrete reason: a dynamic QR code will not be generated in a phishing context, because the legitimate service controls the session that mints it. The relay solves that by not cloning the page at all. Instead of a fake login form, the attacker serves a fake browser window, rendered in HTML and CSS, that embeds a live stream of a real browser session running in a container. The victim sees the legitimate login portal, the legitimate QR code, the legitimate SSL indicators. They are looking at the real thing, relayed pixel by pixel.',
      'The victim logs in, or scans the QR code, inside that remote session. The session cookie lands in the attacker\u2019s browser, not the victim\u2019s. From here the attack becomes an interactive relay. The attacker\u2019s automation watches the authenticated session, initiates a sensitive operation such as a transfer, and the bank responds with a PIN2 challenge carrying a four-digit verification code. The attacker reads that code from the page and mirrors it into the fake window the victim is watching, with a message telling the victim to enter the code and confirm with PIN2. The victim checks their phone, sees the same code, and approves. They have just authorized the attacker\u2019s transaction, and every security indicator they checked said the operation was legitimate, because the code they verified was genuine. It was just verified against the attacker\u2019s presentation of it, not the bank\u2019s.',
      'The relay defeats the verification-code mitigation structurally. A code that exists to bind an approval to its context is only as good as the context it is displayed in, and the relay controls the display. It also defeats the drag test, the usual advice for spotting browser-in-the-browser tricks: a real popup can be dragged off the browser onto the desktop, a fake one cannot. That heuristic assumes the victim knows to run it.',
      'One honest caveat. This attack class was implemented as a proof of concept in a research environment against SK\u2019s public demo portal, with automation for the relay pipeline. It was disclosed to the vendor, whose assessment, per the research file, classified the risk as known and accepted. The pipeline was implemented and the mechanism demonstrated piecewise in the research environment; an end-to-end run of the full relay chain was still pending when this report was written. The claim here is not that this exact chain has been run against a live bank; it is that the architecture of cross-device QR flows makes the relay possible, and that the verification-code mitigation does not stop it. The production flow does not change the underlying design.',
    ],
  },
  {
    heading: "What this says about the e-state's trust model",
    paragraphs: [
      'Two facts have to be held together. The protocol layer of Smart-ID is genuinely strong, and the approval layer is genuinely weak. Both are true, and most public arguments about Smart-ID pick one and ignore the other.',
      'The relay attack is the sharpest form of the second fact, but it is not a new failure class. It is the same failure as the 2019-era vishing, upgraded. In vishing, the attacker deceives the user into approving a request they cannot inspect. In the relay, the attacker lets the user inspect everything, and then controls what they inspect. The vector is different; the structural problem is the same: the approval is not bound to the context it is approving. The phone reports that the user approved. It cannot report what the user was shown, because it never sees it.',
      'That is the same lesson as client-side trust generally. Any attestation produced by a device is a report from a machine you do not control. It is a signal, never a verdict. The signing key on the phone is doing real cryptographic work, but the decision being signed is made by a human looking at a screen, and that screen is the attacker\u2019s territory.',
      'The cost of the gap is visible in national numbers: 29 million euros lost in 2025, three times the year before, with Smart-ID approval abuse recurring through the cases RIA describes. That banks chose not to fix the weakness, and that the state is left managing the consequences, is Paršovs\u2019 argument, and the fraud statistics support it. And the accountability structure makes it worse. By law, banks are not obliged to refund fraudulent payments if they were authorized with the method agreed with the bank. The party with the least information, the user, carries the loss; the parties that chose the authentication method, the banks and the vendor they own, carry nearly none. Paršovs\u2019 framing is that the security breach happens earlier than the PIN2 confirmation, at the moment the bank grants a scammer access to the account in the first place, and victims should stop blaming themselves and seek compensation from their bank instead.',
    ],
  },
  {
    heading: 'Fixes that would actually move the numbers',
    paragraphs: [
      'Every fix below already exists somewhere in production.',
      'Make the verification-code check mandatory. The multiple-choice verification code exists and one bank uses it. It is not a silver bullet, as the relay shows, but it raises the cost of call-based attacks and closes the simplest paths. A regulator can require it: Finantsinspektsioon supervises banks, and RIA sets the national cyber requirements. Either can move.',
      'Make Smart-ID+ the default, with the same-device flow where it is available. This is the one measure that genuinely closes both vishing and the relay: a flow initiated by the user on the device that holds the key, with no QR relay surface. A year after release it is publicly deployed at one bank.',
      'Bind the approval to the transaction, not just to a code. The approval screen should show the amount, the payee, and the purpose, and the app should refuse to approve when that context is missing. Transaction context shifts the burden: the phone shows the real payee and amount, so an attacker must display the true transaction and hope the victim does not notice they never initiated it.',
      'Shift the liability. If banks choose the authentication method, banks should carry the fraud loss when that method is phished, the way card schemes do for contactless. The current structure, where the user carries the loss for a decision the bank made, is the real reason the fixes are not deployed. Liability is the only lever that has historically moved banks.',
      'Use the regulatory floor. NIS2, whose transposition deadline passed in October 2024, covers the banking sector. eIDAS 2.0, in force since May 2024 with obligations phasing in through 2026 and 2027, will require relying parties to accept EUDI-wallet authentication. Consent-flow design belongs in that floor: an authentication method whose security depends on the user recognizing phishing is not a security method by any standard these regulations would recognize.',
      'None of this requires new cryptography. The protocol was never the weak link. The strongest part of the system is trusted to protect the weakest part, and the weakest part is a human looking at a screen the attacker can control.',
    ],
  },
];

const sources = [
  {
    label: 'SK-EID, Smart-ID Relying Party API technical description',
    url: 'https://sk-eid.github.io/smart-id-documentation/rp-api/api_details.html',
    note: 'endpoint authentication, IP+UUID authentication',
  },
  {
    label: 'SK-EID, Implementing HTTPS pinning',
    url: 'https://sk-eid.github.io/smart-id-documentation/https_pinning.html',
    note: 'mandatory certificate pinning for RPs',
  },
  {
    label: 'SK-EID, Signature protocols',
    url: 'https://sk-eid.github.io/smart-id-documentation/rp-api/signature_protocols.html',
    note: 'ACSP_V2 message construction',
  },
  {
    label: 'SK-EID, Response verification',
    url: 'https://sk-eid.github.io/smart-id-documentation/rp-api/response_verification.html',
    note: 'the named checks RPs must run',
  },
  {
    label: 'Arnis Paršovs, "Banks fail to implement measures against Smart-ID phishing", ERR, January 2026',
    url: 'https://news.err.ee/1609910821/arnis-parsovs-banks-fail-to-implement-measures-against-smart-id-phishing',
    note: '2019 password-card phase-out, Smart-ID+ and verification codes, ownership and incentives',
  },
  {
    label: 'RIA, "A surge in scams costs Estonian people 29 million euros", Cyber Security in Estonia 2026',
    url: 'https://www.ria.ee/en/surge-scams-costs-estonian-people-29-million-euros',
    note: '2025 fraud losses, vishing case studies',
  },
  {
    label: 'Eesti Pank, "The average loss in bank transfer frauds last year was 1,500 euros", December 2025',
    url: 'https://www.eestipank.ee/en/press/average-loss-bank-transfer-frauds-last-year-was-1500-euros-03122025',
    note: '13.5 million euros in payment fraud in 2024',
  },
  {
    label: 'LHV, "LHV introduces Smart-ID+ solution", June 2026',
    url: 'https://www.lhv.ee/en/news/2026/33',
    note: 'Smart-ID+ login from 16 June 2026',
  },
  {
    label: 'SK ID Solutions, About',
    url: 'https://www.skidsolutions.eu/about/',
    note: 'founded 2001 by Swedbank, SEB Bank and Telia Eesti',
  },
  {
    label: 'BSides Tallinn 2026, event and call for papers',
    url: 'https://openssf.org/event/cfp-bsides-tallinn-estonia/',
    note: 'September 24-25, 2026, Tallinn',
  },
  {
    label: 'Companion essay: Coordinated disclosure in a small country',
    url: 'https://tomabel.ee/writing/coordinated-disclosure-in-a-small-country/',
    note: 'what national-infrastructure disclosure looks like in Estonia',
  },
  {
    label: 'Companion essay: What client-side trust is actually worth',
    url: 'https://tomabel.ee/writing/what-client-side-trust-is-actually-worth/',
    note: 'the argument this report\u2019s evidence supports',
  },
];

const disclosureParagraphs = [
  'The MITM feasibility analysis is a documentation review. It probed no live system and disclosed nothing new; every protocol claim traces to SK\u2019s published API documentation.',
  'The signing-relay analysis was carried out in a containerized research environment (Docker, local test domains, SK\u2019s public demo portal as target), authorized by Arnis Paršovs of the University of Tartu. Per the research file, the findings were disclosed to SK ID Solutions ahead of public release, and the vendor assessed the risk class as known and accepted. The work was scheduled for presentation at BSides Tallinn in September 2026.',
  'This report deliberately omits operational detail: no selectors, no message patterns, no automation steps. It describes the attack class and its implications. Research conduct follows the site\u2019s ',
];

const disclosurePolicyUrl = 'https://tomabel.ee/disclosure/';

export default function SmartIdAchillesHeelResearchPage() {
  return (
    <article>
      <header className="relative overflow-hidden border-b border-border px-6 pb-20 pt-24">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]" />
        <div className="relative mx-auto max-w-4xl">
          <Link
            to="/research"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-accent hover:underline"
          >
            ← Back to research
          </Link>
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Research · Disclosed Research · Smart-ID
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
            {title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted md:text-2xl">
            {standfirst}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="border border-border bg-white/[0.03] px-3 py-2">Published · August 11, 2026</span>
            <span className="border border-border bg-white/[0.03] px-3 py-2">14 min read</span>
            <span className="border border-border bg-white/[0.03] px-3 py-2">Tom Kristian Abel</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="sticky top-24 border border-border bg-white/[0.02] p-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              Thesis
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The cryptographic core of Smart-ID is sound. The trust anchor is a human looking at an approval screen, and the approval is never bound to the context it approves. That is where the e-state's trust model fails.
            </p>
          </div>
        </aside>

        <div className="lg:col-span-9">
          <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-muted">
            {openingParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {sections.map((section) => (
            <section key={section.heading} className="mt-16 max-w-3xl">
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
              <p>{disclosureParagraphs[1]}</p>
              <p>
                {disclosureParagraphs[2]}
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
