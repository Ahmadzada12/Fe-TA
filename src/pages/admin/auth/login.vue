<route lang="yaml">
  meta:
    layout: blank
  </route>

<script setup lang="ts">
import { useHttpMutation } from "@/composables/http/http";
import { useMessage, type FormInst, type FormRules } from "naive-ui";

const router = useRouter();
const message = useMessage();
const formData = ref<Form>({});
const form = ref<FormInst>();

type Form = Partial<{
  email: string;
  password: string;
}>;

type Response = {
  data: {
    token: string;
    user: any
  };
};

const { mutate, isPending } = useHttpMutation<Form, Response>(
  "auth/sign-in",
  {
    method: "POST",
    queryOptions: {
      onError(error) {
        message.error(error.data.message || "Invalid email or password");
      },
      onSuccess(data) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        message.success("Login success");
        router.push("/admin/dashboard");
      },
    },
  },
);

const rules: FormRules = {
  email: [
    {
      required: true,
      message: "Please input your email",
      trigger: ["blur", "input"],
    },
  ],
  password: [
    {
      required: true,
      message: "Please input your password",
      trigger: ["blur", "input"],
    },
  ],
};

const onSubmit = () => {
  form.value?.validate((errors) => {
    if (errors) return;
    mutate(formData.value);
  });
};
</script>

<template>
  <div class="w-full min-h-screen flex justify-center items-center">
    <n-card class="max-w-lg">
      <n-h2 class="text-center">Login to Your Account</n-h2>
      <n-form ref="form" :model="formData" :rules="rules" @submit.prevent="onSubmit">
        <n-form-item label="Email" path="email">
          <n-input v-model:value="formData.email" placeholder="Email" />
        </n-form-item>
        <n-form-item label="Password" path="password">
          <n-input v-model:value="formData.password" type="password" placeholder="Password" />
        </n-form-item>
        <n-form-item>
          <n-checkbox>Remember me</n-checkbox>
        </n-form-item>
        <n-button :disabled="isPending" :loading="isPending" class="w-full" block type="primary" attr-type="submit">
          Login
        </n-button>
      </n-form>
    </n-card>
  </div>
</template>