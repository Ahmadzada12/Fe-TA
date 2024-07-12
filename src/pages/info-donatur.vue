<template>
  <div
    class="w-full relative [background:linear-gradient(#fff,_#fff),_#fff] overflow-y-auto flex flex-col items-start justify-start gap-[36.7px] leading-[normal] tracking-[normal] mq750:gap-[18px]"
  >
    <main
      class="self-stretch flex flex-col items-start justify-start max-w-full"
    >
      <BackgroundShadow />
      <section
        :id="donation.id"
        class="self-stretch bg-whitesmoke-100 flex flex-col items-start justify-start pt-[19.8px] px-[393px] pb-[288.8px] box-border gap-[8px] max-w-full text-left text-base text-gray-600 font-poppins lg:pt-5 lg:pb-[188px] lg:box-border mq450:pl-5 mq450:pr-5 mq450:box-border mq750:pl-[196px] mq750:pr-[196px] mq750:pb-[122px] mq750:box-border"
      >
        <div
          class="flex flex-row items-start justify-start gap-[55px] max-w-full mq1050:flex-wrap mq750:gap-[27px]"
        >
          <img
            class="h-[100px] w-[100px] relative overflow-hidden shrink-0 object-cover"
            loading="lazy"
            alt=""
            src="/zlncafsutp-1701176203jpg@2x.png"
          />
          <div
            class="flex flex-col items-start justify-start gap-[8px] max-w-full"
          >
            <b class="relative leading-[16px]">
              <p class="m-0">{{ donation.title }}</p>
            </b>
            <div class="flex flex-row items-end justify-start text-sm">
              <img
                class="h-5 w-5 relative rounded-3xs overflow-hidden shrink-0 object-contain [debug_commit:bf4bc93]"
                loading="lazy"
                alt=""
                src="/defaultavatarpng@2x.png"
              />
              <div
                class="relative leading-[21px] font-light shrink-0 [debug_commit:bf4bc93] ml-[-0.2px]"
              >
                 MUSAWARAH X KITABISA
              </div>
              <div
                class="flex flex-col items-start justify-end pt-0 px-0 pb-[2.5px] ml-[-0.2px]"
              >
                <img
                  class="w-[15px] h-[15px] relative overflow-hidden shrink-0 object-cover [debug_commit:bf4bc93]"
                  loading="lazy"
                  alt=""
                  src="/verifywebp@2x.png"
                />
              </div>
            </div>
          </div>
        </div>
        <form
          class="m-0 self-stretch shadow-[0px_1px_6px_rgba(49,_53,_59,_0.12)] rounded-xl bg-white flex flex-col items-start justify-start pt-[26px] px-[25px] pb-[37.2px] box-border gap-[64px] max-w-full mq450:gap-[16px] mq750:gap-[32px] mq750:pt-5 mq750:pb-6 mq750:box-border"
          @submit.prevent="createInvoice"
        >
          <div
            class="self-stretch flex flex-col items-start justify-start gap-[15px] max-w-full"
          >
            <div
              class="self-stretch flex flex-row items-start justify-between pt-0 px-0 pb-[5px] gap-[20px] mq450:flex-wrap"
            >
              <div
                class="w-[151.3px] flex flex-col items-start justify-start pt-[3.5px] px-0 pb-0 box-border"
              >
                <div
                  class="self-stretch flex flex-col items-start justify-start gap-[19.5px]"
                >
                  <div
                    class="relative text-base leading-[16px] font-medium font-poppins text-gray-600 text-left"
                  >
                    Ringkasan Donasi
                  </div>
                  <div
                    class="relative text-sm leading-[21px] font-poppins text-gray-600 text-left"
                  >
                    Nominal donasi Anda
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-end justify-start gap-[12px]">
                <div
                  class="w-[55.3px] rounded-[3.2px] box-border flex flex-row items-start justify-start pt-[3px] pb-1 pr-1.5 pl-[9px] border-[1px] border-solid border-crimson"
                >
                  <div
                    class="relative text-sm leading-[21px] font-poppins text-crimson text-center inline-block min-w-[38px] cursor-pointer"
                    @click="onUbahClick(donation.id)"
                  >
                    Ubah
                  </div>
                </div>
                <div
                  class="relative text-sm leading-[21px] font-poppins text-gray-600 text-right inline-block min-w-[65px] whitespace-nowrap"
                >
                  {{ nominal.toLocaleString() }}
                </div>
              </div>
            </div>
            <div
              class="self-stretch h-[7px] flex flex-row items-start justify-start pt-0 px-0 pb-1.5 box-border max-w-full"
            >
              <div
                class="self-stretch flex-1 relative box-border max-w-full border-t-[1px] border-solid border-gray-1000"
              />
            </div>
            <div
              class="relative text-base leading-[16px] font-medium font-poppins text-gray-600 text-left inline-block min-w-[100px]"
            >
              Info Donatur
            </div>
            <div
              class="self-stretch flex flex-col items-start justify-start gap-[9px] max-w-full"
            ></div>

            <div
              class="self-stretch flex flex-row items-start justify-between gap-[20px] mq450:flex-wrap"
            >
              <div
                class="flex flex-col items-start justify-start pt-px px-0 pb-0"
              >
                <div
                  class="relative text-sm leading-[21px] font-poppins text-gray-600 text-left"
                >
                  Beri Pesan atau Komentar (Opsional)
                </div>
              </div>
            </div>
            <div
              class="self-stretch h-16 flex flex-row items-start justify-start py-0 pr-0.5 pl-px box-border max-w-full"
            >
              <div
                class="h-[66px] flex-1 rounded-sm bg-white box-border overflow-hidden flex flex-row items-start justify-start pt-3.5 px-3 pb-[38px] max-w-full border-[1px] border-solid border-lightgray-100"
              >
                <input
                  class="w-[163px] [border:none] [outline:none] font-poppins text-xs bg-[transparent] h-3 relative leading-[12px] text-slategray-100 text-left flex items-center p-0"
                  placeholder="Pesan atau Doa (Opsional)"
                  type="text"
                  v-model="description"
                />
              </div>
            </div>
          </div>
          <button
            class="cursor-pointer py-[7px] pr-5 pl-[21px] bg-lightseagreen-200 self-stretch rounded flex flex-row items-start justify-center border-[1px] border-solid border-firebrick-300 hover:bg-lightseagreen-100 hover:box-border hover:border-[1px] hover:border-solid hover:border-firebrick-100"
            type="submit"
          >
            <div
              class="relative text-mini-4 leading-[22px] font-medium font-poppins text-white text-center inline-block min-w-[124px]"
            >
              Donasi Sekarang
            </div>
          </button>
        </form>
      </section>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import BackgroundShadow from "../components/background-shadow.vue";
