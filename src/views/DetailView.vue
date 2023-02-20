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
        <router-link
          :to="{ name: `detailPoke`, params: { id: filter.id - 1 } }"
        >
          <button class="btn plus" :disabled="filter.id <= 1">-1</button>
        </router-link>
        <router-link
          :to="{ name: `detailPoke`, params: { id: filter.id + 1 } }"
        >
          <button class="btn plus" :disabled="filter.id >= 151">+1</button>
        </router-link>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import InfoPokeDetail from "@/components/InfoPokeDetail.vue";
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

  & > div {
    height: 85%;
    width: 100%;
    max-width: 1800px;
    display: grid;
    align-items: center;
    grid-template-columns: 50% 34rem;
    gap: 2vw;
    grid-template-areas:
      "card detail"
      "card btn";

    .btn-container {
      grid-area: btn;
    }
  }
}
</style>
