<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <button
          @click="goBack"
          class="flex items-center text-gray-600 hover:text-indigo-600 transition-colors mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
          Kembali
        </button>

        <h2 class="text-3xl font-bold text-black mb-2 font-poppins">
          Profil Pengguna
        </h2>
        <p class="text-gray-600 font-poppins">Kelola informasi profil Anda</p>
      </div>

      <!-- Form Profil -->
      <div class="bg-white shadow-lg rounded-2xl p-6 md:p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <!-- Username -->
          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              v-model="userProfile.username"
              type="text"
              class="input-field"
              placeholder="Masukkan username"
            />
          </div>

          <!-- Nama Lengkap -->
          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              v-model="userProfile.fullname"
              type="text"
              class="input-field"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <!-- Email -->
          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              v-model="userProfile.email"
              type="email"
              class="input-field"
              placeholder="Masukkan email"
            />
          </div>

          <!-- Nomor Telepon -->
          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">
              Nomor Telepon
            </label>
            <input
              v-model="userProfile.phone"
              type="tel"
              class="input-field"
              placeholder="Masukkan nomor telepon"
            />
          </div>

          <!-- Alamat -->
          <div class="md:col-span-2 space-y-1">
            <label class="block text-sm font-medium text-gray-700">
              Alamat
            </label>
            <input
              v-model="userProfile.alamat"
              type="text"
              class="input-field"
              placeholder="Masukkan alamat lengkap"
            />
          </div>
        </div>

        <!-- Tombol Simpan -->
        <div class="mt-8 flex justify-end">
          <button @click="saveChanges" :disabled="isSaving" class="save-button">
            <span v-if="!isSaving">Simpan Perubahan</span>
            <span v-else class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Menyimpan...
            </span>
          </button>
        </div>
      </div>

      <!-- Notifikasi -->
      <transition name="fade">
        <div
          v-if="notification.message"
          :class="['notification', notification.type]"
        >
          {{ notification.message }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

interface UserProfile {
  username: string;
  fullname: string;
  email: string;
  phone: string;
  alamat: string;
}

interface Notification {
  type: "success" | "error";
  message: string;
}

export default defineComponent({
  name: "Profil",
  data() {
    return {
      userProfile: {} as UserProfile,
      isSaving: false,
      notification: {} as Notification,
    };
  },
  methods: {
    async fetchUserProfile() {
      try {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        if (!token || !id) return;

        const response = await axios.get(
          `http://localhost:3001/v1/user/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          this.userProfile = response.data.data;
        }
      } catch (error) {
        this.showNotification("error", "Gagal memuat profil");
      }
    },

    async saveChanges() {
      try {
        this.isSaving = true;
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        if (!token || !id) return;

        const response = await axios.put(
          `http://localhost:3001/v1/user/${id}`,
          this.userProfile,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          this.showNotification("success", "Profil berhasil diperbarui");
        }
      } catch (error) {
        this.showNotification("error", "Gagal menyimpan perubahan");
      } finally {
        this.isSaving = false;
      }
    },

    showNotification(type: "success" | "error", message: string) {
      this.notification = { type, message };
      setTimeout(() => (this.notification.message = ""), 3000);
    },

    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.fetchUserProfile();
  },
});
</script>

<style scoped>
/* Menggunakan input-field global, hanya tambahkan styling khusus jika diperlukan */

.save-button {
  @apply bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed;
}

.notification {
  @apply fixed bottom-6 right-6 px-6 py-3 rounded-lg text-white font-medium shadow-lg z-50;
}

.notification.success {
  @apply bg-green-500;
}

.notification.error {
  @apply bg-red-500;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-300;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
