import { useEffect, useState } from "react";
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

function shuffle<T>(input: T[]): T[] {
  const output = [...input];

  for (let i = output.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [output[i], output[j]] = [output[j], output[i]];
  }

  return output;
}

const quizData = shuffle(parsedQuestions).slice(0, 33);
//.map((q) => ({ ...q, answers: shuffle(q.answers) }));

function App() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | undefined>();
  const [submitted, setSubmitted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption !== undefined) {
      setSubmitted(true);
      if (quizData[currentQuestion].answers[selectedOption].correct) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(undefined);
      setSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
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
              Frage {currentQuestion + 1} von {quizData.length}
            </div>
            <div>Punkten: {score}</div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 min-h-[400px]">
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <h2 className="text-lg font-medium text-gray-800">
              {quizData[currentQuestion].text}
            </h2>
          </div>
          <RadioGroup
            key={currentQuestion}
            className="space-y-3"
            value={selectedOption?.toString()}
            onValueChange={(value) => handleOptionSelect(parseInt(value))}
          >
            {quizData[currentQuestion].answers.map((answer) => {
              const id = `option-${currentQuestion}-${answer.index}`;
              return (
                <div
                  key={answer.index}
                  className={`rounded-md ${
                    submitted && answer.correct
                      ? "bg-green-100"
                      : submitted &&
                        answer.index === selectedOption &&
                        !answer.correct
                      ? "bg-red-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Label
                    htmlFor={id}
                    className="flex items-center space-x-2 p-2 cursor-pointer w-full"
                  >
                    <RadioGroupItem
                      value={answer.index.toString()}
                      id={id}
                      disabled={submitted}
                    />
                    <span className="flex-grow select-text">{answer.text}</span>
                    {submitted && answer.correct && (
                      <CircleCheckBig className="h-4 w-4 text-green-600 flex-shrink-0" />
                    )}
                    {submitted &&
                      answer.index === selectedOption &&
                      !answer.correct && (
                        <CircleX className="h-4 w-4 text-red-600 flex-shrink-0" />
                      )}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-center">
          {submitted ? (
            <Button
              className="px-5 py-3.5 text-base w-[160px]"
              onClick={handleNext}
            >
              {currentQuestion < quizData.length - 1
                ? "Nächste Frage →"
                : "Ergebnis anzeigen"}
            </Button>
          ) : (
            <Button
              className="px-5 py-3.5 text-base  w-[160px]"
              onClick={handleSubmit}
              disabled={selectedOption === undefined}
            >
              Antwort senden ✓
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
