import NavBar from "../NavBar/NavBar";
import "../../Styles/create-quiz.scss";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import McqForm from "./McqForm";

const links = [
  {
    text: "Home",
    to: "/dashboard/creator",
  },
];

const btns = [
  {
    text: "Logout",
    to: "/",
  },
];

function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [passScore, setPassScore] = useState("");
  const [mcq, setMcq] = useState([]);
  const [mcqForm, setMcqForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newQuestionOptions, setNewQuestionOptions] = useState([]);

  return (
    <section className="create-quiz">
      <NavBar links={links} btns={btns} />
      <div>
        <h2>Create Quiz</h2>
        <form>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter Quiz title here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              cols="30"
              rows="5"
              placeholder="Enter Quiz description here.."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">Select Quiz Difficulty level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label htmlFor="passscore">Pass Score</label>
            <input
              type="number"
              id="passscore"
              placeholder="Enter Quiz Passing Score here..."
              value={passScore}
              min={1}
              onChange={(e) => setPassScore(parseInt(e.target.value))}
            />
          </div>
          <div className="mcq-container">
            <div>
              <h2>MCQs</h2>
              <p onClick={() => setMcqForm(true)}>
                <FaPlusCircle />
              </p>
            </div>
          </div>
        </form>
        {mcqForm && (
          <McqForm
            setMcqForm={setMcqForm}
            newQuestion={newQuestion}
            newQuestionOptions={newQuestionOptions}
            setNewQuestion={setNewQuestion}
            setNewQuestionOptions={setNewQuestionOptions}
          />
        )}
      </div>
    </section>
  );
}

export default CreateQuiz;
