<template>
  <div class="min-h-screen py-6 bg-[#007CEF]">
    <div class="w-full h-full absolute mt-[343px] z-0 bg-white">
      <div class="h-full bg-white"></div>
    </div>
    <div class="w-full">
      <img
        src="@/assets/logo.png"
        alt="Fly High Logo"
        class="w-[96px] h-[48px] mx-auto"
      />
      <div>
        <p class="text-center text-2xl mt-6 text-white">
          Forgot <br />Password
        </p>
        <p class="text-center text-sm mt-3 text-white">
          We will send a link to reset your <br />
          password to your email
        </p>
      </div>
    </div>
    <div
      class="max-w-[335px] bg-white relative z-10 mt-6 p-5 h-full rounded-xl mx-auto"
    >
      <InputEmail />
      <button
        class="w-full h-[45px] mt-6 bg-[#007CEF] rounded-[20px] text-white"
      >
        Send
      </button>
      <p class="text-sm text-center mt-6 text-[#A3A3A3]">
        Already remember you password?
        <span class="text-[#007CEF]">Sign in</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import InputEmail from "../base/InputEmail.vue";
</script>
