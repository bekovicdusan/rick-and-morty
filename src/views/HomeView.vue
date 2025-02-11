<template>
  <div class="p-6 flex flex-col items-center">
    <h1 class="text-2xl font-bold mb-4">
      Rick and Morty Characters ({{ characterCount }})
    </h1>

    <p v-if="!characters.length">Loading...</p>

    <div v-else class="flex flex-col" ref="characterList">
      <div v-for="character in characters" :key="character.id"
        class="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 m-2"
        @click="router.push(`/character/${character.id}`)">
        <img :src="character.image" :alt="character.name" class="rounded-lg" />
        <h2 class="text-lg font-semibold mt-2">{{ character.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useCharacterStore } from '../store/character.store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();

const characterStore = useCharacterStore();
const { characters, characterCount } = storeToRefs(characterStore);

const characterList = ref<HTMLElement | null>(null);
const page = ref<number>(1);

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
  await characterStore.fetchCharacters(page.value);
};
</script>
