<script setup>
import HeaderComponent from "@/components/base/HeaderComponent.vue";
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import ScheduleList from "@/components/base/ScheduleListComponent.vue";
import QuizProgressList from "@/components/base/ProgressListComponent.vue";
import RewardProgressCard from "@/components/base/RewardCardComponent.vue";
import CalendarWidget from "@/components/base/CalendarWidgetComponent.vue";

import { ref, computed } from "vue";

const sortKey = ref("point");
const sortAsc = ref(false);

const leaderboard = ref([
  {
    rank: "🥇",
    name: "Brian Fred M.",
    email: "brian@email.com",
    course: "Physic",
    point: 261,
  },
  {
    rank: "🥈",
    name: "Courtney Henry",
    email: "courtney@email.com",
    course: "Biology",
    point: 245,
  },
  {
    rank: "🥉",
    name: "Leslie Alexander",
    email: "leslie@email.com",
    course: "Math",
    point: 210,
  },
]);

const sortedLeaderboard = computed(() => {
  return [...leaderboard.value].sort((a, b) => {
    const aVal = a[sortKey.value];
    const bVal = b[sortKey.value];
    if (typeof aVal === "number") {
      return sortAsc.value ? aVal - bVal : bVal - aVal;
    }
    return sortAsc.value
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });
});

function setSort(key) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value;
  } else {
    sortKey.value = key;
    sortAsc.value = true;
  }
}
</script>

<template>
  <div class="flex h-screen">
    <SidebarComponent />

    <div class="flex-1 flex flex-col bg-[#f9fafb]">
      <HeaderComponent />

      <main class="px-6 pt-6 pb-12 overflow-y-auto flex-1">
        <img
          src="../assets/hero-dashboard.png"
          alt="Logo"
          class="w-full mb-6 mx-auto rounded-xl"
        />

        <div class="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4">
          <div>
            <div class="grid grid-cols-1 xl:grid-cols-[2fr_2fr] gap-4 mb-4">
              <ScheduleList />
              <QuizProgressList />
            </div>
            <div class="bg-white rounded-xl p-5 shadow-sm">
              <h3 class="text-base font-semibold text-gray-900 mb-4">
                Leaderboard
              </h3>
              <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                  <thead class="text-gray-500 text-left">
                    <tr>
                      <th
                        class="py-2 pr-4 cursor-pointer"
                        @click="setSort('rank')"
                      >
                        Rank
                        <span v-if="sortKey === 'rank'">{{
                          sortAsc ? "⬆️" : "⬇️"
                        }}</span>
                      </th>
                      <th
                        class="py-2 pr-4 cursor-pointer"
                        @click="setSort('name')"
                      >
                        Name
                        <span v-if="sortKey === 'name'">{{
                          sortAsc ? "⬆️" : "⬇️"
                        }}</span>
                      </th>
                      <th
                        class="py-2 pr-4 cursor-pointer"
                        @click="setSort('email')"
                      >
                        Email
                        <span v-if="sortKey === 'email'">{{
                          sortAsc ? "⬆️" : "⬇️"
                        }}</span>
                      </th>
                      <th
                        class="py-2 pr-4 cursor-pointer"
                        @click="setSort('course')"
                      >
                        Course
                        <span v-if="sortKey === 'course'">{{
                          sortAsc ? "⬆️" : "⬇️"
                        }}</span>
                      </th>
                      <th class="py-2 cursor-pointer" @click="setSort('point')">
                        Point
                        <span v-if="sortKey === 'point'">{{
                          sortAsc ? "⬆️" : "⬇️"
                        }}</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-700">
                    <tr
                      class="border-b"
                      v-for="(user, index) in sortedLeaderboard"
                      :key="index"
                    >
                      <td class="py-5 pr-4">{{ user.rank }}</td>
                      <td class="py-5 pr-4 font-semibold text-blue-600">
                        {{ user.name }}
                      </td>
                      <td class="py-5 pr-4">{{ user.email }}</td>
                      <td class="py-5 pr-4">{{ user.course }}</td>
                      <td class="py-5 font-bold text-orange-500">
                        {{ user.point }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <RewardProgressCard />
            <CalendarWidget />
            <div class="bg-white rounded-xl p-5 shadow-sm">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-base font-semibold text-gray-900">
                  Live Sessions
                </h3>
                <a href="#" class="text-sm text-blue-600 font-medium"
                  >See all</a
                >
              </div>

              <div class="space-y-4">
                <!-- Card 1 -->
                <div class="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                  <img
                    src="/path/to/avatar1.jpg"
                    alt="Speaker"
                    class="w-14 h-14 rounded-lg object-cover"
                  />
                  <div class="flex-1">
                    <p class="font-medium text-sm text-gray-900 mb-2">
                      QnA: Design Thinking From Scratch
                    </p>
                    <div
                      class="flex flex-wrap items-center gap-2 text-xs text-gray-600"
                    >
                      <div
                        class="flex items-center bg-slate-100 px-2 py-1 rounded-md"
                      >
                        <svg
                          class="w-4 h-4 text-blue-600 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M6 2a1 1 0 100 2h8a1 1 0 100-2H6zM3 6a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6zm2 0v10h10V6H5z"
                          />
                        </svg>
                        <span>July 20, 2024</span>
                      </div>
                      <div
                        class="flex items-center bg-slate-100 px-2 py-1 rounded-md"
                      >
                        <svg
                          class="w-4 h-4 text-blue-600 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 10V6a1 1 0 112 0v4h3a1 1 0 110 2h-4a1 1 0 01-1-1z"
                          />
                        </svg>
                        <span>08:00 - 09:00 AM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Card 2 -->
                <div class="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                  <img
                    src="/path/to/avatar2.jpg"
                    alt="Speaker"
                    class="w-14 h-14 rounded-lg object-cover"
                  />
                  <div class="flex-1">
                    <p class="font-medium text-sm text-gray-900 mb-2">
                      QnA: Application of AI in UI/UX Design
                    </p>
                    <div
                      class="flex flex-wrap items-center gap-2 text-xs text-gray-600"
                    >
                      <div
                        class="flex items-center bg-slate-100 px-2 py-1 rounded-md"
                      >
                        <svg
                          class="w-4 h-4 text-blue-600 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M6 2a1 1 0 100 2h8a1 1 0 100-2H6zM3 6a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6zm2 0v10h10V6H5z"
                          />
                        </svg>
                        <span>July 20, 2024</span>
                      </div>
                      <div
                        class="flex items-center bg-slate-100 px-2 py-1 rounded-md"
                      >
                        <svg
                          class="w-4 h-4 text-blue-600 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 10V6a1 1 0 112 0v4h3a1 1 0 110 2h-4a1 1 0 01-1-1z"
                          />
                        </svg>
                        <span>08:00 - 09:00 AM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped></style>
