import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

export default defineConfig({
  plugins: [
    vue(),
    Pages({}),
    Layouts({
      defaultLayout: "default",
      layoutsDirs: "src/layouts",
    }),
    Components({
      resolvers: [NaiveUiResolver(), IconsResolver()],
    }),
    AutoImport({
      imports: ["vue", "vue-router"],
    }),
    Icons({
      // experimental
      autoInstall: true,
    }),
  ],
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
