import { ObjArr } from "./QuestionObj";

type ActionData = {
  type: "dataReceived";
  payload: ObjArr;
};
type ActionAnswer = {
  type: "newAnswer";
  payload: number;
};

type ActionOther = {
  type: "dataFailed" | "start" | "nextQuestion" | "finish" | "restart" | "tick";
};

export type Action = ActionData | ActionOther | ActionAnswer;