import ContactLabels from "../components/contact-labels.vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "InfoDonatur",
  components: { BackgroundShadow, ContactLabels },
  setup() {
    const donation = ref({});
    const route = useRoute();
    const donationId = route.params.id;

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

    return {
      donation,
      nominal: 0,
      description: ref("")
    };
  },
  data() {
    return {
      amount: 0,
      description: ""
    };
  },
  created() {
    // Ambil nilai 'nominal' dari parameter kueri rute
    const nominal = this.$route.query.nominal;
    if (nominal) {
      this.nominal = Number(nominal); // Simpan nilai dalam data komponen Anda
    } else {
      // Tangani jika 'nominal' tidak tersedia
    }
  },
  methods: {
    onUbahClick(donationId: string) {
      this.$router.push(`/pilih-nominal-donasi/${donationId}`);
    },
    async createInvoice() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in local storage");
        }

        const response = await axios.post(
          'http://localhost:3001/v1/donate/create-invoice',
          {
            id: this.donation.id,
            amount: this.nominal,
            description: this.description
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
      if (response.data && response.data.invoiceUrl) {
        window.location.href = response.data.invoiceUrl; // Redirect to the invoice URL
      } else {
        console.error('Invoice URL not found in response');
      }
    } catch (error) {
        console.error('Error creating invoice:', error);
      }
    }
  }
});
</script>
