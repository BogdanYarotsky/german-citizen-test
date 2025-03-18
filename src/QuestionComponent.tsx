import { useState } from "react";
import { Question } from "./Question";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Label } from "./components/ui/label";

export default function QuestionComponent({
  question,
}: {
  question: Question;
}) {
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
