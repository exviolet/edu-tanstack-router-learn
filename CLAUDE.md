# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Educational project for learning TanStack Router (file-based routing) with React 19. Runtime: Bun, bundler: Vite 8, language: TypeScript strict.

## Commands

- `bun dev` — start dev server with HMR
- `bun run build` — TypeScript check + Vite production build
- `bun run lint` — ESLint (flat config with typescript-eslint, react-hooks, react-refresh)
- `bun preview` — preview production build locally

## Architecture

- **File-based routing**: route files in `src/routes/` are auto-discovered by `@tanstack/router-plugin` (Vite plugin in `vite.config.ts` with `autoCodeSplitting: true`)
- **`src/routeTree.gen.ts`**: auto-generated route tree — **never edit manually**
- **`src/main.tsx`**: creates router with generated route tree, injects `auth` context, registers router type globally via `declare module "@tanstack/react-router"`

### Route file naming conventions

- `__root.tsx` — root layout (uses `createRootRouteWithContext<RootRouteContext>()`)
- `index.tsx` — index route for parent directory
- `$param.tsx` — dynamic segment (e.g. `$postId.tsx` → `/posts/:postId`)
- `_prefix/` — pathless layout group (e.g. `_admin/` wraps `/dashboard` and `/settings` without adding a path segment)
- `-dirname/` — non-route directory for colocated components (e.g. `posts/-components/`)

### Key patterns used in routes

- **Loaders**: `loader` option fetches data; accessed via `Route.useLoaderData()`
- **Search params**: `validateSearch` types and transforms query params; accessed via `Route.useSearch()`
- **Protected routes**: `beforeLoad` checks `context.auth`, throws `redirect()` to `/login`
- **Error handling**: `errorComponent` for loader errors, `notFoundComponent` for 404s, `throw notFound()` in loaders
- **Pending states**: `pendingMs`/`pendingMinMs` per route, global defaults in `createRouter()`

### Data & auth

- `src/auth.ts` — hardcoded `AuthContext` object injected into router context at creation
- `src/posts.ts` — mock data with simulated async delays (no real API)

## Key Conventions

- Route files export `const Route = createFileRoute("...")(config)`
- Adding a new file to `src/routes/` auto-generates the route (dev server must be running or run a build)
- No CSS framework — plain CSS + inline styles; `lucide-react` for icons
- No TanStack Query — data fetching uses hardcoded arrays
- Each learning lesson is committed separately (`git commit -m "N. Topic description"`)
