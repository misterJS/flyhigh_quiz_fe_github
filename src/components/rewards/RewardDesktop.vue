<script setup>
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import HeaderComponent from "@/components/base/HeaderComponent.vue";
import SeeAllRewards from "./SeeAllRewards.vue";
import RewardHistory from "./RewardHistory.vue";
import { ref } from "vue";

// State untuk menampilkan section
const showAllRewardsSection = ref(false);
const showHistorySection = ref(false);

const openAllRewards = () => {
  showAllRewardsSection.value = true;
};

const closeAllRewards = () => {
  showAllRewardsSection.value = false;
};

const openHistory = () => {
  showHistorySection.value = true;
};

const closeHistory = () => {
  showHistorySection.value = false;
};

const leaderboard = [
  {
    username: "Victor André",
    id: "7281",
    points: 1207,
    tier: 83,
    streak: 59,
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    username: "Victor André",
    id: "7281",
    points: 1207,
    tier: 83,
    streak: 59,
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    username: "Victor André",
    id: "7281",
    points: 1207,
    tier: 83,
    streak: 59,
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    username: "Victor André",
    id: "7281",
    points: 1207,
    tier: 83,
    streak: 59,
    avatar: "https://i.pravatar.cc/40?img=4",
  },
  {
    username: "Sofia Martinez",
    id: "7282",
    points: 1150,
    tier: 90,
    streak: 65,
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    username: "Liam Chen",
    id: "7283",
    points: 1300,
    tier: 75,
    streak: 70,
    avatar: "https://i.pravatar.cc/40?img=6",
  },
];
</script>

