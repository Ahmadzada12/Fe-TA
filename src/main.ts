import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

import Home from "./pages/home.vue";
import Donasi1 from "./pages/donasi1.vue";
import Berita from "./pages/berita.vue";
import RiwayatDonasi from "./pages/riwayat-donasi.vue";
import Berita1 from "./pages/berita1.vue";
import InfoDonatur from "./pages/info-donatur.vue";
import Donasi from "./components/donasi.vue";
import "./global.css";
import login from "./pages/login.vue";
import PilihNominalDonasi from "./components/pilih-nominal-donasi.vue";
import Register from "./pages/register.vue";
import Profil from "./pages/profil.vue";
import axios from "axios";
interface Route {
  path: string;
  name: string;
  component: any;
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
    path: "/donasi1",
    name: "Donasi1",
    component: Donasi1,
  },
  {
    path: "/berita1",
    name: "Berita",
    component: Berita,
  },
  {
    path: "/riwayat-donasi",
    name: "RiwayatDonasi",
    component: RiwayatDonasi,
  },
  {
    path: "/berita",
    name: "Berita1",
    component: Berita1,
  },
  {
    path: "/infodonatur",
    name: "InfoDonatur",
    component: InfoDonatur,
  },
  {
    path: "/donasi",
    name: "Donasi",
    component: Donasi,
  },
  {
    path: "/pilih-nominal-donasi",
    name: "PilihNominalDonasi",
    component: PilihNominalDonasi,
  },
  {
    path: "/pilih-nominal-donasi",
    name: "PilihNominalDonasi",
    component: PilihNominalDonasi,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profil,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((toRoute, _, next) => {
  const metaTitle = toRoute?.meta?.title as string;
  const metaDesc = toRoute?.meta?.description as string;

  window.document.title = metaTitle || "Untitled";
  if (metaDesc) {
    addMetaTag(metaDesc);
  }
  next();
});

const addMetaTag = (value: string) => {
  const element = document.querySelector(`meta[name='description']`);
  if (element) {
    element.setAttribute("content", value);
  }
};

const app = createApp(App);

// Konfigurasi Axios
axios.defaults.baseURL = "http://localhost:3000"; // Ganti sesuai URL backend Anda
app.config.globalProperties.$http = axios;

createApp(App).use(router).mount("#app");

export default router;
