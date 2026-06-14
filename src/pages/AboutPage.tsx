import { useTranslation } from '../i18n/LanguageContext';
import SectionHeader from '../components/site/section-header';
import { bio, site } from '../content/site';

export default function AboutPage() {
  const { language } = useTranslation();

  return (
    <>
      <section className="border-b border-border px-6 pb-20 pt-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="04"
            label={language === 'en' ? 'About' : 'Minust'}
            title={language === 'en' ? 'The way of seeing.' : 'Nägemisviis.'}
          />
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="sr-only">{language === 'en' ? 'Bio' : 'Biograafia'}</h2>
          <div className="space-y-8 font-display text-xl leading-relaxed text-foreground md:text-[1.35rem]">
            {bio.paragraphs.map((p, i) => (
              <p key={i}>{p[language]}</p>
            ))}
          </div>

          <div className="mt-16 border-l-2 border-warning/60 pl-6">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-warning">
              {language === 'en' ? 'Kratt' : 'Kratti'}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              {bio.kratt[language]}
            </p>
          </div>

          <div className="mt-16 border-t border-border pt-8">
            <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
              {language === 'en' ? 'Find me' : 'Leia mind'}
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
              <a href={site.contact.github} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent">
                GitHub
              </a>
              <a href={site.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent">
                LinkedIn
              </a>
              <a href={site.contact.email} className="text-foreground hover:text-accent">
                Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
