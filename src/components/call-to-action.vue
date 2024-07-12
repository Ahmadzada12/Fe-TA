<template>
  <div
    class="w-[1330px] flex flex-row items-start justify-center pt-0 px-5 pb-[38.9px] box-border max-w-full"
  >
    <header
    :key="news.id"
      class="w-[1154px] flex flex-row items-end justify-between max-w-full gap-[20px] text-left text-lgi-9 text-dimgray-200 font-montserrat mq750:flex-wrap mq750:justify-center"
    >
      <div
        class="flex flex-col items-start justify-start gap-[5.8px] max-w-full"
      >
      </div>
      <div
        class="w-[202px] flex flex-col items-start justify-end pt-0 px-0 pb-[2.4px] box-border text-right text-lgi-8 text-white"
      >
        <div
          class="self-stretch rounded-[7.21px] bg-lightseagreen-200 flex flex-row items-start justify-start pt-[1.8px] px-[25px] pb-[0.9px] whitespace-nowrap cursor-pointer border-[1.8px] border-solid border-gray-800"
          @click="onGroupContainerClick"
        >
          <div
            class="h-[57.7px] w-[202px] relative rounded-[7.21px] bg-lightseagreen-200 box-border hidden border-[1.8px] border-solid border-gray-800"
          />
          <div
            class="flex-1 relative leading-[55px] uppercase font-medium z-[1] cursor-pointer"
            @click="onDonateNowClick"
          >
            Donate Now
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "CallToAction",
  setup() {
    const news = ref({});
    const crowdfoundingId = ref("");
    const route = useRoute();
    const newsId = route.params.id;
    const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;

    const fetchNewsDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in local storage");
        }
        const response = await axios.get(`${apiBaseUrl}news/${newsId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        news.value = response.data.data;
        crowdfoundingId.value = response.data.data.crowdfoundingId;
      } catch (error) {
        console.error("Error fetching news detail:", error);
      }
    };

    onMounted(() => {
      fetchNewsDetail();
    });

    return {
      news,
      crowdfoundingId,
    };
  },
  methods: {
    onDonateNowClick() {
      this.$router.push(`/pilih-nominal-donasi/${this.crowdfoundingId}`);
    },
  },
});
</script>
