<template>
  <div class="bg-gray-700 w-[110px] px-4 py-2 rounded-lg">
    <slot name="badgeContent">
      <span class="inline-block text-white">
        {{ text }}
      </span>
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: "",
    required: false
  }
});
</script>