<template>
  <div v-if="isLoading" class="flex items-center justify-center w-full p-6">
    <Loader />
  </div>

  <div v-else-if="locationData" class="p-6">
    <h1 class="text-[28px] font-semibold mb-3">Location Details</h1>

    <div class="bg-gray-800 p-6 rounded-lg">
      <h1 class="text-3xl font-bold mb-2">{{ locationData.name }}</h1>
      <p class="text-lg"><strong>Type:</strong> {{ locationData.type }}</p>
      <p class="text-lg"><strong>Dimension:</strong> {{ locationData.dimension }}</p>
    </div>

    <div class="mt-6">
      <h2 class="flex items-center text-2xl font-semibold mb-2">
        Residents
        <Facet>
          {{ residents.length }}
        </Facet>
      </h2>
      <div class="flex flex-wrap gap-2">
        <CharacterCard v-for="character in residents" :key="character.id" :character="character" size="xs" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useLocationStore } from "../store/location.store";

import Loader from "../components/UI/Loader.vue";
import Facet from "../components/UI/Facet.vue";
import CharacterCard from "../components/UI/CharacterCard.vue";

const route = useRoute();
const locationStore = useLocationStore();
const { locationData, residents, isLoading } = storeToRefs(locationStore);

onMounted(async () => {
  locationStore.fetchLocationById(route.params.id as string);
});
</script>
