<script setup lang="ts">
import type { GameWithReviews } from "~/types";
import { mediaAPI } from "~/services/api/media";
import { toRef } from "vue";

// Types
interface Props {
  game: GameWithReviews;
}

// Props
const props = defineProps<Props>();

// Ref
const game = toRef<GameWithReviews>(props.game);

// Methods
const imgUrl = mediaAPI.fetchImage(game.value.images);
</script>

<template>
  <div>
    <section class="game-hero">
      <div class="game-poster">
        <NuxtImg
          :src="imgUrl"
          :alt="`Image for ${game.title}`"
          format="webp"
          loading="eager"
          fetchpriority="high"
          class="game-image"
        />

        <div class="poster-overlay"></div>
      </div>

      <div class="game-info">
        <div v-if="game.genre" class="game-badge">{{ game.genre.name }}</div>

        <h1 class="game-detail-title">{{ game.title }}</h1>

        <p class="game-description">
          {{ game.description }}
        </p>

        <div class="game-meta-grid">
          <div class="meta-card">
            <span class="meta-label">Rating</span>
            <strong>{{ helper.formatRating(game.average_rating) }}</strong>
          </div>

          <div class="meta-card">
            <span class="meta-label">Release Date</span>
            <strong>{{ helper.formatDate(game.release_date) }}</strong>
          </div>

          <div class="meta-card">
            <span class="meta-label">Developer</span>
            <strong>{{ game.developer?.name || "Unknown" }}</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="reviews-section">
      <div class="section-header">
        <h2>Player Reviews</h2>

        <span v-if="game.reviews?.length">
          {{ game.reviews.length }} Reviews
        </span>
        <AppStatusMessage v-else message="Record Not Found"></AppStatusMessage>
      </div>

      <NuxtErrorBoundary>
        <LazyGameReviews
          v-if="game.reviews?.length"
          :reviews="game.reviews"
          hydrate-on-visible
        />
        <template #error="{ error }">
          <ErrorBoundary
            component-name="GameReviews"
            :errorMsg="error?.message"
          />
        </template>
      </NuxtErrorBoundary>
    </section>
  </div>
</template>