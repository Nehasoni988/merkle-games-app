# Merkle Games — Client

🚀 **Live Demo:** https://multi-tenant-platform-by-neha-soni.vercel.app/

A responsive Nuxt 4 / TypeScript application for exploring games via the Merkle Games REST API. Users can browse 15 randomly selected games released between 2015 and 2017, sort and filter them, and view full game details with player reviews.

---



## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 20 or later |
| npm | 10 or later |

> The Merkle Games API server must be running locally before starting the client. Please refer the API code inside the `/server` folder and this `README.md` for API setup instructions. By default the API is expected at `http://localhost:8000`.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Nehasoni988/merkle-games-app
```

### 2. Start the API server

Follow the instructions in `/server` to spin up the Games API container. Confirm it is running by visiting:

```
http://localhost:8000/api-docs
```

### 3. Install dependencies

```bash
cd client
npm install
```

### 4. Configure environment variables

A `.env` file is included with sensible defaults:

```env
NUXT_PUBLIC_API_BASE=http://localhost:8000/api/v1
NUXT_PUBLIC_THEME=light
```

If API runs on a different port, update `NUXT_PUBLIC_API_BASE` accordingly.

### 5. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run generate` | Generate a static site |
| `npm test` | Run unit tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:ui` | Open Vitest UI |
| `npm run test:coverage` | Generate test coverage report |

---

## Project Structure

```
client/
├── app/
│   ├── app.vue                   # Root component (SEO meta, layout)
│   ├── error.vue                 # Global error page
│   ├── assets/
│   │   └── css/
│   │       └── main.scss         # Global styles and SCSS variables
│   ├── components/
│   │   ├── appHeader.vue
│   │   ├── appFooter.vue
│   │   ├── appSkeletonLoader.vue
│   │   ├── appNoRecordFound.vue
│   │   ├── appTheme.vue          # Light / dark theme toggle
│   │   ├── errorBoundary.vue     # In-component error fallback UI
│   │   └── game/
│   │       ├── index.vue         # Game card
│   │       ├── list.vue          # Game grid
│   │       ├── filters.vue       # Search, genre, sort controls
│   │       ├── detail.vue        # Full game detail view
│   │       └── reviews.vue       # Player reviews list
│   ├── composables/
│   │   └── useFilteredGames.ts   # Filtering and sorting logic
│   ├── layouts/
│   │   └── default.vue           # Default page layout
│   ├── pages/
│   │   ├── index.vue             # Index page (game listing)
│   │   └── games/
│   │       └── [id].vue          # Game detail page
│   ├── plugins/
│   │   └── error-handler.ts      # Global Vue error handler
│   ├── services/
│   │   └── api/
│   │       ├── games.ts          # Games API calls
│   │       ├── genres.ts         # Genres API calls
│   │       └── media.ts          # Image URL resolution with fallback
│   ├── types/
│   │   └── index.ts              # Shared TypeScript interfaces
│   └── utils/
│       └── index.ts              # Shared helpers (formatDate, formatRating, …)
├── tests/
│   ├── composables/
│   │   └── useFilteredGames.spec.ts
│   └── components/
│       ├── game.spec.ts
│       └── appSkeletonLoader.spec.ts
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── nuxt.config.ts
├── vitest.config.ts
├── tsconfig.json
└── .env
```

---

## API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `GET /games/by-date-range?from=2015-01-01&to=2017-12-31` | Retrieve IDs of games released 2015–2017 |
| `GET /games/:id` | Fetch full game details (genre, developer, reviews, images) |
| `GET /games/:id/stats` | Fetch average rating for a game |
| `GET /genres` | Fetch all genres for the filter dropdown |

Full API documentation is available via Swagger UI at `http://localhost:8000/api-docs`.

---

## Running Tests

```bash
# Run all tests once
npm test

# Watch mode (re-runs on file change)
npm run test:watch

# Generate a coverage report
npm run test:coverage
```

Tests are located in the `tests/` directory and cover:

- `useFilteredGames` composable (filtering by search, genre, sort field, and sort order)
- `GameCard` component (rendering title, genre, rating, and navigation link)
- `AppSkeletonLoader` component (presence in DOM)
