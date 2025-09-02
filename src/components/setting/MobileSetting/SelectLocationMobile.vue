<template>
  <div class="min-h-screen bg-[#f9fafb] p-4 pb-24">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button @click="goBack" class="text-gray-700 text-lg" aria-label="Back">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="font-semibold text-lg">Country</h1>
    </div>

    <!-- Card -->
    <div class="bg-white rounded-3xl p-4 shadow divide-y divide-gray-100">
      <!-- Malaysia -->
      <button
        class="w-full flex items-center justify-between py-4"
        @click="setCountry('MY')"
      >
        <div class="flex items-center gap-3">
          <img
            :src="flags.MY"
            alt="Malaysia Flag"
            class="w-8 h-6 rounded-md object-cover"
          />
          <span class="text-base text-gray-900">Malaysia</span>
        </div>
        <span
          class="w-6 h-6 rounded-full grid place-items-center border-2"
          :class="selectedCode === 'MY' ? 'border-blue-500' : 'border-gray-300'"
          aria-hidden="true"
        >
          <span
            v-if="selectedCode === 'MY'"
            class="w-3 h-3 rounded-full bg-blue-500"
          ></span>
        </span>
      </button>

      <!-- Singapore -->
      <button
        class="w-full flex items-center justify-between py-4"
        @click="setCountry('SG')"
      >
        <div class="flex items-center gap-3">
          <img
            :src="flags.SG"
            alt="Singapore Flag"
            class="w-8 h-6 rounded-md object-cover"
          />
          <span class="text-base text-gray-900">Singapore</span>
        </div>
        <span
          class="w-6 h-6 rounded-full grid place-items-center border-2"
          :class="selectedCode === 'SG' ? 'border-blue-500' : 'border-gray-300'"
          aria-hidden="true"
        >
          <span
            v-if="selectedCode === 'SG'"
            class="w-3 h-3 rounded-full bg-blue-500"
          ></span>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const flags = {
  MY: require("@/assets/flag-malaysia.png"),
  SG: require("@/assets/flag-singapore.png"),
};

const selectedCode = ref("MY");

onMounted(() => {
  // load saved country if available
  const saved = localStorage.getItem("app_country");
  if (saved) selectedCode.value = saved;
});

function goBack() {
  router.back();
}

function setCountry(code) {
  selectedCode.value = code;
  localStorage.setItem("app_country", code);
  // balik ke page sebelumnya setelah memilih
  setTimeout(() => router.back(), 150);
}
</script>
