<template>
  <div
    :class="[
      'rounded-full flex w-full',
      sizePadding.container,
      variant === 'pill' ? 'bg-white' : 'bg-gray-100',
    ]"
  >
    <button
      v-for="(item, idx) in options"
      :key="idx"
      @click="() => $emit('update:modelValue', item)"
      :class="[
        'w-full font-medium rounded-full focus:outline-none transition-all',
        sizePadding.button,
        modelValue === item
          ? variant === 'pill'
            ? 'bg-blue-500 text-white shadow'
            : 'bg-blue-600 text-white shadow'
          : 'text-gray-700 hover:bg-gray-200',
      ]"
    >
      {{ item }}
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "md",
    validator: (val) => ["sm", "md", "lg"].includes(val),
  },
  variant: {
    type: String,
    default: "solid",
    validator: (val) => ["solid", "pill"].includes(val),
  },
});

defineEmits(["update:modelValue"]);

const sizePadding = computed(() => {
  switch (props.size) {
    case "sm":
      return { container: "p-0.5", button: "px-3 py-2 text-xs" };
    case "lg":
      return { container: "p-2", button: "px-8 py-5 text-base" };
    case "md":
    default:
      return { container: "p-1", button: "px-6 py-4 text-sm" };
  }
});
</script>
