import questions from "../assets/questions.json";
import { FlatQuestion } from "../FlatQuestion";
import { Question } from "../Question";

export const parsedQuestions: Question[] = (questions as FlatQuestion[]).map(
  (flatQuestion, questionIndex) => {
    const [questionText, answers, correctIndex] = flatQuestion;

    return {
      index: questionIndex,
      text: questionText,
      answers: answers.map((text, answerIndex) => ({
        index: answerIndex,
        text,
        correct: answerIndex === correctIndex,
      })),
    };
  }
);
