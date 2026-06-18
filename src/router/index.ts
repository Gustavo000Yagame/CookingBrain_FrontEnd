import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import PaginaNaoEncontrado from "../views/PaginaNaoEncontrado.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/about",
      name: "about",
      component: PaginaNaoEncontrado,
    },
    {
      path: "/services",
      name: "services",
      component: PaginaNaoEncontrado,
    },
    {
      path: "/contact",
      name: "contact",
      component: PaginaNaoEncontrado,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/PaginaNaoEncontrado.vue"),
    },
  ],
});

export default router;
