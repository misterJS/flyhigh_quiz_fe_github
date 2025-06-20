<template>
  <div class="min-h-screen bg-[#007bff] md:bg-white flex flex-col justify-between">
    <!-- Back -->
    <div class="p-4 md:px-10 md:pt-8 text-white md:text-black">
      <button @click="goBack" class="text-sm">← Back to detail</button>
    </div>

    <!-- Content -->
    <div
      class="flex-1 flex flex-col justify-center items-center text-center px-6 md:px-0"
    >
      <!-- Illustration (mobile & desktop) -->
      <div class="relative">
        <div class="hidden md:block">
          <img
            src="@/assets/Ilustration.png"
            alt="Quiz Illustration"
            class="w-80 md:w-96 mb-8"
          />
        </div>

        <div class="md:hidden relative">
          <div
            class="absolute top-4 left-0 right-0 text-center text-xs text-[#FF8181] font-semibold"
          >
            01/25
          </div>
          <div class="bg-white rounded-xl shadow-lg py-8 px-6 w-[300px]">
            <p class="text-base font-semibold text-gray-900">
              What is the total number of marbles Budi has now?
            </p>
          </div>
          <div
            class="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#00285B] text-white px-4 py-2 rounded-xl text-xs font-medium"
          >
            📖 10+ Quiz category
          </div>
        </div>
      </div>

      <h2
        class="text-lg md:text-2xl font-semibold text-white md:text-black mb-2 mt-20 md:mt-8"
      >
        Let's start the quizz
      </h2>
      <p class="text-sm md:text-base text-white/80 md:text-black max-w-md">
        Answer all the questions to the best of your ability.
      </p>
    </div>

    <!-- Footer Buttons -->
    <div
      class="w-full border-t border-white/30 py-6 md:flex md:justify-center md:gap-6 md:px-8"
    >
      <div
        class="flex flex-col gap-4 md:flex-row-reverse w-full max-w-xl mx-auto px-4 md:px-0"
      >
        <button
          @click="startQuiz"
          class="w-full md:w-full px-6 py-3 bg-white text-[#007bff] md:bg-[#007bff] md:text-white rounded-full font-medium text-sm hover:bg-white/90 transition"
        >
          Let’s Go
        </button>
        <button
          @click="changeMind"
          class="w-full md:w-full px-6 py-3 text-white border border-white md:border-gray-400 md:text-[#007bff] rounded-full font-medium text-sm hover:bg-white/10 transition"
        >
          Change My Mind
        </button>
      </div>
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
  router.push("/quiz-session");
}
</script>
