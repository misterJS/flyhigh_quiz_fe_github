<script setup>
import HeaderComponent from "./base/HeaderComponent.vue";
import SidebarComponent from "./base/SidebarComponent.vue";
import ScheduleList from "./base/ScheduleListComponent.vue";
import QuizProgressList from "./base/ProgressListComponent.vue";
import RewardProgressCard from "./base/RewardCardComponent.vue";
import CalendarWidget from "./base/CalendarWidgetComponent.vue";

const leaderboard = [
  {
    rank: "🥇",
    name: "Brian Fred M.",
    email: "brianfred@email.com",
    course: "Physic",
    point: 261,
  },
  {
    rank: "🥈",
    name: "Courtney Henry",
    email: "courtney.h@email.com",
    course: "Physic",
    point: 245,
  },
  {
    rank: "🥉",
    name: "Leslie Alexander",
    email: "lie.alexander@gmail.com",
    course: "Physic",
    point: 230,
  },
  {
    rank: "4",
    name: "Jenny Wilson",
    email: "jenny.w@email.com",
    course: "Physic",
    point: 205,
  },
  {
    rank: "5",
    name: "Jenny Wilson",
    email: "jenny.w@email.com",
    course: "Physic",
    point: 197,
  },
];
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

        <div class="grid grid-cols-1 xl:grid-cols-[2fr_2fr] gap-4 mb-4">
          <ScheduleList />
          <QuizProgressList />
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4">
          <div class="bg-white rounded-xl p-5 shadow-sm">
            <h3 class="text-base font-semibold text-gray-900 mb-4">
              Leaderboard
            </h3>
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm">
                <thead class="text-gray-500 text-left">
                  <tr>
                    <th class="py-2 pr-4">Rank</th>
                    <th class="py-2 pr-4">Name</th>
                    <th class="py-2 pr-4">Email</th>
                    <th class="py-2 pr-4">Course</th>
                    <th class="py-2">Point</th>
                  </tr>
                </thead>
                <tbody class="text-gray-700">
                  <tr
                    class="border-t"
                    v-for="(user, index) in leaderboard"
                    :key="index"
                  >
                    <td class="py-2 pr-4">{{ user.rank }}</td>
                    <td class="py-2 pr-4 font-semibold text-blue-600">
                      {{ user.name }}
                    </td>
                    <td class="py-2 pr-4">{{ user.email }}</td>
                    <td class="py-2 pr-4">{{ user.course }}</td>
                    <td class="py-2 font-bold text-orange-500">
                      {{ user.point }}
                    </td>
                  </tr>
                </tbody>
              </table>
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
              <div class="space-y-3 text-sm text-gray-700">
                <div class="flex items-start gap-2">
                  <span class="text-lg">📺</span>
                  <div>
                    <p class="font-medium">QnA: Design Thinking From Scratch</p>
                    <p class="text-gray-400 text-xs">May 15, 2025 • 09:00 AM</p>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-lg">📺</span>
                  <div>
                    <p class="font-medium">Application of AI in UI/UX</p>
                    <p class="text-gray-400 text-xs">May 16, 2025 • 10:00 AM</p>
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
