<script setup>
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import HeaderComponent from "@/components/base/HeaderComponent.vue";
import CalendarWidgetComponent from "@/components/base/CalendarWidgetComponent.vue";
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <SidebarComponent />
    <div class="flex-1 flex flex-col bg-[#f9fafb]">
      <HeaderComponent />

      <main class="p-6 pt-4 space-y-6 overflow-y-auto flex-1">
        
        <div class="grid xl:grid-cols-[3fr_1fr] gap-6 items-start">
          <div class="space-y-4">
            <div class="relative">
              <input
                type="text"
                placeholder="Search Quiz"
                class="w-full pl-10 pr-4 py-2 border rounded-lg bg-white shadow-sm text-sm"
              />
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>

            <div class="bg-blue-600 rounded-2xl px-6 py-8 text-white text-center relative overflow-hidden">
              <h2 class="text-2xl font-bold mb-1">Introduction & Quizz</h2>
              <p class="text-sm text-white/80 mb-4">
                Learn the basic and become top student
              </p>
              <button class="bg-white text-blue-600 text-sm px-4 py-2 rounded-lg font-semibold">
                Start Quiz
              </button>
            </div>
          </div>

          
          <div class="w-full xl:w-72 shrink-0">
            <CalendarWidgetComponent class="h-full" />
          </div>
        </div>

        
        <div class="grid xl:grid-cols-[3fr_1fr] gap-6">
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold text-gray-900">All Courses</h3>
              <div class="flex gap-2">
                <button class="px-3 py-1 text-sm text-gray-600 bg-white border rounded-full">Filters</button>
                <button class="px-3 py-1 text-sm text-gray-600 bg-white border rounded-full">Recommendation</button>
              </div>
            </div>

            <div class="flex gap-2 flex-wrap">
              <button
                v-for="cat in ['Mathematics','Physics','Chemistry','Language','Biology','History']"
                :key="cat"
                :class="[
                  'px-3 py-1 text-sm rounded-full transition',
                  cat === 'Mathematics'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border'
                ]"
              >
                {{ cat }}
              </button>
            </div>

            <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div
                v-for="i in 6"
                :key="i"
                class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-2"
              >
                <img
                  src="../assets/photo.png"
                  class="rounded-lg w-full h-36 object-cover"
                />
                <div class="flex items-center justify-between text-xs text-gray-500">
                  <span>5 Modul</span>
                  <span>1h 30m</span>
                </div>
                <h4 class="text-sm font-semibold text-gray-800 leading-snug">
                  Advanced Math Concepts
                </h4>
                <p class="text-xs text-blue-500">Kindergarden 2</p>
              </div>
            </div>
          </div>

          
          <div class="space-y-4">
            <div class="bg-white rounded-2xl p-5 shadow-sm space-y-5">
              <h3 class="text-base font-semibold text-gray-900">Continue Quizz</h3>
              <ul class="space-y-4">
                <li v-for="quiz in quizzes" :key="quiz.title">
                  <div class="flex gap-3 items-center">
                    <img
                      src="../assets/photo.png"
                      class="w-10 h-10 rounded-md object-cover"
                    />
                    <div class="flex-1">
                      <p class="font-medium text-gray-800 leading-tight">{{ quiz.title }}</p>
                      <div class="text-xs text-gray-400 flex justify-between">
                        <span>{{ quiz.completed }}/{{ quiz.total }} Quiz</span>
                        <span>{{ quiz.progress }}%</span>
                      </div>
                      <div class="h-2 bg-gray-200 rounded-full mt-1">
                        <div
                          class="h-2 bg-blue-600 rounded-full"
                          :style="{ width: quiz.progress + '%' }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
const quizzes = [
  {
    title: "Additional Mathematics Education Chapter 1",
    completed: 17,
    total: 25,
    progress: 52,
  },
  {
    title: "Advanced Physics Education Chapter 2",
    completed: 12,
    total: 25,
    progress: 40,
  },
  {
    title: "Chemistry Basics Education",
    completed: 15,
    total: 25,
    progress: 60,
  },
];
</script>

<style scoped></style>
