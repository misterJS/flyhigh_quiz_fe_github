<template>
  <div class="min-h-screen bg-[#f9fafb] pb-20">
    <!-- Mobile Header - Sticky -->
    <div class="sticky top-0 z-50 flex items-center justify-between p-4 shadow-sm backdrop-blur-md">
      <div class="flex items-center gap-3">
        <router-link to="/quiz" class="text-gray-800">
          <i class="fas fa-arrow-left text-lg"></i>
        </router-link>
        <span class="text-lg font-semibold text-gray-900">{{
          quiz?.subjectName || "Biology"
        }}</span>
      </div>
      <div class="flex items-center gap-3">
        <button class="text-gray-800">
          <i class="fas fa-share-square text-lg"></i>
        </button>
        <button class="text-gray-800">
          <i class="far fa-bookmark text-lg"></i>
        </button>
      </div>
    </div>

    <!-- Cover Image -->
    <div class="px-4 mb-6">
      <div class="rounded-2xl overflow-hidden">
        <img
          :src="quiz?.image || require('@/assets/quiz.png')"
          alt="Quiz Image"
          loading="lazy"
          class="w-full h-[250px] object-cover"
        />
      </div>
    </div>

    <!-- Quiz Info Card -->
    <div class="mx-4 mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-3">
        {{ quiz?.title || "Additional Mathematics" }}
      </h1>
      <p class="text-base text-gray-600 mb-4 leading-relaxed">
        {{
          quiz?.description ||
          "This module on Additional Mathematics is designed to deepen students understanding of advanced mathematical concepts. It covers topics such as algebra, calculus, and geometry."
        }}
      </p>
    </div>

    <!-- UPGRADE PRO BANNER (conditional dari backend) -->
    <div
      v-if="showUpgradeBanner"
      class="mx-4 mb-6 rounded-2xl bg-gradient-to-r from-[#0B63F6] to-[#1E40AF] px-5 py-5 text-white flex items-center justify-between gap-4 shadow-lg"
    >
      <div class="flex items-center gap-4">
        <div
          class="w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
        >
          <img src="@/assets/crown.png" class="w-12 h-12" alt="crown" />
        </div>
        <div>
          <p class="text-lg font-bold leading-6">Upgrade pro</p>
          <p class="text-sm opacity-90 mt-1 leading-5">
            Upgrade to remove ads, unlimited play and access all game
          </p>
        </div>
      </div>

      <button
        @click="goSubscribe"
        class="shrink-0 bg-[#F59E0B] hover:bg-[#EA8A00] text-white px-4 py-3 rounded-full font-bold text-sm shadow-md"
      >
        Upgrade
      </button>
    </div>

    <!-- Tab Switcher -->
    <div class="mx-4 mb-6">
      <SwitchButtonGroup
        v-model="selectedMenu"
        :options="['Detail', 'Quiz']"
        size="md"
        variant="pill"
      />
    </div>

    <!-- TAB: DETAIL -->
    <div v-if="selectedMenu === 'Detail'">
      <!-- Outcome Section -->
      <div class="mx-4 mb-6 bg-white rounded-2xl p-5 shadow-sm">
        <h2 class="text-xl font-bold text-gray-900 mb-5">Outcome</h2>

        <div class="grid grid-cols-2 gap-4">
          <div
            class="flex items-center justify-between p-4 rounded-xl"
            style="background-color: #f8fafc"
          >
            <div>
              <div class="text-sm text-gray-500">Skill level:</div>
              <div class="font-bold text-gray-900">All levels</div>
            </div>
            <div class="w-10 h-10 flex items-center justify-center">
              <img src="@/assets/star.png" alt="Star" class="w-7 h-7" />
            </div>
          </div>

          <div
            class="flex items-center justify-between p-4 rounded-xl"
            style="background-color: #f8fafc"
          >
            <div>
              <div class="text-sm text-gray-500">Quizzes</div>
              <div class="font-bold text-gray-900">15</div>
            </div>
            <div class="w-10 h-10 flex items-center justify-center">
              <img src="@/assets/note.png" alt="Note" class="w-7 h-7" />
            </div>
          </div>

          <div
            class="flex items-center justify-between p-4 rounded-xl"
            style="background-color: #f8fafc"
          >
            <div>
              <div class="text-sm text-gray-500">Language:</div>
              <div class="font-bold text-gray-900">English</div>
            </div>
            <div class="w-10 h-10 flex items-center justify-center">
              <img
                src="@/assets/language-circle.png"
                alt="Language"
                class="w-7 h-7"
              />
            </div>
          </div>

          <div
            class="flex items-center justify-between p-4 rounded-xl"
            style="background-color: #f8fafc"
          >
            <div>
              <div class="text-sm text-gray-500">Video Quiz:</div>
              <div class="font-bold text-gray-900">30 Mins</div>
            </div>
            <div class="w-10 h-10 flex items-center justify-center">
              <img src="@/assets/timer-start.png" alt="Timer" class="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>

      <!-- Leaderboard Section -->
      <div class="mx-4 mb-6 bg-white rounded-2xl p-5 shadow-sm">
        <div class="flex justify-between items-center mb-5">
          <h3 class="text-xl font-bold text-gray-900">Leaderboard</h3>
          <button class="text-base text-blue-600 font-semibold hover:text-blue-700">
            View All
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="(user, index) in leaderboard.slice(0, 3)"
            :key="index"
            class="flex items-center gap-4"
          >
            <div class="w-7 h-7 flex items-center justify-center">
              <img
                :src="user.badge"
                :alt="`Rank ${index + 1}`"
                class="w-7 h-7"
              />
            </div>
            <img
              :src="user.avatar"
              :alt="user.name"
              class="w-10 h-10 rounded-full object-cover"
            />
            <div class="flex-1">
              <p class="font-semibold text-gray-900 text-base">{{ user.name }}</p>
              <p class="text-sm text-gray-500">{{ user.xp }} XP</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB: QUIZ -->
    <div v-else>
      <!-- Quizzes Section -->
      <div class="mx-4 mb-6 bg-white rounded-2xl p-5 shadow-sm">
        <h2 class="text-xl font-bold text-gray-900 mb-5">Quizzes</h2>
        <div
          v-for="(item, index) in quizList.slice(0, 3)"
          :key="index"
          class="flex items-start gap-3 p-3 bg-gray-50 rounded-xl mb-3 last:mb-0"
        >
          <img
            :src="item.image || require('@/assets/quiz.png')"
            alt="Quiz"
            class="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          />
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 text-sm leading-tight">
              {{ item.title || "Additional Mathematics" }}
            </h3>
            <p class="text-xs text-gray-500 mt-1 leading-tight">
              {{ item.description || "Suitable for small homes with minimal electricity usage" }}
            </p>
            <div class="flex justify-between items-start mt-2">
              <div class="flex flex-col gap-1">
                <div class="flex items-center gap-1">
                  <img src="@/assets/document.png" alt="Document" class="w-3 h-3" />
                  <span class="text-xs text-gray-500">{{ item.totalQuiz || 5 }} Modul</span>
                </div>
                <div class="flex items-center gap-1">
                  <img src="@/assets/user.png" alt="User" class="w-3 h-3" />
                  <span class="text-xs text-gray-500">{{ item.submittedCount || 500 }} Student</span>
                </div>
              </div>
              <div class="flex flex-col items-end gap-1">
                <div class="flex items-center gap-1">
                  <img src="@/assets/clock.png" alt="Clock" class="w-3 h-3" />
                  <span class="text-xs text-gray-500">1h 30m</span>
                </div>
                <div class="flex items-center gap-1 bg-[#2563EB] text-white px-2 py-1 rounded-md">
                  <img src="@/assets/coin.png" alt="Coin" class="w-3 h-3" />
                  <span class="text-xs font-semibold">120</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile CTA -->
    <div class="fixed bottom-0 left-0 right-0 p-5 bg-white shadow-lg">
      <router-link
        :to="{
          path: `/quiz-confirmation/${quizId}`,
          query: { id: quiz?.id, img: quiz?.imagePath },
        }"
        class="w-full block text-center bg-[#2563EB] hover:bg-[#1E40AF] text-white py-4 rounded-xl text-lg font-bold shadow-md"
      >
        Start Quiz Now
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SwitchButtonGroup from "@/components/base/SwitchButton.vue";

defineProps({
  quiz: Object,
  quizId: [String, Number],
  quizList: Array,
  leaderboard: Array,
  showUpgradeBanner: Boolean,
  goSubscribe: Function,
});

const selectedMenu = ref("Detail");
</script>
