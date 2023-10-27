import { useEffect } from "react";
import { useQuiz } from "../hooks/useQuiz";
// import { Dispatch } from "../App";

// interface TimerProps {
//   secondsRemaining: number | null;
//   dispatch: Dispatch;
// }

function Timer() {
  const { secondsRemaining, dispatch } = useQuiz()!;

  const mins = Math.floor(secondsRemaining ? secondsRemaining / 60 : 0);
  const seconds = secondsRemaining ? secondsRemaining % 60 : 0;

  useEffect(
    function () {
      const id: number = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
