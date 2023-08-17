import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  id: number;
  userName: string;
  nickName: string;
  phoneNumber: string;
  email: string;
  createDate: string;
  updateDate: string;
}
interface State {
  currentUser: User | null;
}
interface Actions {
  setCurrentUser: (currentUser: User) => void;
}
export const useUserStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        currentUser: null,
        setCurrentUser: (currentUser: User) => set({ currentUser }),
      }),
      {
        name: "globalUserStore",
      }
    )
  )
);
