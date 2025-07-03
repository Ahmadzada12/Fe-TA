<template>
  <footer
    class="bg-gradient-to-r from-teal-600 to-teal-800 text-white relative overflow-hidden"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent"
      ></div>
      <svg
        class="absolute bottom-0 left-0 w-full h-32"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
          fill="rgba(255,255,255,0.1)"
        ></path>
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 py-12">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- Brand Section -->
        <div class="lg:col-span-2">
          <div class="flex items-center space-x-4 mb-6">
            <div
              class="w-16 h-16 bg-white bg-opacity-60 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <img src="/Logo_UNS.png" alt="UNS Logo" class="w-10 h-10" />
            </div>
            <div>
              <h2 class="text-2xl font-bold text-white">UNS Donasi</h2>
              <p class="text-teal-100 text-sm">
                Membangun Indonesia dengan Berbagi
              </p>
            </div>
          </div>
          <p class="text-teal-50 text-base leading-relaxed mb-6 max-w-md">
            Platform digital terdepan untuk menghubungkan hati dermawan dengan
            mereka yang membutuhkan. Bersama kita wujudkan Indonesia yang lebih
            baik.
          </p>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-4">
            <div
              class="bg-white bg-opacity-10 rounded-lg p-4 text-center backdrop-blur-sm"
            >
              <div class="text-2xl font-bold text-white">1000+</div>
              <div class="text-teal-100 text-sm">Donatur Aktif</div>
            </div>
            <div
              class="bg-white bg-opacity-10 rounded-lg p-4 text-center backdrop-blur-sm"
            >
              <div class="text-2xl font-bold text-white">50+</div>
              <div class="text-teal-100 text-sm">Program Donasi</div>
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <div>
          <h3
            class="text-lg font-semibold text-white mb-4 border-b border-teal-400 pb-2"
          >
            Navigasi
          </h3>
          <ul class="space-y-3">
            <li>
              <a
                href="/home"
                class="text-teal-100 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
              >
                <svg
                  class="w-4 h-4 mr-2 group-hover:text-teal-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                  />
                </svg>
                Beranda
              </a>
            </li>
            <li>
              <a
                href="/donasi"
                class="text-teal-100 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
              >
                <svg
                  class="w-4 h-4 mr-2 group-hover:text-teal-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                  />
                </svg>
                Program Donasi
              </a>
            </li>
            <li>
              <a
                href="/berita"
                class="text-teal-100 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
              >
                <svg
                  class="w-4 h-4 mr-2 group-hover:text-teal-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                  />
                </svg>
                Berita & Update
              </a>
            </li>
            <li>
              <a
                href="/profil"
                class="text-teal-100 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
              >
                <svg
                  class="w-4 h-4 mr-2 group-hover:text-teal-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  />
                </svg>
                Profil Saya
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact & Support -->
        <div>
          <h3
            class="text-lg font-semibold text-white mb-4 border-b border-teal-400 pb-2"
          >
            Hubungi Kami
          </h3>
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div
                class="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                  />
                  <path
                    d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-teal-100 text-sm font-medium">Email</p>
                <p class="text-white text-sm">donasi@uns.ac.id</p>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div
                class="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-teal-100 text-sm font-medium">Telepon</p>
                <p class="text-white text-sm">+62 271 646994</p>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div
                class="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p class="text-teal-100 text-sm font-medium">Alamat</p>
                <p class="text-white text-sm">
                  Jl. Ir. Sutami 36A<br />Surakarta, Jawa Tengah
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-teal-400 border-opacity-30 pt-8">
        <div
          class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <!-- Social Media -->
          <div class="flex items-center space-x-6">
            <span class="text-teal-100 text-sm font-medium">Ikuti Kami:</span>
            <div class="flex space-x-3">
              <a
                href="#"
                class="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 20.312c-4.27 0-7.72-3.45-7.72-7.72s3.45-7.72 7.72-7.72c4.27 0 7.72 3.45 7.72 7.72s-3.45 7.72-7.72 7.72z"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <!-- Copyright & Links -->
          <div
            class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6"
          >
            <div class="flex items-center space-x-4">
              <a
                href="#"
                class="text-teal-100 hover:text-white text-sm transition-colors"
                >Kebijakan Privasi</a
              >
              <span class="text-teal-300">•</span>
              <a
                href="#"
                class="text-teal-100 hover:text-white text-sm transition-colors"
                >Syarat & Ketentuan</a
              >
            </div>
            <p class="text-teal-100 text-sm">
              © {{ currentYear }} UNS Donasi Platform. Dibuat dengan ❤️ untuk
              Indonesia.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
/* Simple footer styles */
footer {
  clear: both;
  position: relative;
}
</style>
