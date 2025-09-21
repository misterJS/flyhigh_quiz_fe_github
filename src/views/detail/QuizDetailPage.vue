<template>
  <div class="flex flex-col lg:flex-row min-h-screen bg-[#f9fafb]">
    <SidebarComponent class="hidden lg:block" />

    <div class="flex-1 flex flex-col w-full">
      <HeaderComponent class="hidden lg:flex" />

      <main class="flex-1 p-4 sm:p-6 lg:p-8 pb-24 bg-gray-50 min-h-screen">
        <div class="flex flex-col lg:flex-row mx-auto max-w-7xl gap-8">
          <!-- KIRI -->
          <div class="flex-1 max-w-4xl">
            <!-- Custom Header -->
            <div class="flex items-center mb-8">
              <router-link
                to="/quiz"
                class="flex items-center gap-3 hover:text-blue-600 transition-colors"
                aria-label="Back"
              >
                <i class="fas fa-arrow-left text-lg text-gray-800"></i>
                <span class="text-lg font-semibold text-gray-900">Back</span>
              </router-link>
            </div>

            <!-- Subject Header -->
            <!-- <div class="flex justify-between items-center mb-4">
              <div class="flex items-center gap-3">
                <button
                  class="p-2"
                  @click="shareQuiz"
                  :disabled="sharing"
                  title="Share"
                >
                  <i class="fas fa-share-square text-lg text-gray-800"></i>
                </button>
                <button
                  class="p-2"
                  @click="toggleSaved"
                  :aria-pressed="isSaved"
                  title="Save"
                >
                  <i
                    :class="[
                      isSaved
                        ? 'fas fa-bookmark text-[#2563EB]'
                        : 'far fa-bookmark text-gray-800',
                      'text-lg',
                    ]"
                  ></i>
                </button>
              </div>
            </div> -->

            <!-- Cover -->
            <div class="rounded-xl overflow-hidden mb-6">
              <img
                :src="quiz?.image || require('@/assets/quiz.png')"
                alt="Quiz Image"
                loading="lazy"
                class="w-full h-[200px] object-cover"
              />
            </div>

            <!-- Title & Desc -->
            <!-- <h1 class="text-xl sm:text-2xl font-semibold text-[#111827] mb-3">
              {{ quiz?.title }}
            </h1> -->
            <div class="flex gap-1 items-center">
              <h2 class="text-base font-semibold text-gray-900">
                {{ quiz?.subjectName || "Biology" }}
              </h2>
            </div>
            <p class="text-sm text-gray-600 mb-6 leading-relaxed">
              {{
                quiz?.description ??
                "This module on Additional Mathematics is designed to deepen students understanding of advanced mathematical concepts.It covers topics such as algebra, calculus, and geometry. Read More"
              }}
            </p>

            <!-- UPGRADE PRO BANNER (conditional dari backend) -->
            <div
              v-if="showUpgradeBanner"
              class="rounded-2xl bg-[#0B63F6] px-5 py-5 mb-6 text-white flex items-center justify-between gap-4"
            >
              <div class="flex items-center gap-4">
                <img src="@/assets/crown.png" class="w-20 h-20" alt="crown" />
                <div>
                  <p class="text-lg font-semibold leading-5">Upgrade pro</p>
                  <p class="text-sm opacity-90 mt-1">
                    Upgrade to remove ads, unlimited play and access all game
                  </p>
                </div>
              </div>

              <button
                @click="goSubscribe"
                class="shrink-0 bg-[#F59E0B] hover:bg-[#EA8A00] text-white px-5 py-2 rounded-full font-semibold text-sm"
              >
                Upgrade
              </button>
            </div>

            <!-- Tabs -->
            <!-- <div class="mb-6">
              <SwitchButtonGroup
                v-model="selectedMenu"
                :options="['Detail', 'Quiz']"
                size="sm"
                variant="pill"
              />
            </div> -->

            <!-- TAB: DETAIL -->
            <div v-if="selectedMenu === 'Detail'">
              <!-- Outcome Section -->
              <div class="mb-8">
                <h2 class="text-xl font-semibold text-gray-900 mb-6">
                  Outcome
                </h2>

                <div class="flex items-center justify-between pb-8">
                  <div class="flex items-center gap-6">
                    <div class="flex items-center gap-2">
                      <i class="fas fa-star text-gray-400 text-sm"></i>
                      <span class="text-gray-600 text-sm">Skill level:</span>
                      <span class="font-semibold text-gray-900"
                        >5 (Expert)</span
                      >
                    </div>

                    <div class="flex items-center gap-2">
                      <i class="fas fa-file-alt text-gray-400 text-sm" />
                      <span class="text-gray-600 text-sm">Quizzes:</span>
                      <span class="font-semibold text-gray-900">15 Soalan</span>
                    </div>

                    <div class="flex items-center gap-2">
                      <i class="fas fa-globe text-gray-400 text-sm"></i>
                      <span class="text-gray-600 text-sm">Language:</span>
                      <span class="font-semibold text-gray-900">English</span>
                    </div>

                    <div class="flex items-center gap-2">
                      <i class="fas fa-clock text-gray-400 text-sm"></i>
                      <span class="text-gray-600 text-sm">Video Quiz:</span>
                      <span class="font-semibold text-gray-900">10 Minute</span>
                    </div>
                  </div>
                </div>

                <!-- Requirements -->
                <div class="mb-8">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">
                    Requirements
                  </h3>
                  <ul class="space-y-2 text-gray-600">
                    <li class="flex items-start gap-2">
                      <span class="text-green-500 mt-1">•</span>
                      <span
                        >You don't need a background in user experience, design
                        or coding to take this class</span
                      >
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-green-500 mt-1">•</span>
                      <span
                        >This is an in-depth course. If you allocate 60-90 mins
                        a day, and do all of the activities, it will take 2-3
                        weeks to complete</span
                      >
                    </li>
                  </ul>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-4">
                  <button
                    class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
                  >
                    Start Solo Quiz
                  </button>
                  <button
                    class="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
                  >
                    Start Team Quiz
                  </button>
                </div>
              </div>
            </div>

            <!-- TAB: QUIZ -->
            <div v-else>
              <h2 class="text-sm font-semibold text-[#111827] mb-3">Quizzes</h2>

              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                <QuizCard
                  v-for="(item, index) in quizList"
                  :key="index"
                  :image="item.image"
                  :title="item.title"
                  :students="item.submittedCount"
                  :points="item.CreditAmount"
                  :modules="item.totalQuiz"
                  :duration="item.totalHour"
                  :id="item.id"
                />
              </div>

              <div v-if="quizLoading" class="text-center py-4 text-gray-600">
                Loading more quizzes...
              </div>
            </div>
          </div>

          <!-- KANAN - Sidebar -->
          <div
            v-if="selectedMenu === 'Detail'"
            class="w-full lg:w-[400px] space-y-6"
          >
            <!-- Upgrade Pro Banner -->
            <div class="bg-blue-500 rounded-2xl p-6 text-white">
              <div class="flex items-start gap-4 mb-6">
                <div
                  class="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <img src="@/assets/crown.png" class="w-12 h-12" alt="crown" />
                </div>
                <div class="flex-1">
                  <h3 class="font-bold text-xl mb-2">Upgrade pro</h3>
                  <p class="text-sm text-blue-100 leading-relaxed">
                    Upgrade to remove ads, unlimited play and access all game
                  </p>
                </div>
              </div>
              <button
                class="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors w-full"
              >
                Upgrade
              </button>
            </div>

            <!-- Leaderboard -->
            <div class="bg-white rounded-2xl shadow-sm p-6">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-semibold text-gray-900">
                  Leader Board
                </h3>
                <button
                  class="text-sm text-blue-600 font-medium hover:text-blue-700"
                >
                  See all
                </button>
              </div>

              <div class="space-y-0">
                <div
                  v-for="(user, index) in leaderboard.slice(0, 3)"
                  :key="index"
                  class="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 flex items-center justify-center">
                      <img :src="user.badge" :alt="`Rank ${index + 1}`" class="w-8 h-8" />
                    </div>
                    <img
                      :src="user.avatar"
                      :alt="user.name"
                      class="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p class="font-medium text-gray-900">{{ user.name }}</p>
                      <p class="text-sm text-gray-500">219 Quizzes Completed</p>
                    </div>
                  </div>
                  <div class="ml-auto text-right">
                    <p class="font-bold text-gray-900">{{ user.xp }} XP</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Achievement -->
            <div class="bg-white rounded-2xl shadow-sm p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-6">
                Achievement
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <div
                  class="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div
                    class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3"
                  >
                    <i class="fas fa-trophy text-orange-500 text-lg"></i>
                  </div>
                  <p class="text-sm font-medium text-gray-700">Rookie</p>
                </div>

                <div
                  class="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div
                    class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3"
                  >
                    <i class="fas fa-star text-blue-500 text-lg"></i>
                  </div>
                  <p class="text-sm font-medium text-gray-700">Intermediate</p>
                </div>

                <div
                  class="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div
                    class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3"
                  >
                    <i class="fas fa-medal text-yellow-500 text-lg"></i>
                  </div>
                  <p class="text-sm font-medium text-gray-700">Advanced</p>
                </div>

                <div
                  class="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div
                    class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3"
                  >
                    <i class="fas fa-gem text-purple-500 text-lg"></i>
                  </div>
                  <p class="text-sm font-medium text-gray-700">Expert</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- CTA Mobile -->
      <div
        class="fixed bottom-0 left-0 right-0 lg:hidden bg-transparent border-none p-4 z-50"
      >
        <router-link
          :to="{
            path: `/quiz-confirmation/${quizId}`,
            query: { id: quiz?.id, img: quiz?.imagePath },
          }"
          class="w-full block text-center bg-[#2563EB] hover:bg-[#1E40AF] text-white py-4 rounded-full text-base font-semibold"
        >
          Start Quiz Now
        </router-link>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <transition name="fade">
    <div
      v-if="toast.show"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/80 text-white text-sm px-3 py-2 rounded-lg z-50"
    >
      {{ toast.message }}
    </div>
  </transition>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, onBeforeUnmount, reactive, computed } from "vue";
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import HeaderComponent from "@/components/base/HeaderComponent.vue";
// import SwitchButtonGroup from "@/components/base/SwitchButton.vue";
import QuizCard from "@/components/base/QuizCardComponent.vue";
import {
  QuizPreview,
  AllQuizList,
  // SaveQuizToggle,
  CheckDailyLimitByStudent,
} from "@/api/quizApi";
import { useAuthStore } from "@/stores/authStore";
import {
  GlobalAllTimeLeaderboard,
  LeaderboardByUserId,
} from "@/api/leaderboardApi";

