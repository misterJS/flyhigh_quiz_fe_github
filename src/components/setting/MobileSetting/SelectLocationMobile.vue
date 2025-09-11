<template>
  <div class="min-h-screen bg-[#f9fafb] p-4 pb-24">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button @click="goBack" class="text-gray-700 text-lg" aria-label="Back">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="font-semibold text-lg">Country</h1>
    </div>

    <!-- Card with fetched countries -->
    <div class="bg-white rounded-3xl p-2 shadow divide-y divide-gray-100">
      <button
        v-for="c in countries"
        :key="c.id"
        class="w-full flex items-center justify-between py-4 px-2"
        @click="choose(c)"
      >
        <div class="flex items-center gap-3">
          <span class="text-base text-gray-900">{{ c.countryName }}</span>
        </div>
        <span class="w-6 h-6 rounded-full grid place-items-center border-2" :class="selectedId === c.id ? 'border-blue-500' : 'border-gray-300'">
          <span v-if="selectedId === c.id" class="w-3 h-3 rounded-full bg-blue-500"></span>
        </span>
      </button>
      <div v-if="loading" class="text-center text-gray-500 py-4">Loading...</div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { GetDataCountry } from "@/api/settingApi";

const router = useRouter();
const route = useRoute();

const countries = ref([]);
const selectedId = ref(null);
const loading = ref(false);

onMounted(async () => {
  // preselect from query if provided
  if (route.query.selectedId) selectedId.value = Number(route.query.selectedId);
  await fetchCountries();
});

function goBack() {
  router.back();
}

async function fetchCountries() {
  loading.value = true;
  try {
    const res = await GetDataCountry("", 1, 24);
    const all = Array.isArray(res?.data) ? res.data : [];
    // Only MY, SG, ID by name, Malaysia first
    const wanted = ["MALAYSIA", "SINGAPORE", "INDONESIA"];
    const filtered = all
      .map((c) => ({ id: c.id, countryName: String(c.countryName || "").trim() }))
      .filter((c) => wanted.includes(c.countryName.toUpperCase()));
    const pretty = filtered.map((c) => ({ id: c.id, countryName: c.countryName.charAt(0) + c.countryName.slice(1).toLowerCase() }));
    countries.value = pretty.sort((a, b) => {
      if (a.countryName.toUpperCase() === 'MALAYSIA') return -1;
      if (b.countryName.toUpperCase() === 'MALAYSIA') return 1;
      return a.countryName.localeCompare(b.countryName);
    });
  } catch (e) {
    console.error("GetDataCountry failed:", e?.message || e);
    countries.value = [
      { id: 13, countryName: "Malaysia" },
      { id: 19, countryName: "Singapore" },
      { id: 9, countryName: "Indonesia" },
    ];
  } finally {
    loading.value = false;
  }
}

function choose(c) {
  selectedId.value = c.id;
  router.replace({ path: "/edit-profile", query: { countryId: c.id, countryName: c.countryName } });
}
</script>
