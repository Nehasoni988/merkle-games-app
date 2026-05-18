import type { ImageAttributes } from "~/types";

export const mediaAPI = {
  fetchImage: (images: ImageAttributes[] | undefined) => {
    const apiUrl = helper.baseApiUrl();
    return (
      (images && images[0] && `${apiUrl}${images[0].image_url}`) ||
      "https://placehold.co/600x400"
    );
  },
};
