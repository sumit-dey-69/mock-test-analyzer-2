"use client";
import {
  BookA,
  Brain,
  CircleCheck,
  CircleX,
  Cpu,
  Info,
  Radical,
  Target,
} from "lucide-react";
import { useEffect, useState } from "react";
import { overallAppreciator, subjectAppreciator } from "../utils/actions";
import { roundOff } from "../utils/function";
import type { Subjects } from "../zustand/use-question";
import useQuestion from "../zustand/use-question";

function ResultBox() {
  const { questions } = useQuestion();

  const totalCorrect = questions.filter(
    (q) => q.performance === "correct" && q.subject,
  ).length;
  const totalIncorrect = questions.filter(
    (q) => q.performance === "wrong" && q.subject,
  ).length;
  const totalUnattempted = questions.filter(
    (q) => q.performance === "unattempted" && q.subject,
  ).length;
  const accuracy = (totalCorrect * 100) / (totalCorrect + totalIncorrect);
  const marksObtained = totalCorrect * 4 + totalIncorrect * -1;

  const [appreciationMessage, setAppreciationMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchAppreciation() {
      if (appreciationMessage) return;

      try {
        const promptData = {
          marksObtained,
          accuracy,
          totalCorrect,
          totalIncorrect,
          totalUnattempted,
        };

        const message = await overallAppreciator(promptData);
        if (isMounted) setAppreciationMessage(message);
      } catch (error) {
        console.error("Error generating appreciation message:", error);
        if (isMounted)
          setAppreciationMessage("Unable to generate feedback at this time.");
      }
    }

    fetchAppreciation();

    return () => {
      isMounted = false;
    };
  }, [
    marksObtained,
    accuracy,
    appreciationMessage,
    totalCorrect,
    totalIncorrect,
    totalUnattempted,
  ]);

  return (
    <div className="mx-auto grid w-full max-w-[50rem] grid-rows-[auto_1fr]">
      <div className="grid h-max grid-cols-3 gap-4">
        {["maths", "computer", "reasoning"].map((subject) => (
          <Box
            key={subject}
            type={subject as Subjects}
            correctQuestions={
              questions.filter(
                (q) => q.subject === subject && q.performance === "correct",
              ).length
            }
            incorrectQuestions={
              questions.filter(
                (q) => q.subject === subject && q.performance === "wrong",
              ).length
            }
            unattemptedQuestions={
              questions.filter(
                (q) => q.subject === subject && q.performance === "unattempted",
              ).length
            }
          />
        ))}
      </div>

      <div className="grid grid-rows-[1fr_auto] space-y-2">
        <div className="m-auto grid w-[16rem] place-content-center gap-6 rounded-xl border border-gray-600 bg-gray-900 p-4">
          <p className="mx-auto flex w-max items-end gap-1 italic">
            <span className="text-4xl font-semibold">{marksObtained}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">300</span>
          </p>

          <div className="mx-auto flex w-max items-center gap-2">
            <Target className="size-6 text-gray-400" />
            <p className="text-2xl">
              {Number.isNaN(accuracy) ? "__" : roundOff(accuracy)}
              <span className="text-xs italic">%</span>
            </p>
          </div>

          <div className="flex gap-4 *:flex *:items-center *:gap-1">
            <div>
              <CircleCheck className="size-4 text-green-400" />
              <p className="text-sm">{totalCorrect}</p>
            </div>
            <div>
              <CircleX className="size-4 text-red-500" />
              <p className="text-sm">{totalIncorrect}</p>
            </div>
            <div>
              <Info className="size-4 text-orange-400" />
              <p className="text-sm">{totalUnattempted}</p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs brightness-75">
          {appreciationMessage}
        </p>
      </div>
    </div>
  );
}
export default ResultBox;

function Box({
  type,
  correctQuestions,
  incorrectQuestions,
  unattemptedQuestions,
}: {
  type: Subjects;
  unattemptedQuestions: number;
  correctQuestions: number;
  incorrectQuestions: number;
}) {
  const accuracy =
    (correctQuestions * 100) / (correctQuestions + incorrectQuestions);
  const totalQuestions =
    correctQuestions + incorrectQuestions + unattemptedQuestions;

  const [appreciationMessage, setAppreciationMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchAppreciation() {
      if (appreciationMessage) return;

      try {
        const promptData = {
          type,
          correctQuestions,
          incorrectQuestions,
          unattemptedQuestions,
          totalQuestions,
          accuracy,
        };

        const message = await subjectAppreciator(promptData);
        if (isMounted) setAppreciationMessage(message);
      } catch (error) {
        console.error("Error generating appreciation message:", error);
        if (isMounted)
          setAppreciationMessage("Unable to generate feedback at this time.");
      }
    }

    fetchAppreciation();

    return () => {
      isMounted = false;
    };
  }, [
    type,
    correctQuestions,
    incorrectQuestions,
    unattemptedQuestions,
    totalQuestions,
    accuracy,
    appreciationMessage,
  ]);

  return (
    <div className="grid grid-rows-[auto_1fr] space-y-2">
      <div className="relative h-max rounded-md bg-gray-900 p-4">
        <div className="absolute top-2 right-2 size-12 opacity-10">
          {type === "mathematics" ? (
            <Radical className="size-full" />
          ) : type === "computerScience" ? (
            <Cpu className="size-full" />
          ) : type === "logicalReasoning" ? (
            <Brain className="size-full" />
          ) : (
            <BookA className="size-full" />
          )}
        </div>

        <div className="grid gap-2 *:flex *:items-center *:gap-2">
          <div>
            <CircleCheck className="size-4 text-green-400" />
            <p className="text-sm">{correctQuestions}</p>
          </div>
          <div>
            <CircleX className="size-4 text-red-500" />
            <p className="text-sm">{incorrectQuestions}</p>
          </div>
          <div>
            <Info className="size-4 text-orange-400" />
            <p className="text-sm">{unattemptedQuestions}</p>
          </div>

          <div>
            <Target className="size-4" />
            <p>
              {Number.isNaN(accuracy) ? "__" : roundOff(accuracy)}
              <span className="text-xs italic">%</span>
            </p>
          </div>
        </div>

        <p className="absolute right-3 bottom-2 text-sm italic">
          {totalQuestions}
        </p>
      </div>

      <p className="text-xs brightness-75">{appreciationMessage}</p>
    </div>
  );
}
