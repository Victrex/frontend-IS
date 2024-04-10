import { id } from "date-fns/locale";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCsvStore = create(
  persist(
    (set) => ({
      isUpt: false, //es si se esta subiendo productos atraves del csv
      idUpt: null, //id del csv que esta subiendo productos
      setIsUpt: (value) => set({ isUpt: value }),
      setIdUpt: (value) => set({ idUpt: value }),
    }),
    {
      name: "csv",
      
      //   getStorage: () => sessionStorage,
    }
  )
);
