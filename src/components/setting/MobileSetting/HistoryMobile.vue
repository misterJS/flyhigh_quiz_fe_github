<template>
  <div class="min-h-screen bg-[#f9fafb] p-4 pb-24">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button @click="goBack" class="text-gray-700 text-lg">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="font-normal text-lg">History</h1>
    </div>

    <!-- Today Section -->
    <div class="bg-white rounded-3xl p-5 shadow mb-6">
      <p class="font-semibold text-sm text-gray-900 mb-3">Today</p>
      <div class="space-y-4">
        <HistoryItem
          v-for="(item, idx) in todayHistory"
          :key="idx"
          :item="item"
        />
      </div>
    </div>

    <!-- Yesterday Section -->
    <div class="bg-white rounded-3xl p-5 shadow">
      <p class="font-semibold text-sm text-gray-900 mb-3">Yesterday</p>
      <div class="space-y-4">
        <HistoryItem
          v-for="(item, idx) in yesterdayHistory"
          :key="idx"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import HistoryItem from "@/components/base/HistoryItem.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back();
};

const todayHistory = [
  {
    title: "Additional Mathematics",
    description: "Suitable for small homes...",
    modul: 5,
    time: "1h 30m",
    student: 500,
    point: 120,
    status: "Completed",
  },
  {
    title: "Additional Mathematics",
    description: "Suitable for small homes...",
    modul: 5,
    time: "1h 30m",
    student: 500,
    point: 120,
    status: "Expired",
  },
  {
    title: "Additional Mathematics",
    description: "Suitable for small homes...",
    modul: 5,
    time: "1h 30m",
    student: 500,
    point: 120,
    status: "Completed",
  },
];

const yesterdayHistory = [
  {
    title: "Additional Mathematics",
    description: "Suitable for small homes...",
    modul: 5,
    time: "1h 30m",
    student: 500,
    point: 120,
    status: "Completed",
  },
];
</script>
