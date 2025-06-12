<template>
  <div class="bg-white rounded-xl p-5 shadow-sm w-full">
    <div class="flex justify-between items-center mb-5">
      <h3 class="text-base font-semibold text-gray-900">Ongoing Quiz</h3>
      <a href="#" class="text-sm text-blue-600 font-medium hover:underline"
        >See all course</a
      >
    </div>

    <ul class="space-y-4">
      <li
        v-for="(quiz, index) in quizzes"
        :key="index"
        class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
      >
        <div class="flex items-center gap-4">
          <img :src="quiz.icon" alt="Icon" class="h-10 w-10 rounded-full" />
          <div>
            <p class="text-sm font-medium text-gray-900">{{ quiz.title }}</p>
            <p class="text-sm text-blue-600">
              Sessions completed {{ quiz.completed }}/{{ quiz.total }}
            </p>
          </div>
        </div>
        <div class="relative h-12 w-12">
          <svg
            class="absolute inset-0 transform -rotate-90"
            viewBox="0 0 36 36"
          >
            <circle
              class="text-gray-200"
              stroke="currentColor"
              stroke-width="3"
              fill="transparent"
              r="16"
              cx="18"
              cy="18"
            />
            <circle
              :class="quiz.color"
              stroke="currentColor"
              stroke-width="3"
              fill="transparent"
              r="16"
              cx="18"
              cy="18"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="
                (1 - quiz.completed / quiz.total) * circumference
              "
              stroke-linecap="round"
            />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-xs font-semibold text-gray-900"
              >{{ Math.round((quiz.completed / quiz.total) * 100) }}%</span
            >
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const circumference = 2 * Math.PI * 16;

const quizzes = [
  {
    title: "Design Thinking From Scratch",
    completed: 4,
    total: 20,
    icon: new URL('@/assets/reward3.png', import.meta.url).href,
    color: "text-red-500",
  },
  {
    title: "Application of AI in UI/UX design",
    completed: 12,
    total: 17,
    icon: new URL('@/assets/reward3.png', import.meta.url).href,
    color: "text-yellow-400",
  },
  {
    title: "Figma: Create Better Design System For Your Project",
    completed: 21,
    total: 21,
    icon: new URL('@/assets/reward3.png', import.meta.url).href,
    color: "text-green-500",
  },
];
</script>

<style scoped></style>
