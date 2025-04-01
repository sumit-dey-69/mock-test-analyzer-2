"use client";
import { roundOff } from "../utils/function";
import patternPerSection from "../utils/pattern";
import useQuestion, { type Subjects } from "../zustand/use-question";
import useTestCode from "../zustand/use-test-code";

type Performances = "correct" | "wrong" | "unattempted";

function DownloadBtn() {
  const { testCode } = useTestCode();
  const { questions } = useQuestion();

  const getQuestionsByPerformance = (
    subject: Subjects,
    performance: Performances,
  ) =>
    questions
      .filter((q) => q.subject === subject && q.performance === performance)
      .map((q) => q.number)
      .join(", ") || "None";

  const getStats = (subject: Subjects) => {
    const total = questions.filter((q) => q.subject === subject).length;
    const correct = questions.filter(
      (q) => q.subject === subject && q.performance === "correct",
    ).length;
    const wrong = questions.filter(
      (q) => q.subject === subject && q.performance === "wrong",
    ).length;
    const unattempted = questions.filter(
      (q) => q.subject === subject && q.performance === "unattempted",
    ).length;
    const accuracy =
      correct + wrong > 0 ? roundOff((correct / (correct + wrong)) * 100) : 0;
    return { total, correct, wrong, unattempted, accuracy };
  };

  const totalStats = questions.reduce(
    (acc, q) => {
      acc.total++;
      if (q.performance in acc) {
        acc[q.performance as keyof typeof acc]++;
      }
      return acc;
    },
    { total: 0, correct: 0, wrong: 0, unattempted: 0 },
  );

  const marksObtained = (Object.keys(patternPerSection) as Subjects[]).reduce(
    (total, subject) => {
      const stats = getStats(subject);
      return (
        total +
        stats.correct * patternPerSection[subject].marksPerIncorrect +
        stats.wrong * patternPerSection[subject].marksPerIncorrect
      );
    },
    0,
  );

  // const marksObtained = totalStats.correct * 4 - totalStats.wrong;
  const overallAccuracy =
    totalStats.correct + totalStats.wrong > 0
      ? roundOff(
          (totalStats.correct / (totalStats.correct + totalStats.wrong)) * 100,
        )
      : 0;

  const formattedContent = `# Test Report: ${testCode}

## 📌 Question Breakdown

### ✅ Correct Question Numbers
- **Maths:** ${getQuestionsByPerformance("mathematics", "correct")}
- **Reasoning:** ${getQuestionsByPerformance("logicalReasoning", "correct")}
- **Computer:** ${getQuestionsByPerformance("computerScience", "correct")}
- **General English:** ${getQuestionsByPerformance("generalEnglish", "correct")}

### ❌ Incorrect Question Numbers
- **Maths:** ${getQuestionsByPerformance("mathematics", "wrong")}
- **Reasoning:** ${getQuestionsByPerformance("logicalReasoning", "wrong")}
- **Computer:** ${getQuestionsByPerformance("computerScience", "wrong")}
- **General English:** ${getQuestionsByPerformance("generalEnglish", "wrong")}

### ❓ Unattempted Question Numbers
- **Maths:** ${getQuestionsByPerformance("mathematics", "unattempted")}
- **Reasoning:** ${getQuestionsByPerformance("logicalReasoning", "unattempted")}
- **Computer:** ${getQuestionsByPerformance("computerScience", "unattempted")}
- **General English:** ${getQuestionsByPerformance("generalEnglish", "unattempted")}

---

## 📊 Subject-wise Performance

### 📘 Maths
- **Total Questions:** ${getStats("mathematics").total}
- **Correct:** ${getStats("mathematics").correct}
- **Incorrect:** ${getStats("mathematics").wrong}
- **Unattempted:** ${getStats("mathematics").unattempted}
- **Accuracy:** ${getStats("mathematics").accuracy}%

### 🧠 Reasoning
- **Total Questions:** ${getStats("logicalReasoning").total}
- **Correct:** ${getStats("logicalReasoning").correct}
- **Incorrect:** ${getStats("logicalReasoning").wrong}
- **Unattempted:** ${getStats("logicalReasoning").unattempted}
- **Accuracy:** ${getStats("logicalReasoning").accuracy}%

### 💻 Computer
- **Total Questions:** ${getStats("computerScience").total}
- **Correct:** ${getStats("computerScience").correct}
- **Incorrect:** ${getStats("computerScience").wrong}
- **Unattempted:** ${getStats("computerScience").unattempted}
- **Accuracy:** ${getStats("computerScience").accuracy}%

---

## 🎯 Final Result
- **Marks Obtained:** ${marksObtained}
- **Total Questions:** ${totalStats.total}
- **Correct:** ${totalStats.correct}
- **Incorrect:** ${totalStats.wrong}
- **Unattempted:** ${totalStats.unattempted}
- **Overall Accuracy:** ${overallAccuracy}%
`;

  return (
    <button
      onClick={() => downloadMdFile(testCode, formattedContent)}
      className="cursor-pointer rounded-md bg-gray-700 px-4 py-2 hover:brightness-125"
    >
      Download
    </button>
  );
}

export default DownloadBtn;

function downloadMdFile(testCode: string, md: string) {
  const blob = new Blob([md], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `test-${testCode}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
