<template>
  <div v-if="authStore.loading" class="w-[100vw] h-[100vh] relative ">
    <div style="transform: translate(-50%, -50%); position: absolute; top: 50%; left: 50%;">
      <Loader />
    </div>
  </div>

  <div v-show="!authStore.loading" class="bg-gray-900 text-white">
    <Header />
    <router-view class="mt-16" />
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useAuthStore } from "./store/auth.store";

import Header from "./components/Header.vue";
import Loader from "./components/UI/Loader.vue";

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
