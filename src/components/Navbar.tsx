import React, { useRef, useEffect, useCallback } from 'react';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';
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
    { href: '/#reverse-engineering', key: 'capabilities' as const },
    { href: '/#research', key: 'research' as const },
    { href: '/#contact', key: 'contact' as const },
    { href: '/#pgp', key: 'pgp' as const },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#020203]/95 backdrop-blur-xl border-b border-[#1a1a2e]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="font-display text-white font-bold text-xl tracking-tight">
              Tom<span className="text-[#00D4FF]">.</span>Abel
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-[#94A3B8] hover:text-[#00D4FF] transition-colors"
              >
                {t.nav.links[link.key]}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-[#00D4FF] transition-colors"
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
              className="p-3 rounded-lg text-[#94A3B8] hover:text-[#00D4FF] transition-colors"
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
              className="p-2.5 rounded-lg text-[#94A3B8] hover:text-[#00D4FF] transition-colors"
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
          aria-label={t.nav.mobileMenu}
          className="lg:hidden bg-[#020203]/98 backdrop-blur-xl border-t border-[#1a1a2e]"
        >
          <div className="container-custom py-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#94A3B8] hover:text-[#00D4FF] hover:bg-[#1a1a2e] transition-colors"
              >
                <ChevronRight className="h-4 w-4 text-[#00D4FF]" aria-hidden="true" />
                {t.nav.links[link.key]}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
