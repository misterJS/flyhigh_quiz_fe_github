<template>
  <div class="min-h-screen bg-[#FAFAFA] px-4 pt-6 pb-24">
    <!-- Header Progress -->
    <div class="flex items-center justify-between mb-6">
      <button
        @click="prevPage"
        class="text-gray-500 text-xl"
        :disabled="isFirstPage"
      >
        <i class="fas fa-arrow-left"></i>
      </button>
      <div class="flex-1 mx-4 h-2 bg-gray-200 rounded-full">
        <div
          class="h-2 bg-blue-500 rounded-full"
          :style="{ width: ((page + 1) / totalPages) * 100 + '%' }"
        ></div>
      </div>
      <span class="text-sm text-gray-600">{{ page + 1 }}/{{ totalPages }}</span>
    </div>

    <!-- Page Content -->
    <div v-if="page === 0">
      <!-- Select Subject -->
      <h2 class="text-lg font-semibold text-gray-900 mb-1">Select Subject</h2>
      <p class="text-sm text-gray-500 mb-4">
        Are you a qualified section 708 investor
      </p>

      <!-- Search -->
      <div class="relative mb-6">
        <input
          v-model="search"
          type="text"
          placeholder="Search Subject"
          class="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
        <i class="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
        <i class="fas fa-sliders-h absolute right-3 top-2.5 text-gray-500"></i>
      </div>

      <!-- Grid Subjects -->
      <div class="grid grid-cols-2 gap-4 mb-28">
        <div
          v-for="(subject, i) in filteredSubjects"
          :key="i"
          @click="selectSubject(subject.title)"
          :class="[
            'p-4 rounded-xl cursor-pointer transition text-center',
            form.subject === subject.title
              ? 'bg-blue-50 border border-blue-500 shadow'
              : 'bg-white shadow hover:shadow-md',
          ]"
        >
          <img :src="subject.icon" alt="" class="w-12 h-12 mx-auto mb-2" />
          <h3 class="text-sm font-semibold text-gray-900">
            {{ subject.title }}
          </h3>
          <p class="text-xs text-gray-500 mt-1">{{ subject.subtitle }}</p>
        </div>
      </div>
    </div>

    <div v-else-if="page === 1">
      <!-- Settings -->
      <div class="space-y-6 mb-28 p-4 rounded-xl bg-white shadow">
        <!-- Timer (Discrete: 1, 30, 60) -->
        <div>
          <label class="text-base font-semibold text-gray-700">Timer</label>
          <div class="relative mt-2 h-2 bg-gray-200 rounded">
            <div
              class="absolute top-0 left-0 h-2 bg-blue-500 rounded"
              :style="{ width: `${(form.timerIndex / 2) * 100}%` }"
            ></div>
            <input
              type="range"
              v-model="form.timerIndex"
              min="0"
              max="2"
              step="1"
              class="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
            />
          </div>
          <div class="flex justify-between text-xs text-gray-500 mt-1 px-1">
            <span class="text-base">1m</span>
            <span class="text-base">30m</span>
            <span class="text-base">60m</span>
          </div>
        </div>

        <!-- Chapter -->
        <div>
          <label class="text-base font-semibold text-gray-700">Chapter</label>
          <select
            v-model="form.chapter"
            class="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="">Select chapter</option>
            <option>2,5 - 10,12</option>
            <option>1-5</option>
            <option>All Chapters</option>
          </select>
        </div>

        <!-- Level (5 levels) -->
        <div>
          <label class="text-base font-semibold text-gray-700">Level</label>
          <div class="relative mt-2 h-2 bg-gray-200 rounded">
            <div
              class="absolute top-0 left-0 h-2 bg-blue-500 rounded"
              :style="{ width: `${(form.level / 4) * 100}%` }"
            ></div>
            <input
              type="range"
              v-model="form.level"
              min="0"
              max="4"
              step="1"
              class="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
            />
          </div>
          <div class="flex justify-between text-xs text-gray-500 mt-1 px-1">
            <span class="text-base">Easy</span>
            <span class="text-base">Difficult</span>
          </div>
        </div>

        <!-- Total Question -->
        <div>
          <label class="text-base font-semibold text-gray-700"
            >Total Question</label
          >
          <select
            v-model="form.totalQuestion"
            class="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          >
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
            <option>50</option>
          </select>
        </div>
      </div>
    </div>

    <div v-else-if="page === 2">
      <!-- Privacy Settings -->
      <div class="mb-28 mt-5 bg-white rounded-2xl p-4">
        <h2 class="text-md font-semibold text-gray-900 mb-4">
          Who can view this quiz?
        </h2>
        <p class="text-sm text-gray-500 mb-4">
          Sebelum anda menekan "Create", sila pilih jenis privasi kuiz anda:
        </p>
        <div class="space-y-4">
          <!-- Public Option -->
          <label
            class="flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition"
            :class="
              form.privacy === 'public'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300'
            "
          >
            <input
              type="radio"
              v-model="form.privacy"
              value="public"
              default-value="public"
              class="hidden"
            />
            <div class="mt-1 text-xl">
              <i class="fas fa-globe"></i>
            </div>
            <div class="flex-1">
              <div class="font-semibold text-gray-900">
                Public <span class="text-xs text-gray-400 ml-1">Default</span>
              </div>
              <p class="text-sm text-gray-500">
                Kuiz anda akan boleh diakses dan digunakan oleh pengguna lain.
              </p>
            </div>
            <div class="mt-1">
              <span
                class="w-5 h-5 inline-block rounded-full border-2 flex items-center justify-center"
                :class="
                  form.privacy === 'public'
                    ? 'border-blue-500'
                    : 'border-gray-300'
                "
              >
                <span
                  class="w-2.5 h-2.5 rounded-full"
                  :class="form.privacy === 'public' ? 'bg-blue-500' : ''"
                ></span>
              </span>
            </div>
          </label>

          <!-- Private Option -->
          <label
            class="flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition"
            :class="
              form.privacy === 'private'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300'
            "
          >
            <input
              type="radio"
              v-model="form.privacy"
              value="private"
              class="hidden"
            />
            <div class="mt-1 text-xl">
              <i class="fas fa-lock"></i>
            </div>
            <div class="flex-1">
              <div class="font-semibold text-gray-900">Private</div>
              <p class="text-sm text-gray-500">
                Kuiz ini hanya boleh dilihat dan digunakan oleh anda sahaja.
              </p>
            </div>
            <div class="mt-1">
              <span
                class="w-5 h-5 inline-block rounded-full border-2 flex items-center justify-center"
                :class="
                  form.privacy === 'private'
                    ? 'border-blue-500'
                    : 'border-gray-300'
                "
              >
                <span
                  class="w-2.5 h-2.5 rounded-full"
                  :class="form.privacy === 'private' ? 'bg-blue-500' : ''"
                ></span>
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!-- Footer Buttons -->
    <div
      class="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 flex gap-2 justify-between"
    >
      <button
        class="border border-blue-600 text-blue-600 w-full py-2 rounded-[20px] font-semibold"
        @click="prevPage"
        :disabled="isFirstPage"
      >
        Back
      </button>
      <button
        class="bg-blue-600 text-white w-full py-2 rounded-[20px] font-semibold"
        @click="nextPage"
      >
        {{ isLastPage ? "Create" : "Next" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watchEffect } from "vue";

const form = reactive({
  subject: "",
  timerIndex: 1,
  timer: 30,
  chapter: "2,5 - 10,12",
  level: 2,
  totalQuestion: 50,
  privacy: "public",
});

const timerOptions = [1, 30, 60];

watchEffect(() => {
  form.timer = timerOptions[form.timerIndex];
});

const page = ref(0);
const totalPages = 3;

const search = ref("");
const subjects = [
  {
    title: "Accountant",
    subtitle: "Personal class with a tutor",
    icon: "/icons/accountant.png",
  },
  {
    title: "A-Levels Law",
    subtitle: "Create new waiting list entry",
    icon: "/icons/law.png",
  },
  {
    title: "Akhlaq",
    subtitle: "Find your partner in waiting list",
    icon: "/icons/akhlaq.png",
  },
  {
    title: "One to one",
    subtitle: "Personal class with a tutor",
    icon: "/icons/one-to-one.png",
  },
  {
    title: "Group of 2",
    subtitle: "Create new waiting list entry",
    icon: "/icons/group.png",
  },
  {
    title: "Arabic",
    subtitle: "Find your partner in waiting list",
    icon: "/icons/arabic.png",
  },
  { title: "Physics", subtitle: "", icon: "/icons/physics.png" },
  { title: "History", subtitle: "", icon: "/icons/history.png" },
];

const selectSubject = (title) => {
  form.subject = title;
};

const filteredSubjects = computed(() =>
  subjects.filter((s) =>
    s.title.toLowerCase().includes(search.value.toLowerCase())
  )
);

const isFirstPage = computed(() => page.value === 0);
const isLastPage = computed(() => page.value === totalPages - 1);

const nextPage = () => {
  if (!isLastPage.value) page.value++;
  else console.log("CREATE QUIZ:", form.value);
};

const prevPage = () => {
  if (!isFirstPage.value) page.value--;
};
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  height: 14px;
  width: 14px;
  border-radius: 9999px;
  background: #2563eb;
  cursor: pointer;
  margin-top: -6px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
</style>
