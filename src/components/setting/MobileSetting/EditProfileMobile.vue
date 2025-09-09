<template>
  <div class="min-h-screen bg-[#F3F4F6] p-4 pb-28">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-5">
      <button @click="goBack" class="text-gray-800 text-lg" aria-label="Back">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="font-normal text-lg">Profile Edit</h1>
    </div>

    <!-- Account Setting Card -->
    <div class="bg-white rounded-3xl p-5 shadow-sm space-y-5 mb-5">
      <h2 class="text-sm font-semibold text-gray-900">Account setting</h2>

      <!-- Profile picture + Change button -->
      <div class="flex items-center gap-3">
        <img
          :src="photoPreview || require('@/assets/Avatar.png')"
          class="w-20 h-20 rounded-full object-cover"
          alt="Profile photo"
        />
        <div>
          <button
            type="button"
            class="px-3 py-1.5 rounded-full text-[13px] font-medium border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
            @click="triggerFile"
          >
            Change Photo
          </button>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleFileChange"
          />
        </div>
      </div>

      <!-- Display Name -->
      <div>
        <p class="text-sm text-gray-900 mb-1">Display Name</p>
        <input
          v-model="name"
          type="text"
          placeholder="Enter display name"
          class="w-full border border-gray-200 rounded-[12px] px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div>

      <!-- Email -->
      <div>
        <p class="text-sm text-gray-900 mb-1">Email addres</p>
        <input
          v-model="email"
          type="email"
          placeholder="Enter email"
          class="w-full border border-gray-200 rounded-[12px] px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div>
    </div>

    <!-- Location Section -->
    <div class="bg-white rounded-3xl p-5 shadow-sm mb-5">
      <p class="text-sm font-semibold text-gray-900 mb-2">Location</p>
      <button
        type="button"
        class="w-full flex items-center justify-between border border-gray-200 rounded-[12px] px-4 py-3 bg-white"
        @click="openLocation"
      >
        <span class="text-sm text-gray-500">Select location</span>
        <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
      </button>
    </div>

    <!-- Logout Section -->
    <div class="bg-white rounded-3xl p-4 shadow-sm mb-5">
      <button
        @click="openLogoutModal"
        class="flex items-center justify-between w-full text-sm font-semibold text-red-500"
        type="button"
      >
        <div class="flex items-center gap-3">
          <span class="bg-[#FFF1F0] p-2 rounded-full inline-flex">
            <i class="fas fa-sign-out-alt"></i>
          </span>
          <span>Logout account</span>
        </div>
        <i class="fas fa-chevron-right text-red-300 text-xs"></i>
      </button>
    </div>

    <!-- Save Button -->
    <div class="fixed bottom-4 left-4 right-4">
      <button
        @click="saveProfile"
        class="w-full bg-[#2563EB] hover:bg-[#1E55D6] text-white py-4 rounded-[14px] text-sm font-semibold shadow-lg"
        type="button"
      >
        Save
      </button>
    </div>

    <!-- ===== Modal Confirm Logout ===== -->
    <transition name="fade">
      <div
        v-if="showLogout"
        class="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4"
        @keyup.esc="closeLogoutModal"
        tabindex="-1"
      >
        <div class="w-full max-w-sm bg-white rounded-[20px] shadow-lg p-6 relative">
          <!-- Big red circular icon -->
          <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-[#FEE2E2] flex items-center justify-center">
            <div class="w-20 h-20 rounded-full bg-[#EF4444] flex items-center justify-center">
              <i class="fas fa-sign-out-alt text-white text-2xl"></i>
            </div>
          </div>

          <p class="text-center text-[17px] font-semibold text-[#111827] mb-6 leading-tight">
            Are you sure you want<br />to logout?
          </p>

          <div class="flex items-center justify-between">
            <button
              type="button"
              class="text-gray-500 text-sm px-3 py-3"
              @click="closeLogoutModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="px-6 py-3 bg-[#F05252] hover:bg-[#E54545] text-white rounded-full text-sm font-semibold"
              @click="confirmLogout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { updateProfileWithPhoto } from "@/api/profileApi";
import { GetProfile } from "@/api/settingApi";
import { useRouter } from "vue-router";
import { useSnackbarStore } from "@/stores/snackbarStore";

const router = useRouter();
const goBack = () => router.back();
const openLocation = () => router.push("/select-location");

const snackbar = useSnackbarStore();
const auth = useAuthStore();

const name = ref("");
const email = ref("");
const photoPreview = ref(null);
const selectedPhoto = ref(null);

const fileInput = ref(null);
const triggerFile = () => fileInput.value?.click();

const showLogout = ref(false);

const openLogoutModal = () => (showLogout.value = true);
const closeLogoutModal = () => (showLogout.value = false);

const confirmLogout = async () => {
  try {
    await auth.logout();
    router.push("/login");
  } catch (err) {
    console.error(err);
  } finally {
    showLogout.value = false;
  }
};

const loadProfile = async () => {
  try {
    const userId = auth.userId;
    const profile = await GetProfile(userId);
    name.value = profile.name || "";
    email.value = profile.email || "";
    photoPreview.value = profile.filePath || null;
  } catch (error) {
    console.error("Failed to load profile:", error);
  }
};

const handleFileChange = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    selectedPhoto.value = file;
    photoPreview.value = URL.createObjectURL(file);
  }
};

const saveProfile = async () => {
  try {
    const formData = new FormData();
    formData.append("UserId", auth.userId);
    formData.append("DisplayName", name.value.trim());
    formData.append("Email", email.value.trim());
    if (selectedPhoto.value) formData.append("Photo", selectedPhoto.value);

    await updateProfileWithPhoto(formData);
    snackbar.trigger("Profile successfully changed", "success");
    router.push("/settings");
  } catch (error) {
    snackbar.trigger("Failed to update profile.", "error");
    console.error(error);
  }
};

onMounted(loadProfile);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
