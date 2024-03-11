import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuth: true, // por mientras ira en true hasta que se valide con el login
      token: null,
      user: null,
      setUser: (value) => set({ user: value }),
      setToken: (value) => set({ token: value }),

      setIsAuth: (value) => set({ isAuth: value }),
      logout: () => {
        set({ isAuth: false, token: null, user: null });
      },
    }),
    {
      name: "auth",
    //   getStorage: () => sessionStorage,
    }
  )
);
