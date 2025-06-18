<template>
  <div class="flex flex-col lg:flex-row min-h-screen bg-[#f9fafb]">
    <!-- Sidebar (desktop only) -->
    <SidebarComponent class="hidden lg:block" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header (desktop only) -->
      <HeaderComponent class="hidden lg:block" />

      <main class="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
        <!-- Banner -->
        <div class="relative bg-white rounded-xl overflow-hidden">
          <img
            src="../assets/Avatar.png"
            alt="Banner"
            class="w-full h-40 sm:h-56 object-cover"
          />
          <button
            class="absolute top-4 right-4 bg-white text-sm p-2 rounded-full shadow"
            aria-label="Edit"
          >
            <i class="fas fa-pen text-gray-600"></i>
          </button>
        </div>

        <!-- Profile Info -->
        <div
          class="bg-white px-4 sm:px-6 pt-4 pb-6 shadow-sm rounded-xl space-y-1"
        >
          <h2 class="text-lg sm:text-xl font-semibold text-gray-900">
            Adzami Pratama Anura
          </h2>
          <p class="text-sm text-gray-500">adzami@gmail.com</p>
          <p class="text-sm text-gray-400">Joined on April 12, 2025</p>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
          <!-- Quiz Performance Table -->
          <div>
            <h3 class="text-base font-semibold text-gray-900 mb-4">
              Quiz Performance
            </h3>
            <div
              class="bg-white rounded-xl p-4 sm:p-6 shadow-sm overflow-x-auto"
            >
              <table class="min-w-full text-sm text-left">
                <thead class="bg-gray-50 text-gray-500">
                  <tr>
                    <th class="px-4 py-3 font-medium whitespace-nowrap">
                      Quiz Title
                    </th>
                    <th class="px-4 py-3 font-medium whitespace-nowrap">
                      Date
                    </th>
                    <th class="px-4 py-3 font-medium whitespace-nowrap">
                      Score
                    </th>
                    <th class="px-4 py-3 font-medium whitespace-nowrap">
                      Correct
                    </th>
                    <th class="px-4 py-3 font-medium whitespace-nowrap">
                      Incorrect
                    </th>
                    <th class="px-4 py-3 font-medium whitespace-nowrap">
                      Time Spent
                    </th>
                  </tr>
                </thead>
                <tbody class="text-gray-700 divide-y">
                  <tr
                    v-for="item in performanceData"
                    :key="item.title"
                    class="hover:bg-gray-50"
                  >
                    <td class="px-4 py-5 whitespace-nowrap">
                      {{ item.title }}
                    </td>
                    <td class="px-4 py-5">{{ item.date }}</td>
                    <td class="px-4 py-5 font-medium text-gray-900">
                      {{ item.score }}
                    </td>
                    <td class="px-4 py-5">{{ item.correct }}</td>
                    <td class="px-4 py-5">{{ item.incorrect }}</td>
                    <td class="px-4 py-5">{{ item.time }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <RewardCardComponent />

            <!-- Ongoing Quiz -->
            <div class="bg-white rounded-xl p-5 shadow-sm">
              <div class="flex justify-between items-center mb-3">
                <h3 class="text-base font-semibold text-gray-900">
                  Ongoing Quiz
                </h3>
                <a href="#" class="text-sm text-blue-600">See all course</a>
              </div>
              <ul class="space-y-3 text-sm text-gray-700">
                <li
                  v-for="quiz in ongoingQuizzes"
                  :key="quiz.title"
                  class="flex items-center justify-between"
                >
                  <div class="flex items-center gap-3">
                    <img :src="quiz.icon" class="w-7 h-7 rounded-full" />
                    <div class="flex flex-col">
                      <span class="line-clamp-1">{{ quiz.title }}</span>
                      <span class="text-xs text-blue-500">
                        Sessions completed {{ quiz.sessions }}
                      </span>
                    </div>
                  </div>
                  <div
                    class="w-8 h-8 flex items-center justify-center text-[10px] font-semibold border-4 rounded-full"
                    :class="quiz.progressClass"
                  >
                    {{ quiz.progress }}
                  </div>
                </li>
              </ul>
            </div>

            <!-- Add Friend -->
            <div class="bg-white rounded-xl p-5 shadow-sm space-y-4">
              <h3 class="text-sm font-semibold text-gray-900">Add Friend</h3>
              <ul class="space-y-3">
                <li
                  v-for="friend in friendOptions"
                  :key="friend.label"
                  class="flex items-center justify-between"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-9 h-9 flex items-center justify-center rounded-full border text-gray-600"
                    >
                      <i :class="friend.icon" class="text-sm"></i>
                    </div>
                    <span class="text-sm text-gray-800">{{
                      friend.label
                    }}</span>
                  </div>
                  <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import HeaderComponent from "@/components/base/HeaderComponent.vue";
import RewardCardComponent from "@/components/base/RewardCardComponent.vue";

const performanceData = [
  {
    title: "Mathematics",
    date: "2023-11-01",
    score: 86,
    correct: 17,
    incorrect: 3,
    time: "48 mins",
  },
  {
    title: "Biology",
    date: "2023-11-01",
    score: 90,
    correct: 18,
    incorrect: 2,
    time: "42 mins",
  },
  {
    title: "Creativity",
    date: "2023-11-01",
    score: 88,
    correct: 16,
    incorrect: 4,
    time: "51 mins",
  },
];

const ongoingQuizzes = [
  {
    title: "Design Thinking From Scratch",
    sessions: "4/20",
    progress: "4%",
    icon: "../assets/reward3.png",
    progressClass: "border-red-500 text-red-500",
  },
  {
    title: "Application of AI in UI/UX design",
    sessions: "12/17",
    progress: "85%",
    icon: "../assets/reward3.png",
    progressClass: "border-yellow-400 text-yellow-500",
  },
  {
    title: "Figma: Create Better Design System For Your Team",
    sessions: "21/21",
    progress: "100%",
    icon: "../assets/reward3.png",
    progressClass: "border-green-500 text-green-500",
  },
];

const friendOptions = [
  { label: "Find Friend", icon: "fas fa-search" },
  { label: "Share Friend", icon: "fas fa-share-alt" },
  { label: "Invite Friend", icon: "fas fa-paper-plane" },
];
</script>
