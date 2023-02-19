<template>
  <article class="card detail-card evo-card">
    <h3 class="detail-title">evolution chain</h3>
    <div class="evo-card-info">
      <div
        v-for="detail in pokeSprite"
        :key="detail.speciesName"
        class="evo-poke-container"
      >
        <div class="evo-chain-poke">
          <div v-if="detail.minLevel > 1" class="evo-info">
            <p class="lvl-poke">lvl {{ detail.minLevel }}</p>
            <ArrowEvo />
          </div>
          <div v-if="detail.triggerName === `trade`" class="evo-info">
            <p class="lvl-poke">
              {{ detail.triggerName }}
            </p>
            <ArrowEvo />
          </div>
          <div v-if="detail.stone" class="evo-info">
            <div class="lvl-poke">
              <img :src="detail.stone" alt="" />
            </div>
            <ArrowEvo />
          </div>
          <router-link
            :to="{ name: `detailPoke`, params: { id: detail.id } }"
            class="evo-chain-img"
          >
            <img :src="detail.sprite" alt="" />
            <p>{{ detail.speciesName }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import ArrowEvo from "@/components/ArrowEvo.vue";
import { PokeEvo, PokeInfo } from "@/data";
import { useEvoStore, usePokeStore } from "@/store";
import { computed, defineProps } from "vue";
const evoActions = useEvoStore();
const pokeActions = usePokeStore();
const props = defineProps({
  idEvo: {
    type: Number,
  },
});

const pokes = pokeActions.pokeStore;
const evos = evoActions.EvoStore;

const filterEvo = computed(() =>
  evos.find((evo: { id: number }) => props.idEvo === evo.id)
);

const pokeSprite = computed(() => {
  let lastFilter: PokeEvo[] = [];
  if (filterEvo.value) {
    filterEvo.value.data.map((sprite: PokeEvo) => {
      const pokeEvoIndi = pokes.find(
        (pokeS: PokeInfo) => sprite.speciesName === pokeS.name
      );

      if (sprite.item) {
        (async () => {
          const res = await fetch(sprite.item.url);
          const extraData = await res.json();

          sprite.stone = extraData.sprites.default;
        })();
      }
      sprite.sprite = pokeEvoIndi?.sprites;
      sprite.id = pokeEvoIndi?.id;

      if (pokeEvoIndi) lastFilter.push(sprite);
    });
  }

  return lastFilter;
});
</script>
<style lang="scss" scpoed>
.card.detail-card.evo-card {
  flex-direction: column;
  align-items: center;

  .evo-card-info {
    display: flex;
  }
  .detail-title {
    font-weight: 100;
    font-size: 2em;
    margin: 0 0 0.3em 0;
  }

  .evo-poke-container:nth-child(1) :is(.lvl-poke, svg) {
    display: none;
  }

  .evo-chain-poke {
    display: flex;
    justify-content: center;
    align-items: center;
    .evo-info {
      position: relative;
      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
      }
      .lvl-poke {
        margin: 0 1em;
        min-width: 3.5em;
        z-index: 2;
        position: relative;

        img {
          width: 2.5em;
        }
      }
    }

    .evo-chain-img {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        margin: 0;
      }
    }
  }
}
</style>
