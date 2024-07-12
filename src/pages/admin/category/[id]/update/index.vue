<script setup lang="ts">
import { useHttp, useHttpMutation } from '@/composables/http/http';
import { useMessage } from 'naive-ui';


type Data = Partial<{
  name: string;
  description: string;
}>;

const route = useRoute()
const router = useRouter()
const message = useMessage()

const formData = ref<Data>({});

const { data, isLoading } = useHttp<{
  data: Data;
}>(computed(() => `category/get/${route.params.id}`));

watchEffect(() => {

  if (data.value?.data) {
    formData.value = { ...data.value.data };
  }
});

const { mutate } = useHttpMutation(`category/update/${route.params.id}`,{
  method: "PUT",
  queryOptions: {
    onSuccess() {
      message.success('Berhasil Mengubah Data!')
      router.push('admin/category')
    }
  }
});

const onSubmit = () => {
  mutate(formData.value);
}
</script>

<template>
  <n-spin :show="isLoading">
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-3xl font-bold">Kategori</div>
    </div>
    <div>
      <n-form ref="form" :model="formData" @submit.prevent="onSubmit">
        <n-form-item label="Judul Kategori" path="title">
          <n-input v-model:value="formData.name" />
        </n-form-item>
        <n-form-item label="Content" path="content">
          <n-input type="textarea" v-model:value="formData.description" />
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
          <n-button type="primary" attr-type="submit">Submit</n-button>
        </div>
      </n-form>
    </div>
  </div>
</n-spin>
</template>
