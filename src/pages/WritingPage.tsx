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
            title={language === 'en' ? 'Essays in progress.' : 'Esseed töös.'}
            intro={language === 'en'
              ? "Shorter pieces — the through-lines that connect the research, and arguments I want to make in public. Less formal than the research, more opinionated."
              : 'Lühemad palad — läbivad jooned, mis seovad uuringuid, ja argumendid, mida tahan avalikult esitada. Vähem formaalne kui uuringud, rohkem arvamuslik.'}
          />
        </div>
      </section>

      <section className="px-6 py-12" aria-labelledby="planned-essays">
        <div className="mx-auto max-w-6xl">
          <h2
            id="planned-essays"
            className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent"
          >
            {language === 'en' ? 'Planned / Seed Pieces' : 'Plaanitud / Alustatud Palad'}
          </h2>
          <ul className="divide-y divide-border border-y border-border">
            {essays.map((e, i) => (
              <li
                key={e.title.en}
                className="group grid gap-4 py-8 transition-colors hover:bg-white/[0.02] md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                    {language === 'en' ? 'Essay' : 'Essee'} · 0{i + 1}
                  </span>
                </div>
                <div className="md:col-span-10">
                  <h3 className="font-display text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
                    “{e.title[language]}”
                  </h3>
                  <p className="mt-3 max-w-3xl text-muted">{e.blurb[language]}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
