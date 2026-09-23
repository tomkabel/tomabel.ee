import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { LanguageProvider, LanguageScope, useTranslation } from './i18n';
import { englishOnlyArticles } from './content/site';
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
const TheFixThatDoesntNeedSkPage = React.lazy(() => import('./pages/TheFixThatDoesntNeedSkPage'));
const BotGuardDisassembledResearchPage = React.lazy(() => import('./pages/BotGuardDisassembledResearchPage'));
const SmartIdAchillesHeelResearchPage = React.lazy(() => import('./pages/SmartIdAchillesHeelResearchPage'));
const ZeroTrustOctagonResearchPage = React.lazy(() => import('./pages/ZeroTrustOctagonResearchPage'));
const PactSoftwareAnchorTurnResearchPage = React.lazy(() => import('./pages/PactSoftwareAnchorTurnResearchPage'));
const ChatgptIsNotAPhishingScannerResearchPage = React.lazy(() => import('./pages/ChatgptIsNotAPhishingScannerResearchPage'));
const TheEvolutionOfCyberFraudInEstoniaResearchPage = React.lazy(() => import('./pages/TheEvolutionOfCyberFraudInEstoniaResearchPage'));
const ThePinThatCannotBeDelegatedResearchPage = React.lazy(() => import('./pages/ThePinThatCannotBeDelegatedResearchPage'));
const RussianCyberOpsEstoniaHostingResearchPage = React.lazy(() => import('./pages/RussianCyberOpsEstoniaHostingResearchPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const MyStoryPage = React.lazy(() => import('./pages/MyStoryPage'));
const VlmAntiFraudResearchPage = React.lazy(() => import('./pages/VlmAntiFraudResearchPage'));
const NineDimensionsZeroTrustPage = React.lazy(() => import('./pages/NineDimensionsZeroTrustPage'));
const Fortune500IllusionResearchPage = React.lazy(() => import('./pages/Fortune500IllusionResearchPage'));
const MoveFastFixItInProdResearchPage = React.lazy(() => import('./pages/MoveFastFixItInProdResearchPage'));
const SaasGluedLeanDefenseResearchPage = React.lazy(() => import('./pages/SaasGluedLeanDefenseResearchPage'));
const IdentityRootProofGateResearchPage = React.lazy(() => import('./pages/IdentityRootProofGateResearchPage'));

// Old /research/<slug> and /writing/<slug> deep links now live under
// /disclosures/<slug> (slug unchanged). Preserve the leaf, swap the parent.
function LegacyDisclosureRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? `/disclosures/${slug}` : '/disclosures'} replace />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  const lastPath = React.useRef(pathname);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    // SPA route change: move focus to the content landmark so keyboard and
    // screen-reader users start the new view (WCAG 2.4.3). Not on first load,
    // where the first Tab must still reach the skip link and the nav.
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
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
  const { t } = useTranslation();
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status" aria-label={t.app.loading}>
      <div className="h-px w-24 overflow-hidden bg-border-strong">
        <div className="h-full w-2/5 animate-scan bg-accent" />
      </div>
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
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-control focus:font-medium"
    >
      {t.app.skipToContent}
    </a>
  );
}

// English-only articles render inside an English scope whatever the reader's
// preference, so the page's lang, its reader rail and its proof panel all
// agree with the text. Estonian readers get told why before the article starts.
function EnglishOnly({ children }: { children: React.ReactNode }) {
  const { language, t } = useTranslation();
  return (
    <>
      {language !== 'en' ? (
        <p role="note" className="border-b border-border bg-surface px-6 py-3 text-sm text-warning">
          <span className="mx-auto block max-w-4xl">{t.app.englishOnlyNotice}</span>
        </p>
      ) : null}
      <LanguageScope lang="en">{children}</LanguageScope>
    </>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const page = <Lazy>{children}</Lazy>;
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Seo />
      <SiteNav />
      <main id="main-content" className="flex-1 focus:outline-none">
        {englishOnlyArticles.has(pathname.replace(/\/+$/, '')) ? <EnglishOnly>{page}</EnglishOnly> : page}
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
            <Route path="/disclosures/the-fix-that-doesnt-need-sk" element={<Layout><Lazy><TheFixThatDoesntNeedSkPage /></Lazy></Layout>} />
            <Route path="/disclosures/botguard-disassembled" element={<Layout><Lazy><BotGuardDisassembledResearchPage /></Lazy></Layout>} />
            <Route path="/disclosures/smart-id-achilles-heel" element={<Layout><Lazy><SmartIdAchillesHeelResearchPage /></Lazy></Layout>} />
            <Route path="/disclosures/zero-trust-octagon" element={<Layout><Lazy><ZeroTrustOctagonResearchPage /></Lazy></Layout>} />
            <Route path="/disclosures/pact-software-anchor-turn" element={<Layout><Lazy><PactSoftwareAnchorTurnResearchPage /></Lazy></Layout>} />
            <Route path="/disclosures/chatgpt-is-not-a-phishing-scanner" element={<Layout><Lazy><ChatgptIsNotAPhishingScannerResearchPage /></Lazy></Layout>} />
            <Route path="/disclosures/the-evolution-of-cyber-fraud-in-estonia" element={<Layout><Lazy><TheEvolutionOfCyberFraudInEstoniaResearchPage /></Lazy></Layout>} />
            <Route path="/disclosures/the-pin-that-cannot-be-delegated" element={<Layout><Lazy><ThePinThatCannotBeDelegatedResearchPage /></Lazy></Layout>} />
            <Route path="/disclosures/russian-cyber-ops-estonia-hosting" element={<Layout><Lazy><RussianCyberOpsEstoniaHostingResearchPage /></Lazy></Layout>} />
            <Route path="/about" element={<Layout><Lazy><AboutPage /></Lazy></Layout>} />
            <Route path="/my-story" element={<Layout><Lazy><MyStoryPage /></Lazy></Layout>} />
            <Route path="/disclosures/why-vlms-break-client-side-anti-fraud" element={<Layout><Lazy><VlmAntiFraudResearchPage /></Lazy></Layout>} />
            <Route path="/disclosures/nine-dimensions-of-zero-trust" element={<Layout><Lazy><NineDimensionsZeroTrustPage /></Lazy></Layout>} />
            <Route path="/disclosures/the-fortune-500-illusion-of-control" element={<Layout><Lazy><Fortune500IllusionResearchPage /></Lazy></Layout>} />
            <Route path="/disclosures/move-fast-fix-it-in-prod" element={<Layout><Lazy><MoveFastFixItInProdResearchPage /></Lazy></Layout>} />
            <Route path="/disclosures/saas-glued-lean-defense" element={<Layout><Lazy><SaasGluedLeanDefenseResearchPage /></Lazy></Layout>} />
            <Route path="/disclosures/identity-is-the-root-proof-is-the-gate" element={<Layout><Lazy><IdentityRootProofGateResearchPage /></Lazy></Layout>} />

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
