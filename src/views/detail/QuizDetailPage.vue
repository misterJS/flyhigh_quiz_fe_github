<template>
  <div class="flex flex-col lg:flex-row min-h-screen bg-[#f9fafb]">
    <SidebarComponent class="hidden lg:block" />
    <div class="flex-1 flex flex-col w-full">
      <HeaderComponent class="hidden lg:flex" />
      <main class="flex-1 p-4 sm:p-6 lg:p-8 pb-24">
        <div class="flex flex-col lg:flex-row mx-auto max-w-6xl">
          <!-- KIRI -->
          <div class="flex-1">
            <!-- Custom Header -->
            <div class="flex justify-between items-center mb-4">
              <!-- Left: Back -->
               <div class="flex gap-1 items-center">
                <router-link to="/quiz" class="p-2">
                  <i class="fas fa-arrow-left text-lg text-gray-800"></i>
                </router-link>
                <h2 class="text-base font-semibold text-gray-900">{{ quiz?.subjectName || 'Biology' }}</h2>
               </div>

              <!-- Right: Share + Bookmark -->
              <div class="flex items-center gap-3">
                <button class="p-2">
                  <i class="fas fa-share-square text-lg text-gray-800"></i>
                </button>
                <button class="p-2">
                  <i class="far fa-bookmark text-lg text-gray-800"></i>
                </button>
              </div>
            </div>


            <div class="rounded-xl overflow-hidden mb-6">
              <img :src="quiz?.image || require('@/assets/quiz.png')" alt="Quiz Image"
                class="w-full h-[200px] object-cover" />
            </div>

            <h1 class="text-xl sm:text-2xl font-semibold text-[#111827] mb-3">
              {{ quiz?.title }}
            </h1>
            <p class="text-sm text-gray-600 mb-6 leading-relaxed">
              {{ quiz?.description ?? "This module on Additional Mathematics is designed to deepen students understanding of advanced mathematical concepts.It covers topics such as algebra, calculus, and geometry. Read More" }}
            </p>

            <div class="mb-6">
              <SwitchButtonGroup v-model="selectedMenu" :options="['Detail', 'Quiz']" size="sm" variant="pill" />
            </div>

            <!-- TAB: DETAIL -->
            <div v-if="selectedMenu === 'Detail'">
              <div class="bg-white rounded-xl p-5 shadow-sm">
                <h2 class="text-base font-semibold text-[#111827] mb-4">Outcome</h2>

                <div class="grid grid-cols-2 gap-4 mb-8">
                  <!-- Skill level -->
                  <div class="bg-gray-100 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-500">Skill level:</p>
                      <p class="text-sm font-semibold text-gray-900">
                        {{ quiz?.level || 'All levels' }}
                      </p>
                    </div>
                    <img src="@/assets/star.png" alt="star" class="w-8 h-8" />
                  </div>

                  <!-- Quizzes -->
                  <div class="bg-gray-100 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-500">Quizzes</p>
                      <p class="text-sm font-semibold text-gray-900">
                        {{ quiz?.totalQuiz || 0 }}
                      </p>
                    </div>
                    <img src="@/assets/note.png" alt="note" class="w-8 h-8" />
                  </div>

                  <!-- Language -->
                  <div class="bg-gray-100 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-500">Language :</p>
                      <p class="text-sm font-semibold text-gray-900">
                        {{ quiz?.language || 'English' }}
                      </p>
                    </div>
                    <img src="@/assets/language-circle.png" alt="note" class="w-8 h-8" />
                  </div>

                  <!-- Video Quiz -->
                  <div class="bg-gray-100 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-500">Video Quiz :</p>
                      <p class="text-sm font-semibold text-gray-900">
                        {{ quiz?.video || '30 mins' }}
                      </p>
                    </div>
                    <img src="@/assets/timer-start.png" alt="note" class="w-8 h-8" />
                  </div>
                </div>
              </div>

              <!-- (disembunyikan) -->
              <h2 class="hidden text-sm font-semibold text-[#111827] mb-3">Requirements</h2>
              <ul class="hidden list-disc ml-6 text-sm text-gray-600 space-y-2 leading-relaxed">
                <li>You don't need a background in user experience, design or coding to take this course.</li>
                <li>This is an in-depth course. If you allocate 60–90 mins a day, and do all of the activities, it will
                  take 2–3 weeks to complete.</li>
              </ul>

              <div class="hidden lg:flex gap-4 mt-8">
                <router-link :to="{
                  path: `/quiz-confirmation/${quizId}`,
                  query: {
                    id: quiz?.id,
                    img: quiz?.imagePath,
                  },
                }"
                  class="bg-[#2563EB] hover:bg-[#1E40AF] w-full text-white text-sm px-6 py-2.5 rounded-lg font-semibold text-center">
                  Start Solo Quiz
                </router-link>
                <button disabled
                  class="text-[#2563EB] text-sm px-6 py-2.5 w-full rounded-lg border border-[#D1D5DB] bg-white font-semibold">
                  Start Team Quiz
                </button>
              </div>
            </div>

            <!-- TAB: QUIZ -->
            <div v-else>
              <h2 class="text-sm font-semibold text-[#111827] mb-3">Quizzes</h2>

              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <QuizCard v-for="(item, index) in quizList" :key="index" :image="item.image" :title="item.title"
                  :students="item.TotalStudent" :points="item.CreditAmount" :modules="item.totalQuiz"
                  :duration="item.totalHour" :id="item.id" />
              </div>

              <div v-if="quizLoading" class="text-center py-4 text-gray-600">
                Loading more quizzes...
              </div>
            </div>
          </div>

          <!-- KANAN -->
          <div v-if="selectedMenu === 'Detail'" class="w-full lg:w-[500px] space-y-6">
            <!-- (disembunyikan) Congratulations Card -->
            <div class="hidden bg-white rounded-xl p-5 shadow-sm relative overflow-hidden">
              <p class="text-sm font-semibold text-[#111827] mb-1">
                80% Quiz Clear 🍀
              </p>
              <p class="text-sm text-gray-600 mb-4">
                Let's complete a little more to claim the prize
              </p>
              <button class="px-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-2 rounded-lg text-sm font-medium">
                Claim Reward
              </button>
              <img src="@/assets/quiz-reward.png" class="absolute right-4 bottom-2 w-24 opacity-90" />
            </div>

            <!-- Leaderboard (API) -->
            <div class="bg-white rounded-2xl shadow-sm p-5">
              <div class="flex justify-between items-center mb-2">
                <p class="text-base font-semibold text-gray-900">Leaderboard</p>
                <router-link to="/ranking" class="text-sm text-blue-600 font-medium">
                  View All
                </router-link>
              </div>

              <div class="space-y-2">
                <div v-for="(user, index) in leaderboard" :key="index"
                  class="flex justify-between items-center bg-white p-3 border-b last:border-0">
                  <div class="flex items-center gap-3">
                    <img :src="user.avatar" class="w-10 h-10 rounded-full" />
                    <div>
                      <p class="text-sm font-medium text-[#1E1E1F]">{{ user.name }}</p>
                      <p class="text-xs text-gray-400">{{ user.xp }} XP</p>
                    </div>
                  </div>
                  <img :src="user.badge" class="w-9 h-9 rounded-full" />
                </div>
              </div>
            </div>

            <!-- Achievement -->
            <div class="bg-white rounded-xl p-5 shadow-sm mb-32 lg:mb-0">
              <p class="text-sm font-semibold text-[#111827] mb-4">Achievement</p>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div v-for="badge in badges" :key="badge.label"
                  class="flex flex-col items-start gap-1 bg-[#f9fafb] p-4 rounded-xl">
                  <img :src="badge.img" class="w-9 mb-2" />
                  {{ badge.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- CTA Mobile -->
      <div class="fixed bottom-0 left-0 right-0 lg:hidden bg-transparent border-none p-4 z-50">
        <router-link :to="{
          path: `/quiz-confirmation/${quizId}`,
          query: {
            id: quiz?.id,
            img: quiz?.imagePath,
          },
        }"
          class="w-full block text-center bg-[#2563EB] hover:bg-[#1E40AF] text-white py-4 rounded-full text-base font-semibold">
          Start Quiz Now
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref, onBeforeUnmount } from "vue";
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import HeaderComponent from "@/components/base/HeaderComponent.vue";
import SwitchButtonGroup from "@/components/base/SwitchButton.vue";
import QuizCard from "@/components/base/QuizCardComponent.vue";
import { QuizPreview, AllQuizList } from "@/api/quizApi";
import { useAuthStore } from "@/stores/authStore";
import { AllTimeLeaderboard, LeaderboardByUserId } from "@/api/leaderboardApi";

