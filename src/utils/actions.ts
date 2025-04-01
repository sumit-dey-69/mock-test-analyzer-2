import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
if (!API_KEY) {
  throw new Error("Google AI API key is missing.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function subjectAppreciator(subjectData: {
  type: string;
  correctQuestions: number;
  incorrectQuestions: number;
  unattemptedQuestions: number;
  totalQuestions: number;
  accuracy: number;
}): Promise<string> {
  try {
    const prompt = JSON.stringify(subjectData);

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      systemInstruction: {
        role: "system",
        parts: [
          {
            text:
              `You are an AI specializing in student performance analysis for individual subjects.` +
              ` Based on the given data, provide concise feedback on the student's performance in ${subjectData.type}.` +
              ` Highlight strengths, pinpoint weaknesses, and suggest ways to improve.` +
              ` Ensure the feedback remains encouraging and helpful.` +
              ` The response should be **between 10 and 15 words.**`,
          },
        ],
      },
      generationConfig: {
        maxOutputTokens: 20,
        temperature: 0.7,
      },
    });

    return (
      result.response.text() || "No subject appreciation message generated."
    );
  } catch (error) {
    console.error("Error generating subject feedback:", error);
    return "An error occurred while generating subject appreciation feedback.";
  }
}

async function overallAppreciator(overallData: {
  marksObtained: number;
  accuracy: number;
  totalCorrect: number;
  totalIncorrect: number;
  totalUnattempted: number;
}): Promise<string> {
  try {
    const prompt = JSON.stringify(overallData);

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      systemInstruction: {
        role: "system",
        parts: [
          {
            text:
              `You are an AI specializing in analyzing students' overall mock test performance.` +
              ` Provide a detailed evaluation based on the total number of correct, incorrect, and unattempted questions.` +
              ` Offer constructive feedback on the student's strengths, areas for improvement, and overall test-taking strategy.` +
              ` Keep the response **positive, actionable, and motivating.**` +
              ` The response should be **between 35 and 40 words.**`,
          },
        ],
      },
      generationConfig: {
        maxOutputTokens: 50,
        temperature: 0.7,
      },
    });

    return (
      result.response.text() || "No overall appreciation message generated."
    );
  } catch (error) {
    console.error("Error generating overall feedback:", error);
    return "An error occurred while generating overall appreciation feedback.";
  }
}

export { overallAppreciator, subjectAppreciator };
