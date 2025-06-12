<template>
  <div
    class="min-h-screen bg-[#f9fafb] flex flex-col items-center justify-between py-10"
  >
    <!-- Top Image & Title -->
    <div class="flex flex-col items-center">
      <img
        src="@/assets/quiz-finish.png"
        alt="Quiz Result Illustration"
        class="w-[250px] md:w-[300px] my-10"
      />
      <h2 class="text-lg font-semibold text-gray-900">Quizz Complete</h2>
    </div>

    <!-- Result Cards -->
    <div class="flex flex-col md:flex-row gap-4">
      <div
        class="bg-white rounded-xl shadow-sm px-6 py-4 flex flex-col items-center text-center"
      >
        <div class="text-2xl">🌟</div>
        <div class="text-sm font-medium text-gray-800 mt-1">Advanced</div>
      </div>
      <div
        class="bg-white rounded-xl shadow-sm px-6 py-4 flex flex-col items-center text-center"
      >
        <div class="text-2xl">🥇</div>
        <div class="text-sm font-medium text-gray-800 mt-1">90%</div>
      </div>
      <div
        class="bg-white rounded-xl shadow-sm px-6 py-4 flex flex-col items-center text-center"
      >
        <div class="text-2xl">☀️</div>
        <div class="text-sm font-medium text-gray-800 mt-1">14 XP</div>
      </div>
    </div>

    <!-- Divider -->
    <div class="w-full border-t border-blue-200 mt-6 mb-2"></div>

    <!-- Home Button -->
    <button
      class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-8 py-2 rounded-md transition"
      @click="goHome"
    >
      Home
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goHome() {
  router.push("/home");
}
</script>
