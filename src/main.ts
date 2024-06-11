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

createApp(App).use(router).mount("#app");

export default router;
