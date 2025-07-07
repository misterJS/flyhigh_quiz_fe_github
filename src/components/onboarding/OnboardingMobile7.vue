<script setup>
import { ref } from "vue";
import { computed } from "vue";
const number = ref(1);
const changeNumber = () => {
  number.value = (number.value % 3) + 1;
  console.log(number.value);
};
const currentSlide = computed(() =>
  slides.find((slide) => slide.id === number.value)
);
import imageSlide1 from "@/assets/Onboarding-screen1.png";
import imagesSlide2 from "@/assets/Profile.png";
import imagesSlide3 from "@/assets/QUIZ(1).png";

const slides = [
  {
    id: 1,
    image: imageSlide1,
    title: "Welcome to Pickiddo! ",
    description:
      "Explore subjects, join quizzes, and boost your learning journey with engaging content.",
  },
  {
    id: 2,
    image: imagesSlide2,
    title: "Track Your Progress",
    description: "Earn XP, level up, and see how you rank on the leaderboard.",
  },
  {
    id: 3,
    image: imagesSlide3,
    title: "Master Quizzes And Topics",
    description:
      "Practice with tailored quizzes and modules to sharpen your knowledge.",
  },
];
</script>
<template>
  <div
    class="min-h-screen w-screen relative overflow-hidden bg-[#05192B] pt-[80px]"
  >
    <div
      class="border right-[-120px] absolute border-[#FFFFFF]/10 w-[234px] flex items-center rounded-full h-[234px] top-[-140px]"
    >
      <div
        class="w-[154px] h-[154px] mx-auto rounded-full bg-[#FFFFFF]/10"
      ></div>
    </div>
    <div
      class="w-[52px] absolute top-[24px] left-[33px] h-[52px] mx-auto rounded-full bg-[#FFFFFF]/10"
    ></div>
    <div
      class="border left-[-310px] absolute z-0 border-[#FFFFFF]/10 w-[678px] h-[678px] flex items-center rounded-full bottom-[-30px]"
    >
      <div
        class="w-[154px] h-[154px] mx-auto rounded-full bg-[#FFFFFF]/10"
      ></div>
    </div>
    <div
      class="text-white absolute right-4 top-2 h-[81px] w-[56px] justify-center items-center flex"
    >
      Skip
    </div>
    <div
      v-if="number === 2"
      class="absolute w-[279px] z-20 shadow-md ml-[50px] mt-[192px] rounded-[10px] overflow-hidden"
    >
      <img src="@/assets/My-recent-match.png" />
    </div>
    <div
      v-if="number === 2"
      class="absolute w-[279px] z-20 shadow-md ml-[89px] mt-[312px] rounded-[10px] overflow-hidden"
    >
      <img src="@/assets/My-recent-match.png" />
    </div>
    <div
      v-if="number === 3"
      class="absolute w-full z-20 flex justify-end text-sm font-medium text-white bottom-[400px]"
    >
      <div class="mr-6">
        <div
          class="py-2 px-[16px] ml-auto backdrop-blur-2xl w-fit bg-[#FFFFFF14] rounded-[20px] border border-[#FFFFFF14]"
        >
          Rewarding
        </div>

        <div
          class="py-2 px-[16px] backdrop-blur-2xl mt-[4px] ml-auto w-fit bg-[#FFFFFF14] rounded-[20px] border border-[#FFFFFF14]"
        >
          Explore Quizzes
        </div>
        <div
          class="py-2 ml-auto backdrop-blur-2xl w-fit mt-[4px] px-[16px] bg-[#FFFFFF14] rounded-[20px] border border-[#FFFFFF14]"
        >
          Master key subjects
        </div>
        <div class="flex">
          <button
            class="bg-[#007CEF] ml-auto mt-[4px] border rounded-full border-[#FFFFFF] w-[56px] h-[56px]"
          >
            <img src="@/assets/Vector-(8).png" class="w-[27px] mx-auto" />
          </button>
        </div>
      </div>
    </div>
    <div class="w-[266px] relative z-10 mx-auto">
      <img :src="currentSlide.image" class="mx-auto" />
    </div>
    <div
      class="absolute p-5 bottom-0 left-0 w-full h-auto bg-white z-10 rounded-t-[12px]"
    >
      <div class="w-full">
        <div
          class="mx-auto w-[91px] flex h-[4px] justify-between mt-[24px] rounded-[12px]"
        >
          <div class="w-[25px] h-[4px] bg-[#007CEF]"></div>
          <div
            class="w-[25px] h-[4px]"
            :class="number >= 2 ? 'bg-[#007CEF]' : 'bg-[#007CEF]/20'"
          ></div>
          <div
            class="w-[25px] h-[4px]"
            :class="number >= 3 ? 'bg-[#007CEF]' : 'bg-[#007CEF]/20'"
          ></div>
        </div>
        <p class="text-center text-[32px] mt-6">
          {{ currentSlide.title }}
        </p>
        <p class="text-[#A3A3A3] max-w-[327px] text-center mx-auto mt-4">
          {{ currentSlide.description }}
        </p>
        <button
          @click="changeNumber"
          class="bg-[#007CEF] mt-6 w-full rounded-[8px] h-[54px] text-white"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
