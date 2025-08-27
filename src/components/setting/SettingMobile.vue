<template>
  <div class="min-h-screen bg-[#F9FAFB] pb-24 px-4 pt-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-lg font-normal text-gray-900">Setting</h1>
    </div>

    <!-- Profile Row -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <img src="@/assets/Avatar.png" class="w-12 h-12 rounded-full" alt="avatar" />
        <div>
          <p class="font-semibold text-sm text-gray-900 leading-tight">
            {{ profile.name || '—' }}
          </p>
          <p class="text-xs text-gray-500">
            {{ profile.email || '—' }} <span class="mx-1">•</span> Level Study
          </p>
        </div>
      </div>

      <!-- Badge kanan -->
      <div class="relative">
        <img src="@/assets/Badge1.png" class="w-11 h-11" />
      </div>
    </div>

    <!-- Menus -->
    <div class="space-y-8">
      <!-- Account -->
      <div>
        <MenuRow icon="fas fa-user" label="Edit Profile" @click="goToUrl('/edit-profile')" />
        <MenuRow icon="fas fa-key" label="Change Password" @click="goToUrl('/change-password')" />
        <MenuRow icon="fas fa-crown" label="Subscribe" @click="goToUrl('/subscribe')" />
      </div>

      <!-- Preferences -->
      <div>
        <p class="text-xs text-gray-400 font-semibold mb-3">Preferences</p>

        <MenuRow icon="fas fa-flag" label="Report Quiz" @click="goToUrl('/reports')" />
        <MenuRow icon="fas fa-credit-card" label="Payment Method" @click="goToUrl('/payment-method')" />
        <MenuRow icon="far fa-bookmark" label="Saved" @click="goToUrl('/history-quiz')" />
        <MenuRow icon="far fa-bell" label="Notifications" @click="goToUrl('/notification-mobile')" />

        <!-- Languages (punya value di kanan) -->
        <div class="flex items-center justify-between py-3 border-b border-gray-100 cursor-pointer"
             @click="goToUrl('/language-setting-m')">
          <div class="flex items-center gap-3">
            <i class="fas fa-globe text-lg text-gray-700 w-6 text-center"></i>
            <span class="text-sm font-medium text-gray-900">Languages</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-sm text-gray-500">English</span>
            <i class="fas fa-chevron-down text-gray-400 text-xs"></i>
          </div>
        </div>
      </div>

      <!-- Resources -->
      <div>
        <p class="text-xs text-gray-400 font-semibold mb-3">Resources</p>

        <MenuRow icon="far fa-life-ring" label="Help & Support" @click="goToUrl('/help-support')" />
        <MenuRow icon="far fa-circle-question" label="About" @click="goToUrl('/about-mobile')" />
        <MenuRow icon="fas fa-sign-out-alt" label="Sign Out" @click="signOut()" />
      </div>
    </div>
  </div>

  <BottomBarNavigation />
</template>

<script setup>
import BottomBarNavigation from "../base/BottomBarNavigation.vue";
import { useAuthStore } from "@/stores/authStore";
import { GetProfile } from "@/api/settingApi";
import { onMounted, ref, defineComponent, h } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuthStore();

const loginError = ref("");
const profile = ref({});

/* ✅ Definisikan MenuRow via render function (tidak butuh runtime template compiler) */
const MenuRow = defineComponent({
  name: "MenuRow",
  props: {
    icon: { type: String, required: true },
    label: { type: String, required: true },
  },
  emits: ["click"],
  setup(props, { emit }) {
    return () =>
      h(
        "div",
        {
          class:
            "flex items-center justify-between py-3 border-b border-gray-100 cursor-pointer",
          onClick: () => emit("click"),
        },
        [
          h("div", { class: "flex items-center gap-3" }, [
            h("i", {
              class: `${props.icon} text-lg text-gray-700 w-6 text-center`,
            }),
            h(
              "span",
              { class: "text-sm font-medium text-gray-900" },
              props.label
            ),
          ]),
          h("i", { class: "fas fa-chevron-right text-gray-400 text-xs" }),
        ]
      );
  },
});

// fetch profile
const handleGetProfile = async () => {
  try {
    const userId = auth.userId;
    const response = await GetProfile(userId);
    profile.value = response || {};
  } catch (error) {
    console.error(error);
  }
};

const signOut = async () => {
  try {
    await auth.logout();
    router.push("/login");
  } catch (err) {
    loginError.value = err?.message || "Failed to sign out";
  }
};

onMounted(() => {
  handleGetProfile();
});

function goToUrl(dir) {
  router.push(dir);
}
</script>

<style scoped>
/* no extra styles */
</style>
