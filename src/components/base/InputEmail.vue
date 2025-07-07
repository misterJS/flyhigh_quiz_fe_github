<template>
  <div class="w-full relative">
    <label class="block text-sm text-[#191919] font-medium"> Email </label>
    <img
      :src="sms"
      alt="sms icon"
      class="w-[16px] w-[16px] left-3 absolute mt-5"
    />

    <input
      :type="type"
      placeholder="Type your email"
      class="w-full placeholder:text-sm pl-9 px-4 py-2 mt-2 border border[#E5E5E5] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
</template>

<script setup>
import sms from "@/assets/sms.png";
</script>
