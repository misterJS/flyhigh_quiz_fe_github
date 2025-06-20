<template>
  <div class="min-h-screen bg-[#f9fafb] p-4 pb-24">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button class="text-gray-700 text-lg">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="font-semibold text-lg">Profile Edit</h1>
    </div>

    <!-- Account Setting Card -->
    <div class="bg-white rounded-3xl p-5 shadow space-y-5 mb-6">
      <h2 class="text-sm font-semibold text-gray-900">Account setting</h2>

      <!-- Profile Picture -->
      <div class="flex items-center gap-3">
        <img
          src="@/assets/Avatar.png"
          class="w-24 h-24 rounded-full object-cover"
        />
        <button
          class="text-sm text-gray-600 border border-gray-300 px-4 py-1 rounded-full"
        >
          Change Photo
        </button>
      </div>

      <!-- Display Name -->
      <div>
        <p class="text-sm text-gray-900 mb-1">Display Name</p>
        <input
          type="text"
          placeholder="Enter display name"
          class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <!-- Email -->
      <div>
        <p class="text-sm text-gray-900 mb-1">Email address</p>
        <input
          type="email"
          placeholder="Enter email"
          class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>

    <!-- Location Section -->
    <div class="bg-white rounded-3xl p-5 shadow space-y-3 mb-6">
      <p class="text-sm font-semibold text-gray-900 mb-1">Location</p>
      <div
        class="flex items-center justify-between border border-gray-300 rounded-xl px-4 py-3"
      >
        <span class="text-sm text-gray-500">Select location</span>
        <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
      </div>
    </div>

    <!-- Logout Section -->
    <div class="bg-white rounded-3xl p-5 shadow mb-6">
      <button
        class="flex items-center justify-between w-full text-sm font-semibold text-red-500"
      >
        <div class="flex items-center gap-2">
          <div class="bg-[#FFF1F0] p-2 rounded-full">
            <i class="fas fa-sign-out-alt text-red-500"></i>
          </div>
          Logout account
        </div>
        <i class="fas fa-chevron-right text-red-300 text-xs"></i>
      </button>
    </div>

    <!-- Save Button -->
    <div class="fixed bottom-4 left-4 right-4">
      <button
        class="w-full bg-[#2563EB] text-white py-4 rounded-xl text-sm font-semibold shadow-lg"
      >
        Save
      </button>
    </div>
  </div>
</template>
