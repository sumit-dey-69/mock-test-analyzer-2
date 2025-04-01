"use client";
import ActionButtons from "@/components/action-buttons";
import QuestionBox from "@/components/question-box";
import QuestionNumberGrid from "@/components/question-number-grid";
import ResultBox from "@/components/result-box";
import TestCodeInput from "@/components/test-code-input";
import useShowResult from "@/zustand/use-show-result";

export default function Home() {
  const { showResult } = useShowResult();
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] gap-8 p-3">
      <TestCodeInput />
      {showResult ? (
        <ResultBox />
      ) : (
        <div className="grid grid-rows-[auto_1fr] gap-4">
          <QuestionBox />
          <QuestionNumberGrid />
        </div>
      )}
      <ActionButtons />
    </div>
  );
}
