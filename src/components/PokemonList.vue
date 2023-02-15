<template>
	<div class="container">
		<h1>pokemon list</h1>
		<div class="poke-list">
			<PokeCard
				v-for="poke in pokes"
				:key="poke.id"
				:name="poke.name"
				:nameJp="poke.nameJp"
				:sprites="poke.sprites"
				:id="poke.id"
				:types="poke.types"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import PokeCard from "@/components/PokeCard.vue";
import { PokeInfo, PokeTypes, PokeEvo } from "@/data";
import { onBeforeMount, ref } from "vue";
import { usePokeStore, useEvoStore } from "@/store";

const pokeActions = usePokeStore();
const evoActions = useEvoStore();

const urlPoke = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100";
//const urlEvo = "https://pokeapi.co/api/v2/evolution-chain?offset=0&limit=78";
const urlEvo = "https://pokeapi.co/api/v2/evolution-chain?offset=0&limit=3";

const getTypes = (types: PokeTypes[]) => {
	const typeList: string[] = [];
	types.forEach(type => {
		typeList.push(type.type.name);
	});
	return typeList;
};

const pokeExtraData = async (url: string) => {
	const res = await fetch(url);
	const extraData = await res.json();

	const formatEvoId = extraData.evolution_chain.url.split("/");

	const extraObject = {
		nameJp: extraData.names[0].name,
		flavorText: extraData.flavor_text_entries[0].flavor_text,
		evoId: Number(formatEvoId.slice(-2, -1)),
	};

	return extraObject;
};

const getInividualPoke = async (urlPoke: string) => {
	const res = await fetch(urlPoke);
	const individualPoke = await res.json();

	const extraData = await pokeExtraData(individualPoke.species.url);

	const resTypes = getTypes(individualPoke.types);

	const pokemonData: PokeInfo = {
		id: individualPoke.id,
		name: individualPoke.name,
		nameJp: extraData.nameJp,
		flavorText: extraData.flavorText,
		height: individualPoke.height,
		weight: individualPoke.weight,
		sprites: individualPoke.sprites.front_default,
		types: resTypes,
		evoId: extraData.evoId,
	};

	if (pokeActions.checkPoke(pokemonData)) {
		pokeActions.allPokeStore(pokemonData);
	}
};

const getIndividualEvo = async (urlEvo: string) => {
	const res = await fetch(urlEvo);
	const individualEvo = await res.json();

	const evoChain: PokeEvo[] = [];
	let evoData = individualEvo.chain;

	do {
		const evoDetails = evoData["evolution_details"][0];
		evoChain.push({
			speciesName: evoData.species.name,
			minLevel: !evoDetails ? 1 : evoDetails.min_level,
			triggerName: !evoDetails ? null : evoDetails.trigger.name,
			item: !evoDetails ? null : evoDetails.item,
		});

		evoData = evoData["evolves_to"][0];
	} while (
		evoData &&
		Object.prototype.hasOwnProperty.call(evoData, "evolves_to")
	);

	const evoPokeList: { id: number; data: PokeEvo[] } = {
		id: individualEvo.id,
		data: evoChain,
	};

	const evoTest = evoActions.checkEvo(evoPokeList);
	if (evoTest) {
		evoActions.allEvoStore(evoPokeList);
	}
};

const getPokeList = async (urlBase: string) => {
	const res = await fetch(urlBase);
	const PokeList = await res.json();

	await PokeList.results.forEach((element: { name: string; url: string }) => {
		getInividualPoke(element.url);
	});
};

const getEvoList = async (urlBase: string) => {
	const res = await fetch(urlBase);
	const EvoList = await res.json();

	await EvoList.results.forEach((element: { url: string }) => {
		getIndividualEvo(element.url);
	});
};

onBeforeMount(async () => {
	getPokeList(urlPoke);
	getEvoList(urlEvo);
});

const pokes = ref(pokeActions.pokeStore);
const evo = ref(evoActions.EvoStore);
console.log(pokes);
console.log(evo);
</script>

<style>
.container {
	display: flex;
	justify-content: center;
}
.poke-list {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 4em;
	align-items: stretch;
	justify-items: center;
}
</style>
