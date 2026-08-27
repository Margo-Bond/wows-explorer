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

function selectShipType(value: string) {
  shipType.value = value
}
</script>

<template>
  <section class="ship-filters" aria-label="Ship filters">
    <div class="filters-header">
      <p class="filters-title">Filters</p>
      <button
        class="reset-button"
        type="button"
        :disabled="!hasActiveFilters"
        @click="emit('reset')"
      >
        Reset filters
      </button>
    </div>

    <div class="filters-grid">
      <label class="filter-field filter-search">
        <span class="filter-label">Search</span>
        <input
          v-model="search"
          class="filter-control"
          type="search"
          placeholder="Search by ship name"
        />
      </label>

      <label class="filter-field">
        <span class="filter-label">Nation</span>

        <select v-model="nation" class="filter-control">
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
        <span class="filter-label">Tier</span>

        <select v-model="tier" class="filter-control">
          <option :value="null">All tiers</option>

          <option v-for="tierOption in tiers" :key="tierOption" :value="tierOption">
            Tier {{ tierOption }}
          </option>
        </select>
      </label>

      <div class="type-filter">
        <span class="filter-label">Ship type</span>
        <div class="type-options">
          <button
            type="button"
            class="type-option"
            :class="{ 'type-option-active': shipType === '' }"
            @click="selectShipType('')"
          >
            All types
          </button>

          <button
            v-for="shipTypeOption in shipTypeOptions"
            :key="shipTypeOption.value"
            type="button"
            class="type-option"
            :class="{ 'type-option-active': shipType === shipTypeOption.value }"
            @click="selectShipType(shipTypeOption.value)"
          >
            {{ shipTypeOption.label }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.ship-filters {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 16px;
  background-color: rgba(4, 13, 28, 0.95);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(10px);
}

.filters-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.filters-title {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.filters-grid {
  display: grid;
  grid-template-columns: minmax(260px, 2fr) repeat(2, minmax(150px, 1fr));
  gap: 8px;
}

.filter-field {
  display: grid;
  gap: 6px;
}

.ship-filters,
.filter-grid,
.filter-field {
  min-width: 0;
}

.filter-search {
  width: 100%;
}

.filter-search .filter-control {
  width: 100%;
  min-width: 0;
}

.filter-label {
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.filter-control {
  width: 100%;
  min-width: 0;
  height: 42px;
  padding: 0 10px;
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid rgba(0, 180, 216, 0.2);
  border-radius: 0;
  outline: none;
  transition:
    border-color 180ms ease,
    background-color 180ms ease,
    box-shadow 180ms ease;
}

.filter-control::placeholder {
  color: rgba(138, 180, 208, 0.5);
}

.filter-control:hover:not(:disabled) {
  border-color: rgba(0, 180, 216, 0.35);
}

.filter-control:focus {
  background-color: #081a30;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 1px rgba(0, 180, 216, 0.2);
}

.filter-control:disabled {
  color: rgba(174, 185, 193, 0.45);
  cursor: not-allowed;
  opacity: 0.6;
}

.type-filter {
  display: grid;
  grid-column: 1/4;
  gap: 7px;
  margin-top: 12px;
}

.type-options {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.type-option {
  min-height: 32px;
  padding: 0 12px;
  color: rgba(190, 107, 238, 0.6);
  background: transparent;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition:
    color 160ms ease,
    border-color 160ms ease,
    background-color 160ms ease;
}

.type-option:hover {
  color: var(--color-text);
  border-color: rgba(0, 180, 216, 0.2);
}

.type-option-active {
  color: var(--color-accent);
  background-color: rgba(0, 180, 216, 0.1);
  border-color: rgba(0, 180, 216, 0.45);
}

.reset-button {
  padding: 2px 0;
  color: var(--color-accent);
  background: none;
  border: 0;
  font-size: 16px;
  text-decoration: underline;
  text-underline-offset: 4px;
  transition: opacity 160ms ease;
}

.reset-button:hover:not(:disabled) {
  opacity: 0.7;
}

.reset-button:disabled {
  color: var(--color-text-secondary);
  cursor: default;
  opacity: 0.3;
}

@media (max-width: 900px) {
  .filters-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .ship-filters {
    position: static;
    padding: 10px;
    backdrop-filter: none;
  }

  .filters-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .filter-search {
    grid-column: 1/4;
  }
}
</style>
