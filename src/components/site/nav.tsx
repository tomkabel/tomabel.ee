import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import { Globe } from 'lucide-react';

const links = [
  { to: '/research', label: { en: 'Research', et: 'Uuringud' } },
  { to: '/projects', label: { en: 'Projects', et: 'Projektid' } },
  { to: '/writing', label: { en: 'Writing', et: 'Kirjutised' } },
  { to: '/about', label: { en: 'About', et: 'Minust' } },
] as const;

export default function SiteNav() {
  const location = useLocation();
  const { language, setLanguage, t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="size-2.5 animate-pulse rounded-full bg-accent" />
          <span className="font-display font-bold tracking-tight text-foreground">
            tomabel.ee
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden gap-8 text-xs font-medium uppercase tracking-widest text-muted-foreground md:flex">
            {links.map((l) => {
              const isActive = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative transition-colors hover:text-accent ${
                    isActive ? 'text-foreground' : ''
                  }`}
                >
                  <span aria-hidden className="mr-1 text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    /
                  </span>
                  {localize(l.label, language)}
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => setLanguage(language === 'en' ? 'et' : 'en')}
            className="flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
            aria-label={language === 'en' ? 'Switch to Estonian' : 'Switch to English'}
          >
            <Globe className="size-3.5" />
            {language === 'en' ? 'ET' : 'EN'}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-muted-foreground hover:text-foreground md:hidden"
            aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
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
          className="border-t border-border bg-background md:hidden"
          role="dialog"
          aria-label={t.nav.mobileMenu}
        >
          <div className="flex flex-col px-6 py-4 gap-3">
            {links.map((l) => {
              const isActive = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-sm font-medium uppercase tracking-widest transition-colors hover:text-accent ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {localize(l.label, language)}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

function localize<T extends { en: string; et: string }>(obj: T, lang: 'en' | 'et'): string {
  return obj[lang];
}
