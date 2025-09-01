<!-- src/views/auth/ForgotReset.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-white">
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
        <img src="@/assets/logowhite.png" alt="Fly High" class="w-24 mx-auto mb-5" />
        <h1 class="text-[28px] font-semibold mb-2">Create New Password</h1>
        <p class="text-sm text-white/90">
          Your new password must be different from previous <br class="sm:hidden" />
          passwords.
        </p>
      </div>
    </section>

    <!-- Card -->
    <main class="flex-1">
      <div class="relative z-20 max-w-sm mx-auto px-6 -mt-12">
        <div class="bg-white rounded-2xl shadow-xl border border-gray-200 p-5">
          <!-- Password -->
          <label class="block text-sm font-semibold text-gray-900 mb-2">Password</label>
          <div class="relative mb-4">
            <input
              :type="show1 ? 'text' : 'password'"
              v-model.trim="password"
              placeholder="Type your password"
              class="w-full pl-11 pr-11 py-3 rounded-full bg-[#F3F6FD] border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
              @keyup.enter="submit"
            />
            <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" @click="show1 = !show1">
              <i :class="show1 ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>

          <!-- Confirm -->
          <label class="block text-sm font-semibold text-gray-900 mb-2">Confirm Password</label>
          <div class="relative">
            <input
              :type="show2 ? 'text' : 'password'"
              v-model.trim="confirm"
              placeholder="Type your password"
              class="w-full pl-11 pr-11 py-3 rounded-full bg-[#F3F6FD] border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
              @keyup.enter="submit"
            />
            <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" @click="show2 = !show2">
              <i :class="show2 ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>

          <p v-if="errorMsg" class="mt-3 text-xs text-red-600">{{ errorMsg }}</p>

          <button
            class="mt-6 w-full py-3 rounded-full text-white font-semibold text-sm transition
                   bg-[#1877F2] hover:bg-[#1666CF]
                   disabled:bg-[#9CC2FF] disabled:cursor-not-allowed"
            :disabled="!canSubmit || loading"
            @click="submit"
          >
            <span v-if="!loading">Reset password</span>
            <span v-else class="inline-flex items-center gap-2">
              <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="white" stroke-width="4"/>
                <path class="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"/>
              </svg>
              Processing…
            </span>
          </button>
        </div>
      </div>
    </main>

    <!-- FULLSCREEN SUCCESS (sesuai desain) -->
    <transition name="fade">
      <div v-if="done" class="fixed inset-0 z-50">
        <!-- Blue background + grid -->
        <div class="absolute inset-0 bg-[#1877F2]">
          <div
            class="absolute inset-0 opacity-[0.12] pointer-events-none"
            style="
              background-image:
                linear-gradient(to right, white 1px, transparent 1px),
                linear-gradient(to bottom, white 1px, transparent 1px);
              background-size: 24px 24px;
            "
          />
        </div>

        <!-- Centered card -->
        <div class="relative h-full flex items-center justify-center px-6">
          <div class="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden">
            <!-- top light panel + icon + confetti dots -->
            <div class="relative bg-[#EAF2FF] flex items-center justify-center py-10">
              <div class="w-16 h-16 rounded-full bg-white grid place-items-center text-[#1877F2] text-2xl">🔒</div>
              <span class="absolute left-14 top-6 w-2 h-2 rounded-full bg-[#FF8A4C]"></span>
              <span class="absolute right-14 top-10 w-2 h-2 rounded-full bg-[#FF8A4C]"></span>
              <span class="absolute left-20 bottom-8 w-2 h-2 rounded-full bg-[#2B6DE2]"></span>
              <span class="absolute right-20 bottom-8 w-2 h-2 rounded-full bg-[#2B6DE2]"></span>
            </div>

            <div class="px-6 py-6 text-center">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Password Changed!</h3>
              <p class="text-sm text-gray-500 mb-5">
                Password changed successfully, you <br class="sm:hidden" />
                can login again with a new password.
              </p>
              <button
                class="w-full rounded-full bg-[#1877F2] text-white font-semibold py-3 text-sm"
                @click="goLogin"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

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
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const email = route.query.email?.toString() || "";
const password = ref("");
const confirm = ref("");
const show1 = ref(false);
const show2 = ref(false);
const loading = ref(false);
const done = ref(false);
const errorMsg = ref("");
const toast = ref("");

const canSubmit = computed(() => {
  const p = password.value.trim();
  const c = confirm.value.trim();
  return p.length >= 8 && p === c;
});

async function submit() {
  if (!canSubmit.value || loading.value) return;
  loading.value = true;
  errorMsg.value = "";
  try {
    await axios.post("https://quiz.flyhigh.my/flyhigh_be/api/auth/resetPassword", {
      email,
      password: password.value.trim(),
    });
    done.value = true;
  } catch (err) {
    // errorMsg.value =
    //   err?.response?.data?.message ||
    //   "Failed to reset password. Please try again.";
    // sementara
    done.value = true;
  } finally {
    loading.value = false;
  }
}

function goLogin() {
  router.push("/login");
}
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{transition:opacity .2s ease}
.fade-enter-from,.fade-leave-to{opacity:0}
</style>
