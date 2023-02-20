<template>
  <router-link :to="{ name: `detailPoke`, params: { id: id } }">
    <article class="contianer">
      <div :class="[`poke-card card ${types ? types[0] : ``}`]">
        <div class="poke-img-container">
          <div class="poke-types">
            <PokeIcon v-for="elment in types" :key="elment" :name="elment" />
          </div>
          <div class="poke-bg-svg">
            <PokeBgSvg />
          </div>
          <img :src="sprites" :alt="name" />
        </div>
        <span class="poke-id">#{{ fixNumb(id) }} </span>
        <div class="poke-name">
          <p>
            {{ name }}
          </p>
          <p class="name-jp">
            {{ nameJp }}
          </p>
        </div>
      </div>
    </article>
  </router-link>
</template>

<script lang="ts" setup>
import PokeBgSvg from "@/components/PokeBgSvg.vue";
import PokeIcon from "@/components/PokeIcon.vue";
import { fixNumb } from "@/data";
import { defineProps, PropType } from "vue";

defineProps({
  name: {
    type: String,
  },

  nameJp: {
    type: String,
  },
  sprites: {
    type: String,
  },
  id: {
    type: Number,
  },
  types: {
    type: Array as PropType<Array<string | undefined>>,
  },
});
</script>

<style scoped lang="scss">
.poke-card.card {
  cursor: pointer;

  @media screen and (min-width: 800px) {
    &:hover {
      transform: scale(0.97);
      transition: all 0.25s ease-in-out;
      box-shadow: 0 0 11px rgba(0, 0, 0, 0.07);
    }

    &:hover .poke-img-container img {
      transform: scale(1.15);
      transition: transform 0.25s ease-in-out;
    }

    &:hover .poke-bg-svg svg {
      transform: rotate(-20deg);
      transition: transform 0.35s ease-in-out;
    }
  }

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
}

.poke-id {
  background-color: black;
  font-size: 0.9em;
  padding: 0.3em 1.1em;
  border-radius: 2em;
  color: #fff;
}

.poke-name {
  font-size: 1vw;
  text-transform: capitalize;
  margin-top: 0.5em;
  text-align: center;
  p {
    margin: 0;
  }

  .name-jp {
    font-size: 0.8vw;
  }
}

.poke-types {
  display: flex;
  position: absolute;
  top: -1em;
  gap: 0.5em;
}
</style>
