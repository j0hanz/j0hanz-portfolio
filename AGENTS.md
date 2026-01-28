# AGENTS.md

> **Purpose:** Context and strict guidelines for AI agents working in this repository.

## 1. Project Context

- **Domain:** Personal portfolio site (projects, skills, contact form, CV).
- **Tech Stack:**
  - **Language:** TypeScript (strict mode) on Node.js ^24
  - **Framework:** React 19 + Vite 7
  - **Key Libraries:** MUI v7 (Material UI), Emotion, TanStack Query v5, Motion (motion/react), GSAP
- **Architecture:** Frontend SPA with feature-based modules and shared component library.

## 2. Repository Map (High-Level Only)

- `src/components`: Reusable UI components, animations, and shared UI primitives.
- `src/features`: Feature sections (hero, about, projects, contact, experience).
- `src/pages`: Page-level composition (e.g., Home).
- `src/hooks`: Custom React hooks (useTheme, useBreakpoints, useMotions, etc.).
- `src/config`: App constants, types, theme, motion configs, and responsive breakpoints.
- `src/contexts`: React context providers (theme, navigation, snackbar, menu, CV modal).
- `src/utils`: Helper utilities (validation, motion props, query helpers).
- `src/lib`: External integrations (EmailJS) and static data (projects, skills, experiences).
- `public`: Static assets served by Vite.
  > _Note: Ignore `dist`, `node_modules`, `.venv`, and `__pycache__`._

## 3. Operational Commands

- **Environment:** Node.js ^24, npm ^11 (see `package.json` engines)
- **Install:** `npm install`
- **Dev Server:** `npm run dev`
- **Lint:** `npm run lint`
- **Format:** `npm run format`
- **Type Check:** `npm run type-check`
- **Build:** `npm run build`
- **Dead Code Analysis:** `npm run knip`
- **Test:** Not configured (no test script or test files detected)

## 4. Coding Standards (Style & Patterns)

- **Naming:** PascalCase for components/types, camelCase for variables/functions, SCREAMING_SNAKE_CASE for constants.
- **Structure:** Prefer small functional components + hooks; keep feature logic in `src/features` and shared UI in `src/components`.
- **Typing:** Strict TypeScript is enforced (`strict: true`, `noUnusedLocals`, `noUnusedParameters`). Avoid `any`.
- **Preferred Patterns:**
  - Use named exports (e.g., `export { App };`).
  - Use MUI `sx` props and Emotion styling for UI. Extract `sx` objects to variables (e.g., `const buttonSx: SxProps<Theme> = {...}`).
  - Use path alias `@/` for internal imports.
  - Split context into state and actions (see `createSplitContextHooks` pattern in `src/utils/context.ts`).
  - React 19: `ref` is a native prop—do not use `forwardRef`.
  - Wrap MUI components with `motion.create()` for animation (e.g., `const MotionButton = motion.create(MuiButton);`).
  - Use `readonly` and `as const` for static configuration objects.

## 5. Agent Behavioral Rules (The "Do Nots")

- **Prohibited:** Do not use `any` or bypass strict typing.
- **Prohibited:** Do not edit lockfiles (`package-lock.json`) manually.
- **Prohibited:** Never use `useMemo`, `useCallback`, or `React.memo`. Rely on React Compiler (`babel-plugin-react-compiler`) for memoization.
- **Prohibited:** Do not add JSDoc comments or long descriptions to simple functions or components. Keep comments concise and relevant.
- **Prohibited:** Do not use `console.log`—use `console.warn` or `console.error` only when necessary.
- **Handling Secrets:** Never output `.env` values or hardcode secrets.
- **File Creation:** Always verify folder existence before creating files.

## 6. Testing Strategy

- **Framework:** None detected.
- **Approach:** If adding tests, colocate them with features or use a dedicated `tests/` folder and add a test script to `package.json`.
