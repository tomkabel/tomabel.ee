import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArticleHeader } from '../components/site/article';
import ReaderRail from '../components/site/reader-rail';
import { sectionSlug } from '../components/site/section-slug';

type EssaySection = {
  heading: string;
  paragraphs: string[];
};

const title = 'The kratt problem';
const standfirst =
  'In Estonian folklore, a kratt is a servant assembled from spare parts that works tirelessly for its maker and turns on you the moment it goes idle. That is the most accurate picture of offensive capability I know. The ethics question is really a pointing question.';

const aboutLinkText = 'About page';
const policyLinkText = 'disclosure policy';

const openingParagraphs = [
  'Every culture has a story about a tool that gets away from its maker. Estonia\'s is the kratt.',
  'You build one from whatever is lying around: hay, an old broom, a worn-out pot. To bring it to life you give the Devil three drops of your own blood. Then it works. It carries grain, steals milk, drags home the neighbor\'s silver. It never sleeps and it never asks why.',
  'The rule that keeps the arrangement safe is simple: it has to keep working. Left idle, it turns on its owner. The traditional way to be rid of one is to give it a task it cannot finish. In Andrus Kivirähk\'s novel Rehepapp (2000), and Rainer Sarnet\'s 2017 film of it, November, the task is a ladder made of bread, and the straw creature works at it until it catches fire.',
  'Estonia has another use for the creature. The kratt is the country\'s common metaphor for artificial intelligence, and proposed legislation on algorithmic liability has been nicknamed the "kratt law". That reading is about machines acting without a human decision. Mine is about the person who builds and aims the thing.',
];

const sections: EssaySection[] = [
  {
    heading: 'The kratt is a picture of capability',
    paragraphs: [
      'The story stuck with me the first time I heard it, because it fits what I do for a living.',
      'Capability is assembled from spare parts. Nobody invents browser exploitation, protocol analysis, or VM reverse engineering from nothing. You collect techniques from public research, from other people\'s tools, from your own failures. What makes the assembly dangerous is that it works without rest and without judgment.',
      'A kratt does not decide what to steal. Its maker decides. The creature contributes the tireless execution and nothing else. That is the uncomfortable part of the metaphor, because it is also true of the person holding the skills. The skills do not have a moral position. They do what they are pointed at.',
    ],
  },
  {
    heading: 'The danger is idleness, not intent',
    paragraphs: [
      'In the stories, the danger isn\'t malice. The kratt has none. The danger is idleness: it is most dangerous exactly when it has nothing to do.',
      'I think that is right, and I think the cybersecurity industry mostly looks the other way. Its controls are aimed at the intent of people who can build things: export rules for intrusion software, bug-bounty terms, safe-harbor policies. Much less is said about what happens to capability when nobody has given it work. Idle skill doesn\'t stay idle. Its owner finds work for it, and unchosen work is rarely good work.',
      'I reverse engineered browser security, TLS fingerprinting, and anti-fraud systems — and for a while, I broke them for money. I don’t hide that. It ultimately led to a conviction in 2024, an outcome I take full responsibility for. The full statement is on the About page.',
    ],
  },
  {
    heading: 'What direction costs',
    paragraphs: [
      'The folklore is also clear about the price. Three drops of blood. The maker pays something real up front, and the payment is what makes the creature run.',
      'Building offensive capability has an up-front price too, and it is usually paid in judgment. Every exploit, every tool, every piece of automation is a small decision about what deserves to be taken apart and who gets to hold the result. I do not present my own history as a credential. It is the reason I think the pointing question is the one that matters.',
    ],
  },
  {
    heading: 'Pointing is a practice, not a declaration',
    paragraphs: [
      'A kratt needs constant direction, not a single decision. The same is true of capability.',
      'No line settles it once. What works is keeping the work visible and its direction checkable, and the discipline that does that for me is publicity. The research is published under my name, and where it touches live systems, the findings go to the people who can act on them before they go to everyone else, as the disclosure policy describes. If the work is visible, anyone can check where it is aimed.',
      'The About page on this site sums up the kratt metaphor in one paragraph. The rest of the site works that paragraph out.',
    ],
  },
  {
    heading: 'The impossible task',
    paragraphs: [
      'The story also has an ending worth keeping. You do not destroy a kratt by fighting it. You give it a task it cannot finish, and it burns itself out.',
      'I\'m deliberately turning the tale around here. The impossible task that destroys the kratt is, for capability, what keeps it safe. Capability cannot be destroyed anyway. What you can do is give it work that takes its full attention and points it somewhere it cannot come back to bite the maker. The work has to be real, and hard enough that it is never finished, so the capability never goes idle and its owner never goes looking for other work for it.',
      'Give it real work: research that gets published, systems that get built, disclosures that get made. That is the ladder out of bread.',
    ],
  },
];

