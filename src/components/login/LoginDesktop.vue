<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import SwitchButtonGroup from "@/components/base/SwitchButton.vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
const selectedRole = ref("Student");

const email = ref("");
const password = ref("");
const loginError = ref("");

const auth = useAuthStore();
const router = useRouter();

const signIn = async () => {
  try {
    await auth.login(email.value, password.value);
    router.push("/home");
  } catch (err) {
    loginError.value = err.message;
  }
};
</script>

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
      <img src="@/assets/logo.png" alt="Logo" class="w-40 mb-8 mx-auto" />

      <SwitchButtonGroup
        v-model="selectedRole"
        :options="['Student', 'Parent']"
        class="mb-6"
      />

      <div class="text-left">
        <h2 class="text-2xl font-bold mb-2">
          Sign In To Your Account {{ selectedRole }}
        </h2>
        <p class="text-gray-500 mb-6">
          {{
            selectedRole === "Student"
              ? "Welcome back! please enter your detail!"
              : "Welcome back! please enter your detail!"
          }}
        </p>
      </div>

      <form @submit.prevent="signIn" class="space-y-4">
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

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center">
            <input type="checkbox" class="mr-2" /> Remember me
          </label>
          <a href="#" class="text-blue-600 hover:underline">Forgot Password?</a>
        </div>

        <BaseButton
          @click="signIn"
          variant="primary"
          color="blue"
          class="w-full mt-4 flex justify-center rounded-md py-4"
          ><span>Sign In</span></BaseButton
        >
        <p v-if="loginError" class="text-red-600 text-center text-sm mt-2">
          {{ loginError }} Please Try Again.
        </p>
      </form>

      <p class="mt-6 text-sm text-center text-gray-600">
        Don’t have an account?
        <a href="#" class="text-blue-600 hover:underline">Register</a>
      </p>
    </div>
  </div>
</template>
