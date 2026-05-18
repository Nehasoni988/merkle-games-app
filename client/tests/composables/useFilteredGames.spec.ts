import { describe, it, expect } from "vitest";
import { ref, computed } from "vue";
import { useFilteredGames } from "~/composables/useFilteredGames";

const games = [
  {
    id: 1,
    title: "Game A",
    average_rating: 3,
    release_date: "2024-01-01",
    genre: { name: "Action" },
  },
  {
    id: 2,
    title: "Game B",
    average_rating: 5,
    release_date: "2023-01-01",
    genre: { name: "RPG" },
  },
];

describe("useFilteredGames", () => {
  it("sorts by rating desc by default", () => {
    const payload = ref(games);

    const filter = ref({
      searchQuery: "",
      genreQuery: "",
      sortBy: "",
      sortOrder: "desc",
    });

    const result = useFilteredGames(payload, filter);

    expect(result.value[0].title).toBe("Game B");
  });

  it("filters games by search query", () => {
    const payload = ref(games);

    const filter = ref({
      searchQuery: "game a",
      genreQuery: "",
      sortBy: "",
      sortOrder: "desc",
    });

    const result = useFilteredGames(payload, filter);

    expect(result.value).toHaveLength(1);
    expect(result.value[0].title).toBe("Game A");
  });

  it("filters games by genre", () => {
    const payload = ref(games);

    const filter = ref({
      searchQuery: "",
      genreQuery: "RPG",
      sortBy: "",
      sortOrder: "desc",
    });

    const result = useFilteredGames(payload, filter);

    expect(result.value).toHaveLength(1);
    expect(result.value[0].genre.name).toBe("RPG");
  });

  it("sorts games by release date asc", () => {
    const payload = ref(games);

    const filter = ref({
      searchQuery: "",
      genreQuery: "",
      sortBy: "Release Date",
      sortOrder: "asc",
    });

    const result = useFilteredGames(payload, filter);

    expect(result.value[0].title).toBe("Game B");
  });

  it("returns empty array when payload is empty", () => {
    const payload = ref([]);

    const filter = ref({
      searchQuery: "",
      genreQuery: "",
      sortBy: "",
      sortOrder: "desc",
    });

    const result = useFilteredGames(payload, filter);

    expect(result.value).toEqual([]);
  });
});
