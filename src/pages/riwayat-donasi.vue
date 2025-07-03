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
          <table
            class="min-w-full w-full bg-white font-poppins table-fixed"
            style="min-width: 900px"
          >
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
                  style="width: 12%"
                >
                  Waktu
                </th>
                <th
                  class="py-3 px-4 border-b-2 border-gray-200 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  style="width: 13%"
                >
                  Nominal
                </th>
                <th
                  class="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  style="width: 10%"
                >
                  Status
                </th>
                <th
                  class="py-3 px-4 border-b-2 border-gray-200 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  style="width: 15%"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="(donation, index) in donations"
                :key="donation.id"
                class="hover:bg-gray-50"
                :class="{
                  'bg-yellow-50 border-l-4 border-yellow-400':
                    donation.status === 'PENDING',
                }"
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

                <td
                  class="py-3 px-4 whitespace-nowrap text-xs text-gray-500"
                  :title="formatDateTimeFull(donation.createdAt)"
                >
                  {{ formatDateTimeShort(donation.createdAt) }}
                </td>

                <td
                  class="py-3 px-4 whitespace-nowrap text-sm text-gray-800 font-medium text-right"
                  :title="formatCurrencyFull(donation.amount)"
                >
                  {{ formatCurrencyShort(donation.amount) }}
                </td>

                <td class="py-3 px-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="getStatusClass(donation.status)"
                  >
                    {{ getStatusText(donation.status) }}
                  </span>
                </td>

                <td class="py-3 px-4 whitespace-nowrap text-center">
                  <!-- Button Lanjutkan Pembayaran untuk status PENDING -->
                  <button
                    v-if="donation.status === 'PENDING' && donation.invoiceUrl"
                    @click="continuePayment(donation.invoiceUrl)"
                    class="inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    title="Lanjutkan pembayaran Xendit"
                  >
                    <svg
                      class="w-3 h-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                    Bayar
                  </button>

                  <!-- Button Refresh untuk status PENDING tanpa invoice URL -->
                  <button
                    v-else-if="
                      donation.status === 'PENDING' && !donation.invoiceUrl
                    "
                    @click="refreshStatus(donation.id)"
                    :disabled="refreshingStatus[donation.id]"
                    class="inline-flex items-center px-2 py-1 border border-gray-300 text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50"
                    title="Refresh status donasi"
                  >
                    <svg
                      class="w-3 h-3 mr-1"
                      :class="{ 'animate-spin': refreshingStatus[donation.id] }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span class="hidden sm:inline">{{
                      refreshingStatus[donation.id] ? "Loading..." : "Refresh"
                    }}</span>
                  </button>

                  <!-- Status indicator untuk SUCCESS/FAILED -->
                  <span
                    v-else
                    class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md"
                    :class="{
                      'text-green-700 bg-green-100':
                        donation.status === 'SUCCESS',
                      'text-red-700 bg-red-100': donation.status === 'FAILED',
                    }"
                  >
                    <svg
                      v-if="donation.status === 'SUCCESS'"
                      class="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      v-else-if="donation.status === 'FAILED'"
                      class="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="hidden sm:inline">{{
                      donation.status === "SUCCESS" ? "Selesai" : "Gagal"
                    }}</span>
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
  invoiceUrl?: string; // Tambahkan invoiceUrl untuk pending payments
  xenditInvoiceId?: string; // Tambahkan xenditInvoiceId
  crowdfounding: {
    // Sekarang objek ini ada karena 'include' di backend
    title: string;
  };
}

// --- Variabel Reaktif ---
const donations = ref<Donation[]>([]);
const isLoading = ref<boolean>(true); // Mulai dengan true karena kita langsung fetch data
const errorMessage = ref<string | null>(null);
const refreshingStatus = ref<Record<string, boolean>>({}); // Track refresh status per donation

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

// Fungsi formatting tanggal yang lebih ringkas
const formatDateTimeShort = (value: string) => {
  return new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Fungsi formatting tanggal lengkap untuk tooltip
const formatDateTimeFull = (value: string) => {
  return new Date(value).toLocaleString("id-ID", {
    dateStyle: "full",
    timeStyle: "medium",
  });
};

// Fungsi formatting currency yang lebih ringkas
const formatCurrencyShort = (value: number) => {
  if (value >= 1000000000) {
    return `Rp ${(value / 1000000000).toFixed(1)}M`;
  } else if (value >= 1000000) {
    return `Rp ${(value / 1000000).toFixed(1)}Jt`;
  } else if (value >= 1000) {
    return `Rp ${(value / 1000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

// Fungsi formatting currency lengkap untuk tooltip
const formatCurrencyFull = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const getStatusClass = (status: string) => {
  if (status === "SUCCESS") return "bg-green-100 text-green-800";
  if (status === "FAILED") return "bg-red-100 text-red-800";
  if (status === "PENDING") return "bg-yellow-100 text-yellow-800";
  return "bg-gray-100 text-gray-800";
};

const getStatusText = (status: string) => {
  if (status === "SUCCESS") return "Berhasil";
  if (status === "FAILED") return "Gagal";
  if (status === "PENDING") return "Menunggu";
  return status;
};

// --- Fungsi untuk Continue Payment ---
const continuePayment = (invoiceUrl: string) => {
  if (invoiceUrl) {
    // Buka Xendit payment page di tab baru
    window.open(invoiceUrl, "_blank");
  }
};

// --- Fungsi untuk Refresh Status ---
const refreshStatus = async (donationId: string) => {
  refreshingStatus.value[donationId] = true;
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      errorMessage.value = "Sesi tidak valid. Silakan login kembali.";
      return;
    }

    // Call backend API to refresh status
    const response = await axios.get(
      `${apiBaseUrl}donate/${donationId}/status`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Update donation status in the list
    const donationIndex = donations.value.findIndex((d) => d.id === donationId);
    if (donationIndex !== -1) {
      donations.value[donationIndex].status = response.data.status;
      if (response.data.invoiceUrl) {
        donations.value[donationIndex].invoiceUrl = response.data.invoiceUrl;
      }
    }
  } catch (error: any) {
    console.error("Error refreshing status:", error);
    // Optionally show error message
  } finally {
    refreshingStatus.value[donationId] = false;
  }
};

// --- Auto-refresh untuk Pending Donations ---
const setupAutoRefresh = () => {
  setInterval(async () => {
    const pendingDonations = donations.value.filter(
      (d) => d.status === "PENDING"
    );
    if (pendingDonations.length > 0 && !isLoading.value) {
      console.log(
        `Auto-refreshing ${pendingDonations.length} pending donations...`
      );
      await fetchDonations();
    }
  }, 30000); // Refresh every 30 seconds
};

// --- Lifecycle Hook ---
onMounted(() => {
  fetchDonations();
  setupAutoRefresh();
});
</script>

<style scoped>
/* Anda bisa menghapus style lama dan menggunakan kelas Tailwind sepenuhnya, atau biarkan jika ada yang masih relevan */
</style>
