import React from 'react';
import { Lock } from 'lucide-react';
import { contactInfo } from '../data/contact.tsx';
import { useTranslation } from '../i18n';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer role="contentinfo" className="bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="h-6 w-6 text-cyan-500" />
              <span className="text-white font-bold text-lg">ProksiAbel</span>
            </div>
            <p className="text-gray-400 text-sm">
              {currentYear} {contactInfo.company.name}. {t.footer.rights}
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.links}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#services" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  {t.footer.services}
                </a>
              </li>
              <li>
                <a href="/#expertise" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  {t.footer.expertise}
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  {t.footer.contact}
                </a>
              </li>
              <li>
                <a href="/#pgp" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  {t.footer.pgp}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.legal}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  {t.footer.terms}
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  {t.footer.cookies}
                </a>
              </li>
              <li>
                <a href="/disclosure" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                  {t.footer.disclosure}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <p className="text-gray-500 text-xs">
            ProksiAbel OÜ • Registrikood: {contactInfo.company.registrationCode} • {contactInfo.address.full}
          </p>
        </div>
      </div>
    </footer>
  );
}
