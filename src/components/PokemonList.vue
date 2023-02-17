<template>
	<h1>pokemon list</h1>
	<div class="container">
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
import { usePokeStore } from "@/store";
import { ref } from "vue";
const pokeActions = usePokeStore();

const pokes = ref(pokeActions.pokeStore);
</script>

<style scoped>
.container {
	display: flex;
	justify-content: center;
}
.poke-list {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 4em;
	align-items: stretch;
	justify-items: center;
}
</style>
