<template>
  <div
    class="w-full relative [background:linear-gradient(#fff,_#fff),_#fff] overflow-y-auto flex flex-col items-center justify-start gap-[30px] leading-[normal] tracking-[normal] text-left text-sm text-slategray-100 font-poppins"
  >
    <MainContent />
    <!-- Input Search -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Cari donasi..."
      class="w-full max-w-[400px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-lightseagreen-200"
    />
    <div
      v-if="paginatedDonations.length === 0"
      class="text-center text-gray-500"
    >
      Tidak ada donasi yang ditemukan.
    </div>
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
              @error="(e) => (e.target.src = '/fallback-image.jpg')"
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
                  class="w-full rounded bg-slategray-100 flex items-center justify-center py-1 text-center text-2xs-5 text-white relative overflow-hidden"
                >
                  <div
                    class="absolute top-0 left-0 h-full bg-green-500"
                    :style="{
                      width:
                        donation.donationTarget > 0
                          ? (donation.donationCollected /
                              donation.donationTarget) *
                              100 +
                            '%'
                          : '0%',
                    }"
                  ></div>
                  <b class="relative z-10 flex-1 leading-[10.5px] font-bold">
                    {{
                      donation.donationTarget > 0
                        ? Math.round(
                            (donation.donationCollected /
                              donation.donationTarget) *
                              100
                          ) + "%"
                        : "0%"
                    }}
                  </b>
                </div>
              </div>
              <div
                class="relative self-stretch leading-[24px] flex justify-between mt-4 text-xs-2"
              >
                <div>
                  <b>Rp {{ donation.donationCollected }}</b>
                  <span class="text-gray-600">
                    <span class="text-gray-600"> </span>
                    <span class="text-slategray-100"> terkumpul, </span>
                    <span>dari Rp {{ donation.donationTarget }}</span>
                  </span>
                </div>
                <div class="text-sm text-gray-500 text-right">
                  {{ calculateDuration(donation) }}
                  hari
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
import MainContent from "./main-content.vue";

interface Donation {
  id: string;
  title: string;
  donationCollected: number;
  donationTarget: number;
  image: string;
  donationStartDate: string; // Ganti createdAt menjadi donationStartDate
  donationFinishedDate: string | null; // Ganti deletedAt menjadi donationFinishedDate
  statusDonasi?: string;
}

export default defineComponent({
  name: "Donasi",
  components: {
    PageBackground,
    MainContent,
    Item2,
    Item,
    GroupComponent4,
  },

  setup() {
    const donations = ref<Donation[]>([]);
    const searchQuery = ref("");
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

        // Perbarui statusDonasi untuk setiap donasi
        donations.value.forEach((donation) => {
          calculateDuration(donation);
        });
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    // Fungsi untuk menghitung durasi crowdfunding
    const calculateDuration = (donation: Donation) => {
      const createdDate = new Date(donation.donationStartDate);
      const endDate = donation.donationFinishedDate
        ? new Date(donation.donationFinishedDate) // Jika donationFinishedDate ada, gunakan tanggal tersebut
        : new Date(); // Jika donationFinishedDate null, gunakan tanggal hari ini
      const durationInMilliseconds = endDate.getTime() - createdDate.getTime();
      const durationInDays = Math.ceil(
        durationInMilliseconds / (1000 * 60 * 60 * 24)
      ); // Konversi ke hari

      // Jika durasi lebih dari 50 hari, ubah statusDonasi menjadi "unpublished"
      if (durationInDays > 50) {
        donation.statusDonasi = "unpublished";
      } else {
        donation.statusDonasi = "published";
      }

      return durationInDays > 50 ? 50 : durationInDays;
    };

    // Filter data berdasarkan searchQuery
    const filteredDonations = computed(() => {
      if (!searchQuery.value) {
        return donations.value.filter(
          (donation) => donation.statusDonasi === "published"
        );
      }
      return donations.value.filter(
        (donation) =>
          donation.statusDonasi === "published" &&
          donation.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
    // Pagination untuk data yang sudah difilter
    const updatePagination = () => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredDonations.value.slice(start, end);
    };
    const paginatedDonations = computed(updatePagination);

    // Total halaman berdasarkan data yang sudah difilter
    const totalPages = computed(() => {
      return Math.ceil(filteredDonations.value.length / itemsPerPage);
    });

    onMounted(() => {
      fetchDonations();
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
      searchQuery,
      paginatedDonations,
      totalPages,
      prevPage,
      nextPage,
      onPilihNominalTextClick,
      getImageUrl,
      calculateDuration,
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
