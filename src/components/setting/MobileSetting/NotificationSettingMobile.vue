<template>
  <div class="min-h-screen bg-[#F3F4F6] p-4 pb-24">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-5">
      <button @click="goBack" class="text-gray-800 text-lg" aria-label="Back">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="font-normal text-lg">Notification Setting</h1>
    </div>

    <!-- Card -->
    <div class="bg-white rounded-3xl p-4 shadow-sm">
      <!-- Daily -->
      <div class="flex justify-between items-start py-3">
        <div class="pr-3">
          <p class="font-semibold text-sm text-gray-900 mb-1">Daily Quiz Reminder</p>
          <p class="text-[13px] leading-5 text-gray-500">
            🔔 Reminds you to try a quiz every day and keep learning fun!
          </p>
        </div>
        <label class="switch">
          <input type="checkbox" v-model="settings.dailyReminder" aria-label="Daily Quiz Reminder" />
          <span class="slider"></span>
        </label>
      </div>

      <div class="h-px bg-gray-100 my-1"></div>

      <!-- New Quiz -->
      <div class="flex justify-between items-start py-3">
        <div class="pr-3">
          <p class="font-semibold text-sm text-gray-900 mb-1">New Quiz Available</p>
          <p class="text-[13px] leading-5 text-gray-500">
            🎓 Get a notification when there's a new quiz or subject to explore.
          </p>
        </div>
        <label class="switch">
          <input type="checkbox" v-model="settings.newQuiz" aria-label="New Quiz Available" />
          <span class="slider"></span>
        </label>
      </div>

      <div class="h-px bg-gray-100 my-1"></div>

      <!-- Reward -->
      <div class="flex justify-between items-start py-3">
        <div class="pr-3">
          <p class="font-semibold text-sm text-gray-900 mb-1">Reward Alert</p>
          <p class="text-[13px] leading-5 text-gray-500">
            🏆 Tells you when you’re close to winning a badge or reward!
          </p>
        </div>
        <label class="switch">
          <input type="checkbox" v-model="settings.rewardAlert" aria-label="Reward Alert" />
          <span class="slider"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => router.back();

const SETTINGS_KEY = "notif_settings";

const settings = reactive({
  dailyReminder: true,
  newQuiz: true,
  rewardAlert: true,
});

// load saved
onMounted(() => {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) Object.assign(settings, JSON.parse(saved));
  } catch {
    console.log("Error");
  }
});

// persist
watch(
  settings,
  (val) => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(val));
    } catch { console.log("Error"); }
  },
  { deep: true }
);
</script>

<style scoped>
/* Toggle iOS-style */
.switch {
  position: relative;
  display: inline-block;
  width: 46px;
  /* sesuai screenshot */
  height: 26px;
  flex-shrink: 0;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  inset: 0;
  background-color: #dbe1ea;
  /* off */
  transition: 0.2s ease;
  border-radius: 9999px;
}

.slider::before {
  content: "";
  position: absolute;
  height: 22px;
  width: 22px;
  left: 2px;
  top: 2px;
  background: #ffffff;
  border-radius: 9999px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.12);
  transition: 0.2s ease;
}

.switch input:checked+.slider {
  background-color: #2563eb;
  /* on (biru) */
}

.switch input:checked+.slider::before {
  transform: translateX(20px);
}

.switch input:focus+.slider {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
}
</style>
