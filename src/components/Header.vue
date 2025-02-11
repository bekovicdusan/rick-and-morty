<template>
  <header class="bg-gray-600 p-4 text-white">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">
        <router-link to="/" class="text-white hover:text-gray-400">
          Rick and Morty
        </router-link>
      </h1>
      <nav>
        <router-link to="/" class="mr-6 text-white hover:text-gray-400">
          Characters
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>