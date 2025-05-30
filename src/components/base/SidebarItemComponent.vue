<template>
  <router-link
    :to="to"
    class="flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all font-medium"
    :class="
      isActive
        ? 'bg-blue-500 text-white shadow'
        : 'text-gray-600 hover:bg-gray-100'
    "
  >
    <i :class="[icon, isActive ? 'text-white' : 'text-gray-400']"></i>
    <span>{{ text }}</span>
  </router-link>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
// eslint-disable-next-line no-undef
const props = defineProps({
  icon: String,
  text: String,
  to: String,
});

const route = useRoute();
const isActive = computed(() => route.path.startsWith(props.to));
</script>
