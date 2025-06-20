<template>
  <div class="flex h-screen bg-[#f9fafb]">
    <SidebarComponent />
    <div class="flex-1 flex flex-col">
      <HeaderComponent />
      <main class="flex-1 p-10 overflow-y-auto">
        <div class="bg-white rounded-2xl shadow-sm p-10 mx-auto w-full">
          <h1 class="text-[20px] font-semibold text-[#111827] mb-8">
            Settings
          </h1>

          <!-- Tabs -->
          <div class="flex border-b border-[#E5E7EB] mb-10">
            <nav class="flex space-x-10 text-sm font-medium">
              <button
                v-for="tab in tabs"
                :key="tab"
                @click="activeTab = tab"
                :class="[
                  'w-40 text-center pb-3',
                  activeTab === tab
                    ? 'text-[#2563EB] border-b-2 border-[#2563EB]'
                    : 'text-[#6B7280] hover:text-[#374151]',
                ]"
              >
                {{ tab }}
              </button>
            </nav>
          </div>

          <!-- Profile Tab -->
          <div v-if="activeTab === 'Profile'">
            <h1 class="text-[20px] font-semibold text-[#111827] mb-8">
              Edit Profile
            </h1>
            <div class="flex items-center mb-10">
              <img
                src="@/assets/Avatar.png"
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
                  <label
                    class="block text-sm text-[#111827] mb-1"
                    for="firstName"
                    >First Name</label
                  >
                  <input
                    id="firstName"
                    type="text"
                    value="Angela Laurealla"
                    class="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:ring-1 focus:ring-[#2563EB] focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    class="block text-sm text-[#111827] mb-1"
                    for="lastName"
                    >Last Name</label
                  >
                  <input
                    id="lastName"
                    type="text"
                    value="Dinar"
                    class="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:ring-1 focus:ring-[#2563EB] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm text-[#111827] mb-1" for="email">
                  Email Address
                  <span class="text-[#9CA3AF]">(Optional: Parent’s email)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value="Angelalaurealla@gmail.com"
                  class="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:ring-1 focus:ring-[#2563EB] focus:outline-none"
                />
              </div>

              <div>
                <label class="block text-sm text-[#111827] mb-1" for="phone">
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
                    id="phone"
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

          <!-- General Tab -->
          <div v-if="activeTab === 'General'">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label class="text-sm font-medium text-[#111827] block mb-1"
                  >Language <span class="text-red-500">*</span></label
                >
                <select
                  class="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 text-sm"
                >
                  <option>English</option>
                  <option>Bahasa Indonesia</option>
                </select>
                <p class="text-xs text-[#6B7280] mt-2">
                  Choose the language you speak at this time
                </p>
              </div>

              <div>
                <label class="text-sm font-medium text-[#111827] block mb-1"
                  >Timezone <span class="text-red-500">*</span></label
                >
                <select
                  class="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 text-sm"
                >
                  <option>Malaysia</option>
                  <option>Indonesia (WIB)</option>
                </select>
                <p class="text-xs text-[#6B7280] mt-2">
                  Choose the timezone you use
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div>
                <label class="text-sm font-medium text-[#111827] block mb-1"
                  >Time Format <span class="text-red-500">*</span></label
                >
                <div class="flex gap-4 mt-2">
                  <label
                    class="flex items-center border px-4 py-2 rounded-lg text-sm cursor-pointer"
                  >
                    <input type="radio" name="time-format" class="mr-2" />
                    12 Hours
                  </label>
                  <label
                    class="flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="time-format"
                      checked
                      class="mr-2"
                    />
                    24 Hours
                  </label>
                </div>
              </div>

              <div>
                <label class="text-sm font-medium text-[#111827] block mb-1"
                  >Date Format <span class="text-red-500">*</span></label
                >
                <div class="flex gap-4 mt-2">
                  <label
                    class="flex items-center border px-4 py-2 rounded-lg text-sm cursor-pointer"
                  >
                    <input type="radio" name="date-format" class="mr-2" />
                    DD/MM/YY
                  </label>
                  <label
                    class="flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="date-format"
                      checked
                      class="mr-2"
                    />
                    MM/DD/YY
                  </label>
                  <label
                    class="flex items-center border px-4 py-2 rounded-lg text-sm cursor-pointer"
                  >
                    <input type="radio" name="date-format" class="mr-2" />
                    YY/MM/DD
                  </label>
                </div>
              </div>
            </div>

            <div class="flex justify-end gap-4 pt-10">
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
          </div>

          <!-- Notification & Password Tabs -->
          <div v-if="activeTab === 'Notification'">
            <div class="space-y-6">
              <div
                v-for="(notif, index) in notifications"
                :key="index"
                class="flex items-start justify-between border-b border-gray-200 pb-6"
              >
                <div>
                  <h3 class="text-sm font-medium text-gray-900 mb-1">
                    {{ notif.title }}
                  </h3>
                  <p class="text-sm text-gray-500 max-w-md">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas scelerisque eros a condimentum viverra. Proin sit
                    amet leo sit amet.
                  </p>
                </div>

                <!-- Switch -->
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="notif.enabled"
                    class="sr-only"
                  />
                  <div
                    class="w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 transition-colors duration-300"
                    :class="{ 'bg-blue-600': notif.enabled }"
                  >
                    <div
                      class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300"
                      :class="{ 'translate-x-5': notif.enabled }"
                    ></div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-4 pt-10">
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
          </div>

          <div v-if="activeTab === 'Password'">
            <form class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- New Password -->
              <div>
                <label class="block text-sm font-medium text-[#111827] mb-1">
                  New Password <span class="text-red-500">*</span>
                </label>
                <p class="text-xs text-[#9CA3AF] mb-2">
                  Input your new password
                </p>
                <div class="relative">
                  <input
                    :type="showNewPassword ? 'text' : 'password'"
                    v-model="newPassword"
                    class="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 text-sm pr-10 focus:ring-1 focus:ring-[#2563EB] focus:outline-none"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-2.5 text-gray-400"
                    @click="showNewPassword = !showNewPassword"
                  >
                    <i
                      :class="
                        showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                      "
                    ></i>
                  </button>
                </div>
              </div>

              <!-- Confirm Password -->
              <div>
                <label class="block text-sm font-medium text-[#111827] mb-1">
                  Confirm Password <span class="text-red-500">*</span>
                </label>
                <p class="text-xs text-[#9CA3AF] mb-2">
                  Confirm your new password
                </p>
                <div class="relative">
                  <input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    v-model="confirmPassword"
                    class="w-full border border-[#D1D5DB] rounded-lg px-4 py-2 text-sm pr-10 focus:ring-1 focus:ring-[#2563EB] focus:outline-none"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-2.5 text-gray-400"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <i
                      :class="
                        showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                      "
                    ></i>
                  </button>
                </div>
              </div>
            </form>

            <!-- Buttons -->
            <div class="flex justify-end gap-4 pt-10">
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
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import HeaderComponent from "@/components/base/HeaderComponent.vue";

const tabs = ["Profile", "General", "Notification", "Password"];
const activeTab = ref("Profile");
const notifications = ref([
  { title: "Weekly Course & Assignment Updates", enabled: false },
  { title: "Quiz/Test Schedule Update", enabled: false },
  { title: "Quiz Progress Tracking", enabled: true },
  { title: "Quiz Submission Successful", enabled: true },
]);

const newPassword = ref("alexandekev024");
const confirmPassword = ref("alexandekev024");
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
</script>
