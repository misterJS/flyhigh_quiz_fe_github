<template>
  <div class="min-h-screen bg-[#f9fafb] px-4 pb-20 pt-5">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6 rounded-lg p-4 bg-white">
      <div class="flex items-center space-x-2">
        <img src="@/assets/Avatar.png" class="w-8 h-8 rounded-full" />
        <div class="text-sm">
          <p class="text-gray-500">Good morning</p>
          <p class="font-semibold">Siti Tirta</p>
        </div>
      </div>
      <div
        class="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow text-sm"
      >
        💎
        <span class="font-medium text-blue-600">120</span>
      </div>
    </div>

    <!-- Congratulations Card -->
    <div class="bg-white rounded-xl p-4 shadow relative overflow-hidden mb-6">
      <div>
        <p class="text-sm text-gray-500 mb-1">Congratulations!</p>
        <p class="text-sm font-semibold text-gray-700">
          You’re Close to a Reward
        </p>
        <p class="text-xs text-gray-400 mt-2">300 / 500 💎</p>
        <p class="text-xs text-gray-400 mb-2">60% of target</p>
        <button class="bg-blue-600 text-white text-xs px-4 py-1 rounded-full">
          View All Rewards
        </button>
      </div>
      <img
        src="@/assets/cup-orange.png"
        class="absolute right-2 bottom-2 w-20"
      />
    </div>

    <!-- Subjects -->
    <div class="bg-white rounded-2xl p-4 shadow-sm mb-6">
      <!-- Title Row -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-base font-semibold text-gray-900">Subjects</h3>
        <a href="#" class="text-sm text-blue-600 font-medium">View All</a>
      </div>

      <!-- Subject Icons -->
      <div class="flex justify-between">
        <div
          v-for="subject in subjects"
          :key="subject.name"
          class="flex flex-col items-center text-center"
        >
          <div
            class="bg-gray-100 w-14 h-14 rounded-full shadow-sm flex items-center justify-center"
          >
            <img :src="subject.icon" alt="" class="w-6 h-6 object-contain" />
          </div>
          <p class="text-sm mt-2 text-gray-800">{{ subject.name }}</p>
        </div>
      </div>
    </div>

    <!-- Leaderboard -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-semibold text-sm">Leaderboard</h3>
        <a href="#" class="text-xs text-blue-600 font-medium">View All</a>
      </div>
      <div class="space-y-2">
        <div
          v-for="(user, index) in leaderboard"
          :key="index"
          class="flex justify-between items-center bg-white rounded-xl p-3 shadow"
        >
          <div class="flex items-center gap-3">
            <img :src="user.avatar" class="w-8 h-8 rounded-full" />
            <div>
              <p class="text-sm font-medium">{{ user.name }}</p>
              <p class="text-xs text-gray-400">{{ user.xp }} XP</p>
            </div>
          </div>
          <span>🥇</span>
        </div>
      </div>
    </div>

    <!-- Live Sessions -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-semibold text-sm">Live Sessions</h3>
        <a href="#" class="text-xs text-blue-600 font-medium">View All</a>
      </div>
      <div class="space-y-2">
        <div
          v-for="session in liveSessions"
          :key="session.title"
          class="bg-white p-3 rounded-xl shadow flex justify-between items-center"
        >
          <div>
            <p class="text-sm font-medium truncate">{{ session.title }}</p>
            <p class="text-xs text-gray-400">
              {{ session.date }} • {{ session.time }}
            </p>
          </div>
          <button class="text-blue-600 text-sm font-medium">Watch</button>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <BottomBarNavigation />
  </div>
</template>

<script setup>
import BottomBarNavigation from "../base/BottomBarNavigation.vue";

const subjects = [
  {
    name: "Biology",
    icon: require("@/assets/image (3).png"),
  },
  {
    name: "History",
    icon: require("@/assets/image (4).png"),
  },
  {
    name: "Geography",
    icon: require("@/assets/image (5).png"),
  },
  {
    name: "Economics",
    icon: require("@/assets/image (6).png"),
  },
];

const leaderboard = [
  {
    name: "Brian Fred M.",
    xp: "421 XP",
    avatar: require("@/assets/Rectangle.png"),
  },
  {
    name: "Brian Fred M.",
    xp: "412 XP",
    avatar: require("@/assets/Rectangle (1).png"),
  },
  {
    name: "Brian Fred M.",
    xp: "401 XP",
    avatar: require("@/assets/Rectangle 5223.png"),
  },
];

const liveSessions = [
  { title: "QnA: Design Thinking", date: "May 20, 2024", time: "09:00 AM" },
  { title: "Tadika Kira Part 2", date: "May 20, 2024", time: "10:00 AM" },
];
</script>
