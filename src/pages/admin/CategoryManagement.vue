<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Kelola Kategori</h1>
        <p class="text-gray-600">Manage donation categories</p>
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
        Tambah Kategori
      </button>
    </div>

    <!-- Categories Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Daftar Kategori</h3>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nama Kategori
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Deskripsi
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tanggal Dibuat
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="category in categories" :key="category.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ category.name }}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">
                  {{ category.description || "-" }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="bg-green-100 text-green-800 px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  Aktif
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(category.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="editCategory(category)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Edit
                </button>
                <button
                  @click="deleteCategory(category.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Hapus
                </button>
              </td>
            </tr>
            <tr v-if="categories.length === 0">
              <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                Belum ada kategori
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
        class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
      >
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ showAddModal ? "Tambah Kategori Baru" : "Edit Kategori" }}
          </h3>

          <form
            @submit.prevent="showAddModal ? addCategory() : updateCategory()"
          >
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nama Kategori</label
              >
              <input
                v-model="categoryForm.title"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Masukkan nama kategori"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Deskripsi</label
              >
              <textarea
                v-model="categoryForm.content"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Masukkan deskripsi kategori"
              ></textarea>
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Gambar (Opsional)</label
              >
              <input
                @change="handleImageUpload"
                type="file"
                accept="image/*"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p class="text-xs text-gray-500 mt-1">
                Maksimal 2MB. Format: JPG, PNG, GIF
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
import { ref, onMounted } from "vue";
import { useAdmin } from "../../composables/useAdmin";

const {
  categories,
  loading,
  getCategories,
  createCategory,
  updateCategory: updateCategoryApi,
  deleteCategory: deleteCategoryApi,
} = useAdmin();

const showAddModal = ref(false);
const showEditModal = ref(false);
const editingCategory = ref<any>(null);

const categoryForm = ref({
  title: "", // Backend expects 'title'
  content: "", // Backend expects 'content'
  image: null as string | null, // Base64 string atau null
});

const resetForm = () => {
  categoryForm.value = {
    title: "",
    content: "",
    image: null,
  };
};

const closeModal = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  editingCategory.value = null;
  resetForm();
};

const addCategory = async () => {
  try {
    console.log("🏷️ Adding category with form data:", categoryForm.value);

    // Prepare data in the format backend expects
    const categoryData = {
      title: categoryForm.value.title,
      content: categoryForm.value.content,
      ...(categoryForm.value.image && { image: categoryForm.value.image }),
    };

    console.log("🏷️ Sending category data to backend:", {
      ...categoryData,
      image: categoryData.image
        ? `${categoryData.image.substring(0, 50)}...`
        : null,
    });

    await createCategory(categoryData);
    closeModal();
    await getCategories();
    console.log("✅ Category created successfully!");
  } catch (error) {
    console.error("❌ Error adding category:", error);
    alert("Gagal menambah kategori. Silakan coba lagi.");
  }
};

const editCategory = (category: any) => {
  editingCategory.value = category;
  categoryForm.value = {
    title: category.name, // Map database 'name' to form 'title'
    content: category.description || "", // Map database 'description' to form 'content'
    image: null, // Reset image, will need separate handling for existing images
  };
  showEditModal.value = true;
};

const updateCategory = async () => {
  if (!editingCategory.value) return;

  try {
    // Prepare data in the format backend expects
    const categoryData = {
      title: categoryForm.value.title,
      content: categoryForm.value.content,
      ...(categoryForm.value.image && { image: categoryForm.value.image }),
    };

    await updateCategoryApi(editingCategory.value.id.toString(), categoryData);
    closeModal();
    await getCategories();
  } catch (error) {
    console.error("Error updating category:", error);
    alert("Gagal mengupdate kategori. Silakan coba lagi.");
  }
};

const deleteCategory = async (id: number) => {
  if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
    try {
      await deleteCategoryApi(id.toString());
      await getCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID");
};

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];

    // Validate file size (max 2MB for base64 conversion)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      alert(
        "Ukuran file terlalu besar! Maksimal 2MB. Silakan pilih gambar yang lebih kecil."
      );
      target.value = ""; // Reset input
      return;
    }

    // Convert file to base64 string (yang diharapkan backend)
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        categoryForm.value.image = e.target.result as string;
        console.log("📸 Image converted to base64, size:", file.size, "bytes");
        console.log(
          "📸 Base64 length:",
          categoryForm.value.image.length,
          "characters"
        );
      }
    };
    reader.readAsDataURL(file);
  }
};

onMounted(() => {
  getCategories();
});
</script>
