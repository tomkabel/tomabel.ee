import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import { site } from '../../content/site';

export default function SiteFooter() {
  const { language } = useTranslation();

  return (
    <footer className="border-t border-border px-6">
      <div className="mx-auto max-w-6xl py-16">
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
            <p className="mb-2 label font-bold text-muted-foreground">
              {language === 'en' ? 'Contact' : 'Kontakt'}
            </p>
            <ul className="grid font-mono text-sm">
              <li>
                <a className="inline-flex min-h-11 min-w-11 items-center text-foreground transition-colors hover:text-accent" href={site.contact.github}>
                  GitHub
                </a>
              </li>
              <li>
                <a className="inline-flex min-h-11 min-w-11 items-center text-foreground transition-colors hover:text-accent" href={site.contact.linkedin}>
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="inline-flex min-h-11 min-w-11 items-center text-foreground transition-colors hover:text-accent" href={site.contact.email}>
                  Email
                </a>
              </li>
              <li>
                <a className="inline-flex min-h-11 min-w-11 items-center text-foreground transition-colors hover:text-accent" href="/public-key.asc">
                  PGP
                </a>
              </li>
              <li>
                <Link className="inline-flex min-h-11 min-w-11 items-center text-muted-foreground transition-colors hover:text-accent" to="/my-story">
                  {language === 'en' ? 'My story' : 'Minu lugu'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-6 label text-subtle md:flex-row md:justify-between">
          <span>&copy; {new Date().getFullYear()} Tom Kristian Abel · <span className="whitespace-nowrap">ProksiAbel OÜ</span></span>
          <span>{language === 'en' ? 'Personally accountable.' : 'Isiklikult vastutav.'}</span>
        </div>
      </div>
    </footer>
  );
}
