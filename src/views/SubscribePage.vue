<script setup>
import ResponsiveView from "@/components/helper/ResponsiveView.vue";
import SubscribeMobile from "@/components/subscribe/SubscribeMobile.vue";
</script>

<template>
  <ResponsiveView mobile-only>
    <SubscribeMobile />
  </ResponsiveView>
  <ResponsiveView desktop-only>
    <div>Desktop</div>
  </ResponsiveView>
</template>
