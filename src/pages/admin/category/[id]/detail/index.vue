<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useHttp } from "@/composables/http/http";

type data = Partial<{
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}>;

const route = useRoute();

const formData = ref<data>({});


const { data } = useHttp<{
  data: data;
}>(computed(() => `category/get/${route.params.id}`));

watchEffect(() => {
  if (data.value?.data) {
    formData.value = { ...data.value.data };
  }
});
</script>

<template>
  <div class="space-y-5">
    <div class="space-y-5">
      <n-h2>{{ formData.name }}</n-h2>
      <div> {{ formData.description }}
      </div>
    </div>
  </div>
</template>
