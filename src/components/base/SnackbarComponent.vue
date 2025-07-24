<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed top-6 left-0 right-0 mx-4 px-6 py-3 rounded-xl text-white shadow-lg z-50"
      :class="bgClass"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { computed } from "vue";
import { useSnackbarStore } from "@/stores/snackbarStore";

const snackbar = useSnackbarStore();

const visible = computed(() => snackbar.visible);
const message = computed(() => snackbar.message);
const type = computed(() => snackbar.type);

const bgClass = computed(() => {
  switch (type.value) {
    case "success":
      return "bg-green-500";
    case "error":
      return "bg-red-500";
    case "warning":
      return "bg-yellow-500 text-black";
    default:
      return "bg-blue-500";
  }
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
