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
import EditProfileMobile from "@/components/setting/MobileSetting/EditProfileMobile.vue";
import ChangePasswordMobile from "@/components/setting/MobileSetting/ChangePasswordMobile.vue";
import HistoryMobile from "@/components/setting/MobileSetting/HistoryMobile.vue";
import HelpSupportMobile from "@/components/setting/MobileSetting/HelpSupportMobile.vue";
import NotificationMobile from "@/components/setting/MobileSetting/NotificationMobile.vue";
import LanguageSettingMobile from "@/components/setting/MobileSetting/LanguageSettingMobile.vue";
import AboutMobile from "@/components/setting/MobileSetting/AboutMobile.vue";
import RankingPage from "@/views/RankingPage.vue";
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
    path: "/ranking",
    
    
    name: "Ranking",
    component:RankingPage,
    meta: { title:"Ranking" },
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
  {
    path: "/edit-profile",
    name: "EditProfile",
    component: EditProfileMobile,
    meta: { title: "Edit Profile", device: "mobile" },
  },
  {
    path: "/change-password",
    name: "ChangePassword",
    component: ChangePasswordMobile,
    meta: { title: "Change Password", device: "mobile" },
  },
  {
    path: "/history-quiz",
    name: "HistoryQuiz",
    component: HistoryMobile,
    meta: { title: "History Quiz", device: "mobile" },
  },
  {
    path: "/help-support",
    name: "HelpSupport",
    component: HelpSupportMobile,
    meta: { title: "Help Support", device: "mobile" },
  },
  {
    path: "/notification-mobile",
    name: "NotificationMobile",
    component: NotificationMobile,
    meta: { title: "Notification Mobile", device: "mobile" },
  },
  {
    path: "/language-setting-m",
    name: "LanguageSetting",
    component: LanguageSettingMobile,
    meta: { title: "Language Setting", device: "mobile" },
  },
  {
    path: "/about-mobile",
    name: "AboutMobile",
    component: AboutMobile,
    meta: { title: "About", device: "mobile" },
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
