import { Mail, Phone, MapPin, ArrowRight, Github, Linkedin } from 'lucide-react';
import { contactInfo } from '../data/contact';
import { useTranslation } from '../i18n';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const footerLinks = {
    services: [
      { key: 'capabilities', href: '/#reverse-engineering' },
      { key: 'research', href: '/#research' },
      { key: 'contact', href: '/#contact' },
      { key: 'pgp', href: '/#pgp' },
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
              <p className="text-xs text-[#64748B]">Deep-Tech AI Engineering</p>
            </div>

            {/* Contact Quick Links */}
            <div className="space-y-3">
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#00D4FF] transition-colors">
                <Mail className="h-4 w-4" />
                {contactInfo.email}
              </a>
              <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#00D4FF] transition-colors">
                <Phone className="h-4 w-4" />
                {contactInfo.phoneDisplay}
              </a>
              <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                <MapPin className="h-4 w-4" />
                {contactInfo.address.display}
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://github.com/tkabel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[#64748B] hover:text-[#00D4FF] transition-colors"
                  aria-label="GitHub profile"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/tomkabel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[#64748B] hover:text-[#00D4FF] transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.services}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#00D4FF] transition-colors"
                  >
                    <ArrowRight className="h-3 w-3" />
                    {t.nav.links[link.key as keyof typeof t.nav.links]}
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
                    className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#00D4FF] transition-colors"
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
            <h3 className="text-white font-semibold mb-4">{t.footer.engage}</h3>
            <p className="text-[#94A3B8] text-sm mb-4">
              {t.footer.ctaDescription}
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00D4FF] hover:text-[#00D4FF]/80 transition-colors"
            >
              {t.footer.getInTouch}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#1a1a2e]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#64748B] text-sm">
              © {currentYear} {contactInfo.company.name}. {t.footer.rights}
            </p>
            <p className="text-[#64748B] text-xs">
              {contactInfo.company.name} • Reg. {contactInfo.company.registrationCode} • {contactInfo.address.full}
            </p>
          </div>
          {/* Colophon */}
          <p className="mt-6 text-center text-xs text-[#64748B] font-mono tracking-tight">
            Set in Space Grotesk · Inter · JetBrains Mono
          </p>
        </div>
      </div>
    </footer>
  );
}