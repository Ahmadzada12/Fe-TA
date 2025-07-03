<template>
  <div id="app" class="font-poppins">
    <!-- Admin Layout -->
    <AdminLayout v-if="isAdminRoute">
      <router-view />
    </AdminLayout>
    
    <!-- User Layout (Default) -->
    <div v-else class="bg-gray-50">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AdminLayout from './layouts/AdminLayout.vue';

const route = useRoute();

const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin');
});
</script>

<style>
/* Anda bisa menambahkan style global di sini atau tetap di global.css */
/* Pastikan font Poppins sudah diimpor di global.css */
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50; /* Contoh warna teks default */
}
</style>
