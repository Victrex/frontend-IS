import { create } from "zustand";

/* AQUI SE MOSTRARAN LOS STORE DE LAS MODALES QUE SE USEN EN 
    REGISTER
    LOGIN
*/

export const useActiveModalTerms = create(
  (set) => ({
    activeModalTerms: false,
    setActiveModalTerms: (active) => set({ activeModalTerms: active }),
  }),
  {
    name: "activeModalTerms",
  }
);
