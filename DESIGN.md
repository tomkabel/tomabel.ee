---
name: ProksiAbel OÜ — Glass Proxy
description: Company site for ProksiAbel OÜ (AiTM resilience, red-teaming) plus Tom Kristian Abel's research publication.
source-of-truth: src/index.css (:root tokens), mapped to utilities in tailwind.config.js
colors:  # OKLCH "L C H"; utilities use oklch(var(--x) / <alpha-value>)
  sunken: "0.144 0.014 262"     # #070A10 wells, telemetry bar, section bands
  canvas: "0.168 0.018 264"     # #0B0F17 Deep Baltic Slate (theme-color)
  surface-1: "0.217 0.026 261"  # #131A26 Brushed Obsidian
  surface-2: "0.255 0.031 260"
  surface-3: "0.291 0.035 259"
  overlay: "0.323 0.038 259"
  ink: "0.984 0.003 248"        # #F8FAFC 18.3:1 on canvas
  ink-muted: "0.869 0.02 253"   # #CBD5E1
  ink-soft: "0.711 0.035 257"   # #94A3B8 Muted Steel, 7.5:1
  ink-faint: "0.661 0.038 256"  # 6.2:1 — the lowest text step
  silver: "0.929 0.013 256"     # #E2E8F0 Institutional Silver
  signal: "0.754 0.139 233"     # #38BDF8 Arctic Cyan
  signal-strong: "0.828 0.101 230"
  signal-ink: "0.293 0.063 243" # 6.5:1 on signal
  caution: "0.83 0.135 75"
  fault: "0.715 0.165 22"
  glass: "white / 0.03"         # with blur(16px) and a white/0.08 hairline
typography:
  display: Geist Variable, weight 560, tracking -0.03em (headings)
  body: Geist Variable
  serif: Newsreader Variable (long personal passages only: About, My story, pull quotes)
  mono: Geist Mono Variable (labels, data, code), labels 12px uppercase 0.08em
  scale: --step--1 (12px floor) … --step-8; steps 2-8 are clamp() between 375px and 1440px
radii: { hair: 2px, figure: 4px, control: 6px, card: 12px, full: dots only }
motion: { ease-out: "cubic-bezier(0.2,0.7,0.2,1)", fast: 120ms, base: 200ms, slow: 360ms }
spacing: { section: "clamp(4rem, 2.6rem + 6vw, 7.5rem)", section-tight: "clamp(3rem, 2.3rem + 3vw, 5rem)" }
---

# Design System: Glass Proxy

Replaced "Technical Editorial" on 2026-11-01 (brand pivot to ProksiAbel OÜ). Earlier audit trail:
`docs/design-audit/01…05`.

## 1. North star

"The Glass Proxy": transparency, architectural precision, light refraction, Nordic minimalism.
A sovereign-grade, Tallinn-native firm, not an underground hacker. No neon green, no crimson
alerts, no terminal cosplay. Dark slate because it is a control room. There is no light mode.

## 2. Colour

Blue-black Baltic slate ladder, platinum ink, one refraction accent. **Arctic cyan** (`signal`)
marks active state, links, focus and the data beams in the hero schematic. `caution` amber stays
for "needs care" (English-only notice, 404); `fault` red only for integrity mismatches.

**Glass.** `.glass` is the one translucent material: white/0.03 fill, 16px backdrop blur,
white/0.08 hairline. Used for the sticky nav, the hero schematic, comparison cards and bento
cells. `.glass-edge` adds the hover effect: a cyan highlight slides once along the border.

**Rules.**
- Signal colour covers well under 10% of any screen. Never on headings or large fills, except
  `.btn-primary`.
- Every text step passes WCAG AA on canvas and surface-1. The lowest is `ink-faint`.

## 3. Typography

- **Display (Geist).** h1–h3 and card titles via `.font-display` (weight 560, -0.03em,
  balanced). `font-serif` (Newsreader) is kept only for long personal passages and pull quotes.
- **Body (Geist).** UI and reading text. Long-form prose is capped at `max-w-measure` (65ch).
  Large serif passages use `max-w-measure-display` (34ch).
- **Mono (Geist Mono).** The `.label` component: 12px, uppercase, 0.08em tracking. It is the
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
- Sections use `py-section` (including the homepage interlude band); mastheads use
  `section-tight`. Padding and the `sunken` band separate homepage sections; no full-width rules.
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
- **Outline button:** `.btn-outline`, for the nav CTA only.
- **Button:** `.btn-primary`. It has a lit top edge and a shaded bottom edge, settles 1px when
  pressed, and is at least 44px tall. Use it only for the one primary action on a screen (the
  homepage hero's "Request zero-trust assessment"); the secondary next to it is a mono text link.
- **Naming:** one label per destination. `/disclosures` is "Research", `/systems` is "Systems",
  in the nav, CTAs, index headings and breadcrumbs alike.
- **Article masthead:** `ArticleHeader` (`components/site/article.tsx`). It is a `sunken` band
  with the serif title and a ruled dateline, and it is the only article header. Don't hand-roll
  a new one.
- **Telemetry bar + nav:** a `sunken` mono bar (registry code, location) scrolls away; the
  nav under it is sticky `.glass`. Brand is the prism mark plus "ProksiAbel OÜ". Links: the four
  homepage anchors (`/#architecture`, `/#aitm`, `/#fingerprintproxy`, `/#principal`) then
  Research. Right side: `.btn-outline` "Schedule executive briefing" (mailto), connection drawer
  icon, language toggle. The telemetry drawer renders outside the nav, because backdrop-filter
  makes the nav the containing block for fixed children.
- **Hero schematic** (`glass-proxy.tsx`): deterministic SVG (seeded once at module load, so the
  prerender matches hydration). Labels live in HTML, not the SVG, to keep the 12px floor.
- **Loader:** a hairline indeterminate scan bar with `role="status"`. No pulsing dots.

## 6. Motion

One easing, three durations. Transitions name the properties they animate; never use
`transition-all`. The only entrance animation is the hero `rise-in`. `prefers-reduced-motion`
reduces all of it to ~0.

## 7. Don't

Gradient text or fills, glass anywhere other than `.glass`, glow except the `.btn-outline`
hover halo, pill badges, icon-in-tile features, neon green, crimson, matrix/terminal motifs, pulsing "live" dots, hover lift or scale, uniform radius, eyebrow rules
(`h-px w-8 accent`), emoji as icons, em dashes in UI chrome, text under 12px, targets under 44px,
hard-coded colours or arbitrary `text-[…]`, `rounded-[…]` or `tracking-[…]`. The radius and
type scales replace Tailwind's defaults, so those default classes no longer exist.

## 8. Verification

- `pnpm typecheck && pnpm lint && pnpm build`
- `pnpm canonical`: article text is pinned by SHA-256 proofs, so styling changes must leave
  `public/verification/` unchanged.
- `python3 docs/design-audit/qa_checks.py` against `pnpm preview`: overflow, <12px text, <44px
  targets and first-Tab order across 8 routes × 3 viewports.
