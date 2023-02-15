import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { PokeEvo, EvoStoreInfo } from "../data";

export const useEvoStore = defineStore("evo", () => {
	const EvoStore: Ref<EvoStoreInfo> = ref([]);

	const allEvoStore = (evo: { id: number; data: PokeEvo[] }) => {
		EvoStore.value.push(evo);
		EvoStore.value.sort(function (x, y) {
			return x.id - y.id;
		});
	};

	const checkEvo = (evo: { id: number; data: PokeEvo[] }) => {
		/*
		const evoFitler = EvoStore.value.some(el => {
			console.log(el.id === 1);

			el.id === 1;
		});

		return evoFitler;
*/

		const evoFitler = EvoStore.value.filter(
			(evoS: { id: number }) => evo.id === evoS.id
		);

		if (evoFitler.length === 0) {
			return true;
		} else {
			return false;
		}
	};

	return {
		allEvoStore,
		EvoStore,
		checkEvo,
	};
});
