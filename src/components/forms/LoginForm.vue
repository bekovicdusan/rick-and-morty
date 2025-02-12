<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">{{ isLogin ? "Login" : "Register" }}</button>
    </form>

    <p>
      <span @click="toggleMode">
        {{ isLogin ? "Don't have an account? Register here" : "Already have an account? Login here" }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../../store/auth.store";

const email = ref("");
const password = ref("");
const isLogin = ref(true); // Toggle between login and register mode
const authStore = useAuthStore();

const handleSubmit = async () => {
  if (isLogin.value) {
    await authStore.signIn(email.value, password.value);
  } else {
    await authStore.signUp(email.value, password.value);
  }
};

const toggleMode = () => {
  isLogin.value = !isLogin.value;
};
</script>