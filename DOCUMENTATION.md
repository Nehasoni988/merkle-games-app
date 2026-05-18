# Implementation Approach & Decisions

## Overview

This document explains the reasoning behind the architectural and technical choices made while building the Merkle Games client application. The goal was to meet all functional requirements cleanly, keep the codebase maintainable, and demonstrate thoughtful decision-making over exhaustive feature coverage.

---

## Technology Stack

| Concern | Choice | Reason |
|---------|--------|--------|
| Framework | Nuxt 4 (latest) | Assignment requirement; also provides file-based routing, SSR-friendly data fetching, and auto-imports out of the box |
| Language | TypeScript (strict) | Catches interface mismatches early, especially important given the API has several nested relations |
| Styling | SCSS with CSS custom properties | Assignment requirement (no Tailwind); variables enable a consistent design token system and straightforward dark mode |
| Testing | Vitest + Vue Test Utils | Faster than Jest for Vite-based projects; API is identical, so migration cost is zero |
| Image handling | `@nuxt/image` | Provides lazy loading, WebP conversion, and a clean `<NuxtImg>` component without extra boilerplate |

---

## Architecture Decisions

### Service Layer (`app/services/api/`)

API calls are isolated in a thin service layer rather than scattered across components. Each file maps to one resource (`games`, `genres`, `media`). This makes the API surface easy to mock in tests and easy to swap if the base URL or response shape ever changes.

`createGamesAPI(apiBase)` is a factory function that closes over the base URL. This avoids repeating `useRuntimeConfig()` everywhere and makes unit-testing the service straightforward by injecting a mock URL.

### Data Fetching Strategy

The index page uses `useAsyncData` to:

1. Fetch all game IDs released between 2015 and 2017 from the `/by-date-range` endpoint.
2. Randomly shuffle the IDs and slice the first 15.
3. Fire 15 parallel `Promise.all` pairs — one for game details, one for stats — to merge `average_rating` into the game object.

This approach respects the API's existing endpoints without requiring a dedicated "random 15 games with stats" endpoint. The parallel fetches keep perceived load time low.

### Composable: `useFilteredGames`

All filtering and sorting logic lives in a single computed composable that accepts reactive `payload` and `filter` refs. This keeps the page component declarative (no imperative loops) and makes the logic trivially unit-testable in isolation — no DOM, no component mounting required.

### Component Design

Components are kept small and single-purpose:

- `GameList` — iterates and delegates to `GameCard`.
- `GameCard` (`game/index.vue`) — presentational only; receives a typed `GameWithReviews` prop.
- `GameFilters` — owns its own `useAsyncData` for genres and emits a model update; loaded lazily (`LazyGameFilters`) and hydrated on visibility to keep the initial bundle light.
- `GameReviews` — similarly lazy-loaded and wrapped in `<NuxtErrorBoundary>` so a failure in the reviews section does not take down the entire detail page.

### Error Handling

Three layers of error handling are in place:

1. **Global plugin** (`plugins/error-handler.ts`) — catches unhandled Vue errors and the `vue:error` hook. Logs them; in production this would forward to a monitoring service.
2. **`<NuxtErrorBoundary>`** — wraps `AppHeader`, `AppFooter`, and `GameReviews` so isolated component failures degrade gracefully rather than crashing the page.
3. **`error.vue`** — Nuxt's global error page handles fatal route-level errors (e.g., the genre fetch failing).

### Fallback Images

`mediaAPI.fetchImage` returns `https://placehold.co/600x400` when a game has no associated images. This centralises the fallback logic in one place so individual components need no conditional rendering around images.

### Light / Dark Mode

Theme support is implemented via a CSS custom property swap driven by `appTheme.vue`. The active theme is stored in a runtime config value (`NUXT_PUBLIC_THEME`) and toggled client-side, keeping SSR output theme-neutral.

### SEO

- `app.vue` sets global Open Graph and Twitter Card meta via `useSeoMeta`.
- `nuxt.config.ts` sets a default `<html lang="en">` attribute and a fallback title.
- `default.vue` updates `og:title` per route using `useHead`.
- `robots.txt` is included in `/public`.

### Accessibility

- All interactive form elements (`<input>`, `<select>`, `<button>`) have explicit `<label>` associations or descriptive `aria` attributes.
- `<NuxtRouteAnnouncer>` is included in `app.vue` to announce page transitions to screen readers.
- Semantic HTML is used throughout (`<article>`, `<section>`, `<main>`, `<h1>`–`<h3>` in correct hierarchy).
- The sort toggle button uses visible text (`↓` / `↑`) rather than icon-only content.

### Performance

- `<NuxtLoadingIndicator>` gives instant visual feedback during navigation.
- Page transitions use a CSS blur/opacity fade configured in `nuxt.config.ts`.
- `AppHeader` and `AppFooter` use `v-once` in the layout since they are static, preventing unnecessary re-renders.
- `@nuxt/image` serves WebP and defers off-screen images with `loading="lazy"`.
- A `withConcurrencyLimit` utility exists in `utils/index.ts` for batching large sets of concurrent requests if needed in future.

---

## Trade-offs & Known Limitations

- **No pagination on the index page.** The assignment specifies exactly 15 games, so pagination was not implemented. The service layer and composable are structured to support it easily if the scope expands.
- **Random selection is client-side.** Games are randomly shuffled in the browser after fetching all IDs. This means the set changes on every page refresh, which matches the "random" requirement but does increase the initial payload of IDs. An ideal solution would be a server-side `/games/random?limit=15` endpoint.
- **Parallel fetching without a concurrency cap.** The 15 parallel `Promise.all` calls on the index page work well at this scale. The `withConcurrencyLimit` utility is available if the batch size grows.
- **Tests cover the composable and key components.** Integration and E2E tests (e.g., with Playwright) were not added within the time allocation but would be the logical next step.

---

## Time Spent

Approximately **3.5 hours**, broken down roughly as:

- Project scaffolding and API service layer: 30 min
- Index page and data fetching: 60 min
- Detail page and components: 30 min
- SCSS styling and responsive layout: 45 min
- Filtering, sorting composable: 20 min
- Error handling, accessibility, SEO: 20 min
- Unit tests: 35 min
- Documentation: 10 min
