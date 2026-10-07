// Writes src/content/page-dates.json: route -> date (YYYY-MM-DD) of the last
// commit touching that route's page component. route-meta.ts reads it for
// dateModified and the sitemap generator for lastmod, so neither is hand-kept.
// Runs as `prebuild`. On a shallow clone git history is truncated and every
// file would look "modified at the clone commit", so the committed file is kept.
// ponytail: only the page component is tracked, not shared content such as
// src/content/site.ts; add extra files to PAGE_EXTRA if one drives a page.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const git = (...args) => execFileSync('git', args, { encoding: 'utf-8' }).trim();
const out = new URL('../src/content/page-dates.json', import.meta.url);

if (git('rev-parse', '--is-shallow-repository') === 'true') {
  console.log('page-dates: shallow clone, keeping committed src/content/page-dates.json');
  process.exit(0);
}

const app = readFileSync('src/App.tsx', 'utf-8');
const imports = Object.fromEntries(
  [...app.matchAll(/(\w+)\s*=\s*React\.lazy\(\(\) => import\('\.\/([^']+)'\)\)|import (\w+) from '\.\/([^']+)'/g)]
    .map((m) => [m[1] ?? m[3], `src/${m[2] ?? m[4]}`]),
);
const dates = {};
for (const m of app.matchAll(/<Route path="(\/[^"*:]*)" element=\{<Layout>(.*?)<\/Layout>\}/g)) {
  const component = [...m[2].matchAll(/<(\w+)/g)].map((x) => x[1]).find((n) => !['Lazy', 'Layout'].includes(n));
  const base = imports[component];
  if (!base) throw new Error(`page-dates: no import found for ${m[1]} (${component})`);
  const date = git('log', '-1', '--format=%cs', '--', `${base}.tsx`);
  if (!date) throw new Error(`page-dates: no git history for ${base}.tsx`);
  dates[m[1]] = date;
}
dates['/'] = git('log', '-1', '--format=%cs', '--', 'src/pages/HomePage.tsx');
writeFileSync(out, JSON.stringify(Object.fromEntries(Object.entries(dates).sort()), null, 2) + '\n');
console.log(`page-dates: wrote ${Object.keys(dates).length} routes`);
