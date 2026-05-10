---
name: Tom Kristian Abel — Capability Radar
description: Personal portfolio and capability radar for deep-tech AI engineering.
colors:
  signal: "#00D4FF"
  accent: "#F59E0B"
  bg: "#020203"
  grid: "#1a1a2e"
  text-primary: "#F1F5F9"
  text-secondary: "#94A3B8"
  text-muted: "#64748B"
  border: "#1a1a2e"
  surface: "#040408"
  surface-overlay: "#05050f"
typography:
  display:
    fontFamily: '"Space Grotesk", Inter, system-ui, sans-serif'
    fontWeight: 700
  body:
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif'
    fontWeight: 400
    lineHeight: 1.5
  mono:
    fontFamily: '"JetBrains Mono", monospace'
    fontWeight: 400
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  xl: "0.75rem"
spacing:
  section: "5rem"
  container: "1.5rem"
  element: "1rem"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "#020203"
    rounded: "{rounded.xl}"
    padding: "1rem 1.5rem"
    fontWeight: 600
    height: "auto"
  button-primary-hover:
    backgroundColor: "{colors.signal}"
    opacity: 0.9
  chip:
    backgroundColor: "rgba(0, 212, 255, 0.08)"
    textColor: "{colors.signal}"
    rounded: "{rounded.md}"
    padding: "0.25rem 0.625rem"
    fontSize: "0.75rem"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    borderColor: "{colors.border}"
    borderWidth: 1
    padding: "1.5rem"
  input:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    borderColor: "{colors.border}"
    borderWidth: 1
    padding: "0.75rem 1rem"
  input-focus:
    borderColor: "{colors.signal}"
    ringWidth: 1
  nav-link:
    textColor: "#94A3B8"
    fontWeight: 500
  nav-link-hover:
    textColor: "{colors.signal}"
---

# Design System: Tom Kristian Abel — Capability Radar

## 1. Overview

**Creative North Star: "The Signal Floor"**

A dark instrument panel where capability appears as live radar readings. The OLED black background is the quiet room before detection; cyan traces are signals worth tracking; amber markers note points of interest. Every element emerges from darkness with purpose — nothing glows without reason.

The system rejects template-driven portfolio clichés: no cards-with-icons repeated endlessly, no hero-metric templates, no glassmorphism as default. The radar chart is not decoration — it is navigation, table of contents, and proof, all at once. The layout is sparse but not empty; every pixel is earned.

