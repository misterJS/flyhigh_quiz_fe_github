<template>
  <div class="flex flex-col lg:flex-row min-h-screen bg-[#f9fafb]">
    <SidebarComponent class="hidden lg:block" />

    <div class="flex-1 flex flex-col w-full">
      <HeaderComponent class="hidden lg:flex" />

      <main class="flex-1 p-4 sm:p-6 lg:p-8 pb-24 bg-gray-50 min-h-screen">
        <div class="flex flex-col lg:flex-row mx-auto max-w-7xl gap-8">
          <!-- KIRI -->
          <div class="flex-1 max-w-4xl">
            <!-- Custom Header -->
            <div class="flex items-center mb-5">
              <router-link
                to="/quiz"
                class="flex items-center gap-3 hover:text-blue-600 transition-colors"
                aria-label="Back"
              >
                <i class="fas fa-arrow-left text-lg text-gray-800"></i>
                <span class="text-lg font-semibold text-gray-900">Back</span>
              </router-link>
            </div>

            <!-- Cover -->
            <div class="rounded-xl overflow-hidden mb-6">
              <img
                :src="quiz?.image || require('@/assets/quiz.png')"
                alt="Quiz Image"
                loading="lazy"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Title & Desc -->
            <div class="flex gap-1 items-center mt-2">
              <h2 class="text-lg font-semibold text-gray-900">
                {{ quiz?.subjectName || "Biology" }}
              </h2>
            </div>
            <p class="text-sm text-gray-600 mb-8 leading-relaxed mt-2">
              {{
                quiz?.description ??
                "This module on Additional Mathematics is designed to deepen students understanding of advanced mathematical concepts.It covers topics such as algebra, calculus, and geometry. Read More"
              }}
            </p>

            <!-- UPGRADE PRO BANNER (conditional dari backend) -->
            <!-- <div
              v-if="showUpgradeBanner"
              class="rounded-2xl bg-[#0B63F6] px-5 py-5 mb-6 text-white flex items-center justify-between gap-4"
            >
              <div class="flex items-center gap-4">
                <img src="@/assets/crown.png" class="w-20 h-20" alt="crown" />
                <div>
                  <p class="text-lg font-semibold leading-5">Upgrade pro</p>
                  <p class="text-sm opacity-90 mt-1">
                    Upgrade to remove ads, unlimited play and access all game
                  </p>
                </div>
              </div>

              <button
                @click="goSubscribe"
                class="shrink-0 bg-[#F59E0B] hover:bg-[#EA8A00] text-white px-5 py-2 rounded-full font-semibold text-sm"
              >
                Upgrade
              </button>
            </div> -->

            <!-- TAB: DETAIL -->
            <div v-if="selectedMenu === 'Detail'">
              <!-- Outcome Section -->
              <div class="mb-8">
                <h2 class="text-xl font-semibold text-gray-900 mb-6">
                  Outcome
                </h2>

                <div class="flex items-center justify-between pb-8">
                  <div class="flex items-center gap-6">
                    <div class="flex items-center gap-2">
                      <i class="fas fa-star text-gray-400 text-sm"></i>
                      <span class="text-gray-600 text-sm">Skill level:</span>
                      <span class="font-semibold text-gray-900"
                        >5 (Expert)</span
                      >
                    </div>

                    <div class="flex items-center gap-2">
                      <i class="fas fa-file-alt text-gray-400 text-sm" />
                      <span class="text-gray-600 text-sm">Quizzes:</span>
                      <span class="font-semibold text-gray-900">15 Soalan</span>
                    </div>

                    <div class="flex items-center gap-2">
                      <i class="fas fa-globe text-gray-400 text-sm"></i>
                      <span class="text-gray-600 text-sm">Language:</span>
                      <span class="font-semibold text-gray-900">English</span>
                    </div>

                    <div class="flex items-center gap-2">
                      <i class="fas fa-clock text-gray-400 text-sm"></i>
                      <span class="text-gray-600 text-sm">Video Quiz:</span>
                      <span class="font-semibold text-gray-900">10 Minute</span>
                    </div>
                  </div>
                </div>

                <!-- Requirements -->
                <div class="mb-8">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">
                    Requirements
                  </h3>
                  <ul class="space-y-2 text-gray-600">
                    <li class="flex items-start gap-2">
                      <span class="text-green-500 mt-1">•</span>
                      <span
                        >You don't need a background in user experience, design
                        or coding to take this class</span
                      >
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-green-500 mt-1">•</span>
                      <span
                        >This is an in-depth course. If you allocate 60-90 mins
                        a day, and do all of the activities, it will take 2-3
                        weeks to complete</span
                      >
                    </li>
                  </ul>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-4">
                  <button
                    class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
                  >
                    Start Solo Quiz
                  </button>
                  <button
                    class="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
                  >
                    Start Team Quiz
                  </button>
                </div>
              </div>
            </div>

            <!-- TAB: QUIZ -->
            <div v-else>
              <h2 class="text-sm font-semibold text-[#111827] mb-3">Quizzes</h2>

              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                <QuizCard
                  v-for="(item, index) in quizList"
                  :key="index"
                  :image="item.image"
                  :title="item.title"
                  :students="item.submittedCount"
                  :points="item.CreditAmount"
                  :modules="item.totalQuiz"
                  :duration="item.totalHour"
                  :id="item.id"
                />
              </div>

              <div v-if="quizLoading" class="text-center py-4 text-gray-600">
                Loading more quizzes...
              </div>
            </div>
          </div>

          <!-- KANAN - Sidebar -->
          <div
            v-if="selectedMenu === 'Detail'"
            class="w-full lg:w-[400px] space-y-6 lg:mt-12"
          >
            <!-- Upgrade Pro Banner -->
            <div
              v-if="showUpgradeBanner"
              class="bg-blue-500 rounded-2xl p-6 text-white"
            >
              <div class="flex items-start gap-4 mb-6">
                <div
                  class="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <img src="@/assets/crown.png" class="w-12 h-12" alt="crown" />
                </div>
                <div class="flex-1">
                  <h3 class="font-bold text-xl mb-2">Upgrade pro</h3>
                  <p class="text-sm text-blue-100 leading-relaxed">
                    Upgrade to remove ads, unlimited play and access all game
                  </p>
                </div>
              </div>
              <button
                @click="goSubscribe"
                class="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors w-full"
              >
                Upgrade
              </button>
            </div>

            <!-- Leaderboard -->
            <div class="bg-white rounded-2xl shadow-sm p-6">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-semibold text-gray-900">
                  Leader Board
                </h3>
                <button
                  class="text-sm text-blue-600 font-medium hover:text-blue-700"
                >
                  See all
                </button>
              </div>

              <div class="space-y-0">
                <div
                  v-for="(user, index) in leaderboard.slice(0, 3)"
                  :key="index"
                  class="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 flex items-center justify-center">
                      <img
                        :src="user.badge"
                        :alt="`Rank ${index + 1}`"
                        class="w-8 h-8"
                      />
                    </div>
                    <img
                      :src="user.avatar"
                      :alt="user.name"
                      class="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p class="font-medium text-gray-900">{{ user.name }}</p>
                      <p class="text-sm text-gray-500">219 Quizzes Completed</p>
                    </div>
                  </div>
                  <div class="ml-auto text-right">
                    <p class="font-bold text-gray-900">{{ user.xp }} XP</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Achievement -->
            <div class="bg-white rounded-2xl shadow-sm p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-6">
                Achievement
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <div
                  class="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div
                    class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3"
                  >
                    <i class="fas fa-trophy text-orange-500 text-lg"></i>
                  </div>
                  <p class="text-sm font-medium text-gray-700">Rookie</p>
                </div>

                <div
                  class="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div
                    class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3"
                  >
                    <i class="fas fa-star text-blue-500 text-lg"></i>
                  </div>
                  <p class="text-sm font-medium text-gray-700">Intermediate</p>
                </div>

                <div
                  class="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div
                    class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3"
                  >
                    <i class="fas fa-medal text-yellow-500 text-lg"></i>
                  </div>
                  <p class="text-sm font-medium text-gray-700">Advanced</p>
                </div>

                <div
                  class="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div
                    class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3"
                  >
                    <i class="fas fa-gem text-purple-500 text-lg"></i>
                  </div>
                  <p class="text-sm font-medium text-gray-700">Expert</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import HeaderComponent from "@/components/base/HeaderComponent.vue";
import QuizCard from "@/components/base/QuizCardComponent.vue";

defineProps({
  quiz: Object,
  quizId: [String, Number],
  quizList: Array,
  leaderboard: Array,
  selectedMenu: String,
  showUpgradeBanner: Boolean,
  quizLoading: Boolean,
  goSubscribe: Function,
});
</script>
