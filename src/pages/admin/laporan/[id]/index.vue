<script setup lang="ts">
import { DataTableColumns } from "naive-ui";
import { pageSelection } from "@/constants/opt";
import { useHttp } from "@/composables/http/http";
import { ref } from "vue";

type Donation = {
  amount: string;
  status: string;
  user: {
    username: string;
  };
};

type Data = {
  id: string;
  title: string;
  donationTarget: string;
  donationCollected: string;
  donationStartDate: string;
  donationFinishedDate: string;
  Donation: Donation[]
};

const params = ref({
  page: 1,
  limit: 10,
});


type Response = {
  data: {
    data: Data[];
    total: number;
  };
};

const route = useRoute();

const formData = ref<Data>({
  id: '',
  title: '',
  donationTarget: '',
  donationCollected: '',
  donationStartDate: '',
  donationFinishedDate: '',
  Donation: []
});

const { data } = useHttp<{
  data: Data;
}>(computed(() => `crowdfounding/get/${route.params.id}`));


const columns: DataTableColumns<Data> = [
  {
    key: "user.username",
    title: "Donatur",
  },
  {
    key: "amount",
    title: "Jumlah Donasi",
    render(row) {
      return numberFormat(row.amount);
    }
  },
  {
    key: "status",
    title: "Status Pembayaran",
  },
];
const exportData = () => {
  window.location.href = `http://localhost:3001/v1/crowdfounding/export/${route.params.id}`;
};

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

</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-3xl font-bold">Laporan Donasi</div>
      <n-button type="primary" @click="exportData">Ekspor Data</n-button>
    </div>
    <div class="space-y-5">
      <n-h2> {{ data?.data.title }}</n-h2>
      <div class="space-y-4">
        <div class="flex flex-row items-center justify-end">
          <div class="mr-5"> {{ numberFormat(data?.data.donationCollected || '') }} / {{
            numberFormat(data?.data.donationTarget || '') }}</div>
        </div>
        <n-progress type="line"
          :percentage="getPercentage(data?.data.donationCollected || '', data?.data.donationTarget || '')"
          :indicator-placement="'inside'" processing />
      </div>
      <div class="flex flex-row mt-4">
        <div class="flex items-center gap-3 p-4 rounded-lg shadow mr-5">
          <span class="font-bold text-gray-700">Mulai:</span>
          <span class="text-gray-600">{{ formatDate(data?.data.donationStartDate || '') }}</span>
        </div>
        <div class="flex items-center gap-3 p-4 rounded-lg shadow">
          <span class="font-bold text-gray-700">Selesai:</span>
          <span class="text-gray-600">{{ formatDate(data?.data.donationFinishedDate || '') }}</span>
        </div>
      </div>
    </div>
    <n-data-table :columns="columns" :data="data?.data.Donation">
      <div class="flex justify-between">
        <div class="flex gap-5 items-center justify-center">
        </div>
      </div>
    </n-data-table>
    <div class="flex justify-between">
      <div class="flex gap-5 items-center justify-center">
        Show
        <div class="w-20">
          <n-select v-model:value="params.limit" :options="pageSelection" />
        </div>
      </div>
      <n-pagination v-model:page="params.page" />
    </div>
  </div>
</template>