const auth = useAuthStore();
const router = useRouter();

const quiz = ref(null);
const selectedMenu = ref("Detail");
const route = useRoute();
const quizId = route.params.id;

const params = { guid: quizId };

/* ===== Share & Save ===== */
// const sharing = ref(false);
const isSaved = ref(false);
const savedKey = "savedQuizzes";

function initSaved() {
  try {
    const arr = JSON.parse(localStorage.getItem(savedKey) || "[]");
    isSaved.value = arr.includes(String(quizId));
  } catch {
    isSaved.value = false;
  }
}
function persistSaved(val) {
  let arr = [];
  try {
    arr = JSON.parse(localStorage.getItem(savedKey) || "[]");
  } catch {
    arr = [];
  }
  const set = new Set(arr.map(String));
  if (val) set.add(String(quizId));
  else set.delete(String(quizId));
  localStorage.setItem(savedKey, JSON.stringify([...set]));
}
// async function toggleSaved() {
//   const next = !isSaved.value;
//   // Optimistic update + local fallback
//   isSaved.value = next;
//   persistSaved(next);

//   // If not logged in, keep it local only
//   if (!auth?.isLoggedIn || !auth?.userId) {
//     showToast(next ? "Saved locally" : "Removed locally");
//     return;
//   }

//   try {
//     await SaveQuizToggle({
//       guid: quizId,
//       studentId: auth.userId,
//       isSaved: next,
//     });
//     showToast(next ? "Saved" : "Removed");
//   } catch (e) {
//     // Revert on failure
//     isSaved.value = !next;
//     persistSaved(isSaved.value);
//     console.error("SaveQuiz toggle failed:", e?.message || e);
//     showToast("Failed to update. Please try again");
//   }
// }
// async function shareQuiz() {
//   try {
//     sharing.value = true;
//     const url = window.location.href;
//     const title = quiz.value?.title || "Quiz";
//     const text = `Check out this quiz: ${title}`;

