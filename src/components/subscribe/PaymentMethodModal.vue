<template>
  <div class="bg-white rounded-t-3xl p-6 pb-8 max-h-[70vh] overflow-y-auto">
    <!-- Handle Bar -->
    <div class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6"></div>
    
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Payment Method</h2>
      <button 
        @click="$emit('close')" 
        class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
      >
        <i class="fas fa-times text-gray-500"></i>
      </button>
    </div>

    <!-- Payment Methods -->
    <div class="space-y-3 mb-6">
      <!-- PayPal -->
      <div 
        @click="selectPaymentMethod('paypal')"
        class="flex items-center justify-between p-4 border rounded-xl hover:border-blue-300 transition-colors cursor-pointer"
        :class="selectedPayment === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
      >
        <div class="flex items-center gap-3">
          <img 
            :src="paypalLogo" 
            class="w-12 h-8 object-contain rounded-lg" 
            alt="PayPal"
          />
          <div>
            <p class="font-medium text-gray-900">PayPal</p>
            <p class="text-sm text-gray-500">****@gmail.com</p>
          </div>
        </div>
        <div class="w-5 h-5 border-2 rounded-full flex items-center justify-center"
             :class="selectedPayment === 'paypal' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'">
          <i v-if="selectedPayment === 'paypal'" class="fas fa-check text-white text-xs"></i>
        </div>
      </div>

      <!-- Mastercard -->
      <div 
        @click="selectPaymentMethod('mastercard')"
        class="flex items-center justify-between p-4 border rounded-xl hover:border-blue-300 transition-colors cursor-pointer"
        :class="selectedPayment === 'mastercard' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
      >
        <div class="flex items-center gap-3">
          <img 
            :src="mcLogo" 
            class="w-12 h-8 object-contain rounded-lg" 
            alt="Mastercard"
          />
          <div>
            <p class="font-medium text-gray-900">Mastercard</p>
            <p class="text-sm text-gray-500">**** **** **** 1234</p>
          </div>
        </div>
        <div class="w-5 h-5 border-2 rounded-full flex items-center justify-center"
             :class="selectedPayment === 'mastercard' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'">
          <i v-if="selectedPayment === 'mastercard'" class="fas fa-check text-white text-xs"></i>
        </div>
      </div>

      <!-- Visa -->
      <div 
        @click="selectPaymentMethod('visa')"
        class="flex items-center justify-between p-4 border rounded-xl hover:border-blue-300 transition-colors cursor-pointer"
        :class="selectedPayment === 'visa' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
      >
        <div class="flex items-center gap-3">
          <img 
            :src="visaLogo" 
            class="w-12 h-8 object-contain rounded-lg" 
            alt="Visa"
          />
          <div>
            <p class="font-medium text-gray-900">Visa</p>
            <p class="text-sm text-gray-500">**** **** **** 5678</p>
          </div>
        </div>
        <div class="w-5 h-5 border-2 rounded-full flex items-center justify-center"
             :class="selectedPayment === 'visa' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'">
          <i v-if="selectedPayment === 'visa'" class="fas fa-check text-white text-xs"></i>
        </div>
      </div>
    </div>

    <!-- Add Payment Method -->
    <button class="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors mb-6">
      <i class="fas fa-plus"></i>
      <span class="font-medium">Add Payment Method</span>
    </button>

    <!-- Confirm Payment Button -->
    <button 
      @click="confirmPayment"
      class="w-full bg-[#0B63F6] hover:bg-[#155EE0] text-white py-4 rounded-xl font-semibold text-lg shadow-lg transition-colors"
    >
      Confirm Payment
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Import payment method logos
const paypalLogo = require("@/assets/paypal.png");
const mcLogo = require("@/assets/pay-mastercard.png");
const visaLogo = require("@/assets/pay-visa.png");

// Selected payment method state
const selectedPayment = ref('mastercard') // Default to mastercard

// Function to select payment method
const selectPaymentMethod = (method) => {
  selectedPayment.value = method
}

// Function to confirm payment
const confirmPayment = () => {
  // Emit success event to parent component
  emit('paymentSuccess', selectedPayment.value)
}

// Emit close event
const emit = defineEmits(['close', 'paymentSuccess'])
</script>

<style scoped>
/* Custom scrollbar for modal */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>