<script setup>
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import HeaderComponent from "@/components/base/HeaderComponent.vue";
import RewardCardComponent from "@/components/base/RewardCardComponent.vue";
</script>

<template>
  <div class="flex h-screen">
    <SidebarComponent />
    <div class="flex-1 flex flex-col bg-[#f9fafb]">
      <HeaderComponent />

      <main class="p-6 space-y-6 overflow-y-auto flex-1">
        <div class="relative bg-white rounded-xl overflow-hidden">
          <img
            src="../assets/Avatar.png"
            alt="Banner"
            class="w-full h-[200px] object-cover"
          />
          <button
            class="absolute top-4 right-4 bg-white text-sm p-2 rounded-full shadow"
            aria-label="Edit"
          >
            <i class="fas fa-pen text-gray-600"></i>
          </button>
        </div>

        <!-- Profile Info -->
        <div class="bg-white px-6 pt-4 pb-6 shadow-sm rounded-xl space-y-1">
          <h2 class="text-xl font-semibold text-gray-900">
            Adzami Pratama Anura
          </h2>
          <p class="text-sm text-gray-500">adzami@gmail.com</p>
          <p class="text-sm text-gray-400">Joined on April 12, 2025</p>
        </div>

        <div class="grid xl:grid-cols-[2fr_1fr] gap-4">
          <!-- Quiz Performance Table -->
          <div>
            <h3 class="text-base font-semibold text-gray-900 mb-4">
              Quiz Performance
            </h3>
            <div class="bg-white rounded-xl p-6 shadow-sm">
              <div class="overflow-x-auto">
                <table class="min-w-full text-sm text-left">
                  <thead class="bg-gray-50 text-gray-500">
                    <tr>
                      <th class="px-4 py-3 font-medium">Quiz Title</th>
                      <th class="px-4 py-3 font-medium">Date</th>
                      <th class="px-4 py-3 font-medium">Score</th>
                      <th class="px-4 py-3 font-medium">Correct</th>
                      <th class="px-4 py-3 font-medium">Incorrect</th>
                      <th class="px-4 py-3 font-medium">Time Spent</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-700 divide-y">
                    <tr class="hover:bg-gray-50">
                      <td class="px-4 py-5">Mathematics</td>
                      <td class="px-4 py-5">2023-11-01</td>
                      <td class="px-4 py-5 font-medium text-gray-900">86</td>
                      <td class="px-4 py-5">17</td>
                      <td class="px-4 py-5">3</td>
                      <td class="px-4 py-5">48 mins</td>
                    </tr>
                    <tr class="hover:bg-gray-50">
                      <td class="px-4 py-5">Biology</td>
                      <td class="px-4 py-5">2023-11-01</td>
                      <td class="px-4 py-5 font-medium text-gray-900">90</td>
                      <td class="px-4 py-5">18</td>
                      <td class="px-4 py-5">2</td>
                      <td class="px-4 py-5">42 mins</td>
                    </tr>
                    <tr class="hover:bg-gray-50">
                      <td class="px-4 py-5">Creativity</td>
                      <td class="px-4 py-5">2023-11-01</td>
                      <td class="px-4 py-5 font-medium text-gray-900">88</td>
                      <td class="px-4 py-5">16</td>
                      <td class="px-4 py-5">4</td>
                      <td class="px-4 py-5">51 mins</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Sidebar Right Column -->
          <div class="space-y-4">
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
                <li class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <img
                      src="../assets/reward3.png"
                      class="w-7 h-7 rounded-full"
                    />
                    <div class="flex flex-col">
                      <span>Design Thinking From Scratch</span>
                      <span class="text-xs text-blue-500"
                        >Sessions completed 4/20</span
                      >
                    </div>
                  </div>
                  <div
                    class="w-8 h-8 flex items-center justify-center text-[10px] font-semibold border-4 border-red-500 text-red-500 rounded-full"
                  >
                    4%
                  </div>
                </li>
                <li class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <img
                      src="../assets/reward3.png"
                      class="w-7 h-7 rounded-full"
                    />
                    <div class="flex flex-col">
                      <span>Application of AI in UI/UX design</span>
                      <span class="text-xs text-blue-500"
                        >Sessions completed 12/17</span
                      >
                    </div>
                  </div>
                  <div
                    class="w-8 h-8 flex items-center justify-center text-[10px] font-semibold border-4 border-yellow-400 text-yellow-500 rounded-full"
                  >
                    85%
                  </div>
                </li>
                <li class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <img
                      src="../assets/reward3.png"
                      class="w-7 h-7 rounded-full"
                    />
                    <div class="flex flex-col">
                      <span
                        >Figma: Create Better Design System For Your Team</span
                      >
                      <span class="text-xs text-blue-500"
                        >Sessions completed 21/21</span
                      >
                    </div>
                  </div>
                  <div
                    class="w-8 h-8 flex items-center justify-center text-[10px] font-semibold border-4 border-green-500 text-green-500 rounded-full"
                  >
                    100%
                  </div>
                </li>
              </ul>
            </div>

            <div class="bg-white rounded-xl p-5 shadow-sm space-y-4">
              <h3 class="text-sm font-semibold text-gray-900">Add Friend</h3>
              <ul class="space-y-3">
                <li class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-9 h-9 flex items-center justify-center rounded-full border text-gray-600"
                    >
                      <i class="fas fa-search text-sm"></i>
                    </div>
                    <span class="text-sm text-gray-800">Find Friend</span>
                  </div>
                  <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                </li>
                <li class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-9 h-9 flex items-center justify-center rounded-full border text-gray-600"
                    >
                      <i class="fas fa-share-alt text-sm"></i>
                    </div>
                    <span class="text-sm text-gray-800">Share Friend</span>
                  </div>
                  <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                </li>
                <li class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-9 h-9 flex items-center justify-center rounded-full border text-gray-600"
                    >
                      <i class="fas fa-paper-plane text-sm"></i>
                    </div>
                    <span class="text-sm text-gray-800">Invite Friend</span>
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

<style scoped></style>
