<template>
  <div class="min-h-screen flex flex-col">
    <!-- Upgrade Premium Screen -->
    <div v-if="showUpgradePremiumScreen" class="min-h-screen bg-[#F9FAFB] flex flex-col">
      <!-- Header -->
      <header class="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-none">
        <div class="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <button class="p-2 -ml-2" @click="goBackFromUpgrade" aria-label="Back">
            <i class="fas fa-arrow-left text-lg text-gray-900"></i>
          </button>
          <h1 class="text-base font-normal text-gray-900">Upgrade premium</h1>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1">
        <div class="max-w-md mx-auto px-4 pt-4 pb-28">
          <!-- Orange Banner -->
          <div class="bg-[#FF7A00] text-white rounded-2xl p-6 mb-6 text-center">
            <h2 class="text-lg font-semibold mb-2">It's time for Upgrade!</h2>
            <p class="text-white/90 text-sm">
              Upgrade to remove ads, unlimited play and access all game only with $2/month
            </p>
          </div>

          <!-- Premium Benefits -->
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Premium Benefit</h3>
          
          <div class="space-y-4">
            <!-- Unlimited Playing -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div class="flex flex-col items-center text-center">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <img src="@/assets/game.png" alt="Game" class="w-8 h-8" />
                </div>
                <h4 class="font-semibold text-gray-900 mb-2 text-base">Unlimited Playing</h4>
                <p class="text-sm text-gray-500 leading-relaxed">
                  Get unlimited access to all quiz to make your day happier with playing a game
                </p>
              </div>
            </div>

            <!-- Free and No Ads -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div class="flex flex-col items-center text-center">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <img src="@/assets/mobile.png" alt="Mobile" class="w-8 h-8" />
                </div>
                <h4 class="font-semibold text-gray-900 mb-2 text-base">Free and No Ads</h4>
                <p class="text-sm text-gray-500 leading-relaxed">
                  Ad-free and hassle-free with a premium subscription.
                </p>
              </div>
            </div>

            <!-- Unlimited Quiz -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div class="flex flex-col items-center text-center">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <img src="@/assets/colorfilter.png" alt="Color Filter" class="w-8 h-8" />
                </div>
                <h4 class="font-semibold text-gray-900 mb-2 text-base">Unlimited quiz</h4>
                <p class="text-sm text-gray-500 leading-relaxed">
                  Get unlimited access to all quiz to make your day happier with playing a game
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Bottom Actions -->
      <footer class="fixed bottom-0 left-0 right-0">
        <div class="max-w-md mx-auto px-4 pb-6 pt-2">
          <button
            class="w-full bg-[#0B63F6] hover:bg-[#155EE0] text-white py-3.5 rounded-xl text-base font-semibold shadow-lg"
            @click="continueToPlans"
          >
            Continue
          </button>
        </div>
      </footer>
    </div>

    <!-- Quiz Intro Screen -->
    <div
      v-else-if="showQuizIntro"
      class="min-h-screen bg-[#007CEF] relative flex flex-col items-center px-4"
    >
      <!-- Decorative Circle -->
      <div class="absolute top-24 w-80 h-80 bg-blue-300/30 rounded-full"></div>

      <!-- Stacked Cards Container -->
      <div class="relative z-10 mt-32 mb-8 flex justify-center">
        <!-- Third Card (back) - largest, centered -->
        <div class="absolute top-16 w-48 h-24 bg-white rounded-2xl"></div>
        <!-- Second Card (middle) - medium, centered -->
        <div class="absolute w-56 h-32 bg-white rounded-2xl"></div>
        <!-- Main Card (front) - smallest, centered -->
        <div class="relative w-64 h-24 bg-white rounded-2xl p-4">
          <!-- Question Indicator -->
          <div class="text-red-500 text-xs font-medium mb-2 text-center">
            01/25
          </div>

          <!-- Question Text -->
          <div
            class="text-gray-800 text-center font-medium text-sm leading-relaxed"
          >
            What is the total number of marbles Budi has now?
          </div>
        </div>

        <!-- Category Badge - positioned to overlay the cards -->
        <div
          class="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-900 rounded-2xl w-3/5 h-2/3 px-2 flex items-center gap-2 z-30"
        >
          <div
            class="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center flex-shrink-0"
          >
            <img src="@/assets/book.png" alt="Book" class="w-[22px] h-[22px]" />
          </div>
          <span class="text-white text-sm font-medium"
            >10+<br />Quiz category</span
          >
        </div>
      </div>

      <!-- Bottom Section - Separated with more spacing -->
      <div class="text-center mb-8 mt-16">
        <h1 class="text-white text-2xl font-bold mb-2">Let's start the quiz</h1>
        <p class="text-white/90 text-sm">
          Answer all the questions to the best of your ability
        </p>
      </div>

      <!-- Buttons positioned at bottom -->
      <div class="w-full max-w-sm space-y-4 mt-auto mb-8">
        <!-- Premium Button -->
        <button
          class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 mx-auto"
        >
          <i class="fas fa-crown text-sm"></i>
          <span class="text-sm font-medium">Premium</span>
        </button>

        <!-- Let's Go Button -->
        <button
          @click="startQuiz"
          class="w-full bg-white hover:bg-gray-50 text-[#007CEF] py-3 rounded-full text-base font-semibold"
        >
          Let's Go
        </button>

        <!-- Change My Mind Button -->
        <button
          @click="showMemberPlan"
          class="w-full border-2 border-white text-white hover:bg-white/10 py-3 rounded-full text-base font-semibold"
        >
          Change My Mind
        </button>
      </div>
    </div>

    <!-- Original Subscribe Content -->
    <div v-else class="min-h-screen bg-[#F9FAFB] flex flex-col">
      <!-- Header -->
      <header class="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-none">
        <div class="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <button class="p-2 -ml-2" @click="goBackFromMemberPlan" aria-label="Back">
            <i class="fas fa-arrow-left text-lg text-gray-900"></i>
          </button>
          <h1 class="text-base font-normal text-gray-900">Choose Member Plan</h1>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1">
        <div class="max-w-md mx-auto px-4 pt-4 pb-28">
          <!-- Orange Banner -->
          <div class="bg-[#FF7A00] text-white rounded-2xl p-6 mb-6 text-center">
            <h2 class="text-lg font-semibold mb-2">It's time for Upgrade!</h2>
            <p class="text-white/90 text-sm">
              Upgrade to remove ads, unlimited play and access all game only with $2/month
            </p>
          </div>

          <h2 class="text-lg font-normal text-gray-900 mb-3">
            Choose Member Plan
          </h2>

          <div class="space-y-3">
            <!-- Plan Card -->
            <div
              v-for="plan in plans"
              :key="plan.id"
              class="relative cursor-pointer"
              @click="selectedPlanId = plan.id"
            >
              <!-- SAVE Badge -->
              <div
                v-if="plan.badge"
                class="absolute -top-2 right-4 bg-[#F59E0B] text-white text-xs font-semibold px-3 py-1 rounded-lg z-10"
              >
                {{ plan.badge }}
              </div>

              <!-- Plan Card Container -->
              <div
                :class="[
                  'rounded-2xl transition-all duration-200',
                  selectedPlanId === plan.id
                    ? 'bg-white border-2 border-[#0B63F6] p-1'
                    : 'bg-white border border-gray-200 hover:border-gray-300 p-4',
                ]"
              >
                <!-- Inner Content (Blue when selected) -->
                <div
                  :class="
                    selectedPlanId === plan.id
                      ? 'bg-[#0B63F6] text-white rounded-xl p-4'
                      : ''
                  "
                >
                  <!-- Price -->
                  <div class="mb-2">
                    <span
                      :class="
                        selectedPlanId === plan.id ? 'text-white' : 'text-[#0B63F6]'
                      "
                      class="text-2xl font-bold"
                    >
                      {{ plan.price }} {{ currency }}
                    </span>
                    <span
                      :class="
                        selectedPlanId === plan.id ? 'text-white/80' : 'text-gray-500'
                      "
                      class="text-sm font-medium"
                    >
                      /month
                    </span>
                  </div>

                  <!-- Title -->
                  <h3
                    :class="
                      selectedPlanId === plan.id ? 'text-white' : 'text-gray-900'
                    "
                    class="text-base font-semibold mb-1"
                  >
                    {{ plan.title }}
                  </h3>

                  <!-- Subtitle -->
                  <p
                    :class="
                      selectedPlanId === plan.id ? 'text-white/90' : 'text-gray-500'
                    "
                    class="text-sm"
                  >
                    {{ plan.subtitle }}
                  </p>
                </div>
              </div>
            </div>
            <!-- /Plan Card -->
          </div>
        </div>
      </main>

      <!-- Bottom Actions -->
      <footer class="fixed bottom-0 left-0 right-0 pointer-events-none">
        <div class="max-w-md mx-auto px-4 pb-6 pt-2 pointer-events-auto">
          <button
            class="w-full bg-[#0B63F6] hover:bg-[#155EE0] text-white py-3.5 rounded-xl text-base font-semibold shadow-xl"
            @click="showPaymentModal"
            :disabled="processing || !canUpgrade"
          >
            Continue
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
            <div
              class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3 lg:hidden"
            ></div>

            <div class="flex justify-center mb-3">
              <img
                src="@/assets/unsubscribe.png"
                alt="unsubscribe"
                class="w-40 h-40 object-contain"
              />
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
                {{ processing ? "Unsubscribing..." : "Unsubscribe" }}
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
            <img
              src="@/assets/unsubscribe.png"
              alt="success"
              class="w-36 h-36 object-contain mx-auto mb-2"
            />
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

    <!-- Upgrade Modal Popup -->
    <Transition name="modal">
      <div
        v-if="showUpgradeModal"
        class="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-4"
        @click="closeUpgradeModal"
      >
        <div
          class="w-full max-w-md bg-white rounded-t-3xl rounded-b-3xl p-6 mb-4 transform transition-transform duration-300"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="flex justify-end items-center mb-2">
            <button
              @click="closeUpgradeModal"
              class="p-2 hover:bg-gray-100 rounded-full"
            >
              <i class="fas fa-times text-gray-500"></i>
            </button>
          </div>

          <!-- Modal Content -->
          <div class="text-center mb-4">
            <img
              src="@/assets/crown-uprage-pro.png"
              alt="crown"
              class="w-32 h-32 flex items-center justify-center mx-auto"
            />
            <h4 class="text-lg font-semibold text-gray-900 mb-1">
              It's time for Upgrade!
            </h4>
            <p class="text-gray-600 text-sm">
              Upgrade to remove ads, unlimited play and access all game only
              with $2/month
            </p>
          </div>

          <!-- Modal Actions -->
          <div>
            <button
              @click="upgradeNow"
              class="w-full bg-blue-600 text-white py-3 rounded-full text-base font-semibold hover:bg-blue-700"
            >
              Upgrade pro first
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>

  <!-- Payment Method Modal (Bottom Sheet Style) -->
  <transition name="slide-up">
    <div
      v-if="showPaymentMethodModal"
      class="fixed bottom-0 left-0 right-0 z-50"
    >
      <div class="w-full bg-white rounded-t-3xl shadow-2xl border-t border-gray-100">
        <PaymentMethodModal @close="closePaymentModal" @paymentSuccess="handlePaymentSuccess" />
      </div>
    </div>
  </transition>

  <!-- Success Modal -->
  <SuccessModal v-if="showSuccessModal" @close="closeSuccessModal" />
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import PaymentMethodModal from "@/components/subscribe/PaymentMethodModal.vue";
import SuccessModal from "@/components/subscribe/SuccessModal.vue";

