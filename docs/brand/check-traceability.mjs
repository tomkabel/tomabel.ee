#!/usr/bin/env node
// Citation integrity check for evidence-derived brand work.
//
//   node scripts/check-traceability.mjs [rootDir] [registryPath]
//
//   rootDir       dir scanned recursively for .md (default: docs/brand)
//   registryPath  the source register (default: first that exists of
//                 <root>/evidence/sources.md, <root>/00-evidence/source-register.md)
//
// Every [S-nn] reference in any scanned .md must resolve to a source defined in the
// register (a '## S-01' heading or a '**S-01**' line). Reports defined-but-never-cited
// sources; exits 1 on any undefined reference.
//
// It cannot judge WHICH lines deserve a citation - that is the reviewer's call. It only
// proves the citations present are real. Verify the verifier: inject a bogus [S-99] into
// one output, confirm exit 1, remove it.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'docs/brand');
if (!existsSync(root)) {
  console.error(`FAIL: scan root does not exist: ${root}`);
  process.exit(1);
}

const candidates = [process.argv[3], join(root, 'evidence', 'sources.md'), join(root, '00-evidence', 'source-register.md')]
  .filter(Boolean)
  .map((p) => resolve(p));
const registryPath = candidates.find(existsSync);
if (!registryPath) {
  console.error('FAIL: no source register found. Pass one as the second argument. Tried:');
  for (const c of candidates) console.error('  ' + c);
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.md') && !/^readme\.md$/i.test(name)) out.push(p);
  }
  return out;
}

const registry = readFileSync(registryPath, 'utf8');
const defined = new Set();
for (const m of registry.matchAll(/^##\s+(S-\d{2})\b/gm)) defined.add(m[1]);
for (const m of registry.matchAll(/^\*\*(S-\d{2})\*\*/gm)) defined.add(m[1]);

if (defined.size === 0) {
  console.error(`FAIL: no sources defined in ${relative(process.cwd(), registryPath)} (expected '## S-01'-style headings)`);
  process.exit(1);
}

const REF = /\[S-(\d{2})\]/g;
const cited = new Set();
const unknown = [];
const files = walk(root);

for (const file of files) {
  for (const m of readFileSync(file, 'utf8').matchAll(REF)) {
    const id = `S-${m[1]}`;
    if (defined.has(id)) cited.add(id);
    else unknown.push(`${relative(process.cwd(), file)} -> ${id}`);
  }
}

console.log(`registry:        ${relative(process.cwd(), registryPath)}`);
console.log(`sources defined: ${defined.size}`);
console.log(`files scanned:   ${files.length}`);
console.log(`sources cited:   ${cited.size}`);

const uncited = [...defined].filter((id) => !cited.has(id)).sort();
if (uncited.length) console.log(`defined but never cited: ${uncited.join(', ')}`);

if (unknown.length) {
  console.error(`\nFAIL: ${unknown.length} reference(s) point at undefined sources:`);
  for (const u of unknown) console.error('  ' + u);
  process.exit(1);
}

console.log('\nOK: every [S-nn] reference resolves.');
