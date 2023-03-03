<template>
	<router-link :to="{ name: `detailPoke`, params: { id: id } }">
		<article class="contianer">
			<div :class="types[0]" class="poke-card card" v-if="types">
				<PokeCardInner
					:name="name"
					:nameJp="nameJp"
					:sprites="sprites"
					:id="id"
					:types="types"
				/>
			</div>
		</article>
	</router-link>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import PokeCardInner from "./PokeCardInner.vue";

defineProps({
	name: {
		type: String,
	},

	nameJp: {
		type: String,
	},
	sprites: {
		type: String,
	},
	id: {
		type: Number,
	},
	types: {
		type: Array as PropType<Array<string | undefined>>,
	},
});
</script>

<style scoped lang="scss">
.poke-card.card {
	cursor: pointer;

	@media screen and (min-width: 800px) {
		&:hover {
			transform: scale(0.97);
			transition: all 0.25s ease-in-out;
			box-shadow: 0 0 11px rgba(0, 0, 0, 0.07);
		}

		&:hover .poke-img-container img {
			transform: scale(1.15);
			transition: transform 0.25s ease-in-out;
		}

		&:hover .poke-bg-svg svg {
			transform: rotate(-20deg);
			transition: transform 0.35s ease-in-out;
		}
	}
}
</style>
