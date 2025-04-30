import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import axios from "axios";

import Home from "./pages/home.vue";
import Donasi1 from "./pages/donasi1.vue";
import Berita from "./pages/berita.vue";
import RiwayatDonasi from "./pages/riwayat-donasi.vue";
import Berita1 from "./pages/berita1.vue";
import InfoDonatur from "./pages/info-donatur.vue";
import Donasi from "./components/donasi.vue";
import "./global.css";
import login from "./pages/login.vue";
import "./assets/tailwind.css";
import PilihNominalDonasi from "./components/pilih-nominal-donasi.vue";
import Register from "./pages/register.vue";
import Profil from "./pages/profil.vue";
import detailDonasi from "./pages/detail-donasi.vue";

interface Route {
  path: string;
  name: string;
  component: any;
  meta?: {
    requiresAuth?: boolean;
    title?: string;
    description?: string;
  };
}

const routes: Route[] = [
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
    path: "/donasi1/:id",
    name: "Donasi1",
    component: Donasi1,
    meta: { requiresAuth: true },
  },
  {
    path: "/berita",
    name: "Berita",
    component: Berita,
  },
  {
    path: "/riwayat-donasi",
    name: "RiwayatDonasi",
    component: RiwayatDonasi,
    meta: { requiresAuth: true },
  },
  {
    path: "/berita1/:id",
    name: "Berita1",
    component: Berita1,
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
    path: '/donasi/:id',
    name: 'detailDonasi',
    component: detailDonasi,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("token"); // Check if the user is logged in
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
    next({ name: "login" }); // Redirect to login page if not logged in
  } else {
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

    next(); // Proceed to the route
  }
});

const app = createApp(App);

// Konfigurasi Axios
axios.defaults.baseURL = "http://localhost:3001"; // Ganti sesuai URL backend Anda
app.config.globalProperties.$http = axios;

app.use(router).mount("#app");

export default router;
