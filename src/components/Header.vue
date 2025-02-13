<template>
  <header v-if="authStore.authToken"
    class="bg-gray-600 py-1 px-4 text-white fixed top-0 min-h-[69px] w-full z-50 border-b-3 border-gray-600">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">
        <router-link to="/" class="text-white flex">
          <img decoding="async" class="mr-2 max-w-[90px]"
            src="https://shindiristudio.com/wp-content/uploads/2022/02/Development-Ninja.svg"
            alt="https://shindiristudio.com/wp-content/uploads/2022/02/Development-Ninja.svg">
        </router-link>
      </h1>
      <nav class="mx-2">
        <router-link to="/characters" class="text-white hover:text-gray-400">
          Characters |
        </router-link>
        <span @click="handleLogout" class="inline-block text-white hover:text-gray-400 cursor-pointer">
          Logout
        </span>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth.store';

const router = useRouter();

const authStore = useAuthStore();

const handleLogout = async (): Promise<void> => {
  await authStore.signOut();
  router.push("/login");
}
</script>

<style scoped>
header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>