<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Kelola Donasi</h1>
        <p class="text-gray-600">Manage donation campaigns</p>
      </div>
      <button
        @click="showAddModal = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        Tambah Donasi
      </button>
    </div>

    <!-- Filter Section -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Status</label
          >
          <select
            v-model="filters.status"
            @change="applyFilters"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Semua Status</option>
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Pencarian</label
          >
          <input
            v-model="filters.search"
            @input="applyFilters"
            type="text"
            placeholder="Cari berdasarkan judul..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Donations Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Daftar Donasi</h3>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Gambar
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Judul
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Target
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Terkumpul
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Periode
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kondisi
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="donation in filteredDonations" :key="donation.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <img
                  :src="donation.image || '/placeholder-image.jpg'"
                  :alt="donation.title"
                  class="h-10 w-10 rounded-lg object-cover"
                />
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">
                  {{ donation.title }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatCurrency(donation.donationTarget) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatCurrency(donation.donationCollected || 0) }}
                </div>
                <div class="text-xs text-gray-500">
                  {{
                    Math.round(
                      ((donation.donationCollected || 0) /
                        donation.donationTarget) *
                        100
                    )
                  }}%
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{
                    formatDateRange(
                      donation.donationStartDate,
                      donation.donationFinishedDate
                    )
                  }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusClass(donation.statusDonasi)"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ getStatusText(donation.statusDonasi) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  v-if="donation.deletedAt"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                >
                  Dihapus
                </span>
                <span
                  v-else
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                >
                  Aktif
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <template v-if="donation.deletedAt">
                  <button
                    @click="restoreDonation(donation.id)"
                    class="text-green-600 hover:text-green-900 mr-3"
                  >
                    Restore
                  </button>
                </template>
                <template v-else>
                  <button
                    @click="editDonation(donation)"
                    class="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteDonation(donation.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Hapus
                  </button>
                </template>
              </td>
            </tr>
            <tr v-if="filteredDonations.length === 0">
              <td colspan="7" class="px-6 py-4 text-center text-gray-500">
                {{
                  donations.length === 0
                    ? "Belum ada campaign"
                    : "Tidak ada campaign yang sesuai filter"
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div
      v-if="showAddModal || showEditModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div
        class="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white"
      >
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ showAddModal ? "Tambah Donasi Baru" : "Edit Donasi" }}
          </h3>

          <form
            @submit.prevent="showAddModal ? addDonation() : updateDonation()"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Judul Campaign</label
                >
                <input
                  v-model="donationForm.title"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Masukkan judul campaign"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Status</label
                >
                <select
                  v-model="donationForm.statusDonasi"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="published">Published</option>
                  <option value="unpublished">Unpublished</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Target Donasi (Rp)</label
                >
                <input
                  v-model="donationForm.donationTarget"
                  type="number"
                  min="0"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Donasi Terkumpul (Rp)</label
                >
                <input
                  v-model="donationForm.donationCollected"
                  type="number"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Tanggal Mulai</label
                >
                <input
                  v-model="donationForm.donationStartDate"
                  type="datetime-local"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Tanggal Selesai</label
                >
                <input
                  v-model="donationForm.donationFinishedDate"
                  type="datetime-local"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Gambar Campaign
                <span v-if="showAddModal" class="text-red-500">*</span>
                <span v-if="showEditModal" class="text-gray-500"
                  >(Opsional - kosongkan jika tidak ingin mengubah gambar)</span
                >
              </label>
              <input
                @change="handleImageUpload"
                type="file"
                accept="image/*"
                :required="showAddModal"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p class="text-xs text-gray-500 mt-1">
                Upload gambar untuk campaign (JPG, PNG, GIF)
                <span v-if="showEditModal" class="block mt-1 text-blue-600">
                  Gambar saat ini akan tetap digunakan jika tidak ada file baru
                  yang dipilih
                </span>
              </p>
            </div>

            <div class="flex justify-end gap-3">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {{
                  loading ? "Menyimpan..." : showAddModal ? "Tambah" : "Update"
                }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAdmin } from "../../composables/useAdmin";

const {
  donations,
  loading,
  getDonations,
  createDonation,
  updateDonation: updateDonationApi,
  deleteDonation: deleteDonationApi,
  restoreDonation: restoreDonationApi,
} = useAdmin();

const showAddModal = ref(false);
const showEditModal = ref(false);
const editingDonation = ref<any>(null);

const filters = ref({
  status: "",
  search: "",
});

const donationForm = ref({
  title: "",
  donationTarget: 0, // Backend expects 'donationTarget'
  donationCollected: 0, // Backend expects 'donationCollected'
  statusDonasi: "published", // Backend expects 'statusDonasi' with 'published'/'unpublished'
  image: null as File | null, // Backend expects File upload
  donationStartDate: "", // Required by backend
  donationFinishedDate: "", // Required by backend
});

