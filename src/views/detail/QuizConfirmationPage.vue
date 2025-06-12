<template>
  <div class="min-h-screen bg-white flex flex-col justify-between">
    <!-- Top Back Link -->
    <div class="px-8 pt-6">
      <button class="text-sm text-gray-600 hover:underline" @click="goBack">
        ← Back to detail
      </button>
    </div>

    <!-- Middle Illustration + Text -->
    <div class="flex flex-col items-center justify-center text-center px-4">
      <img
        src="@/assets/Ilustration.png"
        alt="Quiz Illustration"
        class="w-[300px] md:w-[360px] my-2"
      />
      <h2 class="text-lg md:text-xl font-semibold text-gray-900">
        Let's start the quiz
      </h2>
    </div>

    <!-- Bottom Buttons -->
    <div
      class="border-t border-gray-200 mt-10 px-4 py-6 flex justify-center gap-4"
    >
      <button
        class="px-6 py-2 rounded-lg text-sm font-medium md:w-80 text-blue-600 border border-blue-600 bg-white hover:bg-blue-50 transition"
        @click="changeMind"
      >
        <router-link to="/quiz/1"> Change my mind </router-link>
      </button>
      <button
        class="px-6 py-2 rounded-lg text-sm font-medium md:w-80 text-white bg-blue-600 hover:bg-blue-700 transition"
        @click="startQuiz"
      >
        <router-link to="/quiz-session"> Let's Go </router-link>
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

function changeMind() {
  alert("Okay, you changed your mind 😅");
}

function startQuiz() {
  router.push("/quiz");
}
</script>
