<script setup>
import ResponsiveView from "@/components/helper/ResponsiveView.vue";
import RewardDesktop from "@/components/rewards/RewardDesktop.vue";
import RewardMobile from "@/components/rewards/RewardMobile.vue";

</script>

<template>
  <ResponsiveView mobile-only>
    <RewardMobile />
  </ResponsiveView>
  <ResponsiveView desktop-only>
    <RewardDesktop />
  </ResponsiveView>
</template>
