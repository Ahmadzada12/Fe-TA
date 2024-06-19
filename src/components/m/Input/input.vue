<script setup lang="ts">
import { tv } from 'tailwind-variants'
import { computed } from 'vue'

const props = defineProps<{
  color: keyof typeof colors
}>()

const colors = {
  default: 'bg-default border-solid border-primary'
}

const input = tv({
  base: 'py-3 px-5 rounded-lg',
  variants: {
    color: colors
  },
  defaultVariants: {
    color: 'default'
  }
})

const className = computed(() => {
  return input({ color: props.color })
})
</script>

<template>
  <input type="text" :class="className" />
</template>