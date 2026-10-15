# Frontend Boilerplate - Vue 3 Monorepo

Ready-to-use frontend template: a pnpm monorepo with a Vue 3 web app, a design system built on atomic design, a typed API client generated from OpenAPI, and shared i18n, types and tooling packages.

## Tech Stack

| Technology                                       | Version  | Purpose                               |
| ------------------------------------------------ | -------- | ------------------------------------- |
| Vue 3 (Composition API, `<script setup>`)        | 3.5      | UI framework                          |
| TypeScript                                       | 5.9      | Language (strict)                     |
| Vite                                             | 8        | Dev server and bundler                |
| Tailwind CSS                                     | 4        | Styling (tokens in `@theme`)          |
| class-variance-authority + tailwind-merge + clsx | -        | Component variants                    |
| Vue Router / Pinia                               | 5 / 4    | Routing / state                       |
| vue-i18n                                         | 11       | Internationalization                  |
| TanStack Query (Vue)                             | 5        | Server state and data fetching        |
| VueUse                                           | 15       | Composable utilities                  |
| openapi-typescript + openapi-fetch               | 7 / 0.17 | Typed API client from an OpenAPI spec |
| Vitest + Vue Test Utils                          | 5 / 2    | Unit and component tests              |
| Storybook                                        | 10       | Design system documentation           |
| ESLint 9 (flat) + Prettier                       | -        | Lint and formatting                   |
| Husky + lint-staged                              | -        | Pre-commit hook                       |

Versions are managed centrally in the `catalog:` section of `pnpm-workspace.yaml`.

---

## Quick Start

```bash
pnpm install
cp .env.example apps/web/.env.local   # required: the app validates its env on startup
pnpm dev                              # web app on http://localhost:5173
pnpm storybook                        # design system on http://localhost:6006
```

Requires Node >= 24 (`.nvmrc`, `.tool-versions`) and pnpm >= 12.

| Command                              | Does                                                                         |
| ------------------------------------ | ---------------------------------------------------------------------------- |
| `pnpm dev` / `build` / `preview`     | Run, build and preview `apps/web` (`build` runs all packages)                |
| `pnpm lint` / `lint:fix`             | ESLint on every workspace                                                    |
| `pnpm format` / `format:check`       | Prettier                                                                     |
| `pnpm check-types`                   | `tsc` / `vue-tsc` on every workspace                                         |
| `pnpm test`                          | Vitest on every workspace                                                    |
| `pnpm api:generate`                  | Regenerate API types (`OPENAPI_SPEC` env var overrides the spec path or URL) |
| `pnpm storybook` / `build-storybook` | Design system Storybook                                                      |

Target a single workspace with `pnpm --filter @boilerplate/<name> <script>`.

---

## Monorepo Structure

```
apps/
  web/                    # Vite + Vue 3 web app (@boilerplate/web)
packages/
  design-system/          # Atomic design components (cva + Tailwind) + Storybook
  api-client/             # Typed client generated from OpenAPI (openapi-fetch)
  i18n/                   # Translation messages (it, en) and locale helpers
  types/                  # Shared TypeScript types
  typescript-config/      # Shared tsconfig bases (base.json, vue.json)
  eslint-config/          # Shared ESLint flat configs (base, vue)
```

- Workspaces are scoped `@boilerplate/*`. **Rename the scope** (find and replace) when starting a real project.
- Packages are consumed **as source** (`exports` point to `src/`): no build step, no `dist`. Never add a build step to a package without a reason.
- Dependency direction: `apps/*` → `packages/*`. Packages must never import from `apps/*`. `design-system` must not depend on `api-client` or `i18n` (it stays presentational; text arrives through props and slots).
- Dependencies are declared with `catalog:` (external) and `workspace:*` (internal). Add new versions to the catalog.

---

## Design System — MANDATORY Atomic Design Pattern

Components live in `packages/design-system/src/components/` and follow atomic design:

| Level        | Folder       | Is                                                                                      | NEVER does                               |
| ------------ | ------------ | --------------------------------------------------------------------------------------- | ---------------------------------------- |
| **Atom**     | `atoms/`     | Smallest UI unit: Button, Input, Label, Badge, Spinner, Typography (Heading, Paragraph) | Import other levels                      |
| **Molecule** | `molecules/` | Small group of atoms with one purpose: FormField, SearchInput                           | Import organisms; contain business logic |
| **Organism** | `organisms/` | Self-contained section composed of molecules and atoms: ConfirmDialog                   | Fetch data, use stores, router or i18n   |

Rules:

