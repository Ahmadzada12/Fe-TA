<template>
  <div class="w-full bg-gray-50 min-h-screen flex flex-col font-poppins">
    <MainContent />
    <!-- Header Section -->
    <div class="w-full max-w-6xl mx-auto px-5 mt-8">
      <!-- Title -->
      <div class="text-center sm:text-left mb-6">
        <h1 class="text-3xl font-bold text-slate-800">Berita & Update</h1>
      </div>

      <!-- Search and Filter in One Row -->
      <div class="flex flex-row gap-3 items-center w-full mb-4">
        <!-- Search Input -->
        <div class="relative flex-1 min-w-0">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari berita..."
            class="w-11/12 p-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightseagreen-200 transition-shadow"
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

        <!-- Category Filter -->
        <div class="flex-shrink-0 w-48 min-w-[180px]">
          <select
            v-model="selectedCategory"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lightseagreen-200 bg-white"
          >
            <option value="">Semua Kategori</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Konten Utama -->
    <div class="flex-1 w-full flex flex-col">
      <main class="w-full max-w-6xl mx-auto px-5 mt-8 mb-16">
        <!-- State: Tidak ada data -->
        <div
          v-if="paginatedNews.length === 0"
          class="text-center py-20 text-gray-500"
        >
          <p class="text-lg">Tidak ada berita yang ditemukan.</p>
          <p v-if="searchQuery" class="text-sm">
            Coba ubah kata kunci pencarian Anda.
          </p>
        </div>

        <!-- State: Tampilkan Berita dalam Grid -->
        <div v-else>
          <div
            class="grid gap-8"
            style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              grid-template-rows: repeat(3, minmax(350px, auto));
              min-height: 800px;
              width: 100%;
            "
          >
            <!-- Kartu Berita -->
            <div v-for="index in 9" :key="index" class="grid-slot">
              <div
                v-if="paginatedNews[index - 1]"
                class="card bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300 group h-full"
              >
                <!-- Gambar Berita -->
                <img
                  class="h-52 w-full object-cover cursor-pointer"
                  loading="lazy"
                  :alt="paginatedNews[index - 1].title"
                  :src="getImageUrl(paginatedNews[index - 1].image)"
                  @error="
                    (e) =>
                      ((e.target as HTMLImageElement).src =
                        '/fallback-news.jpg')
                  "
                  @click="onBacaClick(paginatedNews[index - 1].id)"
                />

                <!-- Konten Kartu -->
                <div class="card-content flex-1 flex flex-col p-4">
                  <!-- Kategori Badge -->
                  <div class="mb-3">
                    <span
                      class="inline-block bg-lightseagreen-200 text-white text-xs font-bold px-3 py-1 rounded-full"
                    >
                      {{
                        paginatedNews[index - 1].category?.name ||
                        "Uncategorized"
                      }}
                    </span>
                  </div>

                  <!-- Judul Berita -->
                  <h3
                    class="relative leading-tight line-clamp-3 h-16 cursor-pointer group-hover:text-lightseagreen-300 font-semibold mb-3"
                    @click="onBacaClick(paginatedNews[index - 1].id)"
                    :title="paginatedNews[index - 1].title"
                  >
                    {{ paginatedNews[index - 1].title }}
                  </h3>

                  <!-- Konten Preview -->
                  <p class="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                    {{ getContentPreview(paginatedNews[index - 1].content) }}
                  </p>

                  <!-- Tanggal dan Tombol Baca -->
                  <div class="flex justify-between items-center mt-auto">
                    <span class="text-xs text-gray-500">
                      {{ formatDate(paginatedNews[index - 1].createdAt) }}
                    </span>
                    <button
                      class="bg-lightseagreen-200 text-white font-bold py-2 px-4 rounded-lg hover:bg-lightseagreen-100 transition-colors text-sm"
                      @click="onBacaClick(paginatedNews[index - 1].id)"
                    >
                      Baca Selengkapnya
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
            <span class="text-gray-700 font-medium text-sm">
              Halaman {{ currentPage }} dari {{ totalPages }}
            </span>
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
    <GroupComponent />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  getCurrentInstance,
} from "vue";
import axios from "axios";
import GroupComponent from "../components/footer.vue";
import MainContent from "../components/main-content.vue";

