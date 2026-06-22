import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, useTranslation } from './i18n';
import SiteNav from './components/site/nav';
import SiteFooter from './components/site/footer';
import HomePage from './pages/HomePage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Disclosure from './components/Disclosure';
import NotFound from './components/NotFound';
import Cookies from './components/Cookies';

const ResearchPage = React.lazy(() => import('./pages/ResearchPage'));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage'));
const WritingPage = React.lazy(() => import('./pages/WritingPage'));
const AuthenticationEssayPage = React.lazy(() => import('./pages/AuthenticationEssayPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
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
            <Route path="/research" element={<Layout><Lazy><ResearchPage /></Lazy></Layout>} />
            <Route path="/projects" element={<Layout><Lazy><ProjectsPage /></Lazy></Layout>} />
            <Route path="/writing" element={<Layout><Lazy><WritingPage /></Lazy></Layout>} />
            <Route path="/writing/i-used-to-break-authentication" element={<Layout><Lazy><AuthenticationEssayPage /></Lazy></Layout>} />
            <Route path="/about" element={<Layout><Lazy><AboutPage /></Lazy></Layout>} />
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
