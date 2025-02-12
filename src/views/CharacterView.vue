<template>
  <div v-if="isLoading" class="p-6">Loading...</div>
  <div v-else-if="error" class="p-6 text-red-500">{{ error }}</div>

  <div v-else-if="character" class="p-6">
    <div class="bg-gray-800 p-6 rounded-lg flex items-center">
      <img :src="character.image" :alt="character.name" class="rounded-lg w-48 h-48" />
      <div class="ml-6">
        <h1 class="text-3xl font-bold mb-2">{{ character.name }}</h1>
        <p class="text-lg"><strong>Status:</strong> {{ character.status }}</p>
        <p class="text-lg"><strong>Species:</strong> {{ character.species }}</p>
        <p class="text-lg"><strong>Origin:</strong> {{ character.origin.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useCharacterStore } from "../store/character.store";

const route = useRoute();

const store = useCharacterStore();

const { character, isLoading, error } = storeToRefs(store);

onMounted(async () => {
  store.fetchCharacterById(route.params.id as string);
});
</script>
