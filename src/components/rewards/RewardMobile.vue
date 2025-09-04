<template>
  <div class="min-h-screen bg-[#F9FAFB] pb-28">
    <!-- Header -->
    <div class="sticky top-0 z-10 bg-[#F9FAFB] px-4 pt-4 pb-2">
      <div class="flex items-center gap-3">
        <button class="w-9 h-9 grid place-items-center" @click="goBack">
          <i class="fas fa-arrow-left text-gray-800"></i>
        </button>
        <h1 class="text-[17px] font-normal text-gray-900">Rewards</h1>
      </div>
    </div>

    <!-- Total Points Card -->
    <section class="px-4">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 relative">
        <span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-semibold">
          Total Poin
        </span>

        <div class="flex items-start justify-between mt-2">
          <div class="leading-tight">
            <div class="text-[34px] font-bold text-[#0B63F6] tracking-tight">
              {{ totalXP }} XP
            </div>
          </div>
          <div class="text-3xl -mt-1">🔥</div>
        </div>

        <!-- Progress -->
        <div class="mt-2">
          <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div class="h-2 bg-[#2A7BF6] rounded-full transition-all" :style="{ width: topPercent + '%' }" />
          </div>

          <div class="mt-2 flex items-center justify-between text-[13px] text-gray-700">
            <div class="flex items-center gap-1">
              <span>{{ totalXP }}</span>
              <span>/</span>
              <span>{{ goalXP }}</span>
              <span class="-mt-[2px]">🎯</span>
            </div>
            <span class="text-gray-500">{{ topPercent }}%</span>
          </div>

          <p class="mt-2 text-[12px] text-gray-500">
            Rewards You Can Get With Your Points
          </p>
        </div>
      </div>
    </section>

    <!-- Rewards List -->
    <section class="px-4 mt-5">
      <h2 class="text-[15px] font-semibold text-gray-900 mb-3">Rewards to Get</h2>

      <div class="space-y-4">
        <article
          v-for="r in rewards"
          :key="r.id"
          :class="[
            'rounded-2xl border p-4 shadow-sm',
            r.claimable ? 'bg-[#F2F7FF] border-blue-100' : 'bg-white border-gray-100'
          ]"
        >
          <div class="flex items-start gap-3">
            <!-- thumb -->
            <div class="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
              <img v-if="r.image" :src="r.image" class="w-full h-full object-cover" />
              <span v-else class="text-xl">🎁</span>
            </div>

            <div class="flex-1">
              <div class="flex items-start justify-between">
                <h3 class="text-[15px] font-semibold text-gray-900 leading-tight">{{ r.title }}</h3>

                <!-- check on right -->
                <button
                  class="w-6 h-6 rounded-md grid place-items-center border"
                  :class="r.claimable ? 'bg-[#0B63F6] border-[#0B63F6] text-white' : 'bg-white border-gray-300 text-transparent'"
                  @click="toggleSelect(r)"
                >
                  <i class="fas fa-check text-[11px]"></i>
                </button>
              </div>

              <p class="text-[12px] text-gray-500 mt-0.5">
                <template v-if="r.claimable">Rewards can be redeemed now 🎉</template>
                <template v-else>{{ r.requirement }}</template>
              </p>

              <!-- cost + percent -->
              <div class="flex items-center justify-between mt-3 text-[13px]">
                <span class="font-semibold text-gray-900">{{ r.cost }} XP</span>
                <span :class="r.claimable ? 'text-[#0B63F6]' : 'text-gray-500'">{{ Math.round(r.progress * 100) }}%</span>
              </div>

              <!-- progress bar -->
              <div class="mt-2 h-2 w-full rounded-full overflow-hidden" :class="r.claimable ? 'bg-blue-100' : 'bg-gray-200'">
                <div
                  class="h-2 rounded-full"
                  :class="r.claimable ? 'bg-[#0B63F6]' : 'bg-gray-400'"
                  :style="{ width: (r.progress * 100) + '%' }"
                />
              </div>

              <!-- redeem button -->
              <button
                class="mt-3 w-full py-2.5 rounded-xl text-[14px] font-semibold transition"
                :class="r.claimable ? 'bg-[#0B63F6] text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'"
                :disabled="!r.claimable"
                @click="redeem(r)"
              >
                Redeem
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Toast -->
    <transition name="fade">
      <div
        v-if="toast.show"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/80 text-white text-sm px-3 py-2 rounded-lg"
      >
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { LeaderboardByUserId } from "@/api/leaderboardApi"; // <- sama seperti dashboard

const router = useRouter();
const auth = useAuthStore();
function goBack() { router.back(); }

/* ===================== XP dari backend (sama seperti dashboard) ===================== */
const totalXP = ref(0);
async function fetchXP() {
  try {
    const data = await LeaderboardByUserId(auth.userId);
    // di dashboard dipakai leaderboardScore[0]?.XP
    totalXP.value = Number(data?.[0]?.XP ?? 0);
  } catch (e) {
    console.error("Failed to load XP:", e);
    totalXP.value = 0;
  }
}
fetchXP();

/* ===================== Ringkasan atas ===================== */
const goalXP = ref(500);
const topPercent = computed(() => Math.min(100, Math.round((totalXP.value / goalXP.value) * 100)));

/* ===================== Rewards list (dummy + dihitung dari XP) ===================== */
/* Definisi dasar reward (biaya XP & syarat info) */
const baseRewards = ref([
  { id: 1, title: "Backpack",      cost: 400, requirement: "", image: "../../rewards/reward1.png" },
  { id: 2, title: "Pencil Case",   cost: 400, requirement: "", image: "../../rewards/reward2.png" },
  { id: 3, title: "Stationery Set",cost: 400, requirement: "Need to Finish 30 Quizzes", image: "../../rewards/reward3.png" },
  { id: 4, title: "Notebooks",     cost: 400, requirement: "Need to Finish 30 Quizzes", image: "../../rewards/reward1.png" },
]);

/* Tampilan final yang tergantung XP user */
const rewards = ref([]);
function recomputeRewards() {
  rewards.value = baseRewards.value.map((b) => {
    const progress = Math.min(totalXP.value / b.cost, 1);
    const claimable = progress >= 1 && b.requirement === ""; // jika ada requirement lain, tetap belum claimable
    return {
      ...b,
      progress,
      claimable,
      selected: claimable, // default centang untuk yang sudah bisa di-claim
    };
  });
}
watch(totalXP, recomputeRewards, { immediate: true });

/* ===================== Actions ===================== */
function toggleSelect(r) {
  if (!r.claimable) return;
  r.selected = !r.selected;
}

function redeem(r) {
  if (!r.claimable) return;
  if (totalXP.value < r.cost) {
    showToast("Not enough XP to redeem");
    return;
  }
  // contoh efek lokal: kurangi XP & update view
  totalXP.value -= r.cost;
  showToast(`Redeemed: ${r.title}`);
}

/* ===================== Toast kecil ===================== */
const toast = reactive({ show: false, message: "" });
let toastTimer;
function showToast(message) {
  toast.message = message;
  toast.show = true;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toast.show = false), 1600);
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .18s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
