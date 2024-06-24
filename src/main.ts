import { createApp } from "vue";
import routes from "~pages";
import { setupLayouts } from "layouts-generated";
import { createRouter, createWebHistory } from "vue-router/auto";

import App from "./App.vue";

import "./global.css";

interface Route {
  path: string;
  name: string;
  component: any;
}

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
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
