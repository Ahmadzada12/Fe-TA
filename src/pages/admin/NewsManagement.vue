<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Kelola Berita</h1>
        <p class="text-gray-600">Manajemen artikel dan berita platform</p>
      </div>
      <div class="flex space-x-2">
        <!-- Debug Button -->
        <button
          @click="debugNews"
          class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <i class="mdi mdi-bug mr-2"></i>
          Debug
        </button>
        <button
          @click="showCreateForm = true"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <i class="mdi mdi-plus mr-2"></i>
          Tambah Berita
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Cari Berita</label
          >
          <input
            v-model="filters.search"
            type="text"
            placeholder="Judul atau konten..."
            @input="onFilterChange"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Kategori</label
          >
          <select
            v-model="filters.category"
            @change="onFilterChange"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Status</label
          >
          <select
            v-model="filters.status"
            @change="onFilterChange"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Semua Status</option>
            <option value="published">Published</option>
            <option value="unpublished">Draft</option>
          </select>
        </div>
        <div class="flex items-end space-x-2">
          <button
            @click="clearFilters"
            class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            <i class="mdi mdi-close mr-2"></i>
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Filter Results Info -->
    <div
      v-if="hasActiveFilters"
      class="bg-blue-50 border border-blue-200 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <i class="mdi mdi-filter text-blue-500 mr-2"></i>
          <span class="text-blue-700 font-medium">
            Filter aktif: {{ getActiveFiltersText() }}
          </span>
        </div>
        <button
          @click="clearFilters"
          class="text-blue-600 hover:text-blue-800 text-sm underline"
        >
          Hapus semua filter
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
      ></div>
    </div>

    <!-- Error with Backend Connection Info -->
    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 rounded-lg p-6"
    >
      <div class="flex items-start">
        <i class="mdi mdi-alert-circle text-red-500 mr-3 text-xl"></i>
        <div class="flex-1">
          <h4 class="text-red-800 font-medium mb-2">Terjadi Kesalahan</h4>
          <p class="text-red-700 mb-4">{{ error }}</p>

          <!-- Backend Connection Help -->
          <div
            v-if="
              error.includes('ERR_CONNECTION_REFUSED') ||
              error.includes('Network Error') ||
              error.includes('Backend server')
            "
            class="bg-red-100 border border-red-300 rounded-lg p-4"
          >
            <h5 class="font-medium text-red-800 mb-2">
              🔌 Backend Connection Issue
            </h5>
            <p class="text-red-700 text-sm mb-3">
              Backend server tidak dapat diakses. Pastikan server berjalan di:
              <code class="bg-red-200 px-2 py-1 rounded"
                >http://localhost:3001</code
              >
            </p>
            <div class="text-sm text-red-600">
              <p class="mb-1"><strong>Solusi:</strong></p>
              <ol class="list-decimal list-inside space-y-1">
                <li>
                  Jalankan backend server:
                  <code class="bg-red-200 px-1 rounded">npm run start:dev</code>
                </li>
                <li>Pastikan port 3001 tidak digunakan aplikasi lain</li>
                <li>Check backend terminal untuk error logs</li>
                <li>Refresh halaman setelah backend berjalan</li>
              </ol>
            </div>
          </div>

          <!-- Retry Button -->
          <div class="mt-4 flex space-x-3">
            <button
              @click="retryConnection"
              :disabled="loading"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              <i class="mdi mdi-refresh mr-2"></i>
              {{ loading ? "Mencoba..." : "Coba Lagi" }}
            </button>
            <button
              @click="clearError"
              class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- News Table -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Berita
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Kategori
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Tanggal
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="!loading && !error && newsList.length === 0">
            <td colspan="5" class="px-6 py-12 text-center text-gray-500">
              <div class="flex flex-col items-center">
                <i class="fas fa-newspaper text-4xl mb-4 text-gray-300"></i>
                <p class="text-lg font-medium mb-2">
                  Tidak ada berita ditemukan
                </p>
                <p class="text-sm mb-4">
                  Coba refresh halaman atau tambah berita baru
                </p>
                <button
                  @click="loadNews"
                  class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  <i class="fas fa-refresh mr-2"></i>
                  Refresh
                </button>
              </div>
            </td>
          </tr>
          <tr v-for="news in newsList" :key="news.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <div class="flex items-center">
                <img
                  v-if="news.image"
                  :src="news.image"
                  :alt="news.title"
                  class="w-12 h-12 rounded-lg object-cover mr-4"
                />
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ news.title }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ truncateText(news.content || "", 60) }}
                  </p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ news.category?.name || "Tanpa Kategori" }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="getStatusClass(news.statusBerita)"
              >
                {{ getStatusDisplay(news.statusBerita) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(news.createdAt) }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2"
            >
              <!-- View/Show Action -->
              <button
                @click="viewNews(news)"
                class="text-gray-600 hover:text-gray-900 transition-colors mr-2"
                title="Lihat Detail"
              >
                <i class="mdi mdi-eye text-lg"></i>
              </button>

              <!-- Edit Action -->
              <button
                @click="editNews(news)"
                class="text-blue-600 hover:text-blue-900 transition-colors mr-2"
                title="Edit Berita"
              >
                <i class="mdi mdi-pencil text-lg"></i>
              </button>

              <!-- Delete Action -->
              <button
                @click="confirmDelete(news)"
                class="text-red-600 hover:text-red-900 transition-colors"
                title="Hapus Berita"
              >
                <i class="mdi mdi-delete text-lg"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateForm || showEditForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <h3 class="text-lg font-semibold mb-4">
          {{ showEditForm ? "Edit Berita" : "Tambah Berita Baru" }}
        </h3>

        <form @submit.prevent="saveNews" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Judul</label
            >
            <input
              v-model="newsForm.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Konten</label
            >
            <textarea
              v-model="newsForm.content"
              rows="6"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Kategori</label
            >
            <select
              v-model="newsForm.categoryId"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Pilih Kategori</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Campaign Terkait</label
            >
            <select
              v-model="newsForm.crowdfoundingId"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Pilih Campaign</option>
              <option
                v-for="campaign in donations"
                :key="campaign.id"
                :value="campaign.id"
              >
                {{ campaign.title }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Gambar</label
            >
            <input
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Status</label
            >
            <select
              v-model="newsForm.statusBerita"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="unpublished">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeForm"
              class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {{ loading ? "Menyimpan..." : "Simpan" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
        <p class="text-gray-600 mb-6">
          Apakah Anda yakin ingin menghapus berita "{{ selectedNews?.title }}"?
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            @click="deleteNews"
            :disabled="loading"
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
          >
            {{ loading ? "Menghapus..." : "Hapus" }}
          </button>
        </div>
      </div>
    </div>

    <!-- News Detail Modal -->
    <div
      v-if="showDetailModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-gray-900">Detail Berita</h3>
          <button
            @click="showDetailModal = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <div v-if="selectedNews" class="space-y-6">
          <!-- News Image -->
          <div v-if="selectedNews.image" class="text-center">
            <img
              :src="selectedNews.image"
              :alt="selectedNews.title"
              class="max-w-full h-auto rounded-lg shadow-lg mx-auto"
              style="max-height: 300px"
            />
          </div>

          <!-- News Title -->
          <div>
            <h4 class="text-2xl font-bold text-gray-900 mb-2">
              {{ selectedNews.title }}
            </h4>
            <div class="flex items-center space-x-4 text-sm text-gray-600">
              <span>
                <i class="fas fa-calendar mr-1"></i>
                {{ formatDate(selectedNews.createdAt) }}
              </span>
              <span
                :class="getStatusClass(selectedNews.statusBerita)"
                class="px-2 py-1 rounded-full text-xs font-medium"
              >
                {{ getStatusDisplay(selectedNews.statusBerita) }}
              </span>
            </div>
          </div>

          <!-- News Meta Info -->
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Kategori</label
              >
              <p class="text-gray-900">
                {{
                  categories.find((c) => c.id === selectedNews.categoryId)
                    ?.name || "Tidak ada kategori"
                }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Campaign Terkait</label
              >
              <p class="text-gray-900">
                {{
                  donations.find((d) => d.id === selectedNews.crowdfoundingId)
                    ?.title || "Tidak ada campaign"
                }}
              </p>
            </div>
          </div>

          <!-- News Content -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Konten</label
            >
            <div class="prose max-w-none bg-gray-50 p-4 rounded-lg">
              <p class="text-gray-900 whitespace-pre-wrap">
                {{ selectedNews.content }}
              </p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 pt-4 border-t">
            <button
              @click="showDetailModal = false"
              class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Tutup
            </button>
            <button
              @click="
                editNews(selectedNews);
                showDetailModal = false;
              "
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <i class="fas fa-edit mr-2"></i>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { useAdmin } from "../../composables/useAdmin";

const {
  loading,
  error,
  news,
  categories,
  donations,
  getNews,
  getCategories,
  getDonations,
  createNews,
  updateNews,
  deleteNews: deleteNewsAPI,
} = useAdmin();

const newsList = computed(() => news.value || []);

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return !!(filters.search || filters.status || filters.category);
});

// Get active filters text
const getActiveFiltersText = () => {
  const activeFilters = [];
  if (filters.search) activeFilters.push(`"${filters.search}"`);
  if (filters.status)
    activeFilters.push(`Status: ${getStatusDisplay(filters.status)}`);
  if (filters.category) {
    const category = categories.value.find((c) => c.id === filters.category);
    if (category) activeFilters.push(`Kategori: ${category.name}`);
  }
  return activeFilters.join(", ");
};
const showCreateForm = ref(false);
const showEditForm = ref(false);
const showDeleteModal = ref(false);
const showDetailModal = ref(false);
const selectedNews = ref<any>(null);

const filters = reactive({
  search: "",
  status: "",
  category: "",
});

const newsForm = reactive({
  id: "",
  title: "",
  content: "",
  statusBerita: "published",
  categoryId: "",
  crowdfoundingId: "",
  image: null as File | null,
});

const loadNews = async () => {
  try {
    console.log("=== Loading News ===");
    console.log("Filters:", filters);

    const params: any = {};
    if (filters.search?.trim()) params.search = filters.search.trim();
    if (filters.status) params.status = filters.status;
    if (filters.category) params.categoryId = filters.category;

    console.log("API params:", params);

    const response = await getNews(params);

    console.log("=== RESPONSE DEBUG ===");
    console.log("Full API response:", response);
    console.log("response.data:", response?.data);
    console.log("response.data.data:", response?.data?.data);
    console.log("response.data.meta:", response?.data?.meta);
    console.log("response.message:", response?.message);
    console.log("Is response.data an array?", Array.isArray(response?.data));
    console.log(
      "Is response.data.data an array?",
      Array.isArray(response?.data?.data)
    );
    console.log("response.data.data length:", response?.data?.data?.length);

    console.log("=== STATE DEBUG ===");
    console.log("News reactive state after API call:", news.value);
    console.log("News list computed after API call:", newsList.value);
    console.log("Loading state:", loading.value);
    console.log("Error state:", error.value);

    if (!newsList.value || newsList.value.length === 0) {
      console.warn("⚠️  No news data found after API call");
    } else {
      console.log(`✅ Successfully loaded ${newsList.value.length} news items`);
    }
  } catch (err) {
    console.error("❌ Error loading news:", err);
  }
};

// Debounce function for search input
let filterTimeout: number;
const onFilterChange = () => {
  clearTimeout(filterTimeout);
  filterTimeout = setTimeout(() => {
    loadNews();
  }, 500); // 500ms delay
};

const clearFilters = () => {
  filters.search = "";
  filters.status = "";
  filters.category = "";
  loadNews();
};

const debugNews = () => {
  console.log("=== NEWS DEBUG INFO ===");
  console.log("Loading state:", loading.value);
  console.log("Error state:", error.value);
  console.log("News reactive state:", news.value);
  console.log("News reactive type:", typeof news.value);
  console.log("News reactive is array:", Array.isArray(news.value));
  console.log("News list computed:", newsList.value);
  console.log("News list computed type:", typeof newsList.value);
  console.log("News list computed is array:", Array.isArray(newsList.value));
  console.log("News list length:", newsList.value.length);
  console.log("Categories count:", categories.value.length);
  console.log("Categories data:", categories.value);
  console.log("Categories raw:", JSON.stringify(categories.value, null, 2));
  console.log("Donations count:", donations.value.length);
  console.log("Donations data:", donations.value);
  console.log("Donations raw:", JSON.stringify(donations.value, null, 2));
  console.log("Filters:", filters);

  // Manual API call to see raw response
  console.log("=== MANUAL API TEST ===");
  const token = localStorage.getItem("token");
  const API_BASE_URL = "http://localhost:3001/v1";

  fetch(`${API_BASE_URL}/news`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Manual API response:", data);
    })
    .catch((err) => {
      console.error("Manual API error:", err);
    });
};

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    newsForm.image = target.files[0];
  }
};

