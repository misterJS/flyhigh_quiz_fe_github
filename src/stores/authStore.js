import { defineStore } from "pinia";
import { loginTokenWeb } from "@/api/authApi";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("auth_token") || null,
    user: JSON.parse(localStorage.getItem("auth_user")) || null,
  }),

  actions: {
    async login(email, password) {
      const data = await loginTokenWeb(email, password);

      if (data.status === 400) throw new Error(data.message);

      if (typeof data === "string") {
        const parsed = JSON.parse(data);
        if (parsed.status === 400) throw new Error(parsed.message);
        this.token = parsed.data.token;
        this.user = parsed.data;
        localStorage.setItem("auth_token", parsed.data.token);
        localStorage.setItem("auth_user", JSON.stringify(parsed.data));
      } else {
        this.token = data.token;
        this.user = data;
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("auth_user", JSON.stringify(data));
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    },
  },

  getters: {
    isLoggedIn: (state) => !!state.token,
    userId: (state) => state.user?.data?.userId || null,
    userType: (state) => state.user?.userType || null,
  },
});