const props = defineProps({
  currentPlanId: { type: String, default: "monthly" },
  currency: { type: String, default: "MYR" },
});

const router = useRouter();
const currency = computed(() => props.currency);

// Quiz intro state
const showQuizIntro = ref(true);

const plans = ref([
  {
    id: "free",
    price: 0,
    title: "Free",
    subtitle: "Access to basic features",
  },
  {
    id: "monthly",
    price: 19,
    title: "Monthly plan",
    subtitle: "Recurring monthly billing",
    badge: "SAVE 30%",
  },
  {
    id: "semiannual",
    price: 299,
    title: "6 months plan",
    subtitle: "Get over 20% off",
  },
  {
    id: "yearly",
    price: 399,
    title: "Yearly plan",
    subtitle: "Get over 40% off",
  },
]);

const selectedPlanId = ref(props.currentPlanId);
const processing = ref(false);

// Modals
const cancelModalOpen = ref(false);
const successModalOpen = ref(false);
const showUpgradeModal = ref(false);
const showUpgradePremiumScreen = ref(false);
const showPaymentMethodModal = ref(false);
const showSuccessModal = ref(false);

// Helpers
// const isActive = (id) => id === props.currentPlanId;
const canUpgrade = computed(() => selectedPlanId.value !== props.currentPlanId);

