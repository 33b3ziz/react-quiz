import { useQuiz } from "../hooks/useQuiz";

// interface NextButtonProps {
//   answer: null | number;
//   numQuestions: number;
//   index: number;
//   dispatch: Dispatch;
// }

function NextButton() {
  const { answer, index, numQuestions, dispatch } = useQuiz()!;

  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  } else if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  } else {
    return null;
  }
}

export default NextButton;
