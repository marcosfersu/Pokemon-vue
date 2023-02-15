import DetailView from "@/views/DetailView.vue";
import HomeView from "@/views/HomeView.vue";
import TypesView from "@/views/TypesView.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/types",
    name: "types",
    component: TypesView,
  },
  {
    path: "/pokemon/:id",
    name: "detail",
    component: DetailView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
