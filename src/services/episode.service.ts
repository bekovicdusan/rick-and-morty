import apiClient from "./apiClient";
import type { Episode } from "../types/episode.type.ts";

export const getEpisodeById = async (id: number | string): Promise<Episode> => {
  try {
    const { data } = await apiClient.get(`/episode/${id}`);
    return data;
  } catch (error) {
    console.error("Failed to fetch episode:", error);
    throw error;
  }
};
