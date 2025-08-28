<template>
  <div class="min-h-screen bg-[#f9fafb] p-4 pb-24">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button @click="goBack" class="text-gray-700 text-lg">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="font-normal text-lg">Change Password</h1>
    </div>

    <!-- Form Card -->
    <div class="bg-white rounded-3xl p-5 shadow space-y-5 mb-6">
      <!-- Password -->
      <div>
        <p class="text-sm font-semibold text-gray-900 mb-2">Password</p>
        <div class="relative">
          <input
            v-model="password"
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
            v-model="confirmPassword"
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
        @click="saveNewPassword"
        class="w-full bg-[#2563EB] text-white py-4 rounded-xl text-sm font-semibold shadow-lg"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
import { changePassword } from "@/api/authApi";
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back();
};

const auth = useAuthStore();

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const password = ref("");
const confirmPassword = ref("");

function togglePassword() {
  showPassword.value = !showPassword.value;
}

function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value;
}

const saveNewPassword = async () => {
  const userId = auth.userId;
  if (!password.value || !confirmPassword.value) {
    alert("Please fill in both password fields.");
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const result = await changePassword({
      userId,
      newPassword: password.value,
      confirmPassword: confirmPassword.value,
    });
    alert(result.message);
  } catch (err) {
    alert(err.response?.data || "Failed to update password.");
    console.error(err);
  }
};
</script>