const auth = useAuthStore();

const quiz = ref(null);
const selectedMenu = ref("Detail");
const route = useRoute();
const quizId = route.params.id;

const params = { guid: quizId };

// ===== Fetch Quiz Detail =====
onMounted(async () => {
  try {
    const response = await QuizPreview(params);
    quiz.value = response;
    await fetchQuizList();
  } catch (err) {
    console.error("Gagal ambil quiz:", err.message);
  }

  // Leaderboard
  fetchLeaderboard();
  fetchLeaderboardById();
});

// ===== Achievements (static images) =====
const badges = [
  { label: "Math Champion", img: require("@/assets/Badge1.png") },
  { label: "Science Star", img: require("@/assets/Badge2.png") },
];

// ===== Quiz List (child quizzes) =====
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
      parentId: quiz.value?.id,   // sesuaikan param sesuai backend-mu
      page: quizPage.value,
      pageSize: quizPageSize.value,
    });

    // hanya tampilkan yang punya totalQuiz > 0 (konsisten dengan list utama)
    quizList.value.push(...data.data.filter(q => q.totalQuiz > 0));
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
  if (scrollTop + clientHeight >= scrollHeight - 50 && selectedMenu.value === "Quiz") {
    fetchQuizList();
  }
};
onMounted(() => window.addEventListener("scroll", handleScroll));
onBeforeUnmount(() => window.removeEventListener("scroll", handleScroll));

// ===== Leaderboard (API) =====
const leaderboard = ref([]);
const leaderboardScore = ref([]); // jika ingin dipakai untuk kartu progress user

function getBadge(rank) {
  if (rank === 1) return require("@/assets/Badge1.png");
  if (rank === 2) return require("@/assets/Badge2.png");
  if (rank === 3) return require("@/assets/Badge3.png");
  return require("@/assets/Badge3.png");
}

const fetchLeaderboard = async () => {
  try {
    const data = await AllTimeLeaderboard();
    leaderboard.value = data.map((user, index) => ({
      name: user.Name,
      xp: user.XP,
      avatar: require("@/assets/Rectangle.png"), // placeholder avatar
      badge: getBadge(index + 1),
    }));
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
  }
};

const fetchLeaderboardById = async () => {
  try {
    const data = await LeaderboardByUserId(auth.userId);
    leaderboardScore.value = data; // opsional: untuk progress user
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
  }
};
</script>
