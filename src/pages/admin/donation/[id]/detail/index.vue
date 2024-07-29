<script setup lang="ts">
import { useHttp, useHttpMutation } from "@/composables/http/http";
import { useMessage } from "naive-ui";
import { ref, watchEffect, computed } from 'vue'; // Import reactive utilities

type Response = {
  data: {
    data: Data[];
    total: number;
  };
};

type Data = {
  id: string
  title: string
  statusDonasi: 'published' | 'unpublished'
  donationTarget: string
  donationCollected: string
  donationStartDate: string
  donationFinishedDate: string
  image: string
}

const route = useRoute();
const router = useRouter()
const message = useMessage()

const start = ref(new Date().getTime());
const end = ref(new Date().getTime());

// Use ref to make formData reactive
const formData = ref<Data>({
  id: '',
  title: '',
  image: '',
  statusDonasi: 'published',
  donationTarget: '',
  donationCollected: '',
  donationStartDate: '',
  donationFinishedDate: ''
});

// Fetch news data
const { data } = useHttp<{
  data: Data;
}>(computed(() => `crowdfounding/get/${route.params.id}`));

watchEffect(() => {
  // Update formData reactively when data changes
  if (data.value?.data) {
    formData.value = { ...data.value.data };
    start.value = new Date(data.value.data.donationStartDate as string).getTime();
    end.value = new Date(data.value.data.donationFinishedDate as string).getTime();
  }
});

const numberFormat = (value: string) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(parseInt(value));
};

const getPercentage = (donationCollected: string, donationTarget: string) => {
  const collected = parseInt(donationCollected);
  const target = parseInt(donationTarget);

  const percentage = (collected / target) * 100;

  return parseFloat(percentage.toFixed(2));
};

const months = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const onClick = () => {
  router.push(`/admin/donation/${route.params.id}/detail/tarikdonasi`)
}
</script>


<template>
  <div class="space-y-5">
    <div class="space-y-5">
      <n-h2> {{ formData.title }}</n-h2>
      <div class="space-y-4">
        <div class="flex flex-row items-center justify-end">
          <div class="mr-5"> {{ numberFormat(formData.donationCollected) }} / {{
            numberFormat(formData.donationTarget) }}</div>
          <n-button type="primary" quaternary @click="onClick">Tarik Donation</n-button>
        </div>
        <n-progress type="line" :percentage="getPercentage(formData.donationCollected, formData.donationTarget)"
          :indicator-placement="'inside'" processing />
      </div>
      <div class="w-1/2">
        <n-image class="w-full block" :src="formData.image" alt="donation" />
      </div>
      <div class="flex flex-row mt-4">
        <div class="flex items-center gap-3 p-4 rounded-lg shadow mr-5">
          <span class="font-bold text-gray-700">Mulai:</span>
          <span class="text-gray-600">{{ formatDate(formData.donationStartDate) }}</span>
        </div>
        <div class="flex items-center gap-3 p-4 rounded-lg shadow">
          <span class="font-bold text-gray-700">Selesai:</span>
          <span class="text-gray-600">{{ formatDate(formData.donationFinishedDate) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
