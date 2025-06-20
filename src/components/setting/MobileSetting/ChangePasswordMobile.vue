<template>
  <div class="min-h-screen bg-[#f9fafb] p-4 pb-24">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button class="text-gray-700 text-lg">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="font-semibold text-lg">Change Password</h1>
    </div>

    <!-- Form Card -->
    <div class="bg-white rounded-3xl p-5 shadow space-y-5 mb-6">
      <!-- Password -->
      <div>
        <p class="text-sm font-semibold text-gray-900 mb-2">Password</p>
        <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter password"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            class="absolute right-3 top-3"
            @click="togglePassword"
          >
            <i
              :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
              class="text-gray-500"
            ></i>
          </button>
        </div>
      </div>

      <!-- Confirmation Password -->
      <div>
        <p class="text-sm font-semibold text-gray-900 mb-2">
          Confirmation Password
        </p>
        <div class="relative">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Confirmation password"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            class="absolute right-3 top-3"
            @click="toggleConfirmPassword"
          >
            <i
              :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
              class="text-gray-500"
            ></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="fixed bottom-4 left-4 right-4">
      <button
        class="w-full bg-[#2563EB] text-white py-4 rounded-xl text-sm font-semibold shadow-lg"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showPassword = ref(false);
const showConfirmPassword = ref(false);

function togglePassword() {
  showPassword.value = !showPassword.value;
}
function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value;
}
</script>
