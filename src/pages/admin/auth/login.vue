<route lang="yaml">
meta:
  layout: blank
</route>

<script setup lang="ts"></script>

<template>
  <div class="w-full min-h-screen flex justify-center items-center">
    <n-card class="max-w-lg c">
      <n-h2 class="text-center">Login to Your Account</n-h2>
      <n-form>
        <n-form-item label="Email" path="email">
          <n-input placeholder="Email" />
        </n-form-item>
        <n-form-item label="Password" path="password">
          <n-input placeholder="Password" />
        </n-form-item>
        <n-form-item> <n-checkbox>Remember me</n-checkbox> </n-form-item>
        <n-button class="w-full" type="primary" attr-type="submit"
          >Login</n-button
        >
      </n-form>
    </n-card>
  </div>
</template>
