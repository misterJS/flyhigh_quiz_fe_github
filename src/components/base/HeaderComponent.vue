<template>
  <header class="flex justify-between items-center bg-[#f9fafb] px-6 py-4">
    <h1 class="text-xl font-semibold text-gray-800">
      {{ route.meta.title || "Untitled Page" }}
    </h1>

    <div class="flex items-center gap-4">
      <div
        class="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white"
      >
        <i class="fas fa-search text-gray-400 text-sm mr-2"></i>
        <input
          type="text"
          placeholder="Search.."
          class="bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none w-32 sm:w-48"
        />
        <button class="ml-2">
          <i class="fas fa-sliders text-gray-400 text-sm"></i>
        </button>
      </div>

      <button
        class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white"
      >
        <i class="fas fa-bell text-gray-500 text-sm"></i>
      </button>

      <button
        class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white"
      >
        <i class="fas fa-user text-gray-500 text-sm"></i>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>
