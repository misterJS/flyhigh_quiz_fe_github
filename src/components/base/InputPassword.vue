<template>
  <div class="w-full relative">
    <label v-if="label" class="block text-sm text-[#191919] font-medium">
      Email
    </label>

    <img
      :src="lock"
      alt="sms icon"
      class="w-[16px] h-[16px] left-3 absolute mt-5"
    />
    <input
      :type="type"
      placeholder="Type your password"
      v-model="modelValue"
      class="w-full placeholder:text-sm pl-9 px-4 py-2 mt-2 border border[#E5E5E5] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
</template>

<script setup>
defineProps({
  label: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
});
import sms from "@/assets/sms.png";
import lock from "@/assets/lock.png";
const modelValue = defineModel();
</script>
