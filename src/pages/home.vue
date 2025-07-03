<template>
  <div class="w-full bg-gray-50 min-h-screen flex flex-col font-poppins">
    <MainContent />

    <!-- Hero Section - Modern & Responsive -->
    <section
      class="relative bg-gradient-to-r from-lightseagreen-200 to-lightseagreen-100 text-white"
    >
      <div class="absolute inset-0 bg-black opacity-30"></div>
      <div
        class="absolute inset-0 bg-[url('/banner-image@2x.png')] bg-cover bg-center"
      ></div>
      <div class="relative z-10 max-w-6xl mx-auto px-5 py-24 md:py-32">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            CROWDFUNDED
          </h1>
          <p class="text-lg md:text-xl mb-8 leading-relaxed opacity-90">
            Galang dana untuk membantu mereka yang membutuhkan! Bersama-sama
            kita dapat memberikan perubahan yang positif dalam hidup orang lain.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              @click="router.push('/donasi')"
              class="bg-white text-lightseagreen-200 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Mulai Berdonasi
            </button>
            <button
              @click="router.push('/register')"
              class="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-lightseagreen-200 transition-all"
            >
              Galang Dana
            </button>
          </div>
        </div>
      </div>
    </section>
    <!-- Statistics Section -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-5">
        <!-- Loading State -->
        <div
          v-if="isLoading"
          class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
        >
          <div v-for="i in 4" :key="i" class="p-6 animate-pulse">
            <div class="h-8 bg-gray-200 rounded mb-2 w-20 mx-auto"></div>
            <div class="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
          </div>
        </div>

        <!-- Real Statistics -->
        <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div class="p-6">
            <div class="text-3xl font-bold text-lightseagreen-200 mb-2">
              {{ stats.activeCampaigns }}
            </div>
            <div class="text-gray-600">Campaign Aktif</div>
          </div>
          <div class="p-6">
            <div class="text-3xl font-bold text-lightseagreen-200 mb-2">
              {{ stats.totalRaised }}
            </div>
            <div class="text-gray-600">Dana Terkumpul</div>
          </div>
          <div class="p-6">
            <div class="text-3xl font-bold text-lightseagreen-200 mb-2">
              {{ stats.totalDonors }}
            </div>
            <div class="text-gray-600">Donatur</div>
          </div>
          <div class="p-6">
            <div class="text-3xl font-bold text-lightseagreen-200 mb-2">
              {{ stats.successRate }}
            </div>
            <div class="text-gray-600">Target Tercapai</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Action Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-5">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">
            Mau berbuat baik apa hari ini?
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Pilih cara terbaik untuk membantu sesama dan membuat perubahan
            positif
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Program Donasi -->
          <div
            class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer group"
            @click="router.push('/donasi')"
          >
            <div
              class="w-16 h-16 bg-lightseagreen-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-lightseagreen-200 transition-colors"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Program Donasi</h3>
            <p class="text-gray-600 mb-4">
              Berikan bantuan untuk berbagai program kemanusiaan yang
              membutuhkan
            </p>
            <span
              class="text-lightseagreen-200 font-semibold group-hover:underline"
              >Lihat Program →</span
            >
          </div>

          <!-- Berita & Update -->
          <div
            class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer group"
            @click="router.push('/berita')"
          >
            <div
              class="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M2 3a1 1 0 011-1h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3a1 1 0 000 2zm13 15.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">
              Berita & Update
            </h3>
            <p class="text-gray-600 mb-4">
              Dapatkan informasi terbaru tentang dampak donasi dan kegiatan
              platform
            </p>
            <span class="text-blue-500 font-semibold group-hover:underline"
              >Baca Berita →</span
            >
          </div>

          <!-- Profil & Riwayat -->
          <div
            class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer group"
            @click="router.push('/profil')"
          >
            <div
              class="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">
              Profil & Riwayat
            </h3>
            <p class="text-gray-600 mb-4">
              Kelola akun dan lihat riwayat donasi yang telah Anda berikan
            </p>
            <span class="text-purple-500 font-semibold group-hover:underline"
              >Lihat Profil →</span
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Campaign Preview Section -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-5">
        <div class="flex justify-between items-center mb-12">
          <div>
            <h2 class="text-3xl font-bold text-gray-800 mb-2">
              Campaign Populer
            </h2>
            <p class="text-gray-600">
              Campaign yang paling banyak didukung oleh para donatur
            </p>
          </div>
          <button
            @click="router.push('/donasi')"
            class="bg-lightseagreen-200 text-white font-bold py-2 px-6 rounded-lg hover:bg-lightseagreen-100 transition-colors"
          >
            Lihat Semua
          </button>
        </div>
        <!-- Loading State for Campaigns -->
        <div
          v-if="isLoading"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div
            v-for="i in 3"
            :key="i"
            class="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
          >
            <div class="h-48 bg-gray-200"></div>
            <div class="p-4">
              <div class="h-6 bg-gray-200 rounded mb-2"></div>
              <div class="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div class="h-2 bg-gray-200 rounded mb-2"></div>
              <div class="flex justify-between">
                <div class="h-4 bg-gray-200 rounded w-20"></div>
                <div class="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Data State -->
        <div
          v-else-if="popularCampaigns.length === 0"
          class="text-center py-12"
        >
          <div class="text-gray-500 mb-4">
            <svg
              class="w-16 h-16 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">
            Belum Ada Campaign
          </h3>
          <p class="text-gray-500 mb-6">
            Saat ini belum ada campaign yang tersedia
          </p>
          <button
            @click="router.push('/register')"
            class="bg-lightseagreen-200 text-white font-bold py-2 px-6 rounded-lg hover:bg-lightseagreen-100 transition-colors"
          >
            Buat Campaign Pertama
          </button>
        </div>

        <!-- Real Campaign Data -->
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <!-- Campaign Item -->
          <div
            v-for="campaign in popularCampaigns"
            :key="campaign.id"
            class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
            @click="router.push(`/detail-donasi?id=${campaign.id}`)"
          >
            <div class="relative">
              <img
                :src="getImageUrl(campaign.image)"
                :alt="campaign.title"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                @error="
                  (e) =>
                    ((e.target as HTMLImageElement).src =
                      '/placeholder-campaign-1.jpg')
                "
              />
              <div class="absolute inset-0 bg-black opacity-30"></div>
              <div
                class="absolute top-4 right-4 bg-lightseagreen-200 text-white px-2 py-1 rounded-full text-xs font-semibold"
              >
                {{ campaign.progress }}% Tercapai
              </div>
              <div class="p-4 relative z-10">
                <h3
                  class="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-lightseagreen-100 transition-colors"
                >
                  {{ campaign.title }}
                </h3>
                <p class="text-gray-200 text-sm mb-4 line-clamp-3">
                  {{ campaign.description }}
                </p>
                <div class="flex justify-between items-center mb-4">
                  <div class="text-lightseagreen-200 font-semibold text-sm">
                    {{ formatCurrency(campaign.raised) }} /
                    {{ formatCurrency(campaign.target) }}
                  </div>
                  <div class="flex items-center">
                    <div class="w-16 h-2.5 bg-gray-300 rounded-full mr-2">
                      <div
                        class="h-2.5 bg-lightseagreen-200 rounded-full transition-all duration-500"
                        :style="{
                          width: Math.min(campaign.progress, 100) + '%',
                        }"
                      ></div>
                    </div>
                    <span class="text-gray-200 text-xs"
                      >{{ campaign.progress }}%</span
                    >
                  </div>
                </div>
                <div
                  class="flex justify-between items-center text-gray-200 text-xs mb-4"
                >
                  <span>{{ formatDonorCount(campaign.donors) }} Donatur</span>
                  <span
                    v-if="campaign.progress >= 100"
                    class="text-green-400 font-semibold"
                    >✓ Target Tercapai</span
                  >
                  <span v-else class="text-yellow-400">Masih Berlangsung</span>
                </div>
                <div class="mt-4">
                  <button
                    @click.stop="
                      router.push(`/detail-donasi?id=${campaign.id}`)
                    "
                    class="w-full bg-lightseagreen-200 text-white font-bold py-2 px-4 rounded-lg hover:bg-lightseagreen-100 transition-colors"
                  >
                    Donasi Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest News Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-5">
        <div class="flex justify-between items-center mb-12">
          <div>
            <h2 class="text-3xl font-bold text-gray-800 mb-2">
              Berita Terbaru
            </h2>
            <p class="text-gray-600">
              Update dan informasi terkini seputar kegiatan platform
            </p>
          </div>
          <button
            @click="router.push('/berita')"
            class="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Lihat Semua Berita
          </button>
        </div>

        <!-- Loading State for News -->
        <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="i in 3"
            :key="i"
            class="bg-white rounded-lg overflow-hidden shadow-md animate-pulse"
          >
            <div class="h-40 bg-gray-200"></div>
            <div class="p-4">
              <div class="h-4 bg-gray-200 rounded mb-2"></div>
              <div class="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
              <div class="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>

        <!-- No News State -->
        <div v-else-if="news.length === 0" class="text-center py-12">
          <div class="text-gray-500 mb-4">
            <svg
              class="w-16 h-16 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M2 3a1 1 0 011-1h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3a1 1 0 000 2zm13 15.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">
            Belum Ada Berita
          </h3>
          <p class="text-gray-500">Belum ada berita yang tersedia saat ini</p>
        </div>

        <!-- Real News Data -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="article in news.slice(0, 3)"
            :key="article.id"
            class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
            @click="router.push(`/berita/${article.id}`)"
          >
            <img
              :src="getImageUrl(article.image)"
              :alt="article.title"
              class="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              @error="
                (e) =>
                  ((e.target as HTMLImageElement).src = '/placeholder-news.jpg')
              "
            />
            <div class="p-4">
              <h3
                class="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
              >
                {{ article.title }}
              </h3>
              <p class="text-gray-600 text-sm line-clamp-2 mb-3">
                {{ getContentPreview(article.content) }}
              </p>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500">
                  {{ formatDate(article.createdAt) }}
                </span>
                <span
                  class="text-blue-500 text-sm font-semibold group-hover:underline"
                >
                  Baca →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Help Section -->
    <HelpThem />

    <!-- Footer -->
    <GroupComponent4 />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import MainContent from "../components/main-content.vue";
