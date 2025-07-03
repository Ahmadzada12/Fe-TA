<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center p-6 font-poppins">
    <div class="max-w-md">
      <svg class="w-24 h-24 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

      <h1 class="text-3xl font-bold text-gray-800 mt-4">Oops! Pembayaran Gagal</h1>
      <p class="mt-2 text-gray-600">
        Pembayaran Anda tidak berhasil diselesaikan atau dibatalkan. Dana tidak terpotong dari rekening Anda.
      </p>
      <p v-if="orderId" class="mt-4 text-sm text-gray-500">
        ID Donasi Anda: {{ orderId }}
      </p>
       <div class="mt-8 space-x-4">
        <router-link :to="`/infodonatur/${projectId}`" class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
          Coba Donasi Lagi
        </router-link>
        <router-link to="/" class="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">
          Kembali ke Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue'; // Impor ref

const route = useRoute();

// Ambil orderId dan projectId dari query URL
const orderId = ref(route.query.order_id || 'Tidak Ditemukan');
const projectId = ref(route.query.project_id || ''); // Ambil project_id

onMounted(() => {
  console.log(`Redirect Gagal untuk Order ID: ${orderId.value} pada Project ID: ${projectId.value}`);
});
</script>