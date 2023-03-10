<template>
	<div class="app-container">
		<nav>
			<div class="nav-container">
				<div class="nav-head">
					<div class="nav-img-container">
						<img src="./../public/pokeball.png" alt="" />
						<p>PokeApi</p>
					</div>
					<div class="nav-link-container">
						<router-link to="/">
							<div class="nav-item">
								<icon-pokedex class="icon-menu" />
								<icon-pokedex-active class="icon-menu active" />
								<p>Pokedex</p>
							</div>
						</router-link>
						<router-link to="/types">
							<div class="nav-item">
								<icon-types class="icon-menu" />
								<icon-types-active class="icon-menu active" />
								<p>Types</p>
							</div>
						</router-link>
						<router-link to="/types">
							<div class="nav-item">
								<icon-types class="icon-menu" />
								<icon-types-active class="icon-menu active" />
								<p>Evolution</p>
							</div>
						</router-link>
					</div>
				</div>
				<div class="nav-footer-container">© Marcos Fernandez - {{ year }}</div>
			</div>
		</nav>
		<section class="main-container">
			<router-view />
		</section>
	</div>
</template>

<script lang="ts" setup>
import { getEvoList, getPokeList } from "@/data";
import { usePokeStore } from "@/store";
import { onBeforeMount } from "vue";
import IconPokedex from "./assets/icons/IconPokedex.vue";
import IconPokedexActive from "./assets/icons/IconPokedexActive.vue";
import IconTypes from "./assets/icons/IconTypes.vue";
import IconTypesActive from "./assets/icons/IconTypesActive.vue";

const pokeActions = usePokeStore();

const year = new Date().getFullYear();

const urlPoke = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151";
const urlEvo = "https://pokeapi.co/api/v2/evolution-chain?offset=0&limit=78";

onBeforeMount(async () => {
	if (pokeActions.pokeStore.length === 0) {
		await getPokeList(urlPoke);
		await getEvoList(urlEvo);
	}
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@200;400;500;700&display=swap");

body {
	margin: 0;
	overflow-y: scroll;

	&::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		background-color: #f5f5f5;
	}

	&::-webkit-scrollbar {
		width: 5px;
		background-color: #f5f5f5;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		background-color: #b4b4b4;
	}
}

#app {
	font-family: "Raleway", sans-serif;
	background: linear-gradient(247.45deg, #f4f6f8 0.76%, #f3f5f7 99.5%);
}

.app-container {
	display: grid;
	grid-template-columns: 30em 1fr;
	max-width: 2000px;
	margin: 0 auto;

	@media screen and (max-width: 2000px) {
		grid-template-columns: 23em 1fr;
		max-width: 1600px;
	}

	@media screen and (max-width: 1600px) {
		max-width: 1200px;
		grid-template-columns: 5em 1fr;
	}
	@media screen and (max-width: 1200px) {
		max-width: 1000px;
	}
}

nav {
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: flex-start;
	position: relative;
	height: 100vh;
	@media screen and (max-width: 1600px) {
		margin: 0;
	}

	.nav-container {
		padding: 3em 2em;
		background: linear-gradient(
			180deg,
			#f4f6f8 0%,
			#f8f8f8 0.01%,
			#f8f8f8 100%
		);
		box-shadow: -4px 3px 50px 5px rgb(0 0 0 / 5%);
		border-radius: 36px;
		height: 85%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		position: fixed;
		@media screen and (max-width: 1600px) {
			padding: 2em 1em;
			border-radius: 20px;
		}
		@media screen and (max-width: 1300px) {
			width: 4em;
		}

		.nav-head {
			gap: 4em;
			display: flex;
			flex-direction: column;
		}

		.nav-img-container {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 1em;

			p {
				font-weight: 600;
				margin: 0;
				font-size: 1.3em;
			}

			img {
				width: 5em;
			}
		}

		.nav-link-container {
			display: flex;
			justify-content: flex-start;
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5em;
		}

		.nav-footer-container {
			align-self: flex-end;
		}

		& a.router-link-active {
			.icon-menu {
				display: none;
			}
			.icon-menu.active {
				display: block;
			}
			color: #cab2bb;
			svg path {
				fill: #cab2bb;
			}
		}

		.nav-item {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 1em;
			padding: 1em;
			border-radius: 1em;

			@media screen and (max-width: 1600px) {
				padding-right: 0;
			}

			.icon-menu {
				display: block;
			}

			.icon-menu.active {
				display: none;
			}

			p {
				margin: 0;
				font-size: 1.6em;
				font-weight: 500;
				@media screen and (max-width: 1600px) {
					display: none;
				}
			}

			svg {
				width: 2.4em;
			}
		}
	}

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			.nav-item {
				background-color: #e7cad532;
			}

			svg g path {
				fill: #42b983;
			}
		}
	}
}

a {
	color: black;
	text-decoration: none;
}

