import { create } from "zustand";
import { persist } from "zustand/middleware";
import patternPerSection from "../utils/pattern";
import createSessionStorage from "../utils/session-storage";

export type Performances = "correct" | "wrong" | "unattempted";
export type Subjects = keyof typeof patternPerSection;

type Question = {
  number: number;
  performance: Performances;
  subject?: Subjects;
};

type QuestionStore = {
  questions: Question[];
  setQuestionStatus: (arg: {
    number: number;
    performance?: Performances;
    subject?: Subjects;
  }) => void;
  resetQuestions: () => void;
  getCorrectCount: () => number;
};

const defaultQuestionsData = Array.from(
  {
    length: Object.keys(patternPerSection).reduce(
      (a, b) => a + patternPerSection[b as Subjects].totalQuestions,
      0,
    ),
  },
  (_, index) => {
    const subjectRanges: Array<[number, number, Subjects]> = [
      [0, 49, "mathematics"],
      [50, 89, "logicalReasoning"],
      [90, 109, "computerScience"],
      [110, 119, "generalEnglish"],
    ];

    if (index >= subjectRanges[0][0] && index <= subjectRanges[0][1]) {
      return {
        number: index + 1,
        performance: "unattempted",
        subject: subjectRanges[0][2],
      };
    }
    if (index >= subjectRanges[1][0] && index <= subjectRanges[1][1]) {
      return {
        number: index - subjectRanges[0][1],
        performance: "unattempted",
        subject: subjectRanges[1][2],
      };
    }
    if (index >= subjectRanges[2][0] && index <= subjectRanges[2][1]) {
      return {
        number: index - subjectRanges[1][1],
        performance: "unattempted",
        subject: subjectRanges[2][2],
      };
    }

    return {
      number: index - subjectRanges[2][1],
      performance: "unattempted",
      subject: subjectRanges[3][2],
    };
  },
) satisfies Question[];

const useQuestion = create<QuestionStore>()(
  persist(
    (set, get) => ({
      questions: defaultQuestionsData,
      setQuestionStatus: (arg) => {
        set((state) => ({
          questions: state.questions.map((q) =>
            q.number === arg.number && q.subject === arg.subject
              ? {
                  ...q,
                  ...arg,
                }
              : q,
          ),
        }));
      },
      resetQuestions: () => set({ questions: defaultQuestionsData }),
      getCorrectCount: () =>
        get().questions.filter((q) => q.performance === "correct").length,
    }),
    {
      name: "question",
      storage: createSessionStorage,
    },
  ),
);

export default useQuestion;
