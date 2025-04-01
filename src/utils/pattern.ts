const patternPerSection = {
  mathematics: {
    totalQuestions: 50,
    marksPerCorrect: 12,
    marksPerIncorrect: -3,
  },
  logicalReasoning: {
    totalQuestions: 40,
    marksPerCorrect: 6,
    marksPerIncorrect: -1.5,
  },
  computerScience: {
    totalQuestions: 20,
    marksPerCorrect: 6,
    marksPerIncorrect: -1.5,
  },
  generalEnglish: {
    totalQuestions: 10,
    marksPerCorrect: 4,
    marksPerIncorrect: -1,
  },
} as const;

export default patternPerSection;
