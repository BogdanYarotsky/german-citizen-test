import { useState } from "react";
import reactLogo from "./assets/react.svg";
import questions from "./assets/questions.json";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";

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
  return (
    <div>
      <h2>
        {question.index}) {question.text}
      </h2>
      <ul>
        {question.answers.map((answer) => (
          <li key={answer.index}>{answer.text}</li>
        ))}
      </ul>
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
      <div className="flex flex-col items-center justify-center min-h-svh">
        <Button>Click me</Button>
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {parsedQuestions.map((q) => (
        <QuestionComponent key={q.index} question={q} />
      ))}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
