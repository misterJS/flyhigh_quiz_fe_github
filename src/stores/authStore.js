import { defineStore } from "pinia";
import { loginTokenWeb } from "@/api/authApi";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("auth_token") || null,
    user: null,
  }),

  actions: {
    async login(email, password) {
      const data = await loginTokenWeb(email, password);

      if (data.status === 400) {
        throw new Error(data.message);
      }

      if (typeof data === "string") {
        const parsed = JSON.parse(data);
        if (parsed.status === 400) {
          throw new Error(parsed.message);
        }
      }

      this.token = data.token;
      this.user = data;
      localStorage.setItem("auth_token", data.token);
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("auth_token");
    },
  },
});
