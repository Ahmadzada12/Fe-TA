<template>
  <div class="w-full bg-gray-50 min-h-screen flex flex-col font-poppins">
    <!-- Reading Progress Bar -->
    <div class="fixed top-0 left-0 w-full h-2 bg-gray-200 z-[60] shadow-sm">
      <div
        class="h-full bg-gradient-to-r from-lightseagreen-200 to-lightseagreen-100 transition-all duration-300 ease-out shadow-sm"
        :style="{ width: readingProgress + '%' }"
      ></div>
    </div>

    <MainContent />

    <!-- Loading State -->
    <div v-if="isLoading" class="flex-1 flex items-center justify-center py-20">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-16 w-16 border-b-4 border-lightseagreen-200 mx-auto mb-4"
        ></div>
        <p class="text-gray-600 text-lg">Memuat detail berita...</p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex-1 flex items-center justify-center py-20"
    >
      <div class="text-center max-w-md mx-auto px-4">
        <div class="text-red-500 text-6xl mb-6">📰</div>
        <h2 class="text-2xl font-bold text-red-600 mb-4">
          Berita Tidak Ditemukan
        </h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <button
          @click="router.push('/berita')"
          class="bg-lightseagreen-200 text-white px-6 py-3 rounded-lg hover:bg-lightseagreen-100 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          ← Kembali ke Daftar Berita
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="newsDetail" class="flex-1 w-full">
      <!-- Modern Breadcrumb -->
      <div
        class="w-full bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/90"
      >
        <div class="max-w-5xl mx-auto px-5 py-3">
          <nav
            class="flex items-center space-x-2 text-sm"
            aria-label="Breadcrumb"
          >
            <!-- Home -->
            <router-link
              to="/"
              class="flex items-center text-gray-500 hover:text-lightseagreen-200 transition-colors duration-200 group"
            >
              <svg
                class="w-4 h-4 mr-1 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span class="hidden sm:inline">Beranda</span>
            </router-link>

            <!-- Separator -->
            <svg
              class="w-4 h-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>

            <!-- News -->
            <router-link
              to="/berita"
              class="text-gray-500 hover:text-lightseagreen-200 transition-colors duration-200 font-medium"
            >
              Berita
            </router-link>

            <!-- Separator -->
            <svg
              class="w-4 h-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>

            <!-- Category (if available) -->
            <template v-if="newsDetail.category">
              <!-- Separator before category -->
              <svg
                class="w-4 h-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>

              <!-- Category name -->
              <span
                class="text-gray-500 font-medium hover:text-lightseagreen-200 transition-colors duration-200"
              >
                {{ newsDetail.category.name }}
              </span>
            </template>

            <!-- Final Separator -->
            <svg
              class="w-4 h-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>

            <!-- Current Page -->
            <span
              class="text-gray-800 font-semibold truncate max-w-xs lg:max-w-md xl:max-w-lg"
            >
              {{ truncateTitle(newsDetail.title) }}
            </span>
          </nav>
        </div>
      </div>

      <!-- Article Container -->
      <article class="w-full max-w-5xl mx-auto px-5 mt-8 mb-16">
        <!-- Article Header -->
        <header class="mb-8">
          <!-- Category Badge -->
          <div class="mb-6">
            <span
              class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-lightseagreen-200 text-white shadow-lg"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a2 2 0 012-2z"
                />
              </svg>
              {{ getCategoryName() }}
            </span>
          </div>

          <!-- Article Title -->
          <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {{ newsDetail.title }}
          </h1>

          <!-- Article Meta -->
          <div
            class="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-gray-200"
          >
            <div class="flex items-center space-x-6 mb-4 md:mb-0">
              <div class="flex items-center text-gray-600">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span class="font-medium">{{
                  formatDate(newsDetail.createdAt)
                }}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{{ getReadingTime() }} menit baca</span>
              </div>
            </div>

            <!-- Share Buttons -->
            <div class="flex items-center space-x-3">
              <span class="text-gray-600 text-sm font-medium">Bagikan:</span>
              <button
                @click="shareOnFacebook"
                class="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                title="Bagikan ke Facebook"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </button>
              <button
                @click="shareOnTwitter"
                class="flex items-center justify-center w-10 h-10 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                title="Bagikan ke Twitter"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  />
                </svg>
              </button>
              <button
                @click="shareOnWhatsApp"
                class="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                title="Bagikan ke WhatsApp"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <!-- Featured Image -->
        <div v-if="newsDetail.image" class="mb-10">
          <img
            :src="getImageUrl(newsDetail.image)"
            :alt="newsDetail.title"
            class="w-full h-96 md:h-[500px] object-cover rounded-2xl shadow-2xl"
            @error="handleImageError"
          />
        </div>

        <!-- Article Content -->
        <div class="prose prose-lg prose-gray max-w-none mb-12">
          <div
            class="text-gray-800 leading-relaxed text-lg"
            v-html="formatContent(newsDetail.content)"
          ></div>
        </div>

        <!-- Related Campaign Section -->
        <div
          v-if="relatedCampaign"
          class="mt-16 p-8 bg-gradient-to-br from-blue-50 to-lightseagreen-50 rounded-2xl border border-blue-100 shadow-lg"
        >
          <div class="flex items-center mb-6">
            <svg
              class="w-6 h-6 text-lightseagreen-200 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h3 class="text-2xl font-bold text-gray-900">Campaign Terkait</h3>
          </div>

          <div class="lg:flex lg:items-center lg:space-x-8">
            <!-- Campaign Image -->
            <div class="lg:w-1/3 mb-6 lg:mb-0">
              <img
                :src="getImageUrl(relatedCampaign.image)"
                :alt="relatedCampaign.title"
                class="w-full h-48 lg:h-56 object-cover rounded-xl shadow-lg"
                @error="handleImageError"
              />
            </div>

            <!-- Campaign Info -->
            <div class="lg:w-2/3">
              <h4 class="text-xl font-bold text-gray-900 mb-3 leading-tight">
                {{ relatedCampaign.title }}
              </h4>

              <!-- Campaign Stats -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-white p-4 rounded-lg shadow-sm border">
                  <div class="text-sm text-gray-600 mb-1">Target Donasi</div>
                  <div class="text-lg font-bold text-gray-900">
                    {{ formatCurrency(relatedCampaign.donationTarget) }}
                  </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm border">
                  <div class="text-sm text-gray-600 mb-1">Terkumpul</div>
                  <div class="text-lg font-bold text-lightseagreen-200">
                    {{ formatCurrency(relatedCampaign.donationCollected) }}
                  </div>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="mb-6">
                <div class="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{{ getProgressPercentage(relatedCampaign) }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div
                    class="bg-gradient-to-r from-lightseagreen-200 to-lightseagreen-100 h-3 rounded-full transition-all duration-300"
                    :style="{
                      width: getProgressPercentage(relatedCampaign) + '%',
                    }"
                  ></div>
                </div>
              </div>

              <!-- Campaign Actions -->
              <div class="flex flex-col sm:flex-row gap-3">
                <!-- Donasi Sekarang Button - hanya muncul jika campaign aktif -->
                <router-link
                  v-if="isCampaignActive"
                  :to="`/pilih-nominal-donasi/${relatedCampaign.id}`"
                  class="flex-1 inline-flex items-center justify-center px-6 py-3 bg-lightseagreen-200 text-white font-bold rounded-xl hover:bg-lightseagreen-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  <svg
                    class="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Donasi Sekarang
                </router-link>

                <!-- Campaign Closed Message - muncul jika campaign sudah ditutup -->
                <div
                  v-else
                  class="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gray-400 text-white font-bold rounded-xl cursor-not-allowed"
                >
                  <svg
                    class="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Donasi Ditutup
                </div>

                <button
                  @click="router.push(`/donasi/${relatedCampaign.id}`)"
                  class="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white text-lightseagreen-200 font-bold rounded-xl border-2 border-lightseagreen-200 hover:bg-lightseagreen-200 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  <svg
                    class="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Articles Section -->
        <div
          v-if="relatedArticles.length > 0"
          class="mt-16 p-8 bg-white rounded-2xl border border-gray-100 shadow-lg"
        >
          <div class="flex items-center mb-8">
            <svg
              class="w-6 h-6 text-lightseagreen-200 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
              />
            </svg>
            <h3 class="text-2xl font-bold text-gray-900">Berita Terkait</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article
              v-for="article in relatedArticles"
              :key="article.id"
              class="group cursor-pointer"
              @click="router.push(`/berita/${article.id}`)"
            >
              <div
                class="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1"
              >
                <!-- Article Image -->
                <div class="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    :src="getImageUrl(article.image)"
                    :alt="article.title"
                    class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    @error="handleImageError"
                  />
                </div>

                <!-- Article Content -->
                <div class="p-5">
                  <!-- Category -->
                  <div class="mb-3">
                    <span
                      class="inline-block px-3 py-1 bg-lightseagreen-100 text-lightseagreen-200 text-xs font-semibold rounded-full"
                    >
                      {{ article.category?.name || "Berita Umum" }}
                    </span>
                  </div>

                  <!-- Title -->
                  <h4
                    class="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-lightseagreen-200 transition-colors"
                  >
                    {{ article.title }}
                  </h4>

                  <!-- Date -->
                  <div class="flex items-center text-gray-500 text-sm">
                    <svg
                      class="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {{ formatDate(article.createdAt) }}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Navigation & Actions -->
        <div class="mt-16 pt-8 border-t border-gray-200">
          <div
            class="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <!-- Back Button -->
            <button
              @click="router.push('/berita')"
              class="flex items-center space-x-3 text-gray-600 hover:text-lightseagreen-200 transition-all duration-300 group"
            >
              <svg
                class="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span class="font-medium">Kembali ke Daftar Berita</span>
            </button>

            <!-- Additional Actions -->
            <div class="flex items-center space-x-4">
              <button
                @click="scrollToTop"
                class="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-lightseagreen-200 transition-colors"
                title="Kembali ke atas"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                <span class="text-sm">Ke Atas</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Footer -->
    <GroupComponent />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import MainContent from "../components/main-content.vue";
