<script setup lang="ts">
import { useHttpMutation } from '@/composables/http/http';
import { useMessage } from 'naive-ui';

type Data = Partial<{
  title: string;
  content: string;
}>;

const router = useRouter()
const message = useMessage()

const formData = ref<Data>({
});

const rules = {
  title: [{ required: true, message: 'Judul Kategori harus diisi', trigger: 'blur' }],
  content: [{ required: true, message: 'Content harus diisi', trigger: 'blur' }],
}

const { mutate } = useHttpMutation("category/create", {
  method: "POST",
  httpOptions: {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
  queryOptions: {
    onSuccess() {
      message.success('Berhasil Menambahkan Data Kategori')
      router.replace('/admin/category')
    },
    onError() {
      message.error('Gagal Menambahkan Data Kategori')
    }
  }

});
const onSubmit = () => {
  const data = new FormData();
  if (formData.value.title) data.append('title', formData.value.title);
  if (formData.value.content) data.append('content', formData.value.content);
  mutate(formData.value);
};


</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-3xl font-bold">Kategori</div>
    </div>
    <div>
      <n-form ref="form" :rules="rules" @submit.prevent="onSubmit">
        <n-form-item label="Judul Kategori" path="title">
          <n-input v-model:value="formData.title" placeholder="judul kateogori" />
        </n-form-item>
        <n-form-item label="Content" path="content">
          <n-input v-model:value="formData.content" placeholder="Deskripsi" type="textarea" />
        </n-form-item>
        <div class="flex justify-end gap-5">
          <n-button>Cancel</n-button>
          <n-button type="primary" attr-type="submit">Submit
          </n-button>
        </div>
      </n-form>
    </div>
  </div>
</template>
