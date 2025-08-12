<template>
  <div
    class="min-h-screen text-white flex flex-col bg-[#007CEF] bg-cover bg-center bg-no-repeat bg-blend-overlay"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div class="mt-4 mx-5">
      <p class="font-bold">Ranking</p>

      <div
        class="bg-white/20 p-1 rounded-[100px] mt-4 h-[46px] flex gap-4 items-center overflow-hidden relative"
      >
        <div
          class="absolute top-1 left-1 h-[38px] w-[calc(50%-8px)] bg-white rounded-[100px] transition-all duration-300"
          :class="
            activeTab === 'weekly'
              ? 'translate-x-0'
              : 'translate-x-[calc(100%+8px)]'
          "
        ></div>

        <button
          class="w-full z-10 h-[38px] flex items-center justify-center font-semibold text-sm transition-all duration-200 rounded-[100px]"
          :class="activeTab === 'weekly' ? 'text-[#007CEF]' : 'text-white'"
          @click="activeTab = 'weekly'"
        >
          Weekly
        </button>
        <button
          class="w-full z-10 h-[38px] flex items-center justify-center font-semibold text-sm transition-all duration-200 rounded-[100px]"
          :class="activeTab === 'alltime' ? 'text-[#007CEF]' : 'text-white'"
          @click="activeTab = 'alltime'"
        >
          All Time
        </button>
      </div>

      <div class="mt-4 w-full text-center">
        <p v-if="activeTab === 'weekly'" class="font-semibold">
          Defending Champion this week!
        </p>
        <p v-else class="font-semibold">Menampilkan data sepanjang waktu...</p>
      </div>
    </div>

    <div class="flex gap-[22px] mx-auto mt-[35px]">
      <!-- Rank 2 -->
      <div class="mt-[64px]" v-if="leaderboardData[1]">
        <div class="relative w-fit mx-auto">
          <img
            :src="top2"
            class="w-[14px] absolute top-[35px] left-1/2 -translate-x-1/2 z-10"
          />
          <img :src="avatarNumber1" class="w-[56px] mx-auto relative z-0" />
          <p class="font-medium text-sm text-center">
            {{ leaderboardData[1].Name }}
          </p>
          <p class="font-medium text-[12px] text-center text-[#29FD88]">
            {{ leaderboardData[1].XP }} XP
          </p>
        </div>
        <div
          class="w-[100px] h-[320px] bg-gradient-to-b from-[#146DBF] to-[#04427C] rounded-[14px] mt-[12px]"
        ></div>
      </div>

      <!-- Rank 1 -->
      <div v-if="leaderboardData[0]">
        <div class="relative w-fit mx-auto">
          <img
            :src="crown"
            class="w-[32px] absolute top-[-19px] left-1/2 -translate-x-1/2 z-10"
          />
          <img
            :src="top1"
            class="w-[14px] absolute top-[35px] left-1/2 -translate-x-1/2 z-10"
          />
          <img :src="avatarNumber1" class="w-[56px] mx-auto relative z-0" />
          <p class="font-medium text-sm text-center">
            {{ leaderboardData[0].Name }}
          </p>
          <p class="font-medium text-[12px] text-center text-[#29FD88]">
            {{ leaderboardData[0].XP }} XP
          </p>
        </div>
        <div
          class="w-[100px] h-[361px] bg-gradient-to-b from-[#146DBF] to-[#04427C] rounded-[14px] mt-[12px]"
        ></div>
      </div>

      <!-- Rank 3 -->
      <div class="mt-[64px]" v-if="leaderboardData[2]">
        <div class="relative w-fit mx-auto">
          <img
            :src="top3"
            class="w-[14px] absolute top-[35px] left-1/2 -translate-x-1/2 z-10"
          />
          <img :src="avatarNumber1" class="w-[56px] mx-auto relative z-0" />
          <p class="font-medium text-sm text-center">
            {{ leaderboardData[2].Name }}
          </p>
          <p class="font-medium text-[12px] text-center text-[#29FD88]">
            {{ leaderboardData[2].XP }} XP
          </p>
        </div>
        <div
          class="w-[100px] h-[280px] bg-gradient-to-b from-[#146DBF] to-[#04427C] rounded-[14px] mt-[12px]"
        ></div>
      </div>
    </div>

    <div
      class="absolute px-5 bottom-0 left-0 w-full h-1/2 bg-white z-10 rounded-t-[12px]"
    >
      <div class="w-full">
        <div
          class="mx-auto w-[57px] h-[6px] bg-[#E0E0E0] mt-[16px] rounded-[12px]"
        ></div>
      </div>
      <div class="w-full flex justify-between mt-6">
        <p class="text-black font-medium">List Of Winners</p>
        <p class="text-black text-[12px]">
          {{ leaderboardData.length }} students
        </p>
      </div>
      <div
        v-for="(user, index) in leaderboardData"
        :key="user.StudentId"
        class="text-black mt-6"
      >
        <div class="border-[#EDEDED] border-b flex">
          <img
            :src="[badge1, badge2, badge3][index] || badge1"
            class="w-[36px] mr-4 mb-4"
          />
          <img :src="avatarNumber1" class="w-[36px] mb-4 mr-4" />
          <div>
            <p class="font-semibold text-[14px]">{{ user.Name }}</p>
            <p class="font-semibold text-[10px] text-[#007CEF]">
              {{ user.XP }} XP
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="z-50">
      <BottomBarNavigation />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import BottomBarNavigation from "../base/BottomBarNavigation.vue";
import avatarNumber1 from "../../assets/rank1.png";
import crown from "../../assets/crown.png";
import badge1 from "../../assets/Badge1.png";
import badge2 from "../../assets/Badge2.png";
import badge3 from "../../assets/Badge3.png";
import top1 from "../../assets/top1.png";
import top2 from "../../assets/top2.png";
import top3 from "../../assets/top3.png";
import { AllTimeLeaderboard, WeeklyLeaderboard } from "@/api/leaderboardApi";
const backgroundImage = "/Background-Image.png";
const activeTab = ref("weekly");

const leaderboardData = ref([]);
const isLoading = ref(true);

const fetchLeaderboard = async () => {
  isLoading.value = true;
  try {
    if (activeTab.value === "weekly") {
      leaderboardData.value = await WeeklyLeaderboard();
    } else {
      leaderboardData.value = await AllTimeLeaderboard();
    }
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
  } finally {
    isLoading.value = false;
  }
};

watch(activeTab, () => {
  fetchLeaderboard();
});

onMounted(() => {
  fetchLeaderboard();
});
</script>

<style scoped></style>