- Imports go **downwards only**: organism → molecule → atom. Never sideways or upwards.
- Every component has its own folder with the same shape:
  ```
  Button/
    Button.vue          # <script setup lang="ts">
    variants.ts         # cva definition (only when the component has variants)
    Button.stories.ts   # Storybook stories (required)
    Button.test.ts      # Vitest test (required for logic or variants)
    index.ts            # exports the component, variants and variant types
  ```
- Export every new component from the level `index.ts`; the package entry (`src/index.ts`) re-exports all levels.
- Component names are PascalCase; stories use the title `Atoms/…`, `Molecules/…`, `Organisms/…`.

### Variants with cva

```ts
// variants.ts
export const buttonVariants = cva("base classes", {
  variants: { variant: { primary: "…" }, size: { md: "…" } },
  defaultVariants: { variant: "primary", size: "md" },
});
export type ButtonVariants = VariantProps<typeof buttonVariants>;
```

```vue
<!-- Button.vue -->
const classes = computed(() => cn(buttonVariants({ variant: props.variant }), props.class))
```

- Always merge classes with `cn()` (`clsx` + `tailwind-merge`) and accept a `class` prop so callers can override.
- Declare every HTML attribute you want typed as an explicit prop (e.g. `placeholder`, `disabled`); undeclared attributes still fall through at runtime but are untyped.
- Use `defineModel` for `v-model`, type-based `defineProps` / `defineEmits`, and `withDefaults` with explicit defaults.

### Typography

- Text is rendered with the typography atoms in `atoms/Typography/` (`Heading`, `Paragraph`), never with raw `<h1>`/`<p>` plus ad-hoc classes in pages or features.
- Styles come from two cva definitions in `Typography/variants.ts` (`headingVariants`, `textVariants`). `Heading` takes a `level` prop (1–6) that selects both the style and the tag (`h1`–`h6`); `Paragraph` covers every paragraph-like style through its `variant` prop (`body`, `lead`, `small`, `muted`).
- **Never create one component per style when the tag is the same.** To add a text style, add a `variant` to `textVariants` and use `<Paragraph variant="…">`.
- Each component renders its semantic tag by default; use `as` to change the tag **without** changing the look (e.g. `<Heading :level="2" as="h3">`) so the document outline stays correct.
- `Typography/` is the one folder that groups several related atoms (shared variants, one story, one test).

### Design tokens

- Tokens are defined once in `packages/design-system/src/styles/theme.css` with Tailwind v4 `@theme` (colors, radius, fonts).
- Use **semantic tokens** (`bg-primary`, `text-muted-foreground`, `border-border`, `rounded-control`) — never hard-coded hex values or raw palette classes in components.
- The app imports `tailwindcss`, then `@boilerplate/design-system/theme.css`, and declares `@source` towards `packages/design-system/src` (see `apps/web/src/style.css`). Without `@source`, component classes are not generated.

---

## Web App (`apps/web`) — Feature-based Structure

```
src/
  main.ts          # App bootstrap (Pinia, router, i18n, TanStack Query)
  App.vue
  style.css        # Tailwind entry + design system tokens + @source
  config/          # Validated environment variables (zod) and app configuration
  router/          # Route table (lazy-loaded views)
  views/           # Route-level pages (<Name>View.vue): thin, only compose feature components
  features/
    <name>/
      components/  # Domain-aware Vue components
      composables/ # useXxx composables (TanStack Query queries/mutations, UI logic)
      services/    # Pure async functions (no Vue), call the API client
      stores/      # Pinia setup stores (client state only), when needed
      types/       # Domain types of the feature
      index.ts     # Public API (barrel)
  plugins/         # vue-i18n and TanStack Query configuration
  lib/             # Cross-cutting singletons and helpers (e.g. the API client instance)
```

Create `components/` (shared across 2+ features) and `layouts/` under `src/` only when needed.

### Feature rules

- Group everything a page needs for one domain (components, composables, services, types) in `features/<name>/`. Only create the sub-folders the feature actually uses.
- **`index.ts` is the boundary.** Other modules (views, other features) import only from `@/features/<name>`, never from internal paths — ESLint enforces it (`no-restricted-imports`). Export only what another module needs. Inside a feature use relative imports.
- No nested sub-features. If a feature grows, split it into a new top-level feature.
- A component that references a domain type belongs in a feature. A generic UI component belongs in the **design system**. `src/components/` is for components shared by 2+ features that are not generic enough for the design system; use it sparingly.
- **Services** are pure async functions returning typed domain objects and throwing on error. **Composables** wrap them with TanStack Query: `use<Resource>` for queries, `use<Verb><Resource>` for mutations.
- **Views** import feature barrels and design system components, nothing else. Business logic never lives in a view.

