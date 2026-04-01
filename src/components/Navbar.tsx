import React, { useRef, useEffect, useCallback } from 'react';
import { Menu, X, Globe, Shield, ChevronRight } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { t, language, setLanguage } = useTranslation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      mobileMenuRef.current?.focus();
      document.body.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
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
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'et' ? 'en' : 'et');
  }, [language, setLanguage]);

  const navLinks = [
    { href: '/#services', label: t.nav.services },
    { href: '/#expertise', label: t.nav.expertise },
    { href: '/#about', label: t.nav.about },
    { href: '/#contact', label: t.nav.contact },
    { href: '/#pgp', label: t.nav.pgpKey },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-slate-900/90 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-sky-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:shadow-sky-500/50 transition-shadow duration-300">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-xl tracking-tight">ProksiAbel</span>
              <span className="text-xs text-slate-500 -mt-0.5">{t.hero.securityConsultancy}</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-sky-500 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
              aria-label={language === 'et' ? 'Switch to English' : 'Switch to Estonian'}
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span className="uppercase">{language}</span>
            </button>

            <a
              href="/#contact"
              className="glow-button flex items-center gap-2 text-sm"
            >
              {t.nav.bookConsultation}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
              aria-label={language === 'et' ? 'Switch to English' : 'Switch to Estonian'}
            >
              <Globe className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              ref={menuButtonRef}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
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
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.services}
          className="lg:hidden bg-slate-900/95 backdrop-blur-2xl border-t border-white/5"
        >
          <div className="container-custom py-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200"
              >
                <ChevronRight className="h-4 w-4 text-sky-500" aria-hidden="true" />
                {link.label}
              </a>
            ))}
            <div className="pt-4">
              <a
                href="/#contact"
                onClick={closeMenu}
                className="glow-button w-full flex items-center justify-center gap-2"
              >
                {t.nav.bookConsultation}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
