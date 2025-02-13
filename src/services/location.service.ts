import apiClient from "./apiClient";
import type { Character, Location } from "../types";

export const getLocationById = async (
  id: string | number
): Promise<Location> => {
  try {
    const { data } = await apiClient.get(`/location/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching location:", error);
    throw error;
  }
};

export const getCharactersByIds = async (
  characterIds: string[]
): Promise<Character[]> => {
  if (!characterIds.length) return [];

  try {
    const { data } = await apiClient.get(
      `/character/${characterIds.join(",")}`
    );
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};
