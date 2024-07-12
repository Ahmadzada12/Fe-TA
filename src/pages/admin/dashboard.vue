<script setup lang="ts">
import { useHttp } from '@/composables/http/http';



type FormData = {
  TotalNews: string,
  TotalCategories: string,
  TotalCrowdfunding: string,
}

type Response = {
  data: {
    TotalNews: string;
    TotalCategories: string;
    TotalCrowdfunding: string;
  }
}

const { data } = useHttp<Response>("dashboard/get");

const formData = ref<FormData>({
  TotalNews: data.value?.data?.TotalNews || "",
  TotalCategories: data.value?.data?.TotalCategories || "",
  TotalCrowdfunding: data.value?.data?.TotalCrowdfunding || "",
});

watchEffect(() => {
  formData.value.TotalNews = data.value?.data?.TotalNews || "";
  formData.value.TotalCrowdfunding = data.value?.data?.TotalCrowdfunding || "";
  formData.value.TotalCategories = data.value?.data?.TotalCategories || "";
});

</script>

<template>
  <div class="grid grid-col  gap-5">
    <n-card>
      <n-h2 class="text-center">Selamat Datang Pada halaman Admin</n-h2>
    </n-card>
    <div class="grid grid-cols-3 gap-5">
      <n-card class="">
        <n-h2>Total Donasi : {{ formData.TotalCrowdfunding }}</n-h2>
      </n-card>
      <n-card>
        <n-h2>Total Kategori : {{ formData.TotalCategories }}</n-h2>
      </n-card>
      <n-card>
        <n-h2>Total Berita : {{ formData.TotalNews }}</n-h2>
      </n-card>
    </div>
  </div>
</template>
