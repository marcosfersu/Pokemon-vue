<template>
  <section class="info-poke-detail">
    <article class="first-info-detail">
      <div class="card detail-card id-card">#{{ fixNumb(id) }}</div>
      <div class="card detail-card type-card">
        <h3 class="detail-title">type</h3>
        <div class="poke-types">
          <PokeIcon v-for="elment in types" :key="elment" :name="elment" />
        </div>
      </div>
    </article>
    <article class="stats-info-detail card detail-card">
      <div v-for="stat in stats" :key="stat.name">
        <p class="stat-name">{{ stat.name }}</p>
        <div class="line"></div>
        <p class="stat-value">{{ stat.baseStat }}</p>
      </div>
    </article>
    <EvoChange :idEvo="evoId" />
    <div class="card detail-card">
      <p class="flavor-text">
        {{ flavorText }}
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import EvoChange from "@/components/EvoChange.vue";
import PokeIcon from "@/components/PokeIcon.vue";
import { fixNumb, PokeStats } from "@/data";
import { defineProps, PropType } from "vue";

defineProps({
  flavorText: {
    type: String,
  },
  types: {
    type: Array as PropType<Array<string | undefined>>,
  },
  id: {
    type: Number,
  },
  stats: {
    type: Array as PropType<Array<PokeStats>>,
  },

  evoId: {
    type: Number,
  },
});
</script>
<style scoped lang="scss">
.info-poke-detail {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2em;
  height: 85vh;
  overflow: auto;
  .first-info-detail {
    display: flex;
    gap: 1.5em;
    .type-card {
      flex-direction: column;
      align-items: center;
      padding: 1em 2em;
      .detail-title {
        font-weight: 100;
        font-size: 2em;
        margin: 0 0 0.7em 0;
      }

      .poke-types {
        display: flex;
        gap: 1em;
        svg {
          width: 3em;
        }
      }
    }

    .id-card {
      font-weight: 500;
      font-size: 2em;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 5em;
    }
  }

  .stats-info-detail {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    gap: 1em 4em;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1em;
      p {
        margin: 0;
      }

      .stat-value {
        font-weight: 700;
      }
      .line {
        width: 100%;
        height: 1px;
        background-color: black;
      }
    }
  }
  .flavor-text {
    margin: 0;
  }
}
</style>
