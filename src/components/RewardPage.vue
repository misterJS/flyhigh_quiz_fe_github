<script setup>
import SidebarComponent from "@/components/base/SidebarComponent.vue";
import HeaderComponent from "@/components/base/HeaderComponent.vue";

const leaderboard = [
  {
    username: "Victor André",
    id: "7281",
    points: 1207,
    tier: 83,
    streak: 59,
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    username: "Victor André",
    id: "7281",
    points: 1207,
    tier: 83,
    streak: 59,
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    username: "Victor André",
    id: "7281",
    points: 1207,
    tier: 83,
    streak: 59,
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    username: "Victor André",
    id: "7281",
    points: 1207,
    tier: 83,
    streak: 59,
    avatar: "https://i.pravatar.cc/40?img=4",
  },
  {
    username: "Sofia Martinez",
    id: "7282",
    points: 1150,
    tier: 90,
    streak: 65,
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    username: "Liam Chen",
    id: "7283",
    points: 1300,
    tier: 75,
    streak: 70,
    avatar: "https://i.pravatar.cc/40?img=6",
  },
];
</script>

<template>
  <div class="flex h-screen">
    <SidebarComponent />

    <div class="flex-1 flex flex-col bg-[#f9fafb]">
      <HeaderComponent />

      <main class="p-6 overflow-y-auto flex-1 space-y-6">
        <!-- Top Section (XP & Promo) -->
        <div class="grid xl:grid-cols-[1fr_2fr] gap-4">
          <!-- XP Card -->
          <div class="bg-white rounded-xl shadow-sm p-5 relative">
            <h3 class="text-sm text-gray-500 mb-1">Total Poin</h3>
            <span
              class="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full mb-2 inline-block"
              >Sultan Points</span
            >
            <div class="text-3xl font-bold text-blue-700">71928 XP</div>
            <div class="mt-3 bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                class="bg-blue-600 h-full transition-all duration-300"
                style="width: 32%"
              ></div>
            </div>
            <p class="text-sm text-gray-400 mt-2">
              Rewards You Can Get With Your Points
            </p>
            <img
              src="../assets/fire.png"
              class="absolute bottom-20 right-4 w-10"
              alt="fire"
            />
          </div>

          <div
            class="bg-blue-600 rounded-xl text-white p-5 flex flex-col justify-between"
          >
            <div>
              <h3 class="text-lg font-semibold mb-2">
                Earn more rewards by completing challenges with your friends.
              </h3>
              <p class="text-sm text-white/80">
                Say hello to an interactive learning process filled with
                competition alongside your best friends.
              </p>
            </div>
            <button
              class="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium self-start"
            >
              Get More Treasure
            </button>
          </div>
        </div>

        <!-- Mid Section (Leaderboard & Reward + History) -->
        <div class="grid xl:grid-cols-[2fr_1fr] gap-4">
          <div>
            <h3 class="text-base font-semibold text-gray-900 mb-4">
              Global Leaderboard
            </h3>
            <div class="bg-white rounded-xl p-5 shadow-sm overflow-x-auto">
              <table class="min-w-full text-sm">
                <thead class="text-gray-500 text-left">
                  <tr>
                    <th class="py-2 pr-4">Rank</th>
                    <th class="py-2 pr-4">Username</th>
                    <th class="py-2 pr-4">Points</th>
                    <th class="py-2 pr-4">Tier</th>
                    <th class="py-2">Streak</th>
                  </tr>
                </thead>
                <tbody class="text-gray-700">
                  <tr
                    v-for="(user, i) in leaderboard"
                    :key="i"
                    class="border-t"
                    :class="[
                      i === 0
                        ? 'bg-yellow-50'
                        : i === 1
                        ? 'bg-purple-50'
                        : i === 2
                        ? 'bg-red-50'
                        : '',
                    ]"
                  >
                    <td class="py-2 pr-4 font-bold">#{{ i + 1 }}</td>
                    <td class="py-6 pr-4 font-medium flex items-center gap-2">
                      <img :src="user.avatar" class="w-6 h-6 rounded-full" />
                      {{ user.username }}
                      <span class="text-xs text-gray-500">#{{ user.id }}</span>
                    </td>
                    <td class="py-2 pr-4">{{ user.points }}</td>
                    <td class="py-2 pr-4">{{ user.tier }}</td>
                    <td class="py-2">{{ user.streak }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Right Side: Reward Progress and History -->
          <div class="space-y-4">
            <!-- Rewards to get -->
            <div class="bg-white rounded-xl p-5 shadow-sm">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-base font-semibold text-gray-900">
                  Rewards to get
                </h3>
                <a href="#" class="text-sm text-blue-600">See all</a>
              </div>
              <div class="space-y-4">
                <div
                  class="flex items-center justify-between p-4 border rounded-xl"
                >
                  <div class="flex items-center gap-3">
                    <img src="../assets/reward3.png" class="w-10 h-10" />
                    <div>
                      <p class="text-sm font-medium">School Bag</p>
                      <p class="text-xs text-blue-500">
                        need to finish 30 Quizzes
                      </p>
                    </div>
                  </div>
                  <div
                    class="w-10 h-10 rounded-full border-4 border-red-400 flex items-center justify-center text-xs font-bold text-red-600"
                  >
                    4%
                  </div>
                </div>
                <div
                  class="flex items-center justify-between p-4 border rounded-xl"
                >
                  <div class="flex items-center gap-3">
                    <img src="../assets/reward3.png" class="w-10 h-10" />
                    <div>
                      <p class="text-sm font-medium">School Bag</p>
                      <p class="text-xs text-blue-500">
                        need to finish 2 Quizzes
                      </p>
                    </div>
                  </div>
                  <div
                    class="w-10 h-10 rounded-full border-4 border-yellow-400 flex items-center justify-center text-xs font-bold text-yellow-600"
                  >
                    85%
                  </div>
                </div>
                <div
                  class="flex items-center justify-between p-4 border rounded-xl"
                >
                  <div class="flex items-center gap-3">
                    <img src="../assets/reward3.png" class="w-10 h-10" />
                    <div>
                      <p class="text-sm font-medium">School Bag</p>
                      <p class="text-xs text-blue-500">
                        need to finish 2 Quizzes
                      </p>
                    </div>
                  </div>
                  <button
                    class="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full"
                  >
                    Redeem
                  </button>
                </div>
              </div>
            </div>

            <!-- History -->
            <div class="bg-white rounded-xl p-5 shadow-sm">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-base font-semibold text-gray-900">History</h3>
                <a href="#" class="text-sm text-blue-600">See all</a>
              </div>
              <div class="space-y-3">
                <div
                  class="flex items-center justify-between p-4 border rounded-xl"
                >
                  <div class="flex items-center gap-3">
                    <img src="../assets/reward3.png" class="w-8 h-8" />
                    <div>
                      <p class="text-sm text-gray-700">School Bag</p>
                      <p class="text-xs text-gray-400">01-20-2025</p>
                    </div>
                  </div>
                  <button
                    class="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full"
                  >
                    Redeemed
                  </button>
                </div>
                <div
                  class="flex items-center justify-between p-4 border rounded-xl"
                >
                  <div class="flex items-center gap-3">
                    <img src="../assets/reward3.png" class="w-8 h-8" />
                    <div>
                      <p class="text-sm text-gray-700">School Bag</p>
                      <p class="text-xs text-gray-400">01-20-2025</p>
                    </div>
                  </div>
                  <button
                    class="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full"
                  >
                    Redeemed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped></style>
