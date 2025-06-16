<template>
  <nav
    class="fixed bottom-0 left-0 right-0 bg-white border-t shadow p-3 flex justify-around text-sm text-gray-500 z-50"
  >
    <div
      class="flex flex-col items-center"
      :class="{ 'text-blue-600': currentTab === 'home' }"
      @click="setTab('home')"
    >
      <i class="fas fa-home text-lg"></i>
      <span class="text-xs">Home</span>
    </div>

    <div
      class="flex flex-col items-center"
      :class="{ 'text-blue-600': currentTab === 'quiz' }"
      @click="setTab('quiz')"
    >
      <i class="fas fa-edit text-lg"></i>
      <span class="text-xs">Quiz</span>
    </div>

    <div
      class="flex flex-col items-center"
      :class="{ 'text-blue-600': currentTab === 'ranking' }"
      @click="setTab('ranking')"
    >
      <i class="fas fa-trophy text-lg"></i>
      <span class="text-xs">Ranking</span>
    </div>

    <div
      class="flex flex-col items-center"
      :class="{ 'text-blue-600': currentTab === 'profile' }"
      @click="setTab('profile')"
    >
      <i class="fas fa-user text-lg"></i>
      <span class="text-xs">Profile</span>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const currentTab = ref(route.name?.toLowerCase() || "home");

watch(route, (newRoute) => {
  currentTab.value = newRoute.name?.toLowerCase() || "home";
});

function setTab(tab) {
  currentTab.value = tab;
  router.push({ name: tab.charAt(0).toUpperCase() + tab.slice(1) });
}
</script>
