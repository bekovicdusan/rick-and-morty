<template>
  <div class="p-6 flex flex-col items-center">
    <h1 class="text-2xl font-bold mb-4">
      Rick and Morty Characters ({{ filteredCharacters.length }})
    </h1>

    <div class="flex flex-col" ref="characterList">
      <SearchBox class="p-2" v-model:search="searchQuery" />

      <CharacterCard v-for="character in filteredCharacters" :key="character.id" :character="character" size="sm" />

      <p v-if="hasReachedTheEnd" class="flex items-center justify-center w-full mt-2 text-lg font-medium">
        That's all folks!
      </p>
    </div>

    <Loader v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import { storeToRefs } from 'pinia';
import { useCharacterStore } from '../store/character.store';
import type { Character } from "../types/character.type";

import SearchBox from "../components/SearchBox.vue";
import Loader from "../components/UI/Loader.vue";
import CharacterCard from "../components/UI/CharacterCard.vue";

const characterStore = useCharacterStore();
const { characters, isLoading } = storeToRefs(characterStore);

const characterList = ref<HTMLElement | null>(null);
const page = ref<number>(1);
const searchQuery = ref<string>("");
const hasReachedTheEnd = ref<boolean>(false);

const filteredCharacters = computed((): Character[] => {
  return characters.value.filter((character) => {
    return character.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  await characterStore.fetchCharacters(page.value);
});

onUnmounted(() => {
  characters.value = [];
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = async (): Promise<void> => {
  const element = characterList.value;
  if (element && element.getBoundingClientRect().bottom < window.innerHeight) {
    await loadMoreCharacters();
  }
}

const loadMoreCharacters = async (): Promise<void> => {
  page.value += 1;
  // there are 42 pages in total
  if (page.value < 43) {
    await characterStore.fetchCharacters(page.value);
  } else {
    hasReachedTheEnd.value = true;
  }
};
</script>
