<template>
  <section class="detail-poke-container">
    <div v-if="filter">
      <PokeDetailCard
        :name="filter.name"
        :nameJp="filter.nameJp"
        :id="filter.id"
        :artwork="filter.officialArtwork"
        :artworkShiny="filter.officialArtworkShiny"
        :types="filter.types"
      />
      <InfoPokeDetail
        :weight="filter.weight"
        :height="filter.height"
        :stats="filter.stats"
        :types="filter.types"
        :flavorText="filter.flavorText"
        :evoId="filter.evoId"
        :id="filter.id"
        :abilities="filter.abilities"
        :abilitiesHidden="filter.abilitiesHidden"
      />
      <div class="btn-container">
        <div class="btn-icon">
          <PokeBgSvg />
        </div>
        <router-link
          :to="{ name: `detailPoke`, params: { id: filter.id - 1 } }"
        >
          <button
            class="btn plus first"
            role="button"
            :disabled="filter.id <= 1"
          >
            <IconArrow />
          </button>
        </router-link>
        <router-link
          :to="{ name: `detailPoke`, params: { id: filter.id + 1 } }"
        >
          <button class="btn plus" role="button" :disabled="filter.id >= 151">
            <IconArrow />
          </button>
        </router-link>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import IconArrow from "@/assets/icons/IconArrow.vue";
import InfoPokeDetail from "@/components/InfoPokeDetail.vue";
import PokeBgSvg from "@/components/PokeBgSvg.vue";
import PokeDetailCard from "@/components/pokeDetailCard.vue";
import { PokeInfo } from "@/data";
import { usePokeStore } from "@/store";
import { computed, ComputedRef, onBeforeMount, onUpdated, ref, Ref } from "vue";
import { useRoute } from "vue-router";

const pokeActions = usePokeStore();
const route = useRoute();

let pokeId: Ref = ref("0");

onBeforeMount(() => {
  pokeId.value = Number(route.params.id);
});

onUpdated(() => {
  pokeId.value = Number(route.params.id);
});

const pokes = pokeActions.pokeStore;

const filter: ComputedRef<PokeInfo | undefined> = computed(() =>
  pokes.find((pokeS: PokeInfo) => pokeId.value === pokeS.id)
);
</script>
<style lang="scss" scoped>
.detail-poke-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
  @media screen and (max-height: 850px) {
    height: auto;
    overflow: scroll;
  }
  @media screen and (max-width: 1200px) {
    height: auto;
    overflow: scroll;
  }
  & > div {
    height: 85%;
    width: 100%;
    max-width: 1800px;
    display: grid;
    align-items: center;
    grid-template-columns: 50% 34rem;
    grid-template-rows: 1fr calc(8em);
    gap: 0 2vw;
    grid-template-areas:
      "card detail"
      "card btn";

    @media screen and (max-height: 850px) {
      height: auto;
      align-items: start;
      padding: 3em 0 2em 0;
    }
    @media screen and (max-width: 1200px) {
      grid-template-columns: 600px;
      justify-content: center;
      padding: 3em 0 2em 0;
      grid-template-rows: 1fr;
      gap: 3.3em;
      grid-template-areas:
        "card"
        "detail"
        "btn";
    }

    @media screen and (max-width: 700px) {
      grid-template-columns: 1fr;
    }
    .btn-container {
      grid-area: btn;
      display: flex;
      gap: 1em;
      padding-top: 2em;
      margin-top: 1em;
      border-top: 3px solid #d4c9ce;
      position: relative;

      .btn-icon {
        width: 2em;
        height: 2em;
        position: absolute;
        left: 50%;
        top: -1.5em;
        transform: translate(-50%, 0);
        background-color: #f4f6f8;
        border-radius: 50%;
        padding: 0.5em;

        svg g path {
          fill: #1c1c1c !important;
        }
      }

      .btn {
        appearance: button;
        background-color: #ecdfe4;
        background-image: none;
        border: 1px solid #ecdfe4;
        border-radius: 4px;
        box-shadow: #fffeec 4px 4px 0 0, #d4c9ce 4px 4px 0 1px;
        box-sizing: border-box;
        color: #000000;
        cursor: pointer;
        display: inline-block;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        overflow: visible;
        text-align: center;
        text-transform: none;
        touch-action: manipulation;
        user-select: none;
        -webkit-user-select: none;
        vertical-align: middle;
        white-space: nowrap;
        width: 5em;
        height: 5em;
        display: flex;
        justify-content: center;
        align-items: center;

        &.first svg {
          transform: rotate(180deg);
        }

        svg {
          width: 2em;
          height: 2em;
        }
      }

      .btn:focus {
        text-decoration: none;
      }

      .btn:hover {
        text-decoration: none;
      }

      .btn:active {
        box-shadow: #d4c9ce 0 3px 5px inset;
        outline: 0;
      }

      .btn:not([disabled]):active {
        box-shadow: #fff 2px 2px 0 0, #d4c9ce 2px 2px 0 1px;
        transform: translate(2px, 2px);
      }

      @media (min-width: 768px) {
        .button-50 {
          padding: 12px 50px;
        }
      }
    }
  }
}
</style>
