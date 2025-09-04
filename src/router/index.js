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
import NotificationSettingMobile from "@/components/setting/MobileSetting/NotificationSettingMobile.vue";
import LanguageSettingMobile from "@/components/setting/MobileSetting/LanguageSettingMobile.vue";
import AboutMobile from "@/components/setting/MobileSetting/AboutMobile.vue";
import RankingPage from "@/views/RankingPage.vue";
import SplashScreen from "@/components/onboarding/SplashScreen.vue";
import OnboardingMobile7 from "@/components/onboarding/OnboardingMobile7.vue";
import NotificationMobile from "@/components/notification/NotificationMobile.vue";
import ForgetPasswordPage from "@/views/ForgetPasswordPage.vue";
import QuizGenerate from "@/components/dashboard/QuizGenerates/QuizGenerate.vue";
import SubscribePage from "@/views/SubscribePage.vue";
import ForgotVerifyMobile from "@/components/forgot-password/ForgotVerifyMobile.vue";
import ForgotResetMobile from "@/components/forgot-password/ForgotResetMobile.vue";
import PaymentMethodMobile from "@/components/setting/MobileSetting/PaymentMethodMobile.vue";
import PaymentMethodAddMobile from "@/components/setting/MobileSetting/PaymentMethodAddMobile.vue";
import SelectLocationMobile from "@/components/setting/MobileSetting/SelectLocationMobile.vue";
import SubjectPage from "@/views/SubjectPage.vue";

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
    path: "/forgot-password",
    name: "ForgetPassword",
    component: ForgetPasswordPage,
    meta: { title: "Forget Password" },
  },
  {
    path: "/forgot/verify",
    name: "ForgetPasswordVerify",
    component: ForgotVerifyMobile,
    meta: { title: "Forget Password Verify" },
  },
  {
    path: "/forgot/reset",
    name: "Forget password Reset",
    component: ForgotResetMobile,
    meta: { title: "Forget Password Reset" },
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
    path: "/quiz/generate",
    name: "QuizGenerate",
    component: QuizGenerate,
    meta: { title: "Quiz Generate", device: "mobile" },
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
    component: RankingPage,
    meta: { title: "Ranking" },
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
    path: "/subscribe",
    name: "Subscribe",
    component: SubscribePage,
    meta: { title: "Subscribe"},
  },
  {
    path: "/payment-method",
    name: "PaymentMethod",
    component: PaymentMethodMobile,
    meta: { title: "Payment Method"},
  },
  {
    path: "/payment/add",
    name: "PaymentMethodAdd",
    component: PaymentMethodAddMobile,
    meta: { title: "Payment Method Add"},
  },
  {
    path: "/edit-profile",
    name: "EditProfile",
    component: EditProfileMobile,
    meta: { title: "Edit Profile", device: "mobile" },
  },
  {
    path: "/select-location",
    name: "SelectLocation",
    component: SelectLocationMobile,
    meta: { title: "Select Location", device: "mobile" },
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
    name: "NotificationSettingMobile",
    component: NotificationSettingMobile,
    meta: { title: "Notification Setting Mobile", device: "mobile" },
  },
  {
    path: "/notification",
    name: "NotificationMobile",
    component: NotificationMobile,
    meta: { title: "Notification Mobile", device: "mobile" },
  },
   {
    path: "/subject-all",
    name: "SubjectMobile",
    component: SubjectPage,
    meta: { title: "Subject Mobile", device: "mobile" },
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
  {
    path: "/splash-screen-mobile",
    name: "SplashScreenMobile",
    component: SplashScreen,
    meta: { title: "Splash", device: "mobile" },
  },
  {
    path: "/onboarding-mobile-7",
    name: "OnboardingMobile7",
    component: OnboardingMobile7,
    meta: { title: "Onboarding", device: "mobile" },
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
    path: "/quiz-confirmation/:id",
    name: "QuizConfirmationPage",
    component: QuizConfirmationPage,
    meta: { title: "Quiz Confirmation" },
  },
  {
    path: "/quiz-session/:id",
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
