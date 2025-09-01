<!-- src/views/settings/PaymentMethodMobile.vue -->
<template>
  <div class="min-h-screen bg-[#F6F7F9] p-4 pb-28">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-5">
      <button @click="goBack" class="text-gray-800 text-lg" aria-label="Back">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="text-lg font-semibold">Payment Method</h1>
    </div>

    <!-- Methods -->
    <div class="space-y-3">
      <button
        v-for="m in methods"
        :key="m.id"
        class="w-full bg-white rounded-2xl border border-gray-200 px-4 py-4 flex items-center justify-between shadow-sm active:scale-[.99] transition"
        @click="openMethod(m)"
      >
        <div class="flex items-center gap-3">
          <img
            v-if="m.brand === 'mastercard'"
            :src="mcLogo"
            class="w-10 h-7 object-contain"
            alt="Mastercard"
          />
          <img
            v-else-if="m.brand === 'visa'"
            :src="visaLogo"
            class="w-10 h-7 object-contain"
            alt="Visa"
          />
          <img
            v-else
            :src="appleLogo"
            class="w-10 h-7 object-contain"
            alt="Apple Pay"
          />
          <div class="text-left">
            <p class="text-[15px] font-semibold text-gray-900">
              {{ displayName(m) }}
            </p>
            <p class="text-sm text-gray-400 tracking-widest">
              **** **** **** {{ m.last4 }}
            </p>
          </div>
        </div>

        <div class="text-right">
          <p class="text-sm font-medium text-[#2563EB]">Connected</p>
          <p v-if="m.isDefault" class="text-[11px] text-gray-400 mt-0.5">
            Default
          </p>
        </div>
      </button>
    </div>

    <!-- Add new -->
    <div class="fixed left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-[#F6F7F9]">
      <button
        class="w-full bg-[#2563EB] hover:bg-[#1E55D6] text-white font-semibold py-4 rounded-2xl"
        @click="addNew"
      >
        Add New Payment Method
      </button>
    </div>

    <!-- Bottom sheet (quick actions) -->
    <transition name="fade">
      <div
        v-if="sheet"
        class="fixed inset-0 z-50 bg-black/30"
        @click.self="sheet = null"
      >
        <div
          class="absolute left-0 right-0 bottom-0 bg-white rounded-t-2xl p-4 shadow-xl"
        >
          <div class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <div class="flex items-center gap-3 mb-3">
            <img :src="sheetLogo" class="w-8 h-6 object-contain" />
            <div>
              <p class="text-sm font-semibold">
                {{ displayName(sheet) }}
              </p>
              <p class="text-xs text-gray-500">
                **** **** **** {{ sheet?.last4 }}
              </p>
            </div>
          </div>

          <button
            class="w-full text-left px-3 py-3 rounded-xl hover:bg-gray-50 flex items-center justify-between"
            @click="makeDefault(sheet)"
          >
            <span class="text-sm">Set as default</span>
            <i class="fas fa-check text-gray-400"></i>
          </button>
          <button
            class="w-full text-left px-3 py-3 rounded-xl hover:bg-gray-50 flex items-center justify-between"
            @click="disconnect(sheet)"
          >
            <span class="text-sm text-red-600">Remove / Disconnect</span>
            <i class="fas fa-trash-alt text-red-500 text-xs"></i>
          </button>
          <button
            class="mt-2 w-full text-center px-3 py-3 rounded-xl border border-gray-200"
            @click="sheet = null"
          >
            Cancel
          </button>
        </div>
      </div>
    </transition>

    <!-- Toast -->
    <transition name="fade">
      <div
        v-if="toast"
        class="fixed bottom-24 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-2 rounded-lg"
      >
        {{ toast }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

// Logos (replace with your own asset paths)
const mcLogo = require("@/assets/pay-mastercard.png");
const visaLogo = require("@/assets/pay-visa.png");
const appleLogo = require("@/assets/pay-apple.png");

const router = useRouter();

// Mock data — replace with API payload
const methods = ref([
  { id: "pm_1", brand: "mastercard", last4: "42482", isDefault: true, type: "card" },
  { id: "pm_2", brand: "visa", last4: "37842", isDefault: false, type: "card" },
  { id: "pm_3", brand: "applepay", last4: "37476", isDefault: false, type: "wallet" },
]);

const sheet = ref(null);
const toast = ref("");

function goBack() {
  router.back();
}
function addNew() {
  // navigate to your "add payment" screen
  router.push("/payment/add");
}
function displayName(m) {
  if (m.brand === "mastercard") return "Mastercard";
  if (m.brand === "visa") return "Visa";
  return "Apple Pay";
}
function openMethod(m) {
  sheet.value = m;
}
const sheetLogo = computed(() => {
  if (!sheet.value) return "";
  return sheet.value.brand === "mastercard"
    ? mcLogo
    : sheet.value.brand === "visa"
    ? visaLogo
    : appleLogo;
});

function makeDefault(m) {
  methods.value = methods.value.map(x => ({ ...x, isDefault: x.id === m.id }));
  sheet.value = null;
  flash("Default payment method updated");
}
function disconnect(m) {
  methods.value = methods.value.filter(x => x.id !== m.id);
  sheet.value = null;
  flash("Payment method removed");
}
let t;
function flash(msg) {
  toast.value = msg;
  clearTimeout(t);
  t = setTimeout(() => (toast.value = ""), 1500);
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity .18s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
