import { Link } from 'react-router-dom';
import { ArticleHeader } from '../components/site/article';
import ReaderRail from '../components/site/reader-rail';
import { sectionSlug } from '../components/site/section-slug';

type EssaySection = {
  heading: string;
  paragraphs: string[];
};

const title = 'Coordinated disclosure in a small country';
const standfirst =
  'Estonia runs its state on software, and the security community that watches over it is small enough that everyone knows each other. That changes what coordinated disclosure is. It stops being a protocol you follow and becomes a relationship you maintain.';

const aboutLinkText = 'About page';

const openingParagraphs = [
  'Estonia runs its state on software. Tax returns, voting, prescriptions, company registration: nearly every public service can now be completed online (Estonia added online divorce in December 2024, closing the last gaps), and millions of people use the same identity tools every day. The state ID card is national infrastructure; Smart-ID, which many more people reach for, is a private product from SK ID Solutions with 3.7M+ unique users across the Baltics as of October 2025. When that software breaks, the failure is national, not personal.',
  "The community that finds these breaks before someone else does is small. Not thousands of people. A few hundred at most, doing this professionally in Estonia, plus the researchers who orbit them. After a few years you have met most of them. The analyst who triages your vulnerability report is the person you will see at the next conference. The person who owns the vulnerable system is two hops away on LinkedIn.",
  'This is the part of coordinated disclosure that standard writeups miss. The formal process matters. But in a small country the process is only the surface. Underneath, disclosure is a relationship between people who will keep meeting each other.',
];

