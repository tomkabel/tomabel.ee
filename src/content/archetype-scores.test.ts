// Run with `pnpm test` (node:test, no framework).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ARCHETYPE_SCORES } from './archetype-scores.ts';

type Archetype = keyof typeof ARCHETYPE_SCORES;

const page = (name: string) =>
  readFileSync(new URL(`../pages/${name}.tsx`, import.meta.url), 'utf8');

// Scoring prose names axioms as "passes two (Axioms 1 and 5", "outright (Axioms 2, 3",
// "partially (Axiom 8". Pull the numbers listed after each verdict.
function scoresIn(text: string) {
  const pick = (verdict: RegExp) => {
    const m = text.match(new RegExp(`${verdict.source} \\(Axioms? ((?:\\d+(?:, | and )?)+)`));
    return m ? m[1].match(/\d+/g)!.map(Number) : [];
  };
  return { pass: pick(/passes \w+/), partial: pick(/partially/), fail: pick(/outright/) };
}

const expected = (a: Archetype) => {
  const { pass, partial, fail } = ARCHETYPE_SCORES[a];
  return { pass: [...pass], partial: [...partial], fail: [...fail] };
};

test('Octagon overview matrix paragraph matches the canonical scores', () => {
  const line = page('ZeroTrustOctagonResearchPage')
    .split('\n')
    .find((l) => l.includes('The violation matrix scores each axiom'));
  assert.ok(line, 'matrix paragraph not found');
  const parts = line.split(/ (?=[BCD] (?:fails|passes) )/);
  for (const a of ['B', 'C', 'D'] as const) {
    const seg = parts.find((p) => p.trimStart().startsWith(`${a} `));
    assert.ok(seg, `no segment for ${a}`);
    assert.deepEqual(scoresIn(seg), expected(a), `Octagon page, archetype ${a}`);
  }
});

const tracePages: Record<Archetype, [string, string]> = {
  B: ['Fortune500IllusionResearchPage', 'Archetype B fails all of them'],
  C: ['MoveFastFixItInProdResearchPage', 'Archetype C passes'],
  D: ['SaasGluedLeanDefenseResearchPage', 'Archetype D passes'],
};

test('each trace page names the canonical scores', () => {
  for (const [a, [name, marker]] of Object.entries(tracePages) as [Archetype, [string, string]][]) {
    const line = page(name).split('\n').find((l) => l.includes(marker));
    assert.ok(line, `${name}: scoring sentence not found`);
    assert.deepEqual(scoresIn(line), expected(a), `${name}, archetype ${a}`);
  }
});