// Navigation
// function goBack() {
//   router.back();
// }

// Upgrade handlers
// function selectAndUpgrade(id) {
//   selectedPlanId.value = id;
//   upgrade();
// }

// async function upgrade() {
//   if (!canUpgrade.value) return;
//   try {
//     processing.value = true;
//     // await UpgradePlanAPI({ planId: selectedPlanId.value });
//   } catch (e) {
//     console.error(e);
//   } finally {
//     processing.value = false;
//   }
// }

// Cancel modal handlers
// function openCancelModal() {
//   cancelModalOpen.value = true;
// }
function closeCancelModal() {
  if (processing.value) return;
  cancelModalOpen.value = false;
}

async function confirmUnsubscribe() {
  try {
    processing.value = true;
    // await CancelSubscriptionAPI()
    cancelModalOpen.value = false;
    // successModalOpen.value = true; // ✅ tampilkan modal sukses
  } catch (e) {
    console.error(e);
  } finally {
    processing.value = false;
  }
}

// function closeSuccessModal() {
//   successModalOpen.value = false;
//   // optional: redirect/refresh data
//   // router.replace('/'); atau emit event ke parent
// }

// Quiz intro handlers
function startQuiz() {
  // Show upgrade modal popup
  showUpgradeModal.value = true;
}

