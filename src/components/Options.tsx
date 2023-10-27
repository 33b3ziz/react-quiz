import { useQuiz } from "../hooks/useQuiz";

function Options() {
  const { answer, dispatch, questions, index } = useQuiz()!;
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {questions[index].options.map((option: string, i: number) => (
        <button
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            hasAnswered
              ? i === questions[index].correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
