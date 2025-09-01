<!-- src/views/auth/ForgotVerify.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Blue header with grid -->
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
        <img src="@/assets/logowhite.png" alt="Fly High" class="w-24 mx-auto mb-5" />
        <h1 class="text-[28px] font-semibold mb-2">Verification</h1>
        <p class="text-sm text-white/90">
          We have sent 4 digits verification code to your<br />
          email address <span class="font-medium break-all">{{ email }}</span>
        </p>
      </div>
    </section>

    <!-- Card -->
    <main class="flex-1">
      <div class="relative z-20 max-w-sm mx-auto px-6 -mt-12">
        <div class="bg-white rounded-2xl shadow-xl border border-gray-200 p-5">
          <!-- OTP inputs -->
          <div class="flex items-center justify-between gap-3 mb-5">
            <input
              v-for="(d, idx) in digits"
              :key="idx"
              ref="boxes"
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="1"
              class="w-16 h-16 rounded-2xl border text-xl font-semibold text-center
                     focus:outline-none focus:ring-2 focus:ring-[#1877F2]
                     border-gray-300"
              :class="{
                'ring-2 ring-[#1877F2] border-transparent': activeIndex === idx,
              }"
              v-model="digits[idx]"
              @focus="activeIndex = idx"
              @input="onInput(idx, $event)"
              @keydown.backspace.prevent="onBackspace(idx)"
              @paste.prevent="onPaste($event)"
            />
          </div>

          <!-- Verify button -->
          <button
            class="w-full py-3 rounded-full text-white font-semibold text-sm transition
                   bg-[#1877F2] hover:bg-[#1666CF]
                   disabled:bg-[#9CC2FF] disabled:cursor-not-allowed"
            :disabled="!canVerify || loading"
            @click="verify"
          >
            <span v-if="!loading">Verification</span>
            <span v-else class="inline-flex items-center gap-2">
              <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="white" stroke-width="4"/>
                <path class="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"/>
              </svg>
              Verifying…
            </span>
          </button>

          <!-- Helper / Resend -->
          <div class="mt-4 text-center text-sm">
            <span class="text-gray-400">Didn't receive code?</span>
            <button
              class="ml-2 font-semibold"
              :class="countdown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#1877F2]'"
              :disabled="countdown > 0 || resending"
              @click="resend"
            >
              <template v-if="countdown > 0">
                Resend in {{ countdown }}s
              </template>
              <template v-else>
                Resend code
              </template>
            </button>
          </div>

          <p v-if="errorMsg" class="mt-3 text-center text-xs text-red-600">
            {{ errorMsg }}
          </p>
        </div>
      </div>
    </main>

    <!-- Toast -->
    <transition name="fade">
      <div
        v-if="toast"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-2 rounded-lg"
      >
        {{ toast }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, reactive, ref, computed, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const email = route.query.email?.toString() || "your@email.com";

// OTP digits
const digits = reactive(["", "", "", ""]);
const boxes = ref([]); // refs for inputs
const activeIndex = ref(0);

const loading = ref(false);
const resending = ref(false);
const errorMsg = ref("");
const toast = ref("");

// resend countdown (seconds)
const RESEND_WAIT = 30;
const countdown = ref(RESEND_WAIT);
let t = null;

const sessionToken = sessionStorage.getItem("otpSession") || ""; // optional token from previous step

const code = computed(() => digits.join(""));
const canVerify = computed(() => /^\d{4}$/.test(code.value));

function focusBox(i) {
  nextTick(() => boxes.value?.[i]?.focus());
}

function onInput(idx, e) {
  const val = e.target.value.replace(/\D/g, "");
  digits[idx] = val.slice(-1);

  if (digits[idx] && idx < 3) {
    activeIndex.value = idx + 1;
    focusBox(idx + 1);
  }
}

function onBackspace(idx) {
  if (digits[idx]) {
    digits[idx] = "";
    activeIndex.value = idx;
  } else if (idx > 0) {
    activeIndex.value = idx - 1;
    digits[idx - 1] = "";
    focusBox(idx - 1);
  }
}

function onPaste(e) {
  const p = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 4);
  if (!p) return;
  for (let i = 0; i < 4; i++) digits[i] = p[i] || "";
  activeIndex.value = Math.min(3, p.length ? p.length - 1 : 0);
  focusBox(activeIndex.value);
}

function flash(msg, ms = 1800) {
  toast.value = msg;
  setTimeout(() => (toast.value = ""), ms);
}

async function verify() {
  if (!canVerify.value || loading.value) return;
  loading.value = true;
  errorMsg.value = "";

  try {
    // Adjust endpoint/payload to your backend.
    await axios.post(
      "https://quiz.flyhigh.my/flyhigh_be/api/auth/verifyForgotOtp",
      {
        email,
        code: code.value,
        session: sessionToken, // optional; remove if not used
      }
    );

    // Go to Reset Password page
    router.push({ path: "/forgot/reset", query: { email } });
  } catch (err) {
    // errorMsg.value =
    //   err?.response?.data?.message ||
    //   "Invalid or expired code. Please try again.";
    // sementara

    router.push({ path: "/forgot/reset", query: { email } });
  } finally {
    loading.value = false;
  }
}

async function resend() {
  if (countdown.value > 0 || resending.value) return;
  resending.value = true;
  errorMsg.value = "";

  try {
    await axios.post(
      "https://quiz.flyhigh.my/flyhigh_be/api/auth/resendForgotOtp",
      { email }
    );
    startCountdown();
    flash("Code resent to your email");
  } catch (err) {
    errorMsg.value =
      err?.response?.data?.message || "Failed to resend code. Try again.";
  } finally {
    resending.value = false;
  }
}

function startCountdown() {
  clearInterval(t);
  countdown.value = RESEND_WAIT;
  t = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0) clearInterval(t);
  }, 1000);
}

onMounted(() => {
  startCountdown();
  focusBox(0);
});

onBeforeUnmount(() => clearInterval(t));
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
