<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div
      class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white"
    >
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold mb-2">
            Selamat Datang di Admin Panel!
          </h1>
          <p class="text-blue-100">
            Kelola platform donasi UNS dengan mudah dan efisien
          </p>
        </div>
        <button
          @click="loadDashboardData"
          :disabled="loading"
          class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-50"
        >
          <i
            class="fas fa-sync-alt mr-2"
            :class="{ 'animate-spin': loading }"
          ></i>
          Refresh
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
      ></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 rounded-lg p-4"
    >
      <div class="flex items-center">
        <i class="fas fa-exclamation-circle text-red-500 mr-2"></i>
        <span class="text-red-700">{{ error }}</span>
      </div>
    </div>

    <!-- Stats Cards -->
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
    >
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-600">{{ stat.label }}</p>
            <p class="text-xl font-bold text-gray-900 mt-1">
              {{
                stat.label === "Dana Terkumpul"
                  ? stat.value
                  : formatValue(stat.value)
              }}
            </p>
            <p
              v-if="stat.change"
              class="text-xs mt-1"
              :class="stat.changeColor"
            >
              {{ stat.change }}
            </p>
          </div>
          <div class="p-3 rounded-full" :class="stat.iconBg">
            <i :class="[stat.icon, stat.iconColor]" class="text-lg"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <router-link
          v-for="action in quickActions"
          :key="action.name"
          :to="action.to"
          :class="[
            action.color,
            'flex flex-col items-center p-4 rounded-lg text-white transition-colors',
          ]"
        >
          <i :class="action.icon" class="text-2xl mb-2"></i>
          <span class="text-sm font-medium">{{ action.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useAdmin } from "../../composables/useAdmin";

const { loading, error, getDashboardStats } = useAdmin();

const dashboardData = ref<any>({});

const stats = computed(() => [
  {
    label: "Total Berita",
    value: dashboardData.value?.totalNews || 0,
    icon: "fas fa-newspaper",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    change: "Berita aktif",
    changeColor: "text-blue-600",
  },
  {
    label: "Total Kategori",
    value: dashboardData.value?.totalCategories || 0,
    icon: "fas fa-tags",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    change: "Kategori donasi",
    changeColor: "text-green-600",
  },
  {
    label: "Total Campaign",
    value: dashboardData.value?.totalDonations || 0,
    icon: "fas fa-hand-holding-heart",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    change: `${dashboardData.value?.activeCampaigns || 0} aktif`,
    changeColor: "text-purple-600",
  },
  {
    label: "Total Pengguna",
    value: dashboardData.value?.totalUsers || 0,
    icon: "fas fa-users",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    change: "Pengguna terdaftar",
    changeColor: "text-orange-600",
  },
  {
    label: "Dana Terkumpul",
    value: dashboardData.value?.totalRaised
      ? formatCurrency(dashboardData.value.totalRaised)
      : "Rp 0",
    icon: "fas fa-coins",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    change: "Total donasi",
    changeColor: "text-yellow-600",
  },
]);

const quickActions = [
  {
    name: "Tambah Berita",
    icon: "fas fa-plus",
    to: "/admin/news",
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    name: "Kelola Donasi",
    icon: "fas fa-hand-holding-heart",
    to: "/admin/donations",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    name: "Kelola Kategori",
    icon: "fas fa-tags",
    to: "/admin/categories",
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    name: "Kelola Pengguna",
    icon: "fas fa-users",
    to: "/admin/users",
    color: "bg-orange-500 hover:bg-orange-600",
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("id-ID").format(num);
};

const formatValue = (value: any) => {
  if (typeof value === "number") {
    return formatNumber(value);
  }
  return value || "0";
};

const loadDashboardData = async () => {
  try {
    const response = await getDashboardStats();

    // Handle response format from backend
    const data = response?.data || response;

    if (data) {
      dashboardData.value = {
        totalNews: data.TotalNews || 0,
        totalCategories: data.TotalCategories || 0,
        totalDonations: data.TotalCrowdfunding || 0,
        totalUsers: data.TotalUsers || 0,
        totalRaised: data.TotalRaised || 0,
        activeCampaigns: data.ActiveCampaigns || 0,
      };
    }

    console.log("Dashboard data loaded:", dashboardData.value);
  } catch (err) {
    console.error("Error loading dashboard data:", err);
    // Set default values jika API gagal
    dashboardData.value = {
      totalNews: 0,
      totalCategories: 0,
      totalDonations: 0,
      totalUsers: 0,
      totalRaised: 0,
      activeCampaigns: 0,
    };
  }
};

onMounted(() => {
  loadDashboardData();
});
</script>