### General rules

- `@/` is an alias for `apps/web/src/`.
- Move a component to `packages/design-system` as soon as it becomes generic and a second place needs it.
- **Server state** goes through TanStack Query (feature composables) using the API client. **Client state** only goes in Pinia. Never copy query data into a store.
- All user-facing text must come from i18n (`t("section.key")`); never hard-code strings in templates or scripts — not even brand or acronym text such as "API" (use an interpolated message instead). The `vue/no-bare-strings-in-template` ESLint rule enforces this in `apps/web`. The document title is set from `common.appName`.
- **Environment variables** are prefixed `VITE_`, declared and validated with zod in `src/config/env.ts` (the app fails at startup with a readable error if one is missing or invalid), and documented in `.env.example`. Always `import envs from "@/config/env"`; never read `import.meta.env` anywhere else (ESLint enforces it). To add a variable: add it to `envSchema`, `.env.example` and the `test.env` block of `vite.config.ts`.
- Use zod also for other validations (e.g. form fields such as emails), not ad-hoc regular expressions.
- Pinia stores use the setup syntax (`defineStore("name", () => { … })`).

---

## API Client (`packages/api-client`)

- Types are **generated** from an OpenAPI spec into `src/generated/schema.d.ts` — never edit that file by hand; it is committed so the repo builds without the backend.
- Update the contract with `pnpm api:generate`:
  ```bash
  OPENAPI_SPEC=http://localhost:5008/openapi.json pnpm api:generate   # from a running backend
  ```
  The default source is `packages/api-client/spec/openapi.json` (a minimal example to replace with the real spec).
- `createApiClient({ baseUrl, getAccessToken, onUnauthorized })` returns an `openapi-fetch` client with auth and 401 middleware. The app instance lives in `apps/web/src/lib/api.ts`.
- Calls are typed by path: `api.GET('/health')` returns `{ data, error }`. Throw on `error` inside query functions.

---

## i18n (`packages/i18n`)

- Messages live in `src/locales/<locale>.json` (`it` default, `en` fallback). `it.json` defines the schema (`MessageSchema`).
- **Every key must exist in every locale** — `index.test.ts` enforces it.
- Add a locale: create the JSON file, register it in `src/index.ts` and in the `Locale` type of `packages/types`.
- Keys are grouped by feature (`home.title`, `common.save`); put cross-cutting text under `common`.

---

## Code Style and Quality

- **Language**: code comments, JSDoc, commit messages and documentation are written in **English**.
- **Comments**: write them only when the code cannot say it (a non-obvious _why_, a constraint, a trade-off). Never restate what a name or signature already says (e.g. "Pure function, throws on error").
- TypeScript strict mode, including `noUncheckedIndexedAccess` and `verbatimModuleSyntax` (use `import type` for types).
- ESLint configs come from `@boilerplate/eslint-config` (`base` for plain TS, `vue` for Vue). Prettier runs last: semicolons, double quotes, trailing commas, 100 columns, Tailwind class sorting (`cva` and `cn` calls included).
- Vue SFCs: `<script setup lang="ts">` only (Options API is rejected by lint), type-based props and emits.
- Prefer composables over mixins; keep components small and typed.
- The Husky pre-commit hook runs `lint-staged` (ESLint + Prettier on staged files).

## Testing

- Vitest per workspace (`*.test.ts` next to the code). `jsdom` environment for Vue workspaces.
- Test **behavior**, not implementation: render with `@vue/test-utils`, assert on text, attributes and emitted events.
- Design system: test every component with logic or variants. Web app: test views and composables with a router and the `i18n` plugin installed.
- `pnpm lint && pnpm check-types && pnpm test` must pass before finishing any task.

## Adding Things

- **New app**: create `apps/<name>` with its own `package.json` (`@boilerplate/<name>`), extending `@boilerplate/typescript-config/vue.json` and `@boilerplate/eslint-config/vue`.
- **New package**: create `packages/<name>` with `exports` pointing to `src/index.ts`, `lint` / `check-types` / `test` scripts, and a `tsconfig.json` extending `@boilerplate/typescript-config`.
- **New design system component**: follow the atomic design rules above (folder, variants, stories, test, `index.ts`, level export).
- **New API endpoint**: update the spec, run `pnpm api:generate`, then add a service and a composable in the relevant `apps/web/src/features/<name>/`.
- **New translation**: add the key to **all** locale files.
