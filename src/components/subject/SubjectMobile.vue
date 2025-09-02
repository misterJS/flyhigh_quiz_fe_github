<!-- src/views/SubjectsPage.vue -->
<template>
  <div class="min-h-screen bg-[#FAFAFA] px-4 pt-4 pb-10">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-4">
      <button @click="goBack" class="text-gray-800 text-lg">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="text-lg font-semibold text-gray-900">Subjects</h1>
    </div>

    <p class="text-[15px] text-gray-600 mb-4">All Subject</p>

    <!-- Grid Subjects -->
    <div
      class="grid grid-cols-3 gap-x-6 gap-y-6"
      aria-label="Subjects grid"
      role="list"
    >
      <button
        v-for="(s, idx) in subjects"
        :key="s.SubjectId ?? s.SubjectName"
        class="flex flex-col items-center gap-2 focus:outline-none"
        role="listitem"
        @click="openSubject(s)"
      >
        <!-- Ring warna -->
        <div
          class="p-[6px] rounded-full"
          :style="{ boxShadow: `0 0 0 2px ${ringColor(idx)}33` }"
        >
          <div
            class="w-[66px] h-[66px] rounded-full bg-white grid place-items-center border-2"
            :style="{ borderColor: ringColor(idx) }"
          >
            <img
              :src="iconSrc(s.SubjectName)"
              :alt="s.SubjectName"
              class="w-9 h-9 object-contain"
              loading="lazy"
            />
          </div>
        </div>

        <span
          class="text-[13px] text-gray-800 max-w-[90px] text-center leading-snug truncate"
          :title="s.SubjectName"
        >
          {{ s.SubjectName }}
        </span>
      </button>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="mt-8 text-center text-gray-500 text-sm">
      Loading subjects…
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { QuizListSubject } from "@/api/subjectApi";

const router = useRouter();
const loading = ref(true);
const subjects = ref([]);

/** Warna ring per index (berulang) */
const palette = [
  "#E86F6B", // merah lembut
  "#6D87FF", // biru
  "#F0B429", // kuning
  "#7BC67E", // hijau
  "#9C6ADE", // ungu
  "#56C4C5", // teal
  "#F59E0B", // amber
  "#EC4899", // pink
  "#22C55E", // emerald
  "#60A5FA", // sky
];
const ringColor = (i) => palette[i % palette.length];

/** Path ikon subject (mengikuti pola quiz-generate) */
const iconSrc = (name) => `/subjects/${name}.png`;

/** Navigasi saat subjek dipilih */
function openSubject(s) {
  // arahkan sesuai kebutuhanmu
  router.push({ path: "/quiz", query: { subjectId: s.SubjectId, name: s.SubjectName } });
}

function goBack() {
  router.back();
}

onMounted(async () => {
  try {
    const data = await QuizListSubject();
    // Normalisasi jika API mengembalikan properti berbeda
    subjects.value =
      (Array.isArray(data) ? data : []).map((x, i) => ({
        SubjectId: x.SubjectId ?? x.id ?? i + 1,
        SubjectName: x.SubjectName ?? x.name ?? "Subject",
      }));

    // Fallback dummy bila kosong
    if (!subjects.value.length) {
      subjects.value = [
        "Melayu",
        "Inggeris",
        "Matematik",
        "Sains",
        "UPKK",
        "Sejarah",
        "KAFA",
        "UASA",
        "UPSR",
        "SPM",
        "UMUM",
      ].map((n, i) => ({ SubjectId: i + 1, SubjectName: n }));
    }
  } catch (e) {
    // Fallback dummy on error
    subjects.value = [
      "Melayu",
      "Inggeris",
      "Matematik",
      "Sains",
      "UPKK",
      "Sejarah",
      "KAFA",
      "UASA",
      "UPSR",
      "SPM",
      "UMUM",
    ].map((n, i) => ({ SubjectId: i + 1, SubjectName: n }));
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* kecilkan arrow ios safari sedikit agar konsisten */
button:active { transform: translateY(0); }
</style>
