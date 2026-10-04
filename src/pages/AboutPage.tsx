import { useTranslation } from '../i18n/LanguageContext';
import SectionHeader from '../components/site/section-header';
import PgpCard from '../components/site/pgp-card';
import { bio, site } from '../content/site';

export default function AboutPage() {
  const { language } = useTranslation();

  return (
    <>
      <section className="border-b border-border px-6 pb-section-tight pt-section">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="04"
            label={language === 'en' ? 'About' : 'Minust'}
            title={language === 'en' ? 'The way of seeing.' : 'Nägemisviis.'}
          />
        </div>
      </section>

      <section className="px-6 py-section-tight">
        <div className="mx-auto max-w-measure">
          <h2 className="sr-only">{language === 'en' ? 'Bio' : 'Biograafia'}</h2>
          <div className="space-y-8 font-serif text-xl leading-relaxed text-foreground">
            {bio.paragraphs.map((p, i) => (
              <p key={i}>{p[language]}</p>
            ))}
          </div>

          <div className="mt-16 rounded-figure bg-surface-2 p-6 ring-1 ring-inset ring-border">
            <h2 className="label text-warning">
              {language === 'en' ? 'Kratt' : 'Kratti'}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              {bio.kratt[language]}
            </p>
          </div>

          <div className="mt-16 border-t border-border pt-8">
            <h2 className="mb-4 label text-accent">
              {language === 'en' ? 'Find me' : 'Leia mind'}
            </h2>
            <div className="flex flex-wrap gap-x-8 font-mono text-sm">
              <a href={site.contact.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center text-foreground transition-colors hover:text-accent">
                GitHub
              </a>
              <a href={site.contact.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center text-foreground transition-colors hover:text-accent">
                LinkedIn
              </a>
              <a href={site.contact.email} className="inline-flex min-h-11 min-w-11 items-center text-foreground transition-colors hover:text-accent">
                Email
              </a>
            </div>

            <div className="mt-8">
              <h3 className="mb-3 label text-accent">PGP</h3>
              <PgpCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
