<template>
	<div v-for="actual in actualChange" :key="actual.id">
		<img :src="actual.sprites" alt="" />
	</div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from "vue";
import { useEvoStore, usePokeStore } from "@/store";
const evoActions = useEvoStore();
const pokeActions = usePokeStore();
const props = defineProps({
	idEvo: {
		type: Number,
	},
});
let actualChange = ref([]);

const evos = ref(evoActions.EvoStore);
const pokes = computed(() => pokeActions.pokeStore);

const filter = computed(() => {
	return evos.value.filter((evoS: any) => props.idEvo === evoS.id);
});

filter.value[0].data.forEach((el: any) => {
	pokes.value.forEach((pokeS: any) => {
		if (pokeS.name === el.speciesName) actualChange.value.push(pokeS);
	});
});

console.log(actualChange);
</script>
