import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { EvoStoreInfo, PokeEvo } from "../data";

export const useEvoStore = defineStore("evo", () => {
  const EvoStore: Ref<EvoStoreInfo> = ref([]);
  const EvoStoreSprite: Ref<EvoStoreInfo> = ref([]);

  const allEvoStore = (evo: any) => {
    EvoStore.value.push(evo);
    EvoStore.value.sort(function (x, y) {
      return x.id - y.id;
    });
  };
  const allEvoStoreSprite = (evo: any) => {
    console.log(evo);

    EvoStoreSprite.value.push(evo);
    EvoStoreSprite.value.sort(function (x, y) {
      return x.id - y.id;
    });
  };

  const checkEvo = (evo: { id: number; data: (PokeEvo | PokeEvo[])[] }) => {
    const evoFitler = EvoStore.value.filter(
      (evoS: { id: number }) => evo.id === evoS.id
    );

    if (evoFitler.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const getCurrentEvo = (idEvo: number) => {
    const evoFitler = EvoStore.value.filter(
      (evoS: { id: number }) => idEvo === evoS.id
    );

    return evoFitler;
  };

  return {
    allEvoStore,
    getCurrentEvo,
    EvoStore,
    allEvoStoreSprite,
    EvoStoreSprite,
    checkEvo,
  };
});
