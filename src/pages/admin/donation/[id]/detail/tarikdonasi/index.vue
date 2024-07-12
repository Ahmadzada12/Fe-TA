<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHttpMutation } from '@/composables/http/http';
import { useMessage } from 'naive-ui';

type Data = Partial<{
  amount: string
  bank: string
  nomor_rekening: string
}>;

type Option = {
  label: string;
  value: string;
};

const route = useRoute();
const router = useRouter();
const message = useMessage();

const formData = ref<Data>({});
const bankOptions: Option[] = [
  { label: 'BCA', value: 'bca' },
  { label: 'BNI', value: 'bni' },
  { label: 'BRI', value: 'bri' },
  { label: 'Mandiri', value: 'mandiri' }
];

const { mutate } = useHttpMutation(computed(() => `crowdfounding/withdraw/${route.params.id}`), {
  method: 'POST',
  queryOptions: {
    onSuccess() {
      message.success('Berhasil menarik donasi!');
      router.push('/admin/donation');
    },
    onError() {
      message.error('Gagal menarik donasi!');
    }
  }
});

const onSubmit = () => {
  mutate({
    amount: parseInt(formData.value.amount as string)
  });
};
</script>

<template>
  <div class="flex justify-center items-center">
    <n-card class="w-1/2">
      <n-h2 class="text-center">Tarik Donasi</n-h2>
      <n-form ref="form" :model="formData">
        <n-form-item label="Jumlah Donasi" path="amount">
          <n-input v-model:value="formData.amount" />
        </n-form-item>
        <n-form-item label="Bank">
          <n-select v-model:value="formData.bank" :options="bankOptions" />
        </n-form-item>
        <n-form-item label="Nomor Rekening">
          <n-input />
        </n-form-item>
        <div class="flex justify-center">
          <n-button @click="onSubmit" type="primary" native-type="submit">Tarik Donasi</n-button>
        </div>
      </n-form>
    </n-card>
  </div>
</template>
