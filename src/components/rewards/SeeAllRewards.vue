<script setup>
import { ref, computed } from "vue";

// Props
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});

// Emits
// const emit = defineEmits(["back"]);

// Data
const currentPage = ref(1);
const itemsPerPage = 9;

const allRewards = ref([
  {
    id: 1,
    name: "Backpackss",
    description: "Rewards can be redeemed now !",
    points: 400,
    progress: 100,
    image: "/rewards/reward1.png",
    canRedeem: true,
  },
  {
    id: 2,
    name: "Pencil Case",
    description: "Rewards can be redeemed now !",
    points: 400,
    progress: 100,
    image: "/rewards/reward2.png",
    canRedeem: true,
  },
  {
    id: 3,
    name: "Stationery Set",
    description: "Need to Finish 30 Quizzes",
    points: 400,
    progress: 55,
    image: "/rewards/reward3.png",
    canRedeem: false,
  },
  {
    id: 4,
    name: "Notebooks",
    description: "Need to Finish 30 Quizzes",
    points: 400,
    progress: 50,
    image: "/rewards/reward1.png",
    canRedeem: false,
  },
  {
    id: 5,
    name: "Lunch Box",
    description: "Need to Finish 30 Quizzes",
    points: 400,
    progress: 35,
    image: "/rewards/reward2.png",
    canRedeem: false,
  },
  {
    id: 6,
    name: "Water Bottle",
    description: "Need to Finish 30 Quizzes",
    points: 400,
    progress: 65,
    image: "/rewards/reward3.png",
    canRedeem: false,
  },
  {
    id: 7,
    name: "School Shoes",
    description: "Need to Finish 30 Quizzes",
    points: 400,
    progress: 55,
    image: "/rewards/reward1.png",
    canRedeem: false,
  },
  {
    id: 8,
    name: "Desk Organizer",
    description: "Need to Finish 30 Quizzes",
    points: 400,
    progress: 85,
    image: "/rewards/reward2.png",
    canRedeem: false,
  },
  {
    id: 9,
    name: "Umbrella",
    description: "Need to Finish 30 Quizzes",
    points: 400,
    progress: 55,
    image: "/rewards/reward3.png",
    canRedeem: false,
  },
  {
    id: 10,
    name: "Calculator",
    description: "Need to Finish 30 Quizzes",
    points: 400,
    progress: 75,
    image: "/rewards/reward1.png",
    canRedeem: false,
  },
  {
    id: 11,
    name: "Art Supplies",
    description: "Need to Finish 30 Quizzes",
    points: 400,
    progress: 40,
    image: "/rewards/reward2.png",
    canRedeem: false,
  },
  {
    id: 12,
    name: "Sports Equipment",
    description: "Need to Finish 30 Quizzes",
    points: 400,
    progress: 90,
    image: "/rewards/reward3.png",
    canRedeem: false,
  },
]);

// Computed
const totalPages = computed(() => {
  return Math.ceil(allRewards.value.length / itemsPerPage);
});

const paginatedRewards = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return allRewards.value.slice(start, end);
});

// Methods
// const goBack = () => {
//   emit("back");
// };

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const getProgressColor = (progress) => {
  if (progress >= 100) return "#22c55e"; // green
  if (progress >= 70) return "#eab308"; // yellow
  if (progress >= 40) return "#f97316"; // orange
  return "#ef4444"; // red
};

const redeemReward = (reward) => {
  if (reward.canRedeem) {
    // Handle redeem logic here
    console.log("Redeeming reward:", reward.name);
  }
};
</script>

<template>
  <!-- Section Content (bukan modal lagi) -->
  <div v-if="props.isVisible" class="space-y-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-900">Rewards to Get</h2>
    </div>

    <!-- Rewards Grid -->
    <div class="bg-white rounded-xl p-6 shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div
          v-for="reward in paginatedRewards"
          :key="reward.id"
          class="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
        >
          <!-- Reward Image -->
          <div class="flex justify-center mb-3">
            <img
              :src="reward.image"
              :alt="reward.name"
              class="w-16 h-16 object-contain"
            />
          </div>

          <!-- Reward Info -->
          <div class="text-center mb-3">
            <h3 class="font-medium text-gray-900 mb-1">{{ reward.name }}</h3>
            <p class="text-xs text-gray-500 mb-2">{{ reward.description }}</p>
            <div
              class="flex items-center justify-center gap-1 text-sm font-medium text-gray-700"
            >
              <span>{{ reward.points }}</span>
              <span class="text-blue-600">XP</span>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="mb-4">
            <div class="flex justify-between items-center mb-1">
              <span class="text-xs text-gray-500">Progress</span>
              <span
                class="text-xs font-medium"
                :style="{ color: getProgressColor(reward.progress) }"
              >
                {{ reward.progress }}%
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="h-2 rounded-full transition-all duration-300"
                :style="{
                  width: `${reward.progress}%`,
                  backgroundColor: getProgressColor(reward.progress),
                }"
              ></div>
            </div>
          </div>

          <!-- Action Button -->
          <button
            @click="redeemReward(reward)"
            :disabled="!reward.canRedeem"
            :class="[
              'w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors',
              reward.canRedeem
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed',
            ]"
          >
            {{ reward.canRedeem ? "Redeem" : "Redeem" }}
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-end gap-2" v-if="totalPages > 1">
        <!-- Previous Button -->
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>

        <!-- Page Numbers -->
        <template v-for="page in totalPages" :key="page">
          <button
            v-if="
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            "
            @click="goToPage(page)"
            :class="[
              'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100',
            ]"
          >
            {{ page }}
          </button>
          <span
            v-else-if="
              (page === currentPage - 2 && currentPage > 3) ||
              (page === currentPage + 2 && currentPage < totalPages - 2)
            "
            class="px-2 text-gray-400"
          >
            ...
          </span>
        </template>

        <!-- Next Button -->
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar styles jika diperlukan */
</style>
