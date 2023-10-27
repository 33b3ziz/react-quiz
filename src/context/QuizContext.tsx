import { createContext, useEffect, useReducer } from "react";
import { Action } from "../types/Actions";
import { Questions } from "../types/Questions";
import { Obj } from "../types/QuestionObj";
import { QuizContextType } from "../types/QuizContextType";

const QuizContext = createContext<QuizContextType | null>(null);

const SECS_PER_QUESTION = 40;

const initialState: Questions = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

export type Dispatch = (value: Action) => void;

function reducer(state: Questions, action: Action): Questions {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer": {
      const question: Obj = state.questions.at(state.index) as Obj;
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...state,
        points: 0,
        index: 0,
        answer: null,
        status: "ready",
        secondsRemaining: 10,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining
          ? state.secondsRemaining - 1
          : 0,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      return state;
  }
}

function QuizProvider({ children }: { children: React.ReactNode }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions: number = questions.length;

  const maxPossiblePoints: number = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizProvider, QuizContext };
