export const helper = {
  formatDate: (dateStr: Date) => {
    const date = new Date(dateStr);

    const day = date.getDate();

    const formattedDate = date.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });

    return `${day} ${formattedDate}`;
  },

  formatRating: (rating: number) => parseFloat(rating.toFixed(1)),

  baseApiUrl: () => {
    const config = useRuntimeConfig();
    return config.public.apiBase;
  },

  withConcurrencyLimit: async <T>(
    tasks: (() => Promise<T>)[],
    limit: number,
  ): Promise<T[]> => {
    const results: T[] = [];
    const queue = [...tasks];

    const workers = Array.from({ length: limit }, async () => {
      while (queue.length) {
        const task = queue.shift()!;
        results.push(await task());
      }
    });

    await Promise.all(workers);
    return results;
  },
};
