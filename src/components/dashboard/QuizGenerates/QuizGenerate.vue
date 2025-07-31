<template>
  <div class="min-h-screen bg-[#FAFAFA] px-4 pt-6 pb-24">
    <!-- Progress Header -->
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

    <!-- Select Subject -->
    <div v-if="page === 0">
      <h2 class="text-lg font-semibold text-gray-900 mb-1">Select Subject</h2>
      <p class="text-sm text-gray-500 mb-4">
        Are you a qualified section 708 investor
      </p>

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

      <div class="grid grid-cols-2 gap-4 mb-28">
        <div
          v-for="(subject, i) in filteredSubjects"
          :key="i"
          @click="selectSubject(subject)"
          :class="[
            'p-4 rounded-xl cursor-pointer transition text-center',
            form.subjectId === subject.SubjectId
              ? 'bg-blue-50 border border-blue-500 shadow'
              : 'bg-white shadow hover:shadow-md',
          ]"
        >
          <img
            :src="`/subjects/${subject.SubjectName}.png`"
            alt=""
            class="w-[60px] h-[60px] mx-auto mb-2"
          />
          <h3 class="text-base font-semibold text-gray-900">
            {{ subject.SubjectName }}
          </h3>
          <p class="text-sm text-gray-500 mt-1">
            {{
              subject.Description !== ""
                ? subject.Description
                : "Personal class with a tutor"
            }}
          </p>
        </div>
      </div>
    </div>

    <!-- Timer, Chapter, Difficulty -->
    <div v-else-if="page === 1">
      <div class="space-y-6 mb-28 p-4 rounded-xl bg-white shadow">
        <!-- Timer -->
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
            <option>1,2,3,4,5,6,7,8,9</option>
            <option>All Chapters</option>
          </select>
        </div>

        <!-- Grade -->
        <div>
          <label class="text-base font-semibold text-gray-700">Grade</label>
          <select
            v-model="form.gradeId"
            class="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="">Select Grade</option>
            <option v-for="grade in allGrade" :key="grade.Id" :value="grade.Id">
              {{ grade.GradeName }}
            </option>
          </select>
        </div>

        <!-- Difficulty (Level) -->
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
      <!-- Quiz Cover Image -->
      <div class="mt-6 bg-white p-4 rounded-2xl shadow">
        <h2 class="text-base font-semibold text-gray-900 mb-4">
          Quiz Cover Image
        </h2>

        <!-- Grid Image -->
        <div class="grid grid-cols-3 gap-3 mb-6">
          <div
            v-for="(img, i) in allCovers"
            :key="i"
            class="relative rounded-xl overflow-hidden cursor-pointer"
            @click="form.coverImage = img"
          >
            <img
              :src="img"
              class="w-full h-24 object-cover"
              :class="form.coverImage === img ? 'ring-2 ring-blue-500' : ''"
            />
            <div
              v-if="form.coverImage === img"
              class="absolute inset-0 bg-black/30 flex items-center justify-center"
            >
              <div
                class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs"
              >
                ✓
              </div>
            </div>
          </div>
        </div>

        <!-- Upload Button -->
        <label
          class="w-full flex items-center justify-center gap-2 border border-blue-600 text-blue-600 py-3 rounded-full font-medium text-sm cursor-pointer"
        >
          <i class="fas fa-folder-open"></i>
          Find From Your Device
          <input
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleFileUpload"
          />
        </label>
      </div>
    </div>

    <!-- Privacy -->
    <div v-else-if="page === 3">
      <div class="mb-28 mt-5 bg-white rounded-2xl p-4">
        <h2 class="text-md font-semibold text-gray-900 mb-4">
          Who can view this quiz?
        </h2>
        <p class="text-sm text-gray-500 mb-4">
          Sebelum anda menekan "Create", sila pilih jenis privasi kuiz anda:
        </p>
        <div class="space-y-4">
          <!-- Private -->
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
            <div class="mt-1 text-xl"><i class="fas fa-lock"></i></div>
            <div class="flex-1">
              <div class="font-semibold text-gray-900">
                Private <span class="text-xs text-gray-400 ml-1">Default</span>
              </div>
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

          <!-- Public -->
          <label
            @click="checkPublic()"
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
              class="hidden"
            />
            <div class="mt-1 text-xl"><i class="fas fa-globe"></i></div>
            <div class="flex-1">
              <div class="font-semibold text-gray-900">
                Public
                <span class="text-xs text-red-500 italic ml-1"
                  >Subscribers only</span
                >
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
        </div>
      </div>

      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      >
        <div
          class="bg-white w-80 rounded-2xl text-center shadow-lg overflow-hidden"
        >
          <!-- Header Image -->
          <div
            class="bg-[#FFF5E5] flex items-center justify-center py-6 relative"
          >
            <img src="/modals/crown.png" alt="Premium Icon" class="w-14 h-14" />
            <!-- titik-titik hias -->
            <div
              class="absolute left-6 top-6 w-2 h-2 rounded-full bg-orange-400"
            ></div>
            <div
              class="absolute right-6 top-8 w-2 h-2 rounded-full bg-orange-400"
            ></div>
            <div
              class="absolute left-10 bottom-5 w-2 h-2 rounded-full bg-orange-400"
            ></div>
            <div
              class="absolute right-10 bottom-5 w-2 h-2 rounded-full bg-orange-400"
            ></div>
          </div>

          <!-- Body -->
          <div class="px-6 py-5">
            <h3 class="font-semibold text-gray-900 mb-2">
              Want to share your quiz with others?
            </h3>
            <p class="text-sm text-gray-500 mb-6">
              To publish your quiz and make it accessible to others, please
              <span class="text-red-500 font-semibold">subscribe</span> first.
            </p>
            <div class="space-y-3">
              <button
                class="w-full bg-blue-600 text-white py-2 rounded-full font-semibold"
                @click="subscribeNow"
              >
                Subscribe Now
              </button>
              <button
                class="w-full border border-blue-600 text-blue-600 py-2 rounded-full font-semibold"
                @click="showModal = false"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
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
import { QuizListSubject } from "@/api/subjectApi";
import { ref, computed, reactive, watchEffect, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { useSnackbarStore } from "@/stores/snackbarStore";
import { QuizGradeAll } from "@/api/quizApi";

const snackbar = useSnackbarStore();
const router = useRouter();
const auth = useAuthStore();

const showModal = ref(false);
const uploadedFile = ref(null); // file object asli untuk dikirim
const uploadedCover = ref(null); // preview base64

function checkPublic() {
  const isSubscribed = false;
  if (!isSubscribed) {
    showModal.value = true;
    form.privacy = "private";
  }
}

function subscribeNow() {
  showModal.value = false;
  router.push("/subscribe");
}

const form = reactive({
  subjectId: null,
  subjectName: "",
  timerIndex: 1,
  timer: 30,
  chapter: "1,2,3,4,5,6,7,8,9",
  level: 2,
  totalQuestion: 50,
  privacy: "private",
  coverImage: "",
  points: 5,
  gradeId: "",
});

const timerOptions = [1, 30, 60];
watchEffect(() => {
  form.timer = timerOptions[form.timerIndex];
});

const page = ref(0);
const totalPages = 4;
const search = ref("");
const allSubjects = ref([]);
const allGrade = ref([]);
const subjects = ref([]);

const quizCovers = ref([
  "/covers/cover1.png",
  "/covers/cover2.png",
  "/covers/cover3.jpg",
  "/covers/cover4.jpg",
  "/covers/cover5.jpg",
  "/covers/cover6.jpg",
  "/covers/cover7.jpg",
  "/covers/cover8.jpg",
  "/covers/cover9.jpg",
]);

const allCovers = computed(() =>
  uploadedCover.value
    ? [uploadedCover.value, ...quizCovers.value]
    : quizCovers.value
);

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    uploadedFile.value = file; // simpan file untuk backend
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedCover.value = e.target.result; // hanya preview
      form.coverImage = uploadedCover.value;
    };
    reader.readAsDataURL(file);
  }
}

