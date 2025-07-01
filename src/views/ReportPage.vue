<template>
  <div class="min-h-screen bg-[#f9fafb] flex flex-col lg:flex-row">
    <!-- Sidebar (only desktop) -->
    <SidebarComponent class="hidden lg:block" />

    <div class="flex-1 flex flex-col">
      <!-- Header (only desktop) -->
      <HeaderComponent class="hidden lg:flex" />

      <!-- Main Content -->
      <div class="p-4 lg:p-8 flex flex-col lg:flex-row gap-6">
        <!-- LEFT CONTENT -->
        <div class="flex-1">
          <!-- Profile Header -->
          <div
            class="relative bg-white rounded-xl shadow-sm overflow-hidden mb-6"
          >
            <img
              src="../assets/Avatar.png"
              class="w-full h-40 lg:h-60 object-cover"
            />
            <button
              class="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
            >
              <i class="fas fa-pen text-gray-600"></i>
            </button>
          </div>

          <div class="bg-transparent mb-6 py-4 border-b">
            <h2 class="font-semibold text-lg mb-1">Adzami Pratama Anura</h2>
            <p class="text-sm text-gray-500 mb-1">adzami@gmail.com</p>
            <p class="text-sm text-gray-400">Joined on April 12, 2025</p>

            <!-- Mobile Add Friend -->
            <div class="lg:hidden mb-6 mt-6">
              <h3 class="text-lg mb-3">Add Friend</h3>
              <div class="flex justify-center gap-4">
                <button
                  class="flex items-center justify-center px-12 py-4 rounded-full border border-gray-300"
                >
                  <i class="fas fa-search text-sm"></i>
                </button>
                <button
                  class="flex items-center justify-center px-12 py-4 rounded-full border border-gray-300"
                >
                  <i class="fas fa-share-alt text-sm"></i>
                </button>
                <button
                  class="flex items-center justify-center px-12 py-4 rounded-full border border-gray-300"
                >
                  <i class="fas fa-paper-plane text-sm"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Quiz Performance -->
          <div>
            <h3 class="font-semibold text-base mb-4">Quiz Performance</h3>

            <!-- Mobile Card -->
            <div class="lg:hidden bg-white rounded-xl p-4 shadow-sm space-y-4">
              <div
                v-for="item in performanceData"
                :key="item.title"
                class="space-y-1"
              >
                <div class="flex justify-between">
                  <span class="font-semibold">{{ item.title }}</span>
                  <span class="font-semibold text-gray-600"
                    >{{ item.score }}/100</span
                  >
                </div>
                <div class="text-xs text-gray-400">
                  {{ item.date }} • {{ item.time }}
                </div>
                <div class="flex justify-between text-xs text-gray-500">
                  <span>Correct: {{ item.correct }}</span>
                  <span>Incorrect: {{ item.incorrect }}</span>
                </div>
                <hr />
              </div>
            </div>

            <!-- Desktop Table -->
            <div class="hidden lg:block bg-white rounded-xl shadow-sm p-6">
              <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                  <thead class="bg-gray-50 text-gray-500">
                    <tr>
                      <th class="px-4 py-3 text-start">Quiz Title</th>
                      <th class="px-4 py-3 text-start">Date</th>
                      <th class="px-4 py-3 text-start">Score</th>
                      <th class="px-4 py-3 text-start">Correct</th>
                      <th class="px-4 py-3 text-start">Incorrect</th>
                      <th class="px-4 py-3 text-start">Time Spend</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y text-gray-700">
                    <tr v-for="item in performanceData" :key="item.title">
                      <td class="px-4 py-4">{{ item.title }}</td>
                      <td class="px-4 py-4">{{ item.date }}</td>
                      <td class="px-4 py-4 font-medium">{{ item.score }}</td>
                      <td class="px-4 py-4">{{ item.correct }}</td>
                      <td class="px-4 py-4">{{ item.incorrect }}</td>
                      <td class="px-4 py-4">{{ item.time }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT SIDEBAR -->
        <div class="w-full lg:w-[340px] flex flex-col gap-6">
          <!-- Reward Card -->
          <div class="bg-white rounded-xl p-6 shadow-sm relative">
            <p class="font-semibold text-sm mb-1">Congratulations!</p>
            <p class="text-sm text-gray-500 mb-2">You’re Close to a Reward</p>
            <p class="font-semibold text-lg">300 / 500 💎</p>
            <p class="text-xs text-gray-400 mb-3">80% of target</p>
            <button
              class="bg-blue-600 text-white text-sm px-4 py-2 rounded-full mb-4"
            >
              View All Rewards
            </button>
            <img
              src="@/assets/cup-orange.png"
              class="w-24 absolute right-4 top-20 opacity-90"
            />
          </div>

          <!-- Ongoing Quiz -->
          <div class="bg-white rounded-xl p-6 shadow-sm">
            <div class="flex justify-between items-center mb-3">
              <h3 class="text-base font-semibold">Ongoing Quiz</h3>
              <a href="#" class="text-sm text-blue-600">See all course</a>
            </div>
            <ul class="space-y-3 text-sm text-gray-700">
              <li
                v-for="quiz in ongoingQuizzes"
                :key="quiz.title"
                class="flex justify-between items-center"
              >
                <div class="flex items-center gap-3">
                  <img :src="quiz.icon" class="w-7 h-7 rounded-full" />
                  <div>
                    <p class="font-semibold">{{ quiz.title }}</p>
                    <p class="text-xs text-blue-500">
                      Sessions {{ quiz.sessions }}
                    </p>
                  </div>
                </div>
                <div
                  :class="quiz.progressClass"
                  class="w-8 h-8 flex items-center justify-center text-[10px] font-semibold border-4 rounded-full"
                >
                  {{ quiz.progress }}
                </div>
              </li>
            </ul>
          </div>

          <!-- Add Friend (only desktop) -->
          <div class="bg-white rounded-xl p-6 shadow-sm hidden lg:block">
            <h3 class="text-sm font-semibold mb-4">Add Friend</h3>
            <ul class="space-y-3">
              <li
                v-for="friend in friendOptions"
                :key="friend.label"
                class="flex justify-between items-center"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-9 h-9 flex justify-center items-center border rounded-full text-gray-600"
                  >
                    <i :class="friend.icon" class="text-sm"></i>
                  </div>
                  <span class="text-sm">{{ friend.label }}</span>
                </div>
                <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import HeaderComponent from "@/components/base/HeaderComponent.vue";

const performanceData = [
  {
    title: "Mathematics",
    date: "2023-10-01",
    score: 60,
    correct: 17,
    incorrect: 3,
    time: "60 mins",
  },
  {
    title: "Biology",
    date: "2023-10-01",
    score: 85,
    correct: 17,
    incorrect: 3,
    time: "45 mins",
  },
  {
    title: "Chemistry",
    date: "2023-09-25",
    score: 90,
    correct: 18,
    incorrect: 2,
    time: "40 mins",
  },
  {
    title: "Physics",
    date: "2023-10-05",
    score: 78,
    correct: 15,
    incorrect: 5,
    time: "50 mins",
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
