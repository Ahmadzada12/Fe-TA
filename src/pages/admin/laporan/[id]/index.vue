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
  },
  {
    key: "status",
    title: "Status Donasi",
  },
];
const exportData = () => {
  window.location.href = `http://localhost:3001/v1/crowdfounding/export/${route.params.id}`;
};


</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-3xl font-bold">Laporan Donasi</div>
      <n-button type="primary" @click="exportData">Ekspor Data</n-button>
    </div>

    <div>
      <n-h2>{{ data?.data.title }}</n-h2>
      <div class="space-y-2">
        <div>
          <span class="font-bold">Target Donasi:</span> {{ data?.data.donationTarget }}
        </div>
        <div>
          <span class="font-bold">Donasi Terkumpul:</span> {{ data?.data.donationCollected }}
        </div>
        <div>
          <span class="font-bold">Tanggal Mulai:</span> {{ data?.data.donationStartDate }}
        </div>
        <div>
          <span class="font-bold">Tanggal Selesai:</span> {{ data?.data.donationFinishedDate }}
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