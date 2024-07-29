<script setup lang="ts">
import { DataTableColumns } from "naive-ui";
import Action from "./_components/actions.vue";
import { pageSelection } from "@/constants/opt";
import { useHttp, useHttpMutation } from "@/composables/http/http";

type Data = {
  id: string;
  title: string;
};

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

const { data: category, refetch } = useHttp<Response>("category/get", {
  params,
});

const { mutate } = useHttpMutation(
  computed(() => `/category/delete/${selectedId.value}`),
  {
    method: "DELETE",
    queryOptions: {
      onSuccess() {
        refetch()
      }
    }
  },
);

const data = computed(() => {
  return category.value?.data?.data || [];

});

const columns: DataTableColumns<Data> = [
  {
    key: "name",
    title: "Judul Kategori",
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
    <div class="w-64">
      <n-input v-model:value="params.search" placeholder="Search" />
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
  <n-modal v-model:show="showModalDelete" preset="card" class="max-w-lg" title="Hapus">
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
