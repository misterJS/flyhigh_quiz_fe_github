<template>
  <!-- ============== FORGOT PAGE ============== -->
  <div v-if="!sent" class="min-h-screen flex flex-col bg-white">
    <!-- Blue header -->
    <section class="relative isolate bg-[#1877F2]">
      <div
        class="absolute inset-0 -z-10 opacity-[0.12] pointer-events-none"
        style="
          background-image:
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px);
          background-size: 24px 24px;
        "
      />
      <div class="relative z-10 max-w-sm mx-auto px-6 pt-10 pb-20 text-center text-white">
        <img src="@/assets/logowhite.png" alt="Fly High" class="w-24 mx-auto mb-6" />
        <h1 class="text-[28px] leading-8 font-semibold">
          Forgot <br /> Password
        </h1>
        <p class="mt-3 text-sm text-white/90">
          We will send a link to reset your <br class="sm:hidden" />
          password to your email
        </p>
      </div>
    </section>

    <!-- White card -->
    <main class="flex-1">
      <div class="relative z-20 max-w-sm mx-auto px-6 -mt-12">
        <div class="bg-white rounded-2xl shadow-xl border border-gray-200 p-5">
          <label for="email" class="block text-sm font-medium text-gray-900 mb-2">Email</label>

          <div class="relative">
            <input
              id="email"
              v-model.trim="email"
              type="email"
              autocomplete="email"
              inputmode="email"
              placeholder="Type your email"
              class="w-full pl-11 pr-4 py-3 rounded-full bg-[#F3F6FD] border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
              @keyup.enter="send"
            />
            <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>

          <p v-if="emailError" class="mt-2 text-xs text-red-600">{{ emailError }}</p>

          <button
            class="mt-5 w-full py-3 rounded-full text-white font-semibold text-sm transition
                   bg-[#1877F2] hover:bg-[#1666CF]
                   disabled:bg-[#9CC2FF] disabled:cursor-not-allowed"
            :disabled="!isValid || loading"
            @click="send"
          >
            <span v-if="!loading">Send</span>
            <span v-else class="inline-flex items-center gap-2">
              <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="white" stroke-width="4"/>
                <path class="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"/>
              </svg>
              Sending…
            </span>
          </button>
        </div>

        <div class="text-center mt-6">
          <span class="text-sm text-gray-500">Already remember you password?</span>
          <button class="ml-1 text-sm font-semibold text-[#1877F2]" @click="goLogin">Sign in</button>
        </div>
      </div>
    </main>
  </div>

  <!-- ============== FULL-SCREEN "EMAIL SENT!" VIEW ============== -->
  <div v-else class="min-h-screen relative flex items-center justify-center bg-[#1877F2]">
    <!-- grid pattern -->
    <div
      class="absolute inset-0 opacity-[0.12] pointer-events-none"
      style="
        background-image:
          linear-gradient(to right, white 1px, transparent 1px),
          linear-gradient(to bottom, white 1px, transparent 1px);
        background-size: 24px 24px;
      "
    />

    <!-- Center card -->
    <div class="relative w-[88%] max-w-sm bg-white rounded-[24px] shadow-xl overflow-hidden">
      <!-- Top illustration area -->
      <div class="relative bg-[#EAF2FF] py-8 flex items-center justify-center">
        <!-- confetti dots -->
        <span class="absolute left-8 top-6 text-orange-400 text-xs">•</span>
        <span class="absolute right-8 top-8 text-blue-400 text-xs">•</span>
        <span class="absolute left-12 bottom-6 text-blue-400 text-xs">•</span>
        <span class="absolute right-12 bottom-8 text-orange-400 text-xs">•</span>

        <div class="w-20 h-20 rounded-full bg-white grid place-items-center text-[#1877F2] text-3xl">
          📥
        </div>
      </div>

      <!-- Body -->
      <div class="px-6 py-6 text-center">
        <h3 class="text-lg font-semibold text-gray-900">Email Sent!</h3>
        <p class="mt-2 text-sm text-gray-600">
          We have sent a OTP Code to your email.
          Did not receive the email? Check you spam filter or resend.
        </p>

        <button
          class="mt-5 w-full rounded-full bg-[#1877F2] hover:bg-[#1666CF] text-white font-semibold py-3 text-sm"
          @click="goToOtp"
        >
          Enter OTP
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const email = ref("");
const loading = ref(false);
const sent = ref(false);

const isValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
);
const emailError = computed(() =>
  !email.value ? "" : isValid.value ? "" : "Please enter a valid email address."
);

async function send() {
  if (!isValid.value || loading.value) return;
  loading.value = true;
  try {
    const { data } = await axios.post(
      "https://quiz.flyhigh.my/flyhigh_be/api/auth/forgotPassword",
      { email: email.value.trim() }
    );
    if (data?.otpSession) sessionStorage.setItem("otpSession", data.otpSession);
    sent.value = true; // switch to full-screen success view
  } catch (err) {
    // fallback: tetap tampilkan success view agar user lanjut OTP
    //sementara
    sent.value = true;
  } finally {
    loading.value = false;
  }
}

function goToOtp() {
  router.push({ path: "/forgot/verify", query: { email: email.value.trim() } });
}

function goLogin() {
  router.push("/login");
}
</script>
