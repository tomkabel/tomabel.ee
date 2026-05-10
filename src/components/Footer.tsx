import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { contactInfo } from '../data/contact';
import { useTranslation } from '../i18n';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const footerLinks = {
    services: [
      { label: 'Capabilities', href: '/#reverse-engineering' },
      { label: 'Research', href: '/#research' },
      { label: 'Contact', href: '/#contact' },
      { label: 'PGP', href: '/#pgp' },
    ],
    legal: [
      { label: t.footer.privacy, href: '/privacy' },
      { label: t.footer.terms, href: '/terms' },
      { label: t.footer.cookies, href: '/cookies' },
      { label: t.footer.disclosure, href: '/disclosure' },
    ],
  };

  return (
    <footer className="bg-[#020203] border-t border-[#1a1a2e]">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="font-display text-white font-bold text-lg">Tom Kristian Abel</div>
              <p className="text-xs text-slate-500">Deep-Tech AI Engineering</p>
            </div>

            {/* Contact Quick Links */}
            <div className="space-y-3">
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-[#00D4FF] transition-colors">
                <Mail className="h-4 w-4" />
                {contactInfo.email}
              </a>
              <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-[#00D4FF] transition-colors">
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
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <ArrowRight className="h-3 w-3" />
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
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <ArrowRight className="h-3 w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-white font-semibold mb-4">Engage</h3>
            <p className="text-slate-400 text-sm mb-4">
              Available for contract and technical B2B partnership via ProksiAbel OÜ.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00D4FF] hover:text-[#00D4FF]/80 transition-colors"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#1a1a2e]">
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