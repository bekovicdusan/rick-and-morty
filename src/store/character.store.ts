import { ref } from "vue";
import { defineStore } from "pinia";
import type { Character } from "../types/character.type";
import { getCharacters, getCharacterById } from "../services/character.service";

export const useCharacterStore = defineStore("character", () => {
  const character = ref<Character | null>(null);
  const characters = ref<Character[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const cachedCharacterLists = ref<Record<string, Character[]>>({});
  const cachedCharacters = ref<Record<string, Character>>({});

  const fetchCharacters = async (page: number = 1) => {
    error.value = null;
    const cacheKey = `characters-page-${page}`;

    // check if data cached
    if (cachedCharacterLists.value[cacheKey]) {
      characters.value.push(...cachedCharacterLists.value[cacheKey]);
      return;
    }

    isLoading.value = true;

    try {
      const currentPageCharacters = await getCharacters(page);
      characters.value.push(...currentPageCharacters);

      // cache fetched data
      cachedCharacterLists.value[cacheKey] = currentPageCharacters;
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

    if (cachedCharacters.value[cacheKey]) {
      character.value = cachedCharacters.value[cacheKey];
      return;
    }

    isLoading.value = true;

    try {
      character.value = await getCharacterById(id);

      if (!character.value) {
        throw new Error("Character not found");
      }

      cachedCharacters.value[cacheKey] = character.value;
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
