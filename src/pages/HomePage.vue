<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { fetchShips, fetchShipTypes, fetchNations, fetchMediaBaseUrl } from '../api/vortexApi'

import ShipList from '../components/ShipList.vue'
import ShipFilters from '../components/ShipFilters.vue'
import ErrorState from '../components/ErrorState.vue'

import type {
  ShipsById,
  ShipTypesByName,
  ShipListItem,
  ShipFilterOption,
  Nation,
} from '../types/ship'

const ships = ref<ShipsById>({})
const shipTypes = ref<ShipTypesByName>({})
const nations = ref<Nation[]>([])
const mediaBaseUrl = ref('')

const isLoading = ref(false)
const hasShipsError = ref(false)

const searchQuery = ref('')
const selectedNation = ref('')
const selectedType = ref('')
const selectedTier = ref<number | null>(null)

const shipList = computed<ShipListItem[]>(() => {
  const nationsByName = new Map(nations.value.map((nation) => [nation.name, nation]))

  const shipTypeEntries = Object.entries(shipTypes.value)

  return Object.entries(ships.value).map(([id, ship]) => {
    const nation = nationsByName.get(ship.nation)

    const typeEntry = shipTypeEntries.find(([typeKey]) => ship.tags.includes(typeKey))

    const [typeKey, type] = typeEntry ?? []

    return {
      id,
      name: ship.localization.mark.en,
      tier: ship.level,
      nationKey: ship.nation,
      nationName: nation?.localization.mark.en ?? ship.nation,
      typeKey: typeKey ?? null,
      typeName: type?.localization.mark.en ?? null,
      imageUrl: mediaBaseUrl.value ? `${mediaBaseUrl.value}${ship.icons.medium}` : null,
    }
  })
})

const nationOptions = computed<ShipFilterOption[]>(() => {
  const nationLabels = new Map(
    nations.value.map((nation) => [nation.name, nation.localization.mark.en]),
  )

  const nationKeys = [...new Set(Object.values(ships.value).map((ship) => ship.nation))]

  return nationKeys
    .map((nationKey) => ({
      value: nationKey,
      label: nationLabels.get(nationKey) ?? nationKey,
    }))
    .sort((first, second) => first.label.localeCompare(second.label))
})

const shipTypeOptions = computed<ShipFilterOption[]>(() => {
  return Object.entries(shipTypes.value)
    .sort(([, first], [, second]) => {
      return first.sort_order - second.sort_order
    })
    .map(([typeKey, type]) => ({
      value: typeKey,
      label: type.localization.mark.en,
    }))
})

const availableTiers = computed(() => {
  return [...new Set(Object.values(ships.value).map((ship) => ship.level))].sort(
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
  hasShipsError.value = false

  const shipsRequest = fetchShips()
  const mediaRequest = fetchMediaBaseUrl().catch(() => null)

  void loadShipCatalogMetadata()

  try {
    const [shipsData, mediaBaseUrlData] = await Promise.all([shipsRequest, mediaRequest])

    ships.value = shipsData
    mediaBaseUrl.value = mediaBaseUrlData ?? ''
  } catch {
    ships.value = {}
    hasShipsError.value = true
  } finally {
    isLoading.value = false
  }
}

function loadShipCatalogMetadata() {
  return Promise.allSettled([
    fetchNations().then((data) => {
      nations.value = data
    }),
    fetchShipTypes().then((data) => {
      shipTypes.value = data
    }),
  ])
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

    <ErrorState v-else-if="hasShipsError" @retry="loadShipCatalog" />

    <template v-else>
      <ShipFilters
        v-model:search="searchQuery"
        v-model:nation="selectedNation"
        v-model:ship-type="selectedType"
        v-model:tier="selectedTier"
        :nation-options="nationOptions"
        :ship-type-options="shipTypeOptions"
        :tiers="availableTiers"
        @reset="resetFilters"
      />

      <section class="ship-results">
        <p class="results-count">
          Showing {{ filteredShips.length }} of {{ shipList.length }} ships
        </p>

        <div v-if="filteredShips.length === 0" class="empty-state">
          <p class="empty-text">No ship found. Try changing the filters.</p>
        </div>

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

.empty-state {
  text-align: center;
}

.empty-text {
  margin: 8px 0;
}
</style>
