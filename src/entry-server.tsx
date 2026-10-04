import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { prerender } from 'react-dom/static';
import App from './App.tsx';

// Build-time only: scripts/spa-routes.mjs renders every route to HTML so
// crawlers and agents that do not run JS get the article text, not an empty
// #root.
export async function render(path: string): Promise<string> {
  const app = (
    <StrictMode>
      <App location={path} />
    </StrictMode>
  );
  // First pass only resolves the React.lazy pages. Its output streams Suspense
  // boundaries as fallback + inline swap scripts, which the CSP would block.
  // The second pass finds every lazy module resolved and emits plain markup.
  await new Response((await prerender(app)).prelude).arrayBuffer();
  return renderToString(app);
}