import GroupComponent from "../components/footer.vue";

// Interfaces
interface NewsCategory {
  id: string;
  name: string;
  description?: string;
}

interface RelatedCampaign {
  id: string;
  title: string;
  image: string;
  donationTarget: number;
  donationCollected: number;
  donationStartDate: string;
  donationFinishedDate: string;
  statusDonasi: string;
}

interface NewsDetail {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  statusBerita: string;
  category?: NewsCategory;
  crowdfounding?: RelatedCampaign;
  crowdfoundingId: string;
  categoryId: string;
}

interface RelatedArticle {
  id: string;
  title: string;
  image: string;
  createdAt: string;
  category?: NewsCategory;
}

// Constants
const apiBaseUrl =
  import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3001/v1/";

// Reactive variables
const route = useRoute();
const router = useRouter();
const newsDetail = ref<NewsDetail | null>(null);
const relatedCampaign = ref<RelatedCampaign | null>(null);
const relatedArticles = ref<RelatedArticle[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);
const readingProgress = ref(0);

// Computed
const readingTime = computed(() => {
  if (!newsDetail.value?.content) return 0;
  const wordsPerMinute = 200;
  const words = newsDetail.value.content.split(" ").length;
  return Math.ceil(words / wordsPerMinute);
});

const isCampaignActive = computed(() => {
  if (!relatedCampaign.value) return false;

  const now = new Date();
  const endDate = new Date(relatedCampaign.value.donationFinishedDate);

  // Campaign aktif jika belum melewati tanggal selesai dan status published
  return endDate > now && relatedCampaign.value.statusDonasi === "published";
});

