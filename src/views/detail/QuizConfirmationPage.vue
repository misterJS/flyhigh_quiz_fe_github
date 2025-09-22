<template>
  <div class="min-h-screen bg-[#0B6CF0] text-white relative flex flex-col">
    <!-- Lingkaran besar background -->
    <div class="absolute inset-0 flex top-[15%] justify-center pointer-events-none">
      <div class="w-[300px] h-[300px] md:w-[640px] md:h-[640px] rounded-full bg-white/10" />
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
          <div class="text-[#FF7A7A] text-xs font-semibold text-center mb-3 tracking-wider">
            01/25
          </div>
          <p class="text-[18px] font-semibold leading-6 text-center">
            What is the total number of
            <br class="hidden sm:block">
            marbles Budi has now?
          </p>
        </div>

        <!-- Badge kategori -->
        <div
          class="absolute left-1/2 -translate-x-1/2 -bottom-20 bg-[#0B2E63] text-white
                 rounded-2xl px-5 py-3 w-[240px] flex items-center gap-3 shadow-md"
        >
          <div class="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
            <i class="fas fa-book-open text-white" />
          </div>
          <div class="leading-5">
            <div class="text-[15px] font-semibold">
              10+
            </div>
            <div class="text-[12px] opacity-80 -mt-0.5">
              Quiz category
            </div>
          </div>
        </div>
      </div>

      <!-- Headline & sub -->
      <div class="mt-48 text-center">
        <h2 class="text-[24px] font-normal mb-2">
          Let's start the quizz
        </h2>
        <p class="text-white/90 text-[15px] max-w-sm">
          Answer all the questions to the best of your ability.
        </p>
      </div>
    </div>

    <!-- Tombol bawah -->
    <div class="px-6 pb-10">
      <div class="max-w-md mx-auto flex flex-col gap-4">
        <button
          class="w-full h-14 rounded-[22px] bg-white text-[#0B6CF0] text-[16px] font-semibold shadow
                 hover:bg-white/95 transition"
          @click="startQuiz"
        >
          Let's Go
        </button>
        <button
          class="w-full h-14 rounded-[22px] border border-white text-white text-[16px] font-semibold
                 hover:bg-white/10 transition"
          @click="changeMind"
        >
          Change My Mind
        </button>
      </div>
    </div>
  </div>

  <!-- Upgrade Modal (match logout modal position & style) -->
  <div
    v-if="showUpgrade"
    class="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4"
  >
    <div class="w-full max-w-sm bg-white rounded-[20px] shadow-lg p-6 relative text-center">
      <!-- Crown icon with confetti -->
      <div class="relative mx-auto mb-3 w-20 h-20 grid place-items-center">
        <div class="w-16 h-16 rounded-full bg-[#0B6CF0]/10 text-[#0B6CF0] grid place-items-center">
          <i class="fas fa-crown text-xl"></i>
        </div>
        <span class="absolute -top-1 left-2 w-2 h-2 bg-[#F59E0B] rounded-full"></span>
        <span class="absolute -top-2 right-4 w-2 h-2 bg-[#8B5CF6] rounded-full"></span>
        <span class="absolute bottom-0 left-1 w-2 h-2 bg-[#EF4444] rounded-full"></span>
        <span class="absolute -right-1 bottom-2 w-2 h-2 bg-[#22C55E] rounded-full"></span>
      </div>

      <h3 class="text-[17px] font-semibold text-[#111827]">It's time for Upgrade!</h3>
      <p class="text-sm text-gray-600 mt-1">
        Upgrade to remove ads, unlimited play and access all game only with $2/month
      </p>

      <div class="mt-5">
        <button
          class="w-full h-11 rounded-[14px] bg-[#0B6CF0] text-white font-semibold"
          @click="goUpgrade"
        >
          Upgrade pro first
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { CheckDailyLimitByStudent } from "@/api/quizApi";

const router = useRouter();
const route = useRoute();
const quizId = route.params.id;
const auth = useAuthStore();

const showUpgrade = ref(false);
const savedAuthUser = (() => {
  try { return JSON.parse(localStorage.getItem('auth_user') || 'null'); } catch { return null; }
})();
const studentId = computed(() =>
  auth?.userId || auth?.user?.userId || auth?.user?.data?.userId ||
  savedAuthUser?.data?.userId || savedAuthUser?.userId || null
);

function changeMind() {
  router.push("/quiz");
}
async function startQuiz() {
  try {
    if (!studentId.value) {
      router.push(`/quiz-session/${quizId}`);
      return;
    }
    const data = await CheckDailyLimitByStudent(studentId.value);
    if (data?.limitReached) {
      showUpgrade.value = true;
    } else {
      router.push(`/quiz-session/${quizId}`);
    }
  } catch (e) {
    console.warn("checkDailyLimit failed:", e?.message || e);
    router.push(`/quiz-session/${quizId}`);
  }
}

function goUpgrade(){
  router.push('/subscribe');
}
</script>


