<template>
  <div class="min-h-screen flex flex-col bg-[#F6F7FB]">
    <!-- TOP BLUE -->
    <section class="relative h-[46vh] grid-bg bg-[#0B63F6] text-white">
      <div class="h-full max-w-sm mx-auto px-6 pt-10 flex flex-col items-center">
        <img src="@/assets/logowhite.png" alt="Fly High" class="w-24 mb-5" />
        <div class="text-center">
          <h2 class="text-[24px] leading-tight font-semibold">Create Your Account</h2>
          <p class="text-sm mt-1">
            Already have account?
            <router-link to="/login" class="underline font-medium">Sign in</router-link>
          </p>
        </div>
      </div>
    </section>

    <!-- CARD -->
    <section class="relative flex-1">
      <div class="max-w-sm mx-auto -mt-16 bg-white rounded-2xl shadow-md border border-gray-200 px-5 py-5 space-y-4">
        <!-- Names -->
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-xs text-gray-600 mb-1">First Name</label>
            <input v-model="firstName" type="text" placeholder="First Name"
              class="w-full h-11 rounded-full bg-[#F3F6FD] border border-gray-300 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#0B63F6]" />
          </div>
          <div>
            <label class="block text-xs text-gray-600 mb-1">Last Name</label>
            <input v-model="lastName" type="text" placeholder="Last Name"
              class="w-full h-11 rounded-full bg-[#F3F6FD] border border-gray-300 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#0B63F6]" />
          </div>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-xs text-gray-600 mb-1">Email</label>
          <div class="relative">
            <input v-model="email" type="email" placeholder="Type your email"
              class="w-full h-11 rounded-full bg-[#F3F6FD] border border-gray-300 pl-11 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#0B63F6]" />
            <i class="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
          </div>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-xs text-gray-600 mb-1">Password</label>
          <div class="relative">
            <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Type your password"
              class="w-full h-11 rounded-full bg-[#F3F6FD] border border-gray-300 pl-11 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-[#0B63F6]" />
            <i class="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"
              :aria-label="showPassword ? 'Hide password' : 'Show password'">
              <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
            </button>
          </div>
        </div>

        <!-- Confirm -->
        <div>
          <label class="block text-xs text-gray-600 mb-1">Confirm Password</label>
          <div class="relative">
            <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Type your password"
              class="w-full h-11 rounded-full bg-[#F3F6FD] border border-gray-300 pl-11 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-[#0B63F6]" />
            <i class="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"
              :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'">
              <i :class="showConfirmPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
            </button>
          </div>
        </div>

        <!-- Terms -->
        <div class="flex items-start gap-2 text-xs">
          <input type="checkbox" v-model="agree" class="mt-0.5" />
          <span class="text-gray-500">
            I agree to the
            <router-link to="/tos" class="text-[#0B63F6] font-medium">Terms of Service</router-link>
            and
            <router-link to="/privacy" class="text-[#0B63F6] font-medium">Privacy Policy</router-link>
          </span>
        </div>

        <!-- Submit -->
        <button type="button" @click="signUp" :disabled="!canSubmit"
          class="w-full h-12 bg-[#0B63F6] hover:bg-[#155EE0] disabled:bg-[#93C5FD] text-white rounded-full font-semibold text-sm">
          Sign Up
        </button>

        <!-- Divider -->
        <div class="flex items-center text-gray-400 text-xs">
          <hr class="flex-1 border-t" /><span class="px-2">Or</span><hr class="flex-1 border-t" />
        </div>

        <!-- Google -->
        <button type="button"
          class="w-full h-11 flex items-center justify-center gap-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="w-5 h-5" />
          Google
        </button>

        <p v-if="errMsg" class="text-center text-red-600 text-sm">{{ errMsg }}</p>
      </div>
    </section>

    <!-- SUCCESS OVERLAY -->
    <transition name="fade">
      <div
        v-if="showSuccess"
        class="fixed inset-0 z-50 grid-bg bg-[#0B63F6] flex items-center justify-center p-6"
      >
        <div class="max-w-[360px] w-full bg-white rounded-[22px] shadow-xl overflow-hidden">
          <div class="bg-[#EAF2FF] h-36 flex items-center justify-center relative">
            <div class="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center relative">
              <i class="fas fa-user text-[#0B63F6] text-2xl"></i>
              <i class="fas fa-check-circle text-[#0B63F6] text-lg absolute -right-1 -bottom-1 bg-white rounded-full"></i>
            </div>
            <span class="absolute left-6 top-6 w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
            <span class="absolute right-8 top-7 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            <span class="absolute left-10 bottom-6 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            <span class="absolute right-10 bottom-6 w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
          </div>
          <div class="p-6 text-center">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">Account Created!</h3>
            <p class="text-sm text-gray-500 mb-5">
              Account created successfully, you can login with a new account.
            </p>
            <button
              class="w-full h-11 rounded-full bg-[#0B63F6] text-white font-semibold"
              @click="goToLogin"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { registerApi } from "@/api/authApi";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const agree = ref(false);
const errMsg = ref("");

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const showSuccess = ref(false);

const router = useRouter();

const canSubmit = computed(() =>
  firstName.value &&
  lastName.value &&
  email.value &&
  password.value &&
  password.value === confirmPassword.value &&
  agree.value
);

const signUp = async () => {
  errMsg.value = "";
  if (!canSubmit.value) {
    errMsg.value = "Please complete the form and agree to the terms.";
    return;
  }
  try {
    const payload = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      password: password.value,
      confirmPassword: confirmPassword.value,
    };
    await registerApi(payload);
    // Tampilkan success card (jangan langsung redirect)
    showSuccess.value = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    errMsg.value = error?.response?.data?.message || error?.message || "Registration failed.";
  }
};

const goToLogin = () => router.push("/login");
</script>

<style scoped>
.h-1\/2-screen { height: 50vh; }
.grid-bg{
  background-image:
    linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px);
  background-size: 28px 28px, 28px 28px;
  background-position: center;
}
.fade-enter-active,.fade-leave-active{ transition: opacity .2s ease; }
.fade-enter-from,.fade-leave-to{ opacity: 0; }
</style>
