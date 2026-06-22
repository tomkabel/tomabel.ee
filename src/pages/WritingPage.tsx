import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import SectionHeader from '../components/site/section-header';
import { essays } from '../content/site';

export default function WritingPage() {
  const { language } = useTranslation();

  return (
    <>
      <section className="border-b border-border px-6 pb-20 pt-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="03"
            label={language === 'en' ? 'Writing' : 'Kirjutised'}
            title={language === 'en' ? 'Essays and arguments.' : 'Esseed ja argumendid.'}
            intro={language === 'en'
              ? "The through-lines that connect the research, and arguments I want to make in public. Less formal than the research, more opinionated."
              : 'Läbivad jooned, mis seovad uuringuid, ja argumendid, mida tahan avalikult esitada. Vähem formaalsed kui uuringud, rohkem arvamuslikud.'}
          />
        </div>
      </section>

      <section className="px-6 py-12" aria-labelledby="planned-essays">
        <div className="mx-auto max-w-6xl">
          <h2
            id="planned-essays"
            className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent"
          >
            {language === 'en' ? 'Published / Seed Pieces' : 'Avaldatud / Alustatud Palad'}
          </h2>
          <ul className="divide-y divide-border border-y border-border">
            {essays.map((e, i) => (
              <li
                key={e.title.en}
                className="transition-colors hover:bg-white/[0.02]"
              >
                {e.href ? (
                  <Link to={e.href} className="group grid gap-4 py-8 md:grid-cols-12 md:gap-8">
                    <EssayRowContent essay={e} index={i + 1} language={language} />
                  </Link>
                ) : (
                  <div className="group grid gap-4 py-8 md:grid-cols-12 md:gap-8">
                    <EssayRowContent essay={e} index={i + 1} language={language} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function EssayRowContent({
  essay,
  index,
  language,
}: {
  essay: (typeof essays)[number];
  index: number;
  language: 'en' | 'et';
}) {
  return (
    <>
      <div className="md:col-span-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">
          {language === 'en' ? 'Essay' : 'Essee'} · {String(index).padStart(2, '0')}
        </span>
        <span className="mt-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {essay.meta[language]}
        </span>
      </div>
      <div className="md:col-span-10">
        <h3 className="font-display text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
          “{essay.title[language]}”
          {essay.href ? (
            <span className="ml-2 inline-block font-mono text-base text-subtle opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
              →
            </span>
          ) : null}
        </h3>
        <p className="mt-3 max-w-3xl text-muted">{essay.blurb[language]}</p>
      </div>
    </>
  );
}
