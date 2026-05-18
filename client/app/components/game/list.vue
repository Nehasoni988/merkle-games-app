<script setup lang="ts">
import type { GameWithReviews } from "~/types";

// Types
interface Props {
  games: GameWithReviews[];
}

// Props
const props = defineProps<Props>();
</script>

<template>
  <section class="games-grid">
    <template v-if="props.games?.length">
      <article class="game-card" v-for="game in props.games" :key="game.id">
        <Game :game="game"/>
      </article>
    </template>

    <AppStatusMessage v-else message="Record Not Found" />
  </section>
</template>