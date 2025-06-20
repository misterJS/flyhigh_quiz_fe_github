<template>
  <div class="min-h-screen bg-[#f9fafb] p-4 pb-24">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button class="text-gray-700 text-lg">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="font-semibold text-lg">Notification Setting</h1>
    </div>

    <!-- Card -->
    <div class="bg-white rounded-3xl p-5 shadow space-y-6">
      <!-- Daily Quiz Reminder -->
      <div class="flex justify-between items-center">
        <div>
          <p class="font-semibold text-sm text-gray-900 mb-1">
            Daily Quiz Reminder
          </p>
          <p class="text-xs text-gray-500">
            🔔 Reminds you to try a quiz every day and keep learning fun!
          </p>
        </div>
        <label class="switch">
          <input type="checkbox" v-model="dailyReminder" />
          <span class="slider round"></span>
        </label>
      </div>

      <!-- New Quiz Available -->
      <div class="flex justify-between items-center">
        <div>
          <p class="font-semibold text-sm text-gray-900 mb-1">
            New Quiz Available
          </p>
          <p class="text-xs text-gray-500">
            🎓 Get a notification when there's a new quiz or subject to explore.
          </p>
        </div>
        <label class="switch">
          <input type="checkbox" v-model="newQuiz" />
          <span class="slider round"></span>
        </label>
      </div>

      <!-- Reward Alert -->
      <div class="flex justify-between items-center">
        <div>
          <p class="font-semibold text-sm text-gray-900 mb-1">Reward Alert</p>
          <p class="text-xs text-gray-500">
            🏆 Tells you when you’re close to winning a badge or reward!
          </p>
        </div>
        <label class="switch">
          <input type="checkbox" v-model="rewardAlert" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const dailyReminder = ref(true);
const newQuiz = ref(true);
const rewardAlert = ref(true);
</script>

<!-- Custom switch style -->
<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.2s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.2s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2563eb;
}

input:checked + .slider:before {
  transform: translateX(18px);
}
</style>
