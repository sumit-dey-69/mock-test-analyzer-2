"use client";
import useQuestion from "../zustand/use-question";
import useShowResult from "../zustand/use-show-result";
import useTestCode from "../zustand/use-test-code";
import DownloadBtn from "./download-btn";

function ActionButtons() {
  const { resetTestCode } = useTestCode();
  const { resetQuestions } = useQuestion();
  const { toggleShowResult, showResult } = useShowResult();

  return (
    <div className="mx-auto flex w-max gap-4 text-sm">
      <button
        onClick={() => {
          resetTestCode();
          resetQuestions();
        }}
        className="cursor-pointer rounded-md  bg-gray-700 px-4 py-2 hover:brightness-125"
      >
        Reset
      </button>
      <DownloadBtn />
      <button
        onClick={toggleShowResult}
        className="cursor-pointer rounded-md bg-gray-700 px-4 py-2 hover:brightness-125"
      >
        {showResult ? "Back" : "Result"}
      </button>
    </div>
  );
}
export default ActionButtons;
