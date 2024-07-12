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
  title: string;
  crowdfoundingId: string;
  categoryId: string;
  content: string;
  image: string;
  statusBerita: 'published' | 'unpublished';
}>;

const route = useRoute();
const router = useRouter()
const message = useMessage()

// Use ref to make formData reactive
const formData = ref<Data>({});

const { data: kategori, isLoading: kategoriLoading } = useHttp<Response>("category/get");
const { data: Donasi, isLoading: DonasiLoading } = useHttp<Response>("crowdfounding/get");

// Fetch news data
const { data, isLoading } = useHttp<{
  data: Data;
}>(computed(() => `news/get/${route.params.id}`));

watchEffect(() => {
  // Update formData reactively when data changes
  if (data.value?.data) {
    formData.value = { ...data.value.data };
  }
});

// HTTP mutation for updating news
const { mutate } = useHttpMutation(`news/update/${route.params.id}`, {
  method: "PUT",
  queryOptions: {
    onSuccess() {
      message.success('Berhasil mengubah data!')
      router.push('/admin/news')
    }
  }
});

// Submit form function
const onSubmit = () => {
  mutate(formData.value);
};

// Computed properties for select options
const categoryOptions = computed(() => {
  return kategori?.value?.data?.data?.map(item => ({
    label: item.name,
    value: item.id
  })) || [];
});

const crowdfoundingOptions = computed(() => {
  return Donasi?.value?.data?.data?.map(item => ({
    label: item.title,
    value: item.id
  })) || [];
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
</script>

<template>
  <n-spin :show="isLoading">
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
            <n-select v-model:value="formData.crowdfoundingId" :options="crowdfoundingOptions"
              placeholder="Pilih Donasi" :loading="DonasiLoading" />
          </n-form-item>
          <n-form-item label="Status Berita" path="statusBerita">
            <n-select v-model:value="formData.statusBerita" placeholder="Pilih status berita"
              :options="statusOptions" />
          </n-form-item>
          <n-form-item label="Content" path="content">
            <n-input type="textarea" v-model:value="formData.content" />
          </n-form-item>
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
          <div class="flex justify-end gap-5">
            <n-button>Cancel</n-button>
            <n-button type="primary" attr-type="submit">Submit</n-button>
          </div>
        </n-form>
      </div>
    </div>
  </n-spin>
</template>
