<template>
  <div class="flex flex-col lg:flex-row min-h-screen bg-[#f9fafb]">
    <!-- Sidebar desktop -->
    <SidebarComponent class="hidden lg:block" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col w-full">
      <!-- Header desktop -->
      <HeaderComponent class="hidden lg:flex" />

      <main class="flex-1 p-4 sm:p-6 lg:p-8 pb-24">
        <!-- Banner -->
        <section
          class="bg-[#BFDBFE] rounded-2xl p-4 sm:p-6 text-center mb-6 sm:mb-8 relative"
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
              class="fas fa-sliders-h absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              @click="handleFilterModalOpen"
            ></i>
          </div>
        </section>

        <!-- Subjects (only mobile) -->
        <div class="bg-white rounded-2xl p-4 shadow-sm mb-6 lg:hidden">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-base font-semibold text-gray-900">Subjects</h3>
            <a href="#" class="text-sm text-blue-600 font-medium">View All</a>
          </div>

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
              <p class="text-sm mt-2 text-gray-800">
                {{ subject.SubjectName }}
              </p>
            </div>
          </div>
        </div>

        <!-- Quiz Cards -->
        <section
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          <QuizCard
            v-for="(quiz, index) in quizzes"
            :key="index"
            :image="quiz.image"
            :title="quiz.title"
            :students="quiz.TotalStudent"
            :points="quiz.CreditAmount"
            :modules="quiz.totalQuiz"
            :duration="quiz.totalHour"
            :id="quiz.id"
          />
        </section>
      </main>
    </div>

    <!-- Bottom Nav Mobile -->
    <BottomBarNavigation class="lg:hidden" />

    <!-- Filter Modal -->
    <div
      v-if="filterModalOpen"
      class="fixed inset-0 z-50 bg-black/30 flex justify-center items-end lg:items-center"
    >
      <div class="bg-white w-full max-w-md rounded-t-2xl lg:rounded-2xl p-6">
        <div
          class="w-16 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 lg:hidden"
        ></div>
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold">Filter</h3>
          <button
            class="text-sm text-blue-600 font-medium"
            @click="resetFilter()"
          >
            Reset
          </button>
        </div>

        <!-- Progress -->
        <div class="mb-6">
          <h4 class="text-sm font-semibold mb-2">Progres</h4>
          <div class="flex flex-wrap gap-2">
            <FilterPill
              label="All"
              :active="progress === 'All'"
              @click="progress = 'All'"
            />
            <FilterPill
              label="Ongoing"
              :active="progress === 'Ongoing'"
              @click="progress = 'Ongoing'"
            />
            <FilterPill
              label="Completed"
              :active="progress === 'Completed'"
              @click="progress = 'Completed'"
            />
          </div>
        </div>

        <!-- Category -->
        <div class="mb-6">
          <h4 class="text-sm font-semibold mb-2">Category (8)</h4>
          <div class="flex flex-wrap gap-2">
            <FilterPill
              v-for="category in categories"
              :key="category"
              :label="category"
              :active="selectedCategories.includes(category)"
              @click="toggleCategory(category)"
            />
          </div>
        </div>

        <!-- Grade -->
        <div class="mb-6">
          <h4 class="text-sm font-semibold mb-2">Grade</h4>
          <select
            class="w-full border rounded-lg px-4 py-2 text-sm"
            v-model="grade"
          >
            <option disabled value="">Select grade</option>
            <option
              v-for="grade in grades"
              :key="grade?.id"
              :value="grade?.GradeName"
            >
              {{ grade?.GradeName }}
            </option>
          </select>
        </div>

        <button
          class="w-full bg-blue-600 text-white py-3 rounded-full text-sm font-semibold"
          @click="applyFilter()"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuizGradeAll } from "@/stores/gradeStore";
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import HeaderComponent from "@/components/base/HeaderComponent.vue";
import QuizCard from "@/components/base/QuizCardComponent.vue";
import BottomBarNavigation from "@/components/base/BottomBarNavigation.vue";
import FilterPill from "@/components/base/FilterPill.vue"; // Ini reusable pill
import { ref, onMounted } from "vue";
import { QuizListSubject } from "@/api/subjectApi";
import { AllQuizList } from "@/api/quizApi";
// QuizGradeAll,
// QuizPreview,
// QuizSubjectAll,
const quizzes = ref([]);
const allSubjects = ref([]);
const subjects = ref([]);
const filterModalOpen = ref(false);
const progress = ref("All");
const selectedCategories = ref(["Mathematics"]);
const grade = ref("");
const quizStore = useQuizGradeAll();
const grades = ref([{ id: 1, name: "Loading..." }]);
const getAllQuiz = async () => {
  try {
    const data = await AllQuizList();
    quizzes.value = data;
  } catch (error) {
    console.error(error);
  }
};
const getAllSubject = async () => {
  try {
    const data = await QuizListSubject();

    allSubjects.value = data;
    subjects.value = data.slice(0, 4);
  } catch (error) {
    console.error(error);
  }
};
onMounted(async () => {
  getAllQuiz();
  getAllSubject();
});

const categories = [
  "Mathematics",
  "Science",
  "History",
  "Literature",
  "Biology",
  "Art",
  "Chemistry",
  "Physics",
];

const handleFilterModalOpen = async () => {
  filterModalOpen.value = true;

  try {
    const data = await quizStore.Grade();

    grades.value = data.grade;
  } catch (err) {
    console.error("Gagal mengambil grade:", err.message);
  }
};
function toggleCategory(cat) {
  if (selectedCategories.value.includes(cat)) {
    selectedCategories.value = selectedCategories.value.filter(
      (c) => c !== cat
    );
  } else {
    selectedCategories.value.push(cat);
  }
}

function resetFilter() {
  progress.value = "All";
  selectedCategories.value = [];
  grade.value = "";
}

function applyFilter() {
  alert(
    `Filter applied:\nProgress: ${
      progress.value
    }\nCategory: ${selectedCategories.value.join(", ")}\nGrade: ${
      grade.value || "-"
    }`
  );
  filterModalOpen.value = false;
}
</script>