import HelpThem from "../components/help-them.vue";
import GroupComponent4 from "../components/footer.vue";

// Interface definitions - Sesuai dengan backend response
interface Campaign {
  id: string;
  title: string;
  description: string;
  image: string;
  donationTarget: number; // Dari backend
  donationCollected: number; // Dari backend
  donationStartDate: string;
  donationFinishedDate: string;
  statusDonasi: string; // Dari backend
  totalDonors: number; // ✅ FIELD BARU - Jumlah donor unik real-time dari backend
  createdAt: string;
  updatedAt: string;
}

interface News {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
}

const apiBaseUrl =
  import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3001/v1/";

// Reactive variables
const router = useRouter();
const isLoading = ref(true);
const campaigns = ref<Campaign[]>([]);
const news = ref<News[]>([]);
const error = ref<string | null>(null);
const globalStatistics = ref<{
  totalDonors: number;
  activeCampaigns: number;
  totalRaised: number;
  successRate: number;
} | null>(null);

// Computed properties - Transform backend data ke format yang dibutuhkan frontend
const popularCampaigns = computed(() => {
  return campaigns.value
    .filter((campaign) => {
      // Filter campaign aktif berdasarkan tanggal dan status
      const now = new Date();
      const endDate = new Date(campaign.donationFinishedDate);
      return campaign.statusDonasi === "published" && endDate > now;
    })
    .sort((a, b) => b.donationCollected - a.donationCollected) // Sort by collected amount
    .slice(0, 3)
    .map((campaign) => {
      const progress =
        campaign.donationTarget > 0
          ? Math.round(
              (campaign.donationCollected / campaign.donationTarget) * 100
            )
          : 0;

      return {
        id: campaign.id,
        title: campaign.title,
        description: campaign.description,
        image: campaign.image,
        raised: campaign.donationCollected,
        target: campaign.donationTarget,
        progress: Math.min(progress, 100), // Cap at 100%
        donors: campaign.totalDonors || 0, // Use real donor count from backend
      };
    });
});

