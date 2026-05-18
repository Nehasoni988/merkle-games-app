// services/api/games.ts

import type { GameResponse, IdsData, StatsResponse } from "~/types";

export const createGamesAPI = (apiUrl: string) => ({
  fetchGames() {
    return $fetch<IdsData>(
      `${apiUrl}/games/by-date-range?from=2015-01-01&to=2017-12-31`
    );
  },

  fetchGame(id: number | string) {
    return $fetch<GameResponse>(
      `${apiUrl}/games/${id}`
    );
  },

  fetchGameStats(id: number | string) {
    return $fetch<StatsResponse>(
      `${apiUrl}/games/${id}/stats`
    );
  },
});