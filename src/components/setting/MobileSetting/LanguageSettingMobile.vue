<template>
  <div class="min-h-screen bg-[#F3F4F6] p-4 pb-24">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-4">
      <button @click="goBack" class="text-gray-800 text-lg" aria-label="Back">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="font-normal text-lg">Language</h1>
    </div>

    <!-- Card -->
    <div class="bg-white rounded-3xl p-2 shadow-sm">
      <div class="divide-y divide-gray-100">
        <button v-for="lang in languages" :key="lang.id" type="button"
          class="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50"
          @click="selectLanguage(lang)" role="radio" :aria-checked="selectedId === lang.id">
          <div class="flex items-center gap-3">
            <img :src="lang.flag || getFlag(lang.code)" class="w-8 h-6 rounded-md object-cover" />
            <span class="text-sm font-medium text-gray-900">{{ lang.label }}</span>
          </div>

          <!-- custom radio -->
          <span class="w-5 h-5 rounded-full border flex items-center justify-center"
            :class="selectedId === lang.id ? 'border-[#2563EB]' : 'border-gray-300'">
            <span v-if="selectedId === lang.id" class="w-3 h-3 bg-[#2563EB] rounded-full"></span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { GetAllLanguages } from "@/api/settingApi";

// assets bendera
import flagUSA from "@/assets/flag-usa.png";
import flagUK from "@/assets/flag-uk.png";
import flagMY from "@/assets/flag-malaysia.png";

const router = useRouter();
const goBack = () => router.back();

/* Default (fallback) sambil nunggu API */
const languages = ref([
  { id: 1, code: "ms-my", label: "Malaysia (Bahasa Melayu)", flag: flagMY },
  { id: 2, code: "en-gbr", label: "English (GBR)", flag: flagUK },
]);

/* Simpan pilihan pakai ID dari backend */
const selectedId = ref(Number(localStorage.getItem("app_language_id") || 1));

onMounted(async () => {
  try {
    const resp = await GetAllLanguages(); // -> [{id:1,name:"First Language"},{id:2,name:"Dual Language"}]
    if (Array.isArray(resp) && resp.length) {
      languages.value = normalizeLanguages(resp);
      if (!languages.value.some(x => x.id === selectedId.value)) {
        selectedId.value = languages.value[0].id;
      }
    }
  } catch (e) {
    console.error(e);
  }
});

/* Map respons API -> objek untuk UI */
function normalizeLanguages(raw) {
  return raw.map(item => {
    const id = Number(item.id ?? item.Id);
    const name = String(item.name ?? item.Name ?? "").toLowerCase();
    if (id === 1 || name.includes("first")) {
      // First Language = Melayu
      return { id, code: "ms-my", label: "Malaysia (Bahasa Melayu)", flag: flagMY };
    }
    if (id === 2 || name.includes("dual")) {
      // Dual Language = English
      return { id, code: "en-gbr", label: "English (GBR)", flag: flagUK };
    }
    // default fallback
    return { id, code: "en-gbr", label: "English (GBR)", flag: flagUK };
  });
}

/* Fallback kalau flag tidak ter-assign */
function getFlag(code) {
  const c = String(code || "").toLowerCase();
  if (c.includes("us")) return flagUSA;
  if (c.includes("my") || c.includes("ms")) return flagMY;
  return flagUK;
}

function selectLanguage(lang) {
  selectedId.value = lang.id;
  localStorage.setItem("app_language_id", String(lang.id));
  localStorage.setItem("app_language_code", lang.code); // kalau nanti perlu kode locale
  // TODO: panggil API simpan preferensi jika tersedia
}
</script>
