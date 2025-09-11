<script setup>
import { ref, computed } from "vue";

// Props
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});

// Data
const searchQuery = ref("");
const selectedFilter = ref("All");
const itemsPerPage = ref(9);
const currentPage = ref(1);
const sortBy = ref("Newest");

const rewardHistory = ref([
  {
    id: 1,
    name: "Colored Pencils",
    image: "/rewards/reward1.png",
    redemptionDate: "24 Feb 22",
    pointsUsed: 120,
    pointsRemaining: 30,
    sourcePoints: "Art Quiz",
    status: "Success",
  },
  {
    id: 2,
    name: "Ruler",
    image: "/rewards/reward2.png",
    redemptionDate: "24 Feb 22",
    pointsUsed: 40,
    pointsRemaining: 30,
    sourcePoints: "Math Quiz",
    status: "Success",
  },
  {
    id: 3,
    name: "A5 Notebook",
    image: "/rewards/reward3.png",
    redemptionDate: "24 Feb 22",
    pointsUsed: 80,
    pointsRemaining: 30,
    sourcePoints: "English Quiz",
    status: "Success",
  },
  {
    id: 4,
    name: "Eraser",
    image: "/rewards/reward1.png",
    redemptionDate: "24 Feb 22",
    pointsUsed: 30,
    pointsRemaining: 60,
    sourcePoints: "Science Quiz",
    status: "Success",
  },
  {
    id: 5,
    name: "Mechanical Pencil",
    image: "/rewards/reward2.png",
    redemptionDate: "24 Feb 22",
    pointsUsed: 100,
    pointsRemaining: 140,
    sourcePoints: "Civics Quiz",
    status: "Success",
  },
  {
    id: 6,
    name: "Pencil Sharpener",
    image: "/rewards/reward3.png",
    redemptionDate: "24 Feb 22",
    pointsUsed: 50,
    pointsRemaining: 180,
    sourcePoints: "Bahasa Quiz",
    status: "Failed",
  },
]);

// Computed
const filteredHistory = computed(() => {
  let result = rewardHistory.value;

  // Apply filter
  if (selectedFilter.value !== "All") {
    if (selectedFilter.value === "Redeemed") {
      result = result.filter((item) => item.status === "Success");
    } else if (selectedFilter.value === "Expired") {
      result = result.filter((item) => item.status === "Failed");
    }
  }

  // Apply search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.sourcePoints.toLowerCase().includes(query)
    );
  }

  return result;
});

const totalPages = computed(() => {
  return Math.ceil(filteredHistory.value.length / itemsPerPage.value);
});

const paginatedHistory = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredHistory.value.slice(start, end);
});

const totalItems = computed(() => {
  return 1400; // As shown in the image
});

// Methods
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const handleFilterChange = (filter) => {
  selectedFilter.value = filter;
  currentPage.value = 1; // Reset to first page when filter changes
};

const handleSearch = () => {
  currentPage.value = 1; // Reset to first page when searching
};

const goBack = () => {
  // Handle back navigation
  console.log("Going back...");
};
</script>

