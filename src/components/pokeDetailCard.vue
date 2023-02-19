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
      <div>
        <IconFirstGen />
      </div>
      <ShinyBtn @swicthShiny="show = $event" />
    </div>
    <img v-show="!show" :src="artwork" :alt="name" />
    <img v-show="show" :src="artworkShiny" :alt="name" />
    <div class="poke-bg-svg">
      <PokeBgDetailSvg />
    </div>

    <div class="name-container">
      <h1>{{ name }}</h1>
      <h3>{{ nameJp }}</h3>
    </div>
  </article>
</template>
<script setup lang="ts">
import IconFirstGen from "@/assets/icons/IconFirstGen.vue";
import PokeBgDetailSvg from "@/components/PokeBgDetailSvg.vue";
import ShinyBtn from "@/components/ShinyBtn.vue";
import { useMouseInElement } from "@vueuse/core";
import { computed, defineProps, onBeforeMount, PropType, ref, Ref } from "vue";
import { useRoute } from "vue-router";
let pokeId: Ref = ref("0");

onBeforeMount(() => {
  const route = useRoute();
  pokeId.value = Number(route.params.id);
});

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

  types: {
    type: Array as PropType<Array<string | undefined>>,
  },
  nameJp: {
    type: String,
  },
  id: {
    type: Number,
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
  height: 85vh;
  padding: 2em;
  justify-content: space-between;
  position: relative;
  box-sizing: border-box;
  & > img {
    height: 100%;
    max-height: 60vh;
    object-fit: cover;
    z-index: 4;

    @media screen and (max-width: 2000px) {
      max-height: 100%;
    }
  }

  .poke-bg-svg {
    position: absolute;
    width: 80%;
    height: 80%;
    z-index: 0;
    left: 50%;
    top: 50px;
    transform: translate(-50%, 0%);
    filter: opacity(0.3);
    svg {
      width: 100%;
      height: 100%;
    }
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
    z-index: 3;
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
