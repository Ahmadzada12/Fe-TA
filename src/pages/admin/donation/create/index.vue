<script setup lang="ts">
import { useHttpMutation } from "@/composables/http/http";
import { useMessage } from "naive-ui";
import { ref } from 'vue'; // Import reactive utilities


type Data = Partial<{
  title: string
  status: 'published' | 'unpublished'
  image: File | null
  donationTarget: string
  donationCollected: string
  donationStartDate: string
  donationFinishedDate: string
}>;

const router = useRouter()
const message = useMessage()

const start = ref(new Date().getTime());
const end = ref(new Date().getTime());

// Use ref to make formData reactive
const formData = ref<Data>({
  donationCollected: '0',
});

const rules = {
  title: [{ required: true, message: 'Judul Donasi harus diisi', trigger: 'blur' }],
  status: [{ required: true, message: 'Status Donasi harus diisi', trigger: 'blur' }],
  donationTarget: [{ required: true, message: 'Target Donasi harus diisi', trigger: 'blur' }],
  donationCollected: [{ required: true, message: 'Donasi Terkumpul harus diisi', trigger: 'blur' }],
  image: [{ required: true, message: 'Gambar harus diisi', trigger: 'blur' }],
  donationStartDate: [{ required: true, message: 'Tanggal Mulai Donasi harus diisi', trigger: 'blur' }],
  donationFinishedDate: [{ required: true, message: 'Donasi Selesai harus diisi', trigger: 'blur' }],
}

// HTTP mutation for updating news
const { mutate } = useHttpMutation(`crowdfounding/create`, {
  method: "POST",
  queryOptions: {
    onSuccess() {
      message.success('Berhasil membuat data!')
      router.push('/admin/donation')
    },
    onError(error) {
      message.error('Gagal membuat data donasi!')
    }
  }
});

// Submit form function
const onSubmit = () => {
  const startDate = new Date(start.value);
  const endDate = new Date(end.value);

  formData.value.donationStartDate = startDate.toISOString();
  formData.value.donationFinishedDate = endDate.toISOString();

  const fd = new FormData();
  fd.append('title', formData.value.title || '');
  fd.append('status', formData.value.status || '');
  fd.append('image', formData.value.image || '');
  fd.append('donationTarget', String(formData.value.donationTarget || ''));
  fd.append('donationCollected', String(formData.value.donationCollected || ''));
  fd.append('donationStartDate', formData.value.donationStartDate || '');
  fd.append('donationFinishedDate', formData.value.donationFinishedDate || '');

  mutate(fd);

  mutate(formData.value);
};

const handleBack = () => {
  router.push('/admin/donation')
}

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

const handleUpload = (uploaded: any) => {
  formData.value.image = uploaded[0].file;

};
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-3xl font-bold">Donasi</div>
    </div>
    <div>
      <n-form ref="form" :model="formData" :rules="rules" @submit.prevent="onSubmit">
        <n-form-item label="Judul Donasi" path='title'>
          <n-input v-model:value='formData.title' placeholder="Judul Donasi" />
        </n-form-item>

        <n-form-item label="Status Donasi" path='status'>
          <n-select v-model:value='formData.status' :options="statusOptions" placeholder="Status Donasi" />
        </n-form-item>
        <n-grid x-gap="12" :cols="2">
          <n-gi>
            <n-form-item label="Target Donasi" path='donationTarget'>
              <n-input v-model:value='formData.donationTarget' placeholder="Target Donasi" />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item label="Donasi Terkumpul">
              <n-input v-model:value='formData.donationCollected' />
            </n-form-item>
          </n-gi>
        </n-grid>
        <n-form-item label="Gambar" path='image'>
          <!-- <n-spin> -->
          <n-upload directory-dnd :max="1" accept="/image/png, image/jpeg," :onUpdate:fileList="handleUpload"
            list-type="image">
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
          <!-- </n-spin> -->
        </n-form-item>
        <div class="flex">
          <n-form-item class="mr-5" label="Tanggal Mulai Donasi" path='donationStartDate'>
            <n-date-picker v-model:value="start" type="datetime" clearable />
          </n-form-item>
          <n-form-item label="Tanggal Donasi Selesai" path='donationFinishedDate'>
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