<template>
  <div v-if="props.isVisible" class="min-h-screen bg-gray-50">
    <!-- Header with Back Button -->
    <!-- <div class="bg-white px-6 py-4 border-b border-gray-200"> -->
    <button
      @click="goBack"
      class="flex items-center text-gray-600 hover:text-gray-800"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.57 5.92999L3.5 12L9.57 18.07"
          stroke="#292D32"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.4999 12H3.66992"
          stroke="#292D32"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span>Back</span>
    </button>
    <!-- </div> -->

    <div class="px-2 py-6 space-y-6">
      <!-- Filter Tabs -->
      <div class="flex space-x-8">
        <button
          v-for="filter in ['All', 'Redeemed', 'Expired']"
          :key="filter"
          @click="handleFilterChange(filter)"
          :class="[
            'pb-2 text-sm font-medium border-b-2 -mb-px transition-colors',
            selectedFilter === filter
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-500 border-transparent hover:text-gray-700',
          ]"
        >
          {{ filter }}
        </button>
      </div>

      <!-- Search and Controls -->
      <div class="flex items-center justify-between">
        <!-- Search Bar -->
        <div class="relative max-w-m">
          <svg
            class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            v-model="searchQuery"
            @input="handleSearch"
            placeholder="Search..."
            class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Right Controls -->
        <div class="flex items-center space-x-4">
          <!-- Sort Dropdown -->
          <select
            v-model="sortBy"
            class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Newest</option>
            <option>Oldest</option>
            <option>Name</option>
          </select>

          <!-- Delete Button -->
          <button
            class="flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-700"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.33268 8.125C8.79292 8.125 9.16602 8.49809 9.16602 8.95833V13.9583C9.16602 14.4186 8.79292 14.7917 8.33268 14.7917C7.87245 14.7917 7.49935 14.4186 7.49935 13.9583V8.95833C7.49935 8.49809 7.87245 8.125 8.33268 8.125Z"
                fill="#F16363"
              />
              <path
                d="M12.4993 8.95833C12.4993 8.49809 12.1263 8.125 11.666 8.125C11.2058 8.125 10.8327 8.49809 10.8327 8.95833V13.9583C10.8327 14.4186 11.2058 14.7917 11.666 14.7917C12.1263 14.7917 12.4993 14.4186 12.4993 13.9583V8.95833Z"
                fill="#F16363"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.9993 5V4.16666C14.9993 2.78595 13.8801 1.66666 12.4993 1.66666H7.49935C6.11864 1.66666 4.99935 2.78595 4.99935 4.16666V5H3.74935C3.28911 5 2.91602 5.37309 2.91602 5.83333C2.91602 6.29357 3.28911 6.66666 3.74935 6.66666H4.16602V15.8333C4.16602 17.214 5.2853 18.3333 6.66602 18.3333H13.3327C14.7134 18.3333 15.8327 17.214 15.8327 15.8333V6.66666H16.2493C16.7096 6.66666 17.0827 6.29357 17.0827 5.83333C17.0827 5.37309 16.7096 5 16.2493 5H14.9993ZM12.4993 3.33333H7.49935C7.03911 3.33333 6.66602 3.70643 6.66602 4.16666V5H13.3327V4.16666C13.3327 3.70643 12.9596 3.33333 12.4993 3.33333ZM14.166 6.66666H5.83268V15.8333C5.83268 16.2936 6.20578 16.6667 6.66602 16.6667H13.3327C13.7929 16.6667 14.166 16.2936 14.166 15.8333V6.66666Z"
                fill="#F16363"
              />
            </svg>

            Delete
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="space-y-2">
        <div
          v-for="item in paginatedHistory"
          :key="item.id"
          class="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex items-center justify-between">
            <!-- Left: Checkbox + Item Info -->
            <div class="flex items-center space-x-4 flex-1">
              <input
                type="checkbox"
                class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />

              <div class="flex items-center space-x-3 min-w-0 flex-1">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="h-12 w-12 rounded-lg object-cover flex-shrink-0"
                />
                <div class="min-w-0">
                  <div class="text-xs text-gray-500 font-medium">
                    Reward Item
                  </div>
                  <div class="text-sm font-medium text-gray-900">
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Middle: Data Fields -->
            <div class="flex items-center space-x-8 flex-1 justify-left">
              <!-- Redemption Date -->
              <div class="text-left min-w-0">
                <div class="text-xs text-gray-500 font-medium">
                  Redemption Date
                </div>
                <div class="text-sm text-gray-900">
                  {{ item.redemptionDate }}
                </div>
              </div>

              <!-- Points Used -->
              <div class="text-left min-w-0">
                <div class="text-xs text-gray-500 font-medium">Points Used</div>
                <div class="text-sm text-gray-900">
                  {{ item.pointsUsed }} XP
                </div>
              </div>

              <!-- Points Remaining -->
              <div class="text-left min-w-0">
                <div class="text-xs text-gray-500 font-medium">
                  Points Remaining
                </div>
                <div class="text-sm text-gray-900">
                  {{ item.pointsRemaining }} XP
                </div>
              </div>

              <!-- Source of Points -->
              <div class="text-left min-w-0">
                <div class="text-xs text-gray-500 font-medium">
                  Source of Points
                </div>
                <div class="text-sm text-gray-900">{{ item.sourcePoints }}</div>
              </div>
            </div>

            <!-- Right: Status + Actions -->
            <div class="flex items-center space-x-4 flex-shrink-0">
              <div class="text-center">
                <div class="text-xs text-gray-500 font-medium">Status</div>
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                    item.status === 'Success'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800',
                  ]"
                >
                  {{ item.status }}
                </span>
              </div>

              <!-- Menu Button -->
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2 text-sm text-gray-700">
          <span>Show</span>
          <select
            v-model="itemsPerPage"
            class="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option :value="9">9</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
          </select>
          <span>from {{ totalItems }}</span>
        </div>

        <!-- Page Numbers -->
        <div class="flex items-center space-x-1">
          <!-- Previous Button -->
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
              />
            </svg>
          </button>

          <!-- Page Numbers -->
          <button
            v-for="page in [1, 2, 3]"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-3 py-1 text-sm font-medium rounded',
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100',
            ]"
          >
            {{ page }}
          </button>

          <span class="px-2 text-gray-500">...</span>

          <button
            @click="goToPage(10)"
            :class="[
              'px-3 py-1 text-sm font-medium rounded',
              currentPage === 10
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100',
            ]"
          >
            10
          </button>

          <!-- Next Button -->
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
