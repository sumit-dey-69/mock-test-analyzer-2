import { create } from "zustand";
import { persist } from "zustand/middleware";
import patternPerSection from "../utils/pattern";
import createSessionStorage from "../utils/session-storage";
import type { Subjects } from "./use-question";

interface QuestionNumberState {
  currentQuestionNumber: number;
  currentSection: Subjects;
  changeSection: (section: Subjects) => void;
  setQuestionNumber: (questionNumber: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
}

const keys = Object.keys(patternPerSection) as Subjects[];

const useQuestionNumber = create<QuestionNumberState>()(
  persist(
    (set, get) => ({
      currentQuestionNumber: 1,
      currentSection: "mathematics",
      changeSection: (section: Subjects) => {
        set({ currentSection: section, currentQuestionNumber: 1 });
      },
      setQuestionNumber: (questionNumber: number) =>
        set({ currentQuestionNumber: questionNumber }),
      nextQuestion: () =>
        set((state) => {
          const { currentQuestionNumber, currentSection } = get();
          if (
            currentQuestionNumber ===
            patternPerSection[currentSection].totalQuestions
          ) {
            return {
              ...state,
              currentQuestionNumber: 1,
              currentSection:
                keys[(keys.indexOf(currentSection) + 1) % keys.length],
            };
          }
          return {
            ...state,
            currentQuestionNumber: currentQuestionNumber + 1,
          };
        }),
      previousQuestion: () =>
        set((state) => {
          const { currentQuestionNumber, currentSection } = get();

          if (currentQuestionNumber === 1) {
            const ind = keys.indexOf(currentSection);
            return {
              ...state,
              currentQuestionNumber:
                patternPerSection[currentSection].totalQuestions,
              currentSection: keys[ind - 1 < 0 ? keys.length - 1 : ind - 1],
            };
          }

          return {
            ...state,
            currentQuestionNumber: currentQuestionNumber - 1,
          };
        }),
    }),
    {
      name: "questionNumber",
      storage: createSessionStorage,
    },
  ),
);

export default useQuestionNumber;
