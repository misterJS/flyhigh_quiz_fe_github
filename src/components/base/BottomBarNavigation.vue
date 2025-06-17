<template>
  <nav
    class="fixed bottom-0 left-0 right-0 bg-white border-t shadow p-3 flex justify-around text-sm z-50 lg:hidden"
  >
    <router-link
      to="/home"
      class="flex flex-col items-center"
      :class="isActive('Home')"
    >
      <i class="fas fa-home text-lg"></i>
      <span class="text-xs">Home</span>
    </router-link>

    <router-link
      to="/quiz"
      class="flex flex-col items-center"
      :class="isActive('Quiz')"
    >
      <i class="fas fa-edit text-lg"></i>
      <span class="text-xs">Quiz</span>
    </router-link>

    <router-link
      to="/ranking"
      class="flex flex-col items-center"
      :class="isActive('Ranking')"
    >
      <i class="fas fa-trophy text-lg"></i>
      <span class="text-xs">Ranking</span>
    </router-link>

    <router-link
      to="/profile"
      class="flex flex-col items-center"
      :class="isActive('Profile')"
    >
      <i class="fas fa-user text-lg"></i>
      <span class="text-xs">Profile</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const isActive = (name) => {
  return route.name === name ? "text-blue-600 font-semibold" : "text-gray-500";
};
</script>

<style scoped>
.router-link-active {
  color: #2563eb;
  font-weight: 600;
}
</style>
