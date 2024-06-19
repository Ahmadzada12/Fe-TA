<script setup lang="ts">
import {tv} from 'tailwind-variants'
import { computed } from 'vue';

const Props = defineProps<{ color: keyof typeof colors }>()

const colors = {
    default: 'bg-default text-black',
    primary: 'bg-primary text-white'
}     

    const button = tv({
        base: 'py-3 px-5 rounded-lg',
        variants: {
            color:colors 
        },
        defaultVariants: {
            color:'default'
        }
    })



const className = computed(()=> {
    return button ({ color: Props.color})
})
</script>

<template>
    <button :class="className">
        <slot name="icon" />
        <slot />
    </button>
</template>

<style scoped></style>