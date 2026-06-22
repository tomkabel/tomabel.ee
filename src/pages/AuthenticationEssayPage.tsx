import React from 'react';
import { Link } from 'react-router-dom';

type EssaySection = {
  heading: string;
  paragraphs: string[];
};

const title = "I used to break authentication. Here's what that taught me about building it.";
const standfirst = 'The thesis essay for everything else on this site: why understanding offense is a prerequisite for credible defense, and what the authentication arms race looks like from both sides.';
const essayUrl = 'https://tomabel.ee/writing/i-used-to-break-authentication';

const openingParagraphs = [
  'For a while, I made money by understanding authentication better than the people deploying it.',
  'That sentence is not branding. It is not a tease. It is the plainest summary of the part of my background that matters most to the rest of this site. I spent years learning where authentication systems actually fail: not in the diagrams, not in the product pages, not in the compliance checklists, but in the seam between what a system claims to verify and what it truly verifies under pressure.',
  'That history led to consequences I take full responsibility for. What I kept from it was the way of seeing.',
  'Once you have taken authentication apart for a living, you stop being impressed by the ceremony around it. You start noticing how many security programs confuse friction for assurance, how many teams mistake vendor language for threat models, and how often "strong authentication" means "strong under ordinary use, brittle under adversarial use." That difference is the whole game.',
  'This is the thesis essay for everything else I write here. The shorter version is simple: credible defense requires offensive understanding. Not because every defender needs to become an attacker, and not because offense is glamorous, but because attackers are the people who force systems to answer the question they were designed to avoid: what, exactly, are you trusting here?',
];