// Methods
const updateSEOMeta = () => {
  if (!newsDetail.value) return;

  const title = `${newsDetail.value.title} | Portal Berita`;
  const description = truncateContent(newsDetail.value.content, 160);
  const imageUrl = getImageUrl(newsDetail.value.image);
  const currentUrl = window.location.href;

  // Update document title
  document.title = title;

  // Update meta tags
  updateMetaTag("description", description);
  updateMetaTag("og:title", newsDetail.value.title);
  updateMetaTag("og:description", description);
  updateMetaTag("og:image", imageUrl);
  updateMetaTag("og:url", currentUrl);
  updateMetaTag("og:type", "article");
  updateMetaTag("twitter:card", "summary_large_image");
  updateMetaTag("twitter:title", newsDetail.value.title);
  updateMetaTag("twitter:description", description);
  updateMetaTag("twitter:image", imageUrl);

  // Article specific meta
  if (newsDetail.value.category) {
    updateMetaTag("article:section", newsDetail.value.category.name);
  }
  updateMetaTag("article:published_time", newsDetail.value.createdAt);
};

const updateMetaTag = (property: string, content: string) => {
  let metaElement = document.querySelector(
    `meta[property="${property}"]`
  ) as HTMLMetaElement;
  if (!metaElement) {
    metaElement = document.querySelector(
      `meta[name="${property}"]`
    ) as HTMLMetaElement;
  }
  if (!metaElement) {
    metaElement = document.createElement("meta");
    if (property.startsWith("og:") || property.startsWith("article:")) {
      metaElement.setAttribute("property", property);
    } else {
      metaElement.setAttribute("name", property);
    }
    document.head.appendChild(metaElement);
  }
  metaElement.setAttribute("content", content);
};