const filteredDonations = computed(() => {
  let filtered = donations.value;

  if (filters.value.status) {
    filtered = filtered.filter((d) => d.statusDonasi === filters.value.status);
  }

  if (filters.value.search) {
    filtered = filtered.filter((d) =>
      d.title.toLowerCase().includes(filters.value.search.toLowerCase())
    );
  }

  return filtered;
});

const resetForm = () => {
  donationForm.value = {
    title: "",
    donationTarget: 0,
    donationCollected: 0,
    statusDonasi: "published",
    image: null,
    donationStartDate: "",
    donationFinishedDate: "",
  };
};

const closeModal = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  editingDonation.value = null;
  resetForm();
};

const addDonation = async () => {
  try {
    // Prepare FormData for file upload (backend expects multipart/form-data)
    const formData = new FormData();
    formData.append("title", donationForm.value.title);
    formData.append(
      "donationTarget",
      donationForm.value.donationTarget.toString()
    );
    formData.append(
      "donationCollected",
      donationForm.value.donationCollected.toString()
    );
    formData.append("statusDonasi", donationForm.value.statusDonasi);
    formData.append(
      "donationStartDate",
      new Date(donationForm.value.donationStartDate).toISOString()
    );
    formData.append(
      "donationFinishedDate",
      new Date(donationForm.value.donationFinishedDate).toISOString()
    );

    if (donationForm.value.image) {
      formData.append("image", donationForm.value.image);
    }

    console.log("🎯 Creating donation with FormData");
    await createDonation(formData);
    closeModal();
    await getDonations();
  } catch (error) {
    console.error("Error adding donation:", error);
    alert("Gagal menambah campaign. Silakan coba lagi.");
  }
};

const editDonation = (donation: any) => {
  editingDonation.value = donation;
  donationForm.value = {
    title: donation.title,
    donationTarget: donation.donationTarget || 0,
    donationCollected: donation.donationCollected || 0,
    statusDonasi: donation.statusDonasi || "published",
    image: null, // Reset image, user perlu upload ulang
    donationStartDate: donation.donationStartDate
      ? new Date(donation.donationStartDate).toISOString().slice(0, 16)
      : "",
    donationFinishedDate: donation.donationFinishedDate
      ? new Date(donation.donationFinishedDate).toISOString().slice(0, 16)
      : "",
  };
  showEditModal.value = true;
};

const updateDonation = async () => {
  if (!editingDonation.value) return;

  try {
    // Prepare FormData for file upload (backend expects multipart/form-data)
    const formData = new FormData();
    formData.append("title", donationForm.value.title);
    formData.append(
      "donationTarget",
      donationForm.value.donationTarget.toString()
    );
    formData.append(
      "donationCollected",
      donationForm.value.donationCollected.toString()
    );
    formData.append("statusDonasi", donationForm.value.statusDonasi);
    formData.append(
      "donationStartDate",
      new Date(donationForm.value.donationStartDate).toISOString()
    );
    formData.append(
      "donationFinishedDate",
      new Date(donationForm.value.donationFinishedDate).toISOString()
    );

    if (donationForm.value.image) {
      formData.append("image", donationForm.value.image);
    }

    console.log("🎯 Updating donation with FormData");
    await updateDonationApi(editingDonation.value.id.toString(), formData);
    closeModal();
    await getDonations();
  } catch (error) {
    console.error("Error updating donation:", error);
    alert("Gagal mengupdate campaign. Silakan coba lagi.");
  }
};

const deleteDonation = async (id: number) => {
  if (confirm("Apakah Anda yakin ingin menghapus donasi ini?")) {
    try {
      await deleteDonationApi(id.toString());
      await getDonations();
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  }
};

const restoreDonation = async (id: number) => {
  if (confirm("Apakah Anda yakin ingin mengembalikan donasi ini?")) {
    try {
      await restoreDonationApi(id.toString());
      await getDonations();
      alert("Campaign berhasil dikembalikan!");
    } catch (error) {
      console.error("Error restoring donation:", error);
      alert("Gagal mengembalikan campaign. Silakan coba lagi.");
    }
  }
};

const applyFilters = () => {
  // Filters are applied via computed property
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800";
    case "unpublished":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "published":
      return "Published";
    case "unpublished":
      return "Unpublished";
    default:
      return status;
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatDateRange = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return "-";
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return `${start} - ${end}`;
};

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    donationForm.value.image = target.files[0];
    console.log("📸 Image selected:", target.files[0].name);
  }
};

onMounted(() => {
  getDonations();
});
</script>
