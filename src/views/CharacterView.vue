<template>
  <div v-if="isLoading" class="flex items-center justify-center w-full p-6">
    <Loader />
  </div>

  <div v-else-if="character" class="p-6">

    <div class="bg-gray-800 p-6 rounded-lg flex items-center">
      <img :src="character.image" :alt="character.name" class="rounded-lg w-48 h-48" />
      <div class="ml-6">
        <h1 class="text-3xl font-bold mb-2">{{ character.name }}</h1>
        <p class="text-lg"><strong>Status:</strong> {{ character.status }}</p>
        <p class="text-lg"><strong>Species:</strong> {{ character.species }}</p>
        <p class="text-lg">
          <strong>Location: </strong>
          <router-link :to="{ name: 'SingleLocation', params: { id: extractId(character.location.url) } }"
            class="text-blue-400 hover:underline">
            {{ character.location.name }}
          </router-link>
        </p>
        <p class="text-lg"><strong>Origin:</strong> {{ character.origin.name }}</p>
      </div>
    </div>

    <div class="mt-6">
      <h2 class="text-2xl font-semibold mb-2">Episodes</h2>
      <BadgeList :episodes="character.episode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useCharacterStore } from "../store/character.store";
import { extractId } from "../helper";

import Loader from "../components/UI/Loader.vue";
import BadgeList from '../components/UI/BadgeList.vue';

const route = useRoute();

const store = useCharacterStore();

const { character, isLoading } = storeToRefs(store);

onMounted(async () => {
  store.fetchCharacterById(route.params.id as string);
});

</script>
