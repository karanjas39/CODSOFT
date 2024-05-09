import NavBar from "../NavBar/NavBar";
import "../../Styles/create-quiz.scss";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import McqForm from "./McqForm";
import McqListedInList from "./McqListedInList";
import Notification from "../Notification/Notification";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../../constant";

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
  const [IsMcqFormOpen, SetIsMcqFormOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmitNewQuiz(e) {
    e.preventDefault();
    if (
      !title ||
      !(title.split(" ").length >= 2 && title.split(" ").length <= 5)
    ) {
      return setMsg("Quiz title length should be between 2 and 5 words.");
    }
    if (
      !description ||
      !(
        description.split(" ").length >= 5 &&
        description.split(" ").length <= 100
      )
    ) {
      return setMsg(
        "Quiz description length should be between 5 and 100 words."
      );
    }
    if (!passScore || passScore < 1 || passScore > mcq.length) {
      return setMsg(
        "Pass score should be less than or equal to the total number of questions."
      );
    }
    if (!difficulty) {
      return setMsg("Choose the difficulty level.");
    }
    if (mcq.length < 5) {
      return setMsg("There should be at least 5 questions in the quiz.");
    }
    const mcqs = mcq.map((ques) => ({
      question: ques.question,
      options: ques.options,
      answer: ques.answer,
    }));
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      const response = await fetch(`${backend_url}/v1/api/user/quiz/create`, {
        method: "POST",
        body: JSON.stringify({
          mcq: mcqs,
          title,
          description,
          difficulty,
          passScore: parseInt(passScore),
        }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      } else {
        setMsg(data.message);
        setDescription("");
        setDifficulty("");
        setTitle("");
        setMcq([]);
        setPassScore("");
      }
    } catch (error) {
      setMsg(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="create-quiz">
      <NavBar links={links} btns={btns} />
      <div>
        <h2>Create Quiz</h2>
        <form>
          <div className="btns">
            <button onClick={handleSubmitNewQuiz}>
              Create{" "}
              {loading && (
                <img className="loader" src="/loader.svg" alt="Loader Image" />
              )}
            </button>
          </div>
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
              <p onClick={() => SetIsMcqFormOpen((prev) => !prev)}>
                <FaPlusCircle />
              </p>
            </div>
            <div className="mcq-created-list">
              {mcq.length != 0 &&
                mcq.map((question, i) => (
                  <McqListedInList
                    key={question.id}
                    ques={question}
                    i={i + 1}
                    setMcq={setMcq}
                  />
                ))}
            </div>
          </div>
        </form>
        {IsMcqFormOpen && (
          <McqForm SetIsMcqFormOpen={SetIsMcqFormOpen} setMcq={setMcq} />
        )}
        {msg && <Notification msg={msg} setMsg={setMsg} />}
      </div>
    </section>
  );
}

export default CreateQuiz;
