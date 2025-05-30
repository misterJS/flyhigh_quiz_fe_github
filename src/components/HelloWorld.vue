<template>
  <div class="bg-[#0A1129] text-white">
    <Header />
    <router-view />
    <!-- Hero -->
    <section class="text-center py-16 px-4">
      <h1 class="text-3xl md:text-4xl font-bold mb-4">
        With FlyHigh, Your Child<br />Soar High Towards Dreams!
      </h1>
      <img src="/hero-banner.png" alt="Hero Banner" class="mx-auto mt-6" />
    </section>

    <!-- Why FlyHigh -->
    <section class="py-16 px-4">
      <h2 class="text-2xl font-semibold text-center mb-10">Why FlyHigh?</h2>
      <div class="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div class="bg-[#111827] p-6 rounded-xl">Comprehensive Curriculum</div>
        <div class="bg-[#111827] p-6 rounded-xl">Qualified Teachers</div>
        <div class="bg-[#111827] p-6 rounded-xl">Interactive Learning</div>
        <div class="bg-[#111827] p-6 rounded-xl">Progress Tracking</div>
        <div class="bg-[#111827] p-6 rounded-xl">Parent Support System</div>
        <div class="bg-blue-600 p-6 rounded-xl">
          Join Now to Empower Your Child!
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-16 px-4">
      <h2 class="text-2xl font-semibold text-center mb-10">Categories</h2>
      <div class="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <img src="/cat1.jpg" class="rounded-xl" />
        <img src="/cat2.jpg" class="rounded-xl" />
        <img src="/cat3.jpg" class="rounded-xl" />
      </div>
      <div class="mt-10 grid md:grid-cols-5 gap-4 text-center text-sm">
        <div>Speaking School</div>
        <div>Reading Class</div>
        <div>Grammar</div>
        <div>IELTS</div>
        <div>More</div>
      </div>
    </section>

    <!-- Events -->
    <section class="py-16 px-4">
      <h2 class="text-2xl font-semibold text-center mb-10">Events</h2>
      <div class="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <img src="/event1.jpg" class="rounded-xl" />
        <img src="/event2.jpg" class="rounded-xl" />
        <img src="/event3.jpg" class="rounded-xl" />
      </div>
    </section>

    <!-- Feedback -->
    <section class="py-16 px-4 bg-[#111827]">
      <h2 class="text-2xl font-semibold text-center mb-10">Feedback</h2>
      <div class="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-sm">
        <div class="bg-[#1F2937] p-4 rounded-lg">
          "FlyHigh helped my child grow in confidence!"
        </div>
        <div class="bg-[#1F2937] p-4 rounded-lg">
          "Teachers are really professional and caring."
        </div>
        <div class="bg-[#1F2937] p-4 rounded-lg">
          "We love the events and programs they offer!"
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 px-4 text-center">
      <h2 class="text-xl font-semibold mb-4">
        Become A Part Of A Great Story Together With FlyHigh
      </h2>
      <ButtonBase
        class="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold"
        >Get Started</ButtonBase
      >
    </section>
  </div>
</template>

<script setup>
import ButtonBase from "@/components/base/BaseButton.vue";
import Header from '@/components/HeaderWeb.vue'
</script>

<style scoped>
img {
  object-fit: cover;
  width: 100%;
  height: auto;
}
</style>
