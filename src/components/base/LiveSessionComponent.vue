<template>
  <div class="pt-4 px-4 bg-white rounded-xl shadow mb-3">
    <div class="flex justify-between items-center mb-3">
      <h2 class="font-semibold text-lg">Live Sessions</h2>
      <a href="#" class="text-blue-600 text-sm font-medium">View All</a>
    </div>

    <Swiper
      :modules="[Pagination]"
      :slides-per-view="1.2"
      :space-between="16"
      :centered-slides="true"
      :loop="true"
      :pagination="{ clickable: true }"
      class="custom-swiper h-60 live-session-swiper"
    >
      <SwiperSlide
        v-for="(session, index) in sessions"
        :key="index"
        class="transition-transform duration-300"
      >
        <div
          class="bg-blue-600 text-white p-5 rounded-2xl relative overflow-hidden scale-95 swiper-slide-inner"
        >
          <div class="flex justify-between items-center mb-3">
            <span
              class="bg-orange-400 text-white text-xs px-3 py-1 rounded-full"
              >Tech</span
            >
            <svg
              class="w-5 h-5 text-white opacity-70"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </div>

          <h3 class="text-lg font-semibold mb-4 leading-snug">
            {{ session.title }}
          </h3>

          <div class="flex items-center justify-between text-sm mb-3 space-x-4 opacity-90">
            <div class="flex items-center space-x-1">
              <i class="fas fa-calendar-alt"></i>
              <span>{{ session.date }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <i class="fas fa-clock"></i>
              <span>{{ session.time }}</span>
            </div>
          </div>

          <div class="border-t border-white justify-items-center border-opacity-30 pt-3">
            <button class="flex items-center text-center space-x-2">
              <svg class="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span class="text-white text-base font-semibold">Watch</span>
            </button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const sessions = [
  {
    title: "QnA: Design Thinking From Scratch",
    date: "July 20, 2024",
    time: "08:00 AM",
  },
  {
    title: "QnA: Design Thinking From Scratch",
    date: "July 20, 2024",
    time: "08:00 AM",
  },
  {
    title: "QnA: Design Thinking From Scratch",
    date: "July 20, 2024",
    time: "08:00 AM",
  },
];
</script>

<style scoped>
.live-session-swiper :deep(.swiper-slide-active .swiper-slide-inner) {
  transform: scale(1.01) !important;
  z-index: 10;
}
.live-session-swiper :deep(.swiper-slide .swiper-slide-inner) {
  transform: scale(0.95);
  transition: transform 0.3s ease;
}
.custom-swiper :deep(.swiper-pagination) {
  bottom: 4px !important; 
  z-index: 1000;
}
:deep(.swiper-pagination-bullet) {
  background: rgba(254, 130, 83, 0.16); 
  width: 8px;
  height: 8px;
  opacity: 1;
  transition: all 0.3s ease;
  border-radius: 9999px;
}
:deep(.swiper-pagination-bullet-active) {
  width: 20px;
  border-radius: 100px;
  background: #FE8253;
}
</style>
