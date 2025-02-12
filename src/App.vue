<template>
  <div class="bg-gray-900 text-white">
    <Header />
    <router-view class="mt-16" />
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useAuthStore } from "./store/auth.store";

import Header from "./components/Header.vue";

const authStore = useAuthStore();

// Auto logout
watch(
  () => authStore.isTokenValid,
  () => {
    if (!authStore.isTokenValid) {
      authStore.signOut();
    }
  }
);
</script>
