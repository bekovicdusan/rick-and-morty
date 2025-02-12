<template>
  <div class="min-w-[245px]">
    <form class="flex flex-col" @submit.prevent="handleSubmit">
      <div class="flex flex-col">
        <input v-model="email" class="rounded border border-gray-500 p-2" name="email" type="email" placeholder="Email"
          required />
        <input v-model="password" class="rounded border border-gray-500 mt-2 p-2" name="password" type="password"
          placeholder="Password" required />
      </div>
      <button
        class="mt-2 p-2 rounded-lg border border-transparent text-text-gray-200 hover:transition hover:duration-300 hover:white hover:bg-gray-700 cursor-pointer"
        type="submit">
        {{ isLogin ? "Login" : "Register" }}
      </button>
    </form>

    <p class="mt-3 text-sm flex">
      <span class="inline-block">
        {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
      </span>
      <span class="cursor-pointer inline-block hover:transition hover:duration-150 hover:text-gray-300 ml-1"
        @click="toggleMode">
        {{ isLogin ? "Register here" : "Login here" }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../../store/auth.store";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const isLogin = ref(true); // Toggle between login and register mode
const authStore = useAuthStore();

const handleSubmit = async () => {
  if (isLogin.value) {
    await authStore.signIn(email.value, password.value);
    router.push("/characters");
  } else {
    await authStore.signUp(email.value, password.value);
    router.push("/characters");
  }
};

const toggleMode = () => {
  isLogin.value = !isLogin.value;
};
</script>