import type { GenreResponse } from "~/types";

export const genresAPI = {
  fetchGenres: async () => {
    const apiUrl = helper.baseApiUrl();
    return await $fetch<GenreResponse>(`${apiUrl}/genres`);
  },
};
