<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/40"></div>
    
    <!-- Modal Content -->
    <div class="relative bg-white rounded-3xl p-8 max-w-sm w-full mx-4 text-center">
      <!-- Success Icon -->
      <div class="mb-6">
        <div class="relative mx-auto w-24 h-24">
          <!-- Orange circles background -->
          <div class="absolute inset-0 bg-orange-100 rounded-full"></div>
          <div class="absolute top-2 left-2 w-4 h-4 bg-orange-400 rounded-full opacity-60"></div>
          <div class="absolute top-4 right-3 w-3 h-3 bg-orange-300 rounded-full opacity-80"></div>
          <div class="absolute bottom-3 left-4 w-2 h-2 bg-orange-500 rounded-full"></div>
          <div class="absolute bottom-4 right-2 w-3 h-3 bg-orange-400 rounded-full opacity-70"></div>
          
          <!-- Main content -->
          <div class="relative z-10 flex items-center justify-center w-full h-full">
            <!-- Document/Receipt icon -->
            <div class="bg-white rounded-lg p-3 shadow-lg">
              <div class="w-8 h-10 bg-gray-100 rounded-sm relative">
                <div class="absolute top-1 left-1 right-1 h-0.5 bg-gray-300 rounded"></div>
                <div class="absolute top-2.5 left-1 right-1 h-0.5 bg-gray-300 rounded"></div>
                <div class="absolute top-4 left-1 right-1 h-0.5 bg-gray-300 rounded"></div>
                <div class="absolute bottom-1 left-1 w-3 h-0.5 bg-orange-400 rounded"></div>
              </div>
            </div>
            
            <!-- Check mark -->
            <div class="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <i class="fas fa-check text-white text-sm"></i>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Title -->
      <h2 class="text-xl font-bold text-gray-900 mb-2">Payment successful!</h2>
      
      <!-- Description -->
      <p class="text-gray-600 text-sm mb-8 leading-relaxed">
        You have successfully subscribed to premium account. Enjoy the benefits!
      </p>
      
      <!-- Start Playing Quiz Button -->
      <button 
        @click="startQuiz"
        class="w-full bg-[#0B63F6] hover:bg-[#155EE0] text-white py-4 rounded-xl font-semibold text-lg shadow-lg transition-colors"
      >
        Start Playing Quiz
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Function to start quiz and navigate to /quiz
const startQuiz = () => {
  router.push('/quiz')
}

// Define emits (if needed for closing modal)
defineEmits(['close'])
</script>

<style scoped>
/* Additional styles if needed */
</style>