import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { initialLanguage } from './i18n/LanguageContext.tsx';
import '@fontsource-variable/geist';
import '@fontsource/commit-mono/400.css';
import '@fontsource/commit-mono/500.css';
import '@fontsource/commit-mono/700.css';
import '@fontsource-variable/newsreader/opsz.css';
import './index.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

// Route shells carry English prerendered markup (scripts/spa-routes.mjs).
// Hydrate it when the reader gets English; otherwise it would mismatch, so
// render from scratch. ponytail: Estonian readers see the English text, then
// the loader, then the page; per-locale shells would remove that.
if (root.hasChildNodes() && initialLanguage() === 'en') hydrateRoot(root, app);
else createRoot(root).render(app);
