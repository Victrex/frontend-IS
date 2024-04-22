import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuth: false, 
      isAdmin: false,// por mientras ira en true hasta que se valide con el login
      token: null,
      user: null,
      profilePhoto: null,
      idUser: null,
      setUser: (value) => set({ user: value }),
      setIdUser: (value) => set({ idUser: value }),
      setToken: (value) => set({ token: value }),
      setProfilePhoto: (value) => set({ profilePhoto: value }),
      setIsAuth: (value) => set({ isAuth: value }),
      setIsAdmin: (value) => set({ isAdmin: value }),
      logout: () => {
        set({ isAuth: false, isAdmin: false, profilePhoto: null,  token: null, user: null, idUser: null});
      },
    }),
    {
      name: "auth",
    //   getStorage: () => sessionStorage,
    }
  )
);
