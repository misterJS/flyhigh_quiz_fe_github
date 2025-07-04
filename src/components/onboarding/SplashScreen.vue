<script setup>
import logo from "@/assets/LOGO-FLY-HIGH2.png";
</script>
<template>
  <div
    class="min-h-screen min-w-screen bg-[#007CEF]/70 bg-cover bg-center flex items-center"
  >
    <img
      src="@/assets/Pattern(1).png"
      alt="Background"
      class="absolute inset-0 w-full h-full object-cover -z-10"
    />

    <div
      class="rounded-full flex justify-center items-center mx-auto w-[80px] h-[80px] bg-white"
    >
      <img :src="logo" class="w-[60px] h-[34px]" />
    </div>
  </div>
</template>
