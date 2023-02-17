import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { PokeInfo, PokeStoreInfo } from "../data";

export const usePokeStore = defineStore("poke", () => {
	const pokeStore: Ref<PokeStoreInfo> = ref([]);

	const allPokeStore = (poke: PokeInfo) => {
		pokeStore.value.push(poke);
		pokeStore.value.sort(function (x, y) {
			return x.id - y.id;
		});
	};

	const checkPoke = (poke: PokeInfo) => {
		const pokeFitler = pokeStore.value.filter(
			(pokeS: PokeInfo) => poke.id === pokeS.id
		);

		if (pokeFitler.length === 0) {
			return true;
		} else {
			return false;
		}
	};

	const getDetailPoke = (idPoke: string) => {
		const pokeDetail = pokeStore.value.filter(
			(pokeS: PokeInfo) => Number(idPoke) === pokeS.id
		);

		return pokeDetail;
	};
	const getNamePoke = (namePoke: string) => {
		const pokeDetail = pokeStore.value.filter(
			(pokeS: PokeInfo) => namePoke === pokeS.name
		);

		return pokeDetail;
	};

	return {
		pokeStore,
		allPokeStore,
		checkPoke,
		getNamePoke,
		getDetailPoke,
	};
});
