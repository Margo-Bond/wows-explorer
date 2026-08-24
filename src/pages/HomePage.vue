<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import ShipList from '../components/ShipList.vue'
import { fetchShips, fetchShipTypes, fetchNations, fetchMediaBaseUrl } from '../api/vortexApi'
import ErrorState from '../components/ErrorState.vue'
import type { ShipsById, ShipTypesByName, ShipListItem, Nation } from '../types/ship.ts'

const ships = ref<ShipsById>({})
const shipTypes = ref<ShipTypesByName>({})
const nations = ref<Nation[]>([])
const mediaBaseUrl = ref('')

const isLoading = ref(false)
const hasError = ref(false)

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

onMounted(loadShipCatalog)
</script>

<template>
  <main class="home-page">
    <h1>WoWS Explorer</h1>

    <p v-if="isLoading">Loading ships...</p>

    <ErrorState v-else-if="hasError" @retry="loadShipCatalog" />

    <ShipList v-else :ships="shipList" />
  </main>
</template>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
}
</style>
