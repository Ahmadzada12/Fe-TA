<script setup lang="ts">
import { useHttp, useHttpMutation } from "@/composables/http/http";

type Data = {
  title?: string;
};

const { data, isLoading } = useHttp<{
  data: Data;
}>(computed(() => `admin/news/${route.params.id}`));

watchEffect(() => {
  formData.value = data.value?.data || {};
});

const route = useRoute();
const formData = ref<Data>({});

const { mutate, isPending } = useHttpMutation(`admin/news/${route.params.id}`, {
  method: "PUT",
});

const onSubmit = () => {
  mutate(formData.value);
};
</script>

<template>
  <n-spin :show="isLoading">
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <div class="text-3xl font-bold">Berita</div>
      </div>
      <div>
        <n-form ref="form" :model="formData" @submit.prevent="onSubmit">
          <n-form-item label="Judul Berita">
            <n-input />
          </n-form-item>
          <n-form-item label="Kategori">
            <n-select />
          </n-form-item>
          <n-form-item label="Donasi">
            <n-select />
          </n-form-item>
          <n-form-item label="Content">
            <n-input type="textarea" />
          </n-form-item>
          <n-form-item>
            <n-upload
              multiple
              directory-dnd
              action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
              :max="5"
            >
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
            <n-button type="primary" attr-type="submit" :loading="isPending">
              Submit
            </n-button>
          </div>
        </n-form>
      </div>
    </div>
  </n-spin>
</template>
