import { create } from "zustand";
import { persist } from "zustand/middleware";
import createSessionStorage from "../utils/session-storage";

interface ShowResultState {
  showResult: boolean;
  toggleShowResult: () => void;
  setShowResult: (show: boolean) => void;
}

const useShowResult = create<ShowResultState>()(
  persist(
    (set) => ({
      showResult: false,
      toggleShowResult: () =>
        set((state) => ({ showResult: !state.showResult })),
      setShowResult: (show) => set({ showResult: show }),
    }),
    {
      name: "showResult",
      storage: createSessionStorage,
    },
  ),
);

export default useShowResult;
