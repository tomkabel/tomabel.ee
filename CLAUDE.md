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
- **HomePage** — Full scrollable landing with hash-anchor sections (`#venn`, `#capabilities`, `#engagement`, `#about`, `#contact`, `#pgp`)
- **LegalLayout** — Simple layout for `/privacy`, `/terms`, `/cookies`, `/disclosure` (lazy-loaded via `React.lazy()`)

### i18n

Custom Context-based i18n (no library). Two locales:
- `et` (Estonian, default) — persisted to localStorage
- `en` (English)

Translations in `src/i18n/translations.ts`, organized by component section. Switch via `useLanguage()` hook.

### Key Source Map

- `src/App.tsx` — Router + route definitions + layouts
- `src/components/Navbar.tsx` — Fixed nav with mobile menu, language toggle, hash-scroll
- `src/intersection/` — Custom interactive visualization suite:
  - `constellation.ts` — Force-directed graph physics engine
  - `Constellation.tsx` — React wrapper (WebGL → Canvas 2D fallback)
  - `venn/VennDiagram.tsx` — Interactive SVG Venn diagram (3 domains: Security, AI/ML, Systems)
  - `zones.ts` — Venn zone definitions (7 zones incl. intersections)
  - `projects.ts` — 10 portfolio projects with bilingual descriptions
  - `Capabilities.tsx` — Capabilities card grid
  - `EngagementModels.tsx` — Engagement model sections
- `src/i18n/translations.ts` — All bilingual UI strings
- `src/index.css` — Tailwind directives, dark theme base, custom animations (gradient, float, glow)

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
