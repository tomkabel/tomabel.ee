---
name: Tom Kristian Abel — Terminal Brutalism
description: Personal portfolio and research hub for a security researcher and systems architect.
colors:
  accent: "#22C55E"
  accent-glow: "rgba(34, 197, 94, 0.35)"
  accent-selection: "rgba(34, 197, 94, 0.3)"
  warning: "#F59E0B"
  background: "#0A0A0B"
  surface: "#111114"
  surface-hover: "rgba(255, 255, 255, 0.02)"
  foreground: "#F1F5F9"
  muted: "#94A3B8"
  muted-foreground: "#64748B"
  subtle: "#475569"
  border: "rgba(255, 255, 255, 0.05)"
  border-strong: "rgba(255, 255, 255, 0.10)"
typography:
  display:
    fontFamily: '"Space Grotesk", Inter, system-ui, sans-serif'
    fontWeight: 700
  body:
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    fontWeight: 400
    lineHeight: 1.5
  mono:
    fontFamily: '"JetBrains Mono", monospace'
    fontWeight: 400
spacing:
  section: "5rem"
  container: "1.5rem"
  element: "1rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.background}"
    fontWeight: 600
    padding: "0.75rem 1.5rem"
    height: "min 48px"
  chip:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.muted-foreground}"
    fontSize: "0.625rem"
  card-work:
    borderColor: "{colors.border-strong}"
    borderWidth: 1
    padding: "2rem"
    hover: "-translate-y-0.5 border-accent/60"
  card-project:
    borderColor: "{colors.border-strong}"
    borderWidth: 1
    padding: "2rem"
    hover: "border-accent/50"
  nav-link:
    textColor: "{colors.muted-foreground}"
    fontWeight: 500
    textTransform: "uppercase"
    letterSpacing: "0.1em"
    fontSize: "0.75rem"
  nav-link-active:
    textColor: "{colors.foreground}"
  nav-link-hover:
    textColor: "{colors.accent}"
---

# Design System: Tom Kristian Abel — Terminal Brutalism

## 1. Overview

**Creative North Star: Terminal Brutalism**

A dark, utilitarian interface that reads like a security researcher's terminal. The near-black background (#0A0A0B) is the void; green accent (#22C55E) is the live signal. Every element earns its place — no decoration without purpose. The aesthetic is raw, technical, and honest: a direct reflection of the person behind it.

The system rejects template-driven portfolio clichés: no cards-with-icons repeated endlessly, no hero-metric templates, no glassmorphism, no gradients. The layout is sparse and structured — systematic spacing, clear typographic hierarchy, and subtle hover states that reward attention without demanding it.

