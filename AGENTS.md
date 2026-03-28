# AGENTS.md - Agent Guidelines for ProksiAbel.ee

This document provides guidelines for AI agents working on this codebase.

## Project Overview

- **Project Type**: Vite + React + TypeScript website
- **Purpose**: Security consultancy landing page (ProksiAbel OÜ)
- **Output Directory**: `pub/` (not default `dist`)
- **No tests currently configured**

---

## Build / Lint / Test Commands

### Development
```bash
npm run dev          # Start Vite dev server
```

### Building
```bash
npm run build        # Build for production (outputs to pub/)
npm run preview      # Preview production build locally
```

### Linting
```bash
npm run lint         # Run ESLint on all files
```

### Type Checking
```bash
npx tsc --noEmit     # Run TypeScript compiler check
```

### Single File Linting
```bash
npx eslint src/components/Navbar.tsx    # Lint specific file
npx eslint src/ --ext .ts,.tsx           # Lint specific directory
```

### No Test Framework
This project does NOT currently have a test framework (Vitest/Jest) configured. Do not write tests unless explicitly instructed.

---

## Code Style Guidelines

### General Principles

- Use TypeScript with `strict: true` enabled (see tsconfig.app.json)
- Prefer functional components with hooks over class components
- Keep components small and focused on a single responsibility
- Use meaningful, descriptive names for all identifiers

### File Organization

```
src/
├── components/       # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   └── data.ts       # Static data/constants
├── App.tsx           # Root component
├── main.tsx          # Entry point
└── index.css         # Global styles (Tailwind directives)
```

### Imports

**Order (top to bottom):**
1. React import: `import React from 'react';`
2. External libraries (lucide-react, etc.)
3. Internal components/hooks/utils
4. CSS/style imports

**Example:**
```typescript
import React from 'react';
import { Shield, Menu, X } from 'lucide-react';
import Navbar from './components/Navbar';
import './index.css';
```

### Component Patterns

**Default export with function declaration (preferred):**
```typescript
export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  // ...
}
```

**Or arrow function with variable declaration:**
```typescript
const Pgp = () => {
  return (
    // ...
  );
};

export default Pgp;
```

Pick one style and be consistent within a file.

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `Navbar`, `HeroSection` |
| Functions | camelCase | `toggleMenu`, `handleClick` |
| Variables | camelCase | `isMenuOpen`, `servicesData` |
| Constants | camelCase or UPPER_SNAKE | `servicesData` or `MAX_SIZE` |
| Props interfaces | PascalCase + Props suffix | `NavbarProps` |
| Files | PascalCase | `Navbar.tsx`, `data.ts` |

### TypeScript Usage

- Always define types for component props:
```typescript
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function ServiceCard({ title, description, icon: Icon }: ServiceCardProps) {
  // ...
}
```

- Use `strict: true` - no `any` types allowed
- Enable `noUnusedLocals` and `noUnusedParameters` in TypeScript

### Tailwind CSS

- Use `slate` color palette for dark backgrounds: `bg-slate-900`, `bg-slate-800`
- Use `cyan` for accent colors: `text-cyan-500`, `bg-cyan-600`
- Use `gray` for secondary text: `text-gray-300`, `text-gray-400`
- Use `white` for primary text on dark backgrounds: `text-white`

**Common classes used in this project:**
```tsx
<div className="min-h-screen bg-slate-900">
<div className="text-white font-bold text-xl">
<div className="text-gray-300 hover:text-white transition-colors">
<button className="bg-cyan-500 text-white hover:bg-cyan-600">
```

### JSX Guidelines

- Always use self-closing tags for elements without children: `<Component />`
- Use parentheses for multi-line JSX returns
- Prefer ternary operators or `&&` for conditional rendering:
```tsx
{isOpen && <MobileMenu />}
{isLoggedIn ? <Dashboard /> : <Login />}
```

### Error Handling

- This is a simple static website; no complex error handling required
- For component errors, consider using Error Boundaries if needed
- Use optional chaining (`?.`) when accessing potentially undefined properties

### React Hooks

- Use `useState` for local component state
- Keep hook calls at the top of the component (after React import)
- Group related state together when appropriate:
```typescript
const [isMenuOpen, setIsMenuOpen] = React.useState(false);
const [isLoading, setIsLoading] = React.useState(true);
```

### Accessibility

- Use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<button>`)
- Include `alt` text for images (or use decorative images appropriately)
- Ensure interactive elements have focus states
- Use `aria-label` for icon-only buttons

---

## Configuration Files Reference

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite build configuration (output: `pub/`) |
| `tsconfig.app.json` | TypeScript config (strict mode) |
| `eslint.config.js` | ESLint rules |
| `tailwind.config.js` | Tailwind CSS configuration |
| `postcss.config.js` | PostCSS configuration |

---

## Common Tasks

### Adding a new component
1. Create file in `src/components/`
2. Use function declaration with default export
3. Import React and needed dependencies
4. Use Tailwind CSS classes for styling
5. Export types if component accepts props
6. Import and use in `App.tsx`

### Adding a new icon
1. Import from `lucide-react`: `import { IconName } from 'lucide-react';`
2. Use in JSX: `<IconName className="h-6 w-6 text-cyan-500" />`

### Modifying styles
- Tailwind classes go directly in JSX `className` attributes
- Global styles go in `src/index.css` (Tailwind directives only)

---

## Notes for Agents

- Do NOT create tests unless explicitly requested
- The build output is `pub/`, not `dist/` - remember this for deployment
- This is a marketing website, not a complex web application
- Keep dependencies minimal - this project uses React, Tailwind, and Lucide icons only