**Key Characteristics:**
- **Dark depth, not dark mode.** The black (#020203) is atmospheric, not a UI default. Surfaces emerge through subtle tonal shifts.
- **Three-voice typography.** Space Grotesk for authority (headings), Inter for readability (body), JetBrains Mono for precision (data, labels).
- **Signal as structure.** Cyan (#00D4FF) traces appear on interactive elements, the radar chart, and focus indicators — never decoratively.
- **Radar coherence.** The 6-axis radar is the information architecture. Every section maps to an axis.

## 2. Colors

The palette is restrained: tinted neutrals on OLED black with one accent (cyan) at approximately 5–10% coverage and a secondary accent (amber) at less than 1%.

### Primary
- **Signal Cyan** (#00D4FF): Live readings, interactive signals, focus indicators. Cyan appears on the radar chart stroke, the submit button, hover links, and focus rings. Its high-chroma against black creates the instrument-panel feel. Never decorative.

### Secondary
- **Amber Beacon** (#F59E0B): Warnings, points of interest, PGP references, legal notes. Used sparingly as a second voice — the amber flare that deserves attention.
- **Deep Slate** (#1a1a2e): Grid lines, borders, structural dividers. Tinted slightly toward blue (chroma ~0.01) to avoid sterile gray.
- **Slate Void** (#020203): Primary background. Not pure black (chroma bleed toward blue keeps it atmospheric rather than dead).

### Neutral
- **Ice White** (#F1F5F9): Primary text. High contrast on black.
- **Steel Gray** (#94A3B8): Secondary text, nav links, muted body.
- **Zinc Dim** (#64748B): Muted labels, placeholder text, secondary anchors.
- **Surface Black** (#040408): Card and container backgrounds. One step above the void.
- **Overlay Tint** (#05050f): Gradient endpoints and subtle surface shifts.

### Named Rules
**The Signal Rule.** Cyan is used on <10% of any given screen. Its rarity is the point — when cyan appears, the user knows something is interactive or alive.

**The No-Decoration Rule.** No element uses cyan or amber purely for decoration. Every colored element signals something: interactivity, focus, warning, or data.

**The Beacon Rule.** Amber (the secondary accent) is reserved for legal notes, PGP encryption signals, and the amber glow in the background. It should never compete with cyan for visual priority.

## 3. Typography

**Display Font:** Space Grotesk (fallback: Inter, system-ui)
**Body Font:** Inter (fallback: system-ui, -apple-system)
**Label/Mono Font:** JetBrains Mono

**Character:** Authority (display), readability (body), precision (mono). The pairing signals technical credibility without sacrificing readability. Space Grotesk's geometric structure at display sizes communicates confidence; Inter's humanist warmth at body sizes keeps long-form readable; JetBrains Mono is for data where every character matters.

### Hierarchy
- **Display** (700, 2.25rem/3rem / 3.5rem line-height: 1): Hero name only. Usage must be rare.
- **Headline** (700, 1.5rem/1.875rem, leading-tight): Section titles and major headings.
- **Title** (600, 1.125rem, leading-snug): Card titles and project names.
- **Body** (400, 0.875rem, 1.5): Descriptions, paragraphs, long-form content. Capped at 65ch max-width.
- **Label** (500, 0.75rem, normal tracking): Tags, chips, metadata, legal text.

### Named Rules
**The Three-Voice Rule.** Never use one font for everything. Display always gets Space Grotesk, body always gets Inter, data/labels always get JetBrains Mono. Cross-contamination erodes the hierarchy.

## 4. Elevation

The system uses light shadows for elevation, with tonal layering as the foundation. The background (#020203) is the base; surfaces step up through background tints (#040408, #05050f) to establish containment. Shadows are subtle — their role is to separate, not to dramatize.

### Shadow Vocabulary
- **Surface Shadow** (`0 4px 24px rgba(0, 0, 0, 0.12)`): Card and container elevation against the background.
- **Hover Lift** (`0 8px 32px rgba(0, 0, 0, 0.16)`): Interactive cards on hover, floating elements.
- **Glow, not shadow** (`0 0 24px rgba(0, 212, 255, 0.08)`): Cyan signal glow replaces shadow for active/interactive elements where tonal separation needs emphasis.

### Named Rules
**The Flat First Rule.** Flat surfaces are the default. Shadows appear only to establish hierarchy on interactive or containered elements; every shadow should be removable without breaking layout comprehension.

## 5. Components

### Buttons
- **Shape:** Gently curved edges (0.75rem / rounded-xl).
- **Primary:** Signal Cyan (#00D4FF) background, near-black (#020203) text, 700 weight, 1rem vertical padding, full width in forms. Hover: reduced opacity (90%). Transition: colors 200ms.
- **Focus:** Cyan ring (2px outline-offset 2px).

### Chips / Tags
- **Shape:** Compact pills (0.5rem radius).
- **Style:** Cyan-tinted background (rgba(#00D4FF, 0.08)), Signal Cyan text, 0.625rem horizontal padding, 0.25rem vertical, 12px JetBrains Mono weight 500.
- **Usage:** Skill labels on project cards, research article tags. They are metadata, not actions — no hover state change.

### Cards
- **Corner Style:** Generous curve (0.75rem / rounded-xl).
- **Background:** Surface Black (#040408), one step above the void.
- **Border:** 1px Deep Slate (#1a1a2e).
- **Shadow:** Surface Shadow at rest; Hover Lift on interactive project cards.
- **Internal Padding:** 1.5rem on all sides.
- **Variations:** Project cards have a top accent treatment (cyan gradient bar or thumbnail image). Research cards stack image + content vertically.

### Inputs / Fields
- **Shape:** Gently curved edges (0.75rem).
- **Style:** Slate Void (#020203) background, 1px Deep Slate (#1a1a2e) border, Ice White (#F1F5F9) text.
- **Focus:** Cyan border replacement (1px → 1px #00D4FF), 1px cyan ring. Transition: border-color 200ms.
- **Placeholder:** Zinc Dim (#64748B).
- **Error:** Red-400 border, red-400 error message below field.
- **Disabled:** Not used (no disabled form controls in the current system).

### Navigation
- **Style:** Fixed bar at top, transparent background, 1px Deep Slate bottom border.
- **Typography:** Steel Gray (#94A3B8) links at 14px weight 500. Hover: Signal Cyan.
- **Mobile:** Hidden under hamburger. Slide-down overlay with centered links.
- **Language Toggle:** Flag icon + locale code (et/en).

### Hero (RadarChart)
- **The signature component.** Custom SVG radar chart with 6 axes. Cyan stroke with draw-in animation (stroke-dashoffset, 1.5s ease-out). Cyan polygon fill at 10% opacity. Three grid rings at 33%/66%/100% scale.
- **Accessibility:** Each axis point is a keyboard-focusable button that scrolls to the corresponding section. aria-label on the SVG describes the full data set.
- **Animation:** radar-draw (1.5s ease-out) on mount. Respects prefers-reduced-motion.

## 6. Do's and Don'ts

### Do:
- **Do** use cyan (#00D4FF) as the only accent for interactive elements, focus indicators, and the radar chart. It must always signal something alive or actionable.
- **Do** use amber (#F59E0B) sparingly and deliberately — PGP, legal notes, amber background glow.
- **Do** use the three-typeface system: Space Grotesk for display, Inter for body, JetBrains Mono for data/labels.
- **Do** compose the radar chart so it remains legible at 375px default viewport width (core chart structure must not break).
- **Do** respect prefers-reduced-motion: disable Lenis, skip draw-in animations, instant-reveal content.
- **Do** use tonal layering (surface-overlay tints) in preference to shadows for structural depth. Shadows are for interactive hierarchy reinforcement.
- **Do** keep the cyan signal at <10% screen coverage. Saturation through rarity.
- **Do** use generous rounded corners (0.75rem) on containers and inputs consistently.

### Don't:
- **Don't** use gradient text (`background-clip: text`). Solid colors only.
- **Don't** use glassmorphism (backdrop-blur) as default treatment.
- **Don't** build cards-with-icons repeated endlessly. Vary the card pattern by context.
- **Don't** use the hero-metric template (big number + small label + stats).
- **Don't** use border-left or border-right greater than 1px as a colored accent stripe on cards or list items.
- **Don't** use em dashes in copy. Use commas, colons, or periods.
- **Don't** add shadows to every surface. Flat is the default; shadows are earned.
- **Don't** use pure black (`#000`) or pure white (`#fff`). Tint all neutrals toward blue at 0.005–0.01 chroma.
- **Don't** make the site look vibe-coded or template-driven. Anything that reads as "modern AI portfolio" with generic gradients and stock patterns is a failure.
