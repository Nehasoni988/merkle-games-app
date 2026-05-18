<script setup lang="ts">
import type { GameWithReviews, GameResponse, StatsResponse } from "~/types";
import { createGamesAPI } from "~/services/api/games";

// Composables
const route = useRoute();
const id = route.params.id as string;
const config = useRuntimeConfig();
const gamesAPI = createGamesAPI(config.public.apiBase);

// Data fetching
const { data, pending, error } = await useAsyncData<GameWithReviews>(
  `games-${id}`,
  async () => {
    const [game, stats] = await Promise.all([
      gamesAPI.fetchGame(id),
      gamesAPI.fetchGameStats(id),
    ]);

    // Merge response
    return {
      ...game.data,
      average_rating: stats.data.average_rating,
    };
  }
);
</script>


<template>
  <div>
    <section class="game-details-page">
      <NuxtLink to="/" class="back-button"> ← Back to Games </NuxtLink>

      <AppStatusMessage v-if="pending" />
      <GameDetail v-else-if="data" :game="data" />
      <AppStatusMessage v-else message="Record Not Found"/>
    </section>
  </div>
</template>