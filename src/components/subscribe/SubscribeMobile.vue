<template>
  <div class="min-h-screen bg-[#F9FAFB] flex flex-col">
    <!-- Header -->
    <header class="sticky top-0 bg-transparent z-10 border-none">
      <div class="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
        <button class="p-2 -ml-2" @click="goBack" aria-label="Back">
          <i class="fas fa-arrow-left text-lg text-gray-900"></i>
        </button>
        <h1 class="text-base font-normal text-gray-900">Subscribe</h1>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1">
      <div class="max-w-md mx-auto px-4 pt-4 pb-28">
        <h2 class="text-lg font-normal text-gray-900 mb-3">
          Choose Member Plan
        </h2>

        <div class="space-y-4">
          <!-- Plan Card -->
          <div
            v-for="plan in plans"
            :key="plan.id"
            class="relative rounded-2xl bg-white transition-all cursor-pointer"
            :class="isActive(plan.id)
              ? 'border border-[#0B63F6] ring-1 ring-blue-200 p-1'
              : 'border border-gray-200 p-4 hover:border-gray-300'"
            @click="!isActive(plan.id) && (selectedPlanId = plan.id)"
          >
            <!-- Badge Active -->
            <div
              v-if="isActive(plan.id)"
              class="absolute -top-3 right-6 bg-[#F59E0B] text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow"
            >
              Your Subs
            </div>

            <!-- Inner Panel (biru saat aktif) -->
            <div :class="isActive(plan.id) ? 'rounded-2xl bg-[#0B63F6] p-4 text-white' : ''">
              <!-- Price row -->
              <div class="mb-2">
                <p class="font-extrabold leading-none">
                  <span :class="isActive(plan.id) ? 'text-white' : 'text-[#0B63F6]'" class="text-2xl">
                    {{ plan.price }} {{ currency }}
                  </span>
                  <span :class="isActive(plan.id) ? 'text-white/80' : 'text-gray-500'" class="font-medium">
                    /month
                  </span>
                </p>
              </div>

              <!-- Title & subtitle -->
              <div class="space-y-0.5">
                <p :class="isActive(plan.id) ? 'text-white' : 'text-gray-900'" class="text-base font-semibold">
                  {{ plan.title }}
                </p>
                <p :class="isActive(plan.id) ? 'text-white/90' : 'text-gray-500'" class="text-sm">
                  {{ plan.subtitle }}
                </p>
              </div>

              <!-- CTA (hanya untuk yang tidak aktif) -->
              <div v-if="!isActive(plan.id)" class="mt-3 flex justify-end">
                <button
                  class="px-4 py-2 text-sm rounded-full border border-blue-500 text-blue-600 font-semibold"
                  @click.stop="selectAndUpgrade(plan.id)"
                >
                  Upgrade
                </button>
              </div>
            </div>
          </div>
          <!-- /Plan Card -->
        </div>
      </div>
    </main>

    <!-- Bottom Actions -->
    <footer class="fixed bottom-0 left-0 right-0 bg-[#F9FAFB]">
      <div class="max-w-md mx-auto px-4 pb-6 pt-2">
        <button
          class="w-full bg-[#0B63F6] hover:bg-[#155EE0] disabled:bg-[#93C5FD] text-white py-3.5 rounded-xl text-base font-semibold shadow"
          @click="upgrade"
          :disabled="processing || !canUpgrade"
        >
          {{ processing ? 'Processing...' : 'Upgrade' }}
        </button>
        <button
          class="w-full mt-3 text-red-500 text-base font-medium"
          @click="openCancelModal"
          :disabled="processing"
        >
          Cancel subscribe
        </button>
      </div>
    </footer>

    <!-- Cancel Modal (Bottom Sheet) -->
    <transition name="fade">
      <div
        v-if="cancelModalOpen"
        class="fixed inset-0 z-50 bg-black/40 flex items-end justify-center lg:items-center"
        @keydown.esc="closeCancelModal"
        @click="closeCancelModal"
      >
        <div
          class="w-full max-w-md bg-white rounded-t-3xl lg:rounded-2xl p-6 pb-5 shadow-xl"
          @click.stop
        >
          <div class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3 lg:hidden"></div>

          <div class="flex justify-center mb-3">
            <img src="@/assets/unsubscribe.png" alt="unsubscribe" class="w-40 h-40 object-contain" />
          </div>

          <h3 class="text-base font-semibold text-center text-gray-900">
            Sure want unsubscription?
          </h3>
          <p class="text-sm text-gray-500 text-center mt-1">
            Kamu akan kehilangan semua benefit
          </p>

          <div class="mt-5 space-y-3">
            <button
              class="w-full bg-[#0B63F6] hover:bg-[#155EE0] text-white py-3 rounded-xl text-base font-semibold"
              @click="closeCancelModal"
              :disabled="processing"
            >
              Stay subscribe
            </button>
            <button
              class="w-full bg-[#F87171] hover:bg-[#ef4444] text-white py-3 rounded-xl text-base font-semibold disabled:opacity-60"
              @click="confirmUnsubscribe"
              :disabled="processing"
            >
              {{ processing ? 'Unsubscribing...' : 'Unsubscribe' }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Success Modal (Center) -->
    <transition name="fade">
      <div
        v-if="successModalOpen"
        class="fixed inset-0 z-50 bg-black/40 flex items-end justify-center"
        @keydown.esc="closeSuccessModal"
        @click="closeSuccessModal"
      >
        <div
          class="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl text-center"
          @click.stop
        >
          <img src="@/assets/unsubscribe.png" alt="success" class="w-36 h-36 object-contain mx-auto mb-2" />
          <h3 class="text-base font-semibold text-gray-900 mb-1">
            Unsubscription success
          </h3>
          <p class="text-sm text-gray-500 mb-6">
            Kamu sudah kehilangan semua benefit
          </p>
          <button
            class="w-full bg-[#0B63F6] hover:bg-[#155EE0] text-white py-3 rounded-xl text-base font-semibold"
            @click="closeSuccessModal"
          >
            OK
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  currentPlanId: { type: String, default: "monthly" },
  currency: { type: String, default: "MYR" },
});

