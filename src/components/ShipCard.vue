<script setup lang="ts">
import type { ShipListItem } from '../types/ship'

defineProps<{
  ship: ShipListItem
}>()
</script>

<template>
  <li class="ship-card">
    <img class="ship-image" :src="ship.imageUrl" :alt="ship.name" loading="lazy" decoding="async" />

    <div class="ship-content">
      <h2 class="ship-title">{{ ship.name }}</h2>
      <div class="ship-details">
        <span>Tier {{ ship.tier }}</span>
        <span>{{ ship.nationName }}</span>
        <span v-if="ship.typeName">{{ ship.typeName }}</span>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.ship-card {
  list-style: none;
}

.ship-image {
  display: block;
  width: 100%;
  height: auto;
}

.ship-content {
  padding: 12px;
}

.ship-title {
  margin: 0;
}

.ship-details {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
}
</style>
