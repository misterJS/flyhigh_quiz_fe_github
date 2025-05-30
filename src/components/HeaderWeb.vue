<template>
  <header class="bg-[#0A1129] px-6 py-2">
    <div
      class="max-w-7xl mx-auto flex items-center justify-between rounded-full border border-[#1C1F2E] py-2 px-4"
    >
      <!-- Logo -->
      <img src="/logo.png" alt="FlyHigh Logo" class="h-8" />

      <!-- Navigation -->
      <nav class="hidden md:flex gap-6 text-sm">
        <a href="#" class="text-white font-semibold">Home</a>
        <a href="#" class="text-gray-400 hover:text-white">Our Products</a>
        <a href="#" class="text-gray-400 hover:text-white">Teachers</a>
        <a href="#" class="text-gray-400 hover:text-white">About us</a>
        <a href="#" class="text-gray-400 hover:text-white">Learning Port</a>
        <a href="#" class="text-gray-400 hover:text-white">Contact Us</a>
      </nav>

      <!-- Cart & Login -->
      <div class="flex items-center gap-3">
        <button class="p-2 border border-gray-600 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.293 2.293a1 1 0 001.415 1.414L8.828 14H19"
            />
          </svg>
        </button>
        <ButtonBase
          class="bg-white text-black px-5 py-1.5 text-sm rounded-full font-semibold shadow"
        >
          Login
        </ButtonBase>
      </div>
    </div>
  </header>
</template>

<script setup>
import ButtonBase from "@/components/base/BaseButton.vue";
</script>
