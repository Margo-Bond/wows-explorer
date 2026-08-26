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
  <TransitionGroup name="ship-grid" class="ship-list" tag="ul">
    <ShipCard
      v-for="(ship, index) in visibleShips"
      :key="ship.id"
      :ship="ship"
      :is-priority="index === 0"
    />
  </TransitionGroup>

  <div v-if="hasMoreShips" ref="loadMoreTarget" class="load-more-target" aria-hidden="true"></div>
</template>

<style scoped lang="scss">
.ship-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.load-more-target {
  height: 1px;
}

.ship-grid-enter-active,
.ship-grid-leave-active {
  transition:
    opacity 280ms ease,
    transform 280ms cubic-bezier((0.25, 0.46, 0.45, 0.94));
}

.ship-grid-enter-from {
  opacity: 0;
  transform: translateY(14px);
}

.ship-grid-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.ship-grid-move {
  transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@media (max-width: 1100px) {
  .ship-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .ship-list {
    grid-template-columns: 1fr;
  }
}
</style>
