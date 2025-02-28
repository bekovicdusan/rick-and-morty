import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth.store";

import CharacterListView from "../views/CharacterListView.vue";
import CharacterView from "../views/CharacterView.vue";
import HomeView from "../views/HomeView.vue";
import LoginAndRegisterView from "../views/LoginAndRegisterView.vue";
import LocationView from "../views/LocationView.vue";
import EpisodeView from "../views/EpisodeView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: LoginAndRegisterView,
  },
  {
    path: "/characters",
    component: CharacterListView,
    meta: { requiresAuth: true },
  },
  {
    path: "/characters/:id",
    component: CharacterView,
    meta: { requiresAuth: true },
  },
  {
    path: "/location/:id",
    name: "SingleLocation",
    component: LocationView,
    meta: { requiresAuth: true },
  },
  {
    path: "/episode/:id",
    name: "SingleEpisode",
    component: EpisodeView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  if (to.path === "/login" && authStore.authToken) {
    router.push("/characters");
  }

  if (to.meta.requiresAuth && !authStore.authToken) {
    next("/login");
  } else {
    next();
  }
});

export default router;
