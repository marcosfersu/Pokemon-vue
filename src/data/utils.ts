import { PokeEvo, PokeInfo, PokeTypes } from "@/data";

export const getTypes = (types: PokeTypes[]) => {
  const typeList: string[] = [];
  types.forEach((type) => {
    typeList.push(type.type.name);
  });
  return typeList;
};

export const pokeExtraData = async (url: string) => {
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

export const getInividualPoke = async (urlPoke: string) => {
  const res = await fetch(urlPoke);
  const individualPoke = await res.json();

  const extraData = await pokeExtraData(individualPoke.species.url);

  const resTypes = getTypes(individualPoke.types);

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
    evoId: extraData.evoId,
  };

  return pokemonData;
};

export const getIndividualEvo = async (urlEvo: string) => {
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
