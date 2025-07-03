import { createApp } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import App from "./App.vue";
import axios from "axios";

// FontAwesome setup
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

// Add all solid icons to the library
library.add(fas);

import Home from "./pages/home.vue";
import Berita from "./pages/berita.vue";
import RiwayatDonasi from "./pages/riwayat-donasi.vue";
import InfoDonatur from "./pages/info-donatur.vue";
import Donasi from "./pages/donasi.vue";
import "./global.css";
import login from "./pages/login.vue";
import "./assets/tailwind.css";
import PilihNominalDonasi from "./components/pilih-nominal-donasi.vue";
import Register from "./pages/register.vue";
import Profil from "./pages/profil.vue";
import detailDonasi from "./pages/detail-donasi.vue";
import DetailBerita from "./pages/detail-berita.vue";
import DonasiSukses from "./pages/donasi-sukses.vue";
import DonasiGagal from "./pages/donasi-gagal.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/berita",
    name: "Berita",
    component: Berita,
  },
  {
    path: "/berita/:id",
    name: "DetailBerita",
    component: DetailBerita,
  },
  {
    path: "/riwayat-donasi",
    name: "RiwayatDonasi",
    component: RiwayatDonasi,
    meta: { requiresAuth: true },
  },

  {
    path: "/infodonatur/:id",
    name: "InfoDonatur",
    component: InfoDonatur,
    meta: { requiresAuth: true },
  },
  {
    path: "/donasi",
    name: "Donasi",
    component: Donasi,
    meta: { requiresAuth: true },
  },
  {
    path: "/pilih-nominal-donasi/:id",
    name: "PilihNominalDonasi",
    component: PilihNominalDonasi,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profil,
    meta: { requiresAuth: true },
  },
  {
    path: "/donasi/:id",
    name: "detailDonasi",
    component: detailDonasi,
  },
  {
    path: "/donasi/sukses",
    name: "DonasiSukses",
    component: DonasiSukses,
    meta: { requiresAuth: true },
  },
  {
    path: "/donasi/gagal",
    name: "DonasiGagal",
    component: DonasiGagal,
    meta: { requiresAuth: true },
  },

  // Admin Routes
  {
    path: "/admin",
    redirect: "/admin/dashboard",
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: () => import("./pages/admin/Dashboard.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Admin Dashboard - UNS Donation Platform",
    },
  },
  {
    path: "/admin/news",
    name: "AdminNews",
    component: () => import("./pages/admin/NewsManagement.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Kelola Berita - Admin Panel",
    },
  },
  {
    path: "/admin/categories",
    name: "AdminCategories",
    component: () => import("./pages/admin/CategoryManagement.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Kelola Kategori - Admin Panel",
    },
  },
  {
    path: "/admin/donations",
    name: "AdminDonations",
    component: () => import("./pages/admin/DonationManagement.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Kelola Donasi - Admin Panel",
    },
  },
  {
    path: "/admin/users",
    name: "AdminUsers",
    component: () => import("./pages/admin/UserManagement.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Kelola Pengguna - Admin Panel",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const isLoggedIn = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // Check if route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
    next({ name: "login" });
    return;
  }

  // Check if route requires admin access
  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (!isLoggedIn) {
      next({ name: "login" });
      return;
    }

    const normalizedRole = (userRole || "").toLowerCase();
    if (normalizedRole !== "admin") {
      next({ name: "home" }); // Redirect non-admin users to home
      return;
    }
  }

  // Set page meta
  const metaTitle = to.meta.title as string;
  const metaDesc = to.meta.description as string;

  if (metaTitle) {
    document.title = metaTitle;
  }

  if (metaDesc) {
    const element = document.querySelector(`meta[name='description']`);
    if (element) {
      element.setAttribute("content", metaDesc);
    }
  }

  next();
});

const app = createApp(App);

// Register FontAwesome component globally
app.component("font-awesome-icon", FontAwesomeIcon);

// Konfigurasi Axios
axios.defaults.baseURL = "http://localhost:3001"; // Ganti sesuai URL backend Anda
app.config.globalProperties.$http = axios;

app.use(router).mount("#app");

export default router;
