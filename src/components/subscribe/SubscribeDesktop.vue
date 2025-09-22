<template>
  <div class="min-h-screen bg-[#F9FAFB] flex flex-col">
    <!-- Header -->
    <header class="sticky top-0 bg-transparent z-10 border-none">
      <div class="mx-auto px-6 py-4 flex items-center gap-3">
        <button class="p-2 -ml-2" @click="goBack" aria-label="Back">
          <i class="fas fa-arrow-left text-lg text-gray-900"></i>
        </button>
        <h1 class="text-xl font-medium text-gray-900">Back</h1>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1">
      <div class="max-w-2xl mx-auto px-6 py-8">
        <!-- Orange Banner - Shared Header -->
        <div class="bg-[#FF7A00] text-white rounded-2xl p-6 mb-6 text-center">
          <h2 class="text-xl font-semibold mb-2">It's time for Upgrade!</h2>
          <p class="text-white/90 text-sm">
            Upgrade to premium plan, unlimited play and access all premium only
            with $7/month.
          </p>
        </div>

        <!-- Step 1: Premium Benefits -->
        <div v-if="currentStep === 1">
          <!-- Premium Benefits -->
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Premium Benefit
          </h3>
          <div class="grid grid-cols-3 gap-3 mb-8">
            <!-- Unlimited Playing -->
            <div
              class="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100"
            >
              <div
                class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <i class="fas fa-gamepad text-[#0B63F6] text-lg"></i>
              </div>
              <h4 class="font-semibold text-gray-900 mb-2 text-sm">
                Unlimited Playing
              </h4>
              <p class="text-xs text-gray-500 leading-tight">
                Get unlimited access to all quiz to make your day happier with
                playing a game
              </p>
            </div>

            <!-- Free and No Ads -->
            <div
              class="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100"
            >
              <div
                class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <i class="fas fa-ban text-[#0B63F6] text-lg"></i>
              </div>
              <h4 class="font-semibold text-gray-900 mb-2 text-sm">
                Free and No Ads
              </h4>
              <p class="text-xs text-gray-500 leading-tight">
                Ad-free and hassle-free with a premium subscription
              </p>
            </div>

            <!-- Unlimited Quiz -->
            <div
              class="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100"
            >
              <div
                class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <i class="fas fa-infinity text-[#0B63F6] text-lg"></i>
              </div>
              <h4 class="font-semibold text-gray-900 mb-2 text-sm">
                Unlimited quiz
              </h4>
              <p class="text-xs text-gray-500 leading-tight">
                Get unlimited access to all quiz to make your day happier with
                playing a game
              </p>
            </div>
          </div>

          <!-- Continue Button -->
          <button
            class="w-full bg-[#0B63F6] text-white py-4 rounded-xl text-base font-semibold hover:bg-[#155EE0] transition-colors"
            @click="currentStep = 2"
          >
            Continue
          </button>
        </div>

        <!-- Step 2: Choose Member Plan -->
        <div v-if="currentStep === 2" class="relative">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Choose Member Plan
          </h3>

          <div class="space-y-2 mb-6">
            <!-- Monthly Plan -->
            <div
              class="relative cursor-pointer"
              @click="selectedPlan = 'monthly'"
            >
              <!-- Save 30% Badge -->
              <div
                v-if="selectedPlan === 'monthly'"
                class="absolute -top-2 right-4 bg-orange-400 text-white text-xs font-semibold px-3 py-1 rounded-lg z-10"
              >
                SAVE 30%
              </div>
              <div
                :class="[
                  'rounded-xl transition-all duration-200',
                  selectedPlan === 'monthly'
                    ? 'bg-white border-2 border-[#0B63F6] px-3 py-2'
                    : 'bg-white border-2 border-gray-200 hover:border-gray-300 p-4',
                ]"
              >
                <div
                  v-if="selectedPlan === 'monthly'"
                  class="bg-[#0B63F6] text-white rounded-2xl p-4"
                >
                  <div class="flex items-center justify-between mb-1">
                    <div>
                      <span class="text-xl font-bold">19 MYR</span>
                      <span class="text-white/80 text-sm">/month</span>
                    </div>
                  </div>
                  <h4 class="font-semibold text-base mb-1">Monthly plan</h4>
                  <p class="text-white/80 text-xs">Recurring monthly billing</p>
                </div>
                <div v-else>
                  <div class="flex items-center justify-between mb-1">
                    <div>
                      <span class="text-xl font-bold">19 MYR</span>
                      <span class="text-gray-500 text-sm">/month</span>
                    </div>
                  </div>
                  <h4 class="font-semibold text-base mb-1 text-gray-900">
                    Monthly plan
                  </h4>
                  <p class="text-gray-500 text-xs">Recurring monthly billing</p>
                </div>
              </div>
            </div>

            <!-- 6 Months Plan -->
            <div class="cursor-pointer" @click="selectedPlan = 'semiannual'">
              <div
                :class="[
                  'rounded-2xl transition-all duration-200',
                  selectedPlan === 'semiannual'
                    ? 'bg-white border-2 border-[#0B63F6] px-3 py-2'
                    : 'bg-white border-2 border-gray-200 hover:border-gray-300 p-4',
                ]"
              >
                <div
                  v-if="selectedPlan === 'semiannual'"
                  class="bg-[#0B63F6] text-white rounded-2xl p-4"
                >
                  <div class="mb-1">
                    <span class="text-xl font-bold text-white">299 MYR</span>
                    <span class="text-white/80 text-sm">/month</span>
                  </div>
                  <h4 class="font-semibold text-base mb-1">6 months plan</h4>
                  <p class="text-white/80 text-xs">Get over 20% off</p>
                </div>
                <div v-else>
                  <div class="mb-1">
                    <span class="text-xl font-bold text-[#0B63F6]"
                      >299 MYR</span
                    >
                    <span class="text-gray-500 text-sm">/month</span>
                  </div>
                  <h4 class="font-semibold text-base mb-1 text-gray-900">
                    6 months plan
                  </h4>
                  <p class="text-gray-500 text-xs">Get over 20% off</p>
                </div>
              </div>
            </div>

            <!-- Yearly Plan -->
            <div class="cursor-pointer" @click="selectedPlan = 'yearly'">
              <div
                :class="[
                  'rounded-2xl transition-all duration-200',
                  selectedPlan === 'yearly'
                    ? 'bg-white border-2 border-[#0B63F6] px-3 py-2'
                    : 'bg-white border-2 border-gray-200 hover:border-gray-300 p-4',
                ]"
              >
                <div
                  v-if="selectedPlan === 'yearly'"
                  class="bg-[#0B63F6] text-white rounded-2xl p-4"
                >
                  <div class="mb-1">
                    <span class="text-xl font-bold text-white">399 MYR</span>
                    <span class="text-white/80 text-sm">/month</span>
                  </div>
                  <h4 class="font-semibold text-base mb-1">Yearly plan</h4>
                  <p class="text-white/80 text-xs">Get over 40% off</p>
                </div>
                <div v-else>
                  <div class="mb-1">
                    <span class="text-xl font-bold text-[#0B63F6]"
                      >399 MYR</span
                    >
                    <span class="text-gray-500 text-sm">/month</span>
                  </div>
                  <h4 class="font-semibold text-base mb-1 text-gray-900">
                    Yearly plan
                  </h4>
                  <p class="text-gray-500 text-xs">Get over 40% off</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Continue Button -->
          <button
            class="w-full bg-[#0B63F6] text-white py-3 rounded-xl text-base font-semibold hover:bg-[#155EE0] transition-colors duration-200"
            @click="showPaymentModal = true"
          >
            Continue
          </button>
        </div>

        <!-- Payment Method Modal -->
        <div
          v-if="showPaymentModal"
          class="fixed inset-0 flex items-center justify-center z-50"
        >
          <!-- Background overlay -->
          <div
            class="fixed inset-0 bg-black/40"
            @click="showPaymentModal = false"
          ></div>

          <!-- Modal Content -->
          <div
            class="relative bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4"
          >
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-semibold text-gray-900">
                Payment Methodss
              </h3>
              <button
                @click="showPaymentModal = false"
                class="text-gray-400 hover:text-gray-600"
              >
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>

            <div class="space-y-4 mb-6">
              <!-- PayPal -->
              <div
                class="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50"
                :class="
                  selectedPayment === 'paypal'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                "
                @click="selectedPayment = 'paypal'"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"
                  >
                    <i class="fab fa-paypal text-white text-sm"></i>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">Paypal</p>
                    <p class="text-sm text-gray-500">sask****@gmail.com</p>
                  </div>
                </div>
                <div
                  class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  :class="
                    selectedPayment === 'paypal'
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  "
                >
                  <i
                    v-if="selectedPayment === 'paypal'"
                    class="fas fa-check text-white text-xs"
                  ></i>
                </div>
              </div>

              <!-- Mastercard -->
              <div
                class="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50"
                :class="
                  selectedPayment === 'mastercard'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200'
                "
                @click="selectedPayment = 'mastercard'"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 bg-red-500 rounded flex items-center justify-center"
                  >
                    <i class="fab fa-cc-mastercard text-white text-sm"></i>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">Mastercard</p>
                    <p class="text-sm text-gray-500">4827 8472 7424 ****</p>
                  </div>
                </div>
                <div
                  class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  :class="
                    selectedPayment === 'mastercard'
                      ? 'border-red-500 bg-red-500'
                      : 'border-gray-300'
                  "
                >
                  <i
                    v-if="selectedPayment === 'mastercard'"
                    class="fas fa-check text-white text-xs"
                  ></i>
                </div>
              </div>

              <!-- Add Payment Method -->
              <button
                class="flex items-center gap-3 p-4 w-full text-left hover:bg-gray-50 rounded-xl"
              >
                <div
                  class="w-8 h-8 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center"
                >
                  <i class="fas fa-plus text-gray-400 text-sm"></i>
                </div>
                <span class="text-orange-500 font-medium"
                  >Add Payment Method</span
                >
              </button>
            </div>

            <!-- Confirm Payment Button -->
            <button
              class="w-full bg-[#0B63F6] text-white py-4 rounded-xl text-base font-semibold hover:bg-[#155EE0]"
              @click="processPayment"
              :disabled="processing"
            >
              {{ processing ? "Processing..." : "Confirm Payment" }}
            </button>
          </div>
        </div>
        <div v-if="showSuccessModal">
          <!-- Background overlay -->
          <div class="fixed inset-0 bg-black/40 z-40"></div>

          <!-- Success Modal -->
          <div
            class="fixed inset-x-4 top-1/2 transform -translate-y-1/2 z-50 bg-white rounded-2xl p-8 shadow-xl max-w-md mx-auto text-center"
          >
            <!-- Success Icon -->
            <div class="w-24 h-24 mx-auto mb-6 relative">
              <div
                class="w-full h-full bg-orange-100 rounded-full flex items-center justify-center"
              >
                <div class="text-4xl">🎉</div>
              </div>
              <div
                class="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <i class="fas fa-check text-white text-sm"></i>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Payment successful!
            </h3>
            <p class="text-gray-500 mb-8">
              You have successfully subscribed to premium account.<br />
              Enjoy the benefits!
            </p>

            <button
              class="w-full bg-[#0B63F6] text-white py-4 rounded-xl text-base font-semibold hover:bg-[#155EE0]"
              @click="startPlayingQuiz"
            >
              Start Playing Quiz
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom Border - Sticky at bottom with full width -->
    <div
      class="sticky bottom-0 w-[95%] mx-auto border-b border-gray-300 mb-10 bg-[#F9FAFB]"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

