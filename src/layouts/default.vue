<script setup lang="ts">
import { h, type Component } from "vue";
import { NIcon } from "naive-ui";
import {
  PeopleOutline,
  HomeOutline,
  LayersOutline,
  DocumentOutline,
} from "@vicons/ionicons5";
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = computed(() => [
  {
    label: "Dashboard",
    key: "/admin/dashboard",
    icon: renderIcon(HomeOutline),
  },
  {
    label: "Berita",
    key: "/admin/news",
    icon: renderIcon(PeopleOutline),
  },
  {
    label: "Kategori",
    icon: renderIcon(DocumentOutline),
    key: "/admin/category",
  },
  {
    label: "Laporan",
    icon: renderIcon(DocumentOutline),
    key: "/admin/laporan",
  },
  {
    label: "Donasi",
    icon: renderIcon(LayersOutline),
    key: "/admin/donation",
  },
]);

const options = [
  {
    label: "Profile",
    key: "profile",
  },
  {
    label: "Logout",
    key: "/auth/logout",
  },
];
</script>

<template>
  <n-space vertical>
    <n-layout>
      <n-layout has-sider>
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :native-scrollbar="false"
          style="min-height: 100vh"
        >
          <div class="h-16 flex items-center">
            <div
              class="mx-auto max-w-10 flex items-center gap-3 font-bold text-zinc-100"
            >
              CFF
            </div>
          </div>
          <n-menu
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            @update:value="(v) => $router.push(v)"
          />
        </n-layout-sider>
        <n-layout style="min-height: 100vh" class="relative">
          <div class="sticky w-full inset-x-0 h-16 z-40 border-b">
            <div class="flex justify-end items-center h-16 px-5">
              <div>
                <n-dropdown :options="options" @select="(v) => $router.push(v)">
                  <n-button text color="#000">MyName</n-button>
                </n-dropdown>
              </div>
            </div>
          </div>
          <main class="p-5">
            <router-view />
          </main>
        </n-layout>
      </n-layout>
    </n-layout>
  </n-space>
</template>
