<template>
	<div class="home">
		<TitleSection title="Pokedex" />
		<PokemonList />
	</div>
</template>

<script lang="ts" setup>
import PokemonList from "@/components/PokemonList.vue";
import TitleSection from "@/components/TitleSection.vue";
import { onMounted } from "vue";

onMounted(() => {
	window.scrollTo(0, 0);
});
</script>
