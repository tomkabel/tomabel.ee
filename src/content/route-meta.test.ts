// Run with `pnpm test` (node:test, no framework).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { englishOnlyArticles } from './site.ts';
import { jsonLdFor, metaFor, notFoundMeta, pageUrl, routeMeta, type RouteMeta } from './route-meta.ts';

const routes = routeMeta as Record<string, RouteMeta>;
const paths = Object.keys(routes);

// Routes that render a page in Layout. Redirect-only routes (Navigate,
// Cookies → /privacy) and the catch-all are not pages.
const appPaths = [
  ...readFileSync(new URL('../App.tsx', import.meta.url), 'utf8').matchAll(
    /<Route path="(\/[^"*:]*)" element=\{<Layout>/g,
  ),
].map((m) => m[1] as string);

test('every page route in App.tsx has metadata, so none falls back to "Page Not Found"', () => {
  assert.ok(appPaths.length > 20, `parsed only ${appPaths.length} routes from App.tsx`);
  for (const path of appPaths) assert.ok(path in routes, `${path} is routed but has no entry in route-meta.ts`);
});

test('Estonian metadata exists exactly for pages with an Estonian body', () => {
  for (const path of paths) {
    const route = routes[path]!;
    if (englishOnlyArticles.has(path)) {
      assert.equal(route.et, undefined, `${path} is English-only but has et metadata`);
      assert.equal(route.ld?.et, undefined, `${path} is English-only but has et JSON-LD`);
    } else {
      assert.ok(route.et, `${path} has an Estonian body but no et metadata`);
      if (route.ld) assert.ok(route.ld.et, `${path} has et metadata but no et JSON-LD copy`);
    }
  }
});

test('titles and descriptions fit search-result limits and are distinct per language', () => {
  for (const lang of ['en', 'et'] as const) {
    const titles = new Set<string>();
    for (const path of paths) {
      const meta = routes[path]![lang];
      if (!meta) continue;
      assert.ok(meta.title.length <= 65, `${lang} ${path} title is ${meta.title.length} chars`);
      assert.ok(meta.description.length <= 160, `${lang} ${path} description is ${meta.description.length} chars`);
      assert.ok(!titles.has(meta.title), `${lang} title reused: ${meta.title}`);
      titles.add(meta.title);
    }
  }
});

test('metaFor falls back to English, then to the not-found copy', () => {
  const englishOnly = [...englishOnlyArticles][0]!;
  assert.deepEqual(
    { title: metaFor(englishOnly, 'et').title },
    { title: routes[englishOnly]!.en.title },
  );
  assert.equal(metaFor('/no-such-page', 'et').title, notFoundMeta.et.title);
  assert.equal(metaFor('/disclosures/zero-trust-octagon', 'en').type, 'article');
  assert.equal(metaFor('/systems', 'en').type, 'website');
});

test('JSON-LD declares the language of the copy it actually carries', () => {
  for (const path of paths) {
    for (const lang of ['en', 'et'] as const) {
      const ld = jsonLdFor(path, lang) as Record<string, unknown> | null;
      if (!routes[path]!.ld) {
        assert.equal(ld, null);
        continue;
      }
      const node = ((ld!['@graph'] as Record<string, unknown>[] | undefined)?.[0] ?? ld!) as Record<string, unknown>;
      const expected = routes[path]!.ld![lang] ? lang : 'en';
      assert.equal(node.inLanguage, expected, `${path} (${lang})`);
      assert.equal(node.url, pageUrl(path));
      const crumbs = (ld!['@graph'] as { itemListElement?: { name: string }[] }[] | undefined)?.[1]?.itemListElement;
      if (crumbs) assert.equal(crumbs[2]!.name, node.headline, `${path} breadcrumb names the article`);
    }
  }
});
