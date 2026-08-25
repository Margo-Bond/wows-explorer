<script setup lang="ts">
import { computed } from 'vue'

import type { ShipFilterOption } from '../types/ship'

defineProps<{
  nationOptions: ShipFilterOption[]
  shipTypeOptions: ShipFilterOption[]
  tiers: number[]
}>()

const search = defineModel<string>('search', { required: true })
const nation = defineModel<string>('nation', { required: true })
const shipType = defineModel<string>('shipType', { required: true })
const tier = defineModel<number | null>('tier', { required: true })

const emit = defineEmits<{
  reset: []
}>()

const hasActiveFilters = computed(() => {
  return Boolean(search.value.trim() || nation.value || shipType.value || tier.value !== null)
})
</script>

<template>
  <section class="ship-filters" aria-labelledby="filters-title">
    <h2 id="filters-title" class="filters-title">Filters</h2>
    <label class="filter*field">
      <span>Search</span>
      <input v-model="search" type="search" placeholder="Search by ship name" />
    </label>

    <label class="filter-field">
      <span>Nation</span>
      <select v-model="nation">
        <option value="">All nations</option>
        <option
          v-for="nationOption in nationOptions"
          :key="nationOption.value"
          :value="nationOption.value"
        >
          {{ nationOption.label }}
        </option>
      </select>
    </label>

    <label class="filter-field">
      <span>Type</span>
      <select v-model="shipType" :disabled="shipTypeOptions.length === 0">
        <option value="">All types</option>
        <option
          v-for="shipTypeOption in shipTypeOptions"
          :key="shipTypeOption.value"
          :value="shipTypeOption.value"
        >
          {{ shipTypeOption.label }}
        </option>
      </select>
    </label>

    <label class="filter-field">
      <span>Tier</span>
      <select v-model="tier">
        <option :value="null">All tiers</option>
        <option v-for="tierOption in tiers" :key="tierOption" :value="tierOption">
          Tier {{ tierOption }}
        </option>
      </select>
    </label>

    <button type="button" :disabled="!hasActiveFilters" @click="emit('reset')">
      Reset filters
    </button>
  </section>
</template>

<style scoped lang="scss">
.ship-filters {
  display: grid;
  gap: 16px;
}

.filters-title {
  margin: 0;
}

.filter-field {
  display: grid;
  gap: 6px;
}
</style>
