#!/usr/bin/env node
// Falsifiable voice check for the personal brand of Tom Kristian Abel.
//
//   node docs/brand/check-voice.mjs [file.md ...]
//
// Default targets: the three articles used in the phase-5 voice check.
// Every threshold below was derived from the measured corpus (17 files, 48,025 words) and is
// stated in docs/brand/outputs/04-voice.md - this script is that document's §09, executable.
// Exit code 1 when any rule fails: the guide is meant to be falsifiable, not admired.
//
// Measurement method (stated so numbers compare like for like):
//   - prose only: fenced code blocks, headings, table rows, blockquotes and bare-URL lines excluded
//   - everything from a `## Sources` heading down is reported separately (bibliography em dashes)
//   - sentences split on [.!?] followed by whitespace; fragments under 3 words dropped
//   - register: files under research/ run the research thresholds, everything else the essay ones
//   - the locked case sentence is exempt from every rule (see LOCKED below)
//   - R2 needs at least five sentences to mean anything; below that R3 governs

import { readFileSync, existsSync } from 'node:fs';

const FILES = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [
      'drafts/i-used-to-break-authentication.md',
      'drafts/the-kratt-problem.md',
      'drafts/research/smart-id-achilles-heel.md',
    ];

// Thresholds, each traceable to a measured segment:
//   essays     5 files: avg 11.2-21.1w, em 0, tic 0-2.33/1k, sup 0/1k
//   research  10 files: avg 16.3-24.5w, em 0-8 in prose, tic 0-1.94/1k
//   site copy        : avg 33.7w, em 6.07/1k, sup 1.56/1k  <- the surface that fails
// The locked past-sentence is inserted verbatim by rule (decisions G-2, P-2). A sentence under
// legal review cannot be edited to satisfy a style rule, so it is exempt from every check here and
// is stripped before measuring. Matched by its opening words so this file carries no case wording.
const LOCKED = /\bIn 2024 he was convicted\b[\s\S]*?\bcheaply erase\./g;
const stripLocked = (text) => text.replace(LOCKED, 'the locked case sentence.');

const LIMIT = {
  essay:    { avg: 22, em: 0,  tic: 1, sup: 1 },
  research: { avg: 25, em: 2,  tic: 1, sup: 1 },
  // Strategy/analysis documents under docs/brand/ are not brand-surface copy. They are
  // measured so the density is visible, but R2/R3 are advisory for them: the rules exist
  // to govern what a reader meets (site, LinkedIn, talk abstract, press answer), and a
  // policy table legitimately carries longer sentences than an essay. R1, R3b and R4-R7
  // still gate everywhere.
  analysis: { avg: 30, em: 2,  tic: 1, sup: 1 },
};
const LONG = { cap: 35, hardCap: 60, closers: 1 };
// R2 is an average, so it needs a sample: a one-liner has no rate, and R3 (the long-sentence
// rule) is what keeps a single-sentence form honest. Documented in 04-voice.md §05 and §09.

const SUPERLATIVES = [
  'best', 'worst', 'greatest', 'strongest', 'most powerful', 'most advanced', 'leading',
  'world-class', 'cutting-edge', 'revolutionary', 'unparalleled', 'unmatched', 'premier',
  'ultimate', 'industry-leading', 'state-of-the-art', 'best-in-class', 'seamless', 'robust',
  'seamlessly',
];

// Gate 3 / risk gate: phrases that may not appear in owned copy (04-voice.md §08)
const BANNED = [
  /ex-black\s?hat/i, /ex-hacker/i, /former hacker/i, /\breformed\b/i, /ethical hacker/i,
  /black hat/i, /passionate about/i, /cutting-edge/i, /world-class/i, /game-chang/i,
  /disclos\w*[^.!?]{0,40}responsibly/i, /years of experience/i, /as an expert/i,
  /design partner/i, /principal engineer/i, /\b65\+/i, /1\.4M/i, /unrivall/i,
  /military-grade/i, /industry standard/i,
];

