<template>
  <div class="min-h-screen bg-[#f9fafb] flex flex-col justify-between">
    
    <div class="flex justify-between items-center p-4">
      <button @click="goBack" class="text-gray-700 text-xl">
        <i class="fas fa-arrow-left"></i>
      </button>
      <div class="flex items-center text-red-500 font-semibold">
        <i class="fas fa-heart mr-1"></i> <span>5</span>
      </div>
    </div>

    
    <div class="px-4 text-sm text-gray-600 mb-2 text-right">
      ⏱ {{ formattedTimer }}
    </div>

    
    <div class="px-4">
      <div class="w-full bg-gray-200 h-2 rounded-full">
        <div class="h-2 bg-blue-500 rounded-full" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    
    <div class="px-4 mt-6 flex flex-col gap-6">
      <div
        v-for="(question, qIndex) in paginatedQuestions"
        :key="question.questionId"
        class="bg-white rounded-xl shadow p-6"
      >
        <div class="text-[16px] text-gray-900 leading-relaxed mb-4" v-html="question.question" />
        <div v-if="question.questionImagePath" class="flex justify-center mb-4">
          <img :src="question.questionImagePath" alt="question image" class="max-h-48" />
        </div>

        
        <div class="flex flex-col gap-3">
          <button
            v-for="(opt, i) in question.answer"
            :key="i"
            @click="selectAnswer(batchStartIndex + qIndex, i)"
            :class="[
              'w-full text-left px-4 py-3 rounded-lg border transition font-medium flex items-center gap-3',
              selectedAnswers[batchStartIndex + qIndex]?.Answer === opt.Answers
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-gray-300 bg-white text-gray-800',
            ]"
          >
            
            <span
              class="answer-bullet border"
              :class="selectedAnswers[batchStartIndex + qIndex]?.Answer === opt.Answers
                        ? 'answer-bullet--on border-blue-600'
                        : 'border-gray-400 bg-white'"
            >
              <i
                v-if="selectedAnswers[batchStartIndex + qIndex]?.Answer === opt.Answers"
                class="fas fa-check text-[10px]"
              ></i>
            </span>

            <span class="block">{{ opt.Answers }}</span>
          </button>
        </div>
      </div>
    </div>

    
    <div class="px-4 py-6 border-t mt-6 flex justify-between items-center">
      <div class="text-blue-600 text-sm font-medium flex items-center gap-1">
        <i class="fas fa-check-circle"></i> {{ totalAnswered }} of {{ questions.length }} answered
      </div>
      <button
        class="bg-blue-600 text-white rounded-full px-8 py-3 text-sm font-semibold"
        :disabled="!canProceed"
        :class="{ 'opacity-50 cursor-not-allowed': !canProceed }"
        @click="goNextBatch"
      >
        {{ isLastBatch ? 'Finish' : 'Next' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { submitAnswer } from "@/api/settingApi";
import { useSnackbarStore } from "@/stores/snackbarStore";

const snackbar = useSnackbarStore();
const auth = useAuthStore();

const route = useRoute();
const router = useRouter();
const quizId = route.params.id;


const ANSWERS_KEY = `quiz:${quizId}:answers`;
const TIMER_KEY = `quiz:${quizId}:timer`;
const DEFAULT_SECONDS = 600;


const questions = ref([]);
const selectedAnswers = ref([]);
const batchSize = 5;
const batchIndex = ref(0);
const timer = ref(parseInt(localStorage.getItem(TIMER_KEY)) || DEFAULT_SECONDS);
let timerInterval = null;


const batchStartIndex = computed(() => batchIndex.value * batchSize);
const paginatedQuestions = computed(() =>
  questions.value.slice(batchStartIndex.value, batchStartIndex.value + batchSize)
);
const isLastBatch = computed(
  () => (batchIndex.value + 1) * batchSize >= questions.value.length
);
const totalAnswered = computed(
  () => selectedAnswers.value.filter((a) => a != null).length
);
const progress = computed(() =>
  questions.value.length
    ? Math.round((totalAnswered.value / questions.value.length) * 100)
    : 0
);
const canProceed = computed(
  () => !isLastBatch.value || totalAnswered.value === questions.value.length
);
const formattedTimer = computed(() => {
  const min = Math.floor(timer.value / 60);
  const sec = timer.value % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
});


function loadSavedAnswers(list) {
  const fresh = Array(list.length).fill(null);
  let saved;
  try {
    saved = JSON.parse(localStorage.getItem(ANSWERS_KEY) || "[]");
  } catch {
    saved = [];
  }
  if (Array.isArray(saved) && saved.length) {
    for (let i = 0; i < Math.min(saved.length, list.length); i++) {
      const item = saved[i];
      if (item && item.QuestionId === list[i].questionId) fresh[i] = item;
    }
  }
  selectedAnswers.value = fresh;
}
function persistAnswers() {
  localStorage.setItem(ANSWERS_KEY, JSON.stringify(selectedAnswers.value));
}
function clearStorageForThisQuiz() {
  localStorage.removeItem(ANSWERS_KEY);
  localStorage.removeItem(TIMER_KEY);
}


function selectAnswer(index, choiceIndex) {
  const q = questions.value[index];
  const choice = q?.answer?.[choiceIndex];
  if (!q || !choice) return;

  selectedAnswers.value[index] = {
    QuestionId: q.questionId,
    Choice: choice.Value,
    Answer: choice.Answers,
  };
  persistAnswers();
}

async function goNextBatch() {
  if (!isLastBatch.value) {
    batchIndex.value++;
    return;
  }
  clearInterval(timerInterval);

  const payload = JSON.parse(localStorage.getItem(ANSWERS_KEY) || "[]");
  const result = await submitAnswer(quizId, auth.userId, payload);

  if (result) {
    snackbar.trigger("Quiz Done!", "success");
    clearStorageForThisQuiz();
    router.push({
      path: "/quiz-finish",
      query: { score: result.Score, grade: result.Grade, exp: result.Exp },
    });
  } else {
    snackbar.trigger("Quiz isn't done!", "error");
  }
}

function goBack() {
  router.back();
}


onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://quiz.flyhigh.my/flyhigh_be/api/kiddo/read/GetQuizQuestion/${quizId}`
    );
    questions.value = data;
    loadSavedAnswers(data);
  } catch (err) {
    console.error("Gagal mengambil soal:", err);
  }

  timerInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
      localStorage.setItem(TIMER_KEY, String(timer.value));
    } else {
      clearInterval(timerInterval);
      snackbar.trigger("Time is up!", "error");

      submitAnswer(
        quizId,
        auth.userId,
        JSON.parse(localStorage.getItem(ANSWERS_KEY) || "[]")
      );

      clearStorageForThisQuiz();
      router.push("/quiz-finish");
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timerInterval);
});
</script>

<style scoped>

.answer-bullet {
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;          
  aspect-ratio: 1 / 1;     
  line-height: 0;          
  -webkit-tap-highlight-color: transparent;
  background: #fff;
}
.answer-bullet--on {
  background: #2563eb;
  color: #fff;
}
</style>
