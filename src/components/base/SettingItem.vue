<template>
  <div class="flex items-center justify-between py-3">
    <div class="flex items-center gap-3">
      <i :class="icon" class="text-lg text-gray-700"></i>
      <span class="text-sm font-medium text-gray-900">{{ label }}</span>
    </div>
    <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineProps({
  icon: String,
  label: String,
});
</script>
