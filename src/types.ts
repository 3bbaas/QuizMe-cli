export interface IQuizQ {
  id: number | string;
  question: string;
  options: Record<string, string>;
  answer: string;
}

export type IQuizResult = {
  correct: number;
  total: number;
  incorrect: IQuizQ[];
  timeTaken: number;
};
