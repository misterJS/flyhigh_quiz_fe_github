<template>
  <div class="bg-white rounded-xl p-5 shadow-sm w-full">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-base font-semibold text-gray-900">Calendar</h3>
      <div class="flex items-center gap-1 text-sm text-gray-600">
        <button @click="prevMonth" class="px-1 hover:text-gray-800">‹</button>
        <span class="font-medium">{{ monthYearLabel }}</span>
        <button @click="nextMonth" class="px-1 hover:text-gray-800">›</button>
      </div>
    </div>

    <div class="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
      <div v-for="day in weekDays" :key="day">{{ day }}</div>
    </div>

    <div class="grid grid-cols-7 gap-1 text-center text-sm">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        class="py-1.5 rounded-lg cursor-pointer"
        :class="{
          'text-gray-300': !day.currentMonth,
          'bg-teal-600 text-white font-semibold': day.isToday,
          'hover:bg-gray-100 text-gray-700': day.currentMonth && !day.isToday,
        }"
      >
        {{ day.date.getDate() }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const today = new Date();
const current = ref(new Date(today.getFullYear(), today.getMonth(), 1));

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const monthYearLabel = computed(() =>
  current.value.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })
);

function prevMonth() {
  current.value = new Date(
    current.value.getFullYear(),
    current.value.getMonth() - 1,
    1
  );
}

function nextMonth() {
  current.value = new Date(
    current.value.getFullYear(),
    current.value.getMonth() + 1,
    1
  );
}

const calendarDays = computed(() => {
  const start = new Date(current.value);
  const startDay = (start.getDay() + 6) % 7;
  start.setDate(1 - startDay);

  const days = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    days.push({
      date,
      currentMonth: date.getMonth() === current.value.getMonth(),
      isToday: date.toDateString() === new Date().toDateString(),
    });
  }
  return days;
});
</script>

<style scoped></style>
