"use client";
import { Brain, CircleCheck, CircleX, Cpu, Info, Radical } from "lucide-react";
import type { ComponentProps, FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"button"> & {
  text: string;
  Icon: FC<{ className?: string }>;
  textColor: string;
};

function QuizButton({ text, Icon, className, textColor, ...props }: Props) {
  return (
    <button
      className={twMerge(
        "flex cursor-pointer items-center gap-2 rounded-md border-[1.5px] px-4 py-2 hover:brightness-150",
        className,
      )}
      {...props}
    >
      <Icon className={`size-[1.125em] ${textColor}`} /> {text}
    </button>
  );
}

function CorrectBtn({ className, ...props }: ComponentProps<"button">) {
  return (
    <QuizButton
      text="Correct"
      Icon={CircleCheck}
      className={twMerge("border-green-700", className)}
      textColor="text-green-600"
      {...props}
    />
  );
}

function WrongBtn({ className, ...props }: ComponentProps<"button">) {
  return (
    <QuizButton
      text="Wrong"
      Icon={CircleX}
      className={twMerge("border-red-700", className)}
      textColor="text-red-600"
      {...props}
    />
  );
}

function UnattemptedBtn({ className, ...props }: ComponentProps<"button">) {
  return (
    <QuizButton
      text="Unattempted"
      Icon={Info}
      className={twMerge("border-orange-400/80", className)}
      textColor="text-orange-400"
      {...props}
    />
  );
}

function MathsBtn({ className, iconClr, ...props }: ComponentProps<"button"> & { iconClr?: string }) {
  return (
    <QuizButton
      text="Maths"
      Icon={Radical}
      className={twMerge("border-gray-500", className)}
      textColor={iconClr ?? "text-gray-500"}
      {...props}
    />
  );
}

function ComputerBtn({ className, iconClr, ...props }: ComponentProps<"button"> & { iconClr?: string }) {
  return (
    <QuizButton
      text="Computer"
      Icon={Cpu}
      className={twMerge("border-gray-500", className)}
      textColor={iconClr ?? "text-gray-500"}
      {...props}
    />
  );
}

function ReasoningBtn({ className, iconClr, ...props }: ComponentProps<"button"> & { iconClr?: string }) {
  return (
    <QuizButton
      text="Reasoning"
      Icon={Brain}
      className={twMerge("border-gray-500", className)}
      textColor={iconClr ?? "text-gray-500"}
      {...props}
    />
  );
}

export {
  ComputerBtn,
  CorrectBtn,
  MathsBtn,
  ReasoningBtn,
  UnattemptedBtn,
  WrongBtn,
};
