import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
interface State {
  darkMode: boolean;
  collapsed: boolean;
  token: string;
  refreshToken: string;
}
interface Actions {
  setDarkMode: (darkMode: boolean) => void;
  setCollapsed: (collapsed: boolean) => void;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}
export const useGlobalStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        darkMode: false,
        setDarkMode: (darkMode: boolean) => set({ darkMode }),
        collapsed: false,
        setCollapsed: (collapsed: boolean) => set({ collapsed }),
        token: "",
        setToken: (token: string) => set({ token }),
        refreshToken: "",
        setRefreshToken: (refreshToken: string) => set({ refreshToken }),
      }),
      {
        name: "globalStore",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
