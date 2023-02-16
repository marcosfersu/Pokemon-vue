<template>
  <component :is="icon" />
</template>

<script lang="ts" setup>
import { defineAsyncComponent, defineProps } from "vue";
const props = defineProps({
  name: {
    type: String,
  },
});

const icon = defineAsyncComponent(
  () => import(`@/assets/icons/Icon-${props.name}.vue`)
);
</script>

<style scoped lang="scss">
svg {
  width: 2em;
}
</style>
