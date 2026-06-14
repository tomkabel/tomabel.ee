import { useTranslation } from '../../i18n/LanguageContext';
import { site } from '../../content/site';

export default function SiteFooter() {
  const { language } = useTranslation();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="font-display text-lg text-foreground">
              {site.languages[language]}
            </p>
            <p className="mt-6 max-w-xl text-sm text-muted">
              {site.disclaimer[language]}
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              [{language === 'en' ? 'Contact' : 'Kontakt'}]
            </h4>
            <ul className="space-y-2 font-mono text-sm">
              <li>
                <a className="text-foreground transition-colors hover:text-accent" href={site.contact.github}>
                  GitHub
                </a>
              </li>
              <li>
                <a className="text-foreground transition-colors hover:text-accent" href={site.contact.linkedin}>
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="text-foreground transition-colors hover:text-accent" href={site.contact.email}>
                  Email
                </a>
              </li>
              <li>
                <a className="text-foreground transition-colors hover:text-accent" href="/public-key.asc">
                  PGP
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-widest text-subtle md:flex-row md:justify-between">
          <span>&copy; {new Date().getFullYear()} Tom Kristian Abel · ProksiAbel OÜ</span>
          <span>{language === 'en' ? 'Personally accountable.' : 'Isiklikult vastutav.'}</span>
        </div>
      </div>
    </footer>
  );
}
