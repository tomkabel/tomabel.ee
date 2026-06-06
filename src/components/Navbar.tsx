import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';
import { useTranslation } from '../i18n';
import { onScrollFrame } from '../lib/scroll';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { t, language, setLanguage } = useTranslation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [blurIntensity, setBlurIntensity] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      const y = window.scrollY;
      setScrolled(y > 20);
      setBlurIntensity(Math.min(20, Math.abs(y) * 0.001));
    }
    update();
    return onScrollFrame(update);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.split('#')[1]);
    let rafId: number;

    function updateActive() {
      const viewMiddle = window.innerHeight / 3;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewMiddle) {
          current = id;
        }
      }
      setActiveSection(current);
    }

    updateActive();
    return onScrollFrame(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActive);
    });
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      const firstLink = mobileMenuRef.current?.querySelector<HTMLAnchorElement>('a[href]');
      firstLink?.focus();
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'et' ? 'en' : 'et');
  }, [language, setLanguage]);

  const scrollToSection = useCallback((href: string) => {
    const id = href.split('#')[1];
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const navLinks = [
    { href: '/#reverse-engineering', key: 'capabilities' as const },
    { href: '/#research', key: 'research' as const },
    { href: '/#contact', key: 'contact' as const },
    { href: '/#pgp', key: 'pgp' as const },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-[background,border-color] duration-300"
      role="navigation"
      aria-label={t.nav.services}
      style={{
        backdropFilter: scrolled ? `blur(${Math.max(8, Math.round(blurIntensity))}px)` : 'none',
        WebkitBackdropFilter: scrolled ? `blur(${Math.max(8, Math.round(blurIntensity))}px)` : 'none',
        background: scrolled ? `rgba(2,2,3,${Math.min(0.95, 0.7 + blurIntensity * 0.01)})` : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(26,26,46,0.8)' : '1px solid transparent',
      }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-radar-signal focus-visible:outline-offset-1 rounded">
            <div className="font-display text-white font-bold text-xl tracking-tight">
              Tom<span className="text-radar-signal">.</span>Abel
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const sectionId = link.href.split('#')[1];
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all focus-visible:outline-2 focus-visible:outline-radar-signal focus-visible:outline-offset-1 ${
                    isActive
                      ? 'text-radar-signal bg-radar-signal/[0.08]'
                      : 'text-radar-text-secondary hover:text-radar-signal hover:bg-radar-grid/50'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {t.nav.links[link.key]}
                </a>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-radar-text-secondary hover:text-radar-signal hover:bg-radar-grid/50 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-radar-signal focus-visible:outline-offset-1"
              aria-label={language === 'et' ? 'Switch to English' : 'Switch to Estonian'}
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span className="uppercase">{language}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-3 rounded-lg text-radar-text-secondary hover:text-radar-signal hover:bg-radar-grid/50 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-radar-signal focus-visible:outline-offset-1"
              aria-label={language === 'et' ? 'Switch to English' : 'Switch to Estonian'}
            >
              <Globe className="h-5 w-5" />
            </button>
            <button
              ref={menuButtonRef}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="p-2.5 rounded-lg text-radar-text-secondary hover:text-radar-signal hover:bg-radar-grid/50 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-radar-signal focus-visible:outline-offset-1"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.mobileMenu}
          className="lg:hidden bg-radar-bg/98 backdrop-blur-xl border-t border-radar-grid entrance-slide-down"
        >
          <div className="container-custom py-6 space-y-2">
            {navLinks.map((link) => {
              const sectionId = link.href.split('#')[1];
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                    closeMenu();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      scrollToSection(link.href);
                      closeMenu();
                    }
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all min-h-[48px] focus-visible:outline-2 focus-visible:outline-radar-signal focus-visible:outline-offset-1 ${
                    isActive
                      ? 'text-radar-signal bg-radar-signal/[0.08]'
                      : 'text-radar-text-secondary hover:text-radar-signal hover:bg-radar-grid'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <ChevronRight className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-radar-signal' : 'text-radar-signal'}`} aria-hidden="true" />
                  {t.nav.links[link.key]}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
