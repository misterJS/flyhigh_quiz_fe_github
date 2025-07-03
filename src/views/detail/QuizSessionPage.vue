<template>
  <div class="min-h-screen bg-[#f9fafb] flex flex-col justify-between">
    <!-- Top Header -->
    <div class="flex justify-between items-center p-4">
      <button @click="goBack" class="text-gray-700 text-xl">
        <i class="fas fa-arrow-left"></i>
      </button>
      <div class="flex items-center text-red-500 font-semibold">
        <i class="fas fa-heart mr-1"></i> <span>5</span>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="px-4">
      <div class="w-full bg-gray-200 h-2 rounded-full">
        <div class="h-2 bg-blue-500 rounded-full" style="width: 40%"></div>
      </div>
    </div>

    <!-- Question Box -->
    <div class="px-4 mt-6">
      <div
        class="bg-white rounded-xl shadow p-6 text-center text-[16px] text-gray-900 leading-relaxed"
      >
        Budi collected 47 marbles. Then, his father gave him 28 more marbles.
        <br />
        What is the total number of marbles Budi has now?
      </div>
    </div>

    <!-- Timer -->
    <div class="mt-4 text-center">
      <div
        class="inline-flex items-center bg-white border border-blue-500 text-blue-600 text-sm rounded-full px-3 py-1"
      >
        <i class="fas fa-clock mr-2"></i> 20 Sec
      </div>
    </div>

    <!-- Options -->
    <div class="px-4 mt-6 flex flex-col gap-4">
      <button
        v-for="(option, index) in options"
        :key="index"
        @click="selected = index"
        :class="[
          'w-full text-left px-4 py-4 rounded-lg border transition font-medium',
          selected === index
            ? 'border-blue-500 text-blue-600 bg-blue-50'
            : 'border-gray-300 bg-white text-gray-800',
        ]"
      >
        <div class="flex items-center gap-3">
          <div
            :class="[
              'w-5 h-5 rounded-full flex justify-center items-center border',
              selected === index
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-gray-400 bg-white',
            ]"
          >
            <i v-if="selected === index" class="fas fa-check text-xs"></i>
          </div>
          {{ option }}
        </div>
      </button>
    </div>

    <!-- Bottom Section -->
    <div class="px-4 py-6 border-t mt-6 flex justify-between items-center">
      <div class="text-blue-600 text-sm font-medium flex items-center gap-1">
        <i class="fas fa-check-circle"></i> Extraordinary.
      </div>
      <button
        class="bg-blue-600 text-white rounded-full px-8 py-3 text-sm font-semibold"
        @click="goFinish"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const selected = ref(null);

function goBack() {
  router.back();
}

function goFinish() {
  router.push("/quiz-finish");
}

const options = ["Sixty-five.", "Seventy-five.", "Eighty-five.", "Sixty-six."];
</script>
