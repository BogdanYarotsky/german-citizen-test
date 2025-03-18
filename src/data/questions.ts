import questions from "../assets/questions.json";
import { FlatQuestion } from "../FlatQuestion";
import { Question } from "../Question";

export const parsedQuestions: Question[] = (questions as FlatQuestion[]).map(
  ([question, answers, correctIndex], index) => ({
    index,
    text: question,
    answers: answers.map((text, index) => ({
      index,
      text,
      correct: index === correctIndex,
    })),
  })
);
