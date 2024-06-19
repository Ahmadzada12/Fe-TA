<template>
  <main
    class="flex justify-center bg-foreground-primary text-white min-h-screen"
  >
    <section class="w-1/2 py-10 px-10 h-full">
      <div class="mb-16">
        <div class="text-5xl font-bold font-poppins">Welcome Back 👋</div>
        <div class="text-white">We are happy to have you back</div>
      </div>
      <form class="space-y-3">
        <div class="w-full space-y-3">
          <FormItem id="name" label="name" class="w-11/12">
            <Input
              id="name"
              type="name"
              color="default"
              placeholder="Enter your Full Name"
              class="w-full bg-white"
            />
          </FormItem>
          <FormItem id="email" label="email" class="w-11/12">
            <Input
              id="email"
              type="email"
              color="default"
              placeholder="Enter your Email"
              class="w-full bg-white"
            />
          </FormItem>
          <FormItem id="password" label="password" class="w-11/12">
            <Input
              id="password"
              type="password"
              color="default"
              placeholder="Enter your password"
              class="w-full bg-white"
            />
          </FormItem>
          <div class="w-full mx-auto flex justify-center">
            <Button
              class="w-11/12 mt-5 py-3 bg-primary text-white rounded-lg"
              color="primary"
              >Register</Button
            >
          </div>
          <hr class="w-full mx-auto border-t border-gray-200 my-5" />
          <div class="w-full mx-auto text-center">
            <span>Already have an account? </span>
            <a
              class="text-primary hover:underline cursor-pointer"
              @click="onLoginClick"
              >Login</a
            >
          </div>
        </div>
      </form>
    </section>
    <section class="flex-initial h-full p-5 w-7/12">
      <div class="rounded-lg overflow-hidden">
        <img class="w-full object-cover max-w-fit" src="/register.png" alt="" />
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "../components/button.vue";
import Input from "../components/input.vue";
import FormItem from "../components/form-input.vue";

export default defineComponent({
  name: "Register",
  components: { Button, Input, FormItem },
  methods: {
    onLoginClick() {
      this.$router.push("/Login");
    },
  },
});
</script>

<style scoped>
form > div {
  max-width: 100%;
}
</style>
