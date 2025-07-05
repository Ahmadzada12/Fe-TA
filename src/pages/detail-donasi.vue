<template>
  <div class="container mx-auto p-4 font-poppins">
    <div v-if="isLoading" class="text-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"
      ></div>
      <p class="mt-4 text-gray-600">Memuat detail campaign...</p>
    </div>

    <div
      v-else-if="errorMessage"
      class="w-full p-4 my-8 text-center text-red-700 bg-red-100 rounded-lg"
    >
      <p class="font-bold">Oops! Terjadi kesalahan</p>
      <p>{{ errorMessage }}</p>
    </div>

    <div v-else-if="campaign" class="space-y-8">
      <div class="mb-4">
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-800">
          {{ campaign.title }}
        </h1>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="mb-6">
          <img
            :src="campaign.image"
            alt="Gambar Campaign"
            class="w-full h-auto md:h-96 object-cover rounded-lg"
          />
        </div>

        <div class="flex justify-around text-center my-6 border-y py-4">
          <div>
            <p class="text-2xl font-bold text-gray-800">{{ jumlahDonatur }}</p>
            <p class="text-sm text-gray-500">Donatur</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-800">
              {{ formatCurrency(campaign.donationCollected) }}
            </p>
            <p class="text-sm text-gray-500">Terkumpul</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-800">{{ sisaHari }}</p>
            <p class="text-sm text-gray-500">Hari Tersisa</p>
          </div>
        </div>

        <div class="mb-6">
          <div class="flex justify-between mb-1">
            <span class="text-gray-600 text-sm">Terkumpul</span>
            <span class="text-gray-600 text-sm">Target</span>
          </div>
          <div class="bg-gray-200 rounded-full h-4">
            <div
              class="bg-green-500 h-4 rounded-full"
              :style="{ width: `${progressPercentage}%` }"
            ></div>
          </div>
          <div class="flex justify-between mt-1">
            <span class="text-green-500 font-semibold">{{
              formatCurrency(campaign.donationCollected)
            }}</span>
            <span class="text-gray-600 font-semibold">{{
              formatCurrency(campaign.donationTarget)
            }}</span>
          </div>
        </div>

        <div class="mt-6 mb-6">
          <router-link
            v-if="campaign && sisaHari > 0"
            :to="`/pilih-nominal-donasi/${campaign.id}`"
            class="w-full block bg-green-500 text-white text-center font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-colors text-lg"
          >
            Donasi Sekarang
          </router-link>
          <div
            v-else
            class="w-full block bg-gray-400 text-white text-center font-bold py-3 px-6 rounded-lg cursor-not-allowed"
          >
            Donasi Ditutup
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Status Penyaluran</h3>
          <div class="flex items-center">
            <span
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
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

        <div v-if="campaign.isDisbursed" class="mt-6 border-t pt-6">
          <h3 class="text-lg font-semibold mb-4">Dokumentasi Penyaluran</h3>
          <p class="text-gray-600 mb-4 whitespace-pre-wrap">
            {{ campaign.disbursementDescription }}
          </p>
          <img
            v-if="campaign.disbursementProof"
            :src="campaign.disbursementProof"
            alt="Bukti Penyaluran"
            class="w-full md:w-2/3 rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-semibold mb-4">Riwayat Donasi</h3>
        <div
          v-if="campaign.Donation && campaign.Donation.length === 0"
          class="text-center py-8"
        >
          <p class="text-gray-500">
            Jadilah yang pertama berdonasi untuk campaign ini!
          </p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="border-b">
              <tr>
                <th
                  class="text-left py-2 px-3 text-sm font-semibold text-gray-600"
                >
                  Nama Donatur
                </th>
                <th
                  class="text-left py-2 px-3 text-sm font-semibold text-gray-600"
                >
                  Jumlah
                </th>
                <th
                  class="text-left py-2 px-3 text-sm font-semibold text-gray-600"
                >
                  Keterangan
                </th>
                <th
                  class="text-left py-2 px-3 text-sm font-semibold text-gray-600"
                >
                  Waktu
                </th>
                <th
                  class="text-left py-2 px-3 text-sm font-semibold text-gray-600"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="donation in campaign.Donation"
                :key="donation.id"
                class="border-t hover:bg-gray-50"
              >
                <td class="py-3 px-3">
                  {{
                    donation.donorDisplayName ||
                    donation.user.fullname ||
                    "Anonim"
                  }}
                </td>
                <td class="py-3 px-3">{{ formatCurrency(donation.amount) }}</td>
                <td class="py-3 px-3 max-w-xs">
                  <div
                    v-if="donation.message"
                    class="text-sm text-gray-700 break-words"
                  >
                    {{ donation.message }}
                  </div>
                  <div v-else class="text-xs text-gray-400 italic">
                    Tidak ada keterangan
                  </div>
                </td>
                <td class="py-3 px-3 text-sm text-gray-500">
                  {{ formatDateTime(donation.createdAt) }}
                </td>
                <td class="py-3 px-3">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="getStatusClass(donation.status)"
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

