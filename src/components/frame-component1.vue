<template>
  <section
    class="self-stretch flex flex-row items-start justify-end py-0 px-9 box-border max-w-full text-left text-sm text-slategray-200 font-roboto"
  >
    <div
      class="w-[1070px] shadow-[0px_2px_4px_rgba(0,_0,_0,_0.08)] rounded bg-white flex flex-col items-start justify-start pt-0 px-0 pb-[0.5px] box-border max-w-full"
    >
      <div
        class="self-stretch flex flex-row flex-wrap items-start justify-start max-w-full [row-gap:20px]"
      >
        <div
          class="w-[73.8px] box-border flex flex-row items-start justify-start pt-[7.8px] px-2 pb-[7px] shrink-0 border-b-[1px] border-solid border-whitesmoke-600"
        >
          <b class="relative leading-[21px] font-bold inline-block min-w-[15px]"
            >##</b
          >
        </div>
        <div
          class="w-[306.1px] box-border flex flex-row items-start justify-start pt-[7.8px] px-2 pb-[7px] shrink-0 border-b-[1px] border-solid border-whitesmoke-600"
        >
          <b
            class="relative leading-[21px] font-bold inline-block min-w-[66.5px]"
            >Campaign</b
          >
        </div>
        <div
          class="h-[37.5px] flex-1 relative min-w-[313px] shrink-0 max-w-full"
        >
          <div
            class="absolute top-[0px] left-[0px] box-border w-[284.8px] flex flex-row items-start justify-start pt-[7.8px] px-2 pb-[7px] border-b-[1px] border-solid border-whitesmoke-600"
          >
            <b
              class="relative leading-[21px] font-bold inline-block min-w-[75.9px]"
              >Keterangan</b
            >
          </div>
          <div
            class="absolute top-[0px] left-[284.7px] box-border w-[196.1px] flex flex-row items-start justify-start pt-[7.8px] px-2 pb-[7px] z-[1] border-b-[1px] border-solid border-whitesmoke-600"
          >
            <b
              class="relative leading-[21px] font-bold inline-block min-w-[42.9px]"
              >Waktu</b
            >
          </div>
        </div>
        <div
          class="w-[209.3px] flex flex-row items-start justify-start shrink-0"
        >
          <div
            class="flex-1 flex flex-row items-start justify-start pt-[7.8px] px-2 pb-[7px] shrink-0 border-b-[1px] border-solid border-whitesmoke-600"
          >
            <b
              class="relative leading-[21px] font-bold inline-block min-w-[56.6px]"
              >Nominal</b
            >
          </div>
          <div
            class="w-[91.9px] box-border flex flex-row items-start justify-start pt-[7.8px] px-2 pb-[7px] shrink-0 z-[1] ml-[-0.1px] border-b-[1px] border-solid border-whitesmoke-600"
          >
            <b
              class="relative leading-[21px] font-bold inline-block min-w-[41px]"
              >Status</b
            >
          </div>
        </div>
      </div>
      <div
        class="self-stretch flex flex-row flex-wrap items-start justify-start max-w-full [row-gap:20px] text-sm-5"
      >
        <div
          v-for="(donation, index) in donations"
          :key="donation.id"
          class="self-stretch flex flex-row flex-wrap items-start justify-start max-w-full [row-gap:20px] text-sm-5"
        >
          <div
            class="w-[73.8px] box-border flex flex-row items-start justify-start pt-[18.8px] px-2 pb-[18px] shrink-0 text-sm-6 text-darkslategray-200 border-b-[1px] border-solid border-whitesmoke-600"
          >
            <div class="relative leading-[21px]">
              {{ index + 1 }}
            </div>
          </div>
          <div
            class="w-[306.1px] box-border flex flex-row items-start justify-start pt-[18.8px] px-2 pb-[18px] shrink-0 text-sm-6 text-darkslategray-200 border-b-[1px] border-solid border-whitesmoke-600"
          >
            <div class="relative leading-[21px]">
              {{ donation.crowdfoundingTitle }}
            </div>
          </div>
          <div
            class="flex-1 flex flex-row items-start justify-start min-w-[313px] shrink-0 max-w-full [row-gap:20px] text-sm-7 mq450:flex-wrap"
          >
            <div
              class="flex-1 box-border flex flex-row items-start justify-start pt-[8.3px] px-2 pb-[7px] min-w-[185px] shrink-0 border-b-[1px] border-solid border-whitesmoke-600"
            >
              <div class="relative leading-[21px]">
                <p class="m-0">
                  <span class="text-darkgray-200">Pesan :</span>
                  <span> {{ donation.message }}</span>
                </p>
              </div>
            </div>
            <div
              class="w-[196.1px] box-border flex flex-row items-start justify-start pt-[18.8px] px-2 pb-[18px] shrink-0 z-[1] text-sm-8 border-b-[1px] border-solid border-whitesmoke-600"
            >
              <div
                class="relative leading-[21px] inline-block min-w-[127px] whitespace-nowrap"
              >
                {{ new Date(donation.createdAt).toLocaleString() }}
              </div>
            </div>
          </div>
          <div
            class="w-[209.3px] flex flex-row items-start justify-start shrink-0 text-sm"
          >
            <div
              class="flex-1 flex flex-row items-start justify-start pt-[18.8px] px-2 pb-[18px] shrink-0 border-b-[1px] border-solid border-whitesmoke-600"
            >
              <b
                class="relative leading-[21px] font-bold inline-block min-w-[69.7px] whitespace-nowrap"
                >Rp. {{ donation.amount.toLocaleString() }}</b
              >
            </div>
            <div
              class="w-[91.9px] box-border flex flex-row items-start justify-start pt-[21.8px] px-2 pb-[18px] shrink-0 z-[2] text-center text-3xs-8 text-white border-b-[1px] border-solid border-whitesmoke-600"
            >
              <div
                :class="{
                  'rounded bg-mediumseagreen flex flex-row items-start justify-start pt-[3.5px] px-1.5 pb-[3.3px]':
                    donation.status === 'SUCCESS',
                  'rounded bg-red-500 flex flex-row items-start justify-start pt-[3.5px] px-1.5 pb-[3.3px]':
                    donation.status === 'FAILED',
                  'rounded bg-yellow-500 flex flex-row items-start justify-start pt-[3.5px] px-1.5 pb-[3.3px]':
                    donation.status === 'PENDING',
                }"
              >
                <b
                  class="relative leading-[11px] font-bold inline-block min-w-[38px]"
                  >{{ donation.status }}</b
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

