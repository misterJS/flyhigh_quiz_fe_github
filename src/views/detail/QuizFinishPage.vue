<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center bg-[#007bff] md:bg-white px-4 py-10"
  >
    <!-- Back Button (mobile only) -->
    <div class="absolute top-5 left-5 md:hidden">
      <button @click="goBack">
        <i class="fas fa-arrow-left text-white md:text-[#007bff] text-lg"></i>
      </button>
    </div>

    <!-- Image -->
    <img
      src="@/assets/quiz-finish.png"
      alt="Quiz Complete"
      class="w-48 md:w-72 mb-8"
    />

    <!-- Title -->
    <h2 class="text-xl md:text-2xl font-semibold text-white md:text-[#007bff] mb-8">
      Quizz Complete
    </h2>

    <!-- Result Cards -->
    <div class="flex flex-row gap-4 mb-10 w-full max-w-md">
      <div
        class="flex-1 bg-white/20 backdrop-blur-sm rounded-xl py-4 flex flex-col items-center"
      >
        <div class="text-3xl mb-2">🌟</div>
        <div class="text-sm font-medium text-white md:text-[#007bff]">Advanced</div>
      </div>
      <div
        class="flex-1 bg-white/20 backdrop-blur-sm rounded-xl py-4 flex flex-col items-center"
      >
        <div class="text-3xl mb-2">🥇</div>
        <div class="text-sm font-medium text-white md:text-[#007bff]">90%</div>
      </div>
      <div
        class="flex-1 bg-white/20 backdrop-blur-sm rounded-xl py-4 flex flex-col items-center"
      >
        <div class="text-3xl mb-2">☀️</div>
        <div class="text-sm font-medium text-white md:text-[#007bff]">14 XP</div>
      </div>
    </div>

    <!-- Home Button -->
    <button
      class="w-full max-w-sm bg-white md:bg-[#007bff] md:text-white text-[#007bff] text-sm font-semibold px-8 py-3 rounded-full shadow-sm"
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
function goBack() {
  router.back();
}
</script>
