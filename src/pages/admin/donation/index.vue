<script setup lang="ts">
import Action from "./_components/actions.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
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
    title: "Judul Donasi 1",
    description: "Deskripsi Donasi 1",
  },
  {
    id: "2",
    title: "Judul Donasi 2",
    description: "Deskripsi Donasi 2",
  },
  {
    id: "3",
    title: "Judul Donasi 3",
    description: "Deskripsi Donasi 3",
  },
];

const onDelete = () => {
  showModalDelete.value = false;
};
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-3xl font-bold">Donasi</div>
      <div>
        <n-button type="primary" @click="router.push('/admin/donation/create')">
          <i-mdi-plus />
          Add Donasi
        </n-button>
      </div>
    </div>
    <div class="flex-col">
      <div class="flex flex-row">
        <n-card
          v-for="item in data"
          :key="item.id"
          :title="item.title"
          class="mr-4"
        >
          {{ item.description }}
          <n-progress
            type="line"
            :percentage="60"
            :indicator-placement="'inside'"
            processing
            class="my-4"
          />
          <template #footer>
            <div class="flex justify-between w-full">
              <div class="items-left ">
                <n-button class="mr-2" quaternary @click="router.push(`/admin/donation/${item.id}/detail`)">
                  Show
                </n-button>
                <n-button quaternary @click="router.push(`/admin/donation/${item.id}/update`)">
                  Edit
                </n-button>
              </div>
              <n-button quaternary @click="showModalDelete = true">
                Delete
              </n-button>
            </div>
            </template>
        </n-card>
      </div>
    </div>
    <div class="flex-col">
      <div class="flex flex-row">
        <n-card
          v-for="item in data"
          :key="item.id"
          :title="item.title"
          class="mr-4"
        >
          {{ item.description }}
          <n-progress
            type="line"
            :percentage="60"
            :indicator-placement="'inside'"
            processing
            class="my-4"
          />
          <template #footer>
            <div class="flex justify-between w-full">
              <div class="items-left ">
                <n-button class="mr-2" quaternary @click="router.push(`/admin/donation/${item.id}/detail`)">
                  Show
                </n-button>
                <n-button quaternary @click="router.push(`/admin/donation/${item.id}/update`)">
                  Edit
                </n-button>
              </div>
              <n-button quaternary @click="showModalDelete = true">
                Delete
              </n-button>
            </div>
            </template>
        </n-card>
      </div>
    </div>
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

<style scoped>
.n-card {
  margin-inline: 10px;
}
</style>
