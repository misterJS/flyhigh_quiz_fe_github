import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import RewardPage from "@/views/RewardPage.vue";
import ReportPage from "@/views/ReportPage.vue";
import ClassesPage from "@/views/ClassesPage.vue";
import SettingPage from "@/views/SettingPage.vue";
import HelpPage from "@/views/HelpPage.vue";
import QuizPage from "@/views/QuizPage.vue";
import QuizDetailPage from "@/views/detail/QuizDetailPage.vue";
import RewardHistoryPage from "@/views/history/RewardHistoryPage.vue";
import QuizConfirmationPage from "@/views/detail/QuizConfirmationPage.vue";
import QuizSessionPage from "@/views/detail/QuizSessionPage.vue";
import QuizFinishPage from "@/views/detail/QuizFinishPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";

const isMobile = window.innerWidth <= 768;

const allRoutes = [
  { path: "/", redirect: "/login" },

  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: { title: "Login" },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
    meta: { title: "Register" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
    meta: { title: "Profile" },
  },
  {
    path: "/home",
    name: "Dashboard",
    component: DashboardPage,
    meta: { title: "Dashboard" },
  },
  {
    path: "/rewards",
    name: "Rewards",
    component: RewardPage,
    meta: { title: "Rewards" },
  },
  {
    path: "/rewards-history",
    name: "RewardsHistory",
    component: RewardHistoryPage,
    meta: { title: "Rewards History" },
  },
  {
    path: "/reports",
    name: "Reports",
    component: ReportPage,
    meta: { title: "Reports" },
  },
  {
    path: "/classes",
    name: "Classes",
    component: ClassesPage,
    meta: { title: "Classes", device: "desktop" },
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingPage,
    meta: { title: "Settings" },
  },
  { path: "/help", name: "Help", component: HelpPage, meta: { title: "Help" } },

  {
    path: "/quiz",
    name: "QuizPage",
    component: QuizPage,
    meta: { title: "Quiz List" },
  },
  {
    path: "/quiz/:id",
    name: "QuizDetail",
    component: QuizDetailPage,
    meta: { title: "Quiz Detail" },
  },
  {
    path: "/quiz-confirmation",
    name: "QuizConfirmationPage",
    component: QuizConfirmationPage,
    meta: { title: "Quiz Confirmation" },
  },
  {
    path: "/quiz-session",
    name: "QuizSessionPage",
    component: QuizSessionPage,
    meta: { title: "Quiz Session" },
  },
  {
    path: "/quiz-finish",
    name: "QuizFinishPage",
    component: QuizFinishPage,
    meta: { title: "Quiz Finish" },
  },
  // {
  //   path: "/mobile-chat",
  //   name: "MobileChat",
  //   component: () => import("@/views/mobile/MobileChatPage.vue"),
  //   meta: { title: "Mobile Chat", device: "mobile" },
  // },
];

const filteredRoutes = allRoutes.filter((route) => {
  if (!route.meta?.device) return true;
  return route.meta.device === (isMobile ? "mobile" : "desktop");
});

const router = createRouter({
  history: createWebHistory(),
  routes: filteredRoutes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "FlyHigh App";
  next();
});

export default router;
