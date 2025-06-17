<template>
  <div class="flex flex-col lg:flex-row min-h-screen bg-[#f9fafb]">
    <!-- Sidebar hanya muncul di desktop -->
    <SidebarComponent class="hidden lg:block" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col w-full">
      <!-- Header hanya tampil di desktop -->
      <HeaderComponent class="hidden lg:block" />

      <main class="flex-1 p-4 sm:p-6 lg:p-8 pb-24">
        <!-- Banner -->
        <section
          class="bg-[#BFDBFE] rounded-2xl p-4 sm:p-6 text-center mb-6 sm:mb-8"
        >
          <h2 class="text-lg sm:text-xl font-semibold text-[#111827]">
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

        <!-- Subjects -->
        <div class="bg-white rounded-2xl p-4 shadow-sm mb-6 lg:hidden">
          <!-- Title Row -->
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-base font-semibold text-gray-900">Subjects</h3>
            <a href="#" class="text-sm text-blue-600 font-medium">View All</a>
          </div>

          <!-- Subject Icons -->
          <div class="flex justify-between">
            <div
              v-for="subject in subjects"
              :key="subject.name"
              class="flex flex-col items-center text-center"
            >
              <div
                class="bg-gray-100 w-14 h-14 rounded-full shadow-sm flex items-center justify-center"
              >
                <img
                  :src="subject.icon"
                  alt=""
                  class="w-6 h-6 object-contain"
                />
              </div>
              <p class="text-sm mt-2 text-gray-800">{{ subject.name }}</p>
            </div>
          </div>
        </div>

        <!-- Quiz Cards Grid -->
        <section
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
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

    <!-- Bottom Navigation hanya di mobile -->
    <BottomBarNavigation class="lg:hidden" />
  </div>
</template>

<script setup>
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import HeaderComponent from "@/components/base/HeaderComponent.vue";
import QuizCard from "@/components/base/QuizCardComponent.vue";
import BottomBarNavigation from "@/components/base/BottomBarNavigation.vue";

const subjects = [
  {
    name: "Biology",
    icon: require("@/assets/image (3).png"),
  },
  {
    name: "History",
    icon: require("@/assets/image (4).png"),
  },
  {
    name: "Geography",
    icon: require("@/assets/image (5).png"),
  },
  {
    name: "Economics",
    icon: require("@/assets/image (6).png"),
  },
];

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
