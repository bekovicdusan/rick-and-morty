<template>
  <!-- used in LocationView -->
  <div v-if="size === 'xs'" class="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 m-2 max-w-[122px]">
    <SkeletonImage :src="character.image" :alt="character.name" width="90px" height="90px"
      @click="router.push(`/characters/${character.id}`)" />
    <h4 class="mt-2 text-xs">{{ character.name }}</h4>
  </div>
  <!-- used in CharacterListView -->
  <div v-else-if="size === 'sm'" class="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 m-2 max-w-[322px]"
    @click="router.push(`/characters/${character.id}`)">
    <SkeletonImage :src="character.image" :alt="character.name" width="290px" height="290px" />
    <h2 class="text-lg font-semibold mt-2">{{ character.name }}</h2>
  </div>
  <!-- used in CharacterView -->
  <div v-else class="flex flex-col sm:flex-row bg-gray-800 p-6 rounded-lg flex items-center">
    <SkeletonImage :src="character.image" :alt="character.name" width="192px" height="192px" />
    <div class="ml-6">
      <h1 class="text-3xl font-bold mb-2">{{ character.name }}</h1>
      <p class="text-lg"><strong>Status:</strong> {{ character.status }}</p>
      <p class="text-lg"><strong>Species:</strong> {{ character.species }}</p>
      <p class="text-lg">
        <strong>Location: </strong>
        <router-link v-if="character.location?.url"
          :to="{ name: 'SingleLocation', params: { id: extractId(character.location.url) } }"
          class="text-blue-400 hover:underline">
          {{ character.location.name }}
        </router-link>
        <span v-else>
          {{ character.location.name }}
        </span>
      </p>
      <p class="text-lg"><strong>Origin:</strong> {{ character.origin.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';
import type { Character } from '../../types';
import { extractId } from '../../utils';

import SkeletonImage from './SkeletonImage.vue';

defineProps({
  character: {
    type: Object as PropType<Character>,
    required: true,
  },
  size: {
    type: String as PropType<"xs" | "sm" | "lg">,
    required: true
  }
});

const router = useRouter();
</script>
