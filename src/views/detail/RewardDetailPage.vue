<template>
  <div class="flex h-screen bg-[#f9fafb]">
    <SidebarComponent />
    <div class="flex-1 flex flex-col">
      <HeaderComponent />
      <main class="flex-1 p-8 overflow-y-auto">
        <div class="max-w-7xl mx-auto space-y-8">
          <router-link
            to="/home"
            class="text-sm text-[#2563EB] flex items-center gap-1"
          >
            <i class="fas fa-arrow-left"></i> Back
          </router-link>

          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div class="bg-white rounded-2xl p-6 shadow-sm col-span-1">
              <p class="text-sm text-gray-600 font-medium mb-2">Total Point</p>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-3xl font-bold text-[#2563EB]">71928 XP</p>
                  <p class="text-xs text-gray-500 mt-1">
                    Rewards You Can Get With Your Points
                  </p>
                </div>
                <img
                  src="@/assets/flame-icon.png"
                  class="w-10 h-10"
                  alt="fire"
                />
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div
                  class="bg-[#2563EB] h-2 rounded-full"
                  style="width: 33%"
                ></div>
              </div>
            </div>

            
            <div
              class="lg:col-span-2 bg-[#2563EB] text-white rounded-2xl p-6 flex items-center justify-between"
            >
              <div>
                <h3 class="text-lg font-semibold mb-1">
                  Earn more rewards by completing challenges with your friends.
                </h3>
                <p class="text-sm opacity-90 mb-4 max-w-sm">
                  Say hello to an interactive learning process filled with
                  competition alongside your best friends.
                </p>
                <button
                  class="bg-white text-[#2563EB] font-semibold text-sm px-4 py-2 rounded-lg"
                >
                  Get More Treasure
                </button>
              </div>
              <img
                src="@/assets/trophy.png"
                alt="trophy"
                class="w-24 hidden md:block"
              />
            </div>
          </div>

          
          <div class="mt-4">
            <h2 class="text-base font-semibold text-[#111827] mb-4">
              Rewards to Get
            </h2>
            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <RewardCard
                v-for="(reward, index) in rewards"
                :key="index"
                :reward="reward"
              />
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
import RewardCard from "@/components/base/RewardCardComponent.vue";

const rewards = [
  { name: "Backpack", xp: 400, progress: 1, status: "available" },
  { name: "Pencil Case", xp: 400, progress: 1, status: "available" },
  { name: "Stationery Set", xp: 400, progress: 0.55, status: "locked" },
  { name: "Notebooks", xp: 400, progress: 0.5, status: "locked" },
  { name: "Lunch Box", xp: 400, progress: 0.55, status: "locked" },
  { name: "Water Bottle", xp: 400, progress: 0.5, status: "locked" },
  { name: "School Shoes", xp: 400, progress: 0.55, status: "locked" },
  { name: "Desk Organizer", xp: 400, progress: 0.45, status: "locked" },
  { name: "Umbrella", xp: 400, progress: 0.5, status: "locked" },
];
</script>

<style scoped></style>
