<template>
  <div
    class="w-full relative bg-gradient-to-b from-[#fff] to-[#fff] overflow-y-auto flex flex-col items-start justify-start gap-[36.7px] leading-normal tracking-normal mq750:gap-[18px]"
  >
    <main class="self-stretch flex flex-col items-start justify-start max-w-full">
      <mainContent />
      <section
        :id="donation.id"
        class="self-stretch bg-whitesmoke-100 flex flex-col items-start justify-start pt-[19.8px] px-[393px] pb-[288.8px] box-border gap-[8px] max-w-full text-left text-base text-gray-600 font-poppins lg:pt-5 lg:pb-[188px] lg:box-border mq450:pl-5 mq450:pr-5 mq450:box-border mq750:pl-[196px] mq750:pr-[196px] mq750:pb-[122px] mq750:box-border"
      >
        <div class="flex flex-row items-start justify-start gap-[55px] max-w-full mq1050:flex-wrap mq750:gap-[27px]">
          <img
            v-if="donation.image"
            :src="donation.image"
            class="h-[150px] w-[150px] relative overflow-hidden shrink-0 object-cover rounded-3xs"
            loading="lazy"
            alt="Donation Image"
          />
          <div class="flex flex-col items-start justify-start gap-[8px] max-w-full">
            <b class="relative leading-[16px]">
              <p class="m-0">{{ donation.title || "Memuat Judul..." }}</p>
            </b>
            <div class="flex flex-row items-end justify-start text-sm">
              <img
                class="h-5 w-5 relative rounded-3xs overflow-hidden shrink-0 object-contain"
                loading="lazy"
                alt="Default Avatar"
                src="/defaultavatarpng@2x.png"
              />
              <div class="relative leading-[21px] font-light shrink-0 ml-[-0.2px]">
                {{ donation.userName || "..." }}
              </div>
            </div>
          </div>
        </div>
        <form
          class="m-0 self-stretch shadow-[0px_1px_6px_rgba(49,_53,_59,_0.12)] rounded-xl bg-white flex flex-col items-start justify-start pt-[26px] px-[25px] pb-[37.2px] box-border gap-[24px] max-w-full"
          @submit.prevent="createInvoice"
        >
          <div class="self-stretch flex flex-col items-start justify-start gap-[15px] max-w-full">
            <div class="self-stretch flex flex-row items-start justify-between gap-[20px] mq450:flex-wrap">
              <div class="flex flex-col items-start justify-start gap-[19.5px]">
                <div class="relative text-base leading-[16px] font-medium font-poppins text-gray-600 text-left">
                  Ringkasan Donasi
                </div>
                <div class="relative text-sm leading-[21px] font-poppins text-gray-600 text-left">
                  Nominal donasi Anda
                </div>
              </div>
              <div class="flex flex-col items-end justify-start gap-[12px]">
                <div class="w-[55.3px] rounded-[3.2px] box-border flex flex-row items-start justify-start pt-[3px] pb-1 pr-1.5 pl-[9px] border-[1px] border-solid border-crimson">
                  <div class="relative text-sm leading-[21px] font-poppins text-crimson text-center inline-block min-w-[38px] cursor-pointer" @click="onUbahClick(donation.id)">
                    Ubah
                  </div>
                </div>
                <div class="relative text-sm leading-[21px] font-poppins text-gray-600 text-right inline-block min-w-[65px] whitespace-nowrap">
                  {{ nominal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }) }}
                </div>
              </div>
            </div>
            <div class="self-stretch h-px border-t-[1px] border-solid border-gray-1000" />
            <div class="self-stretch flex flex-col items-start justify-start gap-[9px]">
              <div class="relative text-base leading-[16px] font-medium font-poppins text-gray-600 text-left">
                Info Donatur
              </div>
              <div class="relative text-sm leading-[21px] font-poppins text-gray-600 text-left">
                Beri Pesan atau Komentar (Opsional)
              </div>
              <div class="self-stretch rounded-sm bg-white box-border overflow-hidden border-[1px] border-solid border-lightgray-100">
                <textarea
                  class="w-full h-24 border-none outline-none font-poppins text-sm bg-transparent p-3 resize-none"
                  placeholder="Pesan atau Doa (Opsional)"
                  v-model="description"
                ></textarea>
              </div>
            </div>
          </div>
          <div v-if="errorMessage" class="w-full p-3 my-2 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            <span class="font-medium">Oops! Terjadi kesalahan:</span> {{ errorMessage }}
          </div>
          <button
            class="cursor-pointer py-[7px] px-5 bg-lightseagreen-200 self-stretch rounded flex flex-row items-center justify-center border-[1px] border-solid border-firebrick-300 hover:bg-lightseagreen-100"
            :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
            type="submit"
            :disabled="isLoading"
          >
            <div v-if="!isLoading" class="relative text-mini-4 leading-[22px] font-medium font-poppins text-white text-center">
              Donasi Sekarang
            </div>
            <div v-if="isLoading" class="relative text-mini-4 leading-[22px] font-medium font-poppins text-white text-center flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </div>
          </button>
        </form>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";
