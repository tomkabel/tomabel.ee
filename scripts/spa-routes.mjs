// GitHub Pages has no SPA rewrites: a request to /research serves 404.html with
// HTTP 404 unless pub/research/index.html exists. Emit one index.html shell per
// client route so every sitemap URL returns 200 (and /research 301s to
// /research/, which then serves the shell directly).
import { mkdirSync, copyFileSync } from 'node:fs';

const routes = [
  'research',
  'projects',
  'writing',
  'writing/i-used-to-break-authentication',
  'about',
  'privacy',
  'terms',
  'disclosure',
  'cookies',
];

for (const route of routes) {
  mkdirSync(`pub/${route}`, { recursive: true });
  copyFileSync('pub/index.html', `pub/${route}/index.html`);
}

console.log(`spa-routes: emitted ${routes.length} route shells`);
