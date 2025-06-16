<script setup>
import ResponsiveView from "@/components/helper/ResponsiveView.vue";
import LoginDesktop from "@/components/login/LoginDesktop.vue";
import LoginMobile from "@/components/login/LoginMobile.vue";
</script>

<template>
  <ResponsiveView mobile-only>
    <LoginMobile />
  </ResponsiveView>
  <ResponsiveView desktop-only>
    <LoginDesktop />
  </ResponsiveView>
</template>
