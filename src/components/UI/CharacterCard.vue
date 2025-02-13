<template>
  <div v-if="size === 'xs'" class="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 m-2 max-w-[80px]">
    <img :src="character.image" :alt="character.name" class="rounded-lg" />
    <h2 class="font-semibold mt-2">{{ character.name }}</h2>
  </div>

  <div v-else-if="size === 'sm'" class="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 m-2 max-w-[322px]"
    @click="router.push(`/characters/${character.id}`)">
    <img :src="character.image" :alt="character.name" class="rounded-lg" />
    <h2 class="text-lg font-semibold mt-2">{{ character.name }}</h2>
  </div>

  <div v-else class="bg-gray-800 p-6 rounded-lg flex items-center">
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
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';
import type { Character } from '../../types/character.type';
import { extractId } from '../../helper';

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
