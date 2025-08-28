<template>
  <div class="min-h-screen bg-[#0B6CF0] text-white relative flex flex-col">
    <!-- Lingkaran besar background -->
    <div class="absolute inset-0 flex top-[15%] justify-center pointer-events-none">
      <div class="w-[300px] h-[300px] md:w-[640px] md:h-[640px] rounded-full bg-white/10"></div>
    </div>

    <!-- Konten tengah -->
    <div class="flex-1 flex flex-col items-center justify-center px-6 pt-10">
      <!-- Stack Card -->
      <div class="relative w-[320px] sm:w-[360px]">
        <!-- shadow layers -->
        <div class="absolute inset-x-6 bottom-[-28px] h-8 bg-white/70 rounded-2xl blur-[2px]"></div>
        <div class="absolute inset-x-5 bottom-[-18px] h-8 bg-white/80 rounded-2xl"></div>
        <div class="absolute inset-x-4 bottom-[-8px] h-8 bg-white rounded-2xl"></div>

        <!-- Card utama -->
        <div class="relative bg-white text-[#0F1020] rounded-2xl px-6 py-7 shadow-xl">
          <div class="text-[#FF7A7A] text-xs font-semibold text-center mb-3 tracking-wider">01/25</div>
          <p class="text-[18px] font-semibold leading-6 text-center">
            What is the total number of
            <br class="hidden sm:block" />
            marbles Budi has now?
          </p>
        </div>

        <!-- Badge kategori -->
        <div
          class="absolute left-1/2 -translate-x-1/2 -bottom-20 bg-[#0B2E63] text-white
                 rounded-2xl px-5 py-3 w-[240px] flex items-center gap-3 shadow-md"
        >
          <div class="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
            <i class="fas fa-book-open text-white"></i>
          </div>
          <div class="leading-5">
            <div class="text-[15px] font-semibold">10+</div>
            <div class="text-[12px] opacity-80 -mt-0.5">Quiz category</div>
          </div>
        </div>
      </div>

      <!-- Headline & sub -->
      <div class="mt-48 text-center">
        <h2 class="text-[24px] font-normal mb-2">Let's start the quizz</h2>
        <p class="text-white/90 text-[15px] max-w-sm">
          Answer all the questions to the best of your ability.
        </p>
      </div>
    </div>

    <!-- Tombol bawah -->
    <div class="px-6 pb-10">
      <div class="max-w-md mx-auto flex flex-col gap-4">
        <button
          @click="startQuiz"
          class="w-full h-14 rounded-[22px] bg-white text-[#0B6CF0] text-[16px] font-semibold shadow
                 hover:bg-white/95 transition"
        >
          Let’s Go
        </button>
        <button
          @click="changeMind"
          class="w-full h-14 rounded-[22px] border border-white text-white text-[16px] font-semibold
                 hover:bg-white/10 transition"
        >
          Change My Mind
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const quizId = route.params.id;

function changeMind() {
  // sesuaikan behaviour-mu
  router.push("/quiz");
}
function startQuiz() {
  router.push(`/quiz-session/${quizId}`);
}
</script>
