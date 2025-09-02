<template>
  <div class="min-h-screen bg-[#f9fafb] p-4 pb-24">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <button class="text-gray-700 text-lg" @click="goBack">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="font-semibold text-lg">Notification</h1>
      </div>
      <!-- BUKA MODAL untuk hapus semua -->
      <button class="text-red-600 text-lg" @click="openConfirm('all')">
        <i class="fas fa-trash"></i>
      </button>
    </div>

    <!-- TODAY -->
    <div class="bg-white rounded-3xl p-4 shadow-sm mb-5 relative">
      <div class="flex items-center justify-between mb-2">
        <h2 class="font-semibold text-lg">Today</h2>
        <button class="text-gray-700 text-lg" @click="toggleMenu('today')">
          <i class="fas fa-ellipsis-h"></i>
        </button>
      </div>

      <div class="divide-y">
        <div
          v-for="n in today"
          :key="n.id"
          class="flex items-start gap-3 py-3"
          @click="markRead('today', n.id)"
        >
          <div :class="['w-11 h-11 rounded-full grid place-items-center', n.icon.bg]">
            <i :class="['fas', n.icon.name, n.icon.color]"></i>
          </div>

          <div class="flex-1">
            <p class="text-[15px] text-gray-900 line-clamp-2">
              {{ n.title }}
            </p>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-400 whitespace-nowrap">{{ n.time }}</span>
            <span v-if="n.unread" class="w-2 h-2 rounded-full bg-red-500"></span>
          </div>
        </div>
      </div>

      <!-- Menu Today -->
      <div
        v-if="menuOpen==='today'"
        class="absolute top-10 right-2 z-50 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden menu-card"
      >
        <button @click="markAllRead('today')" class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left">
          <i class="fas fa-check text-green-500"></i>
          <span class="text-sm">Mark all reads</span>
        </button>
        <!-- BUKA MODAL untuk hapus 'today' -->
        <button @click="openConfirm('today')" class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left">
          <i class="fas fa-trash text-red-500"></i>
          <span class="text-sm">Remove all</span>
        </button>
      </div>
    </div>

    <!-- YESTERDAY -->
    <div class="bg-white rounded-3xl p-4 shadow-sm relative">
      <div class="flex items-center justify-between mb-2">
        <h2 class="font-semibold text-lg">Yesterday</h2>
        <button class="text-gray-700 text-lg" @click="toggleMenu('yesterday')">
          <i class="fas fa-ellipsis-h"></i>
        </button>
      </div>

      <div class="divide-y">
        <div
          v-for="n in yesterday"
          :key="n.id"
          class="flex items-start gap-3 py-3"
          @click="markRead('yesterday', n.id)"
        >
          <div :class="['w-11 h-11 rounded-full grid place-items-center', n.icon.bg]">
            <i :class="['fas', n.icon.name, n.icon.color]"></i>
          </div>

          <div class="flex-1">
            <p class="text-[15px] text-gray-900 line-clamp-2">
              {{ n.title }}
            </p>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-400 whitespace-nowrap">{{ n.time }}</span>
            <span v-if="n.unread" class="w-2 h-2 rounded-full bg-red-500"></span>
          </div>
        </div>
      </div>

      <!-- Menu Yesterday -->
      <div
        v-if="menuOpen==='yesterday'"
        class="absolute top-10 right-2 z-50 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden menu-card"
      >
        <button @click="markAllRead('yesterday')" class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left">
          <i class="fas fa-check text-green-500"></i>
          <span class="text-sm">Mark all reads</span>
        </button>
        <!-- BUKA MODAL untuk hapus 'yesterday' -->
        <button @click="openConfirm('yesterday')" class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left">
          <i class="fas fa-trash text-red-500"></i>
          <span class="text-sm">Remove all</span>
        </button>
      </div>
    </div>

    <!-- ================= Modal Konfirmasi ================ -->
    <transition name="fade">
      <div
        v-if="confirm.open"
        class="fixed inset-0 z-50 bg-black/40 flex items-end md:items-center justify-center p-4"
        @click.self="closeConfirm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <div class="w-full max-w-md bg-white rounded-[24px] p-6 shadow-xl">
          <!-- Icon besar -->
          <div class="w-28 h-28 mx-auto rounded-full bg-red-50 grid place-items-center ring-1 ring-red-100">
            <div class="w-20 h-20 rounded-full bg-red-500 grid place-items-center text-white text-3xl">
              <i class="fas fa-trash"></i>
            </div>
          </div>

          <!-- Teks -->
          <h3 id="confirm-title" class="text-center text-[20px] font-semibold text-gray-900 mt-6">
            Are you sure you want<br class="hidden md:block" />
            to remove all notifications?
          </h3>

          <!-- Actions -->
          <div class="mt-8 flex items-center justify-between">
            <button
              class="px-4 py-3 text-gray-600 font-medium"
              @click="closeConfirm"
            >
              Cancel
            </button>

            <button
              class="px-7 py-3 rounded-full bg-red-500 text-white font-semibold"
              @click="confirmDelete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => router.back();

