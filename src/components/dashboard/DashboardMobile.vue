<template>
  <div class="min-h-screen bg-[#f9fafb] px-4 pb-20 pt-5">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between rounded-[22px] p-5 bg-white shadow-sm">
        <!-- Kiri: avatar + greeting + nama -->
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-4">
            <!-- avatar dalam lingkaran hijau -->
            <div class="w-12 h-12 rounded-full bg-[#E6F6E9] grid place-items-center">
              <img src="@/assets/Avatar.png" class="w-9 h-9 rounded-full" alt="avatar" />
            </div>

            <div class="leading-tight">
              <p class="text-xs text-[#9AA3AF]">Good morning</p>
              <p class="text-lg font-normal text-[#1C103B]">
                {{ profile.name || '—' }}
              </p>
            </div>
          </div>

          <!-- Kanan: pill XP + bell -->
          <div class="flex items-center gap-3">
            <!-- XP pill -->
            <div class="flex items-center gap-2 bg-[#F0ECFE] px-4 py-2 rounded-full">
              <!-- diamond icon -->
              <svg viewBox="0 0 24 24" class="w-5 h-5 text-[#7C5CFF]" fill="currentColor" aria-hidden="true">
                <path d="M7.5 3.5h9l4 5-9 12-9-12 4-5zM9 5.5l-2.5 3L12 18l5.5-9.5-2.5-3H9z" />
              </svg>
              <span class="text-base font-semibold text-[#7C5CFF]">
                {{ leaderboardScore?.[0]?.XP ?? 0 }}
              </span>
            </div>
          </div>
        </div>

        <!-- bell -->
        <button class="text-[#1C103B]" aria-label="Notifications">
          <i class="far fa-bell text-xl"></i>
        </button>
      </div>
    </div>

    <!-- Congratulations Card -->
    <div class="bg-white rounded-xl p-4 border relative overflow-hidden mb-6">
      <div>
        <p class="text-base font-semibold text-[#1E1E1F] mb-1">
          Congratulations!
        </p>
        <p class="text-sm text-gray-500">You’re Close to a Reward</p>
        <div class="flex gap-2 items-center mt-2">
          <p class="text-base text-[#1E1E1F]">
            {{ leaderboardScore[0]?.XP ?? 0 }} / 500
          </p>
          <span class="-mt-1">🎯</span>
        </div>

        <p class="text-[10px] text-gray-400 mb-2">
          {{
            leaderboardScore[0]?.XP != null
              ? (500 / leaderboardScore[0].XP / 100).toFixed(2) + "%"
              : "0%"
          }}
        </p>
        <BaseButton class="rounded-xl" @click="goToUrl('/rewards')">
          View All Rewards
        </BaseButton>
      </div>
      <img src="@/assets/cup-confetti.png" class="absolute right-2 bottom-2 w-42" />
    </div>

    <!-- Subjects -->
    <div class="bg-white rounded-2xl shadow-custom p-4 mb-4">
      <!-- Title Row -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-base font-semibold text-gray-900">Subjects</h3>
        <a href="/subject-all" class="text-sm text-blue-600 font-medium">View All</a>
      </div>

      <!-- Subject Icons -->
      <div class="flex justify-between">
        <div v-for="subject in subjects" :key="subject.name" class="flex flex-col items-center text-center">
          <img :src="subject.icon" alt="" class="w-[52px] h-[52px] object-contain" />

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
        <a href="/ranking" class="text-sm text-blue-600 font-medium">View All</a>
      </div>
      <div class="space-y-2">
        <div v-for="(user, index) in leaderboard" :key="index"
          class="flex justify-between items-center bg-white p-3 border-b">
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
import { AllTimeLeaderboard, LeaderboardByUserId } from "@/api/leaderboardApi";
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

const leaderboardScore = ref("");

const fetchLeaderboardById = async () => {
  try {
    const data = await LeaderboardByUserId(auth.userId);

    leaderboardScore.value = data;
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
  fetchLeaderboardById();
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
