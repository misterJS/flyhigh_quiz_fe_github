<template>
  <div class="min-h-screen flex flex-col">
    <!-- Top Blue Half -->
    <div class="bg-blue-600 flex justify-center items-center h-1/2-screen">
      <div class="w-full max-w-sm px-6">
        <!-- Logo -->
        <img
          src="@/assets/logowhite.png"
          alt="Fly High Logo"
          class="w-24 mb-6 mx-auto"
        />

        <!-- Heading -->
        <div class="text-center mb-4 text-white">
          <h2 class="text-xl font-semibold">Sign In to Your Account</h2>
          <p class="text-sm">
            Don’t have an account?
            <a href="#" class="text-white underline font-medium">Sign Up</a>
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom White Half -->
    <div class="bg-white flex justify-center items-start h-1/2-screen">
      <div
        class="bg-white w-full max-w-sm rounded-2xl shadow px-6 py-5 space-y-4 border border-gray-200 -mt-24"
      >
        <!-- Google Sign-in -->
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

        <!-- Divider -->
        <div class="flex items-center justify-between text-gray-400 text-xs">
          <hr class="flex-grow border-t" />
          <span class="px-2">Or</span>
          <hr class="flex-grow border-t" />
        </div>

        <!-- Email -->
        <div>
          <label class="text-xs text-gray-600 mb-1 block">Email</label>
          <div class="relative">
            <input
              v-model="email"
              type="email"
              placeholder="Type your email"
              class="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 text-sm bg-[#f3f6fd] focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            <span class="absolute left-3 top-2.5 text-gray-400">📧</span>
          </div>
        </div>

        <!-- Password -->
        <div>
          <label class="text-xs text-gray-600 mb-1 block">Password</label>
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
        </div>

        <!-- Options -->
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="rememberMe" class="rounded" />
            <span class="text-gray-500 text-xs">Remember me</span>
          </label>
          <a href="#" class="text-red-500 text-xs font-medium">
            Forgot Password?
          </a>
        </div>

        <!-- Sign In Button -->
        <button
          @click="signIn"
          class="w-full mt-4 bg-blue-600 text-white py-2 rounded-full font-medium text-sm hover:bg-blue-700 transition"
        >
          Sign In
        </button>

        <p v-if="loginError" class="text-red-600 text-center text-sm mt-2">
          {{ loginError }} Please Try Again.
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const loginError = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);

const auth = useAuthStore();
const router = useRouter();

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const signIn = async () => {
  try {
    await auth.login(email.value, password.value);
    router.push("/home");
  } catch (err) {
    loginError.value = err.message;
  }
};
</script>

<style scoped>
.h-1\/2-screen {
  height: 50vh;
}
</style>
