import { useQuiz } from "../hooks/useQuiz";
import Options from "./Options";
// import { Dispatch } from "../App";
// import { Obj } from "../types/QuestionObj";

// export interface QuestionProps {
//   question: Obj;
//   answer: null | number;
//   dispatch: Dispatch;
// }

function Question() {
  const { questions, index } = useQuiz()!;
  // console.log(question);
  return (
    <div>
      <h4>{questions[index].question}</h4>
      <Options />
    </div>
  );
}

export default Question;
