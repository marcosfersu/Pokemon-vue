<template>
	<div class="app-container">
		<nav>
			<router-link to="/">Home</router-link> |
			<router-link to="/types">Types</router-link> |
			<router-link to="/pokemon/1">Pokemon details</router-link>
		</nav>
		<section class="main-container">
			<router-view />
		</section>
	</div>
</template>
<script lang="ts" setup>
import { getIndividualEvo, getInividualPoke } from "@/data";
import { useEvoStore, usePokeStore } from "@/store";
import { onBeforeMount } from "vue";
const pokeActions = usePokeStore();
const evoActions = useEvoStore();
const urlPoke = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151";
const urlEvo = "https://pokeapi.co/api/v2/evolution-chain?offset=0&limit=78"; //const urlEvo =
("https://pokeapi.co/api/v2/evolution-chain?offset=0&limit=3");
/* const evoTest =
evoActions.checkEvo(evoPokeList); if (evoTest) {
evoActions.allEvoStore(evoPokeList); } */ const getEvo = async (element: {
	url: string;
}) => {
	const evoPokeList = await getIndividualEvo(element.url);
	const evoTest = evoActions.checkEvo(evoPokeList);
	if (evoTest) {
		evoActions.allEvoStore(evoPokeList);
	}
};
const getPoke = async (element: { url: string }) => {
	const pokemonData = await getInividualPoke(element.url);
	if (pokeActions.checkPoke(pokemonData)) {
		pokeActions.allPokeStore(pokemonData);
	}
};
const getPokeList = async (urlBase: string) => {
	const res = await fetch(urlBase);
	const PokeList = await res.json();
	PokeList.results.forEach((element: { name: string; url: string }) => {
		getPoke(element);
	});
};
const getEvoList = async (urlBase: string) => {
	const res = await fetch(urlBase);
	const EvoList = await res.json();
	EvoList.results.forEach((element: { url: string }) => {
		getEvo(element);
	});
};
onBeforeMount(async () => {
	if (pokeActions.pokeStore.length === 0) {
		getPokeList(urlPoke);
		getEvoList(urlEvo);
	}
});
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@200;400;700&display=swap");

body {
	margin: 0;
}

#app {
	font-family: "Raleway", sans-serif;
	background: linear-gradient(247.45deg, #f4f6f8 0.76%, #f3f5f7 99.5%);
}

.app-container {
	display: grid;
	grid-template-columns: 30em 1fr;
	grid-template-rows: 100vh;
}

.main-container {
	overflow: auto;
}

nav {
	display: flex;
	flex-flow: column;
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}

a {
	color: black;
	text-decoration: none;
}

.card {
	background: linear-gradient(192.43deg, #ffebcd 6.84%, #ffbe8e 97.29%);
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
}
</style>
