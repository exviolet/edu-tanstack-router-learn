# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Educational project for learning TanStack Router (file-based routing) with React 19. Runtime: Bun, bundler: Vite 8, language: TypeScript strict.

## Commands

- `bun dev` — start Vite dev server (port 5173) with HMR
- `bun run server` — start Hono API server (port 3001); must run alongside `bun dev`
- `bun run build` — TypeScript check + Vite production build
- `bun run lint` — ESLint (flat config with typescript-eslint, react-hooks, react-refresh)
- `bun preview` — preview production build locally

## Architecture

- **File-based routing**: route files in `src/routes/` are auto-discovered by `@tanstack/router-plugin` (Vite plugin in `vite.config.ts` with `autoCodeSplitting: true`)
- **`src/routeTree.gen.ts`**: auto-generated route tree — **never edit manually**
- **`src/main.tsx`**: creates router with generated route tree, injects `auth` and `queryClient` context, registers router type globally via `declare module "@tanstack/react-router"`

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

### Data layer

- **Backend**: Hono server in `server/` — in-memory data store (`server/db.ts`), REST routes at `/api/posts` and `/api/stats`
- **TanStack Query**: `QueryClient` created in `src/main.tsx` (staleTime: 60s), passed into router context; query key factory in `src/api/queryKeys.ts`
- **Legacy mock data**: `src/posts.ts` — older hardcoded arrays with simulated delays (some routes may still use these)
- `src/auth.ts` — hardcoded `AuthContext` object injected into router context at creation

## Key Conventions

- Route files export `const Route = createFileRoute("...")(config)`
- Adding a new file to `src/routes/` auto-generates the route (dev server must be running or run a build)
- No CSS framework — plain CSS + inline styles; `lucide-react` for icons
- Each learning lesson is committed separately (commit message format: `N. Topic description`)