.card {
	background: #fffeec;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	border-radius: 3em;
	border: solid #fffdec 0.7em;
	box-shadow: 0px 2px 20px 5px rgba(0, 0, 0, 0.07);
	min-width: 15em;
	padding: 2em 1em;
	transition: transform 0.15s ease-in-out;
	@media screen and (max-width: 2000px) {
		min-width: 13em;
	}
	@media screen and (max-width: 1600px) {
		min-width: 10em;
	}
	&.detail-card {
		box-shadow: 0px 0px 9px 0px rgb(0 0 0 / 2%);
		flex-direction: row;
		align-items: flex-end;
		border-radius: 0.8rem;
		padding: 2rem;
		min-width: auto;
		border: solid #fffdec 0.7rem;
		box-sizing: border-box;
		max-width: 100%;
		@media screen and (max-width: 2000px) {
			padding: 1.2rem;
		}
		@media screen and (max-width: 1400px) {
			padding: 0.6rem;
		}
	}

	&.grass {
		background: linear-gradient(192.43deg, #d2eedd 6.84%, #a9d7bc 97.29%);
		.poke-bg-svg svg g path {
			fill: #e8ffea;
		}
		.poke-id {
			background: #669a64;
		}
	}
	&.electric {
		background: linear-gradient(192.43deg, #fff9c5 6.84%, #fef496 97.29%);
		.poke-bg-svg svg g path {
			fill: #fffce9;
		}
		.poke-id {
			background: #a39622;
		}
	}
	&.water {
		background: linear-gradient(192.43deg, #cce8ff 6.84%, #9dcdf3 97.29%);
		.poke-bg-svg svg g path {
			fill: #e9f8fd;
		}
		.poke-id {
			background: #4c8bab;
		}
	}
	&.bug {
		background: linear-gradient(192.43deg, #ebffc2 6.84%, #d1f487 97.29%);
		.poke-bg-svg svg g path {
			fill: #f4ffdc;
		}
		.poke-id {
			background: #87ab68;
		}
	}
	&.fly {
		background: linear-gradient(192.43deg, #dce9ff 6.84%, #9cb9eb 97.29%);
	}
	&.normal {
		background: linear-gradient(192.43deg, #ebeff5 6.84%, #dadde3 97.29%);
		.poke-bg-svg svg g path {
			fill: #f8f8f8;
		}
		.poke-id {
			background: #979797;
		}
	}
	&.poison {
		background: linear-gradient(192.43deg, #f6dffe 6.84%, #bf94cd 97.29%);
		.poke-bg-svg svg g path {
			fill: #fcddff;
		}
		.poke-id {
			background: #957793;
		}
	}
	&.fire {
		background: linear-gradient(192.43deg, #ffebcd 6.84%, #ffbe8e 97.29%);
		.poke-bg-svg svg g path {
			fill: #ffeade;
		}
		.poke-id {
			background: rgba(158, 70, 5, 0.67);
		}
	}
	&.ground {
		background: linear-gradient(192.43deg, #ffe4d7 6.84%, #ffb590 97.29%);
		.poke-bg-svg svg g path {
			fill: #ffe8dc;
		}
		.poke-id {
			background: rgba(179, 129, 93, 0.67);
		}
	}
	&.fairy {
		background: linear-gradient(192.43deg, #ffe6fc 6.84%, #ffc0f7 97.29%);
		.poke-bg-svg svg g path {
			fill: #feedfc;
		}
		.poke-id {
			background: rgba(208, 129, 208, 0.67);
		}
	}
	&.fighting {
		background: linear-gradient(192.43deg, #fdc5d8 6.84%, #ea80a3 97.29%);
		.poke-bg-svg svg g path {
			fill: #ffc5d8;
		}
		.poke-id {
			background: rgba(164, 66, 112, 0.67);
		}
	}
	&.psychic {
		background: linear-gradient(192.43deg, #f7cfd3 6.84%, #ff929d 97.29%);
		.poke-bg-svg svg g path {
			fill: #ffd6da;
		}
		.poke-id {
			background: rgba(197, 109, 127, 0.67);
		}
	}
	&.ghost {
		background: linear-gradient(192.43deg, #c8d8fc 6.84%, #89a3e0 97.29%);
		.poke-bg-svg svg g path {
			fill: #cbdbff;
		}
		.poke-id {
			background: rgba(149, 152, 241, 0.67);
		}
	}
	&.rock {
		background: linear-gradient(192.43deg, #fff1cc 6.84%, #e2d1a3 97.29%);
		.poke-bg-svg svg g path {
			fill: #fff8e5;
		}
		.poke-id {
			background: rgba(189, 156, 95, 0.67);
		}
	}
	&.dragon {
		background: linear-gradient(192.43deg, #d7ecff 6.84%, #92b3d3 97.29%);
		.poke-bg-svg svg g path {
			fill: #d4eaff;
		}
		.poke-id {
			background: rgba(125, 159, 223, 0.67);
		}
	}
	&.ice {
		background: linear-gradient(192.43deg, #ddfffb 6.84%, #b9f9f1 97.29%);
		.poke-bg-svg svg g path {
			fill: #f1fffe;
		}
		.poke-id {
			background: rgba(162, 229, 243, 0.67);
		}
	}
}

.btn-icon {
	svg g path {
		fill: #ecdfe4;
	}
}
</style>