const truncateContent = (content: string, maxLength: number) => {
  if (!content) return "";
  const plainText = content
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return plainText.length > maxLength
    ? plainText.substring(0, maxLength) + "..."
    : plainText;
};

const fetchNewsDetail = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const newsId = route.params.id as string;
    const token = localStorage.getItem("token");

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get(`${apiBaseUrl}news/${newsId}`, {
      headers,
    });

    if (response.data && response.data.data) {
      newsDetail.value = response.data.data;

      // Debug log untuk melihat data yang diterima
      console.log("News Detail Data:", newsDetail.value);
      if (newsDetail.value) {
        console.log("Category Data:", newsDetail.value.category);
      }

      // Update SEO meta tags
      await nextTick();
      updateSEOMeta();

      // Fetch related campaign jika ada crowdfoundingId
      if (newsDetail.value && newsDetail.value.crowdfoundingId) {
        await fetchRelatedCampaign(newsDetail.value.crowdfoundingId);
      }

      // Fetch related articles
      if (newsDetail.value && newsDetail.value.categoryId) {
        await fetchRelatedArticles(
          newsDetail.value.categoryId,
          newsDetail.value.id
        );
      }
    } else {
      throw new Error("Data berita tidak ditemukan");
    }
  } catch (err: any) {
    console.error("Error fetching news detail:", err);

    if (err.response?.status === 404) {
      error.value =
        "Berita yang Anda cari tidak ditemukan atau mungkin telah dihapus.";
    } else if (err.response?.status === 401) {
      error.value = "Anda perlu login untuk mengakses berita ini.";
    } else {
      error.value =
        "Terjadi kesalahan saat memuat berita. Silakan coba lagi nanti.";
    }
  } finally {
    isLoading.value = false;
  }
};

const fetchRelatedCampaign = async (crowdfoundingId: string) => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get(
      `${apiBaseUrl}crowdfounding/${crowdfoundingId}`,
      { headers }
    );

    if (response.data && response.data.data) {
      relatedCampaign.value = response.data.data;
    }
  } catch (err) {
    console.warn("Could not fetch related campaign:", err);
    // Tidak set error karena ini optional
  }
};

const fetchRelatedArticles = async (categoryId: string, excludeId: string) => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get(
      `${apiBaseUrl}news?limit=3&categoryId=${categoryId}`,
      { headers }
    );

    if (response.data && response.data.data && response.data.data.data) {
      // Filter out current article and take only 3
      relatedArticles.value = response.data.data.data
        .filter((article: RelatedArticle) => article.id !== excludeId)
        .slice(0, 3);
    }
  } catch (err) {
    console.warn("Could not fetch related articles:", err);
    // Tidak set error karena ini optional
  }
};

