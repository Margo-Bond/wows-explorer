<script setup lang="ts">
import type { ShipListItem } from '../types/ship'

withDefaults(
  defineProps<{
    ship: ShipListItem
    isPriority?: boolean
  }>(),
  {
    isPriority: false,
  },
)
</script>

<template>
  <li class="ship-card">
    <div class="ship-image-wrapper">
      <img
        v-if="ship.imageUrl"
        class="ship-image"
        :src="ship.imageUrl"
        :alt="ship.name"
        :loading="isPriority ? 'eager' : 'lazy'"
        :fetchpriority="isPriority ? 'high' : 'auto'"
        decoding="async"
      />

      <div v-else class="ship-image-placeholder" aria-hidden="true"></div>
    </div>

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

.ship-image-wrapper {
  width: 100%;
  overflow: hidden;

  aspect-ratio: 3/1;
}

.ship-image,
.ship-image-placeholder {
  width: 100%;
  height: 100%;
}

.ship-image {
  display: block;
  object-fit: contain;
}

.ship-image-placeholder {
  background-color: #20262d;
}

.ship-content {
  padding: 12px;
}

.ship-title {
  margin: 0;
}

.ship-details {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}
</style>
