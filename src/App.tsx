// App.jsx
import { useState } from "react";
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
import { CircleX, CircleCheckBig } from "lucide-react";
import { parsedQuestions } from "./data/questions";

// Quiz questions data
const quizData = [...parsedQuestions]
  .sort(() => Math.random() - 0.5)
  .slice(0, 33);

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleOptionSelect = (index: number) => {
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
    setCurrentQuestion(0);
    setSelectedOption(null);
    setSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

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
          <CardFooter className="flex justify-center" />
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md gap-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center justify-between">
            <div>
              Frage: {currentQuestion + 1}/{quizData.length}
            </div>
            <div>Punkten: {score}</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2> {quizData[currentQuestion].text}</h2>
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
                  <CircleCheckBig className="h-5 w-5 text-green-600" />
                )}
                {submitted &&
                  answer.index === selectedOption &&
                  !answer.correct && (
                    <CircleX className="h-5 w-5 text-red-600" />
                  )}
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-center">
          {!submitted ? (
            <Button onClick={handleSubmit} disabled={selectedOption === null}>
              Antwort senden
            </Button>
          ) : (
            <Button onClick={handleNext}>
              {currentQuestion < quizData.length - 1
                ? "Nächste Frage"
                : "Ergebnis anzeigen"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
