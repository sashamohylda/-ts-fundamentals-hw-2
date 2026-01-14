import axios from "axios";
import type { PixabayResponse } from "./types/pixabay";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY as string;

export async function getImagesByQuery(
  query: string,
  page: number
): Promise<PixabayResponse> {
  const response = await axios.get<PixabayResponse>(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      per_page: 40,
      page,
    },
  });

  return response.data;
}