const router = useRouter();
const currency = computed(() => props.currency);

const plans = ref([
  { id: "monthly",    price: 19,  title: "Monthly plan",    subtitle: "Recurring monthly billing" },
  { id: "semiannual", price: 299, title: "6 months plan",   subtitle: "Get over 20% off" },
  { id: "yearly",     price: 399, title: "Yearly plan",     subtitle: "Get over 40% off" },
]);

const selectedPlanId = ref(props.currentPlanId);
const processing = ref(false);

// Modals
const cancelModalOpen = ref(false);
const successModalOpen = ref(false);

// Helpers
const isActive = (id) => id === props.currentPlanId;
const canUpgrade = computed(() => selectedPlanId.value !== props.currentPlanId);

// Navigation
function goBack() {
  router.back();
}

// Upgrade handlers
function selectAndUpgrade(id) {
  selectedPlanId.value = id;
  upgrade();
}

async function upgrade() {
  if (!canUpgrade.value) return;
  try {
    processing.value = true;
    // await UpgradePlanAPI({ planId: selectedPlanId.value });
    console.log("Upgrading to:", selectedPlanId.value);
  } catch (e) {
    console.error(e);
  } finally {
    processing.value = false;
  }
}

// Cancel modal handlers
function openCancelModal() {
  cancelModalOpen.value = true;
}
function closeCancelModal() {
  if (processing.value) return;
  cancelModalOpen.value = false;
}

async function confirmUnsubscribe() {
  try {
    processing.value = true;
    // await CancelSubscriptionAPI()
    console.log("Unsubscribe confirmed");
    cancelModalOpen.value = false;
    successModalOpen.value = true; // ✅ tampilkan modal sukses
  } catch (e) {
    console.error(e);
  } finally {
    processing.value = false;
  }
}

function closeSuccessModal() {
  successModalOpen.value = false;
  // optional: redirect/refresh data
  // router.replace('/'); atau emit event ke parent
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
