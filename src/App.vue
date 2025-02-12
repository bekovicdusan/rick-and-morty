<template>
  <div class="bg-gray-900 text-white">
    <Header />
    <router-view class="mt-16" />
  </div>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue"
</script>
