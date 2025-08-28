<template>
  <div class="min-h-screen flex flex-col bg-[#F6F7FB]">
    <!-- TOP BLUE -->
    <section class="relative h-[46vh] grid-bg bg-[#0B63F6] text-white">
      <div class="h-full max-w-sm mx-auto px-6 flex flex-col items-center justify-center">
        <!-- Logo -->
        <img src="@/assets/logowhite.png" alt="Fly High" class="w-24 mb-6" />

        <!-- Heading -->
        <div class="text-center">
          <h2 class="text-[32px] leading-tight font-normal">
            Sign In to Your<br />Account
          </h2>
          <p class="text-sm mt-2">
            Don’t have an account?
            <router-link to="/register" class="underline font-medium">Sign Up</router-link>
          </p>
        </div>
      </div>
    </section>

    <!-- CARD -->
    <section class="relative flex-1">
      <div
        class="max-w-sm mx-auto -mt-16 bg-white rounded-2xl shadow-md border border-gray-200 px-5 py-5 space-y-4"
      >
        <!-- Google Sign-in -->
        <button
          type="button"
          class="w-full h-11 flex items-center justify-center gap-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
          @click="signInWithGoogle"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            class="w-5 h-5"
          />
          Continue with Google
        </button>

        <!-- Divider -->
        <div class="flex items-center text-gray-400 text-xs">
          <hr class="flex-1 border-t" />
          <span class="px-2">Or</span>
          <hr class="flex-1 border-t" />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-xs text-gray-600 mb-1">Email</label>
          <div class="relative">
            <input
              v-model="email"
              type="email"
              placeholder="Type your email"
              class="w-full h-11 rounded-full bg-[#F3F6FD] border border-gray-300 pl-11 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#0B63F6]"
            />
            <i class="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
          </div>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-xs text-gray-600 mb-1">Password</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Type your password"
              class="w-full h-11 rounded-full bg-[#F3F6FD] border border-gray-300 pl-11 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-[#0B63F6]"
            />
            <i class="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>

            <!-- Eye button in a circle -->
            <button
              type="button"
              @click="togglePassword"
              class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
            >
              <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
            </button>
          </div>
        </div>

        <!-- Options -->
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="rememberMe" class="rounded" />
            <span class="text-gray-500 text-xs">Remember me</span>
          </label>
          <router-link to="/forgot-password" class="text-red-500 text-xs font-medium">
            Forgot Password?
          </router-link>
        </div>

        <!-- Sign In Button -->
        <button
          type="button"
          @click="signIn"
          class="w-full h-12 mt-2 bg-[#0B63F6] hover:bg-[#155EE0] text-white rounded-full font-semibold text-sm transition"
        >
          Sign In
        </button>

        <p v-if="loginError" class="text-red-600 text-center text-sm mt-1">
          {{ loginError }} Please try again.
        </p>
      </div>
    </section>
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

const togglePassword = () => (showPassword.value = !showPassword.value);

const signIn = async () => {
  try {
    await auth.login(email.value, password.value, { remember: rememberMe.value });
    router.push("/home");
  } catch (err) {
    loginError.value = err?.message || "Login failed.";
  }
};

const signInWithGoogle = async () => {
  try {
    await auth.loginWithGoogle?.();
    router.push("/home");
  } catch (err) {
    loginError.value = err?.message || "Google sign-in failed.";
  }
};
</script>

<style scoped>
/* Biru bergaris seperti grid */
.grid-bg {
  background-image:
    linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px);
  background-size: 28px 28px, 28px 28px;
  background-position: center;
}
</style>
