import DetailView from "@/views/DetailView.vue";
import HomeView from "@/views/HomeView.vue";
import PokedexView from "@/views/PokedexView.vue";
import TypesView from "@/views/TypesView.vue";
import EvosView from "@/views/EvosView.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/pokedex",
		name: "pokedex",
		component: PokedexView,
	},
	{
		path: "/types",
		name: "types",
		component: TypesView,
	},
	{
		path: "/pokemon/:id",
		name: "detailPoke",
		component: DetailView,
	},
	{
		path: "/evos",
		name: "evoPoke",
		component: EvosView,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
