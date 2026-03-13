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

- **File-based routing**: route files in `src/routes/` are auto-discovered by `@tanstack/router-plugin` (Vite plugin configured in `vite.config.ts`)
- **`src/routeTree.gen.ts`**: auto-generated route tree — **never edit manually**
- **`src/routes/__root.tsx`**: root layout with `<Outlet />` and TanStack Router DevTools
- **`src/routes/index.tsx`**: home page (`/`)
- **`src/main.tsx`**: app entry point — creates router instance from generated route tree, renders with React 19 `createRoot`

## Key Conventions

- Route files use TanStack Router's `createFileRoute` / `createRootRoute` APIs
- Adding a new file to `src/routes/` automatically generates the corresponding route (dev server must be running or run a build)
- No CSS framework yet — plain CSS; `lucide-react` for icons
- No TanStack Query — data fetching uses hardcoded arrays or plain `fetch`
- Each learning lesson is committed separately (`git commit -m "N. Topic description"`)
