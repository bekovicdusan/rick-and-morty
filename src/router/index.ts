import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import CharacterView from "../views/CharacterView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/character/:id", component: CharacterView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