interface Donation {
  id: string;
  userId: string;
  crowdfoundingId: string;
  crowdfoundingTitle?: string;
  amount: number;
  message: string;
  xenditInvoiceId: string;
  status: string;
  createdAt: string;
}

interface Crowdfounding {
  id: string;
  title: string;
}

const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export default defineComponent({
  name: "FrameComponent1",
  setup() {
    const donations = ref<Donation[]>([]);
    const crowdfoundings = ref<Crowdfounding[]>([]);

    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in local storage");
        }
        const response = await axios.get(`${apiBaseUrl}donate`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        donations.value = response.data;
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    const fetchCrowdfoundings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in local storage");
        }
        const response = await axios.get(`${apiBaseUrl}crowdfounding`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        crowdfoundings.value = response.data.data.data;
      } catch (error) {
        console.error("Error fetching crowdfoundings:", error);
      }
    };

    const mergeDonationsWithCrowdfoundings = () => {
      donations.value = donations.value.map((donation) => {
        const crowdfounding = crowdfoundings.value.find(
          (cf) => cf.id === donation.crowdfoundingId
        );
        return {
          ...donation,
          crowdfoundingTitle: crowdfounding ? crowdfounding.title : "Unknown",
        };
      });
    };

    onMounted(async () => {
      await fetchDonations();
      await fetchCrowdfoundings();
      mergeDonationsWithCrowdfoundings();
    });

    return {
      donations,
    };
  },
});
</script>

<style scoped>
.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-10px);
}

.card-image {
  width: 100%;
  height: 200px;
}

.card-content {
  padding: 20px;
}

.donate-button {
  padding: 10px;
  background-color: #009688;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.donate-button:hover {
  background-color: #00796b;
}

.prev-next-button {
  padding: 10px 20px;
  background-color: #009688;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.prev-next-button:hover {
  background-color: #00796b;
}

.prev-next-button:disabled {
  background-color: #b2dfdb;
  cursor: not-allowed;
}
</style>
