<script setup>
import ResponsiveView from "@/components/helper/ResponsiveView.vue";
import RegisterDesktop from "@/components/register/RegisterDesktop.vue";
import RegisterMobile from "@/components/register/RegisterMobile.vue";
</script>

<template>
  <ResponsiveView mobile-only>
    <RegisterMobile />
  </ResponsiveView>
  <ResponsiveView desktop-only>
    <RegisterDesktop />
  </ResponsiveView>
</template>