// --- Interfaces untuk Tipe Data yang Kuat ---
interface Donation {
  id: string;
  amount: number;
  message?: string; // Tambahkan field message
  donorDisplayName?: string; // Tambahkan field nama samaran
  createdAt: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  user: {
    fullname: string;
  };
}

interface Campaign {
  id: string;
  title: string;
  image: string;
  donationCollected: number;
  donationTarget: number;
  isDisbursed: boolean;
  disbursementDate?: string;
  disbursementDescription?: string;
  donationFinishedDate: string;
  disbursementProof?: string;
  Donation: Donation[]; // Daftar donasi adalah bagian dari campaign
}

// --- State Management ---
const route = useRoute();
const campaign = ref<Campaign | null>(null);
const isLoading = ref<boolean>(true);
const errorMessage = ref<string | null>(null);
const apiBaseUrl =
  import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3001/v1/";

// --- Computed Properties ---
const progressPercentage = computed(() => {
  if (!campaign.value || campaign.value.donationTarget === 0) {
    return 0;
  }
  const percentage =
    (campaign.value.donationCollected / campaign.value.donationTarget) * 100;
  return Math.min(percentage, 100); // Pastikan tidak lebih dari 100%
});
const jumlahDonatur = computed(() => {
  if (campaign.value && campaign.value.Donation) {
    // Kita hanya hitung donasi yang sukses sebagai donatur
    return campaign.value.Donation.filter((d) => d.status === "SUCCESS").length;
  }
  return 0;
});

const sisaHari = computed(() => {
  if (!campaign.value?.donationFinishedDate) return 0; // Jika tidak ada tanggal selesai, anggap 0

  const sekarang = new Date();
  const selesai = new Date(campaign.value.donationFinishedDate);
  // Set jam ke awal hari untuk perbandingan tanggal yang adil
  sekarang.setHours(0, 0, 0, 0);
  selesai.setHours(0, 0, 0, 0);

  const selisih = selesai.getTime() - sekarang.getTime();

  if (selisih < 0) return 0; // Jika sudah lewat, sisa hari adalah 0

  // Hitung sisa hari dan bulatkan ke atas
  return Math.ceil(selisih / (1000 * 60 * 60 * 24));
});
// --- Fungsi Bantuan ---
const formatCurrency = (num: number = 0) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
const formatDate = (dateString?: string) =>
  dateString
    ? new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";
const formatDateTime = (dateString?: string) =>
  dateString
    ? new Date(dateString).toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "-";

const getStatusClass = (status: string) => {
  if (status === "SUCCESS") return "bg-green-100 text-green-800";
  if (status === "FAILED") return "bg-red-100 text-red-800";
  if (status === "PENDING") return "bg-yellow-100 text-yellow-800";
  return "bg-gray-100 text-gray-800";
};

// --- Fetching Data ---
onMounted(async () => {
  isLoading.value = true;
  errorMessage.value = null;
  try {
    const campaignId = route.params.id as string;
    const token = localStorage.getItem("token");

    // Tidak perlu token jika halaman ini bersifat publik
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get(
      `${apiBaseUrl}crowdfounding/${campaignId}`,
      { headers }
    );

    if (response.data && response.data.data) {
      campaign.value = response.data.data;
    } else {
      errorMessage.value =
        "Gagal mengambil detail campaign: format data tidak sesuai.";
    }
  } catch (error: any) {
    console.error("Error fetching campaign details:", error);
    if (error.response?.status === 401) {
      errorMessage.value = "Anda harus login untuk melihat halaman ini.";
      // Pertimbangkan redirect atau menampilkan tombol login
    } else if (error.response?.status === 404) {
      errorMessage.value = "Campaign yang Anda cari tidak ditemukan.";
    } else if (axios.isAxiosError(error) && !error.response) {
      errorMessage.value =
        "Tidak dapat terhubung ke server. Periksa koneksi Anda.";
    } else {
      errorMessage.value = "Terjadi kesalahan saat memuat detail campaign.";
    }
  } finally {
    isLoading.value = false;
  }
});
</script>