const saveNews = async () => {
  try {
    console.log("=== SAVING NEWS ===");
    console.log("Form data:", newsForm);
    console.log("Categories available:", categories.value);
    console.log("Donations available:", donations.value);

    // Validate required fields
    if (!newsForm.title.trim()) {
      alert("Judul harus diisi");
      return;
    }
    if (!newsForm.content.trim()) {
      alert("Konten harus diisi");
      return;
    }
    if (!newsForm.categoryId) {
      alert("Kategori harus dipilih");
      return;
    }
    if (!newsForm.crowdfoundingId) {
      alert("Campaign harus dipilih");
      return;
    }

    const formData = new FormData();
    formData.append("title", newsForm.title);
    formData.append("content", newsForm.content);
    formData.append("statusBerita", newsForm.statusBerita);
    formData.append("categoryId", newsForm.categoryId);
    formData.append("crowdfoundingId", newsForm.crowdfoundingId);

    if (newsForm.image) {
      formData.append("image", newsForm.image);
    }

    console.log("FormData entries:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    if (newsForm.id) {
      // Update existing news
      await updateNews(newsForm.id, formData);
      console.log("✅ News updated successfully");
    } else {
      // Create new news
      await createNews(formData);
      console.log("✅ News created successfully");
    }

    closeForm();
    await loadNews(); // Reload news data
  } catch (err: any) {
    console.error("Error saving news:", err);
    alert(`Error saving news: ${err.response?.data?.message || err.message}`);
  }
};

