<template>
  <ul class="flex flex-wrap gap-2">
    <li v-for="episode in episodes" :key="episode">
      <Badge>
        <template #badgeContent>
          <router-link :to="{ name: 'SingleEpisode', params: { id: extractId(episode) } }"
            class="text-blue-400 hover:underline">
            Episode {{ extractEpisodeNumber(episode) }}
          </router-link>
        </template>
      </Badge>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { extractId, extractEpisodeNumber } from '../../helper';

import Badge from './Badge.vue';

defineProps({
  episodes: {
    type: Array<string>,
    default: [],
    required: false
  }
});
</script>