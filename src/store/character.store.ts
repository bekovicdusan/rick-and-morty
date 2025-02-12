import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getCharacters, getCharacterById } from "../services/character.service";

export const useCharacterStore = defineStore("character", () => {
  const character = ref<any | null>(null);
  const characters = ref<any[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const cachedData = ref<Record<string, any>>({});

  const fetchCharacters = async (page: number = 1) => {
    error.value = null;
    const cacheKey = `characters-page-${page}`;

    // check if data cached
    if (cachedData.value[cacheKey]) {
      characters.value.push(...cachedData.value[cacheKey]);
      return;
    }

    isLoading.value = true;

    try {
      const currentPageCharacters = await getCharacters(page);
      characters.value.push(...currentPageCharacters);

      // cache fetched data
      cachedData.value[cacheKey] = currentPageCharacters;
    } catch (err) {
      error.value = "Failed to fetch characters";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchCharacterById = async (id: string | number) => {
    error.value = null;
    const cacheKey = `character-${id}`;

    if (cachedData.value[cacheKey]) {
      character.value = cachedData.value[cacheKey];
      return;
    }

    isLoading.value = true;

    try {
      character.value = await getCharacterById(id);

      cachedData.value[cacheKey] = character.value;
    } catch (err) {
      error.value = "Failed to fetch character details";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    character,
    characters,
    isLoading,
    error,

    fetchCharacters,
    fetchCharacterById,
  };
});
