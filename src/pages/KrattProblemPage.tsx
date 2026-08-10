import { Link } from 'react-router-dom';

type EssaySection = {
  heading: string;
  paragraphs: string[];
};

const title = 'The kratt problem';
const standfirst =
  'In Estonian folklore, a kratt is a servant assembled from spare parts that works tirelessly for its maker and turns on you the moment it goes idle. That is the most honest picture of offensive capability I know. The ethics question is really a pointing question.';

const openingParagraphs = [
  'Every culture has a story about a tool that gets away from its maker. Estonia\'s is the kratt.',
  'You build one from whatever is lying around: hay, an old broom, a worn-out pot. To bring it to life you give the Devil three drops of your own blood. Then it works. It carries grain, steals milk, drags home the neighbor\'s silver. It never sleeps and it never asks why.',
  'The rule that keeps the whole arrangement safe is simple: it has to keep working. The moment you let it sit idle, it turns on you. Owners get rid of an unwanted kratt the same way they manage any dangerous machine: they give it a task it cannot finish, like building a ladder out of bread, and it burns itself out trying.',
];

const sections: EssaySection[] = [
  {
    heading: 'The kratt is a picture of capability',
    paragraphs: [
      'The story stuck with me the first time I heard it, because it fits what I do for a living.',
      'Capability is assembled from spare parts. Nobody invents browser exploitation, protocol analysis, or VM reverse engineering from nothing. You collect techniques from public research, from other people\'s tools, from your own failures. What makes the assembly dangerous is not the parts. It is the fact that it works without rest and without judgment.',
      'A kratt does not decide what to steal. Its maker decides. The creature contributes the tireless execution and nothing else. That is the uncomfortable part of the metaphor, because it is also true of the person holding the skills. The skills do not have a moral position. They do what they are pointed at.',
    ],
  },
  {
    heading: 'The danger is idleness, not intent',
    paragraphs: [
      'The folklore is precise about where the danger lives. It is not in the malicious kratt. There is no such thing. The kratt is dangerous exactly when it has nothing to do.',
      'I think that is right, and I think the cybersecurity industry gets this backwards most of the time. We spend enormous energy policing the intent of people who can build things, and almost none on what happens to capability when it sits unused. Offensive skill does not rest when it is idle. It finds its own work. And the work it finds on its own is rarely the work you would have chosen.',
      'This is not a theory for me. For a while I made money by building and selling offensive tooling. The creature worked exactly as designed. That was the point, and it was the problem. The consequences were mine and I take full responsibility for them.',
    ],
  },
  {
    heading: 'What direction costs',
    paragraphs: [
      'The folklore is also honest about the price. Three drops of blood. The maker pays something real up front, and the payment is what makes the creature run.',
      'Building offensive capability has an up-front price too, and it is usually paid in judgment. Every exploit, every tool, every piece of automation is a small decision about what deserves to be taken apart and who gets to hold the result. I have made those decisions badly, for money. I do not present that history as a credential. I present it as the reason I think the pointing question is the only question that matters.',
    ],
  },
  {
    heading: 'Pointing is a practice, not a declaration',
    paragraphs: [
      'A kratt needs constant direction, not a single decision. The same is true of capability.',
      'There is no clean line that settles it once. There is only the practice of keeping the work visible and its direction checkable. The discipline that does that for me is publicity. The research is published, the findings are disclosed to the people who can act on them before they are shown to everyone else, and the name on the work is mine. Coordinated disclosure exists precisely because pointing in public is a mechanism of control. If the work is visible, anyone can check where it is aimed.',
      'The About page on this site says the kratt metaphor in one paragraph. The rest of the site is the working out of that paragraph.',
    ],
  },
  {
    heading: 'The impossible task',
    paragraphs: [
      'The story also has an ending worth keeping. You do not destroy a kratt by fighting it. You give it a task it cannot finish, and it burns itself out.',
      'I think that is the actual discipline of offensive security done right. Not the destruction of capability, which is impossible anyway, but the assignment of work that consumes the attention fully and points it somewhere it cannot come back to bite the maker. The work has to be real, and hard enough that the creature never finishes it, never goes idle, never starts choosing its own targets.',
      'Give it real work: research that gets published, systems that get built, disclosures that get made. That is the ladder out of bread.',
    ],
  },
];

export default function KrattProblemPage() {
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
            Essay · Ethics · Offensive Security
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
            {title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted md:text-2xl">
            {standfirst}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="border border-border bg-white/[0.03] px-3 py-2">Published · August 11, 2026</span>
            <span className="border border-border bg-white/[0.03] px-3 py-2">4 min read</span>
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
              Capability is neutral. Direction is everything. Idle skill does not rest; it finds its own work. The discipline is keeping it pointed, in public, where anyone can check the aim.
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
