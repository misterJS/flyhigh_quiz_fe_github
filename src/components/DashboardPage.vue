<script setup>
import HeaderComponent from "./base/HeaderComponent.vue";
import SidebarComponent from "./base/SidebarComponent.vue";
</script>

<template>
  <div class="flex h-screen">
    <SidebarComponent />

    <div class="flex-1 flex flex-col bg-[#f9fafb]">
      <HeaderComponent />

      <main class="p-6 overflow-y-auto flex-1">
        <img src="../assets/hero-dashboard.png" alt="Logo" class="w-full mb-8 mx-auto" />
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div class="p-4 bg-white shadow rounded-xl">Ongoing Quiz</div>
          <div class="p-4 bg-white shadow rounded-xl">Today's Schedule</div>
          <div class="p-4 bg-white shadow rounded-xl">Leaderboard</div>
        </div>
      </main>
    </div>
  </div>
</template>
