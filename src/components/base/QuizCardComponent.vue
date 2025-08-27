<template>
  <router-link :to="`/quiz/${id}`">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex items-start relative">
      <!-- Thumbnail -->
      <img
        :src="image"
        alt="Quiz image"
        class="w-16 h-16 rounded-xl object-cover shrink-0"
      />

      <!-- Content -->
      <div class="ml-4 flex-1">
        <!-- Title -->
        <h3 class="text-base font-semibold text-gray-900">{{ title }}</h3>
        <!-- Subtext -->
        <p class="text-sm text-gray-400 mt-0.5 mb-3 leading-tight">
          Suitable for small homes with minimal electricity usage
        </p>

        <!-- Grid info -->
        <div class="grid grid-cols-2 gap-y-2 text-sm text-gray-800">
          <div class="flex items-center gap-1">
            <i class="fas fa-book text-gray-400"></i>
            {{ modules }} Modul
          </div>
          <div class="flex items-center gap-1 justify-end">
            <i class="fas fa-clock text-gray-400"></i>
            {{ duration }}
          </div>
          <div class="flex items-center gap-1 col-span-2">
            <i class="fas fa-user text-gray-400"></i>
            {{ students }} Student
          </div>
        </div>
      </div>

      <!-- Corn Points Badge -->
      <div
        class="absolute bottom-4 right-4 bg-blue-500 text-white text-sm font-medium px-2.5 py-[2px] rounded-lg flex items-center gap-1 shadow"
      >
        <img src="@/assets/corn.png" alt="corn" class="w-3 h-3" />
        {{ points ?? 200 }}
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  image: String,
  title: String,
  students: Number,
  points: Number,
  modules: Number,
  duration: String,
  id: Number,
});
</script>
