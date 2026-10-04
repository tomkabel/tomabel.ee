// Build-time prerender entry. scripts/spa-routes.mjs renders every route to
// static HTML so the page reads without JavaScript (NoScript, Tor Browser's
// Safest mode, text crawlers); main.tsx then hydrates that markup.
import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { LanguageProvider } from './i18n';

// `prerender` (not renderToString) waits for every React.lazy page, so the
// output holds the page itself rather than its loading fallback. An unbounded
// progressiveChunkSize keeps every boundary inline: by default React outlines
// large ones behind an inline swap script, which no-JS readers (and the CSP)
// never run, leaving only the loader visible.
export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <ErrorBoundary>
        <LanguageProvider>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </LanguageProvider>
      </ErrorBoundary>
    </StrictMode>,
    { progressiveChunkSize: Infinity },
  );
  return new Response(prelude).text();
}
