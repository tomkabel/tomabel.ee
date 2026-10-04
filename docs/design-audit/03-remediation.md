# 03 — Remediation: before / after

Findings are from `02-audit-findings.md`; pattern IDs are from `01-ai-slop-patterns.md`.
Screenshots: `screens/before/` (HEAD `af7c6f8`) and `screens/after/` (production build).

## Split boundaries

I did the work sequentially rather than splitting it across parallel agents, because nearly every
fix depended on one token layer. The token files (`src/index.css`, `tailwind.config.js`) had a
single owner and landed first. Once utility names resolved to tokens, most of the ~40 component
files needed no markup change. The remaining edits went in three areas:

| Area | Files |
|---|---|
| Foundation | `src/index.css`, `tailwind.config.js`, `src/main.tsx`, `vite.config.ts`, `index.html`, `package.json` |
| Shared components | `components/site/*` (work-card, entry-row, section-header, article, cross-nav, nav, footer, pgp-card, article-proof, telemetry, reader-rail), `ErrorBoundary`, `NotFound`, `App` (loader) |
| Pages | `HomePage`, `SystemsPage`, `DisclosuresPage`, `AboutPage`, legal pages, 19 article pages (codemod) |

## Foundation

| Before | After | Why |
|---|---|---|
| No CSS custom properties. Hex values in `tailwind.config.js`, literal `#34D399` in focus and selection CSS. 69 `bg-white/[0.0x]` tints, one `bg-[#0b0d12]` (C7) | Every value is a token in `:root`. Tailwind maps names to `oklch(var(--x) / <alpha-value>)`, so the existing class names keep working | One source of truth; `/alpha` modifiers still work |
| Three flat surfaces (`#0A0B0D/#111318/#171A21`) | **6-step OKLCH surface ladder** `sunken → canvas → surface-1 → surface-2 → surface-3 → overlay`. Lightness goes up 0.125→0.28 while hue drifts 258°→225° | Higher surfaces move toward the signal hue, so elevation reads as depth rather than as grey steps |
| Generic "emerald" accent, plus unrelated amber | Named after **CRT phosphors**: P1 green `--signal` (with `-strong`/`-ink` steps) and P3 amber `--caution` | The colours come from the subject matter (instruments, terminals), not from a stock palette |
| `subtle #6C7788` = **4.34:1** on canvas, used at 10px (fails AA) | Ink ladder at 17.3 / 9.7 / 7.4 / 5.9 : 1 | Every text step passes AA |
| Space Grotesk display + Geist (T2) | Display is **Newsreader** with its optical-size axis (`opsz.css`), weight 540, −0.018em tracking. Geist stays for UI, Commit Mono for data. Space Grotesk dependency removed | A publication serif suits research and removes half of the LLM font combo |
| Fixed `text-4xl md:text-6xl` jumps; no `clamp()` (T6) | 11-step scale `--step--1 … --step-8`. Every step from `lg` up is a `clamp()` interpolating between 375 and 1440px. 19 breakpoint pairs collapsed to one class | No breakpoint jumps |
| 58 labels at 10–11px | `--step--1` = 12px floor. One `.label` component replaces 7 ad-hoc tracking values (0.1/0.2/0.25/0.3em) | Legibility and one consistent metadata voice |
| `rounded-lg` everywhere, `rounded-xl` buttons, `rounded-full` pill (K3) | Radius scale **replaced**, not extended: `hair 2px` tags · `figure 4px` code/tables/asides · `control 6px` buttons · `card 12px` link cards · `full` dots only | Shape follows role, and a stray default like `rounded-lg` no longer compiles |
| `transition-all duration-300` (I1) | `--dur-fast/base/slow` + one `--ease-out`. Transitions list only the properties that actually change | No layout properties animated |
| Every section `py-24` (L7) | `--space-section` / `--space-section-tight` (clamp). The home interlude and mastheads use the tight value | Rhythm between sections varies on purpose |
| `:focus-visible` set `border-radius: 2px`, which reshaped cards on focus | Outline only, 3px offset, follows each element's own radius | Bug fix |

## Components

