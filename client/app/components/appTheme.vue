<script setup lang="ts">
// Composables
const config = useRuntimeConfig();

// Refs
const theme = ref(config.public.theme || "light");

// Methods
const toggleTheme = () => {
  document.body.classList.toggle("dark-theme");
  theme.value = theme.value === "light" ? "dark" : "light";
};

// Computed
const isDark = computed(() => theme.value === "dark");
</script>


<template>
  <button class="icon-btn" aria-label="Theme Toggle" @click="toggleTheme()">
    {{ isDark ? "☾" : "☼" }}
  </button>
</template>