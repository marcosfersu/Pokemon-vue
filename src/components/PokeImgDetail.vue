<template>
  <img v-show="isLoaded" :src="artwork" loading="lazy" />
</template>
<script setup lang="ts">
import { defineProps, ref, watch } from "vue";

const props = defineProps({
  artwork: {
    type: String,
  },
});

const isLoaded = ref(false);

watch(
  () => props.artwork,
  (image) => {
    isLoaded.value = false;

    const img = new Image();
    img.onload = () => (isLoaded.value = true);
    if (image) img.src = image;
  },
  { immediate: true }
);
</script>
