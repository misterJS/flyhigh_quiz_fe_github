<script setup>
import ResponsiveView from "@/components/helper/ResponsiveView.vue";
import SettingDesktop from "@/components/setting/SettingDesktop.vue";
import SettingMobile from "@/components/setting/SettingMobile.vue";
</script>

<template>
  <ResponsiveView mobile-only>
    <SettingMobile />
  </ResponsiveView>
  <ResponsiveView desktop-only>
    <SettingDesktop />
  </ResponsiveView>
</template>
