// interface ProgressProps {
//   index: number;
//   numQuestions: number;
//   points: number;
//   maxPossiblePoints: number;
//   answer: null | number;
// }

import { useQuiz } from "../hooks/useQuiz";

function Progress() {
  const { numQuestions, answer, index, maxPossiblePoints, points } = useQuiz()!;
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
