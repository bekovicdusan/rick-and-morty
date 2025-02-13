<template>
  <div class="min-w-[245px]">
    <form class="flex flex-col" @submit.prevent="handleSubmit">
      <div class="flex flex-col">
        <input v-model="email" class="rounded border border-gray-500 p-2" name="email" type="email" placeholder="Email"
          required />
        <input v-model="password" class="rounded border border-gray-500 mt-2 p-2" name="password" type="password"
          placeholder="Password" required />
        <input v-if="!isLoginMode" v-model="confirmPassword" class="rounded border border-gray-500 mt-2 p-2"
          name="confirm-password" type="password" placeholder="Confirm password" required />
      </div>
      <button
        class="mt-2 p-2 rounded-lg border border-transparent text-text-gray-200 hover:transition hover:duration-300 hover:white hover:bg-gray-700 cursor-pointer"
        type="submit">
        {{ isLoginMode ? "Login" : "Register" }}
      </button>
    </form>

    <p v-if="errorMessage" class="text-red-500 text-sm mb-2">{{ errorMessage }}</p>

    <p class="mt-3 text-sm flex">
      <span class="inline-block">
        {{ isLoginMode ? "Don't have an account?" : "Already have an account?" }}
      </span>
      <span class="cursor-pointer inline-block hover:transition hover:duration-150 hover:text-gray-300 ml-1"
        @click="toggleMode">
        {{ isLoginMode ? "Register here" : "Login here" }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../store/auth.store";

const router = useRouter();

const authStore = useAuthStore();

const email = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");
const errorMessage = ref<string>("");
const isLoginMode = ref<boolean>(true);

const handleSubmit = async (): Promise<void> => {
  errorMessage.value = "";

  if (isLoginMode.value) {
    try {
      await authStore.signIn(email.value, password.value);
      router.push("/characters");
    } catch (error) {
      errorMessage.value = "Login failed. Please try again.";
      console.error(error);
    }
  } else {
    if (password.value !== confirmPassword.value) {
      errorMessage.value = "Passwords do not match!";
      return;
    }

    try {
      await authStore.signUp(email.value, password.value);
      router.push("/characters");
    } catch (error) {
      errorMessage.value = "Registration failed. Please try again.";
      console.error(error);
    }
  }
};

const toggleMode = (): void => {
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  isLoginMode.value = !isLoginMode.value;
  errorMessage.value = "";
};
</script>