function splitSources(raw) {
  const m = raw.search(/^\s*#{0,6}\s*\*{0,2}(sources|allikad)\*{0,2}\s*$/im);
  return m === -1 ? [raw, ''] : [raw.slice(0, m), raw.slice(m)];
}

function proseOf(raw) {
  let fenced = false;
  return raw
    .split('\n')
    .map((line) => {
      if (/^\s*```/.test(line)) { fenced = !fenced; return ''; }
      if (fenced) return '';
      return line;
    })
    .filter((line) => {
      if (line === '') return true;
      if (/^#{1,6}\s/.test(line)) return false;
      if (/^\s*\|/.test(line)) return false;
      if (/^\s*>/.test(line)) return false;
      if (/^\s*https?:\/\//.test(line)) return false;
      // A citation list is not prose: a line carrying three or more [S-nn] references (the
      // bibliography style used across this folder) or a bare "Sources"/"Allikad" label.
      if ((line.match(/\[S-\d\d\]/g) ?? []).length >= 3) return false;
      if (/^\s*\*{0,2}(sources|allikad)\*{0,2}\s*:?\s*$/i.test(line)) return false;
      return true;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n');
}

const words = (s) => (s.match(/[A-Za-z0-9'’\-]+/g) ?? []).length;

// a long sentence is allowed only when it is an enumeration, not a clause chain
function enumerated(s) {
  const commas = s.split(',').length - 1;
  return commas >= 3 || (/:/.test(s) && commas >= 2) || /["«]/.test(s) || (s.split('(').length - 1) >= 2;
}

function analyse(path) {
  if (!existsSync(path)) return null;
  const raw = readFileSync(path, 'utf8');
  const [body, sourcePart] = splitSources(raw);
  const prose = stripLocked(proseOf(body));

  // sentences are split inside a paragraph only - never across a blank line
  const sentences = prose
    .split(/\n{2,}/)
    .flatMap((para) => para.split(/(?<=[.!?])\s+/))
    .map((s) => s.trim())
    .filter((s) => words(s) >= 3);

  const w = words(prose);
  // punctuation and vocabulary are counted on authored text only: a span inside "..." is a
  // quotation of someone else (or of his own existing copy), not new writing
  const authored = prose
    .replace(/`[^`]{0,300}`/g, '``')                          // inline code: literal label, not prose
    .replace(/"[^"]{0,300}"/g, '""')                          // straight-quoted span
    .replace(/“[^”]{0,300}”/g, '""');                         // curly-quoted span
  const emProse = (authored.match(/\u2014/g) ?? []).length;
  const emSrc = (sourcePart.match(/\u2014/g) ?? []).length;
  const tics = (authored.match(/\bnot\b[^.;!?]{1,140}?\bbut\b/gi) ?? []).length;
  // "leading indicator" is an analytics term of art, not the marketing adjective it looks like.
  const lower = authored.toLowerCase().replace(/leading indicator/g, 'early signal');
  const sup = SUPERLATIVES.reduce((n, s) => n + (lower.split(s).length - 1), 0);

  // banned phrases quoted inside "..." are vendor language being dismissed, not used;
  // phrases inside a prohibition clause ("no design partners", "never say world-class") are
  // the rule itself, not the offence.
  const prohibition = /\b(?:no|never|forbid\w*|prohibit\w*|banned|avoid|must not|may not|do not|don'?t|refuse\w*|excluded)\b[^.!?\n]{0,80}/gi;
  const unquoted = authored
    .replace(/"[^"]{0,300}"/g, '""')
    .replace(/«[^»]{0,300}»/g, '«»')
    .replace(prohibition, ' ');
  const banned = BANNED.flatMap((re) => {
    const m = unquoted.match(re);
    if (!m) return [];
    const quotedOnly = !prose.replace(/"[^"\n]*"/g, '').includes(m[0]);
    return [`${re.source} -> "${m[0]}"${quotedOnly ? ' [in-quote: vendor language, not owned copy]' : ''}`];
  });

  // one-line closers: last paragraph before a heading, under 15 words, not a rule
  const paras = body.split(/\n{2,}/).map((p) => p.trim());
  let closers = 0;
  for (let i = 0; i < paras.length - 1; i++) {
    const t = paras[i];
    const next = paras[i + 1] ?? '';
    if (!t || /^[#|`>]/.test(t) || /^-{3,}$/.test(t)) continue;
    if (/^#{1,6}\s/.test(next) && words(t) < 15) closers++;
  }

  const unexempted = sentences.filter((s) => words(s) > LONG.cap && !enumerated(s));
  const unexemptedHard = sentences.filter((s) => words(s) > LONG.hardCap && !enumerated(s));
  const register = /(^|\/)research\//.test(path) ? 'research'
    : /(^|\/)docs\/brand\//.test(path) || /(^|\/)brand\//.test(path) ? 'analysis'
    : 'essay';
  const maxLen = sentences.reduce((m, s) => Math.max(m, words(s)), 0);

  return {
    path, register, words: w, sents: sentences.length,
    avg: w / (sentences.length || 1), maxLen,
    emProse, emPer1k: (emProse / (w || 1)) * 1000, emSrc,
    tics, ticPer1k: (tics / (w || 1)) * 1000,
    sup, supPer1k: (sup / (w || 1)) * 1000,
    closers, closersPer1k: closers / (w / 1000 || 1),
    unexempted, unexemptedHard, banned,
  };
}

const f2 = (n) => Math.round(n * 100) / 100;
const results = FILES.map(analyse).filter(Boolean);

console.log('| file | register | words | avg sent | max sent | em in prose | em in sources | not X, but Y | superlatives | one-line closers |');
console.log('|---|---|---|---|---|---|---|---|---|---|');
for (const r of results) {
  console.log(`| ${r.path} | ${r.register} | ${r.words} | ${f2(r.avg)}w | ${r.maxLen}w | ${r.emProse} (${f2(r.emPer1k)}/1k) | ${r.emSrc} | ${r.tics} (${f2(r.ticPer1k)}/1k) | ${r.sup} (${f2(r.supPer1k)}/1k) | ${r.closers} (${f2(r.closersPer1k)}/1k) |`);
}
console.log('');

let failures = 0;
const line = (ok, id, detail) => {
  if (!ok) failures++;
  return `${ok ? 'PASS' : 'FAIL'}  ${id} = ${detail}`;
};
// Advisory rows are reported but do not fail the run (analysis register only).
const note = (r, ok, id, detail) => {
  const advisory = r.register === 'analysis';
  if (!ok && !advisory) failures++;
  return `${ok ? 'PASS' : advisory ? 'NOTE' : 'FAIL'}  ${id}${!ok && advisory ? ' (advisory in the analysis register)' : ''} = ${detail}`;
};

for (const r of results) {
  const lim = LIMIT[r.register];
  const rows = [
    line(r.emProse <= lim.em, `R1 em dashes in prose <= ${lim.em}`, `${r.emProse} (${f2(r.emPer1k)}/1k)`),
    note(r, r.sents >= 5 ? r.avg <= lim.avg : true,
      `R2 sentence avg <= ${lim.avg}w`,
      r.sents >= 5 ? `${f2(r.avg)}w` : `n/a (${r.sents} sentence${r.sents === 1 ? '' : 's'}: R2 is a rate, R3 governs)`),
    note(r, r.unexempted.length === 0, `R3 sentences > ${LONG.cap}w must be enumerated`, `${r.unexempted.length} violation(s)`),
    line(r.unexemptedHard.length === 0, `R3b no unquoted sentence > ${LONG.hardCap}w`,    `${r.unexemptedHard.length}${r.unexemptedHard.length ? ' -> ' + r.unexemptedHard.map((s) => `"${s.trim().slice(0, 90)}…" (${words(s)}w)`).join('; ') : ''}`),
    line(r.ticPer1k <= lim.tic, `R4 not X, but Y <= ${lim.tic}/1k`, `${r.tics} (${f2(r.ticPer1k)}/1k)`),
    line(r.supPer1k <= lim.sup, `R5 superlatives <= ${lim.sup}/1k`, `${r.sup} (${f2(r.supPer1k)}/1k)`),
    line(r.closersPer1k <= LONG.closers, `R6 one-line closers <= ${LONG.closers}/1k`, `${r.closers} (${f2(r.closersPer1k)}/1k)`),
    line(r.banned.length === 0, 'R7 risk-gate / banned phrase scan', `${r.banned.length} hit(s)`),
  ];
  console.log(`${r.path}  [${r.register}]\n  ${rows.join('\n  ')}`);
  for (const b of r.banned) console.log(`    banned: ${b}`);
  for (const s of r.unexempted) console.log(`    long:   ${words(s)}w :: ${s.slice(0, 110)}`);
}
console.log(`\n${failures} failure(s) across ${results.length} file(s).`);
process.exit(failures ? 1 : 0);
