---
name: Tom Kristian Abel — Technical Editorial
description: Personal research hub and portfolio for a security researcher and systems architect.
source-of-truth: src/index.css (:root tokens), mapped to utilities in tailwind.config.js
colors:  # OKLCH "L C H"; utilities use oklch(var(--x) / <alpha-value>)
  sunken: "0.125 0.008 258"   # code wells, mastheads, interlude band, scrims
  canvas: "0.15 0.009 255"    # page background (#090B0F, also theme-color)
  surface-1: "0.182 0.011 248"
  surface-2: "0.212 0.013 240"
  surface-3: "0.245 0.015 232"
  overlay: "0.28 0.016 225"
  ink: "0.955 0.006 250"        # 17.3:1 on canvas
  ink-muted: "0.775 0.018 252"  # 9.7:1
  ink-soft: "0.7 0.02 252"      # 7.4:1
  ink-faint: "0.64 0.022 252"   # 5.9:1 — the lowest text step
  signal: "0.795 0.15 163"      # P1 phosphor green
  signal-strong: "0.865 0.13 165"
  signal-ink: "0.21 0.04 163"
  caution: "0.83 0.135 75"      # P3 phosphor amber
  fault: "0.715 0.165 22"
typography:
  display: Newsreader Variable (opsz axis), weight 540, tracking -0.018em
  body: Geist Variable
  mono: Commit Mono (labels, data, code)
  scale: --step--1 (12px floor) … --step-8; steps 2-8 are clamp() between 375px and 1440px
radii: { hair: 2px, figure: 4px, control: 6px, card: 12px, full: dots only }
motion: { ease-out: "cubic-bezier(0.2,0.7,0.2,1)", fast: 120ms, base: 200ms, slow: 360ms }
spacing: { section: "clamp(4rem, 2.6rem + 6vw, 7.5rem)", section-tight: "clamp(3rem, 2.3rem + 3vw, 5rem)" }
---

# Design System: Technical Editorial

Audit trail for this system: `docs/design-audit/01…05`.

## 1. North star

A research publication for instruments. The site reads like a journal of record written by
someone who takes machines apart: serif authority for titles, a quiet grotesk for reading,
monospace for anything that is data. Dark because it is a screen room, not because dark mode is a
toggle. There is no light mode.

## 2. Colour

Taken from the subject matter, not from a stock palette. The two accents are the classic CRT
phosphors: **P1 green** (`signal`) marks what is live or interactive, **P3 amber** (`caution`)
marks what needs care (disclosed, 404, the Kratt aside). `fault` red is used only for integrity
mismatches.

**Surface ladder.** Six steps from `sunken` to `overlay`. Lightness rises *and* hue drifts from
cold blue (258°) toward the phosphor (225°), so higher surfaces read as closer to the signal.
Use one step up for hover or raised, and `sunken` for wells and bands. Never use pure black or
pure white.

**Rules.**
- Signal colour covers well under 10% of any screen. It goes on labels, links, focus and live
  status, never on headings or large fills. The one exception is `.btn-primary`.
- Colour sits on the label, not on the container. No coloured side stripes on cards, asides or quotes.
- Every text step passes WCAG AA on every surface. The lowest is `ink-faint` at 5.9:1.

## 3. Typography

- **Display (Newsreader, optical size).** h1–h3, card titles, pull quotes, long serif bio
  passages (`font-serif`, which skips the display tracking). Weight 540 and `text-wrap: balance`
  come from `.font-display`.
- **Body (Geist).** UI and reading text. Long-form prose is capped at `max-w-measure` (65ch).
  Large serif passages use `max-w-measure-display` (34ch).
- **Mono (Commit Mono).** The `.label` component: 12px, uppercase, 0.14em tracking. It is the
  site's single metadata voice. Don't invent other tracking values. Tags, captions, back
  links and nav stay in sentence case.
- Never go below 12px. Never add breakpoint type jumps (`text-4xl md:text-6xl`); the scale is
  already fluid.

## 4. Layout & rhythm

- Container: `max-w-6xl` with `px-6` **outside** it, so nav, content and footer share one edge.
- Page structure uses CSS Grid (12 columns at `lg`, always with an explicit column template at
  every breakpoint). Flex is only for inline runs such as tag lists, datelines and button rows.
- Deliberate asymmetry: the hero intro is offset (`lg:col-start-6`); featured work alternates
  7/5 then 5/7; flagship systems span two columns on `surface-2`.
- Sections use `py-section`; interludes and mastheads use `section-tight`.
- Don't use `grid-flow-dense`: visual order must match tab order.

## 5. Components

- **Link cards** (`WorkCard`, `CrossNav`): `rounded-card`, `surface-1` + `shadow-elevated`.
  On hover: `surface-2`, a signal-tinted top edge, the title underline draws in (`.link-draw`),
  and the arrow shifts. The box never translates or scales.
- **Non-link cards** (Systems project) have no hover state. Only their links react.
- **Figures** (code, tables, asides, PGP, article proof): `rounded-figure`, and `sunken` for code wells.
- **Tags/chips:** `rounded-hair`, a hairline border, mono sentence case.
- **Button:** `.btn-primary`. It has a lit top edge and a shaded bottom edge, settles 1px when
  pressed, and is at least 44px tall. Use it only for the one primary action on a screen.
- **Article masthead:** `ArticleHeader` (`components/site/article.tsx`). It is a `sunken` band
  with the serif title and a ruled dateline, and it is the only article header. Don't hand-roll
  a new one.
- **Nav:** opaque, no blur. Sentence-case links whose underline draws in on hover and stays in
  signal colour for the current page. Icon buttons are 44×44.
- **Loader:** a hairline indeterminate scan bar with `role="status"`. No pulsing dots.

## 6. Motion

One easing, three durations. Transitions name the properties they animate; never use
`transition-all`. The only entrance animation is the hero `rise-in`. `prefers-reduced-motion`
reduces all of it to ~0.

## 7. Don't

Gradient text or fills, glassmorphism or backdrop blur, glow shadows, pill badges, icon-in-tile
features, pulsing "live" dots, hover lift or scale, uniform radius, eyebrow rules
(`h-px w-8 accent`), emoji as icons, em dashes in UI chrome, text under 12px, targets under 44px,
hard-coded colours or arbitrary `text-[…]`, `rounded-[…]` or `tracking-[…]`. The radius and
type scales replace Tailwind's defaults, so those default classes no longer exist.

## 8. Verification

- `pnpm typecheck && pnpm lint && pnpm build`
- `pnpm canonical`: article text is pinned by SHA-256 proofs, so styling changes must leave
  `public/verification/` unchanged.
- `python3 docs/design-audit/qa_checks.py` against `pnpm preview`: overflow, <12px text, <44px
  targets and first-Tab order across 8 routes × 3 viewports.
