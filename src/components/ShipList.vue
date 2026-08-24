<script setup lang="ts">
import ShipCard from './ShipCard.vue'
import type { ShipListItem } from '../types/ship'

defineProps<{
  ships: ShipListItem[]
}>()
</script>

<template>
  <div class="ship-list">
    <ShipCard v-for="ship in ships" :key="ship.id" :ship="ship" />
  </div>
</template>

<style setup lang="scss">
.ship-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
</style>
