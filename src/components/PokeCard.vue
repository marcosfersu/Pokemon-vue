<template>
  <article class="contianer">
    <div :class="[`poke-card ${types ? types[0] : ``}`]">
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
</template>

<script lang="ts" setup>
import PokeBgSvg from "@/components/PokeBgSvg.vue";
import PokeIcon from "@/components/PokeIcon.vue";
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

const fixNumb = (numb: number | undefined) => {
  return String(numb).padStart(3, "0");
};
</script>

<style scoped lang="scss">
.poke-card {
  background: linear-gradient(192.43deg, #ffebcd 6.84%, #ffbe8e 97.29%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 3em;
  border: solid #fffdec 0.7em;
  box-shadow: 0px 2px 20px 5px rgba(0, 0, 0, 0.07);
  min-width: 15em;
  padding: 2em 1em;
  transition: transform 0.15s ease-in-out;
  cursor: pointer;

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

.poke-card.grass {
  background: linear-gradient(192.43deg, #d2eedd 6.84%, #a9d7bc 97.29%);
  .poke-bg-svg svg g path {
    fill: #e8ffea;
  }
  .poke-id {
    background: #669a64;
  }
}
.poke-card.electric {
  background: linear-gradient(192.43deg, #fff9c5 6.84%, #fef496 97.29%);
  .poke-bg-svg svg g path {
    fill: #fffce9;
  }
  .poke-id {
    background: #a39622;
  }
}
.poke-card.water {
  background: linear-gradient(192.43deg, #cce8ff 6.84%, #9dcdf3 97.29%);
  .poke-bg-svg svg g path {
    fill: #e9f8fd;
  }
  .poke-id {
    background: #4c8bab;
  }
}
.poke-card.bug {
  background: linear-gradient(192.43deg, #ebffc2 6.84%, #d1f487 97.29%);
  .poke-bg-svg svg g path {
    fill: #f4ffdc;
  }
  .poke-id {
    background: #87ab68;
  }
}
.poke-card.fly {
  background: linear-gradient(192.43deg, #dce9ff 6.84%, #9cb9eb 97.29%);
}
.poke-card.normal {
  background: linear-gradient(192.43deg, #ebeff5 6.84%, #dadde3 97.29%);
  .poke-bg-svg svg g path {
    fill: #f8f8f8;
  }
  .poke-id {
    background: #979797;
  }
}
.poke-card.poison {
  background: linear-gradient(192.43deg, #f6dffe 6.84%, #bf94cd 97.29%);
  .poke-bg-svg svg g path {
    fill: #fcddff;
  }
  .poke-id {
    background: #957793;
  }
}
.poke-card.fire {
  background: linear-gradient(192.43deg, #ffebcd 6.84%, #ffbe8e 97.29%);
  .poke-bg-svg svg g path {
    fill: #ffeade;
  }
  .poke-id {
    background: rgba(158, 70, 5, 0.67);
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
