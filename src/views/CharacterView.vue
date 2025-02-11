<template>
  <div v-if="character" class="p-6">
    <button @click="$router.back()" class="mb-4 text-blue-500">← Back</button>
    <div class="bg-gray-800 p-6 rounded-lg flex items-center">
      <img :src="character.image" :alt="character.name" class="rounded-lg w-48 h-48" />
      <div class="ml-6">
        <h1 class="text-3xl font-bold">{{ character.name }}</h1>
        <p class="text-lg"><strong>Status:</strong> {{ character.status }}</p>
        <p class="text-lg"><strong>Species:</strong> {{ character.species }}</p>
        <p class="text-lg"><strong>Origin:</strong> {{ character.origin.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCharacterStore } from "../store/character.store"

const route = useRoute();
const character = ref<any>(null);
const store = useCharacterStore();

onMounted(async () => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${route.params.id}`);
  character.value = await res.json();
});
</script>

<style scoped></style>