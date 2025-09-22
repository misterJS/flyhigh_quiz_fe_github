<script setup>
import ResponsiveView from "@/components/helper/ResponsiveView.vue";
import SubscribeMobile from "@/components/subscribe/SubscribeMobile.vue";
import SubscribeDesktop from "@/components/subscribe/SubscribeDesktop.vue";
</script>

<template>
  <ResponsiveView mobile-only>
    <SubscribeMobile />
  </ResponsiveView>
  <ResponsiveView desktop-only>
    <SubscribeDesktop />
  </ResponsiveView>
</template>
