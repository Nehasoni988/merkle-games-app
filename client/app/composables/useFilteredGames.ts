import type { Ref } from "vue";
import type { GameWithReviews, FilterQuery } from "~/types";
import { computed } from "vue";

export const useFilteredGames = (
  payload: Ref<GameWithReviews[] | null | undefined>,
  filter: Ref<Record<FilterQuery, string>>,
) => {
  return computed(() => {
    if (!payload.value?.length) return [];

    let games = [...payload.value];
    games.sort((a, b) => b.average_rating - a.average_rating);

    const { searchQuery, genreQuery, sortBy, sortOrder } = filter.value;

    if (searchQuery) {
      games = games.filter((item) =>
        item.title.toLowerCase().includes(searchQuery),
      );
    }

    if (genreQuery) {
      games = games.filter((item) => item.genre?.name === genreQuery);
    }

    if (sortBy.includes("Rating")) {
      games.sort((a, b) =>
        sortOrder === "desc"
          ? b.average_rating - a.average_rating
          : a.average_rating - b.average_rating,
      );
    }

    if (sortBy.includes("Release")) {
      games.sort((a, b) =>
        sortOrder === "desc"
          ? b.release_date.toString().localeCompare(a.release_date.toString())
          : a.release_date.toString().localeCompare(b.release_date.toString()),
      );
    }

    return games;
  });
};
