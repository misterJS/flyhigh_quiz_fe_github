<template>
  <div class="min-h-screen bg-[#f9fafb] flex flex-col justify-between">
    <!-- Header -->
    <div class="flex justify-between items-center p-4">
      <button @click="goBack" class="text-gray-700 text-xl">
        <i class="fas fa-arrow-left"></i>
      </button>
      <div class="flex items-center text-red-500 font-semibold">
        <i class="fas fa-heart mr-1"></i> <span>5</span>
      </div>
    </div>

    <!-- Timer -->
    <div class="px-4 text-sm text-gray-600 mb-2 text-right">
      ⏱ {{ formattedTimer }}
    </div>

    <!-- Progress Bar -->
    <div class="px-4">
      <div class="w-full bg-gray-200 h-2 rounded-full">
        <div
          class="h-2 bg-blue-500 rounded-full"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    </div>

    <!-- Soal Batch -->
    <div class="px-4 mt-6 flex flex-col gap-6">
      <div
        v-for="(question, qIndex) in paginatedQuestions"
        :key="question.questionId"
        class="bg-white rounded-xl shadow p-6"
      >
        <div
          class="text-[16px] text-gray-900 leading-relaxed mb-4"
          v-html="question.question"
        ></div>
        <div v-if="question.questionImagePath" class="flex justify-center mb-4">
          <img
            :src="question.questionImagePath"
            alt="question image"
            class="max-h-48"
          />
        </div>

        <!-- Pilihan Jawaban -->
        <div class="flex flex-col gap-3">
          <button
            v-for="(opt, i) in question.answer"
            :key="i"
            @click="selectAnswer(batchStartIndex + qIndex, i)"
            :class="[
              'w-full text-left px-4 py-3 rounded-lg border transition font-medium',
              selectedAnswers[batchStartIndex + qIndex]?.Answer === opt.Answers
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-gray-300 bg-white text-gray-800',
            ]"
          >
            <div class="flex items-center gap-3">
              <div
                :class="[
                  'w-5 h-5 rounded-full flex justify-center items-center border',
                  selectedAnswers[batchStartIndex + qIndex]?.Answer ===
                  opt.Answers
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-400 bg-white',
                ]"
              >
                <i
                  v-if="
                    selectedAnswers[batchStartIndex + qIndex]?.Answer ===
                    opt.Answers
                  "
                  class="fas fa-check text-xs"
                ></i>
              </div>
              {{ opt.Answers }}
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="px-4 py-6 border-t mt-6 flex justify-between items-center">
      <div class="text-blue-600 text-sm font-medium flex items-center gap-1">
        <i class="fas fa-check-circle"></i> {{ totalAnswered }} of
        {{ questions.length }} answered
      </div>
      <button
        class="bg-blue-600 text-white rounded-full px-8 py-3 text-sm font-semibold"
        :disabled="!canProceed"
        :class="{ 'opacity-50 cursor-not-allowed': !canProceed }"
        @click="goNextBatch"
      >
        {{ isLastBatch ? "Finish" : "Next" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
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

const questions = ref([]);
const selectedAnswers = ref([]);
const batchSize = 5;
const batchIndex = ref(0);
const timer = ref(parseInt(localStorage.getItem("quiz_timer")) || 600);

let timerInterval = null;

const batchStartIndex = computed(() => batchIndex.value * batchSize);
const paginatedQuestions = computed(() =>
  questions.value.slice(
    batchStartIndex.value,
    batchStartIndex.value + batchSize
  )
);
const isLastBatch = computed(
  () => (batchIndex.value + 1) * batchSize >= questions.value.length
);
const totalAnswered = computed(
  () =>
    selectedAnswers.value.filter((a) => a !== null && a !== undefined).length
);
const progress = computed(() =>
  Math.round((totalAnswered.value / questions.value.length) * 100)
);
const canProceed = computed(
  () => !isLastBatch.value || totalAnswered.value === questions.value.length
);
const formattedTimer = computed(() => {
  const min = Math.floor(timer.value / 60);
  const sec = timer.value % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
});

function selectAnswer(index, choiceIndex) {
  const question = questions.value[index];
  const selectedChoice = question.answer[choiceIndex];

  if (question && selectedChoice) {
    selectedAnswers.value[index] = {
      QuestionId: question.questionId,
      Choice: selectedChoice.Value,
      Answer: selectedChoice.Answers,
    };

    localStorage.setItem(
      "selected_answers",
      JSON.stringify(selectedAnswers.value)
    );
  }
}

async function goNextBatch() {
  if (!isLastBatch.value) {
    batchIndex.value++;
  } else {
    const result = await submitAnswer(
      quizId,
      auth.userId,
      JSON.parse(localStorage.getItem("selected_answers"))
    );

    clearInterval(timerInterval);

    if (result) {
      snackbar.trigger("Quiz Done!", "success");
      router.push({
        path: "/quiz-finish",
        query: {
          score: result.Score,
          grade: result.Grade,
          exp: result.Exp,
        },
      });
      localStorage.removeItem("quiz_timer");
      localStorage.removeItem("selected_answers");
    } else {
      snackbar.trigger("Quiz isn't done!", "error");
    }
  }
}

function goBack() {
  router.back();
}

onMounted(async () => {
  try {
    const res = await axios.get(
      `https://quiz.flyhigh.my/flyhigh_be/api/kiddo/read/GetQuizQuestion/${quizId}`
    );
    questions.value = res.data;
    selectedAnswers.value =
      JSON.parse(localStorage.getItem("selected_answers")) ||
      Array(res.data.length).fill(null);
  } catch (err) {
    console.error("Gagal mengambil soal:", err);
  }

  timerInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
      localStorage.setItem("quiz_timer", timer.value.toString());
    } else {
      clearInterval(timerInterval); 
      snackbar.trigger("Time is up!", "error");

      submitAnswer(
        quizId,
        auth.userId,
        JSON.parse(localStorage.getItem("selected_answers"))
      );

      localStorage.removeItem("quiz_timer");
      localStorage.removeItem("selected_answers");

      router.push("/quiz-finish");
    }
  }, 1000);
});
</script>
