import React from 'react';
import { Menu, X, Lock, Globe } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { t, language, setLanguage } = useTranslation();

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = React.useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleLanguage = React.useCallback(() => {
    setLanguage(language === 'et' ? 'en' : 'et');
  }, [language, setLanguage]);

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <Lock className="h-8 w-8 text-cyan-500" />
              <span className="text-white font-bold text-xl">ProksiAbel</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <a href="/#services" className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:rounded-md px-2 py-1 transition-colors">{t.nav.services}</a>
                <a href="/#expertise" className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:rounded-md px-2 py-1 transition-colors">{t.nav.expertise}</a>
                <a href="/#about" className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:rounded-md px-2 py-1 transition-colors">{t.nav.about}</a>
                <a href="/#contact" className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:rounded-md px-2 py-1 transition-colors">{t.nav.contact}</a>
                <a href="/#pgp" className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:rounded-md px-2 py-1 transition-colors">{t.nav.pgpKey}</a>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1.5 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-md transition-colors"
              aria-label={language === 'et' ? 'Switch to English' : 'Switch to Estonian'}
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium uppercase">{language}</span>
            </button>
            <a href="/#contact" className="px-4 py-2 rounded bg-cyan-500 text-white hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors">
              {t.nav.bookConsultation}
            </a>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-md"
              aria-label={language === 'et' ? 'Switch to English' : 'Switch to Estonian'}
            >
              <Globe className="h-5 w-5" />
            </button>
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-md p-1"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/95 backdrop-blur-sm">
            <a href="/#services" onClick={closeMenu} className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 block px-3 py-2">{t.nav.services}</a>
            <a href="/#expertise" onClick={closeMenu} className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 block px-3 py-2">{t.nav.expertise}</a>
            <a href="/#about" onClick={closeMenu} className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 block px-3 py-2">{t.nav.about}</a>
            <a href="/#contact" onClick={closeMenu} className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 block px-3 py-2">{t.nav.contact}</a>
            <a href="/#pgp" onClick={closeMenu} className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 block px-3 py-2">{t.nav.pgpKey}</a>
            <div className="px-3 py-2">
              <a href="/#contact" onClick={closeMenu} className="w-full px-4 py-2 rounded bg-cyan-500 text-white hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 block text-center transition-colors">
                {t.nav.bookConsultation}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
