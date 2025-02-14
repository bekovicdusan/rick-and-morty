<template>
  <div v-if="isLoading" class="flex items-center justify-center w-full p-6">
    <Loader />
  </div>

  <div v-else-if="character" class="p-6">

    <h1 class="text-[28px] font-semibold mb-3">Character Details</h1>

    <CharacterCard :character="character" size="lg" />

    <div class="mt-6">
      <h2 class="flex items-center text-2xl font-semibold mb-2">
        Episodes
        <Facet>
          {{ character.episode.length }}
        </Facet>
      </h2>
      <BadgeList :items="character.episode" v-slot="data">
        <router-link :to="{ name: 'SingleEpisode', params: { id: extractId(data.item as string) } }"
          class="text-blue-400 hover:underline">
          Episode {{ extractEpisodeNumber(data.item as string) }}
        </router-link>
      </BadgeList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { extractId, extractEpisodeNumber } from "../utils";
import { useCharacterStore } from "../store/character.store";

import Loader from "../components/UI/Loader.vue";
import BadgeList from '../components/UI/BadgeList.vue';
import CharacterCard from "../components/UI/CharacterCard.vue";
import Facet from "../components/UI/Facet.vue";

const route = useRoute();

const store = useCharacterStore();

const { character, isLoading } = storeToRefs(store);

onMounted(async () => {
  store.fetchCharacterById(route.params.id as string);
});
</script>