function showMemberPlan() {
  // Navigate back to previous page
  router.back();
}

// Upgrade modal handlers
function closeUpgradeModal() {
  showUpgradeModal.value = false;
}

function upgradeNow() {
  // Show upgrade premium screen
  showUpgradeModal.value = false;
  showQuizIntro.value = false;
  showUpgradePremiumScreen.value = true;
}

// Upgrade premium screen handlers
function goBackFromUpgrade() {
  showUpgradePremiumScreen.value = false;
  showQuizIntro.value = true;
}

function continueToPlans() {
  showUpgradePremiumScreen.value = false;
  // Show the original subscribe content (member plans)
}

// Member plan handlers
function goBackFromMemberPlan() {
  showUpgradePremiumScreen.value = true;
}

// Payment modal handlers
function showPaymentModal() {
  console.log('showPaymentModal called'); // Debug log
  showPaymentMethodModal.value = true;
  console.log('showPaymentMethodModal:', showPaymentMethodModal.value); // Debug log
}

function closePaymentModal() {
  showPaymentMethodModal.value = false;
}

// Handle payment success
function handlePaymentSuccess(paymentMethod) {
  console.log('Payment successful with method:', paymentMethod);
  // Close payment modal
  showPaymentMethodModal.value = false;
  // Show success modal
  showSuccessModal.value = true;
}

// Close success modal
function closeSuccessModal() {
  showSuccessModal.value = false;
}
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

/* Modal animation */
.modal-enter-active {
  transition: all 0.3s ease-out;
}
.modal-leave-active {
  transition: all 0.3s ease-in;
}
.modal-enter-from {
  opacity: 0;
}
.modal-enter-from .w-full.max-w-md {
  transform: translateY(100%);
}
.modal-leave-to {
  opacity: 0;
}
.modal-leave-to .w-full.max-w-md {
  transform: translateY(100%);
}

/* Bottom Sheet Slide Up Animation */
.slide-up-enter-active {
  transition: transform 0.3s ease-out;
}
.slide-up-leave-active {
  transition: transform 0.3s ease-in;
}
.slide-up-enter-from {
  transform: translateY(100%);
}
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