const sections: EssaySection[] = [
  {
    heading: 'The formal process is real',
    paragraphs: [
      'The term gets used loosely, so the concrete shape matters.',
      'You find a flaw in a live system. You write up what you found: the trigger, the impact, enough detail to reproduce it. You send it to the people who can act before you send it to anyone else. For systems in Estonia, that means CERT-EE, which sits inside RIA, the Estonian Information System Authority. They route the report to whoever operates the system. The operator fixes it, pushes back, or asks for time. There is a window, usually measured in weeks or months. Then you publish.',
      'That machinery firmed up in 2026. NIS2 (Art. 12) tasks each member state\u2019s CSIRT with coordinating reported vulnerabilities, and Estonia\u2019s transposition, the amended Cybersecurity Act (KüTS), has applied since 1 January 2026, bringing roughly 6,500 organisations, credit institutions included, into scope. For a researcher that means CERT-EE now has a clearer formal mandate to receive and route a report than it did a year ago.',
      'The order is the entire point. Report first. Publish later. A name and a date on every step.',
      'That is what I did with the Smart-ID research this site describes. The findings went to SK ID Solutions, the vendor, in November 2025. SK answered on 5 December 2025. In April 2026, after SK classed the issue as an accepted architectural risk, I filed memoranda with RIA, the Consumer Protection and Technical Regulatory Authority (TTJA) and the Data Protection Inspectorate (AKI). The order, vendor first and regulators next, was not set by any statute; it is what separates a researcher from a defendant. (My companion report sets out the technical findings and the full dated timeline.)',
      'The pattern has a track record here. The ROCA flaw, found in 2017 by Czech researchers at Masaryk University, was disclosed first to the chip maker, Infineon, not to the public. It hit about 760,000 Estonian ID cards. Estonia\u2019s own response ran through RIA: the state suspended the affected certificates and renewed about 95% of the cards in active electronic use within five months. The vendor-first order is what made an orderly national response possible.',
    ],
  },
  {
    heading: 'The law is closer than people think',
    paragraphs: [
      "Estonian law criminalizes unauthorized access to computer systems. Section 217 of the Penal Code covers access gained by defeating a system's protection measures. The basic offence in §217(1) carries up to three years; §217(2) raises the maximum to five years where the access causes significant damage, reaches a system holding a state secret, or reaches a computer system of a vital sector. Separately, §216\u00b9 makes it an offence, punishable by up to two years, to make available a device or program created or adapted for committing such offences, which bears directly on publishing proof-of-concept tooling. Research on live national infrastructure sits next to those lines, on purpose.",
      'That shapes everything about how disclosure has to be done here.',
      'Authorization is what separates research from crime, and the law decides whether you had it. The paper trail does not grant it. What the paper trail does is document the conduct: scope, authorization, timestamps. What you did before you told anyone. The prosecutor\'s question is never whether the research is interesting. It is what you did, in what order, and who knew.',
      'That is why the discipline is procedural rather than heroic. You document the scope before you touch the system. You stay inside it. You tell the owner first. You can show the whole sequence. The writeup is a technical document, and it is also the record of what the work was. It does not authorize access you did not have.',
      'None of this is a guarantee. Legal exposure in this field never fully goes away, and anyone who tells you otherwise is selling something. The procedure is what makes the exposure survivable, and it is the only part you fully control.',
    ],
  },
  {
    heading: 'Everyone knows everyone',
    paragraphs: [
      'The standard descriptions present disclosure as a transaction between a researcher and an organization. In Estonia it is a conversation between people who will keep meeting.',
      'The analyst who reads your report today is the person you will share a table with at a security event next month. The CTO of the operator is two hops away. Regulators and researchers rotate through the same small pool, and the pool remembers.',
      'That cuts both ways.',
      'Reputation is real currency. A clean, well-documented report builds it. A report that embarrasses people unnecessarily or lands with a press release attached burns it. In a country this small, a burned bridge is burned for good, because there is no larger pond to move to.',
      'The intimacy also creates pressure to stay quiet. Nobody wants to be the person who broke the national system, even temporarily. Nobody wants to be the name in the news cycle. The path of least resistance is to sit on a finding until it dissolves into a rumor.',
      'Silence has a cost too. A flaw that stays private stays unfixed. A researcher who never publishes leaves no record, and a record is the only thing that survives in a small community. The rumor will exist either way. The question is whether there is a published writeup with your name on it that tells the real story.',
    ],
  },
  {
    heading: 'Owning your story is the protection that scales',
    paragraphs: [
      'This is the part I care about most, and the reason this essay exists.',
      'If you do not tell your story, someone else will tell it for you, and they will tell it worse. That is true for a vulnerability finding. It is also true for a career. I reverse engineered browser security, TLS fingerprinting, and anti-fraud systems — and for a while, I broke them for money. I don’t hide that. It ultimately led to a conviction in 2024, an outcome I take full responsibility for. The full statement is on the About page.',
      'The only protection that scales is to own the narrative in public. Publish under your own name, with dates, so the sequence is checkable by anyone. Disclose to the people who can act first, then publish.',
      'The kratt essay argues that idle skill does not stay idle: its owner finds work for it. Coordinated disclosure is how I give mine work in public. The work is visible, and the name on it is mine.',
      'A public record with your name on it does not remove legal exposure. It does something more useful. It makes the story of the work yours, so that when the story gets told, it is the true one.',
    ],
  },
  {
    heading: 'What the trust rests on',
    paragraphs: [
      'A digital state runs on trust in software that almost nobody fully understands. That trust is maintained, in practice, by a small number of people willing to look at the seams and name what they find.',
      'In a big country, that work happens at a distance. Reports go to a portal. Fixes happen on a vendor calendar. The researcher never meets the people affected. In a small country the distance collapses. The person who triages your report is your colleague. The people affected are your neighbors.',
      'The closeness is the mechanism, not a side effect. When the disclosure is public, the sequence is documented, and the name is yours, the story is a simple one: a researcher found a flaw and told the right people, in the right order. That story does not make the work legal; only authorized access does. But it is the record of what happened, and it is what makes the next report possible. I intend to keep writing them.',
      'Corrections, 4 October 2026: an earlier version said the ROCA flaw was "discovered by Estonian researchers working with the national CERT". It was found by Czech researchers at Masaryk University and disclosed first to Infineon; Estonia\u2019s renewal campaign ran through RIA. The same version said the Smart-ID findings "went to RIA and CERT-EE before anything was public", which contradicted the companion report. The real order was SK first (November 2025), then memoranda to RIA, TTJA and AKI in April 2026. This version also updates the online-services figure, cites §216\u00b9 alongside §217, and adds the NIS2/KüTS context.',
    ],
  },
];

