<!-- Donasi.vue -->
<template>
  <div class="w-full bg-gray-50 min-h-screen flex flex-col font-poppins">
    <MainContent />

    <!-- Header Halaman dan Input Pencarian -->
    <div
      class="w-full max-w-6xl mx-auto px-5 flex flex-col sm:flex-row justify-between items-center gap-4 mt-8"
    >
      <h1 class="text-3xl font-bold text-slate-800">Program Donasi</h1>
      <div class="relative w-full sm:w-72">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari campaign..."
          class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightseagreen-200 transition-shadow"
        />
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Konten Utama -->
    <div class="flex-1 w-full flex flex-col">
      <main class="w-full max-w-6xl mx-auto px-5 mt-8 mb-16">
        <!-- State: Loading -->
        <div v-if="isLoading" class="text-center py-20">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"
          ></div>
          <p class="mt-4 text-gray-600">Memuat program donasi...</p>
        </div>

        <!-- State: Error -->
        <div
          v-else-if="errorMessage"
          class="w-full p-4 my-8 text-center text-red-700 bg-red-100 rounded-lg"
        >
          <p class="font-bold">Oops! Terjadi kesalahan</p>
          <p>{{ errorMessage }}</p>
        </div>

        <!-- State: Data Kosong -->
        <div
          v-else-if="filteredDonations.length === 0"
          class="text-center py-20 text-gray-500"
        >
          <p class="text-lg">Tidak ada program donasi yang aktif saat ini.</p>
          <p v-if="searchQuery" class="text-sm">
            Coba ubah kata kunci pencarian Anda.
          </p>
        </div>
        <!-- State: Tampilkan Donasi dalam Grid -->
        <div v-else>
          <div
            class="grid gap-8"
            style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              grid-template-rows: repeat(3, minmax(250px, auto));
              min-height: 800px;
              width: 100%;
            "
          >
            <!-- 👇 KARTU DONASI SESUAI DESAIN LAMA ANDA 👇 -->
            <div v-for="index in 9" :key="index" class="grid-slot">
              <div
                v-if="paginatedDonations[index - 1]"
                class="card bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300 group"
              >
                <!-- Konten kartu donasi tetap sama -->
                <img
                  class="h-52 w-full object-cover cursor-pointer"
                  loading="lazy"
                  :alt="paginatedDonations[index - 1].title"
                  :src="paginatedDonations[index - 1].image"
                  @error="
                    (e) =>
                      ((e.target as HTMLImageElement).src =
                        '/fallback-image.jpg')
                  "
                  @click="navigateToDetail(paginatedDonations[index - 1].id)"
                />
                <div class="card-content flex-1 flex flex-col p-4">
                  <b
                    class="relative leading-tight line-clamp-2 h-12 cursor-pointer group-hover:text-lightseagreen-300"
                    @click="navigateToDetail(paginatedDonations[index - 1].id)"
                    :title="paginatedDonations[index - 1].title"
                  >
                    {{ paginatedDonations[index - 1].title }}
                  </b>

                  <div
                    class="w-full rounded bg-gray-200 flex items-center justify-center h-5 text-center text-xs text-white relative overflow-hidden my-3"
                  >
                    <div
                      class="absolute top-0 left-0 h-full bg-green-500 rounded"
                      :style="{
                        width: getProgress(paginatedDonations[index - 1]) + '%',
                      }"
                    ></div>
                    <b class="relative z-10 drop-shadow-sm">
                      {{
                        Math.round(getProgress(paginatedDonations[index - 1]))
                      }}%
                    </b>
                  </div>

                  <div
                    class="relative self-stretch leading-snug flex justify-between mt-1 text-xs"
                  >
                    <div>
                      <b class="text-gray-800">{{
                        formatCurrency(
                          paginatedDonations[index - 1].donationCollected
                        )
                      }}</b>
                      <span class="text-gray-600"> terkumpul, </span>
                      <span
                        >dari
                        {{
                          formatCurrency(
                            paginatedDonations[index - 1].donationTarget
                          )
                        }}</span
                      >
                    </div>
                    <div class="font-medium text-gray-500 text-right">
                      {{ getSisaHari(paginatedDonations[index - 1]) }}
                    </div>
                  </div>

                  <div class="mt-auto pt-4">
                    <button
                      class="w-full bg-lightseagreen-200 text-white font-bold py-2 px-4 rounded-lg hover:bg-lightseagreen-100 transition-colors"
                      @click="
                        navigateToPilihNominal(paginatedDonations[index - 1].id)
                      "
                    >
                      Donasi
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- 👆 AKHIR DARI KARTU DONASI 👆 -->
          </div>

          <!-- Paginasi -->
          <div
            v-if="totalPages > 1"
            class="pagination-container flex justify-center items-center w-full mt-12 space-x-2"
          >
            <button
              class="page-button"
              @click="prevPage"
              :disabled="currentPage === 1"
            >
              «
            </button>
            <span class="text-gray-700 font-medium text-sm"
              >Halaman {{ currentPage }} dari {{ totalPages }}</span
            >
            <button
              class="page-button"
              @click="nextPage"
              :disabled="currentPage === totalPages"
            >
              »
            </button>
          </div>
        </div>
      </main>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import MainContent from "../components/main-content.vue";
