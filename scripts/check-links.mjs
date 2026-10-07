// Fails the build if prerendered HTML links to a slash-less internal path
// (GitHub Pages would 301 it). Run after spa-routes.mjs.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
});
const bad = [];
for (const file of walk('pub')) {
  for (const [, href] of readFileSync(file, 'utf-8').matchAll(/<a\b[^>]*?\shref="(\/[^"]*)"/g)) {
    const path = href.split(/[?#]/)[0];
    if (!path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path)) bad.push(`${file}: ${href}`);
  }
}
if (bad.length) {
  console.error(`Slash-less internal links:\n${[...new Set(bad)].join('\n')}`);
  process.exit(1);
}
console.log('check-links: all internal hrefs are slashed');
