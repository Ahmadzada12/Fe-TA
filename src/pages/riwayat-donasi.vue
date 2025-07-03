<template>
  <div
    class="w-full relative [background:linear-gradient(#fff,_#fff),_#fff] overflow-y-auto flex flex-col items-center justify-start gap-[30px] leading-[normal] tracking-[normal] font-poppins"
  >
    <MainContent />
    <div
      class="w-full flex flex-row items-start justify-center py-0 px-5 box-border max-w-full"
    >
      <h1 class="text-2xl font-bold font-poppins text-slate-800">
        Donasi Saya
      </h1>
    </div>
    <section
      class="self-stretch flex flex-row items-start justify-center py-0 px-9 box-border max-w-full"
    >
      <div v-if="isLoading" class="text-center py-10">
        <p class="font-poppins">Memuat riwayat donasi...</p>
      </div>

      <div
        v-else-if="errorMessage"
        class="w-full max-w-4xl p-4 text-center text-red-700 bg-red-100 rounded-lg"
      >
        <p class="font-bold">Oops! Terjadi kesalahan</p>
        <p>{{ errorMessage }}</p>
      </div>

      <div
        v-else-if="donations.length > 0"
        class="w-full shadow-md rounded-lg bg-white flex flex-col items-start justify-start max-w-4xl overflow-hidden"
      >
        <div class="overflow-x-auto w-full">
          <table class="min-w-full w-full bg-white font-poppins table-fixed">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  style="width: 5%"
                >
                  #
                </th>
                <th
                  class="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  style="width: 25%"
                >
                  Campaign
                </th>
                <th
                  class="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  style="width: 30%"
                >
                  Keterangan
                </th>
                <th
                  class="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  style="width: 15%"
                >
                  Waktu
                </th>
                <th
                  class="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  style="width: 15%"
                >
                  Nominal
                </th>
                <th
                  class="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  style="width: 10%"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="(donation, index) in donations"
                :key="donation.id"
                class="hover:bg-gray-50"
              >
                <td class="py-3 px-4 text-sm text-gray-700">{{ index + 1 }}</td>

                <td
                  class="py-3 px-4 text-sm text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <router-link
                    :to="`/donasi/${donation.crowdfoundingId}`"
                    class="text-blue-600 hover:text-blue-800 font-medium"
                    :title="donation.crowdfounding.title"
                  >
                    {{ donation.crowdfounding.title }}
                  </router-link>
                </td>

                <td
                  class="py-3 px-4 text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap"
                  :title="donation.message"
                >
                  {{ donation.message }}
                </td>

                <td class="py-3 px-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDateTime(donation.createdAt) }}
                </td>

                <td
                  class="py-3 px-4 whitespace-nowrap text-sm text-gray-800 font-medium"
                >
                  {{ formatCurrency(donation.amount) }}
                </td>

                <td class="py-3 px-4 whitespace-nowrap">
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

      <div v-else class="text-center py-10 w-full">
        <p class="font-poppins text-gray-500">
          Anda belum memiliki riwayat donasi.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import MainContent from "../components/main-content.vue"; // Ganti 'mainContent' menjadi 'MainContent' sesuai konvensi

// --- Interface untuk Tipe Data ---
interface Donation {
  id: string;
  crowdfoundingId: string;
  amount: number;
  message: string;
  status: "PENDING" | "SUCCESS" | "FAILED"; // Gunakan tipe literal untuk status
  createdAt: string;
  crowdfounding: {
    // Sekarang objek ini ada karena 'include' di backend
    title: string;
  };
}

// --- Variabel Reaktif ---
const donations = ref<Donation[]>([]);
const isLoading = ref<boolean>(true); // Mulai dengan true karena kita langsung fetch data
const errorMessage = ref<string | null>(null);

const apiBaseUrl =
  import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3001/v1/";

// --- Fungsi untuk Fetch Data ---
const fetchDonations = async () => {
  isLoading.value = true;
  errorMessage.value = null;
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      errorMessage.value = "Sesi tidak valid. Silakan login kembali.";
      // pertimbangkan untuk redirect ke halaman login di sini
      return;
    }
    // Hanya perlu satu panggilan API karena data crowdfunding sudah di-include
    const response = await axios.get(`${apiBaseUrl}donate`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    donations.value = response.data;
  } catch (error: any) {
    console.error("Error fetching donations:", error);
    if (error.response?.data?.message) {
      errorMessage.value = `Gagal memuat riwayat: ${error.response.data.message}`;
    } else if (axios.isAxiosError(error) && !error.response) {
      errorMessage.value =
        "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
    } else {
      errorMessage.value = "Gagal memuat riwayat donasi.";
    }
  } finally {
    isLoading.value = false;
  }
};

// --- Fungsi Bantuan untuk Formatting ---
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const formatDateTime = (value: string) => {
  return new Date(value).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const getStatusClass = (status: string) => {
  if (status === "SUCCESS") return "bg-green-100 text-green-800";
  if (status === "FAILED") return "bg-red-100 text-red-800";
  if (status === "PENDING") return "bg-yellow-100 text-yellow-800";
  return "bg-gray-100 text-gray-800";
};

// --- Lifecycle Hook ---
onMounted(fetchDonations);
</script>

<style scoped>
/* Anda bisa menghapus style lama dan menggunakan kelas Tailwind sepenuhnya, atau biarkan jika ada yang masih relevan */
</style>
