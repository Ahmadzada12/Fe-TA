<template>
  <div
    class="w-full relative [background:linear-gradient(#fff,_#fff),_#fff] overflow-y-auto flex flex-col items-center justify-start gap-[30px] leading-[normal] tracking-[normal] text-left text-sm text-slategray-100 font-poppins"
  >
    <PageBackground />
    <main
      class="self-stretch shrink-0 flex flex-row items-start justify-center py-0 pr-[21px] pl-5 box-border max-w-full text-left text-sm text-gray-700 font-poppins"
    >
      <div
        class="self-stretch w-full overflow-x-auto shrink-0 flex flex-row items-start justify-start gap-[29.9px] max-w-full"
      >
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          <div
            v-for="donation in paginatedDonations"
            :key="donation.id"
            class="card shadow-[0px_0px_8px_rgba(0,_0,_0,_0.12)] rounded-3xs bg-gray-1200 overflow-hidden flex flex-col"
          >
            <img
              class="card-image relative max-w-full object-cover"
              loading="lazy"
              :alt="donation.title"
              :src="getImageUrl(donation.image)"
            />
            <div
              class="card-content flex flex-col items-start justify-start p-4"
            >
              <div
                class="self-stretch flex flex-col items-start justify-start gap-2"
              >
                <b class="relative leading-[16px]">
                  <p class="m-0">{{ donation.title }}</p>
                </b>
                <div
                  class="w-full rounded bg-slategray-100 flex items-center justify-center py-1 text-center text-2xs-5 text-white"
                >
                  <b class="flex-1 relative leading-[10.5px] font-bold">
                    {{ donation.category || "Unknown" }}
                  </b>
                </div>
              </div>
              <div
                class="self-stretch flex flex-col items-start justify-start text-xs-2 text-gold mt-4"
              >
                <div class="relative leading-[24px]">
                  <b>Rp {{ donation.donationCollected }}</b>
                  <span class="text-gray-600">
                    <span class="text-gray-600"> </span>
                    <span class="text-slategray-100">terkumpul </span>
                    <span>dari Rp {{ donation.donationTarget }}</span>
                  </span>
                </div>
              </div>
              <button
                class="donate-button cursor-pointer pt-[5px] pb-1.5 bg-lightseagreen-200 w-full rounded mt-4 flex items-center justify-center border-[1px] border-solid border-royalblue-100 hover:bg-lightseagreen-100 hover:box-border hover:border-[1px] hover:border-solid hover:border-cornflowerblue-100"
                @click="onPilihNominalTextClick(donation.id)"
              >
                <div
                  class="w-[55.3px] relative text-base leading-[24px] font-poppins text-white text-center flex items-center justify-center"
                >
                  Donasi
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div class="pagination-container flex justify-center w-full mt-4">
      <button
        class="prev-next-button mr-2"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        « Previous
      </button>
      <button
        class="prev-next-button ml-2"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next »
      </button>
    </div>
    <div
      class="self-stretch h-[339.5px] relative shrink-0 mq1050:h-auto mq1050:min-h-[339.5]"
    >
      <GroupComponent4 />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  getCurrentInstance,
} from "vue";
import axios from "axios";
import PageBackground from "./page-background.vue";
import Item2 from "./item2.vue";
import Item from "./item.vue";
import GroupComponent4 from "./group-component4.vue";

export default defineComponent({
  name: "Donasi",
  components: {
    PageBackground,
    Item2,
    Item,
    GroupComponent4,
  },
  setup() {
    const donations = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 9;
    const instance = getCurrentInstance(); // Get the current Vue instance

    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in local storage");
        }
        const response = await axios.get(
          "http://localhost:3001/v1/crowdfounding",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        donations.value = response.data.data.data;
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    onMounted(() => {
      fetchDonations();
    });

    const paginatedDonations = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return donations.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(donations.value.length / itemsPerPage);
    });

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const onPilihNominalTextClick = (donationId: string) => {
      const router = instance.proxy?.$router; // Access router via instance
      if (router) {
        router.push(`/pilih-nominal-donasi/${donationId}`);
      } else {
        console.error("Router not found");
      }
    };

    const getImageUrl = (imageName: string) => {
      return `${imageName}`;
    };

    return {
      donations,
      currentPage,
      paginatedDonations,
      totalPages,
      prevPage,
      nextPage,
      onPilihNominalTextClick,
      getImageUrl,
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

.pagination-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
