# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ProksiAbel OU** — Estonian offensive cybersecurity consultancy landing page. A single-page React 18 + TypeScript + Vite 5 application with Tailwind CSS, custom Canvas/WebGL animations, and Estonian/English bilingual support. Deployed on Vercel.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build (outputs to `pub/`)
- `npm run lint` — ESLint flat config with TypeScript rules
- `npm run preview` — Preview production build locally
- Type checking: `npx tsc --noEmit` (no Prettier/Biome — tsc is the only gate)

## Architecture

### Routing & Layouts

React Router v7 with `BrowserRouter`. Two layout types:
- **HomePage** — Full scrollable landing with hash-anchor sections: `#reverse-engineering`, `#ai-ml-infrastructure`, `#offensive-tooling`, `#systems-engineering`, `#research-analysis`, `#architecture-design` (capability axes), `#research`, `#contact`, `#pgp`
- **LegalLayout** — Simple layout for `/privacy`, `/terms`, `/cookies`, `/disclosure` (lazy-loaded via `React.lazy()`)

### i18n

Custom Context-based i18n (no library). Two locales:
- `et` (Estonian, default) — persisted to localStorage
- `en` (English)

Translations in `src/i18n/translations.ts`, organized by component section. Switch via `useLanguage()` hook.

### Key Source Map

- `src/App.tsx` — Router + route definitions + layouts (HomePage renders RadarHero, CapabilitySections, ProjectShowcase, ResearchSection, CtaSection, Pgp; legal pages use LegalLayout)
- `src/components/Navbar.tsx` — Fixed nav with mobile menu, language toggle, hash-scroll via Lenis. Backdrop blur and background opacity react to scroll position and velocity.
- `src/radar/` — Capability Radar visualization suite (replaces legacy intersection):
  - `RadarHero.tsx` — Full-screen hero section with parallax background layers: gradient, ASCIIArt, CyberpunkScene (Three.js), ParticleTrails, and the RadarChart SVG. Scroll-driven parallax transforms the content group (translateY + scale).
  - `RadarChart.tsx` — Interactive SVG radar chart with 6 axes. Draw-in stroke animation on mount (1.5s ease-out). Three grid rings (33%/66%/100%). Each axis point is a keyboard-focusable button that scrolls to the corresponding capability section. Gradient fill (cyan). Respects prefers-reduced-motion.
  - `CapabilitySections.tsx` — Renders one AxisSection per capability axis. Wraps each in `[data-lenis-snap]` for section snap scrolling.
  - `AxisSection.tsx` — Two-column layout: label + description (left), project cards (right). Lenis-driven progress opacity/translateY animation. Accent project gets cyan border highlight. FlowmapDistortion wraps heading.
  - `ProjectShowcase.tsx` — Featured projects grid (2-column). Filters capabilityAxes for featured projects with images. Lenis-driven reveal animation.
  - `ShowcaseCard.tsx` — Individual project card with ShaderReveal image, tech tags, GitHub/link buttons.
  - `ResearchSection.tsx` — Timeline of research papers with Lenis-driven progress fill. Cyan timeline dot transitions and staggered opacity reveals. Amber accent for featured papers.
  - `CtaSection.tsx` — Contact form with mailto: fallback. Dynamic amber glow effect driven by scroll position via Lenis. PGP link reference.
  - `capability-data.tsx` — 6 capability axes with bilingual labels, descriptions, value scores (0-1), and 10 portfolio projects.
  - `research-data.ts` — Research paper entries with bilingual abstracts, status, dates, tags.
  - `types.ts` — TypeScript interfaces: RadarProject, CapabilityAxis, ResearchPaper.
- `src/components/` — Shared UI components:
  - `ASCIIArt.tsx` — Background ASCII matrix animation (Canvas 2D).
  - `CyberpunkScene.tsx` — Three.js 3D scene: wireframe server racks, floating icosahedron/torus-knot, scan rings, ambient particles. Auto-rotates with mouse parallax.
  - `ParticleTrails.tsx` — Three.js instanced particle system with 3D simplex noise flow field. Performance-tiered (low/mid/high). Trail segments shrink and fade.
  - `FlowmapDistortion.tsx` — OGL/WebGL flowmap distortion effect on headings. Pointer-driven with GSAP interpolation. Chromatic aberration.
  - `ShaderReveal.tsx` — Three.js shader-based image reveal (block or dissolve variant) driven by GSAP ScrollTrigger. Falls back to CSS reveal on mobile/reduced motion.
  - `ThreeProvider.tsx` — Initializes Three.js renderer/composer and handles resize. Renders children as overlay.
  - `ScrollProgress.tsx` — Fixed-position scroll progress indicator (cyan bar at top).
  - `Footer.tsx` — Site footer with nav links, legal links, language-aware rights notice.
  - `Pgp.tsx` — PGP public key display section.
- `src/lib/` — Utility modules:
  - `lenis.ts` — Lenis smooth scroll singleton: creates instance, tracks scroll state (scroll, velocity, direction, progress, limit, isScrolling), syncs CSS custom properties and GSAP ScrollTrigger. Recreates on prefers-reduced-motion change.
  - `useLenis.ts` — React hook wrapping useSyncExternalStore for reactive scroll state.
  - `useSectionSnap.ts` — Lenis snap-scrolling integration: creates Snap with proximity type, adds elements matching a selector.
  - `LazySection.tsx` — IntersectionObserver-based lazy loader for deferred section rendering.
  - `RouteTransition.tsx` — Page transition wrapper for legal route changes.
  - `three.ts` — Three.js renderer singleton with EffectComposer (bloom + chromatic aberration + output passes). subscribeToRenderLoop for custom animation frames.
  - `ogl.ts` — OGL renderer/camera singletons for FlowmapDistortion.
- `src/i18n/translations.ts` — All bilingual UI strings (nav, radarHero, cta, research, showcase, disclosure, notFound, pgp, footer, legal).
- `src/index.css` — Tailwind directives, dark theme base, design tokens as CSS custom properties, Lenis overrides, prefers-reduced-motion reset, focus-visible styles, safe-area padding.

### Build & Deploy

- Output dir: `pub/`
- `postbuild` copies `pub/index.html` → `pub/404.html` for SPA fallback on Vercel
- `vercel.json` configures security headers (CSP, HSTS, X-Frame-Options) and immutable caching
- Build is pure static — no SSR, no API routes

### Styling

Tailwind CSS 3 with custom theme (`tailwind.config.js`): Inter font, custom keyframes, radial gradient utilities. Dark theme enforced in base CSS. prefers-reduced-motion respected globally.

### Config

- `tsc --noEmit` for type checking (strict mode, noUnusedLocals, noUnusedParameters)
- `vite.config.ts` — manual chunking (canvas, ui, vendor), CSS code splitting, base `'/'`
- No Prettier, no Biome
