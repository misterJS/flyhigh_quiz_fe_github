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
                    How do I start my first quiz?
                  </summary>
                  <div class="text-sm text-gray-700 mt-2">
                    <p class="font-semibold mb-2">
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
              <details class="py-4">
                <summary class="font-medium text-[#111827] cursor-pointer">
                  Can I change my registered email address?
                </summary>
              </details>
              <details class="py-4">
                <summary class="font-medium text-[#111827] cursor-pointer">
                  What should I do if my quiz freezes or crashes?
                </summary>
              </details>
              <details class="py-4">
                <summary class="font-medium text-[#111827] cursor-pointer">
                  How do I know when I've earned a reward?
                </summary>
              </details>
              <details class="py-4">
                <summary class="font-medium text-[#111827] cursor-pointer">
                  How do I delete or deactivate my account?
                </summary>
              </details>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white rounded-xl shadow-sm p-6 text-center">
              <div class="text-3xl mb-3">🚩</div>
              <h3 class="font-semibold text-[#111827] mb-2">Getting Started</h3>
              <p class="text-sm text-gray-500 mb-4">
                Learn how to prepare your account and begin your first quiz or
                claim your great reward.
              </p>
              <button class="text-sm text-[#2563EB] font-medium">
                Learn More
              </button>
            </div>
            <div class="bg-white rounded-xl shadow-sm p-6 text-center">
              <div class="text-3xl mb-3">🛡️</div>
              <h3 class="font-semibold text-[#111827] mb-2">
                Security & Protection
              </h3>
              <p class="text-sm text-gray-500 mb-4">
                Secure your account, and we guarantee that all your personal
                data is safe from any threats.
              </p>
              <button class="text-sm text-[#2563EB] font-medium">
                Learn More
              </button>
            </div>
            <div class="bg-white rounded-xl shadow-sm p-6 text-center">
              <div class="text-3xl mb-3">👤</div>
              <h3 class="font-semibold text-[#111827] mb-2">
                Account & Setting
              </h3>
              <p class="text-sm text-gray-500 mb-4">
                Manage your account and configure your privacy settings
                according to your preferences.
              </p>
              <button class="text-sm text-[#2563EB] font-medium">
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
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import HeaderComponent from "@/components/base/HeaderComponent.vue";
</script>

<style scoped></style>
