<template>
  <!-- Mobile View -->
  <QuizDetailMobile 
    v-if="isMobile"
    :quiz="quiz"
    :quiz-id="quizId"
    :quiz-list="quizList"
    :leaderboard="leaderboard"
    :show-upgrade-banner=true
    :go-subscribe="goSubscribe"
  />
  
  <!-- Desktop View -->
  <QuizDetailDesktop 
    v-else
    :quiz="quiz"
    :quiz-id="quizId"
    :quiz-list="quizList"
    :leaderboard="leaderboard"
    :selected-menu="selectedMenu"
    :show-upgrade-banner="showUpgradeBanner"
    :quiz-loading="quizLoading"
    :go-subscribe="goSubscribe"
  />

  <!-- Toast Notification -->
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
import QuizDetailMobile from "@/components/mobile/QuizDetailMobile.vue";
import QuizDetailDesktop from "@/components/desktop/QuizDetailDesktop.vue";
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

/* ===== Responsive Detection ===== */
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024; // lg breakpoint
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
});

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