| Finding | Before | After |
|---|---|---|
| Pill badge (L2, K3) · `work-card.tsx` | `rounded-full border-accent/25 bg-accent/[0.07]` chip | Plain `.label` in signal colour |
| Hover lift (I2) · work-card, cross-nav, systems card | `hover:-translate-y-1` + `transition-all` | Tonal step (`surface → surface-2`), signal-tinted top edge, title underline that draws in (`.link-draw`), arrow shift. Nothing moves the box |
| Hover on non-interactive card · `SystemsPage` `<li>` | Lift + shadow on a non-link | No card hover; only its links react |
| Side-stripe card (K1, sev 5) · `Callout`, flagship project, About "Kratt" aside | `rounded-lg border-l-2 border-l-accent` | `rounded-figure bg-surface-2 ring-1 ring-inset`; the tone colour is on the label only |
| Side-stripe quote (K1) · `PullQuote`, home intro | `border-l-2 border-accent` | Top hairline plus a larger serif. The home interlude sits on a `sunken` band |
| Symmetric grids (L3) · home featured 2×2, systems 3-col | Equal tiles | Home: 12-col grid alternating **7/5 then 5/7**. Systems: flagship cards `md:col-span-2` on `surface-2`, `items-start` (no `grid-flow-dense`, so visual order = tab order) |
| Grid-line background with radial mask (L11) · home + 19 articles | `.grid-bg` + `mask-image` | Removed. Article mastheads are a `sunken` band one step below the canvas |
| Boxed meta chips ×57 · 19 article headers | `border bg-white/[0.03] px-3 py-2` ×3 | A ruled dateline (`border-t`, gap-separated labels) |
| **Copy-pasted article scaffold** (14 identical lines ×19) | Inline header markup in every page | New `ArticleHeader` in `article.tsx`. A perl codemod replaced all 19 and was verified by typecheck |
| Eyebrow rule + wide tracking (T7) ×5 | `h-px w-8 bg-accent/60` + `tracking-[0.25em]` | Removed; `.label` only |
| All-caps nav (T8) | `text-xs uppercase tracking-widest`, `/` prefix on hover | Sentence case `text-sm`. Underline draws in on hover and stays in signal colour for the current page |
| Gradient icon tile + ⚠ emoji (L4, K6, K8) · `ErrorBoundary` | `w-16 h-16 rounded-xl bg-gradient-to-br` | Left-aligned `Runtime fault` label, serif heading, `.btn-primary` |
| Centred generic 404 (L8) | Green `text-6xl` "404", `rounded-xl` flat button | 12-col left-aligned: amber `404` label, serif title, `.btn-primary` (lit top edge, shaded bottom edge, 1px press) |
| Pulsing dot loader (K9) | `animate-pulse rounded-full` | Hairline indeterminate `animate-scan` bar, `role="status"` |
| Glass blur (K2) ×4 | `bg-background/80 backdrop-blur-md` | Opaque `bg-background` (nav, sticky filter bars); drawer scrim `bg-sunken/85`; drawer sits on `overlay` |
| Accent-coloured legal headings (C7) ×35 | `text-xl text-accent font-semibold` | `font-display text-2xl text-foreground` |
| Touch targets < 44px | Telemetry icon 14px, language toggle, hamburger, drawer close, filter tabs, CTA links | All ≥ 44px (`size-11` / `min-h-11`) |
| Hero accent half (decorative colour) | `line2` in green | Past-tense line in `ink-soft`, present-tense line in full ink. The tone shift carries the argument |
| Em dashes in hero copy (X1; PRODUCT.md bans them) | `Tom Kristian Abel — Estonia`, `I'm Tom Kristian Abel — systems…` | `·` and comma apposition (EN + ET) |
| Container misalignment (found in QA) | nav/footer/entry-rows padded *inside* `max-w-6xl` (24px further in than sections) | Padding moved outside, so all edges align |

## Deliberately kept

- The mono / serif / sans voice split, borders instead of glows, `prefers-reduced-motion` reset,
  `ArticleProof`, `Telemetry`.
- Numbered `01/02` section labels in articles (L6). They index real sections in long reports and
  match the reader-rail TOC.
- The entry-row accent bar. It is a hover indicator on full-bleed rows, not a static card stripe,
  and now renders only when the row is a link.
- Geist for body text (half of T2, sev 3). Replacing it means a new font dependency; noted as
  residual.
- Em dashes inside article and card **content** (X1). That is editorial copy, outside a visual pass.
