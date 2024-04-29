import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { SiTicktick } from "react-icons/si";

function McqQuestionOption({
  setOptions,
  id,
  opt,
  handleOptionChange,
  setCorrectAnswer,
  correctAnswer,
}) {
  const [newOption, setNewOption] = useState(opt);

  function onOptionChange(e) {
    const newValue = e.target.value;
    setNewOption(newValue);
    handleOptionChange({ newValue, id });
  }

  function handleNewOptionDelete() {
    setCorrectAnswer(null);
    setOptions((options) => options.filter((option) => option.id !== id));
  }

  function handleSetCorrectAnswer() {
    if (correctAnswer === id) {
      setCorrectAnswer(null);
      return;
    }
    setCorrectAnswer(id);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter option here..."
        value={newOption}
        onChange={onOptionChange}
      />
      <p
        onClick={handleSetCorrectAnswer}
        className={correctAnswer === id ? "correctans" : ""}
      >
        <SiTicktick />
      </p>
      <p onClick={handleNewOptionDelete}>
        <MdDelete />
      </p>
    </div>
  );
}

export default McqQuestionOption;
