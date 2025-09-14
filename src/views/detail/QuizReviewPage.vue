<template>
  <div class="min-h-screen bg-[#f9fafb] flex flex-col">
    <!-- Header -->
    <div class="flex gap-2 w-full items-center p-4">
      <button @click="goBack" class="text-gray-700 text-xl">
        <i class="fas fa-arrow-left"></i>
      </button>
      <div class="w-full mt-5">
        <div class="w-full bg-gray-200 h-2 rounded-full">
          <div
            class="h-2 bg-blue-500 rounded-full"
            :style="{ width: pageProgress + '%' }"
          ></div>
        </div>
        <p class="text-xs text-gray-500 mt-1">
          Reviewing {{ endIndex }} / {{ totalQuestions }}
        </p>
      </div>
      <div class="flex items-center text-red-500 font-semibold">
        <i class="fas fa-heart mr-1"></i> <span>5</span>
      </div>
    </div>

    <!-- Review list (paged by 5) -->
    <div class="px-4 mt-6 flex-1 flex flex-col gap-6">
      <div
        v-for="q in pagedQuestions"
        :key="q.questionId"
        class="bg-white rounded-xl shadow p-6"
      >
        <div class="flex items-start justify-between gap-3 mb-3">
          <h3
            class="text-[16px] text-gray-900 leading-relaxed"
            v-html="q.question"
          />
          <!-- time chip (static demo 20s like mock) -->
          <span
            class="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap flex items-center gap-1"
          >
            <i class="far fa-clock"></i> 20 Sec
          </span>
        </div>

        <div v-if="q.image" class="flex justify-center mb-4">
          <img
            :src="q.image"
            alt="question image"
            class="max-h-48 object-contain rounded"
          />
        </div>

        <!-- Options (read-only) -->
        <div class="flex flex-col gap-3">
          <div
            v-for="opt in q.options"
            :key="`${q.questionId}-${opt.id}`"
            :class="optionRowClass(q, opt)"
          >
            <!-- bullet -->
            <span class="answer-bullet border" :class="bulletClass(q, opt)">
              <i
                v-if="isSelected(q, opt) && isCorrectChoice(q, opt)"
                class="fas fa-check text-[10px]"
              ></i>
            </span>

            <span class="block">{{ opt.text }}</span>

            <!-- status pill on the right -->
            <div
              class="ml-auto flex items-center gap-2 text-sm"
              v-if="isSelected(q, opt) && !isCorrectChoice(q, opt)"
            >
              <i class="fas fa-times-circle"></i>
              <span>Wrong answer</span>
            </div>
            <div
              class="ml-auto flex items-center gap-2 text-sm"
              v-else-if="isCorrectChoice(q, opt)"
            >
              <i class="fas fa-check-circle"></i>
              <span>Correct</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Nav -->
    <div
      class="px-4 py-4 border-t bg-white mt-6 flex items-center justify-between"
    >
      <button
        class="text-sm font-semibold text-gray-600 px-4 py-2 rounded-full border border-gray-300"
        :disabled="page === 0"
        :class="{ 'opacity-50 cursor-not-allowed': page === 0 }"
        @click="prevPage"
      >
        Previous
      </button>

      <button
        class="bg-blue-600 text-white rounded-full px-8 py-3 text-sm font-semibold"
        @click="nextOrFinish"
      >
        {{ isLastPage ? "Finish" : "Next" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { GetQuizReview } from "@/api/quizApi";

// ---- routing ----
const route = useRoute();
const router = useRouter();

// Optional params if you want to fetch by GUID or startId
// const guid = route.query.guid || route.params.guid || null
const startId = route.query.startId || route.params.startId || null;

// ---- state ----
const review = ref({ totalQuestions: 0, questions: [] });
const page = ref(0);
const PAGE_SIZE = 5;

// ---- computed ----
const totalQuestions = computed(() => review.value?.totalQuestions ?? 0);
const startIndex = computed(() => page.value * PAGE_SIZE);
const endIndex = computed(() =>
  Math.min(startIndex.value + PAGE_SIZE, totalQuestions.value)
);
const isLastPage = computed(() => endIndex.value >= totalQuestions.value);

const pageProgress = computed(() => {
  if (!totalQuestions.value) return 0;
  return Math.round((endIndex.value / totalQuestions.value) * 100);
});

const pagedQuestions = computed(() => {
  const list = review.value?.questions || [];
  return list.slice(startIndex.value, endIndex.value);
});

// ---- helpers to compute styles ----
function isSelected(q, opt) {
  return q.selectedChoice === opt.id;
}
function isCorrectChoice(q, opt) {
  return q.correctChoice === opt.id;
}

function optionRowClass(q, opt) {
  const base =
    "w-full text-left px-4 py-3 rounded-lg border transition font-medium flex items-center gap-3";
  const selected = isSelected(q, opt);
  const correct = isCorrectChoice(q, opt);

  // Correct choice is always green in review
  if (correct) return `${base} border-green-500 bg-green-50 text-green-700`;

  // Wrong selected choice is red
  if (selected && !correct)
    return `${base} border-red-400 bg-red-50 text-red-700`;

  // Neutral others
  return `${base} border-gray-300 bg-white text-gray-800`;
}

function bulletClass(q, opt) {
  const selected = isSelected(q, opt);
  const correct = isCorrectChoice(q, opt);
  if (correct)
    return "answer-bullet--on border-green-600 bg-green-600 text-white";
  if (selected && !correct) return "border-red-500";
  return "border-gray-400 bg-white";
}

// ---- navigation ----
function prevPage() {
  if (page.value > 0) page.value--;
}
function nextOrFinish() {
  if (isLastPage.value) {
    // adapt the route name/path to your app
    router.back();
  } else {
    page.value++;
  }
}
function goBack() {
  router.back();
}

// ---- data fetching ----
function normalizeReview(raw) {
  const list = raw?.questions || raw?.Questions || [];
  const normalized = list.map((q, idx) => {
    const optionsRaw = q.options || q.answer || q.Answers || [];
    // try to infer selected & correct ids
    const inferredSelected =
      q.selectedChoice ??
      optionsRaw.find((o) => o.isSelected)?.id ??
      optionsRaw.find((o) => o.isSelected)?.Id ??
      optionsRaw.find((o) => o.isSelected)?.Value ??
      null;

    const inferredCorrect =
      q.correctChoice ??
      optionsRaw.find((o) => o.isCorrect)?.id ??
      optionsRaw.find((o) => o.isCorrect)?.Id ??
      optionsRaw.find((o) => o.isCorrect)?.Value ??
      null;

    const options = optionsRaw.map((o) => ({
      id: o.id ?? o.Id ?? o.Value ?? o.value ?? o.choiceId,
      text: o.text ?? o.Answers ?? o.answer ?? o.label ?? String(o),
      isCorrect: Boolean(o.isCorrect),
      isSelected: Boolean(o.isSelected),
    }));

    return {
      questionId: q.questionId ?? q.QuestionId ?? q.id ?? q.number ?? idx + 1,
      number: q.number ?? idx + 1,
      question: q.question ?? q.Question ?? q.text ?? "",
      image: q.image || q.questionImagePath || q.Image || "",
      selectedChoice: inferredSelected,
      correctChoice: inferredCorrect,
      isCorrect:
        q.isCorrect ??
        (inferredSelected != null && inferredSelected === inferredCorrect),
      options,
    };
  });

  return {
    totalQuestions: raw?.totalQuestions ?? normalized.length,
    questions: normalized,
  };
}

async function fetchReview() {
  try {
    if (!startId) throw new Error("startId is required to fetch review");

    const wrongOnly =
      route.query.wrongOnly === "false" || route.query.wrongOnly === false;

    const data = await GetQuizReview({ startId, wrongOnly });
    review.value = normalizeReview(data);
  } catch (err) {
    console.error("Failed to fetch review:", err);
    review.value = { totalQuestions: 0, questions: [] };
  }
}

onMounted(fetchReview);
</script>

<style scoped>
/* Keep the bullet perfectly round, independent of parent line-height or flex sizing */
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

/* Right-side status pill colors inherit from row */
div.border-green-500 > .ml-auto {
  color: #047857;
}
div.border-red-400 > .ml-auto {
  color: #b91c1c;
}
</style>