**Key Characteristics:**
- **Dark, not dark mode.** The background is atmospheric near-black, not a UI toggle. There is no light mode.
- **Three-voice typography.** Space Grotesk for authority (headings), Inter for readability (body), JetBrains Mono for precision (codes, labels, metadata).
- **Green as signal.** Accent (#22C55E) appears on interactive elements, section labels, hover states, and focus indicators — never decoratively. Green is <10% of any screen.
- **Borders over shadows.** Flat surfaces separated by fine borders (rgba white at 5–10% opacity). No shadows anywhere.
- **Mono metadata.** All codes, types, labels, and metadata use JetBrains Mono at 10px uppercase with wide tracking.

## 2. Colors

The palette is restrained: tinted neutrals on near-black with one accent (green) at approximately 5–10% coverage and a secondary accent (amber) at less than 1%.

### Primary
- **Signal Green** (#22C55E): Live signals. Appears on the pulsing nav dot, section index labels, hover states, focus rings, and the hero's glowing text line. Its high-chroma against black creates the terminal-instrument feel. Never decorative.

### Secondary
- **Amber Beacon** (#F59E0B): Warnings, points of interest. Used only for the "Kratt" sidebar border on the About page and legal emphasis. Never competes with green.

### Neutral
- **Void** (#0A0A0B): Primary background. Near-black with slight warmth.
- **Surface** (#111114): One step above void. Card and container backgrounds.
- **Ice White** (#F1F5F9): Primary text. High contrast on black.
- **Steel Gray** (#94A3B8): Secondary text, body copy.
- **Zinc Dim** (#64748B): Muted labels, placeholder text.
- **Dim** (#475569): Subtle anchors, footer text.
- **Border** (rgba(255,255,255,0.05)): Section dividers, card borders.
- **Border Strong** (rgba(255,255,255,0.10)): Interactive card borders.

### Named Rules
**The Signal Rule.** Green (#22C55E) is used on <10% of any given screen. Its rarity is the point — when green appears, the user knows something is interactive or alive.

**The No-Decoration Rule.** No element uses green or amber purely for decoration. Every colored element signals something: interactivity, focus, warning, or data.

**The Beacon Rule.** Amber (#F59E0B) is reserved for the Kratt metaphor and legal emphasis. It should never compete with green for visual priority.

## 3. Typography

**Display Font:** Space Grotesk (fallback: Inter, system-ui)
**Body Font:** Inter (fallback: system-ui, -apple-system)
**Label/Mono Font:** JetBrains Mono

**Character:** Authority (display), readability (body), precision (mono). Space Grotesk's geometric structure at display sizes communicates confidence; Inter's humanist warmth at body sizes keeps long-form readable; JetBrains Mono is for data where every character matters.

### Hierarchy
- **Display** (700, 3rem/3.5rem, leading-[1.05]): Hero headline only. Usage is rare.
- **Heading** (700, 2.25rem/2.5rem, leading-tight): Section titles.
- **Title** (700, 1.5rem, leading-snug): Card titles, entry headings.
- **Body** (400, 0.875rem–1rem, 1.5): Descriptions, paragraphs. Capped at 65ch max-width.
- **Body Large** (400, 1.25rem, leading-relaxed): Bio text, intro strip. Uses Space Grotesk for personality.
- **Label** (500, 0.75rem, normal tracking): Tags, metadata, legal.
- **Mono Label** (400, 0.625rem, uppercase, tracking-widest): Codes, types, section labels, navigation.

### Named Rules
**The Three-Voice Rule.** Never use one font for everything. Display always gets Space Grotesk, body always gets Inter, data/labels always get JetBrains Mono. Cross-contamination erodes the hierarchy.

## 4. Layout & Spacing

- **Container:** `max-w-6xl` (72rem / 1152px), `px-6` (1.5rem) horizontal padding.
- **Section padding:** `py-20`, `py-24` for major sections. `pb-20 pt-24` for page headers with border-bottom.
- **Grid:** `md:grid-cols-2` for featured work and projects. `md:grid-cols-3` for footer. `lg:grid-cols-12` for split layouts.
- **Vertical rhythm:** 4px/8px incremental spacing system via Tailwind defaults.

### Named Rules
**The Flat First Rule.** Flat surfaces are the default. Borders, not shadows, create separation. Every border should be removable without breaking layout comprehension.

**The No-Shadow Rule.** No box-shadows are used anywhere in the system. Depth comes from tonal layering (background → surface → border) and hover state transitions.

## 5. Components

### Navigation
- **Style:** Sticky top bar with `bg-background/80 backdrop-blur-md`. 1px border-bottom.
- **Logo:** Green pulsing dot + "tomabel.ee" in Space Grotesk bold.
- **Links:** Mono uppercase, tracking-widest. Active: text-foreground. Inactive: text-muted-foreground. Hover: text-accent + `/` prefix reveals.
- **Language Toggle:** Globe icon + ET/EN code. aria-label describes action.
- **Mobile:** Hamburger → slide-down overlay with full link list. role="dialog".

### Work Cards (Homepage)
- 2×2 grid. Border card with hover lift (-translate-y-0.5).
- Corner brackets appear on hover (top-left + bottom-right border in green).
- Top: code label + status dot. Content: title in display font, blurb in body. Bottom: tag list + CTA with arrow-shift.
- Links to internal routes (/research, /projects).

### Entry Rows (Research)
- Full-width article. Left accent bar (0.5px) scales from 0 to full height on hover.
- 12-col grid: 2-col code + type, 10-col title + blurb.
- Hover: left bar reveals green, title turns green, arrow slides in from right.
- Mono metadata: keywords, types.

### Project Cards (Projects)
- 2×2 grid. Border card. Stack label in green mono, blurb in body, external GitHub link.
- Simple dot indicator changes from subtle to green on hover.

### Section Headers
- Pattern: `[index] label` in mono green → h1 display title → optional intro paragraph.
- Used consistently across all 4 main pages.

### Legal Pages
- Standard page layout with green section headings, surface-colored info boxes, list-disc content.

### 404 / Error
- Green "404" heading. Return-home button: bg-accent text-accent-foreground rounded-xl. Min 48px touch target.

## 6. Animation

- **Micro-interactions:** 150–300ms transitions on hover (colors, transforms, opacity).
- **Hero entrance:** `rise-in` stagger (0.6s cubic-bezier). Eyebrow → h1 (80ms delay) → intro (180ms) → CTAs (260ms).
- **Caret blink:** Steps(1) animation, 1.1s infinite on hero green text.
- **Pulse dot:** Tailwind `animate-pulse` on nav logo and page loader.
- **Arrow shift:** 0.25s transform on parent hover (translateX 4px).
- **Corner brackets:** Opacity 0→1 on work card hover.
- **Accent bar:** scale-y 0→1 on entry row hover.
- **Reduced motion:** All animations/transitions killed at `prefers-reduced-motion: reduce`.

## 7. Do's and Don'ts

### Do:
- **Do** use green (#22C55E) as the only accent for interactive elements, focus indicators, and section metadata.
- **Do** use amber (#F59E0B) sparingly — only the Kratt sidebar and legal emphasis.
- **Do** use the three-typeface system: Space Grotesk for display, Inter for body, JetBrains Mono for data/labels.
- **Do** use borders (not shadows) for visual separation.
- **Do** respect prefers-reduced-motion.
- **Do** keep green at <10% screen coverage.
- **Do** use JetBrains Mono at 10px uppercase tracking-widest for all codes, types, and metadata.
- **Do** use consistent section header patterns across all pages.

### Don't:
- **Don't** use gradient text. Solid colors only.
- **Don't** use glassmorphism or heavy backdrop-blur (nav's subtle blur is the only exception).
- **Don't** use box-shadows. Flat with borders is the rule.
- **Don't** use rounded corners on containers or cards (square is the default). Buttons and code blocks may use subtle rounding.
- **Don't** use emojis as icons. SVG (Lucide) only.
- **Don't** use pure black (#000) or pure white (#fff). Tint all neutrals.
- **Don't** mix filled and outline icon styles.
- **Don't** use green for decoration. Every green element must signal interactivity or importance.

## 8. Implementation Notes

- **Framework:** React 18 + TypeScript + Tailwind CSS 3.4 + Vite 5 + React Router 7
- **Font loading:** preconnect + preload with `media="print"` swap technique for non-blocking loading.
- **Code splitting:** Route-based via React.lazy(). Manual vendor/ui chunk splitting in Vite config.
- **Build output:** `pub/` directory (not `dist`).
- **Security headers:** Strict CSP, HSTS preload, X-Frame-Options DENY.
- **Accessibility:** Skip-to-content link, aria-current on nav, visible focus rings (2px green), semantic HTML, reduced-motion support.
- **i18n:** Bilingual EN/ET via React Context + localStorage persistence. Dynamic `document.documentElement.lang`.

## 9. Roadmap / Known Gaps

- **Research entries not linked:** EntryRow has hover effects suggesting interactivity but renders as `<article>`, not `<Link>`. Individual research detail pages don't exist as routes. This is intentional for now — the entries link to publications hosted elsewhere.
- **Essays not linked:** Same pattern as research entries. WritingPage shows essay titles with hover effects but no links. Essays are planned/seed pieces, not yet published.
- **Contact form:** Translations exist (t.cta.form) but no React component. Contact is via mailto links only — this is intentional for the current scope.
- **RSS feed:** `/writing.xml` referenced in footer but not yet generated.
- **Theme-color meta:** Set to #0A0A0B for dark browser chrome on mobile.
- **PGP fingerprint:** Displayed on Disclosure page. Note: appears to be 41 chars instead of expected 40.
