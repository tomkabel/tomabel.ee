import { Shield, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { contactInfo } from '../data/contact';
import { useTranslation } from '../i18n';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const footerLinks = {
    services: [
      { label: t.footer.services, href: '/#services' },
      { label: t.footer.expertise, href: '/#expertise' },
      { label: t.footer.contact, href: '/#contact' },
      { label: t.footer.pgp, href: '/#pgp' },
    ],
    legal: [
      { label: t.footer.privacy, href: '/privacy' },
      { label: t.footer.terms, href: '/terms' },
      { label: t.footer.cookies, href: '/cookies' },
      { label: t.footer.disclosure, href: '/disclosure' },
    ],
  };

  return (
    <footer className="bg-slate-950 relative overflow-hidden">
      {/* Top Border Gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" aria-hidden="true" />

      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-3 group mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-shadow duration-300">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-white font-bold text-lg">ProksiAbel</span>
                <p className="text-xs text-slate-500">{t.hero.securityConsultancy}</p>
              </div>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {t.footer.brandDescription}
            </p>
            
            {/* Contact Quick Links */}
            <div className="space-y-3">
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-sky-400 transition-colors">
                <Mail className="h-4 w-4" />
                {contactInfo.email}
              </a>
              <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-sky-400 transition-colors">
                <Phone className="h-4 w-4" />
                {contactInfo.phoneDisplay}
              </a>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4" />
                {contactInfo.address.display}
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.services}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-sky-400 transition-colors group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.legal}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-sky-400 transition-colors group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.getInTouch}</h3>
            <p className="text-slate-400 text-sm mb-4">
              {t.footer.ctaDescription}
            </p>
            <a 
              href="/#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
            >
              {t.footer.ctaButton}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {currentYear} {contactInfo.company.name}. {t.footer.rights}
            </p>
            <p className="text-slate-600 text-xs">
              {contactInfo.company.name} • Reg. {contactInfo.company.registrationCode} • {contactInfo.address.full}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}