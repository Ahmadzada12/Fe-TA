<template>
  <BackgroundShadow2 />
  <div
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
              Rp{{ nominal.toLocaleString() }}
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
              type="number"
              v-model="nominalLainnya"
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
            Minimum donasi Rp 10.000
          </div>
          <button
            class="cursor-pointer p-0 bg-lightseagreen-200 absolute w-[calc(100%_-_52px)] top-[263px] right-[26px] left-[26px] rounded box-border h-[38.8px] opacity-[0.65] border-[1px] border-solid border-lightseagreen-200 hover:bg-lightseagreen-100 hover:box-border hover:border-[1px] hover:border-solid hover:border-lightseagreen-100"
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
import BackgroundShadow2 from "./background-shadow.vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "PilihNominalDonasi",
  components: { BackgroundShadow2 },
  setup() {
    const donation = ref({});
    const nominalLainnya = ref<number | string>(""); // Nominal lainnya
    const selectedNominal = ref<number | null>(null); // Nominal yang dipilih
    const route = useRoute();
    const donationId = route.params.id;

    // Fetch donation details
    const fetchDonationDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in local storage");
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
        donation.value = response.data.data;
      } catch (error) {
        console.error("Error fetching donation detail:", error);
      }
    };
    onMounted(() => {
      fetchDonationDetail();
    });

    // Set nominal value
    const setNominal = (nominal: number) => {
      selectedNominal.value = nominal;
      nominalLainnya.value = nominal;
    };

    // Increment nominal value
    const incrementNominal = () => {
      nominalLainnya.value = Number(nominalLainnya.value) + 10000;
    };

    // Decrement nominal value
    const decrementNominal = () => {
      if (Number(nominalLainnya.value) - 10000 >= 10000) {
        nominalLainnya.value = Number(nominalLainnya.value) - 10000;
      } else {
        nominalLainnya.value = 10000;
      }
    };

    // Handle button click
    const onButtonClick = (donationId: string) => {
      window.location.href = `/infodonatur/${donationId}?nominal=${nominalLainnya.value}`;
    };

    // Get image URL
    const getImageUrl = (imageName: string) => {
      return `${imageName}`;
    };

    // Nominal options
    const nominalOptions = [30000, 50000, 75000, 100000];

    // Get left position for nominal options
    const getNominalLeftPosition = (nominal: number) => {
      const index = nominalOptions.indexOf(nominal);
      return `${4.41 + index * 16.95}%`;
    };

    return {
      donation,
      getImageUrl,
      nominalLainnya,
      selectedNominal,
      setNominal,
      incrementNominal,
      decrementNominal,
      onButtonClick,
      nominalOptions,
      getNominalLeftPosition,
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
