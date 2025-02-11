<template>
  <div class="p-6 flex flex-col items-center">
    <h1 class="text-2xl font-bold mb-4">
      Rick and Morty Characters ({{ characterCount }})
    </h1>

    <p v-if="isLoading">Loading...</p>

    <div v-else class="flex flex-col">
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
import { onMounted } from "vue";
import { useCharacterStore } from '../store/character.store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const characterStore = useCharacterStore();
const { characters, isLoading, characterCount } = storeToRefs(characterStore);
const router = useRouter();

onMounted(async () => {
  await characterStore.fetchCharacters();
})
</script>
