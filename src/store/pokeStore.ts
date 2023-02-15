import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { PokeInfo, PokeStoreInfo } from "../data";

export const usePokeStore = defineStore("state", () => {
  const pokeStore: Ref<PokeStoreInfo> = ref([]);

  const allPokeStore = (poke: PokeInfo) => {
    pokeStore.value.push(poke);
    pokeStore.value.sort(function (x, y) {
      return x.id - y.id;
    });
  };

  const checkPoke = (poke: PokeInfo) => {
    const pokeFitler = pokeStore.value.filter(
      (pokeS: PokeInfo) => poke.id === pokeS.id
    );

    if (pokeFitler.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  return {
    pokeStore,
    allPokeStore,
    checkPoke,
  };
});
