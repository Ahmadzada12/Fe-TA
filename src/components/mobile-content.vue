<template>
  <main
    :key="news.id"
    class="self-stretch flex flex-row items-start justify-center pt-0 pb-[89px] pr-[22px] pl-5 box-border max-w-full lg:pb-[58px] lg:box-border mq750:pb-[38px] mq750:box-border"
  >
    <section
      class="w-[1180px] flex flex-col items-start justify-start gap-[58px] max-w-full text-left text-lgi-5 text-black font-montserrat mq750:gap-[29px]"
    >
      <div
        class="w-[725px] flex flex-row items-start justify-between pt-0 px-0 pb-[3.9px] box-border gap-[20px] max-w-full text-lightseagreen-200"
      >
        <div class="w-[220px] flex flex-row items-end justify-start">
          <div
            class="flex-1 flex flex-col items-start justify-end pt-0 px-0 pb-[11.1px]"
          >
            <div
              class="self-stretch flex flex-col items-start justify-start gap-[1px]"
            ></div>
          </div>
        </div>
        <div
          class="flex flex-col items-start justify-start pt-[13px] px-0 pb-0 box-border max-w-full text-lg text-black"
        >
          <div
            class="flex flex-row items-start justify-start gap-[27px] mq450:hidden"
          >
            <div
              class="flex flex-col items-start justify-start py-0 pr-1.5 pl-0"
            >
              <div
                class="relative inline-block min-w-[58px] cursor-pointer"
                @click="onHomeClick"
              >
                Home
              </div>
            </div>
            <div
              class="relative inline-block min-w-[64px] cursor-pointer"
              @click="onDonasiClick"
            >
              Donasi
            </div>
            <div
              class="w-[62px] flex flex-col items-start justify-start py-0 pr-1 pl-0 box-border text-lightseagreen-200"
            >
              <div class="self-stretch relative">Berita</div>
            </div>
            <div
              class="relative whitespace-nowrap cursor-pointer"
              @click="onRiwayatDonasiClick"
            >
              Riwayat Donasi
            </div>
          </div>
        </div>
      </div>
      <div
        class="self-stretch flex flex-row items-start justify-start pt-0 pb-[15px] pr-0 pl-[23px] box-border max-w-full text-center text-11xl font-roboto"
      >
        <div
          class="flex-1 flex flex-col items-start justify-start gap-[27px] max-w-full"
        >
          <div
            class="w-[1136px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full"
          >
            <h2
              class="m-0 relative text-inherit leading-[60px] uppercase font-bold font-inherit mq1050:text-5xl mq1050:leading-[48px] mq450:text-lg mq450:leading-[36px]"
            >
              {{ news.title }}
            </h2>
          </div>
          <div
            class="self-stretch flex flex-row items-start justify-start relative max-w-full text-left text-mini text-white font-montserrat"
          >
            <img
              class="h-[400px] flex-1 relative max-w-full overflow-hidden object-cover z-[1]"
              :alt="news.title"
              :src="getImageUrl(news.image)"
            />
          </div>
        </div>
      </div>
      <div
        class="self-stretch flex flex-row items-start justify-start py-0 pr-[3px] pl-1 box-border max-w-full text-13xl font-source-sans-pro"
      >
        <div
          class="flex-1 flex flex-col items-start justify-start gap-[33px] max-w-full mq750:gap-[16px]"
        >
          <h1
            class="m-0 w-[190px] relative text-inherit font-normal font-inherit inline-block mq1050:text-7xl mq450:text-lgi"
          >
            Story
          </h1>
          <div
            class="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-px box-border max-w-full text-lg text-gray-100 font-roboto-condensed"
          >
            <div
              class="flex-1 flex flex-col items-start justify-start gap-[6px] max-w-full"
            >
              <div
                class="self-stretch flex flex-row items-start justify-start py-0 pr-[9px] pl-[3px] box-border max-w-full"
              >
                <p
                  class="m-0 flex-1 relative leading-[24.3px] inline-block max-w-full"
                >
                  {{ news.content }}
                </p>
              </div>
              <div
                class="w-[1160px] flex flex-row items-start justify-start pt-0 px-0 pb-[7px] box-border max-w-full"
              >
                <p
                  class="m-0 flex-1 relative leading-[24.3px] inline-block max-w-full"
                ></p>
              </div>

              <div
                class="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-[3px] box-border max-w-full"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "MobileContent",
  setup() {
    const news = ref({});
    const route = useRoute();
    const newsId = route.params.id;
    const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;

    const fetchNewsDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in local storage");
        }
        console.log(newsId); // Log the newsId to debug
        const response = await axios.get(`${apiBaseUrl}news/${newsId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        news.value = response.data.data;
      } catch (error) {
        console.error("Error fetching donation detail:", error);
      }
    };

    onMounted(() => {
      fetchNewsDetail();
    });
    const getImageUrl = (imageName: string) => {
      return `${imageName}`;
    };
    return {
      news,
      getImageUrl,
    };
  },
  methods: {
    onHomeClick() {
      this.$router.push("/");
    },
    onDonasiClick() {
      this.$router.push("/donasi");
    },
    onRiwayatDonasiClick() {
      this.$router.push("/riwayat-donasi");
    },
  },
});
</script>
