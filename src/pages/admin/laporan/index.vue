<script setup lang="ts">
import { DataTableColumns } from "naive-ui";
import Action from "./_components/actions.vue";
import { pageSelection } from "@/constants/opt";
import { useHttp, useHttpMutation } from "@/composables/http/http";
import dayjs from "dayjs";

type Donasi = {
  amount: string;
  status: string;
  user: {
    username: string;
  };
}

type Data = {
  id: string;
  title: string;
  donationTarget: string;
  donationCollected: string;
  donationStartDate: string;
  donationEndDate: string;
  Donation: Donasi[]
}

const router = useRouter();
const selectedId = ref<string>();
const showModal = ref<boolean>(false);

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

const { data: category, refetch } = useHttp<Response>("crowdfounding/get", {
  params,
});



const data = computed(() => {
  return category.value?.data?.data || [];
});

const numberFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",

});

const columns: DataTableColumns<Data> = [
  {
    key: "title",
    title: "Judul Donasi",
  },
  {
    title: "Target Donasi",
    key: "donationTarget",
    render(data) {
      return h("span", numberFormatter.format(Number(data.donationTarget)));
    },
  },
  {
    title: "Donasi Terkumpul",
    key: "donationCollected",
    render(data) {
      return h("span", numberFormatter.format(Number(data.donationCollected)));
    },
  },
  {
    title: 'Tanggal Mulai',
    key: 'donationStartDate',
    render(data) {
      return h('span', dayjs(data.donationStartDate).format('DD MMMM YYYY'));
    },
  },
  {
    title: 'Tanggal Selesai',
    key: 'donationEndDate',
    render(data) {
      return h('span', dayjs(data.donationEndDate).format('DD MMMM YYYY'));
    },
  },
  {
    key: "actions",
    width: 200,
    render(data) {
      return h(Action, {
        data,
        onDetail: () => {
          router.push(`/admin/laporan/${data.id}`);
        },
      })
    }

  }
];



// const triggerAreas = computed(() => {
//   return ["title"];// });   
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-3xl font-bold">Laporan Donasi</div>
    </div>
    <n-data-table :columns="columns" :data="data">
      <!-- <template #expand="{ row }">
        <n-collapse :triggerareas="triggerAreas">
          <n-collapse-item title="Detail">
            <p><strong>ID:</strong> {{ row.id }}</p>
            <p><strong>Judul:</strong> {{ row.title }}</p>
            <p><strong>Gambar:</strong> <img :src="row.image" alt="Category Image" /></p>
            <p><strong>Target Donasi:</strong> {{ row.donationTarget }}</p>
            <p><strong>Donasi Terkumpul:</strong> {{ row.donationCollected }}</p>
          </n-collapse-item>
        </n-collapse>
      </template> -->
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