const stats = computed(() => {
  // ✅ Use dedicated statistics endpoint if available (prevents double counting)
  if (globalStatistics.value) {
    return {
      activeCampaigns:
        globalStatistics.value.activeCampaigns.toLocaleString("id-ID"),
      totalRaised: formatCurrency(globalStatistics.value.totalRaised),
      totalDonors: formatDonorCount(globalStatistics.value.totalDonors),
      successRate: globalStatistics.value.successRate + "%",
    };
  }

  // Fallback: Calculate statistics from campaigns data (may have double counting)
  const activeCampaigns = campaigns.value.filter((campaign) => {
    const now = new Date();
    const endDate = new Date(campaign.donationFinishedDate);
    return campaign.statusDonasi === "published" && endDate > now;
  });

  const totalRaised = campaigns.value.reduce(
    (sum, campaign) => sum + (campaign.donationCollected || 0),
    0
  );

  const successfulCampaigns = campaigns.value.filter(
    (campaign) => campaign.donationCollected >= campaign.donationTarget
  );

  const successRate =
    campaigns.value.length > 0
      ? (successfulCampaigns.length / campaigns.value.length) * 100
      : 0;

  return {
    activeCampaigns: activeCampaigns.length.toLocaleString("id-ID") + "+",
    totalRaised: formatCurrency(totalRaised),
    totalDonors: calculateTotalDonors(), // Fallback calculation (may double count)
    successRate: Math.round(successRate) + "%",
  };
});

