<template>
  <img v-show="!toggle" :src="artwork" loading="lazy" v-on:load="onload" />
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
const toggle = ref(false);

const artwork =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png";
const onload = () => {
  console.log("load");
};
watchEffect(() => {
  toggle.value = false;
  console.log(toggle.value);
});
</script>
