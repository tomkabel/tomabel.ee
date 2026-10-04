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

async function toMarkdown(html, res, env) {
  const [doc] = await env.AI.toMarkdown([
    { name: 'index.html', blob: new Blob([html], { type: 'text/html' }) },
  ]);
  if (doc?.format !== 'markdown' || !doc.data) throw new Error(doc?.error ?? 'conversion failed');
  const headers = new Headers(res.headers);
  // These describe the HTML body, not this one.
  for (const h of ['Content-Encoding', 'Content-Length', 'ETag', 'Last-Modified']) headers.delete(h);
  headers.set('Content-Type', 'text/markdown; charset=utf-8');
  headers.set('Content-Signal', CONTENT_SIGNAL);
  headers.set('Link', LINK);
  headers.append('Vary', 'Accept');
  if (doc.tokens) headers.set('x-markdown-tokens', String(doc.tokens));
  return new Response(doc.data, { status: res.status, headers });
}

export default {
  async fetch(request, env, ctx) {
    const accept = request.headers.get('Accept') ?? '';
    if (request.method !== 'GET' || !accept.includes('text/markdown')) {
      const res = await fetch(request);
      return isHtml(res) ? withAgentHeaders(res) : res;
    }

    // Markdown is cached under its own key so HTML and Markdown never mix.
    const url = new URL(request.url);
    url.searchParams.set('__format', 'md');
    const cacheKey = new Request(url.toString());
    const cached = await caches.default.match(cacheKey);
    if (cached) return cached;

    const res = await fetch(request);
    if (!isHtml(res) || !res.ok) return isHtml(res) ? withAgentHeaders(res) : res;
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
