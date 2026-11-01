import React from 'react';
import { useLocation } from 'react-router-dom';
import Link, { withSlash } from './link';
import { useTranslation } from '../../i18n/LanguageContext';
import { Globe, Activity } from 'lucide-react';
import Telemetry from './telemetry';
import { briefingHref, site } from '../../content/site';

// Homepage anchors first (the ProksiAbel OÜ offer), then the research index.
// One label per destination: /disclosures is "Research" everywhere.
const links = [
  { to: '/#architecture', label: { en: 'Architecture', et: 'Arhitektuur' } },
  { to: '/#aitm', label: { en: 'AiTM Resilience', et: 'AiTM-vastupidavus' } },
  { to: '/#fingerprintproxy', label: { en: 'FingerprintProxy', et: 'FingerprintProxy' } },
  { to: '/#principal', label: { en: 'Principal', et: 'Asutaja' } },
  { to: '/disclosures', label: { en: 'Research', et: 'Uuringud' } },
] as const;

const cta = { en: 'Schedule executive briefing', et: 'Broneeri juhtkonna briifing' } as const;

// Minimal prism: a glass triangle with one beam entering and leaving refracted.
function Prism() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-6" fill="none" strokeWidth="1.25" strokeLinejoin="round">
      <path d="M12 3 21 20H3Z" className="fill-foreground/5 stroke-silver" />
      <path d="M1 13h7.5" className="stroke-muted-foreground" />
      <path d="m15.5 10.5 7.5-3M16 13l7 0M15.5 15.5l7.5 3" className="stroke-accent" />
    </svg>
  );
}

export default function SiteNav() {
  const location = useLocation();
  const { language, setLanguage, t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [telemetryOpen, setTelemetryOpen] = React.useState(false);
  const isActive = (to: string) => !to.includes('#') && withSlash(location.pathname) === withSlash(to);
  const linkLabel = (l: (typeof links)[number]) => localize(l.label, language);

  return (
    <>
      {/* Registry telemetry. Scrolls away; only the nav below is sticky. */}
      <div className="border-b border-border bg-sunken px-6">
        <p className="label mx-auto flex min-h-8 max-w-6xl flex-wrap items-center gap-x-3 gap-y-1 py-2 text-subtle">
          <span className="whitespace-nowrap">EST. REG. {site.company.registryCode}</span>
          <span aria-hidden className="text-border-strong">//</span>
          <span className="whitespace-nowrap">{language === 'en' ? 'Tallinn — Pärnu County, Estonia' : 'Tallinn — Pärnumaa, Eesti'}</span>
          <span aria-hidden className="hidden text-border-strong md:inline">//</span>
          <span className="hidden md:inline">{language === 'en' ? 'Zero-trust architecture' : 'Nullusalduse arhitektuur'}</span>
        </p>
      </div>

      <nav aria-label={t.nav.primary} className="glass sticky top-0 z-50 border-x-0 border-t-0 bg-background/75 px-6">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4">
          <Link to="/" className="group flex min-h-11 items-center gap-2.5">
            <Prism />
            <span className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-label text-foreground">
              ProksiAbel OÜ
            </span>
          </Link>

          <div className="hidden gap-6 text-sm font-medium text-muted-foreground lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                aria-current={isActive(l.to) ? 'page' : undefined}
                className={`relative inline-flex min-h-11 items-center justify-center whitespace-nowrap transition-colors duration-fast after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:origin-left after:transition-transform after:duration-slow hover:text-foreground ${
                  isActive(l.to)
                    ? 'text-foreground after:bg-accent'
                    : 'after:scale-x-0 after:bg-accent/60 hover:after:scale-x-100'
                }`}
              >
                {linkLabel(l)}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <a href={briefingHref} className="btn-outline hidden whitespace-nowrap text-sm sm:inline-flex">
              {cta[language]}
            </a>

            {/* Icon only; the name is the accessible name and tooltip. */}
            <button
              onClick={() => setTelemetryOpen(true)}
              className="flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-control px-2 text-sm font-medium text-muted-foreground transition-colors duration-fast hover:bg-surface hover:text-accent"
              aria-label={t.telemetry.title}
              title={t.telemetry.title}
            >
              <Activity aria-hidden className="size-3.5" />
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
              <span lang={language === 'en' ? 'et' : 'en'}>{language === 'en' ? 'ET' : 'EN'}</span>
              <span className="sr-only">, {t.nav.switchLanguage}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="grid size-11 place-items-center rounded-control text-muted-foreground transition-colors duration-fast hover:bg-surface hover:text-foreground lg:hidden"
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
          <div id="mobile-menu" className="border-t border-border lg:hidden">
            <div className="grid py-2">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(l.to) ? 'page' : undefined}
                  className={`flex min-h-12 items-center border-b border-border text-base font-medium transition-colors hover:text-accent ${
                    isActive(l.to) ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {linkLabel(l)}
                </Link>
              ))}
              <a
                href={briefingHref}
                onClick={() => setIsOpen(false)}
                className="flex min-h-12 items-center text-base font-medium text-accent"
              >
                {cta[language]}
              </a>
            </div>
          </div>
        )}
      </nav>
      {/* Outside the nav: its backdrop-filter would become the drawer's
          containing block and clip the fixed overlay to the header. */}
      <Telemetry open={telemetryOpen} onClose={() => setTelemetryOpen(false)} />
    </>
  );
}

function localize<T extends { en: string; et: string }>(obj: T, lang: 'en' | 'et'): string {
  return obj[lang];
}
