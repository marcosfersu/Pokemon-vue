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
import { getIndividualEvo, getInividualPoke } from "@/data";
import { useEvoStore, usePokeStore } from "@/store";
import { onBeforeMount, ref } from "vue";
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

const pokes = ref(pokeActions.pokeStore);
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
