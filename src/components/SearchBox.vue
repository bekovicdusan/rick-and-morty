<template>
  <div class="w-[338px] flex items-center relative">
    <input name="search-characters-input" v-model="searchQuery" class="w-full px-2 py-1" type="text"
      placeholder="Search by character name" @input="emitSearch" />
    <font-awesome-icon icon="fa-solid fa-search" class="absolute right-4" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { debounce } from "lodash";

const emit = defineEmits<{
  "update:search": [query: string]
}>()

const searchQuery = ref<string>("");

const emitSearch = debounce(() => {
  emit("update:search", searchQuery.value)
}, 200);
</script>
