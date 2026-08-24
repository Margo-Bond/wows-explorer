<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { fetchShips, fetchShipTypes, fetchNations, fetchMediaBaseUrl } from '../api/vortexApi'

import ShipList from '../components/ShipList.vue'
import ShipFilters from '../components/ShipFilters.vue'
import EmptyState from '../components/EmptyState.vue'
import ErrorState from '../components/ErrorState.vue'

import type { ShipsById, ShipTypesByName, ShipListItem, Nation } from '../types/ship.ts'

const ships = ref<ShipsById>({})
const shipTypes = ref<ShipTypesByName>({})
const nations = ref<Nation[]>([])
const mediaBaseUrl = ref('')

const isLoading = ref(false)
const hasError = ref(false)

const searchQuery = ref('')
const selectedNation = ref('')
const selectedType = ref('')
const selectedTier = ref<number | null>(null)

const shipList = computed<ShipListItem[]>(() => {
  const nationsByName = new Map(nations.value.map((nation) => [nation.name, nation]))

  return Object.entries(ships.value).map(([id, ship]) => {
    const nation = nationsByName.get(ship.nation)

    const typeEntry = Object.entries(shipTypes.value).find(([typeKey]) =>
      ship.tags.includes(typeKey),
    )

    const [typeKey, type] = typeEntry ?? []

    return {
      id,
      name: ship.localization.mark.en,
      tier: ship.level,
      nationKey: ship.nation,
      nationName: nation?.localization.mark.en ?? ship.nation,
      typeKey: typeKey ?? null,
      typeName: type?.localization.mark.en ?? null,
      imageUrl: `${mediaBaseUrl.value}${ship.icons.medium}`,
    }
  })
})

const availableTiers = computed(() => {
  return [...new Set(shipList.value.map((ship) => ship.tier))].sort(
    (first, second) => first - second,
  )
})

const filteredShips = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase()

  return shipList.value.filter((ship) => {
    const matchesSearch = !normalizedQuery || ship.name.toLowerCase().includes(normalizedQuery)

    const matchesNation = !selectedNation.value || ship.nationKey === selectedNation.value

    const matchesType = !selectedType.value || ship.typeKey === selectedType.value

    const matchesTier = selectedTier.value === null || ship.tier === selectedTier.value

    return matchesSearch && matchesNation && matchesType && matchesTier
  })
})

async function loadShipCatalog() {
  isLoading.value = true
  hasError.value = false

  try {
    const [shipsData, shipTypesData, nationsData, mediaBaseUrlData] = await Promise.all([
      fetchShips(),
      fetchShipTypes(),
      fetchNations(),
      fetchMediaBaseUrl(),
    ])

    ships.value = shipsData
    shipTypes.value = shipTypesData
    nations.value = nationsData
    mediaBaseUrl.value = mediaBaseUrlData
  } catch {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

function resetFilters() {
  searchQuery.value = ''
  selectedNation.value = ''
  selectedType.value = ''
  selectedTier.value = null
}

onMounted(loadShipCatalog)
</script>

<template>
  <main class="home-page">
    <h1>WoWS Explorer</h1>

    <p v-if="isLoading">Loading ships...</p>

    <ErrorState v-else-if="hasError" @retry="loadShipCatalog" />

    <template v-else>
      <ShipFilters
        v-model:search="searchQuery"
        v-model:nation="selectedNation"
        v-model:ship-type="selectedType"
        v-model:tier="selectedTier"
        :nations="nations"
        :ship-types="shipTypes"
        :tiers="availableTiers"
        @reset="resetFilters"
      />

      <section class="ship-results">
        <p class="results-count">
          Showing {{ filteredShips.length }} of {{ shipList.length }} ships
        </p>

        <EmptyState v-if="filteredShips.length === 0" @reset="resetFilters" />

        <ShipList v-else :ships="filteredShips" />
      </section>
    </template>
  </main>
</template>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
}

.ship-results {
  margin-top: 24px;
}

.results-count {
  margin: 0 0 16px;
}
</style>
