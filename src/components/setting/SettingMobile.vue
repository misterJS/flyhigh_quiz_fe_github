<template>
  <div class="min-h-screen bg-[#f9fafb] pb-24 px-4 pt-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-lg font-semibold text-gray-900">Setting</h1>
      <div class="relative">
        <img src="@/assets/Avatar.png" class="w-10 h-10 rounded-full" />
        <div
          class="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1 text-white text-xs"
        >
          <i class="fas fa-lightbulb"></i>
        </div>
      </div>
    </div>

    <!-- Profile Info -->
    <div class="flex items-center gap-3 mb-6">
      <img src="@/assets/Avatar.png" class="w-12 h-12 rounded-full" />
      <div>
        <p class="font-semibold text-sm">{{ profile.name }}</p>
        <p class="text-xs text-gray-500">{{ profile.email }} • Level Study</p>
      </div>
    </div>

    <!-- Menu Items -->
    <div class="space-y-8">
      <!-- Edit Profile -->
      <div>
        <div class="flex items-center justify-between py-3">
          <div
            class="flex items-center gap-3"
            @click="goToUrl('/edit-profile')"
          >
            <i class="fas fa-user text-lg text-gray-700"></i>
            <span class="text-sm font-medium text-gray-900">Edit Profile</span>
          </div>
          <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
        </div>
      </div>

      <!-- Preferences Section -->
      <div>
        <p class="text-xs text-gray-400 font-semibold mb-3">Preferences</p>

        <SettingItem
          @click="goToUrl('/reports')"
          icon="fas fa-flag"
          label="Report Quiz"
        />
        <SettingItem icon="fas fa-credit-card" label="Payment Method" />
        <SettingItem icon="fas fa-map-marker-alt" label="Location" />
        <SettingItem
          @click="goToUrl('/history-quiz')"
          icon="fas fa-bookmark"
          label="Saved"
        />
        <SettingItem
          @click="goToUrl('/notification-mobile')"
          icon="fas fa-bell"
          label="Notifications"
        />

        <!-- Language -->
        <div
          class="flex items-center justify-between py-3"
          @click="goToUrl('/language-setting-m')"
        >
          <div class="flex items-center gap-3">
            <i class="fas fa-globe text-lg text-gray-700"></i>
            <span class="text-sm font-medium text-gray-900">Languages</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-sm text-gray-500">English</span>
            <i class="fas fa-chevron-down text-gray-400 text-xs"></i>
          </div>
        </div>
      </div>

      <!-- Resources Section -->
      <div>
        <p class="text-xs text-gray-400 font-semibold mb-3">Resources</p>

        <SettingItem
          @click="goToUrl('/help-support')"
          icon="fas fa-info-circle"
          label="Help & Support"
        />
        <SettingItem
          @click="goToUrl('/about-mobile')"
          icon="fas fa-question-circle"
          label="About"
        />
        <SettingItem icon="fas fa-sign-out-alt" label="Sign Out" />
      </div>
    </div>
  </div>

  <!-- Bottom Navigation -->
  <BottomBarNavigation />
</template>

<script setup>
import SettingItem from "@/components/base/SettingItem.vue";
import BottomBarNavigation from "../base/BottomBarNavigation.vue";
import { useAuthStore } from "@/stores/authStore";
const auth = useAuthStore();
import { useRouter } from "vue-router";
import { GetProfile } from "@/api/settingApi";
import { onMounted, ref } from "vue";
const router = useRouter();
const profile = ref({});

const handleGetProfile = async () => {
  try {
    const userId = auth.userId;
    const response = await GetProfile(userId);
    console.log(response);
    profile.value = response;
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  handleGetProfile();
});

function goToUrl(dir) {
  router.push(dir);
}
</script>
