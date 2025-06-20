<template>
  <div class="min-h-screen bg-[#f9fafb] p-4 pb-24">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button class="text-gray-700 text-lg">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="font-semibold text-lg">Help and Support</h1>
    </div>

    <!-- FAQ Card -->
    <div class="bg-white rounded-3xl p-5 shadow space-y-5">
      <div>
        <p class="font-semibold text-sm text-gray-900 mb-1">FAQ</p>
        <p class="text-xs text-gray-400">
          We have already answered most of your question.
        </p>
      </div>

      <!-- Accordion Items -->
      <div v-for="(faq, index) in faqs" :key="index">
        <div
          class="flex justify-between items-center py-3 cursor-pointer"
          @click="toggle(index)"
        >
          <p class="font-medium text-sm text-gray-900">{{ faq.question }}</p>
          <i
            :class="
              openIndex === index ? 'fas fa-chevron-up' : 'fas fa-chevron-down'
            "
            class="text-xs text-gray-400"
          ></i>
        </div>

        <transition name="fade">
          <div
            v-if="openIndex === index"
            class="text-sm text-gray-500 pl-1 pb-3 leading-relaxed"
          >
            {{ faq.answer }}
          </div>
        </transition>

        <div class="border-t border-gray-100"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const openIndex = ref(null);

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

const faqs = [
  {
    question: "Can I retake a quiz I’ve already completed?",
    answer:
      "You can retake any quiz you've completed. Simply go to your profile, find the quiz under 'My Recent Match' or 'Quiz Performance,' and tap on it to start again.",
  },
  {
    question: "How do I view my quiz performance or history?",
    answer:
      "Go to your profile and select 'Quiz Performance' to view detailed reports of your quiz results.",
  },
  {
    question: "How do I report a quiz question that seems incorrect?",
    answer:
      "You can report it directly from the quiz review screen after completion.",
  },
  {
    question: "What is the meaning of the heart icons in quiz scores?",
    answer:
      "The heart icon indicates your score consistency across multiple attempts.",
  },
  {
    question: "How can I level up my account or reach new study levels?",
    answer:
      "Keep completing quizzes, participating in live sessions, and earning XP points.",
  },
  {
    question: "Are there time limits for each quiz session?",
    answer: "Yes, most quizzes have time limits indicated before you start.",
  },
];
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
