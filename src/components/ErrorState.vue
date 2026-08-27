<script setup lang="ts">
defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="error-state" role="alert">
    <p>Unable to load ships. Please try again.</p>
    <button type="button" @click="$emit('retry')">Try again</button>
  </div>
</template>

<style scoped lang="scss">
.error-state {
  text-align: center;
}
</style>
