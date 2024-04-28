import { useState } from "react";
import "../../Styles/create-quiz.scss";
import McqQuestionOption from "./McqQuestionOption";
import Notification from "../Notification/Notification";

export default function McqForm({ SetIsMcqFormOpen }) {
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState([]);

  function handleMcqFormClose() {
    SetIsMcqFormOpen(false);
  }
  function handleNewQuestionSubmit(e) {
    e.preventDefault();
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
  );
}
