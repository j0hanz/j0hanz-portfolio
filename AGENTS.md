# AGENTS.md

> **Purpose:** Context and strict guidelines for AI agents working in this repository.

## 1. Project Context

- **Domain:** Personal portfolio site (projects, skills, contact form, CV).
- **Tech Stack:**
  - **Language:** TypeScript (strict) on Node.js ^24
  - **Framework:** React 19 + Vite 7
  - **Key Libraries:** MUI (Material UI), Emotion, TanStack Query, Motion (motion/react)
- **Architecture:** Frontend SPA with feature + shared-component modules.

## 2. Repository Map (High-Level Only)

- src/components: Reusable UI components and shared UI primitives.
- src/features: Feature sections (hero, about, projects, contact, experience).
- src/pages: Page-level composition (e.g., Home).
- src/hooks: Custom React hooks.
- src/config: App constants, types, and configuration.
- src/contexts: React context providers.
- src/styles: Shared styles and `sx` maps.
- src/utils: Helper utilities.
- src/lib: Integrations (e.g., EmailJS) and data.
- public: Static assets served by Vite.
  > _Note: Ignore dist, node_modules, .venv, and **pycache**._

## 3. Operational Commands

- **Environment:** Node.js ^24, npm ^11 (see package.json engines)
- **Install:** npm install
- **Dev Server:** npm run dev
- **Lint:** npm run lint
- **Format:** npm run format
- **Type Check:** npm run type-check
- **Build:** npm run build
- **Test:** Not configured (no test script or test files detected)

## 4. Coding Standards (Style & Patterns)

- **Naming:** PascalCase for components, camelCase for variables, SCREAMING_SNAKE_CASE for constants.
- **Structure:** Prefer small functional components + hooks; keep feature logic in src/features and shared UI in src/components.
- **Typing:** Strict TypeScript is enforced; avoid `any`.
- **Preferred Patterns:**
  - Use named exports (e.g., `export { App };`).
  - Use MUI `sx` props and Emotion styling for UI.
  - Use path alias `@/` for internal imports.

## 5. Agent Behavioral Rules (The "Do Nots")

- **Prohibited:** Do not use `any` or bypass strict typing.
- **Prohibited:** Do not edit lockfiles manually.
- **Prohibited:** Never use `useMemo`, `useCallback`, or `React.memo`. Rely on React Compiler for memoization.
- **Handling Secrets:** Never output `.env` values or hardcode secrets.
- **MUI Guidance:** Do not answer MUI-related questions without following .github/instructions/mui.md.
- **File Creation:** Always verify folder existence before creating files.

## 6. Testing Strategy

- **Framework:** None detected.
- **Approach:** If adding tests, colocate them with features or use a dedicated tests folder and add a test script.

## 7. Evolution & Maintenance

- **Update Rule:** If a convention changes or a new pattern is established, the agent MUST suggest an update to this file in the PR.
- **Feedback Loop:** If a build command fails twice, the correct fix MUST be recorded in the "Common Pitfalls" section.
