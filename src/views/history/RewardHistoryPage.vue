<template>
  <div class="flex h-screen bg-[#f9fafb]">
    <SidebarComponent />
    <div class="flex-1 flex flex-col">
      <HeaderComponent />
      <main class="flex-1 p-8">
        <div class="mx-auto">
          <router-link
            to="/rewards"
            class="text-sm text-[#2563EB] flex items-center gap-1 mb-4"
          >
            <i class="fas fa-arrow-left"></i> Back
          </router-link>

          <h1 class="text-2xl font-semibold text-[#111827] mb-6">
            Rewards History
          </h1>

          <!-- Tabs & Actions -->
          <div class="flex justify-between items-center mb-4 flex-wrap gap-4">
            <div class="flex items-center gap-6">
              <button
                class="text-sm font-semibold text-[#2563EB] border-b-2 border-[#2563EB] pb-1"
              >
                All
              </button>
              <button class="text-sm text-gray-500 hover:text-[#2563EB]">
                Redeemed
              </button>
              <button class="text-sm text-gray-500 hover:text-[#2563EB]">
                Expired
              </button>
            </div>

            <div class="flex items-center gap-3 w-full justify-between">
              <div class="relative w-[260px]">
                <input
                  type="text"
                  placeholder="Search.."
                  class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full text-sm bg-white placeholder:text-gray-400 shadow-sm"
                />
                <i
                  class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                ></i>
              </div>
              <div class="flex gap-3">
                <select
                  class="text-sm rounded-full border border-gray-300 px-4 py-2 bg-white"
                >
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
                <button
                  class="text-sm text-red-600 font-medium flex items-center gap-1"
                >
                  <i class="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>

          <!-- Rewards List -->
          <div class="space-y-4">
            <div
              v-for="(item, index) in rewards"
              :key="index"
              class="bg-white rounded-2xl px-6 py-4 shadow-sm flex items-center justify-between"
            >
              <div class="flex items-center gap-4 w-[260px]">
                <input type="checkbox" class="accent-[#2563EB]" />
                <img
                  :src="item.image"
                  class="w-12 h-12 rounded-lg object-cover"
                  alt="reward item"
                />
                <div>
                  <p class="text-[11px] text-gray-400 font-medium">
                    Reward Item
                  </p>
                  <p class="text-sm font-semibold text-[#111827]">
                    {{ item.name }}
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-5 gap-6 flex-1 text-sm text-gray-700">
                <div>
                  <p class="text-[11px] text-gray-400 font-medium">
                    Redemption Date
                  </p>
                  <p class="font-medium text-[#111827]">{{ item.date }}</p>
                </div>
                <div>
                  <p class="text-[11px] text-gray-400 font-medium">
                    Points Used
                  </p>
                  <p class="font-medium text-[#111827]">{{ item.used }} XP</p>
                </div>
                <div>
                  <p class="text-[11px] text-gray-400 font-medium">
                    Points Remaining
                  </p>
                  <p class="font-medium text-[#111827]">
                    {{ item.remaining }} XP
                  </p>
                </div>
                <div>
                  <p class="text-[11px] text-gray-400 font-medium">
                    Source of Points
                  </p>
                  <p class="font-medium text-[#111827]">{{ item.source }}</p>
                </div>
                <div>
                  <p class="text-[11px] text-gray-400 font-medium">Status</p>
                  <span
                    class="text-xs font-semibold px-3 py-1 rounded-full"
                    :class="
                      item.status === 'Success'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    "
                  >
                    {{ item.status }}
                  </span>
                </div>
              </div>

              <button class="text-gray-400 hover:text-gray-600">
                <i class="fas fa-ellipsis-v"></i>
              </button>
            </div>
          </div>

          <!-- Pagination Footer -->
          <div
            class="flex justify-between items-center mt-8 text-sm text-gray-500"
          >
            <p>Show 9 from 1400</p>
            <div class="flex items-center gap-2">
              <button
                class="w-8 h-8 rounded-md bg-white border border-gray-300 text-[#2563EB] font-semibold"
              >
                1
              </button>
              <button class="w-8 h-8 rounded-md bg-white text-gray-500">
                2
              </button>
              <button class="w-8 h-8 rounded-md bg-white text-gray-500">
                3
              </button>
              <span class="text-gray-400">...</span>
              <button class="w-8 h-8 rounded-md bg-white text-gray-500">
                10
              </button>
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

const rewards = [
  {
    name: "Colored Pencils",
    image: "@/assets/item1.png",
    date: "24 Feb 22",
    used: 120,
    remaining: 30,
    source: "Art Quiz",
    status: "Success",
  },
  {
    name: "Ruler",
    image: "@/assets/item2.png",
    date: "24 Feb 22",
    used: 40,
    remaining: 30,
    source: "Math Quiz",
    status: "Success",
  },
  {
    name: "A5 Notebook",
    image: "@/assets/item3.png",
    date: "24 Feb 22",
    used: 80,
    remaining: 30,
    source: "English Quiz",
    status: "Success",
  },
  {
    name: "Eraser",
    image: "@/assets/item4.png",
    date: "24 Feb 22",
    used: 30,
    remaining: 60,
    source: "Science Quiz",
    status: "Success",
  },
  {
    name: "Mechanical Pencil",
    image: "@/assets/item5.png",
    date: "24 Feb 22",
    used: 100,
    remaining: 140,
    source: "Civics Quiz",
    status: "Success",
  },
  {
    name: "Pencil Sharpener",
    image: "@/assets/item6.png",
    date: "24 Feb 22",
    used: 50,
    remaining: 180,
    source: "Bahasa Quiz",
    status: "Failed",
  },
];
</script>
