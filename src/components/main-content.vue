<template>
  <div class="navbar self-stretch flex flex-row items-center justify-between py-4 px-8 bg-white shadow-md sticky top-0 z-50 font-poppins">
    <router-link to="/" class="flex flex-row items-center cursor-pointer">
      <img
        class="h-12 w-12 object-cover"
        loading="lazy"
        alt="Logo UNS"
        src="/Logo_UNS.png"
      />
      <div class="ml-4 text-xl font-bold text-gray-800">UNS</div>
    </router-link>
    <div class="flex flex-row items-center space-x-8">
      <router-link to="/" class="nav-item">Home</router-link>
      <router-link to="/donasi" class="nav-item">Donasi</router-link>
      <router-link to="/berita" class="nav-item">Berita</router-link>
      <router-link to="/riwayat-donasi" class="nav-item">Riwayat Donasi</router-link>
      <div class="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="2em"
          viewBox="0 0 512 512"
          class="h-10 w-10 cursor-pointer"
          @click.stop="toggleDropdown" >
          <path
            fill="#74C0FC"
            d="M406.5 399.6C387.4 352.9 341.5 320 288 320l-64 0c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3l64 0c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"
          />
        </svg>
        <div
          v-if="dropdownOpen"
          class="dropdown-menu right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 fixed"
        >
          <div class="py-1">
            <router-link to="/profile" class="block px-4 py-2 text-black hover:bg-gray-100 font-semibold">Profil</router-link>
            <a href="#" @click.prevent="onLogoutClick" class="block px-4 py-2 text-black hover:bg-gray-100 font-semibold">Keluar</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const dropdownOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const closeDropdown = () => {
  dropdownOpen.value = false;
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});

const onLogoutClick = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      await axios.post("http://localhost:3001/v1/auth/sign-out", null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      router.push("/login");
    } else {
      console.error("No token found");
    }
  } catch (error) {
    console.error("Sign out error:", error);
    // Mungkin ada baiknya token tetap dihapus dan redirect jika logout gagal di server
    localStorage.removeItem("token");
    router.push("/login");
  }
};
</script>

<style scoped>
.navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-item {
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: #4a4a4a;
  transition: color 0.3s ease;
  text-decoration: none; /* Menghilangkan garis bawah default dari link */
}

.nav-item:hover {
  color: #1a73e8;
}

/* Ganti .active menjadi kelas default dari vue-router */
.router-link-exact-active {
  color: #1a73e8;
  font-weight: 700;
  /* Tambahkan properti lain jika perlu, misal border-bottom */
}
.dropdown-menu {
  right: 0;
  margin-top: 0.5rem;
  width: 12rem;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 50;
  position: absolute;
}
</style>
