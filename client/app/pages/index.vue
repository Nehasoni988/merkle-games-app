<script setup lang="ts">
import type {
  GameWithReviews,
  FilterQuery,
  IdsData,
  GameResponse,
  StatsResponse,
} from "~/types";
import { createGamesAPI } from "~/services/api/games";

// Refs
const filter = ref<Record<FilterQuery, string>>({
  searchQuery: "",
  genreQuery: "",
  sortBy: "Rating",
  sortOrder: "desc",
});

const config = useRuntimeConfig();
const gamesAPI = createGamesAPI(config.public.apiBase);

// Data fetching
const { data, pending, error } = await useAsyncData<GameWithReviews[]>(
  "games",
  async () => {
    const idsData = await gamesAPI.fetchGames();

    // Keep only 15 random games ids
    const limitedGamesIds = idsData.ids
      .sort(() => 0.5 - Math.random())
      .slice(0, 15);

    // Fetch game details + stats with a concurrency cap of 5
    // instead of firing all 15 * 2 = 30 requests simultaneously
    return helper.withConcurrencyLimit(
      limitedGamesIds.map((id) => async () => {
        // ← (id) => async () =>
        const [game, stats] = await Promise.all([
          gamesAPI.fetchGame(id),
          gamesAPI.fetchGameStats(id),
        ]);

        return {
          ...game.data,
          average_rating: stats.data.average_rating,
        };
      }),
      5
    );
  }
);

// Error handling - Let Nuxt bubble this to error.vue automatically
if (error.value) {
  throw createError({
    statusCode: error.value.statusCode ?? 500,
    statusMessage: error.value.message ?? "Failed to load game",
    fatal: true,
  });
}

// Composables
const filteredGames = useFilteredGames(data, filter);
</script>

<template>
  <div>
    <LazyGameFilters v-model:filter="filter" hydrate-on-visible />

    <!-- 
      When the user filters games, the results update silently. 
      Screen reader users won't know the count changed so need to add a visually-hidden 
      live region that announces the result count:
     -->
    <div aria-live="polite" class="sr-only">
      {{ filteredGames.length }} games found
    </div>

    <AppStatusMessage v-if="pending" />
    <GameList v-else-if="filteredGames.length" :games="filteredGames" />
    <AppStatusMessage v-else message="Record Not Found" />
  </div>
</template>
