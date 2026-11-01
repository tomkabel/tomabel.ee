---
name: Tom Kristian Abel — Living Protocol
description: Personal research hub and portfolio for a security researcher and systems architect.
source-of-truth: src/index.css (:root tokens), mapped to utilities in tailwind.config.js
colors:  # OKLCH "L C H"; utilities use oklch(var(--x) / <alpha-value>)
  sunken: "0.097 0 0"          # #030303 code wells, mastheads, scrims
  canvas: "0.122 0 0"          # #060606 abyssal matte black (also theme-color)
  surface-1: "0.157 0.003 145" # #0C0D0C cards
  surface-2: "0.184 0.004 165" # #111312 card hover
  surface-3: "0.211 0.004 165"
  overlay: "0.237 0.004 165"
  ink: "0.968 0.003 286"        # #F4F4F6, 18.5:1 on canvas
  ink-muted: "0.772 0.011 286"  # 9.8:1
  ink-soft: "0.712 0.013 286"   # 7.9:1
  ink-faint: "0.65 0.013 286"   # 6.2:1 — the lowest body-text step
  ink-dim: "0.552 0.014 286"    # #71717A, 4.2:1 — large text and ambient telemetry only
  signal: "0.696 0.149 162"     # #10B981 emerald
  signal-strong: "0.773 0.153 163"
  signal-ink: "0.122 0 0"       # canvas black on emerald, 8:1
  caution: "0.83 0.135 75"      # amber
  fault: "0.715 0.165 22"
typography:
  display: Newsreader Variable (opsz axis), weight 540, tracking -0.02em, h1 line-height 1.08
  body: Inter Variable, line-height 1.6
  mono: JetBrains Mono Variable (labels, data, code), labels tracked 0.08em
  scale: --step--1 (12px floor) … --step-8; steps 2-8 are clamp() between 375px and 1440px
radii: { hair: 2px, figure: 4px, control: 6px, card: 12px, full: dots only }
motion: { ease-out: "cubic-bezier(0.2,0.7,0.2,1)", fast: 120ms, base: 200ms, slow: 360ms }
spacing: { section: "clamp(4rem, 2.6rem + 6vw, 7.5rem)", section-tight: "clamp(3rem, 2.3rem + 3vw, 5rem)" }
---

# Design System: Living Protocol

Audit trail for this system: `docs/design-audit/01…05`.

## 1. North star

A research publication for instruments. The site reads like a journal of record written by
someone who takes machines apart: serif authority for titles, a quiet grotesk for reading,
monospace for anything that is data. Dark because it is a screen room, not because dark mode is a
toggle. There is no light mode.

The homepage is a living protocol: it demonstrates its own thesis (the gap between what a system
claims to verify and what it verifies) by showing the visitor's own connection in a faint
telemetry layer behind the hero. Instrumentation is drawn like oscilloscope traces or
cryptographic blueprints (0.5–1px strokes), never like a hacker film.

## 2. Colour

Strict restraint. Abyssal matte black canvas, stark optical-white ink, zinc greys for everything
receding. **Emerald** (`signal`) is the only accent with a job on every page: the primary CTA,
live status (the connection dot) and fault-line vectors. **Amber** (`caution`) marks what needs
care (disclosed, 404, the Kratt aside). `fault` red is used only for integrity mismatches.

**Surface ladder.** Six steps from `sunken` to `overlay`. Near-neutral; the raised steps drift
in hue toward the emerald (145°→165°) without visible tint, so higher surfaces read as closer to
the signal. Card borders are `rgba(255,255,255,0.07)` (`--line`); hovered cards take
`signal/35`.

**Ambient telemetry.** `ink-dim` at `--telemetry-rest` (0.14) opacity, rising to
`--telemetry-lit` (0.6) while the nav's connection inspector is hovered or focused.
Use one step up for hover or raised, and `sunken` for wells and bands. Never use pure black or
pure white.

**Rules.**
- Signal colour covers well under 10% of any screen. It goes on labels, links, focus and live
  status, never on headings or large fills. The one exception is `.btn-primary`.
- Colour sits on the label, not on the container. No coloured side stripes on cards, asides or quotes.
- Every body-text step passes WCAG AA on every surface. The lowest is `ink-faint` at 6.2:1.
  `ink-dim` (4.2:1) is reserved for the hero's past-tense display line (large text) and the
  aria-hidden telemetry layer.

## 3. Typography

- **Display (Newsreader, optical size).** h1–h3, card titles, pull quotes, long serif bio
  passages (`font-serif`, which skips the display tracking). Weight 540 and `text-wrap: balance`
  come from `.font-display`.
- **Body (Inter).** UI and reading text. Long-form prose is capped at `max-w-measure` (65ch).
  Large serif passages use `max-w-measure-display` (34ch).
- **Mono (JetBrains Mono).** The `.label` component: 12px, uppercase, 0.08em tracking. It is the
  site's single metadata voice. Don't invent other tracking values. Tags, captions, back
  links and nav stay in sentence case.
- Never go below 12px. Never add breakpoint type jumps (`text-4xl md:text-6xl`); the scale is
  already fluid.

## 4. Layout & rhythm

- Container: `max-w-6xl` with `px-6` **outside** it, so nav, content and footer share one edge.
- Page structure uses CSS Grid (12 columns at `lg`, always with an explicit column template at
  every breakpoint). Flex is only for inline runs such as tag lists, datelines and button rows.
