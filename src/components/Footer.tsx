import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import GitHubIcon from './GitHubIcon';
import LinkedInIcon from './LinkedInIcon';
import { contactInfo } from '../data/contact';
import { useTranslation } from '../i18n';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  const [revealed, setRevealed] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setRevealed(true);
      return () => {};
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' },
    );
    observer.observe(el);

    // If already in viewport on mount, reveal immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      setRevealed(true);
      observer.disconnect();
    }

    return () => { observer.disconnect(); };
  }, []);

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

  const linkClass = 'inline-flex items-center gap-2 text-sm text-radar-text-secondary hover:text-radar-signal transition-colors min-h-[44px] px-1 focus-visible:outline-2 focus-visible:outline-radar-signal focus-visible:outline-offset-1 rounded';

  return (
    <footer
      ref={footerRef}
      className="bg-radar-bg border-t border-radar-grid"
      style={{
        opacity: 0,
        transform: 'translateY(40px)',
        transition: revealed ? 'opacity 0.5s ease-out, transform 0.5s ease-out' : 'none',
      }}
    >
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="font-display text-white font-bold text-lg">Tom Kristian Abel</div>
              <p className="text-xs text-radar-text-muted">{t.footer.tagline}</p>
            </div>

            {/* Contact Quick Links */}
            <div className="space-y-3">
              <a href={`mailto:${contactInfo.email}`} className={linkClass}>
                <Mail className="h-4 w-4" />
                {contactInfo.email}
              </a>
              <a href={`tel:${contactInfo.phone}`} className={linkClass}>
                <Phone className="h-4 w-4" />
                {contactInfo.phoneDisplay}
              </a>
              <div className={`${linkClass} pointer-events-none`}>
                <MapPin className="h-4 w-4" />
                {contactInfo.address.display}
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://github.com/tkabel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-radar-text-muted hover:text-radar-signal hover:bg-radar-grid/50 active:scale-95 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-radar-signal focus-visible:outline-offset-1 rounded"
                  aria-label="GitHub profile"
                >
                  <GitHubIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/tomkabel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-radar-text-muted hover:text-radar-signal hover:bg-radar-grid/50 active:scale-95 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-radar-signal focus-visible:outline-offset-1 rounded"
                  aria-label="LinkedIn profile"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">{t.footer.services}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className={linkClass}>
                    <ArrowRight className="h-3 w-3" />
                    {t.nav.links[link.key as keyof typeof t.nav.links]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">{t.footer.legal}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    <ArrowRight className="h-3 w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">{t.footer.engage}</h3>
            <p className="text-radar-text-secondary text-sm mb-4">
              {t.footer.ctaDescription}
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-radar-signal hover:text-radar-signal/80 transition-colors min-h-[44px] px-1 focus-visible:outline-2 focus-visible:outline-radar-signal focus-visible:outline-offset-1 rounded"
            >
              {t.footer.getInTouch}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-radar-grid">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-radar-text-muted text-sm">
              © {currentYear} {contactInfo.company.name}. {t.footer.rights}
            </p>
            <p className="text-radar-text-muted text-xs">
              {contactInfo.company.name} • Reg. {contactInfo.company.registrationCode} • {contactInfo.address.full}
            </p>
          </div>
          {/* Colophon */}
          <p className="mt-6 text-center text-xs text-radar-text-muted font-mono tracking-tight">
            Set in Space Grotesk · Inter · JetBrains Mono
          </p>
        </div>
      </div>
    </footer>
  );
}
