import { Link } from 'react-router-dom';

type EssaySection = {
  heading: string;
  paragraphs: string[];
};

const title = 'Coordinated disclosure in a small country';
const standfirst =
  'Estonia runs its state on software, and the security community that watches over it is small enough that everyone knows each other. That changes what coordinated disclosure is. It stops being a protocol you follow and becomes a relationship you maintain.';

const openingParagraphs = [
  'Estonia runs its state on software. Tax returns, voting, prescriptions, company registration: roughly 99% of public services are online, and more than a million people across the Baltics authenticate with the same national identity stack every day. When that software breaks, the failure is national, not personal.',
  "The community that finds these breaks before someone else does is small. Not thousands of people. A few hundred at most, doing this professionally in Estonia, plus the researchers who orbit them. After a few years you have met most of them. The analyst who triages your vulnerability report is the person you will see at the next conference. The person who owns the vulnerable system is two hops away on LinkedIn.",
  'This is the part of coordinated disclosure that standard writeups miss. The formal process matters. But in a small country the process is only the surface. Underneath, disclosure is a relationship between people who will keep meeting each other.',
];

const sections: EssaySection[] = [
  {
    heading: 'The formal process is real',
    paragraphs: [
      'The term gets used loosely, so the concrete shape matters.',
      'You find a flaw in a live system. You write up what you found: the trigger, the impact, enough detail to reproduce it. You send it to the people who can act before you send it to anyone else. For systems in Estonia, that means CERT-EE, which sits inside RIA, the Estonian Information System Authority. They route the report to whoever operates the system. The operator fixes it, pushes back, or asks for time. There is a window, usually measured in weeks or months. Then you publish.',
      'The order is the entire point. Report first. Publish later. A name and a date on every step.',
      'That is what I did with the research on the Estonian identity stack that this site describes. The findings went to RIA and CERT-EE before anything was public. Not because the law demands a specific procedure, but because the order is what separates a researcher from a defendant.',
      'The pattern has a track record here. The ROCA flaw in the Estonian ID card, found in 2017, was discovered by Estonian researchers working with the national CERT. The response became a national story, with a fix campaign that covered most of the affected cards. The process worked because the finding entered the right channel first.',
    ],
  },
  {
    heading: 'The law is closer than people think',
    paragraphs: [
      "Estonian law criminalizes unauthorized access to computer systems. Section 217 of the Penal Code covers access gained by defeating a system's protection measures, with penalties up to three years. Research on live national infrastructure sits next to that line, on purpose.",
      'That shapes everything about how disclosure has to be done here.',
      'The line between research and crime is not drawn by the law alone. It is drawn by the paper trail around the work. Scope. Authorization. Timestamps. What you did before you told anyone. The prosecutor\'s question is never whether the research is interesting. It is what you did, in what order, and who knew.',
      'That is why the discipline is procedural rather than heroic. You document the scope before you touch the system. You stay inside it. You tell the owner first. You can show the whole sequence. The writeup is a technical document, and it is also the evidence that the work was research.',
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
      'If you do not tell your story, someone else will tell it for you, and they will tell it worse. That is true for a vulnerability finding. It is also true for a career. I know this from both directions, and I have taken responsibility for the part of my history that required it.',
      'The only protection that scales is to own the narrative in public. Publish under your own name, with dates, so the sequence is checkable by anyone. Disclose to the people who can act first, then publish.',
      'This is what I meant in the kratt essay when I wrote that pointing in public is a mechanism of control. Coordinated disclosure is that mechanism applied to research. The work is visible, and the name on it is mine.',
      'A public record with your name on it does not remove legal exposure. It does something more useful. It makes the story of the work yours, so that when the story gets told, it is the true one.',
    ],
  },
  {
    heading: 'What the trust rests on',
    paragraphs: [
      'A digital state runs on trust in software that almost nobody fully understands. That trust is maintained, in practice, by a small number of people willing to look at the seams and name what they find.',
      'In a big country, that work happens at a distance. Reports go to a portal. Fixes happen on a vendor calendar. The researcher never meets the people affected. In a small country the distance collapses. The person who triages your report is your colleague. The people affected are your neighbors.',
      'The closeness is the mechanism, not a side effect. When the disclosure is public, the sequence is documented, and the name is yours, the story is a simple one: a researcher found a flaw and told the right people, in the right order. That story is what keeps the work legal, and it is what makes the next report possible. I intend to keep writing them.',
    ],
  },
];

export default function CoordinatedDisclosureInASmallCountryPage() {
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
            Essay · Disclosure · Estonia
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
            {title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted md:text-2xl">
            {standfirst}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="border border-border bg-white/[0.03] px-3 py-2">Published · August 11, 2026</span>
            <span className="border border-border bg-white/[0.03] px-3 py-2">6 min read</span>
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
              In a small country, disclosure is a relationship before a procedure. The paper trail makes the work legal; owning your story in public is the protection that scales.
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
