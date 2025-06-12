<template>
  <div class="flex h-screen bg-[#f9fafb]">
    <SidebarComponent />
    <div class="flex-1 flex flex-col">
      <HeaderComponent />
      <main class="flex-1 p-8">
        <div class="flex flex-col lg:flex-row gap-8 mx-auto">
          <div class="flex-1">
            <router-link
              to="/quiz"
              class="text-sm text-[#2563EB] flex items-center gap-1 mb-4"
            >
              <i class="fas fa-arrow-left"></i> Back
            </router-link>

            <div class="rounded-xl overflow-hidden mb-6">
              <img
                :src="quiz.image"
                alt="Quiz Image"
                class="w-full h-auto object-cover"
              />
            </div>

            <h1 class="text-2xl font-semibold text-[#111827] mb-3">
              {{ quiz.title }}
            </h1>
            <p class="text-sm text-gray-600 mb-6 leading-relaxed">
              {{ quiz.description }}
            </p>

            <h2 class="text-sm font-semibold text-[#111827] mb-3">Outcome</h2>
            <div
              class="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#6B7280] mb-8"
            >
              <div class="flex items-center gap-1">
                <i class="far fa-star"></i>
                Skill level:
                <span class="text-[#2563EB] font-medium">{{ quiz.level }}</span>
              </div>
              <div class="flex items-center gap-1">
                <i class="fas fa-file-alt"></i>
                Quizzes:
                <span class="text-[#111827] font-medium"
                  >{{ quiz.soal }} Soalan</span
                >
              </div>
              <div class="flex items-center gap-1">
                <i class="fas fa-language"></i>
                Language : {{ quiz.language }}
              </div>
              <div class="flex items-center gap-1">
                <i class="fas fa-video"></i>
                Video Quiz : <span class="font-medium">{{ quiz.video }}</span>
              </div>
            </div>

            <h2 class="text-sm font-semibold text-[#111827] mb-3">
              Requirements
            </h2>
            <ul
              class="list-disc ml-6 text-sm text-gray-600 space-y-2 leading-relaxed"
            >
              <li>
                You don't need a background in user experience, design or coding
                to take this course.
              </li>
              <li>
                This is an in-depth course. If you allocate 60–90 mins a day,
                and do all of the activities, it will take 2–3 weeks to complete
              </li>
            </ul>

            <div class="flex gap-4 mt-8">
              <button
                class="bg-[#2563EB] hover:bg-[#1E40AF] w-full text-white text-sm px-6 py-2.5 rounded-lg font-semibold"
              >
                <router-link to="/quiz-confirmation">
                  Start Solo Quiz
                </router-link>
              </button>
              <button
                class="text-[#2563EB] text-sm px-6 py-2.5 w-full rounded-lg border border-[#D1D5DB] bg-white font-semibold"
              >
                Start Team Quiz
              </button>
            </div>
          </div>

          <!-- Right Sidebar -->
          <div class="w-full lg:w-[500px] space-y-6">
            <div
              class="bg-white rounded-xl p-5 shadow-sm relative overflow-hidden"
            >
              <p class="text-sm font-semibold text-[#111827] mb-1">
                80% Quiz Clear 🍀
              </p>
              <p class="text-sm text-gray-600 mb-4">
                Let's complete a little more to claim the prize
              </p>
              <button
                class="px-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-2 rounded-lg text-sm font-medium"
              >
                Claim Reward
              </button>
              <img
                src="@/assets/quiz-reward.png"
                class="absolute w-56 right-0 bottom-0 w-24 opacity-90"
              />
            </div>

            <div class="bg-white rounded-xl p-5 shadow-sm">
              <div class="flex justify-between items-center mb-4">
                <p class="text-sm font-semibold text-[#111827]">Leader Board</p>
                <button class="text-xs text-[#2563EB] font-medium">
                  See all
                </button>
              </div>
              <ul class="space-y-4">
                <li
                  v-for="(user, index) in leaderboard"
                  :key="index"
                  class="flex justify-between items-center"
                >
                  <div class="flex items-center gap-3">
                    <img
                      :src="user.avatar"
                      class="w-8 h-8 rounded-full object-cover"
                      alt="avatar"
                    />
                    <div>
                      <p class="text-sm text-gray-900 font-medium">
                        {{ user.name }}
                      </p>
                      <p class="text-xs text-gray-500">
                        {{ user.quizzes }} Quizzes Completed
                      </p>
                    </div>
                  </div>
                  <p class="text-sm font-semibold">{{ user.xp }} XP</p>
                </li>
              </ul>
            </div>

            <div class="bg-white rounded-xl p-5 shadow-sm">
              <p class="text-md font-semibold text-[#111827] mb-4">
                Achievement
              </p>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div
                  class="flex flex-col items-start justify-left gap-1 bg-[#f9fafb] p-4 rounded-xl"
                >
                  <img src="@/assets/rookie.png" class="w-9 mb-4" />
                  Rookie
                </div>
                <div
                  class="flex flex-col items-start justify-left gap-1 bg-[#f9fafb] p-4 rounded-xl"
                >
                  <img src="@/assets/intermediate.png" class="w-9 mb-4" />
                  Intermediate
                </div>
                <div
                  class="flex flex-col items-start justify-left gap-1 bg-[#f9fafb] p-4 rounded-xl"
                >
                  <img src="@/assets/advanced.png" class="w-9 mb-4" />
                  Advanced
                </div>
                <div
                  class="flex flex-col items-start justify-left gap-1 bg-[#f9fafb] p-4 rounded-xl"
                >
                  <img src="@/assets/expert.png" class="w-9 mb-4" />
                  Expert
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
import { useRoute } from "vue-router";
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import HeaderComponent from "@/components/base/HeaderComponent.vue";

const route = useRoute();
const quizId = route.params.id;

const quiz = {
  id: quizId,
  title: "Additional Mathematics",
  image: require("@/assets/quiz.png"),
  description: `This module on Additional Mathematics is designed to deepen students' understanding of advanced mathematical concepts. It covers topics such as algebra, calculus, and geometry.`,
  level: "All levels",
  soal: 15,
  language: "English",
  video: "10 Minute",
};

const leaderboard = [
  {
    name: "Puan Hariana",
    quizzes: 219,
    xp: "2189 XP",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Andini Herima",
    quizzes: 219,
    xp: "2189 XP",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Lukman Harto",
    quizzes: 219,
    xp: "2189 XP",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];
</script>

<style scoped></style>
