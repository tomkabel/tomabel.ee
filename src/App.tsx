import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RadarHero from './radar/RadarHero';
import CapabilitySections from './radar/CapabilitySections';
import ResearchSection from './radar/ResearchSection';
import CtaSection from './radar/CtaSection';
import Pgp from './components/Pgp';

const PrivacyPolicy = React.lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./components/TermsOfService'));
const CookiePolicy = React.lazy(() => import('./components/CookiePolicy'));
const Disclosure = React.lazy(() => import('./components/Disclosure'));
const NotFound = React.lazy(() => import('./components/NotFound'));

function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <RadarHero />
        <CapabilitySections />
        <ResearchSection />
        <CtaSection />
        <Pgp />
      </main>
      <Footer />
    </>
  );
}

function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <React.Suspense
        fallback={
          <div className="min-h-screen bg-[#020203] flex items-center justify-center">
            <div className="text-[#64748B]">Loading...</div>
          </div>
        }
      >
        {children}
      </React.Suspense>
      <Footer />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#020203]">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00D4FF] focus:text-[#020203] focus:rounded-md"
            onClick={(e) => { e.preventDefault(); const el = document.getElementById('main-content'); el?.focus(); el?.scrollIntoView(); }}
          >
            Skip to main content
          </a>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy" element={<LegalLayout><PrivacyPolicy /></LegalLayout>} />
            <Route path="/terms" element={<LegalLayout><TermsOfService /></LegalLayout>} />
            <Route path="/cookies" element={<LegalLayout><CookiePolicy /></LegalLayout>} />
            <Route path="/disclosure" element={<LegalLayout><Disclosure /></LegalLayout>} />
            <Route path="*" element={<LegalLayout><NotFound /></LegalLayout>} />
          </Routes>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
