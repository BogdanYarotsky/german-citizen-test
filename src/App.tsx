import { useState } from "react";
import reactLogo from "./assets/react.svg";
import questions from "./assets/questions.json";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Label } from "./components/ui/label";

type FlatQuestion = [string, string[], number];

type Answer = {
  index: number;
  text: string;
  correct: boolean;
};

type Question = {
  index: number;
  text: string;
  answers: Answer[];
};

function QuestionComponent({ question }: { question: Question }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  );

  return (
    <div className="space-y-4 mb-6 p-4 border rounded-lg">
      <h2 className="text-xl font-semibold">{question.text}</h2>
      <RadioGroup
        onValueChange={setSelectedAnswer}
        value={selectedAnswer}
        className="space-y-2"
      >
        {question.answers.map((answer) => (
          <div key={answer.index} className="flex items-center space-x-2">
            <RadioGroupItem
              value={answer.index.toString()}
              id={`q${question.index}-a${answer.index}`}
            />
            <Label htmlFor={`q${question.index}-a${answer.index}`}>
              {answer.text}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const flatQuestions = questions as FlatQuestion[];
  const parsedQuestions: Question[] = flatQuestions.map(
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

  return (
    <>
      {parsedQuestions.map((q) => (
        <QuestionComponent key={q.index} question={q} />
      ))}
    </>
  );
}

export default App;
