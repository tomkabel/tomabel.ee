// GitHub Pages has no SPA rewrites: a request to /research serves 404.html with
// HTTP 404 unless pub/research/index.html exists. Emit one index.html shell per
// client route so every sitemap URL returns 200 (and /research 301s to
// /research/, which then serves the shell directly).
//
// Each shell is stamped with ITS OWN title/description/canonical/og tags so the
// raw HTML (what AI crawlers and first-pass Googlebot see) is per-route, not a
// homepage duplicate. Titles, descriptions and JSON-LD come from
// src/content/route-meta.ts, the same module src/components/Seo.tsx reads.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
// Node 22.18+ loads .ts directly (type stripping), so the build and the app
// share one metadata module with no copy to drift.
import { jsonLdFor, metaFor, pageUrl, routeMeta } from '../src/content/route-meta.ts';
// Built by `vite build --ssr src/entry-server.tsx` (see package.json "build").
import { render } from '../dist-ssr/entry-server.js';

// Values are stamped into HTML attributes and a <script> block: escape them
// for that context, and use function replacers so a `$` in copy is literal.
const attr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const setTag = (html, pattern, tag) => html.replace(pattern, () => tag);

// The static shells are the English originals; '/' is index.html itself.
const routes = Object.keys(routeMeta)
  .filter((path) => path !== '/')
  .map((path) => path.slice(1));

// The empty shell, read once: index.html itself gets the home page body below,
// and 404.html must stay empty so the client renders NotFound.
const shellTemplate = readFileSync('pub/index.html', 'utf-8');

// Routes that only <Navigate> elsewhere render nothing; leave their #root empty
// and give no-JS readers a meta refresh to the target instead.
const redirectRoutes = { '/cookies': '/privacy' };

// Put the prerendered page into #root, so crawlers and agents that do not run
// JS get the text. Gate: a real page with almost no text means the render
// broke (an empty lazy page, a thrown boundary) — fail rather than ship it.
async function withBody(html, path) {
  const target = redirectRoutes[path];
  if (target) {
    if (!html.includes('</head>')) {
      console.error(`FAIL: shell for ${path} has no </head>`);
      process.exit(1);
    }
    // noindex keeps the redirect stub out of search; the refresh lands on the canonical URL.
    const tags = `<meta name="robots" content="noindex" />\n    <noscript><meta http-equiv="refresh" content="0; url=${attr(pageUrl(target))}" /></noscript>`;
    return html.replace('</head>', () => `${tags}\n    </head>`);
  }
  const body = await render(path);
  const text = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length < 500) {
    console.error(`FAIL: prerender of ${path} has only ${text.length} chars of text`);
    process.exit(1);
  }
  if (!html.includes('<div id="root"></div>')) {
    console.error('FAIL: index.html has no empty <div id="root"></div>');
    process.exit(1);
  }
  return html.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
}

for (const route of routes) {
  const url = pageUrl(`/${route}`);
  const meta = metaFor(`/${route}`, 'en');
  const jsonLd = jsonLdFor(`/${route}`, 'en');
  mkdirSync(`pub/${route}`, { recursive: true });
  let html = shellTemplate;

  // Stamp per-route meta into the static HTML.
  const tags = [
    [/<title>[^<]*<\/title>/, `<title>${attr(meta.title)}</title>`],
    [/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${attr(meta.description)}" />`],
    [/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${attr(url)}" />`],
    [/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${meta.type}" />`],
    [/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${attr(url)}" />`],
    [/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${attr(meta.title)}" />`],
    [/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${attr(meta.description)}" />`],
    [/<meta name="twitter:url" content="[^"]*" \/>/, `<meta name="twitter:url" content="${attr(url)}" />`],
    [/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${attr(meta.title)}" />`],
    [/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${attr(meta.description)}" />`],
  ];
  for (const [pattern, tag] of tags) {
    // A tag missing from index.html would otherwise be skipped silently.
    if (!pattern.test(html)) {
      console.error(`FAIL: index.html has no tag matching ${pattern}`);
      process.exit(1);
    }
    html = setTag(html, pattern, tag);
  }

  // Per-route JSON-LD (e.g. BlogPosting for the essay): insert alongside the
  // base Person/WebSite block instead of replacing it.
  if (jsonLd) {
    const json = JSON.stringify(jsonLd).replace(/</g, '\\u003c');
    html = html.replace('</head>', () => `<script type="application/ld+json">${json}</script>\n    </head>`);
  }

  writeFileSync(`pub/${route}/index.html`, await withBody(html, `/${route}`));
}

// Build-time gate: every route shell must carry exactly ONE canonical pointing
// at itself. A dual-canonical or homepage-canonical regression fails the build.
const offenders = routes
  .map((route) => {
    const html = readFileSync(`pub/${route}/index.html`, 'utf-8');
    const canonicals = [...html.matchAll(/rel="canonical"/g)].length;
    const pointsAtSelf = html.includes(`<link rel="canonical" href="${pageUrl(`/${route}`)}" />`);
    return { route, canonicals, pointsAtSelf };
  })
  .filter((r) => r.canonicals !== 1 || !r.pointsAtSelf);
if (offenders.length > 0) {
  console.error('FAIL: canonical gate — each route needs exactly 1 self-canonical:', offenders);
  process.exit(1);
}

// Build-time gate: '/' is served from index.html as written (raw, unescaped),
// so its title and description must match the shared module, not drift from it.
const home = metaFor('/', 'en');
const shell = readFileSync('pub/index.html', 'utf-8');
if (
  !shell.includes(`<title>${home.title}</title>`) ||
  !shell.includes(`<meta name="description" content="${home.description}" />`)
) {
  console.error("FAIL: index.html <title>/description differ from routeMeta['/'].en in src/content/route-meta.ts");
  process.exit(1);
}

writeFileSync('pub/index.html', await withBody(shellTemplate, '/'));

console.log(`spa-routes: emitted ${routes.length + 1} prerendered route shells with per-route meta`);

// GH Pages fallback for unknown paths: serve a noindex copy of the shell.
// HTTP 404 + noindex keeps unknown URLs out of the index.
const notFound = shellTemplate.replace(
  '</head>',
  '    <meta name="robots" content="noindex" />\n  </head>',
);
writeFileSync('pub/404.html', notFound);