const editNews = (news: any) => {
  Object.assign(newsForm, news);
  showEditForm.value = true;
};

const viewNews = (news: any) => {
  selectedNews.value = news;
  showDetailModal.value = true;
};

const confirmDelete = (news: any) => {
  selectedNews.value = news;
  showDeleteModal.value = true;
};

const deleteNews = async () => {
  try {
    await deleteNewsAPI(selectedNews.value.id);
    showDeleteModal.value = false;
    await loadNews(); // Reload news data
  } catch (err) {
    console.error("Error deleting news:", err);
  }
};

const closeForm = () => {
  showCreateForm.value = false;
  showEditForm.value = false;
  showDetailModal.value = false;
  Object.assign(newsForm, {
    id: "",
    title: "",
    content: "",
    statusBerita: "published",
    categoryId: "",
    crowdfoundingId: "",
    image: null,
  });
};

const truncateText = (text: string, length: number) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800";
    case "unpublished":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusDisplay = (status: string) => {
  switch (status) {
    case "published":
      return "Published";
    case "unpublished":
      return "Draft";
    default:
      return status;
  }
};

// Error handling methods
const retryConnection = async () => {
  console.log("🔄 Retrying connection...");
  error.value = null;
  await loadNews();
  await getCategories();
  await getDonations();
};

const clearError = () => {
  error.value = null;
};

onMounted(async () => {
  console.log("=== LOADING INITIAL DATA ===");

  await loadNews();
  console.log("News loaded, count:", newsList.value.length);

  await getCategories();
  console.log("Categories loaded:", categories.value);
  console.log("Categories count:", categories.value.length);

  await getDonations();
  console.log("Donations loaded:", donations.value);
  console.log("Donations count:", donations.value.length);

  console.log("=== INITIAL DATA LOADED ===");
});
</script>
