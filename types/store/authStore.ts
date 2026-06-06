// types/store/authStore.ts
import { create } from "zustand";
import { getItem, removeItem } from "@/types/utils/secureStorage";

type AuthState = {
  token: string | null;
  setToken: (t: string | null) => void;
  loadToken: () => Promise<void>;
  clear: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  loadToken: async () => {
    const token = await getItem("token");
    set({ token });
  },
  clear: async () => {
    await removeItem("token");
    set({ token: null });
  },
}));