<template>
  <section class="types-container">
    <div
      v-for="types in allTypePoke"
      :key="types.type"
      class="card"
      :class="types.type"
    >
      <PokeIcon :name="types.type" />
      <h1>
        {{ types.type }}
      </h1>
      <div class="poke-type-container">
        <div
          v-for="(poke, index) in types.pokesTypes"
          :key="index"
          class="poke-card-little"
        >
          <router-link :to="{ name: `detailPoke`, params: { id: poke.id } }">
            <PokeCardInner
              :name="poke.name"
              :nameJp="poke.nameJp"
              :sprites="poke.sprites"
              :id="poke.id"
            />
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import PokeCardInner from "@/components/PokeCardInner.vue";
import PokeIcon from "@/components/PokeIcon.vue";
import { IType, PokeInfo } from "@/data";
import { usePokeStore } from "@/store";
import { computed, onBeforeMount, ref, Ref } from "vue";
const pokeActions = usePokeStore();

const urlTypes = "https://pokeapi.co/api/v2/type/";

const typesListActual: Ref<{ name: string }[]> = ref([]);

onBeforeMount(async () => {
  const res = await fetch(urlTypes);
  const typesList = await res.json();
  typesListActual.value = typesList.results;
});

const allTypePoke = computed(() => {
  const listAlltypes: IType[] = [];
  typesListActual.value.map((type: { name: string }) => {
    const actualType: IType = {
      type: "",
      pokesTypes: [],
    };
    actualType.type = type.name;
    pokeActions.pokeStore.map((poke: PokeInfo) => {
      poke.types.map((pokeType: string) => {
        if (pokeType === type.name) {
          actualType.pokesTypes.push(poke);
        }
      });
    });
    if (actualType.pokesTypes.length > 0) listAlltypes.push(actualType);
  });
  return listAlltypes;
});
</script>
<style lang="scss">
.types-container {
  margin: 0 5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7em;
  .card {
    padding: 3em;
    min-width: auto;
  }

  .poke-type-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3em;

    .poke-card-little a {
      width: 8em;
      display: flex;
      flex-direction: column;
      align-items: center;

      .poke-img-container {
        width: 100%;
        position: relative;

        .poke-bg-svg {
          position: absolute;
          width: 80%;
          height: 80%;
          z-index: 0;
          left: 50%;
          top: -25px;
          transform: translate(-50%, 0%);
          svg {
            transition: transform 0.15s ease-in-out;
            opacity: 0.7;
          }
        }

        img {
          width: 100%;
          object-fit: cover;
          z-index: 3;
          position: relative;
          transition: transform 0.15s ease-in-out;
        }
      }

      &:hover .poke-bg-svg svg {
        transform: rotate(-20deg);
        transition: transform 0.35s ease-in-out;
      }
    }
  }
}
</style>
