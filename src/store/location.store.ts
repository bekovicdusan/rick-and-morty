import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getLocationById,
  getCharactersByIds,
} from "../services/location.service";
import type { Location, Character } from "../types";

export const useLocationStore = defineStore("location", () => {
  const locationData = ref<Location | null>(null);
  const residents = ref<Character[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const cachedLocations = ref<Record<string, Location>>({});
  const cachedCharacters = ref<Record<string, Character[]>>({});

  const fetchLocationById = async (id: string) => {
    error.value = null;
    const locationCacheKey = `location-${id}`;
    let residentsCacheKey: string;

    if (cachedLocations.value[locationCacheKey]) {
      locationData.value = cachedLocations.value[locationCacheKey];
      return;
    }

    isLoading.value = true;

    try {
      const location = await getLocationById(id);
      locationData.value = location;
      cachedLocations.value[locationCacheKey] = location;

      if (location.residents.length > 0) {
        const characterIds = location.residents
          .map((url) => url.split("/").pop())
          .join(",")
          .split(","); // :)
        residentsCacheKey = `location-residents-${characterIds}`;

        if (cachedCharacters.value[residentsCacheKey]) {
          residents.value = cachedCharacters.value[residentsCacheKey];
          return;
        }

        const characters = await getCharactersByIds(characterIds);
        residents.value = characters;
        cachedCharacters.value[residentsCacheKey] = characters;
      }
    } catch (err) {
      error.value = "Failed to fetch location details";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    locationData,
    residents,
    isLoading,
    error,

    fetchLocationById,
  };
});
