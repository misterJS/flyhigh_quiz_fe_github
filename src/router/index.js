import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "@/components/LoginPage.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import DashboardPage from "@/components/DashboardPage.vue";
import RewardPage from "@/components/RewardPage.vue";
import ReportPage from "@/components/ReportPage.vue";
import ClassesPage from "@/components/ClassesPage.vue";
import SettingPage from "@/components/SettingPage.vue";
import HelpPage from "@/components/HelpPage.vue";
import QuizPage from "@/components/QuizPage.vue";
import QuizDetailPage from "@/components/detail/QuizDetailPage.vue";
import RewardHistoryPage from "@/components/history/RewardHistoryPage.vue";
import QuizConfirmationPage from "@/components/detail/QuizConfirmationPage.vue";
import QuizSessionPage from "@/components/detail/QuizSessionPage.vue";
import QuizFinishPage from "@/components/detail/QuizFinishPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
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
    meta: { title: "Classes" },
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingPage,
    meta: { title: "Settings" },
  },
  {
    path: "/help",
    name: "Help",
    component: HelpPage,
    meta: { title: "Help" },
  },
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Set document title from meta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "FlyHigh App";
  next();
});

export default router;
