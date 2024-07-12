<script setup lang="ts">
import { DataTableColumns } from "naive-ui";
import Action from "./_components/actions.vue";
import { pageSelection } from "@/constants/opt";
import { useHttp, useHttpMutation } from "@/composables/http/http";

type Data = {
  id: string;
  title: string;
  statusBerita: string;
  crowdfounding: {
    title: string;
  }
  category: {
    name: string;
  }
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

const { data: news, isLoading, refetch } = useHttp<Response>("news/get", {
  params,
});

const { mutate } = useHttpMutation(
  computed(() => `/news/delete/${selectedId.value}`),
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
  return news.value?.data?.data || [];
  // console.log(news.value);

});

const columns: DataTableColumns<Data> = [
  // {
  //   key: "id",
  //   title: "ID",
  // },
  {
    key: "title",
    title: "Judul Berita",
  },
  {
    key: "category.name",
    title: " Kateogri Berita",
    render(row) {
      return row.category.name
    }
  },
  {
    key: "crowdfounding.title",
    title: " Donasi",
    render(row) {
      return row.crowdfounding.title
    }
  },
  {
    key: "statusBerita",
    title: "Status Berita",
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
          router.push(`/admin/news/${data.id}/update`);
        },
        onDetail: () => {
          router.push(`/admin/news/${data.id}/detail`);
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
      <div class="text-3xl font-bold">Berita</div>
      <div>
        <n-button type="primary" @click="router.push('/admin/news/create')">
          <i-mdi-plus />
          Add Berita
        </n-button>
      </div>
    </div>
    <n-data-table :columns="columns" :data="data" :loading="isLoading" />
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
