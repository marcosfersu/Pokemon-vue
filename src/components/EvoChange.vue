<template>
	<article class="card detail-card evo-card">
		<h3 class="detail-title">evolution chain</h3>
		<div class="evo-card-info">
			<div
				v-for="(pokeEvo, index) in pokeEvoList"
				:key="index"
				class="evo-poke-container"
			>
				<div v-if="Array.isArray(pokeEvo)">
					<div v-for="parallel in pokeEvo" :key="parallel.id">
						<EvoItem :evoData="parallel" />
					</div>
				</div>
				<div v-else>
					<EvoItem :evoData="pokeEvo" />
				</div>
			</div>
		</div>
	</article>
</template>

<script setup lang="ts">
import { PokeEvo, PokeInfo } from "@/data";
import { useEvoStore, usePokeStore } from "@/store";
import { computed, defineProps } from "vue";
import EvoItem from "./EvoItem.vue";
const evoActions = useEvoStore();
const pokeActions = usePokeStore();
const props = defineProps({
	idEvo: {
		type: Number,
	},
});
const pokes = pokeActions.pokeStore;
const evos = evoActions.EvoStore;
const filterEvo = computed(() =>
	evos.find((evo: { id: number }) => props.idEvo === evo.id)
);
const pokeEvoList = computed(() => {
	const ActualEvoList: (PokeEvo | PokeEvo[])[] = [];
	if (filterEvo.value) {
		filterEvo.value.data.map((actualEvo: PokeEvo | PokeEvo[]) => {
			if (Array.isArray(actualEvo)) {
				const parallelArray: PokeEvo[] = [];
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
				ActualEvoList.push(parallelArray);
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
			if (pokeEvoIndi) ActualEvoList.push(actualEvo);
		});
	}
	return ActualEvoList;
});
</script>
<style lang="scss" scoped>
.card.detail-card.evo-card {
	flex-direction: column;
	align-items: center;
	border-color: #fffeec;
	background-color: #fffeec;
	@media screen and (max-width: 700px) {
		width: 100%;
	}
	.evo-card-info {
		display: flex;
		@media screen and (max-width: 550px) {
			flex-direction: column;
			width: 100%;
		}
	}
	.evo-poke-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.evo-poke-container:nth-child(1) :is(.lvl-poke, svg) {
		display: none;
	}
	.detail-title {
		font-weight: 100;
		font-size: 2em;
		margin: 0 0 0.3em 0;
	}
}
</style>