- Deliberate asymmetry: the homepage has one interior reading edge, column 4 (`lg:col-start-4`),
  shared by the hero intro, the fault-line quote and the essay list; featured work alternates
  7/5 then 5/7; flagship systems span two columns on `surface-2`.
- Sections use `py-section`; mastheads use `section-tight`. Padding separates homepage
  sections. The one full-width rule is the **fault line** under the hero (see Components).
- Pages are prerendered to static HTML at build time (`src/entry-server.tsx`, run by
  `scripts/spa-routes.mjs`) and hydrated in English. Render output must not depend on the
  browser (no `window`, `Date.now()` or storage reads during render).
- Don't use `grid-flow-dense`: visual order must match tab order.

## 5. Components

- **Link cards** (`WorkCard`, `CrossNav`): `rounded-card`, `surface-1` and a hairline border, no
  shadow. On hover: `surface-2`, a signal-tinted border, the title underline draws in
  (`.link-draw`), and the arrow shifts. The box never translates or scales. The category label
  is `ink-soft`; only the action is signal-coloured. Every card links to its own entry
  (`/systems#<project>` for systems).
- **Non-link cards** (Systems project) have no hover state. Only their links react.
- **Figures** (code, tables, asides, PGP, article proof): `rounded-figure`, and `sunken` for code wells.
- **Tags/chips:** `rounded-hair`, a hairline border, mono sentence case.
- **Button:** `.btn-primary`, a solid emerald pill. It has a lit top edge and a shaded bottom
  edge, settles 1px when pressed, and is at least 44px tall. Use it only for the one primary action on a screen (the
  homepage hero's "Read the research"); the secondary next to it is a mono text link.
- **Naming:** one label per destination. `/disclosures` is "Research", `/systems` is "Systems",
  in the nav, CTAs, index headings and breadcrumbs alike.
- **Article masthead:** `ArticleHeader` (`components/site/article.tsx`). It is a `sunken` band
  with the serif title and a ruled dateline, and it is the only article header. Don't hand-roll
  a new one.
- **Nav:** opaque, no blur. Sentence-case links whose underline draws in on hover and stays in
  signal colour for the current page; "Contact" jumps to the footer's `#contact` list, which
  holds contact channels only (About and My story are their own footer group). Icon
  buttons are 44×44; the connection button shows its "Your connection" label at `lg+`.
- **Loader:** a hairline indeterminate scan bar with `role="status"`.
- **Connection inspector** (nav): a 6px `.pulse-dot`, neutral (`ink-faint`) until the drawer
  gets a successful live result, then emerald with an opacity-only pulse (the site's one live
  dot). A failed fetch returns it to neutral. Hover/focus sets `data-inspect` on `<html>` and lights the hero telemetry; click
  opens the opt-in drawer (`telemetry.tsx`), which fetches only on open.
- **Homepage instrumentation** (`components/site/protocol.tsx`), all `aria-hidden` and
  `pointer-events: none`:
  - `TelemetryLayer`: top-right of the hero, xl+ only. An intercepted-handshake diagram
    (claimed identity vs observed telemetry) and a field list. Client values are read in the
    browser after hydration and never sent anywhere; the JA4 row stays "UNOBSERVED" until the
    visitor opens the inspector, and SESSION_BINDING reads "NOT TESTED" because nothing tests
    it. Never fabricate visitor values or test results.
  - `FaultLine`: a hairline across the viewport, offset 6px either side of an emerald node,
    labelled `[ LAYER 7: CLAIMED ]` / `[ OPCODE / TLS: VERIFIED ]`. The break follows the pointer.
  - Card schematics (`WorkCard schematic`): ≤72px-tall line drawings in the band above the
    title, xl+ only, 12% opacity, 35% on card hover. Labels stay 12px.
- **Essay rows** (homepage): on hover the title slides 8px right and the date and arrow turn
  emerald.
- **Footer:** the accountability line is mono, bracketed: `[ PERSONALLY ACCOUNTABLE ]`.

## 6. Motion

One easing, three durations. Transitions name the properties they animate; never use
`transition-all`. The only entrance animation is the hero `rise-in`. Ambient loops are limited
to the connection dot, the octagon's inner ring (60s) and the JA4 stream (1.8s);
`prefers-reduced-motion` stops all of them, along with the pointer parallax.

## 7. Don't

Gradient text or fills, glassmorphism or backdrop blur, glow or neon shadows, pill badges (the
primary CTA is the only pill), icon-in-tile features, pulsing dots other than the connection
inspector, hover lift or scale, heavy 3D libraries, hacker clichés, uniform radius, eyebrow rules
(`h-px w-8 accent`), emoji as icons, em dashes in UI chrome, text under 12px, targets under 44px,
hard-coded colours or arbitrary `text-[…]`, `rounded-[…]` or `tracking-[…]`. The radius and
type scales replace Tailwind's defaults, so those default classes no longer exist.

## 8. Verification

- `pnpm typecheck && pnpm lint && pnpm build`
- `pnpm canonical`: article text is pinned by SHA-256 proofs, so styling changes must leave
  `public/verification/` unchanged.
- `python3 docs/design-audit/qa_checks.py` against `pnpm preview`: overflow, <12px text, <44px
  targets and first-Tab order across 8 routes × 3 viewports.
