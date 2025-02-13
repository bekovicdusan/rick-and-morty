<template>
  <div v-if="isLoading" class="flex items-center justify-center w-full p-6">
    <Loader />
  </div>

  <div v-else-if="character" class="p-6">

    <CharacterCard :character="character" size="lg" />

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

import Loader from "../components/UI/Loader.vue";
import BadgeList from '../components/UI/BadgeList.vue';
import CharacterCard from "../components/UI/CharacterCard.vue";

const route = useRoute();

const store = useCharacterStore();

const { character, isLoading } = storeToRefs(store);

onMounted(async () => {
  store.fetchCharacterById(route.params.id as string);
});
</script>
