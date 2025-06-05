<template>
  <div class="bg-white rounded-xl p-5 shadow-sm w-full">
    <h3 class="text-base font-semibold text-gray-800 mb-4">Today's schedule</h3>
    <ul class="space-y-4">
      <li v-for="(item, index) in schedules" :key="index">
        <div
          class="grid grid-cols-[auto_1fr_auto] items-start p-4 gap-4"
          :class="{
            'bg-[#f3f4f6] rounded-lg py-3 px-4': index === 0,
          }"
        >
          <div class="grid place-items-center w-12 pt-1">
            <span class="text-sm font-semibold text-gray-900">{{
              item.time
            }}</span>
          </div>

          <div class="flex items-start gap-2">
            <div
              :class="[
                'h-5 w-1 rounded-sm mt-1',
                item.lineColor === 'yellow' ? 'bg-yellow-400' : 'bg-teal-500',
              ]"
            ></div>
            <div class="overflow-hidden">
              <p class="text-xs text-gray-400 font-medium leading-tight">
                {{ item.subtitle }}
              </p>
              <p
                class="text-sm text-gray-700 font-semibold truncate leading-tight"
              >
                {{ item.title }}
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const schedules = [
  {
    time: "09:00",
    title: "One-line Drawing Me...",
    subtitle: "GDM 2nd semester",
    lineColor: "yellow",
  },
  {
    time: "12:00",
    title: "Continuous Line Drawing",
    subtitle: "GDM 4th semester",
    lineColor: "teal",
  },
  {
    time: "02:00",
    title: "One-line Drawing Method",
    subtitle: "GDM 2nd semester",
    lineColor: "yellow",
  },
  {
    time: "03:00",
    title: "Continuous Line Drawing",
    subtitle: "GDM 4th semester",
    lineColor: "teal",
  },
];
</script>

<style scoped></style>
