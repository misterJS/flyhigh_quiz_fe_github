<template>
  <div class="min-h-screen bg-[#f9fafb] px-4 pb-20 pt-5">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4 rounded-xl p-4 bg-white">
      <div class="flex items-center space-x-2">
        <img src="@/assets/Avatar.png" class="w-8 h-8 rounded-full" />
        <div class="text-sm">
          <p class="text-gray-500">Good morning</p>
          <p class="font-semibold">{{ profile.name }}</p>
        </div>
      </div>
      <div
        class="flex items-center gap-1 bg-[#F0ECFE] px-3 py-2 rounded-full text-sm"
      >
        💎
        <span class="font-medium text-[#9B7BF8]">120</span>
      </div>
    </div>

    <!-- Congratulations Card -->
    <div class="bg-white rounded-xl p-4 border relative overflow-hidden mb-6">
      <div>
        <p class="text-base font-semibold text-[#1E1E1F] mb-1">
          Congratulations!
        </p>
        <p class="text-sm text-gray-500">You’re Close to a Reward</p>
        <p class="text-base text-[#1E1E1F] mt-2">300 / 500 💎</p>
        <p class="text-[10px] text-gray-400 mb-2">60% of target</p>
        <BaseButton class="rounded-xl">View All Rewards</BaseButton>
      </div>
      <img
        src="@/assets/cup-orange.png"
        class="absolute right-2 bottom-2 w-20"
      />
    </div>

    <!-- Subjects -->
    <div class="bg-white rounded-2xl shadow-custom p-4 mb-4">
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
          <img
            :src="subject.icon"
            alt=""
            class="w-[52px] h-[52px] object-contain"
          />

          <p class="text-sm mt-2 text-gray-800">{{ subject.name }}</p>
        </div>
      </div>
    </div>

    <BaseButton @click="goToUrl('/quiz/generate')" class="mb-4 py-4 rounded-xl">
      <div class="flex gap-3 items-center w-full">
        <img src="@/assets/ideas.png" class="w-8 h-8 rounded-full" />
        <p class="font-semibold text-base text-left">
          Create your own quiz, invite friends to play!
        </p>
        <i class="fas fa-angle-right w-8"></i>
      </div>
    </BaseButton>

    <!-- Leaderboard -->
    <div class="bg-white rounded-2xl shadow-custom p-4 mb-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-semibold text-base text-gray-900">Leaderboard</h3>
        <a href="#" class="text-sm text-blue-600 font-medium">View All</a>
      </div>
      <div class="space-y-2">
        <div
          v-for="(user, index) in leaderboard"
          :key="index"
          class="flex justify-between items-center bg-white p-3 border-b"
        >
          <div class="flex items-center gap-3">
            <img :src="user.avatar" class="w-10 h-10 rounded-full" />
            <div>
              <p class="text-sm font-medium">{{ user.name }}</p>
              <p class="text-xs text-gray-400">{{ user.xp }} XP</p>
            </div>
          </div>
          <img :src="user.badge" class="w-9 h-9 rounded-full" />
        </div>
      </div>
    </div>

    <!-- Live Sessions -->
    <liveSessionComponent />

    <!-- Bottom Navigation -->
    <BottomBarNavigation />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import BaseButton from "../base/BaseButton.vue";
import BottomBarNavigation from "../base/BottomBarNavigation.vue";
import liveSessionComponent from "../base/LiveSessionComponent.vue";
import { useAuthStore } from "@/stores/authStore";
import { onMounted, ref } from "vue";
import { GetProfile } from "@/api/settingApi";
import { AllTimeLeaderboard } from "@/api/leaderboardApi";
const router = useRouter();
const auth = useAuthStore();

function goToUrl(dir) {
  router.push(dir);
}

const profile = ref({});

const handleGetProfile = async () => {
  try {
    const userId = auth.userId;
    const response = await GetProfile(userId);
    profile.value = response;
  } catch (error) {
    console.error(error);
  }
};

const leaderboard = ref([]);

const fetchLeaderboard = async () => {
  try {
    const data = await AllTimeLeaderboard();

    leaderboard.value = data.map((user, index) => ({
      name: user.Name,
      xp: user.XP,
      avatar: require("@/assets/Rectangle.png"),
      badge: getBadge(index + 1),
    }));
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
  }
};

function getBadge(rank) {
  if (rank === 1) return require("@/assets/Badge1.png");
  if (rank === 2) return require("@/assets/Badge2.png");
  if (rank === 3) return require("@/assets/Badge3.png");
  return require("@/assets/Badge3.png");
}

onMounted(() => {
  handleGetProfile();
  fetchLeaderboard();
});

const subjects = [
  {
    name: "Biology",
    icon: require("@/assets/biology.png"),
  },
  {
    name: "History",
    icon: require("@/assets/history.png"),
  },
  {
    name: "Geography",
    icon: require("@/assets/geography.png"),
  },
  {
    name: "Economics",
    icon: require("@/assets/economics.png"),
  },
];
</script>
