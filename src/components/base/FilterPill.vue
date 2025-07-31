<template>
  <button
    :class="[
      'px-4 py-2 rounded-full text-sm border font-medium transition',
      active
        ? 'bg-blue-600 text-white border-transparent'
        : 'bg-white border-gray-300 text-gray-700',
    ]"
    @click.stop="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineProps({
  label: String,
  active: Boolean,
});
</script>
