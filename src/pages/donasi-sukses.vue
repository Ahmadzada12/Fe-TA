<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center p-6 font-poppins">
    <div class="max-w-md">
      <svg class="w-24 h-24 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      
      <h1 class="text-3xl font-bold text-gray-800 mt-4">Terima Kasih!</h1>
      <p class="mt-2 text-gray-600">
        Pembayaran Anda untuk donasi telah kami terima dan sedang diproses. Status akhir transaksi akan diperbarui melalui notifikasi dan dapat dilihat di halaman riwayat donasi Anda.
      </p>
      <p v-if="orderId" class="mt-4 text-sm text-gray-500">
        ID Donasi Anda: {{ orderId }}
      </p>
      <div class="mt-8 space-x-4">
        <router-link to="/riwayat-donasi" class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
          Lihat Riwayat Donasi
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
import { onMounted } from 'vue';

const route = useRoute();
const orderId = route.query.order_id;

onMounted(() => {
  // Anda bisa melakukan aksi lain di sini, misalnya mengirim event analytics
  console.log('Redirect Sukses untuk Order ID:', orderId);
});
</script>