const getAllSubject = async () => {
  try {
    const data = await QuizListSubject();
    allSubjects.value = data;
    subjects.value = data;
  } catch (error) {
    console.error(error);
  }
};

const getAllGrade = async () => {
  try {
    const data = await QuizGradeAll();
    allGrade.value = data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  getAllGrade();
  getAllSubject();
});

const selectSubject = (subject) => {
  form.subjectId = subject.SubjectId;
  form.subjectName = subject.SubjectName;
};

const filteredSubjects = computed(() =>
  subjects.value.filter((s) =>
    s.SubjectName.toLowerCase().includes(search.value.toLowerCase())
  )
);

const isFirstPage = computed(() => page.value === 0);
const isLastPage = computed(() => page.value === totalPages - 1);

const submitQuiz = async () => {
  try {
    const formData = new FormData();
    formData.append("userId", auth.userId);
    formData.append("subjectId", form.subjectId);
    formData.append("gradeId", form.gradeId);
    formData.append("timer", toHHMMSS(form.timer));
    formData.append("chapter", form.chapter);
    formData.append("difficulty", generateDifficulty(form.level));
    formData.append("totalQuestion", form.totalQuestion);
    formData.append("points", form.points.toString());
    formData.append("isPublic", form.privacy === "public");

    // kirim file kalau ada
    if (uploadedFile.value) {
      formData.append("coverImage", uploadedFile.value);
    }

    const response = await axios.post(
      "https://quiz.flyhigh.my/flyhigh_be/api/kiddo/insert/GenerateRandomQuestion",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log("SUCCESS:", response.data);
    snackbar.trigger(`Quiz ${form.subjectName} created!`, "success");
    router.push("/quiz");
  } catch (error) {
    snackbar.trigger("Failed to create quiz", "error");
    console.error("FAILED:", error);
  }
};

const toHHMMSS = (minute) => {
  const m = String(minute).padStart(2, "0");
  return `00:${m}:00`;
};

const generateDifficulty = (level) => {
  switch (parseInt(level)) {
    case 0:
      return "1";
    case 1:
      return "1,2";
    case 2:
      return "1,2,3";
    case 3:
      return "2,3,4";
    case 4:
      return "3,4,5";
    default:
      return "1,2,3";
  }
};

const nextPage = () => {
  if (!isLastPage.value) {
    page.value++;
  } else {
    submitQuiz();
  }
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
