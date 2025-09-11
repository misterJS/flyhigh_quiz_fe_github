<!-- src/views/ReportPage.vue -->
<template>
  <div class="min-h-screen bg-[#F9FAFB] flex flex-col lg:flex-row">
    <SidebarComponent class="hidden lg:block" />

    <div class="flex-1 flex flex-col">
      <HeaderComponent class="hidden lg:flex" />

      <!-- HERO -->
      <section class="relative">
        <img :src="heroImage" class="w-full h-[260px] object-cover" alt="profile hero" />
        <div class="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-4">
          <div class="flex gap-1 items-center">
            <button @click="goBack" class="w-9 h-9 grid place-items-center rounded-full bg-transparent">
              <i class="fas fa-arrow-left text-[#0F172A]"></i>
            </button>
            <p>Report</p>
          </div>
          <button @click="share" class="w-9 h-9 grid place-items-center rounded-full bg-transparent">
            <i class="fas fa-external-link-square-alt text-[#0F172A]"></i>
          </button>
        </div>

        <button
          @click="editProfile"
          class="absolute right-4 -bottom-6 w-12 h-12 rounded-xl bg-[#0B6CF0] text-white grid place-items-center shadow-lg"
          aria-label="Edit profile"
        >
          <i class="fas fa-pen"></i>
        </button>
      </section>

      <!-- BODY -->
      <main class="px-4 lg:px-8 pt-8">
        <div class="max-w-5xl mx-auto">
          <!-- ▶ diambil dari GetProfile -->
          <h1 class="text-[24px] leading-7 font-normal text-[#0F172A]">
            {{ displayName }}
          </h1>
          <p class="text-[15px] text-gray-500 mt-2">{{ displayEmail }}</p>
          <p v-if="joinedText" class="text-[15px] text-gray-400 mt-1">{{ joinedText }}</p>

          <!-- Add Friend -->
          <div class="mt-7">
            <h3 class="text-[22px] font-normal mb-3">Add Friend</h3>
            <div class="grid grid-cols-3 gap-4">
              <button class="h-[84px] rounded-[22px] bg-white border border-gray-200 shadow-sm grid place-items-center">
                <i class="fas fa-search text-[18px]"></i>
              </button>
              <button class="h-[84px] rounded-[22px] bg-white border border-gray-200 shadow-sm grid place-items-center">
                <i class="fas fa-share-alt text-[18px]"></i>
              </button>
              <button class="h-[84px] rounded-[22px] bg-white border border-gray-200 shadow-sm grid place-items-center">
                <i class="fas fa-paper-plane text-[18px]"></i>
              </button>
            </div>
          </div>

          <!-- Congratulations -->
          <div class="mt-8 bg-white rounded-[22px] border border-gray-200 shadow-sm p-5 relative overflow-hidden">
            <h4 class="text-[20px] font-normal">Congratulations!</h4>
            <p class="text-[15px] text-gray-500 mt-1">You’re Close to a Reward</p>

            <div class="mt-3">
              <div class="flex gap-2 items-center mt-2">
                <p class="text-base text-[#1E1E1F]">300 / 500</p>
                <span class="-mt-1">🎯</span>
              </div>
              <p class="text-xs text-gray-400 mt-1">80% of target</p>
            </div>

            <button class="mt-4 bg-[#0B6CF0] text-white px-5 py-3 rounded-xl text-sm font-semibold">
              View All Rewards
            </button>

            <img :src="require('@/assets/cup-confetti.png')" class="absolute right-2 bottom-2 w-36" />
          </div>

          <!-- Ongoing Quiz (dummy sama seperti sebelumnya) -->
          <div class="mt-8">
            <h3 class="text-[22px] font-normal mb-3">Ongoing Quiz</h3>

            <div class="bg-white rounded-[22px] border border-gray-200 shadow-sm p-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img :src="require('@/assets/Badge3.png')" class="w-10 h-10 rounded-full" />
                <div>
                  <p class="font-semibold text-[15px]">Design Thinking From Scratch</p>
                  <p class="text-sm text-[#2563EB]">Sessions completed 4/20</p>
                </div>
              </div>

              <div class="relative w-14 h-14">
                <svg viewBox="0 0 36 36" class="w-14 h-14">
                  <path class="text-gray-200" stroke="currentColor" stroke-width="4" fill="none"
                        d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32"/>
                  <path class="text-red-500" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"
                        :stroke-dasharray="dash" d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32"/>
                </svg>
                <span class="absolute inset-0 grid place-items-center text-xs font-semibold">4%</span>
              </div>
            </div>
          </div>

          <!-- Quiz Performance (dummy) -->
          <div class="mt-8">
            <h3 class="text-[22px] font-normal mb-3">Quiz Performance</h3>
            <div class="bg-white rounded-[22px] border border-gray-200 shadow-sm p-5">
              <div class="flex items-start justify-between">
                <div>
                  <p class="text-[15px] text-gray-500">2023-10-01 • 60 mins</p>
                  <h4 class="text-[20px] font-semibold mt-1">Mathematics</h4>
                </div>
                <div class="text-right">
                  <span class="text-[36px] font-semibold leading-none">60</span>
                  <span class="text-gray-400">/100</span>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4 mt-5">
                <div class="rounded-2xl bg-[#F8FAFC] p-4">
                  <p class="text-sm text-gray-500">Correct</p>
                  <p class="text-[28px] font-semibold mt-1">83%</p>
                </div>
                <div class="rounded-2xl bg-[#F8FAFC] p-4">
                  <p class="text-sm text-gray-500">Incorrect</p>
                  <p class="text-[28px] font-semibold mt-1">76%</p>
                </div>
              </div>
            </div>
          </div>

          <div class="h-10"></div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import HeaderComponent from "@/components/base/HeaderComponent.vue";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

/* ▶ ambil profil dari store & API yang sama seperti Setting */
import { useAuthStore } from "@/stores/authStore";
import { GetProfile } from "@/api/settingApi";

const router = useRouter();
const auth = useAuthStore();

const profile = ref({});      // hasil GetProfile
const loading = ref(true);
const heroFallback = require("@/assets/Avatar.png");

/* --- fetch profil --- */
onMounted(async () => {
  try {
    const res = await GetProfile(auth.userId);
    profile.value = res ?? {};
  } catch (e) {
    console.error("GetProfile error:", e);
  } finally {
    loading.value = false;
  }
});

const displayName  = computed(() => profile.value?.name  || "—");
const displayEmail = computed(() => profile.value?.email || "—");

function pickJoinDate(p) {
  return (
    p?.joinDate ||
    p?.joinedAt ||
    p?.createdAt ||
    p?.created_at ||
    p?.createdDate ||
    null
  );
}
const joinedText = computed(() => {
  const raw = pickJoinDate(profile.value);
  if (!raw) return "";
  const d = new Date(raw);
  if (isNaN(d)) return "";
  const pretty = d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return `Joined on ${pretty}`;
});

const heroImage = computed(() => {
  return profile.value?.filePath || profile.value?.avatarUrl || heroFallback;
});

/* UI helpers */
function goBack() { router.back(); }
function share() {
  if (navigator.share) navigator.share({ title: "Report", url: location.href }).catch(() => {});
}
function editProfile() { router.push("/edit-profile"); }

/* kecilkan dasharray supaya 4% terlihat tipis */
const percent = 4;
const dash = computed(() => {
  const total = 100;
  const p = Math.max(0, Math.min(100, percent));
  return `${(p / 100) * total}, ${total}`;
});
</script>
