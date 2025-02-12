<template>
  <header class="bg-gray-600 py-1 px-4 text-white fixed top-0 min-h-[69px] w-full z-50 border-b-3 border-gray-900">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">
        <router-link to="/" class="text-white flex">
          <img decoding="async" class="mr-2 max-w-[90px]"
            src="https://shindiristudio.com/wp-content/uploads/2022/02/Development-Ninja.svg"
            alt="https://shindiristudio.com/wp-content/uploads/2022/02/Development-Ninja.svg">
        </router-link>
      </h1>
      <nav>
        <router-link to="/characters" class="mr-6 text-white hover:text-gray-400">
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