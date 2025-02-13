import { defineStore } from "pinia";
import { ref } from "vue";
import { getCharactersByIds } from "../services/character.service";
import { getEpisodeById } from "../services/episode.service";
import type { Episode, Character } from "../types";

export const useEpisodeStore = defineStore("episode", () => {
  const episodeData = ref<Episode | null>(null);
  const characters = ref<Character[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const cachedEpisodes = ref<Record<string, Episode>>({});
  const cachedCharacters = ref<Record<string, Character[]>>({});

  const fetchEpisodeById = async (id: string | number) => {
    error.value = null;
    const episodeCacheKey = `episode-${id}`;
    let charactersCacheKey: string;

    if (cachedEpisodes.value[episodeCacheKey]) {
      episodeData.value = cachedEpisodes.value[episodeCacheKey];
      return;
    }

    isLoading.value = true;

    try {
      episodeData.value = await getEpisodeById(id);
      cachedEpisodes.value[episodeCacheKey] = episodeData.value;

      if (episodeData.value.characters.length) {
        const characterIds = episodeData.value.characters
          .map((url) => url.split("/").pop())
          .join(",");
        charactersCacheKey = `episode-characters-${characterIds}`;

        if (cachedCharacters.value[charactersCacheKey]) {
          characters.value = cachedCharacters.value[charactersCacheKey];
          return;
        }

        characters.value = await getCharactersByIds(characterIds);
        cachedCharacters.value[charactersCacheKey] = characters.value;
      }
    } catch (err) {
      error.value = "Failed to fetch episode details";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    episodeData,
    characters,
    isLoading,
    error,

    fetchEpisodeById,
  };
});
