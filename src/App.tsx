import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Expertise from './components/Expertise';
import About from './components/About';
import Contact from './components/Contact';
import Pgp from './components/Pgp';
import Footer from './components/Footer';

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
        <Hero />
        <Services />
        <Expertise />
        <About />
        <Contact />
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
      <React.Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
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
        <div className="min-h-screen bg-slate-900">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-sky-500 focus:text-white focus:rounded-md"
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
