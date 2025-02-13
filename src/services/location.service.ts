import apiClient from "./apiClient";
import type { Location } from "../types";

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