const sections: EssaySection[] = [
  {
    heading: 'Offense teaches you what the system is really verifying',
    paragraphs: [
      'Authentication is often described at the wrong level of abstraction. People talk about passwords, OTPs, passkeys, device binding, biometrics, risk engines, browser signals, or identity proofing as if the presence of those components says much by itself. Usually it does not.',
      'What matters is the verification claim hiding beneath the interface.',
      'When a system says it has authenticated a user, what has it actually established?',
      'Has it established that the right person is present? That the right device is present? That a cryptographic secret is present? That the browser has not been tampered with? That a session originated from a trustworthy context? That a human is making the decision? That the decision is informed? That the approval is bound to the transaction being approved?',
      'Those are very different claims. They fail in different ways. They compose badly when the designer does not understand which claim each layer is making.',
      'Offensive work forces precision here because attackers do not care what a control was supposed to mean. They care what they can relay, replay, proxy, emulate, downgrade, exhaust, socially route around, or make the user approve anyway.',
      'That is why the offensive lens is so clarifying. It strips away intention and leaves only mechanics.',
      'A login flow may look modern and still be structurally weak. A phishing-resistant method may still be embedded in a recovery flow that collapses back to email. A device fingerprint may look sophisticated and still amount to a negotiable client-side suggestion. An anti-fraud model may be expensive and still be fed attacker-controlled inputs from a machine the attacker owns.',
      'Attackers are not impressed by layered defenses if the layers rest on the same broken assumption.',
    ],
  },
  {
    heading: 'The attacker sees the whole route, not the isolated control',
    paragraphs: [
      'Defenders often evaluate controls one at a time. Attackers evaluate pathways.',
      'That distinction matters more than most architecture diagrams admit.',
      'An attacker does not ask whether your MFA is strong in isolation. They ask whether account recovery is weaker. They ask whether support channels can be manipulated. They ask whether session upgrade flows are less protected than initial login. They ask whether a high-assurance authentication event can be followed by low-assurance authorization changes. They ask whether a passkey can be defeated not cryptographically, but operationally, by steering the user into approving the wrong thing in the right interface.',
      'This is the part many organizations miss when they talk about "bypassing MFA." In practice, authentication is rarely defeated as a single component. It is more often displaced. The attacker finds the cheaper adjacent route: the fallback flow, the handoff, the human escalation path, the mobile prompt without meaningful transaction context, the browser trust signal that can be copied, the recovery step everyone assumes "probably won\'t matter much."',
      'The offensive mindset is useful because it thinks in terms of substitution, not confrontation.',
      'Very few systems are broken head-on. Many are broken diagonally.',
    ],
  },
  {
    heading: 'Most authentication fails at the boundary, not the center',
    paragraphs: [
      'There is a reason so much of my work orbits browser defenses, anti-fraud systems, identity protocols, and session trust. Those are boundary problems. They live where one trust domain must make claims about another.',
      'The center of a cryptographic protocol can be elegant and sound. The boundary is where chaos enters.',
      'A server must infer things about a client it does not control. A relying party must trust an upstream identity assertion it did not witness being created. A fraud engine must reason from signals gathered on attacker-owned devices. A helpdesk must decide whether the person asking for access is the person who ought to get it. A user must interpret a prompt correctly while under time pressure and partial information.',
      'Every one of those is a translation problem. Most are lossy.',
      'Offensive experience makes you skeptical in the right way. It teaches you that the interesting question is not whether the protocol is strong on paper. The interesting question is where the proof degrades when it crosses a boundary: from device to server, from cryptographic event to business decision, from identity event to session continuity, from technical fact to human judgment.',
      'This is why "secure by design" is harder than it sounds. It is not just about choosing stronger primitives. It is about making sure your system\'s security claim survives contact with the interfaces around it.',
    ],
  },
  {
    heading: 'The arms race is asymmetrical, and that changes how defense must be built',
    paragraphs: [
      'From the offensive side, the economics are obvious. The attacker only needs one route that is cheap, repeatable, and difficult to detect at scale. The defender needs the whole path to hold together, including the boring parts that nobody wants to present on stage.',
      'That asymmetry is why authentication keeps becoming an arms race.',
      'Defenders add more signals. Attackers learn to simulate them.',
      'Defenders add browser integrity checks. Attackers instrument the browser, emulate the environment, or steal the post-check artifact instead of passing the check honestly.',
      'Defenders add MFA. Attackers introduce real-time phishing proxies, consent fatigue, helpdesk pretexting, or malware that rides the user\'s legitimate session.',
      'Defenders harden the login. Attackers move to session theft, recovery abuse, delegated access, or workflow manipulation after login.',
      'Defenders deploy machine learning for fraud. Attackers learn the features, poison the signals, or change tempo until they fall beneath action thresholds.',
      'None of this means defense is futile. It means static defense is futile.',
      'The job is not to build an unbreakable authentication system. That is fantasy. The job is to build one whose security claims are explicit, whose failure modes are understood, whose compromise paths are expensive, and whose surrounding operations are designed to notice and contain what inevitably gets through.',
      'In other words: not perfect authentication, but defensible authentication.',
    ],
  },
  {
    heading: "What credible defense looks like after you've seen the other side",
    paragraphs: [
      'The most valuable thing offensive experience gave me was not a bag of tricks. It was a hierarchy of questions.',
      'First: what is this control actually asserting?',
      'Second: which part of that assertion is grounded in something cryptographic, which part in environment signals, and which part in human interpretation?',
      'Third: which assumptions depend on the attacker behaving politely?',
      'Fourth: where are the fallback paths, and are they held to the same security standard as the flagship flow?',
      'Fifth: if this control fails, what prevents a local failure from becoming an account-level or platform-level compromise?',
      'Teams that ask those questions early build very different systems.',
      'They bind approvals to meaningful transaction context instead of vague prompts. They reduce fallback paths instead of endlessly decorating them. They treat recovery as a first-class security surface. They assume the client is negotiable. They separate identity proof, authentication, session continuity, and authorization instead of collapsing them into one fuzzy idea of "logged in." They instrument for abuse patterns, not just uptime. They treat support staff, user interfaces, and internal tooling as part of the authentication perimeter because that is what they are.',
      'They also become less susceptible to security theater.',
      'A mature defender is hard to impress with adjectives. "AI-powered." "Military-grade." "Passwordless." "Zero trust." Fine. What is the claim? What is the trust boundary? What fails open? What can be relayed? What can be replayed? What depends on a browser the adversary controls? What happens when the user is deceived but technically compliant?',
      'Those are offensive questions. They are also the beginning of adult defense.',
    ],
  },
  {
    heading: 'Understanding offense is not optional if you want to defend reality',
    paragraphs: [
      'There is a version of security discourse that treats offensive knowledge as somehow adjacent to real defense work, as if architecture can remain clean by keeping its distance from the mess. I think that view is backward.',
      'If you are building authentication for real adversaries, offense is not extracurricular. It is part of the requirements gathering.',
      'You do not need every defender to write exploits. But you do need defenders who understand how systems are actually bent until they say something they were never meant to say. You need people in the room who can look at a polished control and ask the impolite question: yes, but what happens when this is proxied, replayed, socially routed around, or embedded inside a workflow you did not model?',
      'Without that perspective, defense drifts toward ceremony. With it, defense gets more concrete, more humble, and usually more effective.',
      'That is the through-line of my work now.',
      'I research identity systems, browser trust, anti-fraud mechanisms, and national authentication infrastructure because they sit at the fault line between claim and proof. I care about coordinated disclosure because public trust in digital systems depends on somebody being willing to name where the abstractions break. I care about production architecture because eventually theory has to cash out in systems that ordinary people can survive using.',
      'I used to break authentication. The point is not that this makes me interesting. The point is that it permanently changed what I trust, what I question, and how I build.',
      'If you have seen the system from the attacking side, you stop asking whether a control looks strong.',
      'You start asking whether it still means what it claims to mean when somebody is actively trying to make it lie.',
      'That is where credible defense begins.',
    ],
  },
];

