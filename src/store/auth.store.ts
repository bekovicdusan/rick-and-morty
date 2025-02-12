import { defineStore } from "pinia";
import { ref } from "vue";
import { login, logout, register } from "../services/auth.service";
import type { User } from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const signIn = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;
    const loggedInUser = await login(email, password);
    user.value = loggedInUser;
    loading.value = false;
  };

  const signUp = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;
    const registeredUser = await register(email, password);
    user.value = registeredUser;
    loading.value = false;
  };

  const signOut = async () => {
    await logout();
    user.value = null;
  };

  return {
    user,
    loading,
    error,

    signIn,
    signUp,
    signOut,
  };
});
