<template>
  <div
    class="navbar self-stretch flex flex-row items-center justify-between py-4 px-8 bg-white shadow-md sticky top-0 z-50"
  >
    <div class="flex flex-row items-center">
      <img
        class="h-12 w-12 object-cover"
        loading="lazy"
        alt="Logo UNS"
        src="/Logo_UNS.png"
      />
      <div class="ml-4 text-xl font-bold text-gray-800">UNS</div>
    </div>
    <div class="flex flex-row items-center space-x-8">
      <div
        :class="['nav-item', isActive('/') ? 'active' : '']"
        @click="onHomeTextClick"
      >
        Home
      </div>
      <div
        :class="['nav-item', isActive('/donasi') ? 'active' : '']"
        @click="onDonasiTextClick"
      >
        Donasi
      </div>
      <div
        :class="['nav-item', isActive('/berita') ? 'active' : '']"
        @click="onBeritaTextClick"
      >
        Berita
      </div>
      <div
        :class="['nav-item', isActive('/riwayat-donasi') ? 'active' : '']"
        @click="onRiwayatDonasiTextClick"
      >
        Riwayat Donasi
      </div>
      <div class="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="2em"
          viewBox="0 0 512 512"
          class="h-10 w-10 cursor-pointer"
          @click="toggleDropdown"
        >
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
            <a
              href="#"
              @click="onProfileClick"
              class="block px-4 py-2 text-black hover:bg-gray-100 font-semibold"
              >Profil</a
            >
            <a
              href="#"
              @click="onLogoutClick"
              class="block px-4 py-2 text-black hover:bg-gray-100 font-semibold"
              >Keluar</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "MainContent",
  setup() {
    const route = useRoute();
    const dropdownOpen = ref(false);

    // Function to check if the current route is active
    const isActive = (path: string) => {
      return route.path === path;
    };

    // Function to toggle dropdown
    const toggleDropdown = (event: Event) => {
      event.stopPropagation(); // Prevent event bubbling
      dropdownOpen.value = !dropdownOpen.value;
    };

    // Close dropdown when clicking outside
    const closeDropdown = () => {
      dropdownOpen.value = false;
    };

    // Add event listener to close dropdown when clicking outside
    document.addEventListener("click", closeDropdown);

    return {
      isActive,
      dropdownOpen,
      toggleDropdown,
    };
  },
  methods: {
    // Navigation methods
    onDonasiTextClick() {
      this.$router.push("/donasi");
    },
    onRiwayatDonasiTextClick() {
      this.$router.push("/riwayat-donasi");
    },
    onBeritaTextClick() {
      this.$router.push("/berita");
    },
    onHomeTextClick() {
      this.$router.push("/");
    },
    onProfileClick(event: Event) {
      event.preventDefault();
      this.$router.push("/profile");
    },
    async onLogoutClick(event: Event) {
      event.preventDefault();
      try {
        const token = localStorage.getItem("token"); // Assuming you are storing token in local storage
        if (token) {
          await axios.post("http://localhost:3001/v1/auth/sign-out", null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          localStorage.removeItem("token"); // Clear token from storage
          this.$router.push("/login"); // Redirect to login page
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("Sign out error:", error);
      }
    },
  },
  unmounted() {
    // Remove event listener when component is unmounted
    document.removeEventListener("click", this.closeDropdown);
  },
});
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
}

.nav-item:hover {
  color: #1a73e8;
}

.active {
  color: #1a73e8;
  font-weight: 700;
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
