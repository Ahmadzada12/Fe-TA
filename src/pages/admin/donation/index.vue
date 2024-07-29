<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { pageSelection } from "@/constants/opt";
import { useHttp, useHttpMutation } from "@/composables/http/http";

type Data = {
  id: string
  title: string
  statusDonasi: string
  donationTarget: string
  donationCollected: string
  donationStartDate: string
  donationFinishedDate: string
  deletedAt: any
  createdAt: string
  updatedAt: string
};

const router = useRouter();
const showModalDelete = ref<boolean>(false);

const handleModalDelete = (id: string) => {
  idDelete.value = id;
  showModalDelete.value = true;
};

const params = ref({
  page: 1,
  limit: 10,
  search: "",
});

type Response = {
  data: {
    data: Data[];
    total: number;
  };
};

const idDelete = ref<string>();

const { data: donation, refetch } = useHttp<Response>("crowdfounding/get/", {
  params,
});


const { mutate } = useHttpMutation(
  computed(() => `/crowdfounding/delete/${idDelete.value}`),
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
  return donation.value?.data?.data || [];
  // console.log(news.value);

});

const onDelete = () => {
  showModalDelete.value = false;
  mutate({});
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

</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-3xl font-bold">Donasi</div>
      <div class="w-64">
        <n-input v-model:value="params.search" placeholder="Search" />
      </div>
      <div>
        <n-button type="primary" @click="router.push('/admin/donation/create')">
          <i-mdi-plus />
          Add Donasi
        </n-button>
      </div>
    </div>

    <div class="grid grid-cols-3 lg:grid-cols-1 gap-4">
      <n-card v-for="item in data" :key="item.id">
        <div class='w-full flex justify-between items-center mb-2'>
          <span>{{ item.title }}</span>
          <span
            :class="{ 'text-green-500': item.statusDonasi === 'published', 'text-red-500': item.statusDonasi === 'unpublished' }">{{
              item.statusDonasi }}</span>
        </div>
        <n-progress type="line" :percentage="getPercentage(item.donationCollected, item.donationTarget)"
          :indicator-placement="'inside'" processing class="my-4" />

        <div class='w-full flex justify-between items-center mb-2'>
          <span>{{ numberFormat('0') }}</span>
          <span>{{ numberFormat(item.donationTarget) }}</span>
        </div>

        <p>Collected: <b>
            {{ numberFormat(item.donationCollected) }}
          </b></p>

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
            <n-button quaternary @click="handleModalDelete(item.id)">
              Delete
            </n-button>
          </div>
        </template>
      </n-card>
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

<style scoped>
.n-card {
  margin-inline: 10px;
}
</style>
