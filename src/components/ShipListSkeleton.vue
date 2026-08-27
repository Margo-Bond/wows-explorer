<script setup lang="ts">
const SKELETON_COUNT = 9
</script>

<template>
  <div class="skeleton-grid" aria-label="Loading ships">
    <div v-for="index in SKELETON_COUNT" :key="index" class="skeleton-card">
      <div class="skeleton-image"></div>

      <div class="skeleton-content">
        <div class="skeleton-label"></div>
        <div class="skeleton-title"></div>
        <div class="skeleton-meta"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.skeleton-card {
  display: grid;
  grid-template-columns: 42% minmax(0, 1fr);
  min-height: 176px;
  overflow: hidden;
  background-color: var(--color-surface);
  border: 1px solid rgba(0, 180, 216, 0.1);
}

.skeleton-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 20px;
}

.skeleton-label {
  width: 48px;
  height: 10px;
}

.skeleton-title {
  width: 65%;
  height: 24px;
}

.skeleton-image,
.skeleton-label,
.skeleton-title,
.skeleton-meta {
  position: relative;
  overflow: hidden;
  background-color: #0d2040;
}

.skeleton-image::after,
.skeleton-label::after,
.skeleton-title::after,
.skeleton-meta::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(72, 202, 228, 0.1));
  content: '';
  transform: translateX(-100%);
  animation: skeleton-shimmer 1.6s infinite linear;
}

@keyframes skeleton-shimmer {
  100% {
    transform: translateX(100%);
  }
}

@media (max-width: 1100px) {
  .skeleton-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .skeleton-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .skeleton-card {
    grid-template-columns: 1fr;
  }

  .skeleton-image {
    aspect-ratio: 16 / 9;
  }
}
</style>
