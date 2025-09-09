<template>
  <div class="flex flex-col lg:flex-row min-h-screen bg-[#f9fafb]">
    
    <SidebarComponent class="hidden lg:block" />

    
    <div class="flex-1 flex flex-col w-full">
      
      <HeaderComponent class="hidden lg:flex" />

      <main class="flex-1 p-4 sm:p-6 lg:p-8 pb-24">
        
        <section class="bg-[#BFDBFE] rounded-2xl p-4 sm:p-6 text-center mb-6 sm:mb-8 relative">
          <h2 class="text-lg sm:text-xl font-semibold text-[#111827]">
            What’s the lesson for today?
          </h2>
          <div class="mt-4 relative w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search Topics"
              class="w-full py-2 px-4 pl-10 rounded-full text-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <i
              class="fas fa-sliders-h absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              @click="handleFilterModalOpen"
            ></i>
          </div>
        </section>

        
        <div class="bg-white rounded-2xl p-4 shadow-sm mb-6 lg:hidden">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-base font-semibold text-gray-900">Subjects</h3>
            <a href="/subject-all" class="text-sm text-blue-600 font-medium">View All</a>
          </div>

          <div class="flex justify-between">
            <div
              v-for="subject in subjects"
              :key="subject.name"
              class="flex flex-col items-center text-center"
            >
              <div class="bg-gray-100 w-14 h-14 rounded-full shadow-sm flex items-center justify-center">
                <img :src="`/subjects/${subject.SubjectName}.png`" alt="" class="w-[52px] h-[52px] object-contain" />
              </div>
              <p class="text-sm mt-2 text-gray-800">
                {{ subject.SubjectName }}
              </p>
            </div>
          </div>
        </div>

        
        <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <QuizCard
            v-for="(quiz, index) in quizzes"
            :key="index"
            :image="quiz.image"
            :title="quiz.title"
            :students="quiz.submittedCount"
            :points="quiz.CreditAmount"
            :modules="quiz.totalQuiz"
            :duration="quiz.totalHour"
            :id="quiz.id"
          />
          <div v-if="loading" class="text-center py-4 text-gray-600">Loading more quizzes...</div>
        </section>
      </main>
    </div>

    
    <BottomBarNavigation class="lg:hidden" />

    
    <div
      v-if="filterModalOpen"
      class="fixed inset-0 z-50 bg-black/30 flex justify-center items-end lg:items-center"
    >
      <div class="bg-white w-full max-w-md rounded-t-2xl lg:rounded-2xl p-0 overflow-hidden">
        
        <div class="lg:hidden pt-3">
          <div class="w-16 h-1.5 bg-gray-300 rounded-full mx-auto"></div>
        </div>

        
        <div class="px-6 pt-4 pb-2 flex items-center justify-between">
          <h3 class="font-semibold text-[15px]">Filters</h3>
          <button class="text-sm text-[#2563EB] font-medium" @click="resetFilter()">Reset</button>
        </div>

        <hr class="border-gray-100" />

        
        <div class="px-6 py-4">
          <div class="flex items-center gap-2 mb-3">
            <i class="fas fa-chart-bar text-gray-500"></i>
            <h4 class="text-sm font-semibold">Progres</h4>
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="opt in progressOptions"
              :key="opt"
              @click="progress = opt"
              :class="[
                'chip',
                progress === opt ? 'chip-active' : 'chip-idle'
              ]"
            >
              <span>{{ opt }}</span>
              <span v-if="progress === opt" class="chip-x">×</span>
            </button>
          </div>
        </div>

        <hr class="border-gray-100" />

        
        <div class="px-6 py-4">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <i class="fas fa-cubes text-gray-500"></i>
              <h4 class="text-sm font-semibold">
                Category ({{ categories.length || 0 }})
              </h4>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in categories"
              :key="cat.id"
              @click="toggleCategory(cat.id)"
              :class="[
                'chip',
                selectedCategories.includes(cat.id) ? 'chip-active' : 'chip-idle'
              ]"
            >
              <span>{{ cat.name }}</span>
              <span v-if="selectedCategories.includes(cat.id)" class="chip-x">×</span>
            </button>
          </div>
        </div>

        <hr class="border-gray-100" />

        
        <div class="px-6 pt-4 pb-6">
          <div class="flex items-center gap-2 mb-3">
            <i class="fas fa-book text-gray-500"></i>
            <h4 class="text-sm font-semibold">Grade</h4>
          </div>

          
          <div class="relative" ref="gradeMenuRef">
            <button
              class="w-full h-11 px-4 text-sm rounded-xl border transition
                     flex items-center justify-between
                     focus:outline-none focus:ring-2 focus:ring-[#2563EB] border-[#CBD5E1]"
              @click="gradeOpen = !gradeOpen"
            >
              <span class="text-gray-500" v-if="!selectedGradeText">Select grade</span>
              <span v-else class="text-gray-900">{{ selectedGradeText }}</span>
              <i :class="['fas', 'fa-chevron-' + (gradeOpen ? 'up' : 'down'), 'text-gray-400']"></i>
            </button>

            
            <div
              v-if="gradeOpen"
              class="absolute z-10 mt-2 w-full bg-white border rounded-xl shadow-sm max-h-64 overflow-auto"
            >
              <button
                v-for="g in grades"
                :key="g?.Id"
                class="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                @click="selectGrade(g?.Id)"
              >
                {{ g?.GradeName }}
              </button>
            </div>
          </div>
        </div>

        <div class="px-6 pb-6">
          <button
            class="w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white h-11 rounded-full text-sm font-semibold"
            @click="applyFilter()"
          >
            Continue
          </button>
        </div>
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
import { useAuthStore } from "@/stores/authStore";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { QuizListSubject } from "@/api/subjectApi";
import { AllQuizList, QuizCategories } from "@/api/quizApi";

const quizzes = ref([]);
const allSubjects = ref([]);
const categories = ref([]);
const subjects = ref([]);
const filterModalOpen = ref(false);


const progress = ref("All");
const progressOptions = ["All", "Ongoing", "Completed"];


const selectedCategories = ref([]);


const grade = ref("");
const gradeOpen = ref(false);
const gradeMenuRef = ref(null);
const selectedGradeText = computed(() => {
  const g = grades.value?.find((x) => x?.Id === grade.value);
  return g?.GradeName || "";
});


const quizStore = useQuizGradeAll();
const auth = useAuthStore();
const grades = ref([{ id: 1, GradeName: "Loading..." }]);


const page = ref(1);
const pageSize = ref(10);
const totalPages = ref(1);
const loading = ref(false);

const getAllQuiz = async (isLoadMore = false) => {
  if (loading.value || (isLoadMore && page.value > totalPages.value)) return;
  loading.value = true;

  try {
    const params = {
      userId: auth.userId,
      page: page.value,
      pageSize: pageSize.value,
    };

    if (selectedCategories.value.length > 0) {
      params.quizCategoryIds = selectedCategories.value;
    }

    if (grade.value) {
      params.gradeId = grade.value;
    }

    const data = await AllQuizList(params);

    const list = data.data.filter((quiz) => quiz.totalQuiz > 0);
    if (!isLoadMore) {
      quizzes.value = list;
    } else {
      quizzes.value.push(...list);
    }

    totalPages.value = data.totalPages;
    page.value++;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
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


const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 50) {
    getAllQuiz(true);
  }
};

onMounted(() => {
  getAllQuiz();
  getCategories();
  getAllSubject();
  window.addEventListener("scroll", handleScroll);
  document.addEventListener("click", onClickAway);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("click", onClickAway);
});

const onClickAway = (e) => {
  if (!gradeMenuRef.value) return;
  if (!gradeMenuRef.value.contains(e.target)) gradeOpen.value = false;
};

const getCategories = async () => {
  try {
    const res = await QuizCategories();
    categories.value = res;
  } catch (err) {
    console.error("Gagal mengambil kategori:", err.message);
  }
};

const handleFilterModalOpen = async () => {
  filterModalOpen.value = true;
  try {
    const data = await quizStore.Grade();
    grades.value = data.grade;
  } catch (err) {
    console.error("Gagal mengambil grade:", err.message);
  }
};

let handling = false;
function toggleCategory(catId) {
  if (handling) return;
  handling = true;

  if (selectedCategories.value.includes(catId)) {
    selectedCategories.value = selectedCategories.value.filter((id) => id !== catId);
  } else {
    selectedCategories.value.push(catId);
  }
  setTimeout(() => (handling = false), 0);
}

function selectGrade(id) {
  grade.value = id;
  gradeOpen.value = false;
}

function resetFilter() {
  progress.value = "All";
  selectedCategories.value = [];
  grade.value = "";
  page.value = 1;
  getAllQuiz(false);
}

function applyFilter() {
  page.value = 1;
  quizzes.value = [];
  getAllQuiz(false);
  filterModalOpen.value = false;
}
</script>

<style scoped>

.chip {
  @apply inline-flex items-center gap-2 px-3 h-8 rounded-full text-sm transition border;
}
.chip-idle {
  @apply bg-white border-gray-200 text-gray-700 hover:bg-gray-50;
}
.chip-active {
  @apply bg-[#2563EB] border-[#2563EB] text-white;
}
.chip-x {
  @apply inline-flex items-center justify-center rounded-full bg-transparent px-1 leading-none;
}
</style>
