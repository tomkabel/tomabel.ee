import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider, useTranslation } from './i18n';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import RadarHero from './radar/RadarHero';
import { LazySection } from './lib/LazySection';
import RouteTransition from './lib/RouteTransition';

const CapabilityStrip = React.lazy(() => import('./radar/CapabilityStrip'));
const PrivacyPolicy = React.lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./components/TermsOfService'));
const CookiePolicy = React.lazy(() => import('./components/CookiePolicy'));
const Disclosure = React.lazy(() => import('./components/Disclosure'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const Footer = React.lazy(() => import('./components/Footer'));

function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <RadarHero />
        <React.Suspense fallback={<div className="h-40 bg-radar-surface" />}>
          <CapabilityStrip />
        </React.Suspense>
        <LazySection loader={() => import('./radar/CapabilitySections')} skeletonHeight={600} />
        <LazySection loader={() => import('./radar/ResearchSection')} skeletonHeight={500} />
        <LazySection loader={() => import('./radar/CtaSection')} skeletonHeight={400} />
        <LazySection loader={() => import('./components/Pgp')} skeletonHeight={300} />
      </main>
      <React.Suspense fallback={null}><Footer /></React.Suspense>
    </>
  );
}

function SkipLink() {
  const { t } = useTranslation();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-radar-signal focus:text-radar-bg focus:rounded-md"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById('main-content')?.focus();
        document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      {t.app.skipToContent}
    </a>
  );
}

function LegalLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <React.Suspense
        fallback={
          <div className="min-h-screen bg-radar-bg flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-radar-grid border-t-radar-signal animate-spin" />
              <span className="text-sm text-radar-text-muted font-mono">{t.app.loading}</span>
            </div>
          </div>
        }
      >
        <RouteTransition>{children}</RouteTransition>
      </React.Suspense>
      <React.Suspense fallback={null}><Footer /></React.Suspense>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-radar-bg">
          <ScrollProgress />
          <SkipLink />
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
