import Link from './link';
import { useTranslation } from '../../i18n/LanguageContext';
import { home, site } from '../../content/site';
import { pgpKey } from './pgp-key';

const legalLinks = [
  { to: '/privacy', label: { en: 'Privacy', et: 'Privaatsus' } },
  { to: '/terms', label: { en: 'Terms', et: 'Tingimused' } },
  { to: '/disclosure', label: { en: 'Disclosure policy', et: 'Avalikustamise poliitika' } },
] as const;

export default function SiteFooter() {
  const { language } = useTranslation();

  return (
    <footer className="border-t border-border px-6">
      <div className="mx-auto max-w-6xl py-16">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <p className="font-display text-sm font-semibold uppercase tracking-label text-foreground">
              {site.company.name}
            </p>
            <p className="mt-6 label text-silver">{home.footer.ethicsTitle[language]}</p>
            <p className="mt-2 max-w-xl text-sm text-muted">{home.footer.ethics[language]}</p>
            <p className="mt-6 max-w-xl text-sm text-muted-foreground">{site.disclaimer[language]}</p>
            {/* Encrypted contact: the full fingerprint, so it can be checked
                against the key without trusting this page's link. */}
            <a href={pgpKey.url} className="group mt-6 block rounded-figure border border-border bg-sunken p-4 transition-colors hover:border-accent/40">
              <span className="label text-subtle">PGP · {pgpKey.keyId}</span>
              <span className="mt-2 block break-words font-mono text-sm text-foreground group-hover:text-accent">{pgpKey.fingerprint}</span>
            </a>
          </div>
          {/* Site pages get their own group, so Research and My story are reachable
              from every page without sitting in the contact list. */}
          <div>
            <p className="mb-2 label font-bold text-muted-foreground">
              {language === 'en' ? 'Explore' : 'Sisu'}
            </p>
            <ul className="grid font-mono text-sm">
              <li>
                <Link className="inline-flex min-h-11 min-w-11 items-center text-foreground transition-colors hover:text-accent" to="/disclosures">
                  {language === 'en' ? 'Research' : 'Uuringud'}
                </Link>
              </li>
              <li>
                <Link className="inline-flex min-h-11 min-w-11 items-center text-foreground transition-colors hover:text-accent" to="/systems">
                  {language === 'en' ? 'Systems' : 'Süsteemid'}
                </Link>
              </li>
              <li>
                <Link className="inline-flex min-h-11 min-w-11 items-center text-foreground transition-colors hover:text-accent" to="/about">
                  {language === 'en' ? 'About me' : 'Minust'}
                </Link>
              </li>
              <li>
                <Link className="inline-flex min-h-11 min-w-11 items-center text-foreground transition-colors hover:text-accent" to="/my-story">
                  {language === 'en' ? 'My story' : 'Minu lugu'}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-2 label font-bold text-muted-foreground">
              {language === 'en' ? 'Legal' : 'Õigusinfo'}
            </p>
            <ul className="grid font-mono text-sm">
              {legalLinks.map((l) => (
                <li key={l.to}>
                  <Link className="inline-flex min-h-11 min-w-11 items-center text-foreground transition-colors hover:text-accent" to={l.to}>
                    {l.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* The nav's "Contact" item targets this list from any page. */}
          <div id="contact">
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
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-6 label text-subtle md:flex-row md:justify-between">
          {/* Build year in prerendered HTML, visit year after hydration. */}
          <span suppressHydrationWarning>&copy; {new Date().getFullYear()} Tom Kristian Abel · <span className="whitespace-nowrap">ProksiAbel OÜ</span></span>
          <span>
            {site.company.name} · {home.footer.registered[language]} {site.company.seat[language]} · Reg. {site.company.registryCode} · {home.footer.operating[language]}
          </span>
        </div>
      </div>
    </footer>
  );
}
