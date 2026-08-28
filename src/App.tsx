import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { LanguageProvider, useTranslation } from './i18n';
import SiteNav from './components/site/nav';
import SiteFooter from './components/site/footer';
import HomePage from './pages/HomePage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Disclosure from './components/Disclosure';
import NotFound from './components/NotFound';
import Cookies from './components/Cookies';
import Seo from './components/Seo';

const DisclosuresPage = React.lazy(() => import('./pages/DisclosuresPage'));
const SystemsPage = React.lazy(() => import('./pages/SystemsPage'));
const AuthenticationEssayPage = React.lazy(() => import('./pages/AuthenticationEssayPage'));
const WhatClientSideTrustIsActuallyWorthPage = React.lazy(() => import('./pages/WhatClientSideTrustIsActuallyWorthPage'));
const KrattProblemPage = React.lazy(() => import('./pages/KrattProblemPage'));
const CoordinatedDisclosureInASmallCountryPage = React.lazy(() => import('./pages/CoordinatedDisclosureInASmallCountryPage'));
const BotGuardDisassembledResearchPage = React.lazy(() => import('./pages/BotGuardDisassembledResearchPage'));
const SmartIdAchillesHeelResearchPage = React.lazy(() => import('./pages/SmartIdAchillesHeelResearchPage'));
const ZeroTrustOctagonResearchPage = React.lazy(() => import('./pages/ZeroTrustOctagonResearchPage'));
const PactSoftwareAnchorTurnResearchPage = React.lazy(() => import('./pages/PactSoftwareAnchorTurnResearchPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));

// Old /research/<slug> and /writing/<slug> deep links now live under
// /disclosures/<slug> (slug unchanged). Preserve the leaf, swap the parent.
function LegacyDisclosureRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? `/disclosures/${slug}` : '/disclosures'} replace />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
    // SPA route change: move focus to the content landmark so keyboard and
    // screen-reader users start the new view (WCAG 2.4.3).
    const main = document.getElementById('main-content');
    if (main) {
      main.setAttribute('tabindex', '-1');
      (main as HTMLElement).focus({ preventScroll: true });
    }
  }, [pathname]);
  return null;
}

function Lazy({ children }: { children: React.ReactNode }) {
  return <React.Suspense fallback={<PageLoader />}>{children}</React.Suspense>;
}

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="size-2.5 animate-pulse rounded-full bg-accent" />
    </div>
  );
}

function SkipLink() {
  const { t } = useTranslation();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const main = document.getElementById('main-content');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus();
    }
  };
  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-md"
    >
      {t.app.skipToContent}
    </a>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Seo />
      <SiteNav />
      <main id="main-content" className="flex-1 focus:outline-none">
        <Lazy>{children}</Lazy>
      </main>
      <SiteFooter />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <ScrollToTop />
          <SkipLink />
          <Routes>
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/disclosures" element={<Layout><Lazy><DisclosuresPage /></Lazy></Layout>} />
            <Route path="/systems" element={<Layout><Lazy><SystemsPage /></Lazy></Layout>} />
            <Route path="/disclosures/i-used-to-break-authentication" element={<Layout><Lazy><AuthenticationEssayPage /></Lazy></Layout>} />
            <Route path="/disclosures/what-client-side-trust-is-actually-worth" element={<Layout><Lazy><WhatClientSideTrustIsActuallyWorthPage /></Lazy></Layout>} />
            <Route path="/disclosures/the-kratt-problem" element={<Layout><Lazy><KrattProblemPage /></Lazy></Layout>} />
            <Route path="/disclosures/coordinated-disclosure-in-a-small-country" element={<Layout><Lazy><CoordinatedDisclosureInASmallCountryPage /></Lazy></Layout>} />
            <Route path="/disclosures/botguard-disassembled" element={<Layout><Lazy><BotGuardDisassembledResearchPage /></Lazy></Layout>} />
            <Route path="/disclosures/smart-id-achilles-heel" element={<Layout><Lazy><SmartIdAchillesHeelResearchPage /></Lazy></Layout>} />
            <Route path="/disclosures/zero-trust-octagon" element={<Layout><Lazy><ZeroTrustOctagonResearchPage /></Lazy></Layout>} />
            <Route path="/disclosures/pact-software-anchor-turn" element={<Layout><Lazy><PactSoftwareAnchorTurnResearchPage /></Lazy></Layout>} />
            <Route path="/about" element={<Layout><Lazy><AboutPage /></Lazy></Layout>} />

            {/* Legacy IA (pre-consolidation). Client-side 301-equivalent; server
                301s live in public/_redirects for hosts that honor it. */}
            <Route path="/research" element={<Navigate to="/disclosures" replace />} />
            <Route path="/writing" element={<Navigate to="/disclosures" replace />} />
            <Route path="/projects" element={<Navigate to="/systems" replace />} />
            <Route path="/research/:slug" element={<LegacyDisclosureRedirect />} />
            <Route path="/writing/:slug" element={<LegacyDisclosureRedirect />} />
            <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
            <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
            <Route path="/disclosure" element={<Layout><Disclosure /></Layout>} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
