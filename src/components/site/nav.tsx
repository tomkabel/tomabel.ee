import React from 'react';
import { useLocation } from 'react-router-dom';
import Link, { withSlash } from './link';
import { useTranslation } from '../../i18n/LanguageContext';
import { Globe, Activity } from 'lucide-react';
import Telemetry from './telemetry';

// One label per destination: /disclosures is "Research" everywhere, including
// the hero CTA and the index heading.
const links = [
  { to: '/disclosures', label: { en: 'Research', et: 'Uuringud' } },
  { to: '/systems', label: { en: 'Systems', et: 'Süsteemid' } },
  { to: '/about', label: { en: 'About', et: 'Minust' } },
] as const;

// Every page ends in the footer's contact list, so a fragment link reaches it
// from anywhere without a route change.
const contact = { href: '#contact', label: { en: 'Contact', et: 'Kontakt' } } as const;

export default function SiteNav() {
  const location = useLocation();
  const { language, setLanguage, t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [telemetryOpen, setTelemetryOpen] = React.useState(false);

  return (
    <nav aria-label={t.nav.primary} className="sticky top-0 z-50 border-b border-border bg-background px-6">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
        <Link to="/" className="group flex min-h-11 items-center gap-2.5">
          <span
            aria-hidden
            className="grid size-6 place-items-center rounded-hair border border-border-strong bg-surface font-mono text-xs font-bold leading-none text-accent transition-colors duration-fast group-hover:border-accent/50 group-hover:bg-surface-2"
          >
            /
          </span>
          <span className="font-display tracking-tight text-foreground">
            tomabel.ee
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden gap-7 text-sm font-medium text-muted-foreground md:flex">
            {links.map((l) => {
              const isActive = withSlash(location.pathname) === withSlash(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative inline-flex min-h-11 min-w-11 items-center justify-center transition-colors duration-fast after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:origin-left after:transition-transform after:duration-slow hover:text-foreground ${
                    isActive
                      ? 'text-foreground after:bg-accent'
                      : 'after:scale-x-0 after:bg-foreground/40 hover:after:scale-x-100'
                  }`}
                >
                  {localize(l.label, language)}
                </Link>
              );
            })}
            <a
              href={contact.href}
              className="relative inline-flex min-h-11 min-w-11 items-center justify-center transition-colors duration-fast after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:origin-left after:scale-x-0 after:bg-foreground/40 after:transition-transform after:duration-slow hover:text-foreground hover:after:scale-x-100"
            >
              {localize(contact.label, language)}
            </a>
          </div>

          {/* The icon alone did not say what it opens; at lg+ the name is shown,
              below that it stays in the accessible name and tooltip. */}
          <button
            onClick={() => setTelemetryOpen(true)}
            className="flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-control px-2 text-sm font-medium text-muted-foreground transition-colors duration-fast hover:bg-surface hover:text-accent"
            aria-label={t.telemetry.title}
            title={t.telemetry.title}
          >
            <Activity aria-hidden className="size-3.5" />
            <span aria-hidden className="hidden lg:inline">{t.telemetry.title}</span>
          </button>

          <button
            onClick={() => setLanguage(language === 'en' ? 'et' : 'en')}
            className="flex min-h-11 items-center gap-1.5 rounded-control px-2 text-sm font-medium text-muted-foreground transition-colors duration-fast hover:bg-surface hover:text-foreground"
            title={t.nav.switchLanguage}
          >
            <Globe aria-hidden className="size-3.5" />
            {/* Show the language the toggle switches TO, in its own tongue and
                marked as such. The hint keeps the visible label inside the
                accessible name (WCAG 2.5.3) while explaining the action in the
                current language. */}
            <span lang={language === 'en' ? 'et' : 'en'}>{language === 'en' ? 'Eesti' : 'English'}</span>
            <span className="sr-only">, {t.nav.switchLanguage}</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="grid size-11 place-items-center rounded-control text-muted-foreground transition-colors duration-fast hover:bg-surface hover:text-foreground md:hidden"
            aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background md:hidden"
        >
          <div className="grid px-6 py-2">
            {links.map((l) => {
              const isActive = withSlash(location.pathname) === withSlash(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-12 items-center border-b border-border text-base font-medium transition-colors hover:text-accent ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {localize(l.label, language)}
                </Link>
              );
            })}
            <a
              href={contact.href}
              onClick={() => setIsOpen(false)}
              className="flex min-h-12 items-center text-base font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              {localize(contact.label, language)}
            </a>
          </div>
        </div>
      )}

      <Telemetry open={telemetryOpen} onClose={() => setTelemetryOpen(false)} />
    </nav>
  );
}

function localize<T extends { en: string; et: string }>(obj: T, lang: 'en' | 'et'): string {
  return obj[lang];
}
