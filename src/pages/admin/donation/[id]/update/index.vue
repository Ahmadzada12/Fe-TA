<script setup lang="ts">
import { useHttp, useHttpMutation } from "@/composables/http/http";
import { useMessage } from "naive-ui";
import { ref, watchEffect, computed } from 'vue'; // Import reactive utilities

type Response = {
  data: {
    data: any[];
    total: number;
  };
};

type Data = Partial<{
  title: string
  statusDonasi: 'published' | 'unpublished'
  image: string
  donationTarget: string
  donationCollected: string
  donationStartDate: string
  donationFinishedDate: string
}>;

const route = useRoute();
const router = useRouter()
const message = useMessage()

const start = ref(new Date().getTime());
const end = ref(new Date().getTime());

// Use ref to make formData reactive
const formData = ref<Data>({});

// Fetch news data
const { data, isLoading } = useHttp<{
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

// HTTP mutation for updating news
const { mutate } = useHttpMutation(`crowdfounding/update/${route.params.id}`, {
  method: "PUT",
  queryOptions: {
    onSuccess() {
      message.success('Berhasil mengubah data!')
      router.push('/admin/donation')
    }
  }
});

// Submit form function
const onSubmit = () => {
  mutate(formData.value);
};

const statusOptions = ref([
  {
    label: "Published",
    value: 'published'
  },
  {
    label: "Unpublished",
    value: 'unpublished'
  },
]);

const handleBack = () => {
  router.push('/admin/donation')
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-3xl font-bold">Donasi</div>
    </div>
    <div>
      <n-form ref="form" :model="formData" @submit.prevent="onSubmit">
        <n-form-item label="Judul Donasi" path='title'>
          <n-input v-model:value='formData.title' />
        </n-form-item>

        <n-form-item label="Status Donasi" path='status'>
          <n-select v-model:value='formData.statusDonasi' :options="statusOptions" />
        </n-form-item>
        <n-grid x-gap="12" :cols="2">
          <n-gi>
            <n-form-item label="Target Donasi" path='donationTarget'>
              <n-input v-model:value='formData.donationTarget' />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="Donasi Terkumpul">
              <n-input v-model:value='formData.donationCollected' />
            </n-form-item>
          </n-gi>
        </n-grid>
        <n-form-item>
          <n-upload multiple directory-dnd action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :max="5">
            <n-upload-dragger>
              <div style="margin-bottom: 12px">
                <n-icon size="48" :depth="3">
                  <i-mdi-image />
                </n-icon>
              </div>
              <n-text style="font-size: 16px">
                Click or drag a file to this area to upload
              </n-text>
              <n-p depth="3" style="margin: 8px 0 0 0">
                Strictly prohibit from uploading sensitive information. For
                example, your bank card PIN or your credit card expiry date.
              </n-p>
            </n-upload-dragger>
          </n-upload>
        </n-form-item>
        <div class="flex">
          <n-form-item class="mr-5" label="Tanggal Mulai Donasi" path='donationStartDate'>
            <n-date-picker v-model:value="start" type="datetime" clearable />
          </n-form-item>
          <n-form-item label="Donasi Selesai" path='donationFinishedDate'>
            <n-date-picker v-model:value="end" type="datetime" clearable />
          </n-form-item>
        </div>
        <div class="flex justify-end gap-5">
          <n-button @click='handleBack'>Cancel</n-button>
          <n-button type="primary" attr-type="submit">Submit</n-button>
        </div>
      </n-form>
    </div>
  </div>
</template>
