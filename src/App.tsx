// App.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Question } from "./Question";

// Quiz questions data
const quizData: Question[] = [
  {
    index: 0,
    text: "What is React?",
    answers: [
      {
        index: 0,
        text: "A JavaScript library for building user interfaces",
        correct: true,
      },
      { index: 1, text: "A programming language", correct: false },
      { index: 2, text: "A database management system", correct: false },
      { index: 3, text: "A styling framework", correct: false },
    ],
  },
  {
    index: 1,
    text: "Which hook is used to manage state in functional components?",
    answers: [
      { index: 0, text: "useEffect", correct: false },
      { index: 1, text: "useState", correct: true },
      { index: 2, text: "useContext", correct: false },
      { index: 3, text: "useReducer", correct: false },
    ],
  },
  {
    index: 2,
    text: "What does JSX stand for?",
    answers: [
      { index: 0, text: "JavaScript XML", correct: true },
      { index: 1, text: "Java Simple XML", correct: false },
      { index: 2, text: "JavaScript Extension", correct: false },
      { index: 3, text: "JavaScript Syntax", correct: false },
    ],
  },
  {
    index: 3,
    text: "Which of these is NOT a React hook?",
    answers: [
      { index: 0, text: "useEffect", correct: false },
      { index: 1, text: "useState", correct: false },
      { index: 2, text: "useHistory", correct: false },
      { index: 3, text: "useComponent", correct: true },
    ],
  },
  {
    index: 4,
    text: "What is Vite?",
    answers: [
      { index: 0, text: "A state management library", correct: false },
      { index: 1, text: "A UI component library", correct: false },
      { index: 2, text: "A build tool and development server", correct: true },
      { index: 3, text: "A testing framework", correct: false },
    ],
  },
  {
    index: 5,
    text: "Which method is used to update state in class components?",
    answers: [
      { index: 0, text: "this.state()", correct: false },
      { index: 1, text: "this.setState()", correct: true },
      { index: 2, text: "this.updateState()", correct: false },
      { index: 3, text: "this.changeState()", correct: false },
    ],
  },
  {
    index: 6,
    text: "What is the virtual DOM?",
    answers: [
      {
        index: 0,
        text: "A physical component inside computers",
        correct: false,
      },
      {
        index: 1,
        text: "A server that hosts React applications",
        correct: false,
      },
      { index: 2, text: "A lightweight copy of the actual DOM", correct: true },
      { index: 3, text: "A deprecated React feature", correct: false },
    ],
  },
  {
    index: 7,
    text: "What does the useEffect hook do?",
    answers: [
      { index: 0, text: "Manages component state", correct: false },
      {
        index: 1,
        text: "Handles side effects in functional components",
        correct: true,
      },
      { index: 2, text: "Creates custom hooks", correct: false },
      { index: 3, text: "Optimizes rendering performance", correct: false },
    ],
  },
  {
    index: 8,
    text: "What is shadcn/ui?",
    answers: [
      {
        index: 0,
        text: "A React component library with direct imports",
        correct: true,
      },
      { index: 1, text: "A CSS framework", correct: false },
      { index: 2, text: "A state management solution", correct: false },
      { index: 3, text: "A router for React applications", correct: false },
    ],
  },
  {
    index: 9,
    text: "Which tool is commonly used with React for global state management?",
    answers: [
      { index: 0, text: "React-Router", correct: false },
      { index: 1, text: "Axios", correct: false },
      { index: 2, text: "Redux", correct: true },
      { index: 3, text: "Jest", correct: false },
    ],
  },
];

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setSubmitted(true);
      if (quizData[currentQuestion].answers[selectedOption].correct) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (!quizStarted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              React Quiz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-6">
              Test your React knowledge with this 10-question quiz!
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={startQuiz}>Start Quiz</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Quiz Completed!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-xl mb-2">
              Your score: {score}/{quizData.length}
            </p>
            <p className="text-center">
              {score === quizData.length
                ? "Perfect score! You're a React expert!"
                : score >= 7
                ? "Great job! You know React well!"
                : score >= 5
                ? "Good effort! Keep learning React!"
                : "Keep practicing to improve your React knowledge!"}
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={restartQuiz}>Restart Quiz</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {quizData[currentQuestion].text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedOption?.toString()} className="space-y-3">
            {quizData[currentQuestion].answers.map((answer) => (
              <div
                key={answer.index}
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  submitted && answer.correct
                    ? "bg-green-100"
                    : submitted &&
                      answer.index === selectedOption &&
                      !answer.correct
                    ? "bg-red-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <RadioGroupItem
                  value={answer.index.toString()}
                  id={`option-${answer.index}`}
                  disabled={submitted}
                  onClick={() => handleOptionSelect(answer.index)}
                />
                <Label
                  htmlFor={`option-${answer.index}`}
                  className="flex-grow cursor-pointer"
                >
                  {answer.text}
                </Label>
                {submitted && answer.correct && (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                )}
                {submitted &&
                  answer.index === selectedOption &&
                  !answer.correct && (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  )}
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-center">
          {!submitted ? (
            <Button onClick={handleSubmit} disabled={selectedOption === null}>
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNext}>
              {currentQuestion < quizData.length - 1
                ? "Next Question"
                : "View Results"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
