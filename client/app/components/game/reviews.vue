<script lang="ts" setup>
import { toRef } from "vue";
import { type UserReviewAttributes } from "~/types";

// Types
interface Props {
  reviews: UserReviewAttributes[];
}

// Props
const props = defineProps<Props>();

// Refs
const reviews = toRef<UserReviewAttributes[]>(props.reviews);

// Methods
const getAvatarAlphabet = (username: string) =>
  username.charAt(0).toUpperCase();
</script>

<template>
  <article>
    <div v-for="review in reviews" :key="review.id" class="review-card">
      <div class="review-top">
        <div v-if="review.user" class="review-user">
          <div class="logo-badge">
            {{ getAvatarAlphabet(review.user.username) }}
          </div>

          <div>
            <h3>{{ review.user.username }}</h3>
          </div>
        </div>

        <div class="review-rating">★ {{ review.rating }}</div>
      </div>

      <p class="review-text">
        {{ review.review_text }}
      </p>
    </div>
  </article>
</template>
