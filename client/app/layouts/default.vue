<script setup lang="ts">
// Composables
const route = useRoute();

// SEO
useHead({
  meta: [{ property: "og:title", content: `${route.meta.title}` }],
});
</script>

<template>
  <div>
    <NuxtErrorBoundary>
      <AppHeader v-once/>
      <template #error="{ error }">
        <ErrorBoundary component-name="AppHeader" :errorMsg="error?.message" />
      </template>
    </NuxtErrorBoundary>

    <main class="page">
      <div class="container">
        <slot />
      </div>
    </main>

    <NuxtErrorBoundary>
      <AppFooter v-once/>
      <template #error="{ error }">
        <ErrorBoundary component-name="AppFooter" :errorMsg="error?.message" />
      </template>
    </NuxtErrorBoundary>
  </div>
</template>