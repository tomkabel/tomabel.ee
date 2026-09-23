# 04 — Code quality review of the remediation changes

Scope: every file changed against `af7c6f8`. Gates were run on the final tree.

| Gate | Result |
|---|---|
| `pnpm typecheck` (app + node tsconfigs, strict, noUnused*) | pass, 0 errors |
| `pnpm lint` | pass, **0 errors, 0 warnings**. The 2 pre-existing `react-refresh/only-export-components` warnings are fixed by moving `sectionSlug` → `section-slug.ts` and `pgpKey` → `pgp-key.ts` |
| `pnpm build` | pass |
| `pnpm canonical` (article SHA-256 proofs) | all 19 `public/verification/*.txt` **byte-identical**. The `ArticleHeader` codemod did not change any canonical article text |

## Checklist

**Custom properties declared and referenced correctly**
- Every `var(--*)` used in `index.css` / `tailwind.config.js` is declared in `:root`. A script
  cross-check found no undeclared or unused tokens after pruning `--signal-dim` and the unused
  `accent-strong` / `accent-dim` mappings.
- Sweep of `src/**/*.tsx` for `#hex`, `rgb(a)(`, `bg-white/`, `bg-[`, `text-[`, `leading-[`,
  `tracking-[`, `rounded-[`, `duration-<n>`, `transition-all`, `backdrop-blur`,
  `hover:-translate`, `bg-gradient`, `animate-pulse`: **0 hits**. The only exception is the
  `group-hover:scale-y-100` accent-bar reveal on linked entry rows, which is intentional.
- Remaining arbitrary values are structural, not visual: `grid-rows-[auto_auto_1fr_auto]`,
  `grid-cols-[1fr_auto]`, `min-h-[60vh]`, `transition-[…]` property lists, and
  `top-[calc(theme(spacing.16)+1px)]`, which resolves to a theme token.
- `theme-color` in `index.html` is a literal `#090B0F` (meta tags can't read CSS vars). It
  matches `--canvas` and has a comment in the CSS.

**Fluid typography**
- Steps 2–8 are `clamp(min, rem + vw, max)`, interpolating between 375 and 1440px.
  Steps −1…1 (labels, UI text, body) are fixed on purpose: body copy shouldn't scale with
  the viewport, and 12px is the floor.
- Breakpoint pairs (`text-4xl md:text-6xl` etc.) collapsed to single classes; `text-6xl` and
  `leading-[…]` were removed from the scale.
- The fontSize and borderRadius scales **replace** Tailwind's defaults, so an off-system
  `rounded-lg` or `text-[10px]` no longer generates CSS.

**Grid vs flex**
- Page and section structure uses CSS Grid: hero (12-col with an offset intro column), featured
  work (12-col, 7/5 then 5/7), writing split, systems grid, work card and project card
  internals (`grid-rows`), cross-nav, telemetry drawer, 404, error screen, article masthead.
- Flex remains only for inline runs: tag lists, meta datelines, nav link rows, filter tab rows,
  icon+label buttons.

**Accessibility**
- Contrast: the ink ladder is 17.3 / 9.7 / 7.4 / 5.9 : 1 on canvas. The old `subtle` (4.34:1)
  failed AA. QA measured 416 live text nodes: 0 failures, lowest 5.58:1.
- Focus: one `:focus-visible` rule (2px signal outline, 3px offset). The old rule forced
  `border-radius: 2px` and reshaped cards on focus.
- Targets: every interactive element outside running prose is ≥ 44×44
  (`docs/design-audit/qa_checks.py` enforces this).
- Semantics: `WorkCard` tags are a `<ul>`; the loader has `role="status"`; the footer "Contact"
  is a `<p>` label instead of an orphan `<h3>`; `aria-current` is kept on nav.
- Tab order: `grid-flow-dense` was removed from `/systems` so visual order matches DOM order (2.4.3).
- First load no longer moves focus into `<main>`, so the first Tab reaches the skip link.
  Route changes still move focus to `<main>`. This uses a previous-path ref, which is safe under
  StrictMode's double-invoked effects.
- Reduced motion: the global reset is kept; every new transition and animation goes through it.

**Specificity, duplication, dead code**
- `.font-display`, `.label`, `.btn-primary`, `.link-draw` live in `@layer components`, so
  any utility can override them without `!important`.
- Removed duplicates: `.rise-in` utility + `@keyframes rise-in` in CSS (it also existed in the
  Tailwind config), unused `caret-blink` keyframes, `.grid-bg`, unused `.container-custom`,
  the duplicate body `font-family`.
- Removed dead code: `src/pages/ProjectsPage.tsx` (unrouted, 213 lines), the unused Space
  Grotesk dependency, and the Fontaine fallbacks for fonts the site doesn't load (Inter,
  JetBrains Mono).
- Dropped 19 copies of a 26-line article header in favour of one `ArticleHeader`.

**Issues found in review and fixed**
1. Fontaine rewrites only literal `font-family` declarations, so `var(--font-*)` stacks lost
   the metric-matched fallbacks (a CLS regression). Fix: the stacks name the generated
   `"<family> fallback"` faces explicitly; the build output confirms all three faces exist.
2. Container misalignment: nav, footer and entry rows padded inside `max-w-6xl` and sat 24px
   in from the section content. Padding moved outside.
3. The sticky filter bar (`top-16`) overlapped the nav's 1px border.
4. Translucent nav and filter bars let content show through once the blur was gone. Both are now opaque.

## Known, accepted

- The `hidden` "Thesis" asides in 8 article pages are left in place. They are unrendered author
  content, not styling.
- `.label` still uppercases (T7, sev 4). It is now **one** deliberate metadata voice at 0.14em,
  down from 7 tracking values at up to 0.3em. The nav, back links, tags and captions were moved
  to sentence case.
