<template>
  <article
    :class="[`detail-img card ${types ? types[0] : ``}`]"
    ref="target"
    :style="{
      transform: cardTransform,
      transition: `tranform 0.25s ease-out`,
    }"
  >
    <div class="dateil-top">
      <div class="poke-types">
        <PokeIcon v-for="elment in types" :key="elment" :name="elment" />
      </div>
      <ShinyBtn @swicthShiny="show = $event" />
    </div>
    <img v-show="!show" :src="artwork" :alt="name" />
    <img v-show="show" :src="artworkShiny" :alt="name" />

    <div class="name-container">
      <h1>{{ name }}</h1>
      <h3>{{ nameJp }}</h3>
    </div>
  </article>
</template>
<script setup lang="ts">
import PokeIcon from "@/components/PokeIcon.vue";
import ShinyBtn from "@/components/ShinyBtn.vue";
import { useMouseInElement } from "@vueuse/core";
import { computed, defineProps, PropType, ref } from "vue";

const target = ref(null);
const { elementX, elementY, isOutside, elementHeight, elementWidth } =
  useMouseInElement(target);

const cardTransform = computed(() => {
  const MAX_ROTATION = 2;

  const rX = (
    MAX_ROTATION / 2 -
    (elementY.value / elementHeight.value) * MAX_ROTATION
  ).toFixed(2); // handles x-axies

  const rY = (
    (elementX.value / elementHeight.value) * MAX_ROTATION -
    MAX_ROTATION / 2
  ).toFixed(2); // handles y-axies

  return isOutside.value
    ? ""
    : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
});

defineProps({
  name: {
    type: String,
  },

  nameJp: {
    type: String,
  },
  id: {
    type: Number,
  },
  types: {
    type: Array as PropType<Array<string | undefined>>,
  },

  artwork: {
    type: String,
  },
  artworkShiny: {
    type: String,
  },
});

let show = ref(false);
</script>

<style lang="scss" scoped>
.detail-img.card {
  height: 80%;
  padding: 2em;
  justify-content: space-between;
  & > img {
    height: 100%;
    object-fit: cover;
  }

  .poke-types {
    display: flex;
    gap: 1em;

    & svg {
      width: 4em;
    }
  }

  .dateil-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .name-container {
    text-align: center;
    h1 {
      margin: 0;
      font-size: 2.8vw;
      font-weight: 400;
    }

    h3 {
      margin: 0.2rem 0 0 0;
      font-size: 1.5vw;
      font-weight: 200;
    }
  }
}
</style>
