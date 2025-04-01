import { create } from "zustand";
import { persist } from "zustand/middleware";
import createSessionStorage from "../utils/session-storage";

interface TestCodeState {
  testCode: string;
  setTestCode: (code: string) => void;
  resetTestCode: () => void;
}

const useTestCode = create<TestCodeState>()(
  persist(
    (set) => ({
      testCode: "",
      setTestCode: (code: string) => set({ testCode: code }),
      resetTestCode: () => set({ testCode: "" }),
    }),
    {
      name: "testCode",
      storage: createSessionStorage,
    },
  ),
);

export default useTestCode;
