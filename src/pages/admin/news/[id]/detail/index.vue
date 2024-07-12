<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useHttp } from "@/composables/http/http";

type data = Partial<{
  title: string;
  content: string;
  image: string;
  category: {
    name: string;
  }
  crowdfounding: {
    title: string;
  }
}>;

const route = useRoute();

const formData = ref<data>({
  title: '',
  content: '',
  image: '',
  category: {
    name: ''
  },
  crowdfounding: {
    title: ''
  }
});


const { data } = useHttp<{
  data: data;
}>(computed(() => `news/get/${route.params.id}`));

watchEffect(() => {
  if (data.value?.data) {
    formData.value = { ...data.value.data };
  }
});


</script>

<template>
  <div class="space-y-5">
    <div class="space-y-5">
      <n-h2> {{ formData.title }}</n-h2>
      <div class="w-1/2">
        <n-image class="w-full block" :src="formData.image" alt="news" />
      </div>
      <div class="flex gap-5">
        <div>
          <div>Donasi</div>
          <n-tag type="primary">{{ formData.crowdfounding?.title }}</n-tag>
        </div>
        <div>
          <div>Kategori</div>
          <n-tag type="primary">{{ formData.category?.name }}</n-tag>
        </div>
      </div>
      <div> {{ formData.content }}
      </div>
    </div>
  </div>
</template>
