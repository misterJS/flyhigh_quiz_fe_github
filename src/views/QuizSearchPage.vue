<template>
  <div class="min-h-screen bg-[#F9FAFB] flex flex-col">
    <header class="bg-white px-4 pt-12 pb-4 shadow-sm sticky top-0 z-20">
      <div class="flex items-center gap-3">
        <div ref="suggestWrapRef" class="relative flex-1">
          <div
            class="relative bg-white rounded-full border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-[#2563EB]"
          >
            <button
              type="button"
              @click="router.back()"
              class="absolute left-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full grid place-items-center text-gray-700 hover:bg-gray-50"
              aria-label="Back"
            >
              <i class="fas fa-arrow-left text-[15px]" />
            </button>
            <input
              ref="inputRef"
              v-model="searchTerm"
              type="text"
              placeholder="Search Topics"
              class="w-full h-12 pl-12 pr-24 rounded-full bg-transparent text-[15px] outline-none placeholder:text-gray-500"
              @focus="showSuggest = true"
            />
            <div class="absolute inset-y-0 right-2 flex items-center gap-1.5">
              <button
                type="button"
                class="w-9 h-9 rounded-full grid place-items-center text-[#2563EB] hover:bg-gray-50"
                @click="openFilter"
                aria-label="Filters"
              >
                <i class="fas fa-sliders-h text-[15px]" />
              </button>
            </div>
          </div>

          <div
            v-if="isSuggestOpen"
            class="absolute left-0 right-0 mt-2 bg-white border rounded-2xl shadow-lg z-30 max-h-72 overflow-auto"
            @mousedown.stop
            @touchstart.stop
          >
            <div
              v-if="subjectSuggestions.length"
              class="px-3 pt-3 pb-1 text-[11px] font-semibold text-gray-500 uppercase tracking-wide"
            >
              Subjects
            </div>
            <button
              v-for="s in subjectSuggestions"
              :key="'sub-' + s.id"
              type="button"
              class="w-full text-left px-4 py-2.5 text-[15px] hover:bg-gray-50"
              @click="applySuggestion(s.name)"
            >
              {{ s.name }}
            </button>

            <div
              v-if="suggestions.length"
              class="px-3 pt-3 pb-1 text-[11px] font-semibold text-gray-500 uppercase tracking-wide"
            >
              Suggestions
            </div>
            <button
              v-for="s in suggestions"
              :key="s.id"
              type="button"
              class="w-full text-left px-4 py-2.5 text-[15px] hover:bg-gray-50"
              @click="applySuggestion(s.title)"
            >
              {{ s.title }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 px-4 py-6 pb-32 space-y-4">
      <h1 class="text-lg font-semibold text-gray-900">Search options</h1>

      <div
        v-if="loading && !quizzes.length && !usingSuggestions"
        class="space-y-4"
      >
        <div v-for="i in 2" :key="i" class="animate-pulse">
          <div class="bg-white rounded-2xl p-4 shadow-sm">
            <div class="flex gap-3">
              <div class="w-14 h-14 rounded-xl bg-gray-200" />
              <div class="flex-1 space-y-2">
                <div class="h-4 bg-gray-200 rounded w-1/2" />
                <div class="h-3 bg-gray-200 rounded w-3/4" />
                <div class="flex items-center gap-4 pt-1">
                  <div class="h-3 bg-gray-200 rounded w-16" />
                  <div class="h-3 bg-gray-200 rounded w-14" />
                  <div class="h-6 bg-gray-200 rounded w-16 ml-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else-if="
          !visibleQuizzes.length &&
          (!searchTerm || searchTerm.trim().length < MIN_SEARCH_LEN)
        "
        class="py-12 text-center text-gray-400"
      >
        Type at least 3 characters to search.
      </div>

      <p
        v-else-if="
          !visibleQuizzes.length &&
          searchTerm &&
          searchTerm.trim().length >= MIN_SEARCH_LEN
        "
        class="py-12 text-center text-gray-400"
      >
        No quizzes match your search.
      </p>

      <div v-else class="space-y-2">
        <h2 v-if="usingSuggestions" class="text-sm text-gray-500 px-1">
          Suggestions for “{{ searchTerm }}”
        </h2>
        <div class="pt-4 pb-10">
          <div class="space-y-4">
            <div v-for="quiz in visibleQuizzes" :key="quiz.id">
              <QuizCard
                :id="quiz.id"
                :key="quiz.id"
                :image="quiz.image"
                :title="quiz.title"
                :students="quiz.submittedCount"
                :points="quiz.CreditAmount"
                :modules="quiz.totalQuiz"
                :duration="quiz.totalHour"
              />
              <div
                v-if="loading && quizzes.length"
                class="py-3 flex justify-center"
              >
                <i class="fas fa-circle-notch fa-spin text-gray-400 text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <BottomBarNavigation class="lg:hidden" />

    <div
      v-if="filterModalOpen"
      class="fixed inset-0 z-50 bg-black/30 flex justify-center items-end"
    >
      <div class="bg-white w-full max-w-md rounded-t-2xl p-0 overflow-hidden">
        <div class="pt-3">
          <div class="w-16 h-1.5 bg-gray-300 rounded-full mx-auto" />
        </div>

        <div class="px-6 pt-4 pb-2 flex items-center justify-between">
          <h3 class="font-semibold text-[15px]">Filters</h3>
          <button
            class="text-sm text-[#2563EB] font-medium"
            type="button"
            @click="resetFilter"
          >
            Reset
          </button>
        </div>

        <hr class="border-gray-100" />

        <div class="px-6 py-4">
          <div class="flex items-center gap-2 mb-3">
            <i class="fas fa-chart-bar text-gray-500" />
            <h4 class="text-sm font-semibold">Progress</h4>
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="opt in progressOptions"
              :key="opt"
              type="button"
              :class="['chip', progress === opt ? 'chip-active' : 'chip-idle']"
              @click="progress = opt"
            >
              <span>{{ opt }}</span>
              <span v-if="progress === opt" class="chip-x">A-</span>
            </button>
          </div>
        </div>

        <hr class="border-gray-100" />

        <div class="px-6 py-4">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <i class="fas fa-cubes text-gray-500" />
              <h4 class="text-sm font-semibold">
                Category ({{ categories.length || 0 }})
              </h4>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in categories"
              :key="cat.id"
              type="button"
              :class="[
                'chip',
                selectedCategories.includes(cat.id)
                  ? 'chip-active'
                  : 'chip-idle',
              ]"
              @click="toggleCategory(cat.id)"
            >
              <span>{{ cat.name }}</span>
              <span v-if="selectedCategories.includes(cat.id)" class="chip-x"
                >A-</span
              >
            </button>
          </div>
        </div>

        <hr class="border-gray-100" />

        <div class="px-6 pt-4 pb-6">
          <div class="flex items-center gap-2 mb-3">
            <i class="fas fa-book text-gray-500" />
            <h4 class="text-sm font-semibold">Grade</h4>
          </div>

          <div ref="gradeMenuRef" class="relative">
            <button
              class="w-full h-11 px-4 text-sm rounded-xl border transition flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#2563EB] border-[#CBD5E1]"
              type="button"
              @click="gradeOpen = !gradeOpen"
            >
              <span v-if="!selectedGradeText" class="text-gray-500"
                >Select grade</span
              >
              <span v-else class="text-gray-900">{{ selectedGradeText }}</span>
              <i
                :class="[
                  'fas',
                  'fa-chevron-' + (gradeOpen ? 'up' : 'down'),
                  'text-gray-400',
                ]"
              />
            </button>

            <div
              v-if="gradeOpen"
              class="absolute z-10 mt-2 w-full bg-white border rounded-xl shadow-sm max-h-64 overflow-auto"
            >
              <button
                v-for="g in grades"
                :key="g?.Id"
                type="button"
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
            type="button"
            @click="applyFilter"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
} from "vue";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import BottomBarNavigation from "@/components/base/BottomBarNavigation.vue";
import QuizCard from "@/components/base/QuizCardComponent.vue";
import { AllQuizList, QuizCategories } from "@/api/quizApi";
import { useAuthStore } from "@/stores/authStore";
import { useQuizGradeAll } from "@/stores/gradeStore";

