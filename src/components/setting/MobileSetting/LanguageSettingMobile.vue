<template>
  <div class="min-h-screen bg-[#f9fafb] p-4 pb-24">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button class="text-gray-700 text-lg">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="font-semibold text-lg">Language</h1>
    </div>

    <!-- Language Card -->
    <div class="bg-white rounded-3xl p-5 shadow space-y-4">
      <!-- Search -->
      <div class="relative">
        <input
          type="text"
          v-model="search"
          placeholder="Search..."
          class="w-full border border-gray-300 rounded-full px-10 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <i
          class="fas fa-search absolute left-4 top-2.5 text-gray-400 text-sm"
        ></i>
      </div>

      <!-- Language List -->
      <div class="space-y-4">
        <div
          v-for="(lang, index) in filteredLanguages"
          :key="index"
          class="flex justify-between items-center"
        >
          <div class="flex items-center gap-3">
            <img
              v-if="lang.id === 1"
              :src="require('@/assets/flag-malaysia.png')"
              class="w-7 h-5 rounded-md object-cover"
            />
            <img
              v-else
              :src="require('@/assets/flag-uk.png')"
              class="w-7 h-5 rounded-md object-cover"
            />
            <p class="text-sm font-medium text-gray-900">{{ lang.name }}</p>
          </div>

          <input
            type="radio"
            :checked="selectedLanguage === lang.id"
            @change="selectLanguage(lang.id)"
            class="form-radio w-5 h-5 text-blue-600"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
const languages = ref([]);
const search = ref("");
const selectedLanguage = ref("en-us");
import { GetAllLanguages } from "@/api/settingApi";

const filteredLanguages = computed(() => {
  if (!search.value) return languages.value;
  return languages.value.filter((lang) =>
    lang.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
const handleGetLanguages = async () => {
  try {
    const response = await GetAllLanguages();
    console.log(response);
    languages.value = response;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  handleGetLanguages();
});
function selectLanguage(code) {
  selectedLanguage.value = code;
  // Simulasi save language (bisa connect ke API kalau mau)
  console.log("Selected language:", code);
}
</script>
