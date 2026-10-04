import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import '@fontsource-variable/geist';
import '@fontsource/commit-mono/400.css';
import '@fontsource/commit-mono/500.css';
import '@fontsource/commit-mono/700.css';
import '@fontsource-variable/newsreader/opsz.css';
import './index.css';

const app = (
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

// Built pages arrive prerendered (scripts/spa-routes.mjs): hydrate them. The
// dev server and the 404 shell ship an empty root, and a host's SPA fallback
// may serve another route's markup: render those from scratch.
const root = document.getElementById('root')!;
const path = window.location.pathname.replace(/(.)\/+$/, '$1');
if (root.dataset.route === path) {
  hydrateRoot(root, app);
} else {
  root.replaceChildren();
  createRoot(root).render(app);
}
