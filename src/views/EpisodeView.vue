<template>
  <div v-if="isLoading" class="flex items-center justify-center w-full p-6">
    <Loader />
  </div>

  <div v-else-if="episodeData" class="p-6">
    <div class="bg-gray-800 p-6 rounded-lg">
      <h1 class="text-3xl font-bold mb-2">{{ episodeData.name }}</h1>
      <p class="text-lg"><strong>Air Date:</strong> {{ episodeData.air_date }}</p>
      <p class="text-lg"><strong>Episode:</strong> {{ episodeData.episode }}</p>
    </div>

    <div class="mt-6">
      <h2 class="text-2xl font-semibold mb-2">
        Characters
        <span class="text-md">
          ({{ characters.length }})
        </span>
      </h2>
      <div class="flex flex-wrap gap-2">
        <CharacterCard v-for="character in characters" :key="character.id" :character="character" size="xs" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useEpisodeStore } from "../store/episode.store";
import Loader from "../components/UI/Loader.vue";
import CharacterCard from "../components/UI/CharacterCard.vue";

const route = useRoute();
const store = useEpisodeStore();
const { episodeData, characters, isLoading } = storeToRefs(store);

onMounted(async () => {
  store.fetchEpisodeById(route.params.id as string);
});
</script>