const router = useRouter();
const auth = useAuthStore();
const quizStore = useQuizGradeAll();

const searchTerm = ref("");
const quizzes = ref([]);
const loading = ref(false);

const page = ref(1);
const totalPages = ref(1);
const pageSize = ref(12);

const filterModalOpen = ref(false);
const progress = ref("All");
const progressOptions = ["All", "Ongoing", "Completed"];
const categories = ref([]);
const selectedCategories = ref([]);
const grades = ref([]);
const grade = ref("");
const gradeOpen = ref(false);
const gradeMenuRef = ref(null);
const inputRef = ref(null);
const suggestWrapRef = ref(null);

const MIN_SEARCH_LEN = 3;
const DEBOUNCE_MS = 1000;
const SUGGESTION_LIMIT = 5;

const suggestions = ref([]);
const subjectSuggestions = ref([]);
let debounceTimer = null;

const showSuggest = ref(false);

const isActiveSearch = computed(
  () => (searchTerm.value?.trim().length ?? 0) >= MIN_SEARCH_LEN
);
const isSuggestOpen = computed(
  () =>
    showSuggest.value &&
    isActiveSearch.value &&
    (suggestions.value.length || subjectSuggestions.value.length)
);

const selectedGradeText = computed(() => {
  const selected = grades.value?.find((item) => item?.Id === grade.value);
  return selected?.GradeName || "";
});

const visibleQuizzes = computed(() => {
  if (isActiveSearch.value) {
    if (quizzes.value?.length) return quizzes.value;
    if (suggestions.value?.length) return suggestions.value;
    return [];
  }
  return quizzes.value;
});

