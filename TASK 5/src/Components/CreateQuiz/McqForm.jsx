import "../../Styles/create-quiz.scss";
import { MdDelete } from "react-icons/md";

export default function McqForm({
  setMcqForm,
  setNewQuestionOptions,
  setNewQuestion,
  newQuestionOptions,
  newQuestion,
}) {
  function handleMcqFormClose() {
    setMcqForm(false);
  }
  function handleNewQuestionSubmit(e) {
    e.preventDefault();
  }
  function addNewOption(e) {
    console.log(e);
    // setNewQuestionOptions((prev) => [...prev, { text: e.target.value }]);
  }

  return (
    <div className="mcqForm" onSubmit={handleNewQuestionSubmit}>
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
      <div>
        <input
          type="text"
          placeholder="Enter option here..."
          onSubmit={addNewOption}
        />
        <p>
          <MdDelete />
        </p>
      </div>
      <div className="btns">
        <button>Add Option</button>
        <button onClick={handleMcqFormClose}>Delete Question</button>
      </div>
    </div>
  );
}
