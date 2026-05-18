<script setup lang="ts">
import type { GameWithReviews } from "~/types";
import { mediaAPI } from "~/services/api/media";
import { ref, toRef } from "vue";

// Types
interface Props {
  game: GameWithReviews;
}

// Props
const props = defineProps<Props>();

// Refs
const game = toRef<GameWithReviews>(props.game);

// Methods
const imgUrl = mediaAPI.fetchImage(game.value.images);
</script>

<template>
  <NuxtLink
    :to="`/games/${game.id}`"
    :aria-label="`View details for ${game.title}`"
  >
    <div class="game-image-wrapper">
      <NuxtImg
        :src="imgUrl"
        :alt="`Image for ${game.title}`"
        format="webp"
        loading="eager"
        fetchpriority="high"
        class="game-image"
      />

      <span class="game-genre"> {{ game.genre?.name }} </span>
    </div>

    <div class="game-content">
      <div class="game-top">
        <h2 class="game-title">{{ game.title }}</h2>

        <div class="game-rating">
          ★ {{ helper.formatRating(game.average_rating) }}
        </div>
      </div>

      <div class="game-meta">
        Released on {{ helper.formatDate(game.release_date) }}
      </div>
    </div>
  </NuxtLink>
</template>