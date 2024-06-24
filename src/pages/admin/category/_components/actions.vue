<template>
  <div>
    <n-button quaternary @click="$emit('detail')">
      <template #icon>
        <n-icon>
          <i-mdi-eye-outline />
        </n-icon>
      </template>
    </n-button>
    <n-button quaternary @click="$emit('edit')">
      <template #icon>
        <n-icon>
          <i-mdi-pencil-outline />
        </n-icon>
      </template>
    </n-button>
    <n-button quaternary @click="$emit('delete')">
      <template #icon>
        <n-icon>
          <i-mdi-trash-can-outline />
        </n-icon>
      </template>
    </n-button>
  </div>
</template>
