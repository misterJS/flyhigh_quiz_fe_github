<template>
  <div class="flex flex-col lg:flex-row min-h-screen bg-[#f9fafb]">
    <!-- Sidebar desktop -->
    <SidebarComponent class="hidden lg:block" />

    <div class="flex-1 flex flex-col">
      <!-- Header desktop -->
      <HeaderComponent class="hidden lg:block" />

      <main class="flex-1 p-4 sm:p-6 lg:p-8 pb-32 lg:pb-8">
        <div class="flex flex-col lg:flex-row gap-8 mx-auto max-w-6xl">
          <!-- Kiri -->
          <div class="flex-1">
            <!-- Back Button -->
            <router-link
              to="/quiz"
              class="text-sm text-[#2563EB] flex items-center gap-1 mb-4"
            >
              <i class="fas fa-arrow-left"></i> Back
            </router-link>

            <!-- Gambar -->
            <div class="rounded-xl overflow-hidden mb-6">
              <img
                :src="quiz?.imagePath || require('@/assets/quiz.png')"
                alt="Quiz Image"
                class="w-full h-auto object-cover"
              />
            </div>

            <!-- Judul & Deskripsi -->
            <h1 class="text-xl sm:text-2xl font-semibold text-[#111827] mb-3">
              {{ quiz?.title }}
            </h1>
            <p class="text-sm text-gray-600 mb-6 leading-relaxed">
              {{ quiz?.details }}
            </p>

            <!-- Outcome -->
            <h2 class="text-sm font-semibold text-[#111827] mb-3">Outcome</h2>
            <div
              class="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-[#6B7280] mb-8"
            >
              <div class="flex items-center gap-2">
                <i class="far fa-star"></i>
                Skill level:
                <span class="text-[#2563EB] font-medium">{{ quiz?.level }}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="fas fa-file-alt"></i>
                Quizzes:
                <span class="text-[#111827] font-medium">{{ quiz?.questionCount }}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="fas fa-language"></i>
                Language: {{ quiz?.language }}
              </div>
              <div class="flex items-center gap-2">
                <i class="fas fa-video"></i>
                Video Quiz: <span class="font-medium">{{ quiz?.video }}</span>
              </div>
            </div>

            <!-- Requirements -->
            <h2 class="text-sm font-semibold text-[#111827] mb-3">Requirements</h2>
            <ul class="list-disc ml-6 text-sm text-gray-600 space-y-2 leading-relaxed">
              <li>
                You don't need a background in user experience, design or coding
                to take this course.
              </li>
              <li>
                This is an in-depth course. If you allocate 60–90 mins a day,
                and do all of the activities, it will take 2–3 weeks to complete.
              </li>
            </ul>

            <!-- Tombol Quiz desktop -->
            <div class="hidden lg:flex gap-4 mt-8">
              <router-link
                :to="{
                  path: `/quiz-confirmation/${quizId}`,
                  query: {
                    id: quiz?.id,
                    img: quiz?.imagePath
                  }
                }"
                class="bg-[#2563EB] hover:bg-[#1E40AF] w-full text-white text-sm px-6 py-2.5 rounded-lg font-semibold text-center"
              >
                Start Solo Quiz
              </router-link>
              <button
                class="text-[#2563EB] text-sm px-6 py-2.5 w-full rounded-lg border border-[#D1D5DB] bg-white font-semibold"
              >
                Start Team Quiz
              </button>
            </div>
          </div>

          <!-- Kanan -->
          <div class="w-full lg:w-[500px] space-y-6">
            <!-- Reward -->
            <div class="bg-white rounded-xl p-5 shadow-sm relative overflow-hidden">
              <p class="text-sm font-semibold text-[#111827] mb-1">80% Quiz Clear 🍀</p>
              <p class="text-sm text-gray-600 mb-4">
                Let's complete a little more to claim the prize
              </p>
              <button
                class="px-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-2 rounded-lg text-sm font-medium"
              >
                Claim Reward
              </button>
              <img
                src="@/assets/quiz-reward.png"
                class="absolute right-4 bottom-2 w-24 opacity-90"
              />
            </div>

            <!-- Leaderboard -->
            <div class="bg-white rounded-xl p-5 shadow-sm">
              <div class="flex justify-between items-center mb-4">
                <p class="text-sm font-semibold text-[#111827]">Leader Board</p>
                <button class="text-xs text-[#2563EB] font-medium">See all</button>
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
                      <p class="text-sm text-gray-900 font-medium">{{ user.name }}</p>
                      <p class="text-xs text-gray-500">{{ user.quizzes }} Quizzes Completed</p>
                    </div>
                  </div>
                  <p class="text-sm font-semibold">{{ user.xp }}</p>
                </li>
              </ul>
            </div>

            <!-- Achievement -->
            <div class="bg-white rounded-xl p-5 shadow-sm mb-32 lg:mb-0">
              <p class="text-sm font-semibold text-[#111827] mb-4">Achievement</p>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div
                  v-for="badge in badges"
                  :key="badge.label"
                  class="flex flex-col items-start gap-1 bg-[#f9fafb] p-4 rounded-xl"
                >
                  <img :src="badge.img" class="w-9 mb-2" />
                  {{ badge.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Tombol Quiz mobile -->
      <div class="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t p-4 z-50">
        <router-link
          :to="{
            path: `/quiz-confirmation/${quizId}`,
            query: {
              id: quiz?.id,
              img: quiz?.imagePath
            }
          }"
          class="w-full block text-center bg-[#2563EB] hover:bg-[#1E40AF] text-white py-3 rounded-full text-sm font-semibold"
        >
          Start Quiz Now
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import HeaderComponent from "@/components/base/HeaderComponent.vue";
import { onMounted, ref } from "vue";
import { QuizPreview } from "@/api/quizApi";

const quiz = ref(null);
const route = useRoute();
const quizId = route.params.id;

onMounted(async () => {
  try {
    const response = await QuizPreview(quizId);
    quiz.value = response;
  } catch (err) {
    console.error("Gagal ambil quiz:", err.message);
  }
});

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

const badges = [
  {
    label: "Math Champion",
    img: require("@/assets/Badge1.png"),
  },
  {
    label: "Science Star",
    img: require("@/assets/Badge2.png"),
  },
];
</script>

<style scoped></style>
