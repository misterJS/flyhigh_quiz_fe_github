<script setup>
import ResponsiveView from "@/components/helper/ResponsiveView.vue";
import ProfileMobile from "@/components/profile/ProfileMobile.vue";
</script>

<template>
  <ResponsiveView mobile-only>
    <ProfileMobile />
  </ResponsiveView>
  <ResponsiveView desktop-only>
    <div>Desktop</div>
  </ResponsiveView>
</template>
