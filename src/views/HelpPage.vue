<template>
  <div class="flex h-screen bg-[#f9fafb]">
    <SidebarComponent />
    <div class="flex-1 flex flex-col">
      <HeaderComponent />
      <main class="flex-1 p-10">
        <div class="mx-auto">
          <div class="bg-white rounded-2xl p-8 shadow-sm mb-10">
            <h2 class="text-xl font-semibold text-[#111827] text-center mb-1">
              Need Assistance
            </h2>
            <p class="text-sm text-gray-500 text-center mb-6">
              If you experience problems or problems, we can help solve the
              problem
            </p>
            <div class="relative max-w-md mx-auto mb-6">
              <input
                type="text"
                placeholder="Ask a question...."
                class="w-full py-2.5 px-4 pr-24 rounded-full text-sm border border-gray-300 focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
              />
              <button
                class="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#2563EB] text-white text-sm rounded-full"
              >
                Search
              </button>
            </div>

            <div class="divide-y divide-gray-200">
              <div class="py-4">
                <details open>
                  <summary
                    class="font-medium text-[#111827] cursor-pointer flex justify-between items-center"
                  >
                    <span>How do I start my first quiz?</span>
                    <span class="text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div class="text-sm text-gray-700 mt-2">
                    <p class="mb-2">
                      To start your first quiz, follow these steps:
                    </p>
                    <ol class="list-decimal ml-6 space-y-1">
                      <li>
                        Go to the Dashboard: Log in and navigate to your
                        dashboard.
                      </li>
                      <li>
                        Check the "Ongoing Quiz" section: You'll see a list of
                        quizzes assigned to you.
                      </li>
                      <li>
                        Click "Start" or "Continue" next to the quiz you want to
                        begin.
                      </li>
                      <li>
                        Read the Instructions: Make sure you understand the quiz
                        rules before starting.
                      </li>
                      <li>
                        Begin the Quiz: Click the "Start Quiz" button to get
                        going.
                      </li>
                    </ol>
                  </div>
                </details>
              </div>
              <div class="py-4">
                <details>
                  <summary
                    class="font-medium text-[#111827] cursor-pointer flex justify-between items-center"
                  >
                    <span>Can I change my registered email address?</span>
                    <span class="text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div class="text-sm text-gray-700 mt-2">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Maecenas scelerisque eros a condimentum viverra. Proin sit
                      amet leo sit amet.
                    </p>
                  </div>
                </details>
              </div>
              <div class="py-4">
                <details>
                  <summary
                    class="font-medium text-[#111827] cursor-pointer flex justify-between items-center"
                  >
                    <span>What should I do if my quiz freezes or crashes?</span>
                    <span class="text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div class="text-sm text-gray-700 mt-2">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Maecenas scelerisque eros a condimentum viverra. Proin sit
                      amet leo sit amet.
                    </p>
                  </div>
                </details>
              </div>
              <div class="py-4">
                <details>
                  <summary
                    class="font-medium text-[#111827] cursor-pointer flex justify-between items-center"
                  >
                    <span>How do I know when I've earned a reward?</span>
                    <span class="text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div class="text-sm text-gray-700 mt-2">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Maecenas scelerisque eros a condimentum viverra. Proin sit
                      amet leo sit amet.
                    </p>
                  </div>
                </details>
              </div>
              <div class="py-4">
                <details>
                  <summary
                    class="font-medium text-[#111827] cursor-pointer flex justify-between items-center"
                  >
                    <span>How do I delete or deactivate my account?</span>
                    <span class="text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div class="text-sm text-gray-700 mt-2">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Maecenas scelerisque eros a condimentum viverra. Proin sit
                      amet leo sit amet.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div class="bg-white rounded-xl shadow-sm p-6 text-left">
              <div
                class="w-12 h-12 bg-[#e0f2fe] rounded-lg flex items-center justify-center mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-[#0277bd]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m7 7 5 5 5-5"
                  />
                </svg>
              </div>
              <h3 class="font-semibold text-[#111827] mb-3 text-lg">
                Getting Started
              </h3>
              <p class="text-sm text-gray-500 mb-6 leading-relaxed">
                Learn how to prepare your account and begin your first quiz or
                claim your great reward.
              </p>
              <button
                class="text-sm text-[#2563EB] font-medium hover:underline"
              >
                Learn More
              </button>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 text-left">
              <div
                class="w-12 h-12 bg-[#fff3e0] rounded-lg flex items-center justify-center mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-[#f57c00]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 class="font-semibold text-[#111827] mb-3 text-lg">
                Security & Protection
              </h3>
              <p class="text-sm text-gray-500 mb-6 leading-relaxed">
                Secure your account, and we guarantee that all your personal
                data is safe from any threats.
              </p>
              <button
                class="text-sm text-[#2563EB] font-medium hover:underline"
              >
                Learn More
              </button>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6 text-left">
              <div
                class="w-12 h-12 bg-[#f3e5f5] rounded-lg flex items-center justify-center mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-[#7b1fa2]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 class="font-semibold text-[#111827] mb-3 text-lg">
                Account & Setting
              </h3>
              <p class="text-sm text-gray-500 mb-6 leading-relaxed">
                Manage your account and configure your privacy settings
                according to your preferences.
              </p>
              <button
                class="text-sm text-[#2563EB] font-medium hover:underline"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import SidebarComponent from "../components/base/SidebarComponent.vue";
import HeaderComponent from "../components/base/HeaderComponent.vue";
import { onMounted } from "vue";

onMounted(() => {
  const detailsElements = document.querySelectorAll("details");

  detailsElements.forEach((details) => {
    const summary = details.querySelector("summary");
    const svgContainer = summary.querySelector("span:last-child");

    details.addEventListener("toggle", () => {
      if (details.open) {
        // Minus icon when open
        svgContainer.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        `;
      } else {
        // Plus icon when closed
        svgContainer.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        `;
      }
    });

    // Set initial state
    if (details.open) {
      svgContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
      `;
    }
  });
});
</script>

<style scoped></style>
