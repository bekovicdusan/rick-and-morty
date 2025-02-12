import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { login, logout, register } from "../services/auth.service";
import type { User } from "firebase/auth";

const TOKEN_KEY = "authToken";
const EXPIRATION_KEY = "authTokenExpiration";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const authToken = ref<string>(localStorage.getItem(TOKEN_KEY) ?? "");
  const tokenExpiration = ref<number>(
    Number(localStorage.getItem(EXPIRATION_KEY)) || 0
  );
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const isTokenValid = computed(() => {
    if (!user.value || !authToken.value) return false;
    return Date.now() < tokenExpiration.value;
  });

  const signIn = async (email: string, password: string) => {
    try {
      loading.value = true;
      error.value = null;
      const loggedInUser = await login(email, password);
      const authenticationToken = (await loggedInUser?.getIdToken()) ?? "";
      setToken(authenticationToken, 3600);
      user.value = loggedInUser;
    } catch (err) {
      console.error("Login failed", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      loading.value = true;
      error.value = null;
      const registeredUser = await register(email, password);
      const authenticationToken = (await registeredUser?.getIdToken()) ?? "";
      setToken(authenticationToken, 3600);
      user.value = registeredUser;
    } catch (err) {
      console.error("Sign up failed", error);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const signOut = async () => {
    await logout();
    clearToken();
    user.value = null;
  };

  const setToken = (token: string, expiresInSeconds: number) => {
    const expirationTime = Date.now() + expiresInSeconds * 1000;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EXPIRATION_KEY, expirationTime.toString());
    tokenExpiration.value = expirationTime;
    authToken.value = token;
  };

  const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRATION_KEY);
    tokenExpiration.value = 0;
    authToken.value = "";
  };

  return {
    user,
    authToken,
    loading,
    error,
    isTokenValid,

    signIn,
    signUp,
    signOut,
  };
});
