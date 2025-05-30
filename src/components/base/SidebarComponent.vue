<template>
  <aside
    class="bg-white w-72 max-w-6xl min-h-screen border-r px-6 py-6 flex flex-col justify-between"
  >
    <!-- Logo & Toggle Button -->
    <div class="flex items-center justify-between mb-6">
      <img src="@/assets/logo.png" alt="FlyHigh Logo" class="w-20" />
      <button class="p-2 hover:bg-gray-100 rounded-md">
        <i class="fas fa-table-cells-large text-lg text-gray-500"></i>
      </button>
    </div>

    <div class="flex items-center mb-6 gap-4">
      <button @click="$emit('toggleSidebar')" class="md:hidden">
        <i class="fas fa-bars text-xl"></i>
      </button>
      <div class="relative">
        <input
          type="text"
          placeholder="Search.."
          class="pl-10 pr-4 py-2 border rounded-full bg-transparent focus:outline-none"
        />
        <i
          class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        ></i>
        <span
          class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 border border-gray-300 px-1 rounded"
        >
          ⌘ F
        </span>
      </div>
    </div>

    <div class="flex-1">
      <p class="text-[11px] text-gray-400 font-semibold mb-2">GENERAL</p>
      <nav class="space-y-1 mb-6">
        <SidebarItemComponent icon="fas fa-th" text="Dashboard" to="/home" />
        <SidebarItemComponent icon="fas fa-gift" text="Rewards" to="/rewards" />
        <SidebarItemComponent
          icon="fas fa-chart-bar"
          text="Reports"
          to="/reports"
        />
        <SidebarItemComponent icon="fas fa-book" text="Classes" to="/classes" />
      </nav>

      <!-- MANAGE -->
      <p class="text-[11px] text-gray-400 font-semibold mb-2">MANAGE</p>
      <nav class="space-y-1">
        <SidebarItemComponent icon="fas fa-cog" text="Setting" to="/settings" />
        <SidebarItemComponent
          icon="fas fa-info-circle"
          text="Help"
          to="/help"
        />
      </nav>
    </div>
  </aside>
</template>

<script setup>
import SidebarItemComponent from "./SidebarItemComponent.vue";
</script>