const getImageUrl = (imageName: string | undefined) => {
  if (!imageName) return "/placeholder-news.jpg";

  if (imageName.startsWith("http://") || imageName.startsWith("https://")) {
    return imageName;
  }

  return `${apiBaseUrl.replace("/v1/", "")}/${imageName}`;
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  console.log("Image failed to load:", img.src);
  img.src = "/placeholder-news.jpg";
  img.alt = "Gambar tidak tersedia";
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatContent = (content: string) => {
  if (!content) return "";

  return content
    .replace(/\n\n/g, '</p><p class="mb-6">')
    .replace(/\n/g, "<br>")
    .replace(/^/, '<p class="mb-6">')
    .replace(/$/, "</p>");
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getProgressPercentage = (campaign: RelatedCampaign) => {
  if (!campaign.donationTarget || campaign.donationTarget === 0) return 0;
  const percentage =
    (campaign.donationCollected / campaign.donationTarget) * 100;
  return Math.min(Math.round(percentage), 100);
};

const getCategoryName = () => {
  return newsDetail.value?.category?.name || "Berita Umum";
};

const truncateTitle = (title: string) => {
  if (!title) return "";
  return title.length > 50 ? title.substring(0, 50) + "..." : title;
};

const getReadingTime = () => {
  return readingTime.value;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const updateReadingProgress = () => {
  const article = document.querySelector("article");
  if (!article) {
    readingProgress.value = 0;
    return;
  }

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Simple calculation: percentage of page scrolled
  const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
  readingProgress.value = Math.max(0, Math.min(100, scrollPercentage));

  // Debug log (remove in production)
  console.log("Reading Progress:", readingProgress.value.toFixed(1) + "%");
};

// Share functions
const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(newsDetail.value?.title || "");
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`,
    "_blank"
  );
};

const shareOnTwitter = () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(newsDetail.value?.title || "");
  window.open(
    `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    "_blank"
  );
};

const shareOnWhatsApp = () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(newsDetail.value?.title || "");
  window.open(`https://wa.me/?text=${title} ${url}`, "_blank");
};

// Lifecycle
onMounted(() => {
  fetchNewsDetail();

  // Add scroll listener for reading progress
  window.addEventListener("scroll", updateReadingProgress);

  // Clean up on unmount
  return () => {
    window.removeEventListener("scroll", updateReadingProgress);
  };
});

// Watch for route changes to auto-scroll and refresh data
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      // Scroll to top immediately
      window.scrollTo({ top: 0, behavior: "instant" });

      // Reset progress bar
      readingProgress.value = 0;

      // Fetch new article data
      fetchNewsDetail();
    }
  }
);
</script>

<style scoped>
/* Custom prose styles */
.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.prose h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.prose h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: #1f2937;
}

.prose ul,
.prose ol {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.prose li {
  margin-bottom: 0.75rem;
  line-height: 1.7;
}

.prose blockquote {
  border-left: 4px solid #2dd4bf;
  padding-left: 1.5rem;
  font-style: italic;
  margin: 2rem 0;
  color: #6b7280;
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.prose strong {
  font-weight: 700;
  color: #1f2937;
}

.prose em {
  font-style: italic;
  color: #4b5563;
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Hover animations */
.transform {
  transition: transform 0.3s ease;
}

.hover\:-translate-y-1:hover {
  transform: translateY(-0.25rem);
}

.hover\:scale-110:hover {
  transform: scale(1.1);
}

/* Button hover effects */
button:hover,
a:hover {
  transition: all 0.3s ease;
}

/* Progress bar animation */
.transition-all {
  transition: all 0.3s ease;
}

/* Shadow utilities */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .prose {
    font-size: 1rem;
  }

  .prose h1 {
    font-size: 2rem;
  }

  .prose h2 {
    font-size: 1.5rem;
  }

  .prose h3 {
    font-size: 1.25rem;
  }
}

/* Focus states for accessibility */
button:focus,
a:focus {
  outline: 2px solid #2dd4bf;
  outline-offset: 2px;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #2dd4bf;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #14b8a6;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Reading progress bar animation */
.reading-progress {
  transition: width 0.1s ease-out;
}

/* Related articles hover effects */
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.aspect-h-9 img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
