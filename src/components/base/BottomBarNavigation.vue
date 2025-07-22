<template>
  <nav
    class="fixed bottom-0 left-0 right-0 bg-white border-t shadow p-3 flex justify-around text-sm z-50 lg:hidden"
  >
    <router-link to="/home" class="flex flex-col items-center">
      <img :src="getIcon('Dashboard')" class="w-6 h-6 mb-1" alt="Home" />
      <span :class="getTextClass('Dashboard')">Home</span>
    </router-link>

    <router-link to="/quiz" class="flex flex-col items-center">
      <img :src="getIcon('QuizPage')" class="w-6 h-6 mb-1" alt="Quiz" />
      <span :class="getTextClass('QuizPage')">Quiz</span>
    </router-link>

    <router-link to="/ranking" class="flex flex-col items-center">
      <img :src="getIcon('Ranking')" class="w-6 h-6 mb-1" alt="Ranking" />
      <span :class="getTextClass('Ranking')">Ranking</span>
    </router-link>

    <router-link to="/settings" class="flex flex-col items-center">
      <img :src="getIcon('Settings')" class="w-6 h-6 mb-1" alt="Profile" />
      <span :class="getTextClass('Settings')">Profile</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();

const isActive = (name) => route.name === name;

const icons = {
  Dashboard: {
    active: '/icons/home-active.png',
    inactive: '/icons/home-inactive.png'
  },
  QuizPage: {
    active: '/icons/quiz-active.png',
    inactive: '/icons/quiz-inactive.png'
  },
  Ranking: {
    active: '/icons/ranking-active.png',
    inactive: '/icons/ranking-inactive.png'
  },
  Settings: {
    active: '/icons/user-active.png',
    inactive: '/icons/user-inactive.png'
  }
};

const getIcon = (name) =>
  isActive(name) ? icons[name].active : icons[name].inactive;

const getTextClass = (name) =>
  isActive(name) ? 'text-blue-600 font-semibold' : 'text-gray-500';
</script>
