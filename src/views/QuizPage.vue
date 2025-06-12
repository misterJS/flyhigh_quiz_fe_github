<template>
  <div class="flex h-screen bg-[#f9fafb]">
    <SidebarComponent />
    <div class="flex-1 flex flex-col">
      <HeaderComponent />
      <main class="flex-1 p-8">
        <section class="bg-[#BFDBFE] rounded-2xl p-6 text-center mb-8">
          <h2 class="text-xl font-semibold text-[#111827]">
            What’s the lesson for today?
          </h2>
          <div class="mt-4 relative w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search Topics"
              class="w-full py-2 px-4 pl-10 rounded-full text-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
            <i
              class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            ></i>
            <i
              class="fas fa-sliders-h absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            ></i>
          </div>
        </section>

        <section
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <QuizCard
            v-for="(quiz, index) in quizzes"
            :key="index"
            :image="quiz.image"
            :title="quiz.title"
            :students="quiz.students"
            :points="quiz.points"
            :modules="quiz.modules"
            :duration="quiz.duration"
          />
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import HeaderComponent from "@/components/base/HeaderComponent.vue";
import QuizCard from "@/components/base/QuizCardComponent.vue";

const quizzes = [
  {
    image: "photo.png",
    title: "Additional Mathematics",
    students: 500,
    points: 120,
    modules: 5,
    duration: "1h 30m",
  },
  {
    image: "photo.png",
    title: "Biology",
    students: 500,
    points: 120,
    modules: 5,
    duration: "1h 30m",
  },
  {
    image: "photo.png",
    title: "Chemistry",
    students: 500,
    points: 120,
    modules: 5,
    duration: "1h 30m",
  },
  {
    image: "photo.png",
    title: "Computer Science",
    students: 500,
    points: 120,
    modules: 5,
    duration: "1h 30m",
  },
];
</script>

<style scoped></style>
