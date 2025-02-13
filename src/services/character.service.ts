import apiClient from "./apiClient";
import type { Character } from "../types";

export const getCharacters = async (page: number): Promise<Character[]> => {
  try {
    const { data } = await apiClient.get("/character", {
      params: { page },
    });
    return data.results;
  } catch (error) {
    console.error("Error fetching characters: ", error);
    throw error;
  }
};

export const getCharacterById = async (
  id: string | number
): Promise<Character> => {
  try {
    const { data } = await apiClient.get(`/character/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching character ${id}:`, error);
    throw error;
  }
};

export const getCharactersByIds = async (
  characterIds: string
): Promise<Character[]> => {
  if (!characterIds.length) return [];

  try {
    const { data } = await apiClient.get(`/character/${characterIds}`);
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};
