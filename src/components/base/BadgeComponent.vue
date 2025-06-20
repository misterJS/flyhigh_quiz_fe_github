<template>
  <div
    :class="badgeClass"
    class="px-2 py-1 rounded-full text-[10px] font-semibold"
  >
    {{ status }}
  </div>
</template>

<script setup>
import { computed } from 'vue';

// eslint-disable-next-line no-undef
defineProps({
  status: String,
});

const badgeClass = computed(() => {
  if (status === "Completed") return "bg-green-100 text-green-600";
  if (status === "Expired") return "bg-red-100 text-red-500";
  return "bg-gray-200 text-gray-600";
});
</script>
