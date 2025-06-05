<template>
  <div
    class="bg-white rounded-xl px-5 py-4 shadow-sm w-full flex items-center justify-between gap-4 relative overflow-hidden"
  >
    <img
      src="../../assets/reward/confetti_component.png"
      alt="Confetti"
      class="absolute top-0 right-0 h-24 opacity-70 pointer-events-none"
    />

    <div class="flex flex-col justify-center z-10">
      <h3 class="text-base font-semibold text-gray-900 mb-0.5">
        Congratulations!
      </h3>
      <p class="text-sm text-gray-500 mb-3 leading-tight">
        You're Close to a Reward
      </p>

      <div
        class="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-1"
      >
        300 / 500 <span class="text-base">🎯</span>
      </div>
      <p class="text-sm text-gray-400 mb-4">80% of target</p>

      <button
        class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg w-max"
      >
        View All Rewards
      </button>
    </div>

    <img
      src="../../assets/reward/cup.png"
      alt="Trophy"
      class="h-20 w-20 object-contain z-10"
    />
  </div>
</template>

<script setup></script>

<style scoped></style>
