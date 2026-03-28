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
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookiePolicy from './components/CookiePolicy';
import Disclosure from './components/Disclosure';
import NotFound from './components/NotFound';
import Footer from './components/Footer';

function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
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

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-900">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-white focus:rounded-md"
          >
            Skip to main content
          </a>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy" element={
              <>
                <Navbar />
                <PrivacyPolicy />
                <Footer />
              </>
            } />
            <Route path="/terms" element={
              <>
                <Navbar />
                <TermsOfService />
                <Footer />
              </>
            } />
            <Route path="/cookies" element={
              <>
                <Navbar />
                <CookiePolicy />
                <Footer />
              </>
            } />
            <Route path="/disclosure" element={
              <>
                <Navbar />
                <Disclosure />
                <Footer />
              </>
            } />
            <Route path="*" element={
              <>
                <Navbar />
                <NotFound />
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
