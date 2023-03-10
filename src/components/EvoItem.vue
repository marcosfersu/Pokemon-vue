<template>
	<div v-if="evoData" class="evo-chain-poke">
		<div v-if="evoData.minLevel > 1" class="evo-info">
			<p class="lvl-poke">lvl {{ evoData.minLevel }}</p>
			<ArrowEvo />
		</div>
		<div v-if="evoData.triggerName === `trade`" class="evo-info">
			<p class="lvl-poke">
				{{ evoData.triggerName }}
			</p>
			<ArrowEvo />
		</div>
		<div v-if="evoData.stone" class="evo-info">
			<div class="lvl-poke">
				<img :src="evoData.stone" alt="" />
			</div>
			<ArrowEvo />
		</div>
		<router-link
			:to="{ name: `detailPoke`, params: { id: evoData.id } }"
			class="evo-chain-img"
		>
			<img :src="evoData.backSprite" alt="" />
			<p>{{ evoData.speciesName }}</p>
		</router-link>
	</div>
</template>

<script lang="ts" setup>
import ArrowEvo from "@/components/ArrowEvo.vue";
import { IevoData } from "@/data";
import { defineProps, PropType } from "vue";

defineProps({
	evoData: {
		type: Object as PropType<IevoData>,
	},
});
</script>
<style lang="scss" scoped>
.evo-chain-poke {
	display: flex;
	justify-content: center;
	align-items: center;
	@media screen and (max-width: 550px) {
		flex-direction: column;
	}

	.evo-info {
		position: relative;
		@media screen and (max-width: 550px) {
			height: 4em;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 1em;
		}
		svg {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 1;
			@media screen and (max-width: 1400px) {
				width: 4em;
			}
		}
		.lvl-poke {
			margin: 0 1em;
			min-width: 3.5em;
			z-index: 2;
			position: relative;
			@media screen and (max-width: 2000px) {
				margin: 0 0.4em;
			}
			@media screen and (max-width: 1400px) {
				margin: 0;
			}
			img {
				width: 2.5em;
			}
		}
	}

	.evo-chain-img {
		display: flex;
		flex-direction: column;
		align-items: center;

		p {
			margin: 0;
		}

		img {
			@media screen and (max-width: 1400px) {
				width: 6em;
			}
		}
	}
}
</style>
