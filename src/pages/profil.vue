<template>
  <div class="profil-page">
    <div class="mx-auto p-4">
      <!-- Tombol Back -->
      <button @click="goBack" class="back-button flex items-center mb-4">
        <img alt="Back" class="w-5 h-5 mr-2" />
        Kembali
      </button>
      <h2 class="text-2xl font-bold mb-4">Profil Pengguna</h2>
      <div class="bg-white shadow-md rounded-lg p-6">
        <div class="mb-4 flex justify-between">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Nama
          </label>
          <p>{{ userProfile.username }}</p>
        </div>
        <div class="mb-4 flex justify-between">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <p>{{ userProfile.email }}</p>
        </div>
        <div class="mb-4 flex justify-between">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="telp">
            Nomor Telepon
          </label>
          <p>{{ userProfile.phone }}</p>
        </div>
        <div class="mb-4 flex justify-between">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="alamat"
          >
            Alamat
          </label>
          <p>{{ userProfile.alamat }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "profil",
  data() {
    return {
      userProfile: {
        username: "",
        email: "",
        phone: "",
        alamat: "",
      },
    };
  },
  methods: {
    async fetchUserProfile() {
      try {
        const token = localStorage.getItem("token"); // Ambil token dari localStorage jika ada
        const userId = "f61c763a-9fb5-4cc8-baac-24664a63eb5a"; // ID pengguna yang akan Anda ambil datanya
        const response = await axios.get(
          `http://localhost:3000/v1/user/f61c763a-9fb5-4cc8-baac-24664a63eb5a`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFubmFuYWhudTE1QGdtYWlsLmNvbSIsImlkIjoiZjYxYzc2M2EtOWZiNS00Y2M4LWJhYWMtMjQ2NjRhNjNlYjVhIiwibmFtZSI6Ikpva29pc2thbmRhciIsImlhdCI6MTcxODk4MTY3NSwiZXhwIjoxNzE5NTg2NDc1fQ.7rkDnKqTWifIxZPWgxtn682zRmsCUiil4hia1gxGQOk`,
            },
          }
        );

        if (response.status === 200) {
          this.userProfile = response.data.data; // Sesuaikan dengan struktur respons dari backend
          console.log(this.userProfile);
        } else {
          console.error("Failed to fetch user profile:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    },
    goBack() {
      this.$router.push("/riwayat-donasi");
    },
  },
  mounted() {
    this.fetchUserProfile();
  },
});
</script>
<style scoped>
.profil-page {
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.bg-white {
  background-color: white;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.back-button {
  background: none;
  border: none;
  color: #1e3a8a; /* Ganti warna sesuai kebutuhan */
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: bold;
}

.back-button img {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
</style>