// Helper functions
const calculateTotalDonors = () => {
  // ⚠️ FALLBACK: This method may double-count users who donated to multiple campaigns
  // Should only be used when statistics endpoint is not available
  console.warn(
    "⚠️ Using fallback donor calculation - may have double counting issue"
  );

  const totalFromBackend = campaigns.value.reduce(
    (sum, campaign) => sum + (campaign.totalDonors || 0),
    0
  );

  // Log potential issue
  if (totalFromBackend > campaigns.value.length * 5) {
    console.warn(
      "⚠️ Donor count seems unusually high - likely double counting users across campaigns"
    );
    console.warn(
      `💡 Consider using /crowdfounding/statistics endpoint for accurate count`
    );
  }

  return formatDonorCount(totalFromBackend);
};

const formatDonorCount = (count: number) => {
  if (!count || count === 0) return "0";
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K+`;
  }
  return count.toString();
};

const formatCurrency = (amount: number) => {
  if (!amount || amount === 0) return "Rp 0";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getImageUrl = (imageName: string) => {
  if (!imageName) return "/placeholder-campaign-1.jpg";
  if (imageName.startsWith("http")) return imageName;
  return `${imageName}`;
};

const getContentPreview = (content: string) => {
  if (!content) return "Tidak ada preview tersedia...";
  return content.length > 100 ? content.substring(0, 100) + "..." : content;
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// API Functions - Menggunakan endpoint yang benar
const fetchCampaigns = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found, using fallback data");
      return;
    }

    // Menggunakan endpoint crowdfounding (sesuai backend)
    const response = await axios.get(`${apiBaseUrl}crowdfounding`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }); // Handle response structure dari backend
    const responseData = response.data.data;
    campaigns.value = responseData?.data || responseData || []; // Debug: Log donor count information
    console.log("📊 Campaign Data Debug:", {
      totalCampaigns: campaigns.value.length,
      campaignsWithDonors: campaigns.value.filter((c) => c.totalDonors > 0)
        .length,
      perCampaignDonorsSum: campaigns.value.reduce(
        (sum, c) => sum + (c.totalDonors || 0),
        0
      ),
      sampleCampaign: campaigns.value[0]
        ? {
            title: campaigns.value[0].title,
            totalDonors: campaigns.value[0].totalDonors,
          }
        : null,
      note: "⚠️ perCampaignDonorsSum may double-count users who donated to multiple campaigns",
    });

    error.value = null;
  } catch (err) {
    console.error("Error fetching campaigns:", err);
    campaigns.value = [];
    error.value = "Gagal memuat data campaign";
  }
};

const fetchStatistics = async () => {
  // ✅ Use dedicated statistics endpoint for accurate global unique donor count
  try {
    const response = await axios.get(`${apiBaseUrl}crowdfounding/statistics`);

    const statisticsData = response.data.data;
    globalStatistics.value = statisticsData;

    console.log("✅ Using dedicated statistics endpoint:", {
      totalDonors: statisticsData.totalDonors,
      activeCampaigns: statisticsData.activeCampaigns,
      totalRaised: statisticsData.totalRaised,
      successRate: statisticsData.successRate,
    });

    return statisticsData;
  } catch (err) {
    console.log(
      "📊 Statistics endpoint not available, using campaign data calculation"
    );
    console.warn(
      "⚠️ This may cause double counting of donors who donated to multiple campaigns"
    );
    globalStatistics.value = null;
    return null;
  }
};

const fetchNews = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found, using fallback data");
      return;
    }

    const response = await axios.get(`${apiBaseUrl}news`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    news.value = response.data.data?.data || response.data.data || [];
  } catch (err) {
    console.error("Error fetching news:", err);
    news.value = [];
  }
};

// Load all data on component mount
onMounted(async () => {
  isLoading.value = true;
  try {
    // ✅ Fetch statistics first (most important for homepage)
    const statisticsData = await fetchStatistics();

    // Fetch other data in parallel
    await Promise.all([fetchCampaigns(), fetchNews()]);

    // Log final state for debugging
    if (statisticsData) {
      console.log(
        "🎉 Homepage using accurate statistics from dedicated endpoint"
      );
      console.log("📊 Global unique donors:", statisticsData.totalDonors);
    } else {
      console.log(
        "⚠️ Homepage using fallback calculation (potential double counting)"
      );
    }
  } catch (err) {
    console.error("Error loading home page data:", err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
/* Loading spinner animation */
.loading-spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2dd4bf;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Improved hover effects */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Card improvements */
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Line clamp utilities */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}

/* Additional custom styles if needed */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Gradient background utility */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

/* Hover transform effects */
.transform {
  transform: translateZ(0);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Focus states for better accessibility */
button:focus {
  outline: 2px solid #2dd4bf;
  outline-offset: 2px;
}
</style>
