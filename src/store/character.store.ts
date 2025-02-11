import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getCharacters, getCharacterById } from "../services/character.service";

export const useCharacterStore = defineStore("character", () => {
  const character = ref<any | null>(null);
  const characters = ref<any[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const characterCount = computed(() => characters.value.length);

  const fetchCharacters = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      characters.value = await getCharacters();
    } catch (err) {
      error.value = "Failed to fetch characters";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchCharacterById = async (id: string | number) => {
    isLoading.value = true;
    error.value = null;
    try {
      character.value = await getCharacterById(id);
    } catch (err) {
      error.value = "Failed to fetch character details";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  // onMounted(fetchCharacters); // Auto-fetch characters on mount

  return {
    character,
    characters,
    isLoading,
    characterCount,
    error,

    fetchCharacters,
    fetchCharacterById,
  };
});
