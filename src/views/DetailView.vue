<template>
	<section class="detail-poke-container">
		<div>
			<PokeDetailCard
				v-for="detail in filter"
				:key="detail.id"
				:name="detail.name"
				:nameJp="detail.nameJp"
				:id="detail.id"
				:types="detail.types"
				:artwork="detail.officialArtwork"
				:artworkShiny="detail.officialArtworkShiny"
			/>
		</div>
	</section>
	<div>
		<EvoChange
			v-for="detail in filter"
			:key="detail.id"
			:idEvo="detail.evoId"
		/>
	</div>
</template>
<script setup lang="ts">
import PokeDetailCard from "@/components/pokeDetailCard.vue";
import EvoChange from "@/components/EvoChange.vue";
import { usePokeStore } from "@/store";
import { onBeforeMount, ref, Ref, computed } from "vue";
import { useRoute } from "vue-router";

const pokeActions = usePokeStore();

let pokeId: Ref = ref("0");

onBeforeMount(() => {
	const route = useRoute();
	pokeId.value = Number(route.params.id);
});

const pokes = ref(pokeActions.pokeStore);

const filter = computed(() => {
	return pokes.value.filter((pokeS: any) => pokeId.value === pokeS.id);
});
</script>
<style lang="scss" scoped>
.detail-poke-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	overflow: hidden;
	& > div {
		height: 100%;
		width: 100%;
		max-width: 1800px;
		display: grid;
		align-items: center;
		grid-template-columns: repeat(2, 1fr);
	}
}
</style>
