<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { fetchShips } from './api/shipsApi'
import ErrorState from './components/ErrorState.vue'
import type { ShipsById } from './types/ship'

const ships = ref<ShipsById>({})
const isLoading = ref(false)
const hasError = ref(false)

async function loadShips() {
  isLoading.value = true
  hasError.value = false

  try {
    ships.value = await fetchShips()
  } catch {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(loadShips)
</script>

<template>
  <main class="app">
    <h1>WoWS Explorer</h1>

    <p v-if="isLoading">Loading ships...</p>

    <ErrorState v-else-if="hasError" @retry="loadShips" />

    <p v-else>Ships loaded: {{ Object.keys(ships).length }}</p>
  </main>
</template>

<style scoped lang="scss">
.app {
  min-height: 100dvh;
}
</style>
