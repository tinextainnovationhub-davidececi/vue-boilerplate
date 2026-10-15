import { createRouter, createWebHistory } from "vue-router";

import envs from "@/config/env";

export const router = createRouter({
  history: createWebHistory(envs.BASE_URL),
  routes: [
    { path: "/", name: "home", component: () => import("@/views/HomeView.vue") },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});
