import { Answer } from "./Answer";

export type Question = {
  index: number;
  text: string;
  answers: Answer[];
};
