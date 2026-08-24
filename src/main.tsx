import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import '@fontsource-variable/geist';
import '@fontsource-variable/space-grotesk';
import '@fontsource/commit-mono/400.css';
import '@fontsource/commit-mono/500.css';
import '@fontsource/commit-mono/700.css';
import '@fontsource-variable/newsreader';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
