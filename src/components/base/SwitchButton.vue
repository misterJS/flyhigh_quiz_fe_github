<template>
  <div class="bg-gray-100 rounded-full p-1 flex w-full">
    <button
      v-for="(item, idx) in options"
      :key="idx"
      @click="() => $emit('update:modelValue', item)"
      :class="[
        'w-full px-6 py-4 text-sm font-medium rounded-full focus:outline-none transition-all',
        modelValue === item
          ? 'bg-blue-600 text-white shadow'
          : 'text-gray-700 hover:bg-gray-200',
      ]"
    >
      {{ item }}
    </button>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line no-undef
defineEmits(["update:modelValue"]);
</script>
