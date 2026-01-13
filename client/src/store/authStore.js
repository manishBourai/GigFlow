// client/src/store/authStore.js
import { create } from "zustand";
import api from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // ================= LOGIN =================
  login: async (data) => {
    try {
      set({ loading: true, error: null });

      const res = await api.post("/auth/login", data);

      set({
        user: res.data.user,
        loading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
      });
      throw err;
    }
  },

  // ================= LOGOUT =================
  logout: async () => {
    await api.post("/auth/logout");
    set({ user: null });
  },

  // ================= LOAD USER (ON REFRESH) =================
  fetchUser: async () => {
    try {
      const res = await api.get("/auth/me");
      set({ user: res.data.user });
    } catch {
      set({ user: null });
    }
  },
}));
