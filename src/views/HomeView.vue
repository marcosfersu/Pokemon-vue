<template>
	<section class="home">
		<div class="home-container">
			<h1>Pokedex home</h1>
			<div class="card-container">
				<article class="pokedex-card card-home">
					<router-link to="/pokedex">
						<img src="./../../public/pokedex-card.jpg" alt="pokedex" />
					</router-link>
				</article>
				<article>Types</article>
				<article>Evolution</article>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
	window.scrollTo(0, 0);
});
</script>

<style lang="scss" scoped>
.home {
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.home-container {
		height: 85%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		.card-home {
			border-radius: 2em;
			overflow: hidden;
		}
		.card-container {
			display: grid;
			grid-template-columns: 2fr 1fr 1fr;
			gap: 2em;
			.pokedex-card {
				img {
					width: 100%;
					height: fit-content;
				}
			}
		}
	}
}
</style>
