<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { fetchShips, fetchShipTypes, fetchNations, fetchMediaBaseUrl } from '../api/vortexApi'
import ErrorState from '../components/ErrorState.vue'
import type { ShipsById, ShipTypesByName, Nation } from '../types/ship.ts'

const ships = ref<ShipsById>({})
const shipTypes = ref<ShipTypesByName>({})
const nations = ref<Nation[]>([])
const mediaBaseUrl = ref('')

const isLoading = ref(false)
const hasError = ref(false)

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

    <p v-else>
      Ships: {{ Object.keys(ships).length }}, Nations: {{ nations.length }}, Types:
      {{ Object.keys(shipTypes).length }}
    </p>
  </main>
</template>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
}
</style>
