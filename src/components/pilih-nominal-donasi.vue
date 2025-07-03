<template>
  <mainContent />

  <!-- Loading State -->
  <div v-if="isLoading" class="w-full flex items-center justify-center py-20">
    <div class="text-center">
      <svg
        class="animate-spin -ml-1 mr-3 h-8 w-8 text-gray-600 mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <p class="mt-2 text-gray-600 font-poppins">Memuat data...</p>
    </div>
  </div>

  <!-- Error State -->
  <div
    v-else-if="errorMessage"
    class="w-full flex items-center justify-center py-20"
  >
    <div
      class="max-w-md mx-auto p-4 text-center text-red-700 bg-red-100 rounded-lg"
    >
      <p class="font-bold">Oops! Terjadi kesalahan</p>
      <p class="mt-2">{{ errorMessage }}</p>
      <button
        @click="fetchDonationDetail()"
        class="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Coba Lagi
      </button>
    </div>
  </div>

  <!-- Main Content -->
  <div
    v-else
    class="w-[1377px] h-max [background:linear-gradient(#fff,_#fff),_#fff] max-w-full overflow-y-auto leading-[normal] tracking-[normal]"
  >
    <section
      :id="donation.id"
      class="absolute w-full top-[70.1px] right-[0px] left-[0px] bg-whitesmoke-100 h-[580.8px] text-left text-base text-gray-600 font-poppins"
    >
      <img
        class="absolute top-[calc(50%_-_270.4px)] left-[393.5px] w-[125px] h-[125px] overflow-hidden object-cover ml-8 rounded-3xs"
        loading="lazy"
        :alt="donation.title"
        :src="getImageUrl(donation.image)"
      />
      <div
        class="absolute h-[calc(100%_-_455.8px)] w-[calc(100%_-_912px)] top-[20px] right-[378.5px] bottom-[435.8px] left-[533.5px]"
      >
        <div class="absolute top-[-3.5px] left-[15px] w-[382.3px] h-[38.5px]">
          <b
            class="absolute top-[3.3px] left-[0px] leading-[16px] flex items-center w-[458.7px] h-8"
          >
            <span class="w-full">
              <p class="m-0 ml-5">{{ donation.title }}</p>
            </span>
          </b>
        </div>
      </div>
      <div
        class="absolute h-[calc(100%_-_253px)] top-[153px] bottom-[100px] left-[calc(50%_-_310px)] w-[620px] text-sm"
      >
        <div
          class="absolute h-full w-[calc(100%_-_30px)] top-[0px] right-[15px] bottom-[0px] left-[15px] shadow-[0px_1px_6px_rgba(49,_53,_59,_0.12)] rounded-xl bg-white"
        >
          <div
            class="absolute top-[26px] left-[26px] text-base leading-[16px] font-medium flex items-center w-[69px] h-4"
          >
            Nominal
          </div>
          <div
            class="absolute top-[50px] left-[26px] leading-[24px] flex items-center w-[190px] h-6"
          >
            Pilih nominal yang tersedia
          </div>
          <!-- Nominal Options -->
          <div
            v-for="nominal in nominalOptions"
            :key="nominal"
            :class="{ 'active-nominal': selectedNominal === nominal }"
            class="absolute h-[9.15%] w-[16.61%] top-[28.98%] rounded-23xl box-border text-center border-[1px] border-solid border-whitesmoke-300 cursor-pointer nominal-item"
            :style="{ left: getNominalLeftPosition(nominal) }"
            @click="setNominal(nominal)"
          >
            <div
              class="absolute top-[4.8px] left-[calc(50%_-_31.5px)] leading-[21px] font-light flex items-center justify-center w-[63.3px] h-[21px] whitespace-nowrap"
            >
              Rp{{ formatNumber(nominal) }}
            </div>
          </div>
          <div
            class="absolute top-[146px] left-[26px] text-base leading-[16px] font-medium flex items-center w-[136px] h-4"
          >
            Nominal Lainnya
          </div>
          <div
            class="absolute top-[170px] left-[26px] w-[calc(100%-52px)] flex items-center"
          >
            <span class="text-darkgray-100 text-center leading-[38px]"
              >Rp |</span
            >
            <input
              type="text"
              v-model="nominalLainnya"
              @input="updateCustomNominal"
              @keypress="filterNumericInput"
              @paste="filterNumericInput"
              placeholder="10.000"
              class="ml-2 flex-1 rounded-sm bg-white box-border h-10 text-xs text-darkslategray-100 border-[1px] border-solid border-lightgray-100 px-3"
            />
            <button
              class="ml-2 bg-lightgray-100 rounded p-2"
              @click="decrementNominal"
            >
              -
            </button>
            <button
              class="ml-2 bg-lightgray-100 rounded p-2"
              @click="incrementNominal"
            >
              +
            </button>
          </div>
          <div
            class="absolute top-[228.6px] left-[26px] text-xs-2 leading-[16.8px] text-slategray-100 flex items-center w-[148.4px] h-[16.8px]"
          >
            Minimum donasi Rp {{ formatNumber(MIN_DONATION) }}
          </div>

          <!-- Error Message Display - hanya tampil setelah validation (bukan saat loading) -->
          <div
            v-if="
              errorMessage &&
              !isLoading &&
              errorMessage.includes('Minimum donasi')
            "
            class="absolute top-[250px] left-[26px] right-[26px] p-3 text-sm text-red-700 bg-red-100 rounded-lg"
          >
            {{ errorMessage }}
          </div>

          <button
            class="cursor-pointer p-0 bg-lightseagreen-200 absolute w-[calc(100%_-_52px)] top-[280px] right-[26px] left-[26px] rounded box-border h-[38.8px] opacity-[0.65] border-[1px] border-solid border-lightseagreen-200 hover:bg-lightseagreen-100 hover:box-border hover:border-[1px] hover:border-solid hover:border-lightseagreen-100"
            :class="{
              'opacity-50 cursor-not-allowed':
                errorMessage && errorMessage.includes('Minimum donasi'),
            }"
            :disabled="
              !!(errorMessage && errorMessage.includes('Minimum donasi'))
            "
            @click="onButtonClick(donation.id)"
          >
            <div
              class="absolute top-[calc(50%_-_11.1px)] left-[calc(50%_-_43.2px)] text-mini-4 leading-[21.6px] font-medium font-poppins text-white text-center flex items-center justify-center w-[87px] h-[22px]"
            >
              Selanjutnya
            </div>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";
