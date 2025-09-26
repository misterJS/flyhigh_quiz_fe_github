<template>
  <!-- Quiz Intro Screen (menggunakan desain dari SubscribeMobile) -->
  <div class="min-h-screen bg-[#007CEF] relative flex flex-col items-center px-4">
    <!-- Decorative Circle -->
    <div class="absolute top-24 w-80 h-80 bg-blue-300/30 rounded-full"></div>

    <!-- Stacked Cards Container -->
    <div class="relative z-10 mt-32 mb-8 flex justify-center">
      <!-- Third Card (back) - largest, centered -->
      <div class="absolute top-16 w-48 h-24 bg-white rounded-2xl"></div>
      <!-- Second Card (middle) - medium, centered -->
      <div class="absolute w-56 h-32 bg-white rounded-2xl"></div>
      <!-- Main Card (front) - smallest, centered -->
      <div class="relative w-64 h-24 bg-white rounded-2xl p-4">
        <!-- Question Indicator -->
        <div class="text-red-500 text-xs font-medium mb-2 text-center">
          01/25
        </div>

        <!-- Question Text -->
        <div class="text-gray-800 text-center font-medium text-sm leading-relaxed">
          What is the total number of marbles Budi has now?
        </div>
      </div>

      <!-- Category Badge - positioned to overlay the cards -->
      <div class="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-900 rounded-2xl w-3/5 h-2/3 px-2 flex items-center gap-2 z-30">
        <div class="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center flex-shrink-0">
          <img src="@/assets/book.png" alt="Book" class="w-[22px] h-[22px]" />
        </div>
        <span class="text-white text-sm font-medium">10+<br />Quiz category</span>
      </div>
    </div>

    <!-- Bottom Section - Separated with more spacing -->
    <div class="text-center mb-8 mt-16">
      <h1 class="text-white text-2xl font-bold mb-2">Let's start the quiz</h1>
      <p class="text-white/90 text-sm">
        Answer all the questions to the best of your ability
      </p>
    </div>

    <!-- Buttons positioned at bottom -->
    <div class="w-full max-w-sm space-y-4 mt-auto mb-8">
      <!-- Premium Button -->
      <button
        @click="goToPremium"
        class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 mx-auto"
      >
        <i class="fas fa-crown text-sm"></i>
        <span class="text-sm font-medium">Premium</span>
      </button>

      <!-- Let's Go Button -->
      <button
        @click="startQuiz"
        class="w-full bg-white hover:bg-gray-50 text-[#007CEF] py-3 rounded-full text-base font-semibold"
      >
        Let's Go
      </button>

      <!-- Change My Mind Button -->
      <button
        @click="changeMind"
        class="w-full border-2 border-white text-white hover:bg-white/10 py-3 rounded-full text-base font-semibold"
      >
        Change My Mind
      </button>
    </div>
  </div>

  <!-- Upgrade Modal (menggunakan desain dari SubscribeMobile) -->
  <Transition name="modal">
    <div
      v-if="showUpgrade"
      class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
    >
      <div class="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 relative">
        <!-- Modal Header -->
        <div class="flex justify-end items-center mb-2">
          <button
            @click="showUpgrade = false"
            class="p-2 hover:bg-gray-100 rounded-full"
          >
            <i class="fas fa-times text-gray-500"></i>
          </button>
        </div>

        <!-- Modal Content it's time for upgrade-->
        <div class="text-center mb-4">
          <img
            src="@/assets/crown-uprage-pro.png"
            alt="crown"
            class="w-32 h-32 flex items-center justify-center mx-auto"
          />
          <h4 class="text-lg font-semibold text-gray-900 mb-1">
            It's time for Upgrade!
          </h4>
          <p class="text-gray-600 text-sm">
            Upgrade to remove ads, unlimited play and access all game only
            with $2/month
          </p>
        </div>

        <!-- Modal Actions -->
        <div>
          <button
            @click="goUpgrade"
            class="w-full bg-blue-600 text-white py-3 rounded-full text-base font-semibold hover:bg-blue-700"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  </Transition>
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

function goToPremium(){
  router.push('/subscribe?showUpgradePremiumScreen=true');
}
</script>

<style scoped>
/* Modal animation */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .w-full.max-w-sm,
.modal-leave-to .w-full.max-w-sm {
  transform: scale(0.9) translateY(20px);
}
</style>


