<script setup lang="ts">
defineProps<{
  id: string
  label: string
}>()
</script>
<template>
  <div class="flex flex-col gap-3">
    <label :for="id">{{ label }}</label>
    <div class="w-full"><slot /></div>
  </div>
</template>

<style scoped></style>