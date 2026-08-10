// GitHub Pages has no SPA rewrites: a request to /research serves 404.html with
// HTTP 404 unless pub/research/index.html exists. Emit one index.html shell per
// client route so every sitemap URL returns 200 (and /research 301s to
// /research/, which then serves the shell directly).
//
// Each shell is stamped with ITS OWN title/description/canonical/og tags so the
// raw HTML (what AI crawlers and first-pass Googlebot see) is per-route, not a
// homepage duplicate. The client-side Seo component (src/components/Seo.tsx)
// rewrites the same tags at runtime — keep this map in sync with its META map.
import { mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';

const BASE = 'https://tomabel.ee';

// Per-route static meta, stamped into each shell. Mirrors Seo.tsx META.
const META = {
  research: {
    title: 'Research & Publications — Tom Kristian Abel',
    description:
      'Technical papers, analyses, and findings from ongoing security research.',
  },
  projects: {
    title: 'Featured Projects — Tom Kristian Abel',
    description:
      'Selected projects demonstrating capability across reverse engineering, security tooling, infrastructure, and research.',
  },
  writing: {
    title: 'Writing — Tom Kristian Abel',
    description:
      'Essays and arguments connecting the research. Less formal than the research, more opinionated.',
  },
  'writing/i-used-to-break-authentication': {
    title:
      "I used to break authentication. Here's what that taught me about building it. — Tom Kristian Abel",
    description:
      'The thesis essay for everything else on this site: why understanding offense is a prerequisite for credible defense, and what the authentication arms race looks like from both sides.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline:
        "I used to break authentication. Here's what that taught me about building it.",
      description:
        'The thesis essay for everything else on this site: why understanding offense is a prerequisite for credible defense, and what the authentication arms race looks like from both sides.',
      url: `${BASE}/writing/i-used-to-break-authentication/`,
      datePublished: '2026-06-22',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: `${BASE}/`,
      },
    },
  },
  'writing/what-client-side-trust-is-actually-worth': {
    title: 'What client-side trust is actually worth — Tom Kristian Abel',
    description:
      "Using the BotGuard teardown as a case study: the structural reason any defense that runs on a machine you don't control is negotiable, and what to do about it.",
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'What client-side trust is actually worth',
      description:
        "Using the BotGuard teardown as a case study: the structural reason any defense that runs on a machine you don't control is negotiable, and what to do about it.",
      url: `${BASE}/writing/what-client-side-trust-is-actually-worth/`,
      datePublished: '2026-08-11',
      author: {
        '@type': 'Person',
        name: 'Tom Kristian Abel',
        url: `${BASE}/`,
      },
    },
  },
  about: {
    title: 'About — Tom Kristian Abel',
    description:
      'The way of seeing — background, philosophy, and how to work with Tom Kristian Abel.',
  },
  privacy: {
    title: 'Privacy Policy — Tom Kristian Abel',
    description:
      'What little data tomabel.ee collects and how it is handled. No cross-site tracking.',
  },
  terms: {
    title: 'Terms of Service — Tom Kristian Abel',
    description: 'The rules for using tomabel.ee.',
  },
  disclosure: {
    title: 'Security Research Policy — ProksiAbel OÜ',
    description:
      'How we handle security research: rules, disclosure process, and how to contact us.',
  },
  cookies: {
    title: 'Cookie Policy — Tom Kristian Abel',
    description: 'Cookies (or lack thereof) on tomabel.ee.',
  },
};

const routes = Object.keys(META);

for (const route of routes) {
  const url = `${BASE}/${route}/`;
  const meta = META[route];
  mkdirSync(`pub/${route}`, { recursive: true });
  let html = readFileSync('pub/index.html', 'utf-8');

  // Stamp per-route meta into the static HTML.
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${meta.description}" />`,
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${url}" />`,
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${url}" />`,
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${meta.title}" />`,
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${meta.description}" />`,
  );
  html = html.replace(
    /<meta name="twitter:url" content="[^"]*" \/>/,
    `<meta name="twitter:url" content="${url}" />`,
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${meta.title}" />`,
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${meta.description}" />`,
  );

  // Per-route JSON-LD (e.g. BlogPosting for the essay): insert alongside the
  // base Person/WebSite block instead of replacing it.
  if (meta.jsonLd) {
    html = html.replace(
      '</head>',
      `<script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>\n    </head>`,
    );
  }

  writeFileSync(`pub/${route}/index.html`, html);
}

// Build-time gate: every route shell must carry exactly ONE canonical pointing
// at itself. A dual-canonical or homepage-canonical regression fails the build.
const offenders = routes
  .map((route) => {
    const html = readFileSync(`pub/${route}/index.html`, 'utf-8');
    const canonicals = [...html.matchAll(/rel="canonical"/g)].length;
    const pointsAtSelf = html.includes(`<link rel="canonical" href="${BASE}/${route}/" />`);
    return { route, canonicals, pointsAtSelf };
  })
  .filter((r) => r.canonicals !== 1 || !r.pointsAtSelf);
if (offenders.length > 0) {
  console.error('FAIL: canonical gate — each route needs exactly 1 self-canonical:', offenders);
  process.exit(1);
}

console.log(`spa-routes: emitted ${routes.length} route shells with per-route meta`);

// GH Pages fallback for unknown paths: serve a noindex copy of the shell.
// HTTP 404 + noindex keeps unknown URLs out of the index.
const notFound = readFileSync('pub/index.html', 'utf-8').replace(
  '</head>',
  '    <meta name="robots" content="noindex" />\n  </head>',
);
writeFileSync('pub/404.html', notFound);
