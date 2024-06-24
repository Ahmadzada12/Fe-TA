<template>
  <n-config-provider
    :theme-overrides="{
      Input: {
        heightMedium: '45px',
        paddingMedium: '0 15px',
      },
      common: {
        borderRadius: '12px',
        primaryColor: '#044D43',
        heightHuge: '45px',
        heightMedium: '45px',
      },
      Button: {
        heightMedium: '40px',
      },
    }"
  >
    <router-view />
  </n-config-provider>
</template>
