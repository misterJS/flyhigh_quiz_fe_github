<script setup>
import ForgetPasswordmobile from "@/components/forgot-password/ForgetPasswordMobile.vue";
</script>

<template>
  <ResponsiveView mobile-only>
    <ForgetPasswordmobile />
  </ResponsiveView>
  <ResponsiveView desktop-only>
    <RegisterDesktop />
  </ResponsiveView>
</template>
