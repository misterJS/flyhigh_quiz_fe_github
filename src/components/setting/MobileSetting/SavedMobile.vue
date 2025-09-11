
<template>
  <div class="min-h-screen bg-[#FAFAFA] pb-24">
    <!-- Header -->
    <div class="sticky top-0 z-10 bg-[#FAFAFA] px-4 pt-4 pb-3">
      <div class="flex items-center gap-3">
        <button @click="router.back()" class="text-gray-800 text-lg" aria-label="Back">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="text-lg font-normal text-gray-900">Saved</h1>
      </div>
    </div>

    <!-- Subjects scroller -->
    <section class="px-4 mt-3">
      <p class="text-sm font-normal text-gray-900 mb-2">Subjects</p>
      <div class="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
        <button
          v-for="(s, idx) in subjects"
          :key="s.SubjectId ?? idx"
          class="shrink-0 flex flex-col items-center gap-2 focus:outline-none"
        >
          <div class="w-14 h-14 rounded-full grid place-items-center border" :style="{ borderColor: ringColor(idx) }">
            <img :src="iconSrc(s.SubjectName)" :alt="s.SubjectName" class="w-8 h-8 object-contain" loading="lazy" />
          </div>
          <span class="text-[12px] text-gray-700 w-16 text-center truncate">{{ s.SubjectName }}</span>
        </button>
      </div>
    </section>

    <!-- Saved list -->
    <section class="px-4 mt-4">
      <p class="text-sm font-normal text-gray-900 mb-2">Quiz Saved</p>

      <div class="space-y-3">
        <div
          v-for="q in savedQuizzes"
          :key="q.id || q.guid"
          class="bg-white rounded-2xl shadow-sm border border-gray-200 p-3 flex items-start relative"
        >
          <router-link :to="`/quiz/${q.guid || q.id}`" class="flex items-start gap-3 flex-1">
            <img :src="q.image || q.imagePath" alt="thumb" class="w-16 h-16 rounded-xl object-cover" loading="lazy" />
            <div class="flex-1 min-w-0">
              <h3 class="text-[15px] font-semibold text-gray-900 truncate">{{ q.title }}</h3>
              <p class="text-xs text-gray-500 mt-0.5 mb-2 line-clamp-2">{{ q.description || subtext }}</p>
              <div class="grid grid-cols-2 gap-y-1 text-[12px] text-gray-800">
                <div class="flex items-center gap-1"><i class="fas fa-book text-gray-400"></i>{{ q.totalQuiz }} Modul</div>
                <div class="flex items-center gap-1 justify-end"><i class="fas fa-clock text-gray-400"></i>{{ q.totalHour }}</div>
                <div class="flex items-center gap-1 col-span-2"><i class="fas fa-user text-gray-400"></i>{{ q.submittedCount || 0 }} Student</div>
              </div>
            </div>
          </router-link>

          <button
            class="absolute right-3 top-3 p-1"
            :aria-pressed="true"
            @click.stop="toggleSave(q)"
            title="Unsave"
          >
            <i class="fas fa-bookmark text-[#2563EB]"></i>
          </button>

          <div class="absolute bottom-3 right-3 bg-blue-500 text-white text-xs font-medium px-2 py-[2px] rounded-lg flex items-center gap-1 shadow">
            <img src="@/assets/corn.png" alt="corn" class="w-3 h-3" />
            {{ q.CreditAmount ?? 0 }}
          </div>
        </div>

        <div v-if="loading" class="text-center text-gray-500 py-3">Loading�?�</div>
        <div v-if="!loading && !savedQuizzes.length" class="text-center text-gray-400 py-8">No saved quizzes</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { GetSavedQuizzes, SaveQuizToggle } from "@/api/quizApi";
import { QuizListSubject } from "@/api/subjectApi";

const router = useRouter();
const auth = useAuthStore();

const page = ref(1);
const pageSize = ref(10);
const totalPages = ref(1);
const loading = ref(false);
const savedQuizzes = ref([]);

const subjects = ref([]);
const palette = ["#E86F6B","#6D87FF","#F0B429","#7BC67E","#9C6ADE","#56C4C5","#F59E0B","#EC4899","#22C55E","#60A5FA"];
const ringColor = i => palette[i % palette.length];
const iconSrc = (name) => `/subjects/${name}.png`;
const subtext = "Suitable for small homes with minimal electricity usage";

async function fetchSubjects() {
  try {
    const data = await QuizListSubject();
    subjects.value = Array.isArray(data) ? data.slice(0, 8) : [];
  } catch {
    subjects.value = [];
  }
}

function normalize(item) {
  return {
    id: item?.id ?? item?.guid,
    guid: item?.guid ?? item?.id,
    title: item?.title ?? item?.QuizTitle ?? item?.name ?? "Quiz",
    image: item?.image ?? item?.imagePath ?? item?.thumbnail,
    imagePath: item?.imagePath,
    totalQuiz: item?.totalQuiz ?? item?.TotalQuiz ?? 0,
    totalHour: item?.totalHour ?? item?.TotalHour ?? "",
    submittedCount: item?.submittedCount ?? item?.SubmittedCount ?? 0,
    CreditAmount: item?.CreditAmount ?? item?.credit ?? 0,
    description: item?.description ?? item?.Description ?? "",
  };
}

async function fetchSaved() {
  if (loading.value || page.value > totalPages.value) return;
  loading.value = true;
  try {
    const data = await GetSavedQuizzes({ studentId: auth.userId, page: page.value, pageSize: pageSize.value });
    const list = Array.isArray(data?.data) ? data.data : data;
    savedQuizzes.value.push(...list.map(normalize));
    totalPages.value = data?.totalPages ?? 1;
    page.value++;
  } catch (e) {
    console.error("GetSavedQuizzes failed:", e?.message || e);
  } finally {
    loading.value = false;
  }
}

async function toggleSave(q) {
  // optimistic remove
  const idx = savedQuizzes.value.findIndex(x => (x.guid || x.id) === (q.guid || q.id));
  const backup = savedQuizzes.value[idx];
  if (idx !== -1) savedQuizzes.value.splice(idx, 1);
  try {
    await SaveQuizToggle({ guid: q.guid || q.id, studentId: auth.userId, isSaved: false });
  } catch (e) {
    // revert
    if (idx !== -1) savedQuizzes.value.splice(idx, 0, backup);
    console.error("Unsave failed:", e?.message || e);
  }
}

const onScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 50) fetchSaved();
};

onMounted(() => {
  fetchSubjects();
  fetchSaved();
  window.addEventListener("scroll", onScroll);
});
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar{display:none}
.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
.line-clamp-2{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}
</style>
