<template>
  <div
    class="w-full relative [background:linear-gradient(#fff,_#fff),_#fff] overflow-y-auto flex flex-col items-start justify-start gap-[10px] tracking-[normal] leading-[normal]"
  >
    <BackgroundShadow1 />
    <main
      class="self-stretch shrink-0 flex flex-row items-start justify-center py-0 pr-[21px] pl-5 box-border max-w-full text-left text-sm text-gray-700 font-poppins"
    >
      <section
        class="flex-1 flex flex-col items-start justify-start gap-[26px] max-w-full text-left text-sm text-darkslategray-200 font-poppins"
      >
        <div
          class="rounded flex flex-row items-start justify-start pt-[11.8px] px-4 pb-3 gap-[7.6px]"
        ></div>
        <div
          class="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-[15px] box-border max-w-full text-base"
        >
          <div
            class="flex-1 overflow-x-auto flex flex-row items-start justify-start gap-[30px] max-w-full mq725:gap-[15px]"
          >
            <div
              class="w-[176.7px] shrink-0 flex flex-col items-start justify-start pt-2.5 px-0 pb-0 box-border text-sm text-gray-700"
            >
              <div
                class="self-stretch flex flex-col items-start justify-start gap-[20px]"
              >
                <Item2 />
                <button
                  class="cursor-pointer pt-[5px] pb-1.5 pr-[49px] pl-[50px] bg-[transparent] rounded flex flex-row items-start justify-start border-[1px] border-solid border-royalblue-100 hover:bg-cornflowerblue-300 hover:box-border hover:border-[1px] hover:border-solid hover:border-cornflowerblue-100"
                >
                  <div
                    class="relative text-base leading-[24px] font-poppins text-royalblue-100 text-center inline-block min-w-[76px]"
                  >
                    Terapkan
                  </div>
                </button>
              </div>
              <div class="flex flex-row items-center justify-between mt-4 space-x-4">
                <button
                  class="prev-next-button"
                  @click="prevPage"
                  :disabled="currentPage === 1"
                >
                  « Previous
                </button>
                <button
                  class="prev-next-button"
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                >
                  Next »
                </button>
              </div>
            </div>
            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
            >
              <div
                v-for="news in paginatedNews"
                :key="news.id"
                class="card shadow-[0px_0px_8px_rgba(0,_0,_0,_0.12)] rounded-3xs bg-gray-1200 overflow-hidden flex flex-col"
              >
                <img
                  class="card-image relative max-w-full object-cover"
                  loading="lazy"
                  :alt="news.title"
                  :src="getImageUrl(news.image)"
                />
                <div
                  class="card-content flex flex-col items-start justify-start p-4"
                >
                  <div
                    class="self-stretch flex flex-col items-start justify-start gap-2"
                  >
                    <b class="relative leading-[16px]">
                      <p class="m-0">{{ news.title }}</p>
                    </b>
                    <div
                      class="w-full rounded bg-slategray-100 flex items-center justify-center py-1 text-center text-2xs-5 text-white"
                    >
                      <b class="flex-1 relative leading-[10.5px] font-bold">
                        {{ news.category || "Unknown" }}
                      </b>
                    </div>
                  </div>

                  <button
                    class="donate-button cursor-pointer pt-[5px] pb-1.5 bg-lightseagreen-200 w-full rounded mt-4 flex items-center justify-center border-[1px] border-solid border-royalblue-100 hover:bg-lightseagreen-100 hover:box-border hover:border-[1px] hover:border-solid hover:border-cornflowerblue-100"
                    @click="onBacaClick(news.id)"
                  >
                    <div
                      class="w-[55.3px] relative text-base leading-[24px] font-poppins text-white text-center flex items-center justify-center"
                    >
                      Baca
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <div
      class="self-stretch h-[339.5px] relative shrink-0 mq1050:h-auto mq1050:min-h-[339.5]"
    >
      <GroupComponent />
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
import BackgroundShadow1 from "../components/background-shadow1.vue";
import Item2 from "../components/item2.vue";
import GroupComponent from "../components/group-component4.vue";

const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;
export default defineComponent({
  name: "Berita1",
  components: {
    BackgroundShadow1,
    Item2,
    GroupComponent,
  },
  setup() {
    const newsList = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 9;
    const instance = getCurrentInstance(); // Get the current Vue instance

    const fetchNews = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in local storage");
        }
        const response = await axios.get(`${apiBaseUrl}news`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        newsList.value = response.data.data.data;
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    onMounted(() => {
      fetchNews();
    });

    const paginatedNews = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return newsList.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(newsList.value.length / itemsPerPage);
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

    const onBacaClick = (newsId: string) => {
      const router = instance.proxy?.$router; // Access router via instance
      if (router) {
        router.push(`/berita1/${newsId}`);
      } else {
        console.error("Router not found");
      }
    };

    const getImageUrl = (imageName: string) => {
      return `${imageName}`;
    };

    return {
      newsList,
      currentPage,
      paginatedNews,
      totalPages,
      prevPage,
      nextPage,
      onBacaClick,
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
</style>
