<script setup lang="ts">
import type { GenreResponse, FilterQuery } from "~/types";
import { genresAPI } from "~/services/api/genres";

// Events
const emit = defineEmits(["update:modelValue"]);

// Data fetching
const {
  data: genres,
  pending,
  error,
} = await useAsyncData<string[]>("genres", async () => {
  const response = await genresAPI.fetchGenres();
  return response.data.map((genre) => genre.name);
});

// Error handling - Let Nuxt bubble this to error.vue automatically
if (error.value) {
  throw createError({
    statusCode: error.value.statusCode ?? 500,
    statusMessage: error.value.message ?? "Failed to load game",
    fatal: true,
  });
}

// Model
const filter = defineModel<Record<FilterQuery, string>>("filter", {
  default: () => ({
    searchQuery: "",
    genreQuery: "",
    sortBy: "Rating",
    sortOrder: "desc",
  }),
});

// Refs
const sortOptions = ref(["Rating", "Release Date"]);
</script>

<template>
  <section class="filter-bar">
    <!-- Search Filter -->
    <div class="select-group">
      <label for="search-games" class="select-label"> Search By Name </label>

      <div class="select-wrapper">
        <input
          id="search-games"
          placeholder="Type here..."
          class="custom-select"
          v-model="filter.searchQuery"
        />
      </div>
    </div>

    <!-- Genre FILTER -->
    <div class="select-group">
      <label for="genre-filter" class="select-label">Filter By Genre </label>
      <div class="select-wrapper">
        <select
          v-if="!pending && genres?.length"
          v-model="filter.genreQuery"
          id="genre-filter"
          class="custom-select"
        >
          <option value="">All Genres</option>
          <template v-for="genre in genres" :key="genre">
            <option :value="genre">
              {{ genre }}
            </option>
          </template>
        </select>
        <span class="select-icon"> ▼ </span>
      </div>
    </div>

    <!-- Sort FILTER -->
    <div class="select-group">
      <label for="sort-games" class="select-label"> Sort By </label>

      <div class="select-wrapper">
        <select id="sort-games" class="custom-select" v-model="filter.sortBy">
          <option
            v-for="sortOption in sortOptions"
            :value="sortOption"
            :key="sortOption"
          >
            {{ sortOption }}
          </option>
        </select>

        <span class="select-icon"> ▼ </span>
      </div>
    </div>

    <!-- Order Filter -->
    <div>
      <button
        class="sort-toggle"
        :aria-label="`Sort ${
          filter.sortOrder === 'desc' ? 'descending' : 'ascending'
        }`"
        @click="filter.sortOrder = filter.sortOrder === 'desc' ? 'asc' : 'desc'"
      >
        {{ filter.sortOrder === "desc" ? "↓" : "↑" }}
      </button>
    </div>
  </section>
</template>
