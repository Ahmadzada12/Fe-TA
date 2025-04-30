<template>
  <div
    class="w-full relative [background:linear-gradient(#fff,_#fff),_#fff] overflow-y-auto flex flex-col items-center justify-start gap-[30px] leading-[normal] tracking-[normal] text-left text-sm text-slategray-100 font-poppins"
  >
    <mainContent />
    <div
      class="w-full flex flex-row items-start justify-center py-0 px-5 box-border max-w-full"
    >
      <a
        class="text-decoration-none relative leading-[24px] font-bold text-inherit mq450:text-lgi mq450:leading-[19px]"
        >Donasi Saya</a
      >
    </div>
    <section
      class="self-stretch flex flex-row items-start justify-center py-0 px-9 box-border max-w-full text-left text-sm text-slategray-200 font-roboto"
    >
      <div
        class="w-full shadow-md rounded bg-white flex flex-col items-start justify-start pt-0 px-0 pb-[0.5px] box-border max-w-full"
      >
        <div class="overflow-x-auto w-full">
          <table class="min-w-full bg-white">
            <thead>
              <tr>
                <th
                  class="py-2 px-4 border-b-2 border-gray-300 text-left leading-[21px] font-bold"
                >
                  ##
                </th>
                <th
                  class="py-2 px-4 border-b-2 border-gray-300 text-left leading-[21px] font-bold"
                >
                  Campaign
                </th>
                <th
                  class="py-2 px-4 border-b-2 border-gray-300 text-left leading-[21px] font-bold"
                >
                  Keterangan
                </th>
                <th
                  class="py-2 px-4 border-b-2 border-gray-300 text-left leading-[21px] font-bold"
                >
                  Waktu
                </th>
                <th
                  class="py-2 px-4 border-b-2 border-gray-300 text-left leading-[21px] font-bold"
                >
                  Nominal
                </th>
                <th
                  class="py-2 px-4 border-b-2 border-gray-300 text-left leading-[21px] font-bold"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(donation, index) in donations" :key="donation.id">
                <td class="py-2 px-4 border-b border-gray-300">
                  {{ index + 1 }}
                </td>
                <td class="py-2 px-4 border-b border-gray-300">
                  <router-link
                    :to="`/donasi/${donation.crowdfoundingId}`"
                    class="text-blue-500 hover:underline"
                  >
                    {{ donation.crowdfoundingTitle }}
                  </router-link>
                </td>
                <td class="py-2 px-4 border-b border-gray-300">
                  {{ donation.message }}
                </td>
                <td class="py-2 px-4 border-b border-gray-300">
                  {{ new Date(donation.createdAt).toLocaleString() }}
                </td>
                <td class="py-2 px-4 border-b border-gray-300">
                  Rp. {{ donation.amount.toLocaleString() }}
                </td>
                <td class="py-2 px-4 border-b border-gray-300">
                  <span
                    :class="{
                      'bg-green-500 text-white px-2 py-1 rounded':
                        donation.status === 'SUCCESS',
                      'bg-red-500 text-white px-2 py-1 rounded':
                        donation.status === 'FAILED',
                      'bg-yellow-500 text-white px-2 py-1 rounded':
                        donation.status === 'PENDING',
                    }"
                  >
                    {{ donation.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import mainContent from "../components/main-content.vue";

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
  name: "RiwayatDonasi",
  components: { mainContent },
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
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f5f5f5;
  text-align: left;
}

.table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}

.status-success {
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
}

.status-failed {
  background-color: #f44336;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
}

.status-pending {
  background-color: #ffeb3b;
  color: black;
  padding: 5px 10px;
  border-radius: 4px;
}
</style>
