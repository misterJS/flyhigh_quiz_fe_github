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

const routes = [
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
    path: "/quiz",
    name: "Quizzes",
    component: QuizPage,
    meta: { title: "Quizzes" },
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Optional: Set document title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "My App";
  next();
});

export default router;
