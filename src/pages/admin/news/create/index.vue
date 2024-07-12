<script setup lang="ts">
import { useHttp, useHttpMutation } from "@/composables/http/http";
import { useMessage } from "naive-ui";
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

type Response = {
  data: {
    data: any[];
    total: number;
  };
};
type Data = Partial<{
  title: string;
  crowdfoundingId: string;
  categoryId: string;
  content: string;
  image: File | null;
  statusBerita: 'published' | 'unpublished';
}>;

const { data: kategori, isLoading: kategoriLoading } = useHttp<Response>("category/get");
const { data: Donasi, isLoading: DonasiLoading } = useHttp<Response>("crowdfounding/get");

const router = useRouter();
const message = useMessage();

const formData = ref<Data>({
  statusBerita: 'published',
});

const { mutate } = useHttpMutation("news/create", {
  method: "POST",
  queryOptions: {
    onSuccess() {
      message.success('Berhasil menambahkan data berita!');
      router.replace('/admin/news');
    }
  },
  // h


});

const categoryOptions = computed(() => {
  const data = kategori?.value?.data?.data || [];

  return data.map((item) => ({
    label: item.name,
    value: item.id
  }));
});

const crowdfoundingOptions = computed(() => {
  const data = Donasi?.value?.data?.data || [];

  return data.map((item) => ({
    label: item.title,
    value: item.id
  }));
});

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
// @ts-ignore
const onSubmit = () => {
  // const data = new FormData();
  const fd = new FormData();
  fd.append('title', formData.value.title || '');
  fd.append('categoryId', formData.value.categoryId || '');
  fd.append('crowdfoundingId', formData.value.crowdfoundingId || '');
  fd.append('content', formData.value.content || '');
  fd.append('statusBerita', formData.value.statusBerita || '');
  fd.append('image', formData.value.image || '');

  mutate(fd);

  mutate(formData.value);
};

const handleUpload = (uploaded: any) => {
  formData.value.image = uploaded[0].file;
};
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-3xl font-bold">Berita</div>
    </div>
    <div>
      <n-form ref="form" :model="formData" @submit.prevent="onSubmit">
        <n-form-item label="Judul Berita" path="title">
          <n-input v-model:value="formData.title" />
        </n-form-item>
        <n-form-item label="Kategori" path="categoryId">
          <n-select v-model:value="formData.categoryId" :options="categoryOptions" placeholder="Pilih kategori"
            :loading="kategoriLoading" />
        </n-form-item>
        <n-form-item label="Donasi" path="crowdfoundingId">
          <n-select v-model:value="formData.crowdfoundingId" :options="crowdfoundingOptions" placeholder="Pilih Donasi"
            :loading="DonasiLoading" />
        </n-form-item>
        <n-form-item label="Status Berita" path="statusBerita">
          <n-select v-model:value="formData.statusBerita" placeholder="Pilih status berita" :options="statusOptions" />
        </n-form-item>
        <n-form-item label="Content" path="content">
          <n-input type="textarea" v-model:value="formData.content" />
        </n-form-item>
        <n-form-item>
          <n-upload directory-dnd :max="1" accept="image/png, image/jpeg" :on-update:fileList="handleUpload"
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
        </n-form-item>
        <div class="flex justify-end gap-5">
          <n-button>Cancel</n-button>
          <n-button type="primary" attr-type="submit">Submit</n-button>
        </div>
      </n-form>
    </div>
  </div>
</template>