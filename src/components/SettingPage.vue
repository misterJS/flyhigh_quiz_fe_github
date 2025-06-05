<template>
  <div class="flex h-screen bg-[#f9fafb]">
    <SidebarComponent />
    <div class="flex-1 flex flex-col">
      <HeaderComponent />
      <main class="flex-1 p-10">
        <div
          class="bg-white rounded-2xl shadow-sm p-10  mx-auto"
        >
          <h1 class="text-[20px] font-semibold text-[#111827] mb-8">
            Settings
          </h1>

          <div class="flex border-b border-[#E5E7EB] mb-10">
            <nav class="flex space-x-10 text-sm font-medium">
              <a
                href="#"
                class="text-[#2563EB] border-b-2 w-40 text-center border-[#2563EB] pb-3"
                >Edit Profile</a
              >
              <a href="#" class="text-[#6B7280] w-40 text-center hover:text-[#374151] pb-3"
                >General</a
              >
              <a href="#" class="text-[#6B7280] w-40 text-center hover:text-[#374151] pb-3"
                >Notification</a
              >
              <a href="#" class="text-[#6B7280] w-40 text-center hover:text-[#374151] pb-3"
                >Password</a
              >
            </nav>
          </div>

          <h1 class="text-[20px] font-semibold text-[#111827] mb-8">
            Edit Profile
          </h1>
          <div class="flex items-center mb-10">
            <img
              src="../assets/Avatar.png"
              class="w-20 h-20 rounded-full object-cover"
              alt="Profile"
            />
          </div>

          <form class="space-y-8">
            <div class="space-y-1">
              <p class="text-base font-medium text-[#111827]">
                Personal Information
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm text-[#111827] mb-1"
                  >First Name</label
                >
                <input
                  type="text"
                  value="Angela Laurealla"
                  class="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:ring-1 focus:ring-[#2563EB] focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-sm text-[#111827] mb-1"
                  >Last Name</label
                >
                <input
                  type="text"
                  value="Dinar"
                  class="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:ring-1 focus:ring-[#2563EB] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm text-[#111827] mb-1">
                Email Address
                <span class="text-[#9CA3AF]">(Optional: Parent’s email)</span>
              </label>
              <input
                type="email"
                value="Angelalaurealla@gmail.com"
                class="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:ring-1 focus:ring-[#2563EB] focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm text-[#111827] mb-1">
                Phone Number
                <span class="text-[#9CA3AF]">(Optional: Parent’s email)</span>
              </label>
              <div
                class="flex items-center border border-[#D1D5DB] rounded-lg px-4 py-2 bg-[#F9FAFB]"
              >
                <img
                  src="https://flagcdn.com/us.svg"
                  class="w-5 h-5 mr-2"
                  alt="US Flag"
                />
                <span class="text-sm text-[#111827] mr-2">+1</span>
                <input
                  type="tel"
                  value="2345 678 4321"
                  class="flex-1 text-sm text-[#111827] bg-transparent focus:outline-none"
                />
              </div>
            </div>

            <div class="flex justify-end gap-4 pt-6">
              <button
                type="button"
                class="px-5 py-2 text-sm rounded-lg text-[#2563EB] bg-white border border-[#E5E7EB] hover:bg-[#F3F4F6]"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2 text-sm rounded-lg text-white bg-[#2563EB] hover:bg-[#1D4ED8]"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import HeaderComponent from "@/components/base/HeaderComponent.vue";
</script>

<style scoped></style>
