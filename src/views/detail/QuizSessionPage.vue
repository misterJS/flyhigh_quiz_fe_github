<template>
  <div class="min-h-screen bg-[#f9fafb] flex flex-col justify-between">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 pt-6">
      <button class="text-sm text-gray-600 hover:underline" @click="goBack">
        ← Back
      </button>
      <div class="flex items-center gap-1 text-red-500 text-sm font-semibold">
        <i class="fas fa-heart"></i>
        <span>5</span>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="px-6 mt-4">
      <div class="relative w-full h-2 bg-blue-100 rounded-full overflow-hidden">
        <div
          class="absolute top-0 left-0 h-full bg-blue-500 w-[45%] rounded-full transition-all duration-300"
        ></div>
      </div>
    </div>

    <!-- Question Section -->
    <div
      class="flex flex-col items-center justify-center text-center px-6 mt-10"
    >
      <div
        class="bg-white text-gray-800 text-base rounded-lg p-6 shadow-sm max-w-2xl w-full"
      >
        Budi collected 47 marbles. Then, his father gave him 28 more marbles.
        What is the total number of marbles Budi has now?
      </div>

      <!-- Options -->
      <div class="grid grid-cols-2 gap-4 mt-6 w-full max-w-2xl">
        <button
          class="py-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          Sixty-five.
        </button>
        <button
          class="py-4 rounded-lg font-semibold text-gray-800 bg-white border hover:bg-gray-100 transition"
        >
          Seventy-five.
        </button>
        <button
          class="py-4 rounded-lg font-semibold text-gray-800 bg-white border hover:bg-gray-100 transition"
        >
          Eighty-five.
        </button>
        <button
          class="py-4 rounded-lg font-semibold text-gray-800 bg-white border hover:bg-gray-100 transition"
        >
          Sixty-six.
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex justify-between items-center px-6 py-6 border-t mt-10">
      <div class="text-sm text-blue-600 font-semibold flex items-center gap-1">
        <i class="fas fa-check-circle"></i> Extraordinary.
      </div>
      <button
        class="px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition text-sm font-medium"
      >
        Next.
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goBack() {
  router.back();
}
</script>
