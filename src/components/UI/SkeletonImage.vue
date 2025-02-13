<template>
  <div class="relative inline-block">
    <img v-show="isLoaded" :src="src" :alt="alt" :width="width" :height="height" class="object-cover rounded-lg"
      :onload="onLoad" />
    <div v-if="!isLoaded" :style="{ width: width, height: height }"
      class="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: false,
    default: "",
  },
  width: {
    type: String,
    required: false,
    default: "100%",
  },
  height: {
    type: String,
    required: false,
    default: "200px",
  },
});

const isLoaded = ref(false);

const onLoad = () => {
  isLoaded.value = true;
};
</script>
