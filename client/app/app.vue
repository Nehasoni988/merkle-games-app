<script setup lang="ts">
useSeoMeta({
  title: 'Merkle Games',
  ogTitle: 'Merkle Games',
  description: 'This is an assignment by Merkle Games.',
  ogDescription: 'This is an assignment by Merkle Games.',
  ogImage: '/public/favicon.ico',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <!-- https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer#usage -->
    <NuxtRouteAnnouncer />
    <!-- https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator -->
    <NuxtLoadingIndicator />
    <!-- https://nuxt.com/docs/4.x/api/components/nuxt-layout -->
    <NuxtLayout>
      <!-- https://nuxt.com/docs/4.x/api/components/nuxt-page -->
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