interface News {
  id: string;
  title: string;
  category: {
    id: string;
    name: string;
  };
  content: string;
  image: string;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
}

const apiBaseUrl =
  import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3001/v1/";
export default defineComponent({
  name: "Berita1",
  components: {
    MainContent,
    GroupComponent,
  },
  setup() {
    const newsList = ref<News[]>([]);
    const categories = ref<Category[]>([]);
    const selectedCategory = ref("");
    const searchQuery = ref("");
    const currentPage = ref(1);
    const itemsPerPage = 9;
    const instance = getCurrentInstance(); // Get the current Vue instance

    // Watcher untuk reset halaman saat pencarian berubah
    // watch(searchQuery, () => {
    //   currentPage.value = 1;
    // });

    // Filter berita
    const filteredNews = computed(() => {
      return newsList.value.filter((news) => {
        const matchesQuery =
          news.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          news.content?.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesCategory =
          !selectedCategory.value ||
          news.category?.id === selectedCategory.value;
        return matchesQuery && matchesCategory;
      });
    });

    // Fetch data
    const fetchNews = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in local storage");
        }
        const response = await axios.get(`${apiBaseUrl}news`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        newsList.value = response.data.data.data;
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in local storage");
        }
        const response = await axios.get(`${apiBaseUrl}category`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        categories.value = response.data.data.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    onMounted(() => {
      fetchNews();
      fetchCategories(); // Pastikan fetchCategories dipanggil di sini
    });

    // Pagination
    const paginatedNews = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredNews.value.slice(start, end);
    });

    const totalPages = computed(() =>
      Math.ceil(filteredNews.value.length / itemsPerPage)
    );

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };
    const onBacaClick = (newsId: string) => {
      const router = instance?.proxy?.$router; // Access router via instance
      if (router) {
        router.push(`/berita/${newsId}`);
      } else {
        console.error("Router not found");
      }
    };
    const getImageUrl = (imageName: string) => {
      return `${imageName}`;
    };

    const getContentPreview = (content: string) => {
      if (!content) return "Tidak ada preview tersedia...";
      return content.length > 150 ? content.substring(0, 150) + "..." : content;
    };

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    return {
      newsList,
      categories,
      searchQuery,
      selectedCategory,
      currentPage,
      paginatedNews,
      filteredNews,
      totalPages,
      prevPage,
      nextPage,
      onBacaClick,
      getImageUrl,
      getContentPreview,
      formatDate,
    };
  },
});
</script>

<style scoped>
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

/* Page button styles */
.page-button {
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-button:hover:not(:disabled) {
  background-color: #e0e0e0;
  transform: translateY(-1px);
}

.page-button:disabled {
  background-color: #f9f9f9;
  color: #ccc;
  cursor: not-allowed;
}

/* Card hover effects */
.card {
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: rgba(45, 212, 191, 0.2);
}

/* Search and Filter responsive layout */
.search-filter-container {
  min-height: auto;
}

@media (max-width: 640px) {
  .search-filter-container {
    gap: 1rem;
  }

  .search-filter-container .relative {
    max-width: 100%;
  }

  .search-filter-container > div {
    width: 100%;
  }
}

@media (min-width: 1024px) {
  .search-filter-container {
    align-items: center;
  }

  .search-filter-container .relative {
    flex: 1;
    max-width: 400px;
  }
}

/* Grid responsive adjustments */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr !important;
    grid-template-rows: auto !important;
  }
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

/* Ensure proper layout */
.min-h-screen {
  min-height: 100vh;
}

/* Button hover effects */
button:hover {
  transform: translateY(-1px);
}

/* Focus states for accessibility */
input:focus,
select:focus,
button:focus {
  outline: 2px solid #2dd4bf;
  outline-offset: 2px;
}

/* Prevent layout overflow */
.search-filter-container input,
.search-filter-container select {
  min-width: 0;
  box-sizing: border-box;
}

/* Better mobile experience */
@media (max-width: 480px) {
  .search-filter-container {
    padding: 0;
  }

  .search-filter-container input,
  .search-filter-container select {
    font-size: 16px; /* Prevent zoom on iOS */
  }
}

/* Loading states can be added here if needed */
.card-loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
