<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-lg">
      <div class="p-6">
        <h1 class="text-xl font-bold text-gray-800">Admin Panel</h1>
        <p class="text-sm text-gray-600">UNS Donation Platform</p>
      </div>
      
      <nav class="mt-6">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          :class="{ 'bg-blue-50 text-blue-600 border-r-2 border-blue-600': $route.path === item.path }"
        >
          <i :class="item.icon" class="w-5 h-5 mr-3"></i>
          {{ item.name }}
        </router-link>
      </nav>

      <!-- Logout -->
      <div class="absolute bottom-0 w-64 p-6">
        <button
          @click="logout"
          class="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <i class="fas fa-sign-out-alt w-5 h-5 mr-3"></i>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b px-6 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-lg font-semibold text-gray-800">{{ pageTitle }}</h2>
            <p class="text-sm text-gray-600">{{ pageDescription }}</p>
          </div>
          
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">Welcome, {{ userName }}</span>
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-medium">{{ userInitials }}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <div class="flex-1 p-6">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const menuItems = [
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: 'fas fa-tachometer-alt'
  },
  {
    name: 'Berita',
    path: '/admin/news',
    icon: 'fas fa-newspaper'
  },
  {
    name: 'Kategori',
    path: '/admin/categories',
    icon: 'fas fa-tags'
  },
  {
    name: 'Donasi',
    path: '/admin/donations',
    icon: 'fas fa-hand-holding-heart'
  },
  {
    name: 'Pengguna',
    path: '/admin/users',
    icon: 'fas fa-users'
  }
];

const pageTitle = computed(() => {
  const currentItem = menuItems.find(item => item.path === route.path);
  return currentItem?.name || 'Admin Panel';
});

const pageDescription = computed(() => {
  const descriptions: Record<string, string> = {
    '/admin/dashboard': 'Overview dan statistik platform',
    '/admin/news': 'Kelola artikel dan berita',
    '/admin/categories': 'Kelola kategori donasi',
    '/admin/donations': 'Kelola campaign donasi',
    '/admin/users': 'Kelola pengguna platform'
  };
  return descriptions[route.path] || 'Manajemen sistem';
});

const userName = computed(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.name || 'Admin';
});

const userInitials = computed(() => {
  const name = userName.value;
  return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
});

const logout = () => {
  if (confirm('Apakah Anda yakin ingin logout?')) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    router.push('/login');
  }
};
</script>
