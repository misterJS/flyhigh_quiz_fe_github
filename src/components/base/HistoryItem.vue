<template>
  <div class="flex items-start gap-3 border rounded-xl p-3 relative">
    <img src="@/assets/quiz.png" class="w-16 h-16 rounded-lg object-cover" />

    <div class="flex-1">
      <p class="font-semibold text-sm">{{ item.title }}</p>
      <p class="text-xs text-gray-400 truncate">{{ item.description }}</p>

      <div class="flex items-center justify-between text-xs text-gray-500 mt-2">
        <div class="flex items-center gap-1">
          <i class="fas fa-book"></i> {{ item.modul }} Modul
        </div>
        <div class="flex items-center gap-1">
          <i class="fas fa-clock"></i> {{ item.time }}
        </div>
      </div>

      <div class="flex items-center text-xs text-gray-500 justify-between mt-2">
        <div class="flex items-center gap-1">
          <i class="fas fa-user-friends"></i> {{ item.student }} Student
        </div>
        <div class="flex items-center gap-1">
          <i class="fas fa-gem text-blue-500"></i>
          <span class="text-blue-500 font-semibold text-xs">{{
            item.point
          }}</span>
        </div>
      </div>
    </div>

    <div class="absolute right-3 top-3">
      <BadgeComponent :status="item.status" />
    </div>
  </div>
</template>

<script setup>
import BadgeComponent from "@/components/base/BadgeComponent.vue";
// eslint-disable-next-line no-undef
defineProps({
  item: Object,
});
</script>
