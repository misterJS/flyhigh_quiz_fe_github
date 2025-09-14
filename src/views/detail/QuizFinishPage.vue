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
    <h2
      class="text-xl md:text-2xl font-semibold text-white md:text-[#007bff] mb-8"
    >
      Quizz Complete
    </h2>

    <!-- Result Cards -->
    <div class="flex flex-row gap-4 mb-10 w-full max-w-md">
      <div
        class="flex-1 bg-white/20 backdrop-blur-sm rounded-xl py-4 flex flex-col items-center"
      >
        <div class="text-3xl mb-2">🌟</div>
        <div class="text-sm font-medium text-white md:text-[#007bff]">
          {{ grade }}
        </div>
      </div>
      <div
        class="flex-1 bg-white/20 backdrop-blur-sm rounded-xl py-4 flex flex-col items-center"
      >
        <div class="text-3xl mb-2">🥇</div>
        <div class="text-sm font-medium text-white md:text-[#007bff]">
          {{ scorePct }}%
        </div>
      </div>
      <div
        class="flex-1 bg-white/20 backdrop-blur-sm rounded-xl py-4 flex flex-col items-center"
      >
        <div class="text-3xl mb-2">☀️</div>
        <div class="text-sm font-medium text-white md:text-[#007bff]">
          {{ expStr }} Points
        </div>
      </div>
    </div>

    <div class="flex justify-between gap-2 w-full">
      <!-- Home Button -->
      <button
        class="w-full max-w-sm border border-white bg-[#007bff] text-white text-sm font-semibold px-8 py-3 rounded-full shadow-sm"
        @click="goReview"
      >
        Review Quiz
      </button>
      <!-- Home Button -->
      <button
        class="w-full max-w-sm bg-white md:bg-[#007bff] md:text-white text-[#007bff] text-sm font-semibold px-8 py-3 rounded-full shadow-sm"
        @click="goHome"
      >
        Home
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

// raw query → number
const rawScore = Number(route.query.score ?? 0);
const rawExp = Number(route.query.exp ?? 0);
const grade = route.query.grade || "Try Again";
const startId = route.query.startId || 0;

// Format: persen max 1 desimal, exp integer
const scorePct = computed(() =>
  Number.isFinite(rawScore)
    ? new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(
        rawScore
      )
    : "0"
);

const expStr = computed(() =>
  Number.isFinite(rawExp)
    ? new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(
        rawExp
      )
    : "0"
);

function goHome() {
  router.push("/home");
}
function goReview() {
  router.push(`/quiz-review/${startId}`);
}
function goBack() {
  router.back();
}
</script>