<template>
  <div class="flex h-screen">
    <SidebarComponent />

    <div class="flex-1 flex flex-col bg-[#f9fafb]">
      <HeaderComponent />

      <main class="p-6 overflow-y-auto flex-1 space-y-6">
        <!-- Back Button Section -->
        <div
          v-if="showAllRewardsSection"
          class="bg-gray-50 -mx-6 -mt-6 px-6 py-4 border-gray-200 mb-2"
        >
          <button
            @click="closeAllRewards"
            class="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.57 5.92999L3.5 12L9.57 18.07"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.4999 12H3.66992"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>Back</span>
          </button>
        </div>

        <!-- Main Content -->
        <template v-if="!showHistorySection">
          <!-- Top Section (XP & Promo) -->
          <div class="grid xl:grid-cols-[1fr_2fr] gap-4">
          <!-- XP Card -->
          <div class="bg-white rounded-xl shadow-sm p-5 relative">
            <h3 class="text-sm text-gray-500 mb-1">Total Poin</h3>
            <span
              class="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full mb-2 inline-block"
              >Sultan Points</span
            >
            <div class="text-3xl font-bold text-blue-700">71928 XP</div>
            <div class="mt-3 bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                class="bg-blue-600 h-full transition-all duration-300"
                style="width: 32%"
              ></div>
            </div>
            <p class="text-sm text-gray-400 mt-2">
              Rewards You Can Get With Your Points
            </p>
            <img
              src="@/assets/fire.png"
              class="absolute bottom-20 right-4 w-10"
              alt="fire"
            />
          </div>

          <div
            class="bg-blue-600 rounded-xl text-white p-5 flex flex-col justify-between"
          >
            <div>
              <h3 class="text-lg font-semibold mb-2">
                Earn more rewards by completing challenges with your friends.
              </h3>
              <p class="text-sm text-white/80">
                Say hello to an interactive learning process filled with
                competition alongside your best friends.
              </p>
            </div>
            <button
              class="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium self-start"
            >
              Get More Treasure
            </button>
          </div>
        </div>

        <!-- Mid Section (Leaderboard/SeeAllRewards & Reward + History) -->
        <div
          class="grid xl:grid-cols-[2fr_1fr] gap-4"
          v-if="!showAllRewardsSection"
        >
          <!-- Left Side: Conditional rendering antara Leaderboard dan SeeAllRewards -->
          <div>
            <div>
              <h3 class="text-base font-semibold text-gray-900 mb-4">
                Global Leaderboard
              </h3>
              <div class="space-y-3">
                <!-- Header - tanpa background white -->
                <div class="px-6 py-4">
                  <div
                    class="grid grid-cols-5 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wide"
                  >
                    <div>RANK</div>
                    <div>USERNAME</div>
                    <div>POINTS</div>
                    <div>TIER</div>
                    <div>STREAK</div>
                  </div>
                </div>

                <!-- Leaderboard Cards -->
                <div
                  v-for="(user, i) in leaderboard"
                  :key="i"
                  class="relative bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <!-- Gradasi Background -->
                  <div
                    v-if="i < 3"
                    class="absolute left-0 top-0 bottom-0 w-60 rounded-l-xl"
                    :class="[
                      i === 0
                        ? 'bg-gradient-to-r from-yellow-100 to-transparent'
                        : i === 1
                        ? 'bg-gradient-to-r from-purple-100 to-transparent'
                        : 'bg-gradient-to-r from-red-100 to-transparent',
                    ]"
                  ></div>

                  <!-- Border berwarna di sisi kiri -->
                  <div
                    v-if="i < 3"
                    class="absolute left-0 top-2 bottom-2 w-1.5 rounded-full"
                    :class="[
                      i === 0
                        ? 'bg-yellow-400'
                        : i === 1
                        ? 'bg-purple-400'
                        : 'bg-red-400',
                    ]"
                  ></div>

                  <div class="relative px-6 py-4">
                    <div class="grid grid-cols-5 gap-4 items-center">
                      <!-- Rank -->
                      <div class="font-bold text-gray-900">
                        <span class="ml-2">#{{ i + 1 }}</span>
                      </div>

                      <!-- Username -->
                      <div class="flex items-center gap-3">
                        <img :src="user.avatar" class="w-8 h-8 rounded-full" />
                        <div>
                          <div class="font-medium text-gray-900">
                            {{ user.username }}
                          </div>
                          <div class="text-xs text-gray-500">
                            #{{ user.id }}
                          </div>
                        </div>
                      </div>

                      <!-- Points -->
                      <div class="font-medium text-gray-900">
                        {{ user.points.toLocaleString() }}
                      </div>

                      <!-- Tier -->
                      <div class="font-medium text-gray-900">
                        {{ user.tier }}
                      </div>

                      <!-- Streak -->
                      <div class="font-medium text-gray-900">
                        {{ user.streak }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side: Reward Progress and History - tetap tampil -->
          <div class="space-y-4">
            <!-- Rewards to get -->
            <div class="bg-white rounded-xl p-5 shadow-sm">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-base font-semibold text-gray-900">
                  Rewards to get
                </h3>
                <button
                  @click="openAllRewards"
                  class="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  See all
                </button>
              </div>
              <div class="space-y-4">
                <div
                  class="flex items-center justify-between p-4 border rounded-xl"
                >
                  <div class="flex items-center gap-3">
                    <img src="@/assets/reward3.png" class="w-10 h-10" />
                    <div>
                      <p class="text-sm font-medium">School Bag</p>
                      <p class="text-xs text-blue-500">
                        need to finish 30 Quizzes
                      </p>
                    </div>
                  </div>
                  <div class="relative w-12 h-12">
                    <svg
                      class="w-12 h-12 transform -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <!-- Background circle -->
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke="#e5e7eb"
                        stroke-width="2.5"
                      />
                      <!-- Progress circle -->
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke="#ef4444"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-dasharray="4 96"
                        stroke-dashoffset="0"
                      />
                    </svg>
                    <div
                      class="absolute inset-0 flex items-center justify-center"
                    >
                      <span class="text-xs font-bold text-red-600">4%</span>
                    </div>
                  </div>
                </div>
                <div
                  class="flex items-center justify-between p-4 border rounded-xl"
                >
                  <div class="flex items-center gap-3">
                    <img src="@/assets/reward3.png" class="w-10 h-10" />
                    <div>
                      <p class="text-sm font-medium">School Bag</p>
                      <p class="text-xs text-blue-500">
                        need to finish 2 Quizzes
                      </p>
                    </div>
                  </div>
                  <div class="relative w-12 h-12">
                    <svg
                      class="w-12 h-12 transform -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <!-- Background circle -->
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke="#e5e7eb"
                        stroke-width="2.5"
                      />
                      <!-- Progress circle -->
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke="#eab308"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-dasharray="85 15"
                        stroke-dashoffset="0"
                      />
                    </svg>
                    <div
                      class="absolute inset-0 flex items-center justify-center"
                    >
                      <span class="text-xs font-bold text-yellow-600">85%</span>
                    </div>
                  </div>
                </div>
                <div
                  class="flex items-center justify-between p-4 border rounded-xl"
                >
                  <div class="flex items-center gap-3">
                    <img src="@/assets/reward3.png" class="w-10 h-10" />
                    <div>
                      <p class="text-sm font-medium">School Bag</p>
                      <p class="text-xs text-blue-500">
                        need to finish 2 Quizzes
                      </p>
                    </div>
                  </div>
                  <button
                    class="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full"
                  >
                    Redeem
                  </button>
                </div>
              </div>
            </div>

            <!-- History -->
            <div class="bg-white rounded-xl p-5 shadow-sm">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-base font-semibold text-gray-900">History</h3>
                <button
                  @click="openHistory"
                  class="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  See all
                </button>
              </div>
              <div class="space-y-3">
                <div
                  class="flex items-center justify-between p-4 border rounded-xl"
                >
                  <div class="flex items-center gap-3">
                    <img src="@/assets/reward3.png" class="w-8 h-8" />
                    <div>
                      <p class="text-sm text-gray-700">School Bag</p>
                      <p class="text-xs text-gray-400">01-20-2025</p>
                    </div>
                  </div>
                  <button
                    class="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full"
                  >
                    Redeemed
                  </button>
                </div>
                <div
                  class="flex items-center justify-between p-4 border rounded-xl"
                >
                  <div class="flex items-center gap-3">
                    <img src="@/assets/reward3.png" class="w-8 h-8" />
                    <div>
                      <p class="text-sm text-gray-700">School Bag</p>
                      <p class="text-xs text-gray-400">01-20-2025</p>
                    </div>
                  </div>
                  <button
                    class="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full"
                  >
                    Redeemed
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </template>

        <!-- SeeAllRewards Section - menggantikan leaderboard saja -->
        <div v-if="showAllRewardsSection" class="w-full">
          <SeeAllRewards
            :is-visible="showAllRewardsSection"
            @back="closeAllRewards"
          />
        </div>
        <!-- History Section - menggantikan semua content -->
        <div v-if="showHistorySection" class="w-full">
          <RewardHistory
            :is-visible="showHistorySection"
            @back="closeHistory"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped></style>
