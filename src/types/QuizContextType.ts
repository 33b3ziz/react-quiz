import { Action } from "./Actions";
import { Questions } from "./Questions";

export type QuizContextType = Questions & {
  dispatch: (action: Action) => void;
  numQuestions: number;
  maxPossiblePoints: number;
};