const sources = [
  {
    label: 'CRoCS, Masaryk University — The Return of Coppersmith\u2019s Attack (ROCA)',
    url: 'https://crocs.fi.muni.cz/public/papers/rsa_ccs17',
    note: 'the 2017 ROCA disclosure, by Czech researchers',
  },
  {
    label: 'RIA — majority of electronically used ID cards renewed',
    url: 'https://ria.ee/en/news/majority-electronically-used-id-cards-were-renewed',
    note: '760,000 cards affected; ~95% of actively used cards renewed',
  },
  {
    label: 'e-Estonia — 100% digital government services',
    url: 'https://e-estonia.com/estonia-100-digital-government-services/',
    note: 'online divorce added December 2024',
  },
  {
    label: 'SK ID Solutions — Smart-ID+ deck, October 2025',
    url: 'https://www.smart-id.com/wordpress/wp-content/uploads/2025/10/next-generation-secure-authentication.pdf',
    note: '3.7M+ unique Smart-ID users',
  },
  {
    label: 'UNODC SHERLOC — Estonian Penal Code §§216\u00b9, 217',
    url: 'https://sherloc.unodc.org/cld/en/legislation/est/penal_code/part_2_-_chapter_13/article_216-1_217-1/article_216-1_217-1.html',
    note: 'computer-crime and tooling offences',
  },
  {
    label: 'Directive (EU) 2022/2555 (NIS2)',
    url: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng',
    note: 'Art. 12 CSIRT coordinated-disclosure role',
  },
  {
    label: 'KPMG Estonia — amendments to the Cybersecurity Act (KüTS), February 2026',
    url: 'https://kpmg.com/ee/et/sundmused/2026/02/kueberturvalisuse-ja-haedaolukorra-seaduse-muudatused.html',
    note: 'NIS2 transposition in force 1 January 2026',
  },
  {
    label: 'Tom Kristian Abel — responsible disclosure timeline (smart-id-security-research)',
    url: 'https://github.com/tomkabel/smart-id-security-research/blob/master/docs/05-enforcement/responsible-disclosure-timeline.md',
    note: 'the dated Smart-ID disclosure record',
  },
];

export default function CoordinatedDisclosureInASmallCountryPage() {
  return (
    <article>
      <ArticleHeader
        backTo="/disclosures"
        back={<>← Back to research</>}
        kicker={<>Essay · Disclosure · Estonia</>}
        title={title}
        standfirst={standfirst}
        meta={[<>Published · August 11, 2026</>, <>Updated · October 4, 2026</>, <>9 min read</>, <>Tom Kristian Abel</>]}
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="sticky top-24">
            <ReaderRail sections={sections} backHref="/disclosures" backLabel="All disclosures" />
          </div>
          <div hidden className="border border-border bg-surface p-5">
            <p className="label font-bold text-accent">
              Thesis
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              In a small country, disclosure is a relationship before a procedure. The paper trail documents the work but does not make it legal; owning your story in public is the protection that scales.
            </p>
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
                {section.paragraphs.map((paragraph) => {
                  const at = paragraph.indexOf(aboutLinkText);
                  return (
                    <p key={paragraph}>
                      {at === -1 ? (
                        paragraph
                      ) : (
                        <>
                          {paragraph.slice(0, at)}
                          <Link to="/about" className="text-accent underline decoration-border underline-offset-4 hover:decoration-accent">
                            {aboutLinkText}
                          </Link>
                          {paragraph.slice(at + aboutLinkText.length)}
                        </>
                      )}
                    </p>
                  );
                })}
              </div>
            </section>
          ))}

          <section className="mt-16 max-w-measure">
            <h2 className="font-display text-3xl leading-tight text-foreground">Related reading</h2>
            <ul className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <li>
                <Link
                  to="/disclosures/smart-id-achilles-heel"
                  className="-my-2.5 inline-block py-2.5 text-accent underline decoration-border underline-offset-4 hover:decoration-accent"
                >
                  The Achilles' heel of Estonia's e-state
                </Link>{' '}
                — the companion report, with the technical findings and the full dated disclosure timeline.
              </li>
              <li>
                <Link
                  to="/disclosures/the-kratt-problem"
                  className="-my-2.5 inline-block py-2.5 text-accent underline decoration-border underline-offset-4 hover:decoration-accent"
                >
                  The kratt problem
                </Link>{' '}
                — on what happens to capability that nobody has given work.
              </li>
              <li>
                <Link
                  to="/my-story"
                  className="-my-2.5 inline-block py-2.5 text-accent underline decoration-border underline-offset-4 hover:decoration-accent"
                >
                  My story
                </Link>{' '}
                — the history this essay refers to, in my own words.
              </li>
            </ul>
          </section>

          <section className="mt-16 max-w-measure">
            <h2 className="font-display text-3xl leading-tight text-foreground">Sources</h2>
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
        </div>
      </div>
    </article>
  );
}
