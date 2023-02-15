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
import { PokeInfo, PokeTypes } from "@/data";
import { onBeforeMount, ref } from "vue";
import { usePokeStore } from "../store";

const pokeActions = usePokeStore();

const urlBase = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100";

const getTypes = (types: PokeTypes[]) => {
  const typeList: string[] = [];
  types.forEach((type) => {
    typeList.push(type.type.name);
  });
  return typeList;
};

const pokeExtraData = async (url: string) => {
  const res = await fetch(url);
  const extraData = await res.json();

  const extraObject = {
    nameJp: extraData.names[0].name,
    flavorText: extraData.flavor_text_entries[0].flavor_text,
  };

  return extraObject;
};

const getInividualPoke = async (urlPoke: string) => {
  const res = await fetch(urlPoke);
  const invividualPoke = await res.json();

  const extraData = await pokeExtraData(invividualPoke.species.url);

  const resTypes = getTypes(invividualPoke.types);

  const pokemonData: PokeInfo = {
    id: invividualPoke.id,
    name: invividualPoke.name,
    nameJp: extraData.nameJp,
    flavorText: extraData.flavorText,
    height: invividualPoke.height,
    weight: invividualPoke.weight,
    sprites: invividualPoke.sprites.front_default,
    types: resTypes,
    evolvesTo: null,
  };

  if (pokeActions.checkPoke(pokemonData)) {
    pokeActions.allPokeStore(pokemonData);
  }
};

const getPokeList = async (urlBase: string) => {
  const res = await fetch(urlBase);
  const PokeList = await res.json();

  await PokeList.results.forEach((element: { name: string; url: string }) => {
    getInividualPoke(element.url);
  });
};

onBeforeMount(async () => {
  getPokeList(urlBase);
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
  grid-template-columns: repeat(5, 1fr);
  gap: 4em;
  align-items: stretch;
  justify-items: center;
}
</style>
