<template>
  <div class="p-6 flex flex-col items-center">
    <h1 class="text-2xl font-bold mb-4">
      Rick and Morty Characters ({{ filteredCharacters.length }})
    </h1>

    <p v-if="!characters.length && !hasReachedTheEnd">Loading...</p>

    <div v-else class="flex flex-col" ref="characterList">
      <SearchBox class="p-2" v-model:search="searchQuery" />
      <div v-for="character in filteredCharacters" :key="character.id"
        class="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 m-2 max-w-[322px]"
        @click="router.push(`/characters/${character.id}`)">
        <img :src="character.image" :alt="character.name" class="rounded-lg" />
        <h2 class="text-lg font-semibold mt-2">{{ character.name }}</h2>
      </div>
      <p v-if="hasReachedTheEnd" class="flex items-center justify-center w-full mt-2 text-lg font-medium">That's all
        folks!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import { useCharacterStore } from '../store/character.store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import SearchBox from "../components/SearchBox.vue";

const router = useRouter();

const characterStore = useCharacterStore();
const { characters } = storeToRefs(characterStore);

const characterList = ref<HTMLElement | null>(null);
const page = ref<number>(1);
const searchQuery = ref<string>("");
const hasReachedTheEnd = ref<boolean>(false);

const filteredCharacters = computed(() => {
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

const handleScroll = async () => {
  const element = characterList.value;
  if (element && element.getBoundingClientRect().bottom < window.innerHeight) {
    await loadMoreCharacters();
  }
}

const loadMoreCharacters = async () => {
  page.value += 1;
  // there are 42 pages in total
  if (page.value < 43) {
    await characterStore.fetchCharacters(page.value);
  } else {
    hasReachedTheEnd.value = true;
  }
};
</script>
