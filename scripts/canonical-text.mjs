#!/usr/bin/env node
// Regenerates public/verification/<slug>.txt from the article page that owns it,
// then rewrites that page's <ArticleProof expectedSha256="…" /> to the new digest.
//
// Without this the two drift: the committed hash keeps matching a stale (or
// placeholder) canonical file, so the proof panel reports MATCH while attesting
// text nobody published. Run it after editing any article body.
//
//   node scripts/canonical-text.mjs [--check]
//
// --check exits non-zero instead of writing, for CI.

import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as esbuild from 'esbuild';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pagesDir = join(root, 'src/pages');
const verificationDir = join(root, 'public/verification');
// Temp modules live under node_modules so their bare imports (react, react-router-dom)
// resolve the same way they do in the app.
const tmpDir = join(root, 'node_modules/.canonical-text');

const CONTENT_EXPORTS = [
  'title',
  'standfirst',
  'openingParagraphs',
  'sections',
  'sources',
  'disclosureParagraphs',
];

const check = process.argv.includes('--check');

// The temp module does not sit next to the page, and the page's siblings are
// .tsx that node cannot load anyway. Nothing we read is a component, so bind
// every local import to an inert stub instead of resolving it.
const STUB = 'const __stub = new Proxy(function(){}, { get: () => __stub, apply: () => __stub });\n';

function stubLocalImports(code) {
  return code.replace(
    /^import\s+([^'"]*?)\s*from\s*['"](\.[^'"]*)['"];?$/gm,
    (_all, clause) => {
      const names = [];
      const named = clause.match(/\{([^}]*)\}/);
      if (named) {
        for (const part of named[1].split(',')) {
          const name = part.trim().split(/\s+as\s+/).pop();
          if (name) names.push(name);
        }
      }
      for (const part of clause.replace(/\{[^}]*\}/, '').split(',')) {
        const name = part.trim().replace(/^\*\s+as\s+/, '');
        if (name) names.push(name);
      }
      return names.length ? `const ${names.map((n) => `${n} = __stub`).join(', ')};` : '';
    },
  );
}

/** Loads the page module's content constants without requiring the page to export them. */
async function loadContent(file) {
  const source = await readFile(file, 'utf8');
  // esbuild directly, not vite's transformWithEsbuild: vite 8 deprecated that
  // wrapper and no longer bundles esbuild at all.
  const { code } = await esbuild.transform(source, {
    loader: 'tsx',
    format: 'esm',
    jsx: 'automatic',
  });
  const present = CONTENT_EXPORTS.filter((name) =>
    new RegExp(`^const ${name}\\b`, 'm').test(source),
  );
  const out = join(tmpDir, `${Date.now()}-${file.split('/').pop()}.mjs`);
  await writeFile(out, `${STUB}${stubLocalImports(code)}\nexport { ${present.join(', ')} };\n`);
  return import(pathToFileURL(out).href);
}

/** The canonical text is plain prose: headings, paragraphs, and cited sources. */
function renderCanonical(mod, { slug, url }) {
  const lines = [mod.title, '', 'Author: Tom Kristian Abel', `Canonical URL: ${url}`, ''];

  if (mod.standfirst) lines.push(mod.standfirst, '');
  for (const p of mod.openingParagraphs ?? []) lines.push(p, '');

  for (const section of mod.sections ?? []) {
    lines.push(`## ${section.heading}`, '');
    for (const p of section.paragraphs ?? []) lines.push(p, '');
  }

  if (mod.sources?.length) {
    lines.push('## Sources', '');
    for (const s of mod.sources) {
      lines.push(`- ${s.label}${s.url ? ` — ${s.url}` : ''}${s.note ? ` (${s.note})` : ''}`);
    }
    lines.push('');
  }

  if (mod.disclosureParagraphs?.length) {
    lines.push('## Disclosure', '');
    for (const p of mod.disclosureParagraphs) lines.push(p, '');
  }

  lines.push(
    '---',
    `This file is the canonical plain-text copy of ${url}`,
    'Its SHA-256 digest is committed to source and verified in-browser.',
    `Detached PGP signature, when published: /verification/${slug}.txt.asc`,
  );

  return `${lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
}

const proofRe =
  /<ArticleProof\s+slug="([^"]+)"\s+expectedSha256="([0-9a-f]{64})"/;

await mkdir(tmpDir, { recursive: true });
await mkdir(verificationDir, { recursive: true });

const stale = [];
for (const name of (await readdir(pagesDir)).filter((f) => f.endsWith('.tsx'))) {
  const file = join(pagesDir, name);
  const source = await readFile(file, 'utf8');
  const match = source.match(proofRe);
  if (!match) continue;

  const [, slug, committedHash] = match;
  const mod = await loadContent(file);
  const text = renderCanonical(mod, {
    slug,
    url: `https://tomabel.ee/disclosures/${slug}/`,
  });
  const hash = createHash('sha256').update(text).digest('hex');
  const target = join(verificationDir, `${slug}.txt`);
  const current = await readFile(target, 'utf8').catch(() => null);

  if (current === text && committedHash === hash) {
    console.log(`ok    ${slug}`);
    continue;
  }
  if (check) {
    stale.push(slug);
    console.error(`stale ${slug}`);
    continue;
  }

  await writeFile(target, text);
  await writeFile(file, source.replace(committedHash, hash));
  console.log(`wrote ${slug}  ${hash}`);
}

await rm(tmpDir, { recursive: true, force: true });

if (stale.length) {
  console.error(`\n${stale.length} canonical text(s) out of date. Run: node scripts/canonical-text.mjs`);
  process.exit(1);
}
