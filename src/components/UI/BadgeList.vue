<template>
  <ul class="flex flex-wrap gap-2">
    <li v-for="item in items" :key="typeof item === 'string' ? item : item.id">
      <Badge :text="calculateText(item)">
        <template #badgeContent>
          <slot :item="item" />
        </template>
      </Badge>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Character } from '../../types';

import Badge from './Badge.vue';

const props = defineProps({
  items: {
    type: Array as PropType<string[] | Character[]>,
    default: [],
    required: false
  },
  itemAccessKey: {
    type: String as PropType<keyof Character>,
    default: '',
    required: false
  }
});

const calculateText = (item: string | Character): string => {
  if (typeof item === 'string') return item;

  const value = item[props.itemAccessKey];
  return typeof value === 'string' ? value : '';
}
</script>