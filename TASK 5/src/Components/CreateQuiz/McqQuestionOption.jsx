import { useState } from "react";
import { MdDelete } from "react-icons/md";

function McqQuestionOption({ setOptions, id, opt, handleOptionChange }) {
  const [newOption, setNewOption] = useState(opt);

  function onOptionChange(e) {
    const newValue = e.target.value;
    setNewOption(newValue);
    handleOptionChange({ newValue, id });
  }

  function handleNewOptionDelete() {
    setOptions((options) => options.filter((option) => option.id !== id));
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter option here..."
        value={newOption}
        onChange={onOptionChange}
      />
      <p onClick={handleNewOptionDelete}>
        <MdDelete />
      </p>
    </div>
  );
}

export default McqQuestionOption;
