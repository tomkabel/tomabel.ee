// Run with `pnpm test` (node:test, no framework).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';

// A sentence split around a JSX link leaves the verification text cut off
// mid-sentence ("follows the site's "). Store the whole sentence; PolicyText links it.
test('no verification text ends a line mid-sentence before a link', () => {
  const dir = new URL('../../public/verification/', import.meta.url);
  for (const name of readdirSync(dir).filter((f) => f.endsWith('.txt'))) {
    const lines = readFileSync(new URL(name, dir), 'utf8').split('\n');
    for (const line of lines) {
      assert.doesNotMatch(line, /(site's|site’s|saidi) ?$/, `${name}: "${line.slice(-60)}"`);
    }
  }
});
