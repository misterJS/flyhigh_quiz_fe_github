<script setup>
import ResponsiveView from "@/components/helper/ResponsiveView.vue";
import SubjectMobile from "@/components/subject/SubjectMobile.vue";
</script>

<template>
  <ResponsiveView mobile-only>
    <SubjectMobile />
  </ResponsiveView>
  <ResponsiveView desktop-only>
    <div>Desktop</div>
  </ResponsiveView>
</template>
