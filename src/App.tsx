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

// Quiz questions data
const quizData = [
  {
    question: "What is React?",
    options: [
      "A JavaScript library for building user interfaces",
      "A programming language",
      "A database management system",
      "A styling framework",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which hook is used to manage state in functional components?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: 1,
  },
  {
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "Java Simple XML",
      "JavaScript Extension",
      "JavaScript Syntax",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which of these is NOT a React hook?",
    options: ["useEffect", "useState", "useHistory", "useComponent"],
    correctAnswer: 3,
  },
  {
    question: "What is Vite?",
    options: [
      "A state management library",
      "A UI component library",
      "A build tool and development server",
      "A testing framework",
    ],
    correctAnswer: 2,
  },
  {
    question: "Which method is used to update state in class components?",
    options: [
      "this.state()",
      "this.setState()",
      "this.updateState()",
      "this.changeState()",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is the virtual DOM?",
    options: [
      "A physical component inside computers",
      "A server that hosts React applications",
      "A lightweight copy of the actual DOM",
      "A deprecated React feature",
    ],
    correctAnswer: 2,
  },
  {
    question: "What does the useEffect hook do?",
    options: [
      "Manages component state",
      "Handles side effects in functional components",
      "Creates custom hooks",
      "Optimizes rendering performance",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is shadcn/ui?",
    options: [
      "A React component library with direct imports",
      "A CSS framework",
      "A state management solution",
      "A router for React applications",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "Which tool is commonly used with React for global state management?",
    options: ["React-Router", "Axios", "Redux", "Jest"],
    correctAnswer: 2,
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

  const handleOptionSelect = (index: any) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setSubmitted(true);
      if (selectedOption === quizData[currentQuestion].correctAnswer) {
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
          <CardTitle className="text-xl font-bold">
            Question {currentQuestion + 1} of {quizData.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-semibold mb-4">
            {quizData[currentQuestion].question}
          </h2>
          <RadioGroup value={selectedOption?.toString()} className="space-y-3">
            {quizData[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  submitted && index === quizData[currentQuestion].correctAnswer
                    ? "bg-green-100"
                    : submitted &&
                      index === selectedOption &&
                      index !== quizData[currentQuestion].correctAnswer
                    ? "bg-red-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  disabled={submitted}
                  onClick={() => handleOptionSelect(index)}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-grow cursor-pointer"
                >
                  {option}
                </Label>
                {submitted &&
                  index === quizData[currentQuestion].correctAnswer && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                {submitted &&
                  index === selectedOption &&
                  index !== quizData[currentQuestion].correctAnswer && (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  )}
              </div>
            ))}
          </RadioGroup>

          {submitted && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="font-medium">
                {selectedOption === quizData[currentQuestion].correctAnswer
                  ? "Correct! Good job!"
                  : "Incorrect! The correct answer is: " +
                    quizData[currentQuestion].options[
                      quizData[currentQuestion].correctAnswer
                    ]}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
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
          <div className="text-sm font-medium">
            Score: {score}/{currentQuestion + (submitted ? 1 : 0)}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
