import { ObjArr } from "./QuestionObj";

export type Questions = {
  questions: ObjArr;
  status: string;
  index: number;
  answer: null | number;
  points: number;
  highscore: number;
  secondsRemaining: null | number;
};
