import "./App.css";
import { Question } from "./Question";
import QuestionComponent from "./QuestionComponent";
import { parsedQuestions } from "./data/questions";

function App() {
  return (
    <>
      {parsedQuestions.map((q) => (
        <QuestionComponent key={q.index} question={q} />
      ))}
    </>
  );
}

export default App;
