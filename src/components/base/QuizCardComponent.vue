<template>
  <router-link :to="`/quiz/${id}`">
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <img
        :src="image"
        alt="Quiz image"
        class="w-full h-40 object-cover"
      />
      <div class="p-4">
        <!-- <div class="flex justify-between items-center mb-2">
        <div class="flex items-center gap-1 text-sm text-[#6B7280]">
          <i class="fas fa-user-graduate"></i>
          <span>{{ students }} Student</span>
        </div>
        <div
          class="text-xs font-semibold bg-blue-100 text-[#2563EB] px-2 py-1 rounded"
        >
          {{ points }}
        </div>
      </div> -->

        <h3 class="text-base font-medium text-[#111827] mb-2 line-clamp-2">
          {{ title }}
        </h3>

        <div class="flex justify-between text-sm text-[#6B7280]">
          <div class="flex items-center gap-1">
            <i class="fas fa-book"></i>
            <span>{{ modules }} Modul</span>
          </div>
          <div class="flex items-center gap-1">
            <i class="fas fa-clock"></i>
            <span>{{ duration }}</span>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
// eslint-disable-next-line no-undef
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

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
