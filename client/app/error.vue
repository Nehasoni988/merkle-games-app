<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <main class="error-page">
    <div class="error-card">
      <p class="error-code">
        {{ error?.statusCode || "Error" }}
      </p>

      <h1 class="error-title">
        {{
          error?.statusCode === 404
            ? "Page not found"
            : "Something went wrong"
        }}
      </h1>

      <p class="error-message">
        {{
          error?.statusMessage ||
          "An unexpected error occurred while loading this page."
        }}
      </p>

      <button class="back-button" @click="handleError">
        Back to Home
      </button>
    </div>
  </main>
</template>