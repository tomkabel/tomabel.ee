# Agent Guidelines for tomabel.ee

This document outlines the essential commands and code style guidelines for agents working on this repository.

## 1. Build, Lint, and Test Commands

- **Install Dependencies**: `npm install`
- **Development Server**: `npm run dev`
- **Build Project**: `npm run build`
- **Run Linter**: `npm run lint`
- **Preview Build**: `npm run preview`
- **Running Tests**: There are no explicit test scripts defined in `package.json` or CI. If tests are added, they should follow standard practices (e.g., `npm test` or `vitest`).

## 2. Code Style Guidelines

- **Language**: TypeScript and React.
- **Formatting**: Adhere to ESLint rules defined in `eslint.config.js`.
- **Typing**: Use strong typing with TypeScript.
- **Imports**: Follow ESLint import rules.
- **Naming Conventions**: Use `camelCase` for variables and functions, `PascalCase` for components and types.
- **Error Handling**: Implement robust error handling using `try-catch` blocks where appropriate.
- **React Hooks**: Follow recommended practices for React Hooks as enforced by `eslint-plugin-react-hooks`.
- **Component Exports**: Components should primarily be exported as default or named exports, with `allowConstantExport: true` for `react-refresh/only-export-components`.

## 3. AI-Specific Rules

- No specific Cursor or Copilot rules found in the repository. Adhere to general best practices for AI-assisted coding.
