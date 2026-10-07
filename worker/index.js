// Edge layer for AI agents, in front of the GitHub Pages origin.
//
// - Every HTML response gets a Link header pointing agents at the sitemap and
//   llms.txt, plus Vary: Accept, because the same URL also serves Markdown.
// - A request with `Accept: text/markdown` gets the page converted to Markdown
//   (Workers AI toMarkdown, free for HTML). The origin HTML is prerendered by
//   scripts/spa-routes.mjs, so the conversion sees the full article text.
//
// Fails open: on any conversion error the reader gets the HTML.

// Keep in step with public/robots.txt.
const CONTENT_SIGNAL = 'search=yes, ai-input=yes, ai-train=yes';
const LINK =
  '</sitemap.xml>; rel="sitemap"; type="application/xml", ' +
  '</llms.txt>; rel="describedby"; type="text/plain"';

const isHtml = (res) => (res.headers.get('Content-Type') ?? '').startsWith('text/html');

function withAgentHeaders(res) {
  const out = new Response(res.body, res);
  out.headers.append('Link', LINK);
  out.headers.append('Vary', 'Accept');
  out.headers.set('Content-Signal', CONTENT_SIGNAL);
  return out;
}

// Duplicate full-text / machine files: keep them fetchable but out of the index.
const NOINDEX = /^\/(verification\/[^/]+\.txt|sbom\.json)$/;

function withNoindex(res, url) {
  if (!NOINDEX.test(url.pathname)) return res;
  const out = new Response(res.body, res);
  out.headers.set('X-Robots-Tag', 'noindex');
  return out;
}

// Strip page chrome before conversion so the Markdown is article text only:
// scripts (incl. JSON-LD), styles, skip link, nav, footer. The H1 is captured
// separately because toMarkdown drops it on some layouts (home, BotGuard).
async function cleanHtml(html) {
  const pieces = [];
  const rewritten = new HTMLRewriter()
    .on('script, style, noscript, nav, footer, a[href="#main-content"]', {
      element: (el) => el.remove(),
    })
    .on('h1', {
      text: (t) => {
        pieces.push(t.text);
      },
    })
    .transform(new Response(html));
  const clean = await rewritten.text();
  // One entry per text node; join with a space so adjacent spans do not fuse.
  const h1 = pieces.join(' ').replace(/\s+/g, ' ').replace(/\s+([.,;:!?])/g, '$1').trim();
  return { clean, h1 };
}

async function toMarkdown(html, res, env) {
  const { clean, h1 } = await cleanHtml(html);
  const [doc] = await env.AI.toMarkdown([
    { name: 'index.html', blob: new Blob([clean], { type: 'text/html' }) },
  ]);
  if (doc?.format !== 'markdown' || !doc.data) throw new Error(doc?.error ?? 'conversion failed');
  const body = h1 && !/^# /m.test(doc.data) ? `# ${h1}\n\n${doc.data}` : doc.data;
  const headers = new Headers(res.headers);
  // These describe the HTML body, not this one.
  for (const h of ['Content-Encoding', 'Content-Length', 'ETag', 'Last-Modified']) headers.delete(h);
  headers.set('Content-Type', 'text/markdown; charset=utf-8');
  headers.set('Content-Signal', CONTENT_SIGNAL);
  headers.set('Link', LINK);
  headers.append('Vary', 'Accept');
  if (doc.tokens) headers.set('x-markdown-tokens', String(doc.tokens));
  return new Response(body, { status: res.status, headers });
}

export default {
  async fetch(request, env, ctx) {
    const accept = request.headers.get('Accept') ?? '';
    if (request.method !== 'GET' || !accept.includes('text/markdown')) {
      const res = await fetch(request);
      return isHtml(res) ? withAgentHeaders(res) : withNoindex(res, new URL(request.url));
    }

    // Markdown is cached under its own key so HTML and Markdown never mix.
    const url = new URL(request.url);
    url.searchParams.set('__format', 'md');
    const cacheKey = new Request(url.toString());
    const cached = await caches.default.match(cacheKey);
    if (cached) return cached;

    const res = await fetch(request);
    if (!isHtml(res) || !res.ok) return isHtml(res) ? withAgentHeaders(res) : withNoindex(res, url);
    const html = await res.text();
    try {
      const md = await toMarkdown(html, res, env);
      ctx.waitUntil(caches.default.put(cacheKey, md.clone()));
      return md;
    } catch (err) {
      console.error('markdown conversion failed', request.url, err);
      return withAgentHeaders(new Response(html, res));
    }
  },
};
