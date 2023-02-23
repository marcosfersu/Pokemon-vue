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
    <article class="stats-info">
      <div class="stats-info-detail card detail-card">
        <div class="stats-rapper item-info">
          <p>weight</p>
          <div class="line"></div>
          <p class="stat-value">{{ fixWeightHeight(weight) }} kg</p>
        </div>
        <div class="stats-rapper item-info">
          <p>height</p>
          <div class="line"></div>
          <p class="stat-value">{{ fixWeightHeight(height) }} m</p>
        </div>
        <div v-for="stat in stats" :key="stat.name" class="item-info">
          <p class="stat-name">{{ stat.name }}</p>
          <div class="line"></div>
          <p class="stat-value">{{ stat.baseStat }}</p>
        </div>
      </div>
      <div class="abilites-info-detail stats-info-detail card detail-card">
        <div class="abilites-container">
          <div class="item-info">
            <p class="stat-name">abilities</p>
            <div class="line"></div>
            <div>
              <p class="stat-value" v-for="ability in abilities" :key="ability">
                {{ ability }}
              </p>
            </div>
          </div>
          <div class="item-info">
            <p class="stat-name">hidden abilities</p>
            <div class="line"></div>
            <div>
              <p
                class="stat-value"
                v-for="ability in abilitiesHidden"
                :key="ability"
              >
                {{ ability }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
    <EvoChange :idEvo="evoId" />
    <div class="card detail-card last-card">
      <p class="flavor-text">
        {{ flavorText }}
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import EvoChange from "@/components/EvoChange.vue";
import PokeIcon from "@/components/PokeIcon.vue";
import { fixNumb, fixWeightHeight, PokeStats } from "@/data";
import { defineProps, PropType } from "vue";

defineProps({
  flavorText: {
    type: String,
  },
  types: {
    type: Array as PropType<Array<string | undefined>>,
  },
  stats: {
    type: Array as PropType<Array<PokeStats>>,
  },
  abilities: {
    type: Array as PropType<Array<string>>,
  },
  abilitiesHidden: {
    type: Array as PropType<Array<string>>,
  },
  id: {
    type: Number,
  },

  evoId: {
    type: Number,
  },

  height: {
    type: Number,
  },

  weight: {
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
  height: 100%;
  overflow: auto;
  padding-right: 2em;

  @media screen and (max-width: 1200px) {
    padding-right: 0;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 5px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #b4b4b4;
  }

  .first-info-detail {
    display: flex;
    gap: 1.5em;

    @media screen and (max-width: 700px) {
      width: 100%;
    }

    .type-card {
      flex-direction: column;
      align-items: center;
      padding: 1em 2em;
      @media screen and (max-width: 700px) {
        width: 50%;
      }

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
          @media screen and (max-width: 550px) {
            width: 2.5em;
          }
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

      @media screen and (max-width: 700px) {
        width: 50%;
      }
    }
  }

  .stats-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .stats-info-detail {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    gap: 1em 4em;
    @media screen and (max-width: 550px) {
      grid-template-columns: 1fr;
    }
    .stats-rapper {
      margin-bottom: 1.5em;
    }
    .item-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1em;
      p {
        margin: 0;
        white-space: nowrap;
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

  .abilites-info-detail {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    gap: 1em 4em;

    .abilites-container {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }
  }

  .last-card {
    margin-bottom: 2em;
  }
}
</style>