/* Dummy data (sama seperti sebelumnya) */
const today = ref([
  { id: 1, title: "Quiz: Who is the author of the latest article on Flyhigh…", time: "10:15 AM", unread: true,  icon: { bg: "bg-pink-100",   color: "text-pink-500",   name: "fa-podcast" } },
  { id: 2, title: "Quiz: What is the next Materi from mathematic subject…",    time: "10:15 AM", unread: true,  icon: { bg: "bg-yellow-100", color: "text-yellow-500", name: "fa-bell" } },
  { id: 3, title: "Quiz: What is the latest system update about?",             time: "10:15 AM", unread: false, icon: { bg: "bg-green-100",  color: "text-green-500",  name: "fa-seedling" } },
]);
const yesterday = ref([
  { id: 4, title: "Quiz: Who is the author of the latest article on Flyhigh…", time: "10:15 AM", unread: false, icon: { bg: "bg-pink-100",   color: "text-pink-500",   name: "fa-podcast" } },
  { id: 5, title: "Quiz: What is the next Materi from mathematic subject…",    time: "10:15 AM", unread: true,  icon: { bg: "bg-yellow-100", color: "text-yellow-500", name: "fa-bell" } },
  { id: 6, title: "Quiz: What is the latest system update about?",             time: "10:15 AM", unread: false, icon: { bg: "bg-green-100",  color: "text-green-500",  name: "fa-seedling" } },
]);

/* Menu handling */
const menuOpen = ref(null);
function toggleMenu(which) { menuOpen.value = menuOpen.value === which ? null : which; }
function clickAway(e) {
  if (!e.target.closest(".menu-card") && !e.target.closest(".fa-ellipsis-h")) {
    menuOpen.value = null;
  }
}
onMounted(() => document.addEventListener("click", clickAway));
onBeforeUnmount(() => document.removeEventListener("click", clickAway));

/* ===== Modal Confirm State ===== */
const confirm = ref({ open: false, scope: null }); // scope: 'all' | 'today' | 'yesterday'
function openConfirm(scope) {
  confirm.value.open = true;
  confirm.value.scope = scope;
  menuOpen.value = null;
}
function closeConfirm() { confirm.value.open = false; }

/* Actions */
function markAllRead(which) {
  const list = which === "today" ? today : yesterday;
  list.value = list.value.map(n => ({ ...n, unread: false }));
  menuOpen.value = null;
}
function removeAll(which) {
  if (which === "all") { today.value = []; yesterday.value = []; return; }
  const list = which === "today" ? today : yesterday;
  list.value = [];
}
function confirmDelete() {
  removeAll(confirm.value.scope);
  closeConfirm();
}
function markRead(which, id) {
  const list = which === "today" ? today : yesterday;
  const i = list.value.findIndex(n => n.id === id);
  if (i > -1) list.value[i].unread = false;
}
</script>

<style scoped>
.line-clamp-2{
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  overflow:hidden;
}
.fade-enter-active,.fade-leave-active{ transition: opacity .2s ease }
.fade-enter-from,.fade-leave-to{ opacity:0 }
</style>
