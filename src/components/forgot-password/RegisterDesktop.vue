<template>
  <div class="flex p-4 min-h-screen">
    <!-- Left Section -->
    <div class="w-1/2 items-center">
      <img
        v-if="selectedRole === 'Student'"
        src="@/assets/hero-login-1.png"
        alt="Student"
        class="bg-cover"
      />
      <img
        v-else
        src="@/assets/hero-login-2.png"
        alt="Parent"
        class="bg-cover"
      />
    </div>

    <!-- Right Section -->
    <div class="w-1/2 flex flex-col justify-center px-10 max-w-md mx-auto">
      <img src="@/assets/logo.png" alt="Logo" class="w-20 mb-8 mx-auto" />

      <div class="mb-6">
        <SwitchButtonGroup
          v-model="selectedRole"
          :options="['Student', 'Parent']"
        />
      </div>

      <div class="text-left">
        <h2 class="text-2xl font-bold mb-2">
          Create Your Account {{ selectedRole }}
        </h2>
        <p class="text-gray-500 mb-6">
          {{
            selectedRole === "Student"
              ? "Welcome! let’s create your student account!"
              : "Welcome! let’s create your parent account!"
          }}
        </p>
      </div>

      <form @submit.prevent="register" class="space-y-4">
        <div class="flex gap-4">
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >First Name</label
            >
            <input
              v-model="firstName"
              type="text"
              placeholder="Enter your first name"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Last Name</label
            >
            <input
              v-model="lastName"
              type="text"
              placeholder="Enter your last name"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Password & Confirm Password dalam 1 baris -->
        <div class="flex gap-4">
          <!-- Password -->
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Password</label
            >
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Password"
                class="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                @click="showPassword = !showPassword"
              >
                <span v-if="showPassword">🙈</span>
                <span v-else>👁️</span>
              </button>
            </div>
          </div>

          <!-- Confirm Password -->
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Confirm Password</label
            >
            <div class="relative">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="confirmPassword"
                placeholder="Confirm password"
                class="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <span v-if="showConfirmPassword">🙈</span>
                <span v-else>👁️</span>
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-start text-sm">
          <input type="checkbox" v-model="agreeTerms" class="mr-2 mt-1" />
          <label
            >I agree to the applicable
            <a href="#" class="text-blue-600 hover:underline"
              >terms and conditions</a
            >
          </label>
        </div>

        <router-link to="/home">
          <BaseButton
            variant="primary"
            color="blue"
            class="w-full flex justify-center rounded-md py-4"
          >
            <span>Create Account</span>
          </BaseButton>
        </router-link>
      </form>

      <p class="mt-6 text-sm text-center text-gray-600">
        Have an account?
        <a href="#" class="text-blue-600 hover:underline">Sign In</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import SwitchButtonGroup from "@/components/base/SwitchButton.vue";
import { ref } from "vue";

const selectedRole = ref("Student");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const agreeTerms = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const register = () => {
  if (!agreeTerms.value) {
    alert("You must agree to the terms and conditions");
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  console.log("Register:", {
    role: selectedRole.value,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  });
};
</script>