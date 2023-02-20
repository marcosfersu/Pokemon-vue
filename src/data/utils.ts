import App from "@/App.vue";
import {
  PokeAbilitiesApi,
  PokeEvo,
  PokeInfo,
  PokeStats,
  PokeStatsApi,
  PokeTypes,
} from "@/data";
import { useEvoStore, usePokeStore } from "@/store";
import { createPinia } from "pinia";
import { createApp } from "vue";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

const pokeActions = usePokeStore();
const evoActions = useEvoStore();

/* -------------------------------------------------------------------------- */
/*                                  POKE INFO                                 */
/* -------------------------------------------------------------------------- */

const getTypes = (types: PokeTypes[]) => {
  const typeList: string[] = [];
  types.forEach((type) => {
    typeList.push(type.type.name);
  });
  return typeList;
};
const getAbilities = (abilities: PokeAbilitiesApi[], hidden: boolean) => {
  const abilitieList: string[] = [];
  abilities.forEach((abilityt) => {
    if (hidden) {
      if (abilityt.is_hidden) abilitieList.push(abilityt.ability.name);
    } else {
      if (!abilityt.is_hidden) abilitieList.push(abilityt.ability.name);
    }
  });
  return abilitieList;
};
const getStats = (stats: PokeStatsApi[]) => {
  const statsList: PokeStats[] = [];
  stats.forEach((stat) => {
    const currentStat = {
      baseStat: stat.base_stat,
      name: stat.stat.name,
    };
    statsList.push(currentStat);
  });
  return statsList;
};

const pokeExtraData = async (url: string) => {
  const res = await fetch(url);
  const extraData = await res.json();

  const formatEvoId = extraData.evolution_chain.url.split("/");

  const extraObject = {
    nameJp: extraData.names[0].name,
    flavorText: extraData.flavor_text_entries[0].flavor_text,
    evoId: Number(formatEvoId.slice(-2, -1)),
  };

  return extraObject;
};

const getPoke = async (pokeData: { results: { url: string }[] }) => {
  pokeData.results.forEach(async (element: { url: string }) => {
    const pokemonData = await getInividualPoke(element.url);

    if (pokeActions.checkPoke(pokemonData)) {
      pokeActions.allPokeStore(pokemonData);
    }
  });
};

const getInividualPoke = async (urlPoke: string) => {
  const res = await fetch(urlPoke);
  const individualPoke = await res.json();

  const extraData = await pokeExtraData(individualPoke.species.url);

  const resTypes = getTypes(individualPoke.types);

  const resStats = getStats(individualPoke.stats);

  const resAbilities = getAbilities(individualPoke.abilities, false);
  const resHiddenAbilities = getAbilities(individualPoke.abilities, true);

  const pokemonData: PokeInfo = {
    id: individualPoke.id,
    name: individualPoke.name,
    nameJp: extraData.nameJp,
    flavorText: extraData.flavorText,
    height: individualPoke.height,
    weight: individualPoke.weight,
    sprites: individualPoke.sprites.front_default,
    officialArtwork:
      individualPoke.sprites.other["official-artwork"].front_default,
    officialArtworkShiny:
      individualPoke.sprites.other["official-artwork"].front_shiny,
    types: resTypes,
    stats: resStats,
    evoId: extraData.evoId,
    abilities: resAbilities,
    abilitiesHidden: resHiddenAbilities,
  };

  return pokemonData;
};

export const getPokeList = async (urlBase: string) => {
  const res = await fetch(urlBase);
  const PokeList = await res.json();

  await getPoke(PokeList);
};

/* -------------------------------------------------------------------------- */
/*                                  EVOLUTION                                 */
/* -------------------------------------------------------------------------- */

const getIndividualEvo = async (urlEvo: string) => {
  const res = await fetch(urlEvo);
  const individualEvo = await res.json();

  const evoChain: PokeEvo[] = [];
  let evoData = individualEvo.chain;

  do {
    const evoDetails = evoData["evolution_details"][0];

    evoChain.push({
      speciesName: evoData.species.name,
      minLevel: !evoDetails ? 1 : evoDetails.min_level,
      triggerName: !evoDetails ? null : evoDetails.trigger.name,
      item: !evoDetails ? null : evoDetails.item,
    });
    //if (evoData["evolves_to"].length > 1) console.log(evoData);
    evoData = evoData["evolves_to"][0];
  } while (
    evoData &&
    Object.prototype.hasOwnProperty.call(evoData, "evolves_to")
  );

  const evoPokeList: { id: number; data: PokeEvo[] } = {
    id: individualEvo.id,
    data: evoChain,
  };

  return evoPokeList;
};

const getEvo = async (element: { results: { url: string }[] }) => {
  element.results.forEach(async (element: { url: string }) => {
    const evoPokeList = await getIndividualEvo(element.url);
    const evoTest = evoActions.checkEvo(evoPokeList);
    if (evoTest) {
      evoActions.allEvoStore(evoPokeList);
    }
  });
};

export const getEvoList = async (urlBase: string) => {
  const res = await fetch(urlBase);
  const EvoList = await res.json();

  await getEvo(EvoList);
};

/* -------------------------------------------------------------------------- */
/*                                    UTILS                                   */
/* -------------------------------------------------------------------------- */

export const fixNumb = (numb: number | undefined) =>
  String(numb).padStart(3, "0");
export const fixWeightHeight = (numb: number | undefined) =>
  numb ? numb / 10 : "";