import Footer from "../components/footer.vue";

interface DonationCampaign {
  id: string;
  title: string;
  donationCollected: number;
  donationTarget: number;
  image: string;
  donationFinishedDate: string | null;
}

const router = useRouter();
const allDonations = ref<DonationCampaign[]>([]);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 9;
const isLoading = ref<boolean>(true);
const errorMessage = ref<string | null>(null);

const apiBaseUrl =
  import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3001/v1/";

const filteredDonations = computed(() => {
  if (!allDonations.value) return [];
  if (!searchQuery.value) {
    return allDonations.value;
  }
  return allDonations.value.filter((donation) =>
    donation.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredDonations.value.length / itemsPerPage)
);

const paginatedDonations = computed(() => {
  if (currentPage.value > totalPages.value && totalPages.value > 0) {
    currentPage.value = 1;
  }
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredDonations.value.slice(start, end);
});

const fetchDonations = async () => {
  isLoading.value = true;
  errorMessage.value = null;
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get(`${apiBaseUrl}crowdfounding`, { headers });

    if (response.data?.data?.data && Array.isArray(response.data.data.data)) {
      allDonations.value = response.data.data.data;
    } else {
      console.warn(
        "Struktur data dari API tidak sesuai harapan:",
        response.data
      );
      allDonations.value = [];
    }
  } catch (error: any) {
    console.error("Error fetching donations:", error);
    errorMessage.value = "Gagal memuat data campaign. Silakan coba lagi nanti.";
  } finally {
    isLoading.value = false;
  }
};

const navigateToDetail = (donationId: string) =>
  router.push(`/donasi/${donationId}`);
const navigateToPilihNominal = (donationId: string) =>
  router.push(`/pilih-nominal-donasi/${donationId}`);

const getProgress = (donation: DonationCampaign) => {
  if (!donation || donation.donationTarget === 0) return 0;
  return Math.min(
    (donation.donationCollected / donation.donationTarget) * 100,
    100
  );
};

const getSisaHari = (donation: DonationCampaign) => {
  if (!donation.donationFinishedDate) return "N/A";
  const sekarang = new Date();
  const selesai = new Date(donation.donationFinishedDate);
  sekarang.setHours(0, 0, 0, 0);
  selesai.setHours(0, 0, 0, 0);
  const selisih = selesai.getTime() - sekarang.getTime();
  if (selisih < 0) return "Berakhir";
  const hari = Math.ceil(selisih / (1000 * 60 * 60 * 24));
  return `${hari} hari`;
};

const formatCurrency = (num: number = 0) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

onMounted(fetchDonations);

watch(searchQuery, () => {
  currentPage.value = 1;
});
</script>

<style scoped>
.page-button {
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}
.page-button:hover:not(:disabled) {
  background-color: #e0e0e0;
}
.page-button:disabled {
  background-color: #f9f9f9;
  color: #ccc;
  cursor: not-allowed;
}

/* Ensure proper layout */
.min-h-screen {
  min-height: 100vh;
}
</style>
