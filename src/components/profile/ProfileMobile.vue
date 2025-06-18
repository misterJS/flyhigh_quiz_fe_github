<template>
  <div class="min-h-screen bg-[#f9fafb] pb-24">
    <!-- Header Section -->
    <div class="bg-cyan-600 p-4 text-white rounded-b-2xl relative">
      <div class="flex justify-between items-center">
        <img src="@/assets/logo.png" class="w-16" />
        <i class="fas fa-cog text-white text-lg"></i>
      </div>
      <div class="flex items-center gap-3 mt-8">
        <img src="@/assets/Avatar.png" class="w-12 h-12 rounded-full" />
        <div class="flex-1">
          <p class="font-semibold">Alycia Clarissa Putri</p>
          <p class="text-sm text-gray-200">
            alycia@gmail.com
            <span class="text-xs bg-white/20 px-2 py-0.5 rounded"
              >Level Study</span
            >
          </p>
        </div>
      </div>
    </div>

    <div class="px-4 pt-4 space-y-6">
      <!-- My Recent Match -->
      <section>
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-sm font-semibold text-gray-900">My Recent Match</h3>
          <a href="#" class="text-xs text-blue-600 font-medium">View All</a>
        </div>
        <div class="space-y-3">
          <div
            v-for="quiz in recentQuizzes"
            :key="quiz.name"
            class="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div class="flex gap-3 items-center">
              <img :src="quiz.icon" class="w-6 mt-0.5" />
              <div>
                <p class="font-semibold text-sm">{{ quiz.name }}</p>
                <p class="text-xs text-gray-400">
                  {{ quiz.category }} • {{ quiz.totalQuestions }} questions
                </p>
              </div>
            </div>
            <span class="flex items-center text-sm font-medium gap-1">
              <i class="fas fa-heart text-gray-400 text-xs"></i>
              {{ quiz.score }}/{{ quiz.totalQuestions }}
            </span>
          </div>
        </div>
      </section>

      <!-- Report Quiz -->
      <section>
        <div
          class="bg-[#f3f4f6] rounded-xl px-4 py-5 flex items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <i class="fas fa-flag text-gray-600"></i>
            <p class="text-sm font-medium">Report Quiz</p>
          </div>
          <i class="fas fa-chevron-right text-gray-400"></i>
        </div>
      </section>

      <!-- Saved Quiz -->
      <section>
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-sm font-semibold text-gray-900">Saved Quiz</h3>
          <a href="#" class="text-xs text-blue-600 font-medium">View All</a>
        </div>
        <div class="overflow-x-auto">
          <div class="flex gap-4 w-max">
            <div
              class="bg-[#FE6B3D] text-white p-4 rounded-2xl w-72 shadow relative flex flex-col justify-between"
            >
              <span class="text-xs bg-white/20 px-2 py-0.5 rounded mb-2 w-fit">
                Biology
              </span>
              <h4 class="text-sm font-semibold mb-1">
                Fun Biology Quiz for Young Explorers!
              </h4>
              <p class="text-xs mb-3">
                Learn cool facts about plants, animals, the human body, and more
                in this fun and easy quiz! 🌿🧠
              </p>
              <div class="flex items-center justify-between text-xs">
                <span
                  ><i class="fas fa-question-circle mr-1"></i>20 questions</span
                >
                <span><i class="fas fa-clock mr-1"></i>10 minutes</span>
              </div>
              <button
                class="mt-4 bg-white text-[#FE6B3D] text-xs px-4 py-1 rounded-full font-semibold self-start"
              >
                Start Now
              </button>
              <i class="fas fa-bookmark absolute top-4 right-4"></i>
            </div>
          </div>
        </div>
        <!-- Carousel indicators -->
        <div class="flex justify-center mt-2 space-x-2">
          <span class="w-2 h-2 rounded-full bg-[#2563EB]"></span>
          <span class="w-2 h-2 rounded-full bg-gray-300"></span>
          <span class="w-2 h-2 rounded-full bg-gray-300"></span>
        </div>
      </section>
    </div>

    <!-- Bottom Navigation -->
    <BottomBarNavigation />
  </div>
</template>

<script setup>
import BottomBarNavigation from "@/components/base/BottomBarNavigation.vue";

const recentQuizzes = [
  {
    name: "Mathematic",
    category: "Tech",
    totalQuestions: 20,
    score: 12,
    icon: require("@/assets/math-icon.png"),
  },
  {
    name: "Science",
    category: "Biology",
    totalQuestions: 20,
    score: 34,
    icon: require("@/assets/math-icon.png"),
  },
  {
    name: "History",
    category: "World",
    totalQuestions: 20,
    score: 90,
    icon: require("@/assets/math-icon.png"),
  },
];
</script>
