export type Answer = {
  index: number;
  text: string;
  correct: boolean;
};

export type Question = {
  index: number;
  text: string;
  answers: Answer[];
};