import mainContent from "./main-content.vue";
import { useRoute } from "vue-router";

// Interface untuk donation
interface DonationDetail {
  id: string;
  title: string;
  image?: string;
  userName?: string;
}

export default defineComponent({
  name: "PilihNominalDonasi",
  components: { mainContent },
  setup() {
    const donation = ref<DonationDetail>({} as DonationDetail);
    const nominalLainnya = ref<number | string>(""); // Nominal lainnya
    const selectedNominal = ref<number | null>(null); // Nominal yang dipilih
    const isLoading = ref<boolean>(false);
    const errorMessage = ref<string | null>(null);
    const route = useRoute();
    const donationId = route.params.id as string;

    // Nominal options - konstanta di atas untuk readability
    const nominalOptions = [30000, 50000, 75000, 100000];
    const MIN_DONATION = 10000;

    // Fetch donation details
    const fetchDonationDetail = async () => {
      isLoading.value = true;
      errorMessage.value = null;
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          errorMessage.value = "Sesi tidak valid. Silakan login kembali.";
          return;
        }
        console.log(donationId); // Log the donationId to debug
        const response = await axios.get(
          `http://localhost:3001/v1/crowdfounding/${donationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data && response.data.data) {
          donation.value = response.data.data;
        } else {
          errorMessage.value =
            "Gagal mengambil detail donasi: format data tidak sesuai.";
        }
      } catch (error: any) {
        console.error("Error fetching donation detail:", error);
        if (error.response?.data?.message) {
          errorMessage.value = `Gagal memuat detail: ${error.response.data.message}`;
        } else if (axios.isAxiosError(error) && !error.response) {
          errorMessage.value =
            "Tidak dapat terhubung ke server. Periksa koneksi Anda.";
        } else {
          errorMessage.value =
            "Gagal memuat detail donasi. Silakan coba muat ulang halaman.";
        }
      } finally {
        isLoading.value = false;
      }
    };
    onMounted(() => {
      fetchDonationDetail();

      // Ambil nominal dari query parameter jika ada (dari button "Ubah")
      const queryNominal = route.query.nominal;
      if (queryNominal) {
        const nominalValue = Number(queryNominal);
        nominalLainnya.value = formatNumber(nominalValue);

        // Cek apakah nominal tersebut ada di opsi yang tersedia
        if (nominalOptions.includes(nominalValue)) {
          selectedNominal.value = nominalValue;
        } else {
          // Jika bukan nominal standar, hilangkan selection untuk opsi standar
          selectedNominal.value = null;
        }
      }
    });

    // Set nominal value
    const setNominal = (nominal: number) => {
      selectedNominal.value = nominal;
      nominalLainnya.value = formatNumber(nominal);
    };

    // Update nominalLainnya saat user mengetik di input manual
    const updateCustomNominal = () => {
      // Parse input yang mungkin sudah berformat (hapus titik)
      const inputValue = nominalLainnya.value.toString();

      // Filter hanya angka, hapus karakter non-numeric
      const cleanValue = inputValue.replace(/[^0-9]/g, "");
      const numericValue = Number(cleanValue);

      // Format ulang dengan titik dan set kembali ke input
      if (!isNaN(numericValue) && numericValue >= 0) {
        nominalLainnya.value = formatNumber(numericValue);
      } else {
        nominalLainnya.value = "";
      }

      // Hanya update selected state, tidak tampilkan error
      // Error validation akan dilakukan saat klik "Selanjutnya"
      if (nominalOptions.includes(numericValue)) {
        selectedNominal.value = numericValue;
      } else {
        selectedNominal.value = null;
      }

      // Clear error message saat user sedang mengetik
      if (errorMessage.value && errorMessage.value.includes("Minimum donasi")) {
        errorMessage.value = null;
      }
    };

    // Validation untuk nominal
    const validateNominal = (value: number): boolean => {
      if (value < MIN_DONATION) {
        errorMessage.value = `Minimum donasi adalah Rp ${formatNumber(MIN_DONATION)}`;
        return false;
      }
      errorMessage.value = null;
      return true;
    };

    // Increment nominal value
    const incrementNominal = () => {
      const currentValue = parseFormattedNumber(
        nominalLainnya.value.toString()
      );
      const newValue = currentValue + 10000;
      nominalLainnya.value = formatNumber(newValue);
      updateCustomNominal();
    };

    // Decrement nominal value
    const decrementNominal = () => {
      const currentValue = parseFormattedNumber(
        nominalLainnya.value.toString()
      );
      const newValue = currentValue - 10000;

      if (newValue >= MIN_DONATION) {
        nominalLainnya.value = formatNumber(newValue);
      } else {
        nominalLainnya.value = formatNumber(MIN_DONATION);
      }
      updateCustomNominal();
    };

    // Handle button click dengan validation
    const onButtonClick = (donationId: string) => {
      const currentNominal = parseFormattedNumber(
        nominalLainnya.value.toString()
      );

      if (!validateNominal(currentNominal)) {
        return; // Stop jika validation gagal
      }

      if (donationId) {
        window.location.href = `/infodonatur/${donationId}?nominal=${currentNominal}`;
      } else {
        errorMessage.value = "ID donasi tidak ditemukan.";
      }
    };

    // Get image URL dengan fallback
    const getImageUrl = (imageName?: string) => {
      if (!imageName) {
        return "/placeholder-image.jpg"; // Fallback image
      }
      // Jika sudah full URL, return as is
      if (imageName.startsWith("http")) {
        return imageName;
      }
      // Jika relative path, tambahkan base URL jika perlu
      return `${imageName}`;
    };

    // Get left position for nominal options
    const getNominalLeftPosition = (nominal: number) => {
      const index = nominalOptions.indexOf(nominal);
      return `${4.41 + index * 16.95}%`;
    };

    // Format number dengan titik setiap 3 digit
    const formatNumber = (num: number | string): string => {
      const numStr = num.toString();
      return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    // Parse number dari string yang berformat (hilangkan titik)
    const parseFormattedNumber = (str: string): number => {
      return Number(str.replace(/\./g, ""));
    };

    // Filter input hanya angka dan titik
    const filterNumericInput = (event: Event) => {
      // Untuk keypress event, cegah input non-numeric
      if (event.type === "keypress") {
        const keyEvent = event as KeyboardEvent;
        const char = String.fromCharCode(keyEvent.which || keyEvent.keyCode);

        // Hanya izinkan angka (0-9)
        if (!/^[0-9]$/.test(char)) {
          keyEvent.preventDefault();
          return;
        }
      }

      // Untuk paste event, filter value setelah paste
      if (event.type === "paste") {
        setTimeout(() => {
          const input = event.target as HTMLInputElement;
          const value = input.value;
          // Hanya izinkan angka, hapus semua karakter lain
          const filteredValue = value.replace(/[^0-9]/g, "");

          if (filteredValue !== value) {
            input.value = filteredValue;
            nominalLainnya.value = filteredValue;
            // Trigger update manual setelah filter
            updateCustomNominal();
          }
        }, 0);
      }
    };

    return {
      donation,
      getImageUrl,
      nominalLainnya,
      selectedNominal,
      isLoading,
      errorMessage,
      fetchDonationDetail,
      setNominal,
      updateCustomNominal,
      validateNominal,
      incrementNominal,
      decrementNominal,
      onButtonClick,
      nominalOptions,
      getNominalLeftPosition,
      formatNumber,
      parseFormattedNumber,
      filterNumericInput,
      MIN_DONATION,
    };
  },
});
</script>

<style scoped>
.nominal-item {
  transition: background-color 0.3s ease;
}

.nominal-item:hover {
  background-color: #f0f0f0; /* Ganti dengan warna latar hover yang diinginkan */
  cursor: pointer;
}

.active-nominal {
  border-color: #333; /* Warna border gelap yang diinginkan */
}
</style>
