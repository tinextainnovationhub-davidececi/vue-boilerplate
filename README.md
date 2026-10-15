# Frontend Boilerplate

Ready-to-use frontend boilerplate: a pnpm monorepo with Vue 3 (Composition API + TypeScript), Tailwind CSS 4 and a design system based on atomic design (cva + Tailwind).

## Structure

```
apps/
  web/                  # Vite + Vue 3 web app
packages/
  design-system/        # Atoms, molecules, organisms + Storybook
  api-client/           # Typed API client, generated from OpenAPI
  i18n/                 # Translations (it, en)
  types/                # Shared types
  typescript-config/    # Shared tsconfig bases
  eslint-config/        # Shared ESLint configurations
```

## Requirements

- Node >= 24 (see `.nvmrc`)
- pnpm >= 12

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm storybook    # http://localhost:6006
```

## Commands

| Command                       | Description                                |
| ----------------------------- | ------------------------------------------ |
| `pnpm dev`                    | Start the web app                          |
| `pnpm build`                  | Build all workspaces                       |
| `pnpm lint` / `pnpm lint:fix` | ESLint                                     |
| `pnpm format`                 | Prettier                                   |
| `pnpm check-types`            | Type check (`tsc` / `vue-tsc`)             |
| `pnpm test`                   | Vitest                                     |
| `pnpm api:generate`           | Regenerate API types from the OpenAPI spec |
| `pnpm storybook`              | Design system Storybook                    |

To generate the client from a running backend:

```bash
OPENAPI_SPEC=http://localhost:5008/openapi.json pnpm api:generate
```

## Initial customization

1. Replace the `@boilerplate` scope with your project's scope (find and replace).
2. Replace `packages/api-client/spec/openapi.json` with the real spec and run `pnpm api:generate`.
3. Update the tokens in `packages/design-system/src/styles/theme.css`.

Development conventions (atomic design, i18n, data fetching, testing) are described in [`AGENTS.md`](./AGENTS.md).
