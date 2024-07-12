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
const showModalDelete = ref<boolean>(false);

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

const { mutate } = useHttpMutation(
  computed(() => `/category/delete/${selectedId.value}`),
  {
    method: "DELETE",
    queryOptions: {
      onSuccess() {
        refetch();
      }
    }
  }
);

const data = computed(() => {
  return category.value?.data?.data || [];
});

const numberFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",

});

const columns: DataTableColumns<Data> = [
  {
    type: 'expand',
    expandable: (row) => row.Donation.length > 0,
    renderExpand(row) {
      // render table
      const detailDonasi = row.Donation.map((donation) => {
        return h('tr', { class: 'w-full case text-sm leading-normal' }, [
          h('td', { class: 'border px-4 py-2' }, numberFormatter.format(Number(donation.amount))),
          h('td', { class: 'border px-4 py-2' }, donation?.user?.username),
          h('td', { class: 'border px-4 py-2' }, donation.status),
        ]);
      });

      return h('div', [
        h(
          'table',
          { class: 'min-w-full bg-white' },
          [
            h('thead', [
              h('tr', { class: 'w-full bg-gray-200 text-gray-600 case text-sm leading-normal' }, [
                h('th', { class: 'border px-4 py-2' }, 'Donasi'),
                h('th', { class: 'border px-4 py-2' }, 'User'),
                h('th', { class: 'border px-4 py-2' }, 'Status'),
              ]),
            ]),
            h('tbody', detailDonasi
            ),
          ]),

      ]
      )
    }
  },
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
    key: "action",
    width: 200,
    title: "Action",
    render(data) {
      return h(Action, {
        onDelete: () => {
          selectedId.value = data.id;
          showModalDelete.value = true;
        },
        onEdit: () => {
          router.push(`/admin/category/${data.id}/update`);
        },
        onDetail: () => {
          router.push(`/admin/category/${data.id}/detail`);
        },
      });
    },
  },
];

const onDelete = () => {
  showModalDelete.value = false;
  mutate({});
};

const triggerAreas = computed(() => {
  return ["title"];
});   
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-3xl font-bold">Laporan Donasi</div>
    </div>
    <n-data-table :columns="columns" :data="data" :expandable="true">
      <template #expand="{ row }">
        <n-collapse :triggerareas="triggerAreas">
          <n-collapse-item title="Detail">
            <p><strong>ID:</strong> {{ row.id }}</p>
            <p><strong>Judul:</strong> {{ row.title }}</p>
            <p><strong>Gambar:</strong> <img :src="row.image" alt="Category Image" /></p>
            <p><strong>Target Donasi:</strong> {{ row.donationTarget }}</p>
            <p><strong>Donasi Terkumpul:</strong> {{ row.donationCollected }}</p>
          </n-collapse-item>
        </n-collapse>
      </template>
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
  <n-modal v-model:show="showModalDelete" preset="card" class="max-w-lg" title="Hapus">
    <p>Apakah anda yakin ingin menghapus data ini?</p>
    <template #footer>
      <div>
        <n-button type="primary" @click="onDelete">Submit</n-button>
        <n-button class="ml-3" @click="showModalDelete = false">Cancel</n-button>
      </div>
    </template>
  </n-modal>
</template>