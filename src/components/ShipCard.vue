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
        <div>
          <span>{{ ship.nationName }}</span>
          <span v-if="ship.typeName">{{ ship.typeName }}</span>
        </div>

        <span class="ship-tier">Tier {{ ship.level }}</span>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.ship-card {
  position: relative;
  display: grid;
  grid-template-columns: 42% minmax(0, 1fr);
  min-height: 176px;
  overflow: hidden;
  list-style: none;
  background: var(--color-surface);
  border: 1px solid rgba(0, 180, 216, 0.15);
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease;
}

.ship-card::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  background: var(--color-accent);
  content: '';
  opacity: 0;
  transform: scaleX(0);
  transform-origin: left;
  transition:
    opacity 240ms ease,
    transform 240ms ease;
}

.ship-card:hover {
  border-color: rgba(0, 180, 216, 0.4);
  box-shadow: 0 8px 32px rgba(0, 180, 216, 0.1);
  transform: translateY(-2px);
}

.ship-card:hover::after {
  opacity: 1;
  transform: scaleX(1);
}

.ship-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  aspect-ratio: auto;
  background-color: #0a1e3a;
}

.ship-image-wrapper::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 32%;
  background: linear-gradient(to right, transparent, var(--color-surface));
  content: '';
  pointer-events: none;
}

.ship-image,
.ship-image-placeholder {
  width: 100%;
  height: 100%;
}

.ship-image {
  display: block;
  object-fit: contain;
  transition:
    transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
    filter 500ms ease;
}

.ship-card:hover .ship-image {
  filter: brightness(1.1);
  transform: scale(1.04);
}

.ship-image-placeholder {
  background-color: #0a1e3a;
}

.ship-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  padding: 20px;
  gap: 10px;
}

.ship-title {
  margin: 0;
  overflow: hidden;
  font-size: 24px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.ship-details {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.ship-details span + span::before {
  margin-right: 12px;
  color: rgba(138, 180, 208, 0.35);
  content: '';
}

.ship-tier {
  flex-shrink: 0;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

@media (max-width: 600px) {
  .ship-card {
    grid-template-columns: 1fr;
  }

  .ship-image-wrapper {
    aspect-ratio: 16/9;
  }

  .ship-image-wrapper::after {
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35%;
    background: linear-gradient(to bottom, transparent, var(--color-surface));
  }

  .ship-content {
    padding: 16px;
  }

  .ship-title {
    font-size: 24px;
  }
}
</style>
