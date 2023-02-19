<template>
  <h1>pokemon list</h1>
  <div class="container">
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
import { usePokeStore } from "@/store";
const pokeActions = usePokeStore();

const pokes = pokeActions.pokeStore;
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.poke-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(19em, 1fr));
  gap: 4em;
  align-items: stretch;
  max-width: 100%;
  margin: 0 auto;
}
</style>