//     if (navigator.share) {
//       await navigator.share({ title, text, url });
//       showToast("Shared!");
//     } else {
//       await navigator.clipboard.writeText(url);
//       showToast("Link copied");
//     }
//   } finally {
//     sharing.value = false;
//   }
// }

/* ===== Upgrade Banner (limit harian dari backend) ===== */
const showUpgradeBanner = ref(false);
const limitInfo = ref(null);
const savedAuthUser = (() => {
  try {
    return JSON.parse(localStorage.getItem("auth_user") || "null");
  } catch {
    return null;
  }
})();
const studentId = computed(
  () =>
    auth?.userId ||
    auth?.user?.userId ||
    auth?.user?.data?.userId ||
    savedAuthUser?.data?.userId ||
    savedAuthUser?.userId ||
    null
);

async function checkDailyLimit() {
  try {
    if (!studentId.value) {
      showUpgradeBanner.value = false;
      return;
    }
    const data = await CheckDailyLimitByStudent(studentId.value);
    showUpgradeBanner.value = !!data?.limitReached;
    limitInfo.value = data || null;
  } catch (e) {
    // jika gagal, jangan tampilkan banner
    console.warn("checkDailyLimit failed:", e?.message || e);
    showUpgradeBanner.value = false;
  }
}
function goSubscribe() {
  router.push("/subscribe");
}