defineProps({
  currentPlanId: { type: String, default: "monthly" },
  currency: { type: String, default: "MYR" },
});

const router = useRouter();
const currentStep = ref(1);
const selectedPlan = ref("monthly");
const processing = ref(false);
const showPaymentModal = ref(false);
const showSuccessModal = ref(false);
const selectedPayment = ref("mastercard");

// Plans data
// const plans = ref([
//   {
//     id: "monthly",
//     price: 19,
//     title: "Monthly plan",
//     subtitle: "Recurring monthly billing",
//   },
//   {
//     id: "semiannual",
//     price: 299,
//     title: "6 months plan",
//     subtitle: "Get over 20% off",
//   },
//   {
//     id: "yearly",
//     price: 399,
//     title: "Yearly plan",
//     subtitle: "Get over 40% off",
//   },
// ]);

// Navigation
function goBack() {
  if (currentStep.value > 1) {
    currentStep.value--;
  } else {
    router.back();
  }
}

// Payment processing
async function processPayment() {
  try {
    processing.value = true;
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Close payment modal and show success modal
    showPaymentModal.value = false;
    showSuccessModal.value = true;
  } catch (e) {
    console.error(e);
  } finally {
    processing.value = false;
  }
}

// Success action
function startPlayingQuiz() {
  console.log("Starting quiz...");
  // Navigate to quiz or close modal
  router.push("/quiz"); // or router.back();
}
</script>

<style scoped>
/* Add Font Awesome for icons */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
