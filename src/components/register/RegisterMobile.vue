<template>
  <div class="min-h-screen flex flex-col">
    <!-- Top Blue Half -->
    <div class="bg-blue-600 flex justify-center items-center h-1/2-screen">
      <div class="w-full max-w-sm px-6 pt-12">
        <!-- Logo -->
        <img
          src="@/assets/logo.png"
          alt="Fly High Logo"
          class="w-24 mb-4 mx-auto"
        />

        <!-- Heading -->
        <div class="text-center mb-4 text-white">
          <h2 class="text-xl font-semibold">Create Your Account</h2>
          <p class="text-sm">
            Already have account?
            <a href="#" class="text-white underline font-medium">Sign in</a>
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom White Half -->
    <div class="bg-white flex justify-center items-start h-1/2-screen">
      <div
        class="bg-white w-full max-w-sm rounded-2xl shadow px-6 py-5 space-y-4 border border-gray-200 -mt-24"
      >
        <!-- First and Last Name -->
        <div class="flex space-x-2">
          <input
            v-model="firstName"
            type="text"
            placeholder="First Name"
            class="w-1/2 px-4 py-2 rounded-full border border-gray-300 text-sm bg-[#f3f6fd] focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          <input
            v-model="lastName"
            type="text"
            placeholder="Last Name"
            class="w-1/2 px-4 py-2 rounded-full border border-gray-300 text-sm bg-[#f3f6fd] focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <!-- Email -->
        <div class="relative">
          <input
            v-model="email"
            type="email"
            placeholder="Type your email"
            class="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 text-sm bg-[#f3f6fd] focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          <span class="absolute left-3 top-2.5 text-gray-400">📧</span>
        </div>

        <!-- Password -->
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Type your password"
            class="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 text-sm bg-[#f3f6fd] focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          <span class="absolute left-3 top-2.5 text-gray-400">🔒</span>
          <button
            type="button"
            @click="togglePassword"
            class="absolute right-3 top-2.5 text-gray-400 text-sm"
          >
            👁️
          </button>
        </div>

        <!-- Confirm Password -->
        <div class="relative">
          <input
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Type your password"
            class="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 text-sm bg-[#f3f6fd] focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          <span class="absolute left-3 top-2.5 text-gray-400">🔒</span>
          <button
            type="button"
            @click="toggleConfirmPassword"
            class="absolute right-3 top-2.5 text-gray-400 text-sm"
          >
            👁️
          </button>
        </div>

        <!-- Agreement -->
        <div class="flex items-start space-x-2 text-xs">
          <input type="checkbox" v-model="agree" />
          <span class="text-gray-500">
            I agree to the
            <a href="#" class="text-blue-600 font-medium">Terms of Service</a>
            and
            <a href="#" class="text-blue-600 font-medium">Privacy Policy</a>
          </span>
        </div>

        <!-- Sign Up Button -->
        <button
          @click="signUp"
          class="w-full bg-blue-600 text-white py-2 rounded-full font-medium text-sm hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <!-- Divider -->
        <div class="flex items-center justify-between text-gray-400 text-xs">
          <hr class="flex-grow border-t" />
          <span class="px-2">Or</span>
          <hr class="flex-grow border-t" />
        </div>

        <!-- Google Sign-up -->
        <button
          class="w-full flex items-center justify-center border border-gray-300 rounded-full py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            class="w-5 h-5 mr-2"
          />
          Google
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { registerApi } from "@/api/authApi";
import { ref } from "vue";
import { useRouter } from "vue-router";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const agree = ref(false);
const router = useRouter();
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const signUp = async () => {
  if (!agree.value) {
    alert("You must agree to the terms first.");
    return;
  }
 
  try {
    const payload = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    const res = await registerApi(payload);

    alert(res.message || "Registration successful!");

    router.push("/login");
  } catch (error) {
    console.error("Registration error:", error);
    alert(error.response?.data || "Registration failed.");
  }
};
</script>

<style scoped>
.h-1\/2-screen {
  height: 50vh;
}
</style>
