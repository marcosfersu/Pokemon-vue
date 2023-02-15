import { defineStore } from "pinia";

interface IgetEvoChainRess {
  id: number;
  chain: {
    evolution_details: {
      min_level: number;
      trigger: {
        name: string | null;
      };
      item: string;
    }[];
    species: {
      name: string;
    };
    evolves_to: any;
  };
}

interface Itypes {
  type: {
    name: string;
  };
}

interface IevoChain {
  id: number;
}

interface pokemonInfo {
  id: number;
  name: string;
  sprites: string;
}

const usePokemonListStore = defineStore("pokemonList", {
  state: () => {
    return {
      pokemonList: <Array<pokemonInfo>>[],
      pokemonEvolList: <Array<any>>[],
      limitId: 4,
      baseURL: "https://pokeapi.co/api/v2/pokemon",
    };
  },
  actions: {
    async getAllPokemon() {
      for (let i = 1; i <= this.limitId; i++) {
        const uri = `${this.baseURL}/${i}`;
        const pokemonRess = await fetch(uri);
        const response = await pokemonRess.json();

        const getExtraInfo = await fetch(response.species.url);
        const extraRess = await getExtraInfo.json();

        const evo = await fetch(extraRess.evolution_chain.url);
        const evoRess = await evo.json();

        const pokemonData = {
          id: response.id,
          name: response.name,
          height: response.height,
          weight: response.weight,
          sprites: response.sprites.front_default,
          type: <any>[],
          nameJp: extraRess.names[0].name,
          favorText: extraRess.flavor_text_entries[0].flavor_text,
          evolvesTo: null,
        };

        response.types.forEach((element: any) => {
          pokemonData.type.push(element.type);
        });

        this.getEvolve(evoRess);

        this.pokemonList.push(pokemonData);
      }
    },
    getEvolve(data: IgetEvoChainRess) {
      const evoChain: any = [];
      let evoData = data.chain;

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
      console.log(evoChain);

      this.pokemonEvolList.push(evoChain);
    },
  },
});

export default usePokemonListStore;