const usingSuggestions = computed(
  () =>
    isActiveSearch.value && !quizzes.value.length && !!suggestions.value.length
);

const fetchQuizzes = async ({ reset = false } = {}) => {
  if (loading.value) return;
  if (!reset && page.value > totalPages.value) return;

  loading.value = true;

  try {
    if (reset) {
      page.value = 1;
      totalPages.value = 1;
      quizzes.value = [];
    }
    const currentPage = page.value;

    const params = {
      userId: auth.userId,
      page: currentPage,
      pageSize: pageSize.value,
    };

    if (selectedCategories.value.length)
      params.quizCategoryIds = selectedCategories.value;
    if (grade.value) params.gradeId = grade.value;

    if (isActiveSearch.value) {
      params.search = searchTerm.value.trim();
      params.suggestionLimit = SUGGESTION_LIMIT;
    }

    const response = await AllQuizList(params);

    if (isActiveSearch.value) {
      suggestions.value = response?.suggestions ?? [];
      subjectSuggestions.value = response?.subjectSuggestions ?? [];
    } else {
      suggestions.value = [];
      subjectSuggestions.value = [];
    }

    const list = response?.data?.filter((q) => (q?.totalQuiz ?? 0) > 0) ?? [];

    if (reset) quizzes.value = list;
    else quizzes.value.push(...list);

    totalPages.value = response?.totalPages ?? totalPages.value;
    page.value = currentPage + 1;
  } catch (err) {
    console.error("Failed to load quizzes:", err);
  } finally {
    loading.value = false;
  }
};

watch(searchTerm, (val) => {
  clearTimeout(debounceTimer);

  if (!val || val.trim().length < MIN_SEARCH_LEN) {
    quizzes.value = [];
    suggestions.value = [];
    subjectSuggestions.value = [];
    page.value = 1;
    totalPages.value = 1;
    return;
  }

  debounceTimer = setTimeout(() => {
    fetchQuizzes({ reset: true });
  }, DEBOUNCE_MS);
});

const applySuggestion = (text) => {
  if (!text) return;
  searchTerm.value = text;
  suggestions.value = [];
  subjectSuggestions.value = [];
  showSuggest.value = false;
  inputRef.value?.blur();
  clearTimeout(debounceTimer);
  fetchQuizzes({ reset: true });
};

const getCategories = async () => {
  try {
    const data = await QuizCategories();
    categories.value = data;
  } catch (error) {
    console.error("Failed to load categories:", error);
  }
};

const openFilter = async () => {
  filterModalOpen.value = true;
  gradeOpen.value = false;

  if (!grades.value.length) {
    try {
      const data = await quizStore.Grade();
      grades.value = data?.grade ?? [];
    } catch (error) {
      console.error("Failed to load grades:", error);
    }
  }
};

const toggleCategory = (catId) => {
  if (selectedCategories.value.includes(catId)) {
    selectedCategories.value = selectedCategories.value.filter(
      (id) => id !== catId
    );
  } else {
    selectedCategories.value.push(catId);
  }
};

const selectGrade = (id) => {
  grade.value = id;
  gradeOpen.value = false;
};

const resetFilter = () => {
  progress.value = "All";
  selectedCategories.value = [];
  grade.value = "";
  gradeOpen.value = false;
  filterModalOpen.value = false;

  if (isActiveSearch.value) fetchQuizzes({ reset: true });
};

const applyFilter = () => {
  filterModalOpen.value = false;
  gradeOpen.value = false;
  if (isActiveSearch.value) fetchQuizzes({ reset: true });
};

const onPointerDownGlobal = (e) => {
  const target = e.target;
  if (!suggestWrapRef.value) return;
  if (target && suggestWrapRef.value.contains(target)) return;
  showSuggest.value = false;
  suggestions.value = [];
  subjectSuggestions.value = [];
};

const onKeydown = (e) => {
  if (e.key === "Escape") {
    showSuggest.value = false;
    suggestions.value = [];
    subjectSuggestions.value = [];
  }
};

const onScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 80) {
    fetchQuizzes({ reset: false });
  }
  showSuggest.value = false;
  suggestions.value = [];
  subjectSuggestions.value = [];
};

onMounted(() => {
  getCategories();
  nextTick(() => inputRef.value?.focus());
  document.addEventListener("pointerdown", onPointerDownGlobal, {
    passive: true,
  });
  document.addEventListener("keydown", onKeydown);
  window.addEventListener("scroll", onScroll, { passive: true });
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onPointerDownGlobal);
  document.removeEventListener("keydown", onKeydown);
  window.removeEventListener("scroll", onScroll);
  clearTimeout(debounceTimer);
});

onBeforeRouteLeave(() => {
  showSuggest.value = false;
  suggestions.value = [];
  subjectSuggestions.value = [];
});
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
