<template>
  <div v-if="loading" class="text-center py-8">
    <div
      class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"
    ></div>
    <p class="mt-4 text-gray-600">Memuat data campaign...</p>
  </div>

  <div v-else class="container mx-auto p-4">
    <div class="container mx-auto p-4">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Detail Donasi</h1>
      </div>

      <!-- Informasi Utama Campaign -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <!-- Judul dan Gambar -->
        <div class="mb-6">
          <h2 class="text-2xl font-semibold mb-4">{{ campaign.title }}</h2>
          <img
            :src="campaign.image"
            alt="Gambar Campaign"
            class="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <!-- Progress Donasi -->
        <div class="mb-6">
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Terkumpul</span>
            <span class="text-gray-600">Target</span>
          </div>
          <div class="bg-gray-200 rounded-full h-4 mb-2">
            <div
              class="bg-green-500 h-4 rounded-full"
              :style="`width: ${progressPercentage}%`"
            ></div>
          </div>
          <div class="flex justify-between">
            <span class="text-green-500 font-semibold">
              Rp {{ formatNumber(campaign.donationCollected) }}
            </span>
            <span class="text-gray-600">
              Rp {{ formatNumber(campaign.donationTarget) }}
            </span>
          </div>
        </div>

        <!-- Status Penyaluran -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Status Penyaluran</h3>
          <div class="flex items-center">
            <span
              :class="[
                'px-3 py-1 rounded-full text-sm',
                campaign.isDisbursed
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800',
              ]"
            >
              {{
                campaign.isDisbursed ? "Telah Disalurkan" : "Dalam Pengumpulan"
              }}
            </span>
            <span
              v-if="campaign.isDisbursed"
              class="ml-2 text-sm text-gray-500"
            >
              pada {{ formatDate(campaign.disbursementDate) }}
            </span>
          </div>
        </div>

        <!-- Dokumentasi Penyaluran -->
        <div v-if="campaign.isDisbursed" class="mt-6">
          <h3 class="text-lg font-semibold mb-4">Dokumentasi Penyaluran</h3>
          <p class="text-gray-600 mb-4">
            {{ campaign.disbursementDescription }}
          </p>
          <img
            :src="campaign.disbursementProof"
            alt="Bukti Penyaluran"
            class="w-full md:w-2/3 rounded-lg shadow-lg"
          />
        </div>
      </div>

      <!-- Daftar Donatur -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-semibold mb-4">Riwayat Donasi</h3>
        <!-- Empty State -->
        <div v-if="donations.length === 0" class="text-center py-8">
          <div class="text-gray-400 mb-4">
            <i class="fas fa-donate text-4xl"></i>
          </div>
          <p class="text-gray-500">
            Belum ada riwayat donasi untuk campaign ini
          </p>
        </div>
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="text-left py-2">Nama Donatur</th>
              <th class="text-left py-2">Jumlah</th>
              <th class="text-left py-2">Waktu</th>
              <th class="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="donation in donations"
              :key="donation.id"
              class="border-t"
            >
              <td class="py-3">{{ donation.user.fullname || "Anonim" }}</td>
              <td class="py-3">Rp {{ formatNumber(donation.amount) }}</td>
              <td class="py-3">{{ formatDateTime(donation.createdAt) }}</td>
              <td class="py-3">
                <span
                  :class="{
                    'text-green-500': donation.status === 'SUCCESS',
                    'text-red-500': donation.status === 'FAILED',
                    'text-yellow-500': donation.status === 'PENDING',
                  }"
                >
                  {{ donation.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const campaign = ref({});
const donations = ref([]);

const loading = ref(true); // Tambahkan state loading

const formatNumber = (num) => {
  return new Intl.NumberFormat("id-ID").format(num);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const progressPercentage = computed(() => {
  return (
    (campaign.value.donationCollected / campaign.value.donationTarget) * 100
  );
});

onMounted(async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:3001/v1/crowdfounding/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Tambahkan header authorization
        },
      }
    );
    campaign.value = response.data.data;
    donations.value = response.data.data.Donation;
  } catch (error) {
    console.error("Error fetching campaign details:", error);
    if (error.response?.status === 401) {
      // Redirect ke halaman login jika unauthorized
      window.location.href = "/login";
    }
  } finally {
    loading.value = false; // Matikan loading
  }
});
</script>
<style scoped>
@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }

  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  img {
    height: 200px;
  }
}
</style>
