<template>
	<TitleSection title="Evolution" />
	<section class="evo-container">
		<div
			v-for="(pokeEvo, index) in pokeEvoList"
			:key="index"
			class="evo-poke-container"
		>
			<div
				v-for="(evoChange, index) in pokeEvo.data"
				:key="index"
				class="evo-poke-inter"
			>
				<div v-if="Array.isArray(evoChange)">
					<div v-for="parallel in evoChange" :key="parallel.id">
						<div v-if="parallel.id" class="card-id">
							<EvoItem :evoData="parallel" />
						</div>
					</div>
				</div>
				<div v-else-if="evoChange.id" class="card-id">
					<EvoItem :evoData="evoChange" />
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import EvoItem from "@/components/EvoItem.vue";
import TitleSection from "@/components/TitleSection.vue";
import { PokeEvo, PokeInfo } from "@/data";
import { useEvoStore, usePokeStore } from "@/store";
import { computed, onMounted } from "vue";
const evoActions = useEvoStore();
const pokeActions = usePokeStore();
const pokes = pokeActions.pokeStore;
const evos = evoActions.EvoStore;

onMounted(() => {
	window.scrollTo(0, 0);
});

const pokeEvoList = computed(() => {
	let ActualEvoList: { data: (PokeEvo | PokeEvo[])[] }[] = [];

	if (evos) {
		evos.map((filterEvo: { data: (PokeEvo | PokeEvo[])[]; id: number }) => {
			const actualfilterEvo: { data: (PokeEvo | PokeEvo[])[]; id: number } = {
				id: filterEvo.id,
				data: [],
			};
			filterEvo.data.map((actualEvo: PokeEvo | PokeEvo[]) => {
				if (Array.isArray(actualEvo)) {
					let parallelArray: PokeEvo[] = [];
					actualEvo.map(parallel => {
						const pokeEvoIndi = pokes.find(
							(pokeS: PokeInfo) => parallel.speciesName === pokeS.name
						);
						(async () => {
							if (parallel.item) {
								const res = await fetch(parallel.item.url);
								const extraData = await res.json();
								parallel.stone = extraData.sprites.default;
							}
						})();
						parallel.sprite = pokeEvoIndi?.sprites;
						parallel.id = pokeEvoIndi?.id;
						if (pokeEvoIndi) parallelArray.push(parallel);
					});
					actualfilterEvo.data.push(parallelArray);
					return ActualEvoList;
				}
				const pokeEvoIndi = pokes.find(
					(pokeS: PokeInfo) => actualEvo.speciesName === pokeS.name
				);

				(async () => {
					if (actualEvo.item) {
						const res = await fetch(actualEvo.item.url);
						const extraData = await res.json();
						actualEvo.stone = extraData.sprites.default;
					}
				})();
				actualEvo.sprite = pokeEvoIndi?.sprites;
				actualEvo.id = pokeEvoIndi?.id;

				if (pokeEvoIndi) actualfilterEvo.data.push(actualEvo);
			});
			ActualEvoList.push(actualfilterEvo);
		});
	}
	return ActualEvoList;
});
</script>
<style lang="scss" scoped>
.evo-container {
	display: flex;
	flex-wrap: wrap;
	gap: 6em;
	align-items: center;
	justify-content: center;
}

.evo-poke-container .evo-poke-inter:nth-child(1) :is(.lvl-poke, svg) {
	display: none;
}
.evo-poke-container {
	display: flex;
	align-items: center;
	justify-content: center;
	background: #fffeec;
	padding: 2em;
	border-radius: 1em;
	box-shadow: 0px 2px 20px 5px rgba(0, 0, 0, 0.02);
}
</style>
