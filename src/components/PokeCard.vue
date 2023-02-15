<template>
  <article class="contianer">
    <div :class="[`poke-card ${types ? types[0] : ``}`]">
      <div class="poke-img-container">
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
import { defineProps } from "vue";

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
    type: Array,
  },
});

const fixNumb = (numb: number | undefined) => {
  return String(numb).padStart(3, "0");
};
</script>

<style scope lang="scss">
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

  &:hover {
    transform: scale(0.95);
    transition: transform 0.25s ease-in-out;
  }

  &:hover .poke-img-container img {
    transform: scale(1.3);
    transition: transform 0.25s ease-in-out;
  }

  .poke-img-container {
    width: 100%;
    img {
      width: 100%;
      object-fit: cover;
      z-index: 3;
      transition: transform 0.15s ease-in-out;
    }
  }
}

.poke-card.grass {
  background: linear-gradient(192.43deg, #d2eedd 6.84%, #a9d7bc 97.29%);
}
.poke-card.electric {
  background: linear-gradient(192.43deg, #fff9c5 6.84%, #fef496 97.29%);
}
.poke-card.water {
  background: linear-gradient(192.43deg, #cce8ff 6.84%, #9dcdf3 97.29%);
}
.poke-card.bug {
  background: linear-gradient(192.43deg, #ebffc2 6.84%, #d1f487 97.29%);
}
.poke-card.fly {
  background: linear-gradient(192.43deg, #dce9ff 6.84%, #9cb9eb 97.29%);
}
.poke-card.normal {
  background: linear-gradient(192.43deg, #ebeff5 6.84%, #dadde3 97.29%);
}
.poke-card.poison {
  background: linear-gradient(192.43deg, #f6dffe 6.84%, #bf94cd 97.29%);
}

.poke-id {
  background-color: black;
  font-size: 0.9em;
  padding: 0.3em 1.1em;
  border-radius: 2em;
  color: #fff;
}

.poke-card.fire .poke-id {
  background: rgba(158, 70, 5, 0.67);
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
</style>
