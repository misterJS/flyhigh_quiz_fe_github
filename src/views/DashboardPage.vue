<script setup>
import ResponsiveView from "@/components/helper/ResponsiveView.vue";
import DashboardDesktop from "@/components/dashboard/DashboardDesktop.vue";
import DashboardMobile from "@/components/dashboard/DashboardMobile.vue";
</script>

<template>
  <ResponsiveView mobile-only>
    <DashboardMobile />
  </ResponsiveView>
  <ResponsiveView desktop-only>
    <DashboardDesktop />
  </ResponsiveView>
</template>
