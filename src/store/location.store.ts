import { defineStore } from "pinia";
import { ref } from "vue";
import { getCharactersByIds } from "../services/character.service";
import { getLocationById } from "../services/location.service";
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
      locationData.value = await getLocationById(id);
      cachedLocations.value[locationCacheKey] = locationData.value;

      if (locationData.value.residents.length) {
        const characterIds = locationData.value.residents
          .map((url) => url.split("/").pop())
          .join(",");
        residentsCacheKey = `location-residents-${characterIds}`;

        if (cachedCharacters.value[residentsCacheKey]) {
          residents.value = cachedCharacters.value[residentsCacheKey];
          return;
        }

        residents.value = await getCharactersByIds(characterIds);
        cachedCharacters.value[residentsCacheKey] = residents.value;
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
