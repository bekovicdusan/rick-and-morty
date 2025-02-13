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
