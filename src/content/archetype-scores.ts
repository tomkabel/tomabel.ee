// The book's violation matrix (zero-trust-octagon, 03-octagon-as-instrument.md),
// by axiom number. A passes all eight. The Octagon overview and the three trace
// pages must name exactly these numbers; archetype-scores.test.ts checks it.
export const ARCHETYPE_SCORES = {
  B: { pass: [], partial: [5], fail: [1, 2, 3, 4, 6, 7, 8] },
  C: { pass: [2], partial: [1, 3], fail: [4, 5, 6, 7, 8] },
  D: { pass: [1, 5], partial: [8], fail: [2, 3, 4, 6, 7] },
} as const;
