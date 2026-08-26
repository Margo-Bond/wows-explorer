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
        <span class="filter-label">Type</span>

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
        <span class="filter-label">Tier</span>

        <select v-model="tier" class="filter-control">
          <option :value="null">All tiers</option>

          <option v-for="tierOption in tiers" :key="tierOption" :value="tierOption">
            Tier {{ tierOption }}
          </option>
        </select>
      </label>
    </div>
  </section>
</template>

<style scoped lang="scss">
.ship-filters {
  padding: 20px;
  background: rgba(3, 20, 31, 0.75);
  border: 1px solid var(--color-border);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.2);
}

.filters-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.filters-title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.filters-grid {
  display: grid;
  grid-template-columns: minmax(240px, 2fr) repeat(3, minmax(150px, 1fr));
  gap: 12px;
}

.filter-field {
  display: grid;
  gap: 7px;
}

.filter-label {
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.filter-control {
  width: 100%;
  min-width: 0;
  height: 46px;
  padding: 0 14px;
  color: var(--color-text);
  background-color: rgba(0, 8, 14, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0;
  outline: none;
  transition:
    border-color 160ms ease,
    background-color 160ms ease;
}

.filter-control::placeholder {
  color: rgba(174, 185, 193, 0.65);
}

.filter-control:hover {
  border-color: rgba(255, 255, 255, 0.4);
}

.filter-control:focus {
  background-color: rgba(0, 8, 14, 0.8);
  border-color: var(--color-accent);
}

.filter-control:disabled {
  color: rgba(174, 185, 193, 0.45);
  cursor: not-allowed;
}

.reset-button {
  padding: 4px 0;
  color: var(--color-accent);
  background: none;
  border: 0;
  font-size: 13px;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: opacity 160ms ease;
}

.reset-button:hover:not(:disabled) {
  opacity: 0.7;
}

.reset-button:disabled {
  color: var(--color-text-secondary);
  cursor: default;
  opacity: 0.35;
}

@media (max-width: 1023px) {
  .filters-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .filter-search {
    grid-column: 1 / -1;
  }
}

@media (max-width: 600px) {
  .ship-filters {
    padding: 16px;
  }

  .filters-grid {
    grid-template-columns: 1fr;
  }

  .filter-search {
    grid-column: auto;
  }
}
</style>