import mainContent from "../components/main-content.vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "InfoDonatur",
  components: { mainContent },
  
  // Semua logika sekarang ada di dalam setup() untuk konsistensi
  setup() {
    // --- State Management ---
    const donation = ref<any>({}); // Pertimbangkan tipe yang lebih spesifik jika ada
    const nominal = ref<number>(0);
    const description = ref<string>("");
    const errorMessage = ref<string | null>(null);
    const isLoading = ref<boolean>(false);
    
    // --- Router dan Route ---
    const router = useRouter();
    const route = useRoute();
    const donationId = route.params.id as string;

    // --- Methods ---
    const fetchDonationDetail = async () => {
      isLoading.value = true;
      errorMessage.value = null;
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          errorMessage.value = "Sesi tidak valid. Silakan login kembali.";
          router.push("/login"); // Redirect jika tidak ada token
          return;
        }
        const response = await axios.get(
          `http://localhost:3001/v1/crowdfounding/${donationId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data && response.data.data) {
            donation.value = response.data.data;
        } else {
            errorMessage.value = "Gagal mengambil detail donasi: format data tidak sesuai.";
        }
      } catch (error: any) {
        console.error("Error fetching donation detail:", error);
        if (error.response?.data?.message) {
          errorMessage.value = `Gagal memuat detail: ${error.response.data.message}`;
        } else if (axios.isAxiosError(error) && !error.response) {
          errorMessage.value = "Tidak dapat terhubung ke server. Periksa koneksi Anda.";
        } else {
          errorMessage.value = "Gagal memuat detail donasi. Silakan coba muat ulang halaman.";
        }
      } finally {
        isLoading.value = false;
      }
    };

    const createInvoice = async () => {
      errorMessage.value = null;
      isLoading.value = true;

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          errorMessage.value = "Autentikasi dibutuhkan. Silakan login kembali.";
          isLoading.value = false; // Hentikan loading
          return;
        }

        if (!description.value.trim()) {
          description.value = "-";
        }

        const payload = {
          id: donation.value.id, // ID Proyek Crowdfunding
          amount: nominal.value.toString(),
          description: description.value,
        };
        
        const response = await axios.post(
          "http://localhost:3001/v1/donate/create-invoice",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data && response.data.invoiceUrl) {
          window.location.href = response.data.invoiceUrl;
          // isLoading tidak di-set false karena pengguna akan pindah halaman
        } else {
          errorMessage.value = "Gagal membuat invoice. URL pembayaran tidak ditemukan.";
          isLoading.value = false; // Hentikan loading karena gagal & tidak redirect
        }
      } catch (error: any) {
        console.error("Error creating invoice:", error);
        if (error.response?.data?.message) {
          errorMessage.value = `Terjadi kesalahan: ${error.response.data.message}`;
        } else if (axios.isAxiosError(error) && !error.response) {
          errorMessage.value = "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
        } else {
          errorMessage.value = "Gagal memproses donasi Anda. Silakan coba beberapa saat lagi.";
        }
        isLoading.value = false; // Hentikan loading karena terjadi error
      }
    };

    const onUbahClick = (currentDonationId: string) => {
      if (currentDonationId) {
        router.push(`/pilih-nominal-donasi/${currentDonationId}`);
      } else {
        errorMessage.value = "Gagal mengubah nominal, ID donasi tidak ditemukan.";
        console.warn("onUbahClick failed: currentDonationId is not available.");
      }
    };

    // --- Lifecycle Hooks ---
    onMounted(() => {
      fetchDonationDetail();
      const queryNominal = route.query.nominal;
      if (queryNominal) {
        nominal.value = Number(queryNominal);
      }
    });

    // --- Return values to be used in template ---
    return {
      donation,
      nominal,
      description,
      errorMessage,
      isLoading,
      onUbahClick,
      createInvoice,
    };
  },
});
</script>

<style scoped>
/* Add any additional styles here */
</style>