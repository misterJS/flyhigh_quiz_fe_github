<template>
  <div class="min-h-screen bg-[#f9fafb] p-4 pb-24">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button class="text-gray-700 text-lg">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="font-semibold text-lg">About</h1>
    </div>

    <!-- Logo -->
    <div class="flex justify-center mb-8">
      <img src="@/assets/logo.png" class="w-28 object-contain" />
    </div>

    <!-- Description Card -->
    <div class="bg-white rounded-3xl p-5 shadow space-y-4 mb-6">
      <h2 class="text-md font-semibold text-gray-900">
        Explore and learn new skills
      </h2>
      <p class="text-sm text-gray-500 leading-relaxed">
        SideSkills is a versatile and innovative online learning app designed to
        empower individuals with the skills they need to thrive in today's
        competitive world. Whether you're looking to enhance your professional
        abilities, explore new hobbies, or advance in your career, SideSkills
        offers a comprehensive platform for all your learning needs.
      </p>
    </div>

    <!-- Location Card -->
    <div class="bg-white rounded-3xl p-5 shadow space-y-4">
      <h2 class="text-md font-semibold text-gray-900">Our Location</h2>
      <p class="text-sm text-gray-500">
        4517 Washington Ave. Manchester, Kentucky 39495
      </p>
      <img src="@/assets/map.png" class="w-full rounded-xl object-cover" />
    </div>
  </div>
</template>
