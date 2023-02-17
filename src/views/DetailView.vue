<template>
  <section class="detail-poke-container">
    <div>
      <PokeDetailCard
        v-for="detail in detailPoke"
        :key="detail.id"
        :name="detail.name"
        :nameJp="detail.nameJp"
        :id="detail.id"
        :types="detail.types"
        :artwork="detail.officialArtwork"
        :artworkShiny="detail.officialArtworkShiny"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import PokeDetailCard from "@/components/pokeDetailCard.vue";
import { usePokeStore } from "@/store";
import { onBeforeMount, onMounted, ref, Ref } from "vue";
import { useRoute } from "vue-router";

const pokeActions = usePokeStore();
let pokeId: Ref = ref("0");
let detailPoke: Ref = ref([
  {
    name: "",
  },
]);

onBeforeMount(() => {
  const route = useRoute();
  pokeId.value = route.params.id;
});

onMounted(() => {
  detailPoke.value = pokeActions.getDetailPoke(pokeId.value);
});
</script>
<style lang="scss" scoped>
.detail-poke-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
  & > div {
    height: 100%;
    width: 100%;
    max-width: 1800px;
    display: grid;
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
