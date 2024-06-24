<script setup lang="ts">
import { DataTableColumns } from "naive-ui";
import Action from "./_components/actions.vue";
import { pageSelection } from "@/constants/opt";

type Data = {
  id: string;
  title: string;
};

const router = useRouter();
const showModalDelete = ref<boolean>(false);

const params = ref({
  page: 1,
  limit: 10,
});

const data: Data[] = [
  {
    id: "1",
    title: "Judul Kategori 1",
  },
];

const columns: DataTableColumns<Data> = [
  {
    key: "id",
    title: "ID",
  },
  {
    key: "title",
    title: "Judul Kategori",
  },
  {
    key: "action",
    width: 200,
    title: "Action",
    render(data) {
      return h(Action, {
        onDelete: () => {
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
};
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-3xl font-bold">Kategori</div>
      <div>
        <n-button type="primary" @click="router.push('/admin/category/create')">
          <i-mdi-plus />
          Add Kategori
        </n-button>
      </div>
    </div>
    <n-data-table :columns="columns" :data="data" />
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
  <n-modal
    v-model:show="showModalDelete"
    preset="card"
    class="max-w-lg"
    title="Hapus"
  >
    <p>Apakah anda yakin ingin menghapus data ini?</p>
    <template #footer>
      <div>
        <n-button type="primary" @click="onDelete"> Submit </n-button>
        <n-button class="ml-3" @click="showModalDelete = false">
          Cancel
        </n-button>
      </div>
    </template>
  </n-modal>
</template>