const sources = [
  {
    label: 'Wikipedia, "Kratt"',
    url: 'https://en.wikipedia.org/wiki/Kratt',
    note: 'materials, the blood pact, the need to keep working, the bread ladder in Kivirähk\'s Rehepapp, and the kratt as Estonia\'s AI metaphor',
  },
  {
    label: 'Harry Jannsen, "The Treasure-Bringer", in W. F. Kirby, The Hero of Esthonia (1895), sacred-texts mirror',
    url: 'https://neonvagabond.xyz/mirrors/sacred-texts/neu/hoe/hoe2-54.htm',
    note: 'a nineteenth-century telling: rid yourself of the creature with a task it cannot perform',
  },
  {
    label: 'Anneli Mihkelev, "Rahvapärimus ja multimeedia eesti kaasaegses kultuuris", Philologia Estonica Tallinnensis 2 (2017)',
    url: 'https://publications.tlulib.ee/index.php/philologia/article/view/452',
    note: 'the kratt\'s path from oral tradition into Kivirähk and multimedia',
  },
];

const disclosureParagraphs = [
  'Corrections, 4 October 2026: the bread ladder is now credited to Andrus Kivirähk\'s Rehepapp rather than presented as oral folklore, and the description of the author\'s past now uses the same wording as the About page.',
];

const linkClass = 'text-accent underline decoration-border underline-offset-4 hover:decoration-accent';

function withLinks(text: string): ReactNode {
  for (const [needle, to] of [
    [aboutLinkText, '/about'],
    [policyLinkText, '/disclosure'],
  ] as const) {
    const at = text.indexOf(needle);
    if (at === -1) continue;
    return (
      <>
        {text.slice(0, at)}
        <Link to={to} className={linkClass}>
          {needle}
        </Link>
        {text.slice(at + needle.length)}
      </>
    );
  }
  return text;
}

export default function KrattProblemPage() {
  return (
    <article>
      <ArticleHeader
        backTo="/disclosures"
        back={<>← Back to research</>}
        kicker={<>Essay · Ethics · Offensive Security</>}
        title={title}
        standfirst={standfirst}
        meta={[<>Published · August 11, 2026</>, <>Updated · October 4, 2026</>, <>5 min read</>, <>Tom Kristian Abel</>]}
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
              Capability is neutral. Direction is everything. Idle skill does not stay idle; its owner finds work for it. The discipline is keeping it pointed, in public, where anyone can check the aim.
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
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{withLinks(paragraph)}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-16 max-w-measure">
            <h2 className="font-display text-3xl leading-tight text-foreground">
              Sources
            </h2>
            <div className="mt-6 space-y-4">
              {sources.map((source) => (
                <p key={source.url} className="text-lg leading-relaxed text-muted">
                  <a href={source.url} className={linkClass}>
                    {source.label}
                  </a>
                  <span className="text-muted-foreground"> — {source.note}</span>
                </p>
              ))}
            </div>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-muted">
              {disclosureParagraphs.map((paragraph) => (
                <p key={paragraph}>{withLinks(paragraph)}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