export default function AuthenticationEssayPage() {
  React.useEffect(() => {
    const previousTitle = document.title;
    const metadataUpdates = [
      { selector: 'meta[name="description"]', attribute: 'content', value: standfirst },
      { selector: 'link[rel="canonical"]', attribute: 'href', value: essayUrl },
      { selector: 'meta[property="og:type"]', attribute: 'content', value: 'article' },
      { selector: 'meta[property="og:url"]', attribute: 'content', value: essayUrl },
      { selector: 'meta[property="og:title"]', attribute: 'content', value: title },
      { selector: 'meta[property="og:description"]', attribute: 'content', value: standfirst },
      { selector: 'meta[name="twitter:url"]', attribute: 'content', value: essayUrl },
      { selector: 'meta[name="twitter:title"]', attribute: 'content', value: title },
      { selector: 'meta[name="twitter:description"]', attribute: 'content', value: standfirst },
    ];
    const previousMetadata = metadataUpdates.map(({ selector, attribute }) => {
      const element = document.querySelector(selector);
      return { element, attribute, value: element?.getAttribute(attribute) ?? null };
    });

    document.title = `${title} | tomabel.ee`;
    metadataUpdates.forEach(({ selector, attribute, value }) => {
      document.querySelector(selector)?.setAttribute(attribute, value);
    });

    return () => {
      document.title = previousTitle;
      previousMetadata.forEach(({ element, attribute, value }) => {
        if (!element) {
          return;
        }

        if (value === null) {
          element.removeAttribute(attribute);
          return;
        }

        element.setAttribute(attribute, value);
      });
    };
  }, []);

  return (
    <article>
      <header className="relative overflow-hidden border-b border-border px-6 pb-20 pt-24">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]" />
        <div className="relative mx-auto max-w-4xl">
          <Link
            to="/writing"
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-accent hover:underline"
          >
            ← Back to writing
          </Link>
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Essay · Authentication · Offense / Defense
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
            {title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted md:text-2xl">
            {standfirst}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="border border-border bg-white/[0.03] px-3 py-2">Published · June 22, 2026</span>
            <span className="border border-border bg-white/[0.03] px-3 py-2">10 min read</span>
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
              Credible defense starts by naming exactly what a system trusts, what it verifies, and where those claims can be made to lie.
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
        </div>
      </div>
    </article>
  );
}
