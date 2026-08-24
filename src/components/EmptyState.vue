<script setup lang="ts">
const emit = defineEmits<{
  reset: []
}>()
</script>

<template>
  <div class="empty-state">
    <h2 class="empty-title">No ships found</h2>
    <p class="empty-text">Try changing or resetting the filters.</p>

    <button type="button" @click="emit('reset')">Reset filters</button>
  </div>
</template>

<style setup lang="scss">
.empty-state {
  text-align: center;
}

.empty-title {
  margin: 0;
}

.empty-text {
  margin: 8px 0 16px;
}
</style>
