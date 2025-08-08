<template>
  <div class="flex flex-col h-screen bg-white">
    <!-- Profile Header -->
    <div class="p-6 flex items-center border-b">
      <img
        src="https://via.placeholder.com/80"
        alt="Profile"
        class="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <h2 class="text-lg font-semibold">John Doe</h2>
        <p class="text-sm text-gray-500">hudatest2@gmail.com • Level Study</p>
      </div>
    </div>

    <!-- Menu Options -->
    <div class="flex-1 overflow-y-auto">
      <div class="divide-y">
        <!-- Account Section -->
        <div class="p-4">
          <MenuItemexample icon="👤" label="Edit Profile" />
          <MenuItemexample icon="🔒" label="Change Password" />
        </div>

        <!-- Preferences -->
        <div class="p-4">
          <h3 class="text-xs uppercase text-gray-400 mb-2">Preferences</h3>
          <MenuItemexample icon="🚩" label="Report Quiz" />
          <MenuItemexample icon="💳" label="Payment Method" />
          <MenuItemexample icon="📍" label="Location" />
          <MenuItemexample icon="🔖" label="Saved" />
          <MenuItemexample icon="🔔" label="Notifications" />
          <MenuItemexample icon="🌐" label="Languages" value="English" />
        </div>

        <!-- Resources -->
        <div class="p-4">
          <h3 class="text-xs uppercase text-gray-400 mb-2">Resources</h3>
          <MenuItemexample icon="❓" label="Help & Support" />
          <MenuItemexample icon="ℹ️" label="About" />
          <MenuItemexample icon="🚪" label="Sign Out" />
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="border-t flex justify-around py-2 bg-gray-50">
      <BottomNavItemExample label="Home" icon="🏠" />
      <BottomNavItemExample label="Quiz" icon="📝" />
      <BottomNavItemExample label="Ranking" icon="📊" />
      <BottomNavItemExample label="Profile" icon="👤" active />
    </div>
  </div>
</template>

<script setup>
import BottomNavItemExample from '@/components/base/BottomNavItemExample.vue';
import MenuItemexample from '@/components/base/MenuItemexample.vue';


</script>