/* ===== Toast helper ===== */
const toast = reactive({ show: false, message: "" });
// let toastTimer;
// function showToast(message) {
//   toast.message = message;
//   toast.show = true;
//   clearTimeout(toastTimer);
//   toastTimer = setTimeout(() => (toast.show = false), 1800);
// }

/* ===== Fetch Quiz Detail ===== */
onMounted(async () => {
  initSaved();

  try {
    const response = await QuizPreview(params);
    quiz.value = response;
    // If backend returns saved state, sync it
    if (typeof response?.isSaved !== "undefined") {
      isSaved.value = !!response.isSaved;
      persistSaved(isSaved.value);
    }
    await fetchQuizList();
  } catch (err) {
    console.error("Gagal ambil quiz:", err.message);
  }

  // Banner premium – tampil bila limit harian terpenuhi (dari backend)
  checkDailyLimit();

  // Leaderboard
  fetchLeaderboard();
  fetchLeaderboardById();
});

/* ===== Achievements (static images) ===== */
// const badges = [
//   { label: "Math Champion", img: require("@/assets/Badge1.png") },
//   { label: "Science Star", img: require("@/assets/Badge2.png") },
// ];

/* ===== Quiz List (child quizzes) ===== */
const quizList = ref([]);
const quizPage = ref(1);
const quizPageSize = ref(10);
const quizTotalPages = ref(1);
const quizLoading = ref(false);

const fetchQuizList = async () => {
  if (quizLoading.value || quizPage.value > quizTotalPages.value) return;
  quizLoading.value = true;

  try {
    const data = await AllQuizList({
      parentId: quiz.value?.id,
      page: quizPage.value,
      pageSize: quizPageSize.value,
    });

    quizList.value.push(...data.data.filter((q) => q.totalQuiz > 0));
    quizTotalPages.value = data.totalPages;
    quizPage.value++;
  } catch (err) {
    console.error("Gagal load daftar quiz:", err.message);
  } finally {
    quizLoading.value = false;
  }
};

// Infinite scroll hanya saat tab "Quiz"
const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (
    scrollTop + clientHeight >= scrollHeight - 50 &&
    selectedMenu.value === "Quiz"
  ) {
    fetchQuizList();
  }
};
onMounted(() => window.addEventListener("scroll", handleScroll));
onBeforeUnmount(() => window.removeEventListener("scroll", handleScroll));

/* ===== Leaderboard (API) ===== */
const leaderboard = ref([]);
const leaderboardScore = ref([]);

function getBadge(rank) {
  if (rank === 1) return require("@/assets/leaderboard-1.png");
  if (rank === 2) return require("@/assets/leaderboard-2.png");
  if (rank === 3) return require("@/assets/leaderboard-3.png");
  return require("@/assets/leaderboard-3.png");
}
const fetchLeaderboard = async () => {
  try {
    const data = await GlobalAllTimeLeaderboard(10);
    leaderboard.value = data.map((user, index) => ({
      name: user.Name,
      xp: user.XP,
      avatar: require("@/assets/Rectangle.png"),
      badge: getBadge(index + 1),
    }));
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    leaderboard.value = []; // Set empty array on error
  }
};
const fetchLeaderboardById = async () => {
  try {
    const data = await LeaderboardByUserId(auth.userId);
    leaderboardScore.value = data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
