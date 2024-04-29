import { useState } from "react";
import "../../Styles/create-quiz.scss";
import McqQuestionOption from "./McqQuestionOption";
import Notification from "../Notification/Notification";

export default function McqForm({ SetIsMcqFormOpen, setMcq }) {
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [msg, setMsg] = useState("");

  function handleMcqFormClose() {
    SetIsMcqFormOpen(false);
  }
  function handleNewQuestionSubmit(e) {
    e.preventDefault();
    if (!newQuestion) {
      return setMsg("Write the proper question.");
    }
    if (options.length < 2) {
      return setMsg("At least two options are required for MCQ.");
    }
    if (!correctAnswer) {
      return setMsg("Select the correct option for this question.");
    }
    const ques = {
      question: newQuestion,
      options: options.map((option) => option.opt),
      answer: options.findIndex((option) => option.id === correctAnswer),
      id: Date.now(),
    };
    setMcq((mcq) => [...mcq, ques]);
    SetIsMcqFormOpen(false);
  }
  function handleAddNewOption(e) {
    e.preventDefault();
    setOptions((options) => [...options, { opt: "", id: Date.now() }]);
  }
  function handleOptionChange({ newValue, id }) {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, opt: newValue } : option
      )
    );
  }

  return (
    <>
      <div className="mcqForm">
        <div>
          <label htmlFor="question">Question</label>
          <input
            type="text"
            id="question"
            placeholder="Enter new quiz question here..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
        </div>
        <>
          {options.length != 0 &&
            options.map((option) => {
              return (
                <McqQuestionOption
                  key={option.id}
                  opt={option.opt}
                  id={option.id}
                  handleOptionChange={handleOptionChange}
                  setOptions={setOptions}
                  setCorrectAnswer={setCorrectAnswer}
                  correctAnswer={correctAnswer}
                />
              );
            })}
        </>
        <div className="btns">
          <button onClick={handleNewQuestionSubmit}>Submit</button>
          <button onClick={handleAddNewOption}>Add Option</button>
          <button onClick={handleMcqFormClose}>Delete Question</button>
        </div>
      </div>
      {msg && <Notification msg={msg} setMsg={setMsg} />}
    </>
  );
}
