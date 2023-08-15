import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
interface State {
  darkMode: boolean;
  collapsed: boolean;
}
interface Actions {
  setDarkMode: (darkMode: boolean) => void;
  setCollapsed: (collapsed: boolean) => void;
}
export const useGlobalStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        darkMode: false,
        setDarkMode: (darkMode: boolean) => set({ darkMode }),
        collapsed: false,
        setCollapsed: (collapsed: boolean) => set({ collapsed }),
      }),
      {
        name: "globalStore",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
