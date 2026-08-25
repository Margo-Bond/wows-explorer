<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import ShipCard from './ShipCard.vue'
import type { ShipListItem } from '../types/ship'

const props = defineProps<{
  ships: ShipListItem[]
}>()

const INITIAL_RENDER_COUNT = 24
const RENDER_BATCH_SIZE = 24

const visibleCount = ref(INITIAL_RENDER_COUNT)
const loadMoreTarget = ref<HTMLElement | null>(null)

const visibleShips = computed(() => {
  return props.ships.slice(0, visibleCount.value)
})

const hasMoreShips = computed(() => {
  return visibleCount.value < props.ships.length
})

let observer: IntersectionObserver | null = null

function loadMoreShips() {
  if (!hasMoreShips.value) return

  visibleCount.value = Math.min(visibleCount.value + RENDER_BATCH_SIZE, props.ships.length)
}

watch([() => props.ships.length, () => props.ships[0]?.id], () => {
  visibleCount.value = INITIAL_RENDER_COUNT
})

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        loadMoreShips()
      }
    },
    {
      rootMargin: '500px 0px',
    },
  )

  if (loadMoreTarget.value) {
    observer.observe(loadMoreTarget.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <ul class="ship-list">
    <ShipCard
      v-for="(ship, index) in visibleShips"
      :key="ship.id"
      :ship="ship"
      :is-priority="index === 0"
    />

    <li ref="loadMoreTarget" class="load-more-target" aria-hidden="true" />
  </ul>
</template>

<style scoped lang="scss">
.ship-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.load-more-target {
  grid-column: 1 / -1;
  height: 1px;
}